---
description: Kuboard中的Kubernetes监控套件
---

# 监控套件 <Badge text="alpha" type="warn"/>

作者已经在自己的多个项目中使用了监控套件，但是由于在使用时，需要针对具体的项目做少量的定制，因此，监控套件目前还处于 alpha 状态。

监控套件分全局监控套件和局部监控套件两种类型：
* 全局监控套件
  * Prometheus + Graphana，可以对 节点、节点上的容器组进行资源层监控：CPU、内存、磁盘、网络等
* 局部监控套件
  * Prometheus监控套件（mysql/nginx/jvm）
    * 监控 mysql/nginx/jvm 等
    * 使用 eureka 做服务发现（需要优化，改成使用 kubernetes api object 进行服务发现）
    * 代码地址： [eip-monitor-prometheus](https://github.com/eip-work/eip-monitor-prometheus.git)
  * 熔断及限流 Sentinel
    * 用于 Spring Cloud 的熔断及限流
    * 代码地址： [eip-monitor-sentinel](https://github.com/eip-work/eip-monitor-sentinel.git)
  * Pinpoint 监控套件
    * 用于链路追踪及APM
    * 代码地址： [eip-monitor-pinpoint](https://github.com/eip-work/eip-monitor-pinpoint.git)

监控套件都使用开源监控软件，作者做监控套件的出发点主要有两个：
* 简化监控套件的安装和配置
* 将监控套件的入口嵌入到 Node、Pod、Container 的上下文当中，以便快速的定位到监控信息

如果有同学对这两个设想感兴趣，请加群 808894550 并联系群主。

> * 请参考 [监控 example](/guide/example/monitor.html) <Badge text="alpha" type="warn"/> 体验 Kuboard 在监控套件方面的设想
> * 监控套件以插件的形式整合到 Kuboard，在不使用监控套件的情况下，Kuboard 的所有功能都可正常工作
