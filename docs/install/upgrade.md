---
description: 升级 Kuboard V4 到新版本：镜像 Tag 方案、数据库 Schema 自动迁移、升级步骤与回滚策略
---

# 升级 Kuboard V4

本文描述如何将已部署的 Kuboard V4 实例升级到新版本。Kuboard V4 的升级模型非常简单：

- **镜像**：通过更换镜像 Tag（image tag）切换到新版本；
- **数据库**：新版本启动时由 `DdlService` 自动执行数据库 Schema 迁移（DDL），不需要手工执行 SQL；
- **数据**：升级前后数据库数据卷、Redis 数据卷与日志目录保持不变。

::: tip 适用读者

- 使用 [docker compose 快速开始](./quickstart) 或 [安装指南](./index) 部署的 Kuboard V4 单机实例；
- 使用 [高可用部署](./ha) 部署的多副本实例（迁移机制相同）；
- 从 Kuboard v3 升级的读者请参考 [从 v3 迁移](./migration-from-v3)，v3 与 v4 架构不兼容，不能直接升级。

:::

## 镜像 Tag 方案

Kuboard V4 的镜像发布在以下两个仓库：

| 仓库 | 说明 |
| --- | --- |
| `eipwork/kuboard` | Docker Hub 官方仓库 |
| `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard` | 华为云 SWR 仓库 |

每个仓库都会发布如下几种 Tag：

| Tag 类型 | 示例 | 说明 |
| --- | --- | --- |
| 固定版本 Tag | `v4.2.2.0` | 每次发版生成，形如 `v4.x.y.z`，内容不可变，**升级 / 回滚都应当使用它** |
| 滚动 Tag | `v4` | 始终指向最新版本，便于快速体验；跟随发版变化，不适合生产环境锁定 |
| 架构专用 Tag（仅华为云仓库） | `v4-amd64`、`v4-arm64`、`v4.2.2.0-amd64` 等 | 单架构镜像；`v4` 与 `v4.x.y.z` 为多架构 manifest（manifest），会按运行平台自动选择架构 |

::: tip 生产环境建议

- 生产环境使用**固定版本 Tag**（如 `v4.2.2.0`）部署和升级，不要使用滚动 Tag `v4`；
- 升级时只做"从旧版本 Tag 切到新版本 Tag"，这样回滚时能精确回到上一个已知良好的版本。

:::

### docker compose 部署中的 Tag 位置

`deploy/docker-compose/` 目录下的所有 compose 文件，Kuboard 服务的镜像统一写作：

```yaml
image: ${KUBOARD_IMAGE_REPO}:${KUBOARD_VERSION}
```

两个变量在同目录的 `.env` 文件中定义：

```bash
KUBOARD_IMAGE_REPO=192.168.3.109:5001/kuboard
KUBOARD_VERSION=v4.2.2.0
```

- `KUBOARD_IMAGE_REPO`：镜像仓库地址，按实际网络环境改成 `eipwork/kuboard` 或 `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard` 等；
- `KUBOARD_VERSION`：**升级时只需修改这个变量**，指向新版本 Tag。

::: warning 仓库地址与示例值的差异

仓库内 `.env` 的示例值 `192.168.3.109:5001/kuboard` 是内部私有仓库地址，仅用于开发环境；生产环境请使用公开仓库地址。

:::

使用 `docker run` 单容器方式部署的用户（见 [安装指南](./index)），升级时把启动命令中的镜像 Tag 直接换成新版本即可，例如将 `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4` 换成 `swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4.2.2.0`，其余环境变量保持不变。

## 数据库 Schema 自动迁移机制

Kuboard V4 不使用 Flyway / Liquibase 之类的迁移框架，也没有配置 JPA（`spring.jpa.hibernate.ddl-auto` 不存在，持久层为 MyBatis）。数据库 Schema 的创建与升级由 `kuboard-server` 中的 `cn.kuboard.ddl.DdlService` 全权负责。

### 迁移在什么时候执行

`DdlService` 实现了 Spring 的 `InitializingBean`，在 `afterPropertiesSet()` 中调用 `installDdl()`，也就是说：

