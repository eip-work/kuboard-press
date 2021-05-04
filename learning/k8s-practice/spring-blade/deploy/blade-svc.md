---
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台SpringBlade
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes微服务,Kubernetes Spring Cloud
---

# 部署所有的微服务

<AdSenseTitle/>

SpringBlade 所需要部署的微服务有 9 个之多，包括有：

* blade-admin
* blade-auth
* blade-desk
* blade-develop
* blade-log
* blade-report
* blade-resource
* blade-system
* blade-user

每一个微服务在 K8S 里的部署参数相差不大，鉴于这个特点，在部署微服务时，我们将先 [部署其中一个微服务 blade-admin](./blade-admin.html)，然后再利用 Kuboard 中的 ***复制工作负载*** 的功能，从 `blade-admin` 复制以 [部署其余 8 个微服务工作负载](./blade-others.html)。