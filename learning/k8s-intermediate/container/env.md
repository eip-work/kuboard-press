---
vssueId: 123
layout: LearningLayout
description: Kubernetes教程_容器镜像在Kubernetes的Pod中使用容器镜像之前，您必须将其推送到一个镜像仓库（或者使用仓库中已经有的容器镜像）。在 Kubernetes 的 Pod 定义中定义容器时，必须指定容器所使用的镜像，容器中的image字段支持与docker命令一样的语法，包括私有镜像仓库和标签。
meta:
  - name: keywords
    content: Kubernetes 教程,K8S 教程,容器环境变量
---

# 容器的环境变量

> 参考文档： [Container Environment Variables](https://kubernetes.io/docs/concepts/containers/container-environment-variables/)

Kubernetes为容器提供了一系列重要的资源：
* 由镜像、一个或多个数据卷合并组成的文件系统
* 容器自身的信息
* 集群中其他重要对象的信息

## 容器的信息

在容器中执行 `hostname` 命令或者在libc 中执行 [gethostname](http://man7.org/linux/man-pages/man2/gethostname.2.html) 函调用，获得的是容器所在 Pod 的名字。

Pod 的名字，以及 Pod 所在名称空间可以通过 [downward API](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/) 注入到容器的环境变量里。

用户也可以为容器自定义环境变量，请参考 [使用ConfigMap配置您的应用程序](/learning/k8s-intermediate/config/config-map.html)

## 集群的信息

在容器创建时，集群中所有的 Service 的连接信息将以环境变量的形式注入到容器中。例如，已创建了一个名为 `Foo` 的 Service，此时再创建任何容器时，该容器将包含如下环境变量：

```
FOO_SERVICE_HOST=<Service的ClusterIP>
FOO_SERVICE_PORT=<Service的端口>
```

详细信息请参考 [Service-服务发现]](/learning/k8s-intermediate/service/service-details.html#服务发现)
