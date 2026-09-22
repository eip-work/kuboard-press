---
description: Kuboard V4 高可用部署：多副本实例 + Redis 分布式缓存 + 负载均衡 + 故障切换
---

# 高可用部署

本文介绍 Kuboard V4（High Availability，HA）生产部署方案：多个 Kuboard 实例组成服务集群，前端由负载均衡器（Load Balancer）分发流量，数据库与 Redis 分别提供高可用与跨实例状态共享。内容以官方编排文件 `deploy/docker-compose/docker-compose-ha-opengauss.yaml` 与 kuboard-server 源码实现为准。

::: tip 适用读者
已经完成单机部署（参考 [快速开始](./quickstart)）并准备将 Kuboard 作为生产系统长期运行的团队。
:::

## 部署拓扑

Kuboard V4 是无状态（stateless）的 Spring Boot 服务，可水平扩展为多个副本；真正的跨实例状态存放在数据库与 Redis 中。推荐拓扑如下：

- **多副本 Kuboard 实例**：2 个及以上 `kuboard-server` 容器（官方编排中的 `kuboard-1` / `kuboard-2`）；
- **前置负载均衡**：Nginx 或 HAProxy，将用户请求分发到各副本（官方编排使用 Nginx `upstream` + 反向代理）；
- **高可用数据库**：MySQL 主从复制、OpenGauss 主备或 PostgreSQL + Patroni，Kuboard 通过 `DB_URL` 指向数据库高可用连接地址；
- **Redis 分布式缓存**：提供跨实例共享缓存与事件分发，支持三种访问模式：
  - Redis Standalone（单实例，性能好，无故障转移）；
  - Redis Sentinel（哨兵模式，自动故障转移，官方场景 3 描述）；
  - Redis Cluster（集群模式，官方 HA 编排实际使用：6 节点 3 主 3 从）。

### 端口模型

- 浏览器访问：nginx 暴露宿主 `9001` → 容器内 nginx `80` → 上游 `kuboard-1` / `kuboard-2` 副本的 `80`
- 副本容器内部监听 `80`（浏览器入口），Spring Boot 后端端口 `9090` 不对外暴露
- 管理端点 `9091` 默认不暴露，接入监控时再决定
- 依赖组件端口（数据库 `5432` / `3306`、Redis `7001`–`7006`）由编排内部互通，不需要暴露到宿主
- 修改端口：只改 nginx 的 `9001` 映射即可，副本容器保持 `80`

官方 `docker-compose-ha-opengauss.yaml` 的组件清单如下：

| 组件 | 镜像 / 版本 | 角色 |
|------|------------|------|
| `kuboard-1` / `kuboard-2` | `${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}` | Kuboard 应用副本（2 个） |
| `nginx` | nginx:1.25-alpine | 负载均衡，对外暴露 `9001:80` |
| `db` | enmotech/opengauss:5.0.1 | 数据库（示例为单节点 OpenGauss） |
| `redis-node-1` ~ `redis-node-6` | redis:7.2-alpine | Redis Cluster 6 节点（3 主 3 从） |
| `redis-cluster-creator` | redis:7.2-alpine | 一次性初始化 Redis Cluster |

```yaml
services:
  kuboard-1:
    image: ${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}
    environment:
      - DB_DRIVER=org.opengauss.Driver
      - DB_URL=jdbc:opengauss://db:5432/kuboard?serverTimezone=Asia/Shanghai
      - DB_USERNAME=kuboard
      - DB_PASSWORD=Kuboard@123
      - KUBOARD_CACHE_PROVIDER=redis
      - KUBOARD_CACHE_REDIS_MODE=cluster
      - KUBOARD_CACHE_REDIS_NODES=redis-node-1:7001,redis-node-2:7002,redis-node-3:7003,redis-node-4:7004,redis-node-5:7005,redis-node-6:7006
      - KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123
    volumes:
      - ./docker-compose-ha-postgres-data/kuboard-1-logs:/app/logs
    depends_on:
      db:
        condition: service_healthy
      redis-cluster-creator:
        condition: service_completed_successfully
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 60s
    networks:
      kuboard_v4_ha_opengauss:
```

