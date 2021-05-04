---
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台SpringBlade
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes微服务,Kubernetes Spring Cloud
---

# Nacos 介绍

<AdSenseTitle/>

在 Spring Blade 中，Nacos 被用于：
* 服务发现
* 微服务配置信息管理

Nacos 是 Spring Blade 中一个非常重要的基础软件，也是部署 Spring Blade 时首先要部署的一个软件。

本文描述了如何在 K8S 上部署以 mysql 数据库作为后端存储的单机版 nacos，未来将进一步提供 nacos 集群版的部署文档。

部署 nacos 时，需要用到如下两个镜像，这两个镜像均来自于 nacos 官方发布到 docker hub 的镜像，为了给大家提供更快速的国内下载速度，将其推送到华为的镜像仓库，供大家测试使用。

| 镜像标签                                                   | 镜像来源                   | 来源链接                                    |
| ---------------------------------------------------------- | -------------------------- | ------------------------------------------- |
| `swr.cn-east-2.myhuaweicloud.com/blade/nacos-server:2.0.0` | `nacos/nacos-server:2.0.0` | [nacos/nacos-server](https://hub.docker.com/r/nacos/nacos-server) |
| `swr.cn-east-2.myhuaweicloud.com/blade/nacos-mysql:5.7`    | `nacos/nacos-mysql:5.7`    | [nacos/nacos-mysql](https://hub.docker.com/r/nacos/nacos-mysql)  |


部署 Nacos 的步骤主要有：

* [部署 nacos-mysql](./nacos-mysql.html)
* [部署 nacos](./nacos-install.html)
* [导入配置到 nacos](./nacos-config.html)
