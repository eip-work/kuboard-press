---
description: "What MCP prompts (prompt templates) are and how they differ from tools, the purpose / parameters / template text of the 3 prompts built into Kuboard, and how clients trigger them"
---

# Kuboard MCP Server Built-in Prompts (Prompt Templates)

A prompt is a server-side preset "prompt template": the client fills in parameters and receives a block of instruction text that can be handed directly to an AI. This page lists the purpose, parameters, and template text of the 3 prompts built into Kuboard, and explains how clients trigger them. Reading [./server-config](./server-config) and [./tools](./tools) first is recommended for background.

## What a Prompt Is and How It Differs from Tools

Prompts and tools are both "capabilities" that the MCP protocol exposes to clients, but they play entirely different roles:

| Aspect | Tools | Prompts (prompt templates) |
|---|---|---|
| Essence | **Executable** server-side logic | A **static text template**; parameters are filled in and the result is returned to the client |
| Protocol method | `tools/list` / `tools/call` | `prompts/list` / `prompts/get` |
| Touches the cluster | Yes, acts directly on the cluster | No, only performs text substitution, never touches the cluster |
| Write risk | High (write tools require approval) | None (does not write anything itself) |

::: tip Use them like slash commands
The typical use of a prompt is "give the AI a high-quality task instruction". For example, `diagnose_pod` returns the instruction "analyze the Pod's state", and the AI then calls several read tools to collect data before answering, which is why prompts are often compared to the client's slash commands.
:::

## Built-in Prompts at a Glance

Kuboard ships **3 prompts** in total:

| Name | Purpose | Parameters |
|---|---|---|
| `diagnose_pod` | Diagnose a Pod's current state: output a structured analysis based on events / status / restartCount | `clusterId` (required), `namespace` (required), `name` (required) |
| `generate_deployment_yaml` | Generate a Deployment YAML from an image + replica count | `image` (required), `replicas` (optional) |
| `cleanup_orphaned_pvc` | Scan the cluster for orphaned PVCs (no longer referenced by any Pod) and give cleanup suggestions | `clusterId` (required) |

The `{parameter name}` placeholders in a template are automatically replaced with the parameters you provide; the rest of the text is kept as-is.

## Each Prompt in Detail

### diagnose_pod: Diagnose a Pod

When a Pod is in an abnormal state (CrashLoopBackOff, ImagePullBackOff, Pending, etc.), let the AI analyze it in a consistent way.

| Parameter | Required | Meaning |
|---|---|---|
| `clusterId` | Yes | Target cluster identifier |
| `namespace` | Yes | Namespace the Pod belongs to |
| `name` | Yes | Pod name |

**Template text**:

```text
Analyze the current state of Pod {namespace}/{name} in cluster {clusterId}. Focus on: Warning events / status phase and conditions / restartCount changes. If there is ImagePullBackOff or CrashLoopBackOff, provide troubleshooting steps.
```

**Typical usage**: After the AI receives this instruction, it calls read tools (such as `get_pod`, event queries, see [./tools](./tools)) to collect events / status / restartCount, then outputs a structured diagnosis. The template deliberately focuses on "evidence dimensions" so the AI does not talk in generalities.

### generate_deployment_yaml: Generate a Deployment YAML

Directly translates "image + replica count" into a ready-to-use Deployment YAML draft.

| Parameter | Required | Meaning |
|---|---|---|
| `image` | Yes | Container image, e.g. `nginx:1.27` |
| `replicas` | No | Desired replica count; when omitted there is no replica-count constraint |

**Template text**:

```text
Generate a Deployment YAML from image {image}. If the replicas parameter is provided, generate with {replicas} replicas.
```

**Typical usage**: The AI can produce the YAML directly after receiving the instruction; if it needs to be applied to the cluster, it goes through the plan-approval flow (see [./approval-flow](./approval-flow)).

### cleanup_orphaned_pvc: Scan for Orphaned PVCs

