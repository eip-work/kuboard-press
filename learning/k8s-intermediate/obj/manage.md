---
vssueId: 134
layout: LearningLayout
description: Kubernetes教程_kubectl_命令行工具支持多种途径以创建和管理Kubernetes对象_本文档描述了3种不同的方式
meta:
  - name: keywords
    content: Kubernetes对象,管理Kubernetes对象,Kubernetes Object
---

# 管理Kubernetes对象

<AdSenseTitle>

> 参考文档： [Kubernetes Object Management](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/)

kubectl 命令行工具支持多种途径以创建和管理 Kubernetes 对象。本文档描述了3种不同的方式。更多的细节，请参考 [Kubectl book](https://kubectl.docs.kubernetes.io/)



</AdSenseTitle>

## 管理方式

| 管理方式         | 操作对象                     | 推荐的环境 | 参与编辑的人数 | 学习曲线 |
| ---------------- | ---------------------------- | ---------- | -------------- | -------- |
| 指令性的命令行   | Kubernetes对象               | 开发环境   | 1+             | 最低     |
| 指令性的对象配置 | 单个 yaml 文件               | 生产环境   | 1              | 适中     |
| 声明式的对象配置 | 包含多个 yaml 文件的多个目录 | 生产环境   | 1+             | 最高     |

::: danger

同一个Kubernetes对象应该只使用一种方式管理，否则可能会出现不可预期的结果

:::



::: tip Kuboard

* kubectl 是 Kubernetes 官方的管理工具，由于命令行 + yaml 文件这个特性，其操作难度和学习曲线都是很高的，作为 Kubernetes 的资深用户，是需要学会如何使用 kubectl 的。在实际生产环境的使用中，作者推荐大家使用 Kuboard，Kuboard 是一款免费的基于Kubernetes的微服务管理界面，已经在许多的生产环境中得到了检验。
* Kuboard 可以和 kubectl 配合使用，但是您必须对两者都有所了解。

:::

## 指令性的命令行

当使用指令性的命令行（imperative commands）时，用户通过向 `kubectl` 命令提供参数的方式，直接操作集群中的 Kubernetes 对象。此时，用户无需编写或修改 `.yaml` 文件。

这是在 Kubernetes 集群中执行一次性任务的一个简便的办法。由于这种方式直接修改 Kubernetes 对象，也就无法提供历史配置查看的功能。

### 例子

创建一个 Deployment 对象，以运行一个 nginx 实例：

``` sh
kubectl run nginx --image nginx
```
下面的命令完成了相同的任务，但是命令格式不同：
``` sh
kubectl create deployment nginx --image nginx
```

### 优缺点

与编写 `.yaml` 文件进行配置的方式相比的优势：
* 命令简单，易学易记
* 只需要一个步骤，就可以对集群执行变更

缺点：
* 使用命令，无法进行变更review的管理
* 不提供日志审计
* 没有创建新对象的模板

## 指令性的对象配置

使用指令性的对象配置（imperative object configuration）时，需要向 kubectl 命令指定具体的操作（create,replace,apply,delete等），可选参数以及至少一个配置文件的名字。配置文件中必须包括一个完整的对象的定义，可以是 yaml 格式，也可以是 json 格式。

::: warning
`replace` 指令将直接使用对象中新的 spec 内容替换原有的 spec 内容，如果原有spec中存在配置文件中没有定义的字段，都将被丢弃。这种方法不能够应用在那些 spec 对象独立于配置文件进行更新的情况。例如 `LoadBalancer` 类型的 Service，其 spec 中的 `externalIPs` 字段由集群更新。
:::

### 例子

通过配置文件创建对象

``` sh
kubectl create -f nginx.yaml
```

删除两个配置文件中的对象

``` sh
kubectl delete -f nginx.yaml -f redis.yaml
```

直接使用配置文件中的对象定义，替换Kubernetes中对应的对象：

``` sh
kubectl replace -f nginx.yaml
```

### 优缺点

与指令性命令行相比的优点：
* 对象配置文件可以存储在源代码管理系统中，例如 git
* 对象配置文件可以整合进团队的变更管理流程，并进行审计和复核
* 对象配置文件可以作为一个模板，直接用来创建新的对象

与指令性命令行相比的缺点：
* 需要理解对象配置文件的基本格式
* 需要额外编写 yaml 文件

与声明式的对象配置相比的优点：
* 指令性的对象配置更简单更易于理解
* 指令性的对象配置更成熟

与声明式的对象配置相比的缺点：
* 指令性的对象配置基于文件进行工作，而不是目录
* 如果直接更新 Kubernetes 中对象，最好也同时修改配置文件，否则在下一次替换时，这些更新将丢失

## 声明式的对象配置

当使用声明式的对象配置时，用户操作本地存储的Kubernetes对象配置文件，然而，在将文件传递给 kubectl 命令时，并不指定具体的操作，由 kubectl 自动检查每一个对象的状态并自行决定是创建、更新、还是删除该对象。使用这种方法时，可以直接针对一个或多个文件目录进行操作（对不同的对象可能需要执行不同的操作）。

::: tip
声明式对象配置将保留其他用户对Kubernetes对象的更新，即使这些更新没有合并到对象配置文件中。因为当Kubernetes中已经存在该对象时，声明式对象配置使用 `patch` API接口，此时会把变化的内容更新进去，而不是使用 `replace` API接口，该接口替换整个 spec 信息。
:::

### 例子

处理 `configs` 目录中所有配置文件中的Kubernetes对象，根据情况创建对象、或更新Kubernetes中已经存在的对象。可以先执行 `diff` 指令查看具体的变更，然后执行 `apply` 指令执行变更：

``` sh
kubectl diff -f configs/
kubectl apply -f configs/
```

递归处理目录中的内容：

``` sh
kubectl diff -R -f configs/
kubectl apply -R -f configs/
```

### 优缺点

与指令性的对象配置相比，优点有：
* 直接针对Kubernetes已有对象的修改将被保留，即使这些信息没有合并到配置文件中。（译者注：也许这是一个缺点？因为我不敢相信我的配置文件了，或者我要禁止使用其他手段修改Kubernetes中已有的对象）
* 声明式的对象配置可以支持多文件目录的处理，可以自动探测应该对具体每一个对象执行什么操作（创建、更新、删除）

缺点：
* 声明式的对象配置复杂度更高，Debug更困难
* 部分更新对象时，带来复杂的合并操作

## 延伸阅读

* [Managing Kubernetes Objects Using Imperative Commands](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/imperative-command/)
* [Managing Kubernetes Objects Using Object Configuration (Imperative)](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/imperative-config/)
* [Managing Kubernetes Objects Using Object Configuration (Declarative)](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/)
* [Managing Kubernetes Objects Using Kustomize (Declarative)](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)
* [Kubectl Command Reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands/)
* [Kubectl Book](https://kubectl.docs.kubernetes.io/)
* [Kubernetes API Reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/)

::: tip
作者在实际部署一个 30+ 微服务部署单元的 Spring Cloud 应用时，编写了 40 多个 YAML 文件，每个 YAML 文件多达 100-500 行配置。为了使同一套 YAML 文件能够适应开发、测试、生产环境，将其分成 base、dev、test、staging、prod 等目录，使用 [kustomize](https://github.com/kubernetes-sigs/kustomize) 将公共部分提取到 base 中。在经历了如此这般的痛苦之后，编写了 Kuboard。

从更好地学习和理解 Kubernetes 的角度来说，是一定要学会如何使用 kubectl 的，实际在 Kubernetes 上部署微服务应用时，您会发现 Kuboard 用起来更顺手。
:::
