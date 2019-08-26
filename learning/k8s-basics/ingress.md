---
description: 本文介绍 Kubernetes Ingress 的概念，包括Ingress 基本概念、如何配置 Ingress Controller、如何使用 kubectl/Kuboard 操作 Ingress 信息
---

# 通过互联网访问您的应用

参考文档：
* Kubernetes 官网 [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
* Kubernetes 官网 [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
* Kubernetes Nginx Ingress Controller [Bare-metal considerations](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/)
* nginxinc/kubernets-ingress [kubernetes-ingress](https://github.com/nginxinc/kubernetes-ingress)

## Ingress

Ingress 是 Kubernetes 的一种 API 对象，将集群内部的 Service 通过 HTTP/HTTPS 方式暴露到集群外部，并通过规则定义 HTTP/HTTPS 的路由。Ingress 具备如下特性：集群外部可访问的 URL、负载均衡、SSL Termination、按域名路由（name-based virtual hosting）。
