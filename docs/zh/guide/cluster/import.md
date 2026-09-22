---
description: 向 Kuboard 导入（接入）Kubernetes 集群的完整指南：kubeconfig 与 Token 两种方式、表单字段、集群对象模型、导入流程与常见校验失败原因
---

# 导入 Kubernetes 集群

本文介绍如何将已有的 Kubernetes 集群导入（接入）Kuboard，使其可以在 Kuboard 中被浏览、运维和管理。Kuboard 支持两种导入方式：**kubeconfig**（粘贴集群的 kubeconfig 文件）与 **Token**（apiServer 地址 + 访问令牌）。

::: tip 导入不会影响集群本身
将 Kubernetes 集群导入到 Kuboard 之后，并不影响 Kubernetes 集群的独立性。也就是说，即使在 Kuboard 不可用的情况下，Kubernetes 集群仍然可以正常工作。Kuboard 只是作为 Kubernetes 的客户端应用（client application）连接 apiServer。
:::

## 入口位置

导入集群的入口位于**集群管理 → Kubernetes 集群**页面：

1. 登录 Kuboard 后，在左侧导航点击 **集群管理**；
2. 进入 **Kubernetes 集群** 列表页（路由 `/cluster/clusters`）；
3. 点击页面右上角的 **导入集群** 按钮，进入导入页（路由 `/cluster/clusters/create`，页面标题为"导入 Kubernetes 集群"）。

集群列表页同时展示所有已导入集群的概览信息，字段如下：

| 列 | 说明 |
| --- | --- |
| 集群 ID | 集群在 Kuboard 中的唯一标识（uid） |
| 集群名称 | 导入时填写的名称 |
| 描述 | 导入时填写的描述 |
| 集群版本 | 从 apiServer 的 `/version` 接口获取的版本号（`status.k8sVersion.gitVersion`） |
| 导入方式 | `kubeconfig` 或 `token` |
| 导入状态 | `importing` / `success` / `failed` |
| 集群状态 | `ready` / `error` / `unknown`；状态为 `error` 时，将鼠标悬停可查看失联原因与检查时间 |
| 导入时间 | 集群记录的创建时间 |

## 导入方式

导入页顶部提供两个选项卡（radio-button）选择导入方式：**kubeconfig** 与 **token**。两种方式共享以下表单字段：

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 集群名称 | `metadata.name` | 必填，长度 3 - 24，不能与已有集群重名 |
| 集群描述 | `spec.description` | 可选，用于在列表中区分集群 |
| 所在时区 | `spec.timeZone` | 可选，通过时区选择器（timezone picker）选择；不填时使用 Kuboard 服务端配置的默认时区 |

其余字段（apiServer、证书 / Token、跳过主机名校验、代理地址）在两种方式下略有不同，分别见下文。

## 方式一：通过 kubeconfig 导入

kubeconfig 方式是粘贴集群控制平面节点上的 `/etc/kubernetes/admin.conf` 文件内容，由 Kuboard 解析出 apiServer 地址与客户端证书。此方式仅支持 kubeadm 安装集群时生成的 kubeconfig 文件（TKE、kubespray 等工具安装的集群也使用 kubeadm）。

![kubeconfig 方式导入](./import.assets/cluster-import-1.png)

在集群控制节点上执行以下命令获得 kubeconfig 文件内容：

```bash
cat /etc/kubernetes/admin.conf
```

kubeconfig 方式下的表单字段如下：

| 字段 | 说明 |
| --- | --- |
| kubeconfig | 代码编辑区，粘贴 `/etc/kubernetes/admin.conf` 的完整内容 |
| context | 集群上下文（context）下拉框，粘贴 kubeconfig 后自动解析列出；选择后自动带出 apiServer 地址与证书信息 |
| apiServer | apiServer 地址，选择 context 时自动填充为其 `server` 字段，可手动修改 |
| 跳过主机名校验 | 开关，见下文"连接选项" |
| proxyUrl | 代理地址，见下文"连接选项" |

粘贴后 Kuboard 会立即校验 kubeconfig 内容：

- YAML 解析失败时提示"解析 YAML 出错"；
- 必须完整包含 `clusters`、`contexts`、`users` 三个字段，缺少任一字段都会提示"请确保您完整地复制了 kubeconfig 文件的内容"；
- 只有解析通过后才允许选择 context。

选中 context 后，Kuboard 从该 context 关联的 cluster / user 中提取 `certificate-authority-data`、`client-certificate-data`、`client-key-data`（若 user 中带有 `token` 字段也会一并提取），组装为证书信息提交给服务端。

::: tip 提示
- 未粘贴 kubeconfig 时 context 下拉框处于禁用状态，placeholder 提示"请先在上面的代码区粘贴 `/etc/kubernetes/admin.conf` 文件的内容"；
- 选择 context 之后可以手动修改 apiServer 地址，例如当内网地址与公网地址需要切换时；
- 请粘贴完整内容，只复制文件的一部分（例如只有 `users` 段）无法通过校验。
:::

