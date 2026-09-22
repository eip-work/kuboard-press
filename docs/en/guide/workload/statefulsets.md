---
description: "Kuboard Workload - StatefulSet: where to find it, the list page, creating (including StatefulSet-specific fields supplemented in YAML), editing, the detail page, scaling, deletion, and common operations (Update Image Tag, Restart, Logs/Terminal, CI/CD integration)"
---

# StatefulSet

This page explains how to create, view, scale, and delete a StatefulSet in Kuboard, and how to complete common operations such as updating image tags, restarting, and viewing logs. A StatefulSet (`apps/v1`) is Kubernetes' controller for **stateful applications**; it gives every replica a stable network identity and stable storage, and is suited to applications that need an "identity" — such as databases, message queues, and distributed caches.

::: tip Typical StatefulSet scenarios
- **Stable network identity**: each Pod gets a stable ordinal number and hostname (e.g. `web-0`, `web-1`); the ordinal number does not change after the Pod is recreated;
- **Stable storage**: each replica is bound one-to-one to its own persistent volume, and the same data is still mounted after the Pod is scheduled to another node;
- **Ordered deployment and scaling**: by default, replicas are created / deleted one by one starting from ordinal `0`.

For **stateless** applications (any replica can replace another), prefer a [Deployment](./deployments); use a StatefulSet only when you need persistent data or a fixed identity.
:::

## Where to Find the Entry

1. In the left navigation, click **Workloads**;
2. Click **StatefulSets** to enter the list page; the list page shows all StatefulSets in the cluster by Namespace and can be filtered by cluster / Namespace.

The Workloads navigation also contains [Deployments](./deployments), DaemonSets, [Jobs / CronJobs](./jobs-cronjobs), [Pods](./pods) and other entries; they are operated in the same way as described on this page.

## List Page

The list page displays entries with "abnormal workloads first" ordering and additionally provides a **Ready replicas** column:

| Column | Description |
| --- | --- |
| Checkbox | Checked entries can be used for **batch restart** and **batch delete** |
| Cluster / Namespace | Where the StatefulSet is located |
| Name | Click to enter the detail page |
| Ready replicas | Displayed as `ready replicas / desired replicas` (e.g. `3/3`), color changes with health status |
| Creation Time | Shown as relative time, sortable |
| Actions | Per-row action buttons (Logs/Terminal, Edit, YAML, Delete) |

Ready replicas color rules: green when ready count equals the desired count (all ready); red when ready count is 0 (none ready); yellow when the desired count is 0 (paused state); default color otherwise (partially ready, converging).

### Header and Inline Actions

| Button | Position | Description |
| --- | --- | --- |
| Create (+) | Header | Create a StatefulSet in the current cluster / Namespace |
| Batch Delete | Header | Delete the checked entries; "entries in the Kubernetes cluster" and "entries in the cache" are counted separately and can be handled independently |
| Batch Restart | Header | Restart the checked StatefulSets in batch |
| Logs/Terminal | Inline | Opens a Pod / container picker dialog; you can **follow logs**, **download logs**, open a **bash / sh / cmd / powershell** terminal, or open the **file browser** (requires `pods/exec` and `pods/log` permissions) |
| Edit | Inline | Enter the edit page (requires `update` permission on `apps/statefulsets`) |
| YAML | Inline | View / edit the object's YAML in a dialog (requires `get` permission) |
| Delete | Inline | Delete the StatefulSet (requires `delete` permission); the confirmation dialog requires typing the object name |

## Creating a StatefulSet

Click the **Create** button in the top-right corner of the list page to enter the create page. The form is organized into three tabs:

1. **Basic Info**: name, labels, annotations;
2. **Stateful Replicas**: label selector, replica count;
3. **Pod Template**: Pod basic information, containers, volumes, Pod settings.

After clicking **Save**, a **Preview YAML** dialog shows the complete object; after confirmation it is submitted to the cluster.

### Basic Info

| Field | Description |
| --- | --- |
| Name | Required, must not be duplicated within the Namespace |
| Namespace | The Namespace in which the StatefulSet is created, read-only |
| Labels | Key-value pairs; entering a name automatically writes the `app=<name>` label |
| Annotations | Key-value pairs, optional |

The labels area provides two sync options: **Synchronize label selector** (modifying `metadata.labels` updates `.spec.selector.matchLabels` in sync) and **Synchronize Pod template labels** (modifying the selector updates `.spec.template.metadata.labels` in sync).

The label selector editing entry is located in the **"label selector" area at the top of the "Stateful Replicas" tab**; be careful when changing the selector once it is set, as it determines which Pods are managed by this controller.

### Stateful Replicas

| Field | Description |
| --- | --- |
| Label Selector | Pods matching this selector are considered managed by this StatefulSet; provides sync switches with the labels and the Pod template labels |
| Replica Count | Desired replica count (minimum 0); the create form defaults to 1 |

::: warning StatefulSet-specific fields must be supplemented in YAML
When creating / editing a StatefulSet, the following fields are **not in the visual form** and must be supplemented in the **YAML dialog** before saving:

- `serviceName`: the Headless Service name that provides a stable network identity for this StatefulSet;
- `podManagementPolicy`: `OrderedReady` (default, creates / deletes replicas in ordinal order) or `Parallel` (creates / deletes in parallel, suitable for applications that do not depend on ordering);
- `updateStrategy.rollingUpdate.partition`: the rolling update partition; replicas with an ordinal number lower than `partition` keep the old version;
- `volumeClaimTemplates`: the volume template that generates a PVC per replica ordinal (each replica is bound to its own persistent volume).
:::

### Pod Template

The Pod template is exactly the same as in a Deployment; sub-tabs on the left:

| Sub-tab | Description |
| --- | --- |
| Basic Info | Pod annotations and labels (recommended to keep consistent with the label selector) |
| Containers | Images, ports, environment variables, probes, resource limits, etc. of the working containers and init containers |
| Volumes | Volumes mounted by the Pod (including PVC, ConfigMap, Secret and other types) |
| Pod Settings | Advanced settings such as scheduling policy, DNS policy, hostNetwork |

Validation before saving: when form validation fails in the container or volume tab, Kuboard automatically switches to the corresponding tab and shows the error.

### Complete Manifest Example

