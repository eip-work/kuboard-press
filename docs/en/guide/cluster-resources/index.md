---
description: "Cluster resources overview: Node, Namespace, Quota, LimitRange, Scheduling, PDB, Lease, RuntimeClass, Admission, FlowControl, DRA"
---

# Cluster Resources

This section covers Kubernetes resources that operate at the cluster or infrastructure layer. These objects rarely carry business traffic directly, but they define capacity, quota, scheduling and policy boundaries.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Node](./nodes) | Node listing, labels and taints, drain and evict | Node maintenance, scaling, upgrades |
| [Namespace](./namespaces) | Creating namespaces, attaching quotas, isolating authorization | Multi-team or multi-environment isolation |
| [ResourceQuota / LimitRange](./quota-limitrange) | Namespace-level resource quota and default request / limit | Control resource usage |
| [Scheduling / PDB / Lease / RuntimeClass](./scheduling) | PriorityClass, PodDisruptionBudget, Lease, RuntimeClass | Scheduling policy and availability guarantees |
| [Admission Webhook](./admission) | Validating and Mutating Webhook configuration viewer | Troubleshoot admission control |
| [FlowControl](./flowcontrol) | `flowcontrol.apiserver.k8s.io` API group and priorities | Tune apiserver rate limiting |
| [DRA (Dynamic Resource Allocation)](./dra) | DRA resource templates and claims | GPUs and other heterogeneous accelerators |

## Recommended Reading Order

1. **First-time organization** — split the cluster by team or environment with [Namespace](./namespaces), then set boundaries via [ResourceQuota / LimitRange](./quota-limitrange);
2. **Day-to-day operations** — read [Node](./nodes) for bring-up and tear-down; read the PDB section of [Scheduling / PDB / Lease / RuntimeClass](./scheduling) for rolling upgrades and self-healing;
3. **Platform team** — read [Admission Webhook](./admission) and [FlowControl](./flowcontrol);
4. **AI and heterogeneous resources** — read [DRA (Dynamic Resource Allocation)](./dra).

::: tip Tier 1 resources
LimitRange, ResourceQuota, PriorityClass, PodDisruptionBudget, EndpointSlice and Lease are classified as **Tier 1 resources**. Kuboard does not cache them by default — they are fetched directly from the apiserver. Their form pages accept `?demo=true` to preload sample data so you can verify the controls without a live cluster.
:::