---
vssueId: 121
layout: LearningLayout
sharingTitle: Kubernete中经常被忽略的最重要的概念：控制器模式
description: Kubernete教程_Kubernetes控制器_在机器人技术和自动化技术中，控制循环是一个控制系统状态的无限循环。控制循环的例子有：房间里的恒温器。在恒温器上设定好目标温度，就是告诉该控制循环你想要的目标状态。房间里的实际温度，是当前状态恒温器通过打卡或关闭加热装置，不断地使当前状态接近于目标状态
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Master-Node通信
---

# 控制器

<AdSenseTitle/>

在机器人技术和自动化技术中，**控制循环** 是一个控制系统状态的无限循环。房间里的恒温器就是**控制循环**的一个例子

* 在恒温器上设定好目标温度，就是在告诉该 **控制循环** 你想要的 ***目标状态***。
* 房间里的实际温度，是 ***当前状态***
* 恒温器通过打开或关闭加热装置，不断地使 ***当前状态*** 接近于 ***目标状态***

在 Kubernetes 中，**控制器** 就是上面所说的 **控制循环**，它不断监控着集群的状态，并对集群做出对应的变更调整。每一个控制器都不断地尝试着将 ***当前状态*** 调整到 ***目标状态***。

## 控制器模式

在 Kubernetes 中，每个控制器至少追踪一种类型的资源。这些资源对象中有一个 `spec` 字段代表了目标状态。资源对象对应的控制器负责不断地将当前状态调整到目标状态。

理论上，控制器可以自己直接执行调整动作，然而，在Kubernetes 中，更普遍的做法是，控制器发送消息到 API Server，而不是直接自己执行调整动作。

### 通过APIServer进行控制

以 Kubernetes 中自带的一个控制器 Job Controller 为例。Kubernetes 自带的控制器都是通过与集群中 API Server 交互来达到调整状态的目的。

Job 是一种 Kubernetes API 对象，一个 Job 将运行一个（或多个）Pod，执行一项任务，然后停止。当新的 Job 对象被创建时，Job Controller 将确保集群中有合适数量的节点上的 kubelet 启动了指定个数的 Pod，以完成 Job 的执行任务。Job Controller 自己并不执行任何 Pod 或容器，而是发消息给 API Server，由其他的控制组件配合 API Server，以执行创建或删除 Pod 的实际动作。

当新的 Job 对象被创建时，目标状态是指定的任务被执行完成。Job Controller 调整集群的当前状态以达到目标状态：创建 Pod 以执行 Job 中指定的任务

控制器同样也会更新其关注的 API 对象。例如：一旦 Job 的任务执行结束，Job Controller 将更新 Job 的 API 对象，将其标注为 `Finished`。（这有点儿像是恒温器将指示灯关闭，以表示房间里的温度已经到达指定温度。）

### 直接控制

某些特殊的控制器需要对集群外部的东西做调整。例如，您想用一个控制器确保集群中有足够的节点，此时控制器需要调用云供应商的接口以创建新的节点或移除旧的节点。这类控制器将从 API Server 中读取关于目标状态的信息，并直接调用外部接口以实现调整目标。

Kubernetes中，真的提供了一个控制器可以水平伸缩集群中的节点。请参考 [Cluster autoscaling](https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#cluster-autoscaling)

## 目标状态 vs 当前状态

Kubernetes 使用了 `云原生`（cloud-native）的视角来看待系统，并且可以持续应对变化。您的集群在运行的过程中，任何时候都有可能发生突发事件，而控制器则自动地修正这些问题。这就意味着，本质上，您的集群永远不会达到一个稳定不变的状态。

这种通过控制器监控集群状态并利用负反馈原理不断接近目标状态的系统，相较于那种完成安装后就不再改变的系统，是一种更高级的系统形态，尤其是在您将运行一个大规模的复杂集群的情况下。

## 设计

作为一个底层设计原则，Kubernetes使用了大量的控制器，每个控制器都用来管理集群状态的某一个方面。普遍来说，任何一个特定的控制器都使用一种 API 对象作为其目标状态，并使用和管理多种类型的资源，以达到目标状态。

使用许多个简单的控制器比使用一个全能的控制器要更加有优势。控制器可能会出故障，而这也是在设计 Kubernetes 时要考虑到的事情。

::: tip
可能存在多种控制器可以创建或更新相同类型的 API 对象。为了避免混淆，Kubernetes 控制器在创建新的 API 对象时，会将该对象与对应的控制 API 对象关联，并且只关注与控制对象关联的那些对象。
* 例如，Deployment 和 Job，这两类控制器都创建 Pod。Job Controller 不会删除 Deployment Controller 创建的 Pod，因为控制器可以通过标签信息区分哪些 Pod 是它创建的。
:::
<!--FIXME 标签 的链接-->

## 运行控制器的方式

Kubernetes 在 kube-controller-manager 中运行了大量的内建控制器（例如，Deployment Controller、Job Controller、StatefulSet Controller、DaemonSet Controller 等）。这些内建控制器提供了 Kubernetes 非常重要的核心功能。Kubernetes 可以运行一个 master 集群，以实现内建控制器的高可用。

您也可以安装一些运行在 kube-controller-manager 之外的控制器，这些控制器通常是对 Kubernetes 已有功能的一些扩展。或者，在必要的情况下，您也可以自己编写自己需要的控制器，将其部署为一组 Pod，或者在 Kubernetes 集群之外部署。如何选择，取决于您想要用这个控制器做什么。参考 [Extending your Kubernetes Cluster](https://kubernetes.io/docs/concepts/extend-kubernetes/extend-cluster/)
