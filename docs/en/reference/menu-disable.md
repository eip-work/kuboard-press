---
description: "In System Settings → Menu Item Settings, check or uncheck resource types to globally hide or restore K8s resource and feature entries in the left menu; takes effect immediately after saving"
---

# Menu Item Settings (Disabling K8s Resource Entries)

By default, the left menu shows 56 K8s resource entries, and most teams do not need all of them. This page explains how administrators can **globally hide (disable)** certain resource or feature entries to streamline the left menu.

**Who this applies to**: administrators. Disabling only hides the menu entry; it does not affect the resources in the cluster, nor does it perform any permission check. For access permission control, use [RBAC Permission Settings](./rbac-scopes).

## Entry Point

Log in as an administrator, go to **Settings → System Settings**, and select the **Menu Item Settings** tab on the left side of the page. On entry, a resource tree matching the left menu structure loads automatically — every tree node has a checkbox, and at the bottom are **Save / Cancel / Reset** buttons.

## UI Elements

| Element | Meaning |
| --- | --- |
| Checkbox | Checked = show the entry; unchecked = hide the entry |
| "Core" badge | Core resources (such as Node and Deployment) are forced to show, cannot be disabled, and have no checkbox |
| "Locked" badge | Non-K8s menu items that cannot be disabled; shown as a hint only |
| Search box | Quickly locate a tree node by resource name (Chinese/English) |

## Disabling a Resource Entry

Using hiding the "VolumeSnapshot" entry as an example (to restore it, do the opposite: re-check the checkbox and save):

1. Type "snapshot" in the search box, or expand the **Storage** group to find **VolumeSnapshot**;
2. **Uncheck** its checkbox (the entry now enters the pending-disabled list; not yet in effect);
3. Click **Save**, and the page prompts "Saved successfully";
4. Refresh the page, and the entry disappears from the left menu.

::: tip The two buttons before saving
**Cancel** discards this round of checkbox changes; **Reset** reloads the latest configuration from the server. Both discard unsaved changes (they do not restore factory defaults).
:::

## When the Change Takes Effect

**Saving takes effect immediately, with no service restart needed** — refresh the page to see the change. The configuration applies uniformly to everyone and all clusters; a disabled resource itself keeps running normally, only its entry is hidden. The dynamic menu of custom resources (CRDs) is not affected by this setting.

## Default Disabled Items

On the very first start after a fresh installation, the following 5 categories of low-frequency resources are hidden by default (from then on, the configuration you save takes precedence):

| Category | Disabled by default (21 resources in total) |
| --- | --- |
| Storage snapshots and CSI | VolumeSnapshot, VolumeSnapshotClass, CSIDriver, CSINode, CSIStorageCapacity, VolumeAttachment |
| Scheduling and running | RuntimeClass, PriorityClass, Lease |
| Cluster advanced components | EndpointSlice, PodDisruptionBudget, FlowSchema, PriorityLevelConfiguration |
| Admission control | Mutating/Validating Webhook Configurations, ValidatingAdmissionPolicy and its Bindings |
| DRA (Dynamic Resource Allocation) | ResourceClaim, ResourceClaimTemplate, ResourceSlice, PodSchedulingReadiness |

Default hiding likewise only hides the menu entry. For example, the VolumeSnapshot is hidden by default; when you need it, simply uncheck it and save to restore it — see [Storage Snapshots and CSI](../guide/config-storage/) for the related operations.

## Typical Use Cases

- **Streamline the left menu**: when you only use common resources such as Deployment, Pod, and Service, uncheck advanced low-frequency resources such as RuntimeClass, FlowSchema, and Lease all at once and save.
- **Hide the CSI snapshot entries when the plugin is not deployed**: in clusters without the CSI snapshot plugin, entries such as "VolumeSnapshot" are empty or report errors when clicked; disable them directly.
- **Hide low-frequency feature entries**: [Helm Release](../helm/releases), [Resource Map](../guide/ops/), and the cluster's "Common Operations" entries can be hidden together.

## Notes

- **Core resources cannot be disabled**: resources with the "Core" badge have no checkbox and are always shown.
- **Disabling is not permission control**: the route of a hidden entry still exists; users who know the full URL can still access it; use RBAC if you want to block it completely.