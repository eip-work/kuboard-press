---
description: 节点 Node 列表与详情页：集群用量汇总与单节点容量指示条、展开查看系统信息/节点配置、节点状态条件与关联事件、资源占用曲线、管理节点上的容器组与驱逐、暂停调度 Cordon/恢复调度 UnCordon、清空节点 Drain、以及一键打开节点终端 NodeShell 的入口
---

# 节点 Node

节点（Node）是 Kubernetes 集群中的**集群级**资源，是运行容器组的物理机或虚拟机。在 Kuboard 的节点页面，你可以查看每台节点的健康状况与资源占用、管理调度在其上的容器组，并在维护或故障时封锁、清空该节点，或直接打开一个终端进去排查。

::: tip 典型场景
- 查看集群各节点的 CPU / 内存 / 容器组用量，判断是否需要扩容或迁移；
- 节点要维护 / 升级 / 下线前，先**暂停调度**再**清空节点**，把业务平滑迁移走；
- 容器组反复异常且确认为主机层面问题时，在该节点上直接打开终端排查。
:::

## 入口位置

1. 登录 Kuboard，点击左侧导航 **集群管理**；
2. 展开 **节点与运行时**，点击 **节点**，进入节点列表页（同分组下还有 **运行时类**，见[调度与稳定性](./scheduling)）。

节点是集群级资源，不属于任何名称空间；列表页复用 Kuboard 通用资源列表，可通过右上角搜索快速定位节点。

## 节点列表页

列表页主要列如下：

| 列 | 说明 |
| --- | --- |
| （行首展开） | 展开后查看「System Info」与「Node Config」两张卡片，见下文 |
| Roles | 由节点 `node-role.kubernetes.io/*` 标签读出的角色（control-plane / worker 等） |
| Version | kubelet 版本号 |
| Internal IP | 节点内网地址 |
| Capacity | 该节点的 CPU / 内存 / 容器组三条用量指示条：百分比 + 已用/总量 |

<!-- screenshot-todo: 节点列表页整体：顶部 CPU/Mem/Pods 集群用量汇总指示条，表格列 Roles(标签)/Version/Internal IP/Capacity(三条用量条)，行首展开箭头 -->

列表页顶部还有整集群的 **CPU / Mem / Pods** 用量汇总指示条（已用/总量 + 百分比），一眼看出集群整体水位。

### 展开查看系统信息与配置

点击行首展开箭头，不进入详情即可查看两类信息：

| 卡片 | 内容 |
| --- | --- |
| System Info | 操作系统镜像（OS Image）、内核版本（Kernel Version）、容器引擎（Container Runtime）、体系架构（Architecture） |
| Node Config | Pod CIDR、Provider ID、KubeProxy 版本、污点（Taints）列表（`key=value:effect`） |

### 用量数据不可用时的表现

节点用量来自 metrics-server（metrics.k8s.io 指标接口）。集群**未安装 metrics-server** 时，CPU / 内存指示条消失，页面提示「请检查您是否安装了 metrics-server」，仅保留容器组数量指示。

## 查看节点详情

点击节点名称进入节点详情页，从上到下依次为：

- **关联事件**：该节点最近发生的事件（Kubelet 上报的启动、驱逐、磁盘压力等），按时间倒序；
- **节点状态**：Kubernetes 上报的各条件（conditions）表格；
- **基本信息**：内存与短暂存储的可分配 / 总量、Pod CIDR、IPTunnelAddr、各类地址（InternalIP / Hostname 等）；
- **资源占用**：近期曲线与计算指标。

### 节点状态

节点状态卡片用表格列出每个条件，**Indicator** 列以「正常 / 警告」标签直观提示：

| 条件（Type） | 含义 |
| --- | --- |
| Ready | 节点是否就绪并可调度容器组；为 False 时显示警告 |
| MemoryPressure / DiskPressure / PIDPressure | 内存 / 磁盘 / 进程数压力，为 True 表示资源紧张 |
| NetworkUnavailable | 网络是否可用 |

每个条件同时显示 reason、message、最后心跳时间（lastHeartbeatTime）与最后变更时间（lastTransitionTime），便于定位不健康的原因。

### 资源占用

资源占用区域由两块组成：

1. **CPU / 内存曲线**：两个卡片分别展示该节点 CPU、内存的近期使用趋势；
2. **计算指标**：当前用量与「可分配（Allocatable）」总量的对比——CPU 核数、CPU 请求（request）/ 限制（limit）占可分配的比例、内存（GiB）及其请求 / 限制占比、容器组数量 / 上限。

::: tip 指标来源
用量与曲线数据来自 metrics-server。若相关区域提示「请检查您是否安装了 metrics-server」，说明该集群未部署 metrics-server，或当前账号无读取节点指标的权限。
:::

<!-- screenshot-todo: 节点详情页资源占用区：左侧 CPU、内存两条近期曲线卡片，右侧 CPU/内存的用量、请求、限制百分比指标卡与容器组数量指标 -->

## 查看节点上的容器组

