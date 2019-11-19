---
vssueId: 155
layout: LearningLayout
description: Kubernetes教程_本文面向想要构建高可用的应用程序的应用程序管理员_为此您需要理解有哪些毁坏_disruption_可能发生在Pod上_本文也是为集群管理员准备的_如果集群管理员想要将集群的部分管理任务自动化的话_例如_升级_自动伸缩等
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,K8S Disruption,PodDisruptionBudget
---

# 容器组_毁坏Disruptions

<AdSenseTitle>

> 参考文档： [Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)

本文面向想要构建高可用的应用程序的应用程序管理员，为此，您需要理解有哪些毁坏（disruption）可能发生在Pod上。

本文也是为集群管理员准备的，如果集群管理员想要将集群的部分管理任务自动化的话，例如，升级、自动伸缩等。

::: tip
Disruption ---> 毁坏。   暂时没想到合适的词，如果您有想法，请联系我。
:::

[[TOC]]

</AdSenseTitle>


## 自愿的和非自愿的毁坏

除非有人（人或者控制器）销毁Pod，或者出现不可避免的硬件/软件故障，Pod不会凭空消失。此类不可避免的情况，我们称之为非自愿的毁坏（involuntary disruption）。例如：
* 节点所在物理机的硬件故障
* 集群管理员误删了虚拟机
* 云供应商或管理程序故障导致虚拟机被删
* Linux 内核故障
* 集群所在的网络发生分片，导致节点不可用
* 节点资源耗尽，导致 Pod 被驱逐

<!-- FIXME https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/ -->

除了节点资源耗尽这种情况以外，大部分人对其他情况都十分熟悉，因为这并不是 Kubernetes 所特有的情况。

还有一类毁坏，我们称之为自愿的毁坏（voluntary disruptions）。主要包括由应用管理员或集群管理员主动执行的操作。应用管理员可能执行的操作有：
* 删除 Deployment 或其他用于管理 Pod 的控制器
* 修改 Deployment 中 Pod 模板的定义，导致 Pod 重启
* 直接删除一个 Pod

集群管理员可能执行的操作有：
* [排空节点](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/) 以便维修或升级
* 排空节点，以将集群缩容
* 从节点上删除某个 Pod，以使得其他的 Pod 能够调度到该节点上

<!--https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/-->
<!--https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#cluster-autoscaler-->

这些操作可能直接由集群管理员执行，或者由执行管理员运行的自动化脚本执行，也可能由您的集群托管商执行。

向您的集群管理员、云供应商询问，您的集群是否激活了任何形式的自愿的毁坏。如果没有激活，您无需创建 Pod Disruption Budgets。

::: danger 警告
并非所有自愿的毁坏都受 Pod Disruption Budgets 限制，例如，删除 Deployment 或 Pod。
:::

## 处理毁坏（Disruptions）

弥补非自愿的毁坏可以采取的方法有：

