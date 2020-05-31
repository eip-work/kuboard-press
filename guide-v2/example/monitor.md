---
vssueId: 77
description: 使用Kuboard在Kubernetes上安装监控套件，并对example微服务实现资源层监控、中间件层监控、链路追踪和APM监控
---

# 监控 example

<AdSenseTitle/>

## 前提

必须具备如下条件：

* 已完成 [导入 example 微服务](/guide/example/import.html)
* 已配置了 NFS [StorageClass](/learning/k8s-intermediate/persistent/storage-class.html)
* 使用 kuboard-user 这个 ServiceAccount 登录 Kuboard 界面，[kuboard-user](/install/install-dashboard.html#)
