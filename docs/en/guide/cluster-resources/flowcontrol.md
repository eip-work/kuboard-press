---
description: "Cluster Resources - Flow Control (APF priority and fairness): the entry for Flow Schemas and Priority Level Configurations (hidden by default, enable it in Menu Item Settings), how it works, create/edit form fields and YAML (matching rules, queueing policy), the detail page, built-in objects and version notes"
---

# Flow Control (Flow Schema and Priority Level Configuration)

Flow Control is the built-in overload protection mechanism of the Kubernetes API Server; its kernel is APF (Priority and Fairness). When a large number of requests arrive at the API Server at the same time, APF **classifies** requests according to rules defined by the administrator, then assigns concurrency quotas and queueing policies per class, so that important requests get priority, system requests are never starved, and a single tenant cannot occupy all the concurrency.

Kuboard splits this mechanism into two kinds of **cluster-scoped** resources to manage:

| Resource | Menu | Purpose | One-line summary |
| --- | --- | --- | --- |
| FlowSchema | Flow Schemas | **Classifies** requests: identifies a class of requests by matching rules and assigns it to a priority level | "Which class does a request belong to" |
| PriorityLevelConfiguration | Priority Level Configurations | **Rate-limits** the classified requests: defines the concurrency shares available to this level, and whether requests that exceed the limit queue or are rejected | "How much quota does this class have" |

The two work together: when a request arrives at the API Server, the rules of all flow schemas are checked in turn in matching precedence order; the first flow schema that matches classifies the request and hands it over to the priority level it references for queueing or rate limiting.

::: tip When do you need to care about it
Kubernetes ships with a set of built-in rules after installation; by default they already keep the API Server running stably. You only need to customize these two kinds of resources when you want to grant priority to specific workloads, users or request types (for example: protecting critical control-plane requests, or limiting a namespace that floods the API with requests).
:::

## Entry Location

1. Log in to Kuboard and locate **Cluster Resources → Flow Control** in the resource tree on the left;
2. The group has two menus: **Flow Schemas** and **Priority Level Configurations**.

::: warning Hidden by default; enable it in the system configuration first
`flowcontrol.apiserver.k8s.io/flowschemas` and `flowcontrol.apiserver.k8s.io/prioritylevelconfigurations` are **disabled** by default in Kuboard, and the two entries cannot be seen in the resource tree.

To enable: go to **System Settings → Menu Item Settings**, check the corresponding items in the resource tree and save, then refresh the cluster page — they will appear.
:::

Both kinds of resources are cluster-scoped (there is no namespace concept); lists are displayed per cluster; Kuboard supports viewing details, editing, creating, and creating from YAML for both of them.

## Flow Schema

### How It Works: How Requests Are Classified

A flow schema defines "which class of request", with two key fields:

- **Matching precedence (matchingPrecedence)**: the smaller the number, the earlier it matches. When a request arrives, the API Server behind Kuboard checks the rules of all flow schemas in descending matching precedence order; the **first matching** flow schema takes effect;
- **Priority level reference (priorityLevelConfiguration.name)**: the matched flow schema hands the request over to this priority level for queueing or rate limiting.

In addition, a flow schema can further distinguish request sources within the same priority level through **distinguisherMethod** (ByUser / ByNamespace), achieving fair allocation within the level.

### List Page

The flow schema list reuses Kuboard's generic resource list; main columns: cluster, name, creation time; rows provide YAML (view / edit the object's YAML), Delete and other actions; the header provides a **Create (+)** button.

### Creating a Flow Schema

1. On the flow schema list page, click **Create (+)** in the top-right corner; the "Create flowschemas object" dialog pops up;
2. **Cluster**: select the target cluster (only clusters that are Ready, and for which you have creation permission, are listed);
3. **Creation method**: choose "From Form" or "From YAML";
4. When creating from a form, fill in the following fields and click **Save**; Kuboard pops up a **YAML preview** showing the FlowSchema object that is about to be submitted;
5. Confirm and submit; on success you are automatically taken to that flow schema's detail page.

Create form fields:

| Field | Corresponding field | Description |
| --- | --- | --- |
| Name | `metadata.name` | Unique within the cluster |
| Priority Level Configuration | `spec.priorityLevelConfiguration.name` | The name of the priority level referenced (referenced by name), required |
| Matching Precedence | `spec.matchingPrecedence` | Matching precedence, the smaller the number the earlier it matches; default 1000, range 1–10000 |

::: tip Define matching rules (rules) in YAML
The create form only covers the three most common fields: name, priority level and matching precedence. To define **matching rules (rules)** (matching subjects + verbs + resources + namespaces) or **distinguisherMethod**, choose "From YAML" in the create dialog, or after creating, click the **YAML** button on the list / detail page to edit the object.
:::

Example of creating a Flow Schema from YAML:

```yaml
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: FlowSchema
metadata:
  name: demo-flow-schema
spec:
  priorityLevelConfiguration:
    name: workload-high
  matchingPrecedence: 1000
  distinguisherMethod:
    type: ByUser
  rules:
    - subjects:
        - kind: ServiceAccount
          serviceAccount:
            name: default
            namespace: default
      resourceRules:
        - apiGroups: [""]
          apiVersions: ["v1"]
          resources: ["pods"]
          verbs: ["*"]
        - apiGroups: ["apps"]
          apiVersions: ["v1"]
          resources: ["deployments"]
          verbs: ["get", "list"]
          namespaces: ["frontend"]
```

