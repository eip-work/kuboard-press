---
description: "Migrating from Kuboard v3 to v4: cannot be upgraded in place, run side by side, independent licensing, and a step-by-step migration path"
---

# Migrating from Kuboard v3 to v4

Kuboard v3 and v4 are two independent products, and v3 **cannot be upgraded in place** to v4. Clusters must be re-imported into v4, and users, licenses, add-ons, and configurations must be recreated in v4.

This article builds on the "A Note for Kuboard v3 Users" section in [Install Kuboard v4](./index), which covers the basic compatibility conclusions; this article provides the concrete migration steps.

## v3 and v4 Can Run Side by Side

During the migration, v3 and v4 can run side by side without affecting each other:

- **Deployment level**: v3 and v4 are mutually independent. v3 uses built-in storage, while v4 requires its own database instance (MySQL / MariaDB / OpenGauss, choose one). You can deploy the two in different servers or containers, or in different namespaces of the same Kubernetes cluster, accessed via different domains.
- **Cluster level**: The same Kubernetes cluster can be imported into both v3 and v4 at the same time; both versions can manage the cluster normally.
- **Same-named clusters**: If a cluster has the same name in v3 and v4, add-ons are not affected and work normally in both v3 and v4; if the names differ, the add-on resources still remain in the cluster, but you need to re-run the add-on initialization / activation flow in v4.

::: tip About this documentation site
The old v3 documentation site will move to a separate domain, v3.kuboard.cn, separated from the v4 documentation site (this site), so that v3 users can keep reading historical materials.
:::

## v3 and v4 Licensing Are Mutually Independent

v3 license files and v4 licensing are mutually independent: a v3 license cannot be imported into v4, and a v4 license cannot be used in v3. When migrating to v4, you need to obtain and import a license for v4 separately; while v3 and v4 run side by side, each needs its own license. For the differences between the free and Enhanced editions, see [Licensing and Support](../support/).

::: tip
After importing a license file in the v4 UI, you can check its status (Valid / Invalid / Expired) on the license list page; only proceed with subsequent steps once the import is confirmed successful.
:::

## Recommended Migration Path

The migration path is an operational recommendation — validate it against your environment before executing.

1. **Deploy a v4 instance and initialize it**
   Follow [Install Kuboard v4](./index) to prepare the database (MySQL / MariaDB / OpenGauss, choose one), and start v4 per [Quick Start](./quickstart) or [High Availability](./ha). Log in with the default administrator `admin` (default password `Kuboard123`) and change the password immediately.

2. **Import the cluster**
   Import the cluster from the v4 UI. **We recommend keeping the cluster name the same as in v3**, so that add-ons work normally in both v3 and v4; after importing, first verify that the cluster status and synchronization are normal.

3. **Rebuild workload views and cluster resource configuration**
   Reconfigure the display and access of nodes, namespaces, and workloads in v4. Check whether resource types you used in v3 but have not yet validated in v4 (StorageClass, Ingress, gateways, etc.) display correctly in v4.

4. **Check add-on compatibility**
   Go to the v4 **add-on market** and check whether the add-ons you need can be installed / activated; if initialization scripts (e.g., CRD, RBAC) are required, complete the initialization per the add-on documentation before activating.

5. **Migrate users and permissions**
   Recreate users and user groups in v4 and configure authorization rules. v4's authorization model differs from v3's; reconfigure it per v4's authorization approach — see the "Manual Adjustments Checklist" below.

6. **Validate**
   Validate with a regular user account: log in, view clusters, operate workloads, open terminals and logs (dependent on WebSocket — make sure the reverse proxy allows it), and verify that the audit log and MCP (if used) chains work normally.

7. **Take v3 offline**
   After all features pass validation, gradually take the v3 instance offline. We don't recommend stopping v3 before validation is complete — running the two versions side by side is cheap.

## Manual Adjustments Checklist

The following items have **no** automatic migration channel in v4 and must be done manually:

| Item | Description |
| --- | --- |
| Administrator and user system | The initial administrator in v4 is `admin` (default password `Kuboard123`), unrelated to v3 users |
| Users / user groups | Must be recreated in v4, along with authorization rules |
| Authorization rules | v4 uses a simpler authorization model (Kuboard-level / cluster-level authorization rules); re-grant users per v4's approach |
| Cluster import | Clusters must be re-imported into v4, which performs a fresh full synchronization |
| License files | v3 license files cannot be used in v4; obtain and import a separate license for v4 |
| Add-on initialization | Under same-named clusters add-ons are not affected, but you still need to complete add-on installation / initialization / activation per the wizard in v4 |
| External user stores | If v3 integrated external user stores such as LDAP, reconfigure the integration in v4 |
| Reverse proxy / HTTPS / WebSocket | v4 must be mounted at the root path; the terminal and log features depend on WebSocket, so reconfigure the reverse proxy (Nginx / Ingress) |
| Password policy and MFA | If v3 had password expiry or multi-factor authentication (MFA) enabled, set these policies again in v4 |

## Common Migration Mapping Table

| Kuboard v3 | Kuboard v4 | Description |
| --- | --- | --- |
| App store / add-ons | Add-on market | v4 is compatible with v3-version add-ons; installed add-ons exist as resources in the cluster |
| Cluster management | Cluster management (import, edit, sync status) | The same cluster can be imported into both v3 and v4; add-ons are not affected when the cluster name is the same |
| Workloads | Workload management | v4 covers v3's main features and supports cross-cluster / namespace lists and fuzzy search |
| Container terminal / logs | Terminal and logs | Make sure the reverse proxy allows WebSocket |
| Access in-cluster services / Pod ports | KuboardProxy | Corresponding features; configuration is described in the Usage Guide |
| Continuous deployment / image updates | Continuous delivery (update image tags, restart workloads) | v4 provides the corresponding features |
| v3 users / permissions | v4 users / authorization rules | Authorization models differ; must be reconfigured and cannot be migrated |
| v3 license files | v4 licensing | Mutually independent; import the v4 license separately |
| Built-in storage | MySQL / MariaDB / OpenGauss | Completely different storage layers |
| Single-node deployment | Single-node or high-availability deployment | v4 supports high availability; see [High Availability](./ha) |

::: tip
For v3 features not listed in the table, verify them one by one against the v4 UI and the [Usage Guide](../guide/index).
:::

## Version Upgrade vs. Version Migration

These two concepts are easy to confuse, so note the difference:

- **In-version upgrade of v4** (v4.x → v4.y): just change the image tag; the database is migrated automatically by v4 — see [Upgrade Kuboard](./upgrade);
- **v3 → v4 migration** (this article): a migration between two independent products; there is no in-place upgrade channel and you must follow the steps in this article.

## Related Documents

- [Install Kuboard v4](./index) — installation, database preparation, environment variables, reverse proxy, and HA parameters
- [Quick Start](./quickstart) — quickly bring up a v4 instance with docker compose
- [Upgrade Kuboard](./upgrade) — in-version upgrades of v4
- [High Availability](./ha) — v4 high-availability deployment
- [Reverse Proxy](./reverse-proxy) — Nginx / Ingress configuration and WebSocket passthrough
- [Usage Guide](../guide/index) — an overview of v4 features (clusters, workloads, add-on market, etc.)
- [Licensing and Support](../support/) — v4 free / Enhanced edition feature comparison