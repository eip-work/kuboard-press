---
description: "Node list and detail pages: cluster-wide usage summary and per-node capacity indicator bars, expandable System Info / Node Config, node status conditions and related events, resource usage curves, managing and evicting Pods on the node, Cordon / UnCordon, Drain, and the one-click entry to the Node Shell"
---

# Nodes (Node)

A Node is a **cluster-scoped** resource in a Kubernetes cluster — a physical machine or virtual machine that runs Pods. On the Nodes page in Kuboard, you can check each node's health and resource usage, manage the Pods scheduled onto it, and cordon or drain the node during maintenance or failures, or open a terminal directly on it for troubleshooting.

::: tip Typical scenarios
- Check the CPU / memory / Pod usage of every node in the cluster to decide whether to scale up or migrate workloads;
- Before maintaining / upgrading / decommissioning a node, **Cordon** it first, then **Drain Node**, to migrate workloads away smoothly;
- When a Pod keeps failing and the issue is confirmed to be at the host level, open a terminal directly on the node to troubleshoot.
:::

## Entry Point

1. Log in to Kuboard, click **Cluster Management** in the left navigation;
2. Expand **Nodes & Runtime**, click **Nodes** to enter the node list page (the same group also contains **Runtime Classes**, see [Scheduling and Stability](./scheduling)).

Nodes are cluster-scoped resources and do not belong to any namespace; the list page reuses Kuboard's generic resource list, and you can quickly locate a node using the search box at the top-right.

## Node List Page

The list page has the following main columns:

| Column | Description |
| --- | --- |
| (Row-leading expand) | Expand the row to view the "System Info" and "Node Config" cards, see below |
| Roles | Role read from the node's `node-role.kubernetes.io/*` labels (control-plane / worker, etc.) |
| Version | kubelet version |
| Internal IP | Node's internal network address |
| Capacity | Three usage indicator bars for the node's CPU / memory / Pods: percentage + used / total |

<!-- screenshot-todo: Node list page overview: cluster-wide CPU / Mem / Pods usage summary indicators at the top; table columns Roles (labels) / Version / Internal IP / Capacity (three usage bars); row-leading expand arrow -->

At the top of the list page there is also a cluster-wide **CPU / Mem / Pods** usage summary (used / total + percentage), so you can see the overall cluster load at a glance.

### Expanding to View System Info and Node Config

Click the expand arrow at the start of a row to view two kinds of information without entering the detail page:

| Card | Content |
| --- | --- |
| System Info | OS Image, Kernel Version, Container Runtime, Architecture |
| Node Config | Pod CIDR, Provider ID, KubeProxy version, list of Taints (`key=value:effect`) |

### When Usage Data Is Unavailable

Node usage comes from metrics-server (the metrics.k8s.io metrics API). When the cluster has **not installed metrics-server**, the CPU / memory indicator bars disappear and the page shows the message "Please check whether metrics-server is installed", keeping only the Pod count indicator.

## Viewing Node Details

Click a node name to open its detail page; from top to bottom it shows:

- **Events**: recent events of the node (startup, evictions, disk pressure, etc., reported by Kubelet), in reverse chronological order;
- **Node Status**: a table of the conditions reported by Kubernetes;
- **Basic Information**: allocatable / total memory and ephemeral storage, Pod CIDR, IPTunnelAddr, and various addresses (InternalIP / Hostname, etc.);
- **Resource Usage**: recent curves and computed metrics.

### Node Status

The Node Status card lists each condition in a table, and the **Indicator** column gives an at-a-glance "Normal / Warning" tag:

| Condition (Type) | Meaning |
| --- | --- |
| Ready | Whether the node is ready and can schedule Pods; shows a warning when False |
| MemoryPressure / DiskPressure / PIDPressure | Memory / disk / process-count pressure; True means resources are tight |
| NetworkUnavailable | Whether the network is available |

Each condition also shows its reason, message, last heartbeat time (lastHeartbeatTime) and last transition time (lastTransitionTime), making it easy to locate the cause of an unhealthy state.

### Resource Usage

The Resource Usage area consists of two parts:

1. **CPU / memory curves**: two cards that show the recent usage trend of the node's CPU and memory respectively;
2. **Computed metrics**: the current usage compared against the "Allocatable" total — CPU cores, the ratio of CPU requests / limits to allocatable, memory (GiB) and its requests / limits ratio, and the Pod count / limit.

::: tip Metric sources
The usage and curve data come from metrics-server. If the relevant area shows "Please check whether metrics-server is installed", the cluster has not deployed metrics-server, or the current account has no permission to read node metrics.
:::

<!-- screenshot-todo: Node detail page resource usage area: CPU and memory recent-curve cards on the left; CPU / memory usage, request, limit percentage metric cards and the Pod count metric on the right -->

