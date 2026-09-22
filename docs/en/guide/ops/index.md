---
description: "Operations visualization overview: events, resource map, addon marketplace"
---

# Operations Visualization

This section is about "seeing what the cluster is doing" and "extending what the cluster can do". It includes the time-ordered event stream, the object-relationship resource map, and the Kuboard addon marketplace.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Events](./events) | Cluster- and namespace-level Event timeline with filters | Diagnose application failures and locate root cause |
| [Resource Map](./resource-map) | A graph of Deployment / Pod / Service and their relationships | Understand resource topology and dependencies at a glance |
| [Addon Marketplace](./addon-marketplace) | One-click install of Kuboard addons (metrics-server, dashboard, etc.) | Quickly fill in common cluster capabilities |

## Recommended Reading Order

1. **Routine inspection** — open [Events](./events) to see recent warnings for the cluster and namespaces;
2. **Complex troubleshooting** — when "I changed config but nothing happened", trace the chain with [Resource Map](./resource-map);
3. **Capability gaps** — close them with [Addon Marketplace](./addon-marketplace) for common dependencies such as metrics-server or NFS Provisioner.

::: tip About addons
Kuboard V4 addons are backward-compatible with V3: addons installed in V3 continue to work after an upgrade to V4 without reinstallation. Addons are implemented as Kuboard custom resources, so they are managed using the same flow as the [Custom Resources](../crd/) section.
:::