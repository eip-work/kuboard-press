---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述Job相关的设计模式
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job设计模式

<AdSenseTitle>

</AdSenseTitle>

Kubernetes Job 对象可以用来支持 Pod 的并发执行，但是：
* Job 对象并非设计为支持需要紧密相互通信的Pod的并发执行，例如科学计算
* Job 对象不支持并发处理一系列相互独立但是又相互关联的工作任务，例如：
  * 发送邮件
  * 渲染页面
  * 转码文件
  * 扫描 NoSQL 数据库中的主键
  * 等
