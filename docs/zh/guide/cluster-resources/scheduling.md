---
description: 调度与稳定性四类集群资源的使用：PriorityClass（调度优先级与抢占）、PodDisruptionBudget（滚动更新/节点维护时保障可用 Pod 数）、Lease（协调租约查看）、RuntimeClass（gVisor/Kata 运行时分隔的创建与工作负载关联）
---

# 调度与稳定性（PriorityClass / PDB / Lease / RuntimeClass）

本页覆盖四类与"调度、可用性、运行时"相关的集群资源，全部面向使用操作：

| 资源 | 作用 | 范围 | Kuboard 入口（资源树） | 可操作 |
| --- | --- | --- | --- | --- |
| PriorityClass（优先级类） | 设置工作负载的调度优先级，支持抢占 | 集群级 | 集群资源 → 调度 | 创建 / 编辑 / 删除 |
| PodDisruptionBudget（Pod 中断预算） | 自愿中断（滚动更新、节点维护）时的最小可用 Pod 保障 | 名称空间级 | 集群资源 → 策略 | 创建 / 编辑 / 删除 |
| Lease（租约） | 分布式协调用的轻量租约，只读观察 | 名称空间级 | 集群资源 → 协调 | 仅查看 |
| RuntimeClass（运行时类） | 为 Pod 选择容器运行时（如 gVisor、Kata） | 集群级 | 节点与运行时 | 创建 / 编辑 / 删除 |

::: warning 这些资源默认在菜单中隐藏
`priorityclasses`、`poddisruptionbudgets`、`leases`、`runtimeclasses` 在 Kuboard 中默认处于**禁用**状态，资源树里看不到。若你的集群左侧没有这些入口，请到 **系统配置 → 菜单项设置**，在资源树中勾选对应项并保存，再刷新集群页面即可出现。
:::

## 调度优先级：PriorityClass

PriorityClass（优先级类）给 Pod 一个整数值优先级。调度器（kube-scheduler）优先调度高优先级 Pod，Pod 间可比较相对重要程度。

- **提高优先级**：关键任务（如结算、告警、监控）先于普通任务被调度，资源不足时甚至可抢占低优先级 Pod；
- **降低优先级**：批处理、后台任务设低优先级，让位给在线业务。

### 创建优先级类

1. 进入 **集群资源 → 调度 → 优先级类** 列表页，点击右上角 **创建**；
2. **基本信息**：填写名称（集群内唯一）与标签、注解；
3. **规约**：依次填写值、全局默认、描述、抢占策略（见下表）；
4. 点击 **保存**，在 **预览 YAML** 中确认后提交，跳转到详情页。

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，集群内唯一，K8s 名称规范（小写字母/数字/`-`） |
| 值（value） | 必填，正整数，范围 1 ~ 2147483647。数值越大优先级越高 |
| 全局默认（globalDefault） | 开关。开启后，**未显式指定优先级的工作负载**都按该值参与调度 |
| 描述（description） | 可选，说明该优先级类的用途 |
| 抢占策略（preemptionPolicy） | `PreemptLowerPriority`（默认）：高优先级 Pod 无法调度时，驱逐低优先级 Pod 腾出位置；`Never`：不抢占，排队等待资源 |

<!-- screenshot-todo: 优先级类创建表单截图，突出"值 / 全局默认开关 / 抢占策略单选项" -->

### 把优先级类关联到工作负载

在工作负载（如 Deployment）的 **YAML 编辑** 中，给 Pod 模板（`spec.template.spec`）加上 `priorityClassName` 字段：

```yaml
# deployment-priority.yaml 片段：让这批 Pod 使用 high-priority 优先级
apiVersion: apps/v1
kind: Deployment
metadata:
  name: critical-worker
spec:
  template:
    spec:
      priorityClassName: high-priority   # 对应已创建的 PriorityClass 名称
      containers:
        - name: app
          image: nginx:1.25
```

保存后，Deployment 滚动重建的 Pod 即按新优先级参与调度。验证：

```sh
kubectl get priorityclass
kubectl get pod <pod名称> -o jsonpath='{.spec.priorityClassName} {.spec.priority}'
```

::: tip 全局默认只能有一个
一个集群同时只能有一个 PriorityClass 开启 **全局默认**。若把系统内置的 `system-cluster-critical`（或更高值）设为全局默认，所有未指定优先级的普通 Pod 都会被抬到系统关键级别，请勿随意开启。
:::

::: warning 抢占的代价
`PreemptLowerPriority` 会在资源不足时**驱逐**目标节点上的低优先级 Pod（触发其终止并重调度）。除非确有需要，批处理等低优先工作负载建议用默认抢占策略外的 `Never`，避免频繁互相抢占造成抖动。
:::

