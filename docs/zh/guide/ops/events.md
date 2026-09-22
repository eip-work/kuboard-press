---
description: 查看 Kubernetes 事件（Events）：全局事件列表的筛选、排序与字段含义，Warning 事件的识别，从事件跳转到关联对象，以及资源详情页内嵌事件区块的用法
---

# 事件（Events）

事件（Event）是 Kubernetes 中的一种标准资源（apiVersion `v1`，resource `events`），由 kubelet、控制器（如 Deployment、CronJob 控制器）、调度器等组件在运行时写入，用来记录集群中发生的各类状态变化：镜像拉取失败、容器被重启、调度失败、节点 NotReady、持久卷挂载失败等。

事件与"操作审计"不同：事件反映的是 **Kubernetes 自身运行过程中的状态变化**；操作审计记录的是用户在 Kuboard 上执行过的操作。排障时优先看事件，追责/合规时看 [操作审计](../../ops/audit-log)。

::: tip 事件是"现场记录"，看完即走
事件对象会被 Kubernetes 自动清理（kube-controller-manager 按 TTL 回收，默认约 1 小时），不会长期保存。排查问题时请以当前存在的事件为准，重要现象请及时截图或记录。
:::

Kuboard 提供两种查看事件的途径：

1. **全局事件列表页**：按集群 / 名称空间浏览所有事件，支持筛选与排序；
2. **资源详情页内嵌事件区块**：进入某个具体资源（如 Pod、Service、Deployment）的详情页，只看与它相关的事件。

## 入口

### 全局事件列表页

1. 在左侧导航进入 **运维与可观测 → 事件**；
2. 页面顶部选择**集群**与**名称空间**（也可以切换为集群/名称空间树模式，按树逐级点选）；
3. 列表默认按**创建时间**倒序展示，最新的事件排在最前。

<!-- screenshot-todo: 事件列表页全貌：顶部集群/名称空间选择、筛选区展开（类型=警告）、列表中的类型标签与关联对象链接、Warning 红色高亮 -->

### 资源详情页中的事件区块

以下资源的详情页顶部或正文中带有 **事件** 区块，展示与该资源（按对象的 `uid` 关联）相关的事件：

| 资源 | 详情页位置 | 说明 |
| --- | --- | --- |
| Pod（容器组） | 顶部第一块 | [Pod](../workload/pods) |
| Service | 详情页顶部 | - |
| 节点（Node） | 节点概况中"事件"卡片 | [节点](../cluster-resources/nodes)，含节点自身调度/健康相关事件 |
| Deployment / StatefulSet / DaemonSet / CronJob 等 | 详情框架顶部 | 通过统一的详情框架渲染，见 [Deployment](../workload/deployments) |
| 持久卷声明（PVC） | 详情页顶部 | - |
| 其他经统一详情框架渲染的资源 | 详情页顶部事件卡片 | 如 Gateway、Ingress、StorageClass、RBAC 等 |

## 列表页：筛选、排序与字段

事件列表页的列如下：

| 列 | 说明 |
| --- | --- |
| 类型（Type） | 事件的严重程度标签：`正常`（Normal，绿色）、`警告`（Warning，红色），可按此列筛选 |
| 关联对象（Involved Object） | 事件涉及的对象，格式为 `{kind}` 标签 + `{name}` 链接，点击名称跳转到该对象详情页（见下文） |
| 原因（Reason） | 事件产生的原因编码，如 `BackOff`、`FailedScheduling`、`ImagePullBackOff` |
| 消息（Message） | 原因的人类可读描述，超长时以单行省略号截断 |
| 集群 / 名称空间 / 名称 | Kuboard 统一添加的基本列 |
| 创建时间 | 事件的 `metadata.creationTimestamp`，以相对时间展示，可排序 |
| 存活状态 / 失效时间 | 仅当集群启用资源缓存时显示，用来区分"集群中仍存在的事件"与"已从集群消失、仅残留在缓存中的事件" |

支持筛选的能力：

| 筛选 | 说明 |
| --- | --- |
| 类型 | 下拉选择 `正常` / `警告`（可输入搜索） |
| 名称 | 按事件名称模糊搜索 |
| 创建时间 | 按时间范围筛选（仅缓存模式可用） |
| 时区 | 调整时间的展示时区，浏览器本地时区为默认值 |
| 存活状态 / 失效时间 | 按"存活 / 已失效 / 全部"及失效时间范围筛选（仅缓存模式） |

::: tip 缓存模式与分页
集群启用资源缓存（Kuboard 后台缓存集群对象）时，事件列表支持上述时间范围筛选与分页；未启用缓存的集群直接查询 Kubernetes 接口，不做分页，事件按集群返回顺序列出。
:::

## Warning 事件意味着什么

事件类型只有两种，由 Kubernetes 的事件聚合逻辑（`type` 字段）区分：

- **正常（Normal）**：预期的、常规的状态变化，如"调用了某个容器"（reason `Scheduled`）、"成功拉取镜像"（`Pulled`）；
- **警告（Warning）**：发生了异常，通常需要人工关注，如调度失败（`FailedScheduling`）、镜像拉取失败（`Failed` / `ErrImagePull`）、容器反复重启（`BackOff`）、健康检查失败（`Unhealthy`）、卷挂载失败（`FailedMount`）。

