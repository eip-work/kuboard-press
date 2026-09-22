---
description: "Config & Storage - VolumeSnapshots and CSI related resources, covering what snapshots can do and prerequisites, creating snapshots and snapshot classes, restoring a PVC from a snapshot, and the purpose and usage of the read-only pages for CSI drivers, CSI nodes, CSI storage capacity, and volume attachments"
---

# Storage Snapshots and CSI Related Resources

A Kubernetes volume snapshot (VolumeSnapshot) is a **read-only copy of a storage volume at a point in time**. It is implemented by CSI (Container Storage Interface) storage drivers and is commonly used for:

| Scenario | Description |
| --- | --- |
| Data backup / recovery | Take scheduled snapshots of the PVCs of important applications, and restore data from a snapshot when a problem occurs |
| Rollback insurance before an app upgrade | Take a snapshot before an upgrade, so you can quickly return to the pre-upgrade state if the upgrade fails |
| Clone / replicate environments | Create new volumes from a snapshot for testing, joint debugging, or replicating production data |
| Data migration | Use snapshots to move data to a new volume / new StorageClass |

::: tip Snapshots vs. "backups"
Snapshots rely on the storage backend implementation and usually **only record the changed data blocks** (incremental). They are fast and occupy little space, but they cannot replace off-site disaster recovery backups. Real offline backups still require tools such as Velero to move data out of the cluster.
:::

This article covers the pages under the **Config & Storage → Storage** group in Kuboard: Storage Snapshots, Storage Snapshot Classes, and four read-only resource pages — CSI Drivers, CSI Nodes, CSI Storage Capacity, and Volume Attachments.

::: warning Menu hidden by default
Storage Snapshots, Snapshot Classes, and CSI-related resources are not shown in the left menu by default. If you cannot see these menu items, ask the cluster administrator to enable the corresponding resource items under **System Settings → Menu Item Settings**; the menu takes effect immediately after being enabled.
:::

## Prerequisites

| Condition | Description |
| --- | --- |
| The CSI driver supports snapshots | The CSI driver of the underlying storage must implement snapshot capability (e.g., Alibaba Cloud `disk.csi.aliyun.com`); not all storage supports it |
| Snapshot CRDs installed | The cluster must have the three CRDs from `external-snapshotter`: `volumesnapshots`, `volumesnapshotclasses`, `volumesnapshotcontents` (`snapshot.storage.k8s.io/v1`). If the snapshot menu is not visible in the cluster or the resource page reports it is unavailable, deploy the external snapshot controller first |
| A VolumeSnapshotClass exists | A corresponding VolumeSnapshotClass must exist before creating a snapshot (see below) |
| Source PVC ready | The PVC to be snapshotted must be in the Bound state, and its StorageClass must be provisioned by a CSI driver that supports snapshots |

::: tip How to tell whether a driver supports snapshots
Open the **Storage → CSI Drivers** detail page to view driver features such as `volumeLifecycleModes`; a more direct basis is whether a usable VolumeSnapshotClass already exists in the cluster, with its driver matching the StorageClass of the source PVC.
:::

## Create a VolumeSnapshot

Entry: **Config & Storage → Storage → Storage Snapshots**, click **Create**.

Form fields (all required):

| Field | Corresponding spec field | Description |
| --- | --- | --- |
| Name | `metadata.name` | The snapshot name, isolated by namespace |
| Snapshot Class | `spec.volumeSnapshotClassName` | Which VolumeSnapshotClass to use (text input, e.g. `demo-snapshot-class`) |
| Source PVC | `spec.source.persistentVolumeClaimName` | Which PVC to take a snapshot of (text input, e.g. `my-pvc`) |

Steps:

1. At the top of the list page, select the cluster and namespace (snapshots are namespace-scoped resources);
2. Click **Create** and fill in the name, snapshot class, and source PVC;
3. Click **Save** and confirm in the **YAML Preview** dialog that pops up before creating;
4. Return to the list and wait until the snapshot's **ready status** becomes Ready before using it.

<!-- screenshot-todo: Screenshot of the storage snapshot list page (with the Create button and namespace selector) -->
<!-- screenshot-todo: Screenshot of the create snapshot form: the Name / Snapshot Class / Source PVC fields -->
<!-- screenshot-todo: Screenshot of the YAML Preview dialog after saving -->

::: tip Snapshots are created asynchronously
A snapshot does not "complete" immediately after creation. K8s calls the CSI driver in the background to take the snapshot. On the detail page you can see the **ready status** (`readyToUse`): only after it becomes Ready is the bound VolumeSnapshotContent generated, and only then can it be used for restore.
:::

## View the Snapshot List and Details

**List page**: consistent with other K8s resource lists, supporting cluster / namespace switching, searching by name, and batch deletion.

**Detail page** contains two sections:

| Section | Content shown |
| --- | --- |
| Spec | Snapshot class, source PVC |
| Status | **Ready status** (`readyToUse`, Ready shown as a green label); **bound snapshot content** (`boundVolumeSnapshotContentDataObjectRef`) |

The "bound snapshot content" on the detail page is a **read-only reference link**; clicking it jumps to the corresponding VolumeSnapshotContent (snapshot content) to view the underlying snapshot data. VolumeSnapshotContent is a cluster-scoped resource without a dedicated menu page; it is shown here read-only to avoid accidental cross-namespace editing.

<!-- screenshot-todo: Screenshot of the snapshot detail page: Spec + Status (ready status label and the snapshot content link) -->

