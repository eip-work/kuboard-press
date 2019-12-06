---
vssueId: 64
layout: LearningLayout
description: Kubernetes教程_Kubernetes中的亲和性与反亲和性_Affinity_and_Anti-Affinity
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Affinity,anti-affinity,亲和性,反亲和性
---

# 亲和性与反亲和性

> 参考文档：[Affinity and anti-affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity)

<AdSenseTitle/>

`nodeSelector` 提供了一个非常简单的方式，将 Pod 限定到包含特定标签的节点上。亲和性与反亲和性（affinity / anti-affinity）特性则极大地扩展了限定的表达方式。主要的增强点在于：
1. 表达方式更加有效（不仅仅是多个精确匹配表达式的“和”关系）
2. 可以标识该规则为“soft” / “preference” （软性的、偏好的）而不是 hard requirement（必须的），此时，如果调度器发现该规则不能被满足，Pod 仍然可以被调度
3. 可以对比节点上（或其他拓扑域 topological domain）已运行的其他 Pod 的标签，而不仅仅是节点自己的标签，此时，可以定义类似这样的规则：某量类 Pod 不能在同一个节点（或拓扑域）上共存
