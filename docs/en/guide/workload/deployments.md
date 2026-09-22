---
description: "Kuboard Workload - Deployment: where to find it, list page fields and actions, creation (deployment strategy / update strategy / rolling update parameters), editing and YAML comparison, detail page (revision history / events / Pods), scaling, deletion and cascading policy, common operations (update image tag, restart, logs / terminal, CI/CD integration)"
---

# Deployment

This page explains how to create, view, scale, roll back and delete a Deployment in Kuboard, along with common operations such as updating image tags, restarting and viewing logs.

A Deployment is Kubernetes' built-in **stateless application** controller (`apps/v1`). It continuously converges the actual replica count toward the state you desire, making it suitable for interchangeable Web services, microservices and similar applications.

::: tip Choosing between a Deployment and a StatefulSet
- When your application is **stateless** (any replica can replace another), use a Deployment;
- When your application needs **stable network identity** or **stable storage** (such as a database or a message queue), use a [StatefulSet](./statefulsets).

Pods managed by a Deployment get a new name after every update; no stable hostname is provided, and no persistent volumes bound by ordinal are provided either.
:::

## Where to Find the Entry

After logging into Kuboard, click **Workloads → Deployments** in the left navigation to enter the list page. The list page shows all Deployments in the cluster by Namespace; it supports filtering by cluster / Namespace and switching between the two list modes "search / tree navigation".

The Workloads navigation also contains [StatefulSets](./statefulsets), DaemonSet, [Jobs / CronJobs](./jobs-cronjobs), [Pods](./pods) and other entries, which are operated in the same way as described on this page.

## List Page

The list page shows workloads with anomalies first, and additionally provides three replica count columns: **Ready / Updated / Available**:

| Column | Description |
| --- | --- |
| Checkbox | Checked entries can be used for **batch restart** and **batch delete** |
| Cluster / Namespace | The cluster and Namespace the Deployment belongs to |
| Name | Deployment name; click to enter the detail page |
| Ready | Displayed as `ready replicas / desired replicas` (e.g. `3/3`); color changes with health status |
| Updated | The number of replicas updated to the latest template |
| Available | The number of available replicas |
| Creation Time | Shown as relative time, sortable |
| Actions | Per-row action buttons (Logs/Terminal, Edit, YAML, Delete) |

The color rules of the **Ready** column:

| Condition | Color | Meaning |
| --- | --- | --- |
| ready replicas == desired replicas | Green | All ready |
| ready replicas == 0 | Red | Not a single replica is ready |
| desired replicas == 0 | Yellow | Paused |
| Other cases | Default | Partially ready, converging |

### Header Actions

| Button | Description |
| --- | --- |
| Create (+) | Create a Deployment in the current cluster / Namespace, see "Creating a Deployment" below |
| Batch Delete | Delete the checked entries; "entries in the Kubernetes cluster" and "entries in the cache" are counted separately and can be handled independently |
| Batch Restart | Restart the checked Deployments in batch (see "Common Operations - Restart" below); greyed out when nothing is checked |

### Inline Actions

| Button | Description |
| --- | --- |
| Logs/Terminal | Opens a Pod / container picker dialog; you can **follow logs**, **download logs**, open a **bash / sh / cmd / powershell** terminal, or open the **file browser** (requires `pods/exec` and `pods/log` permissions) |
| Edit | Enter the edit page (requires `update` permission on `apps/deployments`) |
| YAML | View / edit the object's YAML in a dialog (requires `get` permission) |
| Delete | Delete the Deployment (requires `delete` permission); the confirmation dialog requires typing the object name and choosing a cascading policy (see "Deleting a Deployment and the Cascading Policy") |

## Creating a Deployment

Click **Create** in the top-right corner of the list page to enter the create page. The create form is organized into three tabs: **Basic Info** (name, labels, annotations), **Deployment Strategy** (replicas, update strategy, revision history limit, etc., Deployment-specific, see below) and **Pod Template** (Pod basic info, containers, volumes, Pod settings). After clicking **Save**, Kuboard first validates the forms in all tabs, then pops up a **Preview YAML** dialog showing the complete object to be submitted; after confirmation it is submitted to the cluster and you are navigated to the detail page of the new object.

