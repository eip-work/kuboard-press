---
description: Kubernete教程_为什么要使用kuboard_而不是直接使用kubectl？
---

# 为什么要使用Kuboard_而不是直接用kubectl

## Kuboard v.s. kubectl

Kuboard 有如下优势：
* 无需编写 YAML 文件
* 轻松支持多环境管理
* 纯图形化使用

Kuboard 有如下限制：
* 并不能 100% 覆盖 kubectl 的功能
* 当前不支持 istio
* 当前不支持某些不常用配置（Bare Pod/ReplicaSet/ReplicationController/TTL Controller 等）
* 要求 Workload (Deployment/StatefulSet/DaemonSet)、Service、Ingress 的 `.metadata.name` 相同

## Kuboard 是一个非常优秀的解决方案

Kuboard + Kubernetes 已经在许多项目中成功交付投产了 Spring Cloud / Dubbo 等微服务架构。

### 技术人员的考量



### 项目管理者的考量