::: tip 注意
- 编排中的 `kuboard-1` / `kuboard-2` 容器内部监听 80 端口（镜像内置 nginx 前置），Spring Boot 端口 9090 不对外暴露；
- `KUBOARD_IMAGE_REPO` / `KUBOARD_VERSION` 需要由部署者通过环境变量提供；
- 两个副本的 `KUBOARD_CACHE_*` 配置必须完全一致。
:::

## 为什么多实例必须使用 KUBOARD_CACHE_PROVIDER=redis

Kuboard 的缓存分为两类：**走 Spring CacheManager 的共享缓存**与**进程内 Caffeine 本地缓存**。缓存 provider 通过 `kuboard.application.cache.provider` 切换（环境变量 `KUBOARD_CACHE_PROVIDER`，默认 `caffeine`），代码依据 `@ConditionalOnProperty` 自动装配 `CaffeineConfig` 或 `RedisConfig`。

在单实例（caffeine）模式下，以下跨实例状态全部存放在各自 JVM 内，多副本部署时彼此不可见：

| 状态 / 缓存 | caffeine（单机，默认） | redis（分布式，多副本必需） | 代码依据 |
|------------|----------------------|---------------------------|---------|
| 系统配置缓存（`SystemConfig`、`KuboardUserAuthority`、`KuboardMenu`、`ClusterNameCache` 等） | Caffeine 本地，`ConfigCache` 默认 TTL 5 分钟 | RedisCacheManager 共享，默认 TTL 10 分钟 | `CaffeineConfig.initCacheManager()` / `RedisConfig.redisCacheManager()` |
| MCP 会话信息 / 客户端信息（clientInfo） | Caffeine 本地，TTL 30 分钟 | Redis key `{kuboard:mcp}:mcp-client-info:*`，TTL 24 小时 | `CaffeineMcpSessionInfoService` / `RedisMcpSessionInfoService` |
| MCP 资源订阅（resources/subscribe）推送 | 仅本实例 SSE 订阅者收到 | Redis Pub/Sub fanout，channel `{kuboard:mcp}:mcp-events:resource-change` | `McpResourceChangeRedisPubSub` / `McpResourceSubscriptionManager` |
| 通用 SSE 事件分发 | 仅本实例 | Redis Pub/Sub，channel `channel:kuboard-sse-event` | `MemorySsePublisher` / `RedisSsePublisher` |
| OIDC 登录 state（login-start 与回调可能落在不同实例） | Caffeine 本地（跨实例回调必失败） | Redis key `kuboard:oidc:state:{state}`，TTL 10 分钟，`GETDEL` 原子消费 | `CaffeineOidcStateStore` / `RedisOidcStateStore` |
| MCP 每用户限流（rate limit） | 本机内存计数 | Redis `INCR + EXPIRE` 原子窗口 | `RateLimitFilter` |
| 变更审批 plan / approvalToken（agent-mutation-approval） | 数据库为单一事实源（SSOT），**不依赖缓存 provider**，天然支持多实例 | 同左 | `McpChangePlanRegistry` |
| `K8sCapabilityCache`（集群能力探测缓存） | 恒为进程内 Caffeine（versionCache TTL 1h / max 500，entryCache TTL 1h / max 2000），**不共享** | 同左（不共享） | `K8sCapabilityCache` |
| `ClusterClientBuilder` | 恒为进程内 Caffeine | 同左（不共享） | `CacheUtil.initSimpleCacheManager()` |

由此可以得出两个重要结论：

1. **配置变更的一致性**依赖共享缓存：`SystemConfig` 等缓存走 Spring CacheManager，caffeine 模式下各副本各持一份（最长 5 分钟不一致），redis 模式下所有副本共享同一份 Redis 缓存，任一实例更新配置并 evict 后，其他副本立即可读到新值。
2. **有状态会话类功能**（MCP SSE 订阅推送、OIDC 登录回调、全局限流）在 caffeine 模式下只对本实例生效，多副本 + 负载均衡时会出现"请求落到实例 A 而状态在实例 B"的故障；redis 模式下通过 Pub/Sub 与共享 key 解决。

