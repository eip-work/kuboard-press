---
description: "Reference list of environment variables for deploying Kuboard v4: database connection, high-availability cache, timezone and port configuration with defaults"
---

# Kuboard v4 Environment Variables

When deploying Kuboard v4, the configurable environment variables cover database connection, cache, timezone and port. The sections below list all variables and their default values by purpose.

::: tip Where to set
These environment variables go into the `env` field of the `docker-compose.yaml` or Kubernetes Deployment used to deploy Kuboard. See the [Quickstart](../install/quickstart) for the deployment steps.
:::

All variables are optional; when not set, the defaults in the tables below apply. Only multi-replica (high-availability) deployments need to configure the `KUBOARD_CACHE_*` cache variables.

## Database Connection Parameters

| Environment Variable | Default Value | Description |
| --- | --- | --- |
| `DB_DRIVER` | `com.mysql.cj.jdbc.Driver` | Database driver, chosen according to the connected database, see examples below |
| `DB_URL` | `jdbc:mysql://localhost:3306/kuboard` | Database connection string, written according to the selected database, see examples below |
| `DB_USERNAME` | `kuboard` | Database username |
| `DB_PASSWORD` | `Kuboard123` | Database password |

Fill in `DB_DRIVER` and `DB_URL` according to the database type:

- MySQL: driver `com.mysql.cj.jdbc.Driver`, connection string `jdbc:mysql://10.99.0.8:3306/kuboard?serverTimezone=Asia/Shanghai`
- MariaDB: driver `org.mariadb.jdbc.Driver`, connection string `jdbc:mariadb://10.99.0.8:3306/kuboard?&timezone=Asia/Shanghai`
- OpenGauss: driver `org.postgresql.Driver`, connection string `jdbc:postgresql://localhost:5432/kuboard?currentSchema=kuboard&characterEncoding=UTF8`

### Connection Pool Parameters

Sync-task writes and all HTTP requests share the same connection pool, so when connections run short, requests queue and wait. The pool defaults suit a medium-sized deployment and usually needs no change; raise it when you run many clusters, hold large object counts (e.g. hundreds of thousands of Pods in one cluster), or have seen "failed to obtain a connection" on the database side.

| Environment Variable | Default Value | Description |
| --- | --- | --- |
| `DB_POOL_MAX_SIZE` | `32` | Maximum number of connections in the pool. Under heavy sync writes the pool can fill up so that even the scheduler cannot get a connection — raise it if that happens |
| `DB_POOL_MIN_IDLE` | `8` | Minimum number of idle connections kept in the pool |
| `DB_POOL_CONNECTION_TIMEOUT_MS` | `30000` | Longest wait (ms) to obtain a connection from the pool; timing out fails fast instead of piling up threads |
| `DB_POOL_IDLE_TIMEOUT_MS` | `600000` | How long (ms) an idle connection is kept before being reclaimed (10 minutes by default). Connections stay borrowed during bulk writes, so do not set it too short |
| `DB_POOL_MAX_LIFETIME_MS` | `1800000` | Maximum lifetime (ms) of a connection (30 minutes by default) |

::: tip Sizing the pool
For multi-replica deployments the sum of all instances' connections must stay below the database's limit: keep **instances × `DB_POOL_MAX_SIZE`** under the database's `max_connections`, leaving headroom for admin tooling. For example, with a database limit of 500 and 3 replicas, keep each instance at 100 or below.
:::

## High-Availability Cache Parameters

Single-replica deployments do not need to configure this group of variables; for multi-replica (high-availability) deployments, set `KUBOARD_CACHE_PROVIDER` to `redis` and fill in the Redis connection information below.

