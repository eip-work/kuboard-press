---
description: "Kuboard storage management - the positioning and complete flow of the three concepts PVC / PV / StorageClass; creating a StorageClass (local path / NFS dynamic provisioning wizards, default StorageClass); creating a PersistentVolumeClaim (dynamic provisioning vs static binding to an existing PV); viewing PVC / PV status; creating a PersistentVolume (static provisioning); mounting a PVC to a workload; notes on delete policy and expansion"
---

# PersistentVolumeClaim / PersistentVolume / StorageClass (PVC / PV / StorageClass)

Kubernetes persistent storage consists of three resources that work together. Kuboard provides management pages for all three under the **Cluster Details → Config & Storage → Storage** group.

## The Three Concepts and the Complete Flow

| Resource | English | One-line positioning |
| --- | --- | --- |
| StorageClass | StorageClass (SC) | **The template for dynamic provisioning**: declares "which storage backend to use and by what policy to create volumes" |
| PersistentVolume | PersistentVolume (PV) | **The storage resource pool in the cluster**: an actual piece of storage (an NFS export directory, a cloud disk, a local path, etc.) |
| PersistentVolumeClaim | PersistentVolumeClaim (PVC) | **The user's claim on storage**: the application declares "how much capacity and what read/write mode" the volume needs |

The complete flow:

1. An administrator prepares a **StorageClass** (or the cluster already has a default StorageClass);
2. A user creates a **PVC**, specifying the StorageClass and capacity;
3. Kubernetes **binds** a PV to the PVC:
   - **Dynamic Provisioning**: the provisioner creates a PV on the spot according to the PVC's requirements and binds it; the administrator does not need to prepare anything in advance;
   - **Static binding**: the PVC directly specifies an existing PV (`volumeName`), suitable for scenarios where the administrator has prepared the storage in advance;
4. The workload (Deployment / StatefulSet / Pod) references the PVC in its volume configuration;
5. After the Pod is scheduled to a node, the kubelet mounts the PV into the container, and the application starts reading and writing data.

::: tip A quick way to remember
The StorageClass is the "blueprint", the PV is the "goods in the warehouse", and the PVC is the "requisition form". The goods (PV) the PVC receives may have been produced on the spot by the warehouse according to the blueprint (dynamic provisioning), or may have been stocked in advance (static binding).
:::

## Creating a StorageClass

The StorageClass is a **cluster-level resource**, usually operated by the cluster administrator. Entry: **Config & Storage → Storage → StorageClass → Create**.

Create form fields:

| Field | Corresponding spec field | Description |
| --- | --- | --- |
| Name | `metadata.name` | StorageClass name, unique within the cluster |
| Default StorageClass | annotation `storageclass.kubernetes.io/is-default-class` | When enabled, a PVC that does not specify a StorageClass uses this one by default |
| Annotations / Labels | `metadata.annotations` / `metadata.labels` | Optional |
| Volume Binding Mode | `volumeBindingMode` | **Immediate** (default): the volume is allocated as soon as the PVC is created; **WaitForFirstConsumer**: allocated only after the first Pod has been scheduled to a node, suitable for per-node storage such as local disks |
| Reclaim Policy | `reclaimPolicy` | **Delete** (default): when the PVC is deleted, the PV and its data are deleted together; **Retain**: the PV is retained and the data is handled manually by the administrator |
| Provisioner Type | `provisioner` | Kuboard provides two dynamic provisioning wizards: **Local Path (dynamic provisioning)** and **NFS (dynamic provisioning)**, see below |

### Local Path Dynamic Provisioning

After selecting "Local Path (dynamic provisioning)", configure the **storage root path on each node**:

- **Default root path** (`DEFAULT_PATH_FOR_NON_LISTED_NODES`): defaults to `/opt/local-path-provisioner`; nodes without an individual configuration all use it;
- **Per-node configuration**: you can configure an independent root path for a specific node; configuring 0 paths for a node = **provisioning storage volumes on that node is prohibited**; configuring multiple paths = one is randomly chosen when provisioning.

