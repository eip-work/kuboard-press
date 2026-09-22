---
description: "Kuboard workload - DaemonSet: use cases, entry point, list page (Ready/Current/Updated/Available/NodeSelector columns), create form (basic info/DaemonSet/Pod template), edit (label selector, RollingUpdate maxUnavailable adjusted via YAML), detail page (Pods and events), deletion and common operations (update image tag, restart, logs/terminal, CI/CD integration)"
---

# DaemonSet

This page explains how to manage DaemonSets (`apps/v1`) in Kuboard. A DaemonSet is a Kubernetes built-in **node-level** workload controller: it runs **one Pod replica on every eligible node** of the cluster, which makes it ideal for infrastructure components that need one instance per machine, such as log collection and monitoring agents.

::: tip Typical use cases for DaemonSets
A DaemonSet ensures that one Pod replica is scheduled and running on every (or on a conditionally selected subset of) node in the cluster. Typical use cases are:

- **Log collection agents**: run Filebeat, Fluentd, etc. on every node to collect node and container logs;
- **Monitoring agents**: run node-exporter, Prometheus agents, etc. on every node to collect node metrics;
- **Node-level infrastructure**: network proxies (e.g. kube-proxy), storage drivers, security agents, and other components that must be deployed one-to-one with each node.

If a component **needs exactly one instance per node**, prefer a DaemonSet; if the application is **stateless and its replicas can replace each other**, use a [Deployment](./deployments); if the replicas need **stable identities and persistent data**, use a [StatefulSet](./statefulsets).
:::

Unlike a Deployment / StatefulSet, which requires an explicit replica count (`spec.replicas`), a DaemonSet has **no replica count** — its "desired number of replicas" is determined by **the number of nodes that match the scheduling conditions**, and is reflected in the cluster status as `status.desiredNumberScheduled`.

## Where to Start

The DaemonSet list page is at **left navigation → Workloads → DaemonSets**:

1. After logging into Kuboard, click **Workloads** in the left navigation;
2. Click **DaemonSets** (menu configuration `apps/daemonsets`, `namespaced: true`) to enter the list page;
3. The list page shows all DaemonSets in the cluster, grouped by Namespace, and supports filtering by cluster / Namespace.

::: tip Other workloads in the navigation
The Workloads navigation also contains entries for [Deployments](./deployments), [StatefulSets](./statefulsets), [Autoscaling](./hpa), [Jobs / CronJobs](./jobs-cronjobs), [Pods](./pods), etc., which work in a similar way to this page.
:::

## List Page

The DaemonSet list page reuses Kuboard's generic resource list component (`K8sObjectList`, `api-group="apps"`, `resource="daemonsets"`, `namespaced`) and displays unhealthy workloads first, with an action column width of 320.

Besides the generic columns (cluster / Namespace / name / creation time), the list page defines the following status columns:

| Column | Read from | Description |
| --- | --- | --- |
| Ready | `status.numberReady` / `status.desiredNumberScheduled` | Displayed as `ready replicas / desired replicas` (e.g. `2/2`); the color changes with the health status, see the table below |
| Current | `status.currentNumberScheduled` | Number of replicas currently scheduled to nodes |
| Updated | `status.updatedNumberScheduled` | Number of replicas already updated to the latest template version |
| Available | `status.numberAvailable` | Number of replicas that are Available (Ready and still healthy after `minReadySeconds`) |
| NodeSelector | `spec.template.spec.nodeSelector` | The scheduling conditions for this DaemonSet's Pods on each node, displayed as comma-separated `key=value` pairs |

**Ready column** color rules (compare `status.numberReady` with `status.desiredNumberScheduled`):

| Condition | Color | Meaning |
| --- | --- | --- |
| `numberReady == desiredNumberScheduled` | Green | Replicas on all nodes are ready |
| `numberReady == 0` | Red | Not a single replica is ready |
| `desiredNumberScheduled == 0` | Yellow | No eligible node (desired replicas is 0, e.g. the selector matches no node) |
| Other cases | Default color | Partially ready, converging |

### Table Header Actions

| Button | Description |
| --- | --- |
| Create (+) | Opens the "creation method" dialog: **from form** / **from YAML**, see "Creating a DaemonSet" below |
| Batch Delete | Deletes the checked items; counts "items in the Kubernetes cluster" and "items in the cache" separately, which can be handled independently |
| Batch Restart | Restarts the checked DaemonSets in batch (see "Common Operations - Restart"); disabled when no item is checked |