Based on the object generated by the visual form, the complete object after supplementing the StatefulSet-specific fields (for reference in the YAML dialog):

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  serviceName: web
  podManagementPolicy: OrderedReady
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      # replicas with ordinal < partition keep the old version, used for canary releases
      partition: 0
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25
```

::: tip Canary release idea (partition)
Set `partition` to `N` and update the Pod template: replicas with ordinal `>= N` roll to the new version, while replicas with ordinal `< N` keep the old version. Once the new version is verified stable, gradually lower `partition` (finally to 0) to complete the canary release.
:::

## Editing

Click the inline **Edit** on a list row, or **Edit** on the detail page, to enter the edit page. The form structure is the same as the create page (three tabs), with these differences: **Name** is read-only and cannot be modified; the **ResourceVersion** of the current object is shown at the top of the page (for comparison with the latest version in the cluster); on save, a **Compare YAML** dialog appears (the original object in the cluster is on the left, the modified object on the right), and it is submitted after confirmation.

The modifiable content is the same as on the create page: labels, annotations, label selector, replica count, and the Pod template. StatefulSet-specific fields (`serviceName`, `podManagementPolicy`, `updateStrategy`, `volumeClaimTemplates`, etc.) should be adjusted in the YAML comparison dialog before saving. With the `RollingUpdate` strategy, modifying the Pod template (e.g. the image tag) triggers the controller to replace replicas one by one according to the update strategy; if `partition` is configured, replicas with an ordinal number lower than `partition` are not updated.

## Detail Page

Click a StatefulSet name in the list page to enter the detail page. The page contains: the **header metadata** and **events** card (recent events, refreshed in real time), the **action buttons**, and the **Pod area** (the Pod list on the left, the details of the selected Pod on the right).

| Action Button | Description |
| --- | --- |
| Scale (− / ready count / +) | Manually scale, see "Scaling" below |
| Update Image Tag | Update the image tags of working / init containers in batch |
| Restart | Restart using the update strategy defined by the StatefulSet |
| Edit / YAML / Delete | Same as the inline actions on the list page |
| More (dropdown) | **CI/CD Integration** and the menu items registered by the extension points |

The Pod area lists all Pods managed by this StatefulSet and refreshes in real time with cluster events: each Pod card shows the status (**Ready / Not Ready / Completed**), name, creation time, Pod IP, and node IP; hovering over a Pod allows **delete** and **view YAML**; click to select a Pod and its detailed information is shown on the right.

## Scaling

Click the scale button on the detail page (the middle number shows `ready replicas / desired replicas` — red abnormal, yellow converging, green ready) to open the scale panel:

- **Manual scale**: enter the target replica count (minimum 0) and click OK;
- **Replica metrics**: desired replicas, ready replicas, and a ready-rate ring progress bar;
- **HPA summary**: if the workload is associated with a HorizontalPodAutoscaler (HPA), its scaling target and current metrics are shown as well.

The **−** / **+** buttons on either side of the number directly decrease / increase the current replica count by 1; this operation requires `update` permission on `apps/statefulsets/scale`.

::: tip Scaling down to 0 does not delete data
Scaling only reduces replicas (and reclaims the corresponding ordinals); the PVCs generated by `volumeClaimTemplates` are **not deleted**. When you scale up again, the replicas with the original ordinals re-mount their existing data volumes. To delete the PVCs as well, delete them manually in "Storage".
:::

## Deleting

Delete entries: the list page (check entries and click **Batch Delete**, or click the inline **Delete**) and the detail page (**Delete** button). The confirmation dialog requires typing the object name; in batch deletion, Kuboard distinguishes "entries in the Kubernetes cluster" from "entries in the cache" (only cache records remain) and handles them separately.

::: warning Impact of deleting a StatefulSet
Deleting a StatefulSet cascades to the Pods it manages, but the PVCs generated by `volumeClaimTemplates` are **not** deleted (the PVCs are used to preserve data). For a full cleanup, delete the corresponding PVCs manually as well.
:::

## Common Operations

### Update Image Tag

On the detail page, click **Update Image Tag**; the dialog lists all **working containers** and **init containers**:

| Column | Description |
| --- | --- |
| Container Type | Working container / init container |
| Name | Container name |
| Image | Image repository address (without the version tag) |
| Current Tag | The current image version tag |
| New Tag | Enter the new version tag |

After modifying the tags of one or more containers and clicking OK, Kuboard replaces the images of the corresponding containers and triggers a rolling update. Requires `update` permission on `apps/statefulsets`.

### Restart

Restart does not recreate the StatefulSet object; it writes a current-timestamp annotation into the Pod template, triggering the controller to replace Pods one by one according to the update strategy. **Batch Restart** on the list page and **Restart** on the detail page use the same feature and support "do not show this message again".

### Logs and Terminal

On the list page, click the inline **Logs/Terminal**, select a Pod and a container, and you can: **follow logs** (in a new window), **download logs**, open a **bash / sh / cmd / powershell** terminal, or open the **file browser** to view the container's file system. Requires `pods/log` (logs) and `pods/exec` (terminal / file browser) permissions.

### CI/CD Integration

On the detail page, click **More → CI/CD Integration**, select an AccessKey, and you get two kinds of `curl` scripts (usable directly in pipelines): **Update Image Tag** (updates all container images of the StatefulSet to the specified tag) and **Restart the StatefulSet**.

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"statefulsets","namespace":"default","name":"web","images":{"nginx":"nginx:1.25"}}' \
  "https://<kuboard-host>/api/cd.kuboard.cn/v4/update-image-tag"
```

## Related Pages

- [Deployment](./deployments): the controller for stateless applications, compared with StatefulSet above
- [Pod](./pods): the smallest scheduling unit managed by a StatefulSet
- [Importing a Kubernetes Cluster](../cluster/import): manage workloads once the cluster is connected to Kuboard

<!-- screenshot-todo: Suggested images: StatefulSet list page; the "Stateful Replicas" tab of the create page (label selector + replica count) -->
