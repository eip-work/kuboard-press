---
description: "Commonalities of every Kubernetes resource detail page in Kuboard: top action bar, metadata card, detail/YAML/relations tabs, events and revision history"
---

# Resource Detail Pages

Every Kubernetes resource detail page in Kuboard follows the same page structure, so the layout, tabs and operations are identical everywhere. This page summarizes those commonalities; the per-resource summary content is covered in the relevant sections of this guide.

## How to Open

Click a resource's **name** on its list page to open the detail page; the URL starts with `/k8s/` and contains the cluster, API group, version and resource name.

## Top Action Bar

| Button | Description |
| --- | --- |
| **Edit** | Opens the edit page (shown when the resource has an edit page) |
| **YAML** | Views the full YAML of the resource (read-only) |
| **Delete** | Deletes the current resource |
| **Resource-specific actions** | e.g. **Restart / Scale** for Deployments, **Terminal / Logs / File browser** for Pods — they appear right next to the generic buttons |

The title bar also links to the [Kubernetes official documentation](https://kubernetes.io/docs) (concepts + API reference).

## Metadata Card

The top of the detail page shows a **metadata card** (collapsible/expandable via the arrow at the top-right), which contains:

- Basic info: name, cluster, namespace, creation time, UID, Resource Version, etc.;
- **Labels** and **Annotations** — expandable to see the full key/value pairs.

## Tabs

The main body of the detail page is tabbed:

| Tab | Contents |
| --- | --- |
| **Detail** | A summary rendered by the resource's own components: e.g. replica readiness for a Deployment, ports and endpoints for a Service, target/current metrics for an HPA |
| **YAML** | The complete YAML of the resource (read-only) |
| **Relations** | A graph showing how the resource relates to other resources (owner, references, selectors, etc.) |

Some resources (e.g. Pods) embed an **event timeline** right beside the metadata card, so you can see recent events without leaving the page.

## Events and Revision History

- **Events**: the detail page can show Kubernetes events related to this resource (filtered by the involved object), handy for troubleshooting;
- **Revision history**: shows the revision history of the resource with diffs between changes; workloads (Deployments etc.) also support **rolling back** to a previous revision.

## Auto Refresh

Detail pages support live updates and auto refresh; append `?autoRefresh=true` to the URL to refresh the page automatically.