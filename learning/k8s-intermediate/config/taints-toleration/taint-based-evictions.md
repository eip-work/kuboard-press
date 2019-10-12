---
vssueId: 98
titlePrefix: 污点和容忍
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_配置污点和容忍taints_and_toleration的基于污点的驱逐
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Eviction
---

# 基于污点的驱逐（TaintBasedEviction）

<AdSenseTitle/>

在前面的章节中，我们描述了 [NoExecute](/learning/k8s-intermediate/config/taints-toleration/#污点与容忍的匹配) 的污点效果，该效果将对已经运行在节点上的 Pod 施加如下影响：
* 不容忍该污点的 Pod 将立刻被驱逐
* 容忍该污点的 Pod 在未指定 `tolerationSeconds` 的情况下，将继续在该节点上运行
* 容忍该污点的 Pod 在指定了 `tolerationSeconds` 的情况下，将在指定时间超过时从节点上驱逐

::: tip
`tolerationSeconds` 字段可以理解为 Pod 容忍该污点的 `耐心`：
* 超过指定的时间，则达到 Pod 忍耐的极限，Pod 离开所在节点
* 不指定 `tolerationSeconds`，则认为 Pod 对该污点的容忍是无期限的
:::

此外，自 kubernetes 1.6 以来，kubernetes 的节点控制器在碰到某些特定的条件时，将自动为节点添加污点。这类污点有：
* `node.kubernetes.io/not-ready`： 节点未就绪。对应着 NodeCondition `Ready` 为 `False` 的情况
* `node.kubernetes.io/unreachable`： 节点不可触达。对应着 NodeCondition `Ready` 为 `Unknown` 的情况
* `node.kubernetes.io/out-of-disk`：节点磁盘空间已满
* `node.kubernetes.io/memory-pressure`：节点内存吃紧
* `node.kubernetes.io/disk-pressure`：节点磁盘吃紧
* `node.kubernetes.io/network-unavailable`：节点网络不可用
* `node.kubernetes.io/unschedulable`：节点不可调度
* `node.cloudprovider.kubernetes.io/uninitialized`：如果 kubelet 是由 "外部" 云服务商启动的，该污点用来标识某个节点当前为不可用的状态。在“云控制器”（cloud-controller-manager）初始化这个节点以后，kubelet将此污点移除

自 kubernetes 1.13 开始，上述特性被默认启用。

例如，某一个包含了大量本地状态的应用，在网络断开时，可能仍然想要在节点上停留比较长的时间，以等待网络能够恢复，而避免从节点上驱逐。此时，该 Pod 的容忍可能如下所示：

``` yaml
tolerations:
- key: "node.kubernetes.io/unreachable"
  operator: "Exists"
  effect: "NoExecute"
  tolerationSeconds: 6000
```

如果 Pod 没有 `node.kubernetes.io/not-ready` 容忍，
Kubernetes 将自动为 Pod 添加一个 `tolerationSeconds=300` 的 `node.kubernetes.io/not-ready` 容忍。同样的，如果 Pod 没有 `node.kubernetes.io/unreachable` 容忍，Kubernetes 将自动为 Pod 添加一个 `tolerationSeconds=300` 的 `node.kubernetes.io/unreachable` 容忍

这类自动添加的容忍确保了 Pod 在节点发生 `not-ready` 和 `unreachable` 问题时，仍然在节点上保留 5 分钟。

DaemonSet Pod 相对特殊一些，他们在创建时就添加了不带 `tolerationSeconds` 的 `NoExecute` 效果的容忍，适用的污点有：
* `node.kubernetes.io/unreachable`
* `node.kubernetes.io/not-ready`

这将确保 DaemonSet Pod 始终不会被驱逐。
