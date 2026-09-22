---
description: "View Kubernetes Events: filtering, sorting and field meanings of the global event list, recognizing Warning events, jumping from an event to its involved object, and using the event section embedded in resource detail pages"
---

# Events

An Event is a standard Kubernetes resource (apiVersion `v1`, resource `events`) written at runtime by components such as the kubelet, controllers (e.g. Deployment and CronJob controllers) and the scheduler, to record the various state changes that occur in the cluster: image pull failures, container restarts, scheduling failures, node NotReady, persistent volume mount failures, and so on.

Events are different from the **Audit Log**: events reflect **state changes during Kubernetes' own operation**; the audit log records the operations users performed in Kuboard. When troubleshooting, look at events first; for accountability / compliance, see the [Audit Log](../../ops/audit-log).

::: tip Events are "on-the-scene records" — view them and move on
Event objects are automatically cleaned up by Kubernetes (kube-controller-manager recycles them by TTL, about 1 hour by default) and are not retained long-term. When troubleshooting, rely on the events that currently exist, and take screenshots or notes of important observations in time.
:::

Kuboard provides two ways to view events:

1. **Global event list page**: browse all events by cluster / namespace, with filtering and sorting;
2. **Event section embedded in resource detail pages**: open the detail page of a specific resource (e.g. Pod, Service, Deployment) to see only the events related to it.

## Entry

### Global event list page

1. In the left navigation, go to **Ops & Observability → Events**;
2. At the top of the page, select the **Cluster** and **Namespace** (you can also switch to the cluster/namespace tree mode and click through the tree level by level);
3. The list is displayed in descending order by **Creation Time** by default, with the newest events first.

<!-- screenshot-todo: Event list page overview: cluster/namespace selector at the top, expanded filter area (Type = Warning), Type labels and involved object links in the list, Warning rows highlighted in red -->

### Event section in resource detail pages

