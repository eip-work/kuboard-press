---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_当Job创建的 Pod执行成功并正常结束时_Job将记录成功结束的Pod数量_当成功结束的Pod达到指定的数量时_Job将完成执行
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes Job
---

# 编写Job的定义

<AdSenseTitle>

与所有的 Kubernetes 对象一样，Job 对象的 YAML 文件中，都需要包括如下三个字段：
* `.apiVersion`
* `.kind`
* `.metadata`

Job 对象的 YAML 文件，还需要一个 `.spec` 字段。

</AdSenseTitle>

## Pod Template

`.spec.template` 是必填字段：
* 用于定义 [pod template](/learning/k8s-intermediate/workload/pod.html#容器组和控制器)
* 与 Pod 有相同的字段内容，但由于是内嵌元素，pod template 不包括阿 `apiVersion` 字段和 `kind` 字段
* 除了 Pod 所需的必填字段之外，Job 中的 pod template 必须指定
  * 合适的标签 `.spec.template.spec.labels`，参考 [Pod Selector](#pod-selector)
  * 指定合适的[重启策略 restartPolicy](/learning/k8s-intermediate/workload/pod-lifecycle.html#重启策略) `.spec.template.spec.restartPolicy`，此处只允许使用 `Never` 和 `OnFailure` 两个取值

## Pod Selector

`.spec.selector` 字段是可选的。绝大部分情况下，您不需要指定该字段。只有在少数情况下，您才需要这样做，请参考 [Job 的特殊操作](./usage.html)


## Parallel Jobs

有三种主要的任务类型适合使用 Job 运行：
* Non-parallel Jobs
  * 通常，只启动一个 Pod，除非该 Pod 执行失败
  * Pod 执行成功并结束以后，Job 也立刻进入完成 completed 状态
* Parallel Jobs with a fixed completion count
  * `.spec.completions` 为一个非零正整数
  * Job 将创建至少 `.spec.completions` 个 Pod，编号为 1 - `.spec.completions` <Badge type="error">尚未实现</Badge>
  * Job 记录了任务的整体执行情况，当 1 - `.spec.completions` 中每一个编号都有一个对应的 Pod 执行成功时，Job 进入完成状态
* Parallel Jobs with a work queue
  * 不指定 `.spec.completions`，使用 `.spec.parallelism`
  * Pod 之间必须相互之间自行协调并发，或者使用一个外部服务决定每个 Pod 各自执行哪些任务。例如，某个Pod可能从带工作队列（work queue）中取出最多N个条目的批次数据
  * 每个 Pod 都可以独立判断其他同僚（peers）是否完成，并确定整个Job是否完成
  * 当 Job 中任何一个 Pod 成功结束，将不再为其创建新的 Pod
  * 当所有的 Pod 都结束了，且至少有一个 Pod 执行成功后才结束，则 Job 判定为成功结束
  * 一旦任何一个 Pod 执行成功并退出，Job 中的任何其他 Pod 都应停止工作和输出信息，并开始终止该 Pod 的进程

completions 和 parallelism
* 对于 non-parallel Job，`.spec.completions` 和 `.spec.parallelism` 可以不填写，默认值都为 1
* 对于 fixed completion count Job，需要设置 `.spec.completions` 为您期望的个数；同时不设置 `.spec.parallelism` 字段（默认值为 1）
* 对于 work queue Job，不能设置 `.spec.completions` 字段，且必须设置 `.spec.parallelism` 为0或任何正整数

## Controlling Parallelism 并发控制

并发数 `.spec.parallelism` 可以被设置为0或者任何正整数，如果不设置，默认为1，如果设置为 0，则 Job 被暂停，直到该数字被调整为一个正整数。

实际的并发数（同一时刻正在运行的 Pod 数量）可能比设定的并发数 `.spec.parallelism` 要大一些或小一些，不一定严格相等，主要的原因有：

* 对于 fixed completion count Job，实际并发运行的 Pod 数量不会超过剩余未完成的数量。如果 `.spec.parallelism` 比这个数字更大，将被忽略
* 对于 work queue Job，任何一个 Pod 成功执行后，将不再创建新的 Pod （剩余的 Pod 将继续执行）
* Job 控制器可能没有足够的时间处理并发控制
* 如果 Job 控制器创建 Pod 失败（例如，[ResourceQuota](/learning/k8s-advanced/policy/rq.html) 不够用，没有足够的权限等）
* 同一个Job中，在已创建的 Pod 出现大量失败的情况下，Job 控制器可能限制 Pod 的创建
* 当 Pod 被优雅地关闭时（gracefully shut down），需要等候一段时间才能结束
