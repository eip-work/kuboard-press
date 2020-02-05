---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限
---

# RBAC 授权接口

<AdSenseTitle/>

> 参考文档：[Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

<Course courseId="484058" />

Role-based access control (RBAC)基于角色的访问控制，是Kubernetes中支持的一种授权方式。使用 `rbac.authorization.k8s.io` API 来驱动授权决策，允许管理员通过该 API 动态配置授权策略。自 Kubernetes 1.8 起，RBAC 模式已稳定可用，且通过 `rbac.authorization.k8s.io/v1` API 提供支持。如果要激活 RBAC，在启动 API Server 时必须使用参数 `--authorization-mode=RBAC`

> 译者注：
> 
> 使用 kubeadm 安装 kubernetes 后，启动 API Server 的参数有 `--authorization-mode=Node,RBAC`，同时激活了 [Node Authorization](https://kubernetes.io/docs/reference/access-authn-authz/node/) 和 RBAC Authorization。因此，如果您参考 kuboard.cn 提供的文档安装 kubernetes，默认是启用 RBAC 授权的。


RBAC API 声明了四种顶级（top-level）Kubernetes 对象类型，管理员可以使用 kubectl、API接口调用等方式操作这四种类型的对象。在阅读本系列 RBAC 文档时，您可以使用 `kubectl apply -f (resource).yaml` 直接执行并尝试其效果。

## Role和ClusterRole

在 RBAC API 中，角色包含了一组授权规则。此处的授权规则是纯粹的“授予”规则（没有“否定”规则）。角色可以用以下两种形式定义：
* 名称空间中的 `Role`
* 集群范围内的 `ClusterRole`

`Role` 只能用来授权访问单个名称空间内部的资源。下面的例子中定义的 `Role` 授权读取 `default` 名称空间中的 Pod：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

`ClusterRole` 可以用来授予与 `Role` 相同的权限，但是由于 `ClusterRole` 是集群范围内的，也可以用来授权访问如下资源：
* 集群范围内的资源（例如节点）
* 非资源性质的端口（例如 "/healthz"）
* 所有名称空间内的资源（例如 Pod，授权后可以使用这类语句 `kubectl get pods --all-namespaces`）

下面的 `ClusterRole` 可以授权读取任意特定名称空间的 secrets，或所有名称空间的 secrets（取决于如何 [绑定](#RoleBinding和ClusterRoleBinding)）：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  # "namespace" omitted since ClusterRoles are not namespaced
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "watch", "list"]
```

## RoleBinding和ClusterRoleBinding

角色绑定将角色中定义的权限授予给一个用户或者一组用户。角色绑定包含了一个被授权对象的列表（user、group、service account），以及一个被授予的角色的引用。角色绑定有如下两种定义方式：
* 名称空间内的 `RoleBinding`
* 集群范围内的 `ClusterRoleBinding`

`RoleBinding` 可以引用同名称空间下的 `Role`。下面的 `RoleBinding` 将 “default” 名称空间中的角色 “pod-reader” 授予给用户 “jane”，此时 “jane” 可以读取 “default” 名称空间中的 pod。

* `roleRef`：引用被授予的角色
  * `kind` 可以是 `Role` 或者 `ClusterRole`
  * `name` 是被引用的 `Role` 或者 `ClusterRole` 的名称

此例中的 RoleBinding 使用 `roleRef` 将用户 “jane” 绑定到上面创建的 `pod-reader` 这个 `Role`

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "jane" to read pods in the "default" namespace.
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role #this must be Role or ClusterRole
  name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
  apiGroup: rbac.authorization.k8s.io
```

`RoleBinding` 也可以引用一个 `ClusterRole`，用来授予 `RoleBinding` 所在名称空间中的对象的访问权限。这样，管理员可以在集群内定义一组通用的角色，并且在不同的名称空间中重用这些角色。

例如，尽管下面的 `RoleBinding` 引用了 `ClusterRole`，“dave”（被授权的用户，大小写敏感）将只能够读取 “development” 名称空间（`RoleBinding`所在的名称空间）中的 secrets 对象。

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "dave" to read secrets in the "development" namespace.
kind: RoleBinding
metadata:
  name: read-secrets
  namespace: development # This only grants permissions within the "development" namespace.
subjects:
- kind: User
  name: dave # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

`ClusterRoleBinding` 可以被用来授权访问集群级别的资源，以及所有名称空间中的资源。下面的 `ClusterRoleBinding` 允许 “manager” 用户组中的用户读取任何名称空间中的 secrets：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
# This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.
kind: ClusterRoleBinding
metadata:
  name: read-secrets-global
subjects:
- kind: Group
  name: manager # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

`RoleBinding`、`ClusterRoleBinding` 创建后，其 `roleRef` 字段不可修改，如果尝试修改则会报错。如果需要修改 `roleRef` 字段，必须将 `RoleBinding` 或 `ClusterRoleBinding` 删除后重新创建。这样做的主要原因有如下两点：
1. `roleRef` 不同的话，本质上是完全不同的绑定关系。要求删除并重建 `RoleBinding` 或 `ClusterRoleBinding` 以修改 `roleRef` 字段，可以确保列表中的被授权的对象（用户、用户组、Service Account）都是经过考虑的（如果直接修改 `roleRef` 字段，用户将不会核对列表中的用户、用户组、Service Account是否应该被授予新的角色）
2. 不允许修改 `roleRef` 字段的情况下，可以将修改 `RoleBinding`、`ClusterRoleBinding` 的权限授予给某个用户，使其可以管理其中的被授权对象列表（用户、用户组、Service Account），但是不能够修改对应的角色（权限）。

`kubectl auth reconcile` 命令行工具可以创建或更新包含 RBAC 对象的描述文件，删除、重新创建 `RoleBinding`、`ClusterRoleBinding`。更多信息请参考 [command usage and examples](./cmd.html#kubectl-auth-reconcile)

## Referring to Resources

大多数的资源都以其名称作为标识，例如 “pods”，与其 API 的 URL 路径中的标识相同。某些 Kubernetes API 也包含了 “subresource 子资源”，例如 pod 的 logs。其 API 的 URL 如下所示：

``` 
GET /api/v1/namespaces/{namespace}/pods/{name}/log
```

此时， “pods” 是名称空间中的资源，“log” 是 pod 的子资源。在 RBAC 的 role 中，通过 `/` 来分隔资源和子资源。例如，下面的 yaml 可以授权读取 pod 和 pod 的 log：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-and-pod-logs-reader
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list"]
```

对于某些请求，也可以使用 `resourceNames` 列表来引用其实例。此时，可以限定被访问的单个对象实例
。例如，下面的 yaml 可以授权对单个 configmap 进行 “get” 和 “update” 操作：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: configmap-updater
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  resourceNames: ["my-configmap"]
  verbs: ["update", "get"]
```

> * “create” 操作不能通过 resourceName 来限定，因为该对象的名字在授权的时候还不存在
> * “deletecollection” 操作也不能通过 resourceName 来限定

## Aggregated ClusterRoles

KUbernetes 1.9 开始，可以使用 `aggregationRule` 来将 ClusterRole 与其他的 ClusterRole 合并。Aggregated ClusterRole 的权限由控制器管理，是所有与其 label selector 匹配的 ClusterRole 中所定义权限的并集。下面是一个 aggregated ClusterRole 的例子：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monitoring
aggregationRule:
  clusterRoleSelectors:
  - matchLabels:
      rbac.example.com/aggregate-to-monitoring: "true"
rules: [] # Rules are automatically filled in by the controller manager.
```

创建一个与 aggregated ClusterRole 的 label selector 匹配的 ClusterRole 时，将会向该 aggregated ClusterRole 添加规则。在上面的例子中，可以向通过创建另外一个包含标签 `rbac.example.com/aggregate-to-monitoring: true` 的 ClusterRole 向名称为 “monitoring” 的 ClusterRole 添加规则：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monitoring-endpoints
  labels:
    rbac.example.com/aggregate-to-monitoring: "true"
# These rules will be added to the "monitoring" role.
rules:
- apiGroups: [""]
  resources: ["services", "endpoints", "pods"]
  verbs: ["get", "list", "watch"]
```

默认的面向用户的角色是 aggregated ClusterRole。这样，管理员就可以为默认角色添加 custom resource 的规则，例如 CustomResourceDefinition。

例如，下面的 ClusterRole 允许 “admin” 和 “edit” 这两个默认角色管理 custom resource “CronTabs”，而 “view” 角色则只能读取这些资源。

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: aggregate-cron-tabs-edit
  labels:
    # Add these permissions to the "admin" and "edit" default roles.
    rbac.authorization.k8s.io/aggregate-to-admin: "true"
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
rules:
- apiGroups: ["stable.example.com"]
  resources: ["crontabs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: aggregate-cron-tabs-view
  labels:
    # Add these permissions to the "view" default role.
    rbac.authorization.k8s.io/aggregate-to-view: "true"
rules:
- apiGroups: ["stable.example.com"]
  resources: ["crontabs"]
  verbs: ["get", "list", "watch"]
```

### Role Examples

> 例子中只展示了 `rules` 这一部分。

允许读取 core [API Group](https://kubernetes.io/docs/concepts/overview/kubernetes-api/#api-groups) 中的 “pods”：

``` yaml
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

允许 读取/写入 “extensions” 和 “apps” API Group 中的 “deployments”：

``` yaml
rules:
- apiGroups: ["extensions", "apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
```

允许读取 “pods”、读取/写入 “jobs”：

``` yaml
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["batch", "extensions"]
  resources: ["jobs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
```

允许读取名为 “my-config” 的 ConfigMap（必须绑定到某个名称空间中的 `RoleBinding`）：

``` yaml
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  resourceNames: ["my-config"]
  verbs: ["get"]
```

允许读取 core API Group 中的 “nodes” （由于节点时集群级别的对象，此规则必须定义在 `ClusterRole` 中，也不惜绑定到一个 `ClusterRoleBinding`）：

``` yaml
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "list", "watch"]
```

允许对非资源型的端口 “/healthz”（及其所有子路径）执行 “GET” 和 “POST” 请求（此规则必须定义在 `ClusterRole` 中，也不惜绑定到一个 `ClusterRoleBinding`）：

``` yaml
rules:
- nonResourceURLs: ["/healthz", "/healthz/*"] # '*' in a nonResourceURL is a suffix glob match
  verbs: ["get", "post"]
```

## Referring to Subjects

`RoleBinding`、`ClusterRoleBinding` 将角色绑定到被授权主体。被授权主体可以是 group、user、service account。

User 通过 string 来标识，可以是普通的 username，例如 “alice”，email风格的名称，例如“bob@example.com”，或者以字符数形式定义的数字ID。由集群管理员通过配置 [authentication modules](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) 来决定产生何种格式的 username，RBAC 授权系统对此做限定。但是，`system:` 前缀是被 Kubernetes 系统预留的，管理员应该确保 username 不包含这一前缀。

KUbernetes 中的 Group 信息由 Authenticator 模块提供。与 user 一样，group 也使用 string 来标识，`system:` 前缀也是被预留的，但是没有格式要求。

[Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) 使用 `system:serviceaccount:` 前缀的 username，并且属于 `system:serviceaccounts:` 前缀的 group。

### Role Binding Examples

下面的例子中只显示了 `RoleBinding`、`ClusterRoleBinding` 的 `subjects` 部分。

绑定 user “alice@example.com”：

``` yaml
subjects:
- kind: User
  name: "alice@example.com"
  apiGroup: rbac.authorization.k8s.io
```

绑定 group “frontend-admins”：

``` yaml
subjects:
- kind: Group
  name: "frontend-admins"
  apiGroup: rbac.authorization.k8s.io
```

绑定 kube-system 名称空间中的 default service account：

``` yaml
subjects:
- kind: ServiceAccount
  name: default
  namespace: kube-system
```

绑定 qa 名称空间中的所有 service account：

``` yaml
subjects:
- kind: Group
  name: system:serviceaccounts:qa
  apiGroup: rbac.authorization.k8s.io
```

绑定任意 service account：

``` yaml
subjects:
- kind: Group
  name: system:serviceaccounts
  apiGroup: rbac.authorization.k8s.io
```

绑定所有已认证的用户（kubernetes 1.5+）：
``` yaml
subjects:
- kind: Group
  name: system:authenticated
  apiGroup: rbac.authorization.k8s.io
```

绑定所有未认证用户（kubernetes 1.5+）：

``` yaml
subjects:
- kind: Group
  name: system:unauthenticated
  apiGroup: rbac.authorization.k8s.io
```

绑定所有用户（kubernetes 1.5+）：
``` yaml
subjects:
- kind: Group
  name: system:authenticated
  apiGroup: rbac.authorization.k8s.io
- kind: Group
  name: system:unauthenticated
  apiGroup: rbac.authorization.k8s.io
```
