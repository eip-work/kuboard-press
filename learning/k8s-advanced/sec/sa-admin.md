---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_本文面向集群管理员，阐述如何管理Service Account。Kubernetes 已经计划了要支持 user account，但是尚未完成。本文中引用了未完成的特性（user account）是为了更好地描述 service account。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Service Account
---

# 管理ServiceAccount

<AdSenseTitle/>

本文面向集群管理员，阐述如何管理Service Account。假设您已经熟悉了 [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)。

<!-- FIXME -->

Kubernetes 已经计划了要支持 user account，但是尚未完成。本文中引用了未完成的特性（user account）是为了更好地描述 service account。

[[TOC]]

## User accounts vs. service accounts


Kubernetes 明确地区分了 user account 和 service account 的概念，原因如下：

* User account 的使用者是用户（人），service account 的使用者是运行在 Pod 中的进程。
* User account 应该是全局的，用户名在集群范围内（跨名称空间）必须唯一。Service account 的名称在名称空间内唯一即可
* 通常，集群的 user account 可能是从企业的数据库同步过来，在那里，创建新的 user account 需要特殊的权限，并且受复杂的业务流程管控。Service account 的创建则更加轻量级，允许集群的用户为特定的任务创建 service account，（最小权限的原则）
* 对用户（人）和 service account 的审计过程可能会不一样
* 一个复杂系统中，可能为不同的组件配置不同的 service account。由于 service account 可以临时创建，并且在名称空间内唯一，这种配置信息是可以移植的

## Service account automation

三个组件共同实现了 service account 的 automation：
* Service account admission controller
* Token controller
* Service account controller

### Service account admission controller

[Admission Controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) 是 apiserver 的一部分，它在 Pod 创建或者更新时，对 Pod 执行一些修改。此控制器激活时（默认处于激活状态），当 Pod 被创建或修改时，该控制器将执行如下动作：
1. 如果 Pod 未设置 `ServiceAccount`，将 `ServiceAccount` 设置为 `default`
2. 确保 Pod 引用的 `ServiceAccount` 存在，否则拒绝创建或者修改 Pod 
3. 如果 Pod 不包含任何 `ImagePullSecrets`，则 `ServiceAccount` 中的 `ImagePullSecrets` 将被添加到 Pod 上
4. 为 Pod 添加一个 `volume` （其中包含了访问 APIServer 的 token）
5. 为 Pod 中的每一个容器添加一个 `volumeSource`，并挂载到路径 `/var/run/secrets/kubernetes.io/serviceaccount`

自 v1.13 开始，当 `BoundServiceAccountTokenVolume` 特性被启用时，可以将 service account volume 迁移到一个 [projected volume](https://kubernetes.io/docs/tasks/configure-pod-container/configure-projected-volume-storage/)。Service account token 将在一小时后或者 Pod 被删除后过期。

### Token Controller

TokenController 作为 controller-manager 的一部分运行。以异步的方式执行如下动作：

* 监听 ServiceAccount 的创建，并创建一个对应的 Secret 以允许访问 APIServer
* 监听 ServiceAccount 的删除，并删除所有对应的 ServiceAccountToken Secrets
* 监听 Secret 的添加，确保其引用的 ServiceAccount 以存在，并在需要时向 Secret 添加 Token
* 监听 Secret 的删除，并在需要的情况下将对应 ServiceAccount 中对 Secret 的引用也删除掉

启动 controller-manager 时，必须通过 `--service-account-private-key-file` 参数，向 token controller 传递一个 service account private key 文件。该 private key 将用来为沈城的 service account token 签名。类似的，也必须为通过 `--service-account-key-file` 将其对应的 public key 传递给 kube-apiserver。该 public key 将被用来在认证时验证 token。

#### 创建额外的 API token

控制器确保每个 Service account 都有一个包含 API token 的 Secret。如需为 Service Account 创建额外的 API token，可以创建一个类型为 `ServiceAccountToken` 的 Secret，并在注解中引用对应的 Service Account，此时，控制器将为其创建一个新的 token：

> secret.json

``` json
{
    "kind": "Secret",
    "apiVersion": "v1",
    "metadata": {
        "name": "mysecretname",
        "annotations": {
            "kubernetes.io/service-account.name": "myserviceaccount"
        }
    },
    "type": "kubernetes.io/service-account-token"
}
```

``` sh
kubectl create -f ./secret.json
kubectl describe secret mysecretname
```

#### 删除/禁用 Service Account token

``` sh
kubectl delete secret mysecretname
```

### Service Account Controller

Service Account Controller 管理了名称空间中的 ServiceAccount，并确保每一个当前有效的名称空间中都存在一个名为 `default` 的 ServiceAccount。
