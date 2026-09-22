---
description: 为 Deployment / StatefulSet 启用水平自动伸缩（HPA）、配置 CPU / 内存指标、查看伸缩条件与事件、autoscaling v1/v2 表单差异与高级配置
---

# 水平自动伸缩（HPA）

本页说明如何在 Kuboard 中为工作负载启用水平自动伸缩（HPA），配置 CPU / 内存指标，并查看伸缩条件与事件。

HPA 周期采集工作负载的 CPU、内存等指标，在**最小副本数**与**最大副本数**之间自动调整副本数：业务高峰时扩容、低谷时缩容。**适用对象**：集群运维与应用 owner。

::: tip 前提条件
集群需安装 **metrics-server**（metrics.k8s.io）提供资源指标；未安装时摘要卡会提示「请确保该集群已经安装了 metrics-server」，此时无法基于指标自动伸缩。
:::

## 入口位置

HPA 的管理入口有两个：

1. **自动伸缩列表页**：左侧导航 **工作负载 → 自动伸缩**（Pod Auto Scalers），按名称空间查看全部 HPA，四列：Reference（被伸缩的工作负载，点击跳转对应详情页）、最小副本数、最大副本数、当前副本数；
2. **工作负载详情页伸缩面板**：Deployment / StatefulSet 详情页点击 **伸缩**，弹出面板，右侧是 **HPA 摘要**卡片（左侧为手动伸缩卡片）。

HPA 没有独立的创建页 / 编辑页 / 详情页，创建与编辑统一在工作负载详情页的伸缩面板中完成，Kuboard 会自动带上被伸缩工作负载的类型与名称。同时假设 HPA 名称与工作负载名称相同；若未找到同名 HPA，摘要卡只提供 **启用自动伸缩** 一个按钮。

## 启用自动伸缩

1. 进入 Deployment / StatefulSet 详情页，点击页头的 **伸缩** 按钮。
2. 在右侧 **HPA 摘要**卡中点击 **启用自动伸缩**，确认默认值后提交：最小副本数 `1`、最大副本数 `2`（autoscaling/v1 集群还默认 60% 的目标 CPU 利用率）。

创建成功后摘要卡自动刷新，接下来切换到编辑模式配置伸缩规格与指标。

## 编辑规格与指标

### 自动探测 HPA 版本

Kuboard 会自动探测集群 `autoscaling` 组的首选版本，并据此渲染不同表单：

| 探测结果 | 表单能力 |
| --- | --- |
| autoscaling/v1 | 单指标：最小 / 最大副本数 + 目标 CPU 利用率（1 ~ 100，步进 10，单位 %） |
| autoscaling/v2 | 多指标：最小 / 最大副本数 + CPU / 内存指标 |

### v2 指标编辑

v2 表单中 CPU / 内存各占一行，点击行内编辑按钮进入编辑状态：

| 目标类型 | 含义 | 可用资源 |
| --- | --- | --- |
| 平均利用率（Utilization） | 按资源请求量的平均利用率设目标，1 ~ 100（%） | 仅 CPU |
| 平均值（AverageValue） | 按每个副本的平均绝对值设目标（Quantity 格式） | CPU、内存 |

- CPU 平均值示例：`100m` 或 `2`（核）；内存平均值示例：`200Mi` 或 `1G`；默认目标类型 CPU 为 **平均利用率**、内存为 **平均值**；
- 目标值提交前会做格式校验，不合法时无法保存；行内 **✕** 按钮可移除该指标。

v2 完整对象示例（表单只生成 CPU / 内存指标；多指标、Object / Pods 自定义指标与扩缩容行为等高级字段，通过摘要卡 **YAML** 编辑完整对象维护）：

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web
  namespace: default
spec:
  minReplicas: 1
  maxReplicas: 5
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
    - type: Resource
      resource:
        name: memory
        target:
          type: AverageValue
          averageValue: 200Mi
```

## 条件与事件

| 条件 | 中文 | 说明 |
| --- | --- | --- |
| AbleToScale | 能够伸缩 | 控制器能否读取并调整目标工作负载的副本数 |
| ScalingActive | 激活伸缩 | 是否已采集到指标并处于活动状态（`False` 常见于未安装 metrics-server） |
| ScalingLimited | 范围合适 | 期望副本数是否超出最小 / 最大副本数范围 |

ScalingLimited 为 True 时会提示期望副本数超出范围；若最小副本数设置为 1，可忽略此提示。摘要卡底部还会展示与该 HPA 相关的 Kubernetes **事件**，用于排查扩缩容异常。

## 摘要卡操作

| 操作 | 说明 |
| --- | --- |
| YAML | 以对话框打开该 HPA 的完整对象（可编辑），保存后自动刷新摘要；是配置高级能力（自定义指标、扩缩容行为）的入口 |
| 取消自动伸缩 | 删除该 HPA，需输入对象名称确认；删除后如需恢复，按上面步骤重新启用即可 |
| 刷新 | 重新拉取 HPA 对象、条件与事件 |

## v1 与 v2 差异对比

| 维度 | autoscaling/v1 | autoscaling/v2 |
| --- | --- | --- |
| 指标数量 | 单个（目标 CPU 利用率） | 多指标（任一指标超限即扩容） |
| 指标类型 | 仅 CPU 资源利用率 | Resource / Object / Pods，均可设利用率或平均值目标 |
| 内存指标 | 不支持 | 支持（平均值，Quantity 格式） |
| 扩缩容行为 | 无 | spec.behavior（稳定窗口、步进限制等） |
| Kuboard 表单 | 最小 / 最大副本数 + 目标 CPU 利用率 | 最小 / 最大副本数 + CPU / 内存指标 |

## 相关页面

- [Deployment（部署）](./deployments)：无状态应用的伸缩面板入口
- [StatefulSet（有状态副本集）](./statefulsets)：有状态应用的伸缩面板入口
- [容器组（Pod）](./pods)：被 HPA 伸缩的最小调度单元
- [任务 / 定时任务](./jobs-cronjobs)：批处理工作负载，不支持 HPA 关联

<!-- screenshot-todo: 配图建议：Deployment 详情页 → 伸缩面板 → HPA 摘要卡（含指标与条件），以及工作负载 → 自动伸缩列表页 -->