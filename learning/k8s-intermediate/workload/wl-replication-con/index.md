---
vssueId: 157
layout: LearningLayout
description: Kubernetes中_ReplicationController确保在任何时候某个Pod的副本数都是指定的数量
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,ReplicaSet
---

# 控制器 - ReplicationController

<AdSenseTitle>

> 参考文档： [ReplicationController](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/)

::: tip
推荐使用 [Deployment](/learning/k8s-intermediate/workload/wl-deployment/)
:::

ReplicationController 确保在任何时候某个 Pod 的副本数都是指定的数量。

[[TOC]]

</AdSenseTitle>

## ReplicationController如何工作

如果存在过多的 Pod，RelicationCotroller 将终止多余的 Pod；如果数量不够，则启动新的 Pod。不同于手工创建Pod的做法，当Pod失败、被删除或者终止时，ReplicationController 将立刻自动创建新的 Pod 作为替代。例如，假设您要升级节点的操作系统内核，此时该节点上的 Pod 将被驱逐或者终止，如果 Pod 是通过 ReplicationController 创建的，ReplicationController 将能够自动在其他节点上创建新的Pod，以确保集群中该Pod的副本数保持在指定的数字。

ReplicationController 经常被缩写为 `rc`，在 kubectl 命令中也可以使用此缩写，例如 `kubectl get rc`

## 运行一个ReplicationController的例子

下面的 Example YAML文件中，运行了一个 nginx 服务的三个副本：

<<< @/.vuepress/public/statics/learning/replicationcontroller/replication.yaml

执行命令创建该 ReplicationController：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/replicationcontroller/replication.yaml
```
执行命令检查刚才创建的 ReplicationController 的状态：
``` sh
kubectl describe replicationcontrollers/nginx
```
输出结果如下所示：
``` {7}
Name:        nginx
Namespace:   default
Selector:    app=nginx
Labels:      app=nginx
Annotations:    <none>
Replicas:    3 current / 3 desired
Pods Status: 0 Running / 3 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:       app=nginx
  Containers:
   nginx:
    Image:              nginx
    Port:               80/TCP
    Environment:        <none>
    Mounts:             <none>
  Volumes:              <none>
Events:
  FirstSeen       LastSeen     Count    From                        SubobjectPath    Type      Reason              Message
  ---------       --------     -----    ----                        -------------    ----      ------              -------
  20s             20s          1        {replication-controller }                    Normal    SuccessfulCreate    Created pod: nginx-qrm3m
  20s             20s          1        {replication-controller }                    Normal    SuccessfulCreate    Created pod: nginx-3ntk0
  20s             20s          1        {replication-controller }                    Normal    SuccessfulCreate    Created pod: nginx-4ok8v
