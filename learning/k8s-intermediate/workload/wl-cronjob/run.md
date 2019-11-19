---
vssueId: 151
layout: LearningLayout
description: Kubernetes的CronJob可以用来执行基于时间计划的定时任务_类似于Linux/Unix系统中的crontable_CronJob执行周期性的重复任务时非常有用_例如备份数据_发送邮件等_CronJob也可以用来指定将来某个时间点执行单个任务_例如将某项任务定时到系统负载比较低的时候执行。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes CronJob
---

# 使用CronJob执行自动任务

<AdSenseTitle>

> 参考文档： [Running Automated Tasks with a CronJob](https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/)

[CronJob](./) 可以用来执行基于时间计划的定时任务，类似于Linux/Unix系统中的 [crontable](https://en.wikipedia.org/wiki/Cron)。

CronJob 执行周期性的重复任务时非常有用，例如备份数据、发送邮件等。CronJob 也可以用来指定将来某个时间点执行单个任务，例如将某项任务定时到系统负载比较低的时候执行。

CronJob 也存在某些限制，例如，在某些情况下，一个 CronJob 可能会创建多个 Job。因此，Job 必须是 [幂等](/glossary/idempotent.md) 的。更多与此相关的限制请参考 [CronJob](./)

[[TOC]]

</AdSenseTitle>


## 创建CronJob

下面例子中的 CronJob 每分钟，打印一次当前时间并输出 hello world 信息。

<<< @/.vuepress/public/statics/learning/job/cronjob.yaml

* 执行命令以创建 CronJob：
  ```sh
  kubectl create -f https://kuboard.cn/statics/learning/job/cronjob.yaml
  ```
  输出结果如下所示：
  ```
  cronjob.batch/hello created
  ```
  或者，您也可以直接使用 `kubectl run` 命令创建 CronJob：
  ```sh
  kubectl run hello --schedule="*/1 * * * *" --restart=OnFailure --image=busybox -- /bin/sh -c "date; echo Hello from the Kubernetes cluster"
  ```
* 执行命令以查看已创建 CronJob 的状态
  ``` sh
  kubectl get cronjob hello
  ```
  输出结果如下所示：
  ```
  NAME    SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
  hello   */1 * * * *   False     0        <none>          10s
  ```
  从输出结果可以看到，该 CronJob 还未运行任何 Job。执行一下命令，并等候一分钟左右时间
  ``` sh
  kubectl get jobs --watch
  ```
  输出结果如下所示：
  ```
  NAME               COMPLETIONS   DURATION   AGE
  hello-4111706356   0/1                      0s
  hello-4111706356   0/1   0s    0s
  hello-4111706356   1/1   5s    5s
  ```
  此时，可以看到该 CronJob 创建了一个 "hello-4111706356" Job，并执行结束。这时`ctrl + c` 停止 watch，并重新查看 Cronjob 的状态：
  ``` sh
  kubectl get cronjob hello
  ```
  输出信息如下所示：
  ``` {2}
  NAME    SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
  hello   */1 * * * *   False     0        50s             75s
  ```
  输出结果显示，该 CronJob 在 `LAST SCHEDULE` 这个时间点成功创建了一个 Job。当前 `ACTIVE` Job 数为 0，意味着，该 Job 已经成功结束，或者已经失败。

* 查看 Pod 的输出信息
  
  执行命令获取 Pod 的名称
  ``` sh
  # 将 "hello-4111706356" 替换成您系统中的 Job name
  pods=$(kubectl get pods --selector=job-name=hello-4111706356 --output=jsonpath={.items[*].metadata.name})
  ```

  查看 Pod 的日志：
  ``` sh
  kubectl logs $pods
  ```

  输出结果如下所示：

  ```
  Fri Feb 22 11:02:09 UTC 2019
  Hello from the Kubernetes cluster
  ```

## 删除CronJob

当您不再需要某个 CronJob 时，可以使用命令将其删除 `kubectl delete cronjob <cronjob name>`，在本例中，可以执行命令：
```sh
kubectl delete cronjob hello
```
或者
``` sh
kubectl delete -f https://kuboard.cn/statics/learning/job/cronjob.yaml
```

删除 CronJob 时，将移除该 CronJob 创建的所有 Job 和 Pod，并且 CronJob 控制器将不会为其在创建任何新的 Job。更多信息请参考 [垃圾回收](/learning/k8s-intermediate/workload/gc.html)


## 编写CronJob YAML

与其他所有 Kubernetes 对象一样，CronJob 对象需要 `apiVersion`、`kind`、`metadata` 这几个字段。CronJob 还需要 `.spec` 字段。

::: tip
所有对 CronJob 对象作出的修改，尤其是 `.spec` 的修改，都只对修改之后新建的 Job 有效，已经创建的 Job 不会受到影响
:::

### Schedule

`.spec.schedule` 是一个必填字段。类型为 [Cron](https://en.wikipedia.org/wiki/Cron) 格式的字符串，例如 `0 * * * *` 或者 `@hourly`，该字段定义了 CronJob 应该何时创建和执行 Job。

该字段同样支持 `vixie cron` step 值（step values），参考 [FreeBSD manual](https://www.freebsd.org/cgi/man.cgi?crontab%285%29)。例如，指定 CronJob 每隔两个小时执行一次，可以有如下三种写法：
* `0 0,2,4,5,6,8,12,14,16,17,20,22 * * *`）
* 使用 范围值 + Step 值的写法：`0 0-23/2 * * *`
* Step 也可以跟在一个星号后面，如 `0 */2 * * *`

::: tip
问号 `?` 与 星号 `*` 的含义相同，代表着该字段不做限定
:::

### Job Template

`.spec.jobTemplate` 字段是必填字段。该字段的结构与 [Job](/learning/k8s-intermediate/workload/wl-job/) 相同，只是不需要 `apiVersion` 和 `kind`。请参考 [编写Job的定义](/learning/k8s-intermediate/workload/wl-job/spec.html)。

### Starting Deadline

`.spec.startingDeadlineSeconds` 为可选字段，代表着从计划的时间点开始，最迟多少秒之内必须启动 Job。如果超过了这个时间点，CronJob 就不会为其创建 Job，并将其记录为一次错过的执行次数。如果该字段未指定，则 Job 必须在指定的时间点执行。

CronJob 控制器将为每一个 CronJob 记录错过了多少次执行次数，如果错过的执行次数超过 100，则控制器将不会再为该 CronJob 创建新的 Job。如果 `.spec.startingDeadlineSeconds` 未指定，CronJob 控制器计算从 `.status.lastScheduleTime` 开始到现在为止总共错过的执行次数。

例如，某一个 CronJob 应该每分钟执行一次，`.status.lastScheduleTime` 的值是 上午5:00，假设现在已经是上午7:00。这意味着已经有 120 次执行时间点被错过，因此该 CronJob 将不再执行了。

如果 `.spec.startingDeadlineSeconds` 字段被设置为一个非空的值，则 CronJob 控制器计算将从 `.spec.startingDeadlineSeconds` 秒以前到现在这个时间段内错过的执行次数。

例如，假设该字段被设置为 `200`，控制器将只计算过去 200 秒内错过的执行次数。如果在过去 200 秒之内，有超过 100 次错过的执行次数，则 CronJob 将不再执行。

### Concurrency Policy

`.spec.concurrencyPolicy` 是选填字段，指定了如何控制该 CronJob 创建的 Job 的并发性，可选的值有：
* `Allow`： 默认值，允许并发运行 Job
* `Forbid`： 不允许并发运行 Job；如果新的执行时间点到了，而上一个 Job 还未执行完，则 CronJob 将跳过新的执行时间点，保留仍在运行的 Job，且不会在此刻创建新的 Job
* `Replace`： 如果新的执行时间点到了，而上一个 Job 还未执行完，则 CronJob 将创建一个新的 Job 以替代正在执行的 Job

::: tip
Concurrency policy 只对由同一个 CronJob 创建的 Job 生效。如果有多个 CronJob，则他们各自创建的 Job 之间不会相互影响。
:::

### Suspend

`.spec.suspend` 是选填字段。如果该字段设置为 `true`，所有的后续执行都将挂起，该字段不会影响到已经创建的 Job。默认值为 `false`。

::: danger 警告
挂起（suspend）的时间段内，如果恰好存在有计划的执行时间点，则这些执行时间计划都被记录下来。如果不指定 `.spec.startingDeadlineSeconds`，并将 `.spec.suspend` 字段从 `true` 修改为 `false`，则挂起这段时间内的执行计划都将被立刻执行。
:::

### Job History Limits

`.spec.successfulJobsHistoryLimit` 和 `.spec.failedJobsHistoryLimit` 字段是可选的。这些字段指定了 CronJob 应该保留多少个 completed 和 failed 的 Job 记录。
* `.spec.successfulJobsHistoryLimit` 的默认值为 3
* `.spec.failedJobsHistoryLimit` 的默认值为 1

如果将其设置为 `0`，则 CronJob 不会保留已经结束的 Job 的记录。
