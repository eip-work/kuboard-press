---
description: Kuboard 存储管理 - PVC / PV / StorageClass 三个概念的定位与完整链路；创建存储类（本地路径 / NFS 动态供给向导、默认存储类）；创建存储卷声明（动态供给 vs 静态绑定现有 PV）；查看 PVC / PV 状态；创建存储卷（静态供给）；把 PVC 挂载到工作负载；删除策略与扩容等注意点
---

# 存储卷声明 / 存储卷 / 存储类（PVC / PV / StorageClass）

Kubernetes 的持久化存储由三个互相配合的资源构成，Kuboard 在 **集群详情 → 配置与存储 → 存储** 分组下提供三者的管理页面。

## 三个概念与完整链路

| 资源 | 英文 | 一句话定位 |
| --- | --- | --- |
| 存储类 | StorageClass（SC） | **动态供给的模板**：声明"用哪个存储后端、按什么策略创建卷" |
| 存储卷 | PersistentVolume（PV） | **集群里的存储资源池**：一块真实存在的存储（NFS 导出目录、云盘、本地路径等） |
| 存储卷声明 | PersistentVolumeClaim（PVC） | **用户对存储的申领**：应用声明"我要多大容量、什么读写模式"的卷 |

完整链路：

1. 管理员准备 **StorageClass**（或集群中已有默认存储类）；
2. 用户创建 **PVC**，指定存储类与容量；
3. Kubernetes 为 PVC **绑定**一个 PV：
   - **动态供给（Dynamic Provisioning）**：provisioner 按 PVC 的要求现场创建 PV 并绑定，不需要管理员预先准备；
   - **静态绑定**：PVC 直接指定已存在的 PV（`volumeName`），适合管理员预先准备好存储的场景；
4. 工作负载（Deployment / StatefulSet / Pod）在卷配置中引用该 PVC；
5. Pod 调度到节点后，kubelet 把 PV 挂载进容器，应用开始读写数据。

::: tip 一句话记忆
StorageClass 是"图纸"，PV 是"仓库里的货"，PVC 是"领料单"。PVC 领到的货（PV）可能是仓库按图纸现场生产的（动态供给），也可能是仓库里提前备好的（静态绑定）。
:::

## 创建 StorageClass

StorageClass 是**集群级资源**，通常由集群管理员操作。入口：**配置与存储 → 存储 → 存储类 → 创建**。

创建表单字段：

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 存储类名称，集群内唯一 |
| 默认存储类 | 注解 `storageclass.kubernetes.io/is-default-class` | 打开后，创建 PVC 不指定存储类时默认使用它 |
| 注解 / 标签 | `metadata.annotations` / `metadata.labels` | 可选 |
| 绑定模式 | `volumeBindingMode` | **立刻绑定**（Immediate，默认）：创建 PVC 后立即分配卷；**需要时绑定**（WaitForFirstConsumer）：第一个 Pod 调度到节点后才分配，适合本地盘等按节点分布的存储 |
| 回收策略 | `reclaimPolicy` | **删除**（Delete，默认）：PVC 删除后连 PV 带数据一并删除；**保留**（Retain）：PV 保留，数据由管理员手工处理 |
| 制备器类型 | `provisioner` | Kuboard 提供两类动态供给向导：**本地路径（动态制备）** 与 **NFS（动态制备）**，见下文 |

### 本地路径（LocalPath）动态供给

选择"本地路径（动态制备）"后，配置**每个节点上的存储根路径**：

- **默认根路径**（DEFAULT_PATH_FOR_NON_LISTED_NODES）：默认 `/opt/local-path-provisioner`，未单独配置的节点都使用它；
- **节点配置**：可为指定节点配置独立根路径；某节点配置 0 个路径 = **禁止在该节点制备**存储卷；配置多个路径 = 制备时随机选择。

保存后，向导会在 `kube-system` 名称空间下**一并创建**制备器所需的附属对象：ServiceAccount、RBAC、ConfigMap（保存上面的路径配置）以及 Deployment（镜像 `rancher/local-path-provisioner`）。

### NFS 动态供给

选择"NFS（动态制备）"后，填写：

| 字段 | 说明 |
| --- | --- |
| NFS Server | NFS 服务器地址，如 `192.168.1.100` |
| NFS Path | 导出路径，必须以 `/` 开头，如 `/exports/k8s` |
| MountOptions | 挂载选项（可选） |
| 可使用容量 | 向导用来生成制备器自身卷的容量，如 `100Gi` |
| 镜像 | 制备器镜像：`eipwork/nfs-subdir-external-provisioner:v4.0.18` 或华为云镜像源 |

表单下方提供了一条**测试命令**，请确认集群任意节点都能成功执行（挂载、写入、读取）：

```sh
mkdir /tmp/testnfs \
&& mount -t nfs <NFS Server>:<NFS Path> /tmp/testnfs \
&& echo "hello nfs" >> /tmp/testnfs/test.txt \
&& cat /tmp/testnfs/test.txt
```

保存后，向导会在 `kube-system` 下创建制备器 Deployment 及配套 RBAC，并创建一对供制备器自身使用的 PV / PVC（命名 `nfs-provisioner-<存储类名>-pv` / `-pvc`）。

### 默认存储类

把 **默认存储类** 开关打开后，Kuboard 会自动写入注解 `storageclass.kubernetes.io/is-default-class: "true"`。这样创建 PVC 时不选择存储类也会使用该存储类。

::: warning 默认存储类只能有一个
同一集群内 `is-default-class` 注解只能指向一个存储类。切换默认存储类前，先把旧的默认存储类开关关闭。
:::

等价的 YAML（以本地路径为例）：

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-path
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: rancher.io/local-path
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

<!-- screenshot-todo: 创建存储类表单：名称 / 默认存储类开关 / 绑定模式 / 回收策略 / 制备器类型 -->

<!-- screenshot-todo: 本地路径制备器：默认根路径与节点路径配置 -->

<!-- screenshot-todo: NFS 制备器：Server / Path / 容量 / 镜像 / 测试命令 -->

## 创建 PVC

PVC 是**名称空间级资源**。入口：**配置与存储 → 存储 → 存储卷声明 → 创建**（列表页顶部先选择集群与名称空间）。

表单字段：

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 名称空间 | `metadata.namespace` | 固定为当前选择的名称空间 |
| 名称 | `metadata.name` | PVC 名称，名称空间内唯一 |
| 存储类 | `spec.storageClassName` | 下拉选择已有存储类；**留空**时：使用默认存储类（若存在），或走静态绑定 |
| 存储卷类型 | `spec.volumeMode` | **文件系统**（Filesystem，默认）或 **存储块**（Block） |
| 读写模式 | `spec.accessModes` | 至少选择 1 个：只能被单节点读写（ReadWriteOnce）/ 可被多节点只读（ReadOnlyMany）/ 可被多节点读写（ReadWriteMany）/ 被单个容器组读写（ReadWriteOncePod） |
| 需求容量 | `spec.resources.requests.storage` | 必填，如 `10Gi`、`2GB`、`5Mi`、`8MB` |
| 存储卷名称 | `spec.volumeName` | **通常留白**，由存储类的 provisioner 自动分配；只有静态绑定时才手工填写 |

填写完成后点击 **保存**，在弹出的 **YAML 预览** 对话框中确认无误后创建。

### 动态供给

选择存储类（或留空使用默认存储类），其余字段按需填写。对应的 YAML 形如：

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: local-path
  resources:
    requests:
      storage: 10Gi
