---
description: 集群能力（K8s Capability）探测机制：它解决什么问题、在哪里感知、10 条默认 capability 的版本分界、判定结果的三种形态、缓存与失效时机
---

# 集群能力（K8s Capability）

本页说明集群能力（K8s Capability）：Kuboard 对每个集群做能力探测，据此决定功能入口是否可用、用哪个 API 版本、取哪种实现。

## 在哪里感知到它

能力判定结果不直接展示给用户，而是体现在功能行为上：

| 感知位置 | 例子 |
| --- | --- |
| 功能入口是否可用 | 不支持临时容器的集群不显示「Pod 调试」入口 |
| 功能内部实现自动切换 | 端口转发协议、终端关闭帧处理按版本自动选择 |
| 编辑表单的选项 | PVC/PV 访问模式、Service 协议标注、流控页面与权限选项的 API 版本 |
| MCP 工具行为 | 未安装 Prometheus 的集群隐藏 `prometheus_*` 工具；指标工具按探测到的 `metrics.k8s.io` 版本发起请求 |

::: tip 探测失败时默认放行
能力无法判定（集群暂时不可达、规则缺失等）时，Kuboard 采取 fail-open 策略：MCP 工具保持可见、功能入口保持可用，只有明确判定为「无」才隐藏或降级，避免集群临时故障时误伤操作。
:::

## 常见的 capability

不指定探测项时，服务端按 10 条默认 capability 探测（也可按需指定任意内置规则）。下表是 10 条默认项的语义：

| capability | 探测什么 | 版本分界 | 影响的功能 |
| --- | --- | --- | --- |
| `policy.eviction` | 驱逐（Eviction）API 的 groupVersion | ≥ v1.25 → `policy/v1`，否则 `policy/v1beta1` | 节点排水 / Pod 驱逐（界面操作与 MCP 工具） |
| `flowcontrol.flowschemas` | APF（FlowSchema）API 的 groupVersion | ≥ v1.30 → `flowcontrol.apiserver.k8s.io/v1`，否则 `v1beta2` | 流控页面与权限选项中 flowcontrol 条目的 API 版本 |
| `portforward.protocol` | 端口转发的传输协议 | ≥ v1.32（且启用 PortForwardWebsockets 特性）→ websocket，否则 spdy | Web 端口转发的连接协议 |
| `pod.ephemeralContainer` | 临时容器（ephemeral container）是否支持 | ≥ v1.23 → true，否则 false | 「Pod 调试」入口是否可用 |
| `helm.binary` | 使用哪个内置 helm 二进制 | < v1.25 → helm-3.13；v1.25–v1.30 → helm-3.16；≥ v1.30 → helm-3.18 | Helm 安装 / Helm 市场执行时调用的 helm 版本 |
| `storage.readWriteOncePod` | ReadWriteOncePod 访问模式是否支持 | ≥ v1.34 → true，否则 false | PVC/PV 表单的访问模式选项 |
| `admission.psa` | Pod 安全准入（PSA）是否支持 | ≥ v1.25 → true，否则 false | 命名空间 / 工作负载的 Pod 安全能力 |
| `apiextensions.crd.v1` | CRD API 的 groupVersion | ≥ v1.16 → `apiextensions.k8s.io/v1`，否则 `v1beta1` | 自定义资源页面的 API 版本 |
| `service.appProtocol` | Service 的 appProtocol 字段是否支持 | ≥ v1.20 → true，否则 false | Service / Ingress 表单的协议标注字段 |
| `metrics.serverVersion` | metrics-server 聚合指标 API 的版本 | 恒为 `metrics.k8s.io/v1beta1` | 节点 / Pod 实时用量数据的 API 版本 |

::: tip 注册表中还有更多规则
除上述 10 条默认项外，还有若干供 MCP 工具与终端使用的内部规则，对使用者透明，这里不逐一展开。
:::

## 评估结果的三种形态

每条 capability 的判定结果可能是三种形态之一：

1. **布尔值（有 / 无）**——决定功能入口是否可用。例如临时容器：v1.23 及以上为「有」，显示「Pod 调试」入口。
2. **API 版本（用哪个版本调用）**——决定请求使用的 groupVersion。例如驱逐：v1.25 及以上用 `policy/v1`，更早用 `policy/v1beta1`。
3. **版本阶梯（多段映射）**——同一能力在不同版本段取不同值。例如内置 helm 按集群版本分成三段，分别返回 helm-3.13 / helm-3.16 / helm-3.18。

## 缓存与失效

| 时机 | 行为 |
| --- | --- |
| 缓存自然过期 | 结果缓存 1 小时后过期，下次查询自动重算 |
| 导入 / 更新 / 删除集群 | 立即清除该集群的判定缓存并重算，新版本即刻生效 |
| 保存系统配置中的「集群缓存设置」 | 清除**所有**集群的判定缓存并重算，同时向已连接的 MCP 客户端广播工具列表变更 |

因此集群升级后无需手动处理：更新集群信息后立即按新版本重判，否则最多等待缓存过期（1 小时）。

## 相关概念

- 资源可用性检查（CRD 是否已安装）是另一个独立的探测机制，见 [资源可用性检查](./resource-availability)；
- 「集群缓存设置」（保存会触发能力重探）见 [系统配置](./system-config)；
- MCP 工具按集群能力显隐的行为见 [MCP 工具清单](../mcp/tools)。