节点详情页的 **容器组（Pod）** 页签列出调度到该节点的全部容器组，并按列提供搜索 / 排序：

| 列 | 说明 |
| --- | --- |
| 名称空间 / 名称 | 名称可点击进入对应容器组详情；正在删除的容器组名称带删除线并标红（Deleting） |
| 状态 / Pod IP | 运行阶段（Running / Pending 等）与 Pod IP |
| CPU / 内存 请求、限制 | 该容器组内各容器的 requests / limits 汇总（m / Mi） |
| 创建时间 / 操作 | 创建时长；操作列提供 **驱逐** 按钮 |

### 驱逐单个容器组

点击某容器组的 **驱逐**，在弹出的对话框中可设置：

| 选项 | 说明 |
| --- | --- |
| Force | 勾选后强制驱逐，不等待优雅终止 |
| Grace period | 默认使用容器组自身的 `terminationGracePeriodSeconds`，也可切换为自定义秒数 |

如果该节点尚未暂停调度，点击驱逐会先弹出「此操作将暂停当前节点的调度，是否继续?」的确认，确认后 Kuboard 会**先暂停该节点调度**、再驱逐该容器组——这样容器组被驱逐后不会立即被重新调度回同一台节点。

::: tip 驱逐 ≠ 删除
驱逐（Eviction）走 Kubernetes 的优雅终止流程，有对应控制器（Deployment / StatefulSet 等）的容器组会被重新调度到其它节点继续运行。底层使用的 Eviction API 版本（`policy/v1` 或 `policy/v1beta1`）由 Kuboard 按集群版本自动探测，无需你关心。
:::

## 暂停调度 / 恢复调度（Cordon / UnCordon）

节点详情页右上角工具栏提供了调度开关（需要节点的**更新**权限，无权限时按钮不显示）：

- **暂停调度（Cordon）**：点击后给节点添加 `node.kubernetes.io/unschedulable:NoSchedule` 污点并标记为不可调度。**已运行**的容器组不受影响，但**新的容器组**不会再被调度到该节点；按钮随即变为 **恢复调度（UnCordon）**；
- **恢复调度（UnCordon）**：点击移除该污点，节点恢复接收新的容器组。

::: tip 什么时候用
节点要维护、升级或下线前，先暂停调度，避免新容器组调度上来；需要把已有容器组也迁走时，再接着使用下面的**清空节点**。
:::

<!-- screenshot-todo: 节点详情页顶部的 Cordon(暂停调度) 按钮与其确认/结果提示 -->

## 清空节点（Drain）

点击工具栏的 **清空节点（Drain Node）**，弹出对话框设置与驱逐单个容器组相同的选项：

| 选项 | 说明 |
| --- | --- |
| Force | 强制驱逐，不等待优雅终止 |
| Grace period | 默认使用容器组自身的 `terminationGracePeriodSeconds`，或自定义秒数 |

点击确定后先弹出确认「此操作将排空节点上所有的 Pod，是否继续?」，确认后 Kuboard 自动执行两步：**先暂停该节点调度**，再**逐个驱逐该节点上的所有容器组**，逐条提示「已成功驱逐容器组 名称空间 / 名称」，你可以回到容器组页签观察结果。

::: warning 清空是高风险操作
清空会把节点上全部容器组驱逐到其它节点。执行前请确认集群有足够的空闲容量承接，且状态副本（StatefulSet）所在节点的数据可用；已封锁的节点不会被调度进新容器组，事件与驱逐结果可随时在容器组页签查看。
:::

<!-- screenshot-todo: 清空节点对话框（Force 开关 + Grace period 单选项与秒数输入）及排空确认弹窗 -->

## 在节点上打开终端

节点详情页工具栏的 **Shell** 按钮可以一键启动**节点终端（NodeShell）**：Kuboard 会在该节点上创建临时特权调试容器，让你在浏览器中直接进入节点操作系统执行命令，无需 SSH 与 `kubectl`。

- 节点处于 **Ready** 状态、账号有更新节点及在调试命名空间创建容器组的权限时，Shell 按钮可用；
- 启动后节点详情页顶部出现 **节点 Shell 会话** 横幅，状态变为 Running 后可点击 **打开终端**，也可随时 **查看 Pod / 停止** 会话。

完整步骤、会话生命周期与全局配置见 [节点终端 NodeShell](../../ops/nodeshell)。

::: tip 容器内排障
如果问题只限于某个容器组内部（网络、进程、文件），可以从该容器组的详情页注入[调试容器 Debug Container](../../ops/debug-container)，不必进入整台节点。
:::

## 相关页面

- [节点终端 NodeShell](../../ops/nodeshell)：从节点详情页一键进入节点操作系统执行命令；
- [调试容器 Debug Container](../../ops/debug-container)：向运行中的容器组注入临时容器排查问题；
- [资源配额 ResourceQuota](./quota-limitrange)：为名称空间设置资源上限，间接影响节点用量；
- [调度 Scheduling](./scheduling)：节点污点（Taints）与容器组容忍度如何影响调度结果。