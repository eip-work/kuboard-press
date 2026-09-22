---
description: "Create a debug container (Debug Container / Ephemeral Container) for a faulty Pod/container: entry point, injection parameters, auto-opened terminal, cleanup, and FAQ"
---

# Debug Container

When a container (group) fails to start, behaves abnormally, or you need to inspect its internal state, you can inject a **debug container (Debug Container, i.e. the Kubernetes ephemeral container)** into this **running** container group (Pod). It does **not require modifying the original Pod / image**; after injection it shares the network namespace and storage volumes with the target container, so you can directly use `curl`, `dig`, `tcpdump` and other tools to troubleshoot network, process and file issues. After troubleshooting it disappears together with the Pod, leaving no trace.

::: tip Typical scenario
- The business container image has no `curl`/`dig` or other tools, making it impossible to locate network issues;
- The container keeps restarting (CrashLoopBackOff), and you want to enter its network/file environment for observation without modifying the image;
- You need to temporarily verify a certain port, capture packets, or test connectivity to downstream services.
:::

::: warning Version requirement
Debug containers depend on the ephemeral container capability of Kubernetes 1.23+. When the cluster version is below 1.23, the entry button is grayed out with the hint "The current cluster version is below 1.23, ephemeral containers are not supported".
:::

Entry: **Workloads / Pod detail page**, see below.

## Prerequisites

| Prerequisite | Description |
| --- | --- |
| Cluster version | ≥ 1.23, supports ephemeral containers |
| Target Pod | Must be in `Running` state; terminated (`Succeeded` / `Failed`) or deleted Pods cannot be injected |
| User permissions | Requires **update** permission on Pods (pods); the cluster side must allow the `pods/ephemeralcontainers` operation (the admin built-in role has it by default) |

## Injecting a Debug Container

### Entry point

1. Enter the **Pod detail page** of the target workload and scroll down to the container list area;
2. Below the regular container list, click the **"Debug Container"** button.

<!-- screenshot-todo: "Debug Container" button at the bottom of the container list on the Pod detail page, and the two disabled-button tooltip states (Pod not Running / cluster version too low) -->

Availability hints for the button:

- When the Pod is not in `Running` state, the button is grayed out with the tooltip "The container group is not in Running state; ephemeral containers can only be injected when Running";
- When the cluster version is below 1.23, the button is grayed out with a hint that the version is too low;
- If the Pod has already had a debug container injected, clicking it first shows a confirmation dialog "There is already a running debug container [name] in this container group, continue injecting anyway?", and continues after confirmation.

### Filling in the injection parameters

After clicking **"Debug Container"**, the **Inject Debug Container** dialog pops up. The fields are as follows:

| Field | Default value | Description |
| --- | --- | --- |
| Debug Image | `nicolaka/netshoot` | Debug tool image, ships with `curl` / `dig` / `tcpdump` / `ss` and other troubleshooting tools; can be replaced with another image as needed |
| Shell Command | `/bin/sh` | Dropdown selecting one of `/bin/sh`, `/bin/bash`, `/bin/zsh` |
| Container Name | `debugger-<random suffix>` | The name of the injected ephemeral container; if it has the **same name** as an existing debug container, it is not created again and simply reconnects |

<!-- screenshot-todo: Inject debug container dialog (same as zh ops-debug-container-1.png, capture in English UI) -->

Click **"Inject"** once everything is confirmed.

### Result after injection

The injection process usually completes within seconds; the backend waits for the ephemeral container to enter `Running` before letting it through, therefore:

- After the hint "Debug container injected" appears, the **terminal of the debug container is automatically opened in a new tab**, and you can start typing commands right away;
- Back on the Pod detail page, a new entry labeled **"Ephemeral Container"** appears at the end of the container list (visually distinguished from regular containers); the terminal can be reopened at any time later via the action buttons on this entry;
- The injection operation writes to the [operation audit](./audit-log) log (object: pods/ephemeralcontainers).

