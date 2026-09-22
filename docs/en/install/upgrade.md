---
description: "Upgrade Kuboard V4 to a new version: change the image tag, automatic database schema migration, upgrade steps and rollback strategy"
---

# Upgrading Kuboard V4

Upgrading Kuboard V4 requires only two steps: change the image tag and recreate the container. On startup the database schema migrates automatically, and the data volumes stay unchanged. This article covers the image tag strategy, the upgrade steps and the rollback strategy.

::: tip Intended audience

- Single-node instances deployed with the [docker compose quick start](./quickstart) or the [Installation Guide](./index);
- Multi-replica instances deployed with the [High Availability (HA) Deployment](./ha) (the migration mechanism is the same);
- Readers upgrading from Kuboard v3 should refer to [Migrating from v3](./migration-from-v3): the architectures of v3 and v4 are incompatible and cannot be upgraded directly.

:::

## Image Tag Strategy

Kuboard V4 images are published in the following two registries:

| Registry | Description |
| --- | --- |
| `eipwork/kuboard` | Official Docker Hub registry |
| `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard` | Huawei Cloud SWR registry |

Each registry publishes the following types of tag:

| Tag type | Example | Description |
| --- | --- | --- |
| Fixed version tag | `v4.2.2.0` | Of the form `v4.x.y.z`; the content is immutable. **Use it for upgrade / rollback** |
| Rolling tag | `v4` | Always points to the latest version for a quick trial; not suitable for locking down a production environment |
| Architecture-specific tag (Huawei Cloud registry only) | `v4-amd64`, `v4-arm64`, `v4.2.2.0-amd64` | Single-architecture images; `v4` and `v4.x.y.z` are multi-architecture manifests that select the architecture automatically based on the running platform |

::: tip Production recommendation

- In production, deploy and upgrade with the **fixed version tag** (e.g. `v4.2.2.0`), not the rolling tag `v4`;
- When upgrading, only do "switch from the old version tag to the new version tag", so that on rollback you can return precisely to the last known good version.

:::

### Tag Location in a docker compose Deployment

In all compose files under the `deploy/docker-compose/` directory, the Kuboard service image is uniformly written as:

```yaml
image: ${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}
```

The two variables are defined in the `.env` file in the same directory:

```bash
KUBOARD_IMAGE_REPO=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard
KUBOARD_VERSION=v4.2.2.0
```

- `KUBOARD_IMAGE_REPO`: the image registry address; fill in `eipwork/kuboard` or the Huawei Cloud SWR address according to your network environment;
- `KUBOARD_VERSION`: **on upgrade you only need to change this variable** to point to the new version tag.

The sample value `192.168.3.109:5001/kuboard` in the repository's `.env` is an internal private registry address, used only for development; use a public registry address in production.

Users who deployed with a single container via `docker run` (see the [Installation Guide](./index)) can simply replace the image tag in the startup command with the new version, keeping all other environment variables unchanged.

## Automatic Database Schema Migration

On startup, the new version automatically performs the database schema migration (DDL); no manual SQL is needed. The migration scripts are idempotent, so you can upgrade directly across several minor versions without upgrading version by version.

::: tip

"Startup succeeded" means the database schema is ready: the migration finishes automatically before the application starts serving traffic, and multiple replicas starting at the same time do not conflict. No manual SQL is needed, but backing up the database before the upgrade is still recommended (commands below in "Pre-upgrade Preparation").

:::

## Pre-upgrade Preparation

### Back Up the Database

- MySQL / MariaDB:

  ```sh
  mysqldump -h <db_host> -ukuboard -p --single-transaction kuboard > kuboard-backup-$(date +%F).sql
  ```

- PostgreSQL / OpenGauss:

  ```sh
  pg_dump -h <db_host> -U kuboard kuboard > kuboard-backup-$(date +%F).sql
  ```

### Confirm the Data Directories Are Intact

::: warning

The upgrade only recreates the Kuboard container; the database, Redis and log data directories are not touched. Never run `docker compose down -v`, and do not delete or `rm -rf` the data directories, or the data will be lost. The list of data directories is in "Data Volume Retention" below.

:::

## Upgrade Steps (docker compose)

The following uses the `docker-compose-mysql-redis.yaml` from the [docker compose quick start](./quickstart) as an example; the other compose files (MariaDB, HA, etc.) work in exactly the same way.

### Step 1: Back Up the Database

Run a backup following "Back Up the Database" above, and keep the backup file outside the data directories.

### Step 2: Change the Image Tag

Edit `deploy/docker-compose/.env` and set `KUBOARD_VERSION` to the target version:

```bash
KUBOARD_IMAGE_REPO=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard
KUBOARD_VERSION=v4.2.2.0
```

### Step 3: Pull the New Image

```sh
docker compose -f docker-compose-mysql-redis.yaml pull kuboard
```

### Step 4: Start (Recreate the Container)

```sh
docker compose -f docker-compose-mysql-redis.yaml up -d
```

