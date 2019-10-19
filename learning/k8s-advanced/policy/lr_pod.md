---
vssueId: 143
layout: LearningLayout
description: Kubernetes教程_本文讨论了如何使用LimitRange_在Pod级别限定资源的使用_下面是一个用于限定Pod资源使用的LimitRange对象。
meta:
  - name: keywords
    content: Kubernetes
---

# 限定Pod的计算资源


<AdSenseTitle>

> 参考文档：[Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

本文讨论了如何使用 LimitRange 在 Pod 级别限定资源的使用。下面是一个用于限定 Pod 资源使用的 LimitRange 对象。

</AdSenseTitle>

<<< @/.vuepress/public/statics/learning/policy/lr-pod-limit-range.yaml

::: tip
在您开始本教程之前，请您先完成 [限定容器的计算资源](./lr_container.html)，并确保该教程中的 LimitRange `limit-mem-cpu-per-container` 和 Pod `busybox1` 都已经创建。
:::

* 执行如下命令，创建 `limit-mem-cpu-pod` 上面 yaml 中的 LimitRange，该 LimitRange 限定了每一个 Pod 的CPU使用不超过 2 核，内存不超过 2Gi。

  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/policy/lr-pod-limit-range.yaml -n limitrange-demo
  ```

  执行命令查看 `limit-mem-cpu-per-pod` 的创建结果：

  ``` sh
  kubectl describe limitrange/limit-mem-cpu-per-pod -n limitrange-demo
  ```

  输出结果如下所示

  ```
  Name:       limit-mem-cpu-per-pod
  Namespace:  limitrange-demo
  Type        Resource  Min  Max  Default Request  Default Limit  Max Limit/Request Ratio
  ----        --------  ---  ---  ---------------  -------------  -----------------------
  Pod         cpu       -    2    -                -              -
  Pod         memory    -    2Gi  -                -              -
  ```

* 创建第二个 Pod，yaml 文件如下：

  <<< @/.vuepress/public/statics/learning/policy/lr-pod-pod.yaml

  执行如下命令可创建该 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/policy/lr-pod-pod.yaml -n limitrange-demo
  ```

  Pod `busybox2` 的定义与 `busybox1` 的定义玩去哪相同，但是执行该创建命令时将碰到如下错误，因为Pod可使用的资源现在受到了限制：

  ```
  Error from server (Forbidden): error when creating "limit-range-pod-2.yaml": pods "busybox2" is forbidden: [maximum cpu usage per Pod is 2, but limit is 2400m., maximum memory usage per Pod is 2Gi, but limit is 2306867200.]
  ```
  执行命令查看 `busybox1` 的资源使用
  ``` sh
  kubectl get  po/busybox1  -n limitrange-demo -o json | jq ".spec.containers[].resources.limits.memory" 
  ```
  输出结果如下所示：
  ```
  "200Mi"
  "900Mi"
  "200Mi"
  "900Mi"
  ```
  Pod `busybox2` 将不能在集群中创建，因为其中所有容器的内存限制的总和超过了 LimitRange `limit-mem-cpu-per-pod` 中的限定。 `busybox1` 将不会被驱逐，因为该 Pod 在创建 LimitRange `limit-mem-cpu-per-pod` 就已经创建好了。

:tada: :tada: :tada:
