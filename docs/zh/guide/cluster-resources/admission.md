---
description: 准入控制四类集群资源的使用：变更 Webhook 与验证 Webhook（Mutating/ValidatingWebhookConfiguration）的创建与规则配置，验证准入策略（ValidatingAdmissionPolicy）与绑定（ValidatingAdmissionPolicyBinding）的创建与关联
---

# 准入控制（Admission Webhook 与策略）

Kubernetes 的**准入控制（Admission Control）**发生在 API 请求通过认证鉴权之后、对象写入 etcd 之前：这一阶段可以**修改**请求内容，也可以**拒绝**不合规请求。本页覆盖 Kuboard 中与准入控制相关的四类集群资源：

| 资源 | 作用 | 范围 | Kuboard 入口 | 可操作 |
| --- | --- | --- | --- | --- |
| 变更 Webhook（MutatingWebhookConfiguration） | 在对象持久化前**修改**其内容 | 集群级 | 集群资源 → Admission Webhook → 变更 Webhook | 创建 / 编辑 / 删除 |
| 验证 Webhook（ValidatingWebhookConfiguration） | 在对象持久化前**校验并拒绝**不合规请求 | 集群级 | 集群资源 → Admission Webhook → 验证 Webhook | 创建 / 编辑 / 删除 |
| 验证准入策略（ValidatingAdmissionPolicy） | 用 CEL 表达式**声明**校验规则（无需部署外部服务） | 集群级 | 集群资源 → Admission Webhook → 验证准入策略 | 创建 / 编辑 / 删除 |
| 验证准入策略绑定（ValidatingAdmissionPolicyBinding） | 把策略**应用**到指定资源 / 名称空间 | 集群级 | 集群资源 → Admission Webhook → 验证准入策略绑定 | 创建 / 编辑 / 删除 |

::: warning 这些资源默认在菜单中隐藏
四类资源的入口默认处于**禁用**状态，资源树里看不到。若集群左侧没有 **集群资源 → Admission Webhook** 分组，请集群管理员到 **系统配置 → 菜单项设置**，在资源树中勾选这四类资源并保存，再刷新集群页面即可出现。
:::

两类 Webhook 需要你**自行部署**一个后端服务来接收回调；而验证准入策略是 Kubernetes 原生能力，用表达式声明规则、由 kube-apiserver 执行，无需写代码。下面按"做什么 → 在哪里操作 → 表单怎么填 → 结果与验证"依次说明。

## 变更 Webhook（MutatingWebhookConfiguration）

**解决什么问题**：在 API 请求被接受前，把对象交给外部服务（webhook server）**修改**。典型用途：自动注入 sidecar 容器、填充默认值、按策略添加标签 / 注解。

### 入口与列表页

进入 **集群资源 → Admission Webhook → 变更 Webhook**。它是**集群级**资源，列表复用 Kuboard 通用资源列表，主要列如下：

| 列 | 说明 |
| --- | --- |
| 集群 | 资源所属集群（树形模式下按集群分组） |
| 名称 | 配置名称，点击进入详情页 |
| 创建时间 | 显示相对时间，可按时间筛选 |
| 操作 | **编辑** / **YAML**（查看 YAML）/ **删除** |

<!-- screenshot-todo: 变更 Webhook 列表页截图，展示集群/名称/创建时间列与右上角创建按钮 -->

### 创建

1. 点击右上角 **创建**，在弹出的对话框中可选 **从表单创建** 或 **从 YAML 创建**；
2. 从表单创建时，填写基本信息（名称）与 **webhooks[]** 数组——点击 **+ Add Webhook** 可添加多个 webhook，每个 webhook 是一张卡片；
3. 每个 webhook 卡片内填写 webhook 属性与 **rules[]** 规则数组（**+ Add Rule** 可添加多条）；
4. 点击 **保存**，在 **预览 YAML** 中确认后提交，创建成功跳转到详情页。