<!-- screenshot-todo: 优先级类列表页截图，展示名称 / 值（value）/ 全局默认 / 描述列 -->

## 可用 Pod 保障：PodDisruptionBudget

PodDisruptionBudget（PDB，Pod 中断预算）约束**自愿中断**（Voluntary Disruptions）——由人主动发起的中断，例如 Deployment 滚动更新、节点排空（drain）维护、手动删除 Pod。它是名称空间级资源，只保障"意外不会大规模中断"，不保障强行删除等**非自愿中断**。

| 中断类型 | 是否受 PDB 约束 | 举例 |
| --- | --- | --- |
| 自愿中断 | 是 | 滚动更新、节点排水维护、用户主动 delete Pod |
| 非自愿中断 | 否 | 节点宕机、OOM、驱逐、硬件故障 |

### 创建 Pod 中断预算

1. 进入 **集群资源 → 策略 → Pod 中断预算** 列表页，点击右上角 **创建**（默认在 `default` 名称空间，可切换）；
2. **元数据**：填写名称（名称空间内唯一）；
3. **规约**：选择预算口径、填写数量、添加标签选择器（见下表）；
4. 点击 **保存**，在 **预览 YAML** 中确认后提交。

| 字段 | 说明 |
| --- | --- |
| 预算口径 | 二选一：**最小可用（minAvailable）** / **最大不可用（maxUnavailable）**。另选中的字段才写入 YAML |
| 数量 | 支持**绝对数**（如 `2`）或**百分比**（如 `50%`）。`minAvailable: 2` = 中断期间至少保留 2 个可用 Pod；`maxUnavailable: 50%` = 最多允许一半 Pod 同时不可用 |
| 标签选择器 | `key=value` 逐行填写，多行之间是"与"（AND）；只命中匹配标签的 Pod。为空时匹配该名称空间内**所有** Pod |

<!-- screenshot-todo: Pod 中断预算创建表单截图，含 minAvailable/maxUnavailable 单选项与标签选择器示例（app=web） -->

::: tip 常见口径选择
- 多副本且有负载均衡的业务：用 `minAvailable`（绝对值或百分比），保证随时有足够实例承接流量；
- 批处理、可容忍单点短暂中断的：用 `maxUnavailable` 放开一部分并发中断。
:::

### 从详情页判断"能否安全中断"

保存后进入详情页，下方 **状态** 面板是关键信息：

| 状态字段 | 含义 |
| --- | --- |
| 当前健康（currentHealthy） | 当前满足就绪条件的 Pod 数 |
| 期望健康（desiredHealthy） | 中断期间必须保持可用的 Pod 数（由预算计算得出） |
| 允许中断（disruptionsAllowed） | 当前还允许另有多少 Pod 被自愿中断 |
| 期望 Pods（expectedPods） | 选择器当前命中的 Pod 总数 |

`允许中断 > 0` 才允许继续执行滚动更新/节点排水；为 `0` 时，任何新的自愿中断（如排空该 Pod 所在节点）都会被阻塞，直到有 Pod 恢复可用。

<!-- screenshot-todo: Pod 中断预算详情页截图，突出状态面板：当前健康 / 期望健康 / 允许中断 / 期望 Pods -->

验证与排障：

```sh
kubectl -n <名称空间> get pdb
kubectl -n <名称空间> describe pdb <名称>   # 含 Status 与 DisruptionsAllowed
```

::: warning 选择器不命中 = PDB 形同虚设
标签写错、与工作负载模板标签不一致时，`期望 Pods` 为 0，没有任何约束效果。创建后先看详情页"期望 Pods"是否等于该工作负载的副本数。
:::

## 协调租约：Lease

Lease（租约）是集群用于**分布式协调**的轻量对象：谁"持有"某个资源一段时间，并定期**续约**。典型场景：

- **节点心跳**：每个节点在 `kube-node-lease` 名称空间持有一个 Lease，持续续约即表示节点健康；
- **Leader 选举**：`kube-scheduler`、`kube-controller-manager` 等控制器通过 Lease 选主，同一时刻只有一个 Leader 在工作。

Lease 由系统自动创建与维护，Kuboard 中**只读**（无创建/编辑入口）。进入 **集群资源 → 协调 → 租约**，列表展示三列：

| 列 | 说明 |
| --- | --- |
| Holder Identity（持有者） | 当前持有者标识（如节点名、`kube-scheduler` 实例名 + UUID） |
| Lease Duration (s)（租约时长） | 一次租约的有效秒数 |
| Renew Time（续约时间） | 最近一次续约时间（显示相对时间） |

