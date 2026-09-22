---
description: "The Kubernetes version range supported by Kuboard, and the behavior-difference matrix of capabilities such as Eviction, EndpointSlice, port-forward, DRA, PSA, and CRD v1 across version bands"
---

# Version Compatibility Matrix

This page answers two questions: Is your Kubernetes version within Kuboard's supported range? Under that version, which capabilities and UI behaviors differ from other versions?

## Support Range Overview

| Item | Value | Description |
| --- | --- | --- |
| Minimum supported version | **v1.15** | Below this version, capability decisions are not guaranteed to be correct |
| Currently covering up to | **v1.34** | The latest capability boundary is at v1.34 (ReadWriteOncePod) |
| Version granularity | major.minor | e.g. `v1.31.2` is evaluated as `1.31`; patch versions do not affect capability boundaries |
| Ongoing support | Versions only increase, never decrease | No upper version limit; each capability only changes at the boundaries where it is introduced/removed |

::: warning Confirm the version before installation
Confirm that the cluster version is not lower than v1.15 before installing Kuboard; see [Install Kuboard](../install/index) for installation steps. After connecting the cluster, the cluster list page shows the Kubernetes version detected by Kuboard.
:::

## Capability × Version Matrix

When connecting a cluster, Kuboard reads the cluster's Kubernetes version, compares only the **major and minor version numbers**, and looks up each capability's value in the table below; cluster versions higher than v1.34 are handled per the newest column (≥1.34). Cell meaning:

- `v1` / `v1beta1` / `websocket`, etc. → the API version or value used by this capability in this version band
- `✓` / `✗` → available / not available
- A note inside a cell such as "since 1.23" indicates a finer boundary inside that column

| Capability | <1.16 | 1.16–1.20 | 1.21–1.24 | 1.25–1.29 | 1.30–1.31 | 1.32–1.33 | ≥1.34 | Which Kuboard UI/feature it affects |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Eviction (`policy.eviction`) | v1beta1 | v1beta1 | v1beta1 | v1 | v1 | v1 | v1 | Node drain, Pod eviction operations; eviction requests go through v1beta1 when < 1.25 |
| Debug containers (`pod.ephemeralContainer`) | ✗ | ✗ | since 1.23 ✓ | ✓ | ✓ | ✓ | ✓ | Inject debug containers (Debug Container) into running Pods |
| Service endpoints EndpointSlice (`discovery.k8s.io.endpointslice`) | None, falls back to v1/endpoints | None, falls back to v1/endpoints | discovery.k8s.io/v1 | discovery.k8s.io/v1 | discovery.k8s.io/v1 | discovery.k8s.io/v1 | discovery.k8s.io/v1 | Data source for the service/endpoint list; falls back to `v1/endpoints` when < 1.21 |
| Node/Pod metrics (`metrics.k8s.io.node` / `.pod`) | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | Node/Pod metric curves, HPA metric source; `metrics.k8s.io` is not GA yet and goes through v1beta1 on all versions |
| FlowControl (`flowcontrol.flowschemas`) | v1beta2 | v1beta2 | v1beta2 | v1beta2 | v1 | v1 | v1 | Creation and display of the FlowSchema / PriorityLevelConfiguration resource pages; on clusters older than 1.30 this API may not exist, so rely on cluster detection |
| Port-forward protocol (`portforward.protocol`) | spdy | spdy | spdy | spdy | spdy | websocket | websocket | Protocol used by terminal / port-forward channels; ≥ 1.32 uses websocket (depends on the PortForwardWebsockets FeatureGate, ultimately determined by detection) |
| Built-in Helm version (`helm.binary`) | helm-3.13 | helm-3.13 | helm-3.13 | helm-3.16 | helm-3.18 | helm-3.18 | helm-3.18 | Version of the helm client binary actually invoked by the App Store / Helm install, upgrade, and rollback |
| DRA dynamic resource allocation (`dra.enabled`) | ✗ | ✗ | ✗ | since 1.28 ✓ | ✓ | ✓ | ✓ | Entry points and editing for DRA resources such as ResourceClaim / ResourceClaimTemplate / ResourceSlice |
| PodSchedulingReadiness (`scheduling.podschedulingreadiness`) | ✗ | ✗ | ✗ | since 1.26 ✓ | ✗ | ✗ | ✗ | PodSchedulingReadiness resource page (only shown when the DRA capability is also satisfied); introduced upstream in K8s 1.26 and removed in 1.30, and this table matches that |
| ValidatingAdmissionPolicy (`admission.vap.enabled`) | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ValidatingAdmissionPolicy and its binding resource pages |
| RuntimeClass scheduling (`runtimeclass.scheduling.ga`) | ✗ | ✗ | ✗ | since 1.27 ✓ | ✓ | ✓ | ✓ | Scheduling-related fields/capabilities on the RuntimeClass resource page |
| PVC access mode ReadWriteOncePod (`storage.readWriteOncePod`) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | Access mode options in PVC / PV editing |
| Pod Security Admission PSA (`admission.psa`) | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | Pod security policy related UI (PSA/PSS label configuration, etc.) |
| CRD API version (`apiextensions.crd.v1`) | v1beta1 | v1 | v1 | v1 | v1 | v1 | v1 | The apiVersion used for creating Kuboard built-in/plugin CRDs and by custom resource forms |
| Service appProtocol (`service.appProtocol`) | ✗ | since 1.20 ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | The appProtocol (application-layer protocol) field in Service editing |
| metrics-server version (`metrics.serverVersion`) | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | v1beta1 | Data source version for node / Pod real-time usage metrics, always `metrics.k8s.io/v1beta1` |
| NetworkPolicy ipBlock except (`networkpolicy.ipBlockExceptCidrs`) | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | The ipBlock `except` CIDR list in NetworkPolicy rule editing |
| Terminal close-frame protocol (`terminal.protocol.closeFrame`) | ✗ | ✗ | ✗ | since 1.29 ✓ | ✓ | ✓ | ✓ | WebSocket close-frame behavior when the Web terminal disconnects: Kuboard sends the close frame proactively when < 1.29, K8s sends it proactively when ≥ 1.29 |
| Prometheus tool (`prometheus.installed`) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Visibility of the MCP Prometheus tool (prometheus_query, etc.); it is treated as installable on any version, and whether it is actually available is determined by service discovery detection |

::: tip Relationship with PSP (PodSecurityPolicy)
PSP has been removed upstream since Kubernetes 1.25 and replaced by Pod Security Admission (PSA). Therefore the PSA capability (the `admission.psa` row in the matrix) has only been available since 1.25.
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
