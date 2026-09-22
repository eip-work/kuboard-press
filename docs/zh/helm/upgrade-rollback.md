---
description: 升级（Upgrade）已安装的 Helm Release 到新 Chart 版本，或在出问题时回滚（Rollback）到历史 Revision：入口位置、目标版本与 values 调整、Dry-Run 试运行、回滚确认、升级 / 回滚都会生成新 Revision 的行为说明与注意事项
---

# 升级与回滚 Release

Helm 会把每次安装、升级、回滚都记录为一个 **Revision（修订版本）**。**升级（Upgrade）** 用新的 Chart 版本和 values 替换当前部署；**回滚（Rollback）** 把 Release 恢复到某个历史 Revision 的内容。两者都会生成新的 Revision，提交后统一在[操作进度](./events)页面跟踪执行结果。

本文面向「要把已安装的 Release 升到新版本、或出问题要退回去」的用户。Revision 的查看与对比见 [Release 列表与修订历史](./releases)。

## 升级 Release

### 入口

| 入口 | 位置 | 操作 |
| --- | --- | --- |
| Release 列表页 | 应用管理 → Helm Release → Release 列表 | 目标行操作列点击 **升级** |
| Release 详情页 | 点击 Release 名称进入详情 | 右上角点击 **升级** |

进入后打开「升级 Release: <名称>」页面。

### 选择目标 Chart 版本

| 场景 | 表现 |
| --- | --- |
| Chart 来自仓库（名称形如 `仓库名/Chart 名`） | 版本为下拉框，列出该 Chart 全部可用版本（按版本号倒序），每项标注对应的 App 版本（appVersion），默认选中当前版本 |
| Chart 无仓库前缀 | 版本为输入框，手动填写目标版本号 |

::: tip
所选版本的 kubeVersion 约束（Chart 对 Kubernetes 版本的要求）与当前集群版本不匹配时，页面顶部会显示黄色兼容性警告，此时应换用兼容的版本再升级。
:::

### 调整 values

- **Values (YAML) 编辑器默认加载当前 Revision 的 values**，以现有配置为起点修改，不必从头重写；
- 编辑器是否提供**表单页签**取决于该 Chart 是否带 values schema（参数结构描述）：有 schema 时可在 **表单 / YAML** 两个页签间切换（表单按 schema 渲染字段，YAML 直接编辑代码，两侧实时同步），无 schema 时仅提供 YAML 编辑；
- 编辑方式与[安装 Release](./install)页面完全一致。

```yaml
# values 片段：在现有配置基础上修改
replicaCount: 3        # 调整副本数
image:
  repository: nginx
  tag: "1.27"          # 升级镜像版本
```

### 试运行（Dry-Run）与提交

表单下方为**选项**与**超时**：

| 项 | 默认 | 说明 |
| --- | --- | --- |
| 等待就绪 | 勾选 | 升级完成后等待 Release 就绪，再判定为成功 |
| Dry-Run 预览 | 不勾选 | 只预演、不落盘，验证新版本与 values 组合能否通过渲染校验 |
| 超时（秒） | 300 | 范围 30 ~ 3600，步长 30，作用于等待就绪 |

操作顺序：

1. 需要先验证时，勾选 **Dry-Run 预览** 后点击 **升级**：仅执行试运行，不真正改动 Release；
2. 确认无误后，取消勾选 **Dry-Run 预览**，再次点击 **升级** 正式提交；
3. 提交后自动跳转到[操作进度](./events)页面：可实时查看升级进度、资源状态与日志，过程中可点击 **取消操作**；完成后点击 **查看 Release** 回到详情页。

::: warning Dry-Run 失败时 values 的自动恢复
Dry-Run 试运行失败时，本次填写的 values 会保存在浏览器中（有效期 30 分钟）；再次进入升级页时自动回填，并提示「已从上一次 Dry-Run 恢复 values」，避免重输。注意：**只有 Dry-Run 失败才会保存**，正式升级失败不会保存，也不会影响 Release 现有配置。
:::

### 升级后

- Release 生成**新的 Revision**，详情页元信息中的 Revision 与更新时间随之更新；
- 升级结果可在详情页 **Revision History** 页签查看，并可与任意历史 Revision 对比（见[注意事项](#注意事项)）。

<!-- screenshot-todo: 升级页全貌（Chart 版本下拉 + 兼容性警告 + 选项/超时 + values 编辑器 + 升级按钮） -->

## 回滚 Release

### 入口

回滚入口在 **Release 详情页 → Revision History 页签**：

1. 在 Release 列表页点击 Release 名称进入详情页；
2. 打开 **Revision History** 页签，表格列出全部历史 Revision（Revision / 更新时间 / 状态 / Chart / 描述）；
3. 在目标 Revision 所在行点击 **回滚到此**（当前处于 deployed 状态的 Revision，该按钮置灰不可点）。

### 选择目标 Revision 并确认

点击后弹出回滚确认对话框：

| 项 | 说明 |
| --- | --- |
| 目标 Revision | 下拉框，预选刚点击的 Revision，可切换；选项显示 `Revision N - 状态 - 更新时间` |
| 等待就绪 | 默认开启，回滚完成后等待 Release 就绪 |
| 超时（秒） | 默认 300，范围 30 ~ 3600 |

确认信息无误后点击 **确认回滚**，自动跳转到[操作进度](./events)页面，可实时查看回滚进度或点击 **取消操作**。

::: tip
回滚不支持 Dry-Run 预演，提交即执行。不确定目标 Revision 内容时，请先在 Revision History 中通过「对比」确认（见[注意事项](#注意事项)）。
:::

### 回滚后

- **回滚本身也会生成一个新的 Revision**：Helm 不会删除或覆盖任何历史 Revision，而是把目标 Revision 的内容作为最新 Revision 重新部署；
- 详情页的 Revision 变为新值，Revision History 中新增一行，目标 Revision 及更早记录全部保留，可随时再次回滚到其中任何一步。

<!-- screenshot-todo: 回滚确认对话框（目标 Revision 下拉 + 等待就绪 + 超时 + 确认回滚按钮） -->

## 注意事项

**升级前先看 Diff 或确认 values**

1. 在详情页 **Revision History** 页签勾选两个 Revision（至少 2 个），点击 **对比** 打开 Revision 对比对话框；
2. 在 **Values / Manifest** 两个页签中查看差异（Manifest 为该 Revision 渲染出的完整资源清单），确认本次要变更的内容符合预期；
3. 对不确定的升级，先勾选 **Dry-Run 预览** 试运行验证，再正式提交。

**回滚的目标 Revision 行为**

- 回滚到目标 Revision，即把该 Revision 的 values 与 Manifest 作为新 Revision 重新部署，**回滚后生效的是目标 Revision 的内容**，与当前 Revision 的状态无关；
- 所有历史 Revision 均会保留，Revision History 中可随时再次回滚到任意一步。

**权限要求**（命名空间级 `helm.kuboard.cn`）

| 操作 | 所需权限 |
| --- | --- |
| 升级 | `releases/upgrade` 的 create |
| 回滚 | `releases/rollback` 的 create |
| 查看 Revision History | `releases` 的 get |

**相关页面**

- [Release 列表与修订历史](./releases)：Revision 查看、对比与详情
- [操作进度（事件）](./events)：升级 / 回滚的实时进度、日志与取消
- [安装 Helm Release](./install)：新装 Release 的完整流程
- [Chart 市场](./marketplace)：查找与浏览可用 Chart