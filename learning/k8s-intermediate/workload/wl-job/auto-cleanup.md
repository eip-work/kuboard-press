---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述如何自动清理已经结束的Pod
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job的自动清理

<AdSenseTitle>

</AdSenseTitle>

系统中已经完成的 Job 通常是不在需要里的，长期在系统中保留这些对象，将给 apiserver 带来很大的压力。如果通过更高级别的控制器（例如 [CronJobs](../wl-cronjob/)）来管理 Job，则 CronJob 可以根据其中定义的基于容量的清理策略（capacity-based cleanup policy）自动清理Job。

## TTL 机制

**FEATURE STATE：** `Kubernetes v1.12` <Badge type="warning">alpha</Badge>

除了 CronJob 之外，TTL 机制是另外一种自动清理已结束Job（`Completed` 或 `Finished`）的方式：
* TTL 机制由 [TTL 控制器](../wl-ttl/) 提供
* 在 Job 对象中指定 `.spec.ttlSecondsAfterFinished` 字段可激活该特性

当 TTL 控制器清理 Job 时，TTL 控制器将删除 Job 对象，以及由该 Job 创建的所有 Pod 对象。
::: tip 删除Job
删除 Job 时，其生命周期函数将被触发，例如 finalizer
:::

参考例子：

``` sh {6}
apiVersion: batch/v1
kind: Job
metadata:
  name: pi-with-ttl
spec:
  ttlSecondsAfterFinished: 100
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

**字段解释 `ttlSecondsAfterFinished`：**
* Job `pi-with-ttl` 的 `ttlSecondsAfterFinished` 值为 100，则，在其结束 `100` 秒之后，将可以被自动删除
* 如果 `ttlSecondsAfterFinished` 被设置为 `0`，则 TTL 控制器在 Job 执行结束后，立刻就可以清理该 Job 及其 Pod
* 如果 `ttlSecondsAfterFinished` 值未设置，则 TTL 控制器不会清理该 Job

::: warning alpha
TTL 机制目前还是 alpha 状态，FEATURE GATE 为 `TTLAfterFinished`。更多信息请参考 [TTL 控制器](../wl-ttl/)
:::
