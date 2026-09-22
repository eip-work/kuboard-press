---
description: Kuboard Helm Release 管理：查看已安装的 Helm 应用列表与状态、进入 Release 详情查看概览/修订历史/values/manifest/notes、对比两个修订、卸载 Release
---

# Release 管理

Release 是 Helm 对一次安装的封装：一个 Release 对应一个命名空间下的一组 Kubernetes 资源，每执行一次安装、升级或回滚都会产生一个新的修订（revision）。本文介绍如何查看与维护已经安装的 Release。安装新应用请参考 [安装 Release](./install)，升级与回滚请参考 [升级与回滚](./upgrade-rollback)。

## 进入 Release 列表

1. 在左侧导航中进入 **集群 → 应用管理 → Helm Release**；
2. 点击菜单项 **Release 列表**，打开 Release 列表页。

<!-- screenshot-todo: Release 列表页全貌（含顶部集群/命名空间选择器、表格列与右上角"安装 Release"按钮） -->

::: tip 权限要求
进入列表页需要具备 `helm.kuboard.cn` 的 `releases` 资源 `list` 权限；查看详情、升级、回滚、卸载分别需要对应的 `get` / `create` / `delete` 权限，未授权的操作按钮不会显示。
:::

## 列表页

列表页顶部有两个下拉选择器：

- **集群**：默认选中当前用户可访问的第一个集群；
- **命名空间**：默认选中 `default`。

切换集群或命名空间后，列表会自动刷新。Release 按命名空间隔离，不同命名空间中的同名 Release 互不影响。

表格列如下：

| 列 | 说明 |
| --- | --- |
| Name | Release 名称，点击可进入详情 |
| Namespace | 所属命名空间 |
| Revision | 当前修订号，每安装/升级/回滚一次递增 |
| Status | 部署状态，以彩色标签显示，见下表 |
| Chart | Chart 名称 |
| Chart Version | Chart 版本 |
| App Version | 应用版本 |
| Updated | 最近一次更新的时间 |
| 操作 | **详情**：进入详情页；**升级**：进入升级页面 |

### 状态标签含义

状态标签以不同颜色区分，含义如下：

| 状态 | 含义 | 颜色 |
| --- | --- | --- |
| `deployed` | 已成功部署，当前正在生效 | 绿色 |
| `failed` | 安装或升级失败 | 红色 |
| `pending` / `pending-install` / `pending-upgrade` / `pending-rollback` | 操作执行中，尚未完成 | 黄色 |
| `uninstalled` | 已被卸载 | 灰色 |
| `superseded` | 已被更新的修订取代（历史修订的常见状态） | 灰色 |
| `unknown` | 未知状态 | 灰色 |

列表页右上角的 **安装 Release** 按钮用于安装新应用，操作方式见 [安装 Release](./install)。

## Release 详情

在列表中点击 Release 名称或 **详情**，进入该 Release 的详情页。

<!-- screenshot-todo: Release 详情页顶部（状态标签 + Chart 版本/Revision/更新时间/描述 + 右上角"升级/卸载"按钮） -->

### 概览信息

页面顶部展示：

- **集群 / 命名空间 / 名称 / Chart / App Version**；
- 状态标签、**Chart Version**、**Revision**、**Updated**（最近更新时间）；
- **Description**（描述）：内容较长时只显示一行，鼠标悬停可查看完整文本。

右上角提供 **升级** 与 **卸载** 两个操作按钮（按权限显示）。

### 修订历史与对比

**Revision History** 标签页列出该 Release 的完整修订历史，每行一个修订：

| 列 | 说明 |
| --- | --- |
| Revision | 修订号 |
| Updated | 修订创建时间 |
| Status | 修订状态（当前生效的修订为 `deployed`） |
| Chart | 该修订使用的 Chart |
| Description | 该修订的描述 |
| 操作 | **回滚到此**：将该 Release 回滚到这一修订（当前 `deployed` 修订的按钮为禁用状态） |

<!-- screenshot-todo: 修订历史表格（含行首复选框与"对比"按钮、每行"回滚到此"操作） -->

对比两个修订的差异：

1. 勾选行首复选框，选中两个或多个修订（多选时，对比的是所选范围内最早与最新的两个修订）；
2. 表格下方出现 **对比 (N)** 按钮，点击打开"Revision 对比"窗口；
3. 窗口上方可分别调整要对比的 **Revision 1 / Revision 2**，下方提供两个标签页：
   - **Values**：两份修订的 values 差异；
   - **Manifest**：两份修订渲染出的 Kubernetes 资源清单差异。

<!-- screenshot-todo: Revision 对比窗口（Revision 1/2 选择器 + Values/Manifest 标签页的左右 diff 视图） -->

回滚操作的具体步骤见 [升级与回滚](./upgrade-rollback)。

### 查看 values / manifest / notes

详情页其余三个标签页均为只读查看（右上角提供 **复制** 按钮）：

| 标签页 | 内容 |
| --- | --- |
| Values | 当前修订的 values 配置（YAML） |
| Manifest | 当前修订实际渲染出的 Kubernetes 资源清单 |
| Notes | Chart 作者提供给用户的使用说明（如访问地址、默认账号等） |

::: tip 历史修订的 values 与 manifest
修订对比窗口内部按需加载所选修订的 values 与 manifest，因此即使是很久以前的修订，也可以查看和对比其完整配置。
:::

## 卸载 Release

1. 在 Release 详情页右上角点击 **卸载**；
2. 在弹出的 **卸载 Release** 确认对话框中核对 Release 名称与命名空间，并确认提示信息：*此操作将删除该 Release 管理的所有 Kubernetes 资源*；
3. 点击 **确认卸载**。

<!-- screenshot-todo: 卸载确认对话框（含 Release 名称/命名空间告警与"确认卸载"按钮） -->

卸载确认框中没有额外的勾选项：Helm 3 的卸载默认会同时删除 Release 记录与其修订历史（等价于旧版 Helm 的 `--purge`），因此不存在"是否保留记录"的选择。

### 卸载后

- 点击确认后跳转到**操作事件**页，实时显示卸载进度与日志，直至完成；
- 卸载完成后，该 Release 从列表页消失；
- 卸载操作不可撤销，执行前请确认该应用不再需要，或已做好数据备份。

::: warning 卸载影响范围
卸载会删除该 Release 管理的全部 Kubernetes 资源（Deployment、Service、ConfigMap 等），但不会删除由外部（非 Helm 管理）创建的资源。若希望保留 Release 记录以便追溯，可在集群上直接使用 `helm uninstall --keep-history` 命令行方式操作。
:::

安装、升级、回滚、卸载等长任务都会在 [操作事件](./events) 页面记录执行过程，可随时查看。