| 区域 | 字段 | 说明 |
| --- | --- | --- |
| 基本信息 | 名称 | 必填，集群内唯一，K8s 名称规范（小写字母 / 数字 / `-`） |
| Webhook | name | 该 webhook 的名称，通常用 FQDN，如 `my-webhook.example.com` |
| | admissionReviewVersions | 多选，`v1` / `v1beta1`，默认 `["v1"]` |
| clientConfig | service.name | 接收回调的 Service 名称 |
| | service.namespace | 该 Service 所在名称空间 |
| | service.path | 回调路径，如 `/mutate` |
| | caBundle | 回调地址启用 HTTPS 时的 CA 证书内容（多行文本）；留空则按明文 HTTP 回调 |
| rules[] | apiGroups | 多选：`(core)` / `apps` / `batch`，匹配要拦截的资源所属 API 组 |
| | apiVersions | 多选：`v1` |
| | operations | 多选：`CREATE` / `UPDATE` / `DELETE`，命中这些操作才回调 |
| | resources | 多选：`pods` / `deployments` 等，命中这些资源才回调 |

::: tip 表单未暴露的字段
- 表单不展示 `sideEffects` 与 `timeoutSeconds`，但创建时会**默认写入** `sideEffects: None`、`timeoutSeconds: 10`；
- `clientConfig.url`（不通过 Service 直接给 URL）、`failurePolicy`、`matchPolicy`、`namespaceSelector`、`objectSelector`、`reinvocationPolicy` 等高级字段不在表单中，需要时可通过 **从 YAML 创建**，或创建后在详情页通过 **YAML** 编辑补充。
:::

### 保存后

保存后可在详情页"规约"面板看到 webhook 数量；webhook 配置是全局声明，一旦创建，命中 `rules` 中 apiGroups / resources / operations 组合的请求即会被回调（是否需要安装才生效见下面警告）。

```sh
kubectl get mutatingwebhookconfiguration
kubectl describe mutatingwebhookconfiguration <名称>   # 查看 webhooks 数组与 rules
```

::: danger 回调服务不存活会阻塞 API 请求
变更 Webhook 默认 `failurePolicy: Fail`：回调失败（服务不存在、超时、TLS 校验不过）时，**请求直接被拒绝**。测试期间建议先为回调地址配置可用的 Service，或从 YAML 中将 `failurePolicy` 改为 `Ignore`。
:::

## 验证 Webhook（ValidatingWebhookConfiguration）

**解决什么问题**：在对象持久化前由外部服务**校验**请求，不合规直接返回错误拒绝。典型用途：强制命名规范、禁止高危配置、对接外部合规系统。

### 入口与创建

进入 **集群资源 → Admission Webhook → 验证 Webhook**，点击 **创建**。**表单字段与变更 Webhook 完全一致**（名称、webhooks[]、clientConfig 的 service.name / namespace / path 与 caBundle、rules[] 的 apiGroups / apiVersions / operations / resources），默认值也相同（`admissionReviewVersions: ["v1"]`、`sideEffects: None`、`timeoutSeconds: 10`）。

### 与变更 Webhook 的区别

| 对比项 | 变更 Webhook | 验证 Webhook |
| --- | --- | --- |
| 调用时机 | 对象尚未定稿，可**修改** | 对象已定稿，只能**通过 / 拒绝** |
| 返回值 | AdmissionReview 中携带 patch（JSONPatch） | 直接返回 allowed / 拒绝原因 |

```sh
kubectl get validatingwebhookconfiguration
kubectl describe validatingwebhookconfiguration <名称>
# 触发一次命中规则的请求，观察是否被拒绝及拒绝信息
```

## 验证准入策略（ValidatingAdmissionPolicy）与绑定（Binding）

**解决什么问题**：不部署任何后端服务，直接用 **CEL 表达式**（Common Expression Language）声明校验规则，由 kube-apiserver 原生执行。适合"拒绝某类资源不合规、给某名称空间加约束"的治理场景。

策略与绑定是**两个对象配合使用**：

