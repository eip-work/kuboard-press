---
description: "Resource availability check and installation guidance: three interface behaviors, what the installation guidance contains, common unavailable scenarios and how to handle them, and the built-in component list"
---

# Resource Availability Check and Installation Guidance

When you open a resource list page and the selected cluster does not have the corresponding add-on component installed, Kuboard shows "Not Installed" and provides installation commands. This page is intended for cluster operations and platform engineers.

## Three Interface Behaviors

| When it happens | What you see |
| --- | --- |
| Opening a resource list page | A ⚠ warning icon appears next to the cluster in the cluster tree |
| Clicking the "Create" button | The "Resource Unavailable" dialog pops up and creation is blocked |
| Selecting a controller in the IngressClass form | An installation warning is displayed inline below the controller dropdown |

**Cluster tree ⚠ warning icon**: hovering over the icon pops up an installation guidance tooltip (component description, one-click copyable installation commands, installation docs and official website links); the list opens normally — the cluster just has no objects of this type yet.

**"Resource Unavailable" dialog**: clicking "Create (+)" probes the target cluster first. If available, the normal creation flow proceeds (form / YAML); if unavailable, a dialog pops up (titled with the component name) containing installation guidance, and creation is blocked.

**IngressClass inline warning**: when creating or editing an IngressClass and selecting a controller (e.g. NGINX, Traefik), if the controller is not deployed in the current cluster, a warning and a copyable installation command are displayed inline below the dropdown.

::: tip No false alarms on probe failure
When a probe request fails due to network or authorization issues, the UI treats the component as available by default (fail-open): no prompt is shown and operations are not blocked.
:::

## What the Installation Guidance Contains

| Content | Description |
| --- | --- |
| Component name / description / docs | E.g. Kubernetes Gateway API, cert-manager, with official docs and website links |
| Installation commands | kubectl / helm commands with a one-click copy button |

## Common Unavailable Scenarios and How to Handle

| Scenario | What happens | How to handle |
| --- | --- | --- |
| Gateway API CRDs not installed | ⚠ appears next to the cluster in the gateway page cluster tree; creation is blocked | Run the command from the prompt on the cluster, then refresh after installation. Full workflow see [Gateway API](../guide/network/) |
| Selected Ingress controller not deployed | Inline warning in the IngressClass form | Install as prompted, or switch to an existing controller in the cluster. Traditional Ingress see [Services and Ingress](../guide/network/) |
| VolumeSnapshot CRDs not installed | ⚠ appears next to the cluster in the snapshot page cluster tree | Install the CSI snapshotter CRDs as prompted, then refresh |
| Unrecognized API group | Shows "Unrecognized K8s add-on component", with no installation command | Not in the built-in list; confirm the component's source yourself and install it manually |
| Cluster connection failure | Resource page fails to load or shows the cluster as unreachable | Check cluster connectivity; unrelated to whether resources are installed |

::: warning Empty list ≠ not installed
If the list is empty without a ⚠ prompt, the resources are installed and the cluster just has no objects of this type; create directly.
:::

## Built-in Component List

The following 11 types of components have built-in installation guidance; when not installed, you can copy the installation command directly from the prompt:

| Component | API Group |
| --- | --- |
| Kubernetes Gateway API | gateway.networking.k8s.io |
| cert-manager | cert-manager.io |
| Argo CD | argoproj.io |
| Istio | networking.istio.io |
| KEDA | keda.sh |
| Prometheus Operator | monitoring.coreos.com |
| Velero | velero.io |
| Cilium | cilium.io |
| VolumeSnapshot | snapshot.storage.k8s.io |
| Tekton | tekton.dev |
| Ingress controllers | networking.k8s.io/ingressclasses (NGINX / Traefik / HAProxy / Contour) |

API groups not in the list fall back to a generic prompt. For daily use of custom resources, see [Custom Resource Instances](../guide/crd/).

::: tip Still showing "Not Installed" after installation?
Refresh the page after the component is installed and the prompt disappears.
:::
