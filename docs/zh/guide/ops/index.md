---
description: 运维可视化总览：事件、资源全景图、套件市场
---

# 运维可视化

本节聚焦"看清集群在做什么"与"扩展集群能做什么"。包括按时间线聚合的事件流、按对象关系组织的资源全景图，以及 Kuboard 套件市场。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [事件](../ops/events) | 集群 / 命名空间级 Event 时间线与过滤 | 排障应用异常、定位失败原因 |
| [资源全景图](../ops/resource-map) | 以 Deployment / Pod / Service 等为节点的关系图 | 直观理解资源拓扑与依赖 |
| [套件市场](../ops/addon-marketplace) | 一键安装 Kuboard 提供的 addon（如 metrics-server、dashboard） | 快速补齐集群可观测能力 |

## 推荐阅读顺序

1. **日常巡检**：进入 [事件](../ops/events) 查看集群与命名空间的近期告警；
2. **复杂排障**：遇到"改了配置但没生效"等链路问题时，用 [资源全景图](../ops/resource-map) 理清上下游；
3. **能力补齐**：通过 [套件市场](../ops/addon-marketplace) 一键补齐 metrics-server、NFS Provisioner 等常见依赖。

::: tip 与套件的关系
Kuboard v4 的套件与 v3 兼容：v3 中已安装的套件在升级到 v4 后继续生效，无需重复安装。套件以 Kuboard 自定义资源形式存在，遵循 [自定义资源](../crd/) 章节的通用管理方式。
:::
