---
description: Kuboard V4 使用指南总览：集群管理、工作负载、配置与存储、网络、集群资源、自定义资源、运维可视化与术语速查
---

# 使用 Kuboard V4

本节按「日常使用一个 Kuboard 实例」的用户旅程组织文档，覆盖从导入集群到日常运维的完整链路。第一次使用建议从 [导入集群](./cluster/import) 开始。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [集群管理](./cluster/import) | 导入、编辑、同步状态、资源导入导出 | 接入第一个集群、维护集群连接 |
| [工作负载](./workload/) | Deployment / StatefulSet / DaemonSet / Job / CronJob / Pod，以及 HPA 与持续部署（CD） | 发布与管理业务应用 |
| [配置与存储](./config-storage/configmaps-secrets) | ConfigMap / Secret / PVC / PV / StorageClass / CSI | 应用配置与持久化存储 |
| [服务与网络](./network/services-ingress) | Service / Ingress / NetworkPolicy / Gateway API | 应用对外暴露与网络策略 |
| [集群资源](./cluster-resources/nodes) | Node / Namespace / Quota / LimitRange / PDB / 调度 / Admission / FlowControl / DRA | 集群级资源管理 |
| [自定义资源](./crd/crds) | CRD 与自定义资源实例 | 扩展 Kubernetes API |
| [运维可视化](./ops/resource-map) | 事件、资源全景图、套件市场 | 排障与日常巡检 |

## 推荐阅读顺序

1. **首次使用**：先完成 [导入集群](./cluster/import)，再通过 [Deployment（部署）](./workload/deployments) 部署第一个应用；
2. **日常发布**：熟悉 [工作负载](./workload/) 各章节，配合 [持续部署（CD）](./workload/cd) 将发版操作脚本化；
3. **弹性伸缩**：为工作负载配置 [水平自动伸缩（HPA）](./workload/hpa)；
4. **深入使用**：按需阅读 [配置与存储](./config-storage/configmaps-secrets)、[服务与网络](./network/services-ingress)、[集群资源](./cluster-resources/nodes) 等章节；
5. **运维排障**：借助 [事件](./ops/events) 与 [资源全景图](./ops/resource-map) 快速定位问题。

## 术语速查

阅读各章节时常见的 Kubernetes / Kuboard 术语：

| 术语 | 含义 | 相关文档 |
| --- | --- | --- |
| **集群**（Cluster） | 一套可接入并统一管理的 Kubernetes 集群 | [导入集群](./cluster/import) |
| **名称空间**（Namespace） | 隔离资源的逻辑分区，权限与配额以它为粒度 | [名称空间](./cluster-resources/namespaces) |
| **工作负载**（Workload） | Deployment 等「跑业务」的资源统称 | [Deployment](./workload/deployments) |
| **Pod** | 工作负载的最小运行实例，一个或多个容器共享网络与存储 | [Pod](./workload/pods) |
| **HPA** | 根据指标自动调整工作负载的副本数 | [水平自动伸缩](./workload/hpa) |
| **持续部署**（CD） | 用一套脚本把发版操作自动化 | [持续部署（CD）](./workload/cd) |
| **Service / Ingress** | 把应用暴露给集群内或集群外访问 | [服务与网络](./network/services-ingress) |
| **ConfigMap / Secret** | 把配置与敏感信息从镜像中抽离 | [配置与存储](./config-storage/configmaps-secrets) |
| **PVC / PV** | 为工作负载申请持久化存储卷 | [PVC / PV](./config-storage/pvc-pv-storageclass) |
| **Node** | 集群中的一个计算节点（服务器） | [Node](./cluster-resources/nodes) |
| **套件**（Addon） | 可从套件市场一键安装的功能扩展包 | [套件市场](./ops/addon-marketplace) |
| **审计**（Audit） | 记录登录、权限变更等关键操作日志 | [审计日志](../ops/audit-log) |

更多术语与概念解释见 [参考文献 → 术语表](../reference/glossary)。

::: tip 关于图文进度
本指南各章节的操作说明均已齐备；部分页面仍在陆续补充界面截图，未配图不影响按步骤操作。
:::
