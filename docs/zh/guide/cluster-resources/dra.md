---
description: 集群资源 - 动态资源分配 DRA 四类资源的使用：资源声明（ResourceClaim）、资源声明模板（ResourceClaimTemplate）、资源切片（ResourceSlice）、Pod 调度就绪（PodSchedulingReadiness）
---

# 动态资源分配（DRA）

动态资源分配（Dynamic Resource Allocation，DRA）是 Kubernetes 从 1.26 开始演进的功能：让工作负载按需**声明并分配** CPU / 内存之外的硬件设备（GPU、FPGA、智能网卡等），由对应的 DevicePlugin 驱动负责实际的分配与挂载。Kuboard 在 **集群资源 → 结构化资源(DRA)** 分组下提供四类相关资源：

| 资源 | 作用 | 范围 | 可操作 |
| --- | --- | --- | --- |
| 资源声明（ResourceClaim） | 声明「这个 Pod 需要什么设备」 | 名称空间级 | 创建 / 编辑 / 删除 |
| 资源声明模板（ResourceClaimTemplate） | 给工作负载模板批量生成资源声明的脚手架 | 名称空间级 | 创建 / 编辑 / 删除 |
| 资源切片（ResourceSlice） | 驱动把「节点上可用的设备」暴露给调度器 | 集群级 | 仅查看 |
| Pod 调度就绪（PodSchedulingReadiness） | 控制 Pod 何时开始调度（配合调度门） | 名称空间级 | 创建 / 编辑 / 删除 |

四类资源的分工可以用一句话串起来：

- **ResourceClaim** 声明「Pod 需要什么设备」；
- 集群中安装的 **DevicePlugin 驱动**通过 **ResourceSlice** 暴露「节点上可用的设备」；
- **ResourceClaimTemplate** 是给工作负载模板批量生成声明的脚手架（工作负载引用它，控制器为每个 Pod 生成独立声明）；
- **PodSchedulingReadiness** 控制 Pod 何时开始调度（把调度门标记为就绪后，Pod 才参与调度）。

::: warning 这四个菜单项默认隐藏
`resourceclaims`、`resourceclaimtemplates`、`resourceslices`、`podschedulingreadiness` 在 Kuboard 中默认处于**禁用**状态，资源树里看不到。若左侧没有「结构化资源(DRA)」分组，请到 **系统配置 → 菜单项设置**，在资源树中勾选该分组下的对应项并保存，再刷新集群页面即可出现。
:::

::: tip DRA 需要对应的 DevicePlugin 驱动
ResourceClaim / ResourceSlice 只是声明与描述，**真正「有设备可用」取决于集群里是否安装并运行了对应的 DevicePlugin 驱动**。没有驱动时，资源切片为空，资源声明会一直分配不到设备（见下文「排障」）。
:::

## 入口位置与列表页

四类资源位于左侧导航 **集群资源 → 结构化资源(DRA)**（资源树分组标题「结构化资源(DRA)」/ Structured Resources (DRA)，对应 API 分组 `resource.k8s.io`）：

1. 登录 Kuboard，展开左侧 **集群资源**；
2. 点击 **结构化资源(DRA)**，展开四个子项：资源声明、资源声明模板、资源切片、Pod 调度就绪。

列表页复用 Kuboard 通用资源列表，主要列如下：

| 列 | 说明 |
| --- | --- |
| 集群 | 资源所在的集群 |
| 名称空间 | 仅名称空间级资源（资源声明 / 模板 / Pod 调度就绪）有该列；资源切片为集群级，无此列 |
| 名称 | 点击进入详情页 |
| 创建时间 | 相对时间显示，可排序 |
| 操作 | 行内操作按钮：**编辑**（仅支持编辑的资源，资源切片无）、**YAML**（查看 / 编辑 YAML）、**删除** |

页面右上角可切换「搜索 / 树形」列表模式，并显示该资源的缓存状态。点 **创建（+）** 弹出创建对话框：选择集群、创建方式（**从表单创建** / **从 YAML 创建**），名称空间级资源还需选择名称空间（默认 `default`）。

## 资源声明（ResourceClaim）

资源声明（ResourceClaim）描述「工作负载需要什么样的设备、要几个」。它只是声明，实际分配由 DRA 调度器与 DevicePlugin 驱动协作完成。

### 创建资源声明

