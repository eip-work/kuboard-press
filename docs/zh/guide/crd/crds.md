---
description: 定制资源定义（CustomResourceDefinition，CRD）列表页的使用：查看 CRD 定义与 YAML、跳转到定制资源实例、删除 CRD，以及 scope / versions / status 等关键字段对使用的影响
---

# 定制资源定义（CustomResourceDefinition / CRD）

**定制资源定义（CustomResourceDefinition，简称 CRD）**是 Kubernetes 用来声明"自定义资源类型"的集群级资源：你定义一个 CRD，就等于向 API Server 注册了一种新的资源类型，之后就可以像使用内置资源一样创建、查看、删除该类型的实例（Custom Resource，简称 CR）。

本页说明 Kuboard 中 CRD 的查看、编辑与删除；实例（定制资源）的日常管理见 [定制资源实例](./custom-resources)。

::: tip 典型场景
- 安装的套件 / Helm Chart 自带了 CRD（如 Gateway API、cert-manager），想确认它是否已生效（Established）；
- 自己开发了 Operator，需要查看 / 修改它声明的资源类型定义；
- 需要清理某个不再使用的 CRD，并把它的全部实例一并移除。
:::

## 入口与列表页

1. 登录 Kuboard，进入任意集群；
2. 点击左侧导航 **定制资源**（该分组在「集群资源」之下、处于集群级菜单顶层）；如果集群里已有 CRD，该分组下还会按 API 组自动挂出对应的定制资源实例菜单，见下文"跳转到定制资源列表"；
3. 点击 **定制资源定义**，进入 CRD 列表页。

CRD 是**集群级**资源，不属于任何名称空间。列表页复用 Kuboard 通用资源列表，主要列如下：

| 列 | 说明 |
| --- | --- |
| 集群 | CRD 所属集群（树形模式下按集群分组） |
| 名称 | CRD 名称（如 `crontabs.stable.example.com`），无详情页，以普通文本展示 |
| 创建时间 | 显示相对时间，可按时间筛选 |
| 操作 | **定制资源列表** / **YAML** / **删除** |

<!-- screenshot-todo: CRD 列表页整体截图：树形模式按集群分组，表格列 集群/名称/创建时间/操作，右上角"缓存生效"按钮与刷新按钮，行操作含"定制资源列表/YAML/删除" -->

页面右上角的搜索 / 树形切换开关：搜索模式下顶部出现**集群**选择器（CRD 为集群级资源，无名称空间选择器）；树形模式下左侧出现集群勾选框，可多选集群。

::: tip CRD 列表走集群缓存
CRD 列表数据来自 Kuboard 的**集群缓存**（默认每 **5 分钟**轮询刷新），因此列表页右上角显示绿色 **缓存生效** 按钮；点击它可查看缓存状态：缓存对象类型 `apiextensions.k8s.io/customresourcedefinitions`、更新方式（轮询）与间隔，以及每个集群的同步健康状态、条目数与全量同步起止时间。列表不会实时反映集群刚刚发生的变化，最多滞后一个轮询周期。
:::

## 查看 CRD 定义（YAML）

CRD 没有表单化的详情页，查看定义最直接的方式是行内 **YAML**：

1. 在 CRD 列表页目标行点击 **YAML**；
2. 弹出 YAML 编辑器，展示该 CRD 的完整定义（`apiVersion`、`metadata`、`spec`、`status`），对象类型与字段说明见下文；
3. 若你的账号对该集群的 `customresourcedefinitions` 具有 **update** 权限，编辑器**可直接修改**：改完后点击 **保存**，会先弹出与原始内容的差异对比，确认后以 apply 方式写回集群；无权限时编辑器为只读，只能查看。

<!-- screenshot-todo: CRD 的 YAML 查看/编辑对话框截图：左侧完整 CRD 定义，含 spec.group / spec.names / spec.versions / status -->

::: tip 修改 CRD 的风险
CRD 定义一旦被接受，修改其 `spec`（例如调整 schema、切换 storage 版本）会立即影响整个集群对这类资源的处理方式，且不可在 `spec` 层面任意回退。没有把握时，先在测试集群验证，再直接改生产集群的定义。
:::

