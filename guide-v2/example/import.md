---
vssueId: 76
description: 通过Kuboard将一个预先定义好的SpringCloud微服务样例程序导入到Kubernetes中。
---

# 导入 example 微服务

<AdSenseTitle/>

## 前提

必须具备如下条件：

* Kubernetes 集群，版本不低于 v1.13.0
  * 如果您还没有 Kubernetes 集群，请参考 [安装Kubernetes单Master节点集群](/install/install-k8s.html)
* Kuboard 微服务管理界面，版本不低于 v2.0.0-beta.3
  * 请参考 [安装 Kuboard](/install/install-dashboard.html)


## 创建名称空间

创建新的名称空间，用来导入 example。

假设您已经进入了 Kuboard 名称空间界面，如下图所示：


## 导入 example

* 下载 <a :href="$withBase('/kuboard_example_v2.yaml')" download="kuboard_example.yaml">kuboard_example.yaml</a> 文件
