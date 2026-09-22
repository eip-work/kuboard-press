---
description: "MCP Server configuration: enable/disable, transport endpoints, access rate limits, CORS, Agent write approval, and all settings and defaults for the Prometheus data source"
---

# MCP Server Configuration

This page explains how to configure the MCP (Model Context Protocol) Server settings in **System Settings → MCP Server**. For agent client setup steps, see [Quick Start](./index).

::: tip Version note
The card-based sections, Test Connection, danger-switch warnings, and Agent Change Approval on the "MCP Server Settings" page are available since `v4.2.2.0`.
:::

The settings page is split into three cards: **Service Overview**, **Transport & Limits**, and **Prometheus Tools**, described in that order below.

## Service Overview

### Enable MCP Server

| Setting | Default |
|---|---|
| Enable MCP Server | `false` (off by default) |

When enabled, the MCP endpoint is exposed to the outside; when disabled, requests to `/mcp` always return **HTTP 404**.

The MCP endpoint path is `/mcp`, supporting both **POST** (JSON-RPC over Streamable HTTP) and **GET** (SSE streaming connection, for clients such as opencode).

::: tip Reverse proxy
If you use a reverse proxy, make sure the `/mcp` path routes to the Kuboard backend service, not the frontend service.
:::

### MCP Address and Test Connection

The settings page shows the current MCP address (in the format "your Kuboard access address + `/mcp`"). Click **Copy** to copy it to the clipboard; click **Test Connection** to verify the address is reachable — a response of `200 / 401 / 405` is treated as "reachable" (`401` means the endpoint is online but requires authentication).

### Authentication

The MCP endpoint authenticates with the same **Access Key** as Kuboard. Clients carry `Authorization: Bearer <AK>.<SK>` or `Kb-Access-Key: <AK>.<SK>` in the request header. Access keys are created under **user menu (top-right) → Access Keys**; the snippet generated when copying the MCP configuration fills in this header automatically.

## Mandatory Approval for Agent Write Operations

| Setting | Default |
|---|---|
| Force agent change approval | `true` (production-safe default) |

**Enabled (default)**: write operations by agents (`apply_k8s` / `delete_k8s` / `drain_node` / `evict_pod`, etc.) are first staged as a change plan, and only take effect on the cluster after you approve each one in the Kuboard UI and pass the one-time approval token (approvalToken) back to the agent. **Disabled**: write calls execute directly and immediately, and a red warning banner appears on the page.

::: danger
Disabling "Force agent change approval" means giving up the human review of AI write operations; it is not recommended to disable it in production. For the full flow, see [Change Approval Flow](./approval-flow) and [Dangerous Operations and Confirmation Tokens](./danger-levels).
:::

## Transport & Limits

### Allowed CORS Origins

Cross-origin browser clients (e.g. `https://chat.openai.com`) must be configured here, otherwise their cross-origin requests are rejected.

| Origin list state | Behavior |
|---|---|
| Empty list (default) | Rejects all cross-origin requests |
| Non-empty | Allows exact matches against the Origin string |

Every entry must start with `http://` or `https://` (the form validates it immediately). This setting applies only to the MCP endpoint; it does not affect the cross-origin behavior of other main-application APIs.

### Maximum Request Body Size

Limits the maximum byte size of a single MCP request (the JSON-RPC request body); default **10 MB**, and requests exceeding the limit return **HTTP 413**. If your AI client sends large tool arguments, you can raise it; the UI steps in 1 MB increments.

### Per-user Rate Limit

| Setting | Default | UI range |
|---|---|---|
| Per-user rate limit (max requests per window) | 50 | 1 ~ 10000 |
| Rate-limit sliding window duration | 60 s | 1 ~ 3600 s |

When a user exceeds the limit within the sliding window, **HTTP 429** is returned and the client should back off and retry accordingly. The configuration takes effect hot — no restart required.

### Maximum SSE Subscriptions per User

Limits the number of concurrent resource/prompt change subscriptions each user may hold; default `100` (unit: connections). Requesting one more subscription beyond the limit returns an error.

::: warning Restart required after saving
A **Kuboard service restart** is required after saving this value for it to take effect; the UI also shows this note.
:::

## Prometheus Tools

The settings in this section control the Prometheus metrics query tools exposed through MCP (`prometheus_query` / `prometheus_query_range`, etc.).

### Master Switch

On by default. When disabled, the tools still appear in the tool list, but calling them directly returns `PROM_NOT_FOUND`, and service discovery and per-query RBAC checks are skipped.

### Query Limits and Authorization

| Setting | Default | UI range |
|---|---|---|
| Max series per instant query | 10000 | 1 ~ 1,000,000 |
| Max points per range query | 100000 | 1 ~ 10,000,000 |
| Query timeout | 30 s | 1 ~ 600 |
| Per-query RBAC | On | Switch |

### Aggregate Query Policy

Three policies for "filter + aggregate" PromQL (e.g. `sum`, `avg`, `count`, `topk`):

| Policy | Behavior |
|---|---|
| Reject aggregate queries | Aggregation/function hits are rejected outright |
| Allow with per-dimension scope check (recommended, default) | After aggregation, union-set RBAC check per dimension |
| Allow but force cluster scope | Forces cluster-scope permission after aggregation |

Two companion numeric settings:

- **Aggregate query rate multiplier**: an aggregate query consumes this many times the rate-limit quota in one call; default 5×;
- **Aggregate query max scope expansion**: the maximum number of namespace/node dimensions a single aggregate query may expand to; default 100, preventing one broad aggregate query from scanning the whole cluster beyond its authorization.

### Per-cluster Prometheus Service Discovery

MCP locates the Prometheus instance inside the cluster. With no rows added, the built-in heuristic **auto-discovery** is used; to override, add one discovery rule per cluster:

| Field | Description |
|---|---|
| Cluster ID | The cluster to override (dropdown) |
| Namespace | Takes effect only in service-name mode; looks across namespaces when empty |
| Label selector | e.g. `operated-prometheus=true`; mutually exclusive with the service name |
| Service name | e.g. `prometheus-operated`; mutually exclusive with the label selector; when both are set, the label selector wins |
| Port | Service port; default `9090` |

Override rules take effect immediately.

## Related Pages

- [Client Setup Quick Start](./index) —— steps to connect an agent client
- [Tools List](./tools) —— all tools for K8s clusters, workloads, resources, metrics, etc.
- [Change Approval Flow](./approval-flow) —— plan approval, partial approval, and approval tokens
- [Dangerous Operations and Confirmation Tokens](./danger-levels) —— danger levels and one-time confirmation tokens