### Basic Info

| Field | Description |
| --- | --- |
| Name | Required; must be unique within the Namespace |
| Namespace | The Namespace the Deployment is created in, read-only |
| Labels | Key-value pairs; entering a name automatically writes the `app=<name>` label, which is synchronized to the selector and the Pod template through the "label sync" options |
| Annotations | Key-value pairs, optional |

::: warning Be careful when changing the label selector
The selector determines which Pods are managed by this Deployment. Its editing entry is located in the **"label selector" area at the top of the "Deployment Strategy" tab** (with two sync options: "always keep consistent with the labels" and "synchronize the Pod template labels"). Do not modify it casually, otherwise historical ReplicaSets and Pods may be detached from management.
:::

### Deployment Strategy

This tab contains the core control fields of a Deployment (default values are shown directly in the form inputs, no need to memorize them):

| Field | Description |
| --- | --- |
| Replicas | Desired replicas (minimum 0); the create form defaults to 1 |
| Update Strategy | The strategy for replacing existing replicas when a new version is rolled out, see "Update Strategy" below |
| Revision History Limit | The number of historical ReplicaSets kept, used for rollback |
| Min Ready Seconds | A newly created Pod is considered available if it does not fail within this period after becoming ready (seconds) |
| Deadline | The Deployment is considered failed if it cannot finish processing all Pods within this period (seconds) |

#### Update Strategy

| Option | Description |
| --- | --- |
| Recreate | Delete all old Pods first, then create new Pods; suitable when the old and new sets of replicas cannot coexist |
| RollingUpdate | Create new replicas while deleting old ones, keeping a certain number of replicas available throughout the update; the default option |

When **RollingUpdate** is selected, you also need to set the rolling update parameters:

| Field | Description |
| --- | --- |
| Max Unavailable (maxUnavailable) | The maximum number of replicas that may be **unavailable** during the update (relative to the desired replicas); accepts a number or a percentage, e.g. `25%` or `1` |
| Max Surge (maxSurge) | The maximum number of replicas that may **exceed** the desired replicas during the update; accepts a number or a percentage |

Switching the strategy to **Recreate** clears the rolling update parameters; switching back to **RollingUpdate** restores the default values.

::: tip Semantics of maxUnavailable and maxSurge
With `3` replicas and both parameters set to `25%`: during a rolling update, the total number of replicas in the cluster stays between `3 ~ 4`, and at most `1` replica may be unavailable, completing a smooth upgrade while service capacity is guaranteed.
:::

### Pod Template

The Pod template is configured in the **Pod Template** tab, exactly the same as in other workloads such as StatefulSets:

| Sub-tab | Description |
| --- | --- |
| Basic Info | Pod annotations and labels (recommended to keep consistent with the label selector) |
| Containers | Working containers and init containers: image, image pull policy (Always / IfNotPresent / Never), start command and arguments, environment variables, resource requests and limits, ports, health check probes, lifecycle hooks, security context |
| Volumes | Volumes mounted by the Pod (PVC, ConfigMap, Secret, emptyDir and other types) |
| Pod Settings | Advanced settings such as node selection, affinity, tolerations, DNS config, hostNetwork, ServiceAccount |

When adding a new container you must fill in the name and the image. If validation fails before saving, Kuboard automatically switches to the corresponding tab and shows the error.

## Editing a Deployment

Click **Edit** on the list page or the detail page to enter the edit page, which also uses the three tabs "Basic Info / Deployment Strategy / Pod Template". Differences from the create page: **Name** is read-only and cannot be modified; the current object's **ResourceVersion** is shown at the top of the page (for comparison with the latest version in the cluster); on save, a **Compare YAML** dialog appears with the original object in the cluster on the left and the modified object on the right, submitted after confirmation.

As long as the Pod template is modified (e.g. the image tag, environment variables, or the start command), the Deployment controller creates a **new ReplicaSet** and rolls out, replacing old replicas according to the update strategy; the number of old ReplicaSets specified by "Revision History Limit" is kept for rollback.

