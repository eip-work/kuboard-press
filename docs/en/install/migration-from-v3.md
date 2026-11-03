---
description: "Migrating from Kuboard v3 to v4: the built-in migration wizard, preparation, post-migration tasks, unsupported items, and side-by-side deployment"
---

# Migrating from Kuboard v3 to v4

Kuboard v3 and v4 are two independent products; v3 **cannot be upgraded in place** to v4. v4 ships a built-in **Migrate from v3** wizard that migrates v3 **users, groups, roles, first-stage (Kuboard) authorizations, branding and login policy**, and reads each cluster's **Kubernetes RBAC (second-stage authorization)** to rebuild it as v4 authorization rules.

Clusters must be re-imported into v4, and **you must supply the cluster credentials yourself** — v3 deliberately does not return kubeconfig / tokens through its API.

::: tip In one sentence
The wizard migrates "people and permissions"; cluster credentials, licenses, MFA and access keys must be configured again.
:::

## v3 and v4 Can Run Side by Side

During the migration, v3 and v4 can run side by side without affecting each other:

- **Deployment level**: v3 uses built-in storage, while v4 requires its own database instance (MySQL / MariaDB / OpenGauss). You can deploy them on different servers / containers, or in different namespaces of the same Kubernetes cluster, accessed via different domains.
- **Cluster level**: the same Kubernetes cluster can be imported into both v3 and v4; both versions can manage it normally.
- **Same-named clusters**: if a cluster keeps the same name, add-ons are unaffected; if the names differ, add-on resources still exist in the cluster but must be re-initialized / activated in v4.

::: tip About this documentation site
The old v3 documentation site will move to a separate domain, v3.kuboard.cn, separated from the v4 documentation site (this site).
:::

## Before You Start

Please prepare the following:

| Item | Notes |
| --- | --- |
| **v3 address** | `scheme://host[:port]` only, no path. Tick "Skip TLS certificate verification" for self-signed certificates |
| **v3 administrator credentials** | Prefer username / password mode (a v3 admin that can read all users and permissions). Add the 6-digit code if MFA is enabled |
| **v3 access key (optional)** | If v3 uses external SSO / LDAP, password mode may not work. Create an AK/SK under v3 "Profile → Access keys" and use the access key mode |
| **kubeconfig or ServiceAccount Token per cluster** | v3 never returns cluster credentials. Prepare a credential that can reach the apiserver directly; v3 agent clusters also need a reachable apiserver address |
| **RBAC read permission** | Second-stage authorization reads RoleBinding / ClusterRoleBinding. The credential needs `list` on those resources, otherwise the wizard warns that cluster RBAC cannot be migrated automatically — you can skip it |
| **v4 license** | v3 licenses cannot be used for v4; request one in advance |
| **v4 configuration backup** | Export a configuration backup before migrating, so you can roll back if needed |

## Using the Migration Wizard

In v4 go to **Settings → Migrate from v3** and follow the 7 steps:

1. **Connect to v3** — enter the address and credentials, click "Test connection". The wizard shows counts of users / groups / roles / bindings / clusters in v3 (counts are a **lower bound**: only objects readable by the given account are counted).
2. **Select content** — everything is selected by default; unsupported items are greyed out with an explanation.
3. **Cluster credentials** — enter a kubeconfig or ServiceAccount Token for each v3 cluster and validate it (or "Validate all"). Clusters can be skipped explicitly.
4. **Cluster RBAC (second stage)** — the wizard reads each cluster's Kubernetes RBAC and translates it into v4 roles and group-role bindings. **Rows for matched subjects are selected by default**; you can unselect rows, and map unmatched subjects to existing v4 groups.
5. **Diff preview** — shows what will be created / updated / unchanged / conflicting / skipped, plus the "manual actions" list. Nothing is written to v4 yet.
6. **Apply** — after confirmation, clusters are imported first, then users / groups / roles / bindings. Cluster RBAC runs in its own transaction and rolls back entirely on failure, with a retry entry.
7. **Report** — lists migrated / skipped / manual actions / unsupported items / next steps, and lets you download a JSON report and the v4 configuration snapshot.

::: tip Idempotent
The wizard can be re-run: existing objects are mostly "unchanged", **passwords of existing users are never reset**, and roles / bindings are not duplicated. Run it once after all validations pass.
:::

::: tip Do not let users start using v4 mid-migration
Re-running compares against v3 data; if users already changed permissions in v4, importing old data again may overwrite those changes.
:::

## After Migration

| Task | Notes |
| --- | --- |
| **Tell users to change their password** | Migrated users start with `Kuboard123` and are forced to change it on first login |
| **Complete cluster credentials** | Clusters without credentials or with failed validation must be completed in v4 "Cluster management"; wait for the full sync to finish |
| **Review second-stage authorization** | Degraded rules / aggregated roles / unmatched subjects in the report need manual grants in v4 |
| **Reconfigure SSO / LDAP / OIDC** | Login integrations are not migrated; configure them in v4 "Settings → User login settings" |
| **Request and import a v4 license** | v3 licenses cannot be used in v4 |
| **Re-bind MFA** | MFA is not migrated; users re-bind it under "Profile" |
| **Recreate access keys (AK/SK)** | v3 access keys are not migrated (administrators cannot list them); create new ones in v4 and update MCP / CI configuration |
| **Reconfigure audit policy** | v3 audit policy and history are not migrated; configure audit rules again in v4 |
| **Verify** | Sign in as a regular user: change password, browse clusters / namespaces, open terminal and logs (requires WebSocket). Decommission v3 only after verification |

