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

默认情况下，容器在 Kubernetes 集群上运行时，不受 [计算资源](/learning/k8s-intermediate/config/computing-resource.html) 的限制。使用 [Resource quota](./rq.html)，集群管理员可以针对名称空间限定资源的使用情况。在名称空间内部，一个 Pod（或容器）的资源消耗不受限制。此时的顾虑在于，可能有一个 Pod（或容器）独占了名称空间的大部分资源。Limit Range 是一种用来限定名称空间内 Pod（或容器）可以消耗资源数量的策略。

[[TOC]]

</AdSenseTitle>


正在撰写 ... 