Finds PVCs in the cluster that are no longer referenced by any Pod and gives cleanup suggestions — scan only, zero writes.

| Parameter | Required | Meaning |
|---|---|---|
| `clusterId` | Yes | Target cluster identifier |

**Template text**:

```text
Scan cluster {clusterId} for orphaned PVCs (no Pod references) and provide cleanup suggestions.
```

**Typical usage**: There is only one required parameter, so the client does not need to be aware of namespace details. The template says "provide cleanup suggestions" rather than "execute the deletion" — an actual deletion is a write operation that goes through the approval gate (see [./danger-levels](./danger-levels) and [./approval-flow](./approval-flow)).

::: warning The prompt itself performs no cluster operations
`cleanup_orphaned_pvc` only has the AI list PVCs / check reference relationships and give suggestions; if the AI then initiates a deletion, that step is still a tool call, governed as usual by RBAC, danger levels, and the approval gate.
:::

## How Clients Trigger Prompts

The client and the MCP Server communicate via JSON-RPC 2.0 (Streamable HTTP, see [./server-config](./server-config)); there are only two prompt-related methods: `prompts/list` and `prompts/get`.

### prompts/list: Enumerate All Prompts

The request must carry `Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>` (format see [./server-config](./server-config)), and the endpoint is `/mcp`:

```bash
curl -X POST http://<backend-host>:9090/mcp \
  -H "Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"prompts/list","params":{}}'
```

The response returns the name, description, and parameter definitions of every prompt (only the first is shown here; the full list has 3 entries):

```json
{
  "prompts": [
    {
      "name": "diagnose_pod",
      "description": "Diagnose the current state of a Pod: output a structured analysis based on events / status / restartCount",
      "arguments": [
        { "name": "clusterId", "required": true },
        { "name": "namespace", "required": true },
        { "name": "name", "required": true }
      ]
    }
  ]
}
```

### prompts/get: Get the Rendered Prompt

`params` supplies `name` and `arguments`; the `messages[0]` of the response is the instruction with parameters filled in, ready to feed to an AI:

```bash
curl -X POST http://<backend-host>:9090/mcp \
  -H "Authorization: Bearer <ACCESS_KEY>.<SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"prompts/get","params":{"name":"diagnose_pod","arguments":{"clusterId":"prod","namespace":"default","name":"nginx-7d8f9"}}}'
```

### Using Prompts in AI Clients

Clients such as opencode and Claude Code expose prompts in a session as selectable templates (like slash commands): after you pick a prompt name and fill in the parameters, the client automatically issues `prompts/get` and hands the returned user message together with the subsequent tool calls to the model. A prompt is a **prompt template**, not an automation script — after triggering, the AI still has to call tools itself to perform the actual actions. The value of a prompt is that "how to analyze, what to look at first, what format to output" is written in advance.

## Common Misconceptions

1. **"Prompts automatically run diagnostics / generation / cleanup"** — wrong. A prompt returns **instruction text**; every actual action is done by the AI's subsequent tool calls.
2. **"replicas is optional, so it's fine to omit it"** — right. The optionality is expressed by the template's conditional clause "If the replicas parameter is provided..."; only when passed does it carry the replica-count constraint.
3. **"Prompts can bypass authentication / approval"** — wrong. Prompt requests require access-key authentication just the same (see [./server-config](./server-config)); any **write operation** prompted by a prompt is finally a tool call and is still blocked by the approval gate (see [./approval-flow](./approval-flow)).
4. **"Prompts only have Chinese templates"** — Chinese and English templates are both built in; no configuration is needed. When a template is missing, an empty instruction is returned.

## Related Pages

- [./server-config](./server-config) — MCP Server protocol version, endpoint, and overall configuration
- [./tools](./tools) — the full set of MCP tools the AI actually uses after a prompt is triggered
- [./approval-flow](./approval-flow) — how write operations prompted by a prompt enter plan approval
- [./danger-levels](./danger-levels) — tool danger levels: why "giving suggestions" and "executing deletion" differ in control strength