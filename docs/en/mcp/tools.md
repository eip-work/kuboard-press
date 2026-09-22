---
description: "Complete list of all 34 Kuboard MCP Server tools — every tool's name, key parameters, and purpose grouped into read / write / approval categories, plus the change approval flow that write tools must go through"
---

# Kuboard MCP Tools

The Kuboard MCP Server provides 34 tools in total, grouped into three categories by purpose: read, write, and change approval. This page lists every tool's name, key parameters, and purpose for reference when configuring your agent.

**Audience**: operations / platform engineers who want to give an AI agent (Agent) access to Kuboard cluster operations.

::: tip Reading conventions
- Tool names keep their original English names (e.g. `list_clusters`); agents call these tools directly by name
- Parameters are marked **required** / (optional); most write tools carry a `dryRun` (optional) parameter — set to `true` it only validates and does not really execute, useful for previewing the change result
- This page is the detailed expansion of "What MCP provides" in the [MCP capabilities overview](./index)
:::

## Three Tool Categories: Read / Write / Approval

All tools are grouped by their **real side effects** into three categories: read tools only query and never modify; write tools issue persistent write operations to the cluster; change approval (Plan) tools are the entry through which write tools are executed after they get approval.

| Category | Count | Description | Approval needed |
|---|---|---|---|
| Read | 19 | Query clusters, workloads, Pods, logs, metrics, etc.; never modify any resource | No — returns on call |
| Write | 10 | Create / modify / delete K8s resources, restart and scale, node drain, etc. | **Yes** — goes through change-plan approval first |
| Change approval (Plan) | 5 | Submit the pending write operations to you for approval; executes after approval | The approval flow itself |

::: warning Write tools require approval
With "Force agent change approval" enabled, the 10 write tools are **invisible and not directly callable** by the agent. The agent must go through the change-plan flow: `create_plan` → `append_step_to_plan` → `finalize_plan` → you approve in the Kuboard UI → `apply_plan(planId, approvalToken)`. See [change approval flow](./approval-flow) and [dangerous operations and confirmation tokens](./danger-levels).
:::

::: warning Danger level markers
Write tools carry a danger level, treated differently by marker at approval time:

- **MEDIUM**: `apply_k8s` / `patch_k8s` / `delete_k8s`
- **HIGH**: `delete_k8s_collection` (especially deleting PVCs), `drain_node`, `evict_pod` — prominently marked at approval time; double-check the impact scope of these
:::

With "Force agent change approval" disabled, the 5 change approval (Plan) tools are hidden and the write tools become directly callable by the agent again.

## All Tools at a Glance (34)

The table below lists all tools by the read / write / approval categories. Only key parameters are shown; refer to each tool's actual schema when configuring your agent.

