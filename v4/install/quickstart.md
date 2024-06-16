# 快速开始

完整的安装文档请参考 [安装 Kubernetes 多集群管理工具 - Kuboard v4](/v4/install/)

前提条件：
* docker engine
* amd64 或 arm64 CPU

步骤：

* 在本地目录创建 `kuboard-v4`

* 在该目录下创建文件 `docker-compose.yaml`，内容如下：
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
        - '8000:80'
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

* 在 `kuboard-v4` 目录下执行指令：
  ```sh
  docker compose up -d
  ```

* 在浏览器打开 Kuboard 的地址，例如：

  `http://localhost:8000`

  Kuboard 的登录界面如下图所示：

  ![Kuboard登录界面](./install.assets/kuboard_login.png)

* 登录 Kuboard 界面：

  * 管理员用户为： `admin`
  * 默认密码为 ： `Kuboard123`

  **此时您已完成了 Kuboard v4 的安装**。后续请在 Kuboard 界面上执行如下操作：

  * 修改 `admin` 的密码
  * 创建普通用户并授权
  * 导入 Kubernetes 集群

## 集成外部用户库

Kuboard v4 通过 webhook 接口与外部用户库（例如 LDAP）集成，具体请参考 [https://github.com/eip-work/kuboard-v4-ldap-example](https://github.com/eip-work/kuboard-v4-ldap-example)