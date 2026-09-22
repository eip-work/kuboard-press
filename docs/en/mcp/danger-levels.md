---
description: "Kuboard MCP's danger level mechanism for tools: definitions of the LOW / MEDIUM / HIGH tiers, the danger rating of each write tool, the evolution from confirmToken to the approval gate, and the role danger levels play in the approval flow"
---

# Danger Level Mechanism

This page explains the danger level of Kuboard MCP tools: how the three tiers are defined, which tier each tool is labeled with, and how it works together with Agent Change Approval to protect the cluster. It is written for ops / platform engineers configuring a change flow for agents. We recommend reading the [Approval flow](./approval-flow) first.

## Three Danger Levels and the Tool Map

Every MCP tool carries a danger level that answers "how dangerous is this AI operation and how much control does it need", with three tiers:

| Level | Typical operations | Meaning |
|---|---|---|
| LOW | Read tools / restarting the image of a single workload | No extra check required |
| MEDIUM | apply / patch / deleting a single resource | Dry-run rehearsal before execution |
| HIGH | Bulk delete / node drain / Pod eviction | High risk, must be confirmed by you |

::: tip What the level is based on
The level reflects the **real blast radius** of the operation, not "whether it writes to the cluster": `delete_k8s_collection` deletes a whole resource collection at once, so it is HIGH; `delete_k8s` only touches one object, so it is MEDIUM.
:::

Levels are assigned when the tools are registered: read tools default to LOW, write tools declare their level explicitly. You do not need to know the details of the assignment — just look up the table below to see which level each tool is:

| Danger level | Tools |
|---|---|
| LOW | Read tools: `list_clusters` / `list_k8s` / `get_k8s` / `get_pod` / Prometheus queries, etc. |
| LOW | `restart_workload` / `update_image_tag` / `scale_workload` / `rollback_workload` |
| MEDIUM | `apply_k8s` / `patch_k8s` / `delete_k8s` |
| HIGH | `delete_k8s_collection` / `drain_node` / `evict_pod` |

::: warning LOW-labeled tools can still be write operations
The 4 CD write tools such as `restart_workload` are labeled LOW but are real write operations. **Whether approval is required is decided by the write-tool whitelist, not the danger level** — a LOW label does not let you bypass approval. See the next section.
:::

## From Confirm Token to Approval Gate

The danger level mechanism has gone through two generations of control.

**First generation · confirm token (deprecated)**: in the early days, HIGH-level operations were confirmed with a one-time token. The agent fetched a token and executed directly with it — the token traveled back and forth within the session, and once obtained it could apply immediately. You only noticed afterwards, and you could not vet the many changes in a single plan one by one.

**Second generation · Agent Change Approval (current)**: the confirm token has been fully retired and replaced by "change plan + manual approval gate": the agent adds write operations to a plan one by one → you approve in the Kuboard UI → a one-time approval token is issued → the agent executes step by step with it.

```text
First generation: agent fetches the token itself → executes with it (passes as soon as it is obtained, you only know afterwards)
Second generation: agent builds a plan → you approve in the UI → receives an approval token → only then can it execute (cannot bypass you)
```

::: tip The difference between the two tokens
The confirm token was "the agent's self-confirmation"; the approval token is "the credential of your manual approval". Danger levels exist in both generations — the only thing that changed is **who performs the second confirmation that HIGH operations require**.
:::

## Danger Levels and the Approval Gate

Whether approval is mandatory is decided by the **Force Agent Change Approval** switch (enabled by default, see [Server configuration](./server-config)) together with a **write-tool whitelist**. When enabled, the 10 write tools on the whitelist are completely invisible to the agent and cannot be called directly — they can only be executed through the plan flow; even if the agent bypasses enumeration and calls them directly, the call is rejected at call time.

```json
["apply_k8s", "patch_k8s", "delete_k8s", "delete_k8s_collection",
 "drain_node", "evict_pod",
 "restart_workload", "scale_workload", "update_image_tag", "rollback_workload"]
```

**Danger level and whether approval is required are fully decoupled**: the criterion is the whitelist, not the danger level. `restart_workload` is labeled LOW but is still on the list and still requires approval.

## The Role of Danger Levels in Approval and Audit

Once inside the approval flow, the danger level plays three roles: **tier management + UI hint + audit trail**.

- **Step level**: each step's danger level comes from the tool's own label; if missing, it defaults to MEDIUM
- **Plan level**: a plan's danger level is the **highest** of all its steps — a single HIGH step makes the whole plan HIGH
- **UI hint**: LOW shows in blue, MEDIUM in yellow, HIGH in red and highlighted. The tier only decides how prominent the hint is, not whether approval is required

Danger levels are also written into audit and monitoring, to answer "which agent did what high-risk operation, and when":

| Scenario | In audit / monitoring |
|---|---|
| Every tool call | Records the tool name, success or failure, and danger level |
| Step appended to a plan | Records an "step accepted" entry with the danger level |
| Bypassing approval is blocked | Records an "approval gate blocked" entry; the action is uniformly recorded as update, to avoid exposing an attack surface |

Monitoring metrics carry a danger-level label, so you can directly answer "how many HIGH-level operations were executed / approved / blocked in the last hour".

## Common Misconceptions

1. **"A LOW label lets you bypass approval"** — Wrong. Approval looks at the whitelist, not the danger level; LOW write tools such as `restart_workload` are still blocked.
2. **"confirmToken is still in use"** — Wrong. It has been fully replaced by Agent Change Approval; the token parameter sent by old clients is only a backward-compatibility shell and takes part in no validation.
3. **"The danger level only affects the hint"** — True as far as "whether approval is required" goes, but it also decides the emphasis strength on the approval screen.
4. **"A plan's level is the average of its steps"** — It is the **highest** value, not the average.

## Related Pages

- [MCP integration overview](./index) — entry to "Agent Change Approval"
- [Server configuration](./server-config) — the Force Agent Change Approval switch and other settings
- [MCP tools](./tools) — the full tool list and write-operation whitelist
- [Agent Change Approval Flow](./approval-flow) — the full submit → approve → execute flow