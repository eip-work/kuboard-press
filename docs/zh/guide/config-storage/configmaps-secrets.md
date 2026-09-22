---
description: Kuboard 配置与存储 - ConfigMap(配置字典) 与 Secret(密文)：入口位置、列表页字段与操作、创建/编辑/详情/删除（Opaque/tls/dockerconfigjson 类型、base64 自动处理、immutable）、以及如何把配置注入环境变量与挂载为卷
---

# ConfigMap 配置字典与 Secret 密文

本文介绍如何在 Kuboard 中管理 **ConfigMap（配置字典）** 与 **Secret（密文）**，并将它们注入工作负载。两者都用于把"配置"与"容器镜像"解耦：ConfigMap 存放**非敏感**的配置文本，Secret 存放**敏感**数据（密码、密钥、证书、镜像仓库凭证），Kubernetes 中均为 **名称空间级**资源（`v1` 核心 API 组）。

| 对比项 | ConfigMap（配置字典） | Secret（密文） |
| --- | --- | --- |
| 用途 | 普通配置：环境变量、配置文件内容 | 敏感数据：密码、Token、TLS 证书、镜像仓库凭证 |
| 数据字段 | `data`（明文键值对） | `data`（值必须是 **base64 编码** 的字符串） |
| 常见类型 | 无类型概念 | `Opaque`、`kubernetes.io/tls`、`kubernetes.io/dockerconfigjson` |
| 内容在界面上 | 原样显示 | 自动解码显示，可复制 |

::: tip 配置类与存储类的导航关系
本页属于左侧导航的 **配置与存储 → 配置中心**，其中的 **配置字典** 与 **密文** 分别对应 `configmaps`、`secrets` 两个 Kubernetes 资源。存储卷相关（PVC/PV/StorageClass）见 [存储卷与存储类](./pvc-pv-storageclass)。
:::

## 入口位置

1. 登录 Kuboard 后，在左侧导航点击 **配置与存储**；
2. 展开后点击 **配置中心**；
3. 配置中心下有两个入口：
   - **配置字典**（Config Maps）→ ConfigMap 列表页；
   - **密文**（Secrets）→ Secret 列表页。

<!-- screenshot-todo: 左侧导航"配置与存储 → 配置中心 → 配置字典/密文"的菜单位置截图 -->

## 列表页

两个列表页复用 Kuboard 的通用资源列表，支持 **树形导航 / 搜索** 两种模式切换：

- **树形导航**：左侧按"集群 → 名称空间"树选择范围，表格展示所选范围内的对象；
- **搜索模式**：顶部出现"集群 / 名称空间"下拉（名称空间可选 `*` 表示全部），配合表格各列的搜索条件。

### 通用列

| 列 | 说明 |
| --- | --- |
| 选择框 | 勾选后可用于**批量删除**（无权限的行不显示勾选框） |
| 集群 | 对象所在集群 |
| 名称空间 | 对象所在名称空间 |
| 名称 | 对象名称，点击进入详情页（需 `get` 权限，否则仅展示为文本） |
| 创建时间 | 相对时间显示，可排序 |
| 操作 | 行内操作按钮：**编辑**、**YAML**、**删除**（分别需 `update` / `get` / `delete` 权限） |

### 各资源专有列

| 页面 | 专有列 | 说明 |
| --- | --- | --- |
| 配置字典 | 不可修改 | 读取 `immutable` 字段：`不可修改`（warning 色）或 `可以修改`（primary 色） |
| 密文 | 类型 | 读取 `data.type`，如 `Opaque`、`kubernetes.io/tls` 等 |
| 密文 | 不可修改 | 同配置字典，读取 `immutable` 字段 |

### 表头操作

| 按钮 | 说明 |
| --- | --- |
| 创建（+） | 在当前集群 / 名称空间创建对象，见下文"创建" |
| 批量删除 | 删除勾选的条目；弹窗区分"Kubernetes 集群中的条目"与"缓存中的条目"，可分开处理 |

