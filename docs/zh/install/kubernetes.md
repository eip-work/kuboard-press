---
description: 在 Kubernetes 集群内部署 Kuboard v4：单机、多副本高可用、外部数据库与 Redis，以及入口暴露和部署后验证
---

# 在 Kubernetes 中部署 Kuboard v4

把 Kuboard v4 作为工作负载运行在 K8s 集群内：数据落在 PVC 或外部数据库，多副本时用共享 Redis 保存跨实例状态。

适用对象：已有 Kubernetes 集群（1.15 及以上）、能拉取容器镜像的平台 / 运维工程师。

## 部署前准备

| 项目 | 要求 |
|---|---|
| Kubernetes | 1.15 ~ 1.37（与 v4 的支持范围一致） |
| 镜像 | `kuboard:v4`；内置数据库需要 `mariadb:11.3.2-jammy`；高可用还需要 `redis:7.2-alpine` |
| 存储 | 默认 StorageClass 能提供 `ReadWriteOnce` 卷（数据库 10Gi、Redis 5Gi） |
| 数据库 | 内置 MariaDB，或外部 MySQL ≥ 5.7 / MariaDB ≥ 8.0 / PostgreSQL 12+ / openGauss ≥ 3.0 |

::: tip 和 docker compose 安装的区别
Kuboard 容器监听 80 端口，连接信息全部通过环境变量注入；容器本身可随时重建，升级只需换镜像并滚动更新。
:::

## 方式一：使用内置数据库单机部署

把下面内容保存为 `kuboard.yaml`（密码、存储类按需修改），执行 `kubectl apply -f kuboard.yaml`，等两个 Pod 都 `Running` 后访问 `http://<任意节点 IP>:30080`，用 `admin` / `Kuboard123` 登录并修改密码。

```yaml
apiVersion: v1
kind: Namespace
metadata: { name: kuboard }
---
apiVersion: v1
kind: Secret
metadata: { name: kuboard-v4-db, namespace: kuboard }
type: Opaque
stringData: { root-password: kuboardAbc123, password: kuboardAbc123pwd }
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata: { name: kuboard-v4-mariadb-data, namespace: kuboard }
spec:
  accessModes: [ReadWriteOnce]
  resources: { requests: { storage: 10Gi } }
---
apiVersion: apps/v1
kind: Deployment
metadata: { name: kuboard-v4-mariadb, namespace: kuboard }
spec:
  replicas: 1
  strategy: { type: Recreate }        # ReadWriteOnce 卷不能滚动更新，先停旧 Pod
  selector: { matchLabels: { app: kuboard-v4-mariadb } }
  template:
    metadata: { labels: { app: kuboard-v4-mariadb } }
    spec:
      containers:
        - name: mariadb
          image: swr.cn-east-2.myhuaweicloud.com/kuboard/mariadb:11.3.2-jammy
          env:
            - { name: MARIADB_DATABASE, value: kuboard }
            - { name: MARIADB_USER, value: kuboard }
            - { name: TZ, value: Asia/Shanghai }
            - name: MARIADB_ROOT_PASSWORD
              valueFrom: { secretKeyRef: { name: kuboard-v4-db, key: root-password } }
            - name: MARIADB_PASSWORD
              valueFrom: { secretKeyRef: { name: kuboard-v4-db, key: password } }
          ports: [{ containerPort: 3306 }]
          readinessProbe:
            exec: { command: ["healthcheck.sh", "--connect", "--innodb_initialized"] }
            initialDelaySeconds: 10
            periodSeconds: 10
          volumeMounts: [{ name: data, mountPath: /var/lib/mysql }]
      volumes:
        - name: data
          persistentVolumeClaim: { claimName: kuboard-v4-mariadb-data }
---
apiVersion: v1
kind: Service
metadata: { name: kuboard-v4-mariadb, namespace: kuboard }
spec:
  ports: [{ port: 3306, targetPort: 3306 }]
  selector: { app: kuboard-v4-mariadb }
---
apiVersion: apps/v1
kind: Deployment
metadata: { name: kuboard-v4, namespace: kuboard }
spec:
  replicas: 1
  selector: { matchLabels: { app: kuboard-v4 } }
  template:
    metadata: { labels: { app: kuboard-v4 } }
    spec:
      initContainers:
        - name: wait-for-db          # 数据库未就绪时先等端口，避免反复重启
          image: swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
          command:
            - bash
            - -c
            - until (echo > /dev/tcp/kuboard-v4-mariadb/3306) 2>/dev/null; do sleep 2; done
      containers:
        - name: kuboard
          image: swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
          env:
            - { name: DB_DRIVER, value: org.mariadb.jdbc.Driver }
            - { name: DB_URL, value: "jdbc:mariadb://kuboard-v4-mariadb:3306/kuboard?serverTimezone=Asia/Shanghai" }
            - { name: DB_USERNAME, value: kuboard }
            - { name: JVM_XMX, value: 1536M }      # 建议约为内存 limit 的 75%
            - name: DB_PASSWORD
              valueFrom: { secretKeyRef: { name: kuboard-v4-db, key: password } }
          ports: [{ name: http, containerPort: 80 }]
          resources:
            requests: { cpu: 200m, memory: 512Mi }
            limits: { cpu: "2", memory: 2Gi }
          startupProbe: { httpGet: { path: /, port: http }, periodSeconds: 5, failureThreshold: 36 }
          readinessProbe: { httpGet: { path: /, port: http } }
          livenessProbe: { httpGet: { path: /, port: http }, periodSeconds: 20 }
---
apiVersion: v1
kind: Service
metadata: { name: kuboard-v4, namespace: kuboard }
spec:
  type: NodePort
  ports: [{ name: web, port: 80, targetPort: http, nodePort: 30080 }]
  selector: { app: kuboard-v4 }
```

