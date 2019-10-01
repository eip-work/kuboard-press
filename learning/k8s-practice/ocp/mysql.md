---
vssueId: 88
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud_open_capacity_platform微服务能力开放平台_部署mysql
---


# 在K8S上部署mysql

OCP 的 auth-center 和 user-center 都有自己的数据库，同时 auth-center、user-center 和 api-gateway 又都依赖于 redis 缓存服务 和 log-center 数据库。这使得我们的部署结构演变成下图所示：

我们必须先完成 db-auth-center、db-user-center、db-log-center 和 redis 的部署，才能继续部署 auth-center 和 user-center。本文描述了如何部署 db-auth-center、db-user-center、db-log-center。

::: danger
将 mysql 部署到 K8S 中，可以非常便捷地搭建一套测试环境，但是，在生产环境里，并不建议直接将 mysql 部署到 K8S 上。
:::

<p style="max-width: 720px;">
  <img src="./mysql.assets/image-20190928183401521.png" alt="Kubernetes教程：在K8s上部署MySQL/Redis">
</p>

## 构建并推送mysql镜像

OCP 要求 mysql 版本 5.7 以上，当我们在 K8S 上部署 mysql 时，将选择 [mysql 官方镜像](https://hub.docker.com/_/mysql) 并基于此镜像，构建自己的 mysql 镜像，以便：
* 把数据库初始化脚本打包到镜像中
  * 这样每次部署一个新的 mysql 实例时，可以自动初始化 OCP 所需要的表结构
* 把自定义的数据库配置文件 my.cnf 打包到镜像中
* 设置环境变量 <Badge type="warning">本文档不涉及</Badge>

### auth-center-mysql

* 在 master 节点上，执行命令 `cd /root/open-capacity-platform/sql` 切换当前目录。
  
> 假设您已经完成了 [准备OCP的构建环境和部署环境](./prepare.html)

* 执行命令 `vim auth-center-my.cnf` 以创建文件，其内容如下：

  此配置用于解决 mysql 使用时的乱码问题。
  ```
  [mysqld]

  init_connect='SET collation_connection = utf8_unicode_ci'
  init_connect='SET NAMES utf8'
  character-set-server=utf8
  collation-server=utf8_unicode_ci
  skip-character-set-client-handshake
  ```

* 执行命令 `vim dockerfile_auth-center` 以创建文件，其内容如下：
  
  ```
  FROM mysql:5.7.26
  ADD auth-center-my.cnf /etc/mysql/conf.d/my.cnf
  ADD 02.oauth-center.sql /docker-entrypoint-initdb.d/02.oauth-center.sql
  EXPOSE 3306
  ```

* 执行命令 `docker build -f dockerfile_auth-center -t ocpsample/auth-center-mysql:latest .`

  ::: tip
  如果使用私有仓库，则应该按照如下格式填写镜像名：

  <font color="blue" weight="500">my-registry.example.com</font>:<font color="green" weight="500">5000</font>/<font color="purple" weight="500">example</font>/<font color="red" weight="500">auth-center-mysql</font>:<font color="brown" weight="500">latest</font>
  
    * 蓝色部分：registry 地址
    * 绿色部分：registry 端口
    * 紫色部分：repository 名字
    * 红色部分：image 名字
    * 棕色部分：image 标签
  :::

* 执行命令 `docker login` 登录镜像仓库

* 执行命令 `docker push ocpsample/auth-center-mysql:latest`
  
  大约2-5分钟，可完成镜像推送

### user-center-mysql

* 在 master 节点上，执行命令 `cd /root/open-capacity-platform/sql` 切换当前目录。（与上一个步骤目录相同）

* 执行命令 `vim user-center-my.cnf` 以创建文件，其内容如下：

  ```
  [mysqld]

  init_connect='SET collation_connection = utf8_unicode_ci'
  init_connect='SET NAMES utf8'
  character-set-server=utf8
  collation-server=utf8_unicode_ci
  skip-character-set-client-handshake
  ```

* 执行命令 `vim dockerfile_user-center` 以创建文件，其内容如下：
  
  ```
  FROM mysql:5.7.26
  ADD user-center-my.cnf /etc/mysql/conf.d/my.cnf
  ADD 01.user-center.sql /docker-entrypoint-initdb.d/01.user-center.sql
  EXPOSE 3306
  ```

  ::: warning SQL脚本问题
  01.user-center.sql 脚本中包含一些 create FUNCTION 的语句，已经确认这些 FUNCTION 并不被用到。在执行 coker build 之前，请确保这些 create FUNCTION 的语句被删除，否则您将在 mysql 初始化时碰到如下错误：
  ```
  ERROR 1064 (42000) at line 246: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 3
  ```
  :::
  
* 执行命令 `docker build -f dockerfile_user-center -t ocpsample/user-center-mysql:latest .`

* 执行命令 `docker push ocpsample/user-center-mysql:latest`
  
  大约 20 秒，可完成镜像推送

### log-center-mysql

* 在 master 节点上，执行命令 `cd /root/open-capacity-platform/sql` 切换当前目录。（与上一个步骤目录相同）

* 执行命令 `vim log-center-my.cnf` 以创建文件，其内容如下：
  ```
  [mysqld]

  init_connect='SET collation_connection = utf8_unicode_ci'
  init_connect='SET NAMES utf8'
  character-set-server=utf8
  collation-server=utf8_unicode_ci
  skip-character-set-client-handshake
  ```

* 执行命令 `vim dockerfile_log-center` 以创建文件，其内容如下：
  
  ```
  FROM mysql:5.7.26
  ADD log-center-my.cnf /etc/mysql/conf.d/my.cnf
  ADD 05.log-center.sql /docker-entrypoint-initdb.d/05.log-center.sql
  EXPOSE 3306
  ```

* 执行命令 `docker build -f dockerfile_log-center -t ocpsample/log-center-mysql:latest .`

* 执行命令 `docker push ocpsample/log-center-mysql:latest`
  
  大约 20 秒，可完成镜像推送

## 部署mysql

### 部署auth-center-mysql

* 在 Kuboard 界面中进入 `ocp` 名称空间

* 点击 **创建工作负载** 按钮
  
  填写表单，如下图所示：
  
  | 字段名称 | 填写内容                                                     | 说明                                                 |
  | -------- | ------------------------------------------------------------ | ---------------------------------------------------- |
  | 服务类型 | StatefulSet                                                  |                                                      |
  | 服务分层 | 持久层                                                       |                                                      |
  | 服务名称 | auth-center                                                  |                                                      |
  | 服务描述 | 认证中心数据库                                               |                                                      |
  | 副本数量 | 1                                                            | 请填写1                                              |
  | 容器名称 | auth-center-mysql                                            |                                                      |
  | 镜像     | ocpsample/auth-center-mysql:latest                           |                                                      |
  | 抓取策略 | Always                                                       |                                                      |
  | 环境变量 | <span style="color: blue;">MYSQL_ROOT_PASSWORD=</span>root   | 参考 [mysql官方镜像](https://hub.docker.com/_/mysql) |
  | Service  | ClusterIP（集群内访问）<br />协议：`TCP` 服务端口： `3306` 容器端口： `3306` |                                                      |
  
  ::: tip 持久化
  
  * 将 mysql 的容器内路径 `/var/lib/mysql` 映射到外部数据卷，可以使数据持久保存，请参考 [数据卷](/learning/k8s-intermediate/persistent/volume.html)
  * 为了保持教程的简洁，此处并没有为 `auth-center-mysql` 挂载外部存储，存入 mysql 的数据在每次容器重启后都将丢失，并重新执行初始化脚本 `02.auth-center.sql`
  
  :::
  
  ::: tip 访问方式

	为该 StatefulSet 配置了 ClusterIP（集群内访问）的访问方式，Kuboard 将创建一个与 StatefulSet 同名（db-auth-center）的 Kubernetes Service。您可以在集群内同名称空间 `ocp` 下任何容器组中通过 `db-auth-center:3306` 访问 `auth-center-mysql` 数据库，用户名为 root，密码为 root。

	参考 [Service连接应用程序](/learning/k8s-intermediate/service/connecting.html)

	:::

  ![Kubernetes教程：在K8S上部署mysql](./mysql.assets/image-20190927173409339.png)

* 点击 **保存**
* 点击 **应用**
* 点击 **完成**

### 验证auth-center-mysql

* 在 Kuboard 中进入 `auth-center-mysql` 的终端界面，执行如下命令：

  ``` sh
  mysql -uroot -proot
  > show databases;
  > use oauth-center;
  > show tables;
  ```
* 可以验证，oauth-center 的数据库表结构已经完成初始化，输出结果如下图所示：

  ![Kubernetes教程：在K8S上部署mysql_验证结果](./mysql.assets/image-20190927173921129.png)



### 部署user-center-mysql

按照同样的方式部署 user-center-mysql，因此，本章节不在截图，只将必要的步骤和参数进行罗列：

* 点击 **创建工作负载** 按钮

* 填写表单，如下表所示：

| 字段名称 | 填写内容                                                     | 说明                                                 |
| -------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 服务类型 | StatefulSet                                                  |                                                      |
| 服务分层 | 持久层                                                       |                                                      |
| 服务名称 | user-center                                                  |                                                      |
| 服务描述 | 用户中心数据库                                               |                                                      |
| 副本数量 | 1                                                            | 请填写1                                              |
| 容器名称 | user-center-mysql                                            |                                                      |
| 镜像     | ocpsample/user-center-mysql:latest                           |                                                      |
| 抓取策略 | Always                                                       |                                                      |
| 环境变量 | <span style="color: blue;">MYSQL_ROOT_PASSWORD=</span>root   | 参考 [mysql官方镜像](https://hub.docker.com/_/mysql) |
| Service  | ClusterIP（集群内访问）<br />协议：`TCP` 服务端口： `3306` 容器端口： `3306` |                                                      |

- 点击 **保存**
- 点击 **应用**
- 点击 **完成**

### 验证user-center-mysql

* 在 Kuboard 中进入 `user-center-mysql` 的终端界面，执行如下命令：

  ```sh
  mysql -uroot -proot
  > show databases;
  > use user-center;
  > show tables;
  ```

### 部署log-center-mysql

按照同样的方式部署 log-center-mysql，因此，本章节不在截图，只将必要的步骤和参数进行罗列：

* 点击 **创建工作负载** 按钮

* 填写表单，如下表所示：

| 字段名称 | 填写内容                                                     | 说明                                                 |
| -------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 服务类型 | StatefulSet                                                  |                                                      |
| 服务分层 | 持久层                                                       |                                                      |
| 服务名称 | log-center                                                  |                                                      |
| 服务描述 | 日志中心数据库                                               |                                                      |
| 副本数量 | 1                                                            | 请填写1                                              |
| 容器名称 | log-center-mysql                                            |                                                      |
| 镜像     | ocpsample/log-center-mysql:latest                           |                                                      |
| 抓取策略 | Always                                                       |                                                      |
| 环境变量 | <span style="color: blue;">MYSQL_ROOT_PASSWORD=</span>root   | 参考 [mysql官方镜像](https://hub.docker.com/_/mysql) |
| Service  | ClusterIP（集群内访问）<br />协议：`TCP` 服务端口： `3306` 容器端口： `3306` |                                                      |

- 点击 **保存**
- 点击 **应用**
- 点击 **完成**

### 验证log-center-mysql

* 在 Kuboard 中进入 `log-center-mysql` 的终端界面，执行如下命令：

  ```sh
  mysql -uroot -proot
  > show databases;
  > use log-center;
  > show tables;
  ```
