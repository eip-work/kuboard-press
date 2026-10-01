---
description: Kuboard 支持的 Kubernetes 版本范围，以及驱逐、EndpointSlice、端口转发、DRA、PSA、CRD v1 等能力在各版本段的行为差异矩阵
---

# 版本兼容矩阵（Version Compatibility Matrix）

本页回答两个问题：你的 Kubernetes 版本是否在 Kuboard 支持范围内？在该版本下，哪些能力与界面行为与其它版本不同？

## 支持范围总览

| 项目 | 数值 | 说明 |
| --- | --- | --- |
| 最低支持版本 | **v1.15** | 低于该版本不保证各能力判定正确 |
| 最新能力分界 | **v1.34** | 最新一条能力分界在 v1.34（ReadWriteOncePod）；**不是支持上限**，集群版本高于 v1.34 时按最新一档（≥1.34）处理 |
| 最新支持版本 | **v1.36** | 目前明确支持到该版本；更高的版本无需额外适配，按矩阵最新档（≥1.34）处理 |
| 版本判定粒度 | 主版本号.次版本号 | 如 `v1.31.2` 按 `1.31` 判定，patch 版本不影响能力分界 |
| 持续支持 | 版本只增不减，无上限 | 无版本上限；新版本（如 v1.36）无需额外适配，能力判定自动按最新档取值；矩阵将随未来新增能力分界补充新档位 |

::: warning 安装前确认版本
安装 Kuboard 前请确认集群版本不低于 v1.15，安装步骤见 [安装 Kuboard](../install/index)。接入集群后，集群列表页可看到 Kuboard 探测到的 Kubernetes 版本。
:::

## 能力 × 版本矩阵

