---
description: "Use of the CustomResourceDefinition (CRD) list page: viewing CRD definitions and YAML, jumping to custom resource instances, deleting CRDs, and how key fields such as scope / versions / status affect usage"
---

# Custom Resource Definitions (CustomResourceDefinition / CRD)

**Custom Resource Definitions (CRD for short)** are cluster-scoped resources that Kubernetes uses to declare a "custom resource type": when you define a CRD, you register a new resource type with the API Server, after which you can create, view, and delete instances (Custom Resources, CR for short) of that type just like built-in resources.

This page explains how to view, edit, and delete CRDs in Kuboard; for day-to-day management of instances (custom resources), see [Custom Resource Instances](./custom-resources).

::: tip Typical scenarios
- An installed add-on / Helm Chart ships with CRDs (such as Gateway API, cert-manager), and you want to confirm whether they are active (Established);
- You developed your own Operator and need to view / modify the resource type definitions it declares;
- You need to clean up a CRD that is no longer used and remove all of its instances together.
:::

## Entry and List Page

1. Log in to Kuboard and enter any cluster;
2. Click **Custom Resources** in the left navigation (this group sits under "Cluster Resources", at the top level of the cluster-scoped menu); if the cluster already has CRDs, the group also auto-mounts the corresponding custom resource instance menus by API group — see "Jumping to the Custom Resource List" below;
3. Click **CustomResourceDefinitions** to open the CRD list page.

CRDs are **cluster-scoped** resources and do not belong to any namespace. The list page reuses the Kuboard generic resource list, with the following main columns:

| Column | Description |
| --- | --- |
| Cluster | The cluster the CRD belongs to (grouped by cluster in tree mode) |
| Name | CRD name (e.g. `crontabs.stable.example.com`), no detail page, shown as plain text |
| Created | Shows relative time, filterable by time |
| Operations | **Custom Resource List** / **YAML** / **Delete** |

<!-- screenshot-todo: Overall CRD list page: grouped by cluster in tree mode, table columns Cluster/Name/Created/Operations, "Cache Active" and refresh buttons top-right, row actions "Custom Resource List/YAML/Delete" -->

The search / tree toggle switch at the top right of the page: in search mode a **Cluster** selector appears at the top (CRDs are cluster-scoped resources, so there is no namespace selector); in tree mode cluster checkboxes appear on the left, allowing multiple clusters to be selected.

::: tip CRD list runs on the cluster cache
CRD list data comes from Kuboard's **cluster cache** (polled and refreshed every **5 minutes** by default), so the top right of the list page shows a green **Cache Active** button; click it to view the cache status: cached object type `apiextensions.k8s.io/customresourcedefinitions`, the update method (polling) and interval, plus the sync health status, entry count, and full sync start/end time for each cluster. The list does not reflect changes that just happened in the cluster in real time — it lags by at most one polling cycle.
:::

## Viewing the CRD Definition (YAML)

CRDs do not have a form-based detail page; the most direct way to view the definition is the inline **YAML**:

1. Click **YAML** on the target row in the CRD list page;
2. A YAML editor pops up showing the complete definition of the CRD (`apiVersion`, `metadata`, `spec`, `status`); the object type and field descriptions are covered below;
3. If your account has **update** permission on `customresourcedefinitions` for this cluster, the editor **can be edited directly**: after modifying, click **Save**, and a diff against the original content is shown first; after confirmation, it is written back to the cluster using apply. Without permission the editor is read-only and can only be viewed.

<!-- screenshot-todo: CRD YAML view/edit dialog: full CRD definition on the left, including spec.group / spec.names / spec.versions / status -->

::: tip Risks of modifying a CRD
Once a CRD definition has been accepted, modifying its `spec` (for example adjusting the schema or switching the storage version) immediately affects how the entire cluster handles this type of resource, and cannot be arbitrarily reverted at the `spec` level. When in doubt, verify on a test cluster first, then modify the definition on the production cluster.
:::

## Jumping to the Custom Resource List

The purpose of a CRD is to "register a new resource type"; the objects you actually deal with day to day are its instances. The **Custom Resource List** (link icon) in the row actions jumps you straight there:

- Jump target = the custom resource list page for that CRD: `/k8s/cr/{spec.group}/{spec.names.plural}`, filtered by the current cluster;
- For example, the CRD `crontabs.stable.example.com` (`group: stable.example.com`, `plural: crontabs`) jumps to the resource list of `crontabs.stable.example.com`;
- The left navigation **Custom Resources → an API group → a resource** is another entry to the same list, and that entry is only auto-generated when the cluster cache is healthy (`cache_health_status = ready`).

Full usage of the instance list page (create, edit, view, delete instances) is covered in [Custom Resource Instances](./custom-resources).

::: tip Why some CRDs cannot be jumped to
Only CRDs that have been **accepted** by the cluster (`Established=True` in `status.conditions`) are actually usable, and only then does the left menu generate the corresponding entry. If you land on a blank page after clicking, go back to the CRD list and check its status conditions — see "Status (status)" below.
:::

## Key Fields That Affect Usage

The CRD's `spec` determines what these instances look like, where they are stored, and how they are accessed. The fields worth understanding for daily use are as follows.

### Name, API Group, and Resource Name

| Field | Example | Description |
| --- | --- | --- |
| `metadata.name` | `crontabs.stable.example.com` | Globally unique, must be of the form `{plural}.{group}` |
| `spec.group` | `stable.example.com` | The **API group** the resource belongs to; instances' `apiVersion` starts with it (e.g. `stable.example.com/v1`) |
| `spec.names.plural` | `crontabs` | The plural resource name (the resource name used in URLs, consistent with service account authorization and kubectl commands) |
| `spec.names.singular` | `crontab` | The singular resource name (used for kubectl shorthand) |
| `spec.names.kind` | `CronTab` | The kind name (the `kind` field in YAML, PascalCase with a capital first letter) |
| `spec.names.shortNames` | `ct` | Optional, kubectl short name |

