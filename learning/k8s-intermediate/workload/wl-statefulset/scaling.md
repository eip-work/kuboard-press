---
vssueId: 44
layout: LearningLayout
description: 本文描述了 Kubernetes StatefulSet 的部署和伸缩
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,StatefulSet
---

# StatefulSet 的部署和伸缩

<AdSenseTitle/>

[返回 StatefulSet](./)

## 部署和伸缩 StatefulSet 时的执行顺序

* 在创建一个副本数为 N 的 StatefulSet 时，其 Pod 将被按 {0 ... N-1} 的顺序逐个创建
* 在删除一个副本数为 N 的 StatefulSet （或其中所有的 Pod）时，其 Pod 将按照相反的顺序（即 {N-1 ... 0}）终止和删除
* 在对 StatefulSet 执行扩容（scale up）操作时，新增 Pod 所有的前序 Pod 必须处于 Running（运行）和 Ready（就绪）的状态
* 终止和删除 StatefulSet 中的某一个 Pod 时，该 Pod 所有的后序 Pod 必须全部已终止

StatefulSet 中 `pod.spec.terminationGracePeriodSeconds` 不能为 0。具体原因请参考 [force deleting StatefulSet Pods](https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/)

[创建 StatefulSet](./basics.html) 例子中的 nginx StatefulSet 被创建时：
* Pod web-0、web-1、web-2 将被按顺序部署
* web-0 处于 Running 和 Ready 状态之前，web-1 不会创建；web-1 处于 Running 和 Ready 状态之前，web-2 不会创建
* 如果 web-1 已处于 Running 和 Ready 的状态，web-2 尚未创建，此时 web-0 发生了故障，则在 web-0 成功重启并达到 Running 和 Ready 的状态之前，web-2 不会创建
* 如果用户对这个 StatefulSet 执行缩容（scale down）操作，将其副本数调整为 1，则：
  * web-2 将被首先终止；在 web-2 已终止并删除之后，才开始终止 web-1
  * 假设在 web-2 终止并删除之后，web-1 终止之前，此时 web-0 出现故障，则，在 web-0 重新回到 Running 和 Ready 的状态之前，kubernetes 将不会终止 web-1

## Pod 管理策略

在 Kubernetes 1.7 及其后续版本中，可以为 StatefulSet 设定 `.spec.podManagementPolicy` 字段<Badge text="Kuboard 暂不支持" type="warn"/>，以便您可以继续使用 StatefulSet 唯一 ID 的特性，但禁用其有序创建和销毁 Pod 的特性。该字段的取值如下：

* **OrderedReady**
  
  OrderedReady 是 `.spec.podManagementPlicy` 的默认值。其对 Pod 的管理方式已经在 [部署和伸缩 StatefulSet 时的执行顺序](./scaling.html#部署和伸缩-statefulset-时的执行顺序) 详细描述

* **Parallel**

  `.spec.podManagementPlicy` 的取值为 Parallel，则 StatefulSet Controller 将同时并行地创建或终止其所有的 Pod。此时 StatefulSet Controller 将不会逐个创建 Pod，等待 Pod 进入 Running 和 Ready 状态之后再创建下一个 Pod，也不会逐个终止 Pod。

  ::: tip
  此选项只影响到伸缩（scale up/scale down）操作。更新操作不受影响。
  :::

[返回 StatefulSet](./)
