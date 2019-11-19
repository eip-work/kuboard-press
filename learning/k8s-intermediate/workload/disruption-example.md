---
vssueId: 155
layout: LearningLayout
description: Kubernetes教程_本文讲述了如何限制应用程序同时受到的毁坏数量_以便在集群管理员维护集群节点的同时_仍然可以保证应用的高可用性
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,K8S Disruption,PodDisruptionBudget
---

# 容器组_配置PodDisruptionBudget

<AdSenseTitle>

> 参考文档： [Specifying a Disruption Budget for your Application](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)

本文讲述了如何限制应用程序同时受到的毁坏数量，以便在集群管理员维护集群节点的同时，仍然可以保证应用的高可用性

[[TOC]]

</AdSenseTitle>

## 前提

* 熟悉如何部署多副本的应用程序 [伸缩应用程序](/learning/k8s-basics/scale.html)
* 熟悉 [Pod Disruption](./disruption.html) 的概念
* 确认与集群管理员或者供应商确定，您所使用的 Kubernetes 集群支持 PodDisruptionBudget

## 使用PodDisruptionBudget保护应用程序

1. 确定哪个应用程序需要使用 PodDisruptionBudget（PDB）保护
2. 思考应用程序如何处理毁坏（disruption）
3. 创建 PDB yaml 文件
4. 从 yaml 文件创建 PDB 对象

## 确定需要PDB保护的应用

通常如下几种 Kubernetes 控制器创建的应用程序可以使用 PDB：
* Deployment
* ReplicationController
* ReplicaSet
* StatefulSet

PDB 中 `.spec.selector` 字段的内容必须与控制器中 `.spec.selector` 字段的内容相同。

