---
description: "Configure HTTPS and WebSocket for Kuboard via an Nginx reverse proxy or a Kubernetes Ingress, for use in production environments"
---

# Reverse Proxy

Configure HTTPS and WebSocket for Kuboard (via an Nginx reverse proxy or a Kubernetes Ingress) for use in production.

## Why Use a Reverse Proxy

Kuboard uses plain HTTP by default so that you can try it out quickly. In production, make sure HTTPS is enabled. You can either enable HTTPS directly on a Kubernetes Ingress and forward traffic to the Kuboard Service, or set up your own Nginx in front of Kuboard and configure HTTPS on it.

## Two Things to Note

- **WebContextRoot (root path)**: Kuboard must be served from the root path, e.g. `https://kuboard.yourcompany.com/`; sub-paths such as `https://yourcompany.com/kuboard/` are not supported.
- **WebSocket must be enabled**: the terminal and log features rely on WebSocket, so the reverse proxy must allow WebSocket upgrade requests, otherwise the terminal and logs will not work.

## Nginx Configuration Example

When using Nginx as the reverse proxy, replace the two addresses marked in the comments with your domain and Kuboard node address, then use it directly; if HTTPS is enabled on Nginx, also uncomment the `# proxy_set_header X-Forwarded-Proto https;` line in both `location` blocks.

```nginx
server {
  listen  80;
  server_name kuboard.yourdomain.com;   # replace with your domain
  location / {
    proxy_pass  http://192.168.2.39:32567;  # replace with your node address
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # enable this if you have enabled HTTPS on the reverse proxy
  }
  location /k8s-ws/ {
    proxy_pass  http://192.168.2.39:32567;  # replace with your node address
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Upgrade "websocket";
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # enable this if you have enabled HTTPS on the reverse proxy
  }
  gzip on;
}
```

## Ingress Configuration Example

When using nginx-ingress as the Ingress Controller, save the following configuration as `ingress.yaml`, replace the domain and the certificate Secret (which must be created in advance), then run `kubectl apply -f ingress.yaml`; for other Ingress controllers (traefik, ingress-nginx, etc.), refer to the [official documentation](https://docs.nginx.com/nginx-ingress-controller/overview/) and configure WebSocket and PassHeader yourself.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kuboard
  namespace: kube-system
  annotations:
    nginx.org/websocket-services: kuboard
    nginx.org/proxy-pass-headers: 'Upgrade,Connection,Authorization'
spec:
  rules:
    - host: demo.kuboard.cn
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: kuboard
                port:
                  name: http
  tls:
    - hosts:
        - demo.kuboard.cn
      secretName: demo.kuboard.cn
```

- The two annotations `nginx.org/websocket-services` and `nginx.org/proxy-pass-headers` enable WebSocket and forward the authorization header (for session affinity or display name, you can add the `nginx.com/sticky-cookie-services` and `k8s.kuboard.cn/displayName` annotations yourself).

## Related Documentation

- [Quick Start](./quickstart) — single-node deployment
- [High Availability (HA)](./ha) — multi-replica deployment and load balancing
- [Index](./index) — other deployment scenarios
- [Upgrade](./upgrade) — version upgrades and data backup
- [Migrating from v3](./migration-from-v3) — migrating from v3 to v4