## 跳转到定制资源列表

CRD 的作用是"注册一种新资源类型"，真正日常打交道的对象是它的实例。列表行操作中的 **定制资源列表**（链接图标）直接帮你跳转：

- 跳转目标 = 该 CRD 对应的定制资源列表页：`/k8s/cr/{spec.group}/{spec.names.plural}`，并按当前集群过滤；
- 例如 CRD `crontabs.stable.example.com`（`group: stable.example.com`、`plural: crontabs`）会跳到 `crontabs.stable.example.com` 的资源列表；
- 左侧导航 **定制资源 → 某 API 组 → 某资源** 就是同一个列表的不同入口，且该入口只有在集群缓存健康（`cache_health_status = ready`）时会自动生成。

实例列表页的完整使用（创建、编辑、查看、删除实例）见 [定制资源实例](./custom-resources)。

::: tip 为什么有的 CRD 跳不过去
只有已经被集群**接受**（`status.conditions` 中 `Established=True`）的 CRD 才真正可用，左侧菜单才会生成对应入口。若点击后进入空白页，先回 CRD 列表确认其状态条件，见下文"状态（status）"。
:::

## 影响使用的关键字段

CRD 的 `spec` 决定了这些实例长什么样、存在哪里、怎么访问。日常需要理解的字段如下。

### 名称、API 组与资源名

| 字段 | 示例 | 说明 |
| --- | --- | --- |
| `metadata.name` | `crontabs.stable.example.com` | 全局唯一，必须为 `{plural}.{group}` 形式 |
| `spec.group` | `stable.example.com` | 资源所属 **API 组**，实例的 `apiVersion` 以此开头（如 `stable.example.com/v1`） |
| `spec.names.plural` | `crontabs` | 资源复数名（URL 中使用的资源名，与服务账号授权、kubectl 命令一致） |
| `spec.names.singular` | `crontab` | 资源单数名（kubectl 简写用） |
| `spec.names.kind` | `CronTab` | 资源种类名（YAML 中 `kind` 字段，首字母大写驼峰式） |
| `spec.names.shortNames` | `ct` | 可选，kubectl 短名 |

### 作用范围 scope

| 取值 | 实例存放位置 | 对使用的影响 |
| --- | --- | --- |
| `Namespaced` | 某个名称空间内 | 实例列表页出现名称空间选择 / 分组；实例随名称空间删除 |
| `Cluster` | 集群级，不属任何名称空间 | 实例列表页只有集群维度；实例不受名称空间影响 |

### 版本 versions（served / storage）

`spec.versions[]` 是一个数组，每个版本有 `name`、`served`、`storage` 三个关键开关：

| 开关 | 含义 | 对使用的影响 |
| --- | --- | --- |
| `served: true` | 该版本通过 API 对外提供服务 | 客户端（kubectl / Kuboard / 其他组件）可用该版本读写实例；置为 `false` 后该版本不再可访问，但已有实例保留 |
| `storage: true` | 该版本是 etcd 中的**存储版本** | 所有版本只能有**一个** `storage: true`；切换存储版本后，Kubernetes 会把全部已有实例重写为新版本（升级迁移），过程需要时间 |
| `schema.openAPIV3Schema` | 定义该版本的字段结构 | 决定实例可以有哪些字段、字段类型；结构不完整（非结构化 schema）时 CRD 会出现警告条件 |

多版本并存时，`served` 可以多个为 `true`（多版本同时可访问），`storage` 只能一个为 `true`。

### 状态（status）

CRD 的 `status.conditions` 反映它是否真正可用，是排障的第一排查点：

| 条件 | 含义 |
| --- | --- |
| `Established=True` | 已被集群接受，可以创建实例 |
| `NamesAccepted=True` | 声明的名称（plural / kind 等）没有与已有资源冲突 |
| `NonStructuralSchema=True` | schema 不符合结构化要求（字段缺失类型等），CRD 仍可用但属于隐患 |
| `Terminating=True` | 正在被删除（如存在未清理的依赖） |

