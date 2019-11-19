---
vssueId: 143
layout: LearningLayout
description: Kubernetes教程_本文讨论了如何在容器级别创建 LimitRange。假设有一个 Pod 包含 4个容器，每个容器都定义了 spec.resource，此时 LimitRanger 管理控制器在处理该 Pod 中的 4个容器时，处理方式是不一样的。
meta:
  - name: keywords
    content: Kubernetes教程, LimitRange, Kubernetes Limit Range
---

# 限定容器的计算资源

> 参考文档：[Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

<AdSenseTitle>
</AdSenseTitle>

本文讨论了如何在容器级别创建 LimitRange。假设有一个 Pod 包含 4个容器，每个容器都定义了 `spec.resource`，此时 LimitRanger 管理控制器在处理该 Pod 中的 4个容器时，处理方式是不一样的。

演示步骤如下：

* 执行如下命令创建名称空间 `limitrange-demo`

  ``` sh
  kubectl create namespace limitrange-demo
  ```

  将 kubectl 默认名称空间切换至 `limitrange-demo`

  ``` sh
  kubectl config set-context --current --namespace=limitrange-demo
  ```

* LimitRange 对象的 yaml 文件如下所示：

  <<< @/.vuepress/public/statics/learning/policy/lr-container-limit-range.yaml

  该对象为名称空间中的容器定义了：
  * 最大和最小的CPU/内存
  * 默认的 CPU/内存限定
  * 默认的 CPU/内存请求

  执行命令以创建该对象：
  ``` sh
  kubectl create -f https://kuboard.cn/statics/learning/policy/lr-container-limit-range.yaml -n limitrange-demo
  ```
  执行命令查看结果
  ``` sh
  kubectl describe limitrange/limit-mem-cpu-per-container -n limitrange-demo
  ```
  输出结果如下所示
  ```
  Type        Resource  Min   Max   Default Request  Default Limit  Max Limit/Request Ratio
  ----        --------  ---   ---   ---------------  -------------  -----------------------
  Container   cpu       100m  800m  110m             700m           -
  Container   memory    99Mi  1Gi   111Mi            900Mi          -
  ```

* 前面提到的包含 4 个容器的 Pod，其 yaml 文件如下所示：

  <<< @/.vuepress/public/statics/learning/policy/lr-container-pod.yaml

  执行命令以创建该 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/policy/lr-container-pod.yaml
  ```

## 容器包含有效的 CPU/内存的requests/limits

执行以下命令，查看 `busybox-cnt01` 的配置信息

``` sh
kubectl get  po/busybox1 -n limitrange-demo -o json | jq ".spec.containers[0].resources"
```
输出结果如下所示
``` json
{
  "limits": {
    "cpu": "500m",
    "memory": "200Mi"
  },
  "requests": {
    "cpu": "100m",
    "memory": "100Mi"
  }
}
```
* `busybox` Pod 中的容器 `busybox-cnt01` 定义了 `requests.cpu=100m` 和 `requests.memory=100Mi`
* `100m <= 500m <= 800m` 容器的 cpu limit（500m）在名称空间 LimitRange 指定的范围内
* `99Mi <= 200Mi <= 1Gi` 容器的内存 limit（200Mi）在名称空间 LimitRange 指定的范围内
* 没有为CPU/内存指定 request/limit 比例
* 此时容器的定义是有效的，将被创建

## 容器包含有效的 CPU/内存requests且没有指定limits

执行以下命令，查看 `busybox-cnt02` 的配置信息
```sh
kubectl get  po/busybox1 -n limitrange-demo -o json | jq ".spec.containers[1].resources"
```
输出结果如下所示
``` json
{
  "limits": {
    "cpu": "700m",
    "memory": "900Mi"
  },
  "requests": {
    "cpu": "100m",
    "memory": "100Mi"
  }
}
```
* `busybox` Pod 中的容器 `busybox-cnt02` 定义了 `requests.cpu=100m` 和 `requests.memory=100Mi`，且为指定 CPU/内存的最大限定
* 由于容器没有定义 limits，则名称空间的 LimitRange 定义的 `limits.cpu=700mi` 和 `limits.memory=900Mi` 被注入到该容器
* `100m <= 700m <= 800m` 容器的CPU最大限定（700m）在名称空间 LimitRange 指定的范围内
* `99Mi <= 900Mi <= 1Gi` 容器的内存 limit（900Mi）在名称空间 LimitRange 指定的范围内
* 没有为CPU/内存指定 request/limit 比例
* 此时容器的定义是有效的，将被创建

## 容器包含有效的CPU/内存limits且没有指定requests

执行以下命令，查看 `busybox-cnt03` 的配置信息
``` sh
kubectl get  po/busybox1 -n limitrange-demo -o json | jq ".spec.containers[2].resources"
```
输出结果如下所示
``` json
{
  "limits": {
    "cpu": "500m",
    "memory": "200Mi"
  },
  "requests": {
    "cpu": "500m",
    "memory": "200Mi"
  }
}
```
* `busybox` Pod 中的容器 `busybox-cnt03` 定义了 `limits.cpu=500m` 和 `limits.memory=200Mi`，且没有指定 CPU/内存的 `requests`
* 由于容器没有定义 `requests`，名称空间中 LimitRange 定义的 `defaultRequest` 并没有注入到容器的 `request` 字段，反而，容器定义的 `limits` 被设置到了其 `requests` 字段： `limits.cpu=500m` 和 `limits.memory=200Mi`
* `100m <= 500m <= 800m` 容器的 cpu 最大限定（500m）在名称空间 LimitRange 指定的范围内
* `99Mi <= 200Mi <= 1Gi` 容器的内存最大限定（200Mi）在名称空间 LimitRange 指定的范围内
* 没有为CPU/内存指定 request/limit 比例
* 此时容器的定义是有效的，将被创建

## 容器不包含CPU/内存的requests/limits

执行以下命令，查看 `busybox-cnt04` 的配置信息
``` sh
kubectl get  po/busybox1 -n limitrange-demo -o json | jq ".spec.containers[3].resources"
```
输出结果如下所示：
```json
{
  "limits": {
    "cpu": "700m",
    "memory": "900Mi"
  },
  "requests": {
    "cpu": "110m",
    "memory": "111Mi"
  }
}
```
* `busybox` Pod 中的容器 `busybox-cnt04` 既没有定义 request，也没有定义 limits
* 由于容器没有定义 limits，则名称空间的 LimitRange 定义的 `limits.cpu=700mi` 和 `limits.memory=900Mi` 被注入到该容器
* 由于容器没有定义 requests，则名称空间的 LimitRange 定义的 `requests.cpu=110m` 和 `requests.memory=110Mi` 被注入到该容器
* `100m <= 700m <= 800m` 容器的 cpu 最大限定（700m）在名称空间 LimitRange 指定的范围内
* `99Mi <= 900Mi <= 1Gi` 容器的内存 limit（900Mi）在名称空间 LimitRange 指定的范围内
* 没有为CPU/内存指定 request/limit 比例
* 此时容器的定义是有效的，将被创建

Pod `busybox` 中所有的容器都通过了名称空间的 LimitRange 检查，此 Pod 将被创建
