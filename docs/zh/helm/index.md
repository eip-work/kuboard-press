---
description: Kuboard 内置 Helm（应用管理）：Chart 市场、Release 安装 / 升级 / 回滚与操作事件流总览
---

# Helm（应用管理）

Kuboard 内置 **Helm** 应用管理，覆盖 Chart 市场（浏览、搜索、管理仓库）、Release 的安装 / 升级 / 回滚，以及操作事件流——在不离开 Kuboard 的情况下完成 Helm 应用的全生命周期管理。

## 功能清单

| 能力 | 你能做什么 | 页面 |
|---|---|---|
| 市场浏览 | 像逛应用商店一样浏览、搜索 **Chart（可安装的软件包）**，查看版本、README 与默认 values | [市场浏览](./marketplace) |
| 仓库管理 | 添加 / 编辑 / 删除 Helm 仓库（Chart Repository），手动刷新索引 | [仓库管理](./marketplace) |
| 安装 Release | 选择目标集群与命名空间，配置 values 后安装 Chart | [安装 Release](./install) |
| Release 列表 | 查看已安装应用的运行状态与修订历史，快速进入详情 | [Release 列表](./releases) |
| Release 详情 | 查看 values / manifest / notes，对比任意两个修订（revision） | [Release 详情](./releases) |
| 升级与回滚 | 调整 values 升级应用，或回滚到历史修订 | [升级与回滚](./upgrade-rollback) |
| 操作事件流 | 实时查看安装 / 升级 / 回滚等长任务的执行事件与进度 | [操作事件流](./events) |

## 从哪进入

所有 Helm 功能统一收在左侧导航的一个入口下：

1. 在左侧导航选择目标**集群**；
2. 展开 **应用管理** 分组（图标为 Helm）；
3. 点击 **Helm Release** 子菜单。

打开后，菜单中常驻两个入口：**Release 列表** 与 **市场浏览**。安装、详情、升级、回滚、事件等页面不在菜单中显示，通过列表页与详情页的按钮进入。

<!-- screenshot-todo: 左侧导航「集群 → 应用管理 → Helm Release」展开后的菜单截图 -->

## 适用范围

- **Release 相关功能**（列表、详情、安装、升级、回滚、事件）是**命名空间级**资源：按「集群 × 命名空间」隔离与授权，不同命名空间中的同名 Release 互不影响；
- **Chart 市场与仓库管理**是 **Kuboard 级**资源：整个 Kuboard 实例内全局可见，与具体集群、命名空间无关。

## 快速上手

三步完成第一个 Helm 应用的安装与管理：

1. **浏览市场，选定 Chart**。进入 **集群 → 应用管理 → Helm Release → 市场浏览**，搜索或按分类找到目标 Chart，打开详情页查看版本、README 与默认 values，点击 **安装** 进入安装页。

2. **安装到命名空间**。在安装页选择目标集群与命名空间，按需修改 values（可先做 dry-run 校验），提交后等待安装完成；安装期间可打开[操作事件流](./events)实时观察每一步的执行结果。

3. **在 Release 列表管理**。回到 **Release 列表**，可以看到新安装的应用及其状态；后续的查看修订、对比、升级、回滚、卸载都在这里（或详情页）完成。

::: tip 权限说明
访问 Helm 功能需要具备 `helm.kuboard.cn` 相关资源的权限（如 `releases` 的 `list` / `create` / `get` / `delete`）。未授权时对应入口不显示或按钮置灰，可联系 Kuboard 管理员分配权限。
:::

各页面的详细操作，请分别参阅 [市场浏览](./marketplace)、[安装 Release](./install)、[Release 列表与详情](./releases)、[升级与回滚](./upgrade-rollback) 与 [操作事件流](./events)。