::: warning 关于 MCP confirm token
较早版本的文档提到的 confirmToken 机制在现版本源码中**已废弃**（`KuboardMcpResult` / `McpAuditAppender` 仅保留兼容签名，`McpSubscriptionScheduledCleanup` 不再调用 confirmToken 清理），高危操作审批由 **agent-mutation-approval（变更审批 plan）** 替代。plan 与 approvalToken 全部落库，审批/消费在 SQL 层 CAS 原子完成，因此该机制在多实例下**不需要 Redis** 也能保证一致性。
:::

## Redis 环境变量清单

缓存相关配置定义在 `kuboard-server/src/main/resources/application.yaml`（`kuboard.application.cache.*`）：

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `KUBOARD_CACHE_PROVIDER` | `caffeine` | 缓存提供者：`caffeine`（单机）/ `redis`（分布式） |
| `KUBOARD_CACHE_REDIS_MODE` | `standalone` | Redis 访问模式：`standalone` / `sentinel` / `cluster` |
| `KUBOARD_CACHE_REDIS_NODES` | `localhost:6379` | Redis 节点列表，逗号分隔（cluster / sentinel 模式为多个节点） |
| `KUBOARD_CACHE_REDIS_SENTINEL_MASTER` | `master` | Sentinel 主节点名称（仅 `sentinel` 模式生效） |
| `KUBOARD_CACHE_REDIS_PASSWORD` | 空 | Redis 密码（三模式通用） |
| `KUBOARD_CACHE_REDIS_DATABASE` | `0` | Redis 逻辑库编号（仅 `standalone` / `sentinel` 模式生效） |

各模式的行为（见 `RedisConfig.lettuceConnectionFactory()`）：

| 模式 | 取节点 | DATABASE | SENTINEL_MASTER | 备注 |
|------|--------|----------|-----------------|------|
| `standalone` | 只取 `NODES` 第一个 | 生效 | 忽略（有日志告警） | 单点，无故障转移 |
| `sentinel` | 全部 `NODES` 作为哨兵地址 | 生效 | 生效（指定主节点名） | 自动故障转移 |
| `cluster` | 全部 `NODES` 作为集群节点 | 忽略（有日志告警） | 忽略（有日志告警） | 分片 + 自动故障转移 |
| 其它值 | — | — | — | 打印错误日志并 `System.exit(1)` 拒绝启动 |

```sh
# Redis Standalone（单机生产，参考 docker-compose-mysql-redis.yaml）
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=standalone
export KUBOARD_CACHE_REDIS_NODES=redis:6379
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123

# Redis Sentinel（1 主 1 从 3 哨兵）
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=sentinel
export KUBOARD_CACHE_REDIS_NODES=sentinel-1:26379,sentinel-2:26379,sentinel-3:26379
export KUBOARD_CACHE_REDIS_SENTINEL_MASTER=mymaster
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123

# Redis Cluster（3 主 3 从，参考 docker-compose-ha-opengauss.yaml）
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=cluster
export KUBOARD_CACHE_REDIS_NODES=redis-node-1:7001,redis-node-2:7002,redis-node-3:7003,redis-node-4:7004,redis-node-5:7005,redis-node-6:7006
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123
```

::: tip
- `deploy/docker-compose/README.md` 的环境变量表将 Sentinel 主节点变量写作 `KUBOARD_CACHE_REDIS_MASTER_NAME`，实际代码（application.yaml）使用的是 **`KUBOARD_CACHE_REDIS_SENTINEL_MASTER`**，请以此为准。
- Redis Cluster 模式下所有 key 与 Pub/Sub channel 使用 hash tag `{kuboard:mcp}` / `{kuboard:mcp}:...`，保证在分片路由中落到同一 slot，相关 key 与订阅事件路由一致。
:::

## 缓存失效传播机制

