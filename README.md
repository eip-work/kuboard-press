---
home: false
layout: HomePage
title: Kuboard官网_Kubernetes教程_K8S安装_管理界面
description: Kuboard是一款免费的Kubernetes管理界面_同时该网站还提供Kubernetes安装文档_K8S_部署_入门_免费中文Kubernetes教程_以及在Kubernetes上部署SpringCloud的详细文档
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes安装,K8S安装
actionText: 在线体验
actionText2: 开始使用 →
actionLink2: /overview/
features:
- title: Kubernetes安装文档
  details: 快速安装Kubernetes，每天有超过200个用户参考此文档完成Kubernetes安装，碰到问题可QQ在线答疑
  link: /install/install-k8s.html
- title: Kubernetes免费教程
  details: 免费但绝不降低品质，活跃的QQ社群，与网友共同学习进步
  link: /learning/
- title: Kubernetes管理界面
  details: Kubernetes图形化管理界面，无需编写 yaml 文件即可完成应用程序在 Kubernetes 上的部署和维护
  link: /install/install-dashboard.html
- title: Kubernetes + Spring Cloud实战
  details: 参考文档，一步一步完成Spring Cloud微服务架构在Kubernetes上的部署和管理
  link: /learning/k8s-practice/ocp
---

## 简介

Kuboard 是一款基于 Kubernetes 的微服务管理界面。

