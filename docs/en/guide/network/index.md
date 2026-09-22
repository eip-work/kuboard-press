---
description: "Services and networking overview: Service, Ingress, NetworkPolicy, Gateway API"
---

# Services and Networking

External exposure and in-cluster network isolation are central to both reachability and security on Kubernetes. This section covers Service, Ingress, NetworkPolicy and the next-generation Gateway API.

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Service / Ingress](./services-ingress) | Service types and Ingress layer-7 routing | Expose applications and front them with a load balancer |
| [NetworkPolicy](./networkpolicy) | Pod- and Namespace-level ingress/egress policy | Network isolation between microservices |
| [Gateway API](./gateway-api) | GatewayClass, Gateway, HTTPRoute and other next-generation APIs | Complex routing, cross-namespace and multi-protocol gateways |

## Recommended Reading Order

1. **Expose first, tighten second** — when shipping a service, start with [Service / Ingress](./services-ingress) to make it reachable;
2. **Layer on security** — use [NetworkPolicy](./networkpolicy) to restrict Pod-to-Pod traffic at the namespace or service level;
3. **Move to Gateway API last** — when you outgrow Ingress (many rules, cross-namespace sharing, or advanced TCP / TLS needs), migrate to [Gateway API](./gateway-api).

::: tip Picking the right backend
- If the cluster already has the Gateway API CRDs (`gateway.networking.k8s.io`), go straight to [Gateway API](./gateway-api);
- If the cluster only has Ingress-NGINX or another classic Ingress, keep using [Service / Ingress](./services-ingress).
:::