::: tip 列表数据来源
列表优先读取 Kuboard 的**资源缓存**（多集群聚合、可搜索、可翻页）；缓存不可用时直接请求集群，此时提示"未缓存的列表不能翻页"，并只显示总数。
:::

## 创建

### 入口与创建方式

点击列表页右上角 **创建（+）**，弹出创建对话框：

| 项 | 说明 |
| --- | --- |
| 集群 | 目标集群（仅显示就绪且当前用户有 `create` 权限的集群） |
| 名称空间 | 目标名称空间；默认继承当前筛选范围（树形模式下选中 `*` 时回退到 `default`） |
| 创建方式 | **从表单创建** / **从 YAML 创建**，二选一 |

- 选择 **从 YAML 创建**：直接弹出 YAML 编辑器，填入完整的 `kind: ConfigMap` / `kind: Secret` 对象后提交；
- 选择 **从表单创建**：进入表单创建页（见下文）。

保存流程一致：点击 **保存** → 校验表单 → 弹出 **预览 YAML** 对话框展示将要提交的完整对象 → 确认后提交到 apiServer，并自动跳转到新对象的详情页。

<!-- screenshot-todo: 创建对话框（集群/名称空间/创建方式）截图 -->

## 配置字典（ConfigMap）

### 创建表单

创建页顶部左侧有一个开关 **创建后不可修改 / 创建后可修改**，对应 Kubernetes 的 `immutable` 字段；下方为 **元数据** 与 **数据** 两个页签：

| 页签 | 字段 | 对应字段 | 说明 |
| --- | --- | --- | --- |
| 元数据 | 名称空间 | `metadata.namespace` | 创建时所在名称空间，只读展示 |
| 元数据 | 名称 | `metadata.name` | 必填，名称空间内唯一，按 RFC 命名规则实时校验 |
| 元数据 | 标签 | `metadata.labels` | 键值对，可选 |
| 元数据 | 注解 | `metadata.annotations` | 键值对，可选 |
| 条目模式 | 数据条目 | `data` | 逐条编辑 Key / Value（Value 为多行文本框） |
| 标签页模式 | 数据条目 | `data` | 每个 Key 一个标签页，适合值较长（如配置文件）的场景 |

条目模式的 Key 不允许为空；切换页签前会校验所有条目。

示例：一个同时提供环境变量与配置文件的 ConfigMap（可在 YAML 视图中直接使用）：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
  labels:
    app: demo
data:
  LOG_LEVEL: info          # 环境变量方式使用
  nginx.conf: |            # 挂载为文件方式使用
    server {
      listen 80;
      server_name example.com;
    }
