---
description: 通过 Kuboard MCP 让 AI 智能体直接操作 Kubernetes 集群：opencode 等客户端 4 步接入、内置能力一览与 Agent 变更审批机制。
---

# 使用智能体连接 Kuboard MCP

本页说明如何让 AI 智能体通过 MCP 协议接入 Kuboard，直接查询与操作 Kubernetes 集群，并了解 Kuboard 如何审批智能体的写入操作。

支持的智能体客户端：Claude Desktop、Cursor、Windsurf、Zed、VS Code、Trae、Cline、Continue、**opencode**、Claude Code、Goose、OpenClaw、Hermes Agent 等。

## MCP 提供的能力

| 类别 | 能力 |
|---|---|
| 集群管理 | 查询集群列表、集群详情、集群版本、节点状态 |
| 工作负载 | 查询 Deployment、StatefulSet、DaemonSet、Pod；支持重启、更新镜像、扩缩容、回滚 |
| 资源管理 | 查询 ConfigMap、Secret、Service、Ingress、PVC、ServiceAccount、NetworkPolicy 等 |
| 节点操作 | Pod 驱逐、节点排水 |
| 自定义资源 | 查询 CRD 及自定义资源实例 |
| 事件监控 | 查询集群 / 命名空间事件 |
| 指标查询 | 通过 Prometheus 查询 CPU、内存、网络等指标 |
| **Agent 变更审批** | **所有写入操作（修改、删除、重启等）都需要先在 Kuboard UI 中审批通过后才会真正执行** |

## 前置条件

- 已部署 Kuboard V4（v4.1.0+）
- 已安装支持 MCP 的智能体客户端（如 [opencode](https://opencode.ai)）

## 配置步骤（以 opencode 为例）

### 1. 启用 MCP Server

进入 **系统设置 → MCP Server**，打开 **MCP Server 总开关** 并保存 → 设置页出现限流、跨域、Prometheus 等配置项。

![MCP Server 设置页](./step1-mcp-settings.png)

::: tip 设置页还能做什么
- 调整每用户访问频率限制（默认每分钟 50 次）
- 配置允许的跨域来源（CORS）
- 配置 Prometheus 数据源（用于指标查询工具）
:::

### 2. 获取 MCP 配置

右上角用户菜单点 **访问密钥 → 新增访问密钥** 创建密钥 → 密钥列表出现新条目，点击 **复制 MCP 配置**。

![访问密钥列表](./step2-access-keys.png)

在对话框中把 Agent 选为 **opencode**，点击 **复制** → 剪贴板中得到一段 MCP 配置片段。

![MCP 配置对话框](./step2-mcp-config-dialog.png)

### 3. 配置到 opencode

在 opencode 中输入以下提示：

```text
将下面这段 MCP server 配置好
<粘贴复制过来的配置片段>
```

→ opencode 自动将配置写入 `opencode.json` 的 `mcp` 字段。

### 4. 验证连接

重启 opencode 后输入：

```text
使用 kuboard mcp 查询当前有哪些集群，哪些工作负载
```

→ opencode 调用 Kuboard MCP 工具并返回集群与工作负载信息。

## Agent 变更审批

为避免智能体误操作或越权，Kuboard 对**所有写入操作**默认强制审批 —— 智能体只能提交变更计划，经你确认后集群才会被真正修改。

::: warning 关闭强制审批
可在 MCP Server 设置中关闭「Agent 操作强制审批」开关，但不推荐用于生产环境。
:::

### 它是如何工作的

当你让智能体执行修改操作（如「把这个 Deployment 扩容到 5 副本」「把镜像升级到 v2」「删除这个 ConfigMap」）：

1. **提交计划** —— 智能体先提交变更计划（Plan），列出它打算做的所有操作
2. **等待审批** —— 计划出现在 Kuboard 左侧菜单的「Agent 变更审批」页面
3. **你来做决定** —— 查看每个操作详情，选择全部批准 / 部分批准（勾选）/ 拒绝
4. **执行变更** —— 审批通过后智能体拿到一次性令牌，集群才被真正修改
5. **查看结果** —— 执行过程实时显示进度，每一步的成功 / 失败都能看到

### 为什么要这样做

- **可控**：所有修改都在你眼皮底下发生，智能体不会「偷偷」改东西
- **可审计**：每次变更都有完整记录（哪个智能体、什么时间、改了什么、谁批准的）
- **可回滚**：审批前能看到每个操作的 dry-run 预演，避免误操作
- **支持部分批准**：智能体提出 10 个操作，你可以批准其中 8 个、跳过 2 个

### 适用范围

| 操作类型 | 是否需要审批 |
|---|---|
| 读取集群信息、查询资源、查看日志 | 不需要 |
| 查询指标（Prometheus / metrics-server） | 不需要 |
| 创建 / 修改 / 删除 K8s 资源 | **需要** |
| 重启 / 扩缩容 / 回滚工作负载 | **需要** |
| Pod 驱逐、节点排水 | **需要** |

### 审批页面入口

登录 Kuboard 后，左侧菜单顶部会出现 **「Agent 变更审批」** 入口（路径 `/agent-change-plans`），所有待审批、已批准、已拒绝、已执行的历史计划都在这里查看。完整流程见 [Agent 变更审批流程](./approval-flow)。

## 配置参考

配置写入后，`opencode.json` 中 `mcp` 字段的格式如下：

```json
{
  "mcp": {
    "kuboard": {
      "type": "remote",
      "url": "http://<kuboard-address>:9090/mcp",
      "headers": {
        "Authorization": "Bearer <key-id>.<key-secret>"
      }
    }
  }
}
```

- `url` 的主机地址需替换为 Kuboard 实际可达的地址
- `Authorization` 值由「复制 MCP 配置」时自动生成

## 本分组其他页面

- [服务端配置](./server-config) —— MCP Server 全部设置项：总开关、传输端点、限流、CORS、Prometheus 数据源
- [工具清单](./tools) —— 全部 34 个 MCP 工具的名称、关键参数与用途
- [审批流程](./approval-flow) —— 变更计划从提交、审批到执行的完整流程与一次性令牌规则
- [危险级别](./danger-levels) —— 工具危险分级（LOW / MEDIUM / HIGH）与各层管控强度
- [内置 Prompt](./prompts) —— 预置提示词模板（诊断 Pod、生成 Deployment YAML、清理孤儿 PVC）及触发方式