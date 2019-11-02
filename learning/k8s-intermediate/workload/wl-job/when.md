---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述Job有哪些替代选项
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job的替代选项

<AdSenseTitle>

</AdSenseTitle>

## 直接创建的Pod（Bare Pod）

当 Pod 所在的节点重启或者出现故障，Pod 将被终止，且不会被自动重启。如果使用 Job，则 Job 控制器将会创建新的 Pod 以替代已经故障节点上的 Pod。基于此原因，即使您的应用实际只需要一个 Pod 执行某项任务，仍然推荐您使用 Job，而不是直接创建 Pod。

## Replication Controller

Job 是对 [Replication Controller](https://kubernetes.io/docs/user-guide/replication-controller)、[Deployment](/learning/k8s-intermediate/workload/wl-deployment/) 的一种有效补充。Replication Controller 和 Deployment 用来管理那些我们期望其一直运行的应用（例如，web server），Job 则用于管理那些我们期望其执行并结束的应用（例如，批处理任务）


参考 [Pod容器组的生命周期](/learning/k8s-intermediate/workload/pod-lifecycle.html)， Job 的 Pod 中，`RestartPolicy` 必须为 `OnFailure` 或者 `Never`。（如果不设定 `RestartPolicy`，其默认值为 `Always`）

## 通过Job启动控制器Pod

存在这样一种操作模式：使用一个 Job 创建一个 Pod，该 Pod 接着创建其他的 Pod，并作为一种自定义的[控制器](/learning/k8s-bg/architecture/controller.html) 来管理这些 Pod。这种做法提供了最大程度的自由度和灵活性，但是某种程度上，非常难以上手，且与 Kubernetes 的相关度不高。

这种模式的一个例子有：某个 Job 创建一个 Pod，该 Pod 执行一段脚本，在脚本中：
* 启动 Spark master controller（参考 [spark example](https://github.com/kubernetes/examples/tree/master/staging/spark/README.md)）
* 运行 spark driver
* 执行清理操作

这种做法的优点在于，通过 Job 可以确保整个过程最终能够完成执行，但是您需要自己编写脚本，以控制应该创建什么样的 Pod，如何在 Pod 上分配执行任务。

> 此做法不是 [Operator 模式](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)，但是与之有相似之处。


## Cron Jobs

可以使用 [CronJob](/learning/k8s-intermediate/workload/wl-cronjob/) 来创建 Job，与 Unix/Linux 工具 `cron` 相似，CronJob 将在指定的日期和时间执行。
