---
description: "Kuboard real-time event push (SSE): automatic UI refresh and real-time alerts, subscribable event topics, disconnection/reconnection and reverse proxy requirements, and broadcast in multi-instance deployments"
---

# Real-time Event Push (SSE)

After you log in to Kuboard, the browser keeps a long-lived connection to the server, which pushes cluster resource changes, K8s events, session states, and more to the UI in real time; the corresponding areas refresh automatically or flash a reminder.

## Real-time Behavior on the UI

Pages such as resource detail pages have a **connection icon button** on the toolbar (next to the refresh button), whose color reflects the connection state:

<!-- screenshot-todo: SSE connection icon in the resource detail page toolbar (same as zh sse.assets/ops-sse-1.png, capture in English UI) -->

- **Green** = connected, **orange** = closing, **red** = disconnected;
- When a new event arrives, the icon flashes for about 1.5 seconds, indicating "there is a new event";
- Click the icon to open the **event listener panel**.

<!-- screenshot-todo: The "Event Listener" panel opened by clicking the SSE connection icon (with the toggle, listening state, total/relevant event counts, and the most recent 10 events) -->

| Panel content | Description |
| --- | --- |
| Listening state | Connecting / Connected / Closing / Closed |
| Event listener toggle | When turned off, no more pushes are received and the page falls back to manual / scheduled refresh |
| Total events listened | Number of all events received by the current connection |
| Relevant events | Number of consumed events related to the topics subscribed by the current page |
| Latest event list | The most recent 10 relevant events, showing resource type (Kind), name, and the ADDED / MODIFIED / DELETED indicator |

Besides the panel, SSE also drives the following "no need to click refresh" experiences:

| Scenario | UI behavior |
| --- | --- |
| Resource detail page | When the displayed resource changes (including operations from other terminals / `kubectl`), the page automatically reloads its data |
| "Events" card on the resource detail page | When an associated K8s Event is added, the list refreshes automatically and the new event row flashes with a highlight for about 6 seconds |
| Node terminal NodeShell | Debug session state changes automatically from **Starting** to **Running** (container ready), or to a failed state on failure |
| AI change approval | The change-plan states in the approval list (approved, rejected, application progress, etc.) refresh in real time |

<!-- screenshot-todo: The highlighted flashing of a new event row in the "Events" card on the resource detail page, or the real-time session state change in the node terminal -->

## Which Real-time Events Can You Subscribe To

::: tip Topic format
Every push belongs to a **topic**, which consists of five segments: `scope # cluster # namespace # API group # resource type`. List / detail pages subscribe to the corresponding topic automatically according to the resource you are browsing; no manual configuration is needed.
:::

| Topic characteristics | Topic | Trigger | UI impact |
| --- | --- | --- | --- |
| Cluster-scoped resources (Node, ClusterRole, etc.) | `cluster/<cluster>#<kind>` | Cluster-level resource created / modified / deleted | The corresponding list / detail page refreshes automatically |
| Namespace-scoped resources (Pod, Deployment, Service, ConfigMap, etc.) | `namespace/<cluster>/<namespace>#<kind>` | Resource change within that namespace | The corresponding page refreshes automatically |
| K8s Event | `namespace/<cluster>/<namespace>#Event` | Event associated with the viewed object added | The "Events" card on the detail page refreshes automatically with a flashing hint |
| Node terminal session | `cluster/<cluster>#node-shell` | Debug session created, ready, failed, cleaned up | The node terminal banner updates its state automatically |
| AI change approval | `kuboard#default#change-plan` | Approval / application progress of a change plan changes | The change approval list refreshes in real time |

::: tip K8s events bell
The "K8s events" list in the **notification bell** at the top-right is currently based on **scheduled polling** (Warning events are pulled approximately every 20 seconds), not SSE real-time push; when you need real-time Warning event alerts, watch the real-time-refreshing "Events" card on the corresponding resource detail page.
:::

## Disconnection, Reconnection and the Reverse Proxy

The long-lived connection occasionally drops (network jitter, server restart, browser sleep, etc.), and Kuboard **reconnects automatically** without any intervention. Two pitfalls to watch out for:

- **The reverse proxy must enable WebSocket**: when you access Kuboard through a reverse proxy such as Nginx, the proxy configuration must enable the upgrade (Upgrade / Connection headers) for WebSocket endpoints, otherwise the connection stays stuck on "Connecting"; see [Reverse Proxy Configuration](../install/reverse-proxy);
- **Login token expiry**: after the long-lived connection is established, the frontend renews the token periodically, so the connection does not drop due to authentication expiry even if you stay on the page for a long time.

::: warning Notes for HA deployments
In a multi-instance deployment, each instance maintains its own browser connections. Deployments that use a Redis cache automatically switch to **Redis pub/sub broadcast**: when any instance receives a cluster change, it writes it to a Redis channel, and the other instances subscribe to it and push it to their own connected browsers, keeping the data all users see consistent. In a single-node deployment (default in-memory cache), events are dispatched directly within the same process, requiring no extra configuration.

See [Installation Configuration](../install/) and [HA Deployment](../install/ha).
:::