- 迁移在 **Spring 容器初始化阶段、应用对外提供服务之前** 自动执行；
- 迁移失败（非"重复执行"类错误）会抛出 `KuboardException`（HTTP 500），**启动直接失败**，不会带病运行；
- 因此"启动成功"即代表"Schema 已就绪"，升级后无需额外步骤。

### 迁移脚本的清单与组织方式

`DdlService` 启动时从 classpath 读取迁移清单 `/ddl/script-list.yaml`，清单分为两段：

```yaml
install:
  - install/1-create-tables.sql
  - install/2-init-data.sql
upgrade:
  - upgrade/v4.0.0.0-beta.05/kb_u_key_secret.sql
  - upgrade/v4.0.0.0-rc.02/kb_license.sql
  - upgrade/v4.0.0.0/kb_cluster_sync_data.sql
  - upgrade/v4.1.0.0/optimize-performance.sql
  - upgrade/v4.2.2.0/kb_mcp_change_plan.sql
  # ... 后续版本依次追加
```

- `install` 段：建库建表 + 初始数据，只在"从零安装"时需要；
- `upgrade` 段：按版本目录（`upgrade/vX.Y.Z.W/`）组织的升级脚本，**新版本的 Schema 变更脚本以追加的方式登记在这里**；
- 脚本路径中的 `X.Y.Z.W` 即版本号，例如 `v4.2.5.0/kb_u_oidc_session_lock.sql`；
- 清单是"迁移逻辑的唯一来源"，新增版本的升级脚本放入目录并在清单登记后，服务启动即自动执行，**没有独立的版本号注册表**。

### 不同数据库方言

脚本按照 `/{方言}/` 目录平行组织，当前只有两套方言：

```text
kuboard-server/src/main/resources/ddl/
├── script-list.yaml     # 迁移清单（两种方言共用）
├── mysql/               # MySQL / MariaDB 方言
│   ├── install/
│   └── upgrade/vX.Y.Z.W/
└── postgre/             # PostgreSQL / OpenGauss 方言
    ├── install/
    └── upgrade/vX.Y.Z.W/
```

方言由 `cn.kuboard.config.DatabaseIdConfig` 在启动时根据 JDBC 元数据（`DatabaseProductName`）自动识别，映射关系来自 `application.yaml` 中的 `mybatis.databaseId`：

```yaml
mybatis:
  databaseId:
    mysql: mysql        # MySQL -> mysql 方言
    mariadb: mysql      # MariaDB -> mysql 方言
    postgresql: postgre # PostgreSQL / OpenGauss -> postgre 方言
```

| 数据库 | 识别的方言 | 说明 |
| --- | --- | --- |
| MySQL >= 5.7 | `mysql` | 与 MariaDB 共用同一套脚本 |
| MariaDB | `mysql` | 共用 mysql 方言脚本 |
| PostgreSQL | `postgre` | 独立一套脚本 |
| OpenGauss | `postgre` | OpenGauss 兼容 PostgreSQL 协议，使用 postgre 方言语法（与安装指南中的说明一致） |

::: warning 方言映射之外的数据类型

`mybatis.databaseId` 只映射了 `mysql`、`mariadb`、`postgresql` 三种产品名，其他数据库类型（例如仓库 `db/` 目录下 `db-dameng`、`db-kingbase` 提供的达梦、金仓开发容器）不在映射表中，`DatabaseIdConfig` 会抛出"不支持的数据库类型"错误，且 `ddl/` 下也没有对应的方言脚本目录。**目前 Schema 迁移仅覆盖 mysql / postgre 两套方言**。

:::

### 是否幂等

Kuboard 的迁移是"**每次启动全量重放 + 容忍重复执行错误**"的幂等策略，而不是"记录已执行版本、只跑增量"：

- 每次启动，`install` 与 `upgrade` 段的所有脚本都会按顺序重新执行一遍；
- `install` 段脚本大量使用 `CREATE TABLE IF NOT EXISTS`，重复建表天然安全；
- `upgrade` 段脚本多为 `ALTER TABLE ADD COLUMN`、`CREATE INDEX` 等，重复执行时由 `DdlService.executeSqlFile()` 捕获并放行以下错误：
  - `DuplicateKeyException`（数据重复插入，例如初始数据）；
  - `BadSqlGrammarException` 且错误信息包含 `already exists`、`Duplicate column name`、`Duplicate key name`（重复建列 / 建索引）；
  - 错误信息包含 `Unknown index`（删除不存在的索引时跳过）；