<!-- screenshot-todo: Debug container terminal opened automatically after injection (same as zh ops-debug-container-2.png, capture in English UI) -->

## Debugging examples

After opening the terminal (default `nicolaka/netshoot`), the debug container **shares the network namespace** with the target container, so `localhost` and listening ports are identical for both; you can troubleshoot directly:

```sh
# Confirm whether the network is reachable and the port is listening (what you see is the target container's NIC)
ss -tlnp

# DNS resolution troubleshooting
dig +short myservice.namespace.svc.cluster.local

# Access a downstream service
curl -v http://my-service:8080/health

# Capture traffic on the local loopback port
tcpdump -ni lo port 8080
```

In addition, the debug container also shares the target Pod's storage volumes and process information:

```sh
# View target container processes (requires the Pod to have shareProcessNamespace enabled)
ps aux

# View the mounted storage volume contents
ls -la /data
```

Once troubleshooting is done, just close the terminal; no manual cleanup is needed.

## Lifecycle and cleanup

Ephemeral containers are constrained by Kubernetes; they **cannot be deleted or modified individually**, and they follow the lifecycle of the Pod they belong to:

| Scenario | Behavior |
| --- | --- |
| Pod is deleted / recreated | The debug container disappears with it; no extra cleanup needed |
| Click **"Debug Container"** again with a container name identical to an existing debug container | No re-injection; it is reused directly and the terminal is opened for you (equivalent to "reconnect") |
| Want to open another brand-new debug container | Change the container name to a different one in the dialog and inject it (a single Pod can have multiple debug containers at the same time) |

::: warning Don't rely on the debug container to save data
The debug container is temporary and is lost when the Pod is recreated; if you need to persist troubleshooting information, use the file browser to download it or forward it to an external location.
:::

## FAQ

| Symptom / hint | Cause | Handling |
| --- | --- | --- |
| Button grayed out: "The current cluster version is below 1.23, ephemeral containers are not supported" | Cluster too old (DC_004) | Upgrade the cluster, or use [NodeShell](./nodeshell) and other methods to troubleshoot |
| Hint "Pod does not exist" | Pod has been deleted (DC_001) | Confirm the target Pod name and Namespace |
| Hint "Pod has terminated, cannot inject an ephemeral container" | Pod is `Succeeded` / `Failed` (DC_002), or the ephemeral container failed to start (image pull failure, not ready within 60 seconds, shell exited early) | Go back to the list to confirm the Pod status; if image pull fails, switch to a pullable debug image and retry; if the shell exited early, inject once more |
| Hint of a same-name debug container conflict (DC_003) | Usually handled automatically by the "same-name reuse" logic | Should not occur in normal scenarios; if it does, retry with a different container name |

## How it works

::: tip How it works (optional background)
- Under the hood it calls Kubernetes' **ephemeral containers** capability and injects via the `pods/ephemeralcontainers` subresource, which is why K8s ≥ 1.23 is required; injection does not modify the original Pod's containers definition.
- The injected ephemeral container **shares the network namespace and storage volumes** with the target container; the frontend opens a `/bin/sh` terminal via `exec`, and forcibly enables `stdin` + `tty` so that the shell stays alive.
- Kuboard's built-in debug defaults (image `nicolaka/netshoot`, namespace `kube-system`, keep-alive command `sleep infinity`, session TTL 3600 seconds) come from the cluster configuration file and can be adjusted in the cluster configuration; the default image in the dialog is `nicolaka/netshoot`, and it can be overridden as needed at actual injection time.
:::

## Related pages

- [Terminal](./terminal): the regular entry point for container group / container terminals, suitable for cases where the container itself can be entered;
- [NodeShell](./nodeshell): when the container cannot be entered, create a debug Pod from the node side to troubleshoot;
- [Operation Audit](./audit-log): see who injected a debug container and when.