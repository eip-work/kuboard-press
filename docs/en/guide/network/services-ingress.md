---
description: "Service and Ingress (Service Discovery and External Exposure): the four Service types (ClusterIP/NodePort/LoadBalancer/ExternalName) with creation/editing/deletion, port and selector configuration, Ingress layer-7 routing rules and TLS, IngressClass notes, and troubleshooting points when a service is not reachable (Endpoints / Events)"
---

# Service and Ingress (Service Discovery and External Exposure)

Service and Ingress are what "expose" workloads to the outside world: a **Service** provides a stable in-cluster access entry point and load balancing, while an **Ingress** provides layer-7 (HTTP/HTTPS) domain-based routing. A typical external access path is:

```text
Ingress (domain + path) → Service (port) → Pod
```

In Kuboard these two objects live under **Service & Network → Services & Routing** in the navigation.

::: tip Creation order
The backend of an Ingress is a Service, and the backend of a Service is a labeled Pod. First create Pods with a workload such as a [Deployment](../workload/deployments), then create the Service, and finally (if external exposure is needed) create the Ingress.
:::

## Entry Point

1. Log in to Kuboard and go to the target cluster and namespace;
2. In the left navigation click **Service & Network → Services & Routing**, which contains three pages:

| Page | Resource | Description |
| --- | --- | --- |
| Services | `v1`, empty apiGroup | The topic of this page |
| Ingresses | `networking.k8s.io` | The topic of this page; labeled "Ingresses" in the UI |
| IngressClasses | `networking.k8s.io`, cluster-scoped | Designates the Ingress controller |

The same group also contains [Gateway (Gateway API)](./gateway-api), [NetworkPolicy](./networkpolicy), EndpointSlices (`discovery.k8s.io`) and other entries.

The list pages are Kuboard's generic resource lists: at the top you can pick the cluster / namespace (or switch to tree navigation), search by name, and batch delete; each row offers **Edit / YAML / Delete** actions, and clicking the name opens the detail page.

## Service: In-Cluster Service Discovery and Load Balancing

A Service is a stable layer-4 (TCP/UDP) access entry point: it aggregates the Pods carrying the same labels behind a fixed ClusterIP (a virtual IP inside the cluster) and a DNS name, so callers are unaffected when Pods restart or their IPs change.

### The Four Service Types

| Type | Access Scope | Typical Use Case | ClusterIP |
| --- | --- | --- | --- |
| ClusterIP (default) | Cluster-internal only | Microservices calling each other | Yes |
| NodePort | Outside the cluster | Node IP + fixed port; suited to self-hosted / bare-metal environments | Yes |
| LoadBalancer | Outside the cluster | A cloud load balancer allocates a public IP | Yes |
| ExternalName | Cluster-internal | Maps an external domain to a Service name in this cluster (no selector, no ports) | No |

::: tip Choosing a type
If you are not sure whether to expose the service, start with **ClusterIP**; you can switch the type later at any time. In cloud environments expose with LoadBalancer; in self-hosted clusters without a cloud LB use NodePort.
:::

### Creating a Service

1. Go to the **Services** list page and click **Create** in the top right;
2. **Basic information**: enter the name (required, unique within the namespace), labels, and annotations;
3. **Basic configuration**: fill in the selector first, then choose the service type and configure the ports;
4. **Advanced configuration** (optional): session affinity, etc.;
5. Click **Save**, confirm in the **YAML preview**, then submit; you are taken to the detail page.

<!-- screenshot-todo: Service creation page "Basic Configuration" tab (selector + service type + port table) screenshot -->

#### Filling in the Selector: How It Ties to Pods

The selector decides which Pods receive traffic: a Pod's labels must include **all** key-value pairs in the selector (multiple labels combine with AND).

- **Add manually**: click "Add label" and fill in one label key / value per row (e.g. keys such as `app`, `role`);
- **Import from Pod**: in "Import from Pod" choose a Pod in this namespace and all of its labels are merged into the selector (a duplicate key overwrites the existing value).

::: warning Keep the selector consistent with the workload labels
When you create a [Deployment](../workload/deployments), Kuboard writes an `app=<name>` label by default and propagates it to the Pod template. Copy that set of labels into the Service selector and it will select those Pods; a mismatched selector is the most common cause of a service being unreachable.
:::

#### Filling in the Ports

Columns of the port table:

| Column | Description | Allowed Range |
| --- | --- | --- |
| Name | Port name (optional, e.g. `http`) | - |
| Protocol | TCP / UDP / SCTP | - |
| Port | The port used to reach the Service from inside the cluster | 1 - 65535 |
| Target Port (targetPort) | The port that traffic is forwarded to inside the Pod's container | 1 - 65535 |
| Node Port (nodePort) | Shown only for NodePort / LoadBalancer types; leave empty to auto-assign | 30000 - 32767 |
| App Protocol (appProtocol) | Optional, e.g. `http` (shown when supported by the cluster version) | - |

