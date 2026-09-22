---
description: "Workload - Pod section: list and detail page structure, container status and conditions, container probes (livenessProbe/readinessProbe/startupProbe), Web terminal, logs, file browser, debug container (ephemeral container), and deletion notes"
---

# Pod

A Pod is the smallest scheduling unit in Kubernetes. A Pod can contain one or more containers that share the network namespace and storage volumes. In production, Pods are usually managed by controllers (such as Deployment, StatefulSet and DaemonSet), and you rarely need to create or delete a Pod directly. Kuboard's **Pod** page lets you view, diagnose and operate all Pods in the cluster across workloads (Kuboard's Chinese UI refers to Pod by the localized term "container group").

::: tip Terminology
In this article, "container group" and Pod both refer to the Kubernetes Pod object (apiVersion `v1`, resource `pods`). Kuboard's Chinese UI consistently uses the localized term "container group"; this article uses the two terms interchangeably.
:::

## Pods and Workloads

Pods are generally not created directly but are managed by workload controllers:

| Controller | How it manages | Kuboard page |
| --- | --- | --- |
| Deployment / ReplicaSet | Maintains the desired replica count, rolling updates, recreation on failure | [Deployment](./deployments) |
| StatefulSet | Stateful applications, stable network identity and storage | [StatefulSet](./statefulsets) |
| DaemonSet | Runs one replica on each node (or on selected nodes) | [DaemonSet](./daemonsets) |
| Job / CronJob | One-off or scheduled tasks | [Job / CronJob](./jobs-cronjobs) |

At the top of the Pod **detail page** there is a **View owning {kind} {name}** button: Kuboard reads the Pod's `metadata.ownerReferences`; if the owner object is a ReplicaSet (the underlying controller of a Deployment), it navigates to the Deployment page above it; if the owner is a StatefulSet / DaemonSet, it jumps directly to the corresponding workload page.

::: tip Deployments is the recommended entry point for operations
For day-to-day "restarting an application", "scaling" and "rolling updates", operate on the workload page (such as [Deployment](./deployments)); the Pod page is better suited to troubleshooting — inspecting the container status of a specific Pod, its logs, opening a terminal, checking files, and so on.
:::

## Where to Find the Entry

1. Log into Kuboard and enter **Cluster Management → Kubernetes Clusters** in the left navigation (see [Importing a Kubernetes Cluster](../cluster/import) for how to import);
2. Click a cluster to open the cluster page, and select a namespace;
3. Enter the Pod list page under **Workloads → Pod** (the resource page route is `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods`);
4. Click a Pod name to enter its detail page (route `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}`).

You can also jump to this page by clicking a Pod directly on the detail page of a workload such as Deployment or StatefulSet.

## List Page

At the top of the Pod list page you can select a cluster and a namespace (or switch to cluster / namespace tree mode), and filter by searching the name, filtering by creation time, and the **show abnormal Pods first** toggle.

::: tip Implementation notes
The Pod list page is rendered by `K8sObjectList` (empty api-group, resource `pods`, namespaced).
:::

### Columns

| Column | Description |
| --- | --- |
| (checkbox) | For selecting multiple rows for batch deletion |
| Cluster / Namespace / Name | Basic columns added uniformly by Kuboard; a Pod with a deletion timestamp (being deleted) shows a deletion animation on its name |
| Ready | Number of containers in the Ready state / total number of containers in the Pod, e.g. `2/3` |
| Phase | The Pod's `status.phase`, shown as a colored label: `Running` (green), `Succeeded` (blue), `Failed` (red), `Pending` (yellow), `Unknown` (yellow) |
| Restarts | The sum of each container's `restartCount`; if restarts occurred, the relative time of the latest restart is appended, e.g. `3 (2 days ago)` |
| Creation Time | The Pod's `metadata.creationTimestamp` (shown as relative time, sortable) |
| Actions | **Logs/Terminal**, **YAML**, **Delete** |

### Expansion Panel

Click the expand arrow on the left of each row to view two info cards:

- **Pod Info**: Pod IP (`status.podIP`), node (`status.hostIP` / `spec.nodeName`), QoS Class (`status.qosClass`), Service Account (`spec.serviceAccountName`);
- **Containers**: each container's name, image (`container.image`) and container status label — `Running` (green), `Waiting` (yellow), `CrashLoopBackOff` (red); other cases show the waiting / terminated reason.

### Logs / Terminal (Per-Container Quick Actions)

Click the **Logs/Terminal** button in each row to open a panel listing all containers of the Pod: init containers (init) and working containers are shown separately. Each container provides a set of buttons:

| Button | Required permission | Description |
| --- | --- | --- |
| File Browser | `pods/exec create` and the container is started | Opens the [Container File Browser](#container-file-browser) |
| Download Logs | `pods/log get` | Opens the [Historical Log Download](#historical-log-download) dialog |
| Follow Logs | `pods/log get` | Opens the [log page](#real-time-logs) in a new window, URL `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/log?container={container}` |
| Terminal | `pods/exec create` and the container is started | [Web Terminal](#web-terminal), default `bash`, dropdown to switch `sh` / `cmd` / `powershell` |

### Deleting Pods

Pods can be deleted from a list row or after batch selection; the delete action pops up a unified deletion confirmation dialog, see [Deletion Notes for Pods](#deletion-notes-for-pods).

## Detail Page

The Pod detail page is laid out from top to bottom as: events, CPU / memory charts, basic information, conditions, and the container list.

::: tip Implementation notes
The detail page is rendered by `K8sPageFormView` (`view/index.vue`) and refreshes in real time by subscribing to changes of Pod and Event objects over SSE.
:::

### Viewing the Owner & Page Action Buttons

- **View owning {kind} {name}**: navigates to the workload page that manages this Pod (see "Pods and Workloads" above);
- **YAML**: views the complete Pod YAML in read-only mode;
- **Delete Pod**: deletes the current Pod; the prompt reads "After deletion, the controller will create a new Pod, similar to a restart effect";
- **Dropdown menu**: additional actions injected by the `pod-context.extension-point.kuboard.cn` extension point.

If the Pod is being deleted (`metadata.deletionTimestamp` is set), a red label is shown at the top of the page: "This Pod is being deleted. Deletion time: {time}, deletionGracePeriodSeconds: {seconds} seconds".

### Basic Information

| Field | Data source |
| --- | --- |
| Node | `spec.nodeName` (clickable, jumps to the node detail page) + `status.hostIP` |
| Pod IP | `status.podIP`; if an associated Service exists, a DNS name in the form `{podName}.{serviceName}` is shown as well |
| Status | `status.phase` |
| Restart Policy | `spec.restartPolicy` (e.g. `Always`) |

### Conditions

Kuboard displays `status.conditions` sorted in a fixed order: `PodScheduled` → `Initialized` → `PodReadyToStartContainers` → `ContainersReady` → `Ready` → `DisruptionTarget` → `PodResizePending` → `PodResizeInProgress`. Each condition shows:

- A status icon and name: a condition with `True` shows a green icon and its name (e.g. "Scheduled / Initialized / Ready"); one with `False` shows a red icon and "Not scheduled / Not initialized / Not ready" and so on;
- `lastTransitionTime` (the time of the most recent status change);
- The `reason` and `message` shown when a condition is not normal;
- Special handling: when `Ready` and `ContainersReady` have `reason = PodCompleted` (the Pod completed normally), "Pod completed / Containers completed" is shown.

### Container List (Container Details)

The detail page renders **init containers (initContainer)**, **working containers (container)** and **ephemeral containers (ephemeralContainer)** in order; each type of container uses the same container detail card. At the top of the card is the container identifier: a Docker icon + a readiness dot (green when ready) + the restart count, together with a label: `Container` (blue), `Init Container` (green), `Ephemeral Container` (yellow).

Each container card contains the following:

| Section | Description |
| --- | --- |
| Image | `container.image` and the image pull policy `container.imagePullPolicy` |
| Current Status | running / waiting / terminated status labels with StartedAt, FinishedAt, Reason and ExitCode inside the label; plus `Started / Not Started` and `Ready / Not Ready` labels |
| Last Status | A clickable popover showing the previous run state's start / end time, reason, exit code and `ContainerID` |
| Resource Requests/Limits | CPU and memory `requests → limits`; if `amd.com/gpu` or `nvidia.com/gpu` limits are configured, GPU is additionally shown |
| Volume Mounts | Each `volumeMount` shows: read-only / read-write label, `mountPath`, optional `subPath` / `subPathExpr`, `mountPropagation` |
| Environment Variables | Entry icon (click to expand), the viewing entry for `container.env` / `container.envFrom` |
| Command/Args | `container.command` and `container.args` |
| Probes | Startup probe / readiness probe / liveness probe, see [Container Probes](#container-probes) |

::: tip Unconfigured probe and resource hints
The probe icon and resource icon at the top right of a working container card: if the container has no probes or resource requests configured, the icons are shown in a red warning style; clicking them shows "You have not configured readiness and liveness probes" and "You have not configured the container's resource requests and limits".
:::

At the bottom of the card are container-level action buttons: **File Browser**, **Download Logs**, **Follow Logs**, **Terminal** (bash / sh / cmd / powershell dropdown), and a `container-context.extension-point.kuboard.cn` extension point dropdown.

### CPU / Memory Metric Charts

Two metric chart cards (CPU and memory) are shown in the middle of the detail page, provided by Kuboard's built-in **metrics-scraper** (the cluster must have `kuboard/metrics-scraper` and `kuboard/kuboard-metrics-server` installed). If they are not installed, you can jump to the installation in one click.

### Events

At the top of the page, a button labeled "X related events" shows all events associated with this Pod (matched by `metadata.uid`); expanding it lists them in `Count / Reason / Time / Message` columns (count / reason / relative time / message), and the source is shown as well.

::: tip Implementation notes
The events area is rendered by the `EventsRegardingObject` component.
:::

## Container Probes

A probe is the mechanism Kubernetes uses to perform health checks on a container. Kuboard's container detail card provides read-only display of the three probes:

| UI title | spec field | Purpose |
| --- | --- | --- |
| Startup probe | `startupProbe` | Checks during container startup, prevents slow-starting containers from being killed |
| Readiness probe | `readinessProbe` | The container is added to the Service endpoints (traffic distribution) only after the check passes |
| Liveness probe | `livenessProbe` | If the check fails, kubelet restarts the container according to the restart policy |

Probes support three detection methods; Kuboard shows the corresponding type label and parameters:

| Method | Field | Kuboard display |
| --- | --- | --- |
| HTTP request | `httpGet` | Assembled as `{scheme}://${PodIP}:{port}{path}` (scheme defaults to `http`, e.g. `https://${PodIP}:8080/healthz`) |
| TCP connection | `tcpSocket` | Port `port` |
| Command execution | `exec` | Command list `command` (each item shown as a label) |

Shared frequency fields (Kuboard's Chinese labels):

| Field | Description |
| --- | --- |
| `initialDelaySeconds` | Delay time (seconds to delay after the container starts, default 0) |
| `periodSeconds` | Check frequency (seconds between each probe) |
| `timeoutSeconds` | Timeout (seconds before a single probe times out) |
| `successThreshold` | Healthy threshold (consecutive successes required to be considered healthy) |
| `failureThreshold` | Unhealthy threshold (consecutive failures required to be considered unhealthy) |

When no probes are configured, Kuboard shows a "Not configured" label in the corresponding section. Example YAML combining all three probes:

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: my-app
      image: nginx:1.25
      startupProbe:
        exec:
          command: ["/bin/sh", "-c", "test -f /tmp/ready"]
        failureThreshold: 30
        periodSeconds: 10
      readinessProbe:
        httpGet:
          scheme: HTTP
          path: /healthz
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 2
        successThreshold: 1
        failureThreshold: 3
      livenessProbe:
        tcpSocket:
          port: 8080
        periodSeconds: 10
        timeoutSeconds: 1
        failureThreshold: 3
```

::: warning Probe fields are read-only
The probe information on the Pod page is read-only. To modify probes, edit the workload that manages this Pod (e.g. the `spec.template.spec.containers[].probes` of a [Deployment](./deployments)); the configuration change triggers a new Pod recreation.
:::

## Common Operations

### Web Terminal

**Entry**: the **Terminal** button in the "Logs/Terminal" popover of the list page or on the container card of the detail page (requires `pods/exec create` permission and a started container). The terminal page URL looks like `/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/exec?container={container}&shell={shell}&kb_charset={charset}`; the default shell is `bash`, switchable to `sh` / `cmd` / `powershell`.

The Kuboard Web terminal provides the following capabilities:

::: tip Implementation notes
The terminal is rendered by the `K8sTerminal` component, built on xterm.js.
:::

- **Toolbar**: connection status (connecting / connected / disconnected), latency (RTT), clear screen, switch shell, copy / paste / select all, manual reconnect, in-terminal search (Ctrl+Shift+F), charset switch (`ChangeCharset`), font size, theme;
- **Copy/paste shortcuts**: macOS uses ⌘C / ⌘V, other platforms use Ctrl+Shift+C / Ctrl+Shift+V; the right-click menu also offers copy / paste / select all / search / clear / copy URL / reconnect / view logs;
- **Reconnect on disconnection**: when the connection is interrupted, a dialog asks "Reconnect / Do not auto-reconnect again" by default; "Always auto-reconnect" can also be remembered; it reconnects at most 5 times (intervals 5s, 15s, 45s, 45s, 45s);
- **Error hints**: 401/403 no permission, 404 Pod or container does not exist, 409 too many cluster terminal connections, 502 backend unreachable, 1006 abnormal connection drop — all give a hint;
- **Audit notice**: on first entering the terminal, an overlay prompts "Your actions in this terminal will be recorded in the audit log";
- **Command history**: browse the commands previously executed in this container with the arrow keys (persisted across sessions in localStorage);
- **Rendering**: WebGL rendering by default, automatically falls back to Canvas on failure.

The WebSocket connection address is `{ws|wss}://{host}/k8s-ws/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/exec?stdin=true&stdout=true&stderr=true&tty=true&command={shell}&charset={charset}&container={container}&access_token={token}&kb_protocol_type=text`.

### Real-time Logs

**Entry**: the **Follow Logs** button (requires `pods/log get` permission), which opens the log page in a new window (`/k8s/{clusterId}/api/v1/namespaces/{namespace}/pods/{podName}/log?container={container}&kb_charset={charset}`).

The log page follows the log stream in real time over WebSocket (`follow=true`) and supports:

::: tip Implementation notes
The log page is rendered by the `K8sTerminalLogs` component.
:::

- **Real-time follow and pause**: auto-scroll by default; after "pausing the scroll" you can view the cached historical logs;
- **Cache limit**: the page caches at most 10,000 lines of logs; once the limit is reached, the connection is closed automatically (the cached content can still be viewed); display starts from the most recent `tailLines=500` lines by default;
- **Paged browsing**: after pausing the scroll, pressing TAB shows 10 / 20 / 50 / 100 cached lines at a time;
- **Clear logs**, search (Find), charset switch, font size and theme;
- **Charset warning**: in non-UTF-8 encoding modes, the Kubernetes api-server's pods/logs endpoint has re-encoded the output, so Chinese characters in the logs cannot be displayed correctly on this screen; a red hint is shown.

::: tip Jump from the terminal to the logs
Choose "View Logs" in the terminal's right-click menu, or use the toolbar, to open the log page of the same container in a new window.
:::

### Historical Log Download

**Entry**: the **Download Logs** button (requires `pods/log get` permission), which opens the download dialog:

- **Log start time**: supports looking back in "hours + minutes", e.g. "2 hours 30 minutes ago, approximately {time}";
- **Maximum log size**: 1 - 50 Mb (the actual size on the backend is also affected by the cluster configuration);
- After clicking **Start Download**, the frontend streams the log via `GET pods/log` and shows a progress bar; you can click **Abort Download** to cancel during the process;
- The download shows progress statuses: Please click start download / Downloading / Kubernetes is searching for the log content (seeking) / Downloaded successfully / Download error / Only part was downloaded;
- When finished, the log is saved as a browser file named `{namespace}_{pod}_{container}.log`.

::: tip Request parameters
`limitBytes` (maximum size), `container`, `stdout=true`, `stdin=true`, `tty=true`, `follow=false`, `sinceSeconds` (seconds to look back).
:::

### Container File Browser

**Entry**: the **File Browser** button (requires `pods/exec create` permission and a started container). The browser dialog is split into two panes:

- **Left pane**: the file directory tree, with a "show hidden files" option;
- **Right pane**: the current path (breadcrumb), filtering by file name, the file list and action buttons;
- **Top**: cluster / namespace / Pod / container, the current user inside the container (result of a `whoami` probe) and the **character encoding** selection (UTF-8 / GB18030 / GB2312 / GBK).

File list columns: file name (directories can be clicked to enter), attributes (attr), Owner, Group, file size, modified time; sorting and pagination (10/20/50/100) are supported.

The toolbar provides the following actions:

| Action | Description |
| --- | --- |
| Create file / Create folder | Creates in the current directory (touch / mkdir) |
| Copy / Move | Runs `cp` / `mv` on one or more selected files |
| Delete | Deletes selected files or directories |
| chmod | Modifies the permissions of selected files / directories |
| Compress / Extract | A single compressed file (`.gz` / `.tar` / `.tgz` / `.Z` / `.bz2`) can be extracted; other selected items can be compressed |
| Download | Only single-file download is supported |
| Upload | Uploads files to the current directory |
| Edit | Edits text files online (limited to ≤ 1MB, excluding `.zip`/`.tar`/`.gz`/`.jar`/`.bz`/`.rpm`); the edit page can save and return to the previous level |
| Rename | Renames files or directories |

::: tip Character encoding
The file browser and the terminal share the same "character encoding" setting (remembered per cluster / namespace / Pod / container); encodings such as GB18030 are used to display file content correctly in Chinese environments.
:::

### Debug Container (ephemeral container)

A **debug container** is an **ephemeral container** (a Kubernetes 1.23+ feature) injected into a running Pod, commonly used in troubleshooting scenarios: when the main container image has no shell or tools, an ephemeral container carrying common diagnostic tools is injected to share the Pod's network namespace, so that you can troubleshoot the application.

**Entry**: the **Debug Container** button at the bottom of the container list on the Pod detail page (requires `pods update` permission):

- Only available while the Pod is in the `Running` state; otherwise the button is disabled with the hint "The Pod is not in the Running state; ephemeral containers can only be injected while it is Running";
- When the cluster version is below 1.23 (the `pod.ephemeralContainer` capability is not supported), the button is disabled with the hint "The current cluster version is below 1.23; ephemeral containers are not supported";
- If the Pod already has a debug container with the same name, a dialog asks "The Pod already has a running debug container [{names}], are you sure you want to continue injecting?".

The **injection dialog** contains three fields:

| Field | Default value | Description |
| --- | --- | --- |
| Debug image | `nicolaka/netshoot` | The image used by the debug container |
| Shell command | `/bin/sh` | `/bin/sh` / `/bin/bash` / `/bin/zsh` |
| Container name | `debugger-{6-char random string}` | The ephemeral container name (RFC1123) |

After clicking **Inject**, the frontend calls the ephemeral container injection endpoint; once the server completes the injection, the terminal of that ephemeral container is automatically opened in a new window. The container then appears in the container list of the detail page (tagged as an ephemeral container), and you can directly run terminal, logs and other operations on it.

::: tip Injection API
Clicking **Inject** calls:

```sh
POST /api/cluster.kuboard.cn/v4/pods/ephemeral-containers
```

Example JSON request body:

```json
{
  "clusterId": "cluster-abc123",
  "namespace": "default",
  "podName": "my-app-7b5d9f6d8c-abcde",
  "containerName": "debugger-x1y2z3",
  "image": "nicolaka/netshoot",
  "command": ["/bin/sh"],
  "securityContext": { "privileged": true }
}
```
:::

::: tip Troubleshooting a failed injection
Ephemeral containers require the cluster to support the ephemeral container feature (Kubernetes ≥ 1.23). If the injected container stays out of the `Running` state for a long time, it is usually because the image pull failed (e.g. `ImagePullBackOff`, `ErrImagePull`); try again with a different image.
:::

::: warning Lifecycle of a debug container
A debug container cannot be deleted on its own; it is cleaned up together when its Pod is deleted. This conforms to Kubernetes' constraint on ephemeral containers: they exist only within the lifecycle of their owning Pod.
:::

## Deletion Notes for Pods

The entries for deleting a Pod include: the **Delete** button in a list row, the delete button after batch multi-selection, and the **Delete Pod** button on the detail page. All entries pop up the same unified deletion confirmation dialog:

- **Enter the object name**: the complete Pod name must be typed to confirm the deletion (to prevent accidental deletion);
- **GracePeriod**: the termination grace period (seconds), i.e. the time given to containers to exit gracefully;
- **PropagationPolicy**: optional cascade deletion policy.

Before deleting, please note:

::: warning Deleting a Pod terminates all of its containers
Deleting a Pod immediately terminates all containers inside it (the application processes end with it), and in-flight requests may be interrupted. If you want to preserve traffic before confirming the deletion, first make sure the Service / Ingress is ready, or perform a rolling update at the workload level instead of deleting the Pod directly.
:::

- **Pods managed by a workload will be recreated**: the hint on the detail page delete button is "After deletion, the controller will create a new Pod, similar to a restart effect". The new Pod will have a **new name and a new Pod IP**; scenarios that depend on a fixed IP (such as some access-layer whitelists) need attention;
- **Ephemeral containers are cleaned up together**: an injected debug container (ephemeral container) in the Pod cannot be deleted on its own and is cleaned up along with the Pod;
- **Delete at the workload level**: to "restart" an application, run the "Restart" operation on pages such as [Deployment](./deployments), or modify its Pod template to trigger a rolling update, instead of manually deleting Pods and relying on the controller to recreate them;
- If a Pod is being deleted (`deletionTimestamp` is set) but lingers, it is usually because a container did not exit gracefully within the grace period; check the container's handling of SIGTERM.
