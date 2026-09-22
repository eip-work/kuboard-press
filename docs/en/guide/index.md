---
description: "Kuboard V4 user guide overview: cluster management, workloads, config & storage, networking, cluster resources, custom resources, operational visualizations, and a term quick reference"
---

# Using Kuboard V4

This section is organized around the journey of using a Kuboard instance on a daily basis, from importing a cluster to everyday operations. If this is your first time, start with [Importing a Cluster](./cluster/import).

## Quick Navigation

| Section | Content | Use case |
| --- | --- | --- |
| [Cluster Management](./cluster/import) | Import, edit, sync status, import/export resources | Connect the first cluster, maintain cluster connections |
| [Workloads](./workload/) | Deployment / StatefulSet / DaemonSet / Job / CronJob / Pod, plus HPA and Continuous Deployment (CD) | Deploy and manage business applications |
| [Config & Storage](./config-storage/configmaps-secrets) | ConfigMap / Secret / PVC / PV / StorageClass / CSI | Application configuration and persistent storage |
| [Networking](./network/services-ingress) | Service / Ingress / NetworkPolicy / Gateway API | Expose applications and network policies |
| [Cluster Resources](./cluster-resources/nodes) | Node / Namespace / Quota / LimitRange / PDB / Scheduling / Admission / FlowControl / DRA | Cluster-level resource management |
| [Custom Resources](./crd/crds) | CRDs and custom resource instances | Extend the Kubernetes API |
| [Operations](./ops/resource-map) | Events, resource map, addon marketplace | Troubleshooting and routine inspection |

## Recommended Reading Order

1. **First-time use**: start by [importing a cluster](./cluster/import), then deploy your first application with [Deployments](./workload/deployments);
2. **Daily releases**: get familiar with the [Workloads](./workload/) sections, and script your release operations with [Continuous Deployment (CD)](./workload/cd);
3. **Autoscaling**: configure [Horizontal Pod Autoscaling (HPA)](./workload/hpa) for your workloads;
4. **Going deeper**: read [Config & Storage](./config-storage/configmaps-secrets), [Networking](./network/services-ingress), [Cluster Resources](./cluster-resources/nodes) and other sections as needed;
5. **Operations & troubleshooting**: quickly locate problems with [Events](./ops/events) and the [Resource Map](./ops/resource-map).

## Term Quick Reference

Common Kubernetes / Kuboard terms you will meet in this guide:

| Term | Meaning | Related docs |
| --- | --- | --- |
| **Cluster** | A Kubernetes cluster that can be connected and managed centrally | [Import a Cluster](./cluster/import) |
| **Namespace** | A logical partition that isolates resources; permissions and quotas are scoped to it | [Namespaces](./cluster-resources/namespaces) |
| **Workload** | A collective term for "business-running" resources such as Deployment | [Deployments](./workload/deployments) |
| **Pod** | The smallest runnable unit of a workload; one or more containers share network and storage | [Pods](./workload/pods) |
| **HPA** | Automatically scales workload replicas based on metrics | [Horizontal Pod Autoscaling](./workload/hpa) |
| **Continuous Deployment (CD)** | Automates release operations with a set of scripts | [CD](./workload/cd) |
| **Service / Ingress** | Expose applications inside or outside the cluster | [Networking](./network/services-ingress) |
| **ConfigMap / Secret** | Separate configuration and sensitive data from images | [Config & Storage](./config-storage/configmaps-secrets) |
| **PVC / PV** | Request persistent storage volumes for workloads | [PVC / PV](./config-storage/pvc-pv-storageclass) |
| **Node** | A compute node (server) in the cluster | [Nodes](./cluster-resources/nodes) |
| **Addon** | A functional extension package installable from the Addon marketplace | [Addon Marketplace](./ops/addon-marketplace) |
| **Audit** | Records logs of key operations such as logins and permission changes | [Audit Log](../ops/audit-log) |

For more terms and concepts, see the [Glossary](../reference/glossary).

::: tip Documentation and screenshot progress
All sections in this guide now have complete step-by-step instructions. Some pages are still having interface screenshots added; the steps remain fully actionable without them.
:::
