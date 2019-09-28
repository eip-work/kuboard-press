---
vssueId: 94
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud_open_capacity_platform微服务能力开放平台_部署auth-center
---

# 在K8S上部署auth-center

本文假设您已经完成了 [在Kubernetes 上部署 Spring Cloud - OCP](./) 系列教程的前面部分，并已经完成了 eureka-server、auth-center-mysql、redis 在 K8S 上的部署。

## 理解auth-server

auth-server 是一个 Spring Boot 项目，其配置文件位于路径 `oauth-center/auth-server/src/main/resources`，该目录内容如下所示：

``` sh
├── application.yml
├── bootstrap.yml
└── mybatis.cfg.xml
```

### 监听端口

参考 `bootstrap.yml` 的如下代码片段，auth-server 监听 8000 端口

``` yaml {3}
#端口
server:
  port: 8000
#  port: ${randomServerPort.value[8000,8000]}    #随机端口
```

### 依赖项

auth-server 的部署依赖有：
* eureka-server
* mysql
* redis

上述依赖在教程的前面部分都已经完成部署。

* **eureka-server** 依赖项

参考 `bootstrap.yml` 的如下代码片段，auth-server 中默认配置的 eureka-server 的地址为 `http://127.0.0.1:1111/eureka`

``` yaml {5}
#eureka client 配置          
eureka:
  client:
    serviceUrl:
      defaultZone:  http://127.0.0.1:1111/eureka  #http://130.75.131.241:8761/eureka,http://130.75.131.248:8762/eureka
      #http://134.224.249.33:1111/eureka/  正式库
      #http://134.224.249.33:1111/eureka/  测试库
```

* **mysql** 依赖项

参考 `application.yml` 的如下代码片段，auth-server 中默认配置的 mysql 的连接参数如下：

``` yaml {10,11,12,15,16,17}
spring:
  session:
    store-type: redis  
  datasource:
    dynamic:
      enable: true
    druid: 
      # JDBC 配置(驱动类自动从url的mysql识别,数据源类型自动识别)
      core:
        url: jdbc:mysql://59.110.164.254:3306/oauth-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false 
        username: root
        password: root
        driver-class-name:  com.mysql.jdbc.Driver
      log:
        url: jdbc:mysql://59.110.164.254:3306/log-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false 
        username: root
        password: root
        driver-class-name:  com.mysql.jdbc.Driver
```

* **redis** 依赖项

参考 `application.yml` 的如下代码片段，auth-server 中默认配置的 redis 的连接参数如下：

``` yaml {5,6}
spring:
  # ... ... ...
  redis:
  ################### redis 单机版 start ########################## 
    host: 59.110.164.254
    port: 6379    
    timeout: 6000
    database: 3
```

## 确定部署方案

auth-server 为无状态服务，使用 Deployment 部署，并通过环境变量覆盖如下参数：

* eureka.client.serviceUrl.defaultZone
  http://cloud-eureka-0.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-1.cloud-eureka.ocp.svc.cluster.local:1111/eureka,http://cloud-eureka-2.cloud-eureka.ocp.svc.cluster.local:1111/eureka
* spring.datasource.druid.core.url
  jdbc:mysql://db-auth-center:3306/oauth-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false
* spring.datasource.druid.core.username
* spring.datasource.druid.core.password
* spring.datasource.druid.log.url
* spring.datasource.druid.log.username
* spring.datasource.druid.log.password
* spring.redis.host
* spring.redis.port

## 部署auth-server

## 检查部署结果
