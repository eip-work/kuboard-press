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
- **polling (every 5 minutes)**: namespace, node, configmap, secret, persistentvolumeclaim, ingress, networkpolicy, horizontalpodautoscaler, job, cronjob, role, rolebinding, serviceaccount, customresourcedefinition;
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
| Update mode | The current sync mode of this resource (watch / polling / no cache) |
| Items Count | Number of objects of this resource currently in the cache |
| Full Sync | Start time, end time, and status |
| Incremental Sync | Start time, end time, round, and status |

Sync status values are: `created` (task created, waiting to run), `processing` (running), `failed` (failed), `success` (succeeded). Two action buttons are available on the page:

- **Restart Full Sync** (dangerous operation): deletes all sync tasks of the cluster and regenerates them from the current cache settings, running a full sync for each resource — equivalent to rebuilding the cache once;
- **Refresh**: reloads the table data.

### What You See While a Sync Is Running

A full sync of a large cluster can take a long time. During that period the page **refreshes automatically every 5 seconds**, and the Items Count column shows live progress:

- For a resource being synced, Items Count reads "Synced N items (page P)" — N is the number of objects already written to the cache, P is the number of pages fetched;
- The refresh pauses while the page sits in a background tab and resumes with an immediate refresh when you come back;
- Once every resource has finished, the automatic refresh stops.

::: tip Showing 0 items during a sync is normal
Right at the start of a sync — or when another instance is the one running it — the progress numbers are not available yet, so Items Count shows a placeholder instead of 0. That is not a problem; wait for the numbers to appear.
:::

::: warning About Restart Full Sync
This operation changes the cluster import status back to "Importing"; each resource first deletes its old cache, then writes the new data, so the resource list may be briefly empty or incomplete. With many clusters or large amounts of data, avoid running it during business peaks.
:::

## Sync Problems: Limited Sync and Failure Reasons

Besides the normal states, two kinds of markers may show up in the sync list.

### Limited Sync

When a resource has so many objects that Kuboard judges it **cannot complete one full sync within the cluster's change window**, that resource is marked as "Limited Sync".

What it means: the cached data is still readable, but **it is not current** — each full sync expires as soon as it finishes. On the **Cluster Details → Sync Status** page, expand the resource to see a one-line conclusion and the measured evidence:

- **Conclusion**: one full sync takes about N minutes, while this cluster's change window is only about M seconds;
- **Evidence**: current object count X, Y full syncs triggered recently, longest stable period Z minutes.

Kuboard offers three suggestions:

| Suggestion | What it does |
|---|---|
| Switch to direct query (no cache) | The resource is read from the cluster on every request, skipping the local cache. Data is current; the cost is slower lists when you have many clusters. **Always available** |
| Raise the database write capacity | When write throughput is too low, Kuboard states how many rows per second are needed |
| Switch to timed refresh | Suggests a refresh interval based on the measured duration of one full sync (5 minutes minimum) |

The same conclusion also appears on the **Platform Health Diagnostics** page (the "Resource sync is limited" check), in the **Message Center** to-do list, and in the **cache status** pop-up.

::: tip Limited sync is not a failure
The data is still there and you can keep using the last snapshot. If the resource does not need to be real-time anyway, switch it to timed refresh or direct query.
:::

### Sync Failure Reasons

When a sync fails, expanding the resource shows a "Failure Reason" card: **Failure Reason** (a one-line category), **Current Impact** (data still available / no data available), **Possible Causes** (0–2 items), and **What You Can Do** (actionable steps, some of them clickable).

| Failure reason | What it means | What you can do |
|---|---|---|
| Cannot connect to the cluster | Network unreachable, connection refused, TLS handshake failed, or read timeout | Check the cluster address and network |
| Invalid credentials or insufficient permissions | The credentials used to import the cluster have expired or their permissions were revoked | Update the cluster credentials |
| Cluster data changed too fast, this sync was invalidated mid-way | The resource changes often and the data changed while it was being paged through | Retry later (the platform retries automatically) |
| The cluster did not return complete data in time | The cluster timed out or rate-limited the request | Retry later; you can also switch to direct query |
| Internal cluster error | The cluster itself returned an error | Retry later |
| The data returned in one request is too large | A single page exceeds the amount Kuboard can handle | Reduce the page size |
| Database write failed | Database connection, lock, or disk pressure | Raise the database write capacity |
| Could not identify the specific cause | Fallback when none of the above match | Locate the cause in the sync logs |

::: tip Where the raw error is
The "Technical details" section holds the request URL, the status code and the raw response from the cluster — **please include it when reporting a problem**. Everywhere else only shows the categorized conclusion.
:::

## FAQ

### A resource list is always empty

Check in order: whether the resource is listed in **Cluster Cache Settings** (unconfigured resources use direct connection and have no local cache); whether the cluster health status is `ready` (unreachable clusters return empty query results); if the resource was newly added to the cache, click **Restart Full Sync** once on the **Sync Status** page.

### The sync says "succeeded" but objects are missing from the list

Older versions had a defect: full sync was truncated at a fixed page count, and a truncated sync was still recorded as "succeeded" — so the UI showed no problem while the cache was actually missing part of the objects. The current version fixes this: the sync keeps paging until the last page, and any error in between is recorded as a "failed" sync.

If you synced on an older version and then kept using that cache, the missing objects are not added back automatically. Fix: click **Restart Full Sync** once on the **Sync Status** page to rebuild the cache.

### The cache does not work as expected after switching the sync mode

Existing tasks take effect with the new configuration in the next round; however, newly added or removed resources do not generate or clean up tasks automatically. After modifying the cache settings, click **Restart Full Sync** on the **Sync Status** page of each cluster to rebuild the sync tasks and cache according to the latest configuration.

### Resource lists are unavailable after the cluster becomes unreachable

The health status of an unreachable cluster becomes `error` and cache queries return empty results. Once the cluster regains connectivity it returns to `ready` automatically; no action is needed.

### events are still visible after being deleted in the cluster

By default, events are kept for 168 hours after deletion so you can troubleshoot afterwards. Adjust this retention period in **Cluster Cache Settings**.

### Prompt that the resourceVersion has expired (410 Gone)

A 410 Gone means the version number carried by the watch has expired (e.g. after a cluster restart), which is normal. Kuboard re-establishes the watch automatically; no action is needed.

::: tip A slow sync on a large cluster is normal
With a large number of objects a full sync can take a dozen minutes or more; during that time the page refreshes itself and shows the number of items already synced. As long as the number keeps growing, the sync is making progress; only investigate if it stays still for a long time (see the "restart full sync after N minutes without progress" setting above).
:::

## API Documentation

The interfaces covered in this section are described in the [Swagger UI "Cluster Management" group](../../reference/api).