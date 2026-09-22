---
description: "Deploy Kuboard v4 in high availability: multiple replicas, Redis distributed cache, load balancer and failover"
---

# High Availability Deployment

This document describes the Kuboard v4 High Availability (HA) production deployment: multiple Kuboard instances form a service cluster, a load balancer in front distributes traffic, and the database and Redis provide high availability and cross-instance state sharing respectively. The content is based on the official orchestration file `deploy/docker-compose/docker-compose-ha-opengauss.yaml` and the kuboard-server source implementation.

::: tip Intended audience
Teams that have already completed a single-node deployment (see [Quick Start](./quickstart)) and are ready to run Kuboard as a production system over the long term.
:::

## Deployment Topology

Kuboard v4 is a stateless Spring Boot service that scales horizontally into multiple replicas; the real cross-instance state lives in the database and Redis. The recommended topology is as follows:

- **Multiple Kuboard replicas**: 2 or more `kuboard-server` containers (`kuboard-1` / `kuboard-2` in the official orchestration);
- **A load balancer in front**: Nginx or HAProxy distributes user requests to the replicas (the official orchestration uses Nginx `upstream` + reverse proxy);
- **A highly available database**: MySQL master/slave replication, OpenGauss primary/standby, or PostgreSQL + Patroni. Kuboard points to the database HA connection address via `DB_URL`;
- **Redis distributed cache**: provides shared cache and event distribution across instances, supporting three access modes:
  - Redis Standalone (single instance, good performance, no failover);
  - Redis Sentinel (sentinel mode, automatic failover, described in official scenario 3);
  - Redis Cluster (cluster mode, actually used by the official HA orchestration: 6 nodes, 3 masters and 3 replicas).

### Port Model

- Browser access: nginx exposes host `9001` → container nginx `80` → upstream `kuboard-1` / `kuboard-2` replicas' `80`
- The replica containers listen on `80` internally (browser entry); the Spring Boot backend port `9090` is not exposed
- The management endpoints `9091` are not exposed by default; decide when you integrate monitoring
- Dependency component ports (database `5432` / `3306`, Redis `7001`–`7006`) communicate within the orchestration only; no need to expose them to the host
- Changing ports: only change nginx's `9001` mapping; the replica containers keep `80`

The component list of the official `docker-compose-ha-opengauss.yaml` is as follows:

| Component | Image / Version | Role |
|------|------------|------|
| `kuboard-1` / `kuboard-2` | `${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}` | Kuboard application replicas (2) |
| `nginx` | nginx:1.25-alpine | Load balancer, exposes `9001:80` |
| `db` | enmotech/opengauss:5.0.1 | Database (single-node OpenGauss in the example) |
| `redis-node-1` ~ `redis-node-6` | redis:7.2-alpine | Redis Cluster 6 nodes (3 masters + 3 replicas) |
| `redis-cluster-creator` | redis:7.2-alpine | One-time Redis Cluster initialization |

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

::: tip Note
- The `kuboard-1` / `kuboard-2` containers in the orchestration listen on port 80 internally (the image ships an Nginx front-end); the Spring Boot port 9090 is not exposed;
- `KUBOARD_IMAGE_REPO` / `KUBOARD_VERSION` must be provided by the deployer through environment variables;
- The `KUBOARD_CACHE_*` configuration of the two replicas must be exactly the same.
:::

## Why Multiple Instances Must Use KUBOARD_CACHE_PROVIDER=redis

Kuboard's cache falls into two categories: **the shared cache managed by Spring CacheManager** and **the in-process Caffeine local cache**. The cache provider is switched via `kuboard.application.cache.provider` (environment variable `KUBOARD_CACHE_PROVIDER`, default `caffeine`); the code auto-wires `CaffeineConfig` or `RedisConfig` based on `@ConditionalOnProperty`.

In single-instance (caffeine) mode, the following cross-instance state all lives in each instance's own JVM and is invisible to other replicas in a multi-replica deployment:

