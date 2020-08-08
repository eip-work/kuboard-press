---
vssueId: 130
layout: LearningLayout
description: Kubernete教程_kube-scheduler是 Kubernetes 中的默认调度器。负责为 Pod 在集群中选择合适的节点。本文解释了在规模较大的 Kubernetes 集群中如何对 kube-scheduler 进行性能调优。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 调度,Kubernetes Scheduling
---

# 调优

<AdSenseTitle/>

> 参考文档： [Scheduler Performance Tuning](https://kubernetes.io/docs/concepts/scheduling/scheduler-perf-tuning/)

**FEATURE STATE:** `Kubernetes v1.14` <Badge type="warning">beta</Badge>

[kube-scheduler](/learning/k8s-advanced/schedule/#kube-scheduler) 是 Kubernetes 中的默认调度器。负责为 Pod 在集群中选择合适的节点。

集群中能够满足某一个 Pod 的资源需求的节点，我们称其为 ***可选节点***（feasible node）。调度器在执行调度时，执行的步骤如下：
1. 找出该 Pod 的所有 ***可选节点***
2. 按照某种方式对每一个 ***可选节点*** 评分
3. 选择评分最高的 ***可选节点***
4. 将最终选择结果通知 API Server，`这个过程，我们称其为绑定（binding）`

本文解释了在规模较大的 Kubernetes 集群中如何对 kube-scheduler 进行性能调优。

## 参与评分的节点的比例

在 Kubernetes v1.12 版本之前，kube-scheduler 检查集群中的所有节点是否对 Pod 可选，并对 ***可选节点*** 进行评分。在 Kubernetes v1.12 中，添加了一个新的特性，使得 kube-scheduler 在找到了一定数量的 ***可选节点*** 后，变停止继续寻找更多 ***可选节点***。 这个特性可以显著提高 kube-scheduler 在大规模 Kubernetes 集群中的性能。通过 `percentageOfNodesToScore` 这个配置参数，我们可以控制 kube-scheduler 在找到多少 ***可用节点*** 之后变停止继续寻找。该参数的可选值为 1 - 100 之间的数字，大于 100 的将被认为是 100%，0 代表忽略该配置。

在 Kubernetes v1.14 中，如果不定义 `percentageOfNodesToScore`，kube-scheduler 将按照一个线性公式来确定该参数的取值。按照该公式：
* 100节点集群，`percentageOfNodesToScore` 为 50%
* 5000节点集群，`percentageOfNodesToScore` 为 10%
* `percentageOfNodesToScore` 的最小值为 5%；（即，不论集群规模有多大，按照该公式，`percentageOfNodesToScore` 最终取值为 5%，除非集群管理员将该参数配置为小于 5% 的值）

下面的例子中，将 `percentageOfNodesToScore` 配置为 50%

``` yaml
apiVersion: kubescheduler.config.k8s.io/v1alpha1
kind: KubeSchedulerConfiguration
algorithmSource:
  provider: DefaultProvider

...

percentageOfNodesToScore: 50
```

::: tip 例外
当集群中可选节点数量少于 50 时，调度器仍将继续检查剩余的节点。
:::

如果要禁用该特性，可将 `percentageOfNodesToScore` 设定为 100。

### 调优 percentageOfNodesToScore

`percentageOfNodesToScore` 的取值在 1 到 100 之间，默认值基于集群节点的数量计算得出。并且，将至少要找出 50 个可选节点，否则仍会检查集群中所有节点是否对 Pod 可用。这就意味着，当集群的节点数不超过 1000 时，修改该参数并不会对实际结果产生多大的影响。Kubernetes 有意做了此设计，因为在小规模集群中，kube-scheduler 的性能差异不大。当集群节点数超过 1000 时，调整此参数将有可能显著提升 kube-scheduler 的性能。

关于 `percentageOfNodesToScore`，一个重要的考虑因素是，如果只检查了集群中一小部分节点对 Pod 是否可选，也就意味着更多的节点未能参与该 Pod 的评分。此时存在的可能性是，未参与评分的节点数量可能实际得分会比最终选中的节点得分更高，即，Pod 并没有找到集群中“最”适合其运行的节点。因此，`percentageOfNodesToScore` 不应该设置为一个过低的数值。通常，不要将其设置为低于 10 的数字。在如下情况都满足时，可以考虑更低的数字：
* kube-scheduler 的吞吐量（每秒钟执行调度的次数）非常重要
* 节点的评分是否为最高，没那么重要

当集群节点数量不超过 1000甚至更少时，不推荐修改该参数的默认取值，此时调整此参数对 kube-scheduler 性能的影响不大。

### 调度器遍历节点的方法

为了让集群中的每个节点都有公平的机会被 Pod 选中，调度器按照 round-robin（轮询）的方式遍历节点。您可以认为，节点被放在一个数组中，调度器从数组的第一个元素开始检查节点是否为 ***可选节点***，直到其找到足够多数量（由`percentageOfNodesToScore`指定）的 ***可选节点***。当调度器调度下一个 Pod 时，将继续从上一次停止的地方往后面便利节点的数组，到达数组的末尾时，又从数组的第一个元素继续遍历。

如果节点在多个高可用区，调度器将遍历多个高可用区终端额节点，以确保不同的可用区都有合适的机会。例如，假设 6 个节点分布于两个可用区：
```
Zone 1:  Node 1, Node 2, Node 3, Node 4
Zone 2:  Node 5, Node 6
```
调度器将按照下面的顺序评估节点是否为可选节点：
```
Node 1, Node 5, Node 2, Node 6, Node 3, Node 4
```
到达结尾 Node 4 后，又从 Node 1 继续遍历。