The detail pages of the following resources carry an **Events** section at the top or in the body, showing events related to the resource (matched by the object's `uid`):

| Resource | Position on the detail page | Notes |
| --- | --- | --- |
| Pod (container group) | First block at the top | [Pod](../workload/pods) |
| Service | Top of the detail page | - |
| Node | The "Events" card in the node overview | [Nodes](../cluster-resources/nodes), including events related to the node's own scheduling / health |
| Deployment / StatefulSet / DaemonSet / CronJob, etc. | Top of the detail frame | Rendered through the unified detail frame, see [Deployment](../workload/deployments) |
| Persistent Volume Claim (PVC) | Top of the detail page | - |
| Other resources rendered through the unified detail frame | Events card at the top of the detail page | e.g. Gateway, Ingress, StorageClass, RBAC, etc. |

## List page: filtering, sorting and fields

The columns of the event list page are as follows:

| Column | Description |
| --- | --- |
| Type | The severity label of the event: `Normal` (green), `Warning` (red); filterable by this column |
| Involved Object | The object the event involves, in the form of a `{kind}` label + `{name}` link; clicking the name jumps to that object's detail page (see below) |
| Reason | The reason code of the event, e.g. `BackOff`, `FailedScheduling`, `ImagePullBackOff` |
| Message | The human-readable description of the reason; truncated with a single-line ellipsis when too long |
| Cluster / Namespace / Name | Basic columns uniformly added by Kuboard |
| Creation Time | The event's `metadata.creationTimestamp`, shown as relative time, sortable |
| Alive Status / Expiry Time | Shown only when the cluster has the resource cache enabled, to distinguish "events still present in the cluster" from "events that have disappeared from the cluster and remain only in the cache" |

Supported filtering:

| Filter | Description |
| --- | --- |
| Type | Drop-down selection of `Normal` / `Warning` (searchable by typing) |
| Name | Fuzzy search by event name |
| Creation Time | Filter by time range (cache mode only) |
| Timezone | Adjusts the display timezone of times; the browser's local timezone is the default |
| Alive Status / Expiry Time | Filter by "Alive / Expired / All" and by expiry time range (cache mode only) |

::: tip Cache mode and pagination
When the cluster has the resource cache enabled (Kuboard caches cluster objects in the background), the event list supports the time range filters above and pagination; for clusters without the cache, Kuboard queries the Kubernetes API directly without pagination, and events are listed in the order the cluster returns them.
:::

## What a Warning event means

There are only two event types, distinguished by Kubernetes' event aggregation logic (the `type` field):

- **Normal**: expected, routine state changes, e.g. "a container was scheduled" (reason `Scheduled`), "image pulled successfully" (`Pulled`);
- **Warning**: an anomaly has occurred and usually requires human attention, e.g. scheduling failure (`FailedScheduling`), image pull failure (`Failed` / `ErrImagePull`), repeated container restarts (`BackOff`), health check failure (`Unhealthy`), volume mount failure (`FailedMount`).

When troubleshooting, switch the Type filter to **Warning**, look at the Warning events first, then expand each one's details (Reason and Message) one by one — you can quickly locate most problems.

## Jumping from an event to its involved object

The **Involved Object** column of the event list shows the resource the event involves (`involvedObject.kind` and `involvedObject.name`):

- Click an object name and Kuboard automatically maps the Kind to a resource type and jumps to the detail page of the corresponding resource (both namespace-scoped and cluster-scoped objects can be jumped to, e.g. [Deployment](../workload/deployments) or [Nodes](../cluster-resources/nodes));
- If the resource has no corresponding detail page in Kuboard, a message "there is no detail page corresponding to this resource in the system" is shown; in that case you can use the inline **YAML** button to view the event's raw object.

<!-- screenshot-todo: Illustration of the jump after clicking an involved object name (e.g. the Pod name involved in a FailedScheduling event) -->

## The event section in resource detail pages

The **event section** on the detail page is headed "**X related events**", and each row from left to right is:

| Column | Description |
| --- | --- |
| Count | The number of occurrences / aggregations of the event (`count`, i.e. the number of repeats) |
| Reason | The reason |
| Time | The most recent occurrence time (`lastTimestamp`; if absent, `eventTime` is used, falling back to `creationTimestamp`) |
| Message | The message (single line, truncated) |

Click any row to expand its full details:

| Field | Description |
| --- | --- |
| Type | `Normal` (blue label) / `Warning` (red label) |
| Reason | The reason code |
| FirstTime | The first occurrence time (`firstTimestamp`) |
| LastTime | The most recent occurrence time (`lastTimestamp`) |
| RepeatCount | The number of repeats (`count`) |
| Source | The event's source component and host, in the form `component@host` (`source.component` / `source.host`), e.g. `kubelet@node-01`; use it to tell which component produced the event |
| Message | The full message |

Visual rules inside the rows:

- **Warning events are highlighted with a red background**, while Normal events have a gray background, so entries with anomalies can be recognized at a glance;
- The page subscribes to event changes via real-time push (SSE): the section auto-refreshes when a new event arrives, and **newly appeared rows flash for about 6 seconds** before returning to normal;
- When there are more than 10 events, the bottom shows "X shown, Y in total" and a **View More** button; click it to keep loading in pages of 10.

<!-- screenshot-todo: Event section at the top of the Pod detail page: Warning rows with red highlight, and the detail fields after expanding a single row (Type/Reason/FirstTime/LastTime/RepeatCount/Source/Message) -->

::: tip The close icon on event rows in the section
The close icon on the right side of each row in the event section can delete the corresponding event (for Warning events you can also check "Clear other error events of this object"), used to clean up redundant records that have expired. Manual deletion is usually unnecessary — Kubernetes recycles expired events automatically by TTL.
:::

## Troubleshooting through events: a typical flow

Taking "the application keeps CrashLoopBackOff after startup" as an example:

1. Enter the detail page of the corresponding [Pod](../workload/pods) and check the event section at the top, or go to the global event list page and filter Type to **Warning**;
2. Find the row with reason `BackOff` / `CrashLoopBackOff` and expand it to view the full Message (e.g. `Back-off restarting failed container`);
3. Click the involved object next to the row's close icon (or click the object name on the list page) to enter the associated resource's detail page;
4. Handle the common root causes according to the Message:

| Common Warning reason | Common root cause and handling |
| --- | --- |
| `FailedScheduling` / `0/3 nodes are available` | Insufficient resources or node selector mismatch, see [Nodes](../cluster-resources/nodes) and the workload's scheduling configuration |
| `Failed` / `ErrImagePull` / `ImagePullBackOff` | The image does not exist, or private registry authentication failed; check the image address and the image pull secret |
| `BackOff` / `CrashLoopBackOff` | The container exits right after starting; check the container logs to locate the application error |
| `Unhealthy` | The readiness / liveness probe failed; check whether the application is listening on the port and path configured in the probe |
| `FailedMount` | Storage volume mount failure; check the PV/PVC and storage plugin status |
| `NodeNotReady` | The node is abnormal; check the kubelet and resource status on the node |

5. After handling, return to the event section: if the row stops growing (Count no longer increases and no new Warnings appear), the problem has been mitigated; since events are recycled by TTL, old events will naturally disappear after a short delay.

## Permission requirements

Viewing events requires the corresponding resource permissions: the global event list page requires the `list` permission on the `events` resource (cluster-scoped or namespace-scoped); the event section embedded in detail pages is hidden without permission, and a button provides an authorization hint to "access the event list associated with this object".

## Related pages

- [Resource Map](./resource-map): view cluster resources in the global topology; events are also one of the troubleshooting entry points
- [Audit Log](../../ops/audit-log): the log of Kuboard user operations, unrelated to Kubernetes events