| State / Cache | caffeine (single node, default) | redis (distributed, required for multiple replicas) | Code basis |
|------------|----------------------|---------------------------|---------|
| System configuration cache (`SystemConfig`, `KuboardUserAuthority`, `KuboardMenu`, `ClusterNameCache`, etc.) | Caffeine local, `ConfigCache` default TTL 5 min | Shared via RedisCacheManager, default TTL 10 min | `CaffeineConfig.initCacheManager()` / `RedisConfig.redisCacheManager()` |
| MCP session info / client info (clientInfo) | Caffeine local, TTL 30 min | Redis key `{kuboard:mcp}:mcp-client-info:*`, TTL 24 h | `CaffeineMcpSessionInfoService` / `RedisMcpSessionInfoService` |
| MCP resource subscription (resources/subscribe) push | Only this instance's SSE subscribers receive it | Redis Pub/Sub fanout, channel `{kuboard:mcp}:mcp-events:resource-change` | `McpResourceChangeRedisPubSub` / `McpResourceSubscriptionManager` |
| Generic SSE event distribution | This instance only | Redis Pub/Sub, channel `channel:kuboard-sse-event` | `MemorySsePublisher` / `RedisSsePublisher` |
| OIDC login state (login-start and the callback may land on different instances) | Caffeine local (cross-instance callback always fails) | Redis key `kuboard:oidc:state:{state}`, TTL 10 min, consumed atomically with `GETDEL` | `CaffeineOidcStateStore` / `RedisOidcStateStore` |
| MCP per-user rate limit | Local in-memory counter | Redis `INCR + EXPIRE` atomic window | `RateLimitFilter` |
| Change approval plan / approvalToken (agent-mutation-approval) | Database is the single source of truth (SSOT), **independent of the cache provider**, natively supports multiple instances | Same as left | `McpChangePlanRegistry` |
| `K8sCapabilityCache` (cluster capability detection cache) | Always in-process Caffeine (versionCache TTL 1h / max 500, entryCache TTL 1h / max 2000), **not shared** | Same as left (not shared) | `K8sCapabilityCache` |
| `ClusterClientBuilder` | Always in-process Caffeine | Same as left (not shared) | `CacheUtil.initSimpleCacheManager()` |

Two important conclusions follow:

1. **Configuration-change consistency depends on the shared cache**: caches such as `SystemConfig` go through Spring CacheManager. In caffeine mode each replica keeps its own copy (stale for up to 5 minutes); in redis mode all replicas share the same Redis cache, so once any instance updates a configuration and evicts it, other replicas immediately read the new value.
2. **Stateful session features** (MCP SSE subscription push, OIDC login callback, global rate limiting) only take effect on the local instance in caffeine mode; with multiple replicas behind a load balancer you get the classic "the request landed on instance A but the state is on instance B" failure. In redis mode this is solved through Pub/Sub and shared keys.

::: warning About the MCP confirm token
The confirmToken mechanism mentioned in older versions of the documentation is **deprecated** in the current source code (`KuboardMcpResult` / `McpAuditAppender` only keep compatibility signatures, and `McpSubscriptionScheduledCleanup` no longer calls confirmToken cleanup). High-risk operation approval has been replaced by **agent-mutation-approval (change approval plan)**. The plan and approvalToken are all persisted to the database, and approval/consumption is performed atomically with SQL-level CAS, so this mechanism guarantees consistency across multiple instances **without needing Redis**.
:::

## Redis Environment Variable Reference

Cache-related configuration is defined in `kuboard-server/src/main/resources/application.yaml` (`kuboard.application.cache.*`):

| Environment Variable | Default | Description |
|---------|--------|------|
| `KUBOARD_CACHE_PROVIDER` | `caffeine` | Cache provider: `caffeine` (single node) / `redis` (distributed) |
| `KUBOARD_CACHE_REDIS_MODE` | `standalone` | Redis access mode: `standalone` / `sentinel` / `cluster` |
| `KUBOARD_CACHE_REDIS_NODES` | `localhost:6379` | Redis node list, comma-separated (multiple nodes in cluster / sentinel mode) |
| `KUBOARD_CACHE_REDIS_SENTINEL_MASTER` | `master` | Sentinel master node name (only effective in `sentinel` mode) |
| `KUBOARD_CACHE_REDIS_PASSWORD` | empty | Redis password (common to all three modes) |
| `KUBOARD_CACHE_REDIS_DATABASE` | `0` | Redis logical database number (only effective in `standalone` / `sentinel` mode) |

Behavior per mode (see `RedisConfig.lettuceConnectionFactory()`):

| Mode | Node selection | DATABASE | SENTINEL_MASTER | Remarks |
|------|--------|----------|-----------------|------|
| `standalone` | Only the first entry of `NODES` | Effective | Ignored (log warning) | Single point, no failover |
| `sentinel` | All `NODES` used as sentinel addresses | Effective | Effective (specifies the master node name) | Automatic failover |
| `cluster` | All `NODES` used as cluster nodes | Ignored (log warning) | Ignored (log warning) | Sharding + automatic failover |
| Any other value | — | — | — | Logs an error and refuses to start with `System.exit(1)` |

