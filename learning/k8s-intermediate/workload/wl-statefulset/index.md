---
vssueId: 42
layout: LearningLayout
description: 与Deployment相似，StatefulSet 基于一个 Pod 模板管理其 Pod。与 Deployment 最大的不同在于 StatefulSet 始终将一系列不变的名字分配给其 Pod。这些 Pod 从同一个模板创建，但是并不能相互替换：每个 Pod 都对应一个特有的持久化存储标识。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,StatefulSet
---

# StatefulSet 的使用场景

> 参考文档： Kubernetes 文档 [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

<AdSenseTitle/>

## StatefulSet 概述

StatefulSet 顾名思义，用于管理 Stateful（有状态）的应用程序。

StatefulSet 管理 Pod 时，确保其 Pod 有一个按顺序增长的 ID。

与 [Deployment](../wl-deployment/) 相似，StatefulSet 基于一个 Pod 模板管理其 Pod。与 Deployment 最大的不同在于 StatefulSet 始终将一系列不变的名字分配给其 Pod。这些 Pod 从同一个模板创建，但是并不能相互替换：每个 Pod 都对应一个特有的持久化存储标识。

同其他所有控制器一样，StatefulSet 也使用相同的模式运作：用户在 StatefulSet 中定义自己期望的结果，StatefulSet 控制器执行需要的操作，以使得该结果被达成。

## StatefulSet 使用场景

对于有如下要求的应用程序，StatefulSet 非常适用：

* 稳定、唯一的网络标识（dnsname）
* 每个Pod始终对应各自的存储路径（PersistantVolumeClaimTemplate）
* 按顺序地增加副本、减少副本，并在减少副本时执行清理
* 按顺序自动地执行滚动更新

如果一个应用程序不需要稳定的网络标识，或者不需要按顺序部署、删除、增加副本，您应该考虑使用 Deployment 这类无状态（stateless）的控制器。

## StatefulSet 的限制

* Pod 的存储要么由 storage class 对应的 [PersistentVolume Provisioner](https://github.com/kubernetes/examples/blob/master/staging/persistent-volume-provisioning/README.md) 提供，要么由集群管理员事先创建
* 删除或 scale down 一个 StatefulSet 将不会删除其对应的数据卷。这样做的考虑是数据安全
* 删除 StatefulSet 时，将无法保证 Pod 的终止是正常的。如果要按顺序 gracefully 终止 StatefulSet 中的 Pod，可以在删除 StatefulSet 前将其 scale down 到 0
* 当使用默认的 [Pod Management Policy](./update.html) (OrderedReady) 进行滚动更新时，可能进入一个错误状态，并需要[人工介入](./update.html)才能修复