| Tool | Category | Key parameters | Purpose |
|---|---|---|---|
| `list_clusters` | Read | None | List all clusters the current user can access (id / name); first step of a session |
| `list_namespaces` | Read | `clusterId` | List the namespace tree of the given cluster |
| `list_workloads` | Read | `clusterId`, `namespace` | List Deployments / StatefulSets / DaemonSets |
| `get_workload` | Read | `clusterId`, `namespace`, `kind`, `name` | Get the full YAML of a single workload |
| `get_workload_history` | Read | `clusterId`, `namespace`, `kind`, `name` | List the workload's historical revisions (view before rollback) |
| `list_endpoints` | Read | `clusterId`, `namespace` (optional) | List endpoints |
| `check_permission` | Read | `clusterId`, `apiGroup`, `resource`, `verb`, `namespace` (optional) | Check whether the current user has permission on a resource (self-check before a write operation) |
| `get_pod` | Read | `clusterId`, `namespace`, `name` | Get detailed info of a single Pod |
| `get_pod_logs` | Read | `clusterId`, `namespace`, `name`, `tailLines` (default 100, max 1000), `container`, `previous`, `sinceSeconds` | Get Pod logs |
| `list_k8s` | Read | `clusterId`, `apiGroup`, `resource`, `namespace` (optional) | List K8s resources of any registered type (ConfigMap / Secret / Service / Ingress / PVC, etc.) |
| `get_k8s` | Read | `clusterId`, `apiGroup`, `resource`, `name`, `namespace` (optional) | Get details of a single K8s resource |
| `list_events` | Read | `clusterId`, `namespace` (optional), `limit` (default 50) | List cluster events; troubleshoot ImagePullBackOff, CrashLoopBackOff, etc. |
| `get_node_metrics` | Read | `clusterId`, `name` (optional, defaults to all nodes) | Query real-time CPU / memory usage of nodes |
| `get_pod_metrics` | Read | `clusterId`, `namespace` (optional), `name` (optional) | Query real-time CPU / memory usage of Pods |
| `list_custom_resources` | Read | `clusterId`, `apiGroup`, `resource`, `namespaced`, `namespace` (optional) | List instances of a given CRD (CRs created by Operator / Helm) |
| `prometheus_query` | Read | `clusterId`, `query`, `time` (optional), `timeout` (optional) | PromQL instant query |
| `prometheus_query_range` | Read | `clusterId`, `query`, `start`, `end`, `step` | PromQL range query |
| `prometheus_label_values` | Read | `clusterId`, `label`, `matchSeries` (optional) | Query the values of a label |
| `prometheus_buildinfo` | Read | `clusterId`, `timeout` (optional) | Query Prometheus version and health info |
| `apply_k8s` | Write · MEDIUM | `clusterId`, `apiGroup`, `resource`, `namespace`, `yaml`, `dryRun` (optional) | Apply K8s YAML: update the resource if it exists, create it if it does not |
| `patch_k8s` | Write · MEDIUM | `clusterId`, `apiGroup`, `resource`, `name`, `patches`, `namespace` (optional) | Modify resource fields with RFC 6902 JSON Patch |
| `delete_k8s` | Write · MEDIUM | `clusterId`, `apiGroup`, `resource`, `name`, `namespace` (optional), `dryRun` (optional) | Delete a single resource; idempotently returns success when it does not exist |
| `delete_k8s_collection` | Write · HIGH | `clusterId`, `apiGroup`, `resource`, `namespace` (optional), `propagationPolicy` (optional) | Delete an entire resource collection; pass `Foreground` explicitly when deleting a PVC collection |
| `restart_workload` | Write | `clusterId`, `namespace`, `kind`, `name`, `dryRun` (optional) | Restart a workload (rollingly recreate Pods) |
| `scale_workload` | Write | `clusterId`, `namespace`, `kind` (deployment / statefulset), `name`, `replicas`, `dryRun` (optional) | Change the replica count of a workload (scale up / down) |
| `update_image_tag` | Write | `clusterId`, `namespace`, `kind`, `name`, `newImageTag`, `containerName` (optional) | Update the image tag; applies to all containers when `containerName` is omitted |
| `rollback_workload` | Write | `clusterId`, `namespace`, `kind`, `name`, `revisionToRollback` (optional) | Roll back a workload; rolls back to the previous revision when the revision is omitted |
| `drain_node` | Write · HIGH | `clusterId`, `nodeName`, `force` (optional), `gracePeriodSeconds` (optional), `dryRun` (optional) | Drain a node: mark it unschedulable first, then evict all its Pods; `force=true` ignores PodDisruptionBudget |
| `evict_pod` | Write · HIGH | `clusterId`, `namespace`, `podName`, `force` (optional), `gracePeriodSeconds` (optional), `dryRun` (optional) | Evict a single Pod |
| `create_plan` | Approval | `description` | Create an empty change plan; returns `planId` |
| `append_step_to_plan` | Approval | `planId`, `tool`, `args`, `description` | Add an object to change into the plan; `tool` must be one of the 10 write tools and is dry-run validated before being added |
| `finalize_plan` | Approval | `planId` | Submit the plan into pending-approval state; from then on it is visible and approvable in the Kuboard UI |
| `get_plan_approve_status` | Approval | `planId` | After approval, query the result of each step and return the `approvalToken` |
| `apply_plan` | Approval | `planId`, `approvalToken` | Consume the `approvalToken` to actually execute all changes in the plan |

