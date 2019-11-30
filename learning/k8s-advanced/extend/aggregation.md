---
vssueId: 159
layout: LearningLayout
description: Kubernetes教程_通过Kubernetes的aggregation层可以在已提供的K8S核心API之外增加额外的API
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,扩展Kubernetes,扩展K8S
---

# 通过聚合层扩展Kubernetes

<AdSenseTitle>

> 参考文档：[Extending the Kubernetes API with the aggregation layer](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/)

通过Kubernetes的aggregation层可以在已提供的K8S核心API之外增加额外的API

</AdSenseTitle>

Kubernetes聚合层（aggregation layer）可以在集群中安装额外的 Kubernetes 风格的 API，可以是预建的（pre-built）、第三方解决方案（例如 [service-catalog](https://github.com/kubernetes-sigs/service-catalog/blob/master/README.md)）、或者用户创建的 API （可参考 [apiserver-builder](https://github.com/kubernetes-sigs/apiserver-builder-alpha/blob/master/README.md)）

聚合层（aggregation layer）是 kube-apiserver 进程的一部分，只有注册了扩展资源之后，聚合层才工作。注册一个API时，需要添加一个 APIService 对象，并绑定一个 Kubernetes API 中的 url 路径。此时，聚合层会将注册到该 API url 路径（例如，`/apis/myextension.mycompany.io/v1/...`）的请求转发到对应的 APIService 上。

通常来说，APIService 通过 ***extension-apiserver*** （运行在集群中的一个 Pod）实现。如果需要实时地管理新增类型的资源对象，此 extension-apiserver 通常需要和一个或更多控制器一起工作。apiserver-builder 同时提供两者的骨架代码（skeleton）。以 service-catalog 为例，安装 service-catalog 时，将同时安装 extension-apiserver 以及其 Service 的控制器。

extension-apiserver 与 kube-apiserver 的连接应该是低延迟的。特别是，从 kube-apiserver 发起的到 extension-apiserver 的发现请求必须在 5 秒内完成。如果您的 extension-apiserver 不能满足此要求，就会存在问题。当前，设置 kube-apiserver 上的 `EnableAggreatedDiscoveryTimeout=false` feature gate，可以禁用此超时限制。但是这个设置将会在未来的版本移除掉。
