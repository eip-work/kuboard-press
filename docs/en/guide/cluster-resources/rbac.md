---
description: "Kubernetes native RBAC objects (Role / ClusterRole / RoleBinding / ClusterRoleBinding): view and manage them in Kuboard — entry, create forms, security assessment and verification"
---

# Kubernetes RBAC (Role / ClusterRole / RoleBinding / ClusterRoleBinding)

Kubernetes **RBAC (Role-Based Access Control)** objects define "who can do what on which resources" inside a cluster, enforced by the kube-apiserver. This page covers the four objects under **Cluster Resources → Kubernetes RBAC** in Kuboard:

| Resource | Scope | Purpose | Typical use |
| --- | --- | --- | --- |
| Role | Namespace | Defines a set of permissions **within one namespace** | A "workloads read-write" role for a team inside a namespace |
| ClusterRole | Cluster | Defines a set of permissions **cluster-wide or across namespaces** | Cluster admin, read-only nodes, CRD management |
| RoleBinding | Namespace | Binds a Role or ClusterRole to **subjects**, effective only in that namespace | Bind the "dev role" above to a user |
| ClusterRoleBinding | Cluster | Binds a ClusterRole to subjects, effective **cluster-wide** | Bind "cluster read-only" to all authenticated users |

**Subjects** can be a user (User), a group (Group) or a service account (ServiceAccount); after binding, the apiserver authorizes based on the role's rules (`apiGroups` / `resources` / `verbs`). Kuboard provides full list / detail / create / edit / delete for all four.

::: tip Difference from Kuboard's own authorization model
This menu manages **access control inside the Kubernetes cluster**, which is **fully independent** from Kuboard's own authorization (user → group → role → binding scope, see [Authorization Scopes](../../reference/rbac-scopes)). Platform authorization controls "who can log in to Kuboard and which clusters / namespaces they see"; Kubernetes RBAC controls "what a user can do with cluster resources". The two are usually used together.
:::

## Entry

**Cluster Resources → Kubernetes RBAC**, split into four lists: **Roles / Role Bindings / Cluster Roles / Cluster Role Bindings**. The lists, details, create and edit pages all reuse the generic resource pages (see [Resource List Pages](../ui/object-list) and [Resource Detail Pages](../ui/object-detail)).

::: tip Data channel
Roles and Role Bindings are cache-synced (roughly every 5 seconds) and support pagination. Cluster Roles and Cluster Role Bindings are not cached — the list queries the cluster API directly, so the data is real-time but cannot be paginated.
:::

## Create a Role / ClusterRole

1. Go to **Cluster Resources → Kubernetes RBAC → Roles** (or **Cluster Roles**), click **Create**, choose **Create from form**;
2. Fill in the form:

| Area | Field | Description |
| --- | --- | --- |
| Metadata | Name | Required. Role: a DNS label (lowercase letters / digits / `-` / `.`, max 63 chars). ClusterRole: a DNS subdomain (max 253 chars) |
| | Labels | Optional key/value pairs |
| Rules `rules[]` | API groups | e.g. `(core)`, `apps`, `batch`; multiple allowed; `*` = all API groups |
| | Resources | e.g. `pods`, `deployments`; multiple allowed; `*` = all resources |
| | Verbs | e.g. `get` / `list` / `watch` / `create` / `update` / `delete` / `patch`; multiple allowed; `*` = all verbs |

   E.g. read-only Pods: API group `(core)`, resources `pods`, verbs `get` / `list` / `watch`. Click **+ Add** to append more rules (rules are OR'ed — any match grants).

3. Click **Save**, confirm in the **Preview YAML**, then submit.

```sh
kubectl get roles -A            # list Roles across all namespaces
kubectl get clusterroles        # list Cluster Roles
```

## Create a RoleBinding / ClusterRoleBinding

1. Go to **Cluster Resources → Kubernetes RBAC → Role Bindings** (or **Cluster Role Bindings**), click **Create**, choose **Create from form**;
2. Fill in the form:

| Area | Field | Description |
| --- | --- | --- |
| Metadata | Name | Required |
| | Namespace | The namespace where the binding applies (read-only); Cluster Role Bindings are cluster-scoped and omit this |
| Subjects `subjects[]` | Kind | User / Group / ServiceAccount |
| | Name | The subject name, e.g. `alice`, `dev-team`, `my-sa` |
| | Namespace | The service account's namespace (when subject kind is ServiceAccount) |
| Role reference `roleRef` | Role kind | Role or ClusterRole |
| | Role name | The referenced role name |

3. Click **Save**, confirm in the **Preview YAML**, then submit.

::: warning The role kind decides the effect scope
- A **RoleBinding** can reference a **Role** in the same namespace, or a **ClusterRole** (the permissions then take effect within that namespace only);
- A **ClusterRoleBinding** can only reference a **ClusterRole**, and takes effect across the whole cluster — make sure that is the granularity you want.
:::

## Security assessment on the list

The binding list flags high-risk bindings directly (expand a row to see subject details and the role reference):

| Flag | Meaning |
| --- | --- |
| Anonymous access | The binding includes `system:anonymous` / `system:unauthenticated` subjects, allowing anonymous or unauthenticated access — extremely risky; consider removing |
| All authenticated access | The binding includes `system:authenticated`, so every authenticated user in the cluster can access — consider narrowing to an explicit subject list |
| Cluster-scope warning | A ClusterRoleBinding applies to the whole cluster; keep the binding as small as possible |

## Verify

After saving, authorization is enforced immediately by the kube-apiserver (Kuboard only writes the objects; it does not intercept). Use the commands below to double-check the expected result:

```sh
kubectl auth can-i --as=alice get pods -n dev
kubectl auth can-i --as=alice list deployments -n dev
```

## Related Pages

- [Authorization Scopes (Kuboard platform authorization)](../../reference/rbac-scopes): the difference from, and interplay with, Kubernetes RBAC
- [Resource List Pages](../ui/object-list) / [Resource Detail Pages](../ui/object-detail): common operations on lists and details