---
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_配置和使用_Secrets
---

# Secrets概述

参考文档： Kubernetes 官网文档 [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

## 概述

Kubernetes `Secret` 对象可以用来储存敏感信息，例如：密码、OAuth token、ssh 密钥等。如果不使用 `Secret`，此类信息可能被放置在 Pod 定义中或者容器镜像中。将此类敏感信息存储到 `Secret` 中，可以更好地：
* 控制其使用
* 降低信息泄露的风险

用户可以直接创建 Secret，Kubernetes 系统也会创建一些 Secret。
