---
description: Kuboard 工作负载 - DaemonSet（守护进程集）：适用场景、入口位置、列表页（Ready/Current/Updated/Available/NodeSelector 列）、创建表单（基本信息/守护进程集/容器组模板）、编辑（标签选择器、更新策略 RollingUpdate 的 maxUnavailable 经 YAML 调整）、详情页（容器组与事件）、删除与常见操作（调整镜像版本、重启、日志/终端、CI/CD 集成）
---

# DaemonSet 守护进程集

本文介绍如何在 Kuboard 中管理 DaemonSet（守护进程集，`apps/v1`）。DaemonSet 是 Kubernetes 内置的**节点级**工作负载控制器：它在集群中**符合条件的每一个节点上各运行一个容器组副本**，因此非常适合运行日志收集、监控采集等需要"每台机器一份"的基础设施组件。

::: tip DaemonSet 的典型适用场景
DaemonSet 确保在集群中所有（或按条件选中的）节点上，各调度并运行一个 Pod 副本，适用于：

- **日志收集 Agent**：在每个节点上运行 Filebeat、Fluentd 等，收集该节点及容器日志；
- **监控 Agent**：在每个节点上运行 node-exporter、Prometheus agent 等采集节点指标；
- **节点级基础设施**：网络代理（如 kube-proxy）、存储驱动、安全 Agent 等需要与节点"一对一"部署的组件。

如果一个组件**每个节点只需要跑一个**，请优先考虑 DaemonSet；而如果应用是**无状态、副本可以互相替换**的，请使用 [Deployment](./deployments)；如果副本需要**稳定身份与持久化数据**，请使用 [StatefulSet](./statefulsets)。
:::

与 Deployment / StatefulSet 需要显式指定副本数（`spec.replicas`）不同，DaemonSet **不设副本数**——它的"期望副本数"由**符合调度条件的节点数量**决定，这一数量反映在集群状态 `status.desiredNumberScheduled` 中。

## 入口位置

DaemonSet 列表页位于**左侧导航 → 工作负载 → 守护进程集**：

1. 登录 Kuboard 后，在左侧导航点击 **工作负载**；
2. 点击 **守护进程集**（菜单配置中为 `apps/daemonsets`，`namespaced: true`），进入列表页；
3. 列表页按名称空间展示集群中的全部 DaemonSet，支持按集群 / 名称空间筛选。

::: tip 导航中的其他工作负载
工作负载导航中还包含 [部署](./deployments)、[有状态副本集](./statefulsets)、[自动伸缩](./hpa)、[任务 / 定时任务](./jobs-cronjobs)、[容器组](./pods) 等入口，操作方式与本页类似。
:::

## 列表页

DaemonSet 列表页复用 Kuboard 的通用资源列表组件（`K8sObjectList`，`api-group="apps"`、`resource="daemonsets"`、`namespaced`），并以"异常负载优先"方式展示，操作列宽 320。

列表页除通用列（集群 / 名称空间 / 名称 / 创建时间）外，额外定义了以下状态列：

| 列 | 读取字段 | 说明 |
| --- | --- | --- |
| Ready | `status.numberReady` / `status.desiredNumberScheduled` | 以 `就绪副本数 / 期望副本数` 展示（如 `2/2`），颜色随健康状态变化，见下表 |
| Current | `status.currentNumberScheduled` | 当前已被调度到节点的副本数 |
| Updated | `status.updatedNumberScheduled` | 已更新到最新模板版本的副本数 |
| Available | `status.numberAvailable` | 可用（Ready 且在 `minReadySeconds` 后仍健康）的副本数 |
| NodeSelector | `spec.template.spec.nodeSelector` | 该 DaemonSet 的容器组在各节点上的调度选择条件，以 `key=value` 逗号分隔展示 |

**Ready 列**的颜色规则如下（读取 `status.numberReady` 与 `status.desiredNumberScheduled` 比较）：

| 条件 | 颜色 | 含义 |
| --- | --- | --- |
| `numberReady == desiredNumberScheduled` | 绿色 | 全部节点上的副本就绪 |
| `numberReady == 0` | 红色 | 没有一个副本就绪 |
| `desiredNumberScheduled == 0` | 黄色 | 没有符合条件的节点（期望副本数为 0，如选择器未匹配到任何节点） |
| 其余情况 | 默认色 | 部分就绪，正在收敛 |

### 表头操作

