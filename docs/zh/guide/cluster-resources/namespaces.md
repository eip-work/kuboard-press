---
description: 集群资源 - 名称空间 Namespace：入口与列表页（集群/名称/创建时间/操作）、创建名称空间、详情页概览（资源对象缓存统计）、容器组安全性标准 Pod Security Admission 标签配置、资源限额页签（LimitRange 容器默认请求/限制、ResourceQuota 各资源配额的使用情况与行内编辑）、删除名称空间
---

# 名称空间 Namespace

名称空间（Namespace）是 Kubernetes 中的**集群级**资源，用来把一个集群切分成多个逻辑上相互隔离的"虚拟集群"。在 Kuboard 中，工作负载、配置字典/密文、服务、网络策略等资源都挂在某个名称空间下，名称空间是日常管理的最小作用域。

::: tip 相关资源
- 为名称空间设置**资源上限**使用 [资源配额 ResourceQuota](./quota-limitrange)，为容器设置**默认的 CPU/内存 请求与限制**使用 [限制范围 LimitRange](./quota-limitrange)；
- 名称空间之间的网络隔离由 [网络策略 NetworkPolicy](../network/networkpolicy) 实现；
- 工作负载（Deployment、StatefulSet 等）本身位于名称空间内，见 [Deployment 部署](../workload/deployments)。
:::

## 入口位置

名称空间列表页位于左侧导航 **集群管理 → 名称空间**（菜单路径 `/k8s/api/namespaces`，标题"名称空间" / Namespaces；同分组下还有 **限制范围**、**资源配额**、**服务账户**）：

1. 登录 Kuboard，点击左侧导航 **集群管理**；
2. 点击 **名称空间**，进入列表页。

名称空间是集群级资源，列表页默认按集群分组展示，可以通过页面右上角的"搜索 / 树形"开关切换列表模式。

<!-- screenshot-todo: 名称空间列表页整体：树形导航按集群分组、右侧表格列（选择框/集群/名称/创建时间/操作）、右上角创建按钮与搜索/树形切换开关 -->

## 列表页

列表页复用 Kuboard 通用资源列表，主要列如下：

| 列 | 说明 |
| --- | --- |
| 选择框 | 勾选后可用于**批量删除** |
| 集群 | 名称空间所在的集群 |
| 名称 | 名称空间名称，点击进入详情页；正在删除的名称空间显示删除动画 |
| 创建时间 | 相对时间显示，可排序 |
| 操作 | 单行操作按钮 |

表头操作：

| 按钮 | 说明 |
| --- | --- |
| 创建（+） | 新建名称空间，见下文"创建名称空间" |
| 批量删除 | 删除勾选的名称空间，勾选后才会亮起 |

行内操作：

| 按钮 | 说明 |
| --- | --- |
| YAML | 以对话框查看 / 编辑该名称空间的 YAML（需 `namespaces` 的 `get` 权限） |
| 删除 | 删除该名称空间（需 `delete` 权限），确认对话框要求输入名称、可设置宽限期（GracePeriod）与波及策略（Propagation Policy） |

## 创建名称空间

1. 在名称空间列表页点击右上角 **创建** 按钮，弹出「创建 namespaces 对象」对话框；
2. **集群**：选择目标集群（仅列出状态就绪的集群）；
3. **创建方式**：选择「从表单创建」（也可以选「从 YAML 创建」，直接用 YAML 定义）；
4. 进入创建页后填写 **名称空间名字**（`metadata.name`，集群内唯一，命名遵循 RFC 1123 规则），可附加 标签 / 注解；
5. 点击 **保存**，Kuboard 弹出 **YAML 预览** 展示将要提交的 `v1/Namespace` 对象；
6. 确认无误后点击提交，名称空间创建完成，列表页随即出现新条目。

::: warning 新建名称空间是"空的"
新建操作只提交一个仅含 `metadata.name` 的 Namespace 对象，Kuboard **不会**自动为它创建 ResourceQuota 或 LimitRange。配额、默认请求/限制需要在创建后到详情页的"资源限额"页签设置。
:::

