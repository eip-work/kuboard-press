---
description: 配置与存储总览：ConfigMap、Secret、PVC、PV、StorageClass、VolumeSnapshot、CSI
---

# 配置与存储

应用配置与持久化存储是 Kubernetes 上业务运行的两大基础。本节覆盖 Kuboard 中"应用配置层"与"存储层"的资源类型，以及相关的快照与 CSI（Container Storage Interface，容器存储接口）能力。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [ConfigMap / Secret](../config-storage/configmaps-secrets) | 应用配置文件、敏感凭据的创建 / 编辑 / 引用 | 应用配置注入与凭据管理 |
| [PVC / PV / StorageClass](../config-storage/pvc-pv-storageclass) | 持久卷声明 / 持久卷 / 存储类 | 有状态应用的持久化存储 |
| [VolumeSnapshot / CSI](../config-storage/snapshots-csi) | 卷快照、CSI 驱动、克隆 | 数据备份、迁移、扩容 |

## 推荐阅读顺序

1. **应用配置起步**：先看 [ConfigMap / Secret](../config-storage/configmaps-secrets)，学会在 Deployment / StatefulSet 中引用；
2. **持久化存储**：阅读 [PVC / PV / StorageClass](../config-storage/pvc-pv-storageclass) 理解三者的关系，并选择合适的 StorageClass；
3. **数据保护**：在关键有状态应用上引入 [VolumeSnapshot / CSI](../config-storage/snapshots-csi) 做快照与克隆。

::: tip Secret 安全
Secret 一旦被工作负载引用，即可在 Pod 内以文件或环境变量形式挂载。建议在 [用户与认证](../../user/) 中为相关人员配置 `secret` 资源的最小权限，并通过 [MFA](../../user/mfa) 保护管理员账号。
:::
