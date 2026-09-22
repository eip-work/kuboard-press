---
description: "Cluster resources - using the four types of Dynamic Resource Allocation (DRA) resources: ResourceClaim, ResourceClaimTemplate, ResourceSlice, and PodSchedulingReadiness"
---

# Dynamic Resource Allocation (DRA)

Dynamic Resource Allocation (DRA) is a feature Kubernetes has been evolving since 1.26: it lets workloads **declare and allocate** hardware devices beyond CPU / memory (GPUs, FPGAs, smart NICs, etc.) on demand, with the matching DevicePlugin driver handling the actual allocation and mounting. Kuboard provides four related resource types under the **Cluster Resources → Structured Resources (DRA)** group:

| Resource | Purpose | Scope | Operations |
| --- | --- | --- | --- |
| ResourceClaim | Declares "what devices this Pod needs" | Namespace-level | Create / Edit / Delete |
| ResourceClaimTemplate | A scaffold that generates resource claims in batches for workload templates | Namespace-level | Create / Edit / Delete |
| ResourceSlice | The driver exposes "the devices available on a node" to the scheduler | Cluster-level | View only |
| PodSchedulingReadiness | Controls when a Pod starts being scheduled (paired with scheduling gates) | Namespace-level | Create / Edit / Delete |

The division of labor among the four resources can be strung together in one sentence:

- **ResourceClaim** declares "what devices the Pod needs";
- The **DevicePlugin driver** installed in the cluster exposes "the devices available on a node" through **ResourceSlice**;
- **ResourceClaimTemplate** is a scaffold that generates claims in batches for workload templates (the workload references it, and the controller generates one independent claim per Pod);
- **PodSchedulingReadiness** controls when a Pod starts being scheduled (only after its scheduling gates are marked ready does the Pod take part in scheduling).

::: warning These four menu items are hidden by default
`resourceclaims`, `resourceclaimtemplates`, `resourceslices`, and `podschedulingreadiness` are **disabled** by default in Kuboard and cannot be seen in the resource tree. If there is no "Structured Resources (DRA)" group on the left side, go to **System Settings → Menu Item Settings**, check the corresponding items under that group in the resource tree and save, then refresh the cluster page — they will appear.
:::

::: tip DRA needs a matching DevicePlugin driver
ResourceClaim / ResourceSlice are only declarations and descriptions — **whether devices are actually "available" depends on whether the matching DevicePlugin driver is installed and running in the cluster**. Without a driver, the resource slices are empty and the resource claim never gets allocated a device (see "Troubleshooting" below).
:::

## Entry Point and the List Page

The four resources live under **Cluster Resources → Structured Resources (DRA)** in the left navigation (the resource tree group title is "Structured Resources (DRA)", corresponding to the API group `resource.k8s.io`):

1. Log into Kuboard and expand **Cluster Resources** on the left;
2. Click **Structured Resources (DRA)** to expand its four sub-items: Resource Claims, Resource Claim Templates, Resource Slices, and Pod Scheduling Readiness.

The list page reuses Kuboard's generic resource list. The main columns are as follows:

| Column | Description |
| --- | --- |
| Cluster | The cluster the resource belongs to |
| Namespace | Only namespace-level resources (Resource Claims / Templates / Pod Scheduling Readiness) have this column; Resource Slices are cluster-level and have no such column |
| Name | Click to enter the detail page |
| Creation Time | Shown as relative time, sortable |
| Actions | Per-row action buttons: **Edit** (only for editable resources; Resource Slices have none), **YAML** (view / edit YAML), **Delete** |

The top-right corner of the page lets you switch between the "Search / Tree" list modes and shows the cache status of that resource. Click **Create (+)** to open the create dialog: select the cluster, the create method (**From Form** / **From YAML**); namespace-level resources also require selecting a namespace (default `default`).

## ResourceClaim

A ResourceClaim describes "what devices the workload needs and how many of them". It is only a declaration; the actual allocation is done collaboratively by the DRA scheduler and the DevicePlugin driver.

### Creating a ResourceClaim

1. Enter the **Cluster Resources → Structured Resources (DRA) → Resource Claims** list page and click **Create** in the top-right corner;
2. Fill in the **Name** (unique within the namespace);
3. In the **Devices** area, click **+ Add Request** to add device requests (multiple allowed), and fill in the fields in the table below for each one;
4. Click **Save**, confirm in the **YAML Preview**, then submit; you are taken to the detail page.

| Field | Description |
| --- | --- |
| Name | Required, unique within the namespace, following Kubernetes naming rules |
| Device requests (Devices → Request) | Declares a batch of devices of the same type in one go; multiple requests can be added and individually removed |
| name (request name) | The name of the request, used to distinguish multiple requests inside the same claim |
| deviceClassName | The name of the device class, registered by the driver (e.g. `gpu.example.com`); the declared devices must belong to this class |
| count | The number of devices of this class required; minimum is 1 |

The corresponding YAML (this is the structure the form submits):

```yaml
# resourceclaim.yaml: declare 1 device of the gpu.example.com class
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaim
metadata:
  name: gpu-claim-1
  namespace: default
spec:
  devices:
    requests:
      - name: gpu-0
        deviceClassName: gpu.example.com
        count: 1
```

<!-- screenshot-todo: screenshot of the ResourceClaim creation form, highlighting the name input + the device request card in the Devices area (name / deviceClassName / count) and the "+ Add Request" button -->

::: tip There are more spec fields beyond the form
The form focuses on the most commonly used `devices.requests`. The ResourceClaim spec also supports device constraints (`constraints`), device configuration (`config`), and the fields of evolving DRA versions such as `resourceClassName` / `allocationMode` / `parametersRef`; you can choose "From YAML" in the create dialog, or click **YAML** on the detail page after creation, to add them.
:::

### Detail Page

The detail page header shows the claim's metadata (name, namespace, UID, creation time, etc.) and provides **Edit** / **YAML** / **Delete** actions; the "Spec" card in the body shows the number of device requests (`N request(s)`). Which node and which device the claim was actually allocated to can be seen in **YAML** under `status.allocation`.

### Referencing a ResourceClaim from a Pod

A Pod references an existing ResourceClaim through `spec.resources.claims`:

```yaml
# pod-dra.yaml: the Pod references the gpu-claim-1 resource claim
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
spec:
  resources:
    claims:
      - name: gpu-claim        # corresponds to the name referenced inside the container
  containers:
    - name: app
      image: nginx:1.25
      resources:
        claims:
          - name: gpu-claim
```

Verification:

```sh
kubectl -n default get resourceclaim
kubectl -n default describe resourceclaim gpu-claim-1   # check whether status.allocation has been allocated
```

## ResourceClaimTemplate

A ResourceClaimTemplate embeds the spec of a ResourceClaim and serves as a scaffold for "generating claims in batches": once a workload (e.g. a Deployment) references the template, the controller automatically generates one independent ResourceClaim per Pod — much more convenient than creating claims manually for every Pod.

### Creating a ResourceClaimTemplate

1. Enter the **Cluster Resources → Structured Resources (DRA) → Resource Claim Templates** list page and click **Create** in the top-right corner;
2. Fill in the **Name**;
3. In the **Template Spec** area, click **+ Add Request** to add device requests (the structure is identical to that of a ResourceClaim);
4. Click **Save**, confirm in the **YAML Preview**, then submit.

| Field | Description |
| --- | --- |
| Name | Required, unique within the namespace |
| Template Spec → Request | The embedded ResourceClaim spec, i.e. the content of "every claim generated by the template" |
| name / deviceClassName / count | Same as ResourceClaim, see above |

```yaml
# resourceclaimtemplate.yaml: the template embeds a spec that declares 1 GPU
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaimTemplate
metadata:
  name: gpu-claim-template
  namespace: default
spec:
  spec:
    devices:
      requests:
        - name: gpu-0
          deviceClassName: gpu.example.com
          count: 1
```

The "Spec" card on the detail page shows the number of device requests in the **template spec** (`N request(s)`).

### Using the Template in a Workload

Reference the template by name in a Deployment's Pod template:

```yaml
# deployment-dra.yaml snippet: the controller generates one independent claim per Pod from the template
spec:
  template:
    spec:
      resources:
        claims:
          - name: gpu-claim   # references the ResourceClaimTemplate name
```

After creating the Deployment, verify that a corresponding ResourceClaim was generated for every replica:

```sh
kubectl -n default get resourceclaims | grep gpu-claim
```

## ResourceSlice

A ResourceSlice is created and maintained automatically by the DevicePlugin driver: the driver collects the **available devices** on a node (or a pool) into a slice and hands it to the scheduler as the basis for allocation. It is a **cluster-level** resource.

ResourceSlices are managed automatically by the driver and are **view-only** in Kuboard (the list page has no create button and the rows have no edit entry; operating through YAML or deleting is also not recommended — after deletion the driver recreates them).

### Viewing a ResourceSlice

