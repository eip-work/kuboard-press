---
description: "Configure audit policies: decide, through three rule levels (Kuboard / Cluster / Namespace), which operations are recorded and which are discarded, and whether audit logs are written to the database or to a file."
---

# Audit Policy

The Audit Policy is configured by administrators and determines **which operations get recorded in audit logs and where** (database or file).

The policy **only takes effect inside Kuboard**: it constrains operations performed through the Kuboard UI or the Kuboard API, and has **no effect** on native Kubernetes management tools such as kubectl. To query and search recorded logs, see [Audit Log](./audit-log).

## Opening the Audit Policy page

After logging in, go to **Ops & Observability → Audit Policy**. From top to bottom, the page shows: the policy description, two recording switches (database / file), and three rule tabs (Kuboard / Cluster / Namespace). The same configuration can also be opened from the **System Administration → System Settings → Config Audit Policy** tab; the content is identical.

<!-- screenshot-todo: overview of the Audit Policy page (same as ./audit-policy.assets/ops-audit-policy-1.png on the zh page, capture in English UI) -->

## How rules take effect

An operation is first classified by scope into the corresponding rule list (Kuboard / Cluster / Namespace) and is matched only within that list:

1. Rules in the list are checked **from top to bottom**; the **first matched rule takes effect**, and all subsequent rules are ignored.
2. Once a rule matches, the action is executed: **Record (pass)** or **Discard (block)**; if no rule matches, the default is **Record (pass)**.

::: warning block means "discard the whole record"
When a block rule matches, the entire audit event (including user, client, and resource information) is discarded — it is **written neither to the database nor to a file**.
:::

## Where records go: switches and retention

| Configuration item | Type | Description |
|---|---|---|
| Append Audit Log to Database | Switch | Audit events are written to the database (partitioned by month); the "Months to reserve" field appears once enabled |
| Months to reserve | Number | Keep the most recent N months, default 6; set to 0 to disable automatic deletion |
| Append Audit Log to File | Switch | Written to the `/app/logs` directory in the container; the two length parameters below appear once enabled |
| Request Body Max Length | Number | Only applies to file-format logs; limits the request body size, range 0–65535, default 4096 |
| Response Body Max Length | Number | Only applies to file-format logs; limits the response body size, range 0–65535, default 4096 |

Audit logs are partitioned by month; a retention of N months means the most recent N months (including the current month) are kept, and the system automatically deletes older data; set to 0 to never delete automatically. Evaluate N against your disk space and compliance requirements. When **both switches are off**, no operation (including MCP tool calls) is recorded and the audit page shows no data — to keep compliance audit records, enable at least one of them. After modifying, click **Save** in the bottom-right corner; the change takes effect immediately.

## Audit rules: scope and configurable fields

The three rule types differ only in **scope**; the remaining fields are identical:

| Rule type | Scope | Typical use |
|---|---|---|
| Kuboard rule | The whole Kuboard, regardless of cluster / namespace | Global policy, e.g. "do not record read operations globally" |
| Cluster rule | One or more specified clusters | Differentiate by cluster, e.g. "only record write operations of the prod cluster" |
| Namespace rule | Specified namespaces under a specified cluster | Fine-grained down to the namespace, e.g. "do not record delete operations of a certain namespace" |

Configurable fields of each rule card (for a rule to match, all four levels — scope, apiGroup, resource and verbs — must match; if any of them does not match, the rule is skipped):

| Field | Description |
|---|---|
| action | **Record (pass)** / **Discard (block)**, one of the two |
| verbs | Multi-select get / list / create / update / delete, mapped to HTTP GET / POST / PUT / PATCH / DELETE |
| apiGroup | The API group of the rule; `*` matches all |
| resource | The resource type it applies to (e.g. deployment, pod); selectable only when apiGroup is a specific group; automatically matches all when apiGroup is `*` |
| clusters (Cluster rules only) | Multi-select the target cluster(s); supports `*` |
| cluster / namespaces (Namespace rules only) | Single-select cluster (supports `*`) + multi-select namespaces (supports `*`) |

<!-- screenshot-todo: an expanded audit rule card (same as ./audit-policy.assets/ops-audit-policy-2.png on the zh page, capture in English UI) -->

## Managing the rule list

- **Add**: in the corresponding tab, click **Add Kuboard/Cluster/Namespace Audit Rule** and fill in the fields of the new card. A new rule defaults to `apiGroup=*`, `verbs=[list, get]`, `action=block` (Cluster rules default to all clusters, Namespace rules default to all clusters), i.e. "discard all read operations".
- **Edit**: modify the fields in the card directly.
- **Delete**: click the delete button in the top-right corner of the card.
- **Reorder**: the list is matched **from top to bottom**; use the up/down arrows on the card or drag it directly to adjust the order — the order matters.

<!-- screenshot-todo: close-up of rule reordering (drag) or the up/down arrow buttons -->

## Importing and exporting rules

Rules can be imported and exported as a whole via a JSON file, which makes it easy to reuse across environments. **Export**: click **Export rules** to download `kuboard-audit-rules-*.json`; **Import**: click **Import rules** and select a file; if rules already exist, a confirmation dialog appears and then the three rule groups are **replaced entirely**.

```json
{
  "kuboardRules": [
    { "action": "pass", "verbs": ["get", "list", "create", "update", "delete"], "apiGroup": "mcp.kuboard.cn", "resources": ["*"] },
    { "action": "block", "verbs": ["list", "get"], "apiGroup": "*", "resources": [] }
  ],
  "clusterRules": [
    { "action": "pass", "verbs": ["create", "update", "delete"], "apiGroup": "*", "resources": [], "clusters": ["prod"] }
  ],
  "namespaceRules": [
    { "action": "block", "verbs": ["delete"], "apiGroup": "*", "resources": [], "cluster": "prod", "namespaces": ["default"] }
  ]
}
```

::: warning Import is an entire-group replacement
Import is **not a merge** — it replaces the three existing rule groups entirely. Export a backup before importing.
:::

## MCP tool calls

The audit policy also applies to **MCP tool calls** (API group `mcp.kuboard.cn`): when a block rule matches, the entire audit event is discarded; the two database/file switches above also apply, and when both are off, MCP events are not recorded anywhere. If the Kuboard rules list contains no rule with `apiGroup=mcp.kuboard.cn`, a warning appears, indicating that the default "discard */[get,list]" rule would drop MCP read-only events — click **Add MCP protection rule** to insert one at the **very top** of the list (see below); this rule is matched before other rules, ensuring that read-only events of `mcp.kuboard.cn` are always recorded; if you delete it manually afterwards, the warning appears again.

```json
{ "action": "pass", "verbs": ["get", "list", "create", "update", "delete"], "apiGroup": "mcp.kuboard.cn", "resources": ["*"] }
```

<!-- screenshot-todo: warning bar shown when no MCP protection rule exists + the "Add MCP protection rule" button -->