Kuboard 的缓存失效由 `K8sCapabilityCacheEvictNotifier`（静态通知桥接器）与 `K8sCapabilityCacheEvictListener`（Spring 组件）协作完成，触发链如下：

```
更新系统配置（SystemConfigService.updateSystemConfigById）
  ├─ 写数据库（保留当前版本 + 最多 10 条历史，current 标记切换）
  ├─ systemConfig.evict(t)               → 清除 CacheManager 中的共享缓存条目
  ├─ publishEvent(SystemConfigChangedEvent)  → McpToolsetRefresher 重建工具集（本地）
  └─ 若目标类型是 ConfigClusterSync（cacheResources 变更）：
       ├─ ConfigClusterSync.onCacheResourcesChanged()
       │    └─ K8sCapabilityCacheEvictNotifier.notifyEvictAll()   // 静态桥接，多 handler
       │         ├─ K8sCapabilityCacheEvictListener → capabilityCache.evictAll()（清 L3 探源缓存）
       │         └─ McpNotificationToolsChangedListener → 向 SSE 订阅者广播 notifications/tools/list_changed
       └─ 发布 EnvironmentChangeEvent（注入类配置）→ 触发线程池动态调整等本地监听
```

要点：

- **Notifier 是静态桥接器**：`K8sCapabilityCacheEvictNotifier` 维护一个 `CopyOnWriteArrayList`，Spring 组件在 `@PostConstruct` 时注册 handler（`K8sCapabilityCacheEvictListener` 负责清 capability 缓存、`McpNotificationToolsChangedListener` 负责 MCP 广播），`notifyEvictAll()` 依次执行全部 handler；
- **集群 CRUD 也触发失效**：`ClusterService` 在导入 / 更新 / 删除集群后调用 `K8sCapabilityCacheEvictListener.notifyEvictCluster(clusterId)`，清除该集群的 version 与 entry 缓存；
- **cacheResources 变更不重建上下文**：代码刻意不为 `ConfigClusterSync` 执行 `contextRefresher.refresh()`（全量刷新会断开 MCP SSE 长连接），改为发布 `EnvironmentChangeEvent`，key 包含 `cacheResources` 时 `K8sCapabilityCacheEvictListener.onEnvironmentChange` 执行 `evictAllCapabilities()`。

::: warning 跨副本传播的真实行为
以上事件都是 **Spring 应用上下文内的本地事件**，不会通过 Redis Pub/Sub 转发到其他副本。多副本下的一致性由两层机制保证：

1. **共享缓存层**：`SystemConfig` 等 CacheManager 缓存存放在 Redis，任一实例 evict 后所有副本的"下一次读取"都会穿透到数据库（立即全局一致）；
2. **本地缓存层**：`K8sCapabilityCache` 恒为进程内 Caffeine，副本 B 的失效事件只在本实例触发；副本 A 上导入集群后，副本 B 的 capability 缓存最长保留到 **1 小时 TTL** 自然过期后才重新探测。

`SystemConfigService` 中亦留有 `// FIXME 在集群环境下刷新配置` 注释，表明跨副本的主动通知刷新尚未在代码层实现，生产环境请接受"本地缓存 TTL 内最终一致"的行为（功能正确性不受影响，仅在变更后存在短暂的旧能力判定窗口）。
:::

## 数据库高可用建议

Kuboard 对数据库的访问通过 `DB_DRIVER` / `DB_URL` / `DB_USERNAME` / `DB_PASSWORD` 四个环境变量注入（`spring.datasource`），本身不感知数据库高可用架构，因此可以直接接入您已有的数据库 HA 方案：

- **MySQL / MariaDB 主从**：配置半同步复制 + MHA / Orchestrator 等自动切换，`DB_URL` 指向虚拟 IP（VIP）或连接串中配置多个候选地址；
- **OpenGauss 主备**：`docker-compose-ha-opengauss.yaml` 中的 `db` 服务为单节点示例（`enmotech/opengauss:5.0.1`），生产建议启用 OpenGauss 主备或使用云数据库（RDS）形态；
- **PostgreSQL**：Patroni + etcd 组成自动故障转移集群，`DB_URL` 指向 Patroni VIP；
- **云数据库**：直接使用云厂商的 MySQL / PostgreSQL 高可用实例，由云平台负责主备切换。

