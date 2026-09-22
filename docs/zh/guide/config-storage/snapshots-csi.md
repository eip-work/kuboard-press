---
description: 配置与存储 - 存储快照（VolumeSnapshot）与 CSI 相关资源：快照能做什么与前提条件、创建快照与快照类、从快照恢复 PVC、CSI 驱动程序 / CSI 节点 / CSI 存储容量 / 卷挂载等只读页面的用途与使用时机
---

# 存储快照与 CSI 相关资源

Kubernetes 的卷快照（VolumeSnapshot）是**存储卷在某个时间点的只读副本**。它由 CSI（Container Storage Interface）存储驱动实现，常用于：

| 场景 | 说明 |
| --- | --- |
| 数据备份 / 恢复 | 对重要应用的 PVC 定时打快照，出问题时从快照恢复数据 |
| 应用升级前的回滚保险 | 升级前打快照，升级失败可快速回到升级前状态 |
| 克隆 / 复制环境 | 从快照创建出新的卷，用于测试、联调或复制生产数据 |
| 数据迁移 | 借助快照把数据搬到新卷 / 新存储类 |

::: tip 快照与"备份"的关系
快照依赖存储后端实现，通常**只记录变化的数据块**（增量），速度快、占用小，但不能替代异地容灾备份。真正的离线备份仍需结合 Velero 等工具把数据搬到集群外。
:::

本文覆盖 Kuboard 中 **配置与存储 → 存储** 分组下的相关页面：存储快照、存储快照类，以及 CSI 驱动程序、CSI 节点、CSI 存储容量、卷挂载四个只读资源页。

::: warning 菜单默认不可见
存储快照、快照类及 CSI 相关资源默认不在左侧菜单中显示。若看不到这些菜单项，请集群管理员在 **系统配置 → 菜单项设置** 中启用对应的资源项，启用后菜单即时生效。
:::

## 前提条件

| 条件 | 说明 |
| --- | --- |
| CSI 驱动支持快照 | 底层存储的 CSI 驱动必须实现了快照能力（如阿里云 `disk.csi.aliyun.com` 等），不是所有存储都支持 |
| 已安装快照 CRD | 集群需安装 `external-snapshotter` 的三类 CRD：`volumesnapshots`、`volumesnapshotclasses`、`volumesnapshotcontents`（`snapshot.storage.k8s.io/v1`）。若集群中看不到快照菜单或资源页提示不可用，需先部署外部快照控制器 |
| 存在快照类 | 创建快照前需有对应的 VolumeSnapshotClass（见下文） |
| 源 PVC 已就绪 | 被快照的 PVC 需处于 Bound 状态，且其存储类由支持快照的 CSI 驱动供应 |

::: tip 如何判断驱动是否支持快照
打开 **存储 → CSI 驱动程序** 详情页，可查看驱动的 `volumeLifecycleModes` 等特性；更直接的依据是集群里已存在可用的 VolumeSnapshotClass，且其 driver 与源 PVC 的存储类一致。
:::

## 创建 VolumeSnapshot

入口：**配置与存储 → 存储 → 存储快照**，点击 **创建**。

表单字段（均为必填）：

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 快照名称，按名称空间隔离 |
| 快照类 | `spec.volumeSnapshotClassName` | 指定使用哪个 VolumeSnapshotClass（文本输入，如 `demo-snapshot-class`） |
| 源 PVC | `spec.source.persistentVolumeClaimName` | 要对哪个 PVC 打快照（文本输入，如 `my-pvc`） |

操作步骤：

1. 在列表页顶部选择集群与名称空间（快照是名称空间级资源）；
2. 点击 **创建**，填写名称、快照类与源 PVC；
3. 点击 **保存**，在弹出的 **YAML 预览** 对话框中确认无误后创建；
4. 返回列表，等待快照的 **就绪状态** 变为就绪后即可使用。

<!-- screenshot-todo: 存储快照列表页（含创建按钮与名称空间选择） -->
<!-- screenshot-todo: 创建快照表单：名称 / 快照类 / 源 PVC 三个字段 -->
<!-- screenshot-todo: 保存后的 YAML 预览对话框 -->

::: tip 快照是异步完成的
创建成功后不会立即"完成"。K8s 会在后台调用 CSI 驱动打快照，进入详情页可看到 **就绪状态**（`readyToUse`）：就绪后才会生成绑定的快照内容（VolumeSnapshotContent），也才能用于恢复。
:::

## 查看快照列表与详情

**列表页**：与 K8s 其他资源列表一致，支持集群 / 名称空间切换、按名称搜索、批量删除。

**详情页**包含两块内容：

| 区块 | 展示内容 |
| --- | --- |
| 规约（Spec） | 快照类、源 PVC |
| 状态（Status） | **就绪状态**（`readyToUse`，就绪为绿色标签）；**绑定的快照内容**（`boundVolumeSnapshotContentDataObjectRef`） |

详情页中的"绑定的快照内容"是一个**只读引用链接**，点击可跳转到对应的 VolumeSnapshotContent（快照内容）查看底层快照数据。VolumeSnapshotContent 是集群级（cluster-scoped）资源，没有独立的菜单页，此处以只读方式展示，避免跨命名空间误编辑。

<!-- screenshot-todo: 快照详情页：规约 + 状态（就绪状态标签与快照内容链接） -->

## 从快照恢复 / 创建新 PVC