## Viewing Pods on a Node

The **Pods** tab on the node detail page lists all Pods scheduled to the node, and provides per-column search / sorting:

| Column | Description |
| --- | --- |
| Namespace / Name | The name is clickable to open the Pod's detail page; Pods being deleted show their name struck through and highlighted in red (Deleting) |
| Status / Pod IP | Run phase (Running / Pending, etc.) and Pod IP |
| CPU / memory requests, limits | Aggregated requests / limits of all containers in the Pod (m / Mi) |
| Created time / Actions | Time since creation; the Actions column provides an **Evict** button |

### Evicting a Single Pod

Click **Evict** on a Pod; in the dialog that pops up you can set:

| Option | Description |
| --- | --- |
| Force | When checked, force-evicts without waiting for graceful termination |
| Grace period | Uses the Pod's own `terminationGracePeriodSeconds` by default; you can also switch to a custom number of seconds |

If the node has not been cordoned yet, clicking Evict first pops up the confirmation "This operation will pause scheduling on the current node. Continue?". After you confirm, Kuboard **cordons the node first**, then evicts the Pod — so the evicted Pod is not immediately rescheduled back onto the same node.

::: tip Eviction ≠ deletion
Eviction follows Kubernetes' graceful termination flow; Pods that belong to a controller (Deployment / StatefulSet, etc.) are rescheduled to other nodes and keep running. The Eviction API version used underneath (`policy/v1` or `policy/v1beta1`) is auto-detected by Kuboard according to the cluster version — you don't need to care about it.
:::

## Cordon / UnCordon

The toolbar at the top-right of the node detail page provides the scheduling switch (requires the **update** permission on the node; the buttons are hidden without it):

- **Cordon**: clicking it adds the `node.kubernetes.io/unschedulable:NoSchedule` taint to the node and marks it as unschedulable. **Running** Pods are not affected, but **new Pods** will no longer be scheduled onto the node; the button then changes to **UnCordon**;
- **UnCordon**: clicking it removes the taint, and the node resumes accepting new Pods.

::: tip When to use
Before maintaining, upgrading or decommissioning a node, cordon it first to avoid new Pods being scheduled onto it; when you also need to migrate the existing Pods away, follow up with **Drain Node** below.
:::

<!-- screenshot-todo: The Cordon button at the top of the node detail page and its confirmation / result messages -->

## Draining a Node (Drain)

Click **Drain Node** in the toolbar; the dialog that pops up offers the same options as evicting a single Pod:

| Option | Description |
| --- | --- |
| Force | Force-evicts without waiting for graceful termination |
| Grace period | Uses the Pod's own `terminationGracePeriodSeconds` by default, or a custom number of seconds |

After clicking OK, a confirmation pops up first: "This operation will drain all Pods on the node. Continue?". Once confirmed, Kuboard automatically performs two steps: **cordon the node first**, then **evict every Pod on the node one by one**, showing "Evicted the pod successfully, Namespace / Name" for each one. You can go back to the Pods tab to observe the results.

::: warning Draining is a high-risk operation
Draining evicts all Pods on the node to other nodes. Before running it, make sure the cluster has enough free capacity to take them, and that the data on the nodes hosting StatefulSets remains available; an already-cordoned node will not have new Pods scheduled onto it, and events and eviction results can be viewed at any time in the Pods tab.
:::

<!-- screenshot-todo: Drain Node dialog (Force switch + Grace period radio options with seconds input) and the drain confirmation popup -->

## Opening a Terminal on the Node

The **Shell** button in the toolbar of the node detail page starts the **Node Shell** in one click: Kuboard creates a temporary privileged debug container on the node, letting you enter the node's operating system directly in the browser to run commands, without SSH or `kubectl`.

- The **Shell** button is available when the node is in **Ready** state and the account has permission to update nodes and to create Pods in the debug namespace;
- After starting, a **Node Shell Sessions** banner appears at the top of the node detail page; once the status changes to Running, you can click **Open Terminal**, and you can also **View Pod / Stop** the session at any time.

For the full steps, session lifecycle and global configuration, see [Node Shell](../../ops/nodeshell).

::: tip Troubleshooting inside a container
If the problem is limited to a single Pod (network, processes, files), you can inject a [Debug Container](../../ops/debug-container) from that Pod's detail page, without entering the whole node.
:::

## Related Pages

- [Node Shell](../../ops/nodeshell): enter the node's operating system in one click from the node detail page to run commands;
- [Debug Container](../../ops/debug-container): inject a temporary container into a running Pod to troubleshoot issues;
- [Resource Quota](./quota-limitrange): set resource limits for namespaces, which indirectly affects node usage;
- [Scheduling](./scheduling): how node taints (Taints) and Pod tolerations affect scheduling results.