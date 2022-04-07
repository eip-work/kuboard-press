---
layout: LearningLayout
description: Kubernetes教程_对 Pod 安全性准入控制器的概述，Pod 安全性准入控制器可以实施 Pod 安全性标准。
meta:
  - name: keywords
    content: Kubernetes 教程,Pod Security Admission
---

# Pod Security Admission

> 本文参考自 Kubernetes 官方文档 [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)

<AdSenseTitle/>

<!-- overview -->

> FEATURE STATE `Kubernetes v1.23 [beta]`

Kubernetes [Pod 安全性标准（Security Standards）](./pss)
为 Pod 定义不同的隔离级别。这些标准能够让你以一种清晰、一致的方式定义如何限制 Pod 行为。

作为一项 Beta 功能特性，Kubernetes 提供一种内置的 _Pod 安全性_ 
作为 [PodSecurityPolicies](https://kubernetes.io/docs/concepts/security/pod-security-policy/)
特性的后继演化版本。Pod 安全性限制是在 Pod 被创建时在 名称空间 层面实施的。

:::tip Note
PodSecurityPolicy API 已经被废弃，会在 Kubernetes v1.25 发行版中移除。
:::

## 启用 `PodSecurity` 准入插件

在 v1.23 中，`PodSecurity` [特性门控](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
是一项 Beta 功能特性，默认被启用。

在 v1.22 中，`PodSecurity` [特性门控](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
是一项 Alpha 功能特性，必须在 `kube-apiserver` 上启用才能使用内置的准入插件。

```shell
--feature-gates="...,PodSecurity=true"
```

## 替代方案：安装 `PodSecurity` 准入 Webhook

对于无法应用内置 `PodSecurity` 准入插件的环境，无论是因为集群版本低于 v1.22，
或者 `PodSecurity` 特性无法被启用，都可以使用 Beta 版本的
[验证性准入 Webhook](https://git.k8s.io/pod-security-admission/webhook)。
来使用 `PodSecurity` 准入逻辑。

在 [https://git.k8s.io/pod-security-admission/webhook](https://git.k8s.io/pod-security-admission/webhook)
上可以找到一个预先构建的容器镜像、证书生成脚本以及一些示例性质的清单。

```shell
git clone git@github.com:kubernetes/pod-security-admission.git
cd pod-security-admission/webhook
make certs
kubectl apply -k .
```

:::tip Note
所生成的证书合法期限为 2 年。在证书过期之前，
需要重新生成证书或者去掉 Webhook 以使用内置的准入查件。
:::

## Pod 安全性级别

Pod 安全性准入插件对 Pod 的[安全性上下文](/learning/k8s-intermediate/config/sec-ctx/)
有一定的要求，并且依据 [Pod 安全性标准](./pss)
所定义的三个级别（`privileged`、`baseline` 和 `restricted`）对其他字段也有要求。
关于这些需求的更进一步讨论，请参阅
[Pod 安全性标准](./pss)页面。

## 为名字空间设置 Pod 安全性准入控制标签

一旦特性被启用或者安装了 Webhook，你可以配置名字空间以定义每个名字空间中
Pod 安全性准入控制模式。
Kubernetes 定义了一组标签，
你可以设置这些标签来定义某个名字空间上要使用的预定义的 Pod 安全性标准级别。
你所选择的标签定义了检测到潜在违例时，控制面板要采取什么样的动作。

|模式 | 描述|
:---------|:------------
**enforce** | 策略违例会导致 Pod 被拒绝
**audit** | 策略违例会触发[审计日志](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/)中记录新事件时添加审计注解；但是 Pod 仍是被接受的。
**warn** | 策略违例会触发用户可见的警告信息，但是 Pod 仍是被接受的。

名字空间可以配置任何一种或者所有模式，或者甚至为不同的模式设置不同的级别。

对于每种模式，决定所使用策略的标签有两个：

```yaml
# 针对模式的级别标签用来标示针对该模式所应用的策略级别
#
# MODE 必须是 `enforce`、`audit` 或 `warn` 之一
# LEVEL 必须是 `privileged`、baseline` 或 `restricted` 之一
pod-security.kubernetes.io/<MODE>: <LEVEL>

# 可选：针对每个模式版本的版本标签可以将策略锁定到
# 给定 Kubernetes 小版本号所附带的版本（例如 v1.23.5）
#
# MODE 必须是 `enforce`、`audit` 或 `warn` 之一
# VERSION 必须是一个合法的 Kubernetes 小版本号或者 `latest`
pod-security.kubernetes.io/<MODE>-version: <VERSION>
```

关于用法示例，可参阅
[使用名字空间标签来强制实施 Pod 安全标准](https://kubernetes.io/zh/docs/tasks/configure-pod-container/enforce-standards-namespace-labels/)。


## 负载资源和 Pod 模板

Pod 通常是通过创建 Deployment 或
Job 这类[工作负载对象](/learning/k8s-intermediate/workload/workload.html)
来间接创建的。工作负载对象为工作负载资源定义一个 _Pod 模板_ 和一个对应的
负责基于该模板来创建 Pod 的 控制器。
为了尽早地捕获违例状况，`audit` 和 `warn` 模式都应用到负载资源。
不过，`enforce` 模式并 **不** 应用到工作负载资源，仅应用到所生成的 Pod 对象上。 

## 豁免

你可以为 Pod 安全性的实施设置 _豁免（Exemptions）_ 规则，
从而允许创建一些本来会被与给定名字空间相关的策略所禁止的 Pod。
豁免规则可以在[准入控制器配置](/zh/docs/tasks/configure-pod-container/enforce-standards-admission-controller/#configure-the-admission-controller)
中静态配置。


豁免规则可以显式枚举。满足豁免标准的请求会被准入控制器 _忽略_
（所有 `enforce`、`audit` 和 `warn` 行为都会被略过）。
豁免的维度包括：


- **Username：** 来自用户名已被豁免的、已认证的（或伪装的）的用户的请求会被忽略。
- **RuntimeClassName：** 指定了已豁免的运行时类名称的 Pod
  和[负载资源](#workload-resources-and-pod-templates)会被忽略。
- **Namespace：** 位于被豁免的名字空间中的 Pod 和[负载资源](#workload-resources-and-pod-templates) 
  会被忽略。

:::warning
大多数 Pod 是作为对[工作负载资源](#workload-resources-and-pod-templates)的响应，
由控制器所创建的，这意味着为某最终用户提供豁免时，只会当该用户直接创建 Pod
时对其实施安全策略的豁免。用户创建工作负载资源时不会被豁免。
控制器服务账号（例如：`system:serviceaccount:kube-system:replicaset-controller`）
通常不应该被豁免，因为豁免这类服务账号隐含着对所有能够创建对应工作负载资源的用户豁免。
:::


策略检查时会对以下 Pod 字段的更新操作予以豁免，这意味着如果 Pod
更新请求仅改变这些字段时，即使 Pod 违反了当前的策略级别，请求也不会被拒绝。

- 除了对 seccomp 或 AppArmor 注解之外的所有 meatadata 更新操作：
  - `seccomp.security.alpha.kubernetes.io/pod` （已弃用）
  - `container.seccomp.security.alpha.kubernetes.io/*` （已弃用）
  - `container.apparmor.security.beta.kubernetes.io/*`
- 对 `.spec.activeDeadlineSeconds` 的合法更新
- 对 `.spec.tolerations` 的合法更新

## 下一步

- [Pod 安全性标准](./pss)

<!-- - [强制实施 Pod 安全性标准](/zh/docs/setup/best-practices/enforcing-pod-security-standards/)
- [通过配置内置的准入控制器强制实施 Pod 安全性标准](/zh/docs/tasks/configure-pod-container/enforce-standards-admission-controller/)
- [使用名字空间标签来实施 Pod 安全性标准](/zh/docs/tasks/configure-pod-container/enforce-standards-namespace-labels/)
- [从 PodSecurityPolicy 迁移到内置的 PodSecurity 准入控制器](/zh/docs/tasks/configure-pod-container/migrate-from-psp/) -->
