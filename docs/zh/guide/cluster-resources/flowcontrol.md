---
description: 集群资源 - 流量控制（Flow Control，APF 优先级与公平性）：流量模式 Flow Schema 与优先级级别 Priority Level Configuration 的入口（默认隐藏需在菜单项设置启用）、工作原理、创建/编辑表单字段与 YAML（匹配规则、排队策略）、详情页、内置对象与版本说明
---

# 流量控制（Flow Schema 与优先级级别）

流量控制（Flow Control）是 Kubernetes API Server 内置的过载保护机制，其内核是 APF（Priority and Fairness，优先级与公平性）。当大量请求同时到达 API Server 时，APF 根据管理员定义的规则给请求**分类**，再按类分配并发配额与排队策略，保证重要请求优先、系统请求不被饿死、个别租户不会占满全部并发。

Kuboard 将这套机制拆成两类**集群级**资源来管理：

| 资源 | 中文菜单 | 作用 | 一句话理解 |
| --- | --- | --- | --- |
| FlowSchema（流量模式） | 流量模式 | 给请求**分类**：按匹配规则识别一类请求，并指定它归属哪个优先级级别 | "谁属于哪一类" |
| PriorityLevelConfiguration（优先级级别） | 优先级级别 | 给分类后的请求**限流**：定义该级别可用的并发份额，以及超限后排队还是拒绝 | "这一类有多少额度" |

两者配合工作：一次请求到达 API Server 后，按匹配优先级依次检查所有流量模式的规则，第一个命中的流量模式负责给请求分类，并把请求交给它引用的优先级级别去排队或限流。

::: tip 什么时候需要关注它
Kubernetes 安装后自带一组内置规则，默认情况下已经能保证 API Server 稳定运行。只有当你需要为特定工作负载、用户或请求类型划分优先级时（例如：保障关键控制面请求、限制某命名空间大量刷请求），才需要自定义这两类资源。
:::

## 入口位置

1. 登录 Kuboard，在左侧资源树中定位到 **集群资源 → 流量控制（Flow Control）**；
2. 分组下有两个菜单：**流量模式（Flow Schemas）** 与 **优先级级别（Priority Level Configurations）**。

::: warning 默认隐藏，需要先在系统配置中启用
`flowcontrol.apiserver.k8s.io/flowschemas` 与 `flowcontrol.apiserver.k8s.io/prioritylevelconfigurations` 在 Kuboard 中默认处于**禁用**状态，资源树里看不到这两个入口。

启用方法：进入 **系统配置 → 菜单项设置**，在资源树中找到对应项并勾选，保存后刷新集群页面即可出现。
:::

两类资源都是集群级资源（没有名称空间概念），列表按集群维度展示；Kuboard 对它们均支持查看详情、编辑、创建，以及从 YAML 创建。

## 流量模式（Flow Schema）

### 工作原理：请求如何被归类

流量模式定义"哪一类请求"，其中两个关键字段：

- **匹配优先级（matchingPrecedence）**：数字越小越先匹配。请求到达后，Kuboard 背后的 API Server 按匹配优先级从高到低依次检查所有流量模式的规则，**第一个命中**的流量模式生效；
- **优先级级别引用（priorityLevelConfiguration.name）**：命中的流量模式把请求交给这个优先级级别执行排队或限流。

此外，流量模式还可以通过 **区分方法（distinguisherMethod）**（按用户 ByUser / 按名称空间 ByNamespace）在同一优先级级别内进一步区分请求来源，实现级别内部的公平分配。

### 列表页

流量模式列表复用 Kuboard 通用资源列表，主要列：集群、名称、创建时间，行内提供 YAML（查看 / 编辑对象 YAML）、删除等操作；表头提供 **创建（+）** 按钮。

### 创建流量模式

1. 在流量模式列表页点击右上角 **创建（+）**，弹出「创建 flowschemas 对象」对话框；
2. **集群**：选择目标集群（仅列出状态就绪、且有创建权限的集群）；
3. **创建方式**：选择「从表单创建」，或「从 YAML 创建」；
4. 从表单创建时，填写下列字段后点击 **保存**，Kuboard 弹出 **YAML 预览** 展示将要提交的 FlowSchema 对象；
5. 确认无误后提交，创建成功并自动跳转到该流量模式的详情页。

创建表单字段：

| 字段 | 对应字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 集群内唯一 |
| Priority Level Configuration | `spec.priorityLevelConfiguration.name` | 引用的优先级级别名称（按名称引用），必填 |
| Matching Precedence | `spec.matchingPrecedence` | 匹配优先级，数字越小越先匹配；默认 1000，范围 1–10000 |

::: tip 匹配规则（rules）请用 YAML 定义
创建表单只覆盖名称、优先级级别、匹配优先级三个最常用字段。要定义**匹配规则 rules**（匹配主体 subject + 动词 + 资源 + 名称空间）或**区分方法 distinguisherMethod**，请在创建对话框选择「从 YAML 创建」，或创建后在列表 / 详情页点击 **YAML** 按钮编辑对象。
:::

从 YAML 创建流量模式的示例：

```yaml
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: FlowSchema
metadata:
  name: demo-flow-schema
spec:
  priorityLevelConfiguration:
    name: workload-high
  matchingPrecedence: 1000
  distinguisherMethod:
    type: ByUser
  rules:
    - subjects:
        - kind: ServiceAccount
          serviceAccount:
            name: default
            namespace: default
      resourceRules:
        - apiGroups: [""]
          apiVersions: ["v1"]
          resources: ["pods"]
          verbs: ["*"]
        - apiGroups: ["apps"]
          apiVersions: ["v1"]
          resources: ["deployments"]
          verbs: ["get", "list"]
          namespaces: ["frontend"]
```

