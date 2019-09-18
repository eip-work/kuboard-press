---
layout: LearningLayout
description: Kubernetes 中发布 Service 的方式，ServiceType
---

# Service 类型

Kubernetes 中可以通过不同方式发布 Service，通过 `ServiceType` 字段指定，该字段的默认值是 `ClusterIP`，可选值有：

* **ClusterIP**: <Badge text="Kuboard 已支持" type="success"/> 默认值。通过集群内部的一个 IP 地址暴露 Service，只在集群内部可以访问

* **NodePort**: <Badge text="Kuboard 已支持" type="success"/> 通过每一个节点上的的静态端口（NodePort）暴露 Service，同时自动创建 ClusterIP 类型的访问方式
  * 在集群内部通过 $(ClusterIP): $(Port) 访问
  * 在集群外部通过 $(NodeIP): $(NodePort) 访问

* **LoadBalancer**: <Badge text="Kuboard 不支持" type="error"/> 通过云服务供应商（AWS、Azure、GCE 等）的负载均衡器在集群外部暴露 Service，同时自动创建 NodePort 和 ClusterIP 类型的访问方式
  * 在集群内部通过 $(ClusterIP): $(Port) 访问
  * 在集群外部通过 $(NodeIP): $(NodePort) 访问
  * 在集群外部通过 $(LoadBalancerIP): $(Port) 访问

  ::: tip 替代方案
  * LoadBalancer 类型的 Service，可以自动调用云服务商在 IaaS 层面的接口，并自动创建 LoadBalancer，将其指向该 Service。
  * 由于 Kuboard 不限定云服商，因此不能实现此类型的 Service，建议用户先创建 NodePort 类型的 Service，再手工创建 LoadBalancer，将其配置到各节点上对应的 Service 的 NodePort。此操作最终效果与 LoadBalancer 类型 Service 的效果相同
  :::

* **ExternalName**: <Badge text="Kuboard 暂不支持" type="warn"/> 将 Service 映射到 `externalName` 指定的地址（例如：foo.bar.example.com），返回值是一个 CNAME 记录。不使用任何代理机制。

  ::: tip
  如使用 ExternalName 类型的 Service，CoreDNS 版本不能低于 1.7
  :::

## ClusterIP

未完，待续，【2019年9月18日 22:56】

## NodePort

## LoadBalancer

## ExternalName
