---
vssueId: 13
lessAds: false
description: Kuboard_是一款Kubernetes_Dashboard_快速在K8S上落地微服务_本文是Kuboard的安装手册_包括安装Kuboard的前提条件_与Kubernetes的版本兼容性_安装步骤_以及完成安装后如何访问Kuboard界面。
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 通过反向代理访问 Kuboard

<AdSenseTitle/>

## 为何使用反向代理

为了方便用户能够快速地了解和测试 Kuboard，Kuboard 使用了 http 协议，在生产环境中，为了获得更强的安全性，请务必为 Kuboard 配置 HTTPS。最便捷的方式是使用 Kubernetes Ingress 进行配置并启用 HTTPS；用户也可以使用自己配置的 Nginx 将请求反向代理到 Kuboard，在 Nginx 上配置 HTTPS。

## 配置反向代理时的注意事项

在为 Kuboard 配置反向代理时，需要注意：
* WebContextRoot
  * Kuboard 需要使用根路径进行访问，即 https://yourkuboard.yourcompany.com/，而不能是 https://yourcompany.com/kuboard/ 这样的二级路径；
* 启用 WebSocket
  * Kuboard 中终端和日志的功能需要用到 WebSocket，需要在您的反向代理中配置 WebSocket，才能正常使用 Kuboard 的终端和日志功能；
* PassHeader
  * Kuboard 的 Portforward <Badge>v2.0.1</Badge> 功能需要用到 SPDY 协议，需要您的反向代理能够支持此协议，并将 Upgrade,Connection,Authorization 这几个 Header 传递给 Kuboard。

## 配置样例

### Ingress 配置

本章节假设您使用 [nginx-ingress](https://docs.nginx.com/nginx-ingress-controller/overview/) 作为您的 Ingress Controller，其他类型的 Ingress 控制器（如 traefik，ingress-nginx 等）请自行参考其官方文档，了解如何启用 WebSocket 并配置 PassHeader

> * 第 9 行，通过 nginx.org/proxy-pass-headers 设置 PassHeader
> * 第 10 行，为 kuboard Service 开启 WebSocket
> * 第 29 行，将 Web 的根路径映射到 kuboard

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

### Nginx 配置

如果您使用 nginx 作为反向代理，配置文件样例如下所示：

``` nginx {7-9,14-16}
server {
  listen  80;
  server_name kuboard.yourdomain.com;   # 替换成你的域名
  location / {
    proxy_pass  http://192.168.2.39:32567;  # 替换成你的节点地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  location /k8s-ws/ {
    proxy_pass  http://192.168.2.39:32567;  # 替换成你的节点地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Upgrade "websocket";
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  gzip on;
}
```
