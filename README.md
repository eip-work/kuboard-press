---
home: true
# heroImage: /overview.png
layout: HomePage
actionText: 在线体验
# actionLink: `http://demo.kuboard.cn/#/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`
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

[点击查看在线文档](https://www.kuboard.cn/#from_github)

![Demo](./overview/README.assets/1564841972085.gif)


# Kubernetes 免费教程

本教程的主要依据是：Kubernetes 官网文档，以及使用 Kuboard 落地 Spring Cloud 微服务的实战经验

## **Kubernetes 入门**
  * [0. 学习Kubernetes基础知识](www.kuboard.cn/learning/k8s-basics/kubernetes-basics.html) (10分钟)
    * [1. 部署第一个应用程序](www.kuboard.cn/learning/k8s-basics/deploy-app.html) (5分钟)
    * [2. 查看 Pods / Nodes](www.kuboard.cn/learning/k8s-basics/explore.html) (10分钟)
    * [3. 公布应用程序](www.kuboard.cn/learning/k8s-basics/expose.html) (10分钟)
    * [4. 伸缩应用程序](www.kuboard.cn/learning/k8s-basics/scale.html) (10分钟)
    * [5. 执行滚动更新](www.kuboard.cn/learning/k8s-basics/update.html) (10分钟)
  * [6. 复习Kubernetes核心概念](www.kuboard.cn/learning/k8s-basics/k8s-core-concepts.html) (10分钟)

## **Kubernetes 进阶**
  * [使用私有 registry 中的 docker 镜像](www.kuboard.cn/learning/k8s-intermediate/private-registry.html)
  * 工作负载
    * [容器组 - 概述](www.kuboard.cn/learning/k8s-intermediate/workload/pod.html)
    * [容器组 - 生命周期](www.kuboard.cn/learning/k8s-intermediate/workload/pod-lifecycle.html)
    * [容器组 - 初始化容器](www.kuboard.cn/learning/k8s-intermediate/workload/init-container.html)
    * [控制器 - 概述](www.kuboard.cn/learning/k8s-intermediate/workload/workload.html)
    * [控制器 - Deployment](www.kuboard.cn/learning/k8s-intermediate/workload/wl-deployment.html) 
    * [控制器 - StatefulSet](www.kuboard.cn/learning/k8s-intermediate/workload/wl-statefulset.html) 
    * [控制器 - DaemonSet](www.kuboard.cn/learning/k8s-intermediate/workload/wl-daemonset.html) 
    * [控制器 - Job](www.kuboard.cn/learning/k8s-intermediate/workload/wl-job.html) 
    * [控制器 - CronJob](www.kuboard.cn/learning/k8s-intermediate/workload/wl-cronjob.html) 
  * 服务发现、负载均衡、网络
    * [Service](www.kuboard.cn/learning/k8s-intermediate/service/service.html) 
    * [Service/Pod 的 DNS](www.kuboard.cn/learning/k8s-intermediate/service/dns.html) 
    * [Service 连接应用程序](www.kuboard.cn/learning/k8s-intermediate/service/connecting.html) 
    * [Ingress 通过互联网访问您的应用](www.kuboard.cn/learning/k8s-intermediate/service/ingress.html)
  * 存储
    * [数据卷 Volume](www.kuboard.cn/learning/k8s-intermediate/persistent/volume.html)
    * [存储卷 PV 和存储卷声明 PVC](www.kuboard.cn/learning/k8s-intermediate/persistent/pv.html)
    * [存储类 StorageClass](www.kuboard.cn/learning/k8s-intermediate/persistent/storage-class.html)
    * [自建 NFS 服务](www.kuboard.cn/learning/k8s-intermediate/persistent/nfs.html) 
  * 配置
    * [使用 ConfigMap 配置您的应用程序](www.kuboard.cn/learning/k8s-intermediate/config-map.html)
    * [管理容器的计算资源](www.kuboard.cn/learning/k8s-intermediate/computing-resource.html) 
    * [将容器调度到指定的节点](www.kuboard.cn/learning/k8s-intermediate/assign-pod-node.html) 
    * [污点和容忍 taints and toleration](www.kuboard.cn/learning/k8s-intermediate/taints-and-toleration.html) 
    * [Secrets](www.kuboard.cn/learning/k8s-intermediate/secret.html) 


## **Kubernetes 实战**

在 Kubernetes 上部署 Spring Cloud 微服务：

* [概述](/micro-service/spring-cloud/index.html)
* [部署服务注册中心]
* [部署数据库]
* [部署微服务]
* [部署服务网关]
* [部署Web前端]
* [管理多环境]