| 按钮 | 说明 |
| --- | --- |
| 创建（+） | 弹出"创建方式"对话框：**从表单创建** / **从 YAML 创建**，见下文"创建 DaemonSet" |
| 批量删除 | 删除勾选的条目；分别统计"Kubernetes 集群中的条目"与"缓存中的条目"，可分开处理 |
| 批量重启 | 对勾选的 DaemonSet 批量执行重启（见"常见操作 - 重启"），勾选为空时不可用 |

::: tip 创建方式
点击创建后，Kuboard 会先让您选择一个集群与名称空间，再选择**从表单创建**或**从 YAML 创建**。DaemonSet 同时具备表单创建与 YAML 创建的能力（菜单配置 `hasCreatePage: true`），表单创建默认被选中。
:::

### 行内操作

| 按钮 | 说明 |
| --- | --- |
| 日志/终端 | 弹出容器选择框，可**追踪日志**、**下载日志**、打开 **bash / sh / cmd / powershell** 终端、打开**文件浏览器**（需 `pods/exec`、`pods/log` 权限） |
| 编辑 | 进入编辑页（需 `apps/daemonsets` 的 `update` 权限） |
| YAML | 以对话框查看该对象的 YAML（需 `get` 权限） |
| 删除 | 删除该 DaemonSet（需 `delete` 权限），删除确认时需填写对象名称 |

## 创建 DaemonSet

### 入口与保存流程

点击列表页右上角的 **创建** 按钮，依次选定集群 / 名称空间、选择**从表单创建**后进入创建页。创建页以表单形式组装 `apps/v1` 的 DaemonSet 对象，表单分为三个页签：

1. **基本信息**：名称、标签、注解；
2. **守护进程集**：标签选择器；
3. **容器组模板**：容器组基本信息、容器、卷、容器组设置。

点击 **保存** 后，Kuboard 会先执行整个表单的逐页签校验（校验不通过时提示"请检查所有标签页中的表单是否正确"，并自动切换到出错的页签），通过后弹出 **预览 YAML** 对话框展示将要提交的完整对象，确认后提交到 apiServer。

::: tip DaemonSet 默认的"空表单"结构
创建时，Kuboard 预置了 `apiVersion: apps/v1`、`kind: DaemonSet`，以及空的 `spec.selector.matchLabels` 与空的 `spec.template.spec.containers`。与 Deployment / StatefulSet 不同，创建页中**没有** `spec.replicas` 字段——DaemonSet 的副本数由满足调度条件的节点数量决定。
:::

### 基本信息

| 字段 | 对应字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 必填，名称空间内不能重名，按 RFC 命名规则实时校验（`EditName`）；输入时会自动写入 `app=<名>` 标签 |
| 名称空间 | `metadata.namespace` | 创建所在名称空间，只读展示 |
| 标签 | `metadata.labels` | 键值对；可随"标签同步"选项同步到选择器与容器组模板 |
| 注解 | `metadata.annotations` | 键值对，可选 |

### 守护进程

该页签（标签为"守护进程集"）实际只包含**标签选择器**一个区域。它对应 `spec.selector.matchLabels`——匹配此标签选择器的容器组都会被视为由本 DaemonSet 管理，并提供两个同步开关：

- **始终与 `.metadata.labels` 保持一致**：修改标签选择器时同步更新 `metadata.labels`（`keepSelectorLabelSyncWithMetadata`）；
- **同步修改 `.spec.template.metadata.labels`**：修改选择器时同步更新容器组模板标签（`keepSelectorLabelSyncWithTemplateMetadata`）。

::: warning DaemonSet 专有字段不在可视化表单中
Kuboard 的 DaemonSet 可视化表单仅覆盖 **标签选择器** 与 **容器组模板**。DaemonSet 以下专有字段**不在可视化表单中**，需要在创建 / 编辑保存前的**预览 YAML / 对比 YAML 对话框**中补充或调整：

- `minReadySeconds`：新容器组就绪后需保持健康的秒数，才被视为可用（避免刚启动不稳定就被当成可用）；
- `revisionHistoryLimit`：保留的旧控制器历史 revision 数量，默认为 10；
- `updateStrategy`: `RollingUpdate`（默认，滚动更新，可设置 `rollingUpdate.maxUnavailable`）或 `OnDelete`（仅手动删除容器组后重建，用于灰度发布）。

完整示例见下文"完整 manifest 示例"。
:::

### 容器组模板

容器组模板（`spec.template`）与 Deployment / StatefulSet 完全一致，在 **容器组模板** 页签中配置，左侧子页签为：

