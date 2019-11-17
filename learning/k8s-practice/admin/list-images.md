---
vssueId: 156
layout: LearningLayout
lessAds: false
description: Kubernetes教程_本文描述了如何使用kubectl查看集群中的容器镜像
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,K8S 容器镜像,K8S培训,K8S教程
---

# 查看集群中的容器镜像

<AdSenseTitle>

> 参考文档： [List All Container Images Running in a Cluster](https://kubernetes.io/docs/tasks/access-application-cluster/list-all-running-container-images/)

本文描述了如何使用 kubectl 查看集群中的容器镜像。

[[TOC]]

</AdSenseTitle>

## 前提条件

* 您必须有一个K8S集群
  * 可参考 [安装Kubernetes单Master节点集群](/install/install-k8s.html)
  * kubectl 版本不低于 1.14，可参考 [安装kubectl](/install/install-kubectl.html)
* 在执行 kubectl 命令的机器上任意位置创建一个空白目录用于本例子的执行。本文假设后续所有命令的当前目录都是此时创建的这个目录。

## 查看所有名称空间总的容器

* 执行命令，获取所有名称空间中的所有 Pod
  ``` sh
  kubectl get pods --all-namespaces
  ```
* 使用 `-o jsonpath={..image}` 参数，输出结果将格式化为只包含容器镜像名字的形式。该参数将递归地查找 JSON 数据中所有 `image` 字段，例如：
  ``` sh
  kubectl get pods --all-namespaces -o jsonpath={..image}
  ```
  * 参考 [jsonpath reference](https://kubernetes.io/docs/user-guide/jsonpath/) 了解如何使用 jsonpath

* 使用工具 `tr`、`sort`、`uniq` 格式化输出结果
  * 使用 `tr` 将空格替换为新的行
  * 使用 `sort` 对结果排序
  * 使用 `uniq` 对镜像使用计数

  ```sh
  kubectl get pods --all-namespaces -o jsonpath="{..image}" |\
  tr -s '[[:space:]]' '\n' |\
  sort |\
  uniq -c
  ```
  此命令将递归返回所有 `image` 字段。

此外，也可以用 Pod 中 image 字段的绝对路径来查找容器的镜像名字，可以规避 image 字段重复出现的情况。

  ```sh
  kubectl get pods --all-namespaces -o jsonpath="{.items[*].spec.containers[*].image}"
  ```

Jsonpath 的解析如下：
* `.items[*]`：每一个返回值
* `.spec`： 获取 spec
* `.containers[*]`： 每一个 container
* `.image`：获取 image

::: tip 注意
如果通过名字查找 Pod，例如 `kubectl get pod nginx`，由于返回结果只有一个 Pod，此时，`.items[*]` 这一部分应该从 jsonpath 中移除。
:::

## 按Pod查找容器

输出结果可以通过 `rannge` 操作遍历

```sh
kubectl get pods --all-namespaces -o=jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' |\
sort
```

## 按Pod的label查找容器

使用 `-l` 参数，可以查找指定标签的 Pod，下面的例子中只查找带有 `app=nginx` 标签的 Pod：

```sh
kubectl get pods --all-namespaces -o=jsonpath="{..image}" -l app=nginx
```

## 按名称空间查找容器

使用 `--namespace` 参数，可以查找指定名称空间下的 Pod，下面的例子只查找 `kube-system` 名称空间中的 Pod：

``` sh
kubectl get pods --namespace kube-system -o jsonpath="{..image}"
```

## 使用go-template罗列容器

除了 jsonpath 之外，kubectl 支持使用 [go-template](https://golang.org/pkg/text/template/) 格式化输出结果：

```sh
kubectl get pods --all-namespaces -o go-template --template="{{range .items}}{{range .spec.containers}}{{.image}} {{end}}{{end}}"
```
