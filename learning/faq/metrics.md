---
vssueId: 174
layout: LearningLayout
description: Kubernetes教程_本文解释了Kuboard中度量信息的获取方式
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Service
---

# Metrics

Kuboard 界面上显示 Metrics（性能指标）信息时，调用了 Kubernetes 的 [Metrics API](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/)，

## 为什么 Kuboard 显示的总内存比机器的实际内存要小？

Kuboard 调用 kubernetes api [Node v1 core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#node-v1-core) 获取节点的总内存信息。该接口返回结果中，关于内存信息有如下两个部分：

``` json
"status": {
  "capacity": {
    "cpu": "2",
    "ephemeral-storage": "41147472Ki",
    "hugepages-1Gi": "0",
    "hugepages-2Mi": "0",
    "memory": "7733512Ki",
    "pods": "110"
  },
  "allocatable": {
    "cpu": "2",
    "ephemeral-storage": "37921510133",
    "hugepages-1Gi": "0",
    "hugepages-2Mi": "0",
    "memory": "7631112Ki",
    "pods": "110"
  }
}
```

其中，`capacity` 代表节点的总容量，`allocatable` 代表 kubernetes 可以使用的容量。Kuboard 在 `计算资源` 界面上显示的节点总内存大小来自于此接口返回结果的 `status.allocatable.memory` 字段，总CPU大小来自于 `status.allocatable.cpu` 字段。

## 为什么 Kuboard 显示的当前使用内存与linux显示不匹配？

Kuboard 调用 kubernetes [Metrics API](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/) 获取节点 CPU 和内存使用情况，metrics-server 通过节点上的 kubelet 获取 30s 时间窗口内的 CPU 和内存使用情况，且其统计口径是由 kubelet 管理的 docker 进程的 CPU 和内存使用情况，与直接使用 linux 的 `top` 命令或 `free -h` 命令查看时的统计口径并不相同。