点击此处，查看 [Kuboard 安装文档](https://kuboard.cn/install/install-dashboard.html)


## Kubernetes安装文档

* <a href="https://kuboard.cn/install/install-k8s.html" target="_blank">Kubernetes (K8S)v1.16.1 安装文档</a>
  * 每天超过200名网友参考此文档完成Kubernetes安装
  * QQ群在线答疑
* [Kubernetes 高可用安装文档](https://kuboard.cn/install/install-kubernetes.html)
* [Kubernetes升级到1.16.x](https://kuboard.cn/install/upgrade-k8s/1.15.x-1.16.x.html)

## Kubernetes免费教程

Kubernetes教程的主要依据是：Kubernetes 官网文档，以及使用 Kuboard 落地 Spring Cloud 微服务的实战经验

### **Kubernetes 介绍**

  * [什么是Kubernetes](https://kuboard.cn/learning/k8s-bg/what-is-k8s.html)
  * [Kubernetes组件](https://kuboard.cn/learning/k8s-bg/component.html)

### Kubernetes入门
  * [0. 学习Kubernetes基础知识](https://kuboard.cn/learning/k8s-basics/kubernetes-basics.html) (10分钟)
    * [1. 部署一个应用程序](https://kuboard.cn/learning/k8s-basics/deploy-app.html) (5分钟)
    * [2. 查看 Pods / Nodes](https://kuboard.cn/learning/k8s-basics/explore.html) (10分钟)
    * [3. 公布应用程序](https://kuboard.cn/learning/k8s-basics/expose.html) (10分钟)
    * [4. 伸缩应用程序](https://kuboard.cn/learning/k8s-basics/scale.html) (10分钟)
    * [5. 执行滚动更新](https://kuboard.cn/learning/k8s-basics/update.html) (10分钟)
  * [6. 复习Kubernetes核心概念](https://kuboard.cn/learning/k8s-basics/k8s-core-concepts.html) (10分钟)

### Kubernetes进阶
  * 架构
    * [节点](https://kuboard.cn/learning/k8s-bg/architecture/nodes.html)
    * [集群内通信](https://kuboard.cn/learning/k8s-bg/architecture/com.html)
  * 工作负载
    * [容器组 - 概述](https://kuboard.cn/learning/k8s-intermediate/workload/pod.html)
    * [容器组 - 生命周期](https://kuboard.cn/learning/k8s-intermediate/workload/pod-lifecycle.html)
    * [容器组 - 初始化容器](https://kuboard.cn/learning/k8s-intermediate/workload/init-container.html)
    * [控制器 - 概述](https://kuboard.cn/learning/k8s-intermediate/workload/workload.html)
    * [控制器 - Deployment](https://kuboard.cn/learning/k8s-intermediate/workload/wl-deployment/) 
    * [控制器 - StatefulSet](https://kuboard.cn/learning/k8s-intermediate/workload/wl-statefulset/) 
    * [控制器 - DaemonSet](https://kuboard.cn/learning/k8s-intermediate/workload/wl-daemonset/) 
    * [控制器 - Job](https://kuboard.cn/learning/k8s-intermediate/workload/wl-job/) 
    * [控制器 - CronJob](https://kuboard.cn/learning/k8s-intermediate/workload/wl-cronjob/) 
  * 服务发现、负载均衡、网络
    * [Service](https://kuboard.cn/learning/k8s-intermediate/service/service.html) 
    * [Service 详细描述](https://kuboard.cn/learning/k8s-intermediate/service/service-details.html)
    * [Service 类型](https://kuboard.cn/learning/k8s-intermediate/service/service-types.html)
    * [Service/Pod 的 DNS](https://kuboard.cn/learning/k8s-intermediate/service/dns.html) 
    * [Service 连接应用程序](https://kuboard.cn/learning/k8s-intermediate/service/connecting.html) 
    * [Ingress 通过互联网访问您的应用](https://kuboard.cn/learning/k8s-intermediate/service/ingress.html)
  * 存储
    * [数据卷 Volume](https://kuboard.cn/learning/k8s-intermediate/persistent/volume.html)
    * [存储卷 PV 和存储卷声明 PVC](https://kuboard.cn/learning/k8s-intermediate/persistent/pv.html)
    * [存储类 StorageClass](https://kuboard.cn/learning/k8s-intermediate/persistent/storage-class.html)
    * [自建 NFS 服务](https://kuboard.cn/learning/k8s-intermediate/persistent/nfs.html) 
  * 配置
    * [使用私有 registry 中的 docker 镜像](https://kuboard.cn/learning/k8s-intermediate/private-registry.html)
    * [使用 ConfigMap 配置您的应用程序](https://kuboard.cn/learning/k8s-intermediate/config/config-map.html)
    * [管理容器的计算资源](https://kuboard.cn/learning/k8s-intermediate/config/computing-resource.html) 
    * [将容器调度到指定的节点](https://kuboard.cn/learning/k8s-intermediate/config/assign-pod-node.html) 
    * [污点和容忍 taints and toleration](https://kuboard.cn/learning/k8s-intermediate/config/taints-toleration/) 
    * [Secrets](https://kuboard.cn/learning/k8s-intermediate/config/secrets/) 

### Kubernetes高级

  * Kubernetes 日志可视化
  * Kubernetes 监控
  * Kubernetes 联邦

### Kubernetes实战

在 Kubernetes 上部署 Spring Cloud 微服务：

* [概述](https://kuboard.cn/learning/k8s-practice/spring-cloud/)

在 Kubernetes 上部署 Spring Cloud 微服务：(Open Capacity Platform)

* 准备
  * [准备OCP的构建环境和部署环境](https://kuboard.cn/learning/k8s-practice/ocp/prepare.html)
  * [构建docker镜像并推送到仓库](https://kuboard.cn/learning/k8s-practice/ocp/build.html)
* 部署
  * [部署顺序](https://kuboard.cn/learning/k8s-practice/ocp/sequence.html)
  * [在K8S上部署eureka-server](https://kuboard.cn/learning/k8s-practice/ocp/eureka-server.html)
  * [在K8S上部署mysql](https://kuboard.cn/learning/k8s-practice/ocp/mysql.html)
  * [在K8S上部署redis](https://kuboard.cn/learning/k8s-practice/ocp/redis.html)
  * [在K8S上部署auth-server](https://kuboard.cn/learning/k8s-practice/ocp/auth-server.html)
  * [在K8S上部署user-center](https://kuboard.cn/learning/k8s-practice/ocp/user-center.html)
  * [在K8S上部署api-gateway](https://kuboard.cn/learning/k8s-practice/ocp/api-gateway.html)
  * [在K8S上部署back-center](https://kuboard.cn/learning/k8s-practice/ocp/back-center.html)
  * [重新审视配置信息](https://kuboard.cn/learning/k8s-practice/ocp/review.html)
* 多环境
  * [导出部署配置](https://kuboard.cn/learning/k8s-practice/ocp/export.html)
  * [导入部署配置](https://kuboard.cn/learning/k8s-practice/ocp/import.html)

Kuboard官网免费提供Kubernetes教程、K8S教程、K8S安装文档、Kubernetes+SpringCloud实战文档，学习过程中如有疑问，请加QQ群在线答疑。