## 方式二：通过 Token 导入

Token 方式需要提供 **apiServer 地址**与**访问令牌（token）**。令牌通过在目标集群的 control-plane 节点执行脚本创建。脚本会创建：

- `kuboard` 名称空间；
- `kuboard-admin` 服务账号（ServiceAccount）；
- 绑定 `cluster-admin` 集群角色（ClusterRole）的 `kuboard-admin-crb` 角色绑定（ClusterRoleBinding）；
- `kuboard-admin-token` 令牌（Secret）。

在集群的 control-plane 节点执行：

```bash
cat << EOF > kuboard-create-token.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: kuboard

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kuboard-admin
  namespace: kuboard

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kuboard-admin-crb
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kuboard-admin
  namespace: kuboard

---
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  annotations:
    kubernetes.io/service-account.name: kuboard-admin
  name: kuboard-admin-token
  namespace: kuboard
EOF

kubectl apply -f kuboard-create-token.yaml
kubectl -n kuboard get secret $(kubectl -n kuboard get secret kuboard-admin-token | grep kuboard-admin-token | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d
```

最后一条命令的输出即为所需 Token，将其填入 Kuboard 界面的 **token** 字段（必填）。Token 方式下的表单字段如下：

![Token 方式导入](./import.assets/cluster-import-2.png)

| 字段 | 对应 spec 字段 | 说明 |
| --- | --- | --- |
| 获取 Token | — | 展示上述脚本，可一键复制 |
| token | `spec.importSecretInfo` | 必填，粘贴脚本输出的令牌 |
| apiServer | `spec.apiServerUrl` | 必填，填写 apiServer 地址 |
| 跳过主机名校验 | `spec.apiServerSkipVerifyHostname` | 开关，见下文"连接选项" |
| proxyUrl | `spec.proxyUrl` | 代理地址，见下文"连接选项" |

::: warning 需要 kubectl 环境
执行上述脚本要求目标集群的 control-plane 节点上已安装 `kubectl` 且已配置为可访问集群。若集群的 apiServer 未使用默认 6443 端口，请自行调整脚本中的端口说明与 apiServer 地址填写。
:::

## 连接选项

两种方式共有以下连接相关选项：

| 选项 | 说明 |
| --- | --- |
| apiServer 地址校验 | 必填；必须以 `http://` 或 `https://` 开头；必须包含端口号（如 `https://10.95.15.32:8443`）；不能以 `/` 结尾 |
| 跳过主机名校验（skipVerifyHostname） | 当 apiServer 证书的主机名与填写的地址不匹配（例如报错 `Certificate for 10.99.15.32 doesn't match any of the subject alternative names`）时，勾选此选项跳过证书主机名校验 |
| proxyUrl | 当 Kuboard 所在服务器需要通过代理服务才能访问到 apiServer 时填写代理地址；服务端将代理用于与 apiServer 的连接（支持在代理地址中携带用户名密码，如 `http://user:pass@proxy:8080`） |

## 集群在 Kuboard 中的对象模型

导入的集群在 Kuboard 中以一个 Kubernetes 风格对象（`Cluster`）表示，`apiVersion` 为 `cluster.kuboard.cn/v4`，结构与 spec / status 如下：

```json
{
  "apiVersion": "cluster.kuboard.cn/v4",
  "kind": "Cluster",
  "metadata": {
    "name": "production-cluster",
    "uid": "cluster-abc123",
    "createTime": "2026-03-31T21:15:50.285+08:00",
    "updateTime": "2026-03-31T21:15:50.285+08:00"
  },
  "spec": {
    "description": "生产环境 Kubernetes 集群",
    "importType": "kubeconfig",
    "importSecretInfo": "{\"certificateAuthorityData\":\"...\",\"clientCertificateData\":\"...\",\"clientKeyData\":\"...\"}",
    "apiServerUrl": "https://10.95.15.32:8443",
    "apiServerSkipVerifyHostname": true,
    "proxyUrl": "",
    "timeZone": "Asia/Shanghai"
  },
  "status": {
    "importStatus": "success",
    "status": "ready",
    "k8sVersion": { "gitVersion": "v1.29.6" },
    "cacheLastUpdateTime": "2026-03-31T22:00:00.000+08:00",
    "healthStatusReason": "ok",
    "healthStatusLastCheckTime": "2026-03-31T22:00:00.000+08:00"
  }
}
```

### spec 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `importType` | 是 | 导入方式，取值为 `kubeconfig` 或 `token` |
| `importSecretInfo` | 是 | 导入凭据。token 方式下直接为令牌本身；kubeconfig 方式下为包含 `certificateAuthorityData`、`clientCertificateData`、`clientKeyData`（可选 `token`）的 JSON 字符串 |
| `apiServerUrl` | 是 | apiServer 地址 |
| `apiServerSkipVerifyHostname` | 是 | 是否跳过证书主机名校验 |
| `description` | 否 | 集群描述 |
| `proxyUrl` | 否 | 代理地址 |
| `timeZone` | 否 | 集群所在时区，缺省使用服务端默认时区 |

