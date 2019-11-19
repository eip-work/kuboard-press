---
vssueId: 129
layout: LearningLayout
description: Kubernete教程_在Kubernetes中，调度（Scheduling），指的是为 Pod 找到一个合适的节点，并由该节点上的 kubelet 运行 Pod。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 调度,Kubernetes Scheduling
---

# 调度

<AdSenseTitle/>

> 参考文档： [Kubernetes Scheduler](https://kubernetes.io/docs/concepts/scheduling/kube-scheduler/)

在Kubernetes中，调度（Scheduling），指的是为 Pod 找到一个合适的节点，并由该节点上的 kubelet 运行 Pod。

## 概述

每当集群中有新的 Pod 创建时，Kubernetes 调度器将负责为其找到最合适的节点去运行。调度器按照本文后面描述的原则执行执行调度工作。如果您想了解为什么 Pod 被分配到了具体的某一个节点，或者您打算自己实现一个定制化的调度器，本文可以帮助您更好的理解 Kubernetes 的调度工作。

## kube-scheduler

[kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) 是 Kubernetes 中默认的调度器，并且运行在 Master 组件中。kube-scheduler 虽然是默认的调度器，但是，在您需要的时候，您可以实现自己的调度器以替代 kube-scheduler。

对于每一个新创建的或者未调度的 Pod，kube-scheduler 为其选择一个合适的节点去运行。问题是，每一个 Pod 以及其中的每一个容器，都有不同的资源需求，在调度时，必须选择那些能够满足 Pod 的资源需求的节点才可以。

集群中能够满足某一个 Pod 的资源需求的节点，我们称其为 ***可选节点***（feasible node）。如果某一个 Pod 没有合适的 ***可选节点***，则该 Pod 将一直停留在 `Pending` 状态，直到集群中出现了对于该 Pod 来说合适的 ***可选节点***。

调度器在执行调度时，执行的步骤如下：
1. 找出该 Pod 的所有 ***可选节点***
2. 按照某种方式对每一个 ***可选节点*** 评分
3. 选择评分最高的 ***可选节点***
4. 将最终选择结果通知 API Server，`这个过程，我们称其为绑定（binding）`

在为 ***可选节点*** 评分时，需要考虑的因素有：
* 单个 Pod 和所有 Pod 的资源需求
* 硬件、软件、策略（Policy，例如Limit Range、Resource Quota等）
* 亲和与反亲和（affinity and anti-affinity）
* 数据存储的位置
* 工作负载之间的相互影响
* 其他

## 使用kube-scheduler调度

kube-schduler在执行调度时，将上述过程分成两个阶段来执行：
1. Filtering （筛选/过滤）
2. Scoring （评分）

Filtering（筛选/过滤）阶段，kube-scheduler找出所有对待调度的 Pod 来说合适的 ***可选节点***。例如，`PodFitsResources` 过滤器检查候选节点是否具备足够的资源可以满足 Pod 的资源需求。在筛选阶段结束后，通常可以找出多个 ***可选节点***，如果没有找到，则 Pod 一直停留在 `Pending` 状态。

Scoring（评分）阶段，kube-scheduler 先按照当前可用的评分规则为每一个 ***可选节点*** 频分， 然后，按评分结果对所有的 ***可选节点*** 排序，以找出最适合 Pod 运行的节点。

最后，kube-scheduler 将 Pod 分配到评分最高的 ***可选节点***。如果有多个节点评分一样且最高，kube-scheduler 将随机从中选择一个节点。

### Filtering

Filtering（筛选/过滤）阶段，使用的过滤器有：

* **PodFitsHostPorts**: 检查Pod需要的 `hostPort` 在该节点上是否可用
* **PodFitsHost**：检查 Pod 是否通过 hostname 指定了节点，参考 [将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html#指定节点-nodename)
* **PodFitsResource**：检查节点是否满足 Pod 的资源需求（例如，CPU 和 Memory），参考 [管理容器的计算资源](/learning/k8s-intermediate/config/computing-resource.html)
* **PodMatchNodeSelector**：检查 Pod 的节点选择器（nodeSelector）是否和节点的标签匹配，参考 [将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html#节点选择器-nodeselector)
* **NoVolumeZoneConflict**：评估 Pod 所需要的 数据卷是否在节点上可用（数据卷的 failure zone restrictions）
* **NoDiskConflict**：评估Pod请求的数据卷是否和节点已经加载的数据卷冲突
* **MaxCSIVolumeCount**：计算节点可以挂载多少个 CSI（Container Storage Interface）数据卷，确保不会超出限定的数字
* **CheckNodeMemoryPressure**：检查节点是否有内存紧张的情况
* **CheckNodePIDPressure**：检查节点是否有 PID 短缺的情况
* **CheckNodeDiskPressure**：检查节点是否有存储空间吃紧的情况（文件系统已满，或者将要满）
* **CheckNodeCondition**：检查节点的 Condition 字段，该字段中包含关于 `文件系统已满`、`网络不可用`、`kubelet未就绪` 等相关的条件
* **PodToleratesNodeTaints**：检查 Pod 是否容忍 Pod 的污点，请参考 [污点和容忍](/learning/k8s-intermediate/config/taints-toleration/)
* **CheckVolumeBinding**：检查存储卷声明是否可绑定

### Scoring

* **SelectorSpreadPriority**：将 Pod 分散到不同的节点，主要考虑同属于一个 Service、StatefulSet、Deployment的情况
* **InterPodAffinityPriority**：遍历 `weightedPodAffinityTerm` 并求和，找出结果最高的节点
* **LeastRequestedPriority**：已被消耗的资源最少的节点得分最高。如果节点上的 Pod 越多，被消耗的资源越多，则评分约低
* **MostRequestedPriority**：已被消耗的资源最多的节点得分最高。此策略会把 Pod 尽量集中到集群中的少数节点上
* **RequestedToCapacityRatioPriority**：按 requested / capacity 的百分比评分
* **BalancedResourceAllocation**：资源使用均衡的节点评分高
* **NodePreferAvoidPodsPriority**：根据节点的 annotation `scheduler.alpha.kubernetes.io/preferAvoidPods` 评分。可使用此 annotation 标识哪些 Pod 不能够运行在同一个节点上
* **NodeAffinityPriority**：基于 `PreferredDuringSchedulingIgnoredDuringExecution` 指定的 node affinity 偏好评分。参考 [将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html#affinity-and-anti-affinity)
* **TaintTolerationPriority**： 根据节点上不可容忍的污点数评分
* **ImageLocalityPriority**：有限选择已经有该 Pod 所需容器镜像的节点
* **ServiceSpreadingPriority**：确保 Service 的所有 Pod 尽量分布在不同的节点上。
* **CalculateAntiAffinityPriorityMap**：anti-affinty，参考[将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html#affinity-and-anti-affinity)
* **EqualPriorityMap**：为每个节点指定相同的权重