```yaml
# docker-compose-ha-opengauss.yaml 中数据库服务的连接配置（单节点示例）
services:
  db:
    image: enmotech/opengauss:5.0.1
    environment:
      GS_PASSWORD: Kuboard@123
      TZ: Asia/Shanghai
    healthcheck:
      test: ["CMD-SHELL", "gsql -U kuboard -W Kuboard@123 -d kuboard -c 'SELECT 1'"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 180s
```

::: tip 写入模式对主从友好
Kuboard 的系统配置写入采用"新版本插入 + current 标记"方式（保留 10 条历史），属于低频轻量写入；集群能力探测等读多写少。相比控制面 K8s 的写放大，Kuboard 对主从延迟的容忍度较高，但仍建议主从延迟监控，避免配置刚保存立即在从库读到旧值。
:::

## 官方 HA 编排示例

### Redis Cluster + OpenGauss + Nginx（docker-compose-ha-opengauss.yaml）

Redis 集群部分（6 节点 3 主 3 从，密码鉴权 + AOF 持久化）：

```yaml
services:
  redis-node-1:
    image: redis:7.2-alpine
    configs:
      - source: redis_node_1_conf
        target: /redis/redis.conf
    volumes:
      - ./docker-compose-ha-postgres-data/redis-node-1:/data
    command: redis-server /redis/redis.conf
    ports:
      - 7001:7001
    healthcheck:
      test: ["CMD", "redis-cli", "-p", "7001", "-a", "Kuboard123", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks:
      kuboard_v4_ha_opengauss:

  redis-cluster-creator:
    image: redis:7.2-alpine
    command: /bin/sh -c "sleep 10 && redis-cli -p 7001 -a Kuboard123 --cluster check redis-node-1:7001 >/dev/null 2>&1 && echo 'Redis cluster already exists, skipping creation' && exit 0; redis-cli -p 7001 -a Kuboard123 --cluster create redis-node-1:7001 redis-node-2:7002 redis-node-3:7003 redis-node-4:7004 redis-node-5:7005 redis-node-6:7006 --cluster-replicas 1 --cluster-yes; redis-cli -p 7001 -a Kuboard123 --cluster check redis-node-1:7001 >/dev/null 2>&1"
    depends_on:
      redis-node-1: { condition: service_healthy }
      redis-node-2: { condition: service_healthy }
      redis-node-3: { condition: service_healthy }
      redis-node-4: { condition: service_healthy }
      redis-node-5: { condition: service_healthy }
      redis-node-6: { condition: service_healthy }
    networks:
      kuboard_v4_ha_opengauss:
```

节点配置（通过 docker config 注入，所有节点相同）：

```text
# redis_node_X_conf
port 7001
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
requirepass Kuboard123
masterauth Kuboard123
```

Nginx 负载均衡部分（含 kuboard 反向代理与集群 API 的 WebSocket 升级）：

```nginx
upstream kuboard_backend {
  server kuboard-1:80;
  server kuboard-2:80;
}

server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://kuboard_backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api/k8s.kuboard.cn/v4/clusters/ {
    proxy_pass http://kuboard_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 86400;
  }
}
```

```yaml
services:
  nginx:
    image: nginx:1.25-alpine
    configs:
      - source: nginx_conf
        target: /etc/nginx/conf.d/default.conf
    ports:
      - "9001:80"
    depends_on:
      - kuboard-1
      - kuboard-2
    networks:
      kuboard_v4_ha_opengauss:
```

### Redis Standalone + MySQL（docker-compose-mysql-redis.yaml）

单副本生产环境的缓存配置作为对照：

