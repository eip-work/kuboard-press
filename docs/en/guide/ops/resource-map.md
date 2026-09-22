---
description: "The Resource Map visualizes the dependencies among cluster resources such as Workload / Service / Ingress / ConfigMap / Secret as a topology graph; filter by namespace, resource type and status, and click a node to drill down and view details, edit YAML, view logs and open a terminal"
---

# Resource Map

The Resource Map draws the scattered resources in a cluster into a single **dependency topology graph**: each resource is a node, and the dependencies between resources (who is referenced by whom, who mounts what, where traffic is forwarded) are labeled edges. When troubleshooting, you can tell at a glance "which Deployment does the Service behind this Ingress point to" and "which Pods reference this ConfigMap".

```text
Ingress (routing target) → Service (selector match) → Deployment (owner) → ReplicaSet (owner) → Pod
                                                          ↓ config reference / mount
                                                    ConfigMap / Secret / PVC
```

## Entry point

1. Log in to Kuboard and enter the target cluster (without entering a specific namespace);
2. In the left navigation, choose **Operations & Observability → Resource Map**, which opens the full-screen topology view at `/k8s/resource-map`.

Once the page opens, the clusters and namespaces that the current account can access are loaded automatically: with only one accessible cluster it is selected automatically; with multiple clusters you need to choose manually.

<!-- screenshot-todo: overall Resource Map interface (top toolbar + topology canvas + zoom controls at the bottom-right) -->

## Understanding the topology graph

The topology graph consists of three parts: **nodes** (resources), **group boxes** (organization), and **edges** (relationships).

### Nodes

Each node is a card: the small text at the top is "resource type / namespace", the large text below is the resource name, and the top-right corner shows a status badge:

| Status | Badge | Meaning / example |
| --- | --- | --- |
| Normal | No badge | Pod ready, all replicas available |
| Warning | Orange icon | Pod Pending / Terminating, replicas not ready, Ingress has no LoadBalancer address yet |
| Error | Red icon | Pod Failed, Deployment Available=False, a Job has failures |

Hovering over a node for about half a second expands an **info card** (Glance) showing the key fields of that type: Phase / IP / ready container count / host node for Pods, replica count (with a progress bar) for Deployments, type / ClusterIP / ports for Services, as well as the most recent Kubernetes events of the resource.

### Group boxes

The **Group By** option in the toolbar decides how nodes are packed into dashed boxes:

| Group By | Grouping basis | Use case |
| --- | --- | --- |
| Namespace (default) | The namespace the resource belongs to | Default view, observe isolated per namespace |
| Instance | `app.kubernetes.io/instance` / `app` / `k8s-app` labels | Group by application instance, view the full set of resources of one app across namespaces |
| Node | The node the Pod runs on | Observe how Pods are distributed across nodes |

The group box header shows the name and the resource count; clicking it collapses / expands the box. A **collapsed box** shows a summary line of "type ×count" labels (e.g. `Deployment ×2 · ConfigMap ×5`), so you can see its composition without expanding. Boxes with many nodes are auto-collapsed by default; the toolbar's **Expand All / Collapse All** switches them all in one click.

Within the same group box, mutually connected resources are further aggregated into **connected components** (icon: chain-like, no dashed box), representing a cluster of internally related resources; clicking their header collapses them too.

### Edges

Every edge carries a relationship label describing the dependency semantics between the two endpoints, for example:

| Label | Meaning | Relation category |
| --- | --- | --- |
| Selector match | Service → Pod (label selector hits) | Selector |
| Routing target / backend target | Ingress / HTTPRoute → Service | Reference / Gateway |
| Uses ConfigMap / Uses Secret | Pod / Job → ConfigMap / Secret | Config reference |
| Mounts PVC / binds PVC | Pod → PVC, PV → PVC | Storage |
| Scale target | HPA → Deployment / StatefulSet | Reference |
| Binds Role / binds SA / uses SA | RoleBinding → Role / ServiceAccount, workload → ServiceAccount | RBAC |
| Parent gateway / TLS certificate / authorization target | HTTPRoute → Gateway, Gateway → Secret, ReferenceGrant → Service | Gateway |
| Created Job / owner | CronJob → Job, ReplicaSet → Pod (ownerReferences parent-child) | Owner |
| Webhook target | ValidatingWebhookConfiguration / MutatingWebhookConfiguration → Service | Webhook |

Hovering over an edge highlights its two endpoint nodes and dims the rest; clicking locks the selection (click again to release), making it easy to trace a call chain.

## Choosing which resources to display

The **Data Sources** button on the left of the toolbar (with a badge showing the selected count) opens the resource-type selection panel, where resources are arranged in 8 groups:

| Group | Included resources | Default |
| --- | --- | --- |
| Workloads | Pod, Deployment, StatefulSet, DaemonSet, ReplicaSet, Job, CronJob, JobSet | Selected |
| Network | Service, Ingress, Endpoints, EndpointSlice, IngressClass, NetworkPolicy | Selected |
| Config | ConfigMap, Secret, HPA, VPA, PDB, ResourceQuota, LimitRange, PriorityClass, RuntimeClass, Lease | Selected |
| Storage | PVC, PV, StorageClass, CSIDriver, CSINode, VolumeAttachment | Selected |
| Security | ServiceAccount, Role, RoleBinding, ClusterRole, ClusterRoleBinding | Not selected |
| Cluster | Node, Namespace, Event | Not selected |
| Gateway (Beta) | GatewayClass, Gateway, HTTPRoute, GRPCRoute, TCPRoute, TLSRoute, UDPRoute, ReferenceGrant, BackendTLSPolicy, BackendTrafficPolicy | Not selected (shown only when the cluster has the Gateway API installed) |
| Custom resources | Dynamically discovered from CRDs in the cluster (e.g. Certificate, Issuer, etc.) | Not selected |