```

创建后 PVC 会很快被 provisioner 绑定到新建的 PV，状态由 **Pending（等待中）** 变为 **Bound（已绑定）**。

### 静态绑定（手动指定现有 PV）

适合存储已由管理员预先准备好（如手工创建的 PV）的场景：

1. 创建 PVC 时**不选择存储类**；
2. 在 **存储卷名称** 中填写要绑定的 PV 名称（或通过 YAML 预览补充 `volumeName`）；
3. 需求容量与读写模式需与目标 PV 匹配，且目标 PV 状态必须为 **Available（可用）**。

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-static
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: ""
  volumeName: pv-nfs-01
  resources:
    requests:
      storage: 10Gi
```

::: tip 权限说明
创建 PVC 需要当前用户在目标名称空间对资源 `persistentvolumeclaims` 具备 `create` 权限；StorageClass / PV 是集群级资源，创建它们需要集群级权限。Kuboard 会依据当前用户权限自动置灰无权限的操作按钮。
:::

<!-- screenshot-todo: 创建 PVC 表单：存储类 / 存储卷类型 / 读写模式 / 需求容量 / 存储卷名称 -->

## 查看 PVC 与 PV 状态

**列表页**与 K8s 其他资源列表一致，支持集群 / 名称空间切换、按名称搜索、批量删除：

- **PVC 列表**：额外展示 **存储类** 与 **状态** 两列；
- **PV 列表**：展示集群、名称、创建时间、操作（PV 是集群级资源，无名称空间列）。

**PVC 详情页**展示：存储类、卷类型、**需求读写模式**与**实际读写模式**、**需求容量**与**实际容量**、状态，以及 **关联存储卷（PV）** 与 **事件**（排障入口）。

PVC 的常见状态（`status.phase`）：

| 状态 | 含义 |
| --- | --- |
| Pending | 等待中：尚未找到可绑定的 PV（动态供给的卷还没建好，或没有匹配的 PV） |
| Bound | 已绑定：已与某个 PV 完成绑定 |
| Lost | 丢失：绑定的 PV 不存在或已被删除，数据可能丢失 |

PV 的常见状态（`status.phase`）：

| 状态 | 含义 |
| --- | --- |
| Available | 可用：空闲，可被 PVC 绑定 |
| Bound | 已绑定：已被某个 PVC 占用 |
| Released | 已释放：绑定的 PVC 已删除，但 PV 尚未被回收（Retain 策略下常见） |
| Failed | 失败：自动回收（Delete）失败 |

PV 详情页可查看卷源类型、容量、读写模式、回收策略与绑定的 PVC；PVC 详情页中的"关联存储卷"区块可直接跳转到对应 PV，并支持查看其 YAML。

<!-- screenshot-todo: PVC 列表页（存储类 / 状态两列） -->

<!-- screenshot-todo: PVC 详情页：状态、实际容量、关联存储卷、事件 -->

## 创建 PV（静态供给时）

需要预先准备存储时，可手工创建 PV。入口：**配置与存储 → 存储 → 存储卷 → 创建**（集群级资源）。

表单字段：

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | PV 名称，集群内唯一 |
| 容量 | `spec.capacity.storage` | 必填，如 `10Gi` |
| 读写模式 | `spec.accessModes` | 与 PVC 相同的四种模式，可多选 |
| 卷类型 | `spec.volumeMode` | 文件系统（默认）/ 存储块 |
| 回收策略 | `spec.persistentVolumeReclaimPolicy` | **保留**（Retain，默认）/ **删除**（Delete）/ 回收（Recycle，已弃用） |
| 存储类名称 | `spec.storageClassName` | 可选；建议与要绑定的 PVC 一致，方便匹配 |
| 卷源类型 | `spec.<卷源>` | hostPath / NFS / 本地存储 / CSI / iSCSI / RBD / FC / GlusterFS / CephFS |
| 高级设置 | `spec.mountOptions` / `spec.nodeAffinity` | 挂载选项、节点亲和性（折叠展开） |

选择卷源后按类型填写：hostPath 填**主机路径**与类型（如"目录（不存在时创建）"）；NFS 填**服务器地址**、**导出路径**、是否只读；CSI 填**驱动名称**、**卷句柄**等。

等价的 YAML（NFS 与 hostPath 各一例）：

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-nfs-01
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  persistentVolumeReclaimPolicy: Retain
  storageClassName: ""
  nfs:
    server: 192.168.1.100
    path: /exports/data
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-hostpath-01
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data/k8s-vol
    type: DirectoryOrCreate
```

创建成功后 PV 处于 **Available**，之后按上文"静态绑定"方式让 PVC 绑定它。

::: tip hostPath 仅用于开发 / 单节点验证
hostPath 直接把节点上的目录当作存储，数据不跨节点共享、不做冗余，生产环境请使用 NFS、云盘（CSI）等真正的共享 / 分布式存储。
:::

<!-- screenshot-todo: 创建 PV 表单：容量 / 读写模式 / 回收策略 / 卷源类型下拉 -->

## 把 PVC 挂载到工作负载

PVC 本身不产生数据读写，必须挂载到工作负载中：

1. 进入 [Deployment（部署）](../workload/deployments)、[StatefulSet（有状态副本集）](../workload/statefulsets) 或 [Pod](../workload/pods) 的创建 / 编辑页；
2. 在 **容器组模板 → 卷** 中点击 **添加卷**，卷类型选择 **存储卷声明**（persistentVolumeClaim）；
3. 在下拉中选择要挂载的 PVC（卷编辑处支持 **快速创建** 新 PVC）；
4. 在容器设置中把该卷挂载到目标目录（如 `/data`）。

> 有状态应用（数据库、消息队列等）建议使用 StatefulSet：副本按序创建，每个副本可以稳定绑定各自的 PVC。

::: tip PVC 与副本的关系
一个 **ReadWriteOnce（只能被单节点读写）** 的 PVC 同一时刻只能被一个节点上的 Pod 使用。需要多副本共享读写时，存储类与 PV 必须支持 **ReadWriteMany（可被多节点读写）**，否则多副本会因抢占同一卷而启动失败。
:::

## 常见注意点

| 注意点 | 说明 |
| --- | --- |
| 删除策略决定数据去向 | PVC 删除后，其存储类的 `reclaimPolicy` 决定 PV 与数据的命运：`Delete` 连卷带数据删除（不可恢复）；`Retain` 保留 PV 与数据，需管理员手工处理（删除 PV、清理后端数据、释放配额） |
| 扩容受 allowVolumeExpansion 限制 | 只有存储类声明了 `allowVolumeExpansion: true` 且存储后端支持时，PVC 才能在线扩容，且**只能增大、不能缩小**。Kuboard 的存储类表单未提供该开关，需要时可在存储类详情 → YAML 中补充该字段 |
| 编辑 PVC 的容量 | PVC 编辑页可修改需求容量，但实际是否生效仍取决于上一条的扩容条件 |
| 读写模式创建后不可改 | RWO（ReadWriteOnce）单节点读写、RWX（ReadWriteMany）多节点共享读写，需在创建前规划好 |
| 绑定关系不可换绑 | PVC 一旦与 PV 绑定，除非删除 PVC，否则不能换绑到其他 PV；需要换绑时先删除 PVC 并等待原 PV 被回收 |
| 静态绑定要匹配 | 手工绑定时，PVC 的容量（≤ PV 容量）、读写模式、存储类必须与目标 PV 匹配，且 PV 须为 Available |
| LocalPath 数据在节点本地 | 本地路径供给的卷数据只存在所在节点上，Pod 调度到其他节点后数据不随之迁移；节点损坏即数据丢失，仅适合非关键数据或配合备份 |

## 相关页面

- [存储快照与 CSI 相关资源](./snapshots-csi)：对 PVC 打快照备份 / 恢复
- [Deployment（部署）](../workload/deployments) / [StatefulSet（有状态副本集）](../workload/statefulsets)：把 PVC 挂载到工作负载