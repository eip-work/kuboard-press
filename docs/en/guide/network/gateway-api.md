---
description: "Gateway API — next-generation traffic management: how it splits work with Ingress, installation prerequisites (CRDs and a gateway controller), a four-step flow to create your first HTTP gateway, ReferenceGrant cross-namespace authorization, a Route type comparison by use case, and troubleshooting when a route does not take effect"
---

# Gateway API — Next-Generation Network API

This page shows how to use the Gateway API in Kuboard to create your first HTTP gateway and complete cross-namespace reference authorization. It is intended for cluster administrators and application developers.

The Gateway API is the official next-generation traffic routing API from Kubernetes, designed to gradually replace Ingress: it splits Ingress's "one object describing both ingress and routing" approach into three tiers — **GatewayClass → Gateway → Route** — so cluster operators and application developers each manage their own concerns without stepping on each other's toes.

| Aspect | Ingress | Gateway API |
| --- | --- | --- |
| Object model | A single object carries both "ingress + routing" | Split into three tiers: GatewayClass / Gateway / Route |
| Division of responsibilities | Operators and application developers share the same object | Operators manage GatewayClass and Gateway; developers only manage Routes |
| Protocol support | Mostly HTTP / HTTPS | HTTP, HTTPS, TLS, TCP, UDP, gRPC |
| Cross-namespace | Limited support | Explicitly allowed through ReferenceGrant (reference authorization) |

::: tip Relationship with Ingress
The two can coexist: existing Ingress objects are unaffected, and for new ingress the Gateway API is recommended. Traditional Ingress is covered in [Service & Ingress](./services-ingress), and network isolation in [NetworkPolicy](./networkpolicy).
:::

## Prerequisites

1. **Install the Gateway API CRDs** (CustomResourceDefinition):

```sh
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
```

2. **Install a gateway controller** (choose one; feature support differs slightly between implementations; fill in its preset value as the "Controller Name" when creating a GatewayClass):

| Controller | Preset controller name |
| --- | --- |
| Istio | `istio.io/gateway-controller` |
| Envoy Gateway | `gateway.envoyproxy.io/gateway-controller` |
| Cilium | `io.cilium/gateway-controller` |
| NGINX Gateway Fabric | `gateway.nginx.org/nginx-gateway-controller` |
| ingress-nginx | `k8s.io/ingress-nginx` (requires starting with the `--enable-gateway-api` flag) |

### No "Gateway" menu found in Kuboard

1. The menu path is **Services & Networking → Gateway**. If the cluster does not have the Gateway API CRDs installed, the menu still appears but the list page is empty;
2. When you click **Create (+)**, Kuboard first probes resource availability. If the probe fails, a **"Resource Unavailable"** dialog pops up, offering a one-click copyable **install command** (the `standard-install.yaml` above), a component description, and links to the official documentation;
3. After installation, **refresh the page** and everything works as expected.

<!-- screenshot-todo: screenshot of the "Resource Unavailable" dialog shown during creation (with the install command and documentation links) -->

## Create Your First HTTP Gateway

Take the most common scenario as an example: route `example.com` HTTP traffic through a gateway to Service `my-web` in namespace `web`. The whole process has four steps. GatewayClass and Gateway are usually created by the cluster administrator; application developers mainly create Routes and attach them to existing Gateways.

### Step 1: Create a GatewayClass

1. Go to **Services & Networking → Gateway → GatewayClass**, and click **Create (+)**;
2. Fill in:

| Field | Description | Example |
| --- | --- | --- |
| Name | The GatewayClass name | `example-gateway-class` |
| Controller Name | Required. Select a mainstream controller from the dropdown, or enter it manually | `istio.io/gateway-controller` |
| Description | Optional, up to 256 characters |  |

3. Click **Save** → confirm in the **Preview YAML** dialog → after submitting, you are redirected to the details page. The GatewayClass appears in the list; if the **Status** on the details page shows the controller has taken over, it succeeded. (A GatewayClass is a cluster-scoped resource, so no namespace needs to be selected when creating it.)

