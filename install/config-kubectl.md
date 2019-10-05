---
vssueId: 115
description: Kubernete安装文档_kubectl命令行工具从一个配置文件中查找用于调用APIServer接口的信息_可以在一个或多个文件中配置多个集群的访问信息_并在kubectl中切换不同的集群访问
meta:
  - name: keywords
    content: kubectl,kubectl配置,kubectl访问多个集群
---

# 配置Kubectl

> 参考文档： Kubernetes官网文档 [Organizing Cluster Access Using kubeconfig Files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)、[Configure Access to Multiple Clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

`kubectl` 命令行工具从配置文件kubeconfig中查找用于调用 API Server 接口的信息：
* 集群 cluster
* 用户 user
* 名称空间 namespace
* 认证机制 authentication mechanism

> kubeconfig 并不是一个文件的名字，而是 kubectl 配置文件的统称

默认情况下，`kubectl` 读取 `$HOME/.kube/config` 作为配置文件。您可以通过两种方式为 `kubectl` 指定配置文件：
* 环境变量 `KUBECONFIG`
* 命令行参数 `--kubeconfig`

可以在一个或多个kubeconfig文件中配置多个集群的访问信息，并使用 `kubectl config use-context` 命令切换要访问哪个集群。本文描述了如何配置 kubectl 以访问多个集群。

::: tip
kubectl的版本号必须大于等于集群的版本号，执行命令 `kubectl version` 可查看 kubectl 版本
:::

## 创建配置文件

## 创建第二个配置文件

## 设置KUBECONFIG环境变量
