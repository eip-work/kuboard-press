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

## High-Availability Cache Parameters

Single-replica deployments do not need to configure this group of variables; for multi-replica (high-availability) deployments, set `KUBOARD_CACHE_PROVIDER` to `redis` and fill in the Redis connection information below.

| Environment Variable | Default Value | Description |
| --- | --- | --- |
| `KUBOARD_CACHE_PROVIDER` | `caffeine` | Cache provider: `caffeine` in-memory cache (single-replica mode only), `redis` distributed cache (multi-replica high availability) |
| `KUBOARD_CACHE_REDIS_MODE` | `standalone` | Redis connection mode: `standalone`, `sentinel` or `cluster` |
| `KUBOARD_CACHE_REDIS_NODES` | `localhost:6379` | Redis node addresses, comma-separated for multiple nodes, mode examples below |
| `KUBOARD_CACHE_REDIS_SENTINEL_MASTER` | `master` | Master name in Sentinel mode |
| `KUBOARD_CACHE_REDIS_PASSWORD` | empty | Password used to connect to Redis |
| `KUBOARD_CACHE_REDIS_DATABASE` | `0` | Redis database number |

Examples of `KUBOARD_CACHE_REDIS_NODES` written for each mode:

- `standalone`: `10.99.0.8:6379`
- `sentinel`: `10.99.0.10:6379,10.99.0.11:6379,10.99.0.12:6379`
- `cluster`: `10.99.0.20:6379,10.99.0.21:6379,10.99.0.22:6379`

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