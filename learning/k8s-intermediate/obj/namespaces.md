---
vssueId: 136
layout: LearningLayout
description: Kubernetes教程_Kubernetes通过名称空间（namespace）在同一个物理集群上支持多个虚拟集群。
meta:
  - name: keywords
    content: Kubernetes Ingress,Ingress
---

# 名称空间

<AdSenseTitle>

> 参考文档：

Kubernetes通过名称空间（namespace）在同一个物理集群上支持多个虚拟集群。

* [何时使用名称空间](#何时使用名称空间)
* [如何使用名称空间](#如何使用名称空间)
* [名称空间与DNS](#名称空间与DNS)
* [并非所有对象都在名称空间里](#并非所有对象都在名称空间里)


</AdSenseTitle>

## 何时使用名称空间

名称空间的用途是，为不同团队的用户（或项目）提供虚拟的集群空间，也可以用来区分开发环境/测试环境、准上线环境/生产环境。

名称空间为 [名称](./names.html) 提供了作用域。名称空间内部的同类型对象不能重名，但是跨名称空间可以有同名同类型对象。名称空间不可以嵌套，任何一个Kubernetes对象只能在一个名称空间中。

名称空间可以用来在不同的团队（用户）之间划分集群的资源，参考 [resource quota](/learning/k8s-advanced/policy/rq.html)

在 Kubernetes 将来的版本中，同名称空间下的对象将默认使用相同的访问控制策略。

当KUbernetes对象之间的差异不大时，无需使用名称空间来区分，例如，同一个软件的不同版本，只需要使用 [labels](./labels.html) 来区分即可。

## 如何使用名称空间

参考 [管理名称空间](./namespace-op.html) 了解如何创建和删除名称空间。

### 查看名称空间

执行命令 `kubectl get namespaces` 可以查看名称空间，输出结果如下所示：

``` 
NAME          STATUS    AGE
default       Active    1d
kube-system   Active    1d
kube-public   Active    1d
```

::: tip
Kuboard 中，登录以后，集群概览页的上方就是名称空间，请参考 [名称空间管理](/guide/cluster/namespace.html)
:::

Kubernetes 安装成功后，默认有初始化了三个名称空间：
* **default** 默认名称空间，如果 Kubernetes 对象中不定义 `metadata.namespace` 字段，该对象将放在此名称空间下
* **kube-system** Kubernetes系统创建的对象放在此名称空间下
* **kube-public** 此名称空间自动在安装集群是自动创建，并且所有用户都是可以读取的（即使是那些未登录的用户）。主要是为集群预留的，例如，某些情况下，某些Kubernetes对象应该被所有集群用户看到。

### 在执行请求时设定namespace

执行 kubectl 命令时，可以使用 `--namespace` 参数指定名称空间，例如：

``` sh
kubectl run nginx --image=nginx --namespace=<您的名称空间>
kubectl get pods --namespace=<您的名称空间>
```

### 设置名称空间偏好

可以通过 `set-context` 命令改变当前 [kubectl 上下文](/install/config-kubectl.html#切换当前访问的集群) 的名称空间，后续所有命令都默认在此名称空间下执行。

``` sh
kubectl config set-context --current --namespace=<您的名称空间>
# 验证结果
kubectl config view --minify | grep namespace:
```

## 名称空间与DNS

当您创建一个 Service 时，Kubernetes 为其创建一个对应的 [DNS 条目](/learning/k8s-intermediate/service/dns.html)。该 DNS 记录的格式为 `<service-name>.<namespace-name>.svc.cluster.local`，也就是说，如果在容器中只使用 `<service-name>`，其DNS将解析到同名称空间下的 Service。这个特点在多环境的情况下非常有用，例如将开发环境、测试换寂静、生产环境部署在不同的名称空间下，应用程序只需要使用 `<service-name>` 即可进行服务发现，无需为不同的环境修改配置。如果您想跨名称空间访问服务，则必须使用完整的域名（fully qualified domain name，FQDN）。

## 并非所有对象都在名称空间里

大部分的 Kubernetes 对象（例如，Pod、Service、Deployment、StatefulSet等）都必须在名称空间里。但是某些更低层级的对象，是不在任何名称空间中的，例如 [nodes](/learning/k8s-bg/architecture/nodes.html)、[persistentVolumes](/learning/k8s-intermediate/persistent/pv.html)、[storageClass](/learning/k8s-intermediate/persistent/storage-class.html) 等

执行一下命令可查看哪些 Kubernetes 对象在名称空间里，哪些不在：

``` sh
# 在名称空间里
kubectl api-resources --namespaced=true

# 不在名称空间里
kubectl api-resources --namespaced=false
```
