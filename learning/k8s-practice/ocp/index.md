---
vssueId: 69
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台OCP_open_capacity_platform微服务能力开放平台
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes微服务,Kubernetes Spring Cloud
---

# 在Kubernetes上部署SpringCloud


## 使用 Kuboard 在 K8S 上部署 OCP

本系列文章将描述如何使用 Kuboard 在 Kubernetes 上部署 OCP 的如下组件：
* eureka-server
* auth-server
* user-center
* api-gateway
* back-center

该系列文章的目录如下：
* 准备
  * [准备OCP的构建环境和部署环境](/learning/k8s-practice/ocp/prepare.html)
  * [构建docker镜像并推送到仓库](/learning/k8s-practice/ocp/build.html)
* 部署
  * [部署顺序](/learning/k8s-practice/ocp/sequence.html)
  * [在K8S上部署eureka-server](/learning/k8s-practice/ocp/eureka-server.html)
  * [在K8S上部署mysql](/learning/k8s-practice/ocp/mysql.html)
  * [在K8S上部署redis](/learning/k8s-practice/ocp/redis.html)
  * [在K8S上部署auth-server](/learning/k8s-practice/ocp/auth-server.html)
  * [在K8S上部署user-center](/learning/k8s-practice/ocp/user-server.html)
  * [在K8S上部署api-gateway](/learning/k8s-practice/ocp/api-gateway.html)
  * [在K8S上部署back-center](/learning/k8s-practice/ocp/back-center.html)
  * [重新审视配置信息](/learning/k8s-practice/ocp/review.html)
* 多环境
  * [导出部署配置](/learning/k8s-practice/ocp/export.html)
  * [导入部署配置](/learning/k8s-practice/ocp/import.html)

::: tip OCP答疑
与 OCP 相关的问题，请加 OCP 的 QQ群 483725710

[进入 OCP 首页](https://gitee.com/owenwangwen/open-capacity-platform)

<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=8d8ae84021c97e31010fd8e44f518e1129ebd3be9ee0c004ec2cf68e8860b6c2" onclick="openOutboundLink(this)">一键加入OCP社群 <img style="vertical-align: top;" border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="ocp&amp;cp微服务" title="ocp&amp;cp微服务"></a>

<p>
	<img src="./index.assets/143151_36a5c07e_869801.png" style="max-width: 160px;" alt="Kubernetes教程_OCP_QQ群"></img>
</p>
:::

## OCP 介绍

[![star](https://gitee.com/owenwangwen/open-capacity-platform/badge/star.svg?theme=white)](https://gitee.com/owenwangwen/open-capacity-platform/stargazers)

[![fork](https://gitee.com/owenwangwen/open-capacity-platform/badge/fork.svg?theme=white)](https://gitee.com/owenwangwen/open-capacity-platform/members)

[![Fork me on Gitee](https://gitee.com/owenwangwen/open-capacity-platform/widgets/widget_6.svg)](https://gitee.com/owenwangwen/open-capacity-platform)


简称ocp是基于layui+springcloud的企业级微服务框架(用户权限管理，配置中心管理，应用管理，....),其核心的设计目标是分离前后端，快速开发部署，学习简单，功能强大，提供快速接入核心接口能力，其目标是帮助企业搭建一套类似百度能力开放平台的框架；  

- 基于layui前后端分离的企业级微服务架构  
- 兼容spring cloud netflix & spring cloud alibaba  
- 优化Spring Security内部实现，实现API调用的统一出口和权限认证授权中心  
- 提供完善的企业微服务流量监控，日志监控能力   
- 提供完善的压力测试方案  
- 提供完善的灰度发布方案  
- 提供完善的微服务部署方案 



## **技术介绍**

![Kubernetes教程_Open_Capacity_Platform介绍](./index.assets/091013_fffdcf8b_869801-20190922081321664.png)

## **功能介绍** 
- 统一安全认证中心
	- 支持oauth的四种模式登录
	- 支持用户名、密码加图形验证码登录
	- 支持第三方系统单点登录
- 微服务架构基础支撑
	- 服务注册发现、路由与负载均衡
	- 服务熔断与限流
	- 统一配置中心
	- 统一日志中心
	- 分布式锁
	- 分布式任务调度器
- 系统服务监控中心
	- 服务调用链监控 
	- 应用吞吐量监控 
	- 服务降级、熔断监控
	- 微服务服务监控
- 能力开放平台业务支撑
	- 网关基于应用方式API接口隔离
	- 下游服务基于RBAC权限管理，实现细粒度控制
	- 代码生成器中心  
	- 网关聚合服务内部Swagger接口文档
	- 统一跨域处理
	- 统一异常处理
- docker容器化部署
	- 基于rancher的容器化部署
	- 基于docker的elk日志监控
	- 基于docker的服务动态扩容 

## 代码结构

<p>
	<img src="./index.assets/214757_e3408bdc_869801.png" style="max-width: 720px;" alt="Kubernetes教程_OCP_代码结构"></img>
</p>

## 能力开放管理平台

![Kubernetes教程_OCP_能力开放管理平台](./index.assets/image-20190922181901564.png)



## APM 监控

![Kubernetes教程_OCP_APM监控](./index.assets/image-20190922181953050.png)



## 系统监控

![Kubernetes教程_OCP_系统监控](./index.assets/image-20190922182043859.png)

## 灰度发布

![Kubernetes教程_OCP_灰度发布](./index.assets/image-20190922182129758.png)



## 阿波罗配置中心

![Kubernetes教程_OCP_阿波罗配置中心](./index.assets/185527_3e2e61a9_1441068.jpeg)




## 用户权益
- 允许免费用于学习、毕设、公司项目、私活等。

## 禁止事项
- 代码50%以上相似度的二次开源。
- 注意：若禁止条款被发现有权追讨9999的授权费。
