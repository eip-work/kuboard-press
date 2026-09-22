---
description: 资源全景图（Resource Map）以拓扑图形式可视化集群内 Workload / Service / Ingress / ConfigMap / Secret 等资源之间的依赖关系，支持按命名空间、资源类型、状态过滤，点击节点下钻查看详情、编辑 YAML、查看日志与终端
---

# 资源全景图（Resource Map）

资源全景图把同一集群里零散分布的资源画成一张**关系拓扑图**：每个资源是一个节点，资源之间的依赖关系（谁被谁引用、谁挂载了谁、流量转发给谁）是带标签的连线。排障时一眼就能看出"Ingress 后端的 Service 指向了哪个 Deployment""这个 ConfigMap 被哪些 Pod 引用"。

```text
Ingress（路由目标）→ Service（选择器匹配）→ Deployment（owner）→ ReplicaSet（owner）→ Pod
                                                          ↓ 配置引用 / 挂载
                                                    ConfigMap / Secret / PVC
```

## 入口位置

1. 登录 Kuboard，进入目标集群（不进入具体名称空间）；
2. 左侧导航 **运维与可观测 → 资源全景图**，打开的是全屏拓扑视图，路径为 `/k8s/resource-map`。

进入页面后自动加载当前账号有权限的集群与名称空间：只有一个可访问集群时自动选中；多个集群时需手动选择。

<!-- screenshot-todo: 资源全景图整体界面（顶部工具栏 + 拓扑画布 + 右下角缩放控制） -->

## 认识拓扑图

拓扑图由三部分组成：**节点**（资源）、**分组框**（组织方式）、**连线**（关系）。

### 节点

每个节点是一张卡片，上方小字是"资源类型 / 名称空间"，下方大字是资源名称，右上角是状态角标：

| 状态 | 角标 | 含义示例 |
| --- | --- | --- |
| 正常 | 无角标 | Pod 就绪、副本全部可用 |
| 警告 | 橙色图标 | Pod Pending / Terminating、副本未就绪、Ingress 尚无 LoadBalancer 地址 |
| 错误 | 红色图标 | Pod Failed、Deployment Available=False、Job 有失败 |

鼠标悬停节点约半秒，会展开一张**信息卡**（Glance），显示该类型的关键字段：Pod 的 Phase / IP / 就绪容器数 / 所在节点，Deployment 的副本数（带进度条），Service 的类型 / ClusterIP / 端口，以及该资源最近的 Kubernetes 事件。

### 分组框

工具栏的**分组方式**决定节点如何装进虚线框：

| 分组方式 | 分组依据 | 适用场景 |
| --- | --- | --- |
| 命名空间（默认） | 资源所属命名空间 | 默认视图，按空间隔离观察 |
| 实例 | `app.kubernetes.io/instance` / `app` / `k8s-app` 标签 | 按应用实例归类，跨空间看一个应用的全套资源 |
| 节点 | Pod 所在节点 | 观察 Pod 在节点上的分布 |

分组框头部显示名称与资源数量，点击可折叠/展开。**折叠后的框**会显示一行"类型 ×数量"摘要标签（如 `Deployment ×2 · ConfigMap ×5`），不用展开就能看到构成。节点数很多的框默认自动折叠，也可用工具栏的 **全部展开 / 全部折叠** 一键切换。

同一分组框内相互连通的资源会再聚合成**连通子图**（Connected Component，图标为链条状、无虚线框），表示一个内部有关联的资源簇；点击它的头部同样可以折叠。

### 连线

每条线都带一个关系标签，说明两端资源的依赖语义，例如：

| 标签 | 含义 | 关系类别 |
| --- | --- | --- |
| 选择器匹配 | Service → Pod（标签选择器命中） | Selector |
| 路由目标 / 后端目标 | Ingress / HTTPRoute → Service | 引用 / Gateway |
| 使用 ConfigMap / 使用 Secret | Pod / Job → ConfigMap / Secret | 配置引用 |
| 挂载 PVC / 绑定 PVC | Pod → PVC、PV → PVC | 存储 |
| 伸缩目标 | HPA → Deployment / StatefulSet | 引用 |
| 绑定角色 / 绑定 SA / 使用 SA | RoleBinding → Role / ServiceAccount，工作负载 → ServiceAccount | RBAC |
| 父网关 / TLS 证书 / 授权目标 | HTTPRoute → Gateway、Gateway → Secret、ReferenceGrant → Service | Gateway |
| 创建的 Job / owner | CronJob → Job、ReplicaSet → Pod（ownerReferences 父子） | Owner |
| Webhook 目标 | ValidatingWebhookConfiguration / MutatingWebhookConfiguration → Service | Webhook |

鼠标悬停一条线时，它的两个端点节点会高亮、其余节点变暗；点击可锁定选中（再点取消），方便追踪一条调用链。

## 选择要展示的资源

工具栏左侧的 **数据源** 按钮（带已选数量徽标）打开资源类型选择面板，资源按 8 个分组排列：

