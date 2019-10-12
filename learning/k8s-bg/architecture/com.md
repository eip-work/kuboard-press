---
vssueId: 120
layout: LearningLayout
description: Kubernete教程_Kubernetes组件_本文描述了Kubernetes集群和Master节点（实际上是 apiserver）之间的通信路径。用户在自定义集群的安装之前，或者调整集群的网络配置之前必须理解这部分内容
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Master-Node通信
---

# Master-Node之间的通信

<AdSenseTitle/>

本文描述了Kubernetes集群和Master节点（实际上是 apiserver）之间的通信路径。用户在自定义集群的安装之前，或者调整集群的网络配置之前必须理解这部分内容。例如：
* 从 [安装Kubernetes单Master节点](/install/install-k8s.html) 的安装结果调整到 [安装Kubernetes高可用](/install/install-kubernetes.html) 的安装结果
* 将公网 IP 地址上的机器作为节点加入到 Kubernetes 集群

Master-Node 之间的通信可以分为如下两类：
* [Cluster to Master](./com-n-m.html)
* [Master to Cluster](./com-m-n.html)
