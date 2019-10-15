---
vssueId: 137
layout: LearningLayout
description: Kubernetes教程_标签Label是附加在Kubernetes对象上的一组名值对_其意图是按照对用户有意义的方式来标识Kubernetes对象_同时_又不对Kubernetes的核心逻辑产生影响_标签可以用来组织和选择一组Kubernetes对象
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Labels,Kubernetes Selector
---

# 标签和选择器

<AdSenseTitle>

标签（Label）是附加在Kubernetes对象上的一组名值对，其意图是按照对用户有意义的方式来标识Kubernetes对象，同时，又不对Kubernetes的核心逻辑产生影响。标签可以用来组织和选择一组Kubernetes对象。您可以在创建Kubernetes对象时为其添加标签，也可以在创建以后再为其添加标签。每个Kubernetes对象可以有多个标签，同一个对象的标签的 Key 必须唯一，例如：

``` yaml
metadata:
  labels:
    key1: value1
    key2: value2
```

使用标签（Label）可以高效地查询和监听Kubernetes对象，在Kubernetes界面工具（如 Kubenetes Dashboard 或 Kuboard）和 kubectl 中，标签的使用非常普遍。那些非标识性的信息应该记录在[注解（annotation）](./annotations.html)

[[TOC]]

</AdSenseTitle>

## 为什么要使用标签

使用标签，用户可以按照自己期望的形式组织 Kubernetes 对象之间的结构，而无需对 Kubernetes 有任何修改。

应用程序的部署或者批处理程序的部署通常都是多维度的（例如，多个高可用分区、多个程序版本、多个微服务分层）。管理这些对象时，很多时候要针对某一个维度的条件做整体操作，例如，将某个版本的程序整体删除，这种情况下，如果用户能够事先规划好标签的使用，再通过标签进行选择，就会非常地便捷。

标签的例子有：

* `release: stable`、`release: canary`
* `environment: dev`、`environment: qa`、`environment: production`
* `tier: frontend`、`tier: backend`、`tier: cache`
* `partition: customerA`、`partition: customerB`
* `track: daily`、`track: weekly`

上面只是一些使用比较普遍的标签，您可以根据您自己的情况建立合适的使用标签的约定。

## 句法和字符集

标签是一组名值对（key/value pair）。标签的 key 可以有两个部分：可选的前缀和标签名，通过 `/` 分隔。
* 标签名：
  * 标签名部分是必须的
  * 不能多于 63 个字符
  * 必须由字母、数字开始和结尾
  * 可以包含字母、数字、减号`-`、下划线`_`、小数点`.`
* 标签前缀：
  * 标签前缀部分是可选的
  * 如果指定，必须是一个DNS的子域名，例如：k8s.eip.work
  * 不能多于 253 个字符
  * 使用 `/` 和标签名分隔

如果省略标签前缀，则标签的 key 将被认为是专属于用户的。Kubernetes的系统组件（例如，kube-scheduler、kube-controller-manager、kube-apiserver、kubectl 或其他第三方组件）向用户的Kubernetes对象添加标签时，必须指定一个前缀。

`kubernetes.io/` 和 `k8s.io/` 这两个前缀是 Kubernetes 核心组件预留的。Kuboard 使用 `k8s.eip.work` 这个前缀。

标签的 value 必须：
* 不能多于 63 个字符
* 可以为空字符串
* 如果不为空，则
  * 必须由字母、数字开始和结尾
  * 可以包含字母、数字、减号`-`、下划线`_`、小数点`.`

例如，下面的例子中的Pod包含两个标签 `environment: production` 和 `app:nginx`

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: label-demo
  labels:
    environment: production
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.7.9
    ports:
    - containerPort: 80
```

## 标签选择器

与 [name 和 UID](./names.html) 不同，标签不一定是唯一的。通常来讲，会有多个Kubernetes对象包含相同的标签。通过使用标签选择器（label selector），用户/客户端可以选择一组对象。标签选择器（label selector）是 Kubernetes 中最主要的分类和筛选手段。

Kubernetes api server支持两种形式的标签选择器，`equality-based 基于等式的` 和 `set-based 基于集合的`。标签选择器可以包含多个条件，并使用逗号分隔，此时只有满足所有条件的 Kubernetes 对象才会被选中。

如果使用空的标签选择器或者不指定选择器，其含义由具体的 API 接口决定。

### 基于等式的选择方式

Equality- 或者 inequality-based 选择器可以使用标签的名和值来执行过滤选择。只有匹配所有条件的对象才被选中（被选中的对象可以包含未指定的标签）。可以使用三种操作符 `=`、`==`、`!=`。前两个操作符含义是一样的，都代表相等，后一个操作符代表不相等。例如：
``` sh
# 选择了标签名为 `environment` 且 标签值为 `production` 的Kubernetes对象
environment = production
# 选择了标签名为 `tier` 且标签值不等于 `frontend` 的对象，以及不包含标签 `tier` 的对象
tier != frontend
```
也可以使用逗号分隔的两个等式 `environment=production,tier!=frontend`，此时将选中所有 `environment` 为 `production` 且 `tier` 不为 `frontend` 的对象。

以 [Pod 的节点选择器](/learning/k8s-intermediate/config/assign-pod-node.html#节点选择器-nodeselector) 为例，下面的 Pod 可以被调度到包含标签 `accelerator=nvidia-tesla-p100` 的节点上：

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: cuda-test
spec:
  containers:
    - name: cuda-test
      image: "k8s.gcr.io/cuda-vector-add:v0.1"
      resources:
        limits:
          nvidia.com/gpu: 1
  nodeSelector:
    accelerator: nvidia-tesla-p100
```

