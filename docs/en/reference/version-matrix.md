---
description: "The Kubernetes version range supported by Kuboard, and the behavior-difference matrix of capabilities such as Eviction, EndpointSlice, port-forward, DRA, PSA, and CRD v1 across version bands"
---

# Version Compatibility Matrix

This page answers two questions: Is your Kubernetes version within Kuboard's supported range? Under that version, which capabilities and UI behaviors differ from other versions?

## Support Range Overview

| Item | Value | Description |
| --- | --- | --- |
| Minimum supported version | **v1.15** | Below this version, capability decisions are not guaranteed to be correct |
| Newest capability boundary | **v1.34** | The latest capability boundary is at v1.34 (ReadWriteOncePod); **this is not an upper limit** — cluster versions higher than v1.34 are handled per the newest band (≥1.34) |
| Newest supported version | **v1.36** | Explicitly supported up to this version; even newer versions need no extra adaptation and are evaluated per the newest band (≥1.34) |
| Version granularity | major.minor | e.g. `v1.31.2` is evaluated as `1.31`; patch versions do not affect capability boundaries |
| Ongoing support | Versions only increase, no upper limit | No upper version limit; new versions (e.g. v1.36) need no extra adaptation — capability decisions automatically use the newest band. The matrix gains new bands as future capability boundaries are introduced |

::: warning Confirm the version before installation
Confirm that the cluster version is not lower than v1.15 before installing Kuboard; see [Install Kuboard](../install/index) for installation steps. After connecting the cluster, the cluster list page shows the Kubernetes version detected by Kuboard.
:::

## Capability × Version Matrix

When connecting a cluster, Kuboard reads the cluster's Kubernetes version, compares only the **major and minor version numbers**, and decides each capability per the table below; cluster versions higher than v1.34 are handled per the "≥ 1.34" band (see [Support Range Overview](#support-range-overview)). "→" means a new value applies from that boundary on; "available / not available" indicates whether a feature entry or form field exists.

| Capability | Version boundary and value | Kuboard UI / feature affected |
| --- | --- | --- |
| Eviction | `< 1.25` → `policy/v1beta1`; `≥ 1.25` → `policy/v1` | Node drain, Pod eviction operations |
| Debug containers | Not available `< 1.23`; available `≥ 1.23` | "Pod Debug" entry; inject debug containers into running Pods |
| Service endpoints EndpointSlice | Falls back to `v1/endpoints` `< 1.21`; `≥ 1.21` → `discovery.k8s.io/v1` | Data source for the service / endpoint list |
| Node / Pod metrics | Always `metrics.k8s.io/v1beta1` (metrics.k8s.io is not GA yet) | Node / Pod metric curves, HPA metric source |
| FlowControl | `< 1.30` → `v1beta2`; `≥ 1.30` → `v1` | FlowSchema / PriorityLevelConfiguration pages; the API may not exist on older clusters, so rely on detection |
| Port-forward protocol | `< 1.32` → spdy; `≥ 1.32` → websocket (depends on the PortForwardWebsockets FeatureGate) | Protocol used by terminal / port-forward channels |
| Built-in Helm version | `< 1.25` → helm-3.13; `1.25–1.30` → helm-3.16; `≥ 1.30` → helm-3.18 | The helm client actually invoked by App Store / Helm install, upgrade, rollback |
| DRA dynamic resource allocation | Not available `< 1.28`; available `≥ 1.28` | Entry points and editing for DRA resources such as ResourceClaim / ResourceClaimTemplate / ResourceSlice |
| PodSchedulingReadiness | Available only in `1.26–1.30` (introduced upstream in 1.26, removed in 1.30); not available otherwise | PodSchedulingReadiness resource page (shown only when the DRA capability is also satisfied) |
| ValidatingAdmissionPolicy | Not available `< 1.30`; available `≥ 1.30` | ValidatingAdmissionPolicy and its binding resource pages |
| RuntimeClass scheduling | Not available `< 1.27`; available `≥ 1.27` | Scheduling-related fields on the RuntimeClass resource page |
| PVC access mode ReadWriteOncePod | Not available `< 1.34`; available `≥ 1.34` | Access mode options in PVC / PV editing |
| Pod Security Admission (PSA) | Not available `< 1.25`; available `≥ 1.25` | Pod security (PSA/PSS label configuration) UI of namespaces / workloads |
| CRD API version | `< 1.16` → `v1beta1`; `≥ 1.16` → `v1` | The apiVersion used for Kuboard built-in / plugin CRDs and by custom resource forms |
| Service appProtocol | Not available `< 1.20`; available `≥ 1.20` | The appProtocol (application-layer protocol) field in Service editing |
| NetworkPolicy ipBlock except | Not available `< 1.25`; available `≥ 1.25` | The ipBlock `except` CIDR list in NetworkPolicy rule editing |
| Terminal close-frame protocol | `< 1.29` Kuboard sends the close frame; `≥ 1.29` K8s sends it | WebSocket close-frame behavior when the Web terminal disconnects |
| Prometheus tool | Treated as installable on any version; actual availability is determined by service discovery detection | Visibility of MCP Prometheus tools (prometheus_query, etc.) |

::: tip Relationship with PSP (PodSecurityPolicy)
PSP has been removed upstream since Kubernetes 1.25 and replaced by Pod Security Admission (PSA). Therefore the PSA capability (the "Pod Security Admission (PSA)" row in the matrix) has only been available since 1.25.
:::

## When in Doubt, How to Judge

The matrix gives the default decisions based on the version number. In the following cases, rely on the actual results of [cluster capability detection](./k8s-capability):

- Some API groups may be entirely absent on older clusters (e.g., no FlowControl on 1.15); in this case the capability is handled with the corresponding older value in the matrix
- Capabilities that depend on FeatureGates (such as port-forward websocket/spdy) may differ from the in-table defaults when the cluster has not enabled the corresponding FeatureGate
- "Capabilities" that depend on components outside the cluster (e.g., whether Prometheus is installed) must be confirmed via service discovery rather than by the version number

## Capabilities Missing in Older Versions

Grouped by version band, to quickly locate "which UI feature is unavailable under the current version" during troubleshooting:

- **< 1.16**: CRD is only `apiextensions.k8s.io/v1beta1`; no debug containers; no EndpointSlice (service endpoints go through `v1/endpoints`); no Service appProtocol field.
- **< 1.21**: no EndpointSlice, service/endpoint lists fall back to `v1/endpoints`.
- **< 1.23**: no debug container injection.
- **< 1.25**: eviction goes through `policy/v1beta1`; no PSA (Pod Security Admission); no `ipBlock.except` in NetworkPolicy; built-in Helm is 3.13.
- **< 1.27**: RuntimeClass scheduling capabilities unavailable.
- **< 1.28**: DRA resource entry points hidden.
- **< 1.29**: the terminal close frame is sent proactively by Kuboard (interaction behavior differs from ≥ 1.29 clusters).
- **< 1.30**: FlowControl goes through `v1beta2`; ValidatingAdmissionPolicy is unavailable; PodSchedulingReadiness becomes unavailable since 1.30 (removed upstream in K8s).
- **< 1.32**: port-forward/terminal uses the SPDY protocol.
- **< 1.34**: no ReadWriteOncePod option in PVC access modes.
