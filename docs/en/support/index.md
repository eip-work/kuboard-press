---
description: "Learn how the Kuboard Free and Enhanced editions compare, how to obtain and install a License, and where to get technical support and product updates"
---

# Kuboard License & Support

Kuboard is a Kubernetes-based container management platform. This page explains how to obtain a license, how the Free and Enhanced editions compare, and where to get technical support and product updates.

## License

The Free and Enhanced editions share almost all features. The vast majority of capabilities listed below are available in both editions; the two editions differ only in a few areas tied to capacity and service investment, such as the number of managed clusters, historical audit logs, and high-availability deployment:

| Feature | Free | Enhanced |
| --- | :---: | :---: |
| **Kubernetes Basic Management** | | |
| Node management, node drain/eviction, Pod eviction | :white_check_mark: | :white_check_mark: |
| Namespace management, LimitRange, ResourceQuota | :white_check_mark: | :white_check_mark: |
| ServiceAccount management | :white_check_mark: | :white_check_mark: |
| Workload management (Deployment / StatefulSet / DaemonSet / CronJob / Job / Pod) | :white_check_mark: | :white_check_mark: |
| Workload editor (form-based editing of Deployment / StatefulSet / DaemonSet) | :white_check_mark: | :white_check_mark: |
| Service / Ingress / IngressClass management | :white_check_mark: | :white_check_mark: |
| ConfigMap / Secret management | :white_check_mark: | :white_check_mark: |
| CustomResourceDefinition / CR management | :white_check_mark: | :white_check_mark: |
| NetworkPolicy management | :white_check_mark: | :white_check_mark: |
| HorizontalPodAutoscaler management | :white_check_mark: | :white_check_mark: |
| **Kubernetes Storage** | | |
| StorageClass, PersistentVolume, PersistentVolumeClaim management | :white_check_mark: | :white_check_mark: |
| VolumeSnapshotClass, VolumeSnapshot management | :white_check_mark: | :white_check_mark: |
| CSI driver, CSI node, CSI storage capacity management | :white_check_mark: | :white_check_mark: |
| Volume mount management | :white_check_mark: | :white_check_mark: |
| **Services & Networking** | | |
| Gateway API (GatewayClass / Gateway / HTTPRoute / TLSRoute / TCPRoute / UDPRoute / GRPCRoute / ReferenceGrant) | :white_check_mark: | :white_check_mark: |
| EndpointSlice management | :white_check_mark: | :white_check_mark: |
| **Cluster Resources** | | |
| RBAC management (Role / RoleBinding / ClusterRole / ClusterRoleBinding) | :white_check_mark: | :white_check_mark: |
| Admission Webhook management (MutatingWebhookConfiguration / ValidatingWebhookConfiguration / ValidatingAdmissionPolicy / ValidatingAdmissionPolicyBinding) | :white_check_mark: | :white_check_mark: |
| Dynamic Resource Allocation (DRA) management (ResourceClaim / ResourceClaimTemplate / ResourceSlice / PodSchedulingReadiness) | :white_check_mark: | :white_check_mark: |
| Flow control (FlowSchema / PriorityLevelConfiguration) | :white_check_mark: | :white_check_mark: |
| PriorityClass and PodDisruptionBudget management | :white_check_mark: | :white_check_mark: |
| RuntimeClass and Lease management | :white_check_mark: | :white_check_mark: |
| **Kubernetes Troubleshooting** | | |
| Top Nodes / Top Pods (resource monitoring) | :white_check_mark: | :white_check_mark: |
| Event list (integrated into the context of related objects) | :white_check_mark: | :white_check_mark: |
| Container log console (real-time / download) | :white_check_mark: | :white_check_mark: |
| Container web terminal | :white_check_mark: | :white_check_mark: |
| File browser (view / edit / upload / download files in containers) | :white_check_mark: | :white_check_mark: |
| YAML preview, edit, diff | :white_check_mark: | :white_check_mark: |
| Resource map (interactive topology visualization) | :white_check_mark: | :white_check_mark: |
| **Authentication & Authorization** | | |
| Built-in user repository (users / groups / roles) | :white_check_mark: | :white_check_mark: |
| Webhook external user repository | :white_check_mark: | :white_check_mark: |
| Kubernetes RBAC authorization | :white_check_mark: | :white_check_mark: |
| Multi-factor authentication (MFA / TOTP) | :white_check_mark: | :white_check_mark: |
| Password policy | :white_check_mark: | :white_check_mark: |
| **Multi-cluster Management** | | |
| Import clusters via kubeconfig | :white_check_mark: | :white_check_mark: |
| Import clusters via kuboard-agent | :white_check_mark: | :white_check_mark: |
| Manage up to 3 Kubernetes clusters | :white_check_mark: | :white_check_mark: |
| Manage more than 3 Kubernetes clusters | :x: | :white_check_mark: |
| **Helm Applications** | | |
| Helm Release install, upgrade, rollback, events | :white_check_mark: | :white_check_mark: |
| Chart marketplace browsing | :white_check_mark: | :white_check_mark: |
| Chart repository management | :white_check_mark: | :white_check_mark: |
| **AI & Automation (MCP)** | | |
| MCP Server (Model Context Protocol, Streamable HTTP / SSE, compatible with opencode / Claude / Cursor and other AI clients) | :white_check_mark: | :white_check_mark: |
| K8s ops toolkit (query and operate workloads / Pods / nodes / configs / events / custom resources) | :white_check_mark: | :white_check_mark: |
| Prometheus query tool (metric queries, per-rule RBAC authorization, aggregation query strategies) | :white_check_mark: | :white_check_mark: |
| Diagnostic prompts (diagnose Pods / clean up orphaned PVCs / generate Deployment YAML) | :white_check_mark: | :white_check_mark: |
| Real-time resource change subscription push (SSE) | :white_check_mark: | :white_check_mark: |
| High-risk operation confirmation token (dangerous tools require secondary confirmation) | :white_check_mark: | :white_check_mark: |
| Tool whitelist + rate limiting + audit redaction | :white_check_mark: | :white_check_mark: |
| **Audit & Observability** | | |
| Operation audit logs (current day) | :white_check_mark: | :white_check_mark: |
| Operation audit logs (history) | :x: | :white_check_mark: |
| Audit policy configuration | :white_check_mark: | :white_check_mark: |
| Kuboard Proxy (web-based kubectl proxy) | :white_check_mark: | :white_check_mark: |
| **Kuboard Signature Features** | | |
| Image version adjustment (batch update workload images) | :white_check_mark: | :white_check_mark: |
| Import / export K8s objects (YAML) | :white_check_mark: | :white_check_mark: |
| Continuous deployment integration (image update / restart) | :white_check_mark: | :white_check_mark: |
| Kuboard addon marketplace | :white_check_mark: | :white_check_mark: |
| System configuration (e.g., disable menu items) | :white_check_mark: | :white_check_mark: |
| K8sCapability version-compatibility layer (K8s 1.15+) | :white_check_mark: | :white_check_mark: |
| Resource availability governance (auto-detect cluster component installation status) | :white_check_mark: | :white_check_mark: |
| Kuboard high-availability deployment mode | :x: | :white_check_mark: |
| **Services & Support** | | |
| Free community support via WeChat / QQ groups | :white_check_mark: | :white_check_mark: |
| Dedicated Q&A channel for paid users | :x: | :white_check_mark: |
| Remote assistance | :x: | :white_check_mark: |

For how to obtain and import a license file, see [License Installation](./license-install).

::: tip Do you need a license?
If you only use Free edition features and manage no more than 3 clusters, you can use Kuboard directly without a license. Import a license file when you need Enhanced edition capabilities.
:::

## Community & Commercial Support

Free edition users can get community support through WeChat/QQ communities and GitHub Issues; Enhanced edition users also enjoy a dedicated Q&A channel and remote assistance. See [Community & Commercial Support](./community).

## Contact

<SupportStars />

Want to stay up to date with Kuboard releases and product news? Subscribe here:

<KbIframe src="https://uc-v3.kuboard.cn/public/home" title="Kuboard Subscription" />
