---
vssueId: 51
layout: LearningLayout
description: 本文描述了 Kubernetes DaemonSet 的概念、行为及用法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,DaemonSet
---

# DaemonSet 的替代选项

> 参考文档： Kubernetes 文档 [Alternatives to DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#alternatives-to-daemonset)

<AdSenseTitle/>

DaemonSet 有如下替代选项可以选择

## Init Scripts

您可以通过脚本（例如，`init`、`upstartd`、`systemd`）直接在节点上启动一个守护进程。相对而言，DaemonSet 在处理守护进程时，有如下优势：

* 使用与应用程序相同的方式处理守护进程的日志和监控
* 使用与应用程序相同的配置语言和工具（例如：Pod template、kubectl）处理守护进程
* 在容器中运行守护进程，可为守护进程增加 resource limits 等限定

## Pods

您可以直接创建 Pod，并指定其在某一个节点上运行。相对而言，使用 DaemonSet 可获得如下优势：

* Pod 终止后，DaemonSet 可以立刻新建 Pod 以顶替已终止的 Pod。Pod 终止的原因可能是：
  * 节点故障
  * 节点停机维护

## 静态 Pod

您可以在 Kubelet 监听的目录下创建一个 Pod 的 yaml 文件，这种形式的 Pod 叫做 [静态 Pod（static pod）](https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/)。与 DaemonSet 不同，静态 Pod 不能通过 kubectl 或者 Kuboard 进行管理。静态 Pod 不依赖 Kubernetes APIServer 的特点，使得它在引导集群启动的过程中非常有用。

::: warning
静态 Pod 将来可能被不推荐使用 （deprecated）
:::

## Deployment

DaemonSet 和 Deployment 一样，他们都创建长时间运行的 Pod（例如 web server、storage server 等）

* Deployment 适用于无状态服务（例如前端程序），对于这些程序而言，扩容（scale up）/ 缩容（scale down）、滚动更新等特性比精确控制 Pod 所运行的节点更重要。

* DaemonSet 更适合如下情况：
  * Pod 的副本总是在所有（或者部分指定的）节点上运行
  * 需要在其他 Pod 启动之前运行