After saving, the wizard **also creates** the supporting objects required by the provisioner in the `kube-system` namespace: ServiceAccount, RBAC, ConfigMap (storing the path configuration above) and a Deployment (image `rancher/local-path-provisioner`).

### NFS Dynamic Provisioning

After selecting "NFS (dynamic provisioning)", fill in:

| Field | Description |
| --- | --- |
| NFS Server | NFS server address, e.g. `192.168.1.100` |
| NFS Path | Export path, must start with `/`, e.g. `/exports/k8s` |
| MountOptions | Mount options (optional) |
| Usable Capacity | Capacity used by the wizard to generate the provisioner's own volume, e.g. `100Gi` |
| Image | Provisioner image: `eipwork/nfs-subdir-external-provisioner:v4.0.18` or the Huawei Cloud image source |

The form provides a **test command** below; please confirm that it can be executed successfully (mount, write, read) on any node in the cluster:

```sh
mkdir /tmp/testnfs \
&& mount -t nfs <NFS Server>:<NFS Path> /tmp/testnfs \
&& echo "hello nfs" >> /tmp/testnfs/test.txt \
&& cat /tmp/testnfs/test.txt
```

After saving, the wizard creates the provisioner Deployment and its supporting RBAC in `kube-system`, and creates a pair of PV / PVC for the provisioner's own use (named `nfs-provisioner-<StorageClass name>-pv` / `-pvc`).

### Default StorageClass

After turning on the **Default StorageClass** toggle, Kuboard automatically writes the annotation `storageclass.kubernetes.io/is-default-class: "true"`. As a result, a PVC created without selecting a StorageClass will still use this StorageClass.

::: warning Only one default StorageClass
Inside the same cluster, the `is-default-class` annotation can only point to one StorageClass. Before switching the default StorageClass, first turn off the old default StorageClass toggle.
:::

Equivalent YAML (using Local Path as an example):

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-path
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: rancher.io/local-path
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

<!-- screenshot-todo: StorageClass create form: name / default StorageClass toggle / volume binding mode / reclaim policy / provisioner type -->

<!-- screenshot-todo: Local Path provisioner: default root path and per-node path configuration -->

<!-- screenshot-todo: NFS provisioner: Server / Path / capacity / image / test command -->

## Creating a PVC

The PVC is a **namespace-level resource**. Entry: **Config & Storage → Storage → PersistentVolumeClaim → Create** (select the cluster and namespace at the top of the list page first).

Form fields:

| Field | Corresponding spec field | Description |
| --- | --- | --- |
| Namespace | `metadata.namespace` | Fixed to the currently selected namespace |
| Name | `metadata.name` | PVC name, unique within the namespace |
| StorageClass | `spec.storageClassName` | Dropdown to select an existing StorageClass; when **left empty**: the default StorageClass is used (if it exists), or static binding is used |
| Volume Type | `spec.volumeMode` | **Filesystem** (default) or **Block** |
| Access Modes | `spec.accessModes` | Select at least 1: read/write by a single node (ReadWriteOnce) / read-only by multiple nodes (ReadOnlyMany) / read/write by multiple nodes (ReadWriteMany) / read/write by a single Pod (ReadWriteOncePod) |
| Requested Capacity | `spec.resources.requests.storage` | Required, e.g. `10Gi`, `2GB`, `5Mi`, `8MB` |
| Volume Name | `spec.volumeName` | **Usually left blank**; it is automatically assigned by the provisioner of the StorageClass, and is only filled in manually for static binding |

After filling in, click **Save**, and create it after confirming it in the **Preview YAML** dialog that pops up.

### Dynamic Provisioning

Select a StorageClass (or leave it empty to use the default StorageClass) and fill in the remaining fields as needed. The corresponding YAML looks like:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: local-path
  resources:
    requests:
      storage: 10Gi