接入集群时，Kuboard 读取集群的 Kubernetes 版本号，只比较**主版本号与次版本号**，据此按下表判定各能力；集群版本高于 v1.34 时按「≥ 1.34」档取值（见[支持范围总览](#支持范围总览)）。「→」表示到达该分界后取新值；「可用 / 不可用」表示功能入口或表单字段的有无。

| 能力 | 版本分界与取值 | 影响的界面 / 功能 |
| --- | --- | --- |
| 驱逐 Eviction | `< 1.25` → `policy/v1beta1`；`≥ 1.25` → `policy/v1` | 节点排空（Drain）、Pod 驱逐操作 |
| 调试容器 | `< 1.23` 不可用；`≥ 1.23` 可用 | 「Pod 调试」入口，向运行中的 Pod 注入调试容器 |
| 服务端点 EndpointSlice | `< 1.21` 降级到 `v1/endpoints`；`≥ 1.21` → `discovery.k8s.io/v1` | 服务 / 端点列表的数据来源 |
| 节点 / Pod 指标 | 恒为 `metrics.k8s.io/v1beta1`（metrics.k8s.io 至今未 GA） | 节点 / Pod 指标曲线、HPA 指标源 |
| FlowControl 限流 | `< 1.30` → `v1beta2`；`≥ 1.30` → `v1` | FlowSchema / PriorityLevelConfiguration 页面；老集群该 API 可能不存在，以探测为准 |
| 端口转发协议 | `< 1.32` → spdy；`≥ 1.32` → websocket（依赖 PortForwardWebsockets FeatureGate） | 终端 / 端口转发通道使用的协议 |
| 内置 Helm 版本 | `< 1.25` → helm-3.13；`1.25–1.30` → helm-3.16；`≥ 1.30` → helm-3.18 | 应用商店 / Helm 安装、升级、回滚实际调用的 helm 客户端 |
| DRA 动态资源分配 | `< 1.28` 不可用；`≥ 1.28` 可用 | ResourceClaim / ResourceClaimTemplate / ResourceSlice 等 DRA 资源入口与编辑 |
| PodSchedulingReadiness | 仅 `1.26–1.30` 可用（K8s 上游引入后移除）；其余不可用 | PodSchedulingReadiness 资源页（需同时满足 DRA 能力才显示） |
| ValidatingAdmissionPolicy | `< 1.30` 不可用；`≥ 1.30` 可用 | ValidatingAdmissionPolicy 及其绑定资源页 |
| RuntimeClass 调度 | `< 1.27` 不可用；`≥ 1.27` 可用 | RuntimeClass 资源页中的调度相关字段 |
| PVC 访问模式 ReadWriteOncePod | `< 1.34` 不可用；`≥ 1.34` 可用 | PVC / PV 编辑中的访问模式选项 |
| Pod 安全准入 PSA | `< 1.25` 不可用；`≥ 1.25` 可用 | 命名空间 / 工作负载的 Pod 安全（PSA/PSS 标签配置）界面 |
| CRD API 版本 | `< 1.16` → `v1beta1`；`≥ 1.16` → `v1` | Kuboard 内置 / 插件 CRD 与自定义资源表单使用的 apiVersion |
| Service appProtocol | `< 1.20` 不可用；`≥ 1.20` 可用 | Service 编辑中的 appProtocol（应用层协议）字段 |
| NetworkPolicy ipBlock except | `< 1.25` 不可用；`≥ 1.25` 可用 | NetworkPolicy 规则编辑中的 ipBlock `except` CIDR 列表 |
| 终端关闭帧协议 | `< 1.29` Kuboard 主动发关闭帧；`≥ 1.29` K8s 主动发关闭帧 | Web 终端断开时的 WebSocket 关闭帧行为 |
| Prometheus 工具 | 任何版本均视为可安装；实际可用性以服务发现探测为准 | MCP Prometheus 工具（prometheus_query 等）的可见性 |

::: tip 与 PSP（PodSecurityPolicy）的关系
PSP 自 Kubernetes 1.25 起被上游移除，由 Pod 安全准入（PSA）替代。因此 PSA 能力（矩阵中「Pod 安全准入 PSA」一行）自 1.25 起才可用。
:::

## 拿不准时的判断依据

矩阵给出的是按版本号的默认判定。以下情况请以 [集群能力探测](./k8s-capability) 的实际结果为准：

- 老版本集群上某些 API 组可能整体不存在（如 1.15 上没有 FlowControl），此时能力按矩阵中对应的旧值处理
- 依赖 FeatureGate 的能力（如端口转发 websocket/spdy）在集群未启用对应 FeatureGate 时，可能与表内默认值不同
- 依赖集群外部组件的「能力」（如 Prometheus 是否安装）需通过服务发现确认，而不是看版本号

## 旧版本缺失能力提示

按版本段归纳，便于排障时快速定位「哪个界面功能在当前版本下不可用」：

- **< 1.16**：CRD 仅 `apiextensions.k8s.io/v1beta1`；无调试容器；无 EndpointSlice（服务端点走 `v1/endpoints`）；无 Service appProtocol 字段。
- **< 1.21**：无 EndpointSlice，服务/端点列表降级到 `v1/endpoints`。
- **< 1.23**：无调试容器注入。
- **< 1.25**：驱逐走 `policy/v1beta1`；无 PSA（Pod 安全准入）；NetworkPolicy 无 `ipBlock.except`；内置 Helm 为 3.13。
- **< 1.27**：RuntimeClass 调度相关能力不可用。
- **< 1.28**：DRA 相关资源入口隐藏。
- **< 1.29**：终端关闭帧由 Kuboard 主动发送（与 ≥1.29 集群的交互行为有差异）。
- **< 1.30**：FlowControl 走 `v1beta2`；ValidatingAdmissionPolicy 不可用；PodSchedulingReadiness 自 1.30 起变为不可用（K8s 上游移除）。
- **< 1.32**：端口转发/终端走 SPDY 协议。
- **< 1.34**：PVC 访问模式无 ReadWriteOncePod 选项。
