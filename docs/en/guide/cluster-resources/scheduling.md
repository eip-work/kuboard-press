---
description: "Using four cluster resources for scheduling and stability: PriorityClass (scheduling priority and preemption), PodDisruptionBudget (guaranteeing the number of available Pods during rolling updates / node maintenance), Lease (viewing coordination leases), RuntimeClass (creating gVisor/Kata runtime isolation and associating it with workloads)"
---

# Scheduling and Stability (PriorityClass / PDB / Lease / RuntimeClass)

This page covers four cluster resources related to "scheduling, availability and the runtime". Everything here is about hands-on usage:

| Resource | Purpose | Scope | Kuboard entry (resource tree) | Operable |
| --- | --- | --- | --- | --- |
| PriorityClass | Sets a workload's scheduling priority, supports preemption | Cluster | Cluster Resources → Scheduling | Create / Edit / Delete |
| PodDisruptionBudget | Guarantees a minimum number of available Pods during voluntary disruptions (rolling updates, node maintenance) | Namespace | Cluster Resources → Policy | Create / Edit / Delete |
| Lease | Lightweight lease for distributed coordination, read-only observation | Namespace | Cluster Resources → Coordination | View only |
| RuntimeClass | Selects a container runtime for Pods (e.g. gVisor, Kata) | Cluster | Nodes & Runtime | Create / Edit / Delete |

::: warning These resources are hidden in the menu by default
`priorityclasses`, `poddisruptionbudgets`, `leases` and `runtimeclasses` are **disabled** by default in Kuboard and cannot be seen in the resource tree. If these entries are missing on the left side of your cluster, go to **System Settings → Menu Item Settings**, check the corresponding items in the resource tree and save, then refresh the cluster page — they will appear.
:::

## Scheduling Priority: PriorityClass

PriorityClass gives a Pod an integer priority value. The scheduler (kube-scheduler) schedules higher-priority Pods first, letting you compare the relative importance of Pods.

- **Raise the priority**: critical tasks (such as billing, alerting, monitoring) are scheduled before ordinary tasks; when resources are scarce, they can even preempt lower-priority Pods;
- **Lower the priority**: batch jobs and background tasks get a low priority, yielding to online business.

### Creating a Priority Class

1. Enter the **Cluster Resources → Scheduling → Priority Classes** list page and click **Create** in the top-right corner;
2. **Basic Info**: fill in the name (unique within the cluster) and the labels, annotations;
3. **Spec**: fill in Value, Global Default, Description and Preemption Policy in turn (see the table below);
4. Click **Save**, confirm in **Preview YAML** and submit; you are taken to the detail page.

| Field | Description |
| --- | --- |
| Name | Required, unique within the cluster, K8s name rules (lowercase letters / digits / `-`) |
| Value (value) | Required, a positive integer in the range 1 ~ 2147483647. The larger the value, the higher the priority |
| Global Default (globalDefault) | A switch. When enabled, **workloads that do not explicitly specify a priority** take part in scheduling with this value |
| Description (description) | Optional, describes the purpose of this priority class |
| Preemption Policy (preemptionPolicy) | `PreemptLowerPriority` (default): when a high-priority Pod cannot be scheduled, lower-priority Pods are evicted to make room; `Never`: no preemption, queue up and wait for resources |

<!-- screenshot-todo: Screenshot of the Priority Class create form, highlighting the Value / Global Default switch / Preemption Policy radio options -->

### Associating a Priority Class with a Workload

In the **YAML edit** of a workload (such as a Deployment), add the `priorityClassName` field to the Pod template (`spec.template.spec`):

```yaml
# deployment-priority.yaml excerpt: make this batch of Pods use the high-priority priority class
apiVersion: apps/v1
kind: Deployment
metadata:
  name: critical-worker
spec:
  template:
    spec:
      priorityClassName: high-priority   # the name of the PriorityClass you created
      containers:
        - name: app
          image: nginx:1.25
```

After saving, the Pods recreated by the Deployment's rolling update take part in scheduling with the new priority. To verify:

```sh
kubectl get priorityclass
kubectl get pod <pod-name> -o jsonpath='{.spec.priorityClassName} {.spec.priority}'
```

::: tip Only one global default
Only one PriorityClass in a cluster can have **Global Default** enabled at the same time. If you set the built-in `system-cluster-critical` (or a higher value) as the global default, every ordinary Pod that does not specify a priority is lifted to the system-critical level — do not enable it casually.
:::

::: warning The cost of preemption
With `PreemptLowerPriority`, when resources are scarce, Pods with a lower priority on the target node are **evicted** (triggering their termination and rescheduling). Unless you really need it, low-priority workloads such as batch jobs are recommended to use `Never` instead of the default preemption policy, to avoid the flapping caused by frequent mutual preemption.
:::