### Scope

| Value | Where instances are stored | Effect on usage |
| --- | --- | --- |
| `Namespaced` | Inside a namespace | The instance list page shows namespace selection / grouping; instances are deleted along with the namespace |
| `Cluster` | Cluster-scoped, not belonging to any namespace | The instance list page only has the cluster dimension; instances are unaffected by namespaces |

### Versions (served / storage)

`spec.versions[]` is an array; each version has three key switches: `name`, `served`, `storage`:

| Switch | Meaning | Effect on usage |
| --- | --- | --- |
| `served: true` | This version is served externally via the API | Clients (kubectl / Kuboard / other components) can read and write instances using this version; when set to `false`, the version is no longer accessible, but existing instances are retained |
| `storage: true` | This version is the **storage version** in etcd | All versions can have only **one** `storage: true`; after switching the storage version, Kubernetes rewrites all existing instances to the new version (upgrade migration), which takes time |
| `schema.openAPIV3Schema` | Defines the field structure of this version | Determines which fields instances may have and their types; when the structure is incomplete (non-structural schema), a warning condition appears on the CRD |

When multiple versions coexist, multiple `served` can be `true` (multiple versions accessible at the same time), but only one `storage` can be `true`.

### Status (status)

The CRD's `status.conditions` reflects whether it is truly usable, and is the first thing to check when troubleshooting:

| Condition | Meaning |
| --- | --- |
| `Established=True` | Accepted by the cluster; instances can be created |
| `NamesAccepted=True` | The declared names (plural / kind, etc.) do not conflict with existing resources |
| `NonStructuralSchema=True` | The schema does not meet structural requirements (fields missing types, etc.); the CRD is still usable but is a hidden hazard |
| `Terminating=True` | Being deleted (for example, dependent resources remain uncleaned) |

### preserveUnknownFields and Field Pruning

- `preserveUnknownFields` only appears in old CRDs of `apiextensions.k8s.io/v1beta1`: when `true`, instances can hold arbitrary fields not declared in the schema;
- The new `apiextensions.k8s.io/v1` **prunes unknown fields** by default: fields in instances that are not declared in the schema are dropped, unless the corresponding position explicitly declares `x-kubernetes-preserve-unknown-fields: true`.

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
      - ct
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
```

## Creating and Editing a CRD

**The "CustomResourceDefinitions" page has no "Create" button, nor a form-based create/edit page** — this is deliberate: a CRD is a high-risk, declaratively-managed cluster-scoped resource, and Kuboard recommends managing it directly with YAML on the cluster.

**Create**: write the CRD definition into a YAML file, then run it on the cluster:

```sh
kubectl apply -f crontab-crd.yaml
```

After a successful create, the CRD appears in Kuboard's CRD list after the next cache poll (up to 5 minutes), and the corresponding instance entry is generated under the "Custom Resources" group in the left navigation.

::: tip Don't create CRDs with "Import K8S Objects" in Kuboard
The "Frequent Operations → Import K8S Objects" wizard only supports **namespace-scoped** resources; cluster-scoped CRDs are not among them (see [Resource Export and Import](../cluster/export-import)). Use `kubectl apply` to create CRDs (or let an Operator / Helm install bring them along automatically).
:::

**Edit**: modify the definition with the inline **YAML** editor (see above); this requires **update** permission on `customresourcedefinitions` for the cluster. Since saving writes back using apply, you can directly add/remove `spec.versions`, adjust `served` / `storage`, etc., in the YAML.

## Deleting a CRD

1. Click **Delete** on the target row in the CRD list page (or select multiple rows and use **Batch Delete** above the table);
2. A delete confirmation dialog pops up: verify the cluster and object name, and **enter the CRD name** for a second confirmation;
3. Optionally set **GracePeriod** (graceful deletion grace period in seconds, default 0, usually keep the default) and **Propagation Policy** (Foreground / Background / Orphan; when unset, determined by `metadata.finalizer`);
4. Click OK; after the deletion completes the list refreshes automatically (the cache-backed list lags by at most one polling cycle).

After the CRD is deleted, the resource type disappears from the cluster API, and its menu entry is also removed after the next refresh.

::: danger Deleting a CRD cascades to all its instances
Custom resource instances belong to their CRD via ownerReference. **Deleting a CRD cascades to delete all instances of that type** (Foreground / Background clean up the instances, and the data is unrecoverable). Before deleting, make sure this is the intended behavior; if you need to keep the data, don't delete the CRD yet — first export and archive the instance definitions via [Custom Resource Instances](./custom-resources).
:::

::: warning Instances disappear with a delay after deletion
Instances are cleaned up asynchronously by Kubernetes garbage collection, so it is normal that instances do not disappear instantly after a CRD is deleted. If instances linger for a long time, check whether the CRD deletion is blocked by finalizers or webhooks (`Terminating=True` in `status.conditions`).
:::

Verification commands:

```sh
kubectl get crd                                   # View all CRDs with the ESTABLISHED column
kubectl describe crd crontabs.stable.example.com  # View versions, status conditions, and accepted names
```

## Related Pages

- [Custom Resource Instances](./custom-resources): the page for day-to-day management of instances of this resource type after the CRD is registered successfully
- [Resource Map](../ops/resource-map): view the association between CRDs and instance nodes in the resource topology
- [Namespaces](../cluster-resources/namespaces): for CRDs with `scope: Namespaced`, instances are stored inside namespaces
- [Resource Export and Import](../cluster/export-import): backup and migration of namespace-scoped resources (cluster-scoped CRDs do not apply)