自 Kubernetes v 1.15 开始，PDB支持激活了 [scale subresource](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#scale-subresource) 的 custom controller.

也可以为那些不是通过上述控制器创建的 Pod（或者任意一组 Pod）设置 PDB，但是，这个时候存在一些限制条件，请参考 [任意控制器和选择器](#任意控制器和选择器)

## 思考应用程序如何应对毁坏

当自愿毁坏发生时，在短时间内，您的应用程序最多可以容许多少个实例被终止。

* 无状态的前端：
  * 关注点：不能让服务能力（serving capacity）降低超过 10%
  * 解决方案：在 PDB 中配置 minAvailable 90%
* 单实例有状态应用：
  * 关注点：未经同意不能关闭此应用程序
  * 解决方案1： 不使用 PDB，并且容忍偶尔的停机
  * 解决方案2： 在 PDB 中设置 maxUnavailable=0。与集群管理员达成一致（不是通过Kubernetes，而是邮件、电话或面对面），请集群管理员在终止应用之前与你沟通。当集群管理员联系你时，准备好停机时间，删除 PDB 以表示已准备好应对毁坏。并做后续处理
* 多实例有状态应用，例如 consul、zookeeper、etcd：
  * 关注点：不能将实例数降低到某个数值，否则写入会失败
  * 解决方案1： 在 PDB 中设置 maxUnavailable 为 1 （如果副本数会发生变化，可以使用此设置）
  * 解决方案2： 在 PDB 中设置 minAvailable 为最低数量（例如，当总副本数为 5 时，设置为3）（可以同时容忍更多的毁坏数）
* 可以重新开始的批处理任务：
  * 关注点：当发生自愿毁坏时，Job仍然需要完成其执行任务
  * 解决方案： 不创建 PDB。Job 控制器将会创建一个 Pod 用于替换被毁坏的 Pod

### 指定百分比时的舍入逻辑

`minAvailable` 或 `maxUnavailable` 可以指定为整数或者百分比。
* 当指定一个整数时，代表 Pod 的数量。例如，设置 `minAvailable` 为 10，则至少 10 个 Pod 必须始终可用，即便是在毁坏发生时
* 当指定一个百分比时（例如，`50%`），代表总 Pod 数量的一个百分比。例如，设置 `maxUnavailable` 为 `50%`，则最多可以有 50% 的 Pod 可以被毁坏

如果指定这些值为一个百分数，其计算结果可能不会正好是一个整数。例如，假设有 7 个 Pod，`minAvailable` 设置为 `50%`，你将很难判断，到底是 3 个还是 4 个 Pod 必须始终保持可用。Kubernetes 将向上舍入（round up to the nearest integer），因此，此处必须有 4 个 Pod 始终可用。可参考具体的 [Kubernetes 代码](https://github.com/kubernetes/kubernetes/blob/23be9587a0f8677eb8091464098881df939c44a9/pkg/controller/disruption/disruption.go#L539)

### 定义PodDisruptionBudget

`PodDisruptionBudget` 包含三个字段：
* 标签选择器 `.spec.selector` 用于指定 PDB 适用的 Pod。此字段为必填
* `.spec.minAvailable`：当完成驱逐时，最少仍然要保留多少个 Pod 可用。该字段可以是一个整数，也可以是一个百分比
* `.spec.maxUnavailable`： 当完成驱逐时，最多可以有多少个 Pod 被终止。该字段可以是一个整数，也可以是一个百分比

在一个 `PodDisruptionBudget` 中，只能指定 `maxUnavailable` 和 `minAvailable` 中的一个。 `maxUnavailable` 只能应用到那些有控制器的 Pod 上。下面的例子中，“期望的副本数” 是 PodDisruptionBudget 对应 Pod 的控制器的 `.spec.replicas` 字段：

例子1： `minAvailable` 为 5 时，只要 PodDisruptionBudget 的 `selector` 匹配的 Pod 中有超过 5 个仍然可用，就可以继续驱逐 Pod
例子2： `minAvailable` 为 30% 时，至少保证期望副本数的 30% 可用
例子3： `maxUnavailable` 为 5 时，最多可以有 5 个副本不可用（unthealthy）
例子4： `maxUnavailable` 为 30% 时，最多可以有期望副本数的 30% 不可用

通常，一个 PDB 对应一个控制器创建的 Pod，例如，Deployment、ReplicaSet或StatefulSet。

::: tip 注意
PodDisruptionBudget 并不能真正确保指定数量（或百分比）的Pod始终保持可用。例如，当 Pod 数量已经为 PDB 中指定的最小数时，某一个节点可能意外宕机，导致 Pod 数量低于 PDB 中指定的数量。 PodDisruptionBudget 只能保护应用避免受到 [自愿毁坏](/learning/k8s-intermediate/workload/disruption.html#自愿的和非自愿的毁坏) 的影响，而不是所有原因的毁坏。
:::

`maxUnavailable` 为 0%（或0）或者 `minAvailable` 为 100%（或与控制器的 `.spec.replicas` 相等）将阻止节点排空任务。按照 `PodDisruptionBudget` 的语义，这种做法是允许的。

下面是两个 PDB 的例子：

使用 minAvailable
``` yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: zookeeper
```

使用 maxUnavailable

``` yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  maxUnavailable: 1
  selector:
    matchLabels:
      app: zookeeper
```

例如，如果 `zk-pdb` 对象选择的 Pod 对应的 StatefulSet 的 `spec.replicas` 为 3，则两个 PDB 含义相同。推荐使用 `maxUnavailable` 这种形式的定义，因为当控制器的 `spec.replicas` 发生变化时，应用受到的影响更小一些。例如，将其副本数伸缩到 10，如果使用 `minAvailable=2` 这种形式，则可能会有 8 个 Pod 被毁坏。而如果使用 `maxUnavailable=1` 这种形式，应用程序将可以保存 9 个可用实例。

## 创建PDB对象

使用 `kubectl apply -f mypdb.yaml` 命令可以创建或更新 PDB 对象

## 检查PDB的状态

假设名称空间中实际没有与 `app: zookeeper` 匹配的 Pod，执行命令
``` sh
kubectl get poddisruptionbudgets
```
输出结果为：
```
NAME      MIN-AVAILABLE   ALLOWED-DISRUPTIONS   AGE
zk-pdb    2               0                     7s
```

如果存在 3 个匹配的 Pod，执行命令
``` sh
kubectl get poddisruptionbudgets
```
输出结果为：
```
NAME      MIN-AVAILABLE   ALLOWED-DISRUPTIONS   AGE
zk-pdb    2               1                     7s
```
`ALLOWED-DISRUPTIONS` 为非零证书，意味着 disruption 控制器已经匹配到了 Pod，计算了匹配的 Pod 数，并更新了 PDB 的状态。

执行命令，可以获得 PDB 的更多信息：
``` sh
kubectl get poddisruptionbudgets zk-pdb -o yaml
```
输出结果如下所示：
``` yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  creationTimestamp: 2019-11-19T021:38:26Z
  generation: 1
  name: zk-pdb
…
status:
  currentHealthy: 3
  desiredHealthy: 3
  disruptedPods: null
  disruptionsAllowed: 1
  expectedPods: 3
  observedGeneration: 1
```


## 任意控制器和选择器

如果您只配合 Kubernetes 内建控制器（Deployment、ReplicationController、ReplicaSet、StatefulSet）使用 PDB，您可以跳过此章节。

PDB 可以用于保护其他类型控制器（例如，“operator”）创建的 Pod，或者直接创建的 Pod（bare pod），但是有如下限定：
* 只能使用 `.spec.minAvailable`，不能使用 `.spec.maxUnavailable`
* `.spec.minAvailable` 字段中只能使用整型数字，不能使用百分比

当配合内建控制器（Deployment、ReplicationController、ReplicaSet、StatefulSet）使用时，PDB 的标签选择器可以选择控制器创建 Pod 的一个子集或者超集。然而，当名称空间中有多个 PDB 时，必须十分小心，PDB 的标签选择器之间不能重叠。
