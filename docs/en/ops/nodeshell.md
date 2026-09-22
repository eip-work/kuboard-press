---
description: "Node Shell: enter the node's operating system directly in the browser to run commands without SSH or kubectl; session start, open terminal, stop and global configuration"
---

# Node Shell

Node Shell lets you enter the operating system of a Node directly in the browser and run commands — view processes, check disks and network, modify files, and more — without SSH and without installing `kubectl`.

**Intended audience**: cluster operators and platform engineers who need to troubleshoot node issues. If you only want to enter a **running Pod** for debugging, see [Debug Container](./debug-container).

<!-- screenshot-todo: Shell button in the node detail page toolbar (same as zh ops-nodeshell-1.png, capture in English UI) -->

## Prerequisites

- The target node is in **Ready** state, and the account has permission to update nodes (only then is the **Shell** button shown in the toolbar) and to create / delete Pods in the debug namespace (default `kube-system`), see [Cluster Resources](../guide/cluster-resources/);
- The cluster can pull the debug image (default `nicolaka/netshoot`); in offline environments, use an image from an intranet image registry instead, see [Global Configuration](#global-configuration).

## Starting a Node Shell

1. Enter the cluster, click the target node in **Nodes** in the left navigation, and click the **Shell** button in the toolbar at the top-right of the node detail page;
2. In the **Start Node Shell** dialog, modify the fields as needed (the defaults are usually fine), and click **Confirm Start**.

<!-- screenshot-todo: Start Node Shell dialog (same as zh ops-nodeshell-2.png, capture in English UI) -->

After you confirm, the dialog closes and a **Node Shell session** banner appears at the top of the node detail page. The session first shows **Starting** — the backend is creating a debug container on the target node, and the first image pull may be slow — then changes to **Running** once ready, at which point you can click **Open Terminal**.

### Dialog Fields

| Field | Description | Default |
| --- | --- | --- |
| Debug Image | Image used to create the debug container | `nicolaka/netshoot` |
| Namespace | Namespace of the debug container; it must exist and you must have permission to create in it | `kube-system` |
| Container Name | Usually no need to modify | Auto-generated `node-shell-<node name>-<random suffix>` |

## Opening the Terminal and Running Commands

In the **Node Shell session** banner, click **Open Terminal** on the right of the session item (available when the status is Running), and an interactive terminal opens in a new browser tab. Copy / paste, search, command history and other operations are the same as in the [Container Terminal](./terminal).

<!-- screenshot-todo: Node Shell session banner (same as zh ops-nodeshell-3.png, capture in English UI) -->

Inside the terminal is the debug container, whose operating system is the same as the node's: the debug container runs in privileged mode and shares the host's process / network namespaces, with the host root directory mounted at `/host`, so commands behave almost as if you were operating the node system directly. Common operations:

| What you want to do | Run in the terminal |
| --- | --- |
| View the node's file system | `ls /host`, `cat /host/etc/...` |
| View host processes | `ps aux` |
| View disks and mounts | `df -h /host` |
| Network connectivity troubleshooting | `ping`, `curl`, `nc` |
| Modify files on the node | `vi /host/etc/...` |

## Stopping a Session and Lifecycle

- **Manual stop**: click **Stop** on the session item in the banner and confirm; the debug container is deleted and the session ends immediately;
- **View Pod**: click **View Pod** to jump to the debug Pod detail page, where you can view events and logs;
- **Auto cleanup on expiry**: a session lives at most **3600 seconds (1 hour)** by default and is cleaned up automatically on expiry; the remaining time is shown in the **Age** in the banner;
- **Still manageable after refresh**: a session exists as a background Pod in the cluster; after refreshing the page, the banner still lists the active sessions and you can continue to manage them.

## Global Configuration

Administrators adjust the defaults applied to the entire Kuboard instance in **System Configuration → Node Shell** (they take effect for newly created sessions only):

| Configuration item | Description | Default |
| --- | --- | --- |
| Image | Debug container image | `nicolaka/netshoot` |
| Command | Container start command, keeps the container alive for entry | `sleep infinity` |
| Namespace | Namespace of the debug container | `kube-system` |
| Session duration (seconds, TTL) | Maximum lifetime of a session | `3600` |
| Resource limits (Requests / Limits) | CPU / memory requests and limits | requests `100m` / `128Mi`; limits `500m` / `512Mi` |

## Troubleshooting Startup Failures

| Symptom | Error code | Common cause | Resolution |
| --- | --- | --- | --- |
| Message "Node NotReady or does not exist" | 40001 | Node is NotReady / removed | Retry after the node returns to Ready |
| Fails after staying in Starting for a long time | 50001 | Debug container creation timed out (first image pull is slow) | Retry with an image that can be pulled quickly from the intranet and contains the required debugging tools |
| Image pull failure (ImagePullBackOff / ErrImagePull) | 50002 | Image is not in a registry reachable from the cluster, or the registry requires authentication | Use an image from a reachable registry, or pull it manually on the node first to verify |
| No permission message | — | Missing create / delete Pod or update node permission | Contact the administrator to adjust permissions |

::: warning Privileged containers carry risk
The debug container runs in privileged mode and mounts the host root directory, holding system permissions equivalent to those of the node. Only grant trusted personnel access to Node Shell, and **stop** the session promptly after troubleshooting.
:::