### preserveUnknownFields 与字段裁剪

- `preserveUnknownFields` 只出现在 `apiextensions.k8s.io/v1beta1` 的旧 CRD 中：为 `true` 时实例中可以塞入 schema 未声明的任意字段；
- 新版 `apiextensions.k8s.io/v1` 默认**裁剪未知字段**（pruning），实例中没有在 schema 中声明的字段会被丢弃，除非对应位置显式声明 `x-kubernetes-preserve-unknown-fields: true`。

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
      - ct
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
```

## 创建与编辑 CRD

**「定制资源定义」页面没有「创建」按钮，也没有表单化创建/编辑页**，这是有意为之：CRD 是一种高风险、面向声明式管理的集群级资源，Kuboard 建议直接在集群上用 YAML 管理它。

**创建**：把 CRD 定义写入 YAML 文件后，在集群上执行：

```sh
kubectl apply -f crontab-crd.yaml
```

创建成功后，该 CRD 会在下一次缓存轮询（最多 5 分钟）后出现在 Kuboard 的 CRD 列表中，左侧「定制资源」分组下也会随之生成对应的实例入口。

::: tip 不要在 Kuboard 里用"导入 K8S 对象"创建 CRD
「常用操作 → 导入 K8S 对象」向导只支持**名称空间级**资源，集群级的 CRD 不在其列（见[资源导出与导入](../cluster/export-import)）。创建 CRD 请使用 `kubectl apply`（或 Operator / Helm 安装时自动带上）。
:::

**编辑**：修改定义用行内 **YAML** 编辑（见上文），需要对应集群的 `customresourcedefinitions` **update** 权限；保存时以 apply 方式写回，因此可以直接在 YAML 中增删 `spec.versions`、调整 `served` / `storage` 等。

## 删除 CRD

1. 在 CRD 列表页目标行点击 **删除**（也可勾选多行后用表格上方的 **批量删除**）；
2. 弹出删除确认对话框：核对集群、对象名称，并**输入 CRD 名称**进行二次确认；
3. 可选设置 **GracePeriod**（优雅删除宽限秒数，默认 0，一般保持默认）与 **Propagation Policy**（波及策略：Foreground / Background / Orphan，不设置时由 `metadata.finalizer` 决定）；
4. 点击确定，删除完成后列表自动刷新（缓存列表最多滞后一个轮询周期）。

删除 CRD 后，该资源类型从集群 API 中消失，其菜单入口也会在下次刷新后移除。

::: danger 删除 CRD 会连带删除全部实例
自定义资源实例通过 ownerReference 归属其 CRD。**删除 CRD 会级联删除该类型的所有实例**（Foreground / Background 会清理实例，数据不可恢复）。删除前务必确认这是预期行为；如需保留数据，先不要删 CRD，而是先通过[定制资源实例](./custom-resources)把实例定义导出存档。
:::

::: warning 删除后实例消失的延迟
实例是 Kubernetes 垃圾回收（Garbage Collection）异步清理的，删除 CRD 后实例不会瞬间消失，属正常现象。若实例长期残留，检查 CRD 删除时是否因 finalizer 或 webhook 阻塞（`status.conditions` 中 `Terminating=True`）。
:::

验证命令：

```sh
kubectl get crd                                   # 查看全部 CRD 及 ESTABLISHED 列
kubectl describe crd crontabs.stable.example.com  # 查看版本、状态条件与接受的名称
```

## 相关页面

- [定制资源实例](./custom-resources)：CRD 注册成功后，日常管理这类资源实例的页面
- [资源全景图](../ops/resource-map)：在资源拓扑中查看 CRD 与实例节点的关联
- [名称空间](../cluster-resources/namespaces)：`scope: Namespaced` 的 CRD，其实例存放于名称空间内
- [资源导出与导入](../cluster/export-import)：名称空间级资源的备份与迁移（集群级 CRD 不适用）