## Restore from a Snapshot / Create a New PVC

"Restoring" from a snapshot essentially **creates a new PVC using the snapshot as the data source**, then attaches the workload to the new PVC:

1. On the **Storage → PVC** page, click **Create** to open the creation form;
2. The form has no direct "data source" field; click **Save** to enter the **YAML Preview** dialog;
3. In the YAML, add `dataSource` to `spec`, pointing to the snapshot to restore from:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-restored
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: <StorageClass using the same driver as the snapshot>
  resources:
    requests:
      storage: 10Gi
  dataSource:
    name: <snapshot name>
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
```

4. After confirming, create it; the content of the new volume is the data at the moment of the snapshot.

::: warning Prerequisites for restore
- The snapshot must be **Ready** (`readyToUse = true`);
- The StorageClass of the new PVC must use the **same CSI driver** as the snapshot (usually the same StorageClass is the safest);
- The size of the restored volume should generally not be smaller than the source volume; the specifics depend on whether the storage backend supports snapshot restore.
:::

## VolumeSnapshotClass (Snapshot Class)

A VolumeSnapshotClass is a **cluster-scoped resource** that defines two pieces of information for snapshots: which CSI driver takes the snapshot, and the behavior when a snapshot is deleted.

| Field | Description |
| --- | --- |
| Name | The snapshot class name |
| Driver (`driver`) | The name of the CSI driver that provides snapshot capability, e.g. `disk.csi.aliyun.com` |
| Deletion policy (`deletionPolicy`) | `Delete`: deletes the backend snapshot data when the VolumeSnapshot is deleted; `Retain`: keeps the backend data after the VolumeSnapshot is deleted |

Creation steps: **Config & Storage → Storage → Storage Snapshot Classes → Create**, fill in the name, select the driver and deletion policy (default `Delete`), then save.

<!-- screenshot-todo: Screenshot of the create snapshot class form: Name / Driver / Deletion policy -->

::: tip When do you need multiple snapshot classes
Different storage drivers each need their own snapshot class; the same driver can also be split into several by deletion policy (e.g., one for "keep for record" and one for "temporary snapshots"). Creating a VolumeSnapshot requires specifying an existing snapshot class.
:::

::: warning Choosing the deletionPolicy
`Delete` removes the backend data when the snapshot is deleted, which is **unrecoverable**; for snapshots that need long-term retention, the `Retain` policy is recommended, or confirm the snapshot is no longer needed before using the `Delete` policy.
:::

## CSI Related Resource Pages

All four pages below are **read-only** (no create / edit entry) and are used to view the running state of the CSI ecosystem, typically during troubleshooting or capacity planning.

| Menu item | Resource object | Content shown | When to use |
| --- | --- | --- | --- |
| CSI Drivers | CSIDriver | CSI drivers registered in the cluster and their features: attach required (`attachRequired`), pod info on mount (`podInfoOnMount`), storage capacity (`storageCapacity`), FS group policy (`fsGroupPolicy`), volume lifecycle modes (`volumeLifecycleModes`) | Confirm whether a storage supports snapshots / capacity-aware scheduling / specific volume modes; compare driver capabilities |
| CSI Nodes | CSINode | The CSI drivers registered on each node (node ID, topology keys, allocatable volume count) | Troubleshooting: whether a driver is registered on a node, whether volumes can be scheduled to that node |
| CSI Storage Capacity | CSIStorageCapacity | The allocatable capacity of a StorageClass in a topology region, max / min volume size, node topology | Under capacity-aware scheduling (the `storageCapacity` feature), check whether a volume can be created in a specified region |
| Volume Attachments | VolumeAttachment | Which node a PV is attached to, which driver attached it, whether it is attached (`attached`), attachment metadata, detach errors (`detachError`) | Troubleshooting: volumes fail to attach, abnormal volume status after node migration |

<!-- screenshot-todo: Screenshot of the CSI driver detail page (feature toggles and volume lifecycle modes) -->

::: tip Look at these pages only when needed
The four CSI resource pages are for "viewing" and are not used in daily storage management; when "volume creation / attach / scheduling" problems occur, troubleshoot in the order **Volume Attachments → CSI Nodes → CSI Storage Capacity → CSI Drivers**.
:::

## Common Notes

| Note | Description |
| --- | --- |
| Snapshots depend on the CSI driver | When a StorageClass is provisioned by a driver that does not support snapshots, that PVC cannot be snapshotted, and the snapshot will remain not ready after creation |
| Snapshots consume backend quota | Cloud disk snapshots usually have quantity and capacity limits and keep consuming storage quota; regularly clean up snapshots you no longer need |
| The deletion policy decides where the data goes | Before deleting a snapshot, confirm whether its snapshot class is `Retain` (keep) or `Delete` (delete the backend data along with it) |
| Restore only after ready | A snapshot that is not ready (`readyToUse = false`) cannot be used as a PVC data source |
| Snapshot class and StorageClass must match | The StorageClass of a restored / cloned new volume should use the same CSI driver as the snapshot |
| Menu hidden by default | All resources on this page are hidden in the menu by default and must be enabled by an administrator under **System Settings → Menu Item Settings** |

## Related Pages

- [PVC / PV / StorageClass](./pvc-pv-storageclass): the "upstream" resources of snapshots; see that page for the relationship between snapshot classes and StorageClasses
- [ConfigMap and Secret](./configmaps-secrets): sibling resources under the same "Config & Storage" group