1. Enter the **Cluster Resources → Structured Resources (DRA) → Resource Slices** list page; the list shows names and creation times grouped by cluster;
2. Click a name to enter the detail page; the header shows the metadata (name, UID, no namespace — it is a cluster-level resource), and the "Spec" card shows the **driver name** (`driver`) of the slice;
3. The concrete content of the slice is viewed in **YAML**: `driver` (the driver), `pool` (the device pool), `nodeName` (the owning node), `devices` (the device array; each device's `name` / `type` / `attributes` / `capacity`, etc.).

```yaml
# resourceslice.yaml example structure: 2 devices exposed on node-1 by the gpu.example.com driver
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceSlice
metadata:
  name: gpu.example.com-node1
spec:
  driver: gpu.example.com
  pool:
    name: node1-pool
    resourceSliceCount: 1
  nodeName: node-1
  devices:
    - name: gpu-0
      type: gpu.example.com/type-a
      attributes:
        memory: 16Gi
      capacity:
        count: 1
    - name: gpu-1
      type: gpu.example.com/type-a
      attributes:
        memory: 16Gi
      capacity:
        count: 1
```

<!-- screenshot-todo: screenshot of the ResourceSlice detail page, highlighting the header metadata (no namespace) + the driver name in the Spec card, and the devices / pool / nodeName in the YAML -->

Verification and troubleshooting:

```sh
kubectl get resourceslices
kubectl get resourceslice <name> -o yaml
```

::: tip How to troubleshoot "no devices available"
When a ResourceClaim never gets allocated a device after creation, check in order: ① whether there is a matching **ResourceSlice** for the device class (`deviceClassName`) — can that class of devices be seen in `kubectl get resourceslices`; ② whether the DevicePlugin driver is running on the corresponding node (is the Pod Running and has it registered the device class); ③ whether the `deviceClassName` in the claim matches the device class exposed by the driver in the ResourceSlice (spelling included).
:::

## PodSchedulingReadiness

PodSchedulingReadiness works with a Pod's **scheduling gates** (`spec.schedulingGates`): once a Pod declares scheduling gates, it does not take part in scheduling until all gates are marked **ready**. A PodSchedulingReadiness object lists these gates (`spec.schedulingGates`, with each gate's `name` and `ready` readiness state); after the resource claim is allocated, the DRA scheduler/driver sets `ready` to `true` and the Pod immediately starts being scheduled normally.

In the DRA flow, this object is usually created automatically by the scheduler; Kuboard provides create / edit entry points so you can manually intervene or recreate it when needed.

### Creating PodSchedulingReadiness

1. Enter the **Cluster Resources → Structured Resources (DRA) → Pod Scheduling Readiness** list page and click **Create** in the top-right corner;
2. The form only requires filling in the **Name** (unique within the namespace);
3. The `spec` content (the list of scheduling gates) is added in the **YAML Preview**: click **Save** and add entries to `spec.schedulingGates` in the YAML preview, then submit.

```yaml
# podschedulingreadiness.yaml: mark the gate as ready
apiVersion: resource.k8s.io/v1alpha3
kind: PodSchedulingReadiness
metadata:
  name: pod-scheduling
  namespace: default
spec:
  schedulingGates:
    - name: example.com/dra-gate
      ready: true
```

The Pod side needs to declare the same-named scheduling gate first:

```yaml
# the pod declares the scheduling gate (it does not take part in scheduling before it becomes ready)
spec:
  schedulingGates:
    - name: example.com/dra-gate
```

The "Spec" card on the detail page shows the creation time; the state of each scheduling gate is viewed in **YAML** (`spec.schedulingGates[].ready`).

::: tip Version note
DRA is a feature that has evolved gradually since Kubernetes 1.26; the API version here is `resource.k8s.io/v1alpha3`. Kuboard applies no extra capability gating to these four resource types — **whether they show up depends on whether the cluster API provides them**: if the cluster version is too low or the feature is not enabled (the API Server has no `resource.k8s.io` group), the "Structured Resources (DRA)" group will not appear on the left, which is normal; the list pages also probe resource availability for each cluster and give a hint.
:::

## Related Pages

- [Deployments](../workload/deployments): reference a ResourceClaim / ResourceClaimTemplate in the Pod template through `resources.claims`
- [Pods](../workload/pods): check the Pod's scheduling gates, claim references, and scheduling state
- [Namespaces](./namespaces): Resource Claims / Templates / Pod Scheduling Readiness are all namespace-level; first confirm the namespace they are in