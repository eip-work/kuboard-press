---
description: Kuboard MCP Server 全部 34 个工具的清单——按「读 / 写 / 审批」三类列出每个工具的名称、关键参数与用途，以及写入类工具必须经过的变更审批流程。
---

# Kuboard MCP 工具清单

Kuboard MCP Server 共提供 34 个工具，按用途分为读取、写入、变更审批三类。本页列出全部工具的名称、关键参数与用途，供智能体配置时对照。

**适用对象**：需要把 Kuboard 集群操作能力接入智能体（Agent）的运维 / 平台工程师。

::: tip 阅读约定
- 工具名保持英文原名（如 `list_clusters`），智能体调用时直接使用这些名字
- 参数标注 **必填** / （可选）；写入类工具大多带 `dryRun`（可选）参数，置为 `true` 时只校验不真正执行，可用于预览变更结果
- 本页是 [MCP 能力总览](./index) 中「MCP 提供的能力」的详细展开
:::

## 读 / 写 / 审批 三类工具

全部工具按**真实副作用**划分为三类：读取类只查不改；写入类会向集群发起持久化写操作；变更审批（Plan）类是写入类获得审批后执行的入口。

| 类别 | 数量 | 说明 | 是否需要审批 |
|---|---|---|---|
| 读取类 | 19 | 查询集群、工作负载、Pod、日志、指标等，不修改任何资源 | 不需要，调用即返回 |
| 写入类 | 10 | 创建 / 修改 / 删除 K8s 资源、重启与扩缩容、节点排水等 | **需要**，先走变更计划审批 |
| 变更审批（Plan） | 5 | 把待执行的写操作提交给你审批，审批通过后执行 | 审批流程本身 |

::: warning 写入类工具必须审批
开启「Agent 操作强制审批」后，10 个写入类工具对智能体**不可见、不可直接调用**。智能体必须通过变更计划流程执行：`create_plan` → `append_step_to_plan` → `finalize_plan` → 你在 Kuboard UI 审批 → `apply_plan(planId, approvalToken)`。详见 [变更审批流程](./approval-flow) 与 [危险操作与确认令牌](./danger-levels)。
:::

::: warning 危险度标记
写入类工具带危险度标记，审批时按标记区别对待：

- **MEDIUM**：`apply_k8s` / `patch_k8s` / `delete_k8s`
- **HIGH**：`delete_k8s_collection`（尤其是删除 PVC）、`drain_node`、`evict_pod`——审批时会被显著标记，请重点核对影响范围
:::

关闭「Agent 操作强制审批」时，变更审批（Plan）这 5 个工具会被隐藏，写入类工具恢复为智能体可直接调用。

## 工具一览（34 个）

下表按「读 / 写 / 审批」三类列出全部工具。参数只列关键的，配置智能体时以工具实际 schema 为准。