排障时，把类型筛选切到 **警告**，先看 Warning 事件，再逐个展开其详情（原因与消息），即可快速定位大多数问题。

## 从事件跳转到关联对象

事件列表的 **关联对象** 列展示事件涉及的资源（`involvedObject.kind` 与 `involvedObject.name`）：

- 点击对象名称，Kuboard 自动把 Kind 映射为资源类型，并跳转到对应资源的详情页（名称空间级与集群级对象都可跳转，如跳转 [Deployment](../workload/deployments) 或 [节点](../cluster-resources/nodes)）；
- 若该资源在 Kuboard 中没有对应的详情页，会提示"系统中没有与该资源对应的详情页"，此时可用行内 **YAML** 按钮查看事件原始对象。

<!-- screenshot-todo: 点击关联对象名称（如 FailedScheduling 事件涉及的 Pod 名称）后的跳转示意 -->

## 资源详情页中的事件区块

详情页的**事件区块**以"**X 个关联事件**"标题展示，每一行从左到右为：

| 列 | 说明 |
| --- | --- |
| Count | 该事件的发生/聚合次数（`count`，即重复次数） |
| Reason | 原因 |
| Time | 最近发生时间（`lastTimestamp`；无则取 `eventTime`，再退回 `creationTimestamp`） |
| Message | 消息（单行省略） |

点击任一行可展开完整详情：

| 字段 | 说明 |
| --- | --- |
| Type | `Normal`（蓝色标签）/ `Warning`（红色标签） |
| Reason | 原因编码 |
| FirstTime | 首次发生时间（`firstTimestamp`） |
| LastTime | 最近发生时间（`lastTimestamp`） |
| RepeatCount | 重复次数（`count`） |
| Source | 事件的来源组件与主机，格式 `组件名@主机名`（`source.component` / `source.host`），如 `kubelet@node-01`，可据此判断事件由哪个组件产生 |
| Message | 完整消息 |

行内的观感规则：

- **Warning 事件以红色底色高亮**，Normal 事件为灰色底色，发生异常的条目一眼可辨；
- 页面通过实时推送（SSE）订阅事件变更：新事件到达后区块自动刷新，**新出现的行会闪烁约 6 秒**后恢复常态；
- 事件数超过 10 条时，底部显示"已显示 X 条，共 Y 条"与 **查看更多** 按钮，点击按每页 10 条继续加载。

<!-- screenshot-todo: Pod 详情页顶部事件区块：Warning 红色高亮行、单条展开后的详情字段（Type/Reason/FirstTime/LastTime/RepeatCount/Source/Message） -->

::: tip 区块中事件行的关闭图标
事件区块中每行右侧的关闭图标可删除对应事件（Warning 事件可同时勾选"清除本对象其他错误事件"），用于清理已过期的冗余记录。通常无需手动删除——Kubernetes 会按 TTL 自动回收过期事件。
:::

## 通过事件排障：一个典型流程

以"应用启动后一直 CrashLoopBackOff"为例：

1. 进入对应 [Pod](../workload/pods) 详情页，查看顶部事件区块，或到全局事件列表页把类型筛选为 **警告**；
2. 找到 reason 为 `BackOff` / `CrashLoopBackOff` 的行，展开查看完整 Message（如 `Back-off restarting failed container`）；
3. 点击行的关闭图标旁的关联对象（或到列表页点击对象名）进入关联资源详情页；
4. 结合 Message 分别处理常见根因：

| 常见 Warning reason | 常见根因与处理 |
| --- | --- |
| `FailedScheduling` / `0/3 nodes are available` | 资源不足或节点选择器不匹配，见 [节点](../cluster-resources/nodes) 与工作负载调度配置 |
| `Failed` / `ErrImagePull` / `ImagePullBackOff` | 镜像不存在、私有仓库认证失败，检查镜像地址与镜像拉取密钥 |
| `BackOff` / `CrashLoopBackOff` | 容器启动即退出，查看容器日志定位应用报错 |
| `Unhealthy` | 就绪/存活探针失败，检查应用是否监听在探针配置的端口与路径 |
| `FailedMount` | 存储卷挂载失败，检查 PV/PVC 与存储插件状态 |
| `NodeNotReady` | 节点异常，检查节点上的 kubelet 与资源状况 |

5. 处理完成后回到事件区块：若该行停止增长（Count 不再增加、不再出现新的 Warning），说明问题已缓解；由于事件按 TTL 回收，短暂延时后旧事件会自然消失。

## 权限要求

查看事件需要对应资源权限：全局事件列表页需要 `events` 资源的 `list` 权限（集群级或名称空间级）；详情页内嵌事件区块在无权限时隐藏，同时以按钮形式给出"访问该对象关联事件列表"的授权提示。

## 相关页面

- [资源全景图](./resource-map)：在全局拓扑中查看集群资源，事件也是排障入口之一
- [操作审计](../../ops/audit-log)：Kuboard 用户操作日志，与 Kubernetes 事件无关
