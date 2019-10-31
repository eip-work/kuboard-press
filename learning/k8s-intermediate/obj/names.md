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

依据命名规则，Kubernetes对象的名字应该：
* 最长不超过 253个字符
* 必须由小写字母、数字、减号 `-`、小数点 `.` 组成
* 某些资源类型有更具体的要求

例如，下面的配置文件定义了一个 name 为 `nginx-demo` 的 Pod，该 Pod 包含一个 name 为 `nginx` 的容器：

``` yaml {4,7}
apiVersion: v1
kind: Pod
metadata:
  name: nginx-demo
spec:
  containers:
  - name: nginx
    image: nginx:1.7.9
    ports:
    - containerPort: 80
```

## UIDs

UID 是由 Kubernetes 系统生成的，唯一标识某个 Kubernetes 对象的字符串。

Kubernetes集群中，每创建一个对象，都有一个唯一的 UID。用于区分多次创建的同名对象（如前所述，按照名字删除对象后，重新再创建同名对象时，两次创建的对象 name 相同，但是 UID 不同。）
