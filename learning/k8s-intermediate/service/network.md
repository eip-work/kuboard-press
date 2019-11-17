---
# vssueId: 158
layout: LearningLayout
description: Kubernetes中_网络策略定义了一组Pod是否允许相互通信_或者与网络中的其他端点endpoint通信_本文描述了K8S集群中默认的网络策略
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Network Model, K8S 网络模型
---

# Network Model

<AdSenseTitle>

> 参考文档： [A Guide to the Kubernetes Networking Model](https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/)

Kubernetes 用来在集群上运行分布式系统。分布式系统的本质使得网络组件在 Kubernetes 中是至关重要也不可或缺的。理解 Kubernetes 的网络模型可以帮助你更好的在 Kubernetes 上运行、监控、诊断你的应用程序。

网络是一个很宽泛的领域，其中有许多成熟的技术。对于不熟悉网络整体背景的人而言，要将各种新的概念、旧的概念放到一起来理解（例如，网络名称空间、虚拟网卡、IP forwarding、网络地址转换等），并融汇贯通，是一个非常困难的事情。本文将尝试揭开 Kubernetes 网络的面纱，并讨论 Kubernetes 相关的网络技术，以及这些技术是如何支持 Kubernetes 网络模型的。

文章有点长，分成主要的几个部分：
* 首先讨论一些 Kubernetes 基础的术语，确保大家对关键措辞的理解是一致的
* 然后讨论 Kubernetes 网络模型，及其设计和实现
* 主要的内容是：通过不同的 use case 深入探讨 Kubernetes 中网络流量是如何路由的

[[TOC]]

</AdSenseTitle>


## Kubernetes基本概念

Kubernetes 基于少数几个核心概念，不断完善，提供了非常丰富和实用的功能。本章节罗列了这些核心概念，并简要的做了概述，以便更好地支持后面的讨论。熟悉 Kubernetes 的读者可跳过这个章节。

### Kubernetes API Server

操作 Kubernetes 的方式，是调用 Kubernetes API Server（kube-apiserver）的 API 接口。kubectl、kubernetes dashboard、kuboard 都是通过调用 kube-apiserver 的接口实现对 kubernetes 的管理。API server 最终将集群状态的数据存储在 [etcd](https://github.com/coreos/etcd) 中。

### 控制器Controller

控制器（Controller）是 Kubernetes 中最核心的抽象概念。在用户通过 kube-apiserver 声明了期望的状态以后，控制器通过不断监控 apiserver 中的当前状态，并对当前状态与期望状态之间的差异做出反应，以确保集群的当前状态不断地接近用户声明的期望状态。这个过程实现在一个循环中，参考如下伪代码：
``` go
while true:
  X = currentState()
  Y = desiredState()

  if X == Y:
    return  # Do nothing
  else:
    do(tasks to get to Y)
```
例如，当你通过 API Server 创建一个新的 Pod 对象时，Kubernetes调度器（是一个控制器）注意到此变化，并做出将该 Pod 运行在集群中哪个节点的决定。然后，通过 API Server 修改 Pod 对象的状态。此时，对应节点上的kubelet（是一个控制器）注意到此变化，并将在其所在节点运行该 Pod，设置需要的网络，使 Pod 在集群内可以访问。此处，两个控制器针对不同的状态变化做出反应，以使集群的当前状态与用户指定的期望状态匹配。

### 容器组Pod

Pod 是 Kubernetes 中的最小可部署单元。一个 Pod 代表了集群中运行的一个工作负载，可以包括一个或多个 docker 容器、挂载需要的存储，并拥有唯一的 IP 地址。Pod 中的多个容器将始终在同一个节点上运行。

### 节点Node

节点是Kubernetes集群中的一台机器，可以是物理机，也可以是虚拟机。
