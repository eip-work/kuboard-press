---
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台OCP_open_capacity_platform微服务能力开放平台
---

# Open_Capacity_Platform介绍


## 使用 Kuboard 在 K8S 上部署 OCP

从2019年9月23日起，将陆续连载如何使用 Kuboard 部署 OCP 的如下组件：
* eureka-server
* auth-server
* user-center
* api-gateway
* back-center

与 OCP 相关的问题，请加 OCP 的 QQ 社群

![OCP社群](https://images.gitee.com/uploads/images/2019/0604/143151_36a5c07e_869801.png)

[进入 OCP 首页](https://gitee.com/owenwangwen/open-capacity-platform)

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

![Kubernetes教程_Open_Capacity_Platform介绍](https://images.gitee.com/uploads/images/2019/0523/091013_fffdcf8b_869801.png)

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
  <img src="https://images.gitee.com/uploads/images/2019/0819/214757_e3408bdc_869801.png" style="max-width: 720px;"></img>
</p>

## 能力开放管理平台   

<table>
	<tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0330/112405_4b826028_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/215719_7280e0a7_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/215805_ccc6f047_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/215849_3579d1f2_869801.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/215938_54aac61f_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220014_980f9120_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220042_ecb2e2f9_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220109_a46454f2_869801.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220255_2cca26da_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220334_eb7e8ccc_869801.png"/></td>
		<td><img src="https://images.gitee.com/uploads/images/2019/0908/220403_d8941a88_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0908/220448_3e4ec4f0_869801.png"/></td>
    </tr>
	<tr>
		<td><img src="https://images.gitee.com/uploads/images/2019/0908/220535_058f4e5c_869801.png"/></td>
		<td><img src="https://images.gitee.com/uploads/images/2019/0908/220908_e83f7a53_869801.png"/></td>
		<td><img src="https://images.gitee.com/uploads/images/2019/0329/212515_6b74c76a_869801.png"/></td>
    <td><img src="https://images.gitee.com/uploads/images/2019/0731/144404_6e9f86e3_869801.png"/></td>
  </tr>
</table>
 
##  APM监控
<table>
	<tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0330/105610_52def254_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0330/105638_5c7ab9ac_869801.png"/></td>
    </tr>
	<tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0330/105713_c9c94365_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0330/105736_ac478159_869801.png"/></td>
    </tr>
     
</table>

## 系统监控
<table>
	<tr>
		<td><img src="https://images.gitee.com/uploads/images/2019/0523/085501_ee047496_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0401/230332_f777ea8d_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0401/230430_3eb6b5e0_869801.png"/></td>
    </tr>
	<tr>
		<td><img src="https://images.gitee.com/uploads/images/2019/0722/164150_6c0ce093_869801.png"/></td>
		<td><img src="https://images.gitee.com/uploads/images/2019/0722/163241_9b29852f_869801.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0722/163356_08ec244d_869801.png"/></td>
    </tr>
</table>

## 灰度发布功能演示   
 
ocp灰度发布功能(参考dev分支) 
a.先启动 register-center 注册中心的 eureka-server 注册服务  
b.在启动 api-gateway 网关服务 
c.再启动 oauth-center 认证中心 oauth-server 认证服务 
d.在启动 business-center 业务中心的 对应服务 user-center 
d.启动gray-center的discovery-console  
e.启动gray-center的discovery-console-desktop    
 
灰度管理UI  
用户名:admin      
密码  :admin  

<table>
	<tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0126/125451_c3b6224d_1147840.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0126/125450_b42073c5_1147840.png"/></td>
    </tr>
	<tr>
        <td><img src="https://images.gitee.com/uploads/images/2019/0126/125450_66e3a8db_1147840.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0126/125451_28b1bc41_1147840.png"/></td>
    </tr>
     
</table>

请参考
[https://github.com/Nepxion/Docs/blob/master/discovery-doc/README_QUICK_START.md](https://github.com/Nepxion/Docs/blob/master/discovery-doc/README_QUICK_START.md)，感谢军哥分享  

## 阿波罗配置中心
Apollo（阿波罗）是携程框架部研发并开源的一款生产级的配置中心产品，它能够集中管理应用在不同环境、不同集群的配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性，适用于微服务配置管理场景。  
集成方案  
https://gitee.com/owenwangwen/config-center  
功能图  
![](https://images.gitee.com/uploads/images/2019/0525/185527_3e2e61a9_1441068.jpeg)   
阿波罗官方地址   
https://github.com/ctripcorp/apollo  

## Spring Cloud Alibaba 初探
https://gitee.com/owenwangwen/open-capacity-platform/tree/alibaba

## 用户权益
- 允许免费用于学习、毕设、公司项目、私活等。

## 禁止事项
- 代码50%以上相似度的二次开源。
- 注意：若禁止条款被发现有权追讨9999的授权费。
