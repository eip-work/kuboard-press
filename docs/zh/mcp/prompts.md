---
description: 说明 MCP prompt（提示词模板）是什么、与工具的区别，Kuboard 内置的 3 个 prompt 的用途、参数与模板原文，以及客户端如何触发。
---

# Kuboard MCP Server 内置 Prompt（提示词模板）

prompt 是服务端预置的「提示词模板」：客户端填入参数，得到一段可直接交给 AI 的指令文本。本页列出 Kuboard 内置的 3 个 prompt 的用途、参数与模板原文，并说明客户端如何触发。建议先读 [./server-config](./server-config) 与 [./tools](./tools) 建立背景。

## prompt 是什么、与 tools 有何区别

prompt 与 tools 都是 MCP 协议暴露给客户端的「能力」，角色完全不同：

| 维度 | tools（工具） | prompt（提示词模板） |
|---|---|---|
| 本质 | 一段**可执行**的服务端逻辑 | 一段**静态文本模板**，填充参数后返回给客户端 |
| 协议方法 | `tools/list` / `tools/call` | `prompts/list` / `prompts/get` |
| 是否调用集群 | 是，直接作用于集群 | 否，仅做文本替换，不触碰集群 |
| 写入风险 | 高（写工具需审批） | 无（本身不写任何东西） |

::: tip 像斜杠命令一样用
prompt 的典型用法是「给 AI 一段高质量的任务指令」。例如 `diagnose_pod` 返回「分析 Pod 状态」的指令，AI 随后会调用若干读工具收集数据再作答，因此 prompt 常被类比为客户端的斜杠命令（slash command）。
:::

## 内置 prompt 总览

Kuboard 共内置 **3 个 prompt**：

| 名称 | 用途 | 参数 |
|---|---|---|
| `diagnose_pod` | 诊断 Pod 当前状态：根据 events / status / restartCount 输出结构化分析 | `clusterId`（必填）、`namespace`（必填）、`name`（必填） |
| `generate_deployment_yaml` | 根据镜像 + 副本数生成 Deployment YAML | `image`（必填）、`replicas`（可选） |
| `cleanup_orphaned_pvc` | 扫描集群孤立 PVC（已无 Pod 引用），给出清理建议 | `clusterId`（必填） |

模板中的 `{参数名}` 由你提供的参数自动替换，其余文本原样保留。

## 逐个详解

### diagnose_pod：诊断 Pod

当 Pod 处于异常（CrashLoopBackOff、ImagePullBackOff、Pending 等）时，让 AI 按统一口径去分析。

| 参数 | 必填 | 语义 |
|---|---|---|
| `clusterId` | 是 | 目标集群标识 |
| `namespace` | 是 | Pod 所在命名空间 |
| `name` | 是 | Pod 名称 |

**模板原文**：

```text
请分析集群 {clusterId} 中的 Pod {namespace}/{name} 当前的状态。重点关注：events 中的 Warning
/ status 中的 phase 与 conditions / restartCount 变化。如果有 ImagePullBackOff 或
CrashLoopBackOff 给出排查步骤。
```

**典型用法**：AI 取到这段指令后，调用读工具（如 `get_pod`、事件查询，见 [./tools](./tools)）收集 events / status / restartCount，再输出结构化诊断结论。模板刻意聚焦「证据维度」，避免 AI 泛泛而谈。

### generate_deployment_yaml：生成 Deployment YAML

把「镜像 + 副本数」直接翻译成一份可用的 Deployment YAML 草稿。

| 参数 | 必填 | 语义 |
|---|---|---|
| `image` | 是 | 容器镜像，如 `nginx:1.27` |
| `replicas` | 否 | 期望副本数；省略时不带副本数约束 |

**模板原文**：

```text
根据镜像 {image} 生成 Deployment YAML。如果提供了 replicas 参数，则按 {replicas} 副本数生成。
```

**典型用法**：AI 得到指令后可直接产出 YAML；如需落库执行，再走计划审批流程（见 [./approval-flow](./approval-flow)）。