```

<!-- screenshot-todo: 配置字典创建页（immutable 开关 + 条目模式编辑数据）截图 -->

### 编辑

在列表页点击行内 **编辑**，或在详情页点击 **编辑**，进入编辑页。与创建页的区别：

- **名称空间、名称**只读展示，不可修改；
- 页面顶部显示当前对象的 **ResourceVersion**（供与集群中的最新版本比对）；
- 标签、注解、数据条目均可修改；
- 保存时弹出 **对比 YAML** 对话框：左侧为集群中的原对象、右侧为修改后的对象，确认后提交。

### 详情页

点击列表页中的名称进入详情页：

1. **页头**：对象元信息卡片（名称空间、UID、标签、注解等）；
2. **操作按钮**：**编辑**、**YAML**、**删除**；
3. **主体**：数据条目以 **条目模式**（`key = value`）或 **标签页模式** 只读展示；
4. **修订历史**：页头右侧可加载当月及以前的修订记录，对比"当前版本 ↔ 历史版本"并恢复到历史版本。

若对象设置了 `immutable: true`，页头会显示 **创建后不可修改** 标签，且 **编辑** 按钮被禁用——`immutable` 的 ConfigMap 在 Kubernetes 层面不允许修改，只能删除后重建。

## 密文（Secret）

### 创建表单

创建页顶部有两个控件：

- **创建后不可修改 / 创建后可修改** 开关（`immutable` 字段，同上）；
- **类型**下拉框（必选）：内置 **Opaque**、**kubernetes.io/tls**、**kubernetes.io/dockerconfigjson** 三种类型，支持输入过滤与**自定义类型**（可手工输入其他类型名，如 `kubernetes.io/service-account-token`）。

切换类型时，表单会按类型预置 `data`：

| 类型 | 预置的 data | 编辑方式 |
| --- | --- | --- |
| `Opaque` | 空 | 条目模式 / 标签页模式，Key 可增删改名 |
| `kubernetes.io/tls` | `tls.crt`、`tls.key` | 条目模式 / 标签页模式，两个 Key **锁定**（不能改名或删除），仅可填值 |
| `kubernetes.io/dockerconfigjson` | `.dockerconfigjson` | 专用结构化表单（见下文） |

**名称**字段（`metadata.name`）按 DNS-253 规则校验；标签、注解与 ConfigMap 一致。

#### base64 自动处理

Secret 在 Kubernetes 中的 `data` 值必须是 **base64 编码** 的字符串，Kuboard 的表单会自动处理：

- **条目模式**：显示时自动 **解码**（明文），失焦时自动 **编码** 回 base64 存入对象；
- **标签页模式**：文本框中直接输入明文，失焦后自动编码。

因此你只需在界面中输入明文（如 `password123`），无需手工 base64。

::: warning base64 不是加密
base64 只是编码（可轻易还原），Secret 的 `data` 字段对任何能读取该资源的人都可见。切勿把 Secret 当加密存储使用；需要加密时应启用 etcd 加密或使用外部密钥管理方案，并严格控制 `get` 权限。
:::

#### dockerconfigjson 专用表单

选择 `kubernetes.io/dockerconfigjson` 后，表单切换为"镜像仓库凭证"编辑器，每个仓库条目包含：

| 字段 | 说明 |
| --- | --- |
| server | 镜像仓库地址，必须以 `http://` 或 `https://` 开头（提交时校验） |
| username | 登录用户名（必填） |
| password | 登录密码（必填），密码输入框可切换明文显示 |

- 支持 **新增 / 删除** 多个仓库条目；
- 每条右侧提供 **复制 docker login 命令**，可在任意节点上验证凭据是否正确，例如 `docker login registry.example.com -u admin -p ****`（复制到剪贴板时 `****` 会被替换为真实密码）；
- 保存时自动组装 `.dockerconfigjson` 的 JSON 并 base64 编码。

### 编辑

编辑页与创建页表单一致，差异：

- 名称、名称空间只读；页面顶部以标签展示当前 **类型**（不可在编辑页更换类型）；
- `kubernetes.io/tls` 的 `tls.crt` / `tls.key` 锁定不可改名；`dockerconfigjson` 继续使用结构化表单；
- 保存时弹出 **对比 YAML** 确认后提交（base64 编码后的值参与对比）。

### 详情页

- 页头显示 **类型** 标签（如 `Opaque`）及 `immutable` 标签（若设置）；
- `Opaque` / `tls` 类型：条目以 **解码后的明文** 展示，每条附 **复制** 按钮（一键复制解码后的值）；
- `dockerconfigjson` 类型：以 server / username / password 表单展示，密码默认以 `*` 打码，点击 **显示密码** 可查看，并提供 docker login 命令复制；
- 其余结构（编辑 / YAML / 删除按钮、修订历史）与 ConfigMap 详情页一致。

<!-- screenshot-todo: 密文详情页（类型标签 + 解码后的明文条目 + 复制按钮）截图 -->

### 创建 Secret 的 YAML 示例

```yaml
# Opaque：普通密码类
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
  namespace: default
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=    # base64("password123")
```

```yaml
# TLS 证书类：供 Ingress 使用
apiVersion: v1
kind: Secret
metadata:
  name: tls-example
  namespace: default
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t...   # base64(PEM 证书)
  tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ==   # base64(PEM 私钥)
```

## 删除

三个入口：列表页行内 **删除**、列表页勾选后 **批量删除**、详情页 **删除**。均走 Kuboard 全局删除确认流程，对话框包含：

