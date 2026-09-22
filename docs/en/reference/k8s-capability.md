---
description: "Cluster Capability (K8s Capability) probing mechanism: what problem it solves, where it is perceived, version boundaries of the 10 default capabilities, the three forms of verdicts, and caching and invalidation timing"
---

# Cluster Capability (K8s Capability)

This page explains cluster capability (K8s Capability): Kuboard probes each cluster and decides accordingly whether a feature entry is available, which API version to use, and which implementation to take.

## Where You Perceive It

Capability verdicts are not shown to users directly; they are reflected in feature behavior:

| Where you perceive it | Example |
| --- | --- |
| Whether a feature entry is available | Clusters without ephemeral container support do not show the "Pod Debug" entry |
| Automatic switching of internal feature implementation | The port-forwarding protocol and terminal close-frame handling are selected automatically by version |
| Options in edit forms | Access modes for PVC/PV, Service protocol annotations, API versions in the Flow Control page and permission options |
| MCP tool behavior | Clusters without Prometheus installed hide the `prometheus_*` tools; metric tools issue requests according to the probed `metrics.k8s.io` version |

::: tip Fail-open on probe failure
When a capability cannot be determined (cluster temporarily unreachable, rule missing, etc.), Kuboard takes a fail-open strategy: MCP tools stay visible and feature entries stay available. Only a definite `false` hides or downgrades them, avoiding collateral damage to operations during temporary cluster failures.
:::

## Common Capabilities

When no probe items are specified, the server probes against the 10 default capabilities (any built-in rule can also be specified on demand). The table below describes the semantics of the 10 default items:

| capability | What it probes | Version boundary | Features affected |
| --- | --- | --- | --- |
| `policy.eviction` | groupVersion of the Eviction API | ≥ v1.25 → `policy/v1`, otherwise `policy/v1beta1` | Node drain / Pod eviction (UI operations and MCP tools) |
| `flowcontrol.flowschemas` | groupVersion of the APF (FlowSchema) API | ≥ v1.30 → `flowcontrol.apiserver.k8s.io/v1`, otherwise `v1beta2` | API version of the flowcontrol entry in the Flow Control page and permission options |
| `portforward.protocol` | Transport protocol of port forwarding | ≥ v1.32 (and the PortForwardWebsockets feature gate enabled) → websocket, otherwise spdy | Connection protocol of Web port forwarding |
| `pod.ephemeralContainer` | Whether ephemeral containers are supported | ≥ v1.23 → true, otherwise false | Whether the "Pod Debug" entry is available |
| `helm.binary` | Which built-in helm binary is used | < v1.25 → helm-3.13; v1.25–v1.30 → helm-3.16; ≥ v1.30 → helm-3.18 | The helm version invoked when Helm Install / Helm Market executes |
| `storage.readWriteOncePod` | Whether the ReadWriteOncePod access mode is supported | ≥ v1.34 → true, otherwise false | Access mode options in the PVC/PV form |
| `admission.psa` | Whether Pod Security Admission (PSA) is supported | ≥ v1.25 → true, otherwise false | Pod security capabilities of namespaces / workloads |
| `apiextensions.crd.v1` | groupVersion of the CRD API | ≥ v1.16 → `apiextensions.k8s.io/v1`, otherwise `v1beta1` | API version of the Custom Resources page |
| `service.appProtocol` | Whether the `appProtocol` field of a Service is supported | ≥ v1.20 → true, otherwise false | Protocol annotation field in the Service / Ingress form |
| `metrics.serverVersion` | Version of the metrics-server aggregated metrics API | Always `metrics.k8s.io/v1beta1` | API version of the live usage data of nodes / Pods |

::: tip More rules in the registry
Besides the 10 default items above, the registry also contains several internal rules used by MCP tools and the terminal. They are transparent to users and are not expanded one by one here.
:::

## Three Forms of Evaluation Results

The verdict of each capability may take one of three forms:

1. **Boolean (yes / no)** — decides whether a feature entry is available. For example ephemeral containers: v1.23 and above → available, showing the "Pod Debug" entry.
2. **API version string (which version to call with)** — decides the groupVersion used by requests. For example eviction: v1.25 and above → `policy/v1`, earlier versions → `policy/v1beta1`.
3. **Version bands (multi-segment mapping)** — the same capability takes different values in different version segments. For example the built-in helm is split into three bands by cluster version, returning helm-3.13 / helm-3.16 / helm-3.18 respectively.

## Caching and Invalidation

| Timing | Behavior |
| --- | --- |
| Cache expires naturally | Cached results expire after 1 hour; the next query recalculates automatically |
| Import / update / delete a cluster | Immediately clears the verdict cache of that cluster and recalculates; new versions take effect immediately |
| Save "Cluster Cache Settings" in System Configuration | Clears the verdict cache of **all** clusters and recalculates, while broadcasting a change to the tool list to connected MCP clients |

Therefore no manual handling is needed after a cluster upgrade: after updating the cluster information, verdicts are recomputed by the new version immediately; otherwise you wait at most for the cache to expire (1 hour).

## Related Concepts

- Resource availability check (whether a CRD is installed) is another independent probing mechanism, see [Resource Availability Check](./resource-availability);
- "Cluster Cache Settings" (saving triggers re-probing of capabilities) see [System Configuration](./system-config);
- The behavior of MCP tools showing or hiding by cluster capability see [MCP Tools](../mcp/tools).
