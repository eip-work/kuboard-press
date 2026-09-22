---
description: "Cluster resources - Namespace: where to find it and the list page (cluster / name / creation time / actions), creating a Namespace, the detail page overview (cached resource object statistics), Pod Security Admission label configuration, the Resource Limit tab (LimitRange default container requests / limits, ResourceQuota usage and inline editing per resource), and deleting a Namespace"
---

# Namespace

A Namespace is a **cluster-level** resource in Kubernetes. It splits a cluster into multiple logically isolated "virtual clusters". In Kuboard, workloads, ConfigMaps/Secrets, services, network policies, and other resources all belong to a Namespace, which is the smallest scope of day-to-day management.

::: tip Related resources
- Set **resource limits** on a Namespace with [ResourceQuota](./quota-limitrange), and set **default CPU/memory requests and limits** for containers with [LimitRange](./quota-limitrange);
- Network isolation between Namespaces is implemented by [NetworkPolicy](../network/networkpolicy);
- Workloads (Deployment, StatefulSet, etc.) themselves live inside a Namespace; see [Deployment](../workload/deployments).
:::

## Where to Find It

The Namespace list page is located at **Cluster Management → Namespaces** in the left navigation (menu path `/k8s/api/namespaces`, menu title "Namespaces"; the same group also contains **Limit Ranges**, **Resource Quotas**, and **Service Accounts**):

1. Log into Kuboard and click **Cluster Management** in the left navigation;
2. Click **Namespaces** to enter the list page.

Namespaces are cluster-level resources; the list page shows them grouped by cluster by default. You can switch list modes with the "Search / Tree" toggle at the top right of the page.

<!-- screenshot-todo: overall screenshot of the Namespace list page: tree navigation grouped by cluster, table columns on the right (checkbox / cluster / name / creation time / actions), and the Create button and the Search / Tree toggle in the top-right corner -->

## List Page

The list page reuses Kuboard's generic resource list. The main columns are as follows:

| Column | Description |
| --- | --- |
| Checkbox | Checked entries can be used for **batch deletion** |
| Cluster | The cluster the Namespace belongs to |
| Name | The Namespace name; click to enter the detail page. A Namespace being deleted shows a deletion animation |
| Creation Time | Shown as relative time, sortable |
| Actions | Per-row action buttons |

Header actions:

| Button | Description |
| --- | --- |
| Create (+) | Create a Namespace, see "Creating a Namespace" below |
| Batch Delete | Delete the checked Namespaces; it only lights up after entries are checked |

Inline actions:

| Button | Description |
| --- | --- |
| YAML | View / edit the Namespace's YAML in a dialog (requires `get` permission on `namespaces`) |
| Delete | Delete the Namespace (requires `delete` permission); the confirmation dialog requires typing the name and lets you set a GracePeriod and a Propagation Policy |

## Creating a Namespace

1. On the Namespace list page, click **Create** in the top-right corner; the "Create Namespace" dialog opens;
2. **Cluster**: select the target cluster (only clusters in the ready state are listed);
3. **Create Approach**: choose "Create from form" (you can also choose "Create from Yaml" and define the object directly in YAML);
4. On the creation page, fill in the **Namespace name** (`metadata.name`, unique within the cluster, following the RFC 1123 rules); you can also attach labels / annotations;
5. Click **Save**, and Kuboard shows a **YAML Preview** of the `v1/Namespace` object to be submitted;
6. After confirming it is correct, submit; the Namespace is created and the new entry appears on the list page.

::: warning A newly created Namespace is "empty"
The create action only submits a Namespace object that contains just `metadata.name`; Kuboard does **not** automatically create a ResourceQuota or LimitRange for it. Quotas and default requests/limits must be set on the "Resource Limit" tab of the detail page after creation.
:::

## Namespace Detail Page

Click a Namespace name in the list to enter the detail page. The header provides **Edit**, **YAML**, **Delete** and other actions; the body contains three tabs:

| Tab | Content |
| --- | --- |
| Overview | Counts the number of resource objects of each type in the Namespace, grouped by API |
| Pod Security Admission | Edit the Namespace labels and configure the three levels of Pod Security Admission (PSA): enforce / audit / warn |
| Resource Limit | View and edit the default container resource requests / limits (LimitRange) and the resource quotas (ResourceQuota) |

### Overview

When you open this tab, Kuboard counts the objects of each API group and resource type in the Namespace from the **cluster cache**, and shows a number card for each group / resource type.

- The hint banner at the top of the page notes "Only shows the count of cached K8S objects.";
- The cache is synchronized by the Kuboard backend; resources that have not been synchronized are not included in this statistic. Click **Config K8S objects cache** in the banner to go to the system settings and adjust the cache scope.

<!-- screenshot-todo: screenshot of the "Overview" tab of the Namespace detail page: the cache hint banner on top + resource object count statistic cards arranged by API group -->

::: tip Why the cache is authoritative
The Overview statistics come from Kuboard's cluster resource cache (`ClusterSyncDataCount`), so freshness depends on cache synchronization, but the counting cost is low and there is no need to query the API Server item by item.
:::

### Pod Security Admission

Pod Security Admission (PSA) is Kubernetes' built-in admission control. It specifies a security level for Pods through three labels on the Namespace. Kuboard maintains these labels with a form on this tab:

| Label | UI group | Meaning |
| --- | --- | --- |
| `pod-security.kubernetes.io/enforce` | Enforce | Non-compliant Pods are rejected at creation |
| `pod-security.kubernetes.io/audit` | Audit | Non-compliant Pods are recorded as audit events but still created |
| `pod-security.kubernetes.io/warn` | Warn | Non-compliant Pods return a warning to the user but are still created |