Because the image tag has changed, compose recreates the kuboard container; the database and Redis containers are not affected and are not recreated. If you are worried about a service outage window, run `docker compose -f docker-compose-mysql-redis.yaml stop kuboard` first, and then run the `up -d` above. In a single-instance deployment, the downtime caused by container recreation is usually only a few seconds.

### Step 5: Observe the Migration Logs

```sh
docker compose -f docker-compose-mysql-redis.yaml logs -f kuboard
```

The startup logs show the migration execution records; if an error log message about failing to execute an SQL file appears (the application's log messages are output in Chinese; the equivalent English message is "failed to execute SQL file"), the migration is abnormal. After the migration finishes, the application becomes ready normally, and the compose health check (`curl -f http://localhost:80/`) passes.

::: warning Behavior when the migration fails

When the migration hits an exception, the container fails to start and stays in an exited / restart-loop state; it never runs in a degraded state. In this case, keep the logs for troubleshooting, and if necessary roll back to the old version tag (see "Rollback Strategy" below).

:::

### Step 6: Verify

- Open the Kuboard UI (mapped to `http://localhost:8000` in the compose example) and confirm the core features work normally: login, cluster list, namespaces, etc.;
- Check whether the entries for the new features listed in the new-version release notes exist.

## Upgrade Notes

### Data Volume Retention

**The upgrade only recreates the kuboard container; never delete the following directories**:

| Deployment plan | Directory (relative to the compose file) | Contents |
| --- | --- | --- |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-mysql/` | MySQL data |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-redis/` | Redis data |
| All plans | `<plan>-data/kuboard-logs/` (e.g. `./docker-compose-mysql-redis-data/kuboard-logs/`) | Kuboard logs |
| `docker-compose-ha-opengauss.yaml` | `./docker-compose-ha-opengauss-data/kuboard-opengauss/`, `redis-master/`, `redis-slave/` | HA database and Redis data |

### Environment Variable Consistency

During an upgrade, **change only `KUBOARD_VERSION`** (and `KUBOARD_IMAGE_REPO` when necessary); do not casually change the database-related environment variables. The environment variables of the kuboard service in the compose file are as follows (`docker-compose-mysql-redis.yaml`):

```yaml
environment:
  - DB_DRIVER=com.mysql.cj.jdbc.Driver
  - DB_URL=jdbc:mysql://db:3306/kuboard?serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
  - DB_USERNAME=kuboard
  - DB_PASSWORD=kuboardpwd
  - KUBOARD_CACHE_PROVIDER=redis
  - KUBOARD_CACHE_REDIS_MODE=standalone
  - KUBOARD_CACHE_REDIS_NODES=redis:6379
  - KUBOARD_CACHE_REDIS_PASSWORD=Kuboard123
```

- The `DB_*` variables point to the same database instance (the data volumes have not been touched); changing them would make the new container unable to connect to the existing data;
- `TZ`, `KUBOARD_CACHE_*`, etc. are unrelated to the version; keeping them unchanged is fine;
- `KUBOARD_CACHE_PROVIDER` only affects the runtime cache (in-memory cache or Redis distributed cache, see [High Availability (HA) Deployment](./ha)); switching the cache mode does not trigger any data migration and has nothing to do with the database schema.

### High-Availability Multi-replica Scenario

Multiple replicas point to the same database. It is recommended to roll the replicas one at a time: upgrade one replica first, confirm the migration logs are normal, then upgrade the remaining replicas, to narrow the risk window. The migration scripts are idempotent, so concurrent migration across replicas does not conflict either.

## Rollback Strategy

### Compatibility

Upgrade scripts are mainly incremental changes (adding columns, tables, and indexes), so an old-version image can usually still run on the upgraded database schema. Therefore, upgrading directly from any old version to the latest version, as well as rolling back immediately after an upgrade, are both feasible.

### Rollback Steps

```sh
# 1. Edit .env and set KUBOARD_VERSION back to the old version tag
# 2. Pull the old image and recreate the container
docker compose -f docker-compose-mysql-redis.yaml pull kuboard
docker compose -f docker-compose-mysql-redis.yaml up -d
# 3. Observe the logs to confirm the rolled-back version starts normally
docker compose -f docker-compose-mysql-redis.yaml logs -f kuboard
```

### Risk Warning: the Migration Is Not Reversible

::: danger Evaluate before rolling back

- **There are no downgrade scripts**: once the schema has been migrated by the new version, **"switching back to the old image" cannot automatically restore the table structure**;
- **New data formats do not roll back**: data written while the new version runs may be unreadable by the old-version code, manifesting as broken features or errors.

Therefore: you must back up the database before upgrading (see "Back Up the Database"); rollback is only suitable for "an anomaly found immediately after the upgrade, with a very small amount of new data"; if the new version has been running for a while and a lot of new data has been produced, prefer **continuing to upgrade to the latest version to fix the problem** rather than rolling back.

:::

## Related Documentation

- [Install Kuboard V4](./index)
- [Quick Start](./quickstart)
- [High Availability (HA) Deployment](./ha)
- [Migrating from v3](./migration-from-v3)