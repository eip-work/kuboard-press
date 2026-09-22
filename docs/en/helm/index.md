---
description: "Kuboard built-in Helm (Application Management): overview of the Chart marketplace, Release install / upgrade / rollback, and the operation event stream"
---

# Helm (Application Management)

Kuboard ships with built-in **Helm** application management, covering the Chart marketplace (browse, search, manage repositories), Release install / upgrade / rollback, and the operation event stream — completing the full lifecycle management of Helm applications without leaving Kuboard.

## Feature List

| Capability | What you can do | Page |
|---|---|---|
| Marketplace browsing | Browse and search **Charts (installable packages)** like an app store, view versions, README and default values | [Browse Charts](./marketplace) |
| Repository management | Add / edit / delete Helm repositories (Chart Repository), manually refresh the index | [Repository Management](./marketplace) |
| Install a Release | Select the target cluster and namespace, configure values, then install the Chart | [Install a Release](./install) |
| Release list | View the running status and revision history of installed applications, jump into details quickly | [Release List](./releases) |
| Release details | View values / manifest / notes, compare any two revisions | [Release Details](./releases) |
| Upgrade and rollback | Adjust values to upgrade the application, or roll back to a historical revision | [Upgrade and Rollback](./upgrade-rollback) |
| Operation event stream | Watch the execution events and progress of long-running tasks such as install / upgrade / rollback in real time | [Operation Event Stream](./events) |

## Where to Start

All Helm features are gathered under a single entry in the left navigation:

1. Select the target **cluster** in the left navigation;
2. Expand the **Application Management** group (Helm icon);
3. Click the **Helm Release** submenu.

Once opened, two entries are always shown in the menu: **Release List** and **Browse Charts**. Pages such as install, details, upgrade, rollback, and events are not shown in the menu; you reach them via the buttons on the list page and the details page.

<!-- screenshot-todo: screenshot of the menu after expanding "cluster → Application Management → Helm Release" in the left navigation -->

## Scope

- **Release-related features** (list, details, install, upgrade, rollback, events) are **namespace-level** resources: isolated and authorized by "cluster × namespace", Releases with the same name in different namespaces do not affect each other;
- **Chart marketplace and repository management** are **Kuboard-level** resources: globally visible within the entire Kuboard instance, independent of any specific cluster or namespace.

## Quick Start

Install and manage your first Helm application in three steps:

1. **Browse the marketplace and pick a Chart.** Go to **cluster → Application Management → Helm Release → Browse Charts**, search for or filter by category to find the target Chart, open the details page to view versions, README and default values, then click **Install** to enter the install page.

2. **Install into a namespace.** On the install page, select the target cluster and namespace, modify values as needed (you can run a dry-run check first), submit and wait for the installation to complete; while the installation is in progress, open the [Operation Event Stream](./events) to watch the result of each step in real time.

3. **Manage in the Release list.** Go back to **Release List**, where you can see the newly installed application and its status; subsequent viewing of revisions, comparison, upgrade, rollback, and uninstall are all done here (or on the details page).

::: tip Permission notes
Accessing Helm features requires permissions on the `helm.kuboard.cn` resources (e.g. `list` / `create` / `get` / `delete` on `releases`). When you are not authorized, the corresponding entry is hidden or the button is grayed out; contact the Kuboard administrator to be assigned the permissions.
:::

For detailed operations on each page, refer to [Browse Charts](./marketplace), [Install a Release](./install), [Release List and Details](./releases), [Upgrade and Rollback](./upgrade-rollback), and [Operation Event Stream](./events).
