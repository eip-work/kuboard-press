---
lessAds: true
description: 一行命令开启Kubernetes多集群管理之路_Kuboard_V4安装
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装 Kubernetes 多集群管理工具 - Kuboard v4

## 致 Kuboard v3 用户

兼容性
* 您可以安装一套 Kuboard v4，并将同一个集群同时导入到 Kuboard v3 和 Kuboard v4。此时 Kuboard v3 / v4 都可以有效管理该集群。
* Kuboard v4 使用了与 Kuboard v3 不同的技术架构，不能直接从 Kuboard v3 升级到 Kuboard v4；
  * v3 使用 etcd 作为持久化存储器，v4 使用 MySQL / MariaDB 作为持久化存储器；
  * v3 使用 golang 语言开发，v4 使用 Java 语言开发；
* Kuboard v3 中提供的各类套件（监控套件、日志套件等），需等到 v4 版本正式发布时才能在 v4 版本中提供。

## 依赖条件

Kuboard v4 需要使用数据库作为存储，支持的数据库类型有：
* MySQL >= 5.7
* MariaDB >= 8.0
* OpenGauss >= 3.0

您也可以参考 [快速开始](./quickstart.md) 使用 docker compose 迅速拉起一个 Kuboard 实例用于测试。

## 准备数据库

### MySQL/MariaDB

* 在 MySQL（或者 MariaDB）中创建数据库，建库脚本如下：

  ```sql
  CREATE DATABASE kuboard DEFAULT CHARACTER SET = 'utf8mb4' DEFAULT COLLATE = 'utf8mb4_unicode_ci';
  create user 'kuboard'@'%' identified by 'Kuboard123';
  grant all privileges on kuboard.* to 'kuboard'@'%';
  FLUSH PRIVILEGES;
  ```

### OpenGauss

* 在 OpenGauss 命令行中创建数据库，建库脚本如下：

  ```sql
  CREATE USER kuboard PASSWORD 'Kuboard123';
  CREATE DATABASE kuboard OWNER=kuboard ENCODING='UTF8' DBCOMPATIBILITY='PG';
  \c kuboard
  CREATE SCHEMA kuboard AUTHORIZATION kuboard;
  ```

  > 如果使用 OpenGauss 数据库，Kuboard 将使用 postgre SQL 语法操作数据库

## 启动 Kuboard

* 使用 `docker run` 启动 Kuboard 容器：

  * 使用 MYSQL 时，启动 Kuboard 的脚本如下：

    ```sh
    sudo docker run -d \
      --restart=unless-stopped \
      --name=kuboard \
      -p 80:80/tcp \
      -e TZ="Asia/Shanghai" \
      -e DB_DRIVER=com.mysql.cj.jdbc.Driver \
      -e DB_URL="jdbc:mysql://10.99.0.8:3306/kuboard?serverTimezone=Asia/Shanghai" \
      -e DB_USERNAME=kuboard \
      -e DB_PASSWORD=Kuboard123 \
      swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
      # eipwork/kuboard:v4
    ```

  * 使用 MariaDB 时，启动 Kuboard 的脚本如下：

    ```sh
    sudo docker run -d \
      --restart=unless-stopped \
      --name=kuboard \
      -p 80:80/tcp \
      -e TZ="Asia/Shanghai" \
      -e DB_DRIVER=org.mariadb.jdbc.Driver \
      -e DB_URL="jdbc:mariadb://10.99.0.8:3306/kuboard?&timezone=Asia/Shanghai" \
      -e DB_USERNAME=kuboard \
      -e DB_PASSWORD=Kuboard123 \
      swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
      # eipwork/kuboard:v4
    ```
  
  * 使用 OpenGauss 时，启动 Kuboard 的脚本如下：

    ```sh
    sudo docker run -d \
      --restart=unless-stopped \
      --name=kuboard \
      -p 80:80/tcp \
      -e TZ="Asia/Shanghai" \
      -e DB_DRIVER=org.postgresql.Driver \
      -e DB_URL="jdbc:postgresql://localhost:5432/kuboard?currentSchema=kuboard&characterEncoding=UTF8" \
      -e DB_USERNAME=kuboard \
      -e DB_PASSWORD=Kuboard123 \
      swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v4
      # eipwork/kuboard:v4
    ```

  ::: tip 参数说明
  * 环境变量 `TZ` 指定 JDK 的时区；
  * 环境变量 `DB_DRIVER` 指定数据库驱动类，可选值有三个：
    * `com.mysql.cj.jdbc.Driver`
    * `org.mariadb.jdbc.Driver`
    * `org.postgresql.Driver`
  * 环境变量 `DB_URL` 指定 JDBC 连接 url，参数中的主机地址不用写 `localhost`，应该直接指定数据库的 IP 地址，例如，样例中使用了数据库的 IP 地址 `10.99.0.8`；JDBC 连接 url 应与前一个步骤中创建的数据库相匹配；通常，您只需替换样例中的 IP 地址以及端口号即可；
  * 环境变量 `DB_USERNAME` 指定数据库用户，应该与前一个步骤中创建的数据库用户名相同；
  * 环境变量 `DB_PASSWORD` 指定数据库密码，应该与前一个步骤中创建的数据库密码相同；
  :::

## 打开 Kuboard 界面

* 在浏览器打开 Kuboard 的地址，例如：

  `http://10.99.0.10`

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