```yaml
services:
  redis:
    image: redis:7.2-alpine
    command: redis-server --appendonly yes --requirepass Kuboard123
    volumes:
      - ./docker-compose-mysql-redis-data/kuboard-redis:/data
    ports:
      - 6379:6379
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "Kuboard123", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  kuboard:
    image: ${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}
    environment:
      - DB_DRIVER=com.mysql.cj.jdbc.Driver
      - DB_URL=jdbc:mysql://db:3306/kuboard?serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
      - DB_USERNAME=kuboard
      - DB_PASSWORD=kuboardpwd
      - KUBOARD_CACHE_PROVIDER=redis
      - KUBOARD_CACHE_REDIS_MODE=standalone
      - KUBOARD_CACHE_REDIS_NODES=redis:6379
      - KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123
    volumes:
      - ./docker-compose-mysql-redis-data/kuboard-logs:/app/logs
    ports:
      - "8000:80"
```

## 故障切换行为

### 单个 Kuboard 实例宕机

- 负载均衡层（nginx upstream）默认轮询分发，实例连接被拒绝（connection refused）时 nginx 自动把请求转发给下一个上游实例，服务不中断；
- 已建立的 WebSocket / SSE 长连接会断开，客户端重连后被负载均衡分发到存活实例（MCP 客户端通常会重连并重新 initialize）；
- 由于实例无状态，剩余实例可以独立提供服务（所有跨实例状态都在数据库与 Redis 中）；
- 建议在编排中补充 `restart: always` 让宕机实例自动拉起，并接入监控与告警。

### Redis 不可用

Redis 在 kuboard-server 中的角色是"硬依赖 + 有界降级"：

| 阶段 | 行为 |
|------|------|
| 启动期 | **fail-fast，不自动回退**。`RedisConfig.lettuceConnectionFactory` 在启动时立即建立连接，Redis 不可达直接抛出 `BeanCreationException: ... Unable to connect to Redis`；OIDC 启用且使用 `RedisOidcStateStore` 时还有 `OidcStartupValidator` 的 PING 探活，同样 fail-fast。这是刻意的设计选择（运维可控，避免静默单机化） |
| 运行期 | 共享缓存读写、MCP SSE 跨实例 Pub/Sub、OIDC state、全局限流等依赖 Redis 的能力受影响；**不依赖 Redis 的能力不受影响**——变更审批 plan / approvalToken 以数据库为单一事实源，数据库正常即可继续审批与执行 |
| 恢复 | 恢复 Redis 服务后实例自动重连（Lettuce 连接池）；若 Redis 需要较长时间恢复，可将 `KUBOARD_CACHE_PROVIDER` 改回 `caffeine` 重启（注意：SSE 订阅 / OIDC state / 全局限流等跨实例状态会短暂丢失，MCP 客户端可能收到推送中断，需要重新建立订阅） |

### 数据库故障

- 多副本无法弥补数据库故障：Kuboard 的所有业务数据、系统配置、变更审批 plan 都持久化在数据库中；
- 数据库主备切换期间，依赖数据库的读写会失败，直到新主库可用（连接池自动恢复）；
- 建议使用高可用数据库方案（见上文）并对数据库做备份与恢复演练（参考 [升级与备份](./upgrade)）。

### 恢复建议清单

- 所有副本的环境变量保持一致，特别是 `KUBOARD_CACHE_PROVIDER` / `KUBOARD_CACHE_REDIS_*`；
- 为 nginx 上游配置 `max_fails` / `fail_timeout`，或改用带主动健康检查的负载均衡器；
- 监控三件事：Redis 连通性与内存、数据库主从状态、Kuboard 实例健康（`/actuator/health`，管理端口默认 9091）；
- 升级 / 扩缩容时逐副本滚动操作：先重启一个副本确认健康，再继续下一个（MCP 会话与 SSE 连接逐实例重建，避免全部同时中断）。

## 相关文档

- [快速开始](./quickstart) — 单机部署
- [反向代理](./reverse-proxy) — HTTPS 与 WebSocket 配置
- [升级](./upgrade) — 版本升级与数据备份
- [安装索引](./index) — 其他部署场景