```

After creation, the PVC is quickly bound by the provisioner to the newly created PV, and its status changes from **Pending (waiting)** to **Bound (bound)**.

### Static Binding (Manually Specifying an Existing PV)

Suitable for scenarios where the storage has already been prepared in advance by the administrator (such as a manually created PV):

1. Do **not select a StorageClass** when creating the PVC;
2. Fill in the name of the PV to bind in **Volume Name** (or add `volumeName` through the **Preview YAML** dialog);
3. The requested capacity and access modes must match the target PV, and the target PV's status must be **Available (available)**.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-static
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: ""
  volumeName: pv-nfs-01
  resources:
    requests:
      storage: 10Gi
```

::: tip About permissions
Creating a PVC requires the current user to have the `create` permission on the `persistentvolumeclaims` resource in the target namespace; StorageClass / PV are cluster-level resources, and creating them requires cluster-level permissions. Kuboard automatically greys out the operation buttons for which the current user has no permission.
:::

<!-- screenshot-todo: PVC create form: StorageClass / volume type / access modes / requested capacity / volume name -->

## Viewing PVC and PV Status

The **list pages** are consistent with other K8s resource lists, supporting cluster / namespace switching, searching by name, and batch deletion:

- **PVC list**: additionally shows the **StorageClass** and **Status** columns;
- **PV list**: shows cluster, name, creation time, and actions (PV is a cluster-level resource, so there is no namespace column).

The **PVC detail page** shows: StorageClass, volume type, **requested access modes** and **actual access modes**, **requested capacity** and **actual capacity**, status, as well as the **associated volume (PV)** and **Events** (a troubleshooting entry).

Common PVC statuses (`status.phase`):

| Status | Meaning |
| --- | --- |
| Pending | Waiting: no bindable PV found yet (the dynamically provisioned volume is not ready, or there is no matching PV) |
| Bound | Bound: already bound to a PV |
| Lost | Lost: the bound PV does not exist or has been deleted, and the data may be lost |

Common PV statuses (`status.phase`):

| Status | Meaning |
| --- | --- |
| Available | Available: idle, can be bound by a PVC |
| Bound | Bound: already occupied by a PVC |
| Released | Released: the bound PVC has been deleted, but the PV has not yet been reclaimed (common under the Retain policy) |
| Failed | Failed: automatic reclaim (Delete) failed |

The PV detail page lets you view the volume source type, capacity, access modes, reclaim policy, and the bound PVC; the "Associated Volume" section on the PVC detail page can jump directly to the corresponding PV and supports viewing its YAML.

<!-- screenshot-todo: PVC list page (StorageClass / Status columns) -->

<!-- screenshot-todo: PVC detail page: status, actual capacity, associated volume, events -->

## Creating a PV (for Static Provisioning)

When you need to prepare storage in advance, you can create a PV manually. Entry: **Config & Storage → Storage → PersistentVolume → Create** (cluster-level resource).

Form fields:

| Field | Corresponding spec field | Description |
| --- | --- | --- |
| Name | `metadata.name` | PV name, unique within the cluster |
| Capacity | `spec.capacity.storage` | Required, e.g. `10Gi` |
| Access Modes | `spec.accessModes` | The same four modes as for PVC, multiple can be selected |
| Volume Type | `spec.volumeMode` | Filesystem (default) / Block |
| Reclaim Policy | `spec.persistentVolumeReclaimPolicy` | **Retain** (default) / **Delete** / Recycle (deprecated) |
| StorageClass Name | `spec.storageClassName` | Optional; it is recommended to keep it consistent with the PVC to be bound, to make matching easier |
| Volume Source Type | `spec.<volume source>` | hostPath / NFS / Local / CSI / iSCSI / RBD / FC / GlusterFS / CephFS |
| Advanced Settings | `spec.mountOptions` / `spec.nodeAffinity` | Mount options, node affinity (collapsible) |

