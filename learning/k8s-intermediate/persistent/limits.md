---
# vssueId: 59
layout: LearningLayout
description: Kubernetes教程_本文介绍Kubernetes中Volume（数据卷）的基本概念_用法以及支持的数据卷类型
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,Kubernetes数据卷
---

# 节点相关的数据卷限制

<AdSenseTitle>

> 参考文档： [Node-specific Volume Limits](https://kubernetes.io/docs/concepts/storage/storage-limits/)

本文描述了在不同的云供应商环境下，单个节点可以挂载的数据卷的最大数量。

类似于 Google、Amazon、Microsoft 这样的云供应商，通常都会限定单个节点可挂载的数据卷的最大数量。Kubernetes 必须遵守这些限定，否则，当 Pod 调度上某节点上时，可能会因为不能实现数据卷挂载而启动不了。

[[TOC]]

</AdSenseTitle>

## Kubernetes默认限制

Kubernetes调度器默认限制了单个节点可以挂载的数据卷的最大数量：

| 云供应商                                                     | 节点最大数据卷数量 |
| ------------------------------------------------------------ | ------------------ |
| [Amazon Elastic Block Store (EBS)](https://aws.amazon.com/ebs/) | 39                 |
| [Google Persistent Disk](https://cloud.google.com/persistent-disk/) | 16                 |
| [Microsoft Azure Disk Storage](https://azure.microsoft.com/en-us/services/storage/main-disks/) | 16                 |



## 自定义限制

修改此限制值的步骤如下：
* 设置环境变量 `KUBE_MAX_PD_VOLS` 的取值
* 重启调度器 kube-scheduler

建议不要将此数值设置得比默认值更大。在修改之前，请认真查询云供应商的相关文档，确保您的节点机器可以支持您设置的限制取值。

该限定对整个集群生效，因此，将影响到集群中的所有节点。

## Dynamic volume限制

**FEATURE STATE：** `Kubernetes v1.12` <Badge type="warning">beta</Badge>

Kubernetes v1.11 开始支持按节点限制动态数据卷的数量（Dynamic volume limits），在Kubernetes v1.12 中，该特性进入 beta 阶段，并默认启用。

动态数据卷数量限定（Dynamic volume limits）支持如下类型的数据卷：
* Amazon EBS
* Google Persistent Disk
* Azure Disk
* CSI

当动态数据卷数量限定（Dynamic volume limits）特性激活时，Kubernetes 自动根据节点的类型为其设置合适的可挂载数据卷的最大数量。例如：
- 在 [Google Compute Engine](https://cloud.google.com/compute/) 上，[根据节点类型](https://cloud.google.com/compute/docs/disks/#pdnumberlimits)，一个节点最多可以挂载 128 个数据卷
- 针对 Amazon 部分实例类型（M5、C5、R5、T3、Z1D）上的 EBS 磁盘，Kubernetes 只允许为每个节点最多挂载 25 个数据卷。针对其他类型的节点 [Amazon Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/), Kubernetes 允许为每个节点最多挂载 39 个数据卷
- 在微软 Azure 上，根据节点类型不同，单个节点最多可以挂载 64 个磁盘。更多细节请参考[Sizes for virtual machines in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes)
- 针对 CSI，任何通过 CSI 规范定义数据卷挂载数量限制的驱动程序，都会将该数量限定作为节点的一个可收集的参数；Kubernetes 调度器可以读取此节点参数，且当节点已经达到最大可挂载数据卷数量时，不会再向该节点调度 Pod。更多细节请参考 [CSI specs](https://github.com/container-storage-interface/spec/blob/master/spec.md#nodegetinfo)
