---
vssueId: 147
layout: LearningLayout
description: Kubernetes教程_通过Pod安全策略_您可以在更细的颗粒度上授权您的用户执行Pod的创建和更新的操作
meta:
  - name: keywords
    content: Kubernetes 教程,Resource Quota,ResourceQuota
---

# 概述

<AdSenseTitle >

> 参考文档：[Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

**FEATURE STATE**： `Kubernetes v1.16` <Badge type="warning">beta</Badge>

通过Pod安全策略_您可以在更细的颗粒度上授权您的用户执行Pod的创建和更新的操作

* [概述](#概述)
* [激活Pod安全策略](#激活Pod安全策略)

</AdSenseTitle>


## 概述

`Pod Security Policy` 是一个集群级别（不在任何名称空间中）的 Kubernetes 对象，它控制了Pod定义中安全敏感的一些内容。`Pod Security Policy` 对象可以定义一系列 Condition（条件），只有当这些 Condition（条件）满足时，Pod才可以在系统中运行，同时，`Pod Security Policy` 

## 激活Pod安全策略