| 子页签 | 说明 |
| --- | --- |
| 基本信息 | 容器组注解、标签（建议保持与 `.spec.selector.matchLabels` 一致） |
| 容器 | 工作容器与初始化容器的镜像、端口、环境变量、探针、资源限制等 |
| 卷 | 容器组挂载的卷（含 PVC、ConfigMap、Secret 等类型） |
| 容器组设置 | 调度策略（含 **nodeSelector** / 节点亲和）、DNS 策略、hostNetwork 等高级设置 |

::: tip nodeSelector / tolerations 决定 DaemonSet 在各节点运行
DaemonSet 在没有 `nodeSelector` 时会在**所有可调度节点**上运行；使用 `nodeSelector`（或节点亲和）即可把副本限定在**具有特定标签的节点**上。列表页的 **NodeSelector** 列即读取 `spec.template.spec.nodeSelector`。如需在带 taint 的节点上运行，还需在容器组设置中配置对应的 **容忍度（Toleration）**。
:::

保存前校验：容器与卷页签中的表单校验不通过时，会自动切换到对应页签并提示错误。

### 完整 manifest 示例

以可视化表单生成的对象为基础，补充 DaemonSet 专有字段（更新策略与 `minReadySeconds` / `revisionHistoryLimit`，以及 `nodeSelector`）后的完整对象如下（供在 YAML 对话框中参考）：

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: default
  labels:
    app: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  # 仅在三类特定标签的节点上运行（否则会在所有可调度节点上运行）
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      # nodeSelector：只调度到带有 job=monitor 标签的节点
      nodeSelector:
        job: monitor
      containers:
        - name: exporter
          image: prom/node-exporter:latest
      tolerations:
        # taint 容忍：允许调度到 control-plane 等具有 taint 的节点
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
  # DaemonSet 专有字段（需在 YAML 对话框中补充）
  minReadySeconds: 10
  revisionHistoryLimit: 10
  updateStrategy:
    # RollingUpdate：滚动更新，逐节点替换；OnDelete：仅在容器组删除后重建（可做灰度）
    type: RollingUpdate
    rollingUpdate:
      # 同时最多有多少节点上的 Pod 不可用（可为整数或百分比）
      maxUnavailable: 1
