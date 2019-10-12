---
vssueId: 45
layout: LearningLayout
description: 本文描述了 Kubernetes StatefulSet 的更新
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,StatefulSet
---

# StatefulSet 的更新策略

<AdSenseTitle/>

[返回 StatefulSet](./)

## StatefulSet 的更新策略 <Badge text="Kuboard 暂不支持" type="warn"/>

在 Kubernetes 1.7 及之后的版本中，可以为 StatefulSet 设定 `.spec.updateStrategy` 字段，以便您可以在改变 StatefulSet 中 Pod 的某些字段时（container/labels/resource request/resource limit/annotation等）禁用滚动更新。

### On Delete

OnDelete 策略实现了 StatefulSet 的遗留版本（kuberentes 1.6及以前的版本）的行为。如果 StatefulSet 的 `.spec.updateStrategy.type` 字段被设置为 OnDelete，当您修改 `.spec.template` 的内容时，StatefulSet Controller 将不会自动更新其 Pod。您必须手工删除 Pod，此时 StatefulSet Controller 在重新创建 Pod 时，使用修改过的 `.spec.template` 的内容创建新 Pod。

### Rolling Updates

`.spec.updateStrategy.type` 字段的默认值是 RollingUpdate，该策略为 StatefulSet 实现了 Pod 的自动滚动更新。在用户更新 StatefulSet 的 `.spec.tempalte` 字段时，StatefulSet Controller 将自动地删除并重建 StatefulSet 中的每一个 Pod。处理顺序如下：
* 从序号最大的 Pod 开始，逐个删除和更新每一个 Pod，直到序号最小的 Pod 被更新
* 当正在更新的 Pod 达到了 Running 和 Ready 的状态之后，才继续更新其前序 Pod


* **Partitions**

  通过指定 `.spec.updateStrategy.rollingUpdate.partition` 字段，可以分片（partitioned）执行RollingUpdate 更新策略。当更新 StatefulSet 的 `.spec.template` 时：
  * 序号大于或等于 `.spec.updateStrategy.rollingUpdate.partition` 的 Pod 将被删除重建
  * 序号小于 `.spec.updateStrategy.rollingUpdate.partition` 的 Pod 将不会更新，及时手工删除该 Pod，kubernetes 也会使用前一个版本的 `.spec.template` 重建该 Pod
  * 如果 `.spec.updateStrategy.rollingUpdate.partition` 大于 `.spec.replicas`，更新 `.spec.tempalte` 将不会影响到任何 Pod

  ::: tip
  大部分情况下，您不需要使用 `.spec.updateStrategy.rollingUpdate.partition`，除非您碰到如下场景：
  * 执行预发布
  * 执行金丝雀更新
  * 执行按阶段的更新
  :::

* **Forced Rollback** <Badge text="Kuboard 已支持" type="success"/>

  当使用默认的 Pod 管理策略时（OrderedReady），很有可能会进入到一种卡住的状态，需要人工干预才能修复。

  如果您更新 Pod template 后，该 Pod 始终不能进入 Running 和 Ready 的状态（例如，镜像错误或应用程序配置错误），StatefulSet 将停止滚动更新并一直等待。

  此时，如果您仅仅将 Pod template 回退到一个正确的配置仍然是不够的。由于一个已知的问题，StatefulSet 将继续等待出错的 Pod 进入就绪状态（该状态将永远无法出现），才尝试将该 Pod 回退到正确的配置。

  在修复 Pod template 以后，您还必须删除掉所有已经尝试使用有问题的 Pod template 的 Pod。StatefulSet此时才会开始使用修复了的 Pod template 重建 Pod。


[返回 StatefulSet](./)
