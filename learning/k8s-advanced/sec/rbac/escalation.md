---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限,Kubernetes默认角色
---

# RBAC Privilege Escalation Prevention and Bootstrapping

<AdSenseTitle/>

> 参考文档：[Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

RBAC API 可以阻止用户通过编辑角色（Role/ClusterRole）和角色绑定（RoleBinding/ClusterRoleBinding）的方式越权。由于此校验在 API 级别，即使在未使用 RBAC authorizer 的情况下，也会执行。

只有当下面任意一个条件满足时，用户才可以创建/更新角色：
1. 用户已经拥有角色中所有的权限，（必须与角色适用的范围相对应，`ClusterRole` 集群级别， `Role` 同名称空间或者集群级别）
2. 用户已经明确被授权可以对 `rbac.authorization.k8s.io` API group 中的角色或角色绑定执行 `escalate` 操作（不低于 Kubernetes 1.12）

例如，如果 “user-1” 不能查询集群范围内的 secret 列表，则，他也不能创建包含该权限的 `ClusterRole`。如需要允许该用户创建/更新这样的角色：
1. 授予用户一个角色，该角色允许用户创建/更新 `Role` 或 `ClusterRole` 对象
2. 授予用户在角色中包含某些特定权限的权限：
   * 隐式定义：为其授予这些权限（如果用户尝试创建或修改的 `Role` 或 `ClusterRole` 中包含用户自己不具备的权限，该 API 调用将被禁止）
   * 显式定义：在用户所绑定的某个 `Role` 或 `ClusterRole` 中添加针对 `rbac.authorization.k8s.io` API group 中 `Role` 或 `ClusterRole` 执行 `escalate` 操作的权限（不低于 Kubernetes 1.12）

只有当下面任意一个条件满足时，用户才可以创建/更新角色绑定：
1. 用户已经拥有角色绑定所引用角色（同名称空间或同在集群级别）中包含的所有权限
2. 用户已经明确被授权可以对角色绑定所引用的 `Role`、`ClusterRole` 执行 `escalate` 操作 （不低于 Kubernetes 1.12）

例如，如果 “user-1” 不能查询集群范围内的 secret 列表，则，他也不能创建关联到包含该权限的 `Role`/`ClusterRole` 的 `ClusterRoleBinding`。如需要允许该用户创建/更新这样的 `RoleBinding`：
1. 授予用户一个角色，该角色孕育用户创建/更新 `RoleBinding` 或 `ClusterRoleBinding` 对象
2. 授予该角色对应的权限以绑定某个具体的角色：
   * 隐式定义：授予用户 `RoleBinding` 将要引用的角色中所有的权限
   * 显式定义：授予用户对该 `Role`/`ClusterRole` 执行 `bind` 操作的权限

例如，下面的 ClusterRole 和 RoleBinding 将允许 “user-1” 为其他用户授予对 “user-1-namespace” 名称空间下的 Role 执行 `admin`、`edit`、`view` 操作的权限：

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: role-grantor
rules:
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["rolebindings"]
  verbs: ["create"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["clusterroles"]
  verbs: ["bind"]
  resourceNames: ["admin","edit","view"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: role-grantor-binding
  namespace: user-1-namespace
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: role-grantor
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: user-1
```

当引导（bootstrap）第一个 Role 和 RoleBinding 时，允许初始用户为在新建用户时为新用户授予初始用户尚未拥有的权限是有必要的。此时可以：
* 使用 `system:masters` group 中的用户，该 group 默认绑定到 `cluster-admin` 超级用户角色
* 如果您的 API Server 运行时激活了 insecure port（`--insecure-port`），可以通过该端口调用 API Server 的接口，此时不会执行认证和授权校验
