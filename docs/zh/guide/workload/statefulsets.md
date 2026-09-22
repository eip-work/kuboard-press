---
description: "Kuboard 工作负载 - StatefulSet（有状态副本集）：入口、列表页、创建（含专有字段 YAML 补充）、编辑、详情页、扩缩容、删除与常见操作（调整镜像版本、重启、日志终端、CI/CD 集成）"
---

# StatefulSet 有状态副本集

本文介绍如何在 Kuboard 中创建、查看、伸缩和删除 StatefulSet（有状态副本集），并完成调整镜像版本、重启、查看日志等常见操作。StatefulSet（`apps/v1`）是 Kubernetes 的**有状态应用**控制器，为每个副本提供稳定的网络标识与存储，适合运行数据库、消息队列、分布式缓存等需要"身份"的应用。

::: tip StatefulSet 的典型适用场景
- **稳定的网络标识**：每个 Pod 获得稳定的序号与主机名（如 `web-0`、`web-1`），Pod 重建后序号不变；
- **稳定的存储**：每个副本与各自的持久化卷一一绑定，Pod 调度到其他节点后仍能挂载同一份数据；
- **有序部署与缩容**：默认按序号从 `0` 开始逐个创建 / 删除副本。

无状态应用（任意副本可相互替换）请优先使用 [Deployment](./deployments)；只有需要持久化数据或固定身份时才用 StatefulSet。
:::

## 入口位置

1. 在左侧导航点击 **工作负载**；
2. 点击 **有状态副本集**，进入列表页；列表页按名称空间展示集群中的全部 StatefulSet，可按集群 / 名称空间筛选。

工作负载导航中还包含 [部署](./deployments)、守护进程集（DaemonSet）、[任务 / 定时任务](./jobs-cronjobs)、[容器组](./pods) 等入口，操作方式与本页类似。

## 列表页

列表页以"异常负载优先"方式展示，并额外提供**就绪副本**列：

| 列 | 说明 |
| --- | --- |
| 选择框 | 勾选后可用于**批量重启**、**批量删除** |
| 集群 / 名称空间 | StatefulSet 所在位置 |
| 名称 | 点击进入详情页 |
| 就绪副本 | 以 `就绪副本数 / 期望副本数` 展示（如 `3/3`），颜色随健康状态变化 |
| 创建时间 | 相对时间显示，可排序 |
| 操作 | 单行操作按钮（日志/终端、编辑、YAML、删除） |

就绪副本颜色规则：就绪数 == 期望数时绿色（全部就绪）；就绪数 == 0 时红色（均未就绪）；期望数 == 0 时黄色（暂停状态）；其余默认色（部分就绪，正在收敛）。

### 表头与行内操作

| 按钮 | 位置 | 说明 |
| --- | --- | --- |
| 创建（+） | 表头 | 在当前集群 / 名称空间创建 StatefulSet |
| 批量删除 | 表头 | 删除勾选的条目；分别统计"Kubernetes 集群中的条目"与"缓存中的条目"，可分开处理 |
| 批量重启 | 表头 | 对勾选的 StatefulSet 批量执行重启 |
| 日志/终端 | 行内 | 弹出容器组 / 容器选择框，可**追踪日志**、**下载日志**、打开 **bash / sh / cmd / powershell** 终端、打开**文件浏览器**（需 `pods/exec`、`pods/log` 权限） |
| 编辑 | 行内 | 进入编辑页（需 `apps/statefulsets` 的 `update` 权限） |
| YAML | 行内 | 对话框查看 / 编辑该对象 YAML（需 `get` 权限） |
| 删除 | 行内 | 删除该 StatefulSet（需 `delete` 权限），确认时需填写对象名称 |

## 创建 StatefulSet

点击列表页右上角的 **创建** 按钮进入创建页。表单分为三个页签：

1. **基本信息**：名称、标签、注解；
2. **有状态副本**：标签选择器、副本数；
3. **容器组模板**：容器组基本信息、容器、卷、容器组设置。

点击 **保存** 后弹出 **预览 YAML** 对话框展示完整对象，确认后提交到集群。

### 基本信息

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，名称空间内不能重名 |
| 名称空间 | 创建时所在名称空间，只读展示 |
| 标签 | 键值对；输入名称时自动写入 `app=<名称>` 标签 |
| 注解 | 键值对，可选 |