### cleanup_orphaned_pvc：扫描孤儿 PVC

找出集群中已无任何 Pod 引用的 PVC，并给出清理建议——纯扫描、零写入。

| 参数 | 必填 | 语义 |
|---|---|---|
| `clusterId` | 是 | 目标集群标识 |

**模板原文**：

```text
扫描集群 {clusterId} 中的孤立 PVC（已无 Pod 引用），给出清理建议。
```

**典型用法**：只有一个必填参数，客户端无需感知命名空间细节。模板措辞是「给出清理建议」而非「执行删除」——真正的删除是写操作，会走审批门（见 [./danger-levels](./danger-levels) 与 [./approval-flow](./approval-flow)）。

::: warning prompt 本身不做任何集群操作
`cleanup_orphaned_pvc` 只是让 AI 去列 PVC / 核对引用关系并给出建议；如果 AI 据此发起删除，那一步仍然是工具调用，照常受 RBAC、危险级别与审批门管控。
:::

## 客户端如何触发

客户端与 MCP Server 之间走 JSON-RPC 2.0（Streamable HTTP，见 [./server-config](./server-config)），prompt 相关只有两个方法：`prompts/list` 与 `prompts/get`。

### prompts/list：枚举全部 prompt

请求需携带 `Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>`（格式见 [./server-config](./server-config)），端点为 `/mcp`：

```bash
curl -X POST http://<backend-host>:9090/mcp \
  -H "Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"prompts/list","params":{}}'
```

响应返回全部 prompt 的名称、描述与参数定义（此处仅展示第一个，完整列表共 3 个）：

```json
{
  "prompts": [
    {
      "name": "diagnose_pod",
      "description": "诊断 Pod 当前状态：根据 events / status / restartCount 输出结构化分析",
      "arguments": [
        { "name": "clusterId", "required": true },
        { "name": "namespace", "required": true },
        { "name": "name", "required": true }
      ]
    }
  ]
}
```

### prompts/get：取渲染后的提示词

`params` 里给出 `name` 与 `arguments`，响应 `messages[0]` 即为填好参数、可直接喂给 AI 的指令：

```bash
curl -X POST http://<backend-host>:9090/mcp \
  -H "Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"prompts/get","params":{"name":"diagnose_pod","arguments":{"clusterId":"prod","namespace":"default","name":"nginx-7d8f9"}}}'
```

### 在 AI 客户端中使用

opencode、Claude Code 等客户端会在会话里把 prompt 暴露为可选择的模板（类似斜杠命令）：选定 prompt 名称、填充参数后，客户端自动发起 `prompts/get`，把返回的 user 消息连同后续工具调用一并交给模型。prompt 是**提示词模板**而非自动化脚本——触发后 AI 仍要自行调用 tools 完成实际操作，prompt 的价值在于把「怎么分析、先看什么、输出什么格式」预先写好。

## 常见误区

1. **「prompt 会自动执行诊断 / 生成 / 清理」**——错。prompt 返回的是**指令文本**，一切实际动作由 AI 随后的工具调用来完成。
2. **「replicas 是可选的，所以可以不传」**——对。可选性体现在模板的条件句「如果提供了 replicas 参数……」，传了才带副本数约束。
3. **「prompt 可以绕过鉴权 / 审批」**——错。prompt 请求同样要求访问密钥鉴权（见 [./server-config](./server-config)）；由 prompt 引导出的任何**写操作**最终还是工具调用，照常被审批门拦截（见 [./approval-flow](./approval-flow)）。
4. **「prompt 只有中文模板」**——中英文模板都内置，无需自行配置；模板缺失时返回空指令。

## 相关页面

- [./server-config](./server-config) —— MCP Server 协议版本、端点与整体配置
- [./tools](./tools) —— prompt 触发后 AI 实际会用到的全套 MCP 工具
- [./approval-flow](./approval-flow) —— prompt 引导出的写操作如何进入计划审批
- [./danger-levels](./danger-levels) —— 工具危险级别：为什么「给建议」与「执行删除」管控强度不同