## What Is Not Migrated

The following has no readable API in v3 or no equivalent in v4, and must be rebuilt manually:

| Item | Reason | What you need to do |
| --- | --- | --- |
| **v3 license** | Product policy: v3 / v4 licenses are not interchangeable | Request and import a v4 license |
| **User passwords** | The v3 API never returns passwords | Sign in with the initial password and change it immediately |
| **MFA** | v3 stores plaintext seeds / recovery codes, incompatible with v4 TOTP + bcrypt | Users re-bind MFA in v4 |
| **v3 access keys (AK/SK)** | Scoped to the v3 user; administrators cannot list them | Recreate in v4 and update MCP / CI configuration |
| **Audit policy / logs** | Different structure and storage (v3 history lives in a time-series DB) | Reconfigure in v4; archive old logs separately if needed |
| **Access gateway (KuboardAccessGate)** | v4 has no equivalent | Accept the loss |
| **SSO / LDAP / OIDC configuration** | v3 uses environment variables plus a built-in SSO; v4 configures login sources separately | Reconfigure in v4 |
| **User preferences (default page / favorites / act-as)** | v4 has no storage for them | Users set them again |
| **K8s object cache / addon state** | Cache is rebuilt from the apiserver; addon state lives in the cluster | Wait for the v4 sync; re-initialize addons per their docs |

**Kubernetes RBAC rules that cannot be expressed in v4** are skipped and listed in the report, including:

- rules limited by `resourceNames`;
- `nonResourceURLs` (e.g. `/healthz`, `/metrics`);
- verbs v4 does not support: `use` / `bind` / `escalate` / `impersonate`;
- empty rules or roles that rely on `aggregationRule` (usually need manual review).

In such cases the wizard **grants less rather than more**; complete them from the "manual actions" section of the report.

::: warning Cluster name length
v4 requires cluster names of 3–24 characters. A v3 cluster name outside that range still migrates (direct DB write), but must be renamed before editing it in the v4 UI.
:::

## v3 and v4 Licensing Are Mutually Independent

v3 license files and v4 licensing are mutually independent: a v3 license cannot be imported into v4, and a v4 license cannot be used in v3. While v3 and v4 run side by side, each needs its own license. For the differences between the free and Enhanced editions, see [Licensing and Support](../support/).

## Failure and Rollback

1. **Before migrating**: export a configuration backup in v4 (a snapshot of the current state) and keep v3 running.
2. **If migration fails**:
   - metadata import is a **single transaction** and rolls back entirely;
   - cluster import is **isolated per cluster** — failures are not persisted and are listed in the report;
   - cluster RBAC import rolls back entirely by default and does not affect migrated metadata.
3. **Full rollback**:
   - import the pre-migration backup with `replace` mode + overwrite (this deletes objects created by the migration — review the impact first);
   - or rebuild the v4 database (the migration tool only reads v3; v3 is unaffected).
4. **Decommissioning v3**: only after every user can sign in, cluster sync is healthy and second-stage authorization has been reviewed.

## FAQ

**The wizard cannot connect to v3.**
Make sure the **v4 backend** can reach v3 (not the browser); tick "Skip TLS certificate verification" for self-signed certificates; enter only scheme, host and port.

**v3 uses SSO / LDAP, so password mode does not work.**
Use the access key (AK.SK) mode: create one under v3 "Profile → Access keys" and paste the AK/SK.

**Cluster validation fails.**
Check that the kubeconfig / Token is complete, the apiserver is reachable from the v4 backend, and tick "skip hostname verification" for self-signed certificates. v3 agent clusters must provide a directly reachable apiserver.

**Cluster validation succeeds but it says RBAC cannot be read.**
The credential lacks permission to list RoleBinding / ClusterRoleBinding, so second-stage authorization cannot be migrated automatically. Skip cluster RBAC for that cluster or retry with a credential that can read RBAC.

**A migrated user sees nothing after signing in.**
Check that the user's group is enabled, the group has role bindings, and the second-stage authorization was reviewed. Refresh the page, or ask an administrator to clear the authorization cache from "Platform health" and retry.

**Does the migration overwrite the existing v4 admin?**
No. v3's built-in `admin` is skipped, and neither the v4 `admin` nor any existing user has its password reset.

## Version Upgrade vs. Version Migration

Two easily confused concepts:

- **v4 upgrade** (v4.x → v4.y): change the image tag; v4 migrates the database automatically. See [Upgrade Kuboard](./upgrade).
- **v3 → v4 migration** (this article): migration between two independent products via the wizard plus manual completion of unsupported items. There is no in-place upgrade path.

## Related Documents

- [Install Kuboard v4](./index) — installation, database, environment variables, reverse proxy, HA
- [Quick start](./quickstart) — bring up a v4 instance with docker compose
- [Upgrade Kuboard](./upgrade) — in-place v4 upgrades
- [High availability](./ha) — v4 HA deployment
- [Reverse proxy](./reverse-proxy) — Nginx / Ingress and WebSocket
- [User guide](../guide/index) — v4 feature overview
- [Licensing and Support](../support/) — free vs. Enhanced editions