## 名称空间详情页

点击列表中的名称空间名称进入详情页。页头提供 **编辑**、**YAML**、**删除** 等操作，正文包含三个页签：

| 页签 | 内容 |
| --- | --- |
| 概览 | 按 API 分组统计该名称空间内各类资源对象的数量 |
| 容器组安全性标准 | 编辑名称空间标签，配置 Pod Security Admission（PSA）的 enforce / audit / warn 三个层级 |
| 资源限额 | 查看并编辑容器资源默认请求/限制（LimitRange）与资源配额（ResourceQuota） |

### 概览

进入页签后，Kuboard 从**集群缓存**中统计该名称空间下各 API 分组、各资源类型的对象数量，并按分组/资源类型逐一展示数字卡片。

- 页面顶部的提示条注明"只显示被缓存的 K8S 对象的总数"；
- 缓存由 Kuboard 后端同步，未同步的资源不在此统计；点击提示条中的 **配置 K8S 对象缓存** 可进入系统设置调整缓存范围。

<!-- screenshot-todo: 名称空间详情页「概览」页签：顶部缓存提示条 + 按 API 分组排列的资源对象数量统计卡片 -->

::: tip 为什么以缓存为准
概览统计来自 Kuboard 的集群资源缓存（`ClusterSyncDataCount`），因此实时性取决于缓存同步，但统计成本低、无需逐项查询 API Server。
:::

### 容器组安全性标准（Pod Security Admission）

Pod Security Admission（PSA）是 Kubernetes 内置的准入控制，通过名称空间上的三个标签为容器组（Pod）指定安全级别。Kuboard 在此页签以表单方式维护这些标签：

| 标签 | 界面分组 | 含义 |
| --- | --- | --- |
| `pod-security.kubernetes.io/enforce` | 强制执行（Enforce） | 不符合的容器组将被拒绝创建 |
| `pod-security.kubernetes.io/audit` | 记录审计日志（Audit） | 不符合的容器组被记录审计事件，但仍创建 |
| `pod-security.kubernetes.io/warn` | 告警（Warn） | 不符合的容器组向用户返回告警，但仍创建 |

操作步骤：

1. 打开 **容器组安全性标准** 页签；
2. 页签上半部分可直接编辑 **名称空间的标签**（键值对），点击铅笔图标进入编辑模式；
3. 在 Pod Security Admission 区域为 enforce / audit / warn 分别选择安全级别：**Privileged**（宽松）、**Baseline**（基线）、**Restricted**（严格），或点击"清除"删除对应标签（即"未设置"）；
4. 点击 **保存**，Kuboard 以"对比 YAML"的方式提交标签修改。

查看模式下，已设置的级别以标签展示，未设置的显示"未设置"。此区域仅在集群支持 PSA（`admission.psa` 特性可用）时显示。

::: tip 三个级别从宽到严
- Privileged：最宽松，不限制特权容器；
- Baseline：限制已知的特权提升手段；
- Restricted：最严格，仅允许符合加固要求的容器组。

更详细的行为差异可参考界面右上角"帮助"链接指向的 Kuboard 学习中心文章（Pod 安全标准）。
:::

<!-- screenshot-todo: 名称空间详情页「容器组安全性标准」页签：标签编辑区 + PSA 的 Enforce/Audit/Warn 三个单选组（Privileged/Baseline/Restricted + 清除） -->

### 资源限额

**资源限额** 页签把 LimitRange 与 ResourceQuota 的常用项合并到一张页面上，可以直接查看、编辑，不需要分别去"限制范围 / 资源配额"页面操作。

#### 容器资源默认请求（LimitRange）

页面顶部展示 **容器资源默认请求** 区域，共四个格子，读取名称空间内 LimitRange 中类型为 `Container` 的 `default` / `defaultRequest`：

