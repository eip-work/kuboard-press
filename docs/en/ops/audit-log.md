---
description: "View the audit log: filter and locate every operation by time, user, object, action and status code, inspect request/response payloads, and drill into operations aggregated by MCP session"
---

# Audit Log

This page describes how to view and search the audit log: who performed what operation on which object, when, and what the result was, along with request/response payloads and MCP session details. Entry: "Ops & Observability" → "Audit Log".

::: tip Typical scenarios
- **Locate a problematic operation**: who deleted an object and why it failed (4xx/5xx);
- **Permission and compliance review**: verify a user's changes within a specified time window;
- **Track MCP behavior**: which operations an AI assistant (agent) executed in a session and how many succeeded/failed.
:::

::: warning Permission requirements
Audit Log is an administrator-level feature. It is visible only to users who have read permission on the audit resource under the Kuboard scope (kuboard); regular users cannot see it by default.
:::

## What gets audited

Whether an operation is recorded is determined by the **audit policy** (see [Audit Policy](./audit-policy)). By default, only write operations (create / update / delete / patch, etc.) are recorded; read operations (get / list) are not.

| Operation source | Recorded? | Description |
| --- | --- | --- |
| Kuboard UI / API (including Access Key AK/SK calls) | Write operations recorded | Create/update/delete, scale up/down, configuration changes; the Access Key ID is recorded |
| MCP tool calls / Helm operations | Recorded | Various tool functions, release create/update/delete and repository maintenance; a session identifier is attached |
| kubectl connecting directly to the cluster / WebSocket long-lived connections | Not recorded | Auditing only takes effect on the Kuboard side; terminals, log streams and SSE do not generate events |

Audit events are persisted after the request completes, along with the response payload; sensitive fields such as passwords, tokens and secrets are replaced with `<encrpyted>` before being recorded and are never stored in plaintext.

## Viewing the audit log

When the page opens, it queries audit events for **today** by default, sorted by request time in descending order; you can scroll through the pages directly.

<!-- screenshot-todo: Audit Log list page (same as ./audit-log.assets/ops-audit-log-1.png on the zh page, capture in English UI) -->

### Filtering and locating

Click the filter conditions above the table to expand the search bar:

| Filter | Description |
| --- | --- |
| Time Range | Required, defaults to today; a single query can only cover **the same month**; cross-month queries are rejected |
| User / Status Code | Select by user ID; the status code is a number from 100–599 |
| Client | Client kind (browser / mcp / helm / cli / internal) and name (e.g. opencode) |
| Session Context | Session ID, related Plan, Access Key ID (SK not included); the three can be combined freely for filtering |
| Operation Target | Scope Type (kuboard / cluster / namespace) → cluster → namespace → Api Group (`api` stands for the core group) → resource type → ID/Name; selecting a higher level constrains the lower levels |
| Action | verb (e.g. create / delete), multi-selectable; options depend on the selected Api Group and resource type |

**Typical steps to locate an operation**:

1. Set the time range (required; narrow it down to a minute-level window first);
2. Locate the operator by "User" or "Client IP";
3. Narrow down the operation target level by level with "Scope Type → Cluster → Namespace → Api Group → Resource Type", or type the object name directly in "ID/Name";
4. Pick a verb under "Action" (e.g. `delete`) and enter a failure code under "Status Code" (e.g. 500) to quickly find failing operations.

::: warning A single query can only cover one month
Audit data is stored in monthly sharded tables; a cross-month query will prompt "A single query can only obtain audit events in the same month." When investigating across months, query month by month, or increase the retention period on the Audit Policy page.
:::

### Event details

Click any row in the list to open the full details of that event:

| Section | Fields |
| --- | --- |
| Operator | User name, user ID, client IP, User Agent |
| Operation Target | Scope Type, cluster, namespace, Api Group, resource type, ID/Name, object UID |
| Execution Info | Request Id, action (verb), HTTP Method, status code, request time, duration |
| MCP Client (only when the client kind is mcp) | Client kind/name/version, Session ID, Access Key ID, related Plan, Plan Step ID |

The bottom of the details shows the **Request URL** (password-like parameters are hidden as `<encrpyted>`) and the **request payload / response payload**, which support switching between **Raw / YAML / JSON** formats.

<!-- screenshot-todo: audit event details dialog (same as ./audit-log.assets/ops-audit-log-2.png on the zh page, capture in English UI) -->

### Viewing MCP operations by session

The top-right corner of the page lets you switch the view from "By Event" to "By Session", aggregating MCP operations into one row per session, which is convenient for reviewing what an AI assistant did in a single conversation.

| Column | Description |
| --- | --- |
| Session Time | Start and end time of the first and last operations in the session |
| Client / Session ID | MCP client name/version; the session identifier is either reported by the agent (marked `agent`) or generated by the backend as a fallback (marked `fb`) |
| Access Key ID / User Name | The AK used by the session and the user it belongs to |
| Ops / Success / Failed | Total number of operations in the session plus success (2xx) and failure (non-2xx) counts |
| Plans / Clusters | Number of distinct Plan tasks and clusters involved in the session |

**Drilling down to session details**: click a session row and the page automatically fills that session's "Session ID" into the filter conditions and switches back to the "By Event" view, showing every operation in that session; to align with agent-side logs, copy the Session ID and search on the agent side.

<!-- screenshot-todo: By Session view (same as ./audit-log.assets/ops-audit-log-3.png on the zh page, capture in English UI) -->

## Data retention

::: tip
- Audit data is stored in monthly sharded tables, and request/response payloads are saved in compressed form; the retention period is 6 months by default and can be configured on the **Audit Policy** page; setting it to 0 disables automatic deletion;
- The "Record to Database" and "Record to File" switches can be enabled/disabled independently; when recording to file, the request/response body maximum length limits apply.
:::

## Related pages

- [Audit Policy](./audit-policy): configure the audit switches, recording rules (pass / block) and the retention period;
- "Revision History" on resource detail pages (e.g. Workloads): another way to view the same audit data from the object dimension, used to compare an object's content before and after each change.
