---
layout: LearningLayout
description: 本文介绍了 Kubernetes 中服务发现的机制，以及如何使用服务发现
---

# Service 详细描述

参考文档：Kubernetes 官网文档：[Service](https://kubernetes.io/docs/concepts/services-networking/service/)

## 创建 Service

Kubernetes Servies 是一个 RESTFul 接口对象，可通过 yaml 文件创建。

例如，假设您有一组 Pod：
* 每个 Pod 都监听 9376 TCP 端口
* 每个 Pod 都有标签 app=MyApp

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

上述 YAML 文件可用来创建一个 Service：
* 名字为 `my-service`
* 目标端口未 TCP 9376
* 选取所有包含标签 app=MyApp 的 Pod

关于 Service，您还需要了解：

* Kubernetes 将为该 Service 分配一个 IP 地址（ClusterIP 或 集群内 IP），供 Service Proxy 使用（参考[虚拟 IP 和 Service proxy](#虚拟-ip-和-service-proxy)）
* Kubernetes 将不断扫描符合该 selector 的 Pod，并将最新的结果更新到与 Service 同名 `my-service` 的 Endpoint 对象中。
  ::: tip
  Service 从自己的 IP 地址和 `port` 端口接收请求，并将请求映射到符合条件的 Pod 的 `targetPort`。为了方便，默认 `targetPort` 的取值 与 `port` 字段相同
  :::
* Pod 的定义中，Port 可能被赋予了一个名字，您可以在 Service 的 `targetPort` 字段引用这些名字，而不是直接写端口号。这种做法可以使得您在将来修改后端程序监听的端口号，而无需影响到前端程序。
* Service 的默认传输协议是 TCP，您也可以使用其他 [支持的传输协议](#支持的传输协议)。
* Kubernetes Service 中，可以定义多个端口，不同的端口可以使用相同或不同的传输协议。

## 创建 Service（无 label selector） <Badge text="Kuboard 暂不支持" type="warn"/>

Service 通常用于提供对 Kubernetes Pod 的访问，但是您也可以将其用于任何其他形式的后端。例如：

* 您想要在生产环境中使用一个 Kubernetes 外部的数据库集群，在测试环境中使用 Kubernetes 内部的 数据库
* 您想要将 Service 指向另一个名称空间中的 Service，或者另一个 Kubernetes 集群中的 Service
* 您正在将您的程序迁移到 Kubernetes，但是根据您的迁移路径，您只将一部分后端程序运行在 Kubernetes 中

在上述这些情况下，您可以定义一个没有 Pod Selector 的 Service。例如：

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

因为该 Service 没有 selector，相应的 Endpoint 对象就无法自动创建。您可以手动创建一个 Endpoint 对象，以便将该 Service 映射到后端服务真实的 IP 地址和端口：

``` yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: my-service
subsets:
  - addresses:
      - ip: 192.0.2.42
    ports:
      - port: 9376
```

::: tip
* Endpoint 中的 IP 地址不可以是 loopback（127.0.0.0/8 IPv4 或 ::1/128 IPv6），或 link-local（169.254.0.0/16 IPv4、224.0.0.0/24 IPv4 或 fe80::/64 IPv6）
* Endpoint 中的 IP 地址不可以是集群中其他 Service 的 ClusterIP
:::

对于 Service 的访问者来说，Service 是否有 label selector 都是一样的。在上述例子中，Service 将请求路由到 Endpoint 192.0.2.42:9376 (TCP)。

ExternalName Service 是一类特殊的没有 label selector 的 Service，该类 Service 使用 DNS 名字。参考 [ExternalName](#externalname)


An ExternalName Service is a special case of Service that does not have selectors and uses DNS names instead. For more information, see the ExternalName section later in this document

## 虚拟 IP 和 Service proxy

正在撰写，最后更新时间：2019年9月17日 22:55

## 支持的传输协议


## Service 类型

### ClusterIP

### NodePort

### LoadBalancer

### ExternalName
