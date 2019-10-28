---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_当Job创建的 Pod执行成功并正常结束时_Job将记录成功结束的Pod数量_当成功结束的Pod达到指定的数量时_Job将完成执行
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes Job
---

# 处理Pod和容器的失败

<AdSenseTitle>

</AdSenseTitle>

Pod 中的容器可能会因为多种原因执行失败，例如：
* 容器中的进程退出了，且退出码（exit code）不为 0
* 容器因为超出内存限制而被 Kill
* 其他原因

如果 Pod 中的容器执行失败，且 `.spec.template.spec.restartPolicy = "OnFailure"`，则 Pod 将停留在该节点上，但是容器将被重新执行。此时，您的应用程序需要处理在原节点（失败之前的节点）上重启的情况。或者，您也可以设置为 `.spec.template.spec.restartPolicy = "Never"`。 参考 [容器组_生命周期](/learning/k8s-intermediate/workload/pod-lifecycle.html) 了解更多信息

整个 Pod 也可能因为多种原因执行失败，例如：
* Pod 从节点上被驱逐（节点升级、重启、被删除等）
* Pod 的容器执行失败，且 `.spec.template.spec.restartPolicy = "Never"`

当 Pod 执行失败时，Job 控制器将创建一个新的 Pod。此时，您的应用程序需要处理在一个新 Pod 中重新启动的情况。具体来说，需要处理临时文件、锁、未完成的输出信息以及前一次执行可能遗留下来的其他东西。

::: tip
* 即使您指定 `.spec.parallelism = 1`、 `.spec.completions = 1` 以及 `.spec.template.spec.restartPolicy = "Never"`，同一个应用程序仍然可能被启动多次
* 如果指定 `.spec.parallelism` 和 `.spec.completions` 的值都大于 1，则，将可能有多个 Pod 同时执行。此时，您的 Pod 还必须能够处理并发的情况
:::

## Pod失败重试

Pod backoff failure policy

某些情况下（例如，配置错误），您可能期望在 Job 多次重试仍然失败的情况下停止该 Job。此时，可通过 `.spec.backoffLimit` 来设定 Job 最大的重试次数。该字段的默认值为 6.

Job 中的 Pod 执行失败之后，Job 控制器将按照一个指数增大的时间延迟（10s,20s,40s ... 最大为 6 分钟）来多次重新创建 Pod。如果没有新的 Pod 执行失败，则重试次数的计数将被重置。

::: warning Issue
Issue [#54870](https://github.com/kubernetes/kubernetes/issues/54870) 仍然存在于 Kubernetes v1.12 之前的版本中
:::

::: tip Debug
如果 `restartPolicy = "OnFailure"`，执行该 Job 的容器在 job 重试次数达到以后将被终止。这种情况使得 Job 程序的 debug 工作变得较为困难。建议在 debug 时，设置 `restartPolicy = "Never"`，或者使用日志系统确保失败的 Job 的日志不会丢失。
:::
