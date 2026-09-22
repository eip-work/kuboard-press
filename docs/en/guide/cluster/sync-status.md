---
description: "Kuboard synchronizes commonly used Kubernetes objects to a local database (cache) to reduce access pressure on the cluster; covers the three sync modes, cache parameter configuration, cache health status, and how to use the Sync Status page"
---

# Cluster Status Sync and Cache

Kuboard synchronizes commonly used Kubernetes objects to a local database (cache). Resource lists are queried from the cache instead of piercing through to the cluster on every request, which reduces access pressure on the cluster.

Basing lists on the cache also makes pagination, filtering, and sorting work locally. **Intended for**: cluster operators / administrators. This article explains how the cache is synchronized, where to configure the parameters, and what you can do on the **Sync Status** page.

## Three Sync Modes

The sync mode of each resource is specified in **Settings → System Settings → Cluster Cache Settings**:

| Mode | How data is updated | Typical use |
| --- | --- | --- |
| **watch** (real-time listening) | Updates the cache immediately when an object changes in the cluster | Frequently changing resources such as Pods, Deployments, Services |
| **polling** (periodic polling) | Does a full refresh at a fixed interval | Resources that change infrequently, such as Namespaces, Secrets, Ingresses |
| **nocache** (direct connection, no caching) | Writes nothing to the cache; each query goes directly to the cluster | Cold resources and resources not listed in the cache configuration |

::: tip Default behavior
Resources not listed in the cache settings are treated as **nocache** by default and produce no local cache.
:::

## Cache Resource Configuration

Maintained centrally in **Settings → System Settings → Cluster Cache Settings**; takes effect immediately after saving, with no service restart required. The configuration has three parts:

- **Sync thread pool**: minimum / maximum thread counts for running sync tasks concurrently;
- **Sync timing control**: full sync timeout and failed-task retry, per-round watch period and interval of incremental sync, etc.;
- **Cached object settings**: choose a sync mode (watch or polling) and polling interval for each resource; the events resource can have its own retention period after deletion.

**Default cached resources** are as follows and can be adjusted as needed:

- **watch**: pod, deployment, statefulset, daemonset, service, endpoint, endpointslice, event (kept for 168 hours by default after deletion) and DRA resources;
- **polling (every 5 minutes)**: namespace, configmap, secret, persistentvolumeclaim, ingress, networkpolicy, horizontalpodautoscaler, job, cronjob, role, rolebinding, serviceaccount, customresourcedefinition;
- **polling (every 300 minutes)**: admission webhook configurations, validatingadmissionpolicy and its bindings, flowschema, prioritylevelconfiguration, runtimeclass.

## Cluster Status (Cache Health)

In the cluster management list, the **Cluster Status** column of each cluster shows its cache health status:

| Status | Meaning |
| --- | --- |
| unknown | Initial state right after the cluster is imported |
| ready | Cache is usable; resource lists are read normally from the cache |
| error | Cluster is unreachable; cache queries return empty results |

An unreachable (`error`) cluster needs no manual intervention: it returns to `ready` automatically once connectivity is restored. To find out the reason, open the cluster in the cluster management list and check **Reason** and **Last Check Time**.

## Sync Status Page

On the **Cluster Detail → Sync Status** tab, you can view the sync details of every resource of the cluster.

<!-- screenshot-todo -->

The table has one row per resource; main columns:

| Column | Description |
| --- | --- |
| ApiVersion / Kind / resource name | The synchronized resource |
| Items Count | Number of objects of this resource currently in the cache |
| Full Sync | Start time, end time, and status |
| Incremental Sync | Start time, end time, round, and status |

Sync status values are: `created` (task created, waiting to run), `processing` (running), `failed` (failed), `success` (succeeded). Two action buttons are available on the page:

- **Restart Full Sync** (dangerous operation): deletes all sync tasks of the cluster and regenerates them from the current cache settings, running a full sync for each resource — equivalent to rebuilding the cache once;
- **Refresh**: reloads the table data.

::: warning About Restart Full Sync
This operation changes the cluster import status back to "Importing"; each resource first deletes its old cache, then writes the new data, so the resource list may be briefly empty or incomplete. With many clusters or large amounts of data, avoid running it during business peaks.
:::

## FAQ

### A resource list is always empty

Check in order: whether the resource is listed in **Cluster Cache Settings** (unconfigured resources use direct connection and have no local cache); whether the cluster health status is `ready` (unreachable clusters return empty query results); if the resource was newly added to the cache, click **Restart Full Sync** once on the **Sync Status** page.

### The cache does not work as expected after switching the sync mode

Existing tasks take effect with the new configuration in the next round; however, newly added or removed resources do not generate or clean up tasks automatically. After modifying the cache settings, click **Restart Full Sync** on the **Sync Status** page of each cluster to rebuild the sync tasks and cache according to the latest configuration.

### Resource lists are unavailable after the cluster becomes unreachable

The health status of an unreachable cluster becomes `error` and cache queries return empty results. Once the cluster regains connectivity it returns to `ready` automatically; no action is needed.

### events are still visible after being deleted in the cluster

By default, events are kept for 168 hours after deletion so you can troubleshoot afterwards. Adjust this retention period in **Cluster Cache Settings**.

### Prompt that the resourceVersion has expired (410 Gone)

A 410 Gone means the version number carried by the watch has expired (e.g. after a cluster restart), which is normal. Kuboard re-establishes the watch automatically; no action is needed.

## API Documentation

The interfaces covered in this section are described in the [Swagger UI "Cluster Management" group](../../reference/api).