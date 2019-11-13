---
vssueId: 124
layout: LearningLayout
description: Kubernetes教程_使用RuntimeClass这一特性可以为容器选择运行时的容器引擎。可以通过 RuntimeClass，使不同的 Pod 使用不同的容器引擎，以在性能和安全之间取得平衡。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Runtime Class
---

# Runtime Class

<AdSenseTitle/>

> 参考文档： [Runtime Class](https://kubernetes.io/docs/concepts/containers/runtime-class/)

特性状态：Kubernetes v1.14 <Badge type="warning">beta</Badge>

## RuntimeClass

使用 RuntimeClass 这一特性可以为容器选择运行时的容器引擎。

## 设计目标

可以通过 RuntimeClass，使不同的 Pod 使用不同的容器引擎，以在性能和安全之间取得平衡。例如，如果某些工作负载需要非常高的信息安全保证，您可能想要将其 Pod 运行在那种使用硬件虚拟化的容器引擎上；同时，将其他的 Pod 运行在另外一种容器引擎上，以获得更高的性能。

也可以通过 RuntimeClass 配置，使不同的 Pod 使用相同的容器引擎和不同的容器引擎配置参数。

### 配置步骤

确保 RuntimeClass 的 feature gate 在 apiserver 和 kubelet 上都是是激活状态（默认是激活的，请参考 [Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)）。

#### 在节点上配置 CRI

如需通过RuntimeClass进行配置，是依赖于 Container Runtime Interface（CRI）的具体实现的。

配置 CRI 时，请留意其 `handler` 名称（该名称是有 字符/数字 和 `-` 组成的字符串），RuntimeClass中将引用该名称。

::: tip
RuntimeClass默认要求集群中所有节点上的容器引擎的配置都是相同的。在Kubernetes v1.16中才开始引入对节点上容器引起不同的情况下的支持（本文暂不讨论这部分内容）
:::

安装 CRI 请参考文档 [CRI installation](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)

* dockershim

  Kubernetes 内建的 dockershim CRI 不支持 RuntimeClass

* [containerd](https://containerd.io/)

  通过 containerd 的配置文件 `/etc/containerd/config.toml` 配置其 Runtime handler。请注意该文档的如下内容

  ```
  [plugins.cri.containerd.runtimes.${HANDLER_NAME}]
  ```

  更多细节请参考 [https://github.com/containerd/cri/blob/master/docs/config.md](https://github.com/containerd/cri/blob/master/docs/config.md)

* [cri-o](https://cri-o.io/)

  通过 cri-o 的配置文件 `/etc/crio/crio.conf` 配置 Runtime handler。请注意该文档的 [crio.runtime table](https://github.com/kubernetes-sigs/cri-o/blob/master/docs/crio.conf.5.md#crioruntime-table)

  ```
  [crio.runtime.runtimes.${HANDLER_NAME}]
    runtime_path = "${PATH_TO_BINARY}"
  ```

  更多细节请参考文档 [https://github.com/kubernetes-sigs/cri-o/blob/master/cmd/crio/config.go](https://github.com/kubernetes-sigs/cri-o/blob/master/cmd/crio/config.go)

<!--FIXME -->

#### 创建对应的 RuntimeClass

在前面的步骤中完成了配置之后，每个配置都会有一个 `handler` 名称，用来唯一地标识该 CRI 的配置。此时，我们需要为每一个 handler 创建一个对应的 RuntimeClass api 对象。

RuntimeClass 目前只有两个主要的字段：
* RuntimeClass name（`metadata.name`）
* handler (`handler`)

该对象的定义如下所示：

``` yaml
apiVersion: node.k8s.io/v1beta1
kind: RuntimeClass
metadata:
  name: myclass # RuntimeClass 没有名称空间
handler: myconfiguration  # 对应 CRI 配置的 handler 名称
```

::: tip
建议只让集群管理员可以修改（create/update/pacth/delete） RuntimeClass，这也是集群的默认配置。请参考 [Authorization Overview](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
:::

### 使用

为集群完成 RuntimeClass 的配置后，使用的时候会非常简单。在 Pod 的定义中指定 `runtimeClassName` 即可，例如：

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  runtimeClassName: myclass
  # ...
```

kubelet 将依据这个字段使用指定的 RuntimeClass 来运行该 Pod。如果指定的 RuntimeClass 不存在，或者 CRI 不能运行对应的 handler 配置，则 Pod 将进入 `Failed` 这个终止 [阶段](/learning/k8s-intermediate/workload/pod-lifecycle.html#pod-phase)。此时可通过 Pod 中的 Event（事件）来查看具体的出错信息。

如果 Pod 中未指定 `runtimeClassName`，kubelet 将使用默认的 RuntimeHandler 运行 Pod，其效果等价于 RuntimeClass 这个特性被禁用的情况。

##
