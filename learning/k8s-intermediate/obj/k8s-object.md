---
vssueId: 133
layout: LearningLayout
description: Kubernetes教程_本文描述了Kubernetes对象与Kubernetes_API的关系_以及您如何在.yaml格式的文件中定义Kubernetes对象
meta:
  - name: keywords
    content: Kubernetes对象,Kubernetes Object
---

# 什么是Kubernetes对象

<AdSenseTitle>

> 参考文档： [Understanding Kubernetes Objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)

本文描述了Kubernetes对象与Kubernetes API的关系，以及您如何在 `.yaml` 格式的文件中定义Kubernetes对象。

</AdSenseTitle>

Kubernetes对象指的是Kubernetes系统的持久化实体，所有这些对象合起来，代表了你集群的实际情况。常规的应用里，我们把应用程序的数据存储在数据库中，Kubernetes将其数据以Kubernetes对象的形式通过 api server存储在 etcd 中。具体来说，这些数据（Kubernetes对象）描述了：
* 集群中运行了哪些容器化应用程序（以及在哪个节点上运行）
* 集群中对应用程序可用的资源
* 应用程序相关的策略定义，例如，重启策略、升级策略、容错策略
* 其他Kubernetes管理应用程序时所需要的信息

一个Kubernetes对象代表着用户的一个意图（a record of intent），一旦您创建了一个Kubernetes对象，Kubernetes将持续工作，以尽量实现此用户的意图。创建一个 Kubernetes对象，就是告诉Kubernetes，您需要的集群中的工作负载是什么（集群的 **目标状态**）。请参考 [控制器](/learning/k8s-bg/architecture/controller.html)、[声明式配置](/learning/k8s-intermediate/workload/wl-deployment/#deployment-概述)

操作 Kubernetes 对象（创建、修改、删除）的方法主要有：
* [kubectl](/install/install-kubectl.html) 命令行工具
* [kuboard](/install/install-k8s-dashboard.html) 图形界面工具

kubectl、kuboard 最终都通过调用 [kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/) 来实现对 Kubernetes 对象的操作。您也可以直接在自己的程序中调用 Kubernetes API，此时您可能要有用到 [Client Libraries](https://kubernetes.io/docs/reference/using-api/client-libraries/)

## 对象的spec和status

每一个 Kubernetes 对象都包含了两个重要的字段：
* `spec` 必须由您来提供，描述了您对该对象所期望的 **目标状态**
* `status` 只能由 Kubernetes 系统来修改，描述了该对象在 Kubernetes 系统中的 **实际状态**

Kubernetes通过对应的[控制器](/learning/k8s-bg/architecture/controller.html)，不断地使实际状态趋向于您期望的目标状态。

例如，一个 Kubernetes Deployment 对象可以代表一个应用程序在集群中的运行状态。当您创建 Deployment 对象时，您可以通过 Deployment 的 spec 字段指定需要运行应用程序副本数（假设为3）。Kubernetes 从 Deployment 的 spec 中读取这些信息，并为您创建指定容器化应用程序的 3 个副本，再将实际的状态更新到 Deployment 的 status 字段。Kubernetes 系统将不断地比较 **实际状态** staus 和 **目标状态** spec 之间的差异，并根据差异做出对应的调整。例如，如果任何一个副本运行失败了，Kubernetes 将启动一个新的副本，以替代失败的副本。

## 描述Kubernetes对象

当您在 Kubernetes 中创建一个对象时，您必须提供
* 该对象的 spec 字段，通过该字段描述您期望的 **目标状态**
* 该对象的一些基本信息，例如名字

如果使用 kubectl 创建对象，您必须编写 `.yaml` 格式的文件，如果通过 Kuboard 图形化工具创建，则在Kuboard 对应的界面功能中完成表单填写即可。

下面是一个 kubectl 可以使用的 `.yaml` 文件：

<<< @/.vuepress/public/statics/learning/obj/deployment.yaml

使用 kube apply 命令可以创建该 `.yaml` 文件中的 Deployment 对象：

``` sh
kubectl apply -f https://kuboard.cn/statics/learning/obj/deployment.yaml
```

输出结果如下所示：
```
deployment.apps/nginx-deployment created
```

使用 kubectl delete 命令可以删除该 `.yaml` 文件中的 Deployment 对象：

``` sh
kubectl delete -f https://kuboard.cn/statics/learning/obj/deployment.yaml
```

## 必填字段

在上述的 `.yaml` 文件中，如下字段是必须填写的：

* **apiVersion** 用来创建对象时所使用的Kubernetes API版本
* **kind** 被创建对象的类型
* **metadata** 用于唯一确定该对象的元数据：包括 `name` 和 `namespace`，如果 `namespace` 为空，则默认值为 `default`
* **spec** 描述您对该对象的期望状态

不同类型的 Kubernetes，其 `spec` 对象的格式不同（含有不同的内嵌字段），通过 [API 手册](https://kubernetes.io/docs/reference/#api-reference) 可以查看 Kubernetes 对象的字段和描述。例如，假设您想了解 Pod 的 `spec` 定义，可以在 [这里](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#podspec-v1-core)找到，Deployment 的 `spec` 定义可以在 [这里](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#deploymentspec-v1-apps) 找到。
