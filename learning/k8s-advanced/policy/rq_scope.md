---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此_本文探索了可以通过ResourceQuota限定名称空间资源配额时的作用域
meta:
  - name: keywords
    content: K8S 教程,Resource Quota,ResourceQuota
---

# 作用域

## 按Scope设定ResourceQuota

<AdSenseTitle >

> 参考文档：[Resource Quota](https://kubernetes.io/docs/concepts/policy/resource-quotas/)

当多个用户（团队）共享一个节点数量有限的集群时，如何在多个用户（团队）之间分配集群的资源就会变得非常重要。Resource quota 的用途便在于此。本文主要探索通过 ResourceQuota 限定名称空间资源配额时的作用域。

每个 ResourceQuota 对象都可以绑定一组作用域，当 Kubernetes 对象与此 ResourceQuota 的作用域匹配（在作用域中）时，ResourceQuota 的限定才对该对象生效。

</AdSenseTitle>



| Scope（作用域） | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| Terminating     | 包含所有 `.spec.activeDeadlineSeconds >= 0 ` 的 Pod          |
| NotTerminating  | 包含所有 `.spec.activeDeadlineSeconds is nil` 的Pod          |
| BestEffort      | 包含所有服务等级（quality of service）为 BestEffort 的 Pod   |
| NotBestEffort   | 包含所有服务等级（quality of service）为 NotBestEffort 的 Pod |

* 带有 `BestEffort` 作用域的 ResourceQuota 关注点为: `Pod`
* 带有 `Terminating`、` NotTerminating`、 `NotBestEffort` 的作用域关注点为：
  * `cpu`
  * `limits.cpu`
  * `limits.memory`
  * `memory`
  * `pods`
  * `requests.cpu`
  * `requests.memory`

## 按PriorityClass设定ResourceQuota

**FEATURE STATE** `Kubernetes 1.12` <Badge type="warning">beta</Badge>

创建 Pod 时，可以指定 [priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#pod-priority)。使用 ResourceQuota 的 `.spec.scopeSelector` 字段将 ResourceQuota 和 Pod 的 priority 关联，进而限定 Pod 的资源消耗。

<!--FIXME -->

只有当 ResourceQuota 的 `.spec.scopeSelector` 字段与 Pod 的 priorty 字段匹配时，ResourceQuota 才生效。

下面的例子创建了一个通过 priority 限定特定 Pod 的 ResourceQuota 对象，该例子的工作方式如下：
* 假设集群中的 Pod 可以被指定三种 priority class： `low`、`medium`、`high`
* 集群中为每个 Priority 都创建了一个 ResourceQuota 对象

定义 ResourceQuota 对象的文件如下所示：

<<< @/.vuepress/public/statics/learning/policy/rq-scope-quota.yaml

执行命令以创建 ResourceQuota：
``` sh
kubectl create -f https://kuboard.cn/statics/learning/policy/rq-scope-quota.yaml
```
输出结果如下所示
```
resourcequota/pods-high created
resourcequota/pods-medium created
resourcequota/pods-low created
```
执行如下命令验证 quota 的使用为 `0`：
```sh
kubectl describe quota
```
输出结果如下所示：
```
Name:       pods-high
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         0     1k
memory      0     200Gi
pods        0     10


Name:       pods-low
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         0     5
memory      0     10Gi
pods        0     10


Name:       pods-medium
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         0     10
memory      0     20Gi
pods        0     10
```
创建 “high” priority Pod，YAML 文件如下所示：

<<< @/.vuepress/public/statics/learning/policy/rq-scope-high-priority-pod.yaml

执行命令以创建
```sh
kubectl create -f https://kuboard.cn/statics/learning/policy/rq-scope-high-priority-pod.yaml
```

验证 "high" priority 对应的 ResourceQuota `pods-high` 的 `Used` 统计结果，可以发现 `pods-heigh` 的配额已经被使用，而其他两个的配额则没有被使用。

执行命令
``` sh
kubectl describe quota
```
输出结果如下所示：
```
Name:       pods-high
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         500m  1k
memory      10Gi  200Gi
pods        1     10


Name:       pods-low
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         0     5
memory      0     10Gi
pods        0     10


Name:       pods-medium
Namespace:  default
Resource    Used  Hard
--------    ----  ----
cpu         0     10
memory      0     20Gi
pods        0     10
```

`scopeSelector.matchExpressions.operator` 字段中，可以使用如下几种取值：
* In
* NotIn
* Exist
* DoesNotExist
