---
description: 使用 Kuboard 在 Kubernetes 上部署 spring cloud 服务注册发现组件 eureka。
---

# 部署 cloud-eureka

本文所使用的代码请参考 [cloud-eureka](https://github.com/eip-work/kuboard-example/tree/master/cloud-eureka)

## 检查 cloud-eureka 项目的配置

**部署类型**

对于 cloud-eureka 项目，在部署到 Kubernetes 时，建议选择 StatefulSet 作为 Controller，因为 StatefulSet 可以为其管理的容器组提供稳定的网络标识 [StatefulSet Pod Identity](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-identity)，例如，如果 StatefulSet 的名字是 cloud-eureka，副本数为 3， 则 StatefulSet 将确保如下三个容器组的按照 cloud-eureka-0，cloud-eureka-1，cloud-eureka-2 的顺序启动和运行。

| 容器组名字     | HOSTNAME（环境变量） | DNS name                    |
| -------------- | -------------------- | --------------------------- |
| cloud-eureka-0 | cloud-eureka-0       | cloud-eureka-0.cloud-eureka |
| cloud-eureka-1 | cloud-eureka-1       | cloud-eureka-1.cloud-eureka |
| cloud-eureka-2 | cloud-eureka-2       | cloud-eureka-2.cloud-eureka |

Eureka Server 要求将 Eureka 实例的 URL 以逗号分隔配置在 eureka.client.serviceUrl.defaultZone 字段中。请参考 [Spring Cloud Eureka Server Peer Awareness](https://cloud.spring.io/spring-cloud-netflix/spring-cloud-netflix.html#spring-cloud-eureka-server-peer-awareness) 

结合 StatefulSet 的特性，在配置 eureka.client.serviceUrl.defaultZone 时，可使用如下类似的参数：

```yaml
eureka.client.serviceUrl.defaultZone: http://cloud-eureka-0.cloud-eureka:9200/eureka, http://cloud-eureka-1.cloud-eureka:9200/eureka, http://cloud-eureka-2.cloud-eureka:9200/eureka
```



**环境变量**

参考 cloud-eureka 项目的 [application.yaml](https://github.com/eip-work/kuboard-example/blob/master/cloud-eureka/src/main/resources/application.yml) 文件

``` yaml
spring:
  application:
    name: cloud-eureka

server:
  port: 9200
management:
  endpoints:
    web.exposure.include: metrics
  server:
    port: 9500

eureka:
  instance:
    preferIpAddress: true
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: ${CLOUD_EUREKA_DEFAULT_ZONE}
  server:
    eviction-interval-timer-in-ms: 60000
    enable-self-preservation: false
```

该项目中有一个值取自环境变量：

* CLOUD_EUREKA_DEFAULT_ZONE 这个参数必须通过环境变量进行配置

  建议配置的值为：

  `http://cloud-eureka-0.cloud-eureka:9200/eureka, http://cloud-eureka-1.cloud-eureka:9200/eureka, http://cloud-eureka-2.cloud-eureka:9200/eureka`

  因为各微服务也需要用到 CLOUD_EUREKA_DEFAULT_ZONE 这个参数（请参考 部署 svc-example 章节），所以建议将该参数配置在 Kubernetes 的 ConfigMap 中最为便捷。

文件中没有配置 `eureka.instance.hostname`，该参数的默认取值通过 java.net.InetAddress 查找机器的 hostname。如前所示，当我们使用 StatefulSet 部署 eureka 时，hostname 为 cloud-eureka-0 / cloud-eureka-1 / cloud-eureka-2

**容器 Command 参数**

参考 cloud-eureka 项目的 [Dockerfile](https://github.com/eip-work/kuboard-example/blob/master/cloud-eureka/Dockerfile) 文件

```dockerfile
FROM eipwork/jdk:1.0.0

ARG JAR_FILE_NAME=cloud-eureka-0.0.1-SNAPSHOT.jar
ARG PORT=9200
ARG MANAGEMENT_PORT=9500

COPY ./target/lib /eip-work/lib
COPY ./target/$JAR_FILE_NAME.original /eip-work/app.jar

ENV CLASSPATH=/eip-work/lib

EXPOSE $PORT
EXPOSE $MANAGEMENT_PORT

WORKDIR /eip-work

ENTRYPOINT ["java", "-jar", "/eip-work/app.jar"]
```

ENTRYPOINT 中指定了启动命令为

``` sh
java -jar /eip-work/app.jar
```

因此在 kubernetes 中部署该容器时，无需额外指定 Command 参数。



**访问方式及互联网入口**

Eureka 运行在 9200 端口。Spring Cloud 的微服务组件通过 CLOUD_EUREKA_DEFAULT_ZONE 中的配置直接与 Eureka 容器组通信。

是否配置访问方式及互联网入口？

* 如果开发者不需要查看 Eureka 的 Web 界面，则
  * 无需配置访问方式和互联网入口；
* 如果开发者需要查看 Eureka 的 Web 界面，则
  * 配置集群内访问（Type 为 ClusterIP 的 Service）
  * 容器端口为9200



## 部署 cloud-eureka

**创建ConfigMap**



**创建工作负载**





## 检查部署结果

**查看 Eureka 界面**