* 确保您的 Pod [申请合适的计算资源](/learning/k8s-intermediate/config/computing-resource.html)
* 如果需要高可用，为您的程序运行多个副本，参考 [Deployment](/learning/k8s-intermediate/workload/wl-deployment/)、[StatefulSet](/learning/k8s-intermediate/workload/wl-statefulset/)
* 如果需要更高的高可用性，将应用程序副本分布到多个机架上（参考 [anti-affinity](/learning/k8s-intermediate/config/assign-pod-node.html#affinity-and-anti-affinity)）或分不到多个地区（使用 [multi-zone cluster](https://kubernetes.io/docs/setup/multiple-zones)）

自愿的毁坏，发生频率不定。在一个基础的 Kubernetes 集群中，可能不会发生自愿的毁坏。当你的集群管理员或者托管供应商运行某些额外的服务是可能导致自愿的毁坏发生。例如：
* 更新节点上的软件
* 自定义实现的自动伸缩程序

集群管理员或托管供应商应该为您提供这方面的文档。

Kubernetes 提供了 Disruption Budget 这一特性，以帮助我们在高频次自愿的毁坏会发生的情况下，仍然运行高可用的应用程序。

## Disruption Budget如何工作

应用程序管理员可以为每一个应用程序创建 `PodDisruptionBudget` 对象（PDB）。PDB限制了多副本应用程序在自愿的毁坏情况发生时，最多有多少个副本可以同时停止。例如，一个 web 前端的程序需要确保可用的副本数不低于总副本数的一定比例。

集群管理员以及托管供应商在进行系统维护时，应该使用兼容 PodDisruptionBudget 的工具（例如 `kubectl drain`，此类工具调用 [Eviction API](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/#the-eviction-api)）而不是直接删除 Pod 或者 Deployment。

`kubectl drain` 命令会尝试将节点上所有的 Pod 驱逐掉。驱逐请求可能会临时被拒绝，`kubectl drain` 将周期性地重试失败的请求，直到节点上所有的 Pod 都以终止，或者直到超过了预先配置的超时时间。

PDB 指定了应用程序最少期望的副本数（相对于总副本数）。例如，某个 Deployment 的 `.spec.replicas` 为 5，期望的副本数是 5个。如果他对应的 PDB 允许最低 4个副本数，则 Eviction API（`kubectl drain`）在同一时刻最多会允许1个自愿的毁坏，而不是2个或更多：

* PDB 通过 Pod 的 `.metadata.ownerReferences` 查找到其对应的控制器（Deployment、StatefulSet）
* PDB 通过 控制器（Deployment、StatefulSet）的 `.spec.replicas` 字段来确定期望的副本数
* PDB 通过控制器（Deployment、StatefulSet）的 label selector 来确定哪些 Pod 属于同一个应用程序
* PDB 不能阻止 [非自愿的毁坏](#自愿的和非自愿的毁坏) 发生，但是当这类毁坏发生时，将被计入到当前毁坏数里
* 通过 `kubectl drain` 驱逐 Pod 时，Pod 将被优雅地终止（gracefully terminated，参考 [terminationGracePeriodSeconds](/learning/k8s-intermediate/workload/pod.html#termination-of-pods)）

在滚动更新过程中被删除的 Pod 也将计入到 PDB 的当前毁坏数，但是控制器（例如 Deployment、StatefulSet）在执行滚动更新时，并不受 PDB 的约束。滚动更新过程中，同时可以删除的 Pod 数量在控制器对象（Deployment、StatefulSet等）的定义中规定，参考[滚动更新](/learning/k8s-intermediate/workload/wl-deployment/update.html)。

## PDB Example

假设有一个集群共有三个工作节点，`node-1`、`node-2`、`node-3`，集群上运行了多个应用程序，其中一个 Deployment 有 3个 Pod 副本 `pod-a`、`pod-b`、`pod-c`，并且对应了 PDB 限定 3 个 Pod 中至少要有 2 个可用。另外有一个无关的 `pod-x` 没有对应的PDB。最开始时，Pod 在节点上的分布如下表所示：

| node-1 | node-2                 | node-3                 |
| ---------------------- | ---------------------- | ---------------------- |
| pod-a  ***available*** | pod-b  ***available*** | pod-c  ***available*** |
| pod-x  ***available*** |                        |                        |

此时，假设集群管理员想要重启机器，以便更新 Linux 内核版本修复其中的一个漏洞。集群管理员首先尝试使用 `kubectl drain` 命令排空 `node-1`，此时 `kubectl drain` 将尝试驱逐 `pod-a` 和 `pod-x`。这个操作将立刻能够执行成功，两个 Pod 都将同时进入 `terminating` 状态，集群的状态将如下所示：

| node-1 ***draining***   | node-2                 | node-3                 |
| ---------------------- | ---------------------- | ---------------------- |
| pod-a  ***terminating*** | pod-b  ***available*** | pod-c  ***available*** |
| pod-x  ***terminating*** |                        |                        |

Deployment控制器发现其中的一个 Pod 正在终止，因此，将立刻创建一个新的 Pod 以替代该 Pod，假设其为 `pod-d`。由于 `node-1` 已经被标记不可用（cordoned 警戒线），`pod-d` 将调度到另外一个节点上。另外一个控制器同样也为 `pod-x` 创建了一个替代 Pod `pod-y`。

此时，集群状态如下所示：

| node-1 ***draining***   | node-2                 | node-3                 |
| ---------------------- | ---------------------- | ---------------------- |
| pod-a  ***terminating*** | pod-b  ***available*** | pod-c  ***available*** |
| pod-x  ***terminating*** | pod-d ***starting*** | pod-y |

当 `pod-a` 和 `pod-x` 终止以后，集群状态如下所示：

| node-1 ***drained***  | node-2                 | node-3                 |
| ---------------------- | ---------------------- | ---------------------- |
|  | pod-b  ***available*** | pod-c  ***available*** |
|  | pod-d ***starting*** | pod-y |


此时，如果集群管理员不够耐心，立刻尝试排空 `node-2` 或 `node-3`，则 `kubectl drain` 命令将被组织阻止，因为当前该 Deployment 只有 2个可用的 Pod，而其 PDB 要求至少有 2个可用的 Pod。

当 `pod-d` 完成启动后，集群的状态将如下所示：


| node-1 ***drained***  | node-2                 | node-3                 |
| ---------------------- | ---------------------- | ---------------------- |
|  | pod-b  ***available*** | pod-c  ***available*** |
|  | pod-d ***available*** | pod-y |


此时，集群管理员尝试排空 `node-2`。`kubectl drain` 将按照某种顺序尝试驱逐 node-2 上的两个 Pod，假设先是 `pod-b` 然后是 `pod-d`。驱逐 `pod-b` 的操作将执行成功，但是，当 `kubectl drain` 尝试驱逐 `pod-d` 时，该请求将被拒绝，否则该 Deployment 将只剩下一个可用的 Pod。

Deployment 此时将创建一个 Pod `pod-e` 用于替换 Pod `pod-b`。由于集群中没有足够的资源来调度 `pod-e`，`kubectl drain` 将再次被阻止。集群状态如下所示：

| node-1 ***drained***  | node-2                 | node-3                 | no node |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- |
|  | pod-b  ***available*** | pod-c  ***available*** | pod-e ***pending*** |
|  | pod-d ***available*** | pod-y |  |


此时，集群管理员需要向集群中添加节点，才能继续集群的升级操作。

Kubernetes中，如下因素决定了毁坏发生的频率：
* 应用程序所需要的副本数
* 对一个 Pod 执行优雅终止（gracefully shutdown）所需要的时间
* 新的 Pod 实例启动所需要的时间
* 控制器的类型
* 集群资源的容量

## 区分集群管理员和应用管理员的角色

通常，我们认为集群管理员和应用管理员是不同的角色，且相互之间所共有的知识并不多。对这两个角色的职责进行区分，在如下场景中是非常有用的：
* 多个应用程序团队共享一个 Kubernetes 集群
* 第三方工具或服务将集群的管理自动化

Pod Disruption Budget 是区分两种角色时的必要的界面，双方要就此概念达成共识。如果你所在的组织中，并不严格区分集群管理员和应用程序管理员，则，您并不需要使用 Pod Disruption Budget。

## 如何执行毁坏性的操作（Disruptive Action）

如果您是集群管理员，且需要在所有节点上执行毁坏性的操作（disruptive action），例如节点或系统软件的升级，此时，可能的选择有：

* 接受升级过程中的停机时间
* 故障转移（Failover）到另外一个集群副本
  * 无停机时间，但是将有额外的代价，因为需要由双份的节点以及更多的人力成本来管理集群之间的切换
* 编写容错的应用程序（disruption tolerant application）并使用 PDB
  * 无停机时间
  * 最少的资源冗余
  * 支持更多的集群管理自动化
  * 编写容错的应用程序（disruption-tolerant application）非常需要技巧，但是要容忍自愿的毁坏所做的工作与支持自动伸缩（autoscaling）与容忍非自愿的毁坏（tolerating involuntary disruption）所做的工作是大量重叠的
