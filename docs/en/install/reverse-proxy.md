---
description: Configure HTTPS and WebSocket for Kuboard via Nginx reverse proxy or Kubernetes Ingress
---

# Reverse Proxy

This document explains how to configure HTTPS and WebSocket support for Kuboard using Nginx or a Kubernetes Ingress controller. The terminal and log features depend on WebSocket connectivity.

## Why Use a Reverse Proxy

Kuboard uses plain HTTP by default so that users can quickly try it out. In production environments you should always enable HTTPS for stronger security. The easiest way to do this is to configure HTTPS on a Kubernetes Ingress in front of Kuboard; alternatively you can use your own Nginx server to reverse-proxy traffic to Kuboard and terminate TLS there.

## Important Notes

When configuring a reverse proxy for Kuboard, keep the following in mind:

- **WebContextRoot**
  - Kuboard must be served from the root path: `https://yourkuboard.yourcompany.com/`. Sub-paths such as `https://yourcompany.com/kuboard/` are not supported.
- **WebSocket must be enabled**
  - The terminal and log features rely on WebSocket. Make sure your reverse proxy is configured to forward WebSocket upgrades, otherwise the terminal and log views will not work.

## Configuration Examples

### Nginx

If you use Nginx as a reverse proxy, here is a sample configuration:

``` nginx {7-9,14-16}
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
    # proxy_set_header X-Forwarded-Proto https; # enable if your reverse proxy terminates TLS
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
    # proxy_set_header X-Forwarded-Proto https; # enable if your reverse proxy terminates TLS
  }
  gzip on;
}
```

### Ingress

The example below uses [nginx-ingress](https://docs.nginx.com/nginx-ingress-controller/overview/). Other Ingress controllers (traefik, ingress-nginx, etc.) require their own specific configuration — please consult their documentation for WebSocket support and PassHeader.

> - Line 9 uses `nginx.org/proxy-pass-headers` to set PassHeader.
> - Line 10 enables WebSocket for the kuboard Service.
> - Line 29 maps the web root path to kuboard.

``` yaml {9,10,29}
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    k8s.kuboard.cn/displayName: kuboard
    k8s.kuboard.cn/workload: kuboard
    nginx.com/sticky-cookie-services: serviceName=kuboard srv_id expires=1h path=/
    nginx.org/proxy-pass-headers: 'Upgrade,Connection,Authorization'
    nginx.org/websocket-services: kuboard
  creationTimestamp: '2020-03-21T01:35:08Z'
  generation: 3
  labels:
    k8s.kuboard.cn/layer: monitor
    k8s.kuboard.cn/name: kuboard
  name: kuboard
  namespace: kube-system
  resourceVersion: '25838555'
  selfLink: /apis/networking.k8s.io/v1beta1/namespaces/kube-system/ingresses/kuboard
  uid: b7903125-9a95-4562-b45a-b506359b5c19
spec:
  rules:
    - host: demo.kuboard.cn
      http:
        paths:
          - backend:
              serviceName: kuboard
              servicePort: http
            path: /
  tls:
    - hosts:
        - demo.kuboard.cn
      secretName: demo.kuboard.cn
```