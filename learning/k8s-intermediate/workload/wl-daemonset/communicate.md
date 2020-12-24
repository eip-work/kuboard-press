---
vssueId: 49
layout: LearningLayout
description: 本文描述了 Kubernetes DaemonSet 的概念、行为及用法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,DaemonSet
---

# 与 DaemonSet 通信

> 参考文档 Kubernetes 文档 [Communicating with Daemon Pods](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#communicating-with-daemon-pods)

<AdSenseTitle/>

与 DaemonSet 容器组通信的模式有：

* **Push：** DaemonSet 容器组用来向另一个服务推送信息，例如数据库的统计信息。这种情况下 DaemonSet 容器组没有客户端
* **NodeIP + Port：** DaemonSet 容器组可以使用 `hostPort`，此时可通过节点的 IP 地址直接访问该容器组。客户端需要知道节点的 IP 地址，以及 DaemonSet 容器组的 端口号
* **DNS：** 创建一个 [headless service](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services)，且该 Service 与 DaemonSet 有相同的 Pod Selector。此时，客户端可通过该 Service 的 DNS 解析到 DaemonSet 的 IP 地址
* **Service：** 创建一个 Service，且该 Service 与 DaemonSet 有相同的 Pod Selector，客户端通过该 Service，可随机访问到某一个节点上的 DaemonSet 容器组