```

## 编辑

在列表页点击某一行 DaemonSet 的 **编辑** 按钮，或在详情页点击 **编辑**，进入编辑页。编辑页表单结构与创建页相同（基本信息 / 守护进程 / 容器组模板），区别在于：

- **名称**只读展示，不可修改；
- 页面顶部显示当前对象的 **ResourceVersion**（供与集群中的最新版本比对）；
- 保存时弹出 **对比 YAML** 对话框：左侧为当前集群中的原对象、右侧为修改后的对象，确认后提交。

可修改的内容：标签、注解、标签选择器，以及容器组模板（容器镜像、环境变量、卷等）。DaemonSet 专有字段（`updateStrategy`、`maxUnavailable`、`minReadySeconds`、`revisionHistoryLimit` 等）请在保存前的对比 YAML 对话框中调整。

::: warning 修改容器组模板将触发滚动更新
DaemonSet 采用 `RollingUpdate` 策略时，修改 `spec.template`（如镜像版本、环境变量）后，控制器会按 `updateStrategy` 定义逐节点滚动替换容器组；`maxUnavailable` 用于限制更新期间最多不可用的节点数量。若配置为 `OnDelete`，则只在新节点上创建/删除容器组，未删除的容器组保持旧版本——可用于**逐节点灰度升级**，验证通过后再删除下一批容器组。

Kuboard 的可视化表单未暴露 `updateStrategy`，请通过编辑页面中的 YAML 对话框调整。
:::

## 详情页

点击列表页中的 DaemonSet 名称进入详情页。详情页结构如下：

1. **页头元信息**：对象的基础信息（名称、名称空间、集群、标签、注解等），以及**事件**卡片（与该 DaemonSet 相关的最近事件，实时刷新）；
2. **操作按钮**：见下文；
3. **容器组区域**：左侧为该 DaemonSet 管理的容器组列表，右侧为选中容器组的详细信息。

详情页通过 SSE（Server-Sent Events）实时监听 **DaemonSet / Event / Pod** 三类主题，任何变化都会自动刷新。

### 详情页操作按钮

| 按钮 | 说明 |
| --- | --- |
| 调整镜像版本 | 批量修改容器 / 初始化容器的镜像版本标签，见下文"常见操作" |
| 重启 | 以 DaemonSet 定义的更新策略执行重启 |
| 编辑 | 进入编辑页（需 `update` 权限） |
| YAML | 以对话框查看 / 编辑该对象的 YAML（需 `get` 权限） |
| 删除 | 删除该 DaemonSet（需 `update` 权限） |
| 更多（下拉） | **CI/CD 集成** 以及各扩展点注册的菜单项 |

### 容器组区域

容器组区域列出 owner 为该 DaemonSet（按 `metadata.ownerReferences` 的 uid 匹配）的全部容器组，列表随集群事件（SSE，`Pod`）实时刷新：

- 每个容器组卡片显示 **Ready / Not Ready** 状态、名称、创建时间、容器组 IP 与节点 IP；
- 悬停后可对单个容器组执行**删除**、**查看 YAML** 等操作；
- 点击选中后，右侧显示该容器组的详细信息。

由于 DaemonSet 的副本分布在满足调度条件的各个节点上，容器组列表中通常会看到**多个节点上的容器组**同时被列出，方便逐一巡检。

## 删除

删除 DaemonSet 的入口有两个：

- **列表页**：勾选后点击**批量删除**，或点击行内 **删除** 按钮；
- **详情页**：点击 **删除** 按钮。

删除时按 Kuboard 全局删除确认流程操作（需在确认框中输入对象名称）。批量删除时，Kuboard 会区分"Kubernetes 集群中的条目"与"缓存中的条目"（已从集群删除、仅剩缓存记录的条目），可分别删除。

::: warning DaemonSet 用于清理节点组件时，请谨慎删除
DaemonSet 通常管理节点的 Agent 类组件。删除 DaemonSet 前请确认是否需要同时移除各节点上的对应组件与（如有）其持久化数据；删除后，该 DaemonSet 管理的容器组不会被重新创建，集群中相应节点的对应能力随之消失，请务必确认删除范围。
:::

## 常见操作

### 调整镜像版本

在详情页点击 **调整镜像版本**，弹出对话框列出该 DaemonSet 的全部**工作容器**与**初始化容器**，表格中包含：容器类型、名称、镜像、当前版本、新版本。

修改一个或多个容器的版本标签后点击确定，Kuboard 以 **JSON Patch**（`application/json-patch+json`）方式替换 `/spec/template/spec/{containers|initContainers}/{index}/image`，从而触发按 `updateStrategy` 的滚动更新，需要 `apps/daemonsets` 的 `update` 权限以及 kuboard 级 `cd.kuboard.cn/update-image-tag` 权限。

```json
// 调整镜像版本提交的 JSON Patch（示意）
[
  { "op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "node-exporter:1.6.0" }
]
```

### 重启

重启不会重建 DaemonSet 对象，而是向其 `spec.template.metadata.annotations` 写入当前时间戳（`kubectl.kubernetes.io/restartedAt`），触发控制器按更新策略逐个替换容器组。列表页的**批量重启**与详情页的**重启**使用同一实现（`RestartWorkload`），并支持"不再显示此提示"。

```json
// 重启时提交的 strategic-merge patch（示意）
{
  "spec": {
    "template": { "metadata": { "annotations": { "kubectl.kubernetes.io/restartedAt": "2026-09-19T10:00:00Z" } } }
  }
}
```

### 日志与终端

在列表页点击行内 **日志/终端**，选择容器组与容器后可以：

- **追踪日志**（新窗口打开日志页）；
- **下载日志**；
- 打开 **bash / sh / cmd / powershell** 终端；
- 打开**文件浏览器**查看容器文件系统。

需要 `pods/log`（日志）与 `pods/exec`（终端 / 文件浏览器）权限。

### CI/CD 集成

::: warning 当前版本暂不可用
详情页 **更多 → CI/CD 集成** 菜单项在当前版本中为置灰状态（`disabled`），暂时无法使用。需要在 CI/CD 流水线中更新镜像版本或重启 DaemonSet 时，请手动构造请求，可参考上文"调整镜像版本""重启"的操作结果，或用其他工作负载（Deployment / StatefulSet）的 CI/CD 集成脚本。

后端接口为 `/api/cd.kuboard.cn/v4/update-image-tag` 与 `/api/cd.kuboard.cn/v4/restart-workload`，请求头需携带 `Kb-Access-Key: <key>.<secret>`。
:::

## 相关页面

- [Deployment（部署）](./deployments)：无状态控制器，显式指定副本数
- [StatefulSet（有状态副本集）](./statefulsets)：有状态控制器，稳定的 Pod 网络标识与存储
- [容器组（Pod）](./pods)：DaemonSet 管理的最小调度单元
- [导入 Kubernetes 集群](../cluster/import)：在 Kuboard 中接入集群后即可管理工作负载

