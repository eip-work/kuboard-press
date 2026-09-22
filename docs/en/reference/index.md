---
description: "Reference overview: environment variables and defaults, ports, system configuration, menu disable, resource availability, K8s compatibility matrix, RBAC scopes, API entry, glossary quick reference"
---

# Reference

This section collects system-level configuration, port documentation, version compatibility matrices, API entry points and a glossary for readers who need to verify details or tune behavior on demand, rather than reading it through as a workflow.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Environment Variables](./kuboard-env) | Environment variables and default values | Deployment, tuning, troubleshooting startup issues |
| [Logs & Troubleshooting](./kuboard-env#troubleshooting) | Viewing logs, locating issues by request ID | Locate failures from logs when issues occur |
| [Ports](../install/quickstart#ports) | Purpose of each port and how to change it | Not sure which port to access in the browser, or want to change ports |
| [System Configuration](./system-config) | System configuration items and default values | Adjust default behavior |
| [Menu Disable](./menu-disable) | Hide unnecessary menu items per user | Simplify the end-user view |
| [Resource Availability](./resource-availability) | Auto-detect whether a resource type is installed in the cluster | Block creation entry points of unavailable resources early |
| [K8s Capability Detection](./k8s-capability) | Probe available capabilities by cluster version | Assess affected features before a cluster upgrade |
| [Version Matrix](./version-matrix) | Compatibility with each Kubernetes version | Confirm feasibility before an upgrade |
| [RBAC Scopes](./rbac-scopes) | The three permission scopes | Design role authorization rules |
| [API Documentation](./api) | Swagger UI API entry | Secondary development and automation integration |
| [Glossary](./glossary) | Quick reference of 10 core terms | New users understand documentation wording |

## Recommended Reading Order

1. **Deployment / startup** — start with [Environment Variables](./kuboard-env); on startup issues, follow [Troubleshooting](./kuboard-env#troubleshooting) to view logs; which port to access in the browser is covered in [Ports](../install/quickstart#ports)
2. **Runtime tuning** — adjust default behavior through [System Configuration](./system-config), and simplify the end-user view with [Menu Disable](./menu-disable)
3. **Cluster compatibility** — before upgrading Kubernetes, assess the impact against the [Version Matrix](./version-matrix) and [Capability Detection](./k8s-capability)
4. **Permission design** — read [RBAC Scopes](./rbac-scopes) before designing roles
5. **Secondary development / automation** — start from [API Documentation](./api), and look up unfamiliar terms in the [Glossary](./glossary)

::: tip Relationship to other sections
The Reference is cross-cutting capability documentation that does not depend on any particular business flow. Consult it on demand during usage rather than reading it end to end.
:::