::: tip Advanced option: parameter reference
When the controller needs an additional configuration object (e.g. a configuration-parameter CRD), expand "Enable Parameter Reference (Advanced)" in the form and fill in the Group / Kind / Name. Most scenarios don't need it; leave it off.
:::
<!-- screenshot-todo: screenshot of the GatewayClass creation form (controller name dropdown presets) -->

### Step 2: Create a Gateway

1. Go to **Services & Networking → Gateway → Gateway**, and click **Create (+)**, then fill in the **Name** and the **GatewayClass Name** (the name from Step 1);
2. In the **Listeners** table, click **Add Listener** and configure at least one:

| Field | Description | Example |
| --- | --- | --- |
| Name | Listener name | `http-listener` |
| Port | 1 - 65535 | `80` |
| Protocol | HTTP / HTTPS / TCP / TLS / UDP | `HTTP` |
| Hostname | Optional; when set, this listener only accepts traffic matching this hostname | `example.com` |
| Allowed Routes | Which namespaces' Routes may attach: `Same` (this namespace only) / `All` (all) / `Selector` (select by label) | `Same` |

3. **Address** is optional: if left empty, the controller assigns one automatically and you can view the actual address on the details page after creation. Save and confirm the preview YAML. If the **Status** on the details page shows the controller has taken over this Gateway, it succeeded; if not, see the troubleshooting at the end.
<!-- screenshot-todo: screenshot of the Gateway creation form's listener table (port/protocol/hostname/allowed routes) -->

### Step 3: Create an HTTPRoute

1. Go to **Services & Networking → Gateway → HTTP Route**, and click **Create (+)**, then fill in the **Name** (e.g. `my-web-route`);
2. In **Parent Refs**, click **Add Parent Ref** to point to the Gateway from Step 2:

| Field | Description |
| --- | --- |
| Name | Required. The Gateway name |
| Namespace | The namespace of the Gateway (optional if it is the same namespace as the Route) |
| Section Name / Port | Optional; precisely specify a listener to attach to |

3. Enter `example.com` in **Hostnames** (press Enter to confirm; if left empty, it matches all hostnames of the attached Gateway); in **Rules**, click **Add Rule**, then select the rule and configure **Backend Refs** in the "Selected Rules" area below:

| Field | Description | Example |
| --- | --- | --- |
| Type | The backend resource type, default `Service` | `Service` |
| Name | Select the Service in the namespace | `my-web` |
| Namespace | The namespace of the Service; cross-namespace requires a ReferenceGrant (see below) | `web` |
| Port | The Service port | `80` |
| Weight | Distribute traffic by weight across multiple backends (default 1) | `1` |

4. Save and confirm (result: the HTTPRoute appears in the list, and the **Attached Gateway** tab on the details page shows which Gateway it is attached to). Matches (path / header / query parameter / method) and filters (URL rewrite, header modification) are advanced capabilities: the form only shows the counts, and the details need to be edited in **YAML**. Most scenarios only need to configure hostname + backend refs.
<!-- screenshot-todo: screenshot of the HTTPRoute creation form (parent refs + hostname + rule backend refs) -->

### Step 4: Verify

1. **HTTPRoute details → Status**: if the controller has accepted the rules, the rules are in effect; **Gateway details → Attached Routes**: you can see `HTTPRoute / my-web-route`;
2. **Gateway details → Address**: confirm the gateway's external address (assigned by the controller);
3. Verify traffic with `curl`:

```sh
curl -H "Host: example.com" http://<gateway-address>/
```

Seeing the `my-web` response means it succeeded.

## ReferenceGrant — Cross-Namespace Reference Authorization

