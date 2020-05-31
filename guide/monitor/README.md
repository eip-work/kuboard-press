---
description: Kuboard中的Kubernetes监控套件
---

# 监控套件

<AdSenseTitle/>

监控套件分全局监控套件和局部监控套件两种类型：
* 全局监控套件
  * Prometheus + Graphana，可以对 节点、节点上的容器组进行资源层监控：CPU、内存、磁盘、网络等，请参考 [监控 Example](/guide/example/monitor.html)
* 局部监控套件
  * Prometheus监控套件（mysql/nginx/jvm）<Badge type="warn">后续提供</Badge>
    * 监控 mysql/nginx/jvm 等
    * 使用 eureka 做服务发现（需要优化，改成使用 kubernetes api object 进行服务发现）
  * Pinpoint 监控套件 <Badge type="warn">后续提供</Badge>
    * 用于链路追踪及APM
