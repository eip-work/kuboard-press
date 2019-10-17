---
# vssueId: 135
layout: LearningLayout
description: Kubernetes教程_
meta:
  - name: keywords
    content: Kubernetes
---

# Limit Ranges

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
