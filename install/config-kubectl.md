---
vssueId: 115
description: Kubernete安装文档_kubectl命令行工具从一个配置文件中查找用于调用APIServer接口的信息_可以在一个或多个文件中配置多个集群的访问信息_并在kubectl中切换不同的集群访问
meta:
  - name: keywords
    content: kubectl,kubectl配置,kubectl访问多个集群
---

# 配置Kubectl

<AdSenseTitle/>

> 参考文档： Kubernetes文档 [Organizing Cluster Access Using kubeconfig Files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)、[Configure Access to Multiple Clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

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

## KUBECONFIG环境变量

可以在 `KUBECONFIG` 环境变量中配置多个 kubeconfig 文件：
* 在 Linux 和 MAC 中，使用英文冒号 `:` 分隔
* 在 Windows 中，使用英文分号 `;` 分隔

当 `KUBECONFIG` 指定了多个 kubeconfig 文件时，kubectl会自动合并所有文件中的配置内容。您可以将每个集群的访问信息存储到一个文件中，并将该文件加入到 `KUBECONFIG` 环境变量中。

`KUBECONFIG` 环境变量并不是必须配置的，如果该环境变量不存在， kubectl 将使用默认位置的 kubeconfig 文件，即 `$HOME/.kube/config`。

## kubeconfig文件的合并

前面提到，kubectl会自动合并 `KUBECONFIG` 指定的多个文件，执行以下指令，可以查看最终生效的结果：

``` sh
kubectl config view
```

合并时的规则如下：
* 如果执行 kubectl 指令时，指定了 `--kubeconfig` 参数，则只使用该参数指定的 kubeconfig 文件，不会进行合并
* 否则，在指定了环境变量 `KUBECONFIG` 的情况下，该环境变量中的所有文件将被合并使用：
  * 对于不能正常解析的文件，提示错误信息
  * 当执行 `kubectl config use-context` 指令后，在第一个文件中保存 `current-context` 字段
  * 合并过程忽略冲突。例如：如果多个文件中都定义了 `red-user`，将只使用列表中第一个定义了 `red-user` 的内容，所有后面定义的 `red-user` 都将被忽略
* 如果既没指定 `--kubeconfig` 参数，又没指定 `KUBECONFIG` 环境变量，则使用默认的配置文件 `$HOME/.kube/config`，此时也无需合并

## 切换当前访问的集群

当您通过 `KUBECONFIG` 环境变量指定了多个集群的访问配置文件时，执行 `kubectl config view` 指令，输出结果如下所示：

* 其中 `contexts` 字段包含了多个访问集群的 `上下文`，每个上下文指定了一个 `name`，并指定了该 `上下文` 要访问的集群名称`cluster`，集群中的名称空间`namespace`，使用哪个用户去访问`user`。
* `current-context` 字段指定了当前生效的 `上下文`


``` yaml {6,11,21,22}
contexts: 
- context:
    cluster: development
    namespace: frontend
    user: developer
  name: dev-frontend
- context:
    cluster: development
    namespace: ramp
    user: developer
  name: dev-ramp-up
- context:
    cluster: development
    namespace: storage
    user: developer
  name: dev-storage
- context:
    cluster: scratch
    namespace: default
    user: experimenter
  name: exp-scratch
current-context: dev-frontend
kind: Config
users:
...
```

执行 `kubectl config get-contexts` 命令，可以查看可用的 `上下文` 列表，其中第一列带 `*` 的为当前使用的 `上下文`，输出如下所示：

``` {3}
CURRENT   NAME                 CLUSTER                      AUTHINFO             NAMESPACE
          dev-frontend         development                  developer            frontend
*         dev-ramp-up          development                  developer            ramp
          dev-storage          development                  developer            storage
          exp-scratch          scratch                      experimenter         default
```

执行 `kubectl config use-context dev-storage` 命令，可以切换到另外一个 `上下文`
