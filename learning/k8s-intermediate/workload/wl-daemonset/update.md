---
vssueId: 50
layout: LearningLayout
description: 本文描述了 Kubernetes DaemonSet 的概念、行为及用法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,DaemonSet
---

# 更新 DaemonSet

> 参考文档 Kubernetes 文档 [Updating a DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#updating-a-daemonset)

<AdSenseTitle/>

## 更新信息

* 在改变节点的标签时：
  * 如果该节点匹配了 DaemonSet 的 `.spec.template.spec.nodeSelector`，DaemonSet 将会在该节点上创建一个 Pod
  * 如果该节点原来匹配 DaemonSet 的 `.spec.template.spec.nodeSelector`，现在不匹配了，则，DaemonSet 将会删除该节点上对应的 Pod

* 您可以修改 DaemonSet 的 Pod 的部分字段，但是，DaemonSet 控制器在创建新的 Pod 时，仍然会使用原有的 Template 进行 Pod 创建。

* 您可以删除 DaemonSet。如果在 `kubectl` 命令中指定 `--cascade=false` 选项，DaemonSet 容器组将不会被删除。紧接着，如果您创建一个新的 DaemonSet，与之前删除的 DaemonSet 有相同的 `.spec.selector`，新建 DaemonSet 将直接把这些未删除的 Pod 纳入管理。DaemonSet 根据其 `updateStrategy` 决定是否更新这些 Pod

## 执行滚动更新


https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
