---
description: "Commonalities of every Kubernetes resource list page in Kuboard: search/tree modes, cached vs direct data, common columns and actions, batch operations and permissions"
---

# Resource List Pages

Every Kubernetes resource list page in Kuboard — Deployments, Pods, ConfigMaps, CRDs and so on — follows the same page structure, so the interactions and operations are identical everywhere. This page summarizes those commonalities; resource-specific fields and actions are covered in the relevant sections of this guide (e.g. [Deployments](./../workload/deployments)).

## How to Open

Open the list page of any resource from the left menu (for example **Workloads → Deployment**). The page is laid out as follows, from top to bottom:

| Area | Contents |
| --- | --- |
| Title bar | Resource name + links to the [Kubernetes official documentation](https://kubernetes.io/docs) (concepts + API reference) |
| Toolbar | List-mode switch, cache status, auto-refresh, create and batch-action buttons |
| Data area | Cluster / namespace selectors (search mode) or the resource tree on the left (tree mode) + the resource table |

## Two List Modes

A switch at the top right toggles between **search mode** and **tree mode** (your choice is remembered for next time):

- **Search mode**: two selectors, **Cluster** and **Namespace**, appear at the top. After picking a cluster, the namespace can be a specific one or `all`, and the table below shows paginated results;
- **Tree mode**: the left side shows a cluster → namespace tree (for namespaced resources) or a cluster tree (for cluster-scoped resources). Clicking a node filters the list.

::: tip Resource availability
In tree mode, if the current resource is not installed on a cluster (e.g. the cluster has no Gateway API), the corresponding node shows a ⚠ icon; hovering it reveals an installation guide.
:::

## Cached vs Direct Data

List data comes from one of two channels, shown by a "use cache / no cache" label at the top of the page:

| Channel | Description | Pagination |
| --- | --- | --- |
| **Cached list** | Resources configured for automatic sync (e.g. Pods, Deployments, Namespaces); the list is read from the Kuboard cache for fast access | Full-cluster search and pagination supported |
| **Direct list** | Resources without caching (mostly low-frequency and custom resources) are read directly from the cluster API; data is real-time | No pagination (the list footer shows "items that are not in the cache cannot be paginated") |

## Common Columns

Every list page has the following common columns:

| Column | Description |
| --- | --- |
| **Name** | Click to open the detail page (when you have get permission); resources being deleted are shown with a strikethrough |
| **Namespace** | The namespace the resource belongs to (namespaced resources) |
| **Creation time** | Displayed in the selected cluster's time zone |
| **Alive status** | Alive / dead marker (some resources) |
| **Operations** | Edit (when the resource has an edit page), View YAML, Delete; resource-specific actions (e.g. restart, scale) appear as extra buttons next to them |

## Common Operations

- **Create**: the **Add** button in the toolbar, via a form or a YAML wizard depending on the resource type;
- **Edit / View YAML / Delete**: in the row's operations column;
- **Batch operations**: select rows and act on all of them, e.g. batch delete — the confirmation dialog distinguishes "items in the cluster" from "items in the cache" and handles them separately; workloads also support batch restart, etc.;
- **Auto refresh**: the auto-refresh button in the toolbar; append `?autoRefresh=true` to the URL to enable it as soon as the page opens.

## Permissions

- Every button on the list page is shown / hidden automatically according to the current user's RBAC permissions; unauthorized actions simply do not appear;
- If the current user has no `list` permission on the whole cluster, the page shows "Limited authorities" at the top — pick a namespace you have access to in the namespace selector.