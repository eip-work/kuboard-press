---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此
meta:
  - name: keywords
    content: Kubernetes 教程,Resource Quota,ResourceQuota
---

# 概述

<AdSenseTitle >

> 参考文档：[Resource Quota](https://kubernetes.io/docs/concepts/policy/resource-quotas/)

当多个用户（团队）共享一个节点数量有限的集群时，如何在多个用户（团队）之间分配集群的资源就会变得非常重要。Resource quota 的用途便在于此。

</AdSenseTitle>

## 资源配额

资源配额（Resource quota）通过 `ResourceQuota` 对象定义，可以限定单个名称空间中可使用的计算资源的总量。限定的方式有：
* 按对象类型限定名称空间中可创建的对象的总数
* 按对象类型限定名称空间中可消耗的计算资源

资源配额（Resource quota）的工作方式描述如下：

* 不同的用户（团队）使用不同的名称空间。如果通过 ACL（权限控制），可以强制用户只能访问特定的名称空间
* 集群管理员为每个名称空间创建一个 `ResourceQuota` 对象
* 用户在名称空间中创建对象（Pod、Service等），ResourceQuota 系统跟踪对象的资源使用情况，并确保不会超过 `ResourceQuota` 对象中定义的配额
* 如果创建或更新对象时与 `ResourceQuota` 冲突，则 apiserver 会返回 HTTP 状态码 403，以及对应的错误提示信息
* 如果在名称空间中为计算资源 `CPU` 和 `内存` 激活 `ResourceQuota`，用户在创建对象（Pod、Service等）时，必须指定 requests 和 limits。
  > 使用 [LimitRange](./lr.html) 可以为没有定义 requests、limits 的对象强制添加默认值

下面是一些使用 `ResourceQuota` 的场景描述：
* 在一个总容量为 32GiB 内存、16核CPU 的集群里，允许 teamA 使用 20GiB内存、10核CPU，允许 teamB 使用 10GiB 内存、4核CPU，保留 2GiB 内存和 2核CPU 待将来分配
* 限定 “Testing” 名称空间使用 1核CPU、1GiB内存，允许 “Production” 名称空间使用任意数量的计算资源

当集群中总的容量小于名称空间资源配额的总和时，可能会发生资源争夺。此时 Kubernetes 集群将按照先到先得的方式分配资源。

无论是资源争夺还是修改名称空间的资源配额（ResourceQuota），都不会影响到已经创建的对象。

## 启用ResourceQuota

Kubernetes集群中默认启用 ResourceQuota。如果没有，可在启动 apiserver 时为参数 `--enable-admission-plugins` 添加 `ResourceQuota` 配置项。

在名称空间中定义一个 `ResourceQuota` 对象，就可以激活该名称空间的资源配额检查。
