---
description: "Kuboard namespace resource governance: the positioning of ResourceQuota vs LimitRange; quickly setting and viewing quota usage on the namespace detail page; creating a ResourceQuota and common hard metrics; creating a LimitRange (Limit Type, defaults, min / max); quota-exceeded errors and troubleshooting"
---

# Resource Quota and Limit Range (ResourceQuota / LimitRange)

ResourceQuota and LimitRange are two namespace-level resource governance mechanisms built into Kubernetes. Kuboard provides management pages for both under the **Namespace** navigation group, and offers a quick view / edit entry on the namespace detail page.

| Resource | What it governs | One-line positioning |
| --- | --- | --- |
| ResourceQuota | The entire namespace | **Total cap**: limits the cumulative CPU / memory / storage consumed by all objects in the namespace, as well as the number of objects of each type (Pod, Service, PVC, …) |
| LimitRange | A single container / Pod | **Per-instance constraint**: supplies a default request / limit to containers that do not explicitly declare resources, and forces every container / Pod's resource declaration to fall within the min ~ max range |

::: tip Disambiguation: the quota governs the total, LimitRange governs a single Pod
A quota governs "how much a namespace may use at most and how many objects it may create"; a LimitRange governs "how much a single container / Pod needs at least, may ask for at most, and what it gets by default when nothing is written". Both take effect only when objects are **created / updated**, and neither reclaims running Pods. They are usually used together: the LimitRange first ensures every container declares explicit resources, and the quota then ensures all containers together do not exceed the namespace's budget.
:::

## Where to Find the Entry

Under the **Cluster Management → Namespaces** group in the left navigation, you can find the **Resource Quota** and **Limit Range** menus. Both are namespace-level resources; after entering the list, first select a cluster and a namespace.

The other entry is the **namespace detail page → Resource Limit** tab: it combines the LimitRange summary and the ResourceQuota usage in one view, and lets you edit quota values directly — the fastest entry for daily operations (see below).

<!-- screenshot-todo: The "Resource Quota / Limit Range" menu positions under the "Namespace" group in the left navigation of the cluster page -->

## Resource Quota (ResourceQuota)

### What a Quota Can Limit

A quota is written dimension by dimension in `spec.hard`, one key-value pair per dimension. Common dimensions:

| hard key | Meaning | Provided by the create form |
| --- | --- | --- |
| `requests.cpu` | Total cap on the CPU requests of all Pods | No (YAML) |
| `limits.cpu` | Total cap on the CPU limits of all Pods | No (YAML) |
| `cpu` | Counts CPU requests and limits together | Yes |
| `requests.memory` | Total cap on memory requests | No (YAML) |
| `limits.memory` | Total cap on memory limits | No (YAML) |
| `memory` | Counts memory requests and limits together | Yes |
| `requests.storage` | Total cap on the storage capacity declared by PVCs | Yes |
| `count/pods` | Pod count limit | No (YAML) |
| `count/deployments.apps`, etc. | Limits on the number of workloads / objects of each kind | No (YAML) |
| `count/services` | Service count limit | Yes (labeled "Services" in the form) |
| `count/secrets` / `count/configmaps` | Limits on the number of Secrets / ConfigMaps | No (YAML) |
| `requests.nvidia.com/gpu`, etc. | Vendor GPU count limit | No (YAML) |

The create form presets five dimensions — CPU, memory, storage requests, objects count and services — which are written to the corresponding keys of `spec.hard` when filled in; the finer-grained `requests.*`, `limits.*` and `count/*` dimensions are better maintained in the YAML editor.

### Quickly Setting a Quota on the Namespace Detail Page

For most scenarios, you do not need to create a quota object first and then wait for it to take effect. Open the **namespace detail page → Resource Limit** tab:

1. The upper part of the page is **Default Request/Limit per Container** (from the LimitRange, see below); the lower part is the **Resource Quota** usage list, one row per dimension (CPU limit, CPU request, memory limit, memory request, storage request, Pod count, Deployment count, Service count, Secret count, etc.);
2. A dimension without a quota shows **No Limit**, and the whole row is displayed in a semi-transparent style;
3. Click **Edit** on a row, enter the quota value (CPU: `2` or `100m`, memory: `240Mi` or `2Gi`, count types: a positive integer), and it takes effect immediately after saving;
4. Click **Clear** to remove the limit for that dimension.

