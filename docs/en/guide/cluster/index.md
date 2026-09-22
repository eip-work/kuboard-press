---
description: "Cluster management overview: import, edit, sync status, resource export and import"
---

# Cluster Management

A cluster is the core object Kuboard manages. This section walks through the full lifecycle — connecting the first Kubernetes cluster, day-to-day maintenance of the connection and cache, and moving resources between clusters.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Import Cluster](./import) | Import a new cluster via kubeconfig or ServiceAccount | First-time connection to a K8s cluster |
| [Edit Cluster](./edit) | Change cluster name, description, connection parameters and cache strategy | Adjust settings on an existing cluster |
| [Sync Status](./sync-status) | Inspect full and incremental sync progress, error logs | Troubleshoot stuck or failing syncs |
| [Resource Export and Import](./export-import) | Bulk import/export K8s resources (YAML) between clusters | Cross-cluster migration and DR |

## Recommended Reading Order

1. **First connection** — start with [Import Cluster](./import) and fill in the apiserver address and credentials;
2. **Day-to-day maintenance** — tune cache strategy and defaults from [Edit Cluster](./edit);
3. **Troubleshooting** — when something looks wrong in the cluster list, start at [Sync Status](./sync-status) to separate sync-pipeline issues from connection problems;
4. **Cross-cluster moves** — use [Resource Export and Import](./export-import) for bulk migration.

::: tip Where to go next
After [Import Cluster](./import), continue to the [Workloads](../workload/) section to deploy your first application. In a multi-cluster setup, `auth.clusterIds` and `auth.clusterNames` (from `useAuthStore`) determine which clusters appear in the left sidebar.
:::