## 方式二：多副本高可用

多副本本身无状态，跨实例状态（登录会话、权限与菜单缓存、调度选主）全部放在共享 Redis 中，因此副本数可以直接加：

| 改动 | 做法 |
|---|---|
| 副本数 | `replicas: 2`（或更多），滚动更新设 `maxUnavailable: 0` |
| 共享缓存 | `KUBOARD_CACHE_PROVIDER=redis` + 指向同一个 Redis |
| 维护不中断 | `PodDisruptionBudget`，`minAvailable: 1`；副本间 Pod 反亲和 |

集群内最小可用的 Redis（生产建议直接用云托管 Redis 或 Redis Operator）：

```yaml
apiVersion: v1
kind: Secret
metadata: { name: kuboard-v4-redis, namespace: kuboard }
type: Opaque
stringData: { password: kuboardAbc123 }
---
apiVersion: apps/v1
kind: StatefulSet
metadata: { name: redis, namespace: kuboard }
spec:
  serviceName: redis
  replicas: 1
  selector: { matchLabels: { app: redis } }
  template:
    metadata: { labels: { app: redis } }
    spec:
      containers:
        - name: redis
          image: redis:7.2-alpine
          command: ["sh", "-c", "exec redis-server --requirepass \"$REDIS_PASSWORD\" --appendonly yes"]
          env:
            - name: REDIS_PASSWORD
              valueFrom: { secretKeyRef: { name: kuboard-v4-redis, key: password } }
          ports: [{ containerPort: 6379 }]
          readinessProbe:
            exec: { command: ["sh", "-c", "redis-cli -a \"$REDIS_PASSWORD\" --no-auth-warning ping | grep -q PONG"] }
  volumeClaimTemplates:
    - metadata: { name: data }
      spec:
        accessModes: [ReadWriteOnce]
        resources: { requests: { storage: 5Gi } }
---
apiVersion: v1
kind: Service
metadata: { name: redis, namespace: kuboard }
spec:
  ports: [{ port: 6379, targetPort: 6379 }]
  selector: { app: redis }
```

然后在「方式一」的 Kuboard Deployment 上追加这些环境变量，并把副本数改为 2：

```yaml
env:
  - { name: KUBOARD_CACHE_PROVIDER, value: redis }
  - { name: KUBOARD_CACHE_REDIS_MODE, value: standalone }
  - { name: KUBOARD_CACHE_REDIS_NODES, value: redis:6379 }
  - name: KUBOARD_CACHE_REDIS_PASSWORD
    valueFrom: { secretKeyRef: { name: kuboard-v4-redis, key: password } }
```

::: warning 所有副本必须连同一个 Redis
副本之间使用不同的 database 或不同的前缀时，登录会话、权限缓存和调度 leader 会各算各的（表现为「换个页面就掉登录」「同步任务重复执行」）。同一套部署的所有副本请使用完全相同的连接参数。
:::

