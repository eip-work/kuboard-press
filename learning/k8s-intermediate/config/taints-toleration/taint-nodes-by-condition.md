---
vssueId: 99
titlePrefix: 污点和容忍
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_根据条件为节点添加污点
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes taints,Kubernetes 污点
---

# 条件化的污点（TaintNodesByCondition）

自 Kubernetes 1.12 开始，`TaintNodesByCondition` 这个特性进入 beta 阶段，此时节点控制器自动根据 Node Condition 为节点创建对应的污点。调度器则不去检查 Node conditions，而是检查节点的污点，因此 Node Condition 不再直接影响到调度程序。用户通过为 Pod 添加容忍，可以选择性地忽略节点的某些问题（以 Node Condition 呈现的问题）。

`TaintNodesByCondition` 这个特性只会为节点添加 `NoSchedule` 效果的污点。`TaintBasedEviction` （Kubernetes 1.13 开始默认生效）则为节点添加 `NoExecute` 效果的污点，参考 [TaintBasedEviction](./taint-based-evictions.html)。

自 Kubernetes 1.8 开始，DaemonSet Controller 自动为所有的 DaemonSet Pod 添加如下 `NoSchedule` 效果的容忍，以防止 DaemonSet 不能正常工作：

* `node.kubernetes.io/memory-pressure`
* `node.kubernetes.io/disk-pressure`
* `node.kubernetes.io/out-of-disk`（只对关键 Pod 生效）
* `node.kubernetes.io/unschedulable`（不低于 Kubernetes 1.10）
* `node.kubernetes.io/network-unavailable`（只对 host network 生效）
