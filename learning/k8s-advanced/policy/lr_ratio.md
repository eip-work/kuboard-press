---
vssueId: 143
layout: LearningLayout
description: Kubernetes教程_本文讨论了如何使用LimitRange在名称空间中限制Limits/Requests的比例_如果指定了LimitRange对象的spec.limits.maxLimitRequestRatio字段_名称空间中的Pod/容器的request和limit都不能为0_且limit除以request的结果必须小于或等于LimitRange的spec.limits.maxLimitRequestRatio
meta:
  - name: keywords
    content: Kubernetes
---

# 限定 Limit/Request 比例


<AdSenseTitle>

> 参考文档：[Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

本文讨论了如何使用 LimitRange 在名称空间中限制 Limits/Requests 的比例。如果指定了 LimitRange 对象的 `spec.limits.maxLimitRequestRatio` 字段，名称空间中的 Pod/容器的 request 和 limit 都不能为 0，且 limit 除以 request 的结果必须小于或等于 LimitRange 的 `spec.limits.maxLimitRequestRatio`

</AdSenseTitle>

下面的例子中 `LimitRange` 限定了名称空间中任何 Pod 的最大内存限定（limit）不能超过最小内存请求（request）的两倍：

<<< @/.vuepress/public/statics/learning/policy/lr-ratio-limit-range.yaml {8}

* 执行命令以创建该 LimitRange：
  ``` sh
  kubectl create -f https://kuboard.cn/statics/learning/policy/lr-ratio-limit-range.yaml -n limitrange-demo
  ```
  执行命令以查看创建结果：
  ``` sh
  kubectl describe limitrange/limit-memory-ratio-pod -n limitrange-demo
  ```
  输出结果如下所示：
  ```
  Name:       limit-memory-ratio-pod
  Namespace:  limitrange-demo
  Type        Resource  Min  Max  Default Request  Default Limit  Max Limit/Request Ratio
  ----        --------  ---  ---  ---------------  -------------  -----------------------
  Pod         memory    -    -    -                -              2
  ```

* 此时，如果我们创建一个 Pod 包含如下属性 `requests.memory=100Mi` 和 `limits.memory=300Mi`：
  
  <<< @/.vuepress/public/statics/learning/policy/lr-ratio-pod.yaml {11,13}

  执行命令以创建该 Pod：
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/policy/lr-ratio-pod.yaml -n limitrange-demo
  ```
  由于该 Pod 的内存限制请求比例为 `3`，超过了 LimitRange 中定义的 `2`，该 Pod 将不能创建成功：
  ```
  Error from server (Forbidden): error when creating "lr-ratio-pod.yaml": pods "busybox3" is forbidden: memory max limit to request ratio per Pod is 2, but provided ratio is 3.000000.
  ```
