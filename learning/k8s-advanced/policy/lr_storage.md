---
vssueId: 143
layout: LearningLayout
description: Kubernetes教程_本文讨论了如何使用LimitRange_名称空间中限制存储资源的使用_通过LimitRange对象_集群管理员可以限定名称空间中每个PersistentVolumeClaim存储卷声明可以使用的最小最大存储空间
meta:
  - name: keywords
    content: Kubernetes教程, LimitRange, Kubernetes Limit Range
---

# 限定存储资源


<AdSenseTitle>

> 参考文档：[Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)

本文讨论了如何使用LimitRange_名称空间中限制存储资源的使用。通过 LimitRange 对象，集群管理员可以限定名称空间中每个 PersistentVolumeClaim（存储卷声明）可以使用的最小、最大存储空间。

</AdSenseTitle>

请参考下面的例子：

<<< @/.vuepress/public/statics/learning/policy/lr-storage-limit.yaml {9,11}

* 执行命令可创建该 LimitRange：

  ``` sh
  kubectl create -f https://kuboard.cn/statics/learning/policy/lr-storage-limit.yaml -n limitrange-demo
  ```
  执行命令查看创建结果
  ``` sh
  kubectl describe limits/storagelimits -n limitrange-demo
  ```
  输出结果如下所示：
  ```
  Name:                  storagelimits
  Namespace:             limitrange-demo
  Type                   Resource  Min  Max  Default Request  Default Limit  Max Limit/Request Ratio
  ----                   --------  ---  ---  ---------------  -------------  -----------------------
  PersistentVolumeClaim  storage   1Gi  2Gi  -                -              -
  ```
* 现在假设有一个 PVC（存储卷声明），定义文件如下所示：
  
  <<< @/.vuepress/public/statics/learning/policy/lr-storage-pvc-lower.yaml {10}
  执行命令创建该 PVC（存储卷声明）
  ``` sh
  kubectl create -f https://kuboard.cn/statics/learning/policy/lr-storage-pvc-lower.yaml -n limitrange-demo
  ```
  由于 PVC 中定义的字段 `requests.storage` 比 LimitRange `storagelimits` 中 `limits[0].min.storage` 的定义要小，所以创建该 PVC 时将失败：
  ```
  Error from server (Forbidden): error when creating "lr-storage-pvc-lower.yaml": persistentvolumeclaims "pvc-limit-lower" is forbidden: minimum storage usage per PersistentVolumeClaim is 1Gi, but request is 500Mi.
  ```
* 如果 PVC 的 `requests.storage` 大于 LimitRange 中的 `limits[0].max.storage`，同样不能创建成功，参考下面的例子：
  
  <<< @/.vuepress/public/statics/learning/policy/lr-storage-pvc-greater.yaml {10}

  执行命令创建该 PVC（存储卷声明）
  ``` sh
  kubectl create -f https://kuboard.cn/statics/learning/policy/lr-storage-pvc-greater.yaml
  ```
  输出结果如下所示：
  ```
  Error from server (Forbidden): error when creating "lr-storage-pvc-greater.yaml": persistentvolumeclaims "pvc-limit-greater" is forbidden: maximum storage usage per PersistentVolumeClaim is 2Gi, but request is 5Gi.
  ```

:tada: :tada: :tada:
