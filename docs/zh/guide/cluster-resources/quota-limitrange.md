---
description: Kuboard 名称空间资源管控：ResourceQuota 与 LimitRange 的定位辨析；名称空间详情页快速设置与查看配额使用率；创建资源配额与常用 hard 指标；创建限制范围（Limit Type、默认值、最小 / 最大值）；配额超限报错与排查
---

# 资源配额与限制范围（ResourceQuota / LimitRange）

ResourceQuota（资源配额）与 LimitRange（限制范围）是 Kubernetes 内置的两个名称空间级资源管控机制。Kuboard 在 **名称空间** 导航分组下提供两者的管理页面，并在名称空间详情页提供快捷查看与编辑入口。

| 资源 | 管控对象 | 一句话定位 |
| --- | --- | --- |
| ResourceQuota | 整个名称空间 | **总量上限**：限制名称空间内所有对象累计消耗的 CPU / 内存 / 存储，以及各类对象（Pod、Service、PVC…）的数量 |
| LimitRange | 单个容器 / Pod | **单实例约束**：给未显式声明资源的容器补上默认 request / limit，并强制每个容器 / Pod 的资源声明落在 min ~ max 区间内 |

::: tip 辨析：配额管总量，LimitRange 管单 Pod
配额管的是"一个名称空间最多能用多少、最多能建多少个对象"；LimitRange 管的是"单个容器 / Pod 至少要多少、至多能要多少、不写时默认给多少"。两者都只在**创建 / 更新对象时生效**，不会回收已运行的 Pod。通常配合使用：LimitRange 先保证每个容器声明了明确的资源，配额再保证所有容器加起来不超过名称空间的预算。
:::

## 入口位置

左侧导航 **集群管理 → 名称空间** 分组下，可以找到 **资源配额** 与 **限制范围** 两个菜单。两者都是名称空间级资源，进入列表后先选择集群与名称空间。

另一个入口是 **名称空间详情页 → 资源限额** 标签页：这里把 LimitRange 摘要与 ResourceQuota 使用情况合并展示，并支持直接编辑配额值，是日常运维最快的入口（见下文）。

<!-- screenshot-todo: 集群详情页左侧导航"名称空间"分组下的"资源配额 / 限制范围"菜单位置 -->

## 资源配额（ResourceQuota）

### 配额可以限制什么

配额按维度写在 `spec.hard` 中，每个维度一个键值对。常用维度：

| hard 键 | 含义 | 创建表单是否提供 |
| --- | --- | --- |
| `requests.cpu` | 所有 Pod 的 CPU 请求（requests）总和上限 | 否（YAML） |
| `limits.cpu` | 所有 Pod 的 CPU 上限（limits）总和上限 | 否（YAML） |
| `cpu` | CPU 请求与上限共同统计 | 是 |
| `requests.memory` | 内存请求总和上限 | 否（YAML） |
| `limits.memory` | 内存上限总和上限 | 否（YAML） |
| `memory` | 内存请求与上限共同统计 | 是 |
| `requests.storage` | PVC 声明的存储总容量上限 | 是 |
| `count/pods` | 容器组数量上限 | 否（YAML） |
| `count/deployments.apps` 等 | 各类工作负载 / 对象数量上限 | 否（YAML） |
| `count/services` | Service 数量上限 | 是（表单中为"服务"） |
| `count/secrets` / `count/configmaps` | 密文 / 配置字典数量上限 | 否（YAML） |
| `requests.nvidia.com/gpu` 等 | 厂商 GPU 数量上限 | 否（YAML） |

创建表单预设了 CPU、内存、存储请求、对象计数、服务五个维度，填入即写入 `spec.hard` 对应键；更细粒度的 `requests.*`、`limits.*`、`count/*` 维度建议在 YAML 编辑中维护。

### 在名称空间详情页快速设置配额

对多数场景，不需要先创建配额对象再等它生效。打开 **名称空间详情页 → 资源限额** 标签页：

1. 页面上半部分是 **容器资源默认请求**（来自 LimitRange，见下文），下半部分是 **资源配额** 使用列表，每个维度一行（CPU 限额、CPU 请求、内存限额、内存请求、存储请求、容器组数量、Deployment 数量、Service 数量、密文数量等）；
2. 未设置配额的维度显示 **不限制**，整行以半透明状态展示；
3. 点击某一行 **编辑**，输入配额值（CPU 填 `2` 或 `100m`，内存填 `240Mi` 或 `2Gi`，计数类填正整数），保存后立即生效；
4. 点击 **清 除** 可移除该维度的限制。