| 格子 | 读取字段 | 说明 |
| --- | --- | --- |
| CPU 资源预留 | `defaultRequest.cpu` | 容器未显式声明时默认的 CPU 请求 |
| CPU 资源限制 | `default.cpu` | 容器未显式声明时默认的 CPU 上限 |
| 内存资源预留 | `defaultRequest.memory` | 容器未显式声明时默认的内存请求 |
| 内存资源限制 | `default.memory` | 容器未显式声明时默认的内存上限 |

未设置时显示"未设置"。点击格子旁的 **编辑**，输入新值后保存：

- CPU 以核为单位（如 `2`）或毫核（如 `100m`）；
- 内存以字节单位书写（如 `240Mi`、`2Gi`）。

保存后 Kuboard 自动创建或更新一个**与名称空间同名的 LimitRange**；修改会立即影响之后创建、且未显式声明对应字段的容器。

#### 资源配额（ResourceQuota）

下方按资源类型列出若干配额行，每行读取名称空间内 ResourceQuota 的 `spec.hard`（上限）与 `status.used`（已使用）：

| 配额行 | 对应 ResourceQuota 条目 |
| --- | --- |
| CPU 限额 / CPU 请求 | `limits.cpu` / `requests.cpu` |
| 内存限额 / 内存请求 | `limits.memory` / `requests.memory` |
| Nvidia 显卡数量 / Amd 显卡数量 | `requests.nvidia.com/gpu` / `requests.amd.com/gpu` |
| 存储卷声明总容量 | `requests.storage` |
| 存储卷声明数量 | `count/persistentvolumeclaims` |
| 容器组数量 | `count/pods` |
| 部署 / 有状态副本集 / 守护进程集数量 | `count/deployments.apps` / `count/statefulsets.apps` / `count/daemonsets.apps` |
| 服务数量 | `count/services` |
| 密文 / 配置字典数量 | `count/secrets` / `count/configmaps` |

每行的结构：

| 字段 | 说明 |
| --- | --- |
| 资源类型 | 配额对应的资源项 |
| 已使用 | `status.used`，未设配额时显示"不限制" |
| 资源限制 | `spec.hard` 中的上限，未设时显示"不限制"；可点击 **编辑** 直接填写，或点击 **清除** 删除该项限制 |
| 使用情况 | 进度条，显示已使用占上限的百分比 |

进度条颜色规则：

| 使用率 | 颜色 |
| --- | --- |
| ≤ 20% | 绿色 |
| 21% – 60% | 默认色 |
| 61% – 80% | 黄色告警 |
| > 80% | 红色异常 |

保存编辑时，Kuboard 会自动创建或更新与名称空间同名的 ResourceQuota，新增或修改对应的 `spec.hard` 条目；仅对某项资源生效，不影响其他未编辑的配额行。

<!-- screenshot-todo: 名称空间详情页「资源限额」页签：顶部 LimitRange 四个默认请求/限制格子（含未设置态），下方 ResourceQuota 各资源行（资源类型/已使用/资源限制/使用情况进度条），并标注行内编辑与清除按钮 -->

::: tip 更完整的配额管理
本页签聚焦最常用的资源项。需要管理全部配额条目（如 `count/services.nodeports`、按优先级/负载分级的 `scopeSelector` 配额）或查看配额明细时，可到 **集群资源 → 资源配额** 页面操作。
:::

## 删除名称空间

1. 在列表页勾选一个或多个名称空间，点击表头的 **批量删除**；或点击某行操作列的 **删除**；
2. 在确认对话框中输入对象名称（批量删除时按 Kubernetes 集群中的条目 / 缓存中的条目分别处理）；
3. 可选：设置宽限期（GracePeriod）与波及策略（Propagation Policy）；
4. 确认后，Kuboard 向集群提交删除请求，被删除的名称空间进入 `Terminating` 状态，列表中以删除样式显示直至完全消失。

::: warning 删除前请确认
删除名称空间会连带删除其中**全部**工作负载、服务、配置、存储声明等资源，且通常不可恢复。请先确认名称空间内的资源已迁移或不再需要。
:::
