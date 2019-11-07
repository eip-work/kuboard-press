---
vssueId: 151
layout: LearningLayout
description: Kubernetes中
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,Kubernetes TTL
---

# TTL 机制

<AdSenseTitle>

> 参考文档： [TTL Controller for Finished Resources](https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/)

**FEATURE STATE:** `Kubernetes v1.12` <Badge type="error">alpha</Badge>

TTL（Time to Live）控制器可以限制已经结束执行的对象的存活时间，目前 TTL 控制器只处理 [Job](/learning/k8s-intermediate/workload/wl-job) 对象，将来可能增加对其他类型资源的支持，例如 Pod 和 Custom Resource。

Alpha 声明：此特性当前处于 alpha 状态，可以通过 [feature gate](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) `TTLAfterFinished` 激活该特性。

[[TOC]]

</AdSenseTitle>

## TTL 控制器

TTL控制器当前只支持 Job。集群管理员可以通过指定 Job 的 `.spec.ttlSecondsAfterFinished` 来自动清理已经结束的 Job（`Complete`或者`Failed`），参考例子 [Job的自动清理](/learning/k8s-intermediate/workload/wl-job/auto-cleanup.html)。TTL控制器将认为对象执行结束后超过 TTL 指定的时间，就可以被清理掉，TTL控制器将以 [级联删除](/learning/k8s-intermediate/workload/gc.html#垃圾收集器如何删除从属对象)（删除该对象及其从属对象）的方式将其删除。在删除对象时，其生命周期函数将被调用，例如 finalizer。

Job 的 `.spec.ttlSecondsAfterFinished` 任何时间都可以设置，例如：
* 在定义 Job 时指定该字段
* 为已经结束执行的 Job 对象指定该字段
* 在创建 Job 对象时，通过 [mutating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#admission-webhooks) 指定该字段。集群管理员可以通过这种方式为已结束的对象强制添加 TTL 策略
* 在 Job 对象结束执行时，通过 [mutating admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#admission-webhooks) 指定该字段，此时可以根据 Job 对象的状态、标签等信息为其指定不同的 TTL 值

## 警告

### 修改TTL值

在对象被创建或对象结束执行后，TTL值（例如 Job 的 `.spec.ttlSecondsAfterFinished` 字段）是可以被修改的。然而，一旦 Job 符合被清理的条件（TTL过期），系统将不再确保该 Job 被保留，即便此时您成功修改了 TTL 的值，也并不能使其保留更长的时间。

### 时间偏差Time Skew

TTL 控制器使用对象的时间戳（timestamp）来决定该对象是否已经超过了 TTL 指定的时间，集群中的时间偏差对此特性的影响特别大，可能导致 TTL 控制器在一个错误的时间清理了对象。

在 Kubernetes 集群中，是要求所有节点运行 [NTP](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E6%97%B6%E9%97%B4%E5%8D%8F%E8%AE%AE?fromtitle=NTP&fromid=1100433) 以避免时间偏差（time skew）的，参考 [#6159](https://github.com/kubernetes/kubernetes/issues/6159#issuecomment-93844058)。系统的时钟并非总是正确的，但是实际的差异会很小。在指定 TTL 值为 0 时，尤其要考虑这个因素的影响。
