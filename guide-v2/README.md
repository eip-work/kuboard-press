---
vssueId: 70
description: 搭建一个基于Kubernetes的私有化云平台
---

# Kubernetes JumpStart

<AdSenseTitle/>

大量的企业已经开始将应用向云原生迁移，本文描述了一种方案，可以帮助企业以最低的成本快速搭建基于 Kubernetes 的云原生应用环境，并展示了如何在其中部署、诊断、运维微服务应用。

## 参考架构

## Kuboard 介绍

Kuboard 官方文档请参考 [https://kuboard.cn](https://kuboard.cn)

Kuboard 是一款免费的 Kubernetes 管理工具，提供了丰富的功能（如下所示）。基于 Kubernetes + Kuboard 以及其他一些开源软件的组合，您可以轻松搭建一套属于自己的容器云平台。

* Kubernetes 基本管理功能
  * 节点管理
  * 名称空间管理
  * 存储类/存储卷管理
  * 控制器（Deployment/StatefulSet/DaemonSet/CronJob/Job/ReplicaSet）管理
  * Service/Ingress 管理
  * ConfigMap/Secret 管理
  * CustomerResourceDefinition 管理
* Kubernetes 问题诊断
  * Top Nodes / Top Pods
  * 事件列表及通知
  * 容器日志及终端
  * KuboardProxy (kubectl proxy 的在线版本)
  * PortForward (kubectl port-forward 的快捷版本)
  * 复制文件 （kubectl cp 的在线版本）
* 认证与授权
  * Github/GitLab 单点登录
  * KeyCloak 认证
  * LDAP 认证
  * 完整的 RBAC 权限管理
* Kuboard 特色功能
  * Kuboard 官方套件
    * Grafana+Prometheus 资源监控
    * Grafana+Loki+Promtail 日志聚合
  * Kuboard 自定义名称空间布局
  * Kuboard 中英文语言包
  * 保存 YAML 前与当前版本对比
