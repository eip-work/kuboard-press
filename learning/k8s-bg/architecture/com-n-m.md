---
vssueId: 120
layout: LearningLayout
description: Kubernete教程_Kubernetes组件_所有从集群（worker 节点）访问 Master 节点的通信，都是针对 apiserver 的（没有任何其他 master 组件发布远程调用接口）。通常安装 Kubernetes 时，apiserver 监听 HTTPS 端口（443），并且配置了一种或多种客户端认证方式 authentication
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Master-Node通信
---

# Cluster to Master

所有从集群访问 Master 节点的通信，都是针对 apiserver 的（没有任何其他 master 组件发布远程调用接口）。通常安装 Kubernetes 时，apiserver 监听 HTTPS 端口（443），并且配置了一种或多种 [客户端认证方式 authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)。至少需要配置一种形式的 [授权方式 authorization](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)，尤其是 [匿名访问 anonymous requests](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#anonymous-requests) 或 [Service Account Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#service-account-tokens) 被启用的情况下。

节点上必须配置集群（apiserver）的公钥根证书（public root certificate），此时，在提供有效的客户端身份认证的情况下，节点可以安全地访问 APIServer。例如，在 Google Kubernetes Engine 的一个默认 Kubernetes 安装里，通过客户端证书为 kubelet 提供客户端身份认证。请参考 [kubelet TLS bootstrapping](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/)，了解如何自动为 kubelet 提供客户端证书。

对于需要调用 APIServer 接口的 Pod，应该为其关联 Service Account，此时，Kubernetes将在创建Pod时自动为其注入公钥根证书（public root certificate）以及一个有效的 bearer token（放在HTTP请求头Authorization字段）。所有名称空间中，都默认配置了名为 `kubernetes` Kubernetes Service，该 Service对应一个虚拟 IP（默认为 10.96.0.1），发送到该地址的请求将由 kube-proxy 转发到 apiserver 的 HTTPS 端口上。请参考 [Service连接应用程序](/learning/k8s-intermediate/service/connecting.html) 了解 Kubernetes Service 是如何工作的。

得益于这些措施，默认情况下，从集群（节点以及节点上运行的 Pod）访问 master 的连接是安全的，因此，可以通过不受信的网络或公网连接 Kubernetes 集群