<!-- screenshot-todo: Screenshot of the Priority Class list page, showing the Name / Value (value) / Global Default / Description columns -->

## Guaranteeing Available Pods: PodDisruptionBudget

PodDisruptionBudget (PDB, Pod Disruption Budget) constrains **voluntary disruptions** — disruptions initiated by people on purpose, such as Deployment rolling updates, node drain maintenance, or manually deleting a Pod. It is a namespace-scoped resource; it only guarantees that Pods are "not disrupted on a large scale by accident", and does not cover **involuntary disruptions** such as forced deletion.

| Disruption type | Constrained by PDB | Examples |
| --- | --- | --- |
| Voluntary disruption | Yes | Rolling updates, node drain maintenance, deleting a Pod on purpose |
| Involuntary disruption | No | Node outage, OOM, eviction, hardware failure |

### Creating a Pod Disruption Budget

1. Enter the **Cluster Resources → Policy → Pod Disruption Budgets** list page and click **Create** in the top-right corner (it defaults to the `default` namespace; you can switch it);
2. **Metadata**: fill in the name (unique within the namespace);
3. **Spec**: choose the budget measure, fill in the quantity, and add the label selector (see the table below);
4. Click **Save**, confirm in **Preview YAML** and submit.

| Field | Description |
| --- | --- |
| Budget measure | Choose one of the two: **Min Available (minAvailable)** / **Max Unavailable (maxUnavailable)**. Only the field you select is written into the YAML |
| Quantity | Accepts an **absolute number** (e.g. `2`) or a **percentage** (e.g. `50%`). `minAvailable: 2` = at least 2 available Pods must be kept during a disruption; `maxUnavailable: 50%` = at most half of the Pods may be unavailable at the same time |
| Label selector | Fill in `key=value` line by line; multiple lines are ANDed together. Only Pods whose labels match are covered. When empty, it matches **all** Pods in the namespace |

<!-- screenshot-todo: Screenshot of the Pod Disruption Budget create form, with the minAvailable/maxUnavailable radio options and a label selector example (app=web) -->

::: tip Choosing the right measure
- Multi-replica business behind a load balancer: use `minAvailable` (absolute value or percentage) to make sure enough instances are always there to carry the traffic;
- Batch processing that tolerates brief single-point interruptions: use `maxUnavailable` to allow some concurrent disruptions.
:::

### Judging "Can I Safely Disrupt?" from the Detail Page

After saving, enter the detail page; the **Status** panel at the bottom is the key information:

| Status field | Meaning |
| --- | --- |
| Current Healthy (currentHealthy) | The number of Pods currently satisfying the ready condition |
| Desired Healthy (desiredHealthy) | The number of Pods that must stay available during a disruption (derived from the budget) |
| Disruptions Allowed (disruptionsAllowed) | How many more Pods may currently be voluntarily disrupted |
| Expected Pods (expectedPods) | The total number of Pods currently matched by the selector |

Rolling updates / node drain may proceed only when `Disruptions Allowed > 0`; when it is `0`, any new voluntary disruption (such as draining the node where the Pod runs) is blocked until a Pod becomes available again.

<!-- screenshot-todo: Screenshot of the Pod Disruption Budget detail page, highlighting the Status panel: Current Healthy / Desired Healthy / Disruptions Allowed / Expected Pods -->

Verification and troubleshooting:

```sh
kubectl -n <namespace> get pdb
kubectl -n <namespace> describe pdb <name>   # includes Status and DisruptionsAllowed
```

::: warning A selector that matches nothing = a PDB that does nothing
When the labels are wrong or inconsistent with the workload template labels, `Expected Pods` is 0 and the PDB has no constraining effect. After creating it, first check whether "Expected Pods" on the detail page equals the replica count of the workload.
:::

## Coordination Lease: Lease

Lease is a lightweight object the cluster uses for **distributed coordination**: whoever "holds" a resource for a period of time and **renews** it regularly. Typical scenarios:

- **Node heartbeat**: every node holds a Lease in the `kube-node-lease` namespace; continuous renewal means the node is healthy;
- **Leader election**: controllers such as `kube-scheduler` and `kube-controller-manager` elect a leader through Lease; only one Leader works at the same time.

Leases are created and maintained automatically by the system and are **read-only** in Kuboard (there is no create / edit entry). Enter **Cluster Resources → Coordination → Leases**; the list shows three columns:

| Column | Description |
| --- | --- |
| Holder Identity | The identifier of the current holder (e.g. the node name, or the `kube-scheduler` instance name + UUID) |
| Lease Duration (s) | The number of seconds a lease stays valid |
| Renew Time | The time of the most recent renewal (shown as relative time) |

Click a name to enter the detail page, which additionally provides **Lease Transitions (leaseTransitions)** and **Acquire Time (acquireTime)**.

Troubleshooting ideas:

- **Renew Time has not been updated for a long time** → the holder process may be hung or unreachable;
- **Lease Transitions climbing quickly** → the Leader is switching frequently, usually because the holder process is unstable (OOM, network flapping, node failure); focus on the health of the elected component (such as `kube-scheduler`).

<!-- screenshot-todo: Screenshot of the Lease detail page, showing Holder Identity / Lease Duration / Renew Time / Lease Transitions / Acquire Time -->

```sh
kubectl -n kube-node-lease get lease        # node heartbeat leases
kubectl -n kube-system get lease            # Leader election leases of the control plane components
```

## Runtime Isolation: RuntimeClass

RuntimeClass decouples "runtime selection" from the Pod definition: you define a named runtime class first, and Pods reference it through `runtimeClassName`. The most common use case is **runtime isolation** — running untrusted workloads with a sandboxed runtime (such as gVisor or Kata Containers), isolated from the host kernel.

### Prerequisite: the corresponding runtime is installed on the nodes

A RuntimeClass is only a declaration; the real work is done by the runtime implementation on the nodes:

- The node has the corresponding runtime installed (e.g. `runsc` for gVisor, `kata-runtime` for Kata);
- The container runtime (such as containerd) has registered the handler;
- The node is labeled with recognizable labels (to bind it through the Node Selector below).

### Creating a Runtime Class

Enter the **Nodes & Runtime → Runtime Classes** list page, click **Create** in the top-right corner and fill in:

| Field | Description |
| --- | --- |
| Name | Required, unique within the cluster |
| Handler | Required, the runtime handler name registered on the node (e.g. `runsc`, `kata`, `runc`) |
| Overhead (podFixed) | Optional, the runtime's fixed extra overhead (CPU / memory), e.g. `cpu: 100m`, `memory: 128Mi` for gVisor. The scheduler counts this overhead into the node capacity to avoid overselling |
| Scheduling (Node Selector) | Optional, restricts to the nodes that have this runtime installed. The area is shown on **Kubernetes 1.27 and later**; on earlier versions the UI hides it automatically |

<!-- screenshot-todo: Screenshot of the Runtime Class create form, with the Handler, Overhead (podFixed key-value pairs) and the Scheduling node selector area -->

::: tip The Scheduling field on lower-version clusters
The `scheduling` field of RuntimeClass became generally available (GA) only in Kubernetes 1.27. If the cluster version is below 1.27, the form does not show the node selector area; when needed, add `scheduling.nodeSelector` in the YAML instead.
:::

### Associating a Runtime Class with a Workload

Add `runtimeClassName` in the **YAML edit** of a Pod / workload:

```yaml
# runtimeclass-pod.yaml: run this Pod in the gvisor sandbox
apiVersion: v1
kind: Pod
metadata:
  name: untrusted-app
spec:
  runtimeClassName: gvisor
  containers:
    - name: app
      image: busybox
```

After saving, the scheduler places the Pod on a node that satisfies the RuntimeClass `scheduling.nodeSelector` (if any), and the node starts the container with the corresponding handler. To verify:

```sh
kubectl get runtimeclass
kubectl get pod <pod-name> -o jsonpath='{.spec.runtimeClassName}'
# A Pod that enters Running means the handler matched the node runtime successfully; Pending / failures usually mean the node does not have the corresponding runtime installed
```

::: warning No matching runtime → the Pod fails to be scheduled
When the node does not have the handler declared by the RuntimeClass installed (or the node selector matches no nodes), the Pod stays in `Pending` or reports an error such as "node cannot satisfy RuntimeClass". Install the runtime corresponding to the handler on at least one node first, and only then create (or reference) the RuntimeClass.
:::

<!-- screenshot-todo: Screenshot of the Runtime Class list page, showing the Name / Handler columns -->

## Related Pages

- [Deployment](../workload/deployments): add `priorityClassName` / `runtimeClassName` in its YAML edit
- [Pod](../workload/pods): check the Pod's priority, whether RuntimeClass took effect, and PDB coverage
- [Node](./nodes): node drain maintenance triggers voluntary disruptions (constrained by PDB); node labels are the source of the RuntimeClass node selector
- [Namespace](./namespaces): PDB and Lease are both namespace-scoped; confirm the namespace first