| 工具 | 类别 | 关键参数 | 用途 |
|---|---|---|---|
| `list_clusters` | 读 | 无 | 列出当前用户可访问的所有集群（id / name），会话第一步 |
| `list_namespaces` | 读 | `clusterId` | 列出指定集群的命名空间树 |
| `list_workloads` | 读 | `clusterId`、`namespace` | 列出 Deployment / StatefulSet / DaemonSet |
| `get_workload` | 读 | `clusterId`、`namespace`、`kind`、`name` | 获取单个工作负载的完整 YAML |
| `get_workload_history` | 读 | `clusterId`、`namespace`、`kind`、`name` | 列出工作负载的历史 revision（回滚前查看） |
| `list_endpoints` | 读 | `clusterId`、`namespace`（可选） | 列出端点列表 |
| `check_permission` | 读 | `clusterId`、`apiGroup`、`resource`、`verb`、`namespace`（可选） | 检查当前用户对某资源是否有权限（写操作前自查） |
| `get_pod` | 读 | `clusterId`、`namespace`、`name` | 获取单个 Pod 的详细信息 |
| `get_pod_logs` | 读 | `clusterId`、`namespace`、`name`、`tailLines`（默认 100，上限 1000）、`container`、`previous`、`sinceSeconds` | 获取 Pod 日志 |
| `list_k8s` | 读 | `clusterId`、`apiGroup`、`resource`、`namespace`（可选） | 列出任意已注册类型的 K8s 资源（ConfigMap / Secret / Service / Ingress / PVC 等） |
| `get_k8s` | 读 | `clusterId`、`apiGroup`、`resource`、`name`、`namespace`（可选） | 获取单个 K8s 资源的详情 |
| `list_events` | 读 | `clusterId`、`namespace`（可选）、`limit`（默认 50） | 列出集群事件，排查 ImagePullBackOff、CrashLoopBackOff 等故障 |
| `get_node_metrics` | 读 | `clusterId`、`name`（可选，缺省全部节点） | 查询节点 CPU / 内存实时用量 |
| `get_pod_metrics` | 读 | `clusterId`、`namespace`（可选）、`name`（可选） | 查询 Pod CPU / 内存实时用量 |
| `list_custom_resources` | 读 | `clusterId`、`apiGroup`、`resource`、`namespaced`、`namespace`（可选） | 列出指定 CRD 的实例（Operator / Helm 创建的 CR） |
| `prometheus_query` | 读 | `clusterId`、`query`、`time`（可选）、`timeout`（可选） | PromQL 瞬时查询 |
| `prometheus_query_range` | 读 | `clusterId`、`query`、`start`、`end`、`step` | PromQL 范围查询 |
| `prometheus_label_values` | 读 | `clusterId`、`label`、`matchSeries`（可选） | 查询 label 的取值 |
| `prometheus_buildinfo` | 读 | `clusterId`、`timeout`（可选） | 查询 Prometheus 版本与健康信息 |
| `apply_k8s` | 写 · MEDIUM | `clusterId`、`apiGroup`、`resource`、`namespace`、`yaml`、`dryRun`（可选） | 应用 K8s YAML：资源存在则更新，不存在则创建 |
| `patch_k8s` | 写 · MEDIUM | `clusterId`、`apiGroup`、`resource`、`name`、`patches`、`namespace`（可选） | RFC 6902 JSON Patch 修改资源字段 |
| `delete_k8s` | 写 · MEDIUM | `clusterId`、`apiGroup`、`resource`、`name`、`namespace`（可选）、`dryRun`（可选） | 删除单个资源，不存在时幂等返回成功 |
| `delete_k8s_collection` | 写 · HIGH | `clusterId`、`apiGroup`、`resource`、`namespace`（可选）、`propagationPolicy`（可选） | 删除整个资源集合；删除 PVC 集合时建议显式传 `Foreground` |
| `restart_workload` | 写 | `clusterId`、`namespace`、`kind`、`name`、`dryRun`（可选） | 重启工作负载（滚动重建 Pod） |
| `scale_workload` | 写 | `clusterId`、`namespace`、`kind`（deployment / statefulset）、`name`、`replicas`、`dryRun`（可选） | 修改工作负载副本数（扩缩容） |
| `update_image_tag` | 写 | `clusterId`、`namespace`、`kind`、`name`、`newImageTag`、`containerName`（可选） | 更新镜像标签；省略 `containerName` 时作用于全部容器 |
| `rollback_workload` | 写 | `clusterId`、`namespace`、`kind`、`name`、`revisionToRollback`（可选） | 回滚工作负载；省略 revision 时回滚到上一个版本 |
| `drain_node` | 写 · HIGH | `clusterId`、`nodeName`、`force`（可选）、`gracePeriodSeconds`（可选）、`dryRun`（可选） | 节点排水：先标记不可调度，再驱逐该节点全部 Pod；`force=true` 时忽略 PodDisruptionBudget |
| `evict_pod` | 写 · HIGH | `clusterId`、`namespace`、`podName`、`force`（可选）、`gracePeriodSeconds`（可选）、`dryRun`（可选） | 驱逐单个 Pod |
| `create_plan` | 审批 | `description` | 创建一个空的变更计划，返回 `planId` |
| `append_step_to_plan` | 审批 | `planId`、`tool`、`args`、`description` | 把待变更对象加入计划；`tool` 必须是 10 个写工具之一，加入前先 dry-run 校验 |
| `finalize_plan` | 审批 | `planId` | 提交计划进入待审批状态，此后你在 Kuboard UI 可见并可审批 |
| `get_plan_approve_status` | 审批 | `planId` | 审批后查询每个 step 的结果，并返回 `approvalToken` |
| `apply_plan` | 审批 | `planId`、`approvalToken` | 消费 `approvalToken` 真正执行计划中的全部变更 |

