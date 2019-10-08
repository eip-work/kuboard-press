---
vssueId: 125
layout: LearningLayout
description: Kubernetes教程_当集群中出现任何问题时，应用程序日志和系统日志是非常有效的定位问题的手段，可以让我们知道集群中正在发生的事情。绝大多数的应用程序都有日志机制，主流的容器引擎也都支持某种形式的日志。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,日志,Logging
---

# 日志架构

> 参考文档： [Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)

当集群中出现任何问题时，应用程序日志和系统日志是非常有效的定位问题的手段，可以让我们知道集群中正在发生的事情。绝大多数的应用程序都有日志机制，主流的容器引擎也都支持某种形式的日志。对容器化应用程序来说，最简单也是被采纳得最多的一种日志方式是，将日志写入到标准输出流（例如，Java中的 `System.out.println` 语句，或 log4j 中的 Console Appender）和标准错误流里（例如，Java中的 `System.error.println` 语句）

然而，容器引擎默认提供的功能通常不足以支撑一个完整的日志解决方案。例如：如果一个容器崩溃了、一个Pod被驱逐了、或者一个节点停机了，您通常仍然需要访问您应用程序的日志。为此，您需要一个生命周期与节点、Pod、容器相对独立的存储空间来存储应用程序日志和系统日志。此时，我们引入了一个新的概念：`集群级别的日志 cluster-level-logging`。集群级别的日志需要一个独立的后端，用于存储、分析、查询日志。Kubernetes默认不提供存储日志信息的方案，但是，有很多种现有的日志存储方案可以集成到 Kubernetes 集群中来。

请参考关于日志架构更详细的描述：

* [基本的日志](./basic.html)
* [节点级别的日志](./node.html)
* [集群级别的日志](./cluster.html)
