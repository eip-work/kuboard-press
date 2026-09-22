---
description: 升级 Kuboard V4 到新版本：更换镜像 Tag、数据库 Schema 自动迁移、升级步骤与回滚策略
---

# 升级 Kuboard V4

升级 Kuboard V4 只需两步：更换镜像 Tag 并重建容器。启动时数据库 Schema 自动迁移，数据卷不变。本文介绍镜像 Tag 方案、升级步骤与回滚策略。

::: tip 适用读者

- 使用 [docker compose 快速开始](./quickstart) 或 [安装指南](./index) 部署的单机实例；
- 使用 [高可用部署](./ha) 部署的多副本实例（迁移机制相同）；
- 从 Kuboard v3 升级的读者请参考 [从 v3 迁移](./migration-from-v3)：v3 与 v4 架构不兼容，不能直接升级。

:::

## 镜像 Tag 方案

Kuboard V4 镜像发布在以下两个仓库：

| 仓库 | 说明 |
| --- | --- |
| `eipwork/kuboard` | Docker Hub 官方仓库 |
| `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard` | 华为云 SWR 仓库 |

每个仓库发布如下几种 Tag：

| Tag 类型 | 示例 | 说明 |
| --- | --- | --- |
| 固定版本 Tag | `v4.2.2.0` | 形如 `v4.x.y.z`，内容不可变，**升级 / 回滚都应当使用它** |
| 滚动 Tag | `v4` | 始终指向最新版本，便于快速体验，不适合生产环境锁定 |
| 架构专用 Tag（仅华为云仓库） | `v4-amd64`、`v4-arm64`、`v4.2.2.0-amd64` | 单架构镜像；`v4` 与 `v4.x.y.z` 为多架构清单（manifest），按运行平台自动选择架构 |

::: tip 生产环境建议

- 生产环境使用**固定版本 Tag**（如 `v4.2.2.0`）部署和升级，不要使用滚动 Tag `v4`；
- 升级时只做「从旧版本 Tag 切到新版本 Tag」，这样回滚时能精确回到上一个已知良好的版本。

:::

### docker compose 中的 Tag 位置

`deploy/docker-compose/` 目录下的所有 compose 文件，Kuboard 服务的镜像统一写作：

```yaml
image: ${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}
```

两个变量定义在同目录的 `.env` 文件中：

```bash
KUBOARD_IMAGE_REPO=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard
KUBOARD_VERSION=v4.2.2.0
```

- `KUBOARD_IMAGE_REPO`：镜像仓库地址，按网络环境填 `eipwork/kuboard` 或华为云 SWR 地址；
- `KUBOARD_VERSION`：**升级时只需修改这个变量**，指向新版本 Tag。

仓库内 `.env` 的示例值 `192.168.3.109:5001/kuboard` 是内部私有仓库地址，仅用于开发环境；生产环境请使用公开仓库地址。

使用 `docker run` 单容器方式部署的用户（见 [安装指南](./index)），把启动命令中的镜像 Tag 直接换成新版本即可，其余环境变量保持不变。

## 数据库 Schema 自动迁移

新版本启动时自动执行数据库 Schema 迁移（DDL），无需手工执行 SQL；迁移脚本幂等（idempotent），可跨多个小版本直接升级，无需逐版本升级。

::: tip

「启动成功」即代表数据库结构已就绪：迁移在应用对外提供服务之前自动完成，多副本同时启动也不会冲突。无需手工执行任何 SQL，但升级前仍建议备份数据库（命令见下文「升级前准备」）。

:::

## 升级前准备

### 备份数据库

- MySQL / MariaDB：

  ```sh
  mysqldump -h <db_host> -ukuboard -p --single-transaction kuboard > kuboard-backup-$(date +%F).sql
  ```

- PostgreSQL / OpenGauss：

  ```sh
  pg_dump -h <db_host> -U kuboard kuboard > kuboard-backup-$(date +%F).sql
  ```

### 确认数据目录完整

::: warning

升级只重建 Kuboard 容器，数据库、Redis 与日志数据目录不会被碰。切勿执行 `docker compose down -v`，也不要删除或 `rm -rf` 数据目录，否则数据将丢失。数据目录清单见下文「数据卷保留」。

:::

## 升级步骤（docker compose 方式）

以下以 [快速开始](./quickstart) 的 `docker-compose-mysql-redis.yaml` 为例，其他 compose 文件（MariaDB、高可用等方案）操作完全相同。

### 步骤 1：备份数据库

按上文「备份数据库」执行，并把备份文件放到数据目录之外保存。

### 步骤 2：更换镜像 Tag

修改 `deploy/docker-compose/.env`，把 `KUBOARD_VERSION` 改为目标版本：

