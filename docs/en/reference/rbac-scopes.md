---
description: "Kuboard authorization scopes (RBAC Scopes): what the kuboard / cluster / namespace three-level scopes each govern, how permissions are organized and take effect, configuration entry and operation steps, usage suggestions, the relationship with K8s RBAC, and how to verify the effect"
---

# Authorization Scopes (RBAC Scopes)

This page introduces Kuboard's authorization scopes (Scope): what each of the three levels governs, how to authorize a role to a group of users, and how to verify the effect after authorization. Configuring authorization requires platform-level permission and is intended for administrators.

## The Three Levels of Scopes

A scope defines "in which range permissions take effect after a Role is bound to a User Group". There are three levels:

| Scope | Level | Controlled objects |
| --- | --- | --- |
| kuboard | Kuboard platform level | Kuboard's own objects: users, user groups, roles, system configuration, audit, authorization files, cluster onboarding, etc. |
| cluster | Kubernetes cluster level | Resources across namespaces within a cluster: nodes, namespaces, storage classes, CRDs, etc. |
| namespace | Kubernetes namespace level | Resources within a namespace under a cluster: workloads, Service, ConfigMap, Helm Releases, etc. |

## How Permissions Are Organized and Take Effect

```text
User → User Group → Role (with scope type) → Permissions (bound to a specific cluster / namespace)
```

Among these, two "scopes" must be distinguished:

| Concept | What it is | Where it is determined |
| --- | --- | --- |
| Scope type | The role's own level; selected from the UI dropdown when the role is created, displayed read-only on the detail page | When the role is created |
| Binding scope | When the role is bound to a user group, which specific cluster / namespace it takes effect on | When the role is bound to a user group |

A user's final permissions = the union of the permissions of **all roles** bound to **all user groups** the user belongs to. A user can simultaneously hold authorizations at different scopes without affecting each other. For example: Zhang San's dev-group is bound to `admin-namespace` (managing resources in the dev namespace of Cluster A), and his ops-group is bound to `viewer-cluster` (read-only viewing of all cluster-level resources); both sets of permissions take effect as a union.

## Where to Configure It in the UI

| Page | UI path | Purpose | Docs |
| --- | --- | --- | --- |
| User Management | System Settings → Permissions → Users | Create users, add users to user groups, view a user's final permissions | [Users](../user/users) |
| User Group Management | System Settings → Permissions → User Groups | Batch authorization: bind roles to groups, view group permissions | [User Groups](../user/groups) |
| Role Management | System Settings → Permissions → Roles | Create roles, configure permission rules | [Roles](../user/roles) |

To authorize a group of people, the typical operation is done on the **user group detail page**:

1. Go to **System Settings → Permissions → User Groups**, click the user group to enter its detail page, and open the "**Bounded Roles**" tab.
2. Click "**Add Group-Role Binding**"; the binding dialog pops up.
3. Select the **scope type**, and select the binding objects according to the type:

   | Scope type | What to select | Possible values |
   | --- | --- | --- |
   | kuboard | Nothing to select | — |
   | cluster | Bound clusters | Multi-select: specific clusters, or check "Any Cluster" |
   | namespace | Bound cluster + bound namespaces | Select a cluster first, then check multiple namespaces; either can be set to "Any" |

4. Select the **role**. The dropdown only lists roles matching the selected scope type: a kuboard-level role can only be bound with the kuboard scope, a cluster-level role can only be bound to clusters, and a namespace-level role can only be bound to "cluster + namespace".
5. Click "**Confirm**". The binding record appears in the list, and **all members of the user group immediately gain** the corresponding permissions.

## Usage Suggestions: Which Level for Which Scenario

| Scenario | Suggested scope | How |
| --- | --- | --- |
| Platform administrator (manages users, roles, system configuration, cluster onboarding) | kuboard | Bind the built-in `admin-kuboard` role; no cluster selection needed |
| Cluster operations (manages the nodes, namespaces, storage, etc. of a cluster) | cluster | Bind the built-in `admin-cluster` / `viewer-cluster`, bound to a specific cluster or "Any Cluster" |
| Business team (only works within its own namespaces) | namespace | Each team is bound to its own cluster and namespaces |
| Read-only audit / reporting | Any | Bind the corresponding `viewer-*` role (e.g. `viewer-namespace`) for read-only viewing |

**Typical approach for namespace-level authorization** (one team per namespace):

1. Create a user group, e.g. `dev-team`, and add the team members to it.
2. Use the built-in `admin-namespace` role, or create a custom namespace-level role according to the team's responsibilities.
3. In "Bounded Roles" on the user group detail page, select the **namespace** scope → select cluster `cluster-a` → check namespaces `dev-a` and `dev-b` → select the role.
4. After the group members log in, they can only see the resources of the `dev-a` and `dev-b` namespaces under `cluster-a`; other clusters and other namespaces are invisible to them.

::: warning Use "Any" with caution
"Any Cluster" and "Any Namespace" are wildcards: once selected, the authorization takes effect on all currently and future onboarded clusters / namespaces. Only use them when truly needed (e.g. platform administrator, global read-only), to avoid the risk of unauthorized access beyond scope.
:::

## Relationship with K8s RBAC

| Comparison item | Kuboard authorization scope | Cluster K8s RBAC |
| --- | --- | --- |
| What it governs | Who can use Kuboard to manage which clusters / namespaces | Who inside the cluster can perform which operations on which resources |
| Configuration location | System Settings → Permissions (Kuboard UI) | Cluster Resources → Cluster RBAC (Kuboard is only the management entry) |
| Objects it takes effect on | Kuboard login users | ServiceAccounts / users inside the cluster |

The two are **mutually independent and can be combined**: the Kuboard scope determines in which range of objects you can see and operate in the Kuboard UI, while the cluster K8s RBAC determines the access control on the cluster side. Kuboard displays and manages cluster RBAC as a type of cluster-level resource — assigning someone the management permission of K8s RBAC is itself an authorization at the cluster scope.

## Verifying the Effect

1. **The left menu is trimmed by scope after logging in again**: kuboard-scope menus (Permissions, [System Settings](./system-config), etc.) are visible only after obtaining platform-level authorization; cluster / namespace-scope menus are shown only according to the clusters / namespaces covered by the authorization, and unauthorized clusters do not appear in the cluster selector.
2. **Page buttons show or hide by operation verb**: the get / list / create / update / delete in the role's rules decide whether the user sees the detail, create, edit, and delete buttons on each resource page.
3. **Check the rules in the "Has Access Privileges" tab**: open "Has Access Privileges" on the user detail page (or the user group detail page); the final rules are listed grouped by scope type + cluster → namespace, and hovering over each permission shows its authorization source (which user group / role it comes from), making it easy to trace and troubleshoot.
4. **Permission changes take effect immediately**: after saving role permissions or adjusting group bindings, the member's next request is judged against the new rules; no restart is needed.