::: tip Creation methods
After clicking Create, Kuboard first asks you to pick a cluster and Namespace, then choose **from form** or **from YAML**. DaemonSets support both form creation and YAML creation (menu configuration `hasCreatePage: true`); form creation is selected by default.
:::

### Row Actions

| Button | Description |
| --- | --- |
| Logs/Terminal | Opens a container picker; you can **tail logs**, **download logs**, open a **bash / sh / cmd / powershell** terminal, or open a **file browser** (requires `pods/exec` and `pods/log` permissions) |
| Edit | Goes to the edit page (requires `update` permission on `apps/daemonsets`) |
| YAML | Views the object's YAML in a dialog (requires `get` permission) |
| Delete | Deletes this DaemonSet (requires `delete` permission); the object name must be typed in the confirmation dialog |

## Creating a DaemonSet

### Entry Point and Save Flow

Click the **Create** button in the top-right corner of the list page, pick a cluster / Namespace, then choose **from form** to enter the create page. The create page assembles an `apps/v1` DaemonSet object through a form, split into three tabs:

1. **Basic info**: name, labels, annotations;
2. **DaemonSet**: label selector;
3. **Pod template**: Pod basic info, containers, volumes, Pod settings.

After clicking **Save**, Kuboard first validates every tab of the form in order (on failure it shows "Please check that all forms on all tabs are correct" and automatically switches to the offending tab). Once validation passes, a **Preview YAML** dialog shows the complete object to be submitted; confirm to submit it to the apiServer.

::: tip Default "empty form" structure for DaemonSets
On creation, Kuboard pre-fills `apiVersion: apps/v1`, `kind: DaemonSet`, plus an empty `spec.selector.matchLabels` and an empty `spec.template.spec.containers`. Unlike a Deployment / StatefulSet, the create page has **no `spec.replicas` field** — the number of DaemonSet replicas is determined by the number of nodes that match the scheduling conditions.
:::

### Basic Info

| Field | Corresponding field | Description |
| --- | --- | --- |
| Name | `metadata.name` | Required, must not duplicate within the Namespace; validated in real time against the RFC naming rules (`EditName`); typing a name automatically writes the `app=<name>` label |
| Namespace | `metadata.namespace` | The Namespace in which the DaemonSet is created; shown as read-only |
| Labels | `metadata.labels` | Key-value pairs; can be synced to the selector and the Pod template via the "label sync" options |
| Annotations | `metadata.annotations` | Key-value pairs, optional |

### DaemonSet

This tab (labeled "DaemonSet") actually contains only one section, the **label selector**. It maps to `spec.selector.matchLabels` — Pods that match this label selector are considered to be managed by this DaemonSet — and provides two sync toggles:

- **Always keep in sync with `.metadata.labels`**: updates `metadata.labels` when the label selector changes (`keepSelectorLabelSyncWithMetadata`);
- **Sync changes to `.spec.template.metadata.labels`**: updates the Pod template labels when the selector changes (`keepSelectorLabelSyncWithTemplateMetadata`).

::: warning DaemonSet-specific fields are not in the visual form
Kuboard's visual DaemonSet form only covers the **label selector** and the **Pod template**. The DaemonSet-specific fields below are **not in the visual form**; add or adjust them in the **Preview YAML / Diff YAML** dialog before saving when creating or editing:

- `minReadySeconds`: the number of seconds a newly created Pod must stay healthy before it is considered Available (to avoid treating a just-started, unstable Pod as available);
- `revisionHistoryLimit`: how many old controller revisions to keep; defaults to 10;
- `updateStrategy`: `RollingUpdate` (the default; rolling update, `rollingUpdate.maxUnavailable` is configurable) or `OnDelete` (Pods are rebuilt only after they are deleted manually; used for canary releases).

See "Complete Manifest Example" below for a full example.
:::

### Pod Template

The Pod template (`spec.template`) is exactly the same as for a Deployment / StatefulSet and is configured in the **Pod template** tab, whose left-hand sub-tabs are:

