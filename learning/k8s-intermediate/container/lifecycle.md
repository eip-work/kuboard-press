---
vssueId: 124
layout: LearningLayout
description: Kubernetes教程_本文描述了 kubelet 管理的容器如何使用容器生命周期钩子执行指定的代码。
meta:
  - name: keywords
    content: Kubernetes 教程,K8S 教程,容器生命周期
---

# 容器生命周期

<AdSenseTitle/>

> 参考文档： [Container Lifecycle Hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/)

本文描述了 kubelet 管理的容器如何使用容器生命周期钩子执行指定的代码。

## 概述

绝大多数高级程序编程语言的框架（例如，Angular、Spring Framework、Vue 等）在组件的生命周期中提供 hook（钩子函数），例如 Vue 组件的 `created`、`mounted`、`beforeDestroy`、`destroyed`， Java Web 应用中 ServeletContextListener 的 `contextInitialized`、`contextDestroyed` 等。Kubernetes 中，也为容器提供了对应的生命周期钩子函数，使得容器可以获知其所在运行环境对其进行管理的生命周期事件，以便容器可以响应该事件，并执行对应的代码。

## 容器钩子

Kubernetes中为容器提供了两个 hook（钩子函数）：

* `PostStart`

  此钩子函数在容器创建后将立刻执行。但是，并不能保证该钩子函数在容器的 `ENTRYPOINT` 之前执行。该钩子函数没有输入参数。

* `PreStop`

  此钩子函数在容器被 terminate（终止）之前执行，例如：
  
    * 通过接口调用删除容器所在 Pod
    * 某些管理事件的发生：健康检查失败、资源紧缺等

  如果容器已经被关闭或者进入了 `completed` 状态，preStop 钩子函数的调用将失败。该函数的执行是同步的，即，kubernetes 将在该函数完成执行之后才删除容器。该钩子函数没有输入参数。

  更多内容请参考 [Termination of Pods](/learning/k8s-intermediate/workload/pod.html#termination-of-pods)

### Hook handler的实现

容器只要实现并注册 hook handler 便可以使用钩子函数。Kubernetes 中，容器可以实现两种类型的 hook handler：

* Exec - 在容器的名称空进和 cgroups 中执行一个指定的命令，例如 `pre-stop.sh`。该命令所消耗的 CPU、内存等资源，将计入容器可以使用的资源限制。
* HTTP - 向容器的指定端口发送一个 HTTP 请求


### Hook handler的执行

当容器的生命周期事件发生时，Kubernetes 在容器中执行该钩子函数注册的 handler。

对于 Pod 而言，hook handler 的调用是同步的。即，如果是 `PostStart` hook，容器的 `ENTRYPOINT` 和 hook 是同时出发的，然而如果 hook 执行的时间过长或者挂起了，容器将不能进入到 `Running` 状态。

`PreStop` hook 的行为与此相似。如果 hook 在执行过程中挂起了，Pod phase 将停留在 `Terminating` 的状态，并且在 `terminationGracePeriodSeconds` 超时之后，Pod被删除。如果 `PostStart` 或者 `PreStop` hook 执行失败，则 Kubernetes 将 kill（杀掉）该容器。

用户应该使其 hook handler 越轻量级越好。例如，对于长时间运行的任务，在停止容器前，调用 `PreStop` 钩子函数，以保存当时的计算状态和数据。


### Hook触发的保证

Hook 将至少被触发一次，即，当指定事件 `PostStart` 或 `PreStop` 发生时，hook 有可能被多次触发。hook handler 的实现需要保证即使多次触发，执行也不会出错。

通常来说，hook 实际值被触发一次。例如：如果 HTTP hook 的服务端已经停机，或者因为网络的问题不能接收到请求，请求将不会被再次发送。在极少数的情况下， 触发两次 hook 的事情会发生。例如，如果 kueblet 在触发 hook 的过程中重启了，该 hook 将在 Kubelet 重启后被再次触发。

### 调试 hook handler

Hook handler 的日志并没有在 Pod 的 events 中发布。如果 handler 因为某些原因失败了，kubernetes 将广播一个事件 `PostStart` hook 发送 `FailedPreStopHook` 事件。
可以执行命令 `kubectl describe pod $(pod_name)` 以查看这些事件，例如：

``` sh
Events:
  FirstSeen  LastSeen  Count  From                                                   SubobjectPath          Type      Reason               Message
  ---------  --------  -----  ----                                                   -------------          --------  ------               -------
  1m         1m        1      {default-scheduler }                                                          Normal    Scheduled            Successfully assigned test-1730497541-cq1d2 to gke-test-cluster-default-pool-a07e5d30-siqd
  1m         1m        1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Pulling              pulling image "test:1.0"
  1m         1m        1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Created              Created container with docker id 5c6a256a2567; Security:[seccomp=unconfined]
  1m         1m        1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Pulled               Successfully pulled image "test:1.0"
  1m         1m        1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Started              Started container with docker id 5c6a256a2567
  38s        38s       1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Killing              Killing container with docker id 5c6a256a2567: PostStart handler: Error executing in Docker Container: 1
  37s        37s       1      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}  spec.containers{main}  Normal    Killing              Killing container with docker id 8df9fdfd7054: PostStart handler: Error executing in Docker Container: 1
  38s        37s       2      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}                         Warning   FailedSync           Error syncing pod, skipping: failed to "StartContainer" for "main" with RunContainerError: "PostStart handler: Error executing in Docker Container: 1"
  1m         22s       2      {kubelet gke-test-cluster-default-pool-a07e5d30-siqd}
```
