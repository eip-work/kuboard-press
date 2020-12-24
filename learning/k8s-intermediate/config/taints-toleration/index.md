---
vssueId: 90
titlePrefix: 污点和容忍
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_配置污点和容忍taints_and_toleration
meta:
  - name: keywords
    content: Kubernetes教程,污点,容忍,kubernetes taints,kubernetes toleration
---

# 概述

<AdSenseTitle/>

> 参考文档： Kubernetes 文档 [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)

Pod 中存在属性 [Node selector / Node affinity](/learning/k8s-intermediate/config/assign-pod-node.html)，用于将 Pod 指定到合适的节点。

相对的，节点中存在属性 `污点 taints`，使得节点可以排斥某些 Pod。

污点和容忍（taints and tolerations）成对工作，以确保 Pod 不会被调度到不合适的节点上。
* 可以为节点增加污点（taints，一个节点可以有 0-N 个污点）
* 可以为 Pod 增加容忍（toleration，一个 Pod 可以有 0-N 个容忍）
* 如果节点上存在污点，则该节点不会接受任何不能容忍（tolerate）该污点的 Pod。

## 向节点添加污点

* 执行 `kubectl taint` 命令，可向节点添加污点，如下所示：

  ``` sh
  kubectl taint nodes node1 key=value:NoSchedule
  ```
  该命令为节点 `node1` 添加了一个污点。污点是一个键值对，在本例中，污点的键为 `key`，值为 `value`，污点效果为 `NoSchedule`。此污点意味着 Kubernetes 不会向该节点调度任何 Pod，除非该 Pod 有一个匹配的容忍（toleration）

* 执行如下命令可以将本例中的污点移除：

  ``` sh
  kubectl taint nodes node1 key:NoSchedule-
  ```

## 向 Pod 添加容忍

PodSpec 中有一个 `tolerations` 字段，可用于向 Pod 添加容忍。下面的两个例子中定义的容忍都可以匹配上例中的污点，包含这些容忍的 Pod 也都可以被调度到 `node1` 节点上：

* 容忍1：
  ``` yaml
  tolerations:
  - key: "key"
    operator: "Equal"
    value: "value"
    effect: "NoSchedule"
  ```
* 容忍2：
  ``` yaml
  tolerations:
  - key: "key"
    operator: "Exists"
    effect: "NoSchedule"
  ```

下面这个 Pod 的例子中，使用了容忍：

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "example-key"
    operator: "Exists"
    effect: "NoSchedule"
```

## 污点与容忍的匹配

当满足如下条件时，Kubernetes 认为容忍和污点匹配：
* 键（key）相同
* 效果（effect）相同
* 污点的 `operator` 为：
  * `Exists` （此时污点中不应该指定 `value`）
  * 或者 `Equal` （此时容忍的 `value` 应与污点的 `value` 相同）

如果不指定 `operator`，则其默认为 `Equal`


::: tip 特殊情况

存在如下两种特殊情况：
* 容忍中未定义 `key` 但是定义了 operator 为 `Exists`，Kubernetes 认为此容忍匹配所有的污点，如下所示：

  ```yaml
  tolerations:
  - operator: "Exists"
  ```
* 容忍中未定义 `effect` 但是定义了 `key`，Kubernetes 认为此容忍匹配所有 `effect`，如下所示：

  ``` yaml
  tolerations:
  - key: "key"
    operator: "Exists"
  ```

:::

支持的效果 `effect` 有：
* **`NoSchedule`**
* **`PreferNoSchedule`** 比 `NoSchedule` 更宽容一些，Kubernetes 将尽量避免将没有匹配容忍的 Pod 调度到该节点上，但是并不是不可以
* **`NoExecute`** 不能在节点上运行（如果已经运行，将被驱逐）

一个节点上可以有多个污点，同时一个 Pod 上可以有多个容忍。Kubernetes 使用一种类似于过滤器的方法来处理多个节点和容忍：
* 对于节点的所有污点，检查 Pod 上是否有匹配的容忍，如果存在匹配的容忍，则忽略该污点；
* 剩下的不可忽略的污点将对该 Pod 起作用

例如：
* 如果存在至少一个不可忽略的污点带有效果 `NoSchedule`，则 Kubernetes 不会将 Pod 调度到该节点上
* 如果没有不可忽略的污点带有效果 `NoSchedule`，但是至少存在一个不可忽略的污点带有效果 `PreferNoSchedule`，则 Kubernetes 将尽量避免将该 Pod 调度到此节点
* 如果存在至少一个忽略的污点带有效果 `NoExecute`，则：
  * 假设 Pod 已经在该节点上运行，Kubernetes 将从该节点上驱逐（evict）该 Pod
  * 假设 Pod 尚未在该节点上运行，Kubernetes 将不会把 Pod 调度到该节点

例如，假设您给一个节点添加了三个污点：
``` sh
kubectl taint nodes node1 key1=value1:NoSchedule
kubectl taint nodes node1 key1=value1:NoExecute
kubectl taint nodes node1 key2=value2:NoSchedule
```
同时，有一个 Pod 带有两个容忍：
``` yaml
tolerations:
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoSchedule"
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoExecute"
```

在这个案例中，Pod 上有两个容忍，匹配了节点的前两个污点，只有节点的第三个污点对该 Pod 来说不可忽略，该污点的效果为 `NoSchedule`：
* Kubernetes 不会将此 Pod 调度到该节点上
* 如果 Kubernetes 先将 Pod 调度到了该节点，后向该节点添加了第三个污点，则 Pod 将继续在该节点上运行而不会被驱逐（节点上带有 `NoExecute` 效果的污点已被 Pod 上的第二个容忍匹配，因此被忽略）

通常，在带有效果 `NoExecute` 的污点被添加到节点时，节点上任何不容忍该污点的 Pod 将被立刻驱逐，而容忍该污点的 Pod 则不会被驱逐。

此外，带有效果 `NoExecute` 的污点还可以指定一个可选字段 `tolerationSeconds`，该字段指定了 Pod 在多长时间后被驱逐，例如：

``` yaml
tolerations:
- key: "key1"
  operator: "Equal"
  value: "value1"
  effect: "NoExecute"
  tolerationSeconds: 3600
```

此例子中，如果 Pod 已经运行在节点上，再向节点增加此污点时，Pod 将在该节点上继续运行 3600 秒，然后才被驱逐。如果污点在此之间被移除，则 Pod 将不会被驱逐。