The Gateway API's default policy is: **namespaces are trust boundaries**. A Route can only reference objects in its own namespace; cross-namespace references are always rejected unless the namespace of the referenced object contains a matching ReferenceGrant. Two typical scenarios require creating one: a Route forwarding to a Service in another namespace, or a Route referencing a Gateway in another namespace (e.g. the `gateway-system` namespace where the unified gateway lives).

Go to **Services & Networking → Gateway → Reference Grant** (ReferenceGrant), and click **Create (+)**, then fill in the **Name** (e.g. `allow-web-to-my-web`) and configure the two tables below: **From** declares "who" is allowed to reference, and **To** declares "what may be referenced".

| Field | Description | Example |
| --- | --- | --- |
| Group | The group of the referencing resource | `gateway.networking.k8s.io` |
| Kind | The kind of the referencing resource | `HTTPRoute` |
| Namespace | The namespace of the referencing resource | `web` |

| Field | Description | Example |
| --- | --- | --- |
| Group | The group of the referenced resource (leave empty for the core group) | `""` |
| Kind | The kind of the referenced resource | `Service` |
| Name | Optional; limit to a specific object; if empty, all objects in the namespace | `my-web` |

::: warning Which namespace should the ReferenceGrant be in
A ReferenceGrant must be created in the namespace where the **referenced object** lives. For example, if a Route in namespace A references a Service in namespace B, create it in **namespace B**, with the From pointing to the HTTPRoute in A and the To pointing to the Service in B.
:::
<!-- screenshot-todo: screenshot of the ReferenceGrant creation form (From / To tables) -->

## Route Types by Use Case

| Type | Processing layer | Hostname | Rule capabilities | Use cases |
| --- | --- | --- | --- | --- |
| HTTPRoute | L7 | Yes | Path / header / query parameter / method matching, filters, weighted multi-backend | Websites, REST services, domain-based traffic splitting |
| GRPCRoute | L7 | Yes | Method-based matching, filters | gRPC microservices |
| TLSRoute | L4 | Yes (split by SNI) | Backend forwarding only | TLS termination (HTTPS origin), routing by certificate domain |
| TCPRoute | L4 | No | Backend forwarding only | TCP services such as databases and message queues |
| UDPRoute | L4 | No | Backend forwarding only | UDP services such as DNS and log collection |

- **Fine-grained forwarding by domain / path / header** → HTTPRoute; **gRPC traffic** → GRPCRoute;
- **Only forward TLS traffic by port + domain (SNI)** → TLSRoute; **raw L4 traffic** → TCPRoute / UDPRoute (no hostname; rules only contain backend refs).

## Troubleshooting: Where to Look When a Route Does Not Take Effect

When a route does not take effect, **check the status first, then the events**:

1. **Gateway details → Status** and **Route details → Status**: look for abnormal rows (Failed / Rejected); "Reason" and "Message" explain the cause directly. If the Route shows "the controller has not reported status", the controller has not processed it;
2. **Verify the attachments**: Route details → **Attached Gateway** to confirm it points to the correct Gateway; Gateway details → **Attached Routes** to confirm the Route is actually in the list.

Quick reference of common causes:

| Symptom | Common cause |
| --- | --- |
| Gateway status empty / controller not taken over | The gateway controller is not installed or not started; first check the "Prerequisites" |
| Route status abnormal (rejected) | Invalid listener configuration (port conflict, unsupported protocol), GatewayClass name does not exist |
| Route cannot attach to Gateway | Wrong name / namespace in the parent refs; listener protocol does not match the Route type; rejected by the listener's "Allowed Routes" |
| Cross-namespace forwarding fails | Missing ReferenceGrant (create it in the namespace of the referenced Service) |
| A hostname is set but access returns 404 | The Route's hostname does not match the listener's hostname; or the requested Host is not in the Route's hostname list |
| Backend connection fails | Wrong backend ref port, Service does not exist, weight is 0 |

::: tip How to view events
When status information is insufficient, open the **Events** tab of the corresponding object to check controller errors. In Kuboard, the "Events" entry is available in both the object list and the details page.
:::