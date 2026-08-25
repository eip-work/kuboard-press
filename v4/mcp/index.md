# 使用智能体连接 Kuboard MCP

Kuboard V4 提供 MCP（Model Context Protocol）Server，允许 AI 智能体直接与 Kubernetes 集群交互。支持以下智能体：

Claude Desktop、Cursor、Windsurf、Zed、VS Code、Trae、Cline、Continue、**opencode**、Claude Code、Goose、OpenClaw、Hermes Agent 等。

**MCP 提供的能力：**

| 类别 | 能力 |
|---|---|
| 集群管理 | 查询集群列表、集群详情、集群版本、节点状态 |
| 工作负载 | 查询/查看 Deployment、StatefulSet、DaemonSet、Job、CronJob、Pod，支持重启、镜像更新 |
| 资源管理 | 查询/查看 ConfigMap、Secret、Service、Ingress、PVC、ServiceAccount、NetworkPolicy 等 |
| 节点操作 | 查询节点详情、Pod 驱逐、节点排水 |
| 自定义资源 | 查询/查看 CRD 及自定义资源实例 |
| 事件监控 | 查询集群/命名空间事件 |
| 指标查询 | 通过 Prometheus 查询 CPU、内存、网络等指标 |
| 工具链 | 查看可用工具列表、确认操作令牌 |

## 前置条件

- 已安装支持 MCP 的智能体客户端（如 [opencode](https://opencode.ai)）
- 已部署 Kuboard V4（v4.1.0+）

## 配置步骤（以 opencode 为例）

### 1. 启用 MCP Server

在 Kuboard 中进入 **系统设置 → MCP Server**（路由 `/config/systemconfigs?tab=00000001000`），启用 MCP Server 开关并保存。

![MCP Server 设置页](./step1-mcp-settings.png)

### 2. 获取 MCP 配置

在右上角用户菜单中点击 **访问密钥**，进入访问密钥管理页。点击 **新增访问密钥** 创建密钥，然后点击 **复制 MCP 配置**。

![访问密钥列表](./step2-access-keys.png)

在弹出的对话框中选择 Agent 为 **opencode**，点击 **复制**。

![MCP 配置对话框](./step2-mcp-config-dialog.png)

### 3. 配置到 opencode

在 opencode 中输入以下提示：

```
将下面这段 MCP server 配置好
<粘贴复制过来的配置片段>
```

opencode 会自动将配置写入 `opencode.json` 的 `mcp` 字段。

### 4. 验证连接

重启 opencode 后输入提示词：

```
使用 kuboard mcp 查询当前有哪些集群，哪些工作负载
```

opencode 将调用 Kuboard MCP 工具并返回结果。

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

- `url` 中的主机地址需替换为 Kuboard 实际可达的地址
- `Authorization` 值由 Kuboard 复制 MCP 配置时自动生成
