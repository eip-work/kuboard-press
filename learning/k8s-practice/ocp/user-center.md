---
vssueId: 96
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台OCP_open_capacity_platform微服务能力开放平台_部署eureka-server
---

# 在K8S上部署user-center

本文假设您已经完成了 [在Kubernetes 上部署 Spring Cloud - OCP](./) 系列教程的前面部分，并已经完成了 eureka-server、user-center-mysql、log-center-mysql、redis 在 K8S 上的部署。

## 理解user-center

user-server 是一个 Spring Boot 项目，其配置文件位于路径 `business-center/user-center/src/main/resources`，该目录内容如下所示：

``` sh
├── application.yml
├── bootstrap.yml
└── mybatis.cfg.xml
```

### 监听端口

参考 `bootstrap.yml` 的如下代码片段，user-center监听 7000 端口

``` yaml {3}
#端口配置
server:
  port: 7000   #固定端口
#  port: ${randomServerPort.value[7000,7005]}  #随机端口
```

### 依赖项

user-server 的部署依赖有：
* eureka-server
* mysql
* redis

上述依赖在教程的前面部分都已经完成部署。

这些依赖项的情况与 [auth-server依赖项](./auth-server.html#依赖项) 的情况大致相同，此处不再重复描述


## 确定部署方案

user-center 为无状态服务，使用 Deployment 部署。

根据 [在K8S上部署eureka-server](./eureka-server.html)、 [在K8S上部署mysql](./mysql.html)、 [在K8S上部署redis](./redis.html) 的部署结果，我们应该通过环境变量覆盖 user-center 的如下参数：

* eureka.client.serviceUrl.defaultZone

  ```
  http://cloud-eureka-0.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-1.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-2.cloud-eureka.ocp.svc.cluster.local:1111/eureka
  ```
* spring.datasource.druid.core.url
  
  ```
  jdbc:mysql://db-user-center:3306/user-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false
  ```
* spring.datasource.druid.core.username
  
  `root` 与默认配置相同
* spring.datasource.druid.core.password

  `root` 与默认配置相同
* spring.datasource.druid.log.url
  
  ```
  jdbc:mysql://db-log-center:3306/log-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false
  ```
* spring.datasource.druid.log.username
  
  `root` 与默认配置相同
* spring.datasource.druid.log.password
  
  `root` 与默认配置相同
* spring.redis.host
  
  `cloud-redis`
* spring.redis.port
  
  `6379` 与默认配置相同

## 部署user-center

* 在 Kuboard 界面进入 `ocp` 名称空间，点击 **创建工作负载** 按钮，并填写表单，如下图所示：

  | 字段名称 | 填写内容                                                     | 备注                                        |
  | -------- | ------------------------------------------------------------ | ------------------------------------------- |
  | <div style="min-width:70px;">服务类型</div> | Deployment                                                   |                                             |
  | 服务分层 | 服务层                                                       |                                             |
  | 服务名称 | user-center                                                 |                                             |
  | 服务描述 | 用户中心                                                     |                                             |
  | 副本数   | 1                                                            |                                             |
  | 容器名称 | user-center                                                 |                                             |
  | 镜像     | ocpsample/user-center:latest                                 |                                             |
  | 抓取策略 | Always                                                       |                                             |
  | 环境变量 | <div style="min-width: 400px;"><font color="blue">eureka.client.serviceUrl.defaultZone=</font>http://cloud-eureka-0.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-1.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-2.cloud-eureka.ocp.svc.cluster.local:1111/eureka<br /><font color="blue">spring.datasource.druid.core.url=</font>jdbc:mysql://db-user-center:3306/user-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false<br /><font color="blue">spring.datasource.druid.log.url=</font>jdbc:mysql://db-log-center:3306/log-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false<br /><font color="blue">spring.redis.host=</font>cloud-redis</div> | 填入 kuboard 时<br/>环境变量名后面不带 `=`<br/> 此处的内容与前面的mysql 和 redis 的部署匹配，请谨慎修改 |
  | Service  | ClusterIP（集群内访问）<br />协议`TCP` 服务端口`7000` 容器端口 `7000` |                                             |
  | Ingress  | 域名 `svc-user-center.ocp.demo.kuboard.cn`<br />URL `/` 服务端口 `7000` | 请使用您自己的Ingress域名                                        |

  ::: tip 域名
  * 该域名由 `工作负载名`.`名称空间`.`集群名字`.`一级域名` 组成，这种命名规则下，只需要将 `*.demo.kuboard.cn` 的域名解析指向集群 Ingress Controller 的地址就可以
  * 在测试环境，为了更好地测试，才为 svc 配置 Ingress
  * 服务层的服务通过 eureka-server 进行服务发现，因此，原则上不需要为 Spring Cloud 在服务层的 Pod 配置 Kubernetes Service，此处是为了配置 Ingress 才启用 Kubernetes Service
  :::

  ![Kubernetes教程_部署SpringCloud微服务_OCP_user-center](./user-center.assets/image-20190928210357502.png)
  

## 检查部署结果

* 在浏览器访问 [http://svc-user-center.ocp.demo.kuboard.cn/swagger-ui.html](http://svc-user-center.ocp.demo.kuboard.cn/swagger-ui.html)
  > 此处请使用您自己的 url

  ![Kubernetes教程_部署SpringCloud微服务_OCP_user-center_检查部署结果](./user-center.assets/image-20190928213830175.png)

* :tada: :tada: :tada: 您已在 K8S 上完成了 user-center的部署
