---
description: "Step-by-step tutorial for granting a user access to a specific cluster and namespace: create users / groups / roles, bind roles to groups, add users to groups, verify access"
outline: [2, 3]
---

# Grant a User Access to a Cluster & Namespace

This page is an end-to-end walkthrough: starting from "let a new user access a specific namespace on a specific cluster", it ties together the concepts you need to know in Kuboard (**users / user groups / roles / binding scope**). If you only want to authorize an **existing user**, you can skip "Step 1" and start from "Step 2".

**Audience**: Kuboard administrators.

## Goal & Prerequisites

**Goal**: User `alice` has administrative permissions in the Kubernetes cluster `prod-cluster`, namespace `alice-ns` (view Pods, deploy workloads, view logs, etc.).

**Prerequisites**: you are logged in to Kuboard as `admin`, and `prod-cluster` has already been imported into Kuboard (see [Import a Cluster](../guide/cluster/import)).

Authorization in Kuboard follows four steps:

1. Create a user (a user is a login account) — see [Step 1](#step-1-create-a-user);
2. Create a user group, then add the user to it (the group is what gets authorized) — see [Step 2](#step-2-create-a-user-group) + [Step 5](#step-5-add-the-user-to-the-user-group);
3. Create a role (a role defines *what* the user can do) — see [Step 3](#step-3-create-a-role);
4. Bind the role to the group and specify the binding scope (which cluster / which namespace) — see [Step 4](#step-4-bind-the-role-to-the-user-group).

Skip whichever step is not needed (user / group / role already exist).

## Step 1: Create a User

**Path**: System Admin → Users & Permissions → Users → **Add User**.

Fill in:

- **Username**: `alice` (the login name, Latin letters and digits, immutable);
- **Initial password**: keep the default `Kuboard123` (the user is prompted to change it on first login);
- **Full name**: `Alice Anderson` (display only);
- **Source**: keep `Kuboard built-in user`.

Click **OK**. The user appears in the user list with status "pending first login".

## Step 2: Create a User Group

**Path**: System Admin → Users & Permissions → User Groups → **Add Group**.

Fill in:

- **Name**: `alice-group` (Latin letters and digits, immutable);
- **Description**: "Alice's working group";
- **Group admin binding scope**: choose **Any** (the Group Admin is Kuboard's built-in admin role, which spans all clusters).

Click **OK**. You are taken to the group detail page.

## Step 3: Create a Role

**Path**: System Admin → Users & Permissions → Roles → **Add Role**.

Fill in:

- **Name**: `alice-namespace-viewer` (role name, immutable);
- **Description**: "Alice's viewer permissions in cluster alpha-namespace";
- **Scope type**: choose **namespace** — one of the three scopes in Kuboard that controls "which cluster / which namespace":
  - **kuboard** — Kuboard platform objects (users, roles, etc.);
  - **cluster** — cluster-scoped, cross-namespace resources (Nodes, Namespaces, etc.);
  - **namespace** — namespaced resources (Pods, Deployments, ConfigMaps, etc.).

Click **OK**. You are taken to the role detail page; open the **Permissions** tab and check the actions you want alice to perform. Suggested baseline:

- `pods` (core): `get`, `list`, `watch`;
- `pods` (core): `create`, `exec` (terminal & logs);
- Common workloads: `apps/deployments`, `apps/statefulsets`, `apps/daemonsets`, `batch/jobs`, `batch/cronjobs` — `get`, `list`, `watch`, `create`, `update`, `delete`;
- Config: `configmaps`, `secrets` — `get`, `list`, `watch`, `create`, `update`, `delete`;
- Service: `services` (core) — same;
- `events` (core): `get`, `list`, `watch` (for troubleshooting).

Leave everything else unchecked (least privilege). Click **Save Permissions** to take effect immediately.

::: tip What each verb means
`get` view detail; `list` enumerate; `create` create; `update` modify; `delete` remove. Changes take effect the moment you save.
:::

## Step 4: Bind the Role to the User Group

In the role detail page, open the **Associated User Groups** tab and click **Add User-Group Role Binding**:

- Select `alice-group`;
- **Bound Cluster**: choose **prod-cluster** (do NOT choose "Any" — only this cluster);
- **Bound Namespace**: choose **alice-ns** (do NOT choose "Any" — only this namespace).

Click **OK**. The binding list shows one row with scope `prod-cluster / alice-ns`.

## Step 5: Add the User to the User Group

In the user group detail page, open the **Associated Users** tab and click **Add User Member**:

- Select `alice`;
- Click **OK**.

At this point, **user `alice` inherits the `alice-namespace-viewer` role permissions in `prod-cluster` / `alice-ns` via group `alice-group`**.

## Step 6: Verify

Have alice open the Kuboard login screen in a browser and log in with `alice` / `Kuboard123`:

1. On first login, alice is prompted to change the password — enter a new one and submit;
2. On the home page, the **Clusters** section in the left menu should show `prod-cluster`;
3. Click into `prod-cluster` and into the resource list: `alice-ns` should appear; click into it and you should see Pods, Deployments, etc.;
4. Navigating into other namespaces (e.g. `kube-system`) should be rejected (403 / not found).

If `prod-cluster` doesn't appear, the binding scope is the usual suspect: go back to the role detail page → **Associated User Groups** tab and double-check **Bound Cluster** / **Bound Namespace**.

::: tip How to check multiple roles
A user's final permissions are the **union of all role bindings**. In the user detail page → **Effective Permissions** tab, see the full derived authorization with the source role of each entry on hover. Debug in this order: is the user in the group? → is the group-role binding present and enabled? → does the binding scope cover the target cluster / namespace? → are the role permissions complete?
:::

## Related Documentation

- [User management](./users)
- [User groups](./groups)
- [Roles & permissions](./roles)
- [RBAC scope reference](../reference/rbac-scopes)

## API Reference

The APIs involved in this page live in the **Auth API** group of [Swagger UI](../reference/api).