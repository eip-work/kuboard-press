---
description: "View the real-time event stream during Helm Release installation, upgrade, rollback, and uninstall, to observe progress and identify the causes of failures"
---

# Release Operation Events

Install, Upgrade, Rollback, and Uninstall are all executed **asynchronously** in Kuboard: the operation returns immediately after submission, while the actual work is done by a helm CLI subprocess in the background. The **Operation Events** page is the "live window" of this background execution — it shows helm's execution logs, the status of the involved resources, and the overall progress in real time.

## Entry

The Operation Events page is a hidden route; it does not need to be (and cannot be) entered from the menu. After submitting an operation on any of the following pages, the browser automatically navigates to the events page:

| Source page | Operation | After submission |
| --- | --- | --- |
| Install Release ([./install](./install)) | Install | Automatically navigates to the events page |
| Upgrade / Rollback ([./upgrade-rollback](./upgrade-rollback)) | Upgrade or Rollback | Automatically navigates to the events page |
| Release list ([./releases](./releases)) | Uninstall | Automatically navigates to the events page |

The page URL after the navigation looks like:

```text
/helm/events/<clusterId>/<namespace>/<releaseName>?sessionId=<sessionId>
```

Here `sessionId` is the session identifier of this background operation; the events page uses it to find the event stream of the corresponding operation on the server.

<!-- screenshot-todo: Full screenshot of the events page: connection status tag at the top, progress bar, resource status list, dark log panel -->

When the operation finishes, two buttons appear at the top right of the page:

- **View Release** — navigates to the detail page of this Release
- **Back to Releases** — returns to the Releases list

## Event Stream Display

### What You See

The events page is divided into four sections from top to bottom:

1. **Connection status tag** — the current state of the event stream:

   | Status | Meaning |
   | --- | --- |
   | Connecting | Establishing the event stream connection |
   | Connected | Event stream established, receiving events in real time |
   | Completed | Operation ended successfully (green) |
   | Failed | Operation ended with a non-zero exit code (red) |
   | Canceled | Operation was canceled by the user |

2. **Progress bar** — shows `elapsed seconds / timeout seconds` (default timeout is 300 seconds). When the run exceeds 90%, the progress bar turns yellow, warning that it is about to time out.

3. **Resource status** — the resources currently created and their readiness:

   | Resource | Shown content |
   | --- | --- |
   | Deployment | Status (Ready / Progressing) and the replica count `ready/total` |
   | Pod | Status (Pending, Running, ImagePullBackOff, CrashLoopBackOff, etc.) |

   When a Pod is in an abnormal status, hover over the warning icon next to the status to view the specific reason (message).

4. **Log panel** — dark terminal-style helm execution output that scrolls line by line in real time and automatically scrolls to the latest line:

   - Normal output: grayish white
   - helm execution log (LOG): blue
   - Failure information (FAILED): red
   - Completion information (COMPLETED): green
   - The panel shows at most the latest **500 lines**

### How Events Are Produced

Every background operation produces a series of events (Event). The main types are as follows:

| Event type | Description |
| --- | --- |
| STARTED | Operation started (e.g. `Helm install started`) |
| LOG | Each line output by the helm CLI (stdout and stderr merged) |
| HEARTBEAT | Periodic heartbeat carrying the elapsed time and the timeout, used to drive the progress bar |
| RESOURCE_STATUS | Periodically collected resource status snapshots (Pod / Deployment) |
| COMPLETED | Operation ended successfully (exit code 0) |
| FAILED | Operation failed (non-zero exit code) |
| CANCELED | Operation canceled by the user (exit code 137) |

::: tip Real-time refresh mechanism
The events page subscribes to the event stream through a long-lived **SSE (Server-Sent Events)** connection. Once the connection is established, the server first replays the historical events already produced by this operation, then pushes new events in real time — so refreshing the page during the operation does not lose any logs. The corresponding server endpoint is `GET /{clusterId}/namespaces/{ns}/releases/{name}/events` (`produces = text/event-stream`).
:::

## When to Use

### Observing Long-Running Operations

When installing a large Chart, or when `wait` is enabled and the operation needs to wait for resources to become ready, the operation may last for several minutes. In this case:

1. After submitting an install / upgrade, you automatically enter the events page.
2. Watch the **progress bar** to confirm the operation is still running (heartbeats keep being pushed and the time keeps increasing).
3. Watch the **resource status**: when a Deployment changes from `Progressing` to `Ready` and a Pod becomes `Running`, the resources are ready.
4. After the status tag turns **Completed**, click **View Release** to enter the details.

### Locating the Cause of Failures

When an operation fails (the status tag turns red), the cause is usually recorded in two places:

| Symptom | Where to check |
| --- | --- |
| Template rendering errors, Chart validation failures | Red FAILED messages in the log panel (error details output by helm) |
| Resources never become ready, the wait times out | Resource status: Pod stuck in `ImagePullBackOff` (image pull failure) or `CrashLoopBackOff` (container crashed on startup); hover to view the message |

### Canceling an Operation

While an operation is in progress (status is **Connected**), you can click **Cancel Operation** at the top right and confirm:

- The background helm process is terminated, the event stream ends with `CANCELED` (exit code 137), and the page status changes to **Canceled**.
- The page warns: resources created before the cancellation will **not be automatically deleted**; please clean them up manually.

::: warning
Canceling an operation essentially terminates the background process; it does not clean up the resources already created. After canceling, go to the cluster to confirm and clean up any leftover resources.
:::

## Notes

- **Events are a real-time stream during the operation**: events are only produced while the background operation is alive. If you open the events page directly after the operation ends without a `sessionId`, you will see the message "No active session found. The operation may have completed."
- **Connection dropped**: when the event stream is interrupted due to network fluctuations, the status tag shows **Failed**. Refresh the page to resubscribe and replay the historical events of this operation.
- **Log limit**: the log panel only keeps the latest 500 lines; earlier output is truncated.
- **Timeout**: the progress bar is computed as `elapsed / timeout` and turns yellow beyond 90%. After a timeout, the background helm subprocess is forcibly terminated and the operation ends as failed.
- **The final result is determined by the Release**: whether the operation succeeded can ultimately be confirmed in the Release details and Revision comparison ([./releases](./releases)).