标签区域提供两个同步选项：**同步修改标签选择器**（改 `metadata.labels` 时同步更新 `.spec.selector.matchLabels`）、**同步容器组模板标签**（改选择器时同步更新 `.spec.template.metadata.labels`）。

标签选择器编辑入口位于**有状态副本**页签顶部的"标签选择器"区域；选择器一旦设置后期变更需谨慎，它决定了哪些容器组被此控制器管理。

### 有状态副本

| 字段 | 说明 |
| --- | --- |
| 标签选择器 | 匹配此选择器的容器组都被认为由本 StatefulSet 管理；提供与标签、容器组模板标签的同步开关 |
| 副本数 | 期望副本数（最小 0）；创建表单默认值为 1 |

::: warning StatefulSet 专有字段请通过 YAML 补充
创建 / 编辑 StatefulSet 时，以下字段**不在可视化表单中**，需要在保存前的 **YAML 对话框中补充**：

- `serviceName`：为该 StatefulSet 提供稳定网络标识的 Headless Service 名称；
- `podManagementPolicy`：`OrderedReady`（默认，按序号顺序创建 / 删除）或 `Parallel`（并行创建 / 删除，适用于不依赖顺序的应用）；
- `updateStrategy.rollingUpdate.partition`：滚动更新分区，序号小于 `partition` 的副本保持旧版本；
- `volumeClaimTemplates`：按副本序号生成 PVC 的卷模板（每个副本绑定独立的持久化卷）。
:::

### 容器组模板

容器组模板与 Deployment 完全一致，左侧子页签：

| 子页签 | 说明 |
| --- | --- |
| 基本信息 | 容器组注解、标签（建议保持与标签选择器一致） |
| 容器 | 工作容器与初始化容器的镜像、端口、环境变量、探针、资源限制等 |
| 卷 | 容器组挂载的卷（含 PVC、ConfigMap、Secret 等类型） |
| 容器组设置 | 调度策略、DNS 策略、hostNetwork 等高级设置 |

保存前校验：容器与卷页签校验不通过时，会自动切换到对应页签并提示错误。

### 完整 manifest 示例

