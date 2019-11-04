---
vssueId: 151
layout: LearningLayout
description: Kubernetes_CronJob 按照预定的时间计划创建Job_一个CronJob对象类似于 crontable_文件中的一行记录_该对象根据_Cron_格式定义的时间计划_周期性地创建Job对象
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes Job
---

# CronJob

<AdSenseTitle>

> 参考文档： [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

CronJob 按照预定的时间计划（schedule）创建 [Job](../wl-job/)。一个 CronJob 对象类似于 crontab (cron table) 文件中的一行记录。该对象根据 [Cron](https://en.wikipedia.org/wiki/Cron) 格式定义的时间计划，周期性地创建 Job 对象。

::: tip Schedule
所有 CronJob 的 `schedule` 中所定义的时间，都是基于 master 所在时区来进行计算的。 
:::

</AdSenseTitle>


## Example

请参考 [执行CronJob](./run.html)

## CronJob 的限制

一个 CronJob 在时间计划中的每次执行时刻，都创建 **大约** 一个 Job 对象。这里用到了 **大约** ，是因为在少数情况下会创建两个 Job 对象，或者不创建 Job 对象。尽管 K8S 尽最大的可能性避免这种情况的出现，但是并不能完全杜绝此现象的发生。因此，Job 程序必须是 [幂等的](/glossary/idempotent.html)。


当以下两个条件都满足时，Job 将至少运行一次：
* `startingDeadlineSeconds` 被设置为一个较大的值，或者不设置该值（默认值将被采纳）
* `concurrencyPolicy` 被设置为 `Allow`

对于每一个 CronJob，CronJob 控制器将检查自上一次执行的时间点到现在为止有多少次执行被错过了。如果错过的执行次数超过了 100，则 CronJob 控制器将不再创建 Job 对象，并记录如下错误：

``` 
Cannot determine if job needs to be started. Too many missed start time (> 100). Set or decrease .spec.startingDeadlineSeconds or check clock skew.
```

非常重要的一点是，如果设置了 `startingDeadlineSeconds` （非空 `nil`），控制器将按照从 `startingDeadlineSeconds` 秒之前到现在为止的时间段计算被错过的执行次数，而不是按照从上一次执行的时间点到现在为止的时间段来计算被错过的执行次数。例如，如果 `startingDeadlineSeconds` 被设置为 `200`，则，控制器将计算过去 200 秒内，被错过的执行次数。

当 CronJob 在其计划的时间点应该创建 Job 时却创建失败，此时 CronJob 被认为错过了一次执行。例如，如果 `concurrencyPolicy` 被设置为 `Forbid` 且 CronJob 上一次创建的 Job 仍然在运行，此时 CronJob 再次遇到一个新的计划执行的时间点并尝试创建一个 Job，该此创建尝试将失败，并被认为错过了一次执行。

又例如，假设某个 CronJob 被设置为：自 `08:30:00` 开始，每分钟创建一个新的 Job，且 CronJob 的 `startingDeadlineSeconds` 字段未被设置。如果 CronJob 控制器恰好在 `08:29:00` 到 `10:21:00` 这个时间段出现故障（例如 Crash），则该 CronJob 将不会再次执行，因为其错过的执行次数已经超过了 100。

为了进一步解释这个概念，我们再列举一个例子，假设某个 CronJob 被设置为：自 `08:30:00` 开始，每分钟创建一个新的 Job，且 CronJob 的 `startingDeadlineSeconds` 字段被设置为 200 秒。同样，如果 CronJob 控制器恰好在 `08:29:00` 到 `10:21:00` 这个时间段出现故障（时间段与上个例子相同），此时 CronJob 控制器将在 `10:22:00` 为该 CronJob 创建一个 Job。这是因为，在这个例子中，控制器将只计算过去 200 秒中错过的执行次数（大约 3 次），而不是从上一次执行的时间点开始计算错过的执行次数。

CronJob 只负责按照时间计划的规定创建 Job 对象，由 Job 来负责管理具体 Pod 的创建和执行。
