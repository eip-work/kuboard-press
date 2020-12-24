---
vssueId: 48
layout: LearningLayout
description: 本文描述了 Kubernetes DaemonSet 如何调度 Pod
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,DaemonSet
---

# DaemonSet 是如何调度的

> 参考文档 Kubernetes 文档 [How Daemon Pods are Scheduled](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#how-daemon-pods-are-scheduled)

<AdSenseTitle/>

## 由 DaemonSet 控制器调度

**v1.12以后默认禁用**

通常，Kubernetes Scheduler（调度器）决定了 Pod 在哪个节点上运行。然而 DaemonSet Controller 创建的 Pod 已经指定了 `.spec.nodeName` 字段，因此：
* Node 节点的 [unschedulable](https://kubernetes.io/docs/concepts/architecture/nodes/#manual-node-administration) 字段将被 DaemonSet Controller 忽略
* DaemonSet Controller 可以在 kubernetes scheduler 启动之前创建 Pod，这个特性在引导集群启动的时候非常有用（集群使用者无需关心）

## 由默认调度器调度

**v1.12以后默认启用**

DaemonSet 确保所以符合条件的节点运行了一个指定的 Pod。通常，Kubernetes Scheduler 决定 Pod 在哪个节点上运行。然而如果 DaemonSet 的 Pod 由 DaemonSet Controller 创建和调度，会引发如下问题：

* Pod 的行为不一致：普通的 Pod 在创建后处于 **Pending** 状态，并等待被调度，但是 DaemonSet Pod 创建后，初始状态不是 **Pending**。这会使用户感到困惑
* [Pod 的优先权（preemption）](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/) 由 kubernetes 调度器处理。如果 Pod 优先权被启用，DaemonSet Controller 在创建和调度 Pod 时，不会考虑 Pod 的优先权

Kubernetes v1.12 版本以后，默认通过 kubernetes 调度器来调度 DaemonSet 的 Pod。DaemonSet Controller 将会向 DaemonSet 的 Pod 添加 `.spec.nodeAffinity` 字段，而不是 `.spec.nodeName` 字段，并进一步由 kubernetes 调度器将 Pod 绑定到目标节点。如果 DaemonSet 的 Pod 已经存在了 `nodeAffinity` 字段，该字段的值将被替换。

``` yaml
nodeAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
    - matchFields:
      - key: metadata.name
        operator: In
        values:
        - target-host-name
```

此外， `node.kubernetes.io/unschedulable:NoSchedule` 容忍（[toleration](/learning/k8s-intermediate/config/taints-toleration/)）将被自动添加到 DaemonSet 的 Pod 中。由此，默认调度器在调度 DaemonSet 的 Pod 时可以忽略节点的 **unschedulable** 属性

## 污点和容忍

在调度 DaemonSet 的 Pod 时，污点和容忍（[taints and tolerations](/learning/k8s-intermediate/config/taints-toleration/)）会被考量到，同时，以下容忍（toleration）将被自动添加到 DaemonSet 的 Pod 中：

| Toleration Key                         | Effect     | Version | 描述                                                         |
| -------------------------------------- | ---------- | ------- | ------------------------------------------------------------ |
| node.kubernetes.io/not-ready           | NoExecute  | 1.13+   | 节点出现问题时（例如网络故障），DaemonSet 容器组将不会从节点上驱逐 |
| node.kubernetes.io/unreachable         | NoExecute  | 1.13+   | 节点出现问题时（例如网络故障），DaemonSet 容器组将不会从节点上驱逐 |
| node.kubernetes.io/disk-pressure       | NoSchedule | 1.8+    |                                                              |
| node.kubernetes.io/memory-pressure     | NoSchedule | 1.8+    |                                                              |
| node.kubernetes.io/unschedulable       | NoSchedule | 1.12+   | 默认调度器针对 DaemonSet 容器组，容忍节点的 `unschedulable `属性 |
| node.kubernetes.io/network-unavailable | NoSchedule | 1.12+   | 默认调度器针对 DaemonSet 容器组，在其使用 host network 时，容忍节点的 `network-unavailable` 属性 |
