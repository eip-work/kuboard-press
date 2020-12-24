---
vssueId: 65
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_配置和使用_Secret
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,使用Secret
---

# Secret概述

<AdSenseTitle/>

参考文档： Kubernetes 文档 [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

## 概述

Kubernetes `Secret` 对象可以用来储存敏感信息，例如：密码、OAuth token、ssh 密钥等。如果不使用 `Secret`，此类信息可能被放置在 Pod 定义中或者容器镜像中。将此类敏感信息存储到 `Secret` 中，可以更好地：
* 控制其使用
* 降低信息泄露的风险

用户可以直接创建 Secret，Kubernetes 系统也会创建一些 Secret。

Secret有如下几种使用方式：
* 作为 Pod 的数据卷挂载
* 作为 Pod 的环境变量
* kubelet 在抓取容器镜像时，作为 docker 镜像仓库的用户名密码

## 内建Secret

Service Account 将自动创建 Secret

Kubernetes 自动创建包含访问 Kubernetes APIServer 身份信息的 Secret，并自动修改 Pod 使其引用这类 Secret。

如果需要，可以禁用或者自定义自动创建并使用 Kubernetes APIServer 身份信息的特性。然而，如果您期望安全地访问 Kubernetes APIServer，您应该使用默认的 Secret 创建使用过程。

如需了解更多细节，参考 [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

## 自建Secret

您可以使用如下方式创建自己的 Secret：

* [使用 kubectl 创建 Secret](./create-kubectl.html)
* [手动创建 Secret](./create-manually.html)
* [使用 Generator 创建 Secret](./create-generator.html)
* [使用 Kuboard 创建 Secret](./create-kuboard.html)

## 解码和编辑

Kubenetes 中，Secret 使用 base64 编码存储，您可以将其 [解码](./decode-edit.html) 获得对应信息的原文，创建 Secret 之后，您也可以再次 [编辑](./decode-edit.html) Secret