`rules` 结构要点：

| 片段 | 说明 |
| --- | --- |
| `subjects` | 匹配的请求主体，`kind` 为 User / Group / ServiceAccount，分别用 `user.name`、`group.name`、`serviceAccount.name` + `serviceAccount.namespace` 限定 |
| `resourceRules` | 资源类请求的匹配：`apiGroups` + `apiVersions` + `resources` + `verbs`，可加 `namespaces` 限定 |
| `nonResourceRules` | 非资源类请求的匹配（如 `/healthz`、`/version` 等路径）：`verbs` + `nonResourceURLs` |

### 详情页

点击列表中的名称进入详情页。页头展示对象元数据（集群、名称、创建时间、UID 等），并提供 **编辑**、**YAML**、**删除** 等操作；正文为「规约 Spec」卡片：

| 展示项 | 内容 |
| --- | --- |
| 优先级级别 | `spec.priorityLevelConfiguration.name` |
| 匹配优先级 | `spec.matchingPrecedence` |

完整的匹配规则、状态等信息可点击页头 **YAML** 按钮查看。

<!-- screenshot-todo: 流量模式创建页：名称 / Priority Level Configuration / Matching Precedence 三个字段的表单 + 右上角保存按钮 -->

## 优先级级别（Priority Level Configuration）

### 工作原理：该级别有多少额度

优先级级别定义"该级别如何限流"，核心是类型（Type）：

| 类型 | 说明 |
| --- | --- |
| Limited（受限，默认） | 占用一定**并发份额**；请求超过份额时进入排队（Queue）或直接拒绝（Reject） |
| Exempt（豁免） | 不受限流约束，永远放行——用于系统关键请求（如 kube-controller-manager 的 leader election 心跳） |

### 列表页

与流量模式相同，复用通用资源列表，列：集群、名称、创建时间，表头 **创建（+）**，行内 YAML / 删除等操作。

### 创建优先级级别

步骤与创建流量模式一致（列表页 **创建（+）** → 选择集群 → 从表单 / 从 YAML 创建 → 保存时预览 YAML 并提交）。

创建表单字段：

| 字段 | 对应字段 | 说明 |
| --- | --- | --- |
| 名称 | `metadata.name` | 集群内唯一 |
| Type | `spec.type` | Limited / Exempt 二选一，默认 Limited |
| Assured Concurrency Shares | `spec.limited.assuredConcurrencyShares` | 保证并发份额，默认 10、最小值 1；仅 Limited 类型可设置。份额越大，该级别占用的并发配额越高 |

超限策略 `limitResponse` 及排队参数（queues / handSize / queueLengthLimit）没有表单字段，需要通过 YAML 设置：

```yaml
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: PriorityLevelConfiguration
metadata:
  name: workload-high
spec:
  type: Limited
  limited:
    assuredConcurrencyShares: 10
    limitResponse:
      type: Queue
      queuing:
        queues: 64
        handSize: 6
        queueLengthLimit: 50
```

::: tip 排队策略（limitResponse）含义
- `type: Queue`：超出并发份额的请求进入队列等待，适合避免突发流量被直接丢弃；
- `type: Reject`：超出并发份额的请求立即返回 429（Too Many Requests）。

`queues`（队列数）、`handSize`（每轮散列选择到的队列数）、`queueLengthLimit`（单队列长度上限）共同决定排队行为。Kubernetes 给出的默认值已可直接使用，一般无需调整。
:::

### 详情页

点击列表中的名称进入详情页。页头元数据与操作同上，正文「规约 Spec」卡片：

| 展示项 | 内容 |
| --- | --- |
| 类型 Type | `spec.type`：Limited / Exempt |
| 保证并发份额 Assured Concurrency Shares | `spec.limited.assuredConcurrencyShares` |

<!-- screenshot-todo: 优先级级别列表页：通用资源列表（集群/名称/创建时间/操作）+ 右上角创建按钮 -->

## 内置对象与使用建议

- **集群自带内置对象**：Kubernetes 安装后会自动创建一组内置的流量模式与优先级级别（常见如 `system-leader-election`、`exempt`、`workload-high` / `workload-low`、`catch-all` 等，以集群实际为准），它们保证系统请求和未匹配请求都有归属。列表页可以直接看到这些对象，请勿随意删除或改动。
- **先建级别，再建模式**：流量模式按**名称**引用优先级级别。建议先创建优先级级别，再创建引用它的流量模式，避免提交时引用一个尚不存在的对象。
- **改动影响全局**：错误地修改或删除 `kube-system` 等关键请求对应的内置流量模式、或把系统级别改成 Limited，可能导致 API Server 过载甚至不可用。生产环境修改前建议先在测试集群验证。

::: tip 版本说明
flowcontrol 的 API 版本随集群版本不同而变化：Kubernetes 1.30 及以上的集群使用 `flowcontrol.apiserver.k8s.io/v1`，更老的集群回退到 `v1beta2`。Kuboard 依据集群版本自动选择 API 版本，并处理不同版本间的字段差异（例如并发份额在部分版本中写作 `nominalConcurrencyShares`、部分写作 `assuredConcurrencyShares`），界面含义保持一致。上文的 YAML 示例使用表单默认的 `v1beta3` 格式，您无需关心底层版本差异。
:::