---
vssueId: 135
layout: LearningLayout
description: Kubernetes教程_Kubernetes_REST_API中_所有的对象都是通过_name_和_UID_唯一性确定
meta:
  - name: keywords
    content: Kubernetes 对象,管理Kubernetes对象,Kubernetes Object
---

# 名称

<AdSenseTitle>

Kubernetes REST API 中，所有的对象都是通过 `name` 和 `UID` 唯一性确定。查看文档 [identifiers design doc](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/identifiers.md) 可了解更多关于 `name` 和 `UID` 的规则。

* [Names](#Names)
* [UIDs](#UIDs)

</AdSenseTitle>

## Names

可以通过 `namespace` + `name` 唯一性地确定一个 RESTFUL 对象，例如：

`/api/v1/namespaces/{namespace}/pods/{name}`

参考 [名称空间](./namespaces.html)

同一个名称空间下，同一个类型的对象，可以通过 `name` 唯一性确定。如果删除该对象之后，可以再重新创建一个同名对象。

下面是三种广泛使用的资源名称的限制类型：

### DNS Subdomain Names

绝大部分资源类型的名称必须符合 DNS subdomain 命名规则 [RFC 1123](https://tools.ietf.org/html/rfc1123)，具体如下：
* 最长不超过 253个字符
* 必须由小写字母、数字、减号 `-`、小数点 `.` 组成
* 由字母开始
* 由字母结束

### DNS Label Names

部分类型的资源要求其名称符合 DNS Label 的命名规则 [RFC 1123](https://tools.ietf.org/html/rfc1123)，具体如下：

* 最长不超过 63个字符
* 必须由小写字母、数字、减号 `-`、小数点 `.` 组成
* 由字母开始
* 由字母结束

### Path Segment Names

部分类型的资源要求其名称可以被编码到路径中。换句话说，名称中不能包含 `.`、`..`、`/`、`%`。

例如，下面的配置文件定义了一个 name 为 `nginx-demo` 的 Pod，该 Pod 包含一个 name 为 `nginx` 的容器：

``` yaml {4,7}
apiVersion: v1
kind: Pod
metadata:
  name: nginx-demo
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

::: tip
还有一部分资源类型，其名称有更多的限制要求
:::

## UIDs

UID 是由 Kubernetes 系统生成的，唯一标识某个 Kubernetes 对象的字符串。

Kubernetes集群中，每创建一个对象，都有一个唯一的 UID。用于区分多次创建的同名对象（如前所述，按照名字删除对象后，重新再创建同名对象时，两次创建的对象 name 相同，但是 UID 不同。）

Kubernetes 中的 UID 是全局唯一的标识符（UUIDs，符合规范 ISO/IEC 9834-8 以及 ITU-T X.667）
