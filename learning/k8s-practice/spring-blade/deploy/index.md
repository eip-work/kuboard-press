---
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台SpringBlade
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes微服务,Kubernetes Spring Cloud
---

# 部署 SpringBlade

<AdSenseTitle/>

本系列文档部署的 SpringBlade 为其开源版本 [SpringBlade v3.0.3](https://gitee.com/smallc/SpringBlade/tree/v3.0.3/)，开始部署前，请确保您的环境已就绪，具体要求请参考 [环境准备](../prepare/prepare.html)

本系列文档提供两种部署方式：

## 逐步部署

逐步部署时，您可以按照文档的顺序一个一个地完成 SpringBlade 各组件的部署，这个过程中，您将熟悉如何使用 Kuboard 在 Kubernetes 上部署 Spring 微服务应用程序。

SpringBlade 的组件较多，根据其依赖关系，本系列文档按照如下顺序完成 SpringBlade 的部署：

* 部署配置管理及微服务注册中心 Nacos
  * [Nacos 介绍](./nacos.html)
  * [部署 nacos-mysql](./nacos-mysql.html)
  * [部署 nacos](./nacos-install.html)
  * [导入配置到 nacos](./nacos-config.html)
* 部署其他的基础软件
  * [部署 redis](./m-redis.html)
  * [部署 sentinel](./m-sentinel.html)
  * [部署 saber-db](./m-saber-db.html)
  * [部署 api-gateway](./m-gateway.html)
  * [部署 swagger](./m-swagger.html)
* 部署微服务应用
  * [部署 blade-admin](./blade-admin.html)
  * [部署其他微服务](./blade-others.html)
* [部署 saber-web](./saber-web.html)
* [验证 SpringBlade 部署结果](./validate.html)



## 一键导入

一键导入时，您可以下载一个事先准备好的 yaml 文件，并通过 Kuboard 界面一次性导入 SpringBlade 的所有组件，快速完成 SpringBlade 应用的部署。熟悉这种部署方式，可以帮助您快速地在一个新的环境中部署好您的微服务应用程序。

具体操作请参考 [导入 yaml](../import/import.html)