- **验证准入策略（ValidatingAdmissionPolicy）**声明"规则是什么"：匹配哪些资源（`matchConstraints`）+ 一组校验表达式（`validations`，CEL）；
- **验证准入策略绑定（ValidatingAdmissionPolicyBinding）**声明"规则对谁生效"：引用哪个策略（`policyName`）+ 生效范围（`matchResources`，如名称空间选择器）+ 动作（`validationActions`）；
- 一个策略可被多个绑定复用（不同范围、不同动作），一个绑定只绑定一个策略。**先建策略，再建绑定**，策略才会真正生效。

::: tip 版本要求
验证准入策略自 Kubernetes 1.26 起进入 beta，1.30 起转为 GA（`admissionregistration.k8s.io/v1`）。更早版本的集群不可用。
:::

### 创建验证准入策略

进入 **集群资源 → Admission Webhook → 验证准入策略**，点击 **创建**，选择 **从表单创建**：

| 区域 | 字段 | 说明 |
| --- | --- | --- |
| 基本信息 | 名称 | 必填，集群内唯一 |
| Validations | expression | 必填，**CEL 表达式**，返回布尔值。`object` 表示被校验的资源对象，如 `object.metadata.name.startsWith('demo-')` 表示"名称必须以 demo- 开头" |
| | message | 可选，表达式不满足时返回给调用方的提示，如 `name must start with demo-` |

点击 **+ Add Validation** 可添加多条校验，多条之间是"与"（AND）关系，全部满足才通过。

::: tip 匹配约束不暴露在表单中
策略匹配范围 `spec.matchConstraints.resourceRules`（如匹配 core/v1 的 `pods` 的 `CREATE` 操作）不在表单中，但会出现在 **预览 YAML** 中。需要指定匹配范围时，用 **从 YAML 创建** 或在详情页 **YAML** 编辑中补充，例如：

```yaml
spec:
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
  validations:
    - expression: "object.metadata.name.startsWith('demo-')"
      message: "name must start with demo-"
```
:::

<!-- screenshot-todo: 验证准入策略创建表单截图，含 Validations 区的 expression（CEL 表达式）与 message 输入框 -->

### 创建验证准入策略绑定

进入 **集群资源 → Admission Webhook → 验证准入策略绑定**，点击 **创建**，选择 **从表单创建**：

| 字段 | 说明 |
| --- | --- |
| 名称 | 必填，集群内唯一 |
| Policy Name（策略名称） | 必填，填入已创建的验证准入策略名称，大小写敏感 |
| Validation Actions（验证动作） | 多选：`Deny` / `Warn` / `Audit`，默认 `["Deny"]`。`Deny` 拒绝请求；`Warn` 放行但向客户端返回警告；`Audit` 只记审计不干预 |

::: tip 生效范围不暴露在表单中
绑定作用范围 `spec.matchResources`（如 `namespaceSelector` 限定只对某标签的名称空间生效）不在表单中，但会出现在 **预览 YAML** 中。需要限定范围时用 **从 YAML 创建** 或详情页 **YAML** 编辑补充，例如：

```yaml
spec:
  policyName: demo-vap
  validationActions: ["Deny"]
  matchResources:
    namespaceSelector:
      matchLabels:
        environment: production
```
:::

### 保存后

创建策略 → 创建绑定后，对命中范围内的对象发起匹配操作（如创建 `pods`）：若违反校验表达式，`Deny` 动作会直接返回 `message` 中的错误信息，请求被拒绝；`Warn` 则放行并提示。验证命令：

```sh
kubectl get validatingadmissionpolicy
kubectl get validatingadmissionpolicybinding
kubectl describe validatingadmissionpolicybinding <绑定名称>
# 在命中范围内创建一条违规对象，观察被拒绝/警告的效果
```

::: warning 先建策略，再建绑定
绑定引用了不存在的策略名时不会生效（也不会报错）。排查"策略没起作用"时，先确认策略已创建、绑定 `policyName` 与策略名一致、且命中范围覆盖了目标对象/名称空间。
:::

## 相关页面

- [调度与稳定性（PriorityClass / PDB / Lease / RuntimeClass）](./scheduling)：同为默认隐藏、需在"菜单项设置"启用的集群级资源
- [名称空间（Namespace）](./namespaces)：Webhook 的 `service.namespace` 与绑定的 `namespaceSelector` 都以名称空间为作用对象