| Environment Variable | Default Value | Description |
| --- | --- | --- |
| `KUBOARD_CACHE_PROVIDER` | `caffeine` | Cache provider: `caffeine` in-memory cache (single-replica mode only), `redis` distributed cache (multi-replica high availability) |
| `KUBOARD_CACHE_REDIS_MODE` | `standalone` | Redis connection mode: `standalone`, `sentinel` or `cluster` |
| `KUBOARD_CACHE_REDIS_NODES` | `localhost:6379` | Redis node addresses, comma-separated for multiple nodes, mode examples below |
| `KUBOARD_CACHE_REDIS_SENTINEL_MASTER` | `master` | Master name in Sentinel mode |
| `KUBOARD_CACHE_REDIS_USERNAME` | empty | Redis 6+ ACL username; empty means the `default` user (`AUTH <password>` only) |
| `KUBOARD_CACHE_REDIS_PASSWORD` | empty | Password used to connect to Redis |
| `KUBOARD_CACHE_REDIS_DATABASE` | `0` | Redis database number |
| `KUBOARD_CACHE_REDIS_KEY_PREFIX` | empty | Deployment-level prefix for Redis keys. Required when several Kuboard deployments share the same Redis database (e.g. `prod` / `staging`); only letters, digits, `.`, `_` and `-` are allowed — see the section below |

Examples of `KUBOARD_CACHE_REDIS_NODES` written for each mode:

- `standalone`: `10.99.0.8:6379`
- `sentinel`: `10.99.0.10:6379,10.99.0.11:6379,10.99.0.12:6379`
- `cluster`: `10.99.0.20:6379,10.99.0.21:6379,10.99.0.22:6379`

### Several Kuboard deployments sharing one Redis

Every key Kuboard writes to Redis carries a **deployment-level prefix** (the `KUBOARD_CACHE_REDIS_KEY_PREFIX` environment variable). It covers the shared caches (menu / authority / system config, ...), the scheduler leader lease, the SnowFlake slots, the JWT blacklist, the OIDC login state, the log buffer, the MCP sessions and rate limits, as well as every Pub/Sub channel.

For a single deployment, **leave it empty** — with an empty prefix the keys are byte-for-byte identical to the ones used before, so an upgrade neither clears caches, nor re-elects the scheduler leader, nor interrupts SSE subscriptions.

**When it is required**: two or more Kuboard deployments run against the same Redis database (production + staging, two tenants, several compose stacks on one host). Without isolation they interfere with each other:

- only one of them can hold the scheduler leader lease; the other one's sync scheduling / health checks / audit table creation stop entirely;
- the menu / authority / system-config caches overwrite each other (visible as "permissions leaking between deployments");
- page events (SSE) are delivered to both deployments.

**How to set it** (pick one, a prefix is preferred):

```yaml
environment:
  - KUBOARD_CACHE_REDIS_KEY_PREFIX=prod # only A-Z a-z 0-9 . _ - allowed
  # or: - KUBOARD_CACHE_REDIS_DATABASE=3 # standalone / sentinel only, ignored in cluster mode
```

- The prefix may only contain letters, digits, `.`, `_` and `-`; a value containing a colon or braces is ignored and reported as a warning in the startup log (it would otherwise change the Redis Cluster slot computation);
- **All replicas of the same deployment must use the same value**;
- Once a prefix is set, the Redis ACL patterns for keys / channels must include that prefix as well.

**Switching the prefix requires a full restart**: the caches, leases and channels stored under the old prefix are invisible under the new one. During a rolling upgrade (`maxSurge ≥ 1`) the old and the new prefix coexist, and for up to 120 seconds (one leader lease TTL) **two scheduler leaders exist**. The change note should therefore say "stop every replica → change the prefix → start them together" instead of a rolling update.

**The prefix can also serve as a "cache value version"**: the values cached in Redis are JSON documents carrying type information. When a major upgrade changes the structure of the cached data, changing the prefix to a versioned value (e.g. `prod-v435`) makes the old values invisible without a manual `FLUSHDB`. Even without changing the prefix, a cache value that cannot be deserialized is automatically evicted and reloaded from its source, so an upgrade never fails to start because of stale cache content.