```sh
# Redis Standalone (single-node production, see docker-compose-mysql-redis.yaml)
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=standalone
export KUBOARD_CACHE_REDIS_NODES=redis:6379
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123

# Redis Sentinel (1 master, 1 replica, 3 sentinels)
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=sentinel
export KUBOARD_CACHE_REDIS_NODES=sentinel-1:26379,sentinel-2:26379,sentinel-3:26379
export KUBOARD_CACHE_REDIS_SENTINEL_MASTER=mymaster
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123

# Redis Cluster (3 masters, 3 replicas, see docker-compose-ha-opengauss.yaml)
export KUBOARD_CACHE_PROVIDER=redis
export KUBOARD_CACHE_REDIS_MODE=cluster
export KUBOARD_CACHE_REDIS_NODES=redis-node-1:7001,redis-node-2:7002,redis-node-3:7003,redis-node-4:7004,redis-node-5:7005,redis-node-6:7006
export KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123
```

::: tip
- The environment variable table in `deploy/docker-compose/README.md` writes the Sentinel master variable as `KUBOARD_CACHE_REDIS_MASTER_NAME`, but the actual code (application.yaml) uses **`KUBOARD_CACHE_REDIS_SENTINEL_MASTER`** — follow the latter.
- In Redis Cluster mode, all keys and Pub/Sub channels use the hash tags `{kuboard:mcp}` / `{kuboard:mcp}:...`, so they land on the same slot under sharded routing, keeping related keys and subscription events routed consistently.
:::

## Cache Invalidation Propagation Mechanism

Kuboard's cache invalidation is handled jointly by `K8sCapabilityCacheEvictNotifier` (a static notification bridge) and `K8sCapabilityCacheEvictListener` (a Spring component). The trigger chain is as follows:

```
Update system config (SystemConfigService.updateSystemConfigById)
  ├─ Write to database (keep current version + up to 10 versions of history, switch the `current` flag)
  ├─ systemConfig.evict(t)                → evict the shared cache entry in CacheManager
  ├─ publishEvent(SystemConfigChangedEvent)  → McpToolsetRefresher rebuilds the toolset (local)
  └─ if the target type is ConfigClusterSync (cacheResources change):
       ├─ ConfigClusterSync.onCacheResourcesChanged()
       │    └─ K8sCapabilityCacheEvictNotifier.notifyEvictAll()   // static bridge, multiple handlers
       │         ├─ K8sCapabilityCacheEvictListener → capabilityCache.evictAll() (clear L3 source-probe cache)
       │         └─ McpNotificationToolsChangedListener → broadcast notifications/tools/list_changed to SSE subscribers
       └─ Publish EnvironmentChangeEvent (injected-style config) → triggers local listeners such as dynamic thread-pool adjustments
```

Key points:

- **The notifier is a static bridge**: `K8sCapabilityCacheEvictNotifier` maintains a `CopyOnWriteArrayList`; Spring components register handlers in `@PostConstruct` (`K8sCapabilityCacheEvictListener` clears the capability cache, `McpNotificationToolsChangedListener` broadcasts to MCP), and `notifyEvictAll()` runs all handlers in sequence;
- **Cluster CRUD also triggers invalidation**: `ClusterService` calls `K8sCapabilityCacheEvictListener.notifyEvictCluster(clusterId)` after importing / updating / deleting a cluster, clearing that cluster's version and entry caches;
- **A cacheResources change does not rebuild the context**: the code deliberately does not run `contextRefresher.refresh()` for `ConfigClusterSync` (a full refresh would disconnect MCP SSE long connections); instead it publishes an `EnvironmentChangeEvent`, and when the key contains `cacheResources`, `K8sCapabilityCacheEvictListener.onEnvironmentChange` executes `evictAllCapabilities()`.

::: warning The real cross-replica behavior
All of the events above are **local events within the Spring application context**; they are not forwarded to other replicas via Redis Pub/Sub. Consistency across replicas is guaranteed by two layers:

1. **Shared cache layer**: `SystemConfig` and other CacheManager caches live in Redis, so after any instance evicts them, the "next read" on every replica falls through to the database (immediately globally consistent);
2. **Local cache layer**: `K8sCapabilityCache` is always in-process Caffeine; on replica B the invalidation event only fires on the local instance. After importing a cluster on replica A, replica B's capability cache keeps serving the old value until it expires naturally via the **1-hour TTL** and is re-probed.

`SystemConfigService` also carries a `// FIXME refresh configuration in a cluster environment` comment, indicating that proactive cross-replica refresh notification is not yet implemented at the code level. In production, accept the "eventual consistency within the local cache TTL" behavior (feature correctness is unaffected; there is only a short window of stale capability judgment after a change).
:::

## Database High Availability Recommendations

Kuboard accesses the database through four environment variables — `DB_DRIVER` / `DB_URL` / `DB_USERNAME` / `DB_PASSWORD` (`spring.datasource`) — and is itself unaware of the database HA architecture, so it can plug directly into an existing database HA solution:

- **MySQL / MariaDB master/slave**: configure semi-synchronous replication plus automatic failover (MHA / Orchestrator, etc.), and point `DB_URL` at a virtual IP (VIP) or include multiple candidate addresses in the connection string;
- **OpenGauss primary/standby**: the `db` service in `docker-compose-ha-opengauss.yaml` is a single-node example (`enmotech/opengauss:5.0.1`); in production, enable OpenGauss primary/standby or use a cloud database (RDS);
- **PostgreSQL**: Patroni + etcd forms an automatic failover cluster, and `DB_URL` points at the Patroni VIP;
- **Cloud database**: use the vendor's MySQL / PostgreSQL HA instance directly and let the cloud platform handle primary/standby switchover.

```yaml
# The database service connection config in docker-compose-ha-opengauss.yaml (single-node example)
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

::: tip Write patterns are master/slave friendly
Kuboard writes system configuration using the "insert a new version + current flag" approach (10 versions of history are kept), which is low-frequency, lightweight writing; cluster capability detection is read-heavy and write-light. Compared to the write amplification of the control-plane K8s, Kuboard tolerates master/slave lag fairly well, but you should still monitor master/slave delay to avoid reading a stale value from a replica right after saving a configuration.
:::

## Official HA Orchestration Examples

### Redis Cluster + OpenGauss + Nginx (docker-compose-ha-opengauss.yaml)

The Redis cluster part (6 nodes, 3 masters and 3 replicas, password auth + AOF persistence):

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

Node configuration (injected via docker config, identical for all nodes):

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

The Nginx load balancer part (including the kuboard reverse proxy and WebSocket upgrades for cluster APIs):

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

### Redis Standalone + MySQL (docker-compose-mysql-redis.yaml)

The cache configuration of the single-replica production environment, shown for comparison:

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

## Failover Behavior

### A Single Kuboard Instance Goes Down

- The load balancer layer (nginx upstream) round-robins by default; when an instance refuses connections (connection refused), nginx automatically forwards the request to the next upstream instance, so service is not interrupted;
- Established WebSocket / SSE long connections break; after reconnecting, clients are distributed to a live instance by the load balancer (MCP clients typically reconnect and re-initialize);
- Because the instances are stateless, the remaining instances can serve requests independently (all cross-instance state lives in the database and Redis);
- It is recommended to add `restart: always` to the orchestration so a downed instance is pulled back up automatically, and to wire up monitoring and alerting.

### Redis Unavailable

Redis plays the role of "hard dependency with bounded degradation" in kuboard-server:

| Phase | Behavior |
|------|------|
| Startup | **Fail-fast, no automatic fallback**. `RedisConfig.lettuceConnectionFactory` establishes the connection immediately at startup; if Redis is unreachable it directly throws `BeanCreationException: ... Unable to connect to Redis`; when OIDC is enabled with `RedisOidcStateStore`, `OidcStartupValidator` also does a PING liveness probe that likewise fails fast. This is a deliberate design choice (operator-controllable, avoiding silent fallback to a single node) |
| Runtime | Features that depend on Redis are affected — shared cache reads/writes, cross-instance MCP SSE Pub/Sub, OIDC state, global rate limiting; **features that do not depend on Redis are unaffected** — change approval plan / approvalToken use the database as the single source of truth, so approval and execution keep working as long as the database is healthy |
| Recovery | Once Redis is back, instances reconnect automatically (Lettuce connection pool); if Redis takes a long time to recover, you can set `KUBOARD_CACHE_PROVIDER` back to `caffeine` and restart (note: cross-instance state such as SSE subscriptions / OIDC state / global rate limiting is briefly lost, and MCP clients may see push interruptions and need to re-establish subscriptions) |

### Database Failure

- Multiple replicas cannot compensate for a database failure: all of Kuboard's business data, system configuration, and change approval plans are persisted in the database;
- During database primary/standby switchover, reads and writes that depend on the database fail until the new primary is available (the connection pool recovers automatically);
- Use a highly available database solution (see above) and run backup and restore drills for the database (see [Upgrade and Backup](./upgrade)).

### Recovery Checklist

- Keep the environment variables of all replicas consistent, especially `KUBOARD_CACHE_PROVIDER` / `KUBOARD_CACHE_REDIS_*`;
- Configure `max_fails` / `fail_timeout` for the nginx upstream, or switch to a load balancer with active health checks;
- Monitor three things: Redis connectivity and memory, database master/slave status, and Kuboard instance health (`/actuator/health`, management port defaults to 9091);
- When upgrading / scaling, roll the replicas one at a time: restart one replica, confirm it is healthy, then proceed to the next (MCP sessions and SSE connections are rebuilt per instance, avoiding a complete simultaneous interruption).

## Related Documentation

- [Quick Start](./quickstart) — single-node deployment
- [Reverse Proxy](./reverse-proxy) — HTTPS and WebSocket configuration
- [Upgrade](./upgrade) — version upgrade and data backup
- [Installation Index](./index) — other deployment scenarios