Steps:

1. Open the **Pod Security Admission** tab;
2. The upper part of the tab lets you edit the **Namespace labels** (key-value pairs) directly; click the pencil icon to enter edit mode;
3. In the Pod Security Admission area, select a security level for enforce / audit / warn respectively: **Privileged** (permissive), **Baseline** (baseline), or **Restricted** (strict), or click **Clear** to delete the corresponding label (i.e. "Unset");
4. Click **Save**, and Kuboard submits the label changes with a "Compare YAML" dialog.

In view mode, the configured levels are shown as tags and unset ones show "Unset". This area is only shown when the cluster supports PSA (the `admission.psa` feature is available).

::: tip The three levels, from permissive to strict
- Privileged: the most permissive, does not restrict privileged containers;
- Baseline: restricts known privilege-escalation vectors;
- Restricted: the strictest, only allows Pods that meet the hardening requirements.

For more detailed behavioral differences, refer to the Kuboard learning center article (Pod Security Standards) linked by the "Help" link at the top right of the interface.
:::

<!-- screenshot-todo: screenshot of the "Pod Security Admission" tab of the Namespace detail page: the label editing area + the three Enforce / Audit / Warn radio groups of PSA (Privileged / Baseline / Restricted + Clear) -->

### Resource Limit

The **Resource Limit** tab merges the commonly used items of LimitRange and ResourceQuota onto one page, so you can view and edit them directly without going to the "Limit Ranges / Resource Quotas" pages separately.

#### Container Default Resource Requests (LimitRange)

The top of the page shows the **Default Request/Limit per Container** area with four cells, reading the `default` / `defaultRequest` of type `Container` from the LimitRange in the Namespace:

| Cell | Field read | Description |
| --- | --- | --- |
| CPU Resource Request | `defaultRequest.cpu` | Default CPU request when a container does not declare one explicitly |
| CPU Resource Limit | `default.cpu` | Default CPU limit when a container does not declare one explicitly |
| Memory Resource Request | `defaultRequest.memory` | Default memory request when a container does not declare one explicitly |
| Memory Resource Limit | `default.memory` | Default memory limit when a container does not declare one explicitly |

Unset values show "Undefined". Click **Edit** next to a cell, enter the new value, and save:

- CPU is written in cores (e.g. `2`) or millicores (e.g. `100m`);
- Memory is written in byte units (e.g. `240Mi`, `2Gi`).

After saving, Kuboard automatically creates or updates a **LimitRange with the same name as the Namespace**; the change immediately affects containers created afterwards that do not explicitly declare the corresponding fields.

#### ResourceQuota

Below, several quota rows are listed by resource type; each row reads the `spec.hard` (limit) and `status.used` (used) of the ResourceQuota in the Namespace:

| Quota row | Corresponding ResourceQuota entry |
| --- | --- |
| CPU Limit Quota / CPU Request Quota | `limits.cpu` / `requests.cpu` |
| Memory Limit Quota / Memory Request Quota | `limits.memory` / `requests.memory` |
| GPU Nvidia / GPU Amd | `requests.nvidia.com/gpu` / `requests.amd.com/gpu` |
| Persistent Volume Claim total volume | `requests.storage` |
| Persistent Volume Claim Count | `count/persistentvolumeclaims` |
| Pod Count | `count/pods` |
| Deployment / StatefulSet / DaemonSet Count | `count/deployments.apps` / `count/statefulsets.apps` / `count/daemonsets.apps` |
| Service Count | `count/services` |
| Secret / ConfigMap Count | `count/secrets` / `count/configmaps` |

Structure of each row:

| Field | Description |
| --- | --- |
| Resource Type | The resource item the quota applies to |
| Used | `status.used`; shows "No Limit" when no quota is set |
| Resource Limit | The limit in `spec.hard`; shows "No Limit" when not set; click **Edit** to fill it in directly, or click **Clear** to remove this limit |
| Usage | A progress bar showing the used percentage of the limit |

Progress bar color rules:

| Usage rate | Color |
| --- | --- |
| ≤ 20% | Green |
| 21% – 60% | Default color |
| 61% – 80% | Yellow warning |
| > 80% | Red abnormal |

When saving an edit, Kuboard automatically creates or updates a ResourceQuota with the same name as the Namespace, adding or modifying the corresponding `spec.hard` entry; it only applies to that resource and does not affect the other unedited quota rows.

<!-- screenshot-todo: screenshot of the "Resource Limit" tab of the Namespace detail page: four LimitRange default request/limit cells on top (including the unset state), ResourceQuota rows below (resource type / used / resource limit / usage progress bar), with the inline edit and clear buttons annotated -->

::: tip More complete quota management
This tab focuses on the most commonly used resource items. To manage all quota entries (such as `count/services.nodeports`, or `scopeSelector` quotas graded by priority / workload) or to view quota details, go to the **Cluster Resources → Resource Quotas** page.
:::

## Deleting a Namespace

1. On the list page, check one or more Namespaces and click **Batch Delete** in the header; or click **Delete** in a row's action column;
2. Type the object name in the confirmation dialog (for batch deletion, "entries in the Kubernetes cluster" and "entries in the cache" are handled separately);
3. Optional: set a GracePeriod and a Propagation Policy;
4. After confirmation, Kuboard submits the delete request to the cluster; the deleted Namespace enters the `Terminating` state and is shown with the deletion style in the list until it disappears completely.

::: warning Confirm before deleting
Deleting a Namespace also deletes **all** workloads, services, configurations, storage claims, and other resources in it, and it is usually unrecoverable. First confirm that the resources in the Namespace have been migrated or are no longer needed.
:::