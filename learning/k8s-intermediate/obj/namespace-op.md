---
# vssueId: 133
layout: LearningLayout
description: Kubernetes教程_本文描述了如何创建、查看、删除名称空间，以及如何使用名称空间。同时，本文还描述了如何通过名称空间切分集群。
meta:
  - name: keywords
    content: Kubernetes 名称空间,Kubernetes namespace,Kubernetes共享集群
---

# 使用名称空间共享集群

<AdSenseTitle>

> 参考文档： [Share a Cluster with Namespaces](https://kubernetes.io/docs/tasks/administer-cluster/namespaces/)

本文描述了如何创建、查看、删除名称空间，以及如何使用名称空间。同时，本文还描述了如何通过名称空间切分集群。

**难度等级**：简单

[[TOC]]

</AdSenseTitle>

## 查看名称空间

查看集群中的名称空间列表：

``` sh
kubectl get namespaces
```
输出结果如下所示：
```
NAME          STATUS    AGE
default       Active    11d
kube-system   Active    11d
kube-public   Active    11d
```

::: tip
Kuboard 中，登录以后，集群概览页的上方就是名称空间，请参考 [名称空间管理](/guide/cluster/namespace.html)
:::

Kubernetes 安装成功后，默认有初始化了三个名称空间：
* **default** 默认名称空间，如果 Kubernetes 对象中不定义 `metadata.namespace` 字段，该对象将放在此名称空间下
* **kube-system** Kubernetes系统创建的对象放在此名称空间下
* **kube-public** 此名称空间自动在安装集群是自动创建，并且所有用户都是可以读取的（即使是那些未登录的用户）。主要是为集群预留的，例如，某些情况下，某些Kubernetes对象应该被所有集群用户看到。

查看名称空间的概要信息：
``` sh
kubectl describe namespaces <name>
```
输出结果如下所示：

```
Name:           default
Labels:         <none>
Annotations:    <none>
Status:         Active

No resource quota.

Resource Limits
 Type       Resource    Min Max Default
 ----               --------    --- --- ---
 Container          cpu         -   -   100m
```

::: tip
该结果中展示了 [Resource Quota](/learning/k8s-advanced/policy/rq.html) 和 [resource limit range](/learning/k8s-advanced/policy/lr.html)
:::

* Resource quota 汇总了名称空间中使用的资源总量，并云讯集群管理员定义该名称空间最多可以使用的资源量
* Limit range 定义了名称空间中某种具体的资源类型的最大、最小值

名称空间可能有两种状态（phase）：
* **Active** 名称空间正在使用中
* **Termining** 名称空间正在被删除，不能再向其中创建新的对象

更多信息请参考 [phases](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/namespaces.md#phases)

## 创建名称空间

使用 kubectl 有两种方式可以创建名称空间
* 通过 yaml 文件，创建文件 `my-namespace.yaml` 内容如下：
  ``` yaml
  apiVersion: v1
  kind: Namespace
  metadata:
    name: <名称空间的名字>
  ```
  执行命令
  ```sh
  kubectl create -f ./my-namespace.yaml
  ```
* 直接使用命令创建名称空间：
  ``` sh
  kubectl create namespace <名称空间的名字>
  ```

在 Kuboard 中创建名称空间，请参考 [名称空间管理](/guide/cluster/namespace.html)

::: tip
名称空间的名字必须与 DNS 兼容：
* 不能带小数点 `.`
* 不能带下划线 `_`
* 使用数字、小写字母和减号 `-` 组成的字符串
:::

名称空间可以定义一个可选项字段 `finalizers`，在名称空间被删除时，用来清理相关的资源。
更多信息请参考 [Finalizers](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/namespaces.md#finalizers)
::: danger
如果您定义了一个不存在的 `finalizer`，您仍然可以成功创建名称空间，但是当您删除该名称空间时，将卡在 `Terminating` 状态。
:::

## 删除名称空间

执行如下命令可删除名称空间：
``` sh
kubectl delete namespaces <名称空间的名字>
```

::: danger
该操作将删除名称空间中的所有内容
:::

此删除操作是异步的，您可能会观察到名称空间停留会在 `Terminating` 状态停留一段时间。

## 使用名称空间切分集群

### 理解 `default` 名称空间

  默认情况下，安装Kubernetes集群时，会初始化一个 `default` 名称空间，用来将承载那些未指定名称空间的 Pod、Service、Deployment等对象

### 创建新的名称空间
  
在此练习中，我们将创建两个 Kubernetes 名称空间。

假设企业使用同一个集群作为开发环境和生产环境（注意：通常开发环境和生产环境是物理隔绝的）：
* 开发团队期望有一个集群中的空间，以便他们可以查看查看和使用他们创建的 Pod、Service、Deployment等。在此空间中，Kubernetes对象被创建又被删除，为了适应敏捷开发的过程，团队中的许多人都可以在此空间内做他们想做的事情。
* 运维团队也期望有一个集群中的空间，在这里，将有严格的流程控制谁可以操作 Pod、Service、Deployment等对象，因为这些对象都直接服务于生产环境。

此时，该企业可以将一个Kubernetes集群切分成两个名称空间：`development` 和 `production`。创建名称空间的 yaml 文件如下所示：

<<< @/.vuepress/public/statics/learning/namespace/dev.yaml

执行命令以创建 `development` 名称空间：
```sh
kubectl create -f https://kuboard.cn/statics/learning/namespace/dev.yaml
```
执行命令以创建 `production` 名称空间：
``` sh
kubectl create -f https://kuboard.cn/statics/learning/namespace/prod.yaml
```
执行命令查看已创建的名称空间
``` sh
kubectl get namespaces --show-labels
```
输出结果如下所示
```
NAME          STATUS    AGE       LABELS
default       Active    32m       <none>
development   Active    29s       name=development
production    Active    23s       name=production
```

### 在每个名称空间中创建 Pod

Kubernetes名称空间为集群中的 Pod、Service、Deployment 提供了一个作用域。可以限定使用某个名称空间的用户不能看到另外一个名称空间中的内容。我们可以在 `development` 名称空间中创建一个简单的 Deployment 和 Pod 来演示这个特性。

* 首先，执行命令以检查当前的 [kubectl 上下文](/install/config-kubectl.html#切换当前访问的集群)
  ``` sh
  kubectl config view
  ```
  输出结果如下所示：
  ```
  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority-data: REDACTED
      server: https://130.211.122.180
    name: lithe-cocoa-92103_kubernetes
  contexts:
  - context:
      cluster: lithe-cocoa-92103_kubernetes
      user: lithe-cocoa-92103_kubernetes
    name: lithe-cocoa-92103_kubernetes
  current-context: lithe-cocoa-92103_kubernetes
  kind: Config
  preferences: {}
  users:
  - name: lithe-cocoa-92103_kubernetes
    user:
      client-certificate-data: REDACTED
      client-key-data: REDACTED
      token: 65rZW78y8HbwXXtSXuUw9DbP4FLjHi4b
  - name: lithe-cocoa-92103_kubernetes-basic-auth
    user:
      password: h5M0FtUUIflBSdI7
      username: admin
  ```
  执行命令
  ``` sh
  kubectl config current-context
  ```
  输出结果如下所示
  ```
  lithe-cocoa-92103_kubernetes
  ```

* 接下来，为 kubectl 定义一个上下文，以便在不同的名称空间中工作。`cluster` 和 `user` 字段的取值从前面的 current context 复制过来：
  ``` sh
  kubectl config set-context dev --namespace=development --cluster=lithe-cocoa-92103_kubernetes --user=lithe-cocoa-92103_kubernetes
  kubectl config set-context prod --namespace=production --cluster=lithe-cocoa-92103_kubernetes --user=lithe-cocoa-92103_kubernetes
  ```
  上面的命令创建了两个 kubectl 的上下文，使得您可以在两个不同的名称空间中工作：

* 切换到 `development` 名称空间：
  ``` sh
  kubectl config use-conetxt dev
  ```
  验证
  ``` sh
  kubectl config current-context
  dev
  ```
  此时，通过 kubectl 向 Kubernetes 集群发出的所有指令都限定在名称空间 `development` 里
  
  创建一个 nginx
  ``` sh
  kubectl run snowflake --image=nginx:1.7.9 --replicas=2
  ```
  刚刚创建的 Deployment 副本数为 2，运行了一个 nginx 容器。
  ```sh
  kubectl get deployment
  ```
  输出结果如下
  ```
  NAME        DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
  snowflake   2         2         2            2           2m
  ```
  执行命令
  ``` sh
  kubectl get pods -l run=snowflake
  ```
  输出结果如下
  ```
  NAME                         READY     STATUS    RESTARTS   AGE
  snowflake-3968820950-9dgr8   1/1       Running   0          2m
  snowflake-3968820950-vgc4n   1/1       Running   0          2m
  ```

  此时，开发人员可以做任何他想要做的操作，所有操作都限定在名称空间 `development` 里，而无需担心影响到 `production` 名称空间中的内容。

* 切换到 `production` 名称空间：
  ```sh
  kubectl config use-context prod
  ```
  `production` 名称空间应该是空的，下面两个命令将返回的结果都应该为空：
  ``` sh
  kubectl get deployment
  kubectl get pods
  ```
  此时，我们在 production 名称空间运行另一个 deployment：
  ``` sh
  kubectl run cattle --image=nginx:1.7.9 --replicas=5
  kubectl get deployment
  ```
  输出结果如下所示：
  ```
  NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
  cattle    5         5         5            5           10s
  ```
  执行命令
  ``` sh
  kubectl get pods -l run=cattle
  ```
  输出结果如下所示：
  ```
  NAME                      READY     STATUS    RESTARTS   AGE
  cattle-2263376956-41xy6   1/1       Running   0          34s
  cattle-2263376956-kw466   1/1       Running   0          34s
  cattle-2263376956-n4v97   1/1       Running   0          34s
  cattle-2263376956-p5p3i   1/1       Running   0          34s
  cattle-2263376956-sxpth   1/1       Running   0          34s
  ```
  至此，我们可以了解到，用户在一个名称空间创建的内容对于另外一个名称空间来说是不可见的。

  也可以为不同的名称空间定义不同的访问权限控制。敬请期待后续更新。

  <!-- FIXME -->

## 为什么需要名称空间

一个Kubernetes集群应该可以满足多组用户的不同需要。Kubernetes名称空间可以使不同的项目、团队或客户共享同一个 Kubernetes 集群。实现的方式是，提供：
* [名称](./names.html) 的作用域
* 为不同的名称空间定义不同的授权方式和资源分配策略 [Resource Quota](/learning/k8s-advanced/policy/rq.html) 和 [resource limit range](/learning/k8s-advanced/policy/lr.html)

每一个用户组都期望独立于其他用户组进行工作。通过名称空间，每个用户组拥有自己的：
* Kubernetes 对象（Pod、Service、Deployment等）
* 授权（谁可以在该名称空间中执行操作）
* 资源分配（该用户组或名称空间可以使用集群中的多少计算资源）

可能的使用情况有：
* 集群管理员通过一个Kubernetes集群支持多个用户组
* 集群管理员将集群中某个名称空间的权限分配给用户组中的受信任的成员
* 集群管理员可以限定某一个用户组可以消耗的资源数量，以避免其他用户组受到影响
* 集群用户可以使用自己的Kubernetes对象，而不会与集群中的其他用户组相互干扰
