---
# vssueId: 66
layout: LearningLayout
description: Kubernetes_自动水平伸缩_Horizontal_Pod_Autoscaler_例子
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes Horizontal Pod Autoscaler,水平自动伸缩
---

# 自动伸缩-例子

<AdSenseTitle/>

本文翻译自 Kubernetes 文档 [Horizontal Pod Autoscaler Walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)

HorizontalPodAutoscaler 可以根据观察到的 CPU 利用率（或者 beta 阶段的其他应用程序提供的度量值）对 ReplicationController、Deployment、ReplicaSet、StatefulSet 中的 Pod 副本数执指定自动伸缩操作。

本文阐述了一个使用 HorizontalPodAutoscaler 对 php-apache 服务进行自动伸缩的例子。更多与 HorizontalPodAutoscaler 相关的内容，请参考 [自动伸缩](./hpa.html)。

## 前提条件

如运行本文中的例子，必须满足以下条件：
* Kubernetes 集群，版本不低于 v1.6；可以参考 [安装 Kubernetes 单节点](/install/install-k8s.html) 完成集群的安装；
* Kubernetes 集群中已安装 [metrics-server](https://github.com/kubernetes-incubator/metrics-server/)，用于提供资源度量的 API 接口，可以使用 `kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server.yaml` 指令完成 metrics-server 的安装；
* 如果想要使用自定义度量值，您的集群必须能够和这些度量值接口的服务进行通信；
* 如果想要使用与 Kubernetes Object 无关的度量值（External metrics API），Kubernetes 集群版本必须不低于 v1.10，并且集群必须能够与提供外部度量值的 API 服务进行通信。

## 运行并发布 php-apache server

本文将要使用一个基于 php-apache 镜像自定义的 docker 镜像来演示 HorizontalPodAutoscaler。Dockerfile 如下所示：

``` yaml
FROM php:5-apache
COPY index.php /var/www/html/index.php
RUN chmod a+rx index.php
```

其中 `index.php` 文件的内容如下所示，该 php 页面执行了一些大量消耗 CPU 的计算：

``` php
<?php
  $x = 0.0001;
  for ($i = 0; $i <= 1000000; $i++) {
    $x += sqrt($x);
  }
  echo "OK!";
?>
```

首先，我们使用下面的 YAML 文件运行该镜像，并且将其暴露为一个 Kubernetes Service：

<<< @/.vuepress/public/statics/learning/hpa/php-apache.yaml

执行指令下面的指令，可以直接在您的集群中应用该文件：

``` sh
kubectl apply -f https://kuboard.cn/statics/learning/hpa/php-apache.yaml
```

正常情况下，该指令的输出信息为：
```
deployment.apps/php-apache created
service/php-apache created
```

## 创建 Horizontal Pod Autoscaler

php-apache 服务启动以后，现在可以使用 [kubectl autoscale](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#autoscale) 指令来创建 Autoscaler。下面的指令创建了一个 HorizontalPodAutoscaler，该 Autoscaler 使得我们在前一个步骤中创建的 php-apache Deployment 在 1 到 10 个副本之间伸缩。大致上，HPA 在通过增加或减少 Deployment 的副本数，以使得所有 Pod 的平均 CPU 利用率维持在 50% 左右（每个 Pod 的 CPU Request 是 200 milli-cores，即平均 CPU 利用率应该是 100 milli-cores）。[点击此处](./hpa.html#算法) 了解更多自动伸缩的算法。

``` sh
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
```
输出信息如下所示：
```
horizontalpodautoscaler.autoscaling/php-apache autoscaled
```
执行下面的指令，可以查看当前 HPA 的状态
```sh
kubectl get hpa
```
输出结果如下所示：
```
NAME         REFERENCE                     TARGET    MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   0% / 50%  1         10        1          18s
```
> * 请注意，当前 CPU 的消耗是 0%，因为我们尚未向 php-apache 服务发送任何请求；
> * `TARGET` 这一列展示了 Deployment 中所有 Pod 的平均 CPU 利用率。

## 增加负荷

接下来，我们为 php-apache 服务增加一些负荷，并观察 HPA 如何应对增加的负荷。

* 请打开一个新的命令行终端，并执行以下命令，该命令启动了一个容器，并进入该容器的命令行终端：
  ``` sh
  kubectl run -it --rm load-generator --image=busybox /bin/sh
  ```
  在容器命令行中输入如下脚本，并回车：
  > 该脚本向 php-apache 服务无限循环地发送查询请求：
  ``` sh
  while true; do wget -q -O- http://php-apache; done
  ```
* 大约 1 分钟左右，我们可以通过指令观察到较高的 CPU 利用率；
  ``` sh
  kubectl get hpa
  ```
  输出如下：
  ```
  NAME         REFERENCE                     TARGET      MINPODS   MAXPODS   REPLICAS   AGE
  php-apache   Deployment/php-apache/scale   305% / 50%  1         10        1          3m
  ```
* 此时，CPU 利用率增加到了 CPU 请求的 305%。对应的，HPA 将 Deployment 的副本数调整到 7：
  ``` sh
  kubectl get deployment php-apache
  ```
  输出如下：
  ```
  NAME         READY   UP-TO-DATE   AVAILABLE   AGE
  php-apache   7/7      7           7           19m
  ```
::: tip 备注
* 大约需要好几分钟的时间，Deployment 的副本数才会稳定下来；
* 由于我们并没有对施加在 php-apache 服务上的负荷做任何形式的控制，您在执行此实验时最终得到的副本数很可能与文档中的描述不一样。
:::

## 撤销负荷

在 [增加负荷](#增加负荷) 章节中创建的 load-generator 终端界面中输入组合键 `<ctrl> + c` 可以终止模拟的用户请求。此后，php-apache 服务的 CPU 利用率将持续下降到 0。

执行以下指令可以观察到这个变化的过程：
```sh
watch "kubectl get hpa && echo && kubectl get deployment php-apache"
```

一分钟左右，最终的输出结果如下：
```
NAME         REFERENCE                     TARGET       MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   0% / 50%     1         10        1          11m

NAME         READY   UP-TO-DATE   AVAILABLE   AGE
php-apache   1/1     1            1           27m
```

此时，CPU 利用率降低到 0，因此 HPA 将副本数自动地将副本数向下伸缩到 1。

::: tip 注意
自动伸缩的过程可能需要持续几分钟才能完成。
:::

## 基于多个度量值以及自定义度量值进行自动伸缩

使用 `autoscaling/v2beta2` 版本的 API，您可以引入额外的度量值用来对 Deployment `php-apache` 进行自动伸缩。

* 执行如下指令，获得前面创建的 HPA 的 `autoscaling/v1` 版本的 YAML：
  ``` sh
  kubectl get hpa php-apache -o yaml
  ```
  内容如下所示：
  ``` yaml
  apiVersion: autoscaling/v1
  kind: HorizontalPodAutoscaler
  metadata:
    name: php-apache
    namespace: default
    resourceVersion: "406527"
    selfLink: /apis/autoscaling/v1/namespaces/default/horizontalpodautoscalers/php-apache
    uid: 522839bb-1ff2-4364-b5cf-41e58837647e
  spec:
    maxReplicas: 10
    minReplicas: 1
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: php-apache
    targetCPUUtilizationPercentage: 50
  status:
    currentCPUUtilizationPercentage: 0
    currentReplicas: 7
    desiredReplicas: 7
    lastScaleTime: "2020-07-29T08:39:34Z"
  ```

* 执行如下指令获得同一个 HPA 的 `autoscaling/v2beta2` 版本的 YAML：

  ``` sh
  kubectl get hpa.v2beta2.autoscaling php-apache -o yaml
  ```
  内容如下所示：
  ``` yaml
  apiVersion: autoscaling/v2beta2
  kind: HorizontalPodAutoscaler
  metadata:
    name: php-apache
    namespace: default
    resourceVersion: "407497"
    selfLink: /apis/autoscaling/v2beta2/namespaces/default/horizontalpodautoscalers/php-apache
    uid: 522839bb-1ff2-4364-b5cf-41e58837647e
  spec:
    maxReplicas: 10
    metrics:
    - resource:
        name: cpu
        target:
          averageUtilization: 50
          type: Utilization
      type: Resource
    minReplicas: 1
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: php-apache
  status:
    conditions:
    - lastTransitionTime: "2020-07-29T08:36:00Z"
      message: recommended size matches current size
      reason: ReadyForNewScale
      status: "True"
      type: AbleToScale
    - lastTransitionTime: "2020-07-29T08:36:31Z"
      message: the HPA was able to successfully calculate a replica count from cpu resource
        utilization (percentage of request)
      reason: ValidMetricFound
      status: "True"
      type: ScalingActive
    - lastTransitionTime: "2020-07-29T08:48:26Z"
      message: the desired replica count is less than the minimum replica count
      reason: TooFewReplicas
      status: "True"
      type: ScalingLimited
    currentMetrics:
    - resource:
        current:
          averageUtilization: 0
          averageValue: 1m
        name: cpu
      type: Resource
    currentReplicas: 1
    desiredReplicas: 1
    lastScaleTime: "2020-07-29T08:48:26Z"
  ```

比对两个版本的差异，您可以注意到 `targetCPUUtilizationPercentage` 字段被替换为一个叫做 `metrics` 的数组。CPU 利用率是一个 ***resource metric***，代表了容器组的某个资源使用情况。此时，您还可以指定 CPU 之外的其他资源度量，默认情况下，除了 CPU 意外，还有另外一个可用的资源度量就是内存了。只要您的集群上安装了 `metrics.k8s.io` 接口（通常由 `metrics-server` 提供），`cpu` 和 `memory` 这两个类型的资源度量就可以使用。

您还可以用具体数值的方式指定资源度量，而不是资源的利用率。此时，您需要：
* 将 `.spec.metrics[*].resource.target.type` 的值从 `Utilization` 改为 `AverageValue`；
* 删除 `.spec.metrics[*].resource.target.averageUtilization` 字段；
* 增加 `.spec.metrics[*].resource.target.averageValue` 并指定对应的度量值。

除了 ***resource metrics*** 资源度量以外，还存在两种类型的度量（pod metrics / object metrics），这两种类型的度量都被认为是 ***custom metrics*** 自定义度量。自定义度量需要对集群进行比较复杂的监控设置，并且，在不同的集群上，其名字可能不一样。

* ***Pod metrics*** 是用来描述 Pod 的度量值，HPA 控制器对所有 Pod metrics 求平均值后再与目标值进行对比，以此决定最终的伸缩目标副本数。***Pod metrics*** 的工作方式与资源度量非常相似，不同的是，***pod metrics*** 对应的 `.spec.metrics[*].pods.target` 字段只支持 `AverageValue` 这个取值。

  例如：
  ``` yaml
  type: Pods
  pods:
    metric:
      name: packets-per-second
    target:
      type: AverageValue
      averageValue: 1k
  ```

* ***Object metrics*** 是一种描述了同一名称空间中 Pod 以外的某种对象的度量值，这些度量信息并不一定从该对象本身获得。***Object metrics*** 的 `.spec.metrics[*].object.target` 支持 `Value` 和 `AverageValue` 两个选项：
  * `Value`： HPA 控制器将 `.spec.metrics[*].object.target.value` 字段的取值直接和 API 中获得的度量值进行比较；
  * `AverageValue`： HPA 控制器将 API 中获得的自定义度量值除以 Pod 的总数，然后在和 `.spec.metrics[*].object.target.averageValue` 字段的取值进行比较。
  
  下面的 YAML 示例了如何使用 `requests-per-second` 度量值进行自动伸缩：
  ``` yaml
  type: Object
  object:
    metric:
      name: requests-per-second
    describedObject:
      apiVersion: networking.k8s.io/v1beta1
      kind: Ingress
      name: main-route
    target:
      type: Value
      value: 2k
  ```

* 如果 HorizontalPodAutoscaler 中提供了多个 metrics 区块，则 HPA 控制器将会逐个考察每一个度量信息。具体来说，HPA 控制器将会依据每一种度量信息计算出建议的目标伸缩副本数，并最终选取数值最高的一个。
  
  例如：如果您的监控系统可以收集网络流量的度量信息，您可以使用 `kubectl edit` 编辑上述的 HorizontalPodAutoscaler 为如下 YAML：
  
  ``` yaml
  apiVersion: autoscaling/v2beta2
  kind: HorizontalPodAutoscaler
  metadata:
    name: php-apache
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: php-apache
    minReplicas: 1
    maxReplicas: 10
    metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
    - type: Pods
      pods:
        metric:
          name: packets-per-second
        target:
          type: AverageValue
          averageValue: 1k
    - type: Object
      object:
        metric:
          name: requests-per-second
        describedObject:
          apiVersion: networking.k8s.io/v1beta1
          kind: Ingress
          name: main-route
        target:
          type: Value
          value: 10k
  status:
    observedGeneration: 1
    lastScaleTime: <some-time>
    currentReplicas: 1
    desiredReplicas: 1
    currentMetrics:
    - type: Resource
      resource:
        name: cpu
      current:
        averageUtilization: 0
        averageValue: 0
    - type: Object
      object:
        metric:
          name: requests-per-second
        describedObject:
          apiVersion: networking.k8s.io/v1beta1
          kind: Ingress
          name: main-route
        current:
          value: 10k
  ```
  此时，HorizontalPodAutoscaler 将会尝试确保：
  * 每个 Pod 大致消耗 50% 的已请求的 CPU；
  * 每秒钟处理 1000 个数据包；
  * `main-route` Ingress 后的所有 Pod 每秒总共处理 10000 个请求。

### 基于特定度量的自动伸缩

许多度量信息源允许用户通过名称和一组额外的标签（labels）描述度量信息。对于非资源度量（pod metrics / object metrics / external metrics 等）来说，用户可以指定一个额外的标签选择器作为查询度量信息时的参数。例如，您的监控系统采集了带 `verb` 标签的 `http_requests` 度量，您可以通过下述 YAML 样例指定 HPA 基于 `verb` 标签值为 `GET` 的度量值进行伸缩：

``` yaml
type: Object
object:
  metric:
    name: http_requests
    selector: {matchLabels: {verb: GET}}
```

此处的选择器 `selector` 使用与 Kubernetes [标签选择器](/learning/k8s-intermediate/obj/labels.html) 一样的语法。如果此处指定的名字和标签选择器最终匹配了度量信息源中的多个序列（series），则由度量信息源决定如何将多个序列（series）合并成单个数值。

### 基于与 Kubernetes 对象无关的度量信息的自动伸缩
