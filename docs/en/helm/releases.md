---
description: "Kuboard Helm Release management: view the list and status of installed Helm applications, open the Release detail page to view the overview / revision history / values / manifest / notes, compare two revisions, and uninstall a Release"
---

# Release Management

A Release is Helm's encapsulation of a single installation: one Release corresponds to a set of Kubernetes resources under a Namespace, and every install, upgrade or rollback produces a new revision. This page explains how to view and maintain already-installed Releases. To install a new application, see [Install a Release](./install); for upgrade and rollback, see [Upgrade and Rollback](./upgrade-rollback).

## Entering the Release List

1. In the left navigation, go to **cluster → Application Management → Helm Release**;
2. Click the **Release List** menu item to open the Release list page.

<!-- screenshot-todo: Full view of the Release list page (including the cluster / Namespace selectors at the top, the table columns and the "Install Release" button in the top-right corner) -->

::: tip Permission requirements
Opening the list page requires the `list` permission on the `releases` resource of `helm.kuboard.cn`; viewing details, upgrading, rolling back and uninstalling respectively require the corresponding `get` / `create` / `delete` permissions. Operation buttons you are not authorized for are not shown.
:::

## List Page

At the top of the list page there are two dropdown selectors:

- **Cluster**: defaults to the first cluster the current user can access;
- **Namespace**: defaults to `default`.

After switching the cluster or Namespace, the list refreshes automatically. Releases are isolated by Namespace; Releases with the same name in different Namespaces do not affect each other.

The table columns are as follows:

| Column | Description |
| --- | --- |
| Name | Release name; click to enter the detail page |
| Namespace | The Namespace it belongs to |
| Revision | The current revision number, incremented once for each install / upgrade / rollback |
| Status | Deployment status, shown as a colored tag, see the table below |
| Chart | Chart name |
| Chart Version | Chart version |
| App Version | Application version |
| Updated | The time of the latest update |
| Actions | **Detail**: enters the detail page; **Upgrade**: enters the upgrade page |

### Meaning of Status Tags

Status tags use different colors to distinguish the meanings below:

| Status | Meaning | Color |
| --- | --- | --- |
| `deployed` | Deployed successfully and currently in effect | Green |
| `failed` | Install or upgrade failed | Red |
| `pending` / `pending-install` / `pending-upgrade` / `pending-rollback` | Operation in progress, not yet completed | Yellow |
| `uninstalled` | Has been uninstalled | Gray |
| `superseded` | Replaced by a newer revision (the common status of historical revisions) | Gray |
| `unknown` | Unknown status | Gray |

The **Install Release** button at the top-right corner of the list page is used to install a new application; see [Install a Release](./install) for how to do it.

## Release Detail

Click a Release name or **Detail** in the list to enter that Release's detail page.

<!-- screenshot-todo: Top of the Release detail page (status tag + Chart version / Revision / update time / description + the "Upgrade / Uninstall" buttons at the top right) -->

### Overview

The top of the page shows:

- **Cluster / Namespace / Name / Chart / App Version**;
- The status tag, **Chart Version**, **Revision** and **Updated** (time of the latest update);
- **Description**: when the content is long, only one line is shown; hovering the mouse over it displays the full text.

The top-right corner provides the **Upgrade** and **Uninstall** operation buttons (shown according to permissions).

### Revision History and Comparison

The **Revision History** tab lists the complete revision history of the Release, one revision per row:

| Column | Description |
| --- | --- |
| Revision | Revision number |
| Updated | Time the revision was created |
| Status | Revision status (the revision currently in effect is `deployed`) |
| Chart | The Chart used by this revision |
| Description | Description of this revision |
| Actions | **Rollback to this**: rolls the Release back to this revision (the button of the currently `deployed` revision is disabled) |

<!-- screenshot-todo: Revision history table (with the row checkboxes and the "Compare" button, plus the "Rollback to this" action on each row) -->

To compare two revisions:

1. Check the checkboxes at the start of the rows to select two or more revisions (when multiple are selected, the comparison is between the earliest and the latest revision in the selected range);
2. A **Compare (N)** button appears below the table; click it to open the "Revision Diff" window;
3. At the top of the window you can adjust the **Revision 1 / Revision 2** to compare, and at the bottom there are two tabs:
   - **Values**: the values differences between the two revisions;
   - **Manifest**: the differences between the Kubernetes resource manifests rendered by the two revisions.

<!-- screenshot-todo: Revision Diff window (Revision 1 / 2 selectors + the left-right diff view of the Values / Manifest tabs) -->

For the detailed steps of a rollback, see [Upgrade and Rollback](./upgrade-rollback).

### Viewing values / manifest / notes

The other three tabs of the detail page are all read-only views (a **Copy** button is provided at the top right):

| Tab | Content |
| --- | --- |
| Values | The values configuration of the current revision (YAML) |
| Manifest | The Kubernetes resource manifest actually rendered by the current revision |
| Notes | Usage notes provided by the Chart author (such as access URLs, default accounts) |

::: tip values and manifest of historical revisions
The Revision Diff window loads the values and manifest of the selected revisions on demand, so even for revisions from long ago, you can view and compare their complete configuration.
:::

## Uninstalling a Release

1. Click **Uninstall** at the top right of the Release detail page;
2. In the **Uninstall Release** confirmation dialog, verify the Release name and Namespace, and confirm the message: *this operation will delete all Kubernetes resources managed by this Release*;
3. Click **Confirm Uninstall**.

<!-- screenshot-todo: Uninstall confirmation dialog (with the Release name / Namespace warning and the "Confirm Uninstall" button) -->

There is no additional checkbox in the uninstall confirmation dialog: uninstalling with Helm 3 by default also deletes the Release record together with its revision history (equivalent to the `--purge` of older Helm versions), so there is no "keep the record or not" choice.

### After Uninstalling

- After clicking confirm, you are taken to the **Operation Events** page, which shows the uninstall progress and logs in real time until it completes;
- After the uninstall completes, the Release disappears from the list page;
- Uninstalling cannot be undone; before proceeding, make sure the application is no longer needed, or that a data backup has been made.

::: warning Scope of an uninstall
Uninstalling deletes all Kubernetes resources managed by this Release (Deployment, Service, ConfigMap, etc.), but does not delete resources created externally (not managed by Helm). If you want to keep the Release record for traceability, you can run the `helm uninstall --keep-history` command directly on the cluster.
:::

Long-running tasks such as install, upgrade, rollback and uninstall are all recorded on the [Operation Events](./events) page, where you can review them at any time.
