---
description: 工作负载 Pod 章节：列表与详情页结构、容器状态与条件、容器探针（livenessProbe/readinessProbe/startupProbe）、Web 终端、日志、文件浏览器、调试容器（ephemeral container）及删除注意事项
---

# Pod

Pod 是 Kubernetes 中最小的调度单元，一个 Pod 内部可以包含一个或多个容器，这些容器共享网络命名空间与存储卷。在生产环境中，Pod 通常由控制器（如 Deployment、StatefulSet、DaemonSet）统一管理，您很少需要直接创建或删除 Pod。Kuboard 的 **Pod** 页面用于跨工作负载查看、诊断和运维集群中的所有容器组（Kuboard 中 Pod 的中文界面用语为"容器组"）。

::: tip 术语说明
本文中"容器组"与 Pod 均指 Kubernetes 的 Pod 对象（apiVersion `v1`，resource `pods`）。Kuboard 界面上的中文用语统一为"容器组"，本文行文两者混用。
:::

## Pod 与工作负载的关系

Pod 本身一般不是直接创建的，而是由工作负载控制器管理：

| 控制器 | 管理方式 | Kuboard 归属页面 |
| --- | --- | --- |
| Deployment / ReplicaSet | 维持期望副本数，滚动更新、故障重建 | [Deployment](./deployments) |
| StatefulSet | 有状态应用，稳定网络标识与存储 | [StatefulSet](./statefulsets) |
| DaemonSet | 每节点（或部分节点）运行一个副本 | [DaemonSet](./daemonsets) |
| Job / CronJob | 一次性或定时任务 | [Job / CronJob](./jobs-cronjobs) |

在 Pod **详情页**顶部有一个 **查看归属的 {kind} {name}** 按钮：Kuboard 读取 Pod 的 `metadata.ownerReferences`，若归属对象是 ReplicaSet（Deployment 的底层控制器），将跳转到其上层 Deployment 页面；若归属 StatefulSet / DaemonSet，则直接跳转到对应工作负载页面。

::: tip Deployments 是推荐的运维入口
日常的"重启应用"、"扩缩容"、"滚动更新"请在工作负载（如 [Deployment](./deployments)）页面操作；Pod 页面更适合排障场景——查看某个具体容器组的容器状态、日志、进入终端、检查文件等。
:::

## 入口位置

1. 登录 Kuboard，在左侧导航进入 **集群管理 → Kubernetes 集群**（导入方式见 [导入 Kubernetes 集群](../cluster/import)）；
2. 点击集群进入集群页面，选择名称空间；
3. 在 **工作负载 → Pod（容器组）** 下进入 Pod 列表页（对应的资源页面路由为 `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods`）；
4. 点击 Pod 名称进入详情页（路由 `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}`）。

您也可以从 Deployment、StatefulSet 等工作负载的详情页直接点击其下的 Pod 进入本页。

## 列表页

Pod 列表页通过 `K8sObjectList` 渲染（api-group 为空、resource 为 `pods`、namespaced），顶部可以选择集群与名称空间（或切换为集群/名称空间树模式），并提供按名称搜索、按创建时间筛选、**异常负载优先显示**开关等筛选能力。

### 列表列

| 列 | 说明 |
| --- | --- |
| （多选框） | 用于选中多行后批量删除 |
| 集群 / 名称空间 / 名称 | Kuboard 统一添加的基本列；名称带删除时间戳（正在删除）的 Pod 会显示删除动画 |
| 就绪（Ready） | 处于 Ready 状态的容器数 / Pod 内容器总数，如 `2/3` |
| 状态（Phase） | Pod 的 `status.phase`，以彩色标签展示：`Running`（绿）、`Succeeded`（蓝）、`Failed`（红）、`Pending`（黄）、`Unknown`（黄） |
| 重启（Restarts） | 各容器 `restartCount` 之和；若发生过重启，追加最近一次重启的相对时间，如 `3 (2 天前)` |
| 创建时间 | Pod 的 `metadata.creationTimestamp`（相对时间展示，可排序） |
| 操作 | **日志/终端**、**YAML**、**删除** |

### 展开面板

点击每行左侧的展开箭头，可查看两个信息卡片：

- **Pod Info**：Pod IP（`status.podIP`）、所在节点（`status.hostIP` / `spec.nodeName`）、QoS Class（`status.qosClass`）、Service Account（`spec.serviceAccountName`）；
- **Containers**：每个容器的名称、镜像（`container.image`）与容器状态标签——`Running`（绿）、`Waiting`（黄）、`CrashLoopBackOff`（红），其他情况展示 waiting/terminated 的 reason。