### status 字段

| 字段 | 说明 |
| --- | --- |
| `importStatus` | 导入状态：`importing` / `success` / `failed` |
| `status` | 健康状态：`ready` / `error` / `unknown` |
| `k8sVersion` | 从 apiServer `/version` 接口缓存的版本信息 |
| `healthStatusReason` | 失联原因（健康检查失败时的错误信息） |
| `healthStatusLastCheckTime` | 最近一次健康检查时间 |
| `cacheLastUpdateTime` | 最近一次数据同步时间 |
| `synchronizeStatus` | 同步任务状态列表（在集群详情页展示） |

为安全起见，`importSecretInfo` 中的凭据**不会**通过列表 / 详情接口回传给前端。

## 导入流程

点击 **导入集群** 按钮后，系统会校验填写的连接信息并提交导入，随后对集群执行首次数据同步与健康检查：

1. **连通性校验**：校验填写的 apiServer 地址与凭据是否可用，失败则中止导入并提示错误原因；
2. **提交导入**：校验通过后写入集群记录；
3. **首次同步**：系统开始同步集群内各资源的数据；
4. **健康检查**：同步过程中持续对集群做连通性探测，异常时在列表页标记为 `error` 并展示失联原因；
5. 导入成功后自动跳转到集群详情页。

如果在导入前需要核对信息，可参考 [编辑集群](./edit)；关于 5 秒/30 秒的同步与健康检查节奏，见 [同步状态](./sync-status)。

## 导入后状态

导入完成后，可在集群列表页看到该集群的两个状态维度：

| 状态 | 取值 | 含义 |
| --- | --- | --- |
| 导入状态（importStatus） | `importing` | 正在执行首次全量同步 |
| | `success` | 全量同步成功，集群数据可用 |
| | `failed` | 全量同步失败（如凭据失效、RBAC 权限不足） |
| 集群状态（status） | `ready` | `/healthz` 返回 `ok`，集群健康 |
| | `error` | 健康检查失败，悬停可查看失联原因 |
| | `unknown` | 尚未完成首次健康检查 |

导入成功后即可在 Kuboard 中浏览该集群的工作负载、配置与存储、服务与网络等资源，例如创建 Deployment 请参考 [部署工作负载](../workload/deployments)。

## 常见校验失败原因

| 现象 | 原因 | 处理方法 |
| --- | --- | --- |
| 提示解析 YAML 出错 / 必须包含 `clusters`、`contexts`、`users` 字段 | 粘贴的 kubeconfig 内容不完整或格式损坏 | 重新执行 `cat /etc/kubernetes/admin.conf` 并完整粘贴 |
| `Certificate for xxx doesn't match any of the subject alternative names` | apiServer 证书主机名与填写的地址不匹配 | 勾选"跳过主机名校验"，或改用证书中签发的域名访问 |
| 报错 `Cannot get K8S version` | 服务端无法连接 apiServer，或地址 / 端口 / 协议错误 | 检查网络连通性、apiServer 地址是否以 `http(s)://` 开头且包含端口、防火墙与负载均衡配置 |
| apiServer 地址格式校验失败 | 未包含端口号、以 `/` 结尾、或未以 `http://` / `https://` 开头 | 按校验规则修改地址，如 `https://10.95.15.32:8443` |
| `certificate-authority-data is invalid` / `client-key-data is invalid` | kubeconfig 中缺少或损坏 CA / 客户端证书数据 | 确认复制的是完整 kubeconfig 且选择的 context 正确 |
| Token 方式校验失败（401 / Forbidden） | 令牌无效、已过期或权限不足 | 重新执行获取 Token 的脚本；推荐使用绑定 `cluster-admin` 角色的令牌 |
| 集群状态长期为 `error` | apiServer 不可达、凭据失效或证书异常 | 在列表页悬停状态标签查看"失联原因"（`healthStatusReason`），按提示修复 |

<!-- NOTE: 前端 createCluster 中存在注释 "FIXME 创建集群时，请求参数未包含所在时区的字段"，表明 spec.timeZone 字段在创建接口中可能未被提交；后端在 timeZone 为空时使用 spring.jackson.time-zone 配置的默认时区。若页面发布前该问题未修复，建议在本页"所在时区"一行补充说明。
另外，ping-apiserver 校验使用 SelfSubjectRulesReview 检查当前凭据在 kube-system 名称空间内的权限，若使用自定义 RBAC 令牌（非 cluster-admin），需确保其具有足够的查看权限。
集群删除接口（DELETE /api/cluster.kuboard.cn/v4/cluster?uid=xxx）在列表中暂未开放入口按钮（前端已注释），仅通过 API 可调用。
-->
