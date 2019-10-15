---
# vssueId: 138
layout: LearningLayout
description: Kubernetes教程_字段选择器Field_Selector可以用来基于的一个或多个字段的取值来选取一组Kubernetes对象_下面有一些示例性的字段选择器
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Field Selector, K8S教程, K8S 教程
---

# 字段选择器

<AdSenseTitle>


[[TOC]]

</AdSenseTitle>

## 概述

字段选择器（Field Selector）可以用来基于的一个或多个字段的取值来选取一组Kubernetes对象。下面有一些示例性的字段选择器：

* `metadata.name=my-service`
* `metadata.namespace!=default`
* `status.phase=Pending`

下面的 `kubectl` 命令选择了所有字段 `status.phase` 的取值为 `Running` 的 Pod：

``` sh
kubectl get pods --field-selector status.phase=Running
```

::: tip
字段选择器本质上是一个 `filter`。默认情况下，没有添加 selector/filter 时，代表着指定资源类型的所有对象都被选中。下面个两个 kubectl 查询时等价的：

``` sh
kubectl get pods
kubectl get pods --field-selector ""
```
:::

## 支持的字段

不同的 Kubernetes 对象类型，可以用来查询的字段不一样。所有的对象类型都支持的两个字段是 `metadata.name` 和 `metadata.namespace`。在字段选择器中使用不支持的字段，将报错。例如：

``` sh
kubectl get ingress --field-selector foo.bar=baz
```

输出结果为：

```
Error from server (BadRequest): Unable to find "ingresses" that match label selector "", field selector "foo.bar=baz": "foo.bar" is not a known field selector: only "metadata.name", "metadata.namespace"
```

## 支持的操作符

字段选择器中可以使用的操作符有 `=`、`==`、`!=` （`=` 和 `==` 含义相同）。例如，下面的 `kubectl` 命令，查询不在 `default` 名称空间中的 Service：

``` sh
kubectl get services  --all-namespaces --field-selector metadata.namespace!=default
```

## 多选择器

可以指定多个字段选择器，用逗号 `,` 分隔。下面的 `kubectl` 命令查询所有的 `status.phase` 不等于 `Running` 且 `spec.restartPolicy` 等于 `Always` 的 Pod：

``` sh
kubectl get pods --field-selector=status.phase!=Running,spec.restartPolicy=Always
```

## 多种对象类型

字段选择器可以跨资源类型使用。下面的 `kubectl` 命令查询所有的不在 `default` 名称空间的 StatefulSet 和 Service：
``` sh
kubectl get statefulsets,services --all-namespaces --field-selector metadata.namespace!=default
```
