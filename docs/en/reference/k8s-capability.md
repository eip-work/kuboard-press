---
description: "Kuboard adapts features automatically by cluster version: which UI features depend on the cluster version (Pod Debug, Pod Security, ReadWriteOncePod, appProtocol), and when changes take effect after a cluster upgrade"
---

# Cluster Capability (K8s Capability)

Kuboard automatically decides, based on each cluster's Kubernetes version and component capabilities, whether certain feature entries are available, which options appear in forms, and which internal API version to use. **The whole process is automatic — no configuration needed and nothing for you to keep track of.**

Capability verdicts are not shown to users directly; they are reflected in UI behavior, for example:

- Clusters without ephemeral container support do not show the "Pod Debug" entry;
- Clusters without Prometheus installed hide the `prometheus_*` MCP tools;
- Internal implementations such as the port-forwarding transport protocol and terminal close-frame handling are selected automatically by version.

## UI Features Affected by the Cluster Version

The table below lists the version differences perceivable in the UI that are driven by the cluster capability probing mechanism (K8s Capability). If an item is missing from your UI, the cluster version is usually below the required version:

| UI feature | Required K8s version |
| --- | --- |
| `appProtocol` field in Service / Ingress forms | ≥ 1.20 |
| "Pod Debug" entry (ephemeral containers) | ≥ 1.23 |
| ipBlock except CIDRs field in NetworkPolicy forms | ≥ 1.25 |
| Pod Security (PSA) capabilities of namespaces / workloads | ≥ 1.25 |
| Scheduling field in RuntimeClass forms | ≥ 1.27 |
| ReadWriteOncePod access mode in PVC / PV forms | ≥ 1.34 |

All other implementation details (API versions for eviction / CRD / Flow Control / metrics, the port-forwarding transport protocol, the built-in Helm version, etc.) are selected automatically by cluster version and behave identically in the UI — no need to pay attention.

## When Do Changes Take Effect After a Cluster Upgrade?

No manual handling is needed after a cluster upgrade:

- After updating cluster information (importing / updating a cluster), verdicts are **immediately** recomputed against the new version;
- Otherwise, you wait at most 1 hour (the cached verdict expires and is recalculated automatically).

::: tip Why is a feature missing from the UI?
- The cluster version is below the version required by that feature (see the table above);
- Or the capability could not be probed temporarily (e.g., the cluster is temporarily unreachable) — in this case Kuboard takes a fail-open approach: feature entries stay available and MCP tools stay visible, so temporary failures never break operations, and things recover automatically shortly after.
:::

## Related Concepts

- Resource availability check (whether a CRD is installed) is another independent probing mechanism, see [Resource Availability Check](./resource-availability);
- The behavior of MCP tools showing or hiding by cluster capability is described in [MCP Tools](../mcp/tools).
