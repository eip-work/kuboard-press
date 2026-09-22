---
description: "Config and storage overview: ConfigMap, Secret, PVC, PV, StorageClass, VolumeSnapshot, CSI"
---

# Config and Storage

Application configuration and persistent storage are the two foundations of any workload running on Kubernetes. This section covers Kuboard's "application config" and "storage" resource types, along with related snapshot and CSI (Container Storage Interface) capabilities.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [ConfigMap / Secret](./configmaps-secrets) | Creating, editing and referencing application config and secrets | Inject configuration and manage credentials |
| [PVC / PV / StorageClass](./pvc-pv-storageclass) | Persistent volume claim, persistent volume and storage class | Persistent storage for stateful workloads |
| [VolumeSnapshot / CSI](./snapshots-csi) | Volume snapshots, CSI drivers, cloning | Backup, migration and capacity expansion |

## Recommended Reading Order

1. **Application config first** — read [ConfigMap / Secret](./configmaps-secrets) and learn how to reference them from a Deployment or StatefulSet;
2. **Persistent storage** — read [PVC / PV / StorageClass](./pvc-pv-storageclass) to understand how the three relate, and pick the right StorageClass;
3. **Data protection** — add [VolumeSnapshot / CSI](./snapshots-csi) for snapshots and clones on critical stateful workloads.

::: tip Secret hygiene
Once a Secret is referenced by a workload, its content is exposed inside the Pod as files or environment variables. Grant users the minimal privilege on the `secrets` resource in [Users and Authentication](../../user/), and protect administrator accounts with [MFA](../../user/mfa).
:::