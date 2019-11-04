---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述Job如何终止和清理
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job的终止和清理

<AdSenseTitle>

</AdSenseTitle>

当 Job 完成后：
* 将不会创建新的 Pod
* 已经创建的 Pod 也不会被清理掉。此时，您仍然可以继续查看已结束 Pod 的日志，以检查 errors/warnings 或者其他诊断用的日志输出
* Job 对象也仍然保留着，以便您可以查看该 Job 的状态
* 由用户决定是否删除已完成的 Job 及其 Pod
  * 可通过 `kubectl` 命令删除 Job，例如： `kubectl delete jobs/pi` 或者 `kubectl delete -f https://kuboard.cn/statics/learning/job/job.yaml`
  * 删除 Job 对象时，由该 Job 创建的 Pod 也将一并被删除

Job 通常会顺利的执行下去，但是在如下情况可能会非正常终止：
* 某一个 Pod 执行失败（且 `restartPolicy=Never`）
* 或者某个容器执行出错（且 `restartPolicy=OnFailure`）
  * 此时，Job 按照 [处理Pod和容器的失败](./failure.html) 中 `.spec.bakcoffLimit` 描述的方式进行处理
  * 一旦重试次数达到了 `.spec.backoffLimit` 中的值，Job 将被标记为失败，且尤其创建的所有 Pod 将被终止
* Job 中设置了 `.spec.activeDeadlineSeconds`。该字段限定了 Job 对象在集群中的存活时长，一旦达到 `.spec.activeDeadlineSeconds` 指定的时长，该 Job 创建的所有的 Pod 都将被终止，Job 的 Status 将变为 `type:Failed` 、 `reason: DeadlineExceeded`

::: tip
Job 中 `.spec.activeDeadlineSeconds` 字段的优先级高于 `.spec.backoffLimit`。因此，正在重试失败 Pod 的 Job，在达到 `.spec.activeDeadlineSecondes` 时，将立刻停止重试，即使 `.spec.backoffLimit` 还未达到。
:::

例如：

``` yaml {7}
apiVersion: batch/v1
kind: Job
metadata:
  name: pi-with-timeout
spec:
  backoffLimit: 5
  activeDeadlineSeconds: 100
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

::: tip 注意
Job 中有两个 activeDeadlineSeconds： `.spec.activeDeadlineSeconds` 和 `.spec.template.spec.activeDeadlineSeconds`（参考 [Pod](/learning/k8s-intermediate/workload/init-container.html#初始化容器的行为)）。请不要混淆了
:::