When a ResourceQuota with the same name already exists in the namespace, Kuboard modifies it directly; otherwise it automatically creates a quota object named after the namespace. The usage rate of each row is shown as a progress bar: **≤20% green, ≤60% default color, ≤80% yellow, >80% red**.

<!-- screenshot-todo: Namespace detail page → Resource Limit tab: LimitRange summary card + Resource Quota rows (with usage progress bars and Edit / Clear buttons) -->

::: tip Quotas with a scopeSelector
Quotas scoped by `spec.scopeSelector` (e.g. counting only Pods of a specific priority class) do not appear in the summary list of the namespace detail page; view them on the Resource Quota list / detail page instead.
:::

### Creating / Editing a ResourceQuota

Enter **Namespace → Resource Quota → Create**:

| Field | Corresponding key | Description |
| --- | --- | --- |
| Name | `metadata.name` | Unique within the namespace |
| CPU | `hard.cpu` | e.g. `10` |
| Memory | `hard.memory` | e.g. `20Gi` |
| Requests Storage | `hard["requests.storage"]` | e.g. `100Gi` |
| Objects Count | `hard["objects.count"]` | e.g. `100` |
| Services | `hard.services` | e.g. `20` |

It takes effect on the namespace immediately after creation. The **Edit** page fields are identical to the create page; the quota name cannot be modified. Advanced fields other than `spec.hard` (such as `scopeSelector`) can only be maintained through the **YAML** entry on the list page.

A complete example of a quota object:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: default
spec:
  hard:
    limits.cpu: "20"
    limits.memory: 40Gi
    requests.cpu: "10"
    requests.memory: 20Gi
    requests.storage: 100Gi
    count/pods: "50"
    count/deployments.apps: "10"