The access path is `Service port → targetPort → container listening port`. Click the "+" at the start of a row to add more ports (e.g. to expose both 443 and 80).

#### What Happens When You Switch the Service Type

You can switch the type at any time in the edit page after creation; the form automatically adds or removes fields:

| Switch to | Automatic Changes |
| --- | --- |
| ExternalName | Removes ports, selector, ClusterIP and advanced configuration; an "External name" input appears (must be a valid domain, e.g. `example.com`) |
| NodePort | A "Node Port" column appears in the port table |
| LoadBalancer | A "Node Port" column appears in the port table; external traffic policy, load balancer IP and source ranges appear in advanced configuration |
| ClusterIP | Removes fields that are only visible externally, such as nodePort |

::: warning ClusterIP cannot be changed after creation
ClusterIP is assigned automatically by the cluster (shown as "auto-assigned"). To pin a fixed IP you must set `spec.clusterIP` in YAML at creation time; it cannot be changed afterwards.
:::

#### Advanced Configuration (Optional)

| Field | Description |
| --- | --- |
| Session affinity | `None` (default; requests may go to any Pod) or `ClientIP` (requests from the same source IP stick to the same Pod); optional timeout (default 10800 seconds) |
| External traffic policy | LoadBalancer only: `Cluster` (forward to all nodes) / `Local` (preserves the source IP with one hop less, but traffic can be uneven) |
| Load balancer IP / source ranges | LoadBalancer only: request a fixed IP; restrict access sources by CIDR, one per line, e.g. `192.168.1.0/24` |
| Publish not-ready addresses | When enabled, not-ready endpoints also take part in forwarding (custom health-check scenarios) |
| Internal traffic policy | `Cluster` / `Local`: whether in-cluster traffic is forwarded only within the local node |

### Editing and Deleting a Service

- **Edit**: click **Edit** on the list row to reuse the creation form; you can directly change ports, the selector, or the type;
- **Delete**: delete from a row, or check entries and batch delete; you must type the object name to confirm.

::: warning Impact of deletion
After a Service is deleted, Pods that depend on its DNS (`servicename.namespace.svc`) can no longer resolve it, and the Ingress backends that reference it stop working. Before deleting, make sure no other object references it.
:::

### Verifying a Service Is Reachable (Detail Page)

The top of the detail page shows the service type, ClusterIP and LoadBalancer external address; each row of the port table offers:

- **Access hint**: `ClusterIP:port` from inside the cluster; within a Pod in the same namespace you can use `servicename:port`; for NodePort there is an additional hint `<any-node-IP>:nodePort` (reachable from the node's network);
- **Proxy** button: Kuboard proxies the request to the service through the apiserver (requires `services/proxy` get permission), a quick way to verify that the HTTP service really responds.

<!-- screenshot-todo: Service detail page (type badge + port table + "Access hint" popover) screenshot -->

::: tip Why ping does not reach the service
ClusterIP is a virtual IP forwarded by kube-proxy via iptables / ipvs rules and does not support ICMP. A failed ping does not mean the service is down; verify with curl or the "Proxy" button instead.
:::

## Ingress: Layer-7 HTTP/HTTPS Routing

Ingress is layer-7 routing: it forwards external HTTP/HTTPS requests to in-cluster Services by **hostname (host) + path**. The actual routing is implemented by the controller designated by the IngressClass (such as Nginx Ingress Controller or a cloud provider's LB controller).

### Creating an Ingress

1. Go to the **Ingresses** list page and click **Create** (Ingress can be created from the form or directly from YAML);
2. **Basic information**: name, labels, annotations;
3. **Ingress configuration**: choose the Ingress class name and optionally a default backend;
4. **Routing rules**: add rules (host + path table);
5. **TLS configuration** (optional): HTTPS certificates;
6. Click **Save** and submit after previewing the YAML.

<!-- screenshot-todo: Ingress creation page "Routing Rules" tab (Rule card: host + path/pathType/backend service table) screenshot -->

#### Filling in the Routing Rules

Each rule = one hostname + a set of paths:

| Field | Description |
| --- | --- |
| Host | The domain the rule applies to, e.g. `demo.example.com`; **leave empty to match all hosts** |
| Path | The URL path, e.g. `/`, `/api` |
| Path type | `Exact` exact match / `Prefix` prefix match (default) / `ImplementationSpecific` interpreted by the controller |
| Backend service | Choose a Service from this namespace (listed automatically in the dropdown) |
| Service port | Once a service is chosen its port list is shown; pick one |

You can add multiple paths under one host pointing at different backend Services to route "by path on the same domain", or add multiple rules to "share one entry point across domains".

#### TLS Configuration (HTTPS)

- Click **Add TLS** to enable HTTPS for the specified hosts;
- **Hosts list**: choose from the hosts of existing rules, or type them directly;
- **Secret name**: select an existing TLS Secret (type `kubernetes.io/tls`), or click "Quick create" to create a new one (requires a certificate and private key);
- TLS applies only to the hosts listed; hosts not listed still use HTTP.

#### About Ingress Classes (IngressClass)

- IngressClass is a cluster-scoped resource that designates the implementing controller (e.g. `nginx`); it is picked from a dropdown when creating an Ingress;
- The dropdown shows the **controller name**; the one marked "default" is the cluster default class (annotation `ingressclass.kubernetes.io/is-default-class: "true"`), which is used when the field is left empty;
- When the cluster has **no IngressClass installed**, a hint appears and you can jump to the "IngressClasses" page to create one;
- Typing a class name that does not exist in the cluster shows "This IngressClass does not exist in the cluster; the Ingress will be ignored after creation";
- When the current user has no `ingressclasses` list permission, the dropdown degrades to manual input;
- Kubernetes versions below 1.18 have no `spec.ingressClassName` field; the creation page automatically provides an input for the legacy `kubernetes.io/ingress.class` annotation instead.

::: warning Without an IngressClass the Ingress will not take effect
Before creating an Ingress, make sure the cluster has an Ingress controller installed (such as ingress-nginx) and that a matching IngressClass exists on the **IngressClasses** page; otherwise the Ingress will stay in the "no address allocated yet" state.
:::

#### Default Backend (Optional)

The fallback backend used when no rule matches; once a Service is chosen its ports are shown automatically. If not set, unmatched requests return 404.

### Viewing Ingress Details and Deleting

The detail page shows: basic information (name / namespace / labels / annotations), the routing rules table (path / pathType / backend service and port), TLS (hosts list + Secret name), the default backend, and **Status → Address** (the external IP / domain allocated by the controller; "No address allocated yet" is shown if none has been).

Deletion works the same way as for Services (per-row or batch delete, type the name to confirm). After deletion the domain routing stops working immediately, but the Services and Pods are unaffected.

## Troubleshooting: Where to Look When a Service Is Not Reachable

If verification against the access address shown on the detail page still fails, work through the following in order:

1. **Check the Endpoints** ("Endpoints & Pods" section of the Service detail page)
   - This section lists the **ready / not-ready** addresses of the Endpoints (you can check a box to show only one category); clicking an address shows the Pod details or address information;
   - **No ready addresses**: the selector did not match any Pod; go back to the creation page and compare the selector with the Pod labels;
   - **Addresses exist but marked "not ready"**: the readiness probe of the corresponding Pod is failing, so no traffic is distributed to it.
   - Note: the Service detail currently shows v1 Endpoints (newer Kubernetes versions use EndpointSlices underneath; see **Service & Network → EndpointSlices**).
2. **Check the events** (the "Events" panel on the Service / Ingress detail pages)
   - The panel shows events related to the object by UID, such as LoadBalancer allocation failures, type changes, NodePort allocation and other anomalies.
3. **Common causes at a glance**

| Symptom | Common Causes |
| --- | --- |
| Endpoints has no ready addresses | Selector mismatch / Pod not ready (readinessProbe failing) / backend Pods deleted |
| `servicename:port` unreachable inside the cluster | Service port and targetPort swapped; Pod not listening on that port |
| NodePort unreachable | Node firewall does not allow 30000-32767; access source is not on a network reachable from the node |
| LoadBalancer has no external address | Cloud LB not ready; external traffic policy `Local` leaves no node to forward to |
| Ingress has no address | IngressClass not installed / class name does not exist and was ignored / controller did not allocate an address |
| Ingress returns 404 | host / path matches no rule; backend Service missing or wrong port |

::: tip Quick command-line reference
```sh
kubectl -n <ns> get svc,ingress
kubectl -n <ns> get endpoints            # whether the backend addresses are ready
kubectl -n <ns> describe svc <name>      # view events and port definitions
kubectl -n <ns> describe ingress <name>
kubectl -n <ns> get pod -o wide          # compare Pod labels and IPs
```
:::

## Related Pages

- [Gateway (Gateway API)](./gateway-api): the next-generation gateway API (GatewayClass / Gateway / HTTPRoute)
- [NetworkPolicy](./networkpolicy): east-west traffic control inside the cluster
- [Namespaces](../cluster-resources/namespaces): resource isolation and naming boundaries
- [Deployment](../workload/deployments), [Pod](../workload/pods): the backend source of a Service
- Secret: where TLS certificates are stored (Configuration & Storage → Secrets)
- Nodes & runtime: [Nodes](../cluster-resources/nodes) — where NodePort entries actually live