After selecting the volume source, fill in according to its type: for hostPath, fill in the **host path** and the type (e.g. "Directory (create if it doesn't exist)"); for NFS, fill in the **server address**, **export path**, and whether it is read-only; for CSI, fill in the **driver name**, **volume handle**, etc.

Equivalent YAML (one NFS and one hostPath example):

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-nfs-01
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  persistentVolumeReclaimPolicy: Retain
  storageClassName: ""
  nfs:
    server: 192.168.1.100
    path: /exports/data
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-hostpath-01
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data/k8s-vol
    type: DirectoryOrCreate
```

After successful creation, the PV is in the **Available** state; then bind it with a PVC as described in "Static Binding" above.

::: tip hostPath is only for development / single-node verification
hostPath directly uses a directory on the node as storage; the data is not shared across nodes and has no redundancy. In production, use NFS, cloud disks (CSI) and other real shared / distributed storage.
:::

<!-- screenshot-todo: PV create form: capacity / access modes / reclaim policy / volume source type dropdown -->

## Mounting a PVC to a Workload

A PVC itself does not produce data reads/writes; it must be mounted into a workload:

1. Go to the create / edit page of a [Deployment](../workload/deployments), [StatefulSet](../workload/statefulsets) or [Pod](../workload/pods);
2. Click **Add Volume** under **Pod template → Volumes**, and select the volume type **PersistentVolumeClaim** (persistentVolumeClaim);
3. Select the PVC to mount from the dropdown (the volume editor supports **Quick Create** of a new PVC);
4. Mount the volume to the target directory in the container settings (e.g. `/data`).

> For stateful applications (databases, message queues, etc.), a StatefulSet is recommended: replicas are created in order, and each replica can stably bind to its own PVC.

::: tip The relationship between a PVC and replicas
A **ReadWriteOnce (read/write by a single node)** PVC can only be used by Pods on one node at any given moment. When multiple replicas need to share reads and writes, the StorageClass and the PV must support **ReadWriteMany (read/write by multiple nodes)**; otherwise the replicas will fail to start because they contend for the same volume.
:::

## Common Notes

| Note | Description |
| --- | --- |
| The delete policy decides where the data goes | After a PVC is deleted, the `reclaimPolicy` of its StorageClass decides the fate of the PV and the data: `Delete` removes the volume and the data together (not recoverable); `Retain` keeps the PV and the data, requiring manual handling by the administrator (deleting the PV, cleaning up the backend data, releasing the quota) |
| Expansion is limited by allowVolumeExpansion | A PVC can be expanded online only when the StorageClass declares `allowVolumeExpansion: true` and the storage backend supports it, and it can **only be increased, never decreased**. Kuboard's StorageClass form does not expose this toggle; when needed, add this field under StorageClass details → YAML |
| Editing the capacity of a PVC | The PVC edit page allows modifying the requested capacity, but whether it actually takes effect still depends on the expansion condition in the previous note |
| Access modes cannot be changed after creation | RWO (ReadWriteOnce) single-node read/write, RWX (ReadWriteMany) multi-node shared read/write; plan them before creating |
| A binding cannot be re-bound | Once a PVC is bound to a PV, it cannot be re-bound to another PV unless the PVC is deleted; to re-bind, first delete the PVC and wait for the original PV to be reclaimed |
| Static binding must match | For manual binding, the PVC's capacity (≤ the PV's capacity), access modes and StorageClass must match the target PV, and the PV must be Available |
| LocalPath data stays on the node | Data of volumes provisioned from local paths exists only on the hosting node; when a Pod is scheduled to another node, the data does not migrate with it. A node failure means data loss; it is only suitable for non-critical data or together with backups |

## Related Pages

- [Storage Snapshots and CSI-related Resources](./snapshots-csi): take snapshots of PVCs for backup / restore
- [Deployment](../workload/deployments) / [StatefulSet](../workload/statefulsets): mount a PVC to a workload