---
vssueId: 157
layout: LearningLayout
description: Kubernetes中_ReplicaSet用来维护一个数量稳定的Pod副本集合_可以保证某种定义一样的Pod始终有指定数量的副本数在运行
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,ReplicaSet
---

# 控制器 - ReplicaSet

<AdSenseTitle>

Kubernetes 中，ReplicaSet 用来维护一个数量稳定的 Pod 副本集合，可以保证某种定义一样的 Pod 始终有指定数量的副本数在运行。

[[TOC]]

</AdSenseTitle>

## ReplicaSet的工作方式

ReplicaSet的定义中，包含：
* `selector`： 用于指定哪些 Pod 属于该 ReplicaSet 的管辖范围
* `replicas`： 副本数，用于指定该 ReplicaSet 应该维持多少个 Pod 副本
* `template`： Pod模板，在 ReplicaSet 使用 Pod 模板的定义创建新的 Pod

ReplicaSet 控制器将通过创建或删除 Pod，以使得当前 Pod 数量达到 `replicas` 指定的期望值。ReplicaSet 创建的 Pod 中，都有一个字段 [metadata.ownerReferences](/learning/k8s-intermediate/workload/gc.html#所有者和从属对象) 用于标识该 Pod 从属于哪一个 ReplicaSet。

ReplicaSet 通过 `selector` 字段的定义，识别哪些 Pod 应该由其管理。如果 Pod 没有 ownerReference 字段，或者 ownerReference 字段指向的对象不是一个控制器，且该 Pod 匹配了 ReplicaSet 的 `selector`，则该 Pod 的 ownerReference 将被修改为 该 ReplicaSet 的引用。

## 何时使用 ReplicaSet

ReplicaSet 用来维护一个数量稳定的 Pod 副本集合。Deployment 是一个更高级别的概念，可以管理 ReplicaSet，并提供声明式的更新，以及其他的许多有用的特性。因此，推荐用户总是使用 Deployment，而不是直接使用 ReplicaSet，除非您需要一些自定义的更新应用程序的方式，或者您完全不更新应用。

这也意味着，您也许永远不会直接操作 ReplicaSet 对象。但是，对其有一定的理解是有必要的，这样您才能更好的理解和使用 Deployment。

## Example

<<< @/.vuepress/public/statics/learning/replicaset/frontend.yaml

执行命令以创建该 YAML 对应的 ReplicaSet
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/replicaset/frontend.yaml
```

执行命令，查看刚才创建的ReplicaSet：
``` sh
kubectl get rs
```

输出结果如下所示：
```
NAME       DESIRED   CURRENT   READY   AGE
frontend   3         3         3       6s
```

执行命令，查看刚才创建的RelicaSet的详情：
``` sh
kubectl describe rs/frontend
```

输出结果如下所示：

```
Name:		frontend
Namespace:	default
Selector:	tier=frontend,tier in (frontend)
Labels:		app=guestbook
		tier=frontend
Annotations:	<none>
Replicas:	3 current / 3 desired
Pods Status:	3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:       app=guestbook
                tier=frontend
  Containers:
   php-redis:
    Image:      nginx:latest
    Port:       80/TCP
    Requests:
      cpu:      100m
      memory:   100Mi
    Environment:
      GET_HOSTS_FROM:   dns
    Mounts:             <none>
  Volumes:              <none>
Events:
  FirstSeen    LastSeen    Count    From                SubobjectPath    Type        Reason            Message
  ---------    --------    -----    ----                -------------    --------    ------            -------
  1m           1m          1        {replicaset-controller }             Normal      SuccessfulCreate  Created pod: frontend-qhloh
  1m           1m          1        {replicaset-controller }             Normal      SuccessfulCreate  Created pod: frontend-dnjpy
  1m           1m          1        {replicaset-controller }
```

执行命令，查看有哪些 Pod 被创建：
```sh
kubectl get pods
```

输出结果如下所示：

```
NAME             READY     STATUS    RESTARTS   AGE
frontend-9si5l   1/1       Running   0          1m
frontend-dnjpy   1/1       Running   0          1m
frontend-qhloh   1/1       Running   0          1m
```

执行命令，查看 Pod 的 ownerReference：
```sh
# 替换成你自己的 Pod 名称
kubectl get pods frontend-9si5l -o yaml
```

输出结果如下所示，其中 `metadata.ownerReferences` 字段指向了 ReplicaSet `frontend`：

``` yaml {10,14,15}
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: 2019-11-08T17:20:41Z
  generateName: frontend-
  labels:
    tier: frontend
  name: frontend-9si5l
  namespace: default
  ownerReferences:
  - apiVersion: extensions/v1beta1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: frontend
    uid: 892a2330-257c-11e9-aecd-025000000001
...
```

## 获取Non-Template Pod

由于您可以直接创建 Pod，Kubernetes 中强烈建议在您直接创建的 Pod 中，其标签不会与任何一个 ReplicaSet 的标签匹配。原因在于，ReplicaSet 不仅仅只管理通过其 podTemplate（`.spec.template`字段）创建的Pod，ReplicaSet 也可能将不是尤其创建的 Pod 纳入到自己的管理中。

假设有两个 Pod，其 YAML 文件如下所示：

<<< @/.vuepress/public/statics/learning/replicaset/pod-rs.yaml {6,19}

这些 Pod 没有对应的控制器（或者任何其他对象）作为其 ownerReference，且他们都匹配了 ReplicaSet `frontend` 中的选择器（selector），此时他们将立刻被 ReplicaSet `frontend` 接管。

假设您先创建了上面例子中的 ReplicaSet（其 `replicas` 为 3），此时再执行命令，以创建上面YAML文件中的两个 Pod：
```sh
kubectl apply -f https://kuboard.cn/statics/learning/replicaset/pod-rs.yaml
```
新建的 Pod 将立刻被该 ReplicaSet 接管，并且立刻被终止，否则 ReplicaSet 中的副本数量将超过 `replicas` 指定的值。

执行命令查看 Pod：
``` sh
kubectl get pods
```

输出结果显示了新创建的 Pod 要么已经被终止了，要么正在终止过程中：
```
NAME             READY   STATUS        RESTARTS   AGE
frontend-9si5l   1/1     Running       0          1m
frontend-dnjpy   1/1     Running       0          1m
frontend-qhloh   1/1     Running       0          1m
pod2             0/1     Terminating   0          4s
```

::: tip 清理

执行后面的命令时，可先清理已经创建的 ReplicaSet 和 Pod

``` sh
kubectl delete -f https://kuboard.cn/statics/learning/replicaset/frontend.yaml
kubectl delete -f https://kuboard.cn/statics/learning/replicaset/pod-rs.yaml
```

:::

如果您先创建 Pod：
```sh
kubectl apply -f https://kuboard.cn/statics/learning/replicaset/pod-rs.yaml
```
然后创建 ReplicaSet：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/replicaset/frontend.yaml
```
您将看到 ReplicaSet 将接管您手工创建的 Pod，并且按照自己的 podTemplate 只创建一个新的 Pod，以达到 `replicas` 字段中指定的副本数量。此时执行命令查看 Pod：
``` sh
kubectl get pods
```
输出结果如下：
```
NAME             READY   STATUS    RESTARTS   AGE
frontend-pxj4r   1/1     Running   0          5s
pod1             1/1     Running   0          13s
pod2             1/1     Running   0          13s
```

这种情况下，ReplicaSet 包含了多个不一样的 Pod

## ReplicaSet的定义

与其他 Kubernetes 对象一样，ReplicaSet需要的字段有：
* `apiVersion`：apps/v1
* `kind`：始终为 ReplicaSet
* `metadata`
* `spec`： ReplicaSet 的详细定义

### PodTemplate

`.spec.template` 字段是一个 [Pod Template](/learning/k8s-intermediate/workload/pod.html#pod-template)，为必填字段，且其中必须定义 `.spec.template.metadata.labels` 字段。在前面的ReplicaSet例子中，定义了 label 为 `tier: frontend`。请小心该字段不要与其他控制器的 selector 重合，以免这些控制器尝试接管该 Pod。

`.spec.template.spec.restartPolicy` 的默认值为 `Always`

### Pod Selector

`.spec.selector` 字段为一个 [标签选择器](/learning/k8s-intermediate/obj/labels.html#标签选择器)，用于识别可以接管哪些 Pod。在前面的例子中，标签选择器为：
```yaml
matchLabels:
	tier: frontend
```
在 ReplicaSet 中， `.spec.template.metadata.labels` 必须与 `.spec.selector` 匹配，否则将不能成功创建 ReplicaSet。

::: tip
如果两个 ReplicaSet 指定了相同的 `.spec.selector` 但是不同的 `.spec.template.metadata.labels` 和不同的 `.spec.tempalte.spec` 字段，两个 ReplicaSet 都将忽略另外一个 ReplicaSet 创建的 Pod
:::

### Replicas

`.spec.replicas` 字段用于指定同时运行的 Pod 的副本数。ReplicaSet 将创建或者删除由其管理的 Pod，以便使副本数与该字段指定的值匹配。

如果不指定，默认值为 1

## 使用 ReplicaSet

### 删除ReplicaSet及其Pod

使用 `kubectl delete` 可删除 ReplicaSet， [Garbage Collector](/learning/k8s-intermediate/workload/gc.html) 将自动删除该 ReplicaSet 所有从属的 Pod。

如果使用 REST API 或者 `client-go` 代码库调用 apiserver 来删除 ReplicaSet，则必须通过 -d 参数指定 `propagationPolicy` 为 `Background` 或 `Foreground`，例如：

``` sh
kubectl proxy --port=8080
curl -X DELETE  'localhost:8080/apis/extensions/v1beta1/namespaces/default/replicasets/frontend' \
> -d '{"kind":"DeleteOptions","apiVersion":"v1","propagationPolicy":"Foreground"}' \
> -H "Content-Type: application/json"
```

### 只删除ReplicaSet

使用 `kubectl delete --cascade=false` 命令，可以删除 ReplicaSet，但是仍然保留其 Pod。如果使用 REST API 或者 `client-go` 代码库调用 apiserver 来删除 ReplicaSet，则必须通过 -d 参数指定 `propagationPolicy` 为 `Orphan`，例如：

```sh
kubectl proxy --port=8080
curl -X DELETE  'localhost:8080/apis/extensions/v1beta1/namespaces/default/replicasets/frontend' \
> -d '{"kind":"DeleteOptions","apiVersion":"v1","propagationPolicy":"Orphan"}' \
> -H "Content-Type: application/json"
```

一旦原来的 ReplicaSet 被删除，您可以创建新的 ReplicaSet 作为替代。只要新 ReplicaSet 的 `.spec.selector` 字段与旧 ReplicaSet 的 `.spec.selector` 字段相同，则新的 ReplicaSet 将接管旧 ReplicaSet 遗留下来的 Pod。但是，新的 ReplicaSet 中定义的 `.spec.template` 对遗留下来的 Pod 不会产生任何影响。如果要更新 Pod 的 `.spec.template` 内容，请使用 [Deployment](/learning/k8s-intermediate/workload/wl-deployment/)，ReplicaSet 并不直接支持滚动更新。

### 将Pod从ReplicaSet中隔离

修改 Pod 的标签，可以使 Pod 脱离 ReplicaSet 的管理。这个小技巧在如下场景可能非常有用：
* 将 Pod 从 Service 中移除，以便 Debug 或者做数据恢复
* 其他

通过这种方式从 ReplicaSet 移除了 Pod 之后，ReplicaSet 将立刻自动创建一个新的 Pod 以维持其指定的 `replicas` 副本数。

### 伸缩ReplicaSet

ReplicaSet可以轻易的 scale up 或者 scale down，只需要修改 `.spec.replicas` 字段即可。ReplicaSet 控制器将确保与其标签选择器 `.spec.selector` 匹配的 Pod 数量与 `replicas` 指定的数量相等。

### ReplicaSet的自动伸缩

可以使用 [Horizontal Pod Autoscalers(HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) 对 ReplicaSet 执行自动的水平伸缩。下面例子中的 HPA 可以用来对前面例子中的 ReplicaSet 执行自动的水平伸缩：

<<< @/.vuepress/public/statics/learning/replicaset/hpa-rs.yaml {7,8}

执行命令可创建该 HPA，该HPA将根据CPU的使用情况对ReplicaSet进行自动伸缩

``` sh
kubectl apply -f https://kuboard.cn/statics/learning/replicaset/hpa-rs.yaml
```

此外，您也可以使用 `kubectl autoscale` 命令达到相同的效果：

``` sh
kubectl autoscale rs frontend --max=10
```

## ReplicaSet的替代选项

### Deployment（推荐）

[Deployment](/learning/k8s-intermediate/workload/wl-deployment/) 对象包含 ReplicaSet 作为从属对象，并且可通过声明式、滚动更新的方式更新 ReplicaSet 及其 Pod。尽管 ReplicaSet 可以单独使用，但是 ReplicaSet 现在主要是被用作 Deployment 中负责 Pod 创建、删除、更新的一种手段。当您使用 Deployment 时，您无需关心 由 Deployment 创建的 ReplicaSet，Deployment 将处理所有与之相关的细节。

::: tip 推荐
请始终使用 Deployment，而不是 ReplicaSet
:::

### Bare Pods

与用户直接创建的 Pod 不同，ReplicaSet 在 Pod 由于任何原因被删除或终止时（例如，节点故障或者节点升级）将创建新的 Pod 作为其替代。不推荐您直接使用 Pod，即便您的应用程序只需要一个 Pod 副本，请使用 Deployment。

### Job

使用 [Job](/learning/k8s-intermediate/workload/wl-job/) 执行批处理任务

### DaemonSet

当您需要提供机器级别的功能时（例如监控节点、[收集节点上的日志](/learning/k8s-advanced/logs/node.html)），使用 [DaemonSet](/learning/k8s-intermediate/workload/wl-daemonset/)。

### ReplicationController

ReplicaSet 是 [ReplicationController](/learning/k8s-intermediate/workload/wl-replication-con/) 的后继者。它们的用途相同，行为相似，区别在于：
* ReplicationController 不支持 [基于集合的选择器](/learning/k8s-intermediate/obj/labels.html#基于集合的选择方式)，因此，推荐使用 ReplicaSet 而不是 ReplicationController
