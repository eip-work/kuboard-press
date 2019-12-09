---
description: 使用Kuboard对Kubernetes上容器组的端口进行转发。
---

# 端口转发

<AdSenseTitle/>

微服务环境中，各个服务都通过 TCP / UDP 端口的形式提供访问。按调用者所在位置、通信协议的形式来划分，大致有如下几种情况：

| 调用者所在位置 | 通信协议     | 临时性 | 常见场景                                                     | 推荐配置方式                                                 |
| -------------- | ------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| VPC外          | http / https | 日常性 | 用户从互联网（亦可能是公司内网）<br />访问 web 页面，或者 restful 接口 | Kubernetes  Ingress<br />（可在Kuboard中直接配置 ***互联网入口*** ） |
| VPC外          | tcp / udp    | 临时性 | 例如，开发者临时需要访问数据库端口、Redis端口等；            | 在客户端所在机器配置 kubectl，<br />并<span style="color: #F56C6C;">通过 kubectl port-forwad 进行端口转发</span> |
| VPC外          | tcp / udp    | 日常性 | 暂不讨论                                                     |                                                              |
| VPC内/集群外   | http / https | 日常性 | 通过接口网关为周边系统提供服务                               | Kubernetes Service NodePort<br />（可在Kuboard中直接配置 ***访问方式/VPC内访问*** ） |
| VPC内/集群外   | tcp / udp    | 同上   | 同上                                                         |                                                              |
| 集群内         | http / https | 日常性 | **场景1**：Web层访问微服务网关<br /> **场景2**：微服务网关调用微服务，微服务之间的互相调用等。 | **场景1**：Kubernetes Service ClusterIP <br />（可在Kuboard中直接配置 ***访问方式/集群内访问*** ）<br /> **场景2**：Spring Cloud中使用Eureka/Consul等服务发现<br />（Kuboard中 ***访问方式/不配置*** ） |
| 集群内         | tcp / udp    | 日常性 | 微服务访问数据库、微服务访问Redis等                          | Kubernetes Service ClusterIP <br />（可在Kuboard中直接配置 ***访问方式/集群内访问*** ） |