::: tip 多个部署共用一台 Redis / 其余变量
同一台 Redis 上跑多套 Kuboard 时必须设置 `KUBOARD_CACHE_REDIS_KEY_PREFIX`（如 `prod` / `staging`）；三种模式（standalone / sentinel / cluster）的完整变量清单见[高可用部署 — Redis 环境变量清单](./ha#redis-环境变量清单)。
:::

## 方式三：使用外部数据库与 Redis

已有云托管数据库和 Redis 时，只部署 Kuboard 本身，删掉示例里的内置数据库、Redis 对象，用 Secret / ConfigMap 管理连接信息。

前置条件：先建好数据库（如 `kuboard`）与账号；首次启动会自动建表并执行升级脚本，该账号需要这个库的建表 / 改表 / 索引 / 增删改查权限。

| 环境变量 | 示例 | 说明 |
|---|---|---|
| `DB_DRIVER` | `org.mariadb.jdbc.Driver` | MySQL 用 `com.mysql.cj.jdbc.Driver`，PostgreSQL 用 `org.postgresql.Driver` |
| `DB_URL` | `jdbc:mariadb://db.example.com:3306/kuboard?serverTimezone=Asia/Shanghai` | 指向外部实例；PostgreSQL 形如 `jdbc:postgresql://db.example.com:5432/kuboard` |
| `DB_USERNAME` / `DB_PASSWORD` | `kuboard` / `<密码>` | 密码请放 Secret |
| `KUBOARD_CACHE_PROVIDER` | `redis` | 多副本必填 |
| `KUBOARD_CACHE_REDIS_MODE` / `NODES` | `standalone` / `redis.example.com:6379` | 按服务商提供的方式选 `standalone` / `sentinel` / `cluster`，多个节点用逗号分隔 |
| `KUBOARD_CACHE_REDIS_PASSWORD` | `<密码>` | 没有密码则留空；用户名留空等价 `default` 用户 |
| `KUBOARD_CACHE_REDIS_KEY_PREFIX` | `prod` | 多套 Kuboard 共用同一个 Redis 时必填 |
| `KUBOARD_DDL_LOCK_TIMEOUT_SECONDS` | `300` | 多副本同时启动时，等待其它副本执行完建表 / 升级的最长秒数 |

::: warning 升级窗口避开数据库主从切换
首次安装与大版本升级会执行建表和升级脚本，多副本之间靠数据库级锁串行执行。库很大或网络较慢时适当调大 `KUBOARD_DDL_LOCK_TIMEOUT_SECONDS`；升级期间不要触发数据库主从切换。
:::

## 对外暴露：NodePort 与 Ingress

| 方式 | 适用 | 说明 |
|---|---|---|
| NodePort | 验证、内网临时访问 | 直接访问 `http://<节点IP>:30080`，端口固定在高位区间 |
| Ingress | 生产 | 用域名 + TLS 终止，多个服务共用一个 80/443 入口 |

Kuboard 有终端、日志、MCP 推送等长连接，Ingress 必须配到位，否则表现为「终端一分钟就断」「日志不跳动」：

| 需求 | ingress-nginx 配置 |
|---|---|
| WebSocket 升级 | `nginx.ingress.kubernetes.io/proxy-http-version: "1.1"` |
| 长连接不断开 | `proxy-read-timeout` / `proxy-send-timeout` 设为 `"3600"` |
| SSE / 日志实时 | `proxy-buffering: "off"` |
| 大 YAML、大对象 | `proxy-body-size: "50m"` |
| 多命名空间列表（请求头 32KB） | 控制器 ConfigMap：`large-client-header-buffers: "4 32k"`、`client-header-buffer-size: "32k"` |

Ingress 对象的完整写法（含 TLS、文件上传大小）见[反向代理 — Ingress 配置样例](./reverse-proxy#ingress-配置样例)。

## 验证部署结果

| 检查项 | 命令 | 期望 |
|---|---|---|
| Pod 就绪 | `kubectl -n kuboard get pods` | 全部 `Running`，`RESTARTS` 为 0 |
| 首页可访问 | `curl -s -o /dev/null -w '%{http_code}' http://<节点IP>:30080/` | `200` |
| 登录 | 浏览器打开入口，`admin` / `Kuboard123` | 进入首页，提示修改密码 |
| 终端 / 日志 | 进入任一集群 → 容器组 → 终端 | 能打开 shell；日志持续输出不中断 |
| 数据持久化 | 删除数据库 Pod 后重新登录 | 数据与账号仍在 |

## 升级与清理

- **升级**：修改镜像 tag 后重新 `kubectl apply`；多副本滚动更新期间页面不中断。升级前备份数据库。
- **备份**：内置数据库备份 PVC 或做卷快照；外部数据库用其自带备份能力。
- **清理**：`kubectl delete -f kuboard.yaml`。PVC 默认保留，确认不再需要数据后再删除，否则重新部署会得到一套空库。

## 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| Kuboard Pod `CrashLoopBackOff`，日志提示连接被拒绝 | 数据库还没就绪，或密码与 Secret 不一致 | 用 initContainer 等端口（如上）；核对 Secret 与 `DB_URL` |
| 启动失败提示 `NOAUTH` / 无法连接 Redis | Redis 密码不对；或使用哨兵时给哨兵设置了 `requirepass`（Kuboard 不对哨兵认证） | 核对密码；去掉哨兵的 `requirepass`，主从认证由 `sentinel auth-pass` 负责 |
| 终端约 1 分钟断开、日志长时间不更新 | 网关读写超时 60 秒，或开启了响应缓冲 | 按上文调整 Ingress 超时与 `proxy-buffering` |
| 资源列表页返回 400 / 414 | 网关请求头上限仍是 8k | 把控制器请求头缓冲区调到 ≥ 32k |
| 文件上传返回 413 | 网关请求体限制为 1m | 放宽 `proxy-body-size` |

## 相关文档

- [快速开始](./quickstart) — 用 docker compose 拉起一个实例试用
- [安装指南](./index) — 数据库类型、反向代理与其它部署场景
- [高可用部署](./ha) — 多副本拓扑、Redis 变量清单与故障切换行为
- [反向代理](./reverse-proxy) — Nginx / Ingress 的完整配置样例
- [升级 Kuboard](./upgrade) — 版本升级与数据备份