- 不同方言在写法上也有配合：例如 mysql 方言的 `v4.2.5.0/kb_u_oidc_session_lock.sql` 是裸 `ALTER TABLE ... ADD COLUMN`，靠运行时"重复列名"错误被吞掉实现幂等；而 postgre 方言同一脚本直接写 `ADD COLUMN IF NOT EXISTS`；
- 除上述"重复"类错误外，任何一条 SQL 执行失败都会记 `error` 日志（`执行 SQL 文件失败 <文件名>，第 N 条语句`）并使启动失败。

::: tip 对升级体验的影响

- 升级到新版本：新版本镜像自带的 `script-list.yaml` 包含新旧全部脚本，启动时自动补齐新版本的变更，**不需要"逐版本升级"**，跨多个小版本直接升级也是安全的；
- 多副本高可用：两个 Kuboard 副本同时启动、同时执行迁移也不会冲突（重复错误被容忍），见 [高可用部署](./ha)。

:::

### 备份建议

由于脚本以"重放 + 容忍重复"方式工作，理论上 Schema 迁移不需要人工干预。但升级属于有风险操作，建议执行升级前备份数据库：

- MySQL / MariaDB：

  ```sh
  mysqldump -h <db_host> -ukuboard -p --single-transaction kuboard > kuboard-backup-$(date +%F).sql
  ```

- PostgreSQL / OpenGauss：

  ```sh
  pg_dump -h <db_host> -U kuboard kuboard > kuboard-backup-$(date +%F).sql
  ```

同时确认存放数据库、Redis、日志的目录（见下文"数据卷保留"）没有被清理。

## 升级步骤（docker compose 方式）

以下以 [docker compose 快速开始](./quickstart) 的 `docker-compose-mysql-redis.yaml` 为例，其他 compose 文件（`docker-compose-mariadb.yaml`、`docker-compose-ha-opengauss.yaml`）操作完全相同。

### 步骤 1：备份数据库

按上一节"备份建议"执行备份。虽然迁移脚本幂等，备份是回滚的底气。

### 步骤 2：更换镜像 Tag

修改 `deploy/docker-compose/.env`，将 `KUBOARD_VERSION` 改为目标版本：

```bash
KUBOARD_IMAGE_REPO=swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard
KUBOARD_VERSION=v4.2.2.0
```

### 步骤 3：拉取新镜像

```sh
docker compose -f docker-compose-mysql-redis.yaml pull kuboard
```

### 步骤 4：启动

```sh
docker compose -f docker-compose-mysql-redis.yaml up -d
```

- 由于 `image:` 的 Tag 发生了变化，compose 会**重建 kuboard 容器**（数据库 `db` 与 `redis` 容器不受影响、不会重建）；
- 若担心停服窗口，也可以先 `docker compose -f docker-compose-mysql-redis.yaml stop kuboard`，再执行上面的 `up -d`；
- 单实例部署下，容器重建的停机时间通常只有几秒。

### 步骤 5：观察迁移日志

容器启动过程中，`DdlService` 会按顺序打出 INFO 日志，例如：

```text
执行数据库安装脚本: /ddl/mysql/install/1-create-tables.sql
执行数据库升级脚本: /ddl/mysql/upgrade/v4.2.5.0/kb_u_oidc_session_lock.sql
```

观察方式：

```sh
docker compose -f docker-compose-mysql-redis.yaml logs -f kuboard
```

重点确认：

- 出现 `执行数据库升级脚本` 且**没有** `执行 SQL 文件失败` 的 error 日志；
- 迁移完成后应用正常就绪，compose 健康检查（`curl -f http://localhost:80/`，`start_period` 为 60 秒）通过。

::: danger 迁移失败时的行为

`DdlService` 遇到非"重复执行"类的 SQL 错误会直接抛出 `KuboardException`，导致**容器启动失败**（容器处于退出 / 重启循环状态）。此时请保留日志排查，必要时回滚到旧版本 Tag（见下文"回滚"）。

:::

### 步骤 6：验证