名称空间中已有同名 ResourceQuota 时，Kuboard 直接修改它；否则自动创建一个与名称空间同名的配额对象。每行的使用率以进度条呈现：**≤20% 绿色、≤60% 默认色、≤80% 黄色、>80% 红色**。

<!-- screenshot-todo: 名称空间详情页 → 资源限额 标签页：LimitRange 摘要卡 + 资源配额行（含使用率进度条与编辑 / 清除按钮） -->

::: tip 带 scopeSelector 的配额
按 `spec.scopeSelector` 限定作用范围的配额（如只统计特定优先级类别的 Pod）不会出现在名称空间详情页的汇总列表中，需要在资源配额列表 / 详情页中查看。
:::

### 创建 / 编辑资源配额

进入 **名称空间 → 资源配额 → 创建**：

| 字段 | 对应键 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 名称空间内唯一 |
| CPU | `hard.cpu` | 示例 `10` |
| 内存 | `hard.memory` | 示例 `20Gi` |
| 存储请求 | `hard["requests.storage"]` | 示例 `100Gi` |
| 对象计数 | `hard["objects.count"]` | 示例 `100` |
| 服务 | `hard.services` | 示例 `20` |

创建后立即对该名称空间生效。**编辑页** 字段与创建页一致，配额名称不可修改。`spec.hard` 之外的高级字段（如 `scopeSelector`）只能通过列表页的 **YAML** 入口维护。

一个完整的配额对象示例：

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: default
spec:
  hard:
    limits.cpu: "20"
    limits.memory: 40Gi
    requests.cpu: "10"
    requests.memory: 20Gi
    requests.storage: 100Gi
    count/pods: "50"
    count/deployments.apps: "10"
