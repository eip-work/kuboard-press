---
vssueId: 155
layout: LearningLayout
description: Kubernetes教程_Kubernetes_garbage_collector_垃圾回收器的作用是删除那些曾经有owner_后来又不再有owner的对象。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S培训,K8S垃圾回收,K8S Garbage Collection
---

# 垃圾回收

<AdSenseTitle>

> 参考文档： [Garbage Collection](https://kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/)

Kubernetes garbage collector（垃圾回收器）的作用是删除那些曾经有 owner，后来又不再有 owner 的对象。

[[TOC]]

</AdSenseTitle>

## 所有者和从属对象

某些 Kubernetes 对象是其他 Kubernetes 对象的所有者（owner），同时，我们称被拥有的对象为拥有者的从属对象（dependent）。例如，ReplicaSet 是一组 Pod 的所有者，在这里 Pod 是 ReplicaSet 的从属对象。每一个从属对象都有一个 `metadata.ownerReferences` 字段，标识其拥有者是哪一个对象。

某些情况下，Kubernetes将自动设置 `ownerReferences` 字段。例如，当您创建一个 ReplicaSet 时，Kubernetes 自动设置该 ReplicaSet 创建的 Pod 中的 `ownerReferences` 字段。自版本 1.8 开始，对于 ReplicationController、ReplicaSet、StatefulSet、DaemonSet、Deployment、Job、CronJob等创建或管理的对象，Kubernetes 都将自动为其设置 `ownerReference` 的值。

也可以通过修改 `ownerReference` 字段，手动设置所有者和从属对象的关系。

下面例子中的 ReplicaSet 包含三个 Pod：

<<< @/.vuepress/public/statics/learning/obj/gc-replicaset.yaml

执行命令以创建该 ReplicaSet，然后查看 Pod 的 `.metadata.ownerReferences` 字段的值：
```sh
kubectl apply -f https://kuboard.cn/statics/learning/obj/gc-replicaset.yaml
kubectl get pods --output=yaml
```

输出结果如下所示：
``` yaml {8,11}
apiVersion: v1
kind: Pod
metadata:
  ...
  ownerReferences:
  - apiVersion: apps/v1
    controller: true
    blockOwnerDeletion: true
    kind: ReplicaSet
    name: my-repset
    uid: d9607e19-f88f-11e6-a518-42010a800195
  ...
```

::: tip 跨名称空间
在 Kubernetes 的设计里，跨名称空间的所有者-从属对象的关系是不被允许的。这意味着：
* 名称空间内的从属对象只能指定同名称空间的对象作为其所有者
* 集群级别的对象只能指定集群级别的对象作为其所有者
:::

## 垃圾收集器如何删除从属对象

当删除某个对象时，可以指定该对象的从属对象是否同时被自动删除，这种操作叫做级联删除（cascading deletion）。级联删除有两种模式：后台（background）和前台（foreground）

如果删除对象时不删除自动删除其从属对象，此时，从属对象被认为是孤儿（或孤立的 orphaned）。

### Foreground级联删除

在 foreground 级联删除模式下，根对象（直接被删除的对象）先进入“正在删除”（deletion in progress）状态，此时：
* 对象仍然可以通过 REST API 查询到（可通过 kubectl 或 kuboard 查询到）
* 对象的 `deletionTimestamp` 字段被设置
* 对象的 `metadata.finalizers` 包含值 `foregroundDeletion`

一旦对象被设置为 “deletion in progress” 状态，垃圾回收器将删除其从属对象。当垃圾回收器已经删除了所有的“blocking”从属对象（`ownerReference.blockOwnerDeletion=true` 的对象）以后，将删除所有者对象。

此处需要注意的是，在“foregroundDeletion” 模式下，只有 `ownerReference.blockOwnerDeletion=true` 的对象将阻止所有者对象的删除。在 Kubernetes 版本 1.7 开始，增加了 [admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#ownerreferencespermissionenforcement) ，可以基于所有者对象的删除权限配置限制用户是否可以设置 `blockOwnerDeletion` 字段为 true，因此，未经授权的从属对象将不能阻止所有者对象的删除。

如果对象的 `ownerReferences` 字段由控制器自动设置（例如，Deployment、ReplicaSet），`blockOwnerDeletion` 也将被自动设置，您无需手工修改该字段的取值。

### Background级联删除

在 background 级联删除模式下，Kubernetes将立刻删除所有者对象，并由垃圾回收器在后台删除其从属对象。

### 设置级联删除策略

在删除对象时，通过参数 `deleteOptions` 的 `propagationPolicy` 字段，可以设置级联删除的策略。可选的值有： `Orphan`、`Foreground`、`Background`。

默认值：
* 在 Kubernetes 1.9 之前，许多类型控制器的默认垃圾回收策略都是 `orphan`，例如，ReplicationController、ReplicaSet、StatefulSet、DaemonSet、Deployment。
* 对于 apiVersion 为 `extensions/v1beta1`、`apps/v1beta1`、和 `apps/v1beta2` 的对象，除非特殊指定，垃圾回收策略默认为 `orphan`
* 在 Kubernetes 1.9 中，对于所有 apiVersion 为 `apps/v1` 的对象，从属对象默认都将被删除

下面的例子中，使用了 background 级联删除：

``` sh
kubectl proxy --port=8080
curl -X DELETE localhost:8080/apis/apps/v1/namespaces/default/replicasets/my-repset \
  -d '{"kind":"DeleteOptions","apiVersion":"v1","propagationPolicy":"Background"}' \
  -H "Content-Type: application/json"
```

下面的例子中，使用了 foreground 级联删除：
``` sh
kubectl proxy --port=8080
curl -X DELETE localhost:8080/apis/apps/v1/namespaces/default/replicasets/my-repset \
  -d '{"kind":"DeleteOptions","apiVersion":"v1","propagationPolicy":"Foreground"}' \
  -H "Content-Type: application/json"
```

下面的例子中，使用 orphan 级联删除策略（不删除从属对象）：
``` sh
kubectl proxy --port=8080
curl -X DELETE localhost:8080/apis/apps/v1/namespaces/default/replicasets/my-repset \
  -d '{"kind":"DeleteOptions","apiVersion":"v1","propagationPolicy":"Orphan"}' \
  -H "Content-Type: application/json"
```

通过参数 `--cascade`，kubectl delete 命令也可以选择不同的级联删除策略：
* --cascade=true 级联删除
* --cascade=false 不级联删除 orphan

下面的例子中，删除 ReplicaSet 时，将不删除其从属对象：
``` sh
kubectl delete replicaset my-repset --cascade=false
```