## Detail Page

Click a Deployment name in the list page to enter the detail page: the header shows a metadata card on the left (Namespace, UID, labels, annotations, etc.) and an **events** card on the right (recent events related to the Deployment, refreshed in real time); the toolbar holds the action buttons (see below); the main body shows the **revision history** timeline on the left (ReplicaSet list) and, on the right, the **Pod** list of the selected ReplicaSet and the details of the selected Pod; the right side of the toolbar also provides a **revision history** entry to load the revision records of the current and previous months, compare "current version ↔ historical version" and restore to a historical version.

### Detail Page Action Buttons

| Button | Description |
| --- | --- |
| Scale (− / ready count / +) | Manually scale, see "Scaling" below |
| Update Image Tag | Update the image tags of working / init containers in batch, see "Common Operations" below |
| Restart | Restart using the update strategy defined by the Deployment |
| Edit | Enter the edit page (requires `update` permission) |
| YAML | View / edit the object's YAML in a dialog (requires `get` permission) |
| Delete | Delete the Deployment, see "Deleting a Deployment and the Cascading Policy" |
| More (dropdown) | **CI/CD Integration** and menu items registered by installed extension points |

### Revision History (ReplicaSets)

The left side of the detail page main body is the Deployment's **revision history** timeline (ordered by creation time descending, newer versions on top); next to the title at the top, the current "max revision history limit" is shown. Each entry is a ReplicaSet, showing the name, revision number `#N`, `desired / current / ready` replica counts and creation time; the entry whose revision number matches the current revision is the **current version** (marked green in the timeline, the others grey); hovering over an entry shows the ReplicaSet's **image tags** (the images of the working containers and init containers).

The row background color rules:

| Condition | Color | Meaning |
| --- | --- | --- |
| replicas == 0 | Green | This historical version has been scaled down to 0 (old version, no running replicas) |
| replicas == ready replicas | Primary | All ready (current or new version) |
| Other cases | Yellow | Partially ready, converging |

After selecting a historical version, its **events** are shown below it; the Pod area on the right shows the Pods of that ReplicaSet.

#### Actions on a Revision History Entry

| Button | Description |
| --- | --- |
| Delete | Delete the ReplicaSet (requires `delete` permission on `replicasets`) |
| YAML | View the ReplicaSet's YAML in a read-only dialog |
| Rollback | Only shown for **non-current** entries (requires `update` permission); clicking it opens a **Compare YAML** dialog, writes the ReplicaSet's Pod template back to the Deployment; after confirmation it is submitted and you are navigated back to the detail page, and the controller performs another rolling update according to the update strategy, producing a new revision |

#### Deleting All Pods of the ReplicaSet

The Pod area provides a **Delete all Pods of this ReplicaSet** button to the right of its title. After confirmation, Kuboard deletes all Pods matched by the ReplicaSet; the controller recreates them immediately according to the replica count, achieving the effect of "restarting all Pods of this version in batch".

### Pod Area

The Pod area lists all Pods managed by the selected ReplicaSet and refreshes in real time with the events. Each Pod card shows the status label (Ready / Not Ready / Completed etc.), name, creation time, Pod IP (C) and node IP (H); hovering over a Pod allows **delete** and **view YAML**; clicking selects the Pod and its detailed information is shown on the right.

## Scaling

Click the scale button on the list page or the detail page (the middle number shows `ready replicas / desired replicas`, color changes with health status: red abnormal, yellow converging, green ready) to open the scale panel:

- **− / +**: decrease / increase the current replica count by 1 directly (the − button is greyed out when the desired replica count is 0);
- **Manual scale**: enter the target replica count (minimum 0) and click OK to submit;
- **Replica metrics**: desired replicas, ready replicas, and a ready-rate ring progress bar; a Deployment additionally shows the **unavailable replica count**;
- **HPA summary**: if the Deployment is associated with a HorizontalPodAutoscaler (HPA), the HPA scaling target and current metrics are shown as well.

