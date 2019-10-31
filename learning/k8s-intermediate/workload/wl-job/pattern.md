---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述Job相关的设计模式
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job的模式

<AdSenseTitle>

</AdSenseTitle>

Kubernetes Job 对象可以用来支持 Pod 的并发执行，但是：
* Job 对象并非设计为支持需要紧密相互通信的Pod的并发执行，例如科学计算
* Job 对象不支持并发处理一系列相互独立但是又相互关联的工作任务，例如：
  * 发送邮件
  * 渲染页面
  * 转码文件
  * 扫描 NoSQL 数据库中的主键
  * 其他

在一个复杂的系统中，可能存在多种类型的工作任务，本文只考虑批处理任务（batch job）。

对于批处理任务的并行计算，存在着几种模式，它们各自有自己的优缺点：
* 每个工作任务一个 Job 对象 v.s. 一个 Job 对象负责所有的工作任务
  * 当工作任务特别多时，第二种选择（一个 Job 对象负责所有的工作任务）更合适一些
  * 第一种选择（每个工作任务一个 Job 对象）将为管理员和系统带来很大的额外开销，因为要管理很多数量的 Job 对象
* Pod的数量与工作任务的数量相等 v.s. 每个Pod可以处理多个工作任务
  * 第一种选择（Pod的数量与工作任务的数量相等）通常只需要对现有的代码或容器做少量的修改
  * 第二种选择（每个Pod可以处理多个工作任务）更适合工作任务的数量特别多的情况，相较于第一种选择可以降低系统开销
* 使用工作队列，此时：
  * 需要运行一个队列服务
  * 需要对已有的程序或者容器做修改，以便其可以配合队列工作
  * 如果是一个已有的程序，改造时可能存在难度

他们的优缺点归纳如下表所示，其中第二列到第四列罗列了主要考虑的对比因素：

| 模式                                                         | 单个Job对象 | Pod的数量少于工作任务？ | 是否修改已有代码？ | 是否可兼容kube1.1 |
| ------------------------------------------------------------ | ----------- | ----------------------- | ------------------ | ----------------- |
| [Job Template Expansion](https://kubernetes.io/docs/tasks/job/parallel-processing-expansion/) |             |                         | ✓                  | ✓                 |
| [Queue with Pod Per Work Item](https://kubernetes.io/docs/tasks/job/coarse-parallel-processing-work-queue/) | ✓           |                         | 有时候             | ✓                 |
| [Queue with Variable Pod Count](https://kubernetes.io/docs/tasks/job/fine-parallel-processing-work-queue/) | ✓           | ✓                       |                    | ✓                 |
| Single Job with Static Work Assignment                       | ✓           |                         | ✓                  |                   |

当您指定 `.spec.completions` 时，Job 控制器创建的每个 Pod 都有一个相同的 [spec]()。这意味着，同一个 Job 创建的所有的 Pod 都使用：
* 相同的执行命令
* 相同的容器镜像
* 相同的数据卷
* 相同的环境变量（例如，不同时间点创建的Pod，[Service的环境变量](/learning/k8s-intermediate/service/service-details.html#环境变量) 可能会不同）

Job 的不同模式本质上讲，如何为一组工作任务分配 Pod。下表总结了不同的模式下 `.spec.parallelism` 和 `.spec.completions` 字段的设置。（表中 `w` 代表工作任务的数量）

| 模式                                                         | `.spec.completions` | `.spec.parallelism` |
| ------------------------------------------------------------ | ------------------- | ------------------- |
| [Job Template Expansion](https://kubernetes.io/docs/tasks/job/parallel-processing-expansion/) | 1                   | should be 1         |
| [Queue with Pod Per Work Item](https://kubernetes.io/docs/tasks/job/coarse-parallel-processing-work-queue/) | W                   | any                 |
| [Queue with Variable Pod Count](https://kubernetes.io/docs/tasks/job/fine-parallel-processing-work-queue/) | 1                   | Any                 |
| Single Job with Static Work Assignment                       | W                   | any                 |
