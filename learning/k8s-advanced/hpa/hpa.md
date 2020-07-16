---
# vssueId: 66
layout: LearningLayout
description: Kubernetes_自动水平伸缩_Horizontal_Pod_Autoscaler
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限
---

# 自动伸缩

<AdSenseTitle/>

本文翻译自 Kubernetes 官网 [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)。

Horizontal Pod Autoscaler 根据观察到的 CPU 利用率（或某些由应用程序提供的 [custom metrics](https://git.k8s.io/community/contributors/design-proposals/instrumentation/custom-metrics-api.md)）自动调整控制器（Replication Controller / Deployment / ReplicaSet / StatefulSet）的 Pod 的数量。Horizontal Pod Autoscaler 不能应用于不可伸缩的对象，例如 DaemonSet。

Horizontal Pod Autoscaler 被实现为 Kubernetes 中的一个 API 对象及一个 [控制器](/learning/k8s-bg/architecture/controller.html)。API 对象定义了控制器的行为；控制器则周期性地调整 Deployment（或 Replication Contoller / ReplicaSet / StatefulSet）中的 Pod 副本数（replicas字段），使其匹配用户在 API 对象中定义的平均 CPU 利用率。



## Horizontal Pod Autoscaler 的工作方式

<p>
<img src="./hpa.assets/horizontal-pod-autoscaler.png" style="width: 450px;"></img>
</p>

Horizontal Pod Autoscaler 被实现为一个控制循环，通过 controller manager 的参数 `--horizontal-pod-autoscaler-sync-period` 可以控制该循环的周期（默认值为 15 秒）。

在每个循环周期内，controller manager 所有 HorizontalPodAutoscaler 对象中指定的度量信息（metrics）。查询的方式可以是通过 resource metrics API （metrics-server，pod 的资源度量信息CPU/内存）或者 custom metrics API（所有其他度量信息）。

* 如果 HorizontalPodAutoscaler 中指定了使用 pod 的资源度量（例如 CPU）来说，则 controller 从 resource metrics API （通常使用 metrics-server）获取目标 Pod 的度量信息。如果 HorizontalPodAutoscaler 中指定的是资源利用率，则 controller 将度量值除以 Pod 中定义的容器的资源请求，得到一个以百分比表示的资源利用率；如果 HorizontalPodAutoscaler 中指定的是原始值，则直接使用从 resource metrics API 中获取的结果。此时，contoller 将所有目标 Pod 的资源利用率（或原始值）求平均，并计算出一个比例，用于调整期望副本数的值。
  > 请注意，如果某些 Pod 的容器没有设置 CPU 的 [资源请求](/learning/k8s-intermediate/config/computing-resource.html)，则 controller 不能计算该 Pod 的 CPU 利用率，contoller 也就不能 针对 HorizontalPodAutoscaler 中定义的 CPU 利用率执行任何操作。请参考 [算法](#算法) 章节，了解更多与之相关的内容。
* 对于 Pod 的自定义度量（custom metrics），controller 的工作机制与上述过程相似，区别在于，自定义度量只支持原始值，不支持资源利用率的值。
* 

## 算法