Log parameter notes: `container` is required for multi-container Pods and can be omitted for single-container ones; `previous` set to `true` returns logs from before the last restart (valid only for terminated containers); `sinceSeconds` returns only logs from the last N seconds — use it or `tailLines`, not both.

The `clusterId` / `namespace` needed by read tools usually come from the return values of the first two tools, `list_clusters` and `list_namespaces` — have the agent call them at the start of a session, and every later tool is located by these two values.

## Metrics and Prometheus Queries

::: tip Prerequisites
- The node / Pod metrics tools require **metrics-server** installed in the cluster; without it they return an error like "metrics.k8s.io unavailable"
- The Prometheus tools need a data source configured under **System Settings → MCP Server → Prometheus** first, see [server configuration](./server-config); unconfigured tools return a disabled notice
:::

Prometheus queries are subject to cluster RBAC and rate limits: complex aggregate queries are rejected under the REJECT policy, and results exceeding the per-query series / points limit return `PROM_TOO_LARGE`. On failure the error code is passed through via `meta.errorCode`: `PROM_NOT_FOUND` (no Prometheus service found), `PROM_UNREACHABLE` (unreachable), `PROM_QUERY_ERROR` (query error), `PROM_AUTH_FAILED` (insufficient permission), `PROM_SCOPE_TOO_LARGE` (aggregation scope exceeds the limit).

Both metrics tools return normalized values: CPU converted to cores, memory to MiB — usable directly for alerting or comparison.

## Typical Usage Flow

Once your agent is connected, a conversation like "restart nginx for me" roughly goes through these steps; the only thing you need to do is the final approval:

1. The agent first calls `list_clusters` / `list_workloads` to locate the cluster and workload — read tools return immediately, no involvement needed from you
2. The agent calls `create_plan` to create a change plan, adds write operations such as `restart_workload` via `append_step_to_plan`, then submits with `finalize_plan`
3. You see the plan in the pending list in the Kuboard UI, review the objects and parameters, approve, and receive the `approvalToken`
4. The agent calls `apply_plan` to execute; you can watch the progress and final result in the UI (all succeeded or partial failure)

## Change Plans: The Entry to Write Approval

A change plan (Plan) is the only entry for submitting write operations to your approval, for the scenario where "the agent wants to change the cluster, but the change must be confirmed by you". The 5 tools are chained in a fixed order:

| Step | Tool | Parameters | Purpose |
|---|---|---|---|
| 1 | `create_plan` | `description` | Create an empty plan and return `planId`; `description` states the purpose of this operation |
| 2 | `append_step_to_plan` | `planId`, `tool`, `args`, `description` | Append objects to change into the plan; callable multiple times to aggregate several changes; objects that fail dry-run never enter the plan |
| 3 | `finalize_plan` | `planId` | Submit the plan into pending-approval; you see it in the Kuboard UI and approve / reject |
| 4 | `get_plan_approve_status` | `planId` | After your approval, query each step's result; partial approval marks the skipped steps and returns the `approvalToken` |
| 5 | `apply_plan` | `planId`, `approvalToken` | Execute all approved changes in the plan; `planId` and the token must belong to the same plan |

Plan status flow: `CREATED` (being built; visible in the list but not approvable) → `PENDING` (awaiting approval) → `APPROVED` → `APPLYING` → `APPLIED` / `PARTIAL_APPLIED` / `FAILED`, plus `REJECTED` (rejected), `CANCELED` (canceled), and `EXPIRED` (expired).

::: tip Usage suggestions
- The `tool` whitelist of `append_step_to_plan` is exactly the 10 write tools; write operations must be added to a plan first
- To reduce the number of approvals, combine the changes under the same purpose into a single plan
:::

## Related Pages

- [MCP usage overview](./index)
- [Server configuration](./server-config) (approval switch, Prometheus data source, rate limits)
- [Change approval flow](./approval-flow) (submit → approve → execute, the full flow)
- [Dangerous operations and confirmation tokens](./danger-levels) (danger level grading and HIGH operation details)
