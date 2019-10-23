---
vssueId: 148
layout: LearningLayout
description: Kubernetes教程_通过Pod安全策略_您可以在更细的颗粒度上授权您的用户执行Pod的创建和更新的操作
meta:
  - name: keywords
    content: Kubernetes 教程,Resource Quota,ResourceQuota
---

# Pod 优先权

<AdSenseTitle >

> 参考文档：[Pod Priority and Preemption](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/)

**FEATURE STATE**： `Kubernetes v1.14` <Badge>stable</Badge>

Pod 中可以定义 优先级 `priority`，用于标识该 Pod 相对于其他 Pod 的重要程度。当存在 Pod 等待调度时（处于 Pending 状态），调度器将尝试抢占（preempt 或 驱逐 evict）低优先级（priority）的 Pod，以便调度 Pending 中的 Pod。

自 Kubernetes 1.9 开始，Priority 也会对如下两个场景产生影响：
* Pod 的调度顺序
* 资源耗尽时，从节点上驱逐 Pod 的顺序

Pod 优先权（priority and preemption）的特性在 Kubernetes 1.11 中是 beta状态，并默认激活，在1.14 中是 GA（Generally Available 正式发布）状态。如下表所示：

| Kubernetes Version | Priority and Preemption State | Enabled by default |
| ------------------ | ----------------------------- | ------------------ |
| 1.8                | alpha                         | no                 |
| 1.9                | alpha                         | no                 |
| 1.10               | alpha                         | no                 |
| 1.11               | beta                          | yes                |
| 1.14               | stable                        | yes                |


::: danger 警告
如果集群中的用户并不是全部可信，可能会出现一些恶意的用户，创建最高优先级的 Pod，使得其他的 Pod 被驱逐或者不能正常调度。可以通过在 [ResourceQuota](/learning/k8s-advanced/policy/rq.html) 中指定 priority 来解决此问题。
:::

[[TOC]]

</AdSenseTitle>

## 使用Pod优先权

在 Kubernetes v1.11 及以后的版本中，参考下面的步骤启用Pod优先权（Pod priority and preemption）：

1. 添加一个或多个 [PriorityClass](#priorityclass)
2. 创建Pod时指定 [priorityClassName](#pod-priority) 为其中一个 PriorityClass。（通常在 Deployment/StatefulSet等 的 `spec.template.spec.priorityClassName` 中指定，而不是直接创建 Pod）

如果你尝试过该特性之后，想要将其禁用，你必须在 API Server 和 Scheduler 的命令行启动参数中移除 `PodPriority` 参数，或者将其设置为 `false`。禁用该特性之后：
* 已经创建的 Pod 将保留 priority 字段，但是抢占行为（preemption)被禁用了，且 priority 字段也将被忽略
* 新创建的 Pod 将不能在设置 `priorityClassName` 字段

## 如何禁用 preemtion

> preemption，英文愿意为先买权，此处可以理解为抢占行为

::: tip
在 Kubernetes 1.12+，当前集群资源不足时，关键的 Pod 将依赖于抢占权才能被调度。因此，并不建议禁用 preemption
:::

::: tip
在 Kubernetes 1.15+，如果 `NonPreemptingPriority` 被启用了，PriorityClass 可以设置为 `preemptionPolicy: Never`，此时，该 PriorityClass 的所有 Pod 将不会抢占（preempty）其他 Pod 的资源
:::

在 Kubernetes 1.11+，preemption 由 kube-scheduler 的参数 `disablePreemption` 设置，默认为 `false`。如果在您已经知晓上面的提示的情况下，仍然要禁用 preemption，可以将 `disablePreemption` 参数设置为 `true`。

该参数需要通过 YAML 文件配置，而不能通过命令行参数设定。示例配置如下所示：

``` yaml {8}
apiVersion: kubescheduler.config.k8s.io/v1alpha1
kind: KubeSchedulerConfiguration
algorithmSource:
  provider: DefaultProvider

...

disablePreemption: true
```

## PriorityClass

待续 ...

## Pod priority