```
此时，有3个Pod被创建，但是都还未进入 Running 状态，因为正在抓取镜像。稍等一会儿，执行同样的命令，此处的结果将变为：
```
Pods Status:    3 Running / 0 Waiting / 0 Succeeded / 0 Failed
```
下面的命令可以获取 ReplicationController 的 Pod 列表，并存入到环境变量：
``` sh
pods=$(kubectl get pods --selector=app=nginx --output=jsonpath={.items..metadata.name})
echo $pods
```
输出结果如下所示：
```
nginx-3ntk0 nginx-4ok8v nginx-qrm3m
```
此命令中，使用了与 ReplicationController 中相同的 label selector。

## ReplicationController的定义

与其他 Kubernetes 对象一样，ReplicationController 需要以下字段：
* `apiVersion`
* `kind`
* `metadata`

ReplicationController 还需要 `.spec` 字段


### PodTemplate

`.spec.template` 字段是一个 [Pod Template](/learning/k8s-intermediate/workload/pod.html#pod-template)，为必填字段，且其中必须定义 `.spec.template.metadata.labels` 字段。请小心该字段不要与其他控制器的 selector 重合，以免这些控制器尝试接管该 Pod。

`.spec.template.spec.restartPolicy` 的默认值为 `Always`

### Pod Selector

`.spec.selector` 字段为一个 [标签选择器](/learning/k8s-intermediate/obj/labels.html#标签选择器)，用于识别可以接管哪些 Pod。

在 ReplicationController 中， `.spec.template.metadata.labels` 必须与 `.spec.selector` 匹配，否则将不能成功创建 ReplicationController。

同时，您也要避免通过其他方式创建的 Pod（例如，手工创建、使用另外一个 ReplicationController 创建、或者使用其他控制器如Job等创建）的标签与 ReplicationController 的标签选择器匹配。如果发生这种情况，ReplicationController 将认为这个 Pod 是由它创建的。Kubernetes并不能阻止你进行这种明显错误的操作。如果确实发生了这种情况，您需要手工删除相关的控制器和Pod。

### Replicas

`.spec.replicas` 字段用于指定同时运行的 Pod 的副本数。ReplicaSet 将创建或者删除由其管理的 Pod，以便使副本数与该字段指定的值匹配。

如果不指定，默认值为 1

## 使用ReplicationController

### 删除ReplicationController及其Pod

使用 `kubectl delete` 命令可以删除 ReplicationController 及其 Pod。kubectl 会先将 ReplicationController 伸缩到 0 个副本，待其删除了所有的 Pod 之后，再删除 ReplicationController 对象。如果这个命令中断了，可以重新执行。

当使用 REST API 或者 go 语言客户端代码库时，您需要执行如下步骤：
* 伸缩 ReplicationController 的副本数为 0
* 等待 Pod 被删除
* 删除 ReplicationController

### 仅删除ReplicationController

您可以只删除 ReplicationController，而保留其创建的 Pod，只需要在 kubectl delete 命令中指定选项 --cascade=false，如
```sh
kubectl delete --cascade=false rc nginx
```

当使用 REST API 或者 go 语言客户端代码库时，只需要直接删除 ReplicationController 即可。

删除原有的 ReplicationController 之后，您可以在创建新的 ReplicationController 作为替代。只要新 ReplicationController 的 `.spec.selector` 字段与之前相同，则新的 ReplicationController 将接管原 ReplicationController 创建的 Pod。但是，此时原 ReplicationController 已经创建的 Pod 的模板将保持不变。如果需要更新所有 Pod 的模板，请参考 [滚动更新](#滚动更新)

### 将Pod从ReplicationController中隔离

通过修改 Pod 的标签，可以将其从 ReplicationController 的管理列表中移除。这个小技巧在如下场景可能非常有用：
* 将 Pod 从 Service 中移除，以便 Debug 或者做数据恢复
* 其他

通过这种方式从 ReplicationController 移除了 Pod 之后，ReplicationController 将立刻自动创建一个新的 Pod 以维持其指定的 `replicas` 副本数。

## 使用模式

### Rescheduling

不管您是想要保持 1 个 Pod 副本，还是由 1000 个 Pod 副本需要运行，ReplicationController 将确保指定的数量的 Pod 副本一直存在，即使是在节点故障、或者 Pod 被人为删除的情况下。

### Scaling

ReplicationController 使得水平伸缩这件事情变得非常简单，只需要修改 `replicas` 字段即可。可以手工修改该字段，也可以通过一个自动化的控制器修改。

### 滚动更新

ReplicationController 可以用逐个替换 Pod 的方式来滚动更新某个服务，具体的做法是：
* 创建一个新的 ReplicationController 其副本数为 1
* 逐个跟新 Pod
  * 将旧的 ReplicationController `replicas` -1
  * 将新的 ReplicationController `replicas` +1
  * 直到旧的 ReplicationController `replicas` 为 0
* 删除旧的 ReplicationController

理想情况下，滚动更新控制器应该考虑应用程序是否就绪，且确保任何时刻都有足够数量的 Pod 是可用的。

滚动更新过程中的两个 ReplicationController 在创建 Pod 时，需要使用至少一个不同的标签（例如Pod中主要容器的镜像的 Tag）。

ReplicationController 的滚动更新可以通过 [kubectl rolling-update](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#rolling-update) 命令实现，具体使用方法可参考 [Perform Rolling Update Using a Replication Controller](https://kubernetes.io/docs/tasks/run-application/rolling-update-replication-controller/)

### 多版本（multiple release tracks）

在滚动更新的过程中，应用程序实际会运行多个版本。实际上，在一个更长的时间段内，也经常会运行同一个应用程序的不同版本（release track），通过标签来区分。

例如，Service 可能会选中所有带 `tier in (frontend), environment in (prod)` 标签的 Pod 作为其后端 Pod。此时，假设您有 10 个 Pod 副本为此 Service 服务。您也许想要通过金丝雀发布的方式发布该组件，此时可以：
* 设置主要 ReplicationController 的 `replicas` 为 9，且标签为 `tier=frontend, environment=prod, track=stable`
* 另一个 ReplicationController 的 `replicas` 为 1，作为金丝雀测试用途，标签为 `tier=frontend, environment=prod, track=canary`

在这种情况下，Service将覆盖金丝雀 Pod 以及非金丝雀 Pod。同时，您可以通过两个 ReplicationController 将不同的 Pod 区分开，监控金丝雀 Pod 的运行效果，验证测试结果等。

### 同Service一起使用ReplicationController

一个 Service 可以对应多个 ReplicationController，例如，一部分流量进入旧的版本，一部分流量进入新的版本。

ReplicationController 不会自己终止，但是，其生命周期通常比 Service 要短：
* Service 可以映射到由不同 ReplicationController 创建的 Pod 上
* Service 的整个生命周期过程中，通常会有多个 ReplicationController 被创建或者销毁（例如，对 Service 的 Pod 执行滚动更新）

ReplicationController 对 Service 以及 Service 的客户端来说，都是透明不可见的。

## 为Replication编写程序

ReplicationController 创建的 Pod 应该都是可替代的，且语义上是完全相同的，尽管其配置在不同的时间可能存在差异。ReplicationController 非常适用于无状态应用的管理，也可以用来维护主节点选举（master-elected）、分片的（sharded）、工作节点池（worker-pool）类型的应用。此类应用程序应该 使用动态负载分配的机制（dynamic work assignment mechanism），例如 [RabbitMQ work queues](https://www.rabbitmq.com/tutorials/tutorial-two-python.html)，而不是为每一个 Pod 做静态的一次性的配置。

任何对 Pod 定义的修改都应该由另一个控制器或者脚本程序执行，而不是由 ReplicationController 自己执行，例如自动调整 Pod 的资源使用（cpu/memory等），

## 替代选择

### ReplicaSet

`ReplicaSet` 是 ReplicationController 的替代品，请在任何情况下使用 ReplicaSet，而不是 ReplicationController。ReplicaSet 主要是用作 [Deployment](/learning/k8s-intermediate/workload/wl-deployment/) 中创建、删除、更新 Pod 的手段。同时，我们也推荐始终使用 Deployment 而不是 ReplicaSet，除非您需要自定义 Deployment 中的某些行为。

### Deployment <Badge type="default">推荐</Badge>

[Deployment](/learning/k8s-intermediate/workload/wl-deployment/) 是一个高阶的 API 对象，可以更新其管理的 ReplicaSet 和 Pod，是推荐的用法。

### Bare Pods

与用户直接创建的 Pod 不同，ReplicationController 在 Pod 由于任何原因被删除或终止时（例如，节点故障或者节点升级）将创建新的 Pod 作为其替代。不推荐您直接使用 Pod，即便您的应用程序只需要一个 Pod 副本，请使用 Deployment。

### Job

使用 [Job](/learning/k8s-intermediate/workload/wl-job/) 执行批处理任务

### DaemonSet

当您需要提供机器级别的功能时（例如监控节点、[收集节点上的日志](/learning/k8s-advanced/logs/node.html)），使用 [DaemonSet](/learning/k8s-intermediate/workload/wl-daemonset/)。
