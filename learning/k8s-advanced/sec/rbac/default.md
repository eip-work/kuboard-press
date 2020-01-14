---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限,Kubernetes默认角色
---

# RBAC default Roles and Role Bindings

<AdSenseTitle/>

> 参考文档：[Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

API server 将创建一组默认的 `ClusterRole` 和 `ClusterRoleBinding` 对象。其中许多都是以 `system:` 开头的，表明该对象属于系统层面。如果修改这些对象，将导致集群不可用。例如 `system:node` ClusterRole，定义了 kubelet 的权限。如果该 ClusterRole 被修改，可能使得 kubelet 不能正常工作。

所有的默认 Role 以及 RoleBinding 都带有标签 `kubernetes.io/bootstrapping=rbac-defaults`。

## Auto-reconciliation

API Server 每次启动时，都会更新默认 ClusterRole 以补全可能缺失的权限，并且也会更新默认的 ClusterRoleBinding 以补全可能缺失的被授权主体。这样，集群可以自动修复意外的修改，同时可以使 Role 中的权限、RoleBinding 中的被授权主体与最新的 Kubernetes 版本保持一致（如果升级了 Kubernetes 的话）。

如果要禁用这个特性，将默认 ClusterRole 或 ClusterRoleBinding 上的注解 `rbac.authorization.kubernetes.io/autoupdate` 设置为 `false`  即可。
> * 请注意，如果缺失默认的权限，将导致集群不可用
> * Auto-reconciliation 自 Kubernetes 1.6 开始，随 RBAC 一起生效。


## Discovery Roles

默认 RoleBinding 授权匿名用户（和已登录用户）读取公开的 API 信息（包括 CustomResourceDefinitions）。如果要禁止匿名用户访问，可在 API Server 的启动参数里添加 `--anonymous-auth=false`。

如需查看这些角色的配置，可执行如下命令：

``` sh
kubectl get clusterroles system:discovery -o yaml
```

> 注意：不推荐编辑这些角色，因为 API Server 重启时，会被重新修改，参考 [auto-reconciliation](#auto-reconciliation)

| Default ClusterRole       | Default ClusterRoleBinding                                   | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| system:basic-user         | **system:authenticated** group                               | 授予用户对自己的信息的只读权限。在 1.14 之前，该角色也默认被绑定到 `system:unauthenticated` |
| system:discovery          | **system:authenticated** group                               | 授予用户只读权限，读取用于发现及协商 API 等级的 API 发现端口。在 1.14 之前，该角色也默认被绑定到 `system:unauthenticated` |
| system:public-info-viewer | **system:authenticated** and<br />**system:unauthenticated** groups | 授予用户只读权限，读取集群的非敏感信息。自 1.14 开始引入。   |


## User-facing Roles

一部分默认 Role 没有 `system:` 前缀，这些是直接给用户使用的（user-facing），包括：
* 超级用户的角色（`cluster-admin`）
* 可通过 ClusterRoleBinding 绑定的集群级别的角色（`cluster-status`）
* 可通过 RoleBinding 绑定到特定名称空间的角色（`admin`、`edit`、`view`）

从 Kubernetes 1.9 开始，user-facing roles 使用 [ClusterRole Aggregation](./api.html#aggregated-clusterroles) 以使管理员在其中包含 Custom Resource 的授权规则。向 `admin`、`edit`、`view` 等角色添加授权规则时，可创建一个 ClusterRole，包含一个或多个下述标签即可：

``` yaml
metadata:
  labels:
    rbac.authorization.k8s.io/aggregate-to-admin: "true"
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
    rbac.authorization.k8s.io/aggregate-to-view: "true"
```

| Default ClusterRole | Default ClusterRoleBinding | Description                                                  |
| ------------------- | -------------------------- | ------------------------------------------------------------ |
| cluster-admin       | **system:masters** group   | 允许超级用户针对任意资源执行任意操作。如果绑定到 **ClusterRoleBinding**，将授予被授权主体针对集群中以及所有名称空间中任意资源的完全控制权。如果绑定到 **RoleBinding**，将授予被授权主体针对该名称空间下所有资源的完全控制权（包括名称空间本身） |
| admin               | None                       | 授予管理员访问权限，可以被用来绑定到名称空间中的 **RoleBinding**。此时，允许对名称空间中大多数资源的 read/write 访问，包括在名称空间中创建 role 以及 rolebinding 的权限。但是不允许对 resource quota 或名称空间本身执行 write 操作。 |
| edit                | None                       | 授予名称空间中大多数资源的 read/write 权限。但是不能够查看或编辑 role 和 rolebinding |
| view                | None                       | 授予名称空间中大多数资源的 read-only 权限。但是不允许查看 role 和 rolebinding，也不允许查看 secrets。 |

## Core Component Roles

| Default ClusterRole                | Default ClusterRoleBinding              | Description                                                  |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| **system:kube-scheduler**          | **system:kube-scheduler** user          | 允许访问 kube-scheduler 组件所需要的资源                     |
| **system:volume-scheduler**        | **system:kube-scheduler** user          | 允许访问 kube-scheduler 组件所需要的数据卷资源               |
| **system:kube-controller-manager** | **system:kube-controller-manager** user | 允许访问 kube-controller-manager 组件所需的资源。特定控制器所需的权限定义在 [controller roles](#controller-roles) 当中 |
| **system:node**                    | None in 1.8+                            | 允许访问 kubelet 组件所需的资源，包括 读取所有的 secrets，写入所有的 pod status。在 kubernetes 1.7 中，推荐使用 [Node authorizer](https://kubernetes.io/docs/reference/access-authn-authz/node/) 和 [NodeRestriction admission plugin](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction)，而不是这个 role，并且推荐为 kubelet 授予访问运行在其所在节点上的 Pod 的 API 权限。在 1.7 之前，此角色被自动绑定到 `system:nodes` group。在 1.7 中，如果 `Node` authorization 模式未启用，此角色被自动绑定到 `system:nodes` group。自 1.8 开始，将不会为其自动创建角色绑定 |
| **system:node-proxier**            | **system:kube-proxy** user              |                                                              |

## Other Component Roles

| Default ClusterRole                      | Default ClusterRoleBinding                                   | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **system:auth-delegator**                | None                                                         | Allows delegated authentication and authorization checks. This is commonly used by add-on API servers for unified authentication and authorization. |
| **system:heapster**                      | None                                                         | Role for the [Heapster](https://github.com/kubernetes/heapster) component. |
| **system:kube-aggregator**               | None                                                         | Role for the [kube-aggregator](https://github.com/kubernetes/kube-aggregator) component. |
| **system:kube-dns**                      | **kube-dns** service account in the **kube-system** namespace | Role for the [kube-dns](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) component. |
| **system:kubelet-api-admin**             | None                                                         | 允许访问所有的 kubelet API.                                  |
| **system:node-bootstrapper**             | None                                                         | 允许访问执行 [Kubelet TLS bootstrapping](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/) 时所需要的资源 |
| **system:node-problem-detector**         | None                                                         | Role for the [node-problem-detector](https://github.com/kubernetes/node-problem-detector) component. |
| **system:persistent-volume-provisioner** | None                                                         | 允许访问大多数 [dynamic volume provisioners](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioner) 所需要的资源 |



## Controller Roles

[Kubernetes controller manager](https://kubernetes.io/docs/admin/kube-controller-manager/) 中包含了核心的控制器。如果其启动参数中添加了 `--use-service-account-credentials`，每一个控制器在启动时都将使用单独的 service account，并绑定到对应的角色（以`system:controller` 为前缀）。如果 Kubernetes controller manager 启动是不带参数 `--use-service-account-credentials`，则所有的控制器都使用其自身的身份标识，此时，必须为其绑定所有的相关角色。这些角色包括：

- system:controller:attachdetach-controller
- system:controller:certificate-controller
- system:controller:clusterrole-aggregation-controller
- system:controller:cronjob-controller
- system:controller:daemon-set-controller
- system:controller:deployment-controller
- system:controller:disruption-controller
- system:controller:endpoint-controller
- system:controller:expand-controller
- system:controller:generic-garbage-collector
- system:controller:horizontal-pod-autoscaler
- system:controller:job-controller
- system:controller:namespace-controller
- system:controller:node-controller
- system:controller:persistent-volume-binder
- system:controller:pod-garbage-collector
- system:controller:pv-protection-controller
- system:controller:pvc-protection-controller
- system:controller:replicaset-controller
- system:controller:replication-controller
- system:controller:resourcequota-controller
- system:controller:root-ca-cert-publisher
- system:controller:route-controller
- system:controller:service-account-controller
- system:controller:service-controller
- system:controller:statefulset-controller
- system:controller:ttl-controller