Each resource type in the panel shows its count within the current scope on the right, together with three quick buttons: **Select All Available / Select All / Deselect All**. Keep only the types you care about, and the graph gets fewer nodes with clearer edges.

::: tip What does "Not cached" mean
Resource data preferably comes from Kuboard's cluster cache (cluster-cache); resources without caching configured are queried directly from the API Server per namespace, the list is tagged with a "Not cached" label, and a toolbar banner hints at it too. There are usually only a few such types (e.g. ReplicaSet); when they are numerous, the first screen may be a bit slower.
:::

::: warning Resources without sufficient permission are not shown
When you lack list permission on a resource type, it is grayed out in the panel or shows "No permission", and its objects do not appear on the graph — this is permission filtering, not missing data.
:::

## Filtering and focusing

| Action | Location | Effect |
| --- | --- | --- |
| Filter by namespace | Namespace multi-select in the toolbar | Keep only the resources in the selected namespaces and the objects directly related to them |
| Filter by status | Status multi-select in the toolbar (Normal / Warning / Error) | Keep only the nodes matching the status and their related nodes; when nothing matches, a hint is given with a one-click clear of the filter |
| Filter by relation category | **Relation Categories** button in the toolbar (shows `n/8`) | Hide unwanted relationship edges, keeping only the selected categories (all selected by default, except Webhook) |
| Keyword search | Search box in the toolbar | Instant match by resource name / type: matched nodes are highlighted in blue and the rest grayed out; the **Center** button at the bottom-right brings the results to the middle of the view |
| Expand / collapse | **Expand All / Collapse All** in the toolbar | Toggle the collapsed state of all group boxes in one click (available when the graph has fewer than 50 nodes) |

All filter conditions are written to the address bar (see "Share the view" below), so sending the current view to a colleague reproduces the exact same graph.

## Viewing resource details

### Clicking a node

Click any node and a **detail drawer** slides out from the right, containing four tabs:

| Tab | Content |
| --- | --- |
| Metadata | Name, type, namespace, UID, cluster, creation time, Labels, Annotations |
| Status | The resource's recent event timeline + a status panel customized per type (Pod container states, workload replicas, Service endpoints, Ingress addresses, Gateway conditions, quota usage, etc.) |
| YAML | Read-only YAML, copyable in one click |
| Related | List of upstream / downstream resources connected to it, with direction (upstream / downstream / bidirectional) and relationship labels; click to jump straight to the corresponding node |

For resources that have a detail page, the drawer header offers a **View Details / Edit** button that opens the resource's regular detail page in a new tab (e.g. Deployment details, Service details).

<!-- screenshot-todo: detail drawer after clicking a node (the "Related" tab shows the upstream / downstream resource list) -->

### Right-clicking a node

Right-click on a node to pop up a quick-action menu:

| Action | Applies to |
| --- | --- |
| View Details / Edit YAML / Copy YAML | All nodes |
| View Logs / Open Terminal / Debug Container | Pod |
| Restart / Scale | Deployment, StatefulSet, DaemonSet |
| Node Shell | Node |

Restart and Scale pop up a confirmation dialog, and the topology refreshes automatically after execution. Copy YAML copies the complete object of the resource straight to the clipboard.

<!-- screenshot-todo: node right-click menu (a Pod node, including View Logs / Open Terminal and other actions) -->

### Breadcrumb navigation

When you select a deeply nested node (e.g. a Pod inside a connected component within a namespace box), a **breadcrumb** appears at the top-left of the canvas, showing its complete hierarchy path; clicking any level jumps back to that group, making it quick to locate items in multi-level structures.

## Sharing the view

The entire view state of the Resource Map is synchronized to the address bar, so you can share it simply by copying the URL:

```sh
# Example: namespaces default and ops, only workloads and network shown, grouped by instance, with one node selected
/k8s/resource-map?clusterId=xxx&namespaces=default,ops&sources=workloads,network&group=instance&node=<node-uid>&status=warning&relCats=owner,selector,reference
```

| Parameter | Description |
| --- | --- |
| `clusterId` | Cluster ID |
| `namespaces` | Namespaces, comma-separated |
| `sources` | Data source groups or resource types, comma-separated |
| `group` | Group By: `namespace` / `instance` / `node` |
| `status` | Status filter: `success` / `warning` / `error` |
| `relCats` | Relation category IDs, comma-separated (defaults to 7 categories when omitted) |
| `node` | UID of the selected node; its detail drawer pops open as soon as the page loads |

::: tip Troubleshooting suggestions
Look at the big picture first: which namespace box holds nodes with red / orange badges; right-click to open the resource's detail page and confirm the error message; then use the "Related" tab to trace along the edges both upstream and downstream — in the Ingress → Service → Deployment → Pod chain, the problem is usually at the broken segment (for example, a Service selector that matches no Pod at all).
:::
