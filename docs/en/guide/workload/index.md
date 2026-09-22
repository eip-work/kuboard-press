---
description: "Workload management overview: Deployment, StatefulSet, DaemonSet, Job, CronJob, Pod, HPA and Continuous Deployment (CD)"
---

# Workloads

Kuboard covers every built-in Kubernetes workload type — Deployment, StatefulSet, DaemonSet, Job, CronJob and Pod — along with HPA (Horizontal Pod Autoscaling) and Continuous Deployment (CD).

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Deployment](./deployments) | Replica sets with rolling updates and rollbacks | Stateless services and web apps |
| [StatefulSet](./statefulsets) | Stateful replicas with stable network identity and storage | Databases, message queues and other stateful workloads |
| [DaemonSet](./daemonsets) | One Pod per Node (or matching Node selector) | Node-level agents such as log shippers and CNI plugins |
| [Job / CronJob](./jobs-cronjobs) | One-shot and scheduled batch workloads | Data processing, cleanup and scheduled tasks |
| [Pod](./pods) | Lowest-level Pod view, container state, terminal and logs | Debugging individual containers and accessing shell |
| [HPA](./hpa) | Horizontal Pod Autoscaling on CPU, memory or custom metrics | Scale replicas based on load |
| [Continuous Deployment (CD)](./cd) | Image tag update and rolling restart APIs | Drive releases from CI pipelines or AI agents |

## Recommended Reading Order

1. **First deployment** — open [Deployment](./deployments) and ship a stateless application;
2. **Stateful workloads** — move to [StatefulSet](./statefulsets) once the application needs stable identity or persistent storage;
3. **Node-level workloads** — read [DaemonSet](./daemonsets) for cluster-wide agents;
4. **Batch jobs** — read [Job / CronJob](./jobs-cronjobs) for one-off or scheduled tasks;
5. **Autoscaling** — configure [HPA](./hpa) to handle variable load;
6. **Release automation** — integrate CI with [Continuous Deployment (CD)](./cd) to replace manual restarts.

::: tip Where to go next
After you have a workload running, configure its [ConfigMap / Secret](../config-storage/configmaps-secrets) and PVC bindings. Use the [Operations](../ops/) section's Events and Resource Map to keep an eye on the workload in production.
:::