---
description: 在Kubernetes上部署测试数据库mysql的详细介绍。
---

# 部署db-example

本文所使用的代码请参考 [db-example](https://github.com/eip-work/kuboard-example/tree/master/db-example)

## 检查 db-example 项目的配置

**项目结构解读**



**部署类型**

关于 MySQL 数据库的部署，建议的做法如下：
* 在开发环境、测试环境使用 Kuboard 部署一个副本数为 1 的 Deployment，以便可以快速复制 开发环境、测试环境
* 在准上线环境和生产环境，使用 IaaS 服务商提供的 RDS 服务，或者自建 MySQL 主从集群，原因是：
  * 直接将 MySQL 部署到 Kubernetes 虽然简便，但是数据库的运维仍然有大量的事情需要考虑，例如数据的备份、恢复、迁移等
  * Kubernetes 管理无状态服务已经非常成熟，在管理有状态的容器例如 MySQL 时，仍然需要等待更好的解决方案。目前这方面最新的进展是 <a rel="nofollow" href="http://dockone.io/article/8769" target="_blank">Kubernetes Operator</a>
* 如果您想尝试部署 MySQL 集群，目前还可以参考 [Run a Replicated Stateful Application](https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/)


**环境变量**

检查 [Dockerfile](https://github.com/eip-work/kuboard-example/blob/master/db-example/Dockerfile)


``` Dockerfile
FROM eipwork/mysql:5.7.26-1.1.11

LABEL maintainer="shaohq@foxmail.com"

#把数据库初始化数据的文件复制到工作目录下
RUN  mv /etc/my.cnf /etc/my.cnf.backup
COPY docker/my.cnf /etc/my.cnf
COPY docker/init_sql/*.sql /init_sql/

EXPOSE 3306
EXPOSE 9104

ENV ENABLE_EUREKA_CLIENT=TRUE
ENV eureka.name=db-example
ENV eureka.port=80
ENV eureka.management.port=9104
ENV eureka.serviceUrl.default=http://monitor-eureka:9000/eureka
```

Dockerfile 中定义了环境变量 ENABLE_EUREKA_CLIENT=TRUE，这个环境变量用于 Prometheus [监控套件](/guide/monitor/) 的服务发现。在不启用监控套件的情况下，应该将 ***ENABLE_EUREKA_CLIENT*** 这个环境变量设置为 FALSE。

容器镜像 eipwork/mysql:5.7.26-1.1.11 基于 [mysql/mysql-server:5.7.26](https://hub.docker.com/r/mysql/mysql-server) 制作。参考文档 [More Topics on Deploying MySQL Server with Docker](https://dev.mysql.com/doc/refman/5.7/en/docker-mysql-more-topics.html#docker-environment-variables)，通过设置环境变量 ***MYSQL_ROOT_PASSWORD*** ，可指定 MySQL 的root 用户密码

::: tip
可以在部署时覆盖环境变量的值，无需修改 Dockerfile。
:::

**容器 Command 参数**

容器镜像 eipwork/mysql:5.7.26-1.1.11 的 [Dockerfile](https://github.com/eip-work/eip-docker-library/blob/master/mysql/Dockerfile) 指定了容器的启动方式，此处无需为容器额外设置 Command 参数。

**数据卷**

参考文档 [More Topics on Deploying MySQL Server with Docker](https://dev.mysql.com/doc/refman/5.7/en/docker-mysql-more-topics.html#docker-persisting-data-configuration)，我们需要将容器内路径 `/var/lib/mysql` 映射到数据卷，以便数据能够持久化。


**访问方式及互联网入口**

通常在两种情况下需要访问数据库：
* 微服务程序中访问数据库
* 开发者/运维人员通过 Navicat 等数据库工具访问数据库

为了同时支持这两种使用场景，建议为数据库配置 VPC内访问方式 （NodePort Service）

与数据库的通信为 socket，不能为其配置互联网入口 Ingress


## 部署 db-example

**创建ConfigMap**



**创建工作负载**





## 检查部署结果
