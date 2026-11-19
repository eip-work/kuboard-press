---
description: "Deploy Kuboard v4 inside a Kubernetes cluster: single instance, multi-replica high availability, external database and Redis, ingress exposure, and post-deployment checks"
---

# Deploy Kuboard v4 on Kubernetes

Run Kuboard v4 as a workload inside your Kubernetes cluster: data lives on a PVC or in an external database, and multiple replicas share state through Redis.

Audience: platform and operations engineers who already have a Kubernetes cluster (1.15 or later) and can pull container images.

## Prerequisites

| Item | Requirement |
|---|---|
| Kubernetes | 1.15 to 1.37 (the same range Kuboard v4 supports) |
| Images | `kuboard:v4`; the bundled database needs `mariadb:11.3.2-jammy`; high availability also needs `redis:7.2-alpine` |
| Storage | The default StorageClass can provide `ReadWriteOnce` volumes (10Gi for the database, 5Gi for Redis) |
| Database | The bundled MariaDB, or an external MySQL 5.7+ / MariaDB 8.0+ / PostgreSQL 12+ / openGauss 3.0+ |

::: tip How this differs from the docker compose installation
The Kuboard container listens on port 80 and receives all connection settings through environment variables. The container itself is disposable, so upgrades are just a new image plus a rolling update.
:::

## Option 1: Single instance with the bundled database

Save the manifest below as `kuboard.yaml` (adjust passwords and the storage class), run `kubectl apply -f kuboard.yaml`, wait until both pods are `Running`, then open `http://<any node IP>:30080` and sign in with `admin` / `Kuboard123`, and change the password.

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
  strategy: { type: Recreate }        # a ReadWriteOnce volume cannot be rolled; stop the old pod first
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
        - name: wait-for-db          # wait for the port so the pod does not crash-loop
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
            - { name: JVM_XMX, value: 1536M }      # about 75% of the memory limit
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

## Option 2: Multiple replicas for high availability

Kuboard replicas are stateless. Cross-instance state (login sessions, permission and menu caches, scheduler leader election) lives in a shared Redis, so you can simply add replicas:

| Change | How |
|---|---|
| Replica count | `replicas: 2` (or more) with `maxUnavailable: 0` for rolling updates |
| Shared cache | `KUBOARD_CACHE_PROVIDER=redis` pointing at the same Redis |
| No maintenance downtime | `PodDisruptionBudget` with `minAvailable: 1`, plus pod anti-affinity between replicas |

A minimal in-cluster Redis (production should use a managed Redis service or a Redis Operator):

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

Then add these environment variables to the Kuboard Deployment from Option 1 and raise its replica count to 2:

```yaml
env:
  - { name: KUBOARD_CACHE_PROVIDER, value: redis }
  - { name: KUBOARD_CACHE_REDIS_MODE, value: standalone }
  - { name: KUBOARD_CACHE_REDIS_NODES, value: redis:6379 }
  - name: KUBOARD_CACHE_REDIS_PASSWORD
    valueFrom: { secretKeyRef: { name: kuboard-v4-redis, key: password } }
```

::: warning All replicas must use the same Redis
If replicas use different databases or different key prefixes, login sessions, permission caches and the scheduler leader will diverge (you will see "signed out when switching pages" or "sync tasks running twice"). Every replica of one deployment must use exactly the same connection settings.
:::