1. 进入 **集群资源 → 结构化资源(DRA) → 资源声明** 列表页，点击右上角 **创建**；
2. 填写 **名称**（名称空间内唯一）；
3. 在 **Devices** 区域点击 **+ Add Request** 添加设备请求（可多条），逐条填写下表字段；
4. 点击 **保存**，在 **预览 YAML** 中确认后提交，跳转到详情页。

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，名称空间内唯一，K8s 名称规范 |
| 设备请求（Devices → Request） | 一次声明一批同类设备，可添加多条、可单独移除 |
| name（请求名） | 请求的名称，用于区分同一声明里的多条请求 |
| deviceClassName（设备类名） | 设备类的名称，由驱动注册（如 `gpu.example.com`），声明要的设备必须属于该类 |
| count（数量） | 需要该类设备的个数，最小为 1 |

对应 YAML（表单提交的就是这个结构）：

```yaml
# resourceclaim.yaml：声明 1 块 gpu.example.com 类设备
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaim
metadata:
  name: gpu-claim-1
  namespace: default
spec:
  devices:
    requests:
      - name: gpu-0
        deviceClassName: gpu.example.com
        count: 1
```

<!-- screenshot-todo: 资源声明创建表单截图，突出名称输入框 + Devices 区域设备请求卡片（name / deviceClassName / count）与 "+ Add Request" 按钮 -->

::: tip 表单之外还有更多规约字段
表单聚焦最常用的 `devices.requests`。ResourceClaim 规约还支持设备约束（`constraints`）、设备配置（`config`）以及 DRA 演进版本的 `resourceClassName` / `allocationMode` / `parametersRef` 等字段，可在创建对话框选择「从 YAML 创建」，或创建后在详情页点击 **YAML** 补充。
:::

### 详情页

详情页页头展示该声明的元数据（名称、名称空间、UID、创建时间等），并提供 **编辑** / **YAML** / **删除** 操作；正文「规约」卡片展示设备请求条数（`N request(s)`）。具体分配到了哪个节点、哪台设备，可在 **YAML** 中的 `status.allocation` 查看。

### 在 Pod 中引用资源声明

Pod 通过 `spec.resources.claims` 引用已创建的 ResourceClaim：

```yaml
# pod-dra.yaml：Pod 引用 gpu-claim-1 资源声明
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
spec:
  resources:
    claims:
      - name: gpu-claim        # 与容器内引用的名字对应
  containers:
    - name: app
      image: nginx:1.25
      resources:
        claims:
          - name: gpu-claim
```

验证：

```sh
kubectl -n default get resourceclaim
kubectl -n default describe resourceclaim gpu-claim-1   # 查看 status.allocation 是否已分配
```

## 资源声明模板（ResourceClaimTemplate）

资源声明模板（ResourceClaimTemplate）内嵌一个 ResourceClaim 的规约，作为「批量生成声明」的脚手架：工作负载（如 Deployment）引用模板后，控制器会自动为每个 Pod 生成一份独立的 ResourceClaim，比逐 Pod 手动创建声明更省事。

### 创建资源声明模板

1. 进入 **集群资源 → 结构化资源(DRA) → 资源声明模板** 列表页，点击右上角 **创建**；
2. 填写 **名称**；
3. 在 **Template Spec** 区域点击 **+ Add Request** 添加设备请求（结构与资源声明完全一致）；
4. 点击 **保存**，在 **预览 YAML** 中确认后提交。

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，名称空间内唯一 |
| Template Spec → Request | 内嵌的 ResourceClaim 规约，即「模板生成的每一份声明」的内容 |
| name / deviceClassName / count | 同资源声明，见上文 |

```yaml
# resourceclaimtemplate.yaml：模板内嵌一份声明 1 块 GPU 的规约
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaimTemplate
metadata:
  name: gpu-claim-template
  namespace: default
spec:
  spec:
    devices:
      requests:
        - name: gpu-0
          deviceClassName: gpu.example.com
          count: 1
```

详情页的「规约」卡片展示**模板规约**中的设备请求条数（`N request(s)`）。

### 在工作负载中使用模板

在 Deployment 的 Pod 模板中按模板名称引用：

```yaml
# deployment-dra.yaml 片段：控制器按模板为每个 Pod 生成独立声明
spec:
  template:
    spec:
      resources:
        claims:
          - name: gpu-claim   # 引用 ResourceClaimTemplate 名称
```

创建 Deployment 后，验证每个副本是否都生成了对应的 ResourceClaim：

```sh
kubectl -n default get resourceclaims | grep gpu-claim
```

## 资源切片（ResourceSlice）

资源切片（ResourceSlice）由 DevicePlugin 驱动自动创建与维护：驱动把某个节点（或一个池）上**可用的设备**整理成切片，交给调度器作为分配依据。它是**集群级**资源。

ResourceSlice 由驱动自动管理，Kuboard 中**仅查看**（列表页没有创建按钮，行内也没有编辑入口；通过 YAML 与删除也不建议操作，删除后驱动会重建）。