以可视化表单生成的对象为基础，补充专有字段后的完整对象（供在 YAML 对话框中参考）：

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  serviceName: web
  podManagementPolicy: OrderedReady
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      # 序号 < partition 的副本保持旧版本，用于灰度发布
      partition: 0
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25
```

::: tip 灰度发布思路（partition）
将 `partition` 设置为 `N` 并更新容器组模板后，序号 `>= N` 的副本滚动升级，序号 `< N` 的副本保持旧版本。验证新版本稳定后，再把 `partition` 逐步调小（最终为 0），即可完成灰度发布。
:::

## 编辑

在列表页点击行内 **编辑**，或在详情页点击 **编辑**，进入编辑页。表单结构与创建页相同（三个页签），区别：**名称**只读展示不可修改；页面顶部显示当前对象的 **ResourceVersion**（供与集群中最新版本比对）；保存时弹出 **对比 YAML** 对话框（左侧为集群中的原对象、右侧为修改后的对象），确认后提交。

可修改内容与创建页一致：标签、注解、标签选择器、副本数、容器组模板；专有字段（`serviceName`、`podManagementPolicy`、`updateStrategy`、`volumeClaimTemplates` 等）请在保存前的 YAML 对比对话框中调整。采用 `RollingUpdate` 策略时，修改容器组模板（如镜像版本）会触发控制器按更新策略逐个滚动替换副本；若配置了 `partition`，序号小于 `partition` 的副本不被更新。

## 详情页

点击列表页中的 StatefulSet 名称进入详情页。页面包含：**页头元信息**与**事件**卡片（最近事件，实时刷新）、**操作按钮**、**容器组区域**（左侧为容器组列表，右侧为选中容器组的详情）。

| 操作按钮 | 说明 |
| --- | --- |
| 伸缩（− / 就绪数 / +） | 手动扩缩容，见下文"扩缩容" |
| 调整镜像版本 | 批量修改容器 / 初始化容器的镜像版本标签 |
| 重启 | 以 StatefulSet 定义的更新策略执行重启 |
| 编辑 / YAML / 删除 | 与列表页行内操作一致 |
| 更多（下拉） | **CI/CD 集成** 以及各扩展点注册的菜单项 |

容器组区域列出该 StatefulSet 管理的全部容器组，随集群事件实时刷新：每个容器组卡片显示 **Ready / Not Ready / Completed** 状态、名称、创建时间、容器组 IP、节点 IP；悬停可对单个容器组 **删除**、**查看 YAML**；点击选中后右侧显示其详细信息。

## 扩缩容

在详情页点击伸缩按钮（中间数字显示 `就绪副本数 / 期望副本数`，红色异常、黄色收敛中、绿色就绪），弹出伸缩面板：

- **手动伸缩**：输入目标副本数（最小 0），点击确定；
- **副本数指标**：期望副本数、就绪副本数及就绪率环形进度条；
- **HPA 摘要**：若被 HorizontalPodAutoscaler（HPA）关联，同步展示其伸缩目标与当前指标。

按钮两侧的 **−** / **+** 可直接对当前副本数执行减 1 / 加 1；该操作需要 `apps/statefulsets/scale` 的 `update` 权限。

::: tip 缩容到 0 不会删除数据
缩容只减少副本（并回收对应序号），**不会删除** `volumeClaimTemplates` 生成的 PVC；再次扩容时，原序号的副本会重新挂载原有数据卷。如需同时删除 PVC，请到"存储"中手动删除。
:::

## 删除

删除入口：列表页（勾选后点击**批量删除**，或点击行内 **删除**）与详情页（**删除** 按钮）。删除时需在确认框中输入对象名称；批量删除时，Kuboard 区分"Kubernetes 集群中的条目"与"缓存中的条目"（仅剩缓存记录），可分别删除。

::: warning 删除 StatefulSet 的影响
删除 StatefulSet 时会级联删除其管理的容器组，但 `volumeClaimTemplates` 生成的 PVC **不会**随之删除（PVC 用于保留数据）。若需彻底清理，请再手动删除对应的 PVC。
:::

## 常见操作

### 调整镜像版本

详情页点击 **调整镜像版本**，对话框中列出全部**工作容器**与**初始化容器**：

| 列 | 说明 |
| --- | --- |
| 容器类型 | 工作容器 / 初始化容器 |
| 名称 | 容器名 |
| 镜像 | 镜像仓库地址（不含版本标签） |
| 当前版本 | 当前镜像的版本标签 |
| 新版本 | 输入新版本标签 |

修改一个或多个容器的版本标签后点击确定，Kuboard 替换对应容器的镜像并触发滚动更新。需 `apps/statefulsets` 的 `update` 权限。

### 重启

重启不会重建 StatefulSet 对象，而是向其容器组模板写入一个当前时间戳注解，触发控制器按更新策略逐个替换容器组；列表页**批量重启**与详情页**重启**使用同一功能，并支持"不再显示此提示"。

### 日志与终端

列表页点击行内 **日志/终端**，选择容器组与容器后可以：**追踪日志**（新窗口）、**下载日志**、打开 **bash / sh / cmd / powershell** 终端、打开**文件浏览器**查看容器文件系统。需 `pods/log`（日志）与 `pods/exec`（终端 / 文件浏览器）权限。

### CI/CD 集成

详情页点击 **更多 → CI/CD 集成**，选择 AccessKey 后获得两类 `curl` 脚本（可直接用于流水线）：**更新镜像版本**（将 StatefulSet 的所有容器镜像更新到指定标签）与**重启 StatefulSet**。

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"statefulsets","namespace":"default","name":"web","images":{"nginx":"nginx:1.25"}}' \
  "https://<kuboard-host>/api/cd.kuboard.cn/v4/update-image-tag"
```

## 相关页面

- [Deployment（部署）](./deployments)：无状态应用控制器，与 StatefulSet 对比如上
- [容器组（Pod）](./pods)：StatefulSet 管理的最小调度单元
- [导入 Kubernetes 集群](../cluster/import)：在 Kuboard 中接入集群后即可管理工作负载

<!-- screenshot-todo: 配图建议：StatefulSet 列表页；创建页「有状态副本」页签（标签选择器 + 副本数） -->
