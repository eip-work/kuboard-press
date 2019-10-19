---
vssueId: 143
titlePrefix: LimitRange
layout: LearningLayout
description: Kubernetes教程_默认情况下_容器在 Kubernetes 集群上运行时_不受计算资源的限制_使用Resourcequota集群管理员可以针对名称空间限定资源的使用情况
meta:
  - name: keywords
    content: Kubernetes
---

# 概述

> 参考文档：[Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

<AdSenseTitle>

默认情况下，容器在 Kubernetes 集群上运行时，不受 [计算资源](/learning/k8s-intermediate/config/computing-resource.html) 的限制。使用 [Resource quota](./rq.html)，集群管理员可以针对名称空间限定资源的使用情况。在名称空间内部，一个 Pod（或容器）的资源消耗不受限制。此时的顾虑在于，可能有一个 Pod（或容器）独占了名称空间的大部分资源。Limit Range 是一种用来限定名称空间内 Pod（或容器）可以消耗资源数量的策略（Policy）。

[[TOC]]

KUbernetes `LimitRange` 对象可以：
* 限制名称空间中每个 Pod 或容器的最小最大计算资源
* 限制名称空间中每个 PersistentVolumeClaim 可使用的最小最大存储空间
* 限制名称空间中计算资源请求request、限定limit之间的比例
* 设置名称空间中默认的计算资源的 request/limit，并在运行时自动注入到容器中

</AdSenseTitle>

## 启用 Limit Range

执行命令 `kubectl api-resources` 可查看您的集群是否支持 Limit Range，输出结果如下所示：
``` {7}
NAME                              SHORTNAMES   APIGROUP                       NAMESPACED   KIND
bindings                                                                      true         Binding
componentstatuses                 cs                                          false        ComponentStatus
configmaps                        cm                                          true         ConfigMap
endpoints                         ep                                          true         Endpoints
events                            ev                                          true         Event
limitranges                       limits                                      true         LimitRange
namespaces                        ns                                          false        Namespace
nodes                             no                                          false        Node
persistentvolumeclaims            pvc                                         true         PersistentVolumeClaim
persistentvolumes                 pv                                          false        PersistentVolume
pods                              po                                          true         Pod
podtemplates                                                                  true         PodTemplate
```

通常 LimitRange 是默认启用的。

<!-- FIXME 如何启用 LimitRange -->

## 基本介绍

* 集群管理员在名称空间中创建一个 `LimitRange` 对象
* 用户在名称空间中创建工作负载等对象，例如 Pod、Container、PersistentVolumeClaim 等
* 针对那些没有设置 [计算资源请求request和限制limit](/learning/k8s-intermediate/config/computing-resource.html) 的 Pod 和容器，`LimitRanger` 根据名称空间中的 `LimitRange` 对象为其设定默认的资源请求和响应，并确保 Pod 和容器对计算资源的实际消耗不会超过指定的值
* 如果创建或更新对象（Pod、Container、PersistentVolumeClaim）的请求与 Limit Range 的限定相冲突，apiserver 将返回 HTTP status 状态码 `403 FORBIDDEN`，以及相应的错误提示信息
* 如果名称空间中激活了 limit range 来限定 cpu 和内存等计算资源的使用，则，用户创建 Pod、Container 时，必须指定 cpu 或内存的 `request` 和 `limit`，否则系统将拒绝创建 Pod
* Kubernetes 只在 Pod 创建阶段检查 `LimitRange` 的限定，而不在 Pod 运行时执行任何检查

使用 LimitRange 的例子有：
* 在一个总容量为 8G内存 16核CPU 的 2 节点集群上，限定某个名称空间中的 Pod 使用 100m的CPU请求（request）且不超过 500m的CPU上限（limit），200Mi的内存请求（request）且不超过 600Mi的内存上线（limit）
* 为没有定义cpu和内存请求的容器，指定默认的 CPU 请求（request）和限制（limit）均为 150m，默认的内存请求为 300Mi

当名称空间总的 limit 小于名称空间中 Pod/Container 的 limit 之和时，将发生资源争夺的现象，容器或者 Pod 将不能创建。

在资源争夺现象发生时，或者修改 limitrange 的时候，这两种情况都不会影响到已经创建的 Pod/Container。



更多内容请参考：

* [限定容器的计算资源](./lr_container.html)
* [限定Pod的计算资源](./lr_pod.html)
* [限定存储资源](./lr_storage.html)
* [限定 Limit/Request 比例](./lr_ratio.html)

<!-- Examples -->
