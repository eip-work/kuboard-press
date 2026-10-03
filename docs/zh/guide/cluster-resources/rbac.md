---
description: K8s 原生 RBAC 四类对象（Role / ClusterRole / RoleBinding / ClusterRoleBinding）在 Kuboard 中的查看与管理：入口、创建表单、安全评估与验证
---

# 集群 RBAC（Role / ClusterRole / RoleBinding / ClusterRoleBinding）

Kubernetes 的 **RBAC（Role-Based Access Control）** 对象在集群内定义「谁能对哪些资源做什么」，由 kube-apiserver 强制校验。本页覆盖 Kuboard 中「集群资源 → 集群 RBAC」菜单下的四类对象：

| 资源 | 层级 | 作用 | 典型场景 |
| --- | --- | --- | --- |
| 角色（Role） | 名称空间 | 定义**某个名称空间内**的权限集合 | 给某名称空间内的团队一个"可读写工作负载"的角色 |
| 集群角色（ClusterRole） | 集群 | 定义**集群级或跨名称空间**的权限集合 | 集群管理员、节点只读、CRD 管理 |
| 角色绑定（RoleBinding） | 名称空间 | 把 Role 或 ClusterRole 绑定到**主体**，仅在该名称空间生效 | 把上面的"开发角色"绑定给某用户 |
| 集群角色绑定（ClusterRoleBinding） | 集群 | 把 ClusterRole 绑定到主体，在**整个集群**生效 | 把"集群只读"绑定给全体已认证用户 |

**主体（subject）**可以是用户（User）、用户组（Group）或服务账号（ServiceAccount）；绑定后，apiserver 依据角色规则（`apiGroups` / `resources` / `verbs`）授权。Kuboard 对这四类对象提供完整的列表 / 详情 / 创建 / 编辑 / 删除能力。

::: tip 与 Kuboard 自建授权模型的区别
本菜单管理的是 **K8s 集群内的访问控制**，与 Kuboard 平台自建的授权（用户 → 用户组 → 角色 → 绑定作用域，见 [授权作用域](../reference/rbac-scopes)）**完全独立**：平台授权控制「谁能登录 Kuboard、能看到哪些集群 / 名称空间」，K8s RBAC 控制「用户在集群里能对资源做什么」。两者通常配合使用。
:::

## 入口

**集群资源 → 集群 RBAC**，其下按资源分为 **角色 / 角色绑定 / 集群角色 / 集群角色绑定** 四个列表。列表、详情、创建、编辑均复用通用资源页（见 [资源列表页](../ui/object-list) 与 [资源详情页](../ui/object-detail)）。

::: tip 数据通道
角色（Role）与角色绑定（RoleBinding）已配置缓存同步（约每 5 秒），列表支持分页；集群角色（ClusterRole）与集群角色绑定（ClusterRoleBinding）未缓存，列表直接查询集群 API，数据实时但不支持翻页。
:::

## 创建角色（Role / ClusterRole）

1. 进入 **集群资源 → 集群 RBAC → 角色**（或 **集群角色**），点击 **创建**，选择 **从表单创建**；
2. 填写表单：

| 区域 | 字段 | 说明 |
| --- | --- | --- |
| 元数据 | 名称 | 必填。Role 为 DNS 标签（小写字母 / 数字 / `-` / `.`，最长 63 字符）；ClusterRole 为 DNS 子域名（最长 253 字符） |
| | 标签 | 可选键值对 |
| 规则 rules[] | API 组 | 如 `(core)`、`apps`、`batch`，可多选；`*` 表示所有 API 组 |
| | 资源 resources | 如 `pods`、`deployments`，可多选；`*` 表示所有资源 |
| | 操作 verbs | 如 `get` / `list` / `watch` / `create` / `update` / `delete` / `patch`，可多选；`*` 表示所有操作 |

   e.g. 只读 Pod：API 组选 `(core)`，资源选 `pods`，操作选 `get` / `list` / `watch`。点击 **+ 添加** 可追加多条规则（多条之间为"或"关系，命中任一即授权）。

3. 点击 **保存**，在 **预览 YAML** 中确认后提交。

```sh
kubectl get roles -A            # 查看所有名称空间下的 Role
kubectl get clusterroles        # 查看集群角色
```

## 创建角色绑定（RoleBinding / ClusterRoleBinding）

1. 进入 **集群资源 → 集群 RBAC → 角色绑定**（或 **集群角色绑定**），点击 **创建**，选择 **从表单创建**；
2. 填写表单：

| 区域 | 字段 | 说明 |
| --- | --- | --- |
| 元数据 | 名称 | 必填 |
| | 名称空间 | 角色绑定的生效名称空间（只读展示）；集群角色绑定为集群级，无此字段 |
| 绑定主体 subjects[] | 类型 | 用户（User）/ 用户组（Group）/ 服务账号（ServiceAccount） |
| | 名称 | 主体名称，如 `alice`、`dev-team`、`my-sa` |
| | 名称空间 | 服务账号所属名称空间（主体类型为 ServiceAccount 时填写） |
| 角色引用 roleRef | 角色类型 | Role 或 ClusterRole |
| | 角色名称 | 被引用的角色名 |

3. 点击 **保存**，在 **预览 YAML** 中确认后提交。

::: warning 角色类型决定生效范围
- **RoleBinding** 可以引用同名称空间的 **Role**，也可以引用 **ClusterRole**（此时权限收窄到该名称空间内生效）；
- **ClusterRoleBinding** 只能引用 **ClusterRole**，且在整个集群生效——绑定前请确认这就是你想要的粒度。
:::

## 列表页的安全评估

角色绑定列表对风险较高的绑定直接给出提示（展开行可查看主体明细与角色引用）：

| 标记 | 含义 |
| --- | --- |
| 匿名可访问 | 绑定包含 `system:anonymous` / `system:unauthenticated` 主体，允许匿名或未认证用户访问，风险极高，建议移除 |
| 全员认证可访问 | 绑定包含 `system:authenticated` 主体，集群内所有已认证用户都可访问，建议收敛为明确的主体清单 |
| 集群级作用范围提示 | 集群角色绑定作用于整个集群，建议最小化绑定范围 |

## 验证

绑定保存后，授权由 kube-apiserver 即时强制生效（Kuboard 只负责写入对象，不做二次拦截）。可用下面的命令复核预期效果：

```sh
kubectl auth can-i --as=alice get pods -n dev
kubectl auth can-i --as=alice list deployments -n dev
```

## 相关页面

- [授权作用域（Kuboard 平台授权）](../reference/rbac-scopes)：与 K8s RBAC 的区别与配合
- [资源列表页](../ui/object-list) / [资源详情页](../ui/object-detail)：列表与详情的通用操作