| 分组 | 包含资源 | 默认 |
| --- | --- | --- |
| 工作负载 | 容器组（Pod）、Deployment、StatefulSet、DaemonSet、ReplicaSet、Job、CronJob、JobSet | 勾选 |
| 网络 | Service、Ingress、Endpoints、EndpointSlice、IngressClass、NetworkPolicy | 勾选 |
| 配置 | ConfigMap、Secret、HPA、VPA、PDB、ResourceQuota、LimitRange、PriorityClass、RuntimeClass、Lease | 勾选 |
| 存储 | PVC、PV、StorageClass、CSIDriver、CSINode、VolumeAttachment | 勾选 |
| 安全 | ServiceAccount、Role、RoleBinding、ClusterRole、ClusterRoleBinding | 不勾选 |
| 集群 | 节点、名称空间、事件 | 不勾选 |
| Gateway (Beta) | GatewayClass、Gateway、HTTPRoute、GRPCRoute、TCPRoute、TLSRoute、UDPRoute、ReferenceGrant、BackendTLSPolicy、BackendTrafficPolicy | 不勾选（集群装了 Gateway API 才显示） |
| 自定义资源 | 集群内 CRD 动态发现（如 Certificate、Issuer 等） | 不勾选 |

面板中每个资源类型右侧显示其在当前范围的数量，并提供 **全选可用 / 全选 / 取消全选** 三个快捷按钮。只保留你关心的类型，图上节点变少、连线更清晰。

::: tip 什么是"未缓存"
资源数据优先来自 Kuboard 的集群缓存（cluster-cache）；未配置缓存的资源会按命名空间直接查询 API Server，列表会打上"未缓存"标签，工具栏横幅也会提示。这类资源通常仅少数几种（如 ReplicaSet），数量大时首屏会稍慢。
:::

::: warning 权限不足的资源不参与展示
对某一资源类型没有 list 权限时，该类型会在面板中置灰或显示"无权限"，其对象不会出现在图上——这是权限过滤，不是数据缺失。
:::

## 过滤与聚焦

| 操作 | 位置 | 效果 |
| --- | --- | --- |
| 按命名空间过滤 | 工具栏命名空间多选 | 只保留所选命名空间的资源及与它们直接关联的对象 |
| 按状态过滤 | 工具栏状态多选（正常 / 警告 / 错误） | 只保留命中状态的节点及其关联节点，无匹配时给出提示并一键清除过滤 |
| 按关系类别过滤 | 工具栏 **关系类别** 按钮（显示 `n/8`） | 隐藏不需要的关系线，只留所选类别（默认全部勾选，Webhook 除外） |
| 关键字搜索 | 工具栏搜索框 | 按资源名称 / 类型即时匹配：命中节点蓝色高亮、其余节点灰化，右下角 **居中** 按钮把结果带到视野中央 |
| 展开 / 折叠 | 工具栏 **全部展开 / 全部折叠** | 一键切换所有分组框的折叠状态（图上节点少于 50 时可用） |

所有过滤条件都会写入地址栏（见下文"分享视图"），把当前视角发给同事即可复现同一张图。

## 查看资源详情

### 点击节点

点击任意节点，右侧滑出**详情抽屉**，包含四个标签页：

| 标签页 | 内容 |
| --- | --- |
| 元数据 | 名称、类型、命名空间、UID、集群、创建时间、Labels、Annotations |
| 状态 | 该资源最近的事件时间线 + 按类型定制的状态面板（Pod 容器状态、工作负载副本、Service 端点、Ingress 地址、Gateway 条件、配额用量等） |
| YAML | 只读 YAML，可一键复制 |
| 相关 | 与它相连的上下游资源列表，标注方向（上游 / 下游 / 双向）与关系标签，点击直接跳到对应节点 |

抽屉头部对支持详情页的资源提供 **查看详情 / 编辑** 按钮，点击在新标签页打开该资源的常规详情页（如 Deployment 详情、Service 详情）。

<!-- screenshot-todo: 点击节点后的详情抽屉（"相关"标签页展示上下游资源列表） -->

### 右键节点

在节点上点击右键，弹出快捷操作菜单：

| 操作 | 适用范围 |
| --- | --- |
| 查看详情 / 编辑 YAML / 复制 YAML | 所有节点 |
| 查看日志 / 进入终端 / Debug Container | Pod |
| 重启 / 伸缩 | Deployment、StatefulSet、DaemonSet |
| Node Shell | 节点 |

重启与伸缩会弹窗二次确认，执行后自动刷新拓扑。复制 YAML 直接把该资源的完整对象复制到剪贴板。

<!-- screenshot-todo: 节点右键菜单（Pod 节点，含查看日志 / 进入终端等操作） -->

### 面包屑定位

选中嵌套较深的节点（如命名空间框内连通子图里的 Pod）时，画布左上角会出现**面包屑**，显示它所在的完整层级路径，点击任一层级即可跳回该分组，快速在多层结构中定位。

## 分享视图

资源全景图的全部视图状态都同步在地址栏中，可直接复制 URL 分享：

```sh
# 示例：default 与 ops 两个命名空间、只展示工作负载与网络、按实例分组、选中某节点
/k8s/resource-map?clusterId=xxx&namespaces=default,ops&sources=workloads,network&group=instance&node=<node-uid>&status=warning&relCats=owner,selector,reference
```

| 参数 | 说明 |
| --- | --- |
| `clusterId` | 集群 ID |
| `namespaces` | 命名空间，逗号分隔 |
| `sources` | 数据源分组或资源类型，逗号分隔 |
| `group` | 分组方式：`namespace` / `instance` / `node` |
| `status` | 状态过滤：`success` / `warning` / `error` |
| `relCats` | 关系类别 ID，逗号分隔（不传为默认 7 类） |
| `node` | 选中节点的 UID，打开页面即弹出其详情抽屉 |

::: tip 排障建议
先看全局：哪个命名空间框里有红色 / 橙色角标的节点；右键进入该资源详情页确认报错信息；再用"相关"标签页沿着连线上下游排查——Ingress → Service → Deployment → Pod 链路中，问题往往出在连接断开的那一段（比如 Service 选择器没有匹配到任何 Pod）。
:::