**How to verify**:

- the startup log prints `Redis key prefix = '<prefix>'`; when it is not set, a warning is logged instead (pointing out the risk of several deployments sharing one Redis);
- [Platform Health Diagnostics](../ops/health-diagnostics) reports "Redis keys have no deployment prefix" when a shared Redis is used without a prefix (informational, it does not affect the health score);
- operational self-check:

```sh
# Without a prefix there should be exactly one scheduler leader lease
redis-cli --scan --pattern 'kbd:scheduler:leader'
# With a prefix (example prefix=prod)
redis-cli --scan --pattern 'prod:*'
```

::: tip Newer keys have their own default prefix
The browser-side probe results (reverse-proxy probe, request-size probe) use `kbd` as their prefix when no deployment prefix is configured (e.g. `kbd:probe:proxy`); with a prefix configured they carry it like every other key.
:::

## Other Parameters

| Environment Variable | Default Value | Description |
| --- | --- | --- |
| `TZ` | `Asia/Shanghai` | Timezone used by Kuboard |
| `SERVER_PORT` | `80` | In-container service port; defaults to `9090` when running from local source, the external port in production is decided by docker / nginx (defaults to exposing `80`) |
| `KUBOARD_SWAGGER_ENABLED` | `true` | Whether to enable the Swagger UI API documentation, set to `false` to disable (access method see [OpenAPI interface documentation](./api)) |
| `KUBOARD_SPRING_BOOT_ADMIN_ENABLED` | `false` | Whether to enable the Spring Boot Admin monitoring page |
| `SERVER_MGMT_PORT` | `9091` | Spring Boot management endpoint port, generally no need to change |

## Troubleshooting

When you encounter startup failures, API errors, data synchronization mismatches and the like, troubleshoot with the three approaches in this section: check where logs are written, adjust the log level, and locate the logs of a single request by request ID.

### Log Output Locations

Kuboard writes logs to two locations:

| Location | Description |
| --- | --- |
| Console (full logs) | `docker logs kuboard` shows existing logs; `docker logs -f kuboard` follows them continuously |
| Host directory `kuboard-log/<hostname>/` (inside the container: `/app/logs/<hostname>/`) | Split by module into the files below |

| File | Content |
| --- | --- |
| `api/kuboard-log.log` | API call logs |
| `audit/kuboard-audit.log` | Audit log (requires enabling it under Settings → System Settings) |
| `sync/<cluster-id>.log` | Cluster cache synchronization logs |
| `health.log` | Cluster connection status logs |
| `main.log` | Startup logs |

### Setting the Log Level

Adjust the log level in the Kuboard UI under **Settings → System Settings → Log Parameter Settings**, as shown below:

<!-- screenshot-todo: Log parameter settings page under Settings / System Settings / Log Parameter Settings (capture with English UI) -->

### Finding Logs by Request ID

When the log volume in production is large and locating a single request is difficult, raise the log level for that request alone: add `kb-log-level` to the request header (one of `ERROR`/`WARN`/`INFO`/`DEBUG`/`TRACE`), the response header returns `kb-request-id`, and use that ID to filter out all logs of this request:

```sh
curl -v 'http://<kuboard-address>/api/cluster.kuboard.cn/v4/cluster?pageNum=1&pageSize=20' \
  -H 'kb-log-level: TRACE'
```
The `kb-request-id` in the response header (e.g. `1qZPF6iNMvC`) is the log identifier of this request; filter the logs by that ID:
```sh
docker logs kuboard | grep 1qZPF6iNMvC
```
::: tip Pod log interfaces
The Pod log viewing interface and the command-line terminal interface also allow temporarily adjusting the log level by appending the query parameter `kb_log_level` to the URL (same possible values as above).
:::
Log-related configuration (the audit switch, etc.) is covered in [Audit Log](../ops/audit-log).