从快照"恢复"的本质是**用快照作为数据源创建一个新的 PVC**，再把工作负载挂到新 PVC 上：

1. 在 **存储 → 存储卷声明** 页面点击 **创建**，打开创建表单；
2. 表单没有直接的"数据源"字段，点击 **保存** 进入 **YAML 预览** 对话框；
3. 在 YAML 的 `spec` 中补充 `dataSource`，指向要恢复的快照：

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-restored
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: <与快照相同驱动的存储类>
  resources:
    requests:
      storage: 10Gi
  dataSource:
    name: <快照名称>
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
```

4. 确认无误后创建；新卷的内容即快照时刻的数据。

::: warning 恢复的前提
- 快照必须已 **就绪**（`readyToUse = true`）；
- 新 PVC 的存储类需与快照使用**同一个 CSI 驱动**（同一存储类通常最稳妥）；
- 恢复出的卷大小一般应不小于源卷，具体取决于存储后端对快照恢复的支持。
:::

## VolumeSnapshotClass（快照类）

VolumeSnapshotClass 是**集群级资源**，为快照定义两层信息：用哪个 CSI 驱动打快照、删除快照时的行为。

| 字段 | 说明 |
| --- | --- |
| 名称 | 快照类名称 |
| 驱动（`driver`） | 提供快照能力的 CSI 驱动名称，如 `disk.csi.aliyun.com` |
| 删除策略（`deletionPolicy`） | `Delete`：删除 VolumeSnapshot 时同时删除后端快照数据；`Retain`：删除 VolumeSnapshot 后保留后端数据 |

创建步骤：**配置与存储 → 存储 → 存储快照类 → 创建**，填写名称、选择驱动与删除策略（默认 `Delete`）后保存即可。

<!-- screenshot-todo: 创建快照类表单：名称 / 驱动 / 删除策略 -->

::: tip 什么时候需要多个快照类
不同存储驱动各需要一个快照类；同一驱动也可以按删除策略拆成多个（如"留底保留"与"临时快照"各一个）。创建 VolumeSnapshot 时必须指定一个已存在的快照类。
:::

::: warning deletionPolicy 的选择
`Delete` 会在删除快照时一并删掉后端数据，**不可恢复**；对需要长期保留的快照，建议使用 `Retain` 策略，或在使用 `Delete` 策略前确认该快照不再需要。
:::

## CSI 相关资源页

以下四个页面均**只读**（无创建 / 编辑入口），用于查看 CSI 生态的运行状态，通常在排障或容量规划时使用。

| 菜单项 | 资源对象 | 展示内容 | 什么时候用 |
| --- | --- | --- | --- |
| CSI 驱动程序 | CSIDriver | 集群已注册的 CSI 驱动及其特性：需要挂载（`attachRequired`）、挂载时 Pod 信息（`podInfoOnMount`）、存储容量（`storageCapacity`）、FS 组策略（`fsGroupPolicy`）、卷生命周期模式（`volumeLifecycleModes`） | 确认某存储是否支持快照 / 容量感知调度 / 特定卷模式；对比驱动能力 |
| CSI 节点 | CSINode | 每个节点上已注册的 CSI 驱动（节点 ID、拓扑键、可分配卷数） | 排障：某节点上驱动是否注册成功、卷能否调度到该节点 |
| CSI 存储容量 | CSIStorageCapacity | 存储类在某拓扑区域的可分配容量、最大 / 最小卷大小、节点拓扑 | 容量感知调度（`storageCapacity` 特性）下查看卷能否在指定区域创建 |
| 卷挂载 | VolumeAttachment | 某个 PV 挂载到哪个节点、由哪个驱动挂载、是否已挂载（`attached`）、挂载元数据、分离错误（`detachError`） | 排障：卷挂载不上、节点迁移后卷状态异常 |

<!-- screenshot-todo: CSI 驱动程序详情页（特性开关与卷生命周期模式） -->

::: tip 这些页面需要时再看
四个 CSI 资源页面向"查看"，日常管理存储用不到；出现"存储卷创建 / 挂载 / 调度"类问题时，按 **卷挂载 → CSI 节点 → CSI 存储容量 → CSI 驱动程序** 的顺序排查即可。
:::

## 常见注意点

| 注意点 | 说明 |
| --- | --- |
| 快照依赖 CSI 驱动 | 存储类由不支持快照的驱动供应时，无法对该 PVC 打快照，创建后快照会一直未就绪 |
| 快照占用后端配额 | 云盘快照通常有数量与容量上限，会持续占用存储配额，请定期清理不再需要的快照 |
| 删除策略决定数据去向 | 删除快照前确认其快照类为 `Retain`（保留）还是 `Delete`（连带删除后端数据） |
| 就绪后才能恢复 | 未就绪（`readyToUse = false`）的快照不能作为 PVC 数据源 |
| 快照类与存储类需匹配 | 恢复 / 克隆出的新卷，其存储类应与快照使用同一 CSI 驱动 |
| 菜单默认隐藏 | 本页所有资源默认在菜单中隐藏，需管理员在 **系统配置 → 菜单项设置** 中启用 |

## 相关页面

- [存储卷声明 / 存储卷 / 存储类（PVC、PV、StorageClass）](./pvc-pv-storageclass)：快照的"上游"资源，快照类与存储类的关系可参见该页
- [配置字典与密文（ConfigMap、Secret）](./configmaps-secrets)：同一"配置与存储"分组下的姊妹资源