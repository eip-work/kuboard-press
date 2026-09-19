---
description: Connect AI agents to your Kubernetes clusters through the Kuboard MCP Server
---

# Connect AI Agents via Kuboard MCP

Kuboard V4 provides an MCP (Model Context Protocol) Server that lets AI agents interact directly with your Kubernetes clusters.

Supported agent clients: Claude Desktop, Cursor, Windsurf, Zed, VS Code, Trae, Cline, Continue, **opencode**, Claude Code, Goose, OpenClaw, Hermes Agent and more.

**What MCP provides:**

| Category | Capabilities |
|---|---|
| Cluster management | List clusters, cluster details, versions, node status |
| Workloads | Query Deployments, StatefulSets, DaemonSets, Pods; restart, update images, scale, rollback |
| Resource management | Query ConfigMaps, Secrets, Services, Ingresses, PVCs, ServiceAccounts, NetworkPolicies and more |
| Node operations | Pod eviction, node drain |
| Custom resources | Query CRDs and custom resource instances |
| Event monitoring | Query cluster/namespace events |
| Metrics | Query CPU, memory, network metrics via Prometheus |
| **Agent change approval** | **Every write operation (modify, delete, restart, etc.) is executed only after you approve it in the Kuboard UI** |

---

## Prerequisites

- An MCP-capable agent client (e.g. [opencode](https://opencode.ai))
- A running Kuboard V4 (v4.1.0+)

---

## Configuration Steps (using opencode)

### 1. Enable the MCP Server

In Kuboard, go to **System Settings → MCP Server**, enable the **MCP Server master switch** and save.

![MCP Server settings](./step1-mcp-settings.png)

> On the settings page you can also:
> - Adjust the per-user rate limit (default 50 requests/minute)
> - Configure allowed cross-origin sources (CORS)
> - Configure the Prometheus data source (for metrics tools)

### 2. Get the MCP Configuration

Click **Access Keys** in the top-right user menu. Create a key with **New Access Key**, then click **Copy MCP Configuration**.

![Access keys list](./step2-access-keys.png)

In the dialog, pick **opencode** as the agent and click **Copy**.

![MCP configuration dialog](./step2-mcp-config-dialog.png)

### 3. Configure opencode

Type the following prompt into opencode:

```
Please set up this MCP server configuration for me
<paste the copied configuration here>
```

opencode will write the configuration into the `mcp` field of `opencode.json` automatically.

### 4. Verify the Connection

Restart opencode and ask:

```
Use the kuboard mcp to list the current clusters and workloads
```

opencode will call the Kuboard MCP tools and return the results.

---

## Agent Change Approval

To keep AI agents from misoperating or overstepping on your clusters, Kuboard MCP enforces **mandatory change approval for all write operations** — an agent can never modify a cluster without your confirmation.

### How it works

When you ask an agent to perform a mutating operation (e.g. "scale this Deployment to 5 replicas", "bump the image to v2", "delete this ConfigMap"):

1. **The agent first submits a change plan** (Plan) listing every operation it intends to perform.
2. **The plan appears on the "Agent Change Approval" page in the Kuboard Web UI** (left-side menu entry).
3. **You review each operation's details in the UI** and choose:
   - **Approve all** — execute every operation
   - **Approve some** — check only part of the operations; the rest are skipped
   - **Reject** — cancel the whole plan; the cluster is not modified
4. **After approval**, the agent receives a one-time token and the cluster is actually modified.
5. **Progress is streamed live**, so you can watch each step succeed or fail.

### Why do it this way

- **Controllable**: every change happens under your eyes; no agent can "quietly" change anything.
- **Auditable**: every change has a full record (which agent, when, what changed, who approved).
- **Reversible**: you can inspect a dry-run preview of every operation before approving.
- **Partial approval**: the agent proposes 10 operations; you can approve 8 and skip 2.

### Scope

| Operation | Approval required |
|---|---|
| Read cluster info, query resources, view logs | No |
| Query metrics (Prometheus / metrics-server) | No |
| Create / modify / delete K8s resources | **Yes** |
| Restart / scale / rollback workloads | **Yes** |
| Pod eviction, node drain | **Yes** |

### Approval page entry

After logging into Kuboard, you'll find the **"Agent Change Approval"** entry at the top of the left menu (path `/agent-change-plans`). All pending, approved, rejected, and executed plans are listed here.

> To disable mandatory approval (not recommended for production), turn off the "Force agent change approval" switch in the MCP Server settings.

---

## Configuration Reference

After configuration, the `mcp` field in `opencode.json` looks like:

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

- Replace the host in `url` with an address reachable from Kuboard.
- The `Authorization` value is generated automatically when you copy the MCP configuration in Kuboard.