```

<!-- screenshot-todo: 创建资源配额表单（名称 + CPU / 内存 / 存储请求 / 对象计数 / 服务） -->

### 查看配额使用情况

配额详情页以表格展示 `spec.hard`（硬限制）与 `status.used`（已使用）的对照：

| 列 | 来源 | 说明 |
| --- | --- | --- |
| 名称 | `spec.hard` 的键 | 指标名（CPU、内存、存储请求…） |
| 硬限制 | `spec.hard` | 配额上限 |
| 已使用 | `status.used` | 名称空间当前实际用量 |
| 剩余 | 硬限制 − 已使用 | 剩余可用的量 |

`status.used` 由 Kubernetes 控制器持续统计，无需人工维护；未设置的维度显示 `-`。

<!-- screenshot-todo: 资源配额详情页的 硬限制 / 已使用 / 剩余 对照表 -->

### 配额超限：报错与排查

当提交的对象会把名称空间推过配额上限时，API 服务器直接拒绝该请求，创建 / 导入 YAML 时会看到类似错误：

```sh
Error from server (Forbidden): pods "web-6d9d7f5f5c-abcde" is forbidden:
exceeded quota: compute-quota, requested: limits.memory=2Gi,
used: limits.memory=40Gi, limited: limits.memory=40Gi
```

`requested` 是本次请求要求的量，`used` 是当前用量，`limited` 是配额上限——三者对照即可定位是哪个维度超限。排查步骤：

1. 打开该名称空间的 **资源配额** 列表，对比各维度的 已使用 / 硬限制；
2. 或直接在 **名称空间详情页 → 资源限额** 标签页看各维度进度条（红色即接近 / 超过上限）；
3. 明确超限维度后二选一：编辑配额扩容该维度，或删除 / 缩容部分工作负载释放用量；
4. `count/pods` 超限时，工作负载滚动发布也会被拒绝（新 Pod 建不出来），症状是"部署卡在更新中"，此时优先检查 Pod 数量配额。

::: warning 配额超限不影响已运行对象
配额只在创建 / 更新时校验。已运行的对象即使把用量推过上限也不会被终止；但此后的任何新创建（包括扩容副本、滚动更新产生的新 Pod）都会被拒绝，直到用量回到限额以内。
:::

<!-- screenshot-todo: 配额超限时的错误提示对话框（Forbidden / exceeded quota） -->

## 限制范围（LimitRange）

### LimitRange 解决什么问题

- **给"忘了写资源声明"的容器兜底**：容器不写 `resources.requests` / `limits` 时默认不受限，容易在节点上挤占其他 Pod。LimitRange 的 Default / DefaultRequest 会自动补上；
- **给资源声明设定硬边界**：Min / Max 保证任何容器、任何 Pod 的资源声明不能低于下限或高于上限，避免单个应用把配额瞬间吃光；
- **约束存储声明容量**：对 PersistentVolumeClaim 限定 Min / Max，防止 PVC 声明过大容量。

### 创建限制范围

进入 **名称空间 → 限制范围 → 创建**，表单由 **名称** 与一个"限制"编辑表格组成。表格每行是一种 Limit Type，通过 **+ Add Limit Type** 添加多行；每行包含四组 CPU / 内存输入：

| 列 | 对应 spec 字段 | 含义 |
| --- | --- | --- |
| Limit Type | `limits[].type` | 作用对象类型：Container / Pod / PersistentVolumeClaim / PersistentVolume |
| Default | `limits[].default` | 未显式声明 limit 时自动补上的默认 limit |
| Request | `limits[].defaultRequest` | 未显式声明 request 时自动补上的默认 request |
| Limit | `limits[].max` | 允许的最大值 |
| Min | `limits[].min` | 允许的最小值 |

输入示例：CPU 填 `100m` 或 `2`，内存填 `512Mi` 或 `4Gi`。

::: tip 四种 Limit Type 的适用场景
- **Container**：按**单个容器**约束 CPU / 内存，最常用；
- **Pod**：按**整个 Pod** 约束所有容器的资源之和（如限制 Pod 总内存上限）；
- **PersistentVolumeClaim**：约束 PVC 声明的存储容量，Min / Max 只填内存列（语义为存储容量）；
- **PersistentVolume**：与 PVC 类似，作用于 PV 对象。
:::

一个完整的 LimitRange 对象示例：

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: container-limits
  namespace: default
spec:
  limits:
    - type: Container
      default:            # 未写 limit 时自动补上
        cpu: 500m
        memory: 512Mi
      defaultRequest:     # 未写 request 时自动补上
        cpu: 100m
        memory: 128Mi
      max:                # 上限
        cpu: "2"
        memory: 4Gi
      min:                # 下限
        cpu: 50m
        memory: 64Mi
```

<!-- screenshot-todo: 创建限制范围表单（Limit Type 表格：Default / Request / Limit / Min 四组 CPU、内存输入，含 + Add Limit Type 按钮） -->

### 校验与默认值如何生效

以 Container 类型为例，创建 / 更新 Pod 时：

1. 容器**没写** request → 自动填入 `defaultRequest`；**没写** limit → 自动填入 `default`；
2. 容器**写了** request / limit → 逐一与 Min / Max 比对，超出区间直接拒绝；
3. 写入的默认值也必须落在 Min / Max 区间内（否则 Kubernetes 会拒绝创建该 LimitRange 本身）。

校验失败时看到类似错误：

```sh
Error: maximum cpu usage per Container is 2, but limit is 3
Error: minimum memory usage per Container is 64Mi, but request is 32Mi
```

同时，若名称空间中已有配额，LimitRange 补上的默认 request / limit 会**计入** ResourceQuota 的统计——这正是"先兜底、再限额"的配合方式：每个容器都有明确的资源声明，配额统计才准确。

::: tip 修改 LimitRange 的生效范围
LimitRange 修改后只影响之后创建的 Pod / PVC。已经运行的容器不会回填默认值，也不会被新的 Min / Max 驱逐。
:::

<!-- screenshot-todo: 名称空间详情页"资源限额"标签页上方的"容器资源默认请求"LimitRange 摘要卡 -->

## 相关页面

- [名称空间（Namespace）](./namespaces)：名称空间详情页的 **资源限额** 标签页提供配额与 LimitRange 的快捷查看 / 编辑
- [容器组（Pod）](../workload/pods)：LimitRange 的默认值与 Min / Max 直接作用于 Pod 的资源声明
- [存储卷声明（PVC）](../config-storage/pvc-pv-storageclass)：`requests.storage` 与 PVC 类型 LimitRange 的管控对象
