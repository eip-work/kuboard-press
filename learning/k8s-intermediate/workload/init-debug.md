---
vssueId: 149
layout: LearningLayout
description: Kubernetes教程_本文描述了如何诊断初始化容器InitContainer在执行过程中的问题_本文中的命令行使用<pod-name>来指代Pod的名称_使用<init-container-1>和<init-container-2>来指代初始化容器的名称
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,init container,初始化容器,initialize container
---

# 容器组_Debug初始化容器


<AdSenseTitle>

> 参考文档： Kubernetes  [Debug Init Containers](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-init-containers/)

本文描述了如何诊断初始化容器InitContainer在执行过程中的问题_本文中的命令行使用 `<pod-name>` 来指代Pod的名称_使用 `<init-container-1>` 和 `<init-container-2>` 来指代初始化容器的名称。

本文假设您已经完成了 [容器组_配置初始化容器](./init-config.html)

[[TOC]]

</AdSenseTitle>

## 检查初始化容器的状态

执行命令，查看 Pod 的状态：

``` sh
kubectl get pod <pod-name>
```

例如，状态如果是 `Init:1/2`，则表明了两个初始化容器当中的一个已经成功执行：

```
NAME         READY     STATUS     RESTARTS   AGE
<pod-name>   0/1       Init:1/2   0          7s
```

## 查看初始化容器的详情

查看初始化容器的更多信息：

``` sh
kubectl describe pod <pod-name>
```

假设 Pod 包含两个初始化容器，显示结果可能如下所示：

```
Init Containers:
  <init-container-1>:
    Container ID:    ...
    ...
    State:           Terminated
      Reason:        Completed
      Exit Code:     0
      Started:       ...
      Finished:      ...
    Ready:           True
    Restart Count:   0
    ...
  <init-container-2>:
    Container ID:    ...
    ...
    State:           Waiting
      Reason:        CrashLoopBackOff
    Last State:      Terminated
      Reason:        Error
      Exit Code:     1
      Started:       ...
      Finished:      ...
    Ready:           False
    Restart Count:   3
    ...
```

也可以直接读取 Pod 的 `status.initContainerStatuses` 字段，命令行如下所示：

``` sh
kubectl get pod <pod-name> --template '{{.status.initContainerStatuses}}'
```

该命令将以 JSON 格式返回信息


## 查看初始化容器的日志

执行命令查看初始化容器的日志：

``` sh
kubectl logs <pod-name> -c <init-container-1>
```

## 理解 Pod 状态

如果 Pod 的状态以 `Init:` 开头，表示该 Pod 正在执行初始化容器。下表描述了 Debug 初始化容器的过程中，一些可能出现的 Pod 状态：

| 状态                           | 描述                                                       |
| ------------------------------ | ---------------------------------------------------------- |
| `Init:N/M`                     | Pod 中包含 M 个初始化容器，其中 N 个初始化容器已经成功执行 |
| `Init:Error`                   | Pod 中有一个初始化容器执行失败                             |
| `Init:CrashLoopBackOff`        | Pod 中有一个初始化容器反复执行失败                         |
| `Pending`                      | Pod 还未开始执行初始化容器                                 |
| `PodInitializing` or `Running` | Pod 已经完成初始化容器的执行                               |
