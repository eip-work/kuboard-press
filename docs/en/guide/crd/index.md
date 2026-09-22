---
description: "Custom resources overview: CRD (CustomResourceDefinition) registration, CR instances, CRD views"
---

# Custom Resources

The Kubernetes extension mechanism lets platforms and applications define their own API types. This section covers how Kuboard discovers, presents and manages CRDs (CustomResourceDefinition, Kubernetes Custom Resource Definitions) and their CR (Custom Resource) instances.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [CRDs](./crds) | Inspect registered CRDs: scope, versions and categories | See what extension APIs the cluster offers |
| [Custom Resource Instances](./custom-resources) | List, create, edit and delete instances of a specific CRD | Day-to-day use of Operator or platform-driven CRDs |

## Recommended Reading Order

1. **Survey cluster capabilities** — open [CRDs](./crds) to see what is already registered and confirm the resource you need is available;
2. **Daily operations** — move to the relevant CRD's [Custom Resource Instances](./custom-resources) list to perform CRUD (Create, Read, Update, Delete) operations;
3. **Missing resources** — if a CRD is installed in the cluster but not shown by Kuboard, it usually means the cache has not synced yet. Trigger a full sync or wait for the next cycle.

::: tip Auto-discovery
CRDs do not require manual menu registration: `LoginServiceMenuLoader.populateCustomResourceMenu` automatically builds the "Custom Resources" group in the left sidebar from any synchronized CRD. Common CRDs (Cert-Manager, Argo CD, Ingress-NGINX, etc.) usually appear within one sync cycle of installation.
:::