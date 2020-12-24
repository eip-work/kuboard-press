---
vssueId: 46
layout: LearningLayout
description: 本文描述了 Kubernetes DaemonSet 的概念、行为及用法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,DaemonSet
---

# 介绍 DaemonSet

> 参考文档： Kubernetes 文档 [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

<AdSenseTitle/>

DaemonSet 控制器确保所有（或一部分）的节点都运行了一个指定的 Pod 副本。
* 每当向集群中添加一个节点时，指定的 Pod 副本也将添加到该节点上
* 当节点从集群中移除时，Pod 也就被垃圾回收了
* 删除一个 DaemonSet 可以清理所有由其创建的 Pod

DaemonSet 的典型使用场景有：

* 在每个节点上运行集群的存储守护进程，例如 glusterd、ceph
* 在每个节点上运行日志收集守护进程，例如 fluentd、logstash
* 在每个节点上运行监控守护进程，例如 [Prometheus Node Exporter](https://github.com/prometheus/node_exporter)、[Sysdig Agent](https://sysdigdocs.atlassian.net/wiki/spaces/Platform)、collectd、[Dynatrace OneAgent](https://www.dynatrace.com/technologies/kubernetes-monitoring/)、[APPDynamics Agent](https://docs.appdynamics.com/display/CLOUD/Container+Visibility+with+Kubernetes)、[Datadog agent](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/)、[New Relic agent](https://docs.newrelic.com/docs/integrations/kubernetes-integration/installation/kubernetes-installation-configuration)、Ganglia gmond、[Instana Agent](https://www.instana.com/supported-integrations/kubernetes-monitoring/) 等
 
通常情况下，一个 DaemonSet 将覆盖所有的节点。复杂一点儿的用法，可能会为某一类守护进程设置多个 DaemonSets，每一个 DaemonSet 针对不同类硬件类型设定不同的内存、cpu请求。

本文从以下几方面介绍 DaemonSet：
* [创建 DaemonSet](./create.html)
* [DaemonSet 是如何调度的](./schedule.html)
* [与 DaemonSet 通信](./communicate.html)
* [更新 DaemonSet](./update.html)
* [DaemonSet 的替代选项](./alternative.html)
