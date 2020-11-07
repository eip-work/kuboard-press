---
vssueId: 158
layout: LearningLayout
description: Kubernetes中_网络策略定义了一组Pod是否允许相互通信_或者与网络中的其他端点endpoint通信_本文描述了K8S集群中默认的网络策略
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Network Policies, K8S 网络策略
---

# Network Policies - Default

<AdSenseTitle>

> 参考文档： [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

默认情况下，如果名称空间中没有配置 NetworkPolicy，则该名称空间中，所有Pod的所有入方向流量和所有出方向流量都是被允许的。本文列举了几个例子，可以用来改变名称空间中默认的网络策略

</AdSenseTitle>

## 默认拒绝所有的入方向流量

在名称空间中创建下面的 NetworkPolicy，该 NetworkPolicy：
* 选中所有的 Pod
* 不允许任何入方向的流量

``` yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

此 NetworkPolicy 将确保名称空间中所有的入方向流量都被限制，同时，不改变出方向的流量。

## 默认允许所有的入方向流量

在名称空间中创建下面的 NetworkPolicy，该 NetworkPolicy 允许名称空间中所有 Pod 的所有入方向网络流量

``` yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all
spec:
  podSelector: {}
  ingress:
  - {}
  policyTypes:
  - Ingress
```

## 默认允许所有出方向流量

在名称空间中创建下面的 NetworkPolicy，该 NetworkPolicy 允许名称空间中所有 Pod 的所有出方向网络流量

``` yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all
spec:
  podSelector: {}
  egress:
  - {}
  policyTypes:
  - Egress
```

## 默认拒绝所有入方向和出方向的网络流量

在名称空间中创建下面的 NetworkPolicy，该 NetworkPolicy 禁止名称空间中所有 Pod 的所有入方向流量和所有出方向流量

``` yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

## SCTP 支持

**FEATURE STATE:** `Kubernetes v1.12` <Badge type="danger">alpha</Badge>

在 Kubernetes 中启用 `SCTPSupport` 特性，可以在 `NetworkPolicy` 的 `protocal` 字段中使用 SCTP 这个选项，该特性为 alpha 状态。向 apiserver 的启动参数中添加 `--feature-gates=SCTPSupport=true,...` 可以激活该特性。

使用此特性时，您所用的网络插件需要支持 SCTP，请查询网络插件相关的文档。