日志参数说明：`container` 多容器 Pod 必须指定、单容器可省略；`previous` 置 `true` 时返回上一次重启前的日志（仅对已终止容器有效）；`sinceSeconds` 仅返回最近 N 秒的日志，与 `tailLines` 二选一。

读取类工具所需的 `clusterId` / `namespace` 通常来自前两个工具 `list_clusters`、`list_namespaces` 的返回值——会话开始时先让智能体调用它们，后续所有工具都基于这两个值定位。

## 指标与 Prometheus 查询

::: tip 前置条件
- 节点 / Pod 指标工具依赖集群已安装 **metrics-server**，未安装时返回「metrics.k8s.io 不可用」的错误提示
- Prometheus 工具需要先在「系统设置 → MCP Server → Prometheus」配置数据源，详见 [服务端配置](./server-config)；未配置时工具返回禁用提示
:::

Prometheus 查询受集群 RBAC 与限流约束：复杂聚合查询在 REJECT 策略下会被拒绝，结果超过单次查询的 series / points 上限时返回 `PROM_TOO_LARGE`。查询失败时，错误码通过 `meta.errorCode` 透传：`PROM_NOT_FOUND`（未发现 Prometheus 服务）、`PROM_UNREACHABLE`（不可达）、`PROM_QUERY_ERROR`（查询错误）、`PROM_AUTH_FAILED`（权限不足）、`PROM_SCOPE_TOO_LARGE`（聚合维度超限）。

两个指标工具的返回值都经过归一化：CPU 换算为核数，内存换算为 MiB，可直接用于告警或对比判断。

## 典型使用流程

智能体接入后，一次「帮我重启 nginx」的对话大致走这几步，你需要做的只有最后的审批：

1. 智能体先调用 `list_clusters` / `list_workloads` 定位集群与工作负载——读取类工具随调随返回，无需你参与
2. 智能体调用 `create_plan` 创建变更计划，把 `restart_workload` 等写操作通过 `append_step_to_plan` 加入计划，再 `finalize_plan` 提交
3. 你在 Kuboard UI 的待审批列表中看到该计划，核对对象与参数后批准，拿到 `approvalToken`
4. 智能体调用 `apply_plan` 执行；你在界面上能看到执行进度与最终结果（全部成功或部分失败）

## 变更计划：写入审批的入口

变更计划（Plan）是把写入操作提交给你审批的唯一入口，适用于「智能体要改动集群，但改动必须经过你确认」的场景。5 个工具按固定顺序串联使用：

| 顺序 | 工具 | 参数 | 作用 |
|---|---|---|---|
| 1 | `create_plan` | `description` | 创建空计划，返回 `planId`；description 说明本次操作目的 |
| 2 | `append_step_to_plan` | `planId`、`tool`、`args`、`description` | 把要变更的对象追加到计划，可多次调用聚合多个变更；dry-run 失败的对象不会进入计划 |
| 3 | `finalize_plan` | `planId` | 提交计划进入待审批，你在 Kuboard UI 中看到并审批 / 拒绝 |
| 4 | `get_plan_approve_status` | `planId` | 你审批后查询每个 step 的结果；部分批准时会标明被跳过的 step，并返回 `approvalToken` |
| 5 | `apply_plan` | `planId`、`approvalToken` | 执行计划中全部已批准的变更；`planId` 与 token 必须属于同一计划 |

计划的状态流转：`CREATED`（构建中，列表可见但不可审批）→ `PENDING`（待审批）→ `APPROVED` → `APPLYING` → `APPLIED` / `PARTIAL_APPLIED` / `FAILED`，另有 `REJECTED`（拒绝）、`CANCELED`（取消）、`EXPIRED`（过期）。

::: tip 使用建议
- `append_step_to_plan` 的 `tool` 白名单与 10 个写工具完全一致，写操作必须先加入计划
- 为减少你的审批次数，建议把同一目的下的多个变更合并到一个计划中提交
:::

## 相关页面

- [MCP 使用总览](./index)
- [服务端配置](./server-config)（审批开关、Prometheus 数据源、限流）
- [变更审批流程](./approval-flow)（提交 → 审批 → 执行全流程）
- [危险操作与确认令牌](./danger-levels)（危险度分级与 HIGH 操作说明）