Key points of the `rules` structure:

| Fragment | Description |
| --- | --- |
| `subjects` | The request subjects matched; `kind` is User / Group / ServiceAccount, delimited respectively by `user.name`, `group.name`, and `serviceAccount.name` + `serviceAccount.namespace` |
| `resourceRules` | Matching for resource requests: `apiGroups` + `apiVersions` + `resources` + `verbs`; can be further delimited by `namespaces` |
| `nonResourceRules` | Matching for non-resource requests (such as `/healthz`, `/version` paths): `verbs` + `nonResourceURLs` |

### Detail Page

Click a name in the list to enter the detail page. The page header shows the object metadata (cluster, name, creation time, UID, etc.) and provides **Edit**, **YAML**, **Delete** and other actions; the body is the "Spec" card:

| Display item | Content |
| --- | --- |
| Priority level | `spec.priorityLevelConfiguration.name` |
| Matching precedence | `spec.matchingPrecedence` |

The full matching rules, status and other information can be viewed by clicking the **YAML** button in the page header.

<!-- screenshot-todo: Flow Schema creation page: the form with the three fields Name / Priority Level Configuration / Matching Precedence + the Save button in the top-right corner -->

## Priority Level Configuration

### How It Works: How Much Quota This Level Has

A priority level defines "how this level rate-limits"; the core is the type (Type):

| Type | Description |
| --- | --- |
| Limited (default) | Occupies a certain number of **concurrency shares**; requests that exceed the shares queue (Queue) or are rejected directly (Reject) |
| Exempt | Not constrained by rate limiting, always allowed through — used for system-critical requests (such as the kube-controller-manager leader election heartbeat) |

### List Page

The same as flow schemas: reuses the generic resource list; columns: cluster, name, creation time; header **Create (+)**, rows provide YAML / Delete and other actions.

### Creating a Priority Level

The steps are the same as creating a flow schema (list page **Create (+)** → select cluster → create from Form / YAML → preview and submit the YAML when saving).

Create form fields:

| Field | Corresponding field | Description |
| --- | --- | --- |
| Name | `metadata.name` | Unique within the cluster |
| Type | `spec.type` | Limited / Exempt, defaults to Limited |
| Assured Concurrency Shares | `spec.limited.assuredConcurrencyShares` | Assured concurrency shares, default 10, minimum 1; can only be set for the Limited type. The larger the shares, the higher the concurrency quota this level occupies |

The over-limit policy `limitResponse` and the queueing parameters (queues / handSize / queueLengthLimit) have no form fields; they need to be set through YAML:

```yaml
apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: PriorityLevelConfiguration
metadata:
  name: workload-high
spec:
  type: Limited
  limited:
    assuredConcurrencyShares: 10
    limitResponse:
      type: Queue
      queuing:
        queues: 64
        handSize: 6
        queueLengthLimit: 50
```

::: tip Meaning of the queueing policy (limitResponse)
- `type: Queue`: requests that exceed the concurrency shares enter a queue and wait — suitable for avoiding burst traffic being dropped outright;
- `type: Reject`: requests that exceed the concurrency shares immediately return 429 (Too Many Requests).

`queues` (the number of queues), `handSize` (the number of queues selected by hashing per round) and `queueLengthLimit` (the maximum length of a single queue) together determine the queueing behavior. The defaults provided by Kubernetes can be used as-is; generally no adjustment is needed.
:::

### Detail Page

Click a name in the list to enter the detail page. Header metadata and actions are the same as above; the body is the "Spec" card:

| Display item | Content |
| --- | --- |
| Type | `spec.type`: Limited / Exempt |
| Assured Concurrency Shares | `spec.limited.assuredConcurrencyShares` |

<!-- screenshot-todo: Priority Level Configuration list page: generic resource list (cluster / name / creation time / operations) + the Create button in the top-right corner -->

## Built-in Objects and Usage Suggestions

- **Built-in objects in the cluster**: Kubernetes automatically creates a set of built-in flow schemas and priority levels after installation (commonly `system-leader-election`, `exempt`, `workload-high` / `workload-low`, `catch-all`, etc. — the actual set depends on the cluster); they ensure that both system requests and unmatched requests have somewhere to go. These objects are directly visible on the list page; please do not delete or modify them casually.
- **Create the level first, then the schema**: flow schemas reference priority levels **by name**. It is recommended to create the priority level first, and then the flow schema that references it, to avoid referencing an object that does not exist yet at submission time.
- **Changes affect the whole cluster**: incorrectly modifying or deleting the built-in flow schemas corresponding to critical requests such as `kube-system`, or changing a system level to Limited, may overload the API Server or even make it unavailable. Before changing in production, verify on a test cluster first.

::: tip Version notes
The flowcontrol API version varies with the cluster version: clusters on Kubernetes 1.30 and later use `flowcontrol.apiserver.k8s.io/v1`; older clusters fall back to `v1beta2`. Kuboard automatically selects the API version based on the cluster version and reconciles the field differences across versions (for example, concurrency shares are written as `nominalConcurrencyShares` in some versions and `assuredConcurrencyShares` in others), keeping the UI meaning consistent. The YAML examples above use the form's default `v1beta3` format; you do not need to care about the underlying version differences.
:::