| Sub-tab | Description |
| --- | --- |
| Basic info | Pod annotations, labels (keep them consistent with `.spec.selector.matchLabels`) |
| Containers | Images, ports, environment variables, probes, resource limits of the workload and init containers |
| Volumes | Volumes mounted by the Pod (including PVC, ConfigMap, Secret and other types) |
| Pod settings | Scheduling policy (including **nodeSelector** / node affinity), DNS policy, hostNetwork and other advanced settings |

::: tip nodeSelector / tolerations decide which nodes a DaemonSet runs on
Without a `nodeSelector`, a DaemonSet runs on **every schedulable node**; use `nodeSelector` (or node affinity) to restrict the replicas to **nodes carrying specific labels**. The **NodeSelector** column on the list page reads `spec.template.spec.nodeSelector`. To run on tainted nodes, you also need to configure the corresponding **Tolerations** in the Pod settings.
:::

Pre-save validation: if the form in the Containers or Volumes tab fails validation, Kuboard automatically switches to the offending tab and shows the error.

### Complete Manifest Example

Starting from the object generated by the visual form and adding the DaemonSet-specific fields (update strategy, `minReadySeconds` / `revisionHistoryLimit`, and `nodeSelector`), the complete object is as follows (for reference in the YAML dialog):

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: default
  labels:
    app: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  # Runs only on nodes carrying the three specific labels (otherwise it runs on every schedulable node)
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      # nodeSelector: schedule only to nodes labeled job=monitor
      nodeSelector:
        job: monitor
      containers:
        - name: exporter
          image: prom/node-exporter:latest
      tolerations:
        # Taint toleration: allows scheduling to nodes with a taint such as the control plane
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
  # DaemonSet-specific fields (add them in the YAML dialog)
  minReadySeconds: 10
  revisionHistoryLimit: 10
  updateStrategy:
    # RollingUpdate: rolling update, replacing nodes one by one; OnDelete: rebuilds Pods only after they are deleted (for canary releases)
    type: RollingUpdate
    rollingUpdate:
      # Maximum number of nodes whose Pods may be unavailable at any given time (integer or percentage)
      maxUnavailable: 1