```

<!-- screenshot-todo: Create ResourceQuota form (Name + CPU / Memory / Requests Storage / Objects Count / Services) -->

### Viewing Quota Usage

The quota detail page shows `spec.hard` (hard limits) and `status.used` (used) side by side in a table:

| Column | Source | Description |
| --- | --- | --- |
| Name | key of `spec.hard` | Metric name (CPU, memory, storage requests, …) |
| Hard Limits | `spec.hard` | Quota cap |
| Used | `status.used` | Current actual usage of the namespace |
| Remaining | hard limits − used | Amount still available |

`status.used` is continuously maintained by the Kubernetes controllers; no manual maintenance is needed. Dimensions that are not set show `-`.

<!-- screenshot-todo: Hard Limits / Used / Remaining comparison table on the ResourceQuota detail page -->

### Quota Exceeded: Errors and Troubleshooting

When a submitted object would push the namespace past a quota cap, the API server rejects the request directly; creating / importing YAML shows an error like:

```sh
Error from server (Forbidden): pods "web-6d9d7f5f5c-abcde" is forbidden:
exceeded quota: compute-quota, requested: limits.memory=2Gi,
used: limits.memory=40Gi, limited: limits.memory=40Gi
```

`requested` is the amount this request asks for, `used` is the current usage and `limited` is the quota cap — comparing the three pinpoints which dimension is exceeded. Troubleshooting steps:

1. Open the **Resource Quota** list of that namespace and compare the Used / Hard Limits of each dimension;
2. Or simply look at the per-dimension progress bars on the **namespace detail page → Resource Limit** tab (red means close to / over the cap);
3. Once the exceeded dimension is clear, choose one of two options: edit the quota to enlarge that dimension, or delete / scale down some workloads to free up usage;
4. When `count/pods` is exceeded, rolling releases of workloads are also rejected (new Pods cannot be created); the symptom is "the deployment is stuck updating" — check the Pod count quota first in this case.

::: warning An exceeded quota does not affect running objects
A quota is only checked at creation / update time. Running objects are not terminated even if their usage pushes past the cap; however, any new creation afterwards (including scaling up replicas and new Pods produced by rolling updates) is rejected until usage returns within the limit.
:::

<!-- screenshot-todo: The error dialog shown when a quota is exceeded (Forbidden / exceeded quota) -->

## Limit Range (LimitRange)

### What Problem LimitRange Solves

- **A safety net for containers that "forgot to declare resources"**: containers without `resources.requests` / `limits` are unlimited by default and can easily crowd out other Pods on a node; LimitRange's Default / DefaultRequest fills them in automatically;
- **Hard boundaries for resource declarations**: Min / Max guarantees that no container and no Pod can declare resources below the minimum or above the maximum, preventing a single application from eating up the quota instantly;
- **Constrains storage declaration capacity**: restricts the Min / Max for PersistentVolumeClaim to prevent a PVC from declaring an excessively large capacity.

### Creating a LimitRange

Enter **Namespace → Limit Range → Create**; the form consists of a **Name** and a "Limit" editing table. Each table row is one Limit Type; use **+ Add Limit Type** to add multiple rows. Each row contains four pairs of CPU / memory inputs:

| Column | Corresponding spec field | Meaning |
| --- | --- | --- |
| Limit Type | `limits[].type` | Type of the governed object: Container / Pod / PersistentVolumeClaim / PersistentVolume |
| Default | `limits[].default` | Default limit automatically applied when no limit is explicitly declared |
| Request | `limits[].defaultRequest` | Default request automatically applied when no request is explicitly declared |
| Limit | `limits[].max` | Maximum allowed value |
| Min | `limits[].min` | Minimum allowed value |

Input examples: CPU `100m` or `2`, memory `512Mi` or `4Gi`.

::: tip Scenarios for the four Limit Types
- **Container**: constrains the CPU / memory of a **single container**, the most commonly used;
- **Pod**: constrains the sum of resources of all containers of the **whole Pod** (e.g. limiting the total memory cap of a Pod);
- **PersistentVolumeClaim**: constrains the storage capacity declared by a PVC; for Min / Max, only the memory column is filled in (semantically the storage capacity);
- **PersistentVolume**: similar to PVC, but applies to PV objects.
:::

A complete LimitRange object example:

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: container-limits
  namespace: default
spec:
  limits:
    - type: Container
      default:            # applied automatically when no limit is declared
        cpu: 500m
        memory: 512Mi
      defaultRequest:     # applied automatically when no request is declared
        cpu: 100m
        memory: 128Mi
      max:                # upper bound
        cpu: "2"
        memory: 4Gi
      min:                # lower bound
        cpu: 50m
        memory: 64Mi
```

<!-- screenshot-todo: Create LimitRange form (Limit Type table: four pairs of Default / Request / Limit / Min CPU and memory inputs, including the + Add Limit Type button) -->

### How Validation and Defaults Take Effect

Using the Container type as an example, when a Pod is created / updated:

1. A container with **no** request declared → `defaultRequest` is filled in automatically; with **no** limit declared → `default` is filled in automatically;
2. A container **with** request / limit declared → each is compared against Min / Max; values outside the range are rejected outright;
3. The filled-in default values must also fall within the Min / Max range (otherwise Kubernetes rejects creating the LimitRange itself).

On a validation failure, you will see an error like:

```sh
Error: maximum cpu usage per Container is 2, but limit is 3
Error: minimum memory usage per Container is 64Mi, but request is 32Mi
```

At the same time, if the namespace already has a quota, the default request / limit filled in by the LimitRange is **counted** in the ResourceQuota statistics — this is exactly the "first set a safety net, then cap" working combination: the quota statistics are accurate only when every container has an explicit resource declaration.

::: tip The effective scope of modifying a LimitRange
A modified LimitRange only affects Pods / PVCs created afterwards. Running containers are neither back-filled with defaults nor evicted by the new Min / Max.
:::

<!-- screenshot-todo: The "Default Request/Limit per Container" LimitRange summary card at the top of the "Resource Limit" tab of the namespace detail page -->

## Related Pages

- [Namespace](./namespaces): the **Resource Limit** tab of the namespace detail page provides quick view / edit of quotas and LimitRanges
- [Pod](../workload/pods): LimitRange defaults and Min / Max act directly on Pod resource declarations
- [PersistentVolumeClaim (PVC)](../config-storage/pvc-pv-storageclass): the object governed by `requests.storage` and PVC-type LimitRanges