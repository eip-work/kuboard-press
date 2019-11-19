---
vssueId: 158
layout: LearningLayout
description: Kubernetes中_网络策略定义了一组Pod是否允许相互通信_或者与网络中的其他端点endpoint通信_NetworkPolicy对象使用标签选择Pod_并定义规则指定选中的Pod可以执行什么样的网络通信
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Network Policies, K8S 网络策略
---

# Network Policies

<AdSenseTitle>

> 参考文档： [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

Kubernetes 中，Network Policy（网络策略）定义了一组 Pod 是否允许相互通信，或者与网络中的其他端点 endpoint 通信。

`NetworkPolicy` 对象使用标签选择Pod，并定义规则指定选中的Pod可以执行什么样的网络通信

[[TOC]]

</AdSenseTitle>

## 前提条件

Network Policy 由网络插件实现，因此，您使用的网络插件必须能够支持 `NetworkPolicy` 才可以使用此特性。如果您仅仅是创建了一个 Network Policy 对象，但是您使用的网络插件并不支持此特性，您创建的 Network Policy 对象是不生效的。

## Isolated/Non-isolated Pods

默认情况下，Pod 都是非隔离的（non-isolated），可以接受来自任何请求方的网络请求。

如果一个 NetworkPolicy 的标签选择器选中了某个 Pod，则该 Pod 将变成隔离的（isolated），并将拒绝任何不被 NetworkPolicy 许可的网络连接。（名称空间中其他未被 NetworkPolicy 选中的 Pod 将认可接受来自任何请求方的网络请求。）

Network Police 不会相互冲突，而是相互叠加的。如果多个 NetworkPolicy 选中了同一个 Pod，则该 Pod 可以接受这些 NetworkPolicy 当中任何一个 NetworkPolicy 定义的（入口/出口）规则，是所有NetworkPolicy规则的并集，因此，NetworkPolicy 的顺序并不重要，因为不会影响到最终的结果。

## NetworkPolicy对象

参考 [NetworkPolicy](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#networkpolicy-v1-networking-k8s-io) 可了解 NetworkPolicy 对象的完整定义。

一个 NetworkPolicy 的 Example 如下所示：

``` yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

* **基本信息：** 同其他的 Kubernetes 对象一样，`NetworkPolicy` 需要 `apiVersion`、`kind`、`metadata` 字段
* **spec：** `NetworkPolicy` 的 `spec` 字段包含了定义网络策略的主要信息：
  * **podSelector：** 同名称空间中，符合此标签选择器 `.spec.podSelector` 的 Pod 都将应用这个 `NetworkPolicy`。上面的 Example中的 podSelector 选择了 `role=db` 的 Pod。如果该字段为空，则将对名称空间中所有的 Pod 应用这个 `NetworkPolicy`
  * **policyTypes：** `.spec.policyTypes` 是一个数组类型的字段，该数组中可以包含 `Ingress`、`Egress` 中的一个，也可能两个都包含。该字段标识了此 `NetworkPolicy` 是否应用到 入方向的网络流量、出方向的网络流量、或者两者都有。如果不指定 `policyTypes` 字段，该字段默认将始终包含 `Ingress`，当 `NetworkPolicy` 中包含出方向的规则时，`Egress` 也将被添加到默认值。
  * **ingress：** `ingress` 是一个数组，代表入方向的白名单规则。每一条规则都将允许与 `from` 和 `ports` 匹配的入方向的网络流量发生。例子中的 `ingress` 包含了一条规则，允许的入方向网络流量必须符合如下条件：
    * Pod 的监听端口为 `6379`
    * 请求方可以是如下三种来源当中的任意一种：
      * ipBlock 为 `172.17.0.0/16` 网段（请参考 [CIDR](/glossary/cidr.html)），但是不包括 `172.17.1.0/24` 网段
      * namespaceSelector 标签选择器，匹配标签为 `project=myproject`
      * podSelector 标签选择器，匹配标签为 `role=frontend`
  * **egress：** `egress` 是一个数组，代表出方向的白名单规则。每一条规则都将允许与 `to` 和 `ports` 匹配的出方向的网络流量发生。例子中的 `egress` 允许的出方向网络流量必须符合如下条件：
    * 目标端口为 `5978`
    * 目标 ipBlock 为 `10.0.0.0/24` 网段（请参考 [CIDR](/glossary/cidr.html)）

因此，例子中的 `NetworkPolicy` 对网络流量做了如下限制：
1. 隔离了 `default` 名称空间中带有 `role=db` 标签的所有 Pod 的入方向网络流量和出方向网络流量
2. Ingress规则（入方向白名单规则）：
   * 当请求方是如下三种来源当中的任意一种时，允许访问 `default` 名称空间中所有带 `role=db` 标签的 Pod 的 `6379` 端口：
     * ipBlock 为 `172.17.0.0/16` 网段（请参考 [CIDR](/glossary/cidr.html)），但是不包括 `172.17.1.0/24` 网段
     * namespaceSelector 标签选择器，匹配标签为 `project=myproject`
     * podSelector 标签选择器，匹配标签为 `role=frontend`
3. Egress rules（出方向白名单规则）：
   * 当如下条件满足时，允许出方向的网络流量：
     * 目标端口为 `5978`
     * 目标 ipBlock 为 `10.0.0.0/24` 网段（请参考 [CIDR](/glossary/cidr.html)）


## to和from选择器的行为

NetworkPolicy 的 `.spec.ingress.from` 和 `.spec.egress.to` 字段中，可以指定 4 种类型的标签选择器：
* **podSelector** 选择与 `NetworkPolicy` 同名称空间中的 Pod 作为入方向访问控制规则的源或者出方向访问控制规则的目标
* **namespaceSelector** 选择某个名称空间（其中所有的Pod）作为入方向访问控制规则的源或者出方向访问控制规则的目标
* **namespaceSelector** 和 **podSelector** 在一个 `to` / `from` 条目中同时包含 `namespaceSelector` 和 `podSelector` 将选中指定名称空间中的指定 Pod。此时请特别留意 YAML 的写法，如下所示：
  ``` yaml {7}
    ...
    ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            user: alice
        podSelector:
          matchLabels:
            role: client
    ...
  ```
  该例子中，podSelector 前面没有 `-` 减号，namespaceSelector 和 podSelector 是同一个 from 元素的两个字段，将选中带 `user=alice` 标签的名称空间中所有带 `role=client` 标签的 Pod。但是，下面的这个 NetworkPolicy 含义是不一样的：
  ``` yaml {7}
    ...
    ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            user: alice
      - podSelector:
          matchLabels:
            role: client
    ...
  ```
  后者，podSelector 前面带 `-` 减号，说明 namespaceSelector 和 podSelector 是 from 数组中的两个元素，他们将选中 NetworkPolicy 同名称空间中带 `role=client` 标签的对象，以及带 `user=alice` 标签的名称空间的所有 Pod。

  当您对此不确信时，可以尝试使用 `kubectl describe` 命令查看 kubernetes 是如何解析您定义的 NetworkPolicy 的。

* **ipBlock** 可选择 IP [CIDR](/glossary/cidr.html) 范围作为入方向访问控制规则的源或者出方向访问控制规则的目标。这里应该指定的是集群外部的 IP，因为集群内部 Pod 的 IP 地址是临时分配的，且不可预测。

集群的入方向和出方向网络机制通常需要重写网络报文的 source 或者 destination IP。kubernetes 并未定义应该在处理 `NetworkPolicy` 之前还是之后再修改 source / destination IP，因此，在不同的云供应商、使用不同的网络插件时，最终的行为都可能不一样。这意味着：

  * 对于入方向的网络流量，某些情况下，你可以基于实际的源 IP 地址过滤流入的报文；在另外一些情况下，NetworkPolicy 所处理的 "source IP" 可能是 LoadBalancer 的 IP 地址，或者其他地址
  * 对于出方向的网络流量，基于 ipBlock 的策略可能有效，也可能无效
