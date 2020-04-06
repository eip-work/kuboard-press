---
# vssueId: 159
layout: LearningLayout
description: Kubernetes教程_授权用户查看CRD列表
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,CustomResourfce
---

# 授权用户查看CRD列表

<AdSenseTitle>

> 参考文档： [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)

自定义资源（Custom Resource）是对 Kubernetes API 的扩展。本文描述了如何添加自定义资源到 Kubernetes 集群，以及何时使用 standalone service。提供了两种添加自定义资源的方法，以及如何选择应该使用哪种方法。

[[TOC]]

</AdSenseTitle>

## Custom Resources

资源（Resource）是指 [Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview/) 的一个端点，存储了一组特定类型的 [API 对象](/learning/k8s-intermediate/obj/k8s-object.html)。例如，内建的 pods 资源包含了一组 Pod 对象。