| 项 | 说明 |
| --- | --- |
| 请输入对象名称 | 必须输入与对象名称完全一致的内容，防止误删 |
| GracePeriod | 宽限期（秒），默认 0，即立即删除 |
| 波及策略（Propagation Policy） | 级联删除策略：Background / Foreground / Orphan；ConfigMap 与 Secret 通常无子对象，保持默认即可 |

::: tip 删除不可逆
ConfigMap / Secret 被工作负载引用时，删除后引用它的容器组可能启动失败（环境变量注入失败）或保持旧配置；`immutable` 对象同样只能删除后重建。
:::

## 把 ConfigMap / Secret 应用到工作负载

创建好配置字典 / 密文之后，在 **工作负载 → 部署**（或 StatefulSet、DaemonSet）的编辑页中引用它们，入口位于 **容器组模板** 页签内，详见 [Deployment（部署）](../workload/deployments)：

| 使用方式 | 入口 | 说明 |
| --- | --- | --- |
| 环境变量注入 | 容器组模板 → 容器 → 环境变量 | 从 **配置字典** 或 **密文** 的指定 **Key** 取值注入为环境变量（`configMapKeyRef` / `secretKeyRef`），可选择资源再选择其 Key |
| 挂载为文件（卷） | 容器组模板 → 卷 | 卷类型选择 **配置字典** 或 **密文**，指定资源名称与 Key，挂载到容器路径（`configMap` / `secret` 卷） |
| 镜像仓库凭证 | 容器 → 镜像拉取密钥（imagePullSecrets） | 选择 `kubernetes.io/dockerconfigjson` 类型的密文，使 kubelet 拉取私有仓库镜像时使用该凭据 |

```yaml
# Deployment 中引用配置字典与密文的片段（表单操作结果对应的 YAML）
spec:
  containers:
    - name: web
      env:
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_PASSWORD
      volumeMounts:
        - name: config
          mountPath: /etc/nginx
          readOnly: true
  volumes:
    - name: config
      configMap:
        name: app-config
  imagePullSecrets:
    - name: registry-cred
```

::: tip 修改配置后需要让容器组重新加载
- **环境变量** 在容器启动时注入，修改 ConfigMap / Secret 后不会自动生效，需**重启 / 滚动更新**引用它的工作负载（见 [Deployment 常见操作 - 重启](../workload/deployments)）；
- **卷挂载**的文件由 kubelet 周期性同步，更新后通常可在约 1 分钟内生效，但容器内应用是否热加载取决于应用自身；为求稳妥，仍建议滚动更新。
:::

## 常见注意点

- **Secret 的 base64 只是编码，不是加密**（见上文 warning）；
- **名称空间隔离**：ConfigMap / Secret 均为名称空间级资源，只能被**同名称空间**的工作负载引用；跨名称空间使用需要将数据复制到目标名称空间；
- **immutable 不可修改**：创建时勾选"创建后不可修改"后，数据字段被 Kubernetes 锁定，只能删除重建；列表与详情页均有 `不可修改` 标签提示；
- **敏感数据不要放进 ConfigMap**：ConfigMap 的内容对所有能 `get` 该资源的人可见，且不适合存放密钥；
- **Secret 的 `data` 只接受 base64 字符串**：通过 YAML 直接创建时，务必保证值是合法的 base64（不要贴明文），否则 apiServer 会拒绝；通过表单创建则无需关心此点（Kuboard 自动处理）；
- **名称不可重名**：同一名称空间内名称唯一，创建时按 RFC（ConfigMap）/ DNS-253（Secret）规则实时校验。

## 相关页面

- [Deployment（部署）](../workload/deployments)：配置字典 / 密文注入环境变量、挂载卷、镜像拉取密钥的实际操作入口
- [存储卷与存储类](./pvc-pv-storageclass)：PVC / PV / StorageClass 与配置类资源同属"配置与存储"
- [存储快照](./snapshots-csi)：基于 CSI 的存储快照管理