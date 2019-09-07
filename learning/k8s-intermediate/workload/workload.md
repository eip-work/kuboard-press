---
layout: LearningLayout
description: 本文介绍了 Kubernetes Controller（控制器）的概念，以及控制器的种类
---

# 控制器 - 概述

Pod（容器组）是 Kubernetes 中最小的调度单元，您可以通过 kubectl 直接创建一个 Pod。Pod 本身并不能自愈（self-healing）。如果一个 Pod 所在的 Node （节点）出现故障，或者调度程序自身出现故障，Pod 将被删除；同理，当因为节点资源不够或节点维护而驱逐 Pod 时，Pod 也将被删除。

Kubernetes 通过引入 Controller（控制器）的概念来管理 Pod 实例。在 Kubernetes 中，您应该始终通过创建 Controller 来创建 Pod，而不是直接创建 Pod。控制器可以提供如下特性：
* 水平扩展（运行 Pod 的多个副本）
* rollout（版本更新）
* self-healing（故障恢复）

  例如：当一个节点出现故障，控制器可以自动地在另一个节点调度一个配置完全一样的 Pod，以替换故障节点上的 Pod。

在 Kubernetes 中，广泛使用的控制器有：

* [Deployment](./wl-deployment.html) <Badge text="Kuboard 已支持" type="success"/>
* [StatefulSet](./wl-statefulset.html) <Badge text="Kuboard 已支持" type="success"/>
* [DaemonSet](./wl-daemonset.html) <Badge text="Kuboard 已支持" type="success"/>

* [CronJob](./wl-cronjob.html) <Badge text="Kuboard 正在计划中" type="warn"/>
* [Jobs - Run to Completion](./wl-job.html) <Badge text="Kuboard 正在计划中" type="warn"/>

* ReplicaSet <Badge text="Kuboard 暂不支持" type="warn"/>
* ReplicationController <Badge text="Kuboard 暂不支持" type="warn"/>
* Garbage Collection <Badge text="Kuboard 暂不支持" type="warn"/>
* TTL Controller for Finished Resources <Badge text="Kuboard 暂不支持" type="warn"/>
