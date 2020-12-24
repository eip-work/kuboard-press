---
vssueId: 33
layout: LearningLayout
description: 本文介绍了 Kubernetes Deployment 的概念、行为及使用方法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Deployment,Kubernetes部署
---

# 介绍 Deployment

参考文档： Kubernetes  [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)、 [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)

<AdSenseTitle/>

术语表

| 英文       | 英文简称   | 中文   |
| ---------- | ---------- | ------ |
| Pod        | Pod        | 容器组 |
| Controller | Controller | 控制器 |
| ReplicaSet | ReplicaSet | 副本集 |
| Deployment | Deployment | 部署   |



## 背景知识

### Pod 容器组

Pod 容器组是 Kubernetes 中最小的调度单元，更多信息请参考 [容器组 - 概述](/learning/k8s-intermediate/workload/pod.html)

### ReplicaSet 副本集

ReplicaSet 副本集的用途是为指定的 Pod 维护一个副本（实例）数量稳定的集合。下面是一个定义 ReplicaSet 副本集的 yaml 文件：

``` yaml {8,9,12}
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google_samples/gb-frontend:v3
```

ReplicaSet 副本集的主要几个字段有：
* selector  确定哪些 Pod 属于该副本集
* replicas  副本集应该维护几个 Pod 副本（实例）
* template  Pod 的定义

副本集将通过创建、删除 Pod 容器组来确保符合 selector 选择器的 Pod 数量等于 replicas 指定的数量。当符合 selector 选择器的 Pod 数量不够时，副本集通过使用 template 中的定义来创建 Pod。

在 Kubernetes 中，并不建议您直接使用 ReplicaSet，推荐使用 Deployment，由 Deployment 创建和管理 ReplicaSet。 关于副本集的更多信息，请参考 Kubernetes 文档 [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)

## Deployment 概述

Deployment 是最常用的用于部署无状态服务的方式。Deployment 控制器使得您能够以声明的方式更新 Pod（容器组）和 ReplicaSet（副本集）。

::: tip 声明式配置
声明的方式是相对于非声明方式而言的。例如，以滚动更新为例，假设有 3 个容器组，现需要将他们的容器镜像更新为新的版本。
* 非声明的方式，您需要手动逐步执行以下过程：
  * 使用 kubectl 创建一个新版本镜像的容器组
  * 使用 kubectl 观察新建容器组的状态
  * 新建容器组的状态就绪以后，使用 kubectl 删除一个旧的容器组
  * 重复执行上述过程，直到所有容器组都已经替换为新版本镜像的容器组
* 声明的方式，您只需要执行：
  * 使用 kubectl 更新 Deployment 定义中 spec.template.spec.containers[].image 字段
> Deployment 实际执行滚动更新时的行为，本文后面有详细描述
:::

以“声明”的方式管理 Pod 和 ReplicaSet，其本质是将一些特定场景的一系列运维步骤固化下来，以便快速准确无误的执行。Deployment 为我们确定了如下几种运维场景：

* [创建Deployment](./create.html) 创建 Deployment 后，Deployment 控制器将立刻创建一个 ReplicaSet 副本集，并由 ReplicaSet 创建所需要的 Pod。
* [更新Deployment](./update.html) 更新 Deployment 中 Pod 的定义（例如，发布新版本的容器镜像）。此时 Deployment 控制器将为该 Deployment 创建一个新的 ReplicaSet 副本集，并且逐步在新的副本集中创建 Pod，在旧的副本集中删除 Pod，以达到滚动更新的效果。
* [回滚Deployment](./rollback.html) 回滚到一个早期 Deployment 版本。
* [伸缩Deployment](./scale.html) 水平扩展 Deployment，以便支持更大的负载，或者水平收缩 Deployment，以便节省服务器资源。
* [暂停和继续Deployment](./pause.html) 
* [查看Deployment状态](./status.html)
* [清理策略](./cleanup.html)
* [金丝雀发布](./canary.html)
