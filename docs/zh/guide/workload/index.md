---
description: "工作负载管理总览：Deployment / StatefulSet / DaemonSet / Job / CronJob / Pod、HPA 与持续部署（CD）"
---

# 工作负载

Kuboard 覆盖 Kubernetes 所有内置工作负载类型：Deployment、StatefulSet、DaemonSet、Job、CronJob 与 Pod，并提供 HPA（水平 Pod 自动伸缩）与持续部署（CD）能力。运维和应用 owner 可以从这里进入不同负载类型的创建、管理与排障页面。

## 快速导航

| 子页面 | 内容 | 何时阅读 |
| --- | --- | --- |
| [Deployment](./deployments) | 多副本滚动更新与回滚 | 部署无状态服务和 Web 应用 |
| [StatefulSet](./statefulsets) | 具备稳定网络标识与存储的有状态副本 | 数据库、消息队列等有状态工作负载 |
| [DaemonSet](./daemonsets) | 每个节点（或匹配节点选择器）运行一个 Pod | 日志采集、CNI 插件等节点级代理 |
| [Job / CronJob](./jobs-cronjobs) | 一次性与定时批量任务 | 数据处理、清理与定时作业 |
| [Pod](./pods) | 最底层的 Pod 视角：容器状态、终端与日志 | 调试单个容器、进入容器 Shell |
| [HPA](./hpa) | 基于 CPU、内存或自定义指标的自动伸缩 | 按负载自动调整副本数 |
| [持续部署（CD）](./cd) | 更新镜像 Tag 与滚动重启 | 由 CI 流水线或 AI Agent 驱动发布 |

## 推荐阅读顺序

1. **首次部署**：先读 [Deployment](./deployments)，部署一个无状态应用；
2. **有状态工作负载**：应用需要稳定网络标识或持久化存储时，再看 [StatefulSet](./statefulsets)；
3. **节点级工作负载**：需要集群范围内的代理时，读 [DaemonSet](./daemonsets)；
4. **批量任务**：一次性或定时任务，读 [Job / CronJob](./jobs-cronjobs)；
5. **自动伸缩**：流量有波动时，用 [HPA](./hpa) 自动调整副本数；
6. **发布自动化**：接入 CI 流水线，用 [持续部署（CD）](./cd) 替代手动重启。

::: tip 接下来读什么
把工作负载跑起来之后，接着配置它的 [ConfigMap / Secret](../config-storage/configmaps-secrets) 与 PVC 绑定；生产环境运行期间，用「运维」分组里的 [事件](../ops/events) 和 [资源地图](../ops/resource-map) 持续观察工作负载的健康状况。
:::