### 查看资源切片

1. 进入 **集群资源 → 结构化资源(DRA) → 资源切片** 列表页，列表按集群展示名称与创建时间；
2. 点击名称进入详情页，页头展示元数据（名称、UID，无名称空间——集群级资源），「规约」卡片展示该切片对应的**驱动名称**（driver）；
3. 切片的具体内容在 **YAML** 中查看：`driver`（驱动）、`pool`（设备池）、`nodeName`（所属节点）、`devices`（设备数组，每台设备的 `name` / `type` / `attributes` / `capacity` 等）。

```yaml
# resourceslice.yaml 结构示例：节点 node-1 上由 gpu.example.com 驱动暴露的 2 台设备
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceSlice
metadata:
  name: gpu.example.com-node1
spec:
  driver: gpu.example.com
  pool:
    name: node1-pool
    resourceSliceCount: 1
  nodeName: node-1
  devices:
    - name: gpu-0
      type: gpu.example.com/type-a
      attributes:
        memory: 16Gi
      capacity:
        count: 1
    - name: gpu-1
      type: gpu.example.com/type-a
      attributes:
        memory: 16Gi
      capacity:
        count: 1
```

<!-- screenshot-todo: 资源切片详情页截图，突出页头元数据（无名称空间）+ 规约卡片中的驱动名称，以及 YAML 中的 devices / pool / nodeName -->

验证与排障：

```sh
kubectl get resourceslices
kubectl get resourceslice <名称> -o yaml
```

::: tip 「没有可用设备」怎么排查
ResourceClaim 创建后一直分配不到设备时，按顺序检查：① 该设备类（`deviceClassName`）是否有对应的 **ResourceSlice**（`kubectl get resourceslices` 里是否能看到该类设备）；② 对应节点上是否运行了 DevicePlugin 驱动（Pod 是否 Running、是否注册了设备类）；③ 声明里的 `deviceClassName` 是否与 ResourceSlice 中驱动暴露的设备类拼写一致。
:::

## Pod 调度就绪（PodSchedulingReadiness）

Pod 调度就绪（PodSchedulingReadiness）与 Pod 的**调度门**（`spec.schedulingGates`）配合：Pod 一旦声明了调度门，就不会参与调度，直到所有门被标记为**就绪**。PodSchedulingReadiness 对象列出这些门（`spec.schedulingGates`，每个 gate 的 `name` 与 `ready` 就绪状态），由 DRA 调度器/驱动在资源声明分配完成后把 `ready` 置为 `true`，Pod 随即开始正常调度。

在 DRA 流程中，该对象通常由调度器自动创建；Kuboard 提供创建 / 编辑入口，便于在需要时手动干预或补建。

### 创建 Pod 调度就绪

1. 进入 **集群资源 → 结构化资源(DRA) → Pod 调度就绪** 列表页，点击右上角 **创建**；
2. 表单仅需填写 **名称**（名称空间内唯一）；
3. `spec` 内容（调度门列表）在 **预览 YAML** 时补充：点击 **保存**，在 YAML 预览中为 `spec.schedulingGates` 添加条目后提交。

```yaml
# podschedulingreadiness.yaml：把 gate 标记为就绪
apiVersion: resource.k8s.io/v1alpha3
kind: PodSchedulingReadiness
metadata:
  name: pod-scheduling
  namespace: default
spec:
  schedulingGates:
    - name: example.com/dra-gate
      ready: true
```

对应的 Pod 一侧需要先声明同名的调度门：

```yaml
# pod 声明调度门（未就绪前不参与调度）
spec:
  schedulingGates:
    - name: example.com/dra-gate
```

详情页「规约」卡片展示创建时间；各调度门的状态在 **YAML** 中查看（`spec.schedulingGates[].ready`）。

::: tip 版本说明
DRA 是 Kubernetes 1.26 起逐步演进的功能，这里对应 API 版本 `resource.k8s.io/v1alpha3`。Kuboard 对这四类资源没有额外的能力（capability）门控——**是否显示取决于集群 API 是否提供**：若集群版本较低或未启用该特性（API Server 没有 `resource.k8s.io` 分组），左侧「结构化资源(DRA)」分组不会出现，属正常现象；列表页也会对每个集群探测资源可用性并给出提示。
:::

## 相关页面

- [部署 Deployment](../workload/deployments)：在 Pod 模板中通过 `resources.claims` 引用资源声明 / 资源声明模板
- [容器组（Pod）](../workload/pods)：核对 Pod 的调度门、声明引用与调度状态
- [名称空间（Namespace）](../cluster-resources/namespaces)：资源声明 / 模板 / Pod 调度就绪均为名称空间级，先确认所在名称空间