- 访问 Kuboard 界面（compose 示例映射为 `http://localhost:8000`），确认登录、集群列表、名称空间等核心功能正常；
- 检查新版本的功能入口是否存在（每个版本的发布说明中会列出新增功能）。

## 升级注意事项

### 数据卷保留

所有 compose 方案都使用宿主机目录（bind mount）持久化数据，**升级只重建 kuboard 容器，绝不能删除以下目录**：

| 部署方案 | 目录（相对 compose 文件） | 内容 |
| --- | --- | --- |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-mysql/` | MySQL 数据 |
| `docker-compose-mysql-redis.yaml` | `./docker-compose-mysql-redis-data/kuboard-redis/` | Redis 数据 |
| 所有方案 | `<方案>-data/kuboard-logs/`（如 `./docker-compose-mysql-redis-data/kuboard-logs/`） | Kuboard 日志 |
| `docker-compose-ha-opengauss.yaml` | `./docker-compose-ha-opengauss-data/kuboard-opengauss/`、`redis-master/`、`redis-slave/` | HA 数据库与 Redis 数据 |

::: warning

- 不要执行 `docker compose down -v`（`-v` 会删除 volume，但本方案的 volume 是目录挂载，等价于删除数据目录）；
- 不要执行 `rm -rf` 数据目录（README 中"清理数据重新启动"的示例只适用于**全新测试环境**）。

:::

### 环境变量一致性

升级时**只改 `KUBOARD_VERSION`（以及必要时改 `KUBOARD_IMAGE_REPO`）**，不要顺手改动数据库相关环境变量。compose 中 kuboard 服务的环境变量如下（`docker-compose-mysql-redis.yaml`）：

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
- `TZ`、`KUBOARD_CACHE_*` 等与版本无关，保持一致即可。

### KUBOARD_CACHE_PROVIDER 切换不涉及数据迁移

- `KUBOARD_CACHE_PROVIDER` 可选 `caffeine`（内存缓存，默认）或 `redis`（分布式缓存，见 [高可用部署](./ha)）；
- 缓存只影响运行时（缓存对象、会话等），**与数据库 Schema 无关**；
- 因此升级时把缓存从 `caffeine` 切到 `redis`（或反向）**不会触发任何数据迁移**，Redis 侧数据按需重建，数据库侧无 DDL 动作。

### 高可用多副本场景

- 多个 Kuboard 副本指向同一个数据库，升级时各副本依次重建，各自执行一遍迁移脚本；
- 由于脚本幂等（重复列 / 重复索引错误被容忍），副本并发迁移是安全的；
- 建议逐个副本滚动升级（先升级一个、观察迁移日志正常后再升级其余副本），以减小风险窗口。

## 跨小版本兼容性与回滚策略

### 兼容性

- 升级脚本按版本目录 `upgrade/vX.Y.Z.W/` 组织，新版本的变更以追加方式进入 `script-list.yaml`，因此**从任意旧版本直接升级到最新版本**即可，无需逐版本升级；
- 迁移以"加列、建表、建索引"为主（例如 `ADD COLUMN`、`CREATE TABLE IF NOT EXISTS`、`CREATE INDEX`），旧版本镜像在"新 Schema"上通常仍可运行——多出的列和表不影响旧代码。

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

- **没有降级脚本**：仓库中不存在任何 `downgrade` 目录或降级 SQL，Schema 一旦被新版本迁移，**不能通过"换回旧镜像"自动还原表结构**；
- **新数据格式不回退**：新版本运行期间写入的数据（新增列的值、新表的数据）旧版本代码可能无法理解，表现为功能异常或报错；
- **只增不删是约定而非保证**：升级脚本原则上只做增量变更，但涉及数据改造的脚本（如数据回填 `_sync_data`、状态字段变更）同样不可逆。

因此：

1. 升级前必须备份数据库（见"备份建议"）；
2. 回滚到旧镜像只适合"升级后立即发现异常、新数据量很小"的场景；
3. 如果升级后运行了一段时间、已产生大量新数据，优先选择**继续升级到最新版本修复问题**，而不是回滚。

:::

## 相关文档

- [安装 Kuboard V4](./index)
- [快速开始](./quickstart)
- [高可用部署](./ha)
- [从 v3 迁移](./migration-from-v3)