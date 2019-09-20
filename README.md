---
home: true
layout: HomePage
actionText: 在线体验
actionText2: 开始使用 →
actionLink2: /overview/
features:
- title: 快速落地 Kubernetes
  details: 快速安装Kubernetes、免费Kubernetes教程、图形化界面、场景化设计
- title: 微服务架构
  details: 经典微服务参考架构：Spring Cloud 实战案例
- title: 多层次监控
  details: 资源层监控、中间件层监控、链路层监控
---

# 简介

Kuboard 是一款基于 Kubernetes 的微服务管理界面。

提供最新版本的 [Kubernetes (K8S) 安装手册](https://www.kuboard.cn/install/install-k8s.html)，协同创作，在线答疑，持续更新。

点击此处，查看 [Kuboard 安装文档](https://kuboard.cn/install/install-dashboard.html)

[点击查看在线文档](https://www.kuboard.cn/#from_github)

![Demo](./overview/README.assets/1564841972085.gif)


# Kubernetes 免费教程

本教程的主要依据是：Kubernetes 官网文档，以及使用 Kuboard 落地 Spring Cloud 微服务的实战经验

## **Kubernetes 入门**
  * [0. 学习Kubernetes基础知识](https://www.kuboard.cn/learning/k8s-basics/kubernetes-basics.html) (10分钟)
    * [1. 部署第一个应用程序](https://www.kuboard.cn/learning/k8s-basics/deploy-app.html) (5分钟)
    * [2. 查看 Pods / Nodes](https://www.kuboard.cn/learning/k8s-basics/explore.html) (10分钟)
    * [3. 公布应用程序](https://www.kuboard.cn/learning/k8s-basics/expose.html) (10分钟)
    * [4. 伸缩应用程序](https://www.kuboard.cn/learning/k8s-basics/scale.html) (10分钟)
    * [5. 执行滚动更新](https://www.kuboard.cn/learning/k8s-basics/update.html) (10分钟)
  * [6. 复习Kubernetes核心概念](https://www.kuboard.cn/learning/k8s-basics/k8s-core-concepts.html) (10分钟)

## **Kubernetes 进阶**
  * [使用私有 registry 中的 docker 镜像](https://www.kuboard.cn/learning/k8s-intermediate/private-registry.html)
  * 工作负载
    * [容器组 - 概述](https://www.kuboard.cn/learning/k8s-intermediate/workload/pod.html)
    * [容器组 - 生命周期](https://www.kuboard.cn/learning/k8s-intermediate/workload/pod-lifecycle.html)
    * [容器组 - 初始化容器](https://www.kuboard.cn/learning/k8s-intermediate/workload/init-container.html)
    * [控制器 - 概述](https://www.kuboard.cn/learning/k8s-intermediate/workload/workload.html)
    * [控制器 - Deployment](https://www.kuboard.cn/learning/k8s-intermediate/workload/wl-deployment/) 
    * [控制器 - StatefulSet](https://www.kuboard.cn/learning/k8s-intermediate/workload/wl-statefulset/) 
    * [控制器 - DaemonSet](https://www.kuboard.cn/learning/k8s-intermediate/workload/wl-daemonset/) 
    * [控制器 - Job](https://www.kuboard.cn/learning/k8s-intermediate/workload/wl-job/) 
    * [控制器 - CronJob](https://www.kuboard.cn/learning/k8s-intermediate/workload/wl-cronjob/) 
  * 服务发现、负载均衡、网络
    * [Service](https://www.kuboard.cn/learning/k8s-intermediate/service/service.html) 
    * [Service 详细描述](/learning/k8s-intermediate/service/service-details.html)
    * [Service 类型](/learning/k8s-intermediate/service/service-types.html)
    * [Service/Pod 的 DNS](https://www.kuboard.cn/learning/k8s-intermediate/service/dns.html) 
    * [Service 连接应用程序](https://www.kuboard.cn/learning/k8s-intermediate/service/connecting.html) 
    * [Ingress 通过互联网访问您的应用](https://www.kuboard.cn/learning/k8s-intermediate/service/ingress.html)
  * 存储
    * [数据卷 Volume](https://www.kuboard.cn/learning/k8s-intermediate/persistent/volume.html)
    * [存储卷 PV 和存储卷声明 PVC](https://www.kuboard.cn/learning/k8s-intermediate/persistent/pv.html)
    * [存储类 StorageClass](https://www.kuboard.cn/learning/k8s-intermediate/persistent/storage-class.html)
    * [自建 NFS 服务](https://www.kuboard.cn/learning/k8s-intermediate/persistent/nfs.html) 
  * 配置
    * [使用 ConfigMap 配置您的应用程序](https://www.kuboard.cn/learning/k8s-intermediate/config/config-map.html)
    * [管理容器的计算资源](https://www.kuboard.cn/learning/k8s-intermediate/config/computing-resource.html) 
    * [将容器调度到指定的节点](https://www.kuboard.cn/learning/k8s-intermediate/config/assign-pod-node.html) 
    * [污点和容忍 taints and toleration](https://www.kuboard.cn/learning/k8s-intermediate/config/taints-and-toleration.html) 
    * [Secrets](https://www.kuboard.cn/learning/k8s-intermediate/config/secret.html) 

## **Kubernetes 高级**

  * Kubernetes 日志可视化
  * Kubernetes 监控
  * Kubernetes 联邦

## **Kubernetes 实战**

在 Kubernetes 上部署 Spring Cloud 微服务：

* [概述](/micro-service/spring-cloud/)
* [部署服务注册中心]
* [部署数据库]
* [部署微服务]
* [部署服务网关]
* [部署Web前端]
* [管理多环境]