### 基于集合的选择方式

Set-based 标签选择器可以根据标签名的一组值进行筛选。支持的操作符有三种：`in`、`notin`、`exists`。例如：
``` sh
# 选择所有的包含 `environment` 标签且值为 `production` 或 `qa` 的对象
environment in (production, qa)
# 选择所有的 `tier` 标签不为 `frontend` 和 `backend`的对象，或不含 `tier` 标签的对象
tier notin (frontend, backend)
# 选择所有包含 `partition` 标签的对象
partition
# 选择所有不包含 `partition` 标签的对象
!partition
```

可以组合多个选择器，用 `,` 分隔，`,` 相当于 `AND` 操作符。例如：
``` sh
# 选择包含 `partition` 标签（不检查标签值）且 `environment` 不是 `qa` 的对象
partition,environment notin (qa)
```

基于集合的选择方式是一个更宽泛的基于等式的选择方式，例如，`environment=production` 等价于 `environment in (production)`；`environment!=production` 等价于 `environment notin (production)`。

基于集合的选择方式可以和基于等式的选择方式可以混合使用，例如：
`partition in (customerA, customerB),environment!=qa`

## API

### 查询条件

LIST 和 WATCH 操作时，可指定标签选择器作为查询条件，以筛选指定的对象集合。两种选择方式都可以使用，但是要符合 URL 编码，例如：
* 基于等式的选择方式： `?labelSelector=environment%3Dproduction,tier%3Dfrontend`
* 基于集合的选择方式： `?labelSelector=environment+in+%28production%2Cqa%29%2Ctier+in+%28frontend%29`

两种选择方式都可以在 kubectl 的 list 和 watch 命令中使用，例如：
* 使用基于等式的选择方式
  ``` sh
  kubectl get pods -l environment=production,tier=frontend
  ```
* 使用基于集合的选择方式
  ``` sh
  kubectl get pods -l 'environment in (production),tier in (frontend)'
  ```

### Kubernetes对象引用

某些 Kubernetes 对象中（例如，Service和Deployment），使用标签选择器指定一组其他类型的 Kubernetes 对象（例如，Pod）

#### Service

Service 中通过 `spec.selector` 字段来选择一组 Pod，并将服务请求转发到选中的 Pod 上。

在 yaml 或 json 文件中，标签选择器用一个 map 来定义，且支持基于等式的选择方式，例如：

``` json
"selector": {
  "component" : "redis",
}
```
或
``` yaml
selector:
  component: redis
```
上面的例子中定义的标签选择器等价于 `component=redis` 或 `component in (redis)`

#### 有些对象支持基于集合的选择方式

`Job`、`Deployment`、`ReplicaSet` 和 `DaemonSet` 同时支持基于等式的选择方式和基于集合的选择方式。例如：

``` yaml
selector:
  matchLabels:
    component: redis
  matchExpressions:
    - {key: tier, operator: In, values: [cache]}
    - {key: environment, operator: NotIn, values: [dev]}
```

`matchLabels` 是一个 {key,value} 组成的 map。map 中的一个 {key,value} 条目相当于 `matchExpressions` 中的一个元素，其 `key` 为 map 的 key，`operator` 为 `In`， `values` 数组则只包含 `value` 一个元素。`matchExpression` 等价于基于集合的选择方式，支持的 `operator` 有 `In`、`NotIn`、`Exists` 和 `DoesNotExist`。当 `operator` 为 `In` 或 `NotIn` 时，`values` 数组不能为空。所有的选择条件都以 AND 的形式合并计算，即所有的条件都满足才可以算是匹配。


#### 引用一组节点

可以通过标签选择器将 Pod 调度到指定的节点上，请参考 [将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html)