::: tip Scaling does not produce a new revision
Modifying the replica count only adjusts the number of replicas of the current ReplicaSet; it does **not** create a new ReplicaSet / revision, nor does it trigger a rolling update.
:::

## Deleting a Deployment and the Cascading Policy

There are three entries for deleting a Deployment: the inline **Delete** button on the list page, **Batch Delete** after checking entries, and the **Delete** button on the detail page. Deletion pops up the global delete confirmation dialog:

| Item | Description |
| --- | --- |
| Enter the object name | You must type the exact object name to prevent accidental deletion |
| GracePeriod | Grace period in seconds, default 0, i.e. delete immediately |
| Propagation Policy | Cascading deletion policy, choose Foreground / Background / Orphan |

The three **Propagation Policy** options and their meanings:

| Option | Meaning |
| --- | --- |
| Background | Delete the target object first, then delete the child objects through garbage collection (GC) |
| Foreground | Delete all child objects first, then delete the target object |
| Orphan | Delete the target object and keep the child objects |

::: warning Notes on the cascading deletion of a Deployment
- By default, deleting a Deployment cascades to its ReplicaSets, and further to the Pods of those ReplicaSets;
- If **Orphan** is chosen, the ReplicaSets and Pods are kept, but those ReplicaSets are no longer managed by the Deployment controller (no more rolling updates);
- In batch deletion, Kuboard distinguishes "entries in the Kubernetes cluster" from "entries in the cache" (entries already deleted from the cluster, only cache records remain) and handles them separately.
:::

## Common Operations

### Update Image Tag

On the detail page, click **Update Image Tag** to open a dialog that lists all **working containers** and **init containers** of the Deployment:

| Column | Description |
| --- | --- |
| Container type | Working container / init container |
| Name | Container name |
| Image | Image repository address (without the version tag) |
| Current tag | The current image version tag |
| New tag | Enter the new version tag |

After modifying the tags of one or more containers and clicking OK, a rolling update is triggered according to the update strategy. This operation requires `update` permission on `apps/deployments`.

### Restart

Restart does not change the image; instead it writes a current timestamp into the Pod template, making the template change, which triggers the controller to **create a new ReplicaSet** and roll out, replacing all replicas according to the update strategy. **Batch Restart** on the list page and **Restart** on the detail page use the same implementation: restarting a single object shows a confirmation dialog, and supports checking "do not show this prompt again".

### Logs and Terminal

On the list page, click the inline **Logs/Terminal** (the Pods on the detail page support this too) to open the "Please select a Pod / container" dialog: on the left is a tree list of Pods; expanding a Pod shows its **working containers** and **init containers** (with status, start / end time, ExitCode, Reason). After selecting a container you can **follow logs**, **download logs**, or open a **bash / sh / cmd / powershell** terminal or the **file browser** to view the container's file system (requires `pods/log` and `pods/exec` permissions).

### CI/CD Integration

On the detail page, click **More → CI/CD Integration**, select an AccessKey (you can create one in the dialog, or jump to `Profile → Access Keys` to manage it) to obtain the **update image tag script** (updates all container images of the Deployment to the specified tag) and the **restart Deployment script**.

The scripts are given in `curl` form (the `Kb-Access-Key` header carries the key and secret of the AccessKey) and can be used directly in CI/CD pipelines:

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"deployments","namespace":"default","name":"web","images":{"nginx":"nginx:1.27"}}' \
  "https://<kuboard-host>/api/cd.kuboard.cn/v4/update-image-tag"
```

## Related Pages

- [StatefulSet](./statefulsets): the controller for stateful applications, compared with Deployment above
- [Jobs / CronJobs](./jobs-cronjobs): one-off / periodic batch workloads
- [Pod](./pods): the smallest scheduling unit managed by a Deployment
- [Importing a Kubernetes Cluster](../cluster/import): manage workloads once the cluster is connected to Kuboard

<!-- screenshot-todo: Suggested images: Deployment list page (abnormal workloads first + Ready/Updated/Available columns); create page "Deployment Strategy" tab (update strategy and rolling update parameters) -->
