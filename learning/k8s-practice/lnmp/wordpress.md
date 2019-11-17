---
vssueId: 156
layout: LearningLayout
lessAds: false
description: Kubernetes教程_本文描述了如何在K8S上部署一个WordPress和MySQL应用_并将数据存储在PersistentVolume中
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S PHP,K8S培训,K8S教程
---

# 在K8S上部署WordPress和MySQL

<AdSenseTitle>

> 参考文档： [Example: Deploying WordPress and MySQL with Persistent Volumes](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/)

本文描述了如何在K8S上部署一个WordPress和MySQL应用，本文中WordPress和MySQL都使用 PersistentVolume 和 PersistentVolumeClaim 存储数据。

[PersistentVolume](/learning/k8s-intermediate/persistent/pv.html) 是集群中可用的一片存储空间，通常由集群管理员手工提供，或者由 Kubernetes 使用 [StorageClass](/learning/k8s-intermediate/persistent/storage-class.html) 自动提供。

[PersistentVolumeClaim](/learning/k8s-intermediate/persistent/pv.html#存储卷和存储卷声明的关系) 代表了用户（应用程序）对存储空间的需求，此需求可由 PersistentVolume 满足。

PersistentVolume 和 PersistentVolumeClaim 都是独立于 Pod 的生命周期，可用于在 Pod 重启、重新调度、甚至删除之后保存数据。

::: danger 警告
本文中的例子不适合用于生产环境使用，因为例子中使用了一个 WordPress 实例和一个 MySQL 实例。可以考虑使用 [WordPress Helm Chart](https://github.com/kubernetes/charts/tree/master/stable/wordpress) 在生产环境中部署 WordPress。
:::

[[TOC]]

</AdSenseTitle>

## 主要步骤

* 创建 PersistentVolumeClaim 和 PersistentVolume
* 创建一个 `kustomization.yaml`，其中包括：
  * 一个 Secret generator
  * MySQL配置资源
  * WordPress配置资源
* 执行 `kubectl apply -k ./` 将 kustomization 目录应用到集群
* 执行清理

## 前提条件

* 您必须有一个K8S集群
  * 可参考 [安装Kubernetes单Master节点集群](/install/install-k8s.html)
  * kubectl 版本不低于 1.14，可参考 [安装kubectl](/install/install-kubectl.html)
* 在执行 kubectl 命令的机器上任意位置创建一个空白目录用于本例子的执行。本文假设后续所有命令的当前目录都是此时创建的这个目录。

## 创建PersistentVolumeClaim和PersistentVolume

MySQL 和 WordPress 都需要一个 PersistentVolume 存储数据。他们的 PersistentVolumeClaim 将被在部署应用时创建。

## 创建kustomization.yaml

### 添加一个Secret generator

[Secret](/learning/k8s-intermediate/config/secrets/) 对象可以存储敏感信息，例如 password 或者 key。自 Kubernetes 1.14 开始，`kubectl` 支持使用 kustomization 文件管理对象。可以在 `kustomization.yaml` 文件中定义一个 generator 以创建 Secret 对象。

执行下面的命令，创建 `kustomization.yaml` 文件，该文件中包含一个 Secret generator。
> 您需要将 `YOUR_PASSWORD` 替换成您自己想要使用的密码

``` sh
cat <<EOF >./kustomization.yaml
secretGenerator:
- name: mysql-pass
  literals:
  - password=YOUR_PASSWORD
EOF
```


## 为MySQL和WordPress添加配置信息

## 应用和验证

## 清理
