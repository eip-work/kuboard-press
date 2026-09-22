---
description: 自定义资源总览：CRD（CustomResourceDefinition）注册、CR 实例管理、CRD 视图
---

# 自定义资源

Kubernetes 的扩展机制让平台与业务可以定义自己的 API 类型。本节介绍 Kuboard 如何发现、展示并管理 CRD（CustomResourceDefinition，Kubernetes 自定义资源定义）及其 CR（Custom Resource，自定义资源）实例。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [CRD](../crd/crds) | 查看集群已注册的 CRD 列表、作用域、版本与分类 | 了解集群可用的扩展 API |
| [自定义资源实例](../crd/custom-resources) | 列出某个 CRD 的所有 CR 实例，创建 / 编辑 / 删除 | 日常使用 CRD 驱动的 Operator / 平台能力 |

## 推荐阅读顺序

1. **了解集群能力**：先在 [CRD](../crd/crds) 页面查看已注册的 CRD，确认目标资源是否可用；
2. **日常操作**：进入对应 CRD 的 [自定义资源实例](../crd/custom-resources) 列表，进行 CRUD（Create / Read / Update / Delete，数据的增删查改）操作；
3. **缺失资源**：若集群已安装 CRD 但 Kuboard 未列出，多为缓存未同步，重启一次全量同步或等待下一个同步周期即可。

::: tip 自动发现机制
CRD **无需手动注册菜单**：`LoginServiceMenuLoader.populateCustomResourceMenu` 会按已同步的 CRD 自动生成左侧"自定义资源"分组。常见 CRD（如 CertManager、ArgoCD、IngressNginx 等）安装后通常在一个同步周期内出现在菜单中。
:::
