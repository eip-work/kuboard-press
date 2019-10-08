---
vssueId: 124
layout: LearningLayout
description: Kubernetes教程_Kubernetes 中支持容器的 postStart 和 preStop 事件，本文阐述了如何向容器添加生命周期事件处理程序（handler）
meta:
  - name: keywords
    content: Kubernetes 教程,K8S 教程,容器生命周期
---

# 容器生命周期事件处理

> 参考文档： [Attach Handlers to Container Lifecycle Events](https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/)

Kubernetes 中支持容器的 postStart 和 preStop 事件，本文阐述了如何向容器添加生命周期事件处理程序（handler）。
* `postStart` 容器启动时，Kubernetes 立刻发送 postStart 事件，但不确保对应的 handler 是否能在容器的 `EntryPoint` 之前执行
* `preStop` 容器停止前，Kubernetes 发送 preStop 事件

## 前提

您已经有一个安装好的 Kubernetes 集群，并且可以通过 kubectl 访问该集群。请参考：

[安装Kubernetes单Master节点](/install/install-k8s.html)

## 定义postStart和preStop处理程序

下面的例子中，您将创建一个包含单一容器的 Pod，并为该容器关联 postStart 和 preStop 处理程序（handler）。Pod 的yaml文件定义如下：

<<< @/.vuepress/public/statics/learning/container/lifecycle.yaml

在该例子中，请注意：
* postStart 命令向 `usr/share/message` 文件写入了一行文字
* preStop 命令优雅地关闭了 nginx
  > 如果容器碰到问题，被 Kubernetes 关闭，这个操作是非常有帮助的，可以使得您的程序在关闭前执行必要的清理任务

* 创建 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/container/lifecycle.yaml
  ```

* 验证 Pod 中的容器已经运行：

  ``` sh
  kubectl get pod lifecycle-demo
  ```

* 进入容器的命令行终端：

  ``` sh
  kubectl exec -it lifecycle-demo -- /bin/bash
  ```

* 在命令行终端中，验证 `postStart` 处理程序创建的 `message` 文件：
  
  ``` sh
  root@lifecycle-demo:/# cat /usr/share/message
  ```

  输出结果如下所示：
  ```
  Hello from the postStart handler
  ```

## 总结

Kubernetes 在容器启动后立刻发送 postStart 事件，但是并不能确保 postStart 事件处理程序在容器的 EntryPoint 之前执行。postStart 事件处理程序相对于容器中的进程来说是异步的（同时执行），然而，Kubernetes 在管理容器时，将一直等到 postStart 事件处理程序结束之后，才会将容器的状态标记为 Running。

Kubernetes 在决定关闭容器时，立刻发送 preStop 事件，并且，将一直等到 preStop 事件处理程序结束或者 Pod 的 `--grace-period` 超时，才删除容器。请参考 [Termination of Pod](/learning/k8s-intermediate/workload/pod.html#termination-of-pods)

::: tip
Kubernetes 只在 Pod `Teminated` 状态时才发送 preStop 事件，这意味着，如果 Pod 已经进入了 `Completed` 状态， preStop 事件处理程序将不会被调用。这个问题已经记录在 kubernetes 的 issue 中： [issue #55087](https://github.com/kubernetes/kubernetes/issues/55807)
:::
