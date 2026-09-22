---
description: 集群资源总览：Node、Namespace、Quota、LimitRange、调度、PDB、Lease、RuntimeClass、Admission、FlowControl、DRA
---

# 集群资源

本节覆盖 Kubernetes 中"作用于整个集群或基础设施层面"的资源类型。这些对象通常不直接承载业务，但决定了集群的容量、配额、调度与策略边界。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [Node](../cluster-resources/nodes) | 节点查看、标签 / 污点管理、排水与驱离 | 节点维护、扩缩容、升级 |
| [Namespace](../cluster-resources/namespaces) | 命名空间创建、配额关联、授权隔离 | 多团队 / 多环境隔离 |
| [ResourceQuota / LimitRange](../cluster-resources/quota-limitrange) | 命名空间级资源配额与默认请求 / 上限 | 控制资源用量 |
| [调度 / PDB / Lease / RuntimeClass](../cluster-resources/scheduling) | PriorityClass、PodDisruptionBudget、Lease、RuntimeClass | 调度策略与可用性保障 |
| [Admission Webhook](../cluster-resources/admission) | Validating / Mutating Webhook 配置查看 | 准入控制排障 |
| [FlowControl](../cluster-resources/flowcontrol) | `flowcontrol.apiserver.k8s.io` API 分组与优先级 | apiserver 限流调优 |
| [DRA 动态资源分配](../cluster-resources/dra) | DRA（Dynamic Resource Allocation）资源模板与分配 | GPU / 加速卡等异构资源 |

## 推荐阅读顺序

1. **首次整理集群**：先按团队 / 环境用 [Namespace](../cluster-resources/namespaces) 划分空间，再配 [ResourceQuota / LimitRange](../cluster-resources/quota-limitrange) 设置边界；
2. **运维场景**：节点上下线时阅读 [Node](../cluster-resources/nodes)；滚动升级或自愈时阅读 [调度 / PDB / Lease / RuntimeClass](../cluster-resources/scheduling) 中的 PDB 部分；
3. **平台团队**：阅读 [Admission Webhook](../cluster-resources/admission) 与 [FlowControl](../cluster-resources/flowcontrol)；
4. **AI / 异构资源**：阅读 [DRA 动态资源分配](../cluster-resources/dra)。

::: tip Tier 1 资源
本节包含的 LimitRange、ResourceQuota、PriorityClass、PodDisruptionBudget、EndpointSlice、Lease 等被称为 **Tier 1 资源**：Kuboard 默认不缓存，按需走 apiserver 直查。其表单页支持 `?demo=true` 查询参数预填演示数据，无需真实 K8s 集群即可独立验证。
:::