```

## Editing

Click the **Edit** button of a DaemonSet row on the list page, or click **Edit** on the detail page, to enter the edit page. The edit page form has the same structure as the create page (Basic info / DaemonSet / Pod template), with the following differences:

- **Name** is shown as read-only and cannot be changed;
- The page top shows the current object's **ResourceVersion** (for comparison against the latest version in the cluster);
- On save, a **Diff YAML** dialog is shown: the left side is the original object in the cluster, the right side is the modified object; confirm to submit.

Editable content: labels, annotations, label selector, and the Pod template (container images, environment variables, volumes, etc.). Adjust the DaemonSet-specific fields (`updateStrategy`, `maxUnavailable`, `minReadySeconds`, `revisionHistoryLimit`, etc.) in the Diff YAML dialog before saving.

::: warning Modifying the Pod template triggers a rolling update
When the DaemonSet uses the `RollingUpdate` strategy, modifying `spec.template` (e.g. image tag, environment variables) makes the controller roll out the Pods node by node according to `updateStrategy`; `maxUnavailable` limits the number of nodes that may be unavailable at any time during the update. If set to `OnDelete`, Pods are created/removed only on new nodes, while undeleted Pods keep the old version — this enables **node-by-node canary upgrades**: after validating a batch, delete the next batch of Pods.

Kuboard's visual form does not expose `updateStrategy`; adjust it through the YAML dialog on the edit page.
:::

## Detail Page

Click a DaemonSet's name on the list page to enter its detail page, structured as follows:

1. **Header metadata**: basic object info (name, Namespace, cluster, labels, annotations, etc.) plus an **Events** card (recent events related to this DaemonSet, refreshed in real time);
2. **Action buttons**: see below;
3. **Pods area**: the list of Pods managed by this DaemonSet on the left, and the details of the selected Pod on the right.

The detail page listens in real time via SSE (Server-Sent Events) to the **DaemonSet / Event / Pod** topics; any change refreshes the page automatically.

### Detail Page Action Buttons

| Button | Description |
| --- | --- |
| Update Image Tag | Updates the image tag of the workload / init containers in batch, see "Common Operations" below |
| Restart | Restarts using the update strategy defined on the DaemonSet |
| Edit | Goes to the edit page (requires `update` permission) |
| YAML | Views / edits the object's YAML in a dialog (requires `get` permission) |
| Delete | Deletes this DaemonSet (requires `update` permission) |
| More (dropdown) | **CI/CD integration** and menu items registered by extensions |

### Pods Area

The Pods area lists all Pods whose owner is this DaemonSet (matched by the uid in `metadata.ownerReferences`); the list refreshes in real time with cluster events (SSE, `Pod`):

- Each Pod card shows the **Ready / Not Ready** status, name, creation time, Pod IP and node IP;
- Hover over a Pod to **delete** it, **view its YAML**, etc.;
- Click to select a Pod, and its details are shown on the right.

Because the DaemonSet's replicas are distributed across all nodes that match the scheduling conditions, the Pods list usually shows **Pods from multiple nodes** at once, making it easy to inspect them one by one.

## Deleting

There are two entry points for deleting a DaemonSet:

- **List page**: check the item and click **Batch Delete**, or click the row-level **Delete** button;
- **Detail page**: click the **Delete** button.

Deletion follows Kuboard's global delete confirmation flow (the object name must be typed in the confirmation dialog). For batch deletion, Kuboard distinguishes "items in the Kubernetes cluster" from "items in the cache" (items already removed from the cluster, of which only cached records remain) and lets you delete them separately.

::: warning Be careful when deleting DaemonSets that manage node components
DaemonSets usually manage agent-style components on nodes. Before deleting a DaemonSet, confirm whether the corresponding components on each node and (if any) their persistent data must be removed at the same time. After deletion, the Pods managed by this DaemonSet will not be recreated, and the corresponding capability on the affected nodes disappears — make sure you understand the deletion scope.
:::

## Common Operations

### Updating the Image Tag

Click **Update Image Tag** on the detail page; a dialog lists all the **workload containers** and **init containers** of this DaemonSet, with columns for container type, name, image, current version and new version.

After changing the version tag of one or more containers and clicking OK, Kuboard replaces `/spec/template/spec/{containers|initContainers}/{index}/image` with a **JSON Patch** (`application/json-patch+json`), triggering a rolling update according to `updateStrategy`. This requires `update` permission on `apps/daemonsets` and the kuboard-level `cd.kuboard.cn/update-image-tag` permission.

```json
// JSON Patch submitted when updating the image tag (illustrative)
[
  { "op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "node-exporter:1.6.0" }
]
```

### Restarting

Restarting does not recreate the DaemonSet object; instead it writes the current timestamp into `spec.template.metadata.annotations` (`kubectl.kubernetes.io/restartedAt`), making the controller replace the Pods one by one according to the update strategy. **Batch Restart** on the list page and **Restart** on the detail page share the same implementation (`RestartWorkload`) and both support "don't show this tip again".

```json
// strategic-merge patch submitted when restarting (illustrative)
{
  "spec": {
    "template": { "metadata": { "annotations": { "kubectl.kubernetes.io/restartedAt": "2026-09-19T10:00:00Z" } } }
  }
}
```

### Logs and Terminal

Click the row-level **Logs/Terminal** on the list page; after selecting a Pod and container you can:

- **Tail logs** (opens the log page in a new window);
- **Download logs**;
- Open a **bash / sh / cmd / powershell** terminal;
- Open a **file browser** to explore the container's file system.

Requires `pods/log` (logs) and `pods/exec` (terminal / file browser) permissions.

### CI/CD Integration

::: warning Not available in the current version
The **More → CI/CD integration** menu item on the detail page is greyed out (`disabled`) in the current version and cannot be used. If you need to update the image tag or restart a DaemonSet from a CI/CD pipeline, construct the request manually — refer to the results of the "Update Image Tag" and "Restart" operations above, or reuse the CI/CD integration scripts of other workloads (Deployment / StatefulSet).

The backend endpoints are `/api/cd.kuboard.cn/v4/update-image-tag` and `/api/cd.kuboard.cn/v4/restart-workload`; the request header must carry `Kb-Access-Key: <key>.<secret>`.
:::

## Related Pages

- [Deployment](./deployments): stateless controller with an explicit replica count
- [StatefulSet](./statefulsets): stateful controller with stable Pod network identities and storage
- [Pod](./pods): the smallest scheduling unit managed by a DaemonSet
- [Importing a Kubernetes Cluster](../cluster/import): manage workloads after connecting a cluster to Kuboard