```bash
KUBOARD_IMAGE_REPO=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard
KUBOARD_VERSION=v4.2.2.0
```

### 步骤 3：拉取新镜像

```sh
docker compose -f docker-compose-mysql-redis.yaml pull kuboard
```

### 步骤 4：启动（重建容器）

```sh
docker compose -f docker-compose-mysql-redis.yaml up -d
```

由于镜像 Tag 发生了变化，compose 会重建 kuboard 容器；数据库与 Redis 容器不受影响、不会重建。若担心停服窗口，可先执行 `docker compose -f docker-compose-mysql-redis.yaml stop kuboard`，再执行上面的 `up -d`。单实例部署下，容器重建的停机时间通常只有几秒。

### 步骤 5：观察迁移日志

```sh
docker compose -f docker-compose-mysql-redis.yaml logs -f kuboard
```

启动日志中可看到数据库迁移执行记录；若出现 `执行 SQL 文件失败` 的 error 日志则迁移异常。迁移完成后应用正常就绪，compose 健康检查（`curl -f http://localhost:80/`）通过。

::: warning 迁移失败时的行为

迁移遇到异常时容器会启动失败，处于退出 / 重启循环状态，不会带病运行。此时请保留日志排查，必要时回滚到旧版本 Tag（见下文「回滚策略」）。

:::

### 步骤 6：验证

- 访问 Kuboard 界面（compose 示例映射为 `http://localhost:8000`），确认登录、集群列表、名称空间等核心功能正常；
- 检查新版本发布说明中列出的新增功能入口是否存在。

## 升级注意事项

### 数据卷保留

**升级只重建 kuboard 容器，绝不能删除以下目录**：

| 部署方案 | 目录（相对 compose 文件） | 内容 |
| --- | --- | --- |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-mysql/` | MySQL 数据 |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-redis/` | Redis 数据 |
| 所有方案 | `<方案>-data/kuboard-logs/`（如 `./docker-compose-mysql-redis-data/kuboard-logs/`） | Kuboard 日志 |
| `docker-compose-ha-opengauss.yaml` | `./docker-compose-ha-opengauss-data/kuboard-opengauss/`、`redis-master/`、`redis-slave/` | HA 数据库与 Redis 数据 |

### 环境变量一致性

升级时**只改 `KUBOARD_VERSION`**（以及必要时改 `KUBOARD_IMAGE_REPO`），不要顺手改动数据库相关环境变量。compose 中 kuboard 服务的环境变量如下（`docker-compose-mysql-redis.yaml`）：

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

- `DB_*` 指向同一个数据库实例（数据卷未动），改动会导致新容器连不上原有数据；
- `TZ`、`KUBOARD_CACHE_*` 等与版本无关，保持一致即可；
- `KUBOARD_CACHE_PROVIDER` 只影响运行时的缓存（内存缓存或 Redis 分布式缓存，见 [高可用部署](./ha)），切换缓存方式不会触发任何数据迁移，与数据库结构无关。

### 高可用多副本场景

多个副本指向同一个数据库。建议逐个副本滚动升级：先升级一个副本，观察迁移日志正常后再升级其余副本，以缩小风险窗口。迁移脚本幂等，多副本并发迁移也不会冲突。

## 回滚策略

### 兼容性

升级脚本以增量变更为主（加列、建表、建索引），旧版本镜像在升级后的数据库结构上通常仍可运行，因此从任意旧版本直接升级到最新版本、以及升级后立即回滚都是可行的。

### 回滚步骤

```sh
# 1. 修改 .env，把 KUBOARD_VERSION 改回旧版本 Tag
# 2. 拉取旧镜像并重建容器
docker compose -f docker-compose-mysql-redis.yaml pull kuboard
docker compose -f docker-compose-mysql-redis.yaml up -d
# 3. 观察日志确认回滚版本正常启动
docker compose -f docker-compose-mysql-redis.yaml logs -f kuboard
```

### 迁移不可逆的风险提示

::: danger 回滚前请评估

- **没有降级脚本**：数据库结构一旦被新版本迁移，**不能通过「换回旧镜像」自动还原表结构**；
- **新数据格式不回退**：新版本运行期间写入的数据，旧版本代码可能无法理解，表现为功能异常或报错。

因此：升级前必须备份数据库（见「备份数据库」）；回滚只适合「升级后立即发现异常、新数据量很小」的场景；如果升级后已运行一段时间、产生大量新数据，优先选择**继续升级到最新版本修复问题**，而不是回滚。

:::

## 相关文档

- [安装 Kuboard V4](./index)
- [快速开始](./quickstart)
- [高可用部署](./ha)
- [从 v3 迁移](./migration-from-v3)