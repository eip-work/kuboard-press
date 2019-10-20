---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此_本文探索了可以通过ResourceQuota限定的资源类型。
meta:
  - name: keywords
    content: Kubernetes
---

# 资源类型

<AdSenseTitle >

> 参考文档：[Resource Quota](https://kubernetes.io/docs/concepts/policy/resource-quotas/)

当多个用户（团队）共享一个节点数量有限的集群时，如何在多个用户（团队）之间分配集群的资源就会变得非常重要。Resource quota 的用途便在于此。本文主要探索通过 ResourceQuota 限定名称空间的计算资源配额、存储资源配额、对象数量配额。

[[TOC]]

</AdSenseTitle>

## 计算资源配额

通过 `ResourceQuota` 可以限定名称空间中可以使用的 [计算资源](/learning/k8s-intermediate/config/computing-resource.html) 的总量。支持的计算资源定义类型如下：

| 资源名称        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| limits.cpu      | 名称空间中，所有非终止状态（non-terminal）的 Pod 的 CPU限制`resources.limits.cpu`之和不能超过此值 |
| limits.memory   | 名称空间中，所有非终止状态（non-terminal）的 Pod 的内存限制`resources.limits.memory`之和不能超过此值 |
| requests.cpu    | 名称空间中，所有非终止状态（non-terminal）的 Pod 的 CPU请求`resources.requrest.cpu`之和不能超过此值 |
| requests.memory | 名称空间中，所有非终止状态（non-terminal）的 Pod 的 CPU请求 `resources.requests.memory`之和不能超过此值 |

<!--FIXME 扩展资源的配额 -->

## 存储资源配额

通过 `ResourceQuota` 可以：
* 限定名称空间中可以使用的 [存储资源](/learning/k8s-intermediate/persistent/pv.html) 的总量
* 限定名称空间中可以使用的某个 [存储类](/learning/k8s-intermediate/persistent/storage-class.html) 存储资源的总量



| 资源名称                                                     | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| requests.storage                                             | 名称空间中，所有存储卷声明（PersistentVolumeClaim）请求的存储总量不能超过此值 |
| persistentvolumeclaims                                       | 名称空间中，可以创建的 [存储卷声明（PersistentVolumeClaim）](/learning/k8s-intermediate/persistent/pv.html#存储卷和存储卷声明的关系)的总数不能超过此值 |
| \<storage-class-name\>.storageclass<br/>.storage.k8s.io/requests.storage | 名称空间中，所有与指定存储类（StorageClass）关联的存储卷声明（PersistentVolumeClaim）请求的存储总量不能超过此值 |
| \<storage-class-name\>.storageclass<br/>.storage.k8s.io/persistentvolumeclaims | 名称空间中，所有与指定存储类（StorageClass）关联的存储卷声明（PersistentVolumeClaim）的总数不能超过此值 |

例如，假设管理员想要对存储类 `gold` 和存储类 `bronze` 做不同的配额限定，那么，可以按如下方式定义 `ResourceQuota`：
* `gold.storageclass.storage.k8s.io/requests.storage: 500Gi`
* `bronze.storageclass.storage.k8s.io/requests.storage: 100Gi`

在 Kubernetes v1.8 中，引入了本地短时存储（local ephemeral storage）的资源配额设置 <Badge type="error">Alpha</Badge>

| 资源名称                   | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| requests.ephemeral-storage | 名称空间中，所有 Pod 的本地短时存储（local ephemeral storage）请求的总和不能超过此值 |
| limits.ephemeral-storage   | 名称空间中，所有 Pod 的本地短时存储（local ephemeral storage）限定的总和不能超过此值 |


## 对象数量配额

从 Kubernetes v1.9 开始，支持使用如下格式的限定名称空间中标准类型对象的总数量：
* `count/<resource>.<group>`

下面是一些例子：

* `count/persistentvolumeclaims`
* `count/services`
* `count/secrets`
* `count/configmaps`
* `count/replicationcontrollers`
* `count/deployments.apps`
* `count/replicasets.apps`
* `count/statefulsets.apps`
* `count/jobs.batch`
* `count/cronjobs.batch`
* `count/deployments.extensions`

Kubernetes v1.15 开始，支持使用相同的格式限定名称空间中自定义资源（CustomResource）对象的总量。例如，为 `example.com` API group 中的自定义资源（CustomResource） `widgets` 限定对象数量总数的配额，可以使用 `count/widgets.example.com`。

当使用 `count/*` 的方式限定对象总数的配额时，只要对象存储在 apiserver 中，无论其状态如何，该对象就被计数。 此类配额限定可以保护 apiserver 的存储空间不被过度消耗。例如，
* 您可能需要限定名称空间中 [Secret](/learning/k8s-intermediate/config/secrets/) 的总数，因为他们通常占用的存储空间比较大。集群中如果存在大量的 Secret 对象，可能会导致 apiserver 或者控制器（Controller）启动失败
* 您可能也需要限定名称空间中 [Job](/learning/k8s-intermediate/workload/wl-job/) 对象的个数，以避免某个配置错误的 [cronjob](/learning/k8s-intermediate/workload/wl-cronjob/) 创建了太多的 Job，造成了拒绝服务（denial of service）的情况

<!--FIXME Prior to the 1.9 release, it was possible to do generic object count quota on a limited set of resources. In addition, it is possible to further constrain quota for particular resources by their type. -->
