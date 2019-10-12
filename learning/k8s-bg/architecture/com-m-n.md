---
vssueId: 120
layout: LearningLayout
description: Kubernete教程_Kubernetes组件_从 master（apiserver）到Cluster存在着两条主要的通信路径，第一种：apiserver 访问集群中每个节点上的 kubelet 进程；第二种：使用 apiserver 的 proxy 功能，从 apiserver 访问集群中的任意节点、Pod、Service

meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Master-Node通信
---

# Master to Cluster

<AdSenseTitle/>

从 master（apiserver）到Cluster存在着两条主要的通信路径：
* apiserver 访问集群中每个节点上的 kubelet 进程
* 使用 apiserver 的 proxy 功能，从 apiserver 访问集群中的任意节点、Pod、Service

## apiserver to kubelet

apiserver 在如下情况下访问 kubelet：
* 抓取 Pod 的日志
* 通过 `kubectl exec -it` 指令（或 kuboard 的终端界面）获得容器的命令行终端
* 提供 `kubectl port-forward` 功能

这些连接的访问端点是 kubelet 的 HTTPS 端口。默认情况下，apiserver 不校验 kubelet 的 HTTPS 证书，这种情况下，连接可能会收到 man-in-the-middle 攻击，因此该连接如果在不受信网络或者公网上运行时，是 **不安全** 的。

如果要校验 kubelet 的 HTTPS 证书，可以通过 `--kubelet-certificate-authority` 参数为 apiserver 提供校验 kubelet 证书的根证书。

如果不能完成这个配置，又需要通过不受信网络或公网将节点加入集群，则需要使用 [SSH隧道](#SSH隧道) 连接 apiserver 和 kubelet。

同时，[Kubelet authentication/authorization](https://kubernetes.io/docs/admin/kubelet-authentication-authorization/) 需要激活，以保护 kubelet API

## apiserver to nodes, pods, services

从 apiserver 到 节点/Pod/Service 的连接使用的是 HTTP 连接，没有进行身份认证，也没有进行加密传输。您也可以通过增加 `https` 作为 节点/Pod/Service 请求 URL 的前缀，但是 HTTPS 证书并不会被校验，也无需客户端身份认证，因此该连接是无法保证一致性的。目前，此类连接如果运行在非受信网络或公网上时，是 **不安全** 的

## SSH隧道

Kubernetes 支持 SSH隧道（tunnel）来保护 Master --> Cluster 访问路径。此时，apiserver 将向集群中的每一个节点建立一个 SSH隧道（连接到端口22的ssh服务）并通过隧道传递所有发向 kubelet、node、pod、service 的请求。

::: warning deprecated
SSH隧道当前已被不推荐使用（deprecated），Kubernetes 正在设计新的替代通信方式。
:::