### 日志 / 终端（每容器快捷操作）

点击每行的 **日志/终端** 按钮，弹出面板列出该 Pod 的所有容器：初始化容器（init）与工作容器分别展示。每个容器提供一组按钮：

| 按钮 | 权限要求 | 说明 |
| --- | --- | --- |
| 文件浏览器 | `pods/exec create` 且容器已启动 | 打开 [容器文件浏览器](#容器文件浏览器) |
| 下载日志 | `pods/log get` | 打开 [历史日志下载](#历史日志下载) 对话框 |
| 追踪日志 | `pods/log get` | 新窗口打开 [日志页面](#实时日志)，URL 为 `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/log?container={container}` |
| 终端 | `pods/exec create` 且容器已启动 | [Web 终端](#web-终端)，默认 `bash`，下拉可切换 `sh` / `cmd` / `powershell` |

### 删除

列表行或批量选中后均可删除 Pod，删除动作会弹出统一的删除确认对话框，详见 [删除 Pod 的注意事项](#删除-pod-的注意事项)。

## 详情页

Pod 详情页（`view/index.vue`）通过 `K8sPageFormView` 渲染，并通过 SSE 订阅 Pod 与 Event 两类对象的变更，实现页面实时刷新。页面自上而下分为：事件、CPU/内存曲线、基本信息、条件（Condition）、容器列表。

### 查看归属 & 页面操作按钮

- **查看归属的 {kind} {name}**：跳转到管理该 Pod 的工作负载页面（见上文"Pod 与工作负载的关系"）；
- **YAML**：以只读方式查看 Pod 完整 YAML；
- **删除容器组**：删除当前 Pod，提示语为"删除后控制器将创建一个新的容器组，类似重启效果"；
- **下拉菜单**：`pod-context.extension-point.kuboard.cn` 扩展点注入的附加操作。

若 Pod 正处于删除中（`metadata.deletionTimestamp` 非空），页面顶部会以红色标签显示："正在删除此 Pod。删除时间：{time}，deletionGracePeriodSeconds: {seconds} 秒"。

### 基本信息

| 字段 | 数据来源 |
| --- | --- |
| 所在节点 | `spec.nodeName`（可点击跳转节点详情页）+ `status.hostIP` |
| 容器组IP | `status.podIP`；若存在关联的 Service，同时显示 `{podName}.{serviceName}` 形式的 DNS 名称 |
| 状态 | `status.phase` |
| 重启策略 | `spec.restartPolicy`（如 `Always`） |

### 条件（Conditions）

Kuboard 将 `status.conditions` 按固定顺序排序展示：`PodScheduled` → `Initialized` → `PodReadyToStartContainers` → `ContainersReady` → `Ready` → `DisruptionTarget` → `PodResizePending` → `PodResizeInProgress`。每条条件展示：

- 状态图标与中文名称：条件为 `True` 显示绿色图标与中文名（如"已调度 / 已初始化 / 已就绪"），为 `False` 显示红色图标与"未调度 / 未初始化 / 未就绪"等；
- `lastTransitionTime`（最近一次状态变更时间）；
- 条件非正常时显示的 `reason` 与 `message`；
- 特殊处理：`Ready` 与 `ContainersReady` 在 `reason = PodCompleted`（Pod 正常运行完成）时显示"容器组已完成 / 容器已完成"。

### 容器列表（Container Details）

详情页按顺序渲染 **初始化容器（initContainer）**、**工作容器（container）** 与 **临时容器（ephemeralContainer）**，每类容器均使用相同的容器详情卡片。卡片顶部为容器标识：Docker 图标 + 就绪状态圆点（就绪为绿色）+ 重启次数，以及标签：`容器`（蓝色）、`初始化容器`（绿色）、`临时容器`（黄色）。

每张容器卡片包含以下内容：

| 区块 | 说明 |
| --- | --- |
| 镜像 | `container.image` 与镜像抓取策略 `container.imagePullPolicy` |
| 当前状态 | running / waiting / terminated 状态标签及标签内的 StartedAt、FinishedAt、Reason、ExitCode；另有 `Started / Not Started` 与 `Ready / Not Ready` 标签 |
| 最后状态 | 可点击打开的 popover，展示上一次运行状态的开始/结束时间、原因、退出码与 `ContainerID` |
| 资源需求/限制 | CPU、内存的 `requests → limits`；若配置了 `amd.com/gpu` 或 `nvidia.com/gpu` 限制则额外展示 GPU |
| 数据卷挂载 | 每个 `volumeMount` 展示：只读/读写标签、`mountPath`、可选 `subPath` / `subPathExpr`、`mountPropagation` |
| 环境变量 | 入口图标（点击展开），`container.env` / `container.envFrom` 的查看入口 |
| 命令/参数 | `container.command` 与 `container.args` |
| 探针 | 启动检查探针 / 就绪检查探针 / 存活检查探针，见 [容器探针](#容器探针) |

::: tip 探针与资源的未配置提示
工作容器卡片右上角的探针图标与资源图标：若容器未配置任何探针或资源需求，图标以红色警示样式展示，点击提示"您尚未配置就绪探针和存活探针"、"您尚未配置容器的资源需求和资源限制"。
:::

卡片底部是容器级操作按钮：**文件浏览器**、**下载日志**、**追踪日志**、**终端**（bash / sh / cmd / powershell 下拉）以及 `container-context.extension-point.kuboard.cn` 扩展点下拉。

### CPU / 内存指标曲线

详情页中部展示两张指标曲线卡片（CPU 与 内存），由 Kuboard 内置的 **metrics-scraper** 提供（需集群中安装 `kuboard/metrics-scraper` 与 `kuboard/kuboard-metrics-server`）。未安装时可一键跳转安装。

### 事件（Events）

页面顶部为 **EventsRegardingObject** 组件，以"X 个关联事件"按钮展示与该 Pod（按 `metadata.uid` 关联）相关的全部事件，展开后按 `Count / Reason / Time / Message`（列：计数 / 原因 / 相对时间 / 消息）列表展示，来源（Source）也一并显示。

## 容器探针

探针（Probe）是 K8s 对容器进行健康检查的机制。Kuboard 的容器详情卡片中提供三种探针的只读展示：

| 界面标题 | spec 字段 | 作用 |
| --- | --- | --- |
| 启动检查探针 | `startupProbe` | 容器启动阶段检查，防止慢启动容器被杀 |
| 就绪检查探针 | `readinessProbe` | 检查通过后容器才被加入 Service 端点（流量分发） |
| 存活检查探针 | `livenessProbe` | 检查失败则 kubelet 按重启策略重启容器 |

探针支持三种探测方式，Kuboard 会显示对应的类型标签与参数：

| 方式 | 字段 | Kuboard 展示 |
| --- | --- | --- |
| HTTP 请求 | `httpGet` | 拼接为 `{scheme}://${PodIP}:{port}{path}`（scheme 缺省显示 `http`，如 `https://${PodIP}:8080/healthz`） |
| TCP 连接 | `tcpSocket` | 端口 `port` |
| 执行命令 | `exec` | 命令列表 `command`（逐项以标签展示） |

共用频率字段（Kuboard 中文标签）：

| 字段 | 说明 |
| --- | --- |
| `initialDelaySeconds` | 延迟时间（容器启动后延迟执行的秒数，缺省 0） |
| `periodSeconds` | 执行频率（每次探测间隔秒数） |
| `timeoutSeconds` | 超时时间（单次探测超时秒数） |
| `successThreshold` | 健康阈值（连续成功几次判定健康） |
| `failureThreshold` | 不健康阈值（连续失败几次判定不健康） |

未配置探针时，Kuboard 对应区块显示"未配置"标签。三种探针组合的 YAML 示例：

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: my-app
      image: nginx:1.25
      startupProbe:
        exec:
          command: ["/bin/sh", "-c", "test -f /tmp/ready"]
        failureThreshold: 30
        periodSeconds: 10
      readinessProbe:
        httpGet:
          scheme: HTTP
          path: /healthz
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 2
        successThreshold: 1
        failureThreshold: 3
      livenessProbe:
        tcpSocket:
          port: 8080
        periodSeconds: 10
        timeoutSeconds: 1
        failureThreshold: 3
```

::: warning 探针字段是只读展示
Pod 页面中的探针信息为只读，修改探针请编辑管理该 Pod 的工作负载（如 [Deployment](./deployments) 的 `spec.template.spec.containers[].probes`），配置变更后会触发新的 Pod 重建。
:::

## 常用运维操作

### Web 终端

**入口**：列表页"日志/终端"弹层或详情页容器卡片中的 **终端** 按钮（需 `pods/exec create` 权限、容器已启动）。终端页 URL 形如 `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/exec?container={container}&shell={shell}&kb_charset={charset}`，默认 shell 为 `bash`，可切换 `sh` / `cmd` / `powershell`。

Kuboard 终端（`K8sTerminal`，基于 xterm.js）提供以下能力：

- **工具栏**：连接状态（正在连接/已连接/已断开）、延迟（RTT）、清空屏幕、切换 shell、复制/粘贴/全选、手动重连、终端内查找（Ctrl+Shift+F）、字符集切换（`ChangeCharset`）、字体大小、主题；
- **复制/粘贴快捷键**：macOS 使用 ⌘C / ⌘V，其他平台使用 Ctrl+Shift+C / Ctrl+Shift+V；右键菜单同样提供复制/粘贴/全选/查找/清空/复制 URL/重新连接/查看日志；
- **断线重连**：连接中断时默认弹窗询问"重新连接 / 不再自动重连"，也可记忆"总是自动重连"，最多重连 5 次（间隔 5s、15s、45s、45s、45s）；
- **错误提示**：401/403 无权限、404 Pod 或容器不存在、409 集群终端连接过多、502 后端不可达、1006 连接异常断开，均给出中文提示；
- **审计提示**：首次进入终端会弹出遮罩提示"您在此终端中的操作将被记录到审计日志"；
- **命令历史**：方向键浏览本容器执行过的历史命令（localStorage 跨会话保存）；
- **渲染**：默认 WebGL 渲染，失败时自动回退 Canvas。

WebSocket 连接地址为 `{ws|wss}://{host}/k8s-ws/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/exec?stdin=true&stdout=true&stderr=true&tty=true&command={shell}&charset={charset}&container={container}&access_token={token}&kb_protocol_type=text`。

### 实时日志

**入口**：**追踪日志** 按钮（需 `pods/log get` 权限），新窗口打开日志页面（`/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/log?container={container}&kb_charset={charset}`）。

日志页面（`K8sTerminalLogs`）通过 WebSocket 实时跟随（`follow=true`），支持：

- **实时跟随与暂停**：默认自动滚动，"暂停滚动"后可查看已缓存的历史日志；
- **缓存上限**：页面最多缓存 10000 行日志，达到上限后自动断开连接（可继续查看已缓存内容）；默认从最近 `tailLines=500` 行开始展示；
- **分页浏览**：暂停滚动后按 TAB 键可每次显示 10 / 20 / 50 / 100 行缓存日志；
- **清空日志**、查找（Find）、字符集切换、字号与主题；
- **字符集警示**：非 UTF-8 编码模式下，Kubernetes api-server 的 pods/logs 接口已改变编码，该界面无法正常显示日志中的汉字，会给出红色提示。

::: tip 从终端跳转日志
在终端右键菜单选择"查看日志"，或在工具栏操作，可开新窗口打开同一容器的日志页。
:::

### 历史日志下载

**入口**：**下载日志** 按钮（需 `pods/log get` 权限），弹出下载对话框：

- **日志开始时间**：支持"小时 + 分钟"回溯，例如"2 小时 30 分钟前，大约 {时间}"；
- **日志最大大小**：1 - 50 Mb（后端实际大小还受集群配置影响）；
- 点击 **开始下载** 后前端通过 `GET pods/log` 流式拉取日志并显示进度条，期间可点击 **放弃下载** 取消；
- 下载过程提示状态：请点击开始下载 / 正在下载 / Kubernetes 正在为您查找日志内容（seeking）/ 已下载成功 / 下载出错 / 只下载到一部分；
- 下载完成后保存为浏览器文件，文件名为 `{namespace}_{pod}_{container}.log`。

对应请求参数：`limitBytes`（最大大小）、`container`、`stdout=true`、`stdin=true`、`tty=true`、`follow=false`、`sinceSeconds`（回溯秒数）。

### 容器文件浏览器

**入口**：**文件浏览器** 按钮（需 `pods/exec create` 权限、容器已启动）。浏览器对话框分为左右两栏：

- **左栏**：文件目录树，支持"显示隐藏文件"；
- **右栏**：当前路径（面包屑）、按文件名过滤、文件列表与操作按钮；
- **顶部**：显示集群 / 名称空间 / 容器组 / 容器、容器内当前用户（`whoami` 探测结果）以及**字符编码**选择（UTF-8 / GB18030 / GB2312 / GBK）。

文件列表列：文件名（目录可点击进入）、属性（attr）、Owner、Group、文件大小、更新时间；支持排序与分页（10/20/50/100）。

工具栏提供以下操作：

| 操作 | 说明 |
| --- | --- |
| 创建文件 / 创建文件夹 | 当前目录下新建（touch / mkdir） |
| 复制 / 移动 | 选中一个或多个文件后执行 `cp` / `mv` |
| 删除 | 删除选中的文件或目录 |
| chmod | 修改选中文件/目录权限 |
| 压缩 / 解压 | 单个压缩文件（`.gz` / `.tar` / `.tgz` / `.Z` / `.bz2`）可解压；其余选中项可压缩 |
| 下载 | 仅支持单个文件下载 |
| 上传 | 上传文件到当前目录 |
| 编辑 | 在线编辑文本文件（限 ≤ 1MB，且排除 `.zip`/`.tar`/`.gz`/`.jar`/`.bz`/`.rpm`）；编辑页支持保存后返回上一级 |
| 重命名 | 重命名文件或目录 |

::: tip 字符集
文件浏览器与终端共用同一套"字符编码"设置（按集群/名称空间/容器组/容器维度记忆），GB18030 等编码用于中文环境下的文件内容正确显示。
:::

### 调试容器（Debug Container / ephemeral container）

**调试容器**是注入到运行中 Pod 内的**临时容器**（ephemeral container，Kubernetes 1.23+ 特性），常用于排障场景：主容器镜像中没有 shell 或工具时，临时注入一个包含常用诊断工具的容器，共享 Pod 网络命名空间，从而对应用进行排查。

**入口**：Pod 详情页容器列表底部的 **调试容器** 按钮（需 `pods update` 权限）：

- 仅当 Pod 处于 `Running` 状态时可用；否则按钮禁用并提示"容器组未处于 Running 状态，仅在 Running 时可注入临时容器"；
- 集群版本低于 1.23（capability `pod.ephemeralContainer` 不支持）时，按钮禁用并提示"当前集群版本低于 1.23，不支持临时容器"；
- 若 Pod 已有同名调试容器，弹窗确认"容器组中已有运行中的调试容器 [{names}]，确定继续注入？"。

**注入对话框**包含三个字段：

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| 调试镜像 | `nicolaka/netshoot` | 调试容器使用的镜像 |
| Shell 命令 | `/bin/sh` | `/bin/sh` / `/bin/bash` / `/bin/zsh` |
| 容器名称 | `debugger-{6位随机串}` | 临时容器名称（RFC1123） |

点击 **注入** 后，前端调用：

```sh
POST /api/cluster.kuboard.cn/v4/pods/ephemeral-containers
```

请求体 JSON 示例：

```json
{
  "clusterId": "cluster-abc123",
  "namespace": "default",
  "podName": "my-app-7b5d9f6d8c-abcde",
  "containerName": "debugger-x1y2z3",
  "image": "nicolaka/netshoot",
  "command": ["/bin/sh"],
  "securityContext": { "privileged": true }
}
```

服务端完成注入后，自动在新窗口打开该临时容器的终端；该容器随即出现在详情页的容器列表中（带"临时容器"标签），可直接对其执行终端、日志等操作。

::: tip 注入失败排查
临时容器需要集群支持 ephemeral container（Kubernetes ≥ 1.23）。若注入后长时间未进入 Running，通常是容器镜像拉取失败（如 `ImagePullBackOff`、`ErrImagePull`），可换个镜像重试。
:::

::: warning 调试容器的生命周期
调试容器无法单独删除，将随 Pod 删除时一并清理。这符合 Kubernetes 对 ephemeral container 的约束：它只存在于其所属 Pod 的生命周期之内。
:::

## 删除 Pod 的注意事项

删除 Pod 的入口包括：列表页行内 **删除** 按钮、批量多选后的删除按钮，以及详情页的 **删除容器组** 按钮。所有入口都会弹出统一的删除确认对话框：

- **输入对象名称**：必须完整输入 Pod 名称才能确认删除（防止误删）；
- **GracePeriod**：终止宽限期（秒），即给容器优雅退出的时间；
- **PropagationPolicy**：可选级联删除策略。

删除前请注意：

::: warning Pod 删除 = 容器全部终止
删除 Pod 会立即终止其内的所有容器（应用进程随之结束），正在处理中的请求可能中断。若确认删除前希望保留流量，请先确认 Service / Ingress 已准备就绪，或在工作负载层面先做滚动更新而不是直接删 Pod。
:::

- **由工作负载管理的 Pod 会被重建**：详情页删除按钮的提示为"删除后控制器将创建一个新的容器组，类似重启效果"。新 Pod 会有**新的名称与新的 Pod IP**，依赖固定 IP 的场景（如某些接入层白名单）需要关注；
- **临时容器一并清理**：Pod 内已注入的调试容器（ephemeral container）无法单独删除，将随 Pod 删除而清理；
- **删除请在工作负载级操作**：需要"重启"应用时，建议在 [Deployment](./deployments) 等页面执行"重启"操作，或修改其 Pod 模板触发滚动更新，而不是手动删除 Pod 依赖控制器重建；
- 若 Pod 处于删除中（`deletionTimestamp` 已设置）但迟迟不消失，通常是容器未在宽限期内优雅退出，请检查容器对 SIGTERM 的处理。