::: tip Sharing one Redis across deployments / other variables
When several Kuboard deployments share one Redis, set a distinct `KUBOARD_CACHE_REDIS_KEY_PREFIX` (for example `prod` / `staging`). See [High Availability — Redis Environment Variable Reference](./ha#redis-environment-variable-reference) for the full list of variables in all three modes (standalone / sentinel / cluster).
:::

## Option 3: External database and Redis

If you already have a managed database and Redis, deploy only Kuboard: drop the bundled database and Redis objects from the example and keep the connection settings in a Secret or ConfigMap.

Prerequisite: create the database (for example `kuboard`) and its account first. On first start Kuboard creates the tables and runs upgrade scripts automatically, so the account needs create / alter / index / CRUD permissions on that database.

| Environment variable | Example | Notes |
|---|---|---|
| `DB_DRIVER` | `org.mariadb.jdbc.Driver` | Use `com.mysql.cj.jdbc.Driver` for MySQL and `org.postgresql.Driver` for PostgreSQL |
| `DB_URL` | `jdbc:mariadb://db.example.com:3306/kuboard?serverTimezone=Asia/Shanghai` | Point at the external instance; PostgreSQL looks like `jdbc:postgresql://db.example.com:5432/kuboard` |
| `DB_USERNAME` / `DB_PASSWORD` | `kuboard` / `<password>` | Keep the password in a Secret |
| `KUBOARD_CACHE_PROVIDER` | `redis` | Required for multiple replicas |
| `KUBOARD_CACHE_REDIS_MODE` / `NODES` | `standalone` / `redis.example.com:6379` | Choose `standalone` / `sentinel` / `cluster` as your provider requires; separate multiple nodes with commas |
| `KUBOARD_CACHE_REDIS_PASSWORD` | `<password>` | Leave empty when there is no password; an empty username is equivalent to the `default` user |
| `KUBOARD_CACHE_REDIS_KEY_PREFIX` | `prod` | Required when several Kuboard deployments share one Redis |
| `KUBOARD_DDL_LOCK_TIMEOUT_SECONDS` | `300` | Longest wait, in seconds, for another replica to finish table creation / upgrades during a simultaneous start |

::: warning Keep the upgrade window away from database failovers
First installs and major upgrades create tables and run upgrade scripts, and replicas serialize this work through a database-level lock. Increase `KUBOARD_DDL_LOCK_TIMEOUT_SECONDS` when the database is large or the network is slow, and do not trigger a primary/secondary switch during an upgrade.
:::

## Exposing Kuboard: NodePort and Ingress

| Option | Use it for | Notes |
|---|---|---|
| NodePort | Verification and temporary internal access | Open `http://<node IP>:30080`; the port comes from the high port range |
| Ingress | Production | Terminate TLS on a domain and share one 80/443 entry point across services |

Kuboard relies on long-lived connections (terminals, logs, MCP push). Configure the ingress properly, otherwise you will see "the terminal disconnects after a minute" or "logs stop streaming":

| Requirement | ingress-nginx setting |
|---|---|
| WebSocket upgrade | `nginx.ingress.kubernetes.io/proxy-http-version: "1.1"` |
| Long connections stay open | Set `proxy-read-timeout` / `proxy-send-timeout` to `"3600"` |
| Real-time SSE and logs | `proxy-buffering: "off"` |
| Large YAML and objects | `proxy-body-size: "50m"` |
| Multi-namespace lists (32KB headers) | Controller ConfigMap: `large-client-header-buffers: "4 32k"` and `client-header-buffer-size: "32k"` |

See [Reverse Proxy — Ingress Configuration Example](./reverse-proxy#ingress-configuration-example) for the complete Ingress object (TLS, file upload limits, and so on).

## Verify the deployment

| Check | Command | Expected |
|---|---|---|
| Pods ready | `kubectl -n kuboard get pods` | All `Running` with `RESTARTS` at 0 |
| Landing page reachable | `curl -s -o /dev/null -w '%{http_code}' http://<node IP>:30080/` | `200` |
| Sign-in | Open the entry point and use `admin` / `Kuboard123` | You land on the home page and are asked to change the password |
| Terminal and logs | Any cluster → Pods → Terminal | A shell opens and logs keep streaming |
| Persistence | Delete the database pod, then sign in again | Data and accounts are still there |

## Upgrade and cleanup

- **Upgrade**: change the image tag and run `kubectl apply` again. With multiple replicas the rolling update keeps the UI available. Back up the database first.
- **Backup**: back up the PVC or take a volume snapshot for the bundled database; use the provider's backup feature for an external database.
- **Cleanup**: `kubectl delete -f kuboard.yaml`. PVCs are retained by default; delete them only after confirming the data is no longer needed, otherwise a redeploy starts with an empty database.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Kuboard pod is `CrashLoopBackOff` and the log shows a refused connection | The database is not ready yet, or the password differs from the Secret | Wait for the port with an initContainer (as above) and check the Secret against `DB_URL` |
| Startup fails with `NOAUTH` or cannot connect to Redis | Wrong Redis password, or `requirepass` set on Sentinel (Kuboard does not authenticate to Sentinel) | Fix the password; remove `requirepass` from Sentinel and use `sentinel auth-pass` for replication |
| The terminal disconnects after about a minute and logs stop updating | The gateway times out at 60 seconds or buffers responses | Adjust the Ingress timeouts and `proxy-buffering` as shown above |
| Resource list pages return 400 / 414 | The gateway still limits request headers to 8k | Raise the controller header buffers to at least 32k |
| File uploads return 413 | The gateway limits request bodies to 1m | Raise `proxy-body-size` |

## Related documentation

- [Quick Start](./quickstart) — spin up an instance with docker compose
- [Installation Guide](./index) — database types, reverse proxy, and other deployment scenarios
- [High Availability](./ha) — multi-replica topology, Redis variables, and failover behavior
- [Reverse Proxy](./reverse-proxy) — complete Nginx and Ingress samples
- [Upgrade Kuboard](./upgrade) — version upgrades and data backups
