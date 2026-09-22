# 快速开始

完整的安装文档请参考 [安装 Kubernetes 多集群管理工具 - Kuboard v4](/zh/install/)

前提条件：

- docker engine
- amd64 或 arm64 CPU

步骤：

- 在本地目录创建 `kuboard-v4`

- 在该目录下创建文件 `docker-compose.yaml`，内容如下：

  ```yaml
  configs:
    create_db_sql:
      content: |
        CREATE DATABASE kuboard DEFAULT CHARACTER SET = 'utf8mb4' DEFAULT COLLATE = 'utf8mb4_unicode_ci';
        create user 'kuboard'@'%' identified by 'kuboardpwd';
        grant all privileges on kuboard.* to 'kuboard'@'%';
        FLUSH PRIVILEGES;

  services:
    db:
      image: swr.cn-east-2.myhuaweicloud.com/kuboard/mariadb:11.3.2-jammy
      # image: mariadb:11.3.2-jammy
      # swr.cn-east-2.myhuaweicloud.com/kuboard/mariadb:11.3.2-jammy 与 mariadb:11.3.2-jammy 镜像完全一致
      environment:
        MARIADB_ROOT_PASSWORD: kuboardpwd
        MYSQL_ROOT_PASSWORD: kuboardpwd
        TZ: Asia/Shanghai
      volumes:
        - ./kuboard-mariadb-data:/var/lib/mysql:Z
      configs:
        - source: create_db_sql
          target: /docker-entrypoint-initdb.d/create_db.sql
          mode: 0777
      networks:
        kuboard_v4_dev:
          aliases:
            - db
    kuboard:
      image: swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
      # image: eipwork/kuboard:v4
      environment:
        - DB_DRIVER=org.mariadb.jdbc.Driver
        - DB_URL=jdbc:mariadb://db:3306/kuboard?serverTimezone=Asia/Shanghai
        - DB_USERNAME=kuboard
        - DB_PASSWORD=kuboardpwd
      ports:
        - "8000:80"
      volumes:
        - ./kuboard-log:/app/logs:Z
      depends_on:
        - db
      networks:
        kuboard_v4_dev:
          aliases:
            - kuboard

  networks:
    kuboard_v4_dev:
      driver: bridge
  ```

- 在 `kuboard-v4` 目录下执行指令：

  ```sh
  docker compose up -d
  ```

- 在浏览器打开 Kuboard 的地址，例如：

  `http://localhost:8000/login`

  Kuboard 的登录界面如下图所示：

  ![Kuboard登录界面](./install.assets/kuboard_login.png)

- 登录 Kuboard 界面：

  - 管理员用户为： `admin`
  - 默认密码为 ： `Kuboard123`

  **此时您已完成了 Kuboard v4 的安装**。后续请在 Kuboard 界面上执行如下操作：

  - 修改 `admin` 的密码
  - 创建普通用户并授权
  - 导入 Kubernetes 集群

## 集成外部用户库

Kuboard v4 通过 webhook 接口与外部用户库（例如 LDAP）集成，具体请参考 [https://github.com/eip-work/kuboard-v4-ldap-example](https://github.com/eip-work/kuboard-v4-ldap-example)

## 端口说明

Kuboard 正式镜像只有一个常驻入口端口，浏览器访问它即可：前端、API、Swagger 都从同一端口进入，无需分别访问 9090 / 9091。

| 部署方式 | 浏览器访问 | 端口映射 |
|---|---|---|
| Docker Compose 样例 | `http://<服务器IP>:8000` | 宿主 `8000` → 容器 `80` |
| Kubernetes（NodePort 样例） | `http://<节点IP>:30080` | Service `30080` → 容器 `80` |
| docker run -p | `http://<服务器IP>:<你映射的端口>` | 宿主任意端口 → 容器 `80` |
| 高可用（nginx 负载均衡） | `http://<服务器IP>:9001` | 宿主 `9001` → nginx `80` → 副本 `80` |
| Helm / Ingress | 由 Ingress 域名决定 | 指向 Service 的 `80` |

除浏览器入口端口外，其余端口属于进程内部或可选管理端口，官方编排样例均不需要暴露到宿主。

| 端口 | 用途 | 何时用 |
|---|---|---|
| `80` | 浏览器访问入口（前端页面 + API + Swagger） | 生产部署 |
| `9090` | 后端服务默认端口 | 本地源码运行用，镜像内被 `80` 覆盖 |
| `9091` | 管理端点（健康检查等） | 接入监控时才需要 |
| `9092` | Spring Boot Admin | 仅启用该功能时 |
| `8848` | 前端本地开发（Vite dev server） | 与部署无关 |

以下是依赖组件端口，属于数据库 / 缓存等外部组件，Kuboard 通过环境变量连接，不对外提供 Kuboard 功能：

| 端口 | 组件 |
|---|---|
| `3306` | MySQL / MariaDB |
| `5432` | PostgreSQL / OpenGauss |
| `6379` | Redis（单机） |
| `7001`–`7006` | Redis 集群（高可用样例） |
| `1389` | OpenLDAP |

### 如何修改端口

- **Docker Compose**：改宿主映射即可，容器内保持 80：

  ```yaml
  ports:
    - "8080:80"
  ```

- **Kubernetes**：修改 Service 的 `port` / `nodePort`（`targetPort` 为 `80`）
- **本地源码运行**：设置环境变量 `SERVER_PORT` / `SERVER_MGMT_PORT`

::: tip 不要修改容器内的 80
端口映射（Port Mapping）发生在编排层：改宿主端口、保留容器内 80。
:::

::: warning 健康检查走 80，不走 9091
官方编排样例的健康检查探测主端口 80；除非自行接入监控，否则无需暴露 9091。
:::

### 相关文档

部署时的完整环境变量见 [Kuboard 环境变量](../reference/kuboard-env)，HTTPS / WebSocket 反向代理配置见 [反向代理](./reverse-proxy)。