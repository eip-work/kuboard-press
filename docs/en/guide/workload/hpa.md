---
description: "Enable Horizontal Pod Autoscaling (HPA) for a Deployment / StatefulSet: create / edit / detail page entries, the decision summary and scaling diagnostics, CPU / memory metrics, scaling conditions and events, autoscaling v1/v2 form differences and advanced configuration"
---

# Horizontal Pod Autoscaling (HPA)

This page explains how to enable Horizontal Pod Autoscaling (HPA) for workloads in Kuboard, configure CPU / memory metrics, and view scaling conditions and events.

HPA periodically collects resource metrics such as CPU and memory from the workload and automatically adjusts the replica count between the **minimum replicas** and **maximum replicas**: scaling up during traffic peaks and scaling down during lulls. **Who it is for**: cluster operators and application owners.

::: tip Prerequisites
The cluster must have **metrics-server** (`metrics.k8s.io`) installed to provide resource metrics. If it is not installed, the summary card prompts "please make sure the cluster has metrics-server installed", and metric-based autoscaling will not work.
:::

## Where to Find the Entry

There are three entry points for managing HPA:

1. **Auto Scaling list page**: left navigation **Workloads → Auto Scaling** (Pod Auto Scalers) shows all HPAs by Namespace. Each row shows the status, the scaled workload (Reference), the metrics, the replica count and the replica range; expanding a row shows that HPA's scaling conditions;
2. **HPA detail page**: opened from the list page. The first screen answers "why are there N replicas right now", followed by metrics and thresholds, diagnostics (conditions and events), scaling behavior, the target workload, and the replica trend over time;
3. **Scaling panel on the workload detail page**: on the Deployment / StatefulSet detail page click **Scale**, and the panel opens with the **HPA summary** card on the right (the manual scaling card is on the left).

On the HPA card of the workload detail page, click **Edit HPA** to go straight to that HPA's edit page.

## Create an HPA

The create page asks for the scaled workload (kind, name, API version) and the replica range.

1. **From the workload detail page**: open the Deployment / StatefulSet detail page, click **Scale** in the page header, then click **Enable Horizontal Pod Autoscaler** in the **HPA summary** card on the right — the scaled workload is filled in for you;
2. **From the Auto Scaling list page**: click the create button on the list page and fill in the scaled workload yourself.

Review the defaults and submit: min replicas `1`, max replicas `2` (clusters on autoscaling/v1 additionally default to a 60% target CPU utilization).

After creation the summary card on the workload detail page refreshes automatically, and you can configure the scaling spec and metrics there.

## Configure Specs and Metrics

### Auto-detect the HPA Version

Kuboard automatically detects the preferred version of the cluster's `autoscaling` group and renders a different form accordingly:

| Detected version | Form capabilities |
| --- | --- |
| autoscaling/v1 | Single metric: min / max replicas + target CPU utilization (1 ~ 100, step 10, unit %) |
| autoscaling/v2 | Multiple metrics: min / max replicas + CPU / memory metrics |

### Editing v2 Metrics

In the v2 form, CPU and memory each occupy one row; click the inline edit button on a row to enter edit mode:

| Target type | Meaning | Available resources |
| --- | --- | --- |
| Utilization | Target set as the average utilization of the resource request, 1 ~ 100 (%) | CPU only |
| Average Value | Target set as the average absolute value per replica (Quantity format) | CPU, memory |

- CPU Average Value example: `100m` or `2` (cores); memory Average Value example: `200Mi` or `1G`; the default target type is **Utilization** for CPU and **Average Value** for memory;
- The target value is format-checked before submission; an invalid value cannot be saved. The inline **✕** button removes that metric.

Full v2 object example (the form only generates CPU / memory metrics; advanced fields such as multiple metrics, Object / Pods custom metrics and scaling behavior are maintained by editing the full object via the **YAML** button on the summary card):

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web
  namespace: default
spec:
  minReplicas: 1
  maxReplicas: 5
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
    - type: Resource
      resource:
        name: memory
        target:
          type: AverageValue
          averageValue: 200Mi
```

## HPA Detail Page

Open the HPA detail page by clicking the HPA name in the list. The page is organized as "conclusion first, details after":

| Section | What it answers |
| --- | --- |
| Decision summary | Why there are N replicas right now |
| Metrics and thresholds | Which metric is used and what the target is (adjustable in place) |
| Diagnostics | Scaling conditions and related events (shown together) |
| Scaling behavior | The scale-up / scale-down policy (collapsed when the default policy is used) |
| Target workload | Which Deployment / StatefulSet is being scaled |
| Trend | How the replica count changed over time |

The status shown on the list page and the detail page is one of: **Normal**, **Replica limit reached**, **Scaled down to the minimum**, **Status to be confirmed**, **Abnormal**, **Unknown**.

## Conditions and Events

| Condition | Display | Description |
| --- | --- | --- |
| AbleToScale | Able to scale | Whether the controller can read and adjust the replica count of the target workload |
| ScalingActive | Scaling active | Whether metrics have been collected and scaling is active (`False` is common when metrics-server is not installed) |
| ScalingLimited | Within range | Whether the desired replica count is within the min / max replica bounds |

When ScalingLimited is True, a prompt indicates that the desired replica count is out of range; if min replicas is set to 1, this prompt can be ignored. The bottom of the summary card also shows the Kubernetes **events** related to this HPA, for troubleshooting scaling anomalies.

## Summary Card Actions

| Action | Description |
| --- | --- |
| YAML | Opens the full object of the HPA in a dialog (editable); the summary refreshes automatically after saving. This is the entry point for advanced capabilities (custom metrics, scaling behavior) |
| Disable Horizontal Pod Autoscaler | Deletes the HPA; you must type the object name to confirm. To restore it afterwards, re-enable it following the steps above |
| Refresh | Re-fetches the HPA object, conditions and events |

## v1 vs v2 Comparison

| Dimension | autoscaling/v1 | autoscaling/v2 |
| --- | --- | --- |
| Number of metrics | Single (target CPU utilization) | Multiple (scale up when any metric is exceeded) |
| Metric types | CPU resource utilization only | Resource / Object / Pods, each with a Utilization or Average Value target |
| Memory metric | Not supported | Supported (Average Value, Quantity format) |
| Scaling behavior | None | `spec.behavior` (stabilization window, step limits, etc.) |
| Kuboard form | Min / max replicas + target CPU utilization | Min / max replicas + CPU / memory metrics |

## Related Pages

- [Deployment](./deployments): scaling panel entry for stateless applications
- [StatefulSet](./statefulsets): scaling panel entry for stateful applications
- [Pod](./pods): the smallest scheduling unit scaled by HPA
- [Jobs / CronJobs](./jobs-cronjobs): batch workloads, HPA association not supported

<!-- screenshot-todo: Suggested images: Deployment detail page → scaling panel → HPA summary card (with metrics and conditions), and Workloads → Auto Scaling list page -->