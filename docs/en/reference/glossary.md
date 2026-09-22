---
description: "Kuboard V4 quick reference of core terms: clusters, namespaces, workloads, RBAC Scope, MCP, Addons, and more"
---

# Glossary

When you encounter an unfamiliar term while reading other pages, come back here for a quick lookup of its meaning and related documentation.

## Core Terms at a Glance

| Term | Meaning | Related docs |
| --- | --- | --- |
| **Cluster** | A Kubernetes cluster that can be connected and managed centrally | [Import a Cluster](../guide/cluster/) |
| **Namespace** | A logical partition that isolates resources; permissions and quotas are scoped to it | [Namespaces](../guide/cluster-resources/) |
| **Workload** | A collective term for "business-running" resources such as Deployment | [Workloads](../guide/workload/) |
| **RBAC Scope** | Permissions are configured at three levels: global, cluster, and namespace | [Permission Scopes](./rbac-scopes) |
| **AccessKey** | A key pair for programmatic access from scripts and CI/CD | [Access Keys](../user/access-keys) |
| **MFA** | Multi-Factor Authentication; a dynamic verification code is required at login in addition to the password | [Multi-Factor Authentication](../user/mfa) |
| **MCP** | A protocol that exposes cluster operations to AI assistants | [MCP Quick Start](../mcp/server-config) |
| **Addon** | A functional extension package that can be installed with one click from the Addon marketplace | [Addon Marketplace](../guide/ops/) |
| **Audit** | Records logs of key operations such as logins and permission changes | [Audit Log](../ops/audit-log) |
| **K8sCapability** | Probes the cluster's Kubernetes version capabilities to decide whether a feature is available | [Kubernetes Capability Detection](./k8s-capability) |

For the complete glossary, see the [term quick reference on the guide home page](../guide/).