点击名称进入详情页，额外提供 **租约转移次数（leaseTransitions）** 与 **获取时间（acquireTime）**。

排查思路：

- **续约时间持续很久没更新** → 持有者进程可能假死或失联；
- **租约转移次数快速上升** → Leader 频繁切换，多为持有者进程不稳（OOM、网络抖动、节点故障），重点关注被选举组件（如 `kube-scheduler`）的健康状态。

<!-- screenshot-todo: 租约详情页截图，展示持有者 / 租约时长 / 续约时间 / 租约转移次数 / 获取时间 -->

```sh
kubectl -n kube-node-lease get lease        # 节点心跳租约
kubectl -n kube-system get lease            # 控制面组件的 Leader 选举租约
```

## 运行时隔离：RuntimeClass

RuntimeClass（运行时类）把"运行时选择"从 Pod 定义里解耦出来：先定义一个具名运行时类，Pod 通过 `runtimeClassName` 引用它。最常见的用途是**运行时隔离**——用沙箱运行时（如 gVisor、Kata Containers）运行不可信工作负载，与宿主机内核隔离。

### 前提：节点上已装好对应运行时

RuntimeClass 只是一个声明，真正干活的是节点上的运行时实现：

- 节点已安装对应运行时（如 gVisor 的 `runsc`、Kata 的 `kata-runtime`）；
- 容器运行时（如 containerd）已把该 handler 注册好；
- 节点打上可识别的标签（便于下面的 Node Selector 绑定）。

### 创建运行时类

进入 **节点与运行时 → 运行时类** 列表页，点击右上角 **创建**，填写：

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，集群内唯一 |
| Handler | 必填，节点上注册的运行时 handler 名（如 `runsc`、`kata`、`runc`） |
| Overhead（podFixed） | 可选，运行时的固定额外开销（CPU/内存），如 gVisor 的 `cpu: 100m`、`memory: 128Mi`。调度器把这些开销计入节点容量，避免超卖 |
| Scheduling（节点选择器） | 可选，限定到装了该运行时的节点。**Kubernetes 1.27 及以上版本**显示该区域；更早版本界面自动隐藏 |

<!-- screenshot-todo: 运行时类创建表单截图，含 Handler、Overhead（podFixed 键值对）、Scheduling 节点选择器区域 -->

::: tip 低版本集群的 Scheduling 字段
RuntimeClass 的 `scheduling` 字段在 Kubernetes 1.27 才转为正式（GA）。若集群版本低于 1.27，表单不显示节点选择器区域，需要时可改在名的 YAML 中补充 `scheduling.nodeSelector`。
:::

### 把运行时类关联到工作负载

在 Pod/工作负载的 **YAML 编辑** 中加 `runtimeClassName`：

```yaml
# runtimeclass-pod.yaml：让该 Pod 用 gvisor 沙箱运行
apiVersion: v1
kind: Pod
metadata:
  name: untrusted-app
spec:
  runtimeClassName: gvisor
  containers:
    - name: app
      image: busybox
```

保存后，调度器会把该 Pod 调度到满足 RuntimeClass `scheduling.nodeSelector`（如有）的节点，节点再用对应 handler 启动容器。验证：

```sh
kubectl get runtimeclass
kubectl get pod <pod名称> -o jsonpath='{.spec.runtimeClassName}'
# Pod 进入 Running 说明 handler 与节点运行时匹配成功；Pending/失败多为节点未装对应运行时
```

::: warning 没有匹配的运行时 → Pod 调度失败
节点上未安装 RuntimeClass 声明的 handler（或节点选择器没有可命中节点）时，Pod 会一直处于 `Pending` 或报"节点无法满足 RuntimeClass"错误。先把 handler 对应的运行时在至少一个节点上装好，再创建（或引用）RuntimeClass。
:::

<!-- screenshot-todo: 运行时类列表页截图，展示名称 / Handler 列 -->

## 相关页面

- [Deployment](../workload/deployments)：在其 YAML 编辑中添加 `priorityClassName` / `runtimeClassName`
- [容器组（Pod）](../workload/pods)：核对 Pod 优先级、RuntimeClass 生效情况与 PDB 命中
- [节点（Node）](../cluster-resources/nodes)：节点排水维护触发自愿中断（受 PDB 约束）；节点标签是 RuntimeClass 节点选择器的来源
- [名称空间（Namespace）](../cluster-resources/namespaces)：PDB、Lease 均为名称空间级，先确认所在名称空间