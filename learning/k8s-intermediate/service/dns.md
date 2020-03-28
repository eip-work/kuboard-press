---
vssueId: 55
layout: LearningLayout
description: Kubernetes教程_本文介绍了Kubernetes中Service和Pod的DNS分配规则
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,Kubernetes DNS
---

# Service/Pod的DNS

<AdSenseTitle/>

参考文档： Kubernetes 官网文档 [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

本文介绍了 Kubernetes 中的 DNS 分配方式

## 概述

Kubernetes 集群中运行了一组 DNS Pod，配置了对应的 Service，并由 kubelete 将 DNS Service 的 IP 地址配置到节点上的容器中以便解析 DNS names。

集群中的每一个 Service（包括 DNS 服务本身）都将被分配一个 DNS name。默认情况下，客户端 Pod 的 DNS 搜索列表包括 Pod 所在的名称空间以及集群的默认域。例如：

假设名称空间 `bar` 中有一个 Service 名为 `foo`：
* 名称空间 `bar` 中的 Pod 可以通过 `nslookup foo` 查找到该 Service
* 名称空间 `quux` 中的 Pod 可以通过 `nslookup foo.bar` 查找到该 Service

本文后面的章节详细介绍了支持的 DNS 记录类型及格式。如果有任何其他类型的格式凑巧可以使用，这仅仅是实现上的细节，并且可能在将来的版本中失效。参考此文档可以查看最新的规范 [Kubernetes DNS-Based Service Discovery](https://github.com/kubernetes/dns/blob/master/docs/specification.md)

## Services

### A 记录

* Service（headless Service 除外）将被分配一个 DNS A 记录，格式为 `my-svc.my-namespace.svc.cluster-domain.example`。该 DNS 记录解析到 Service 的 ClusterIP。

* Headless Service（没有 ClusterIP）也将被分配一个 DNS A 记录，格式为 `my-svc.my-namespace.svc.cluster-domain.example`。该 DNS 记录解析到 Service 所选中的一组 Pod 的 IP 地址的集合。调用者应该使用该 IP 地址集合，或者按照轮询（round-robin）的方式从集合中选择一个 IP 地址使用。

### SRV 记录

Service（含 headless Service）的命名端口（有 name 的端口）将被分配一个 SRV 记录，其格式为 `_my-port-name._my-port-protocol.my-svc.my-namespace.svc.cluster-domain.example`：
* 对于一个普通 Service（非 headless Service），该 SRV 记录解析到其端口号和域名 `my-svc.my-namespace.svc.cluster-domain.example`
* 对于一个 Headless Service，该 SRV 记录解析到多个结果：每一个结果都对应该 Service 的一个后端 Pod，包含其端口号和 Pod 的域名 `auto-generated-pod-name.my-svc.my-namespace.svc.cluster-domain.example`

## Pods

### Pod 的 hostname / subdomain

Kubernetes 在创建 Pod 时，将 Pod 定义中的 `metadata.name` 的值作为 Pod 实例的 hostname。

Pod 定义中有一个可选字段 `spec.hostname` 可用来直接指定 Pod 的 hostname。例如，某 Pod 的 `spec.hostname` 字段被设置为 `my-host`，则该 Pod 创建后 hostname 将被设为 `my-host`

Pod 定义中还有一个可选字段 `spec.subdomain` 可用来指定 Pod 的 subdomain。例如，名称空间 `my-namespace` 中，某 Pod 的 hostname 为 `foo`，并且 subdomain 为 `bar`，则该 Pod 的完整域名（FQDN）为 `foo.bar.my-namespace.svc.cluster-domain.example`。

例子：

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: default-subdomain
spec:
  selector:
    name: busybox
  clusterIP: None
  ports:
  - name: foo # Actually, no port is needed.
    port: 1234
    targetPort: 1234
---
apiVersion: v1
kind: Pod
metadata:
  name: busybox1
  labels:
    name: busybox
spec:
  hostname: busybox-1
  subdomain: default-subdomain
  containers:
  - image: busybox:1.28
    command:
      - sleep
      - "3600"
    name: busybox
---
apiVersion: v1
kind: Pod
metadata:
  name: busybox2
  labels:
    name: busybox
spec:
  hostname: busybox-2
  subdomain: default-subdomain
  containers:
  - image: busybox:1.28
    command:
      - sleep
      - "3600"
    name: busybox
```

如果 Pod 所在名称空间中存在一个 headless Service，其名称与 Pod 的 subdomain 相同，则集群的 KubeDNS 服务器仍将为 Pod 的完整域名（FQDN）返回一个 A 记录。例如，假设一个 Pod 的 hostname 为 `busybox-1` 且其 subdomain 为 `default-subdomain`，同名称空间下有一个 headless Service 的名字为 `default-subdomain`，此时，该 Pod 的完整域名（FQDN）为 `busybox-1.default-subdomain.my-namespace.svc.cluster-domain.example`。DNS 服务将其解析到一个 A 记录，指向 Pod 的 IP 地址。上面 yaml 文件中的 Pod `busybox1` 和 `busybox2` 都将有各自的 A 记录

::: tip 备注
* A 记录不是根据 Pod name 创建的，而是根据 hostname 创建的。如果一个 Pod 没有 hostname 只有 subdomain，则 Kubernetes 将只为其 headless Service 创建一个 A 记录 `default-subdomain.my-namespace.svc.cluster-domain.example`，该记录指向 Pod 的 IP 地址。
* Pod 必须达到就绪状态才可以拥有 A 记录，除非 Service 的字段 `spec.publishNotReadyAddresses` 被设置为 `True`
:::

<!-- The Endpoints object can specify the hostname for any endpoint addresses, along with its IP. -->

### Pod 的 DNS Policy

可以为每一个 Pod 设置其自己的 DNS Policy。Kubernetes 通过 Pod 定义中的 `spec.dnsPolicy` 字段设置 DNS Policy，可选的值有：

* **Default**： Pod 从其所在的节点继承域名解析配置。更多细节请参考 [Customizing DNS Service
](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/#inheriting-dns-from-the-node)

* **ClusterFirst**：任何与集群域名后缀（例如 `www.kubernetes.io`）不匹配的 DNS 查询，都将被转发到 Pod 所在节点的上游 DNS 服务。集群管理员可能配置了额外的 stub-domain 及上游 DNS 服务，更多细节请参考 [Customizing DNS Service
](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/#effects-on-pods)

* **ClusterFirstWithHostNet**： 对于运行在节点网络上的 Pod，其 dnsPolicy 必须指定为 `ClusterFirstWithHostNet`

* **None**： 允许 Pod 忽略 Kubernetes 环境中的 DNS 设置。此时，该 Pod 的 DNS 的所有设置必须通过 `spce.dnsConfig` 指定。 参考 [Pod 的 DNS 配置](#pod-的-dns-配置)

::: warning dnsPolicy的默认值
**“Default”** 并非是默认的 DNS Policy。如果 `spec.dnsPolicy` 字段未指定，则 **“ClusterFirst”** 将被默认使用
:::

下面的例子中的 Pod，其 DNS Policy 必须设置为 **“ClusterFirstWithHostNet”**，因为它的 `hostNetwork` 字段为 `true`

``` yaml {15,16}
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: default
spec:
  containers:
  - image: busybox:1.28
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
    name: busybox
  restartPolicy: Always
  hostNetwork: true
  dnsPolicy: ClusterFirstWithHostNet
```

### Pod 的 DNS 配置 <Badge text="Kuboard v1.0.8.3" type="default"/>

> Kuboard v1.0.8.3 开始，支持 Pod 的 dnsConfig 字段。配置界面在 `工作负载编辑器 --> 容器组的更多设定`

在 Kubernetes 中，您可以直接配置 Pod 的 DNS 设置。

Pod 定义中的 `spec.dnsConfig` 是可选字段，且可以与任何类型的 `spec.dnsPolicy` 配合使用。如果 `spec.dnsPolicy` 被设置为 **“None”**，则 `spec.dnsConfig` 必须被指定。

`spec.dnsConfig` 中有如下字段可以配置：

* **nameservers**： Pod 的 DNS Server IP 地址列表。最多可以执行 3 个 IP 地址。当 `spec.dnsPolicy` 为 **“None”**，至少需要指定一个 IP 地址，其他情况下该字段是可选的。DNS Server 的 IP 地址列表将会与 DNS Policy 所产生的 DNS Server 地址列表合并（重复的条目被去除）。

* **searches**：Pod 中执行域名查询时搜索域的列表。该字段是可选的。如果指定了该字段，则指定的搜索域列表将与 DNS Policy 所产生的搜索域列表合并（重复的条目被去除）。合并后的列表最多不超过 6 个域。

* **options**：可选数组，其中每个元素由 **name** 字段（必填）和 **value** 字段（选填）组成。该列表中的内容将与 DNS Policy 所产生的 DNS 选项合并（重复的条目被去除）

``` yaml
apiVersion: v1
kind: Pod
metadata:
  namespace: default
  name: dns-example
spec:
  containers:
    - name: test
      image: nginx
  dnsPolicy: "None"
  dnsConfig:
    nameservers:
      - 1.2.3.4
    searches:
      - ns1.svc.cluster-domain.example
      - my.dns.search.suffix
    options:
      - name: ndots
        value: "2"
      - name: edns0
```

上述 Pod 创建后，容器 `test` 的 `etc/resolv.conf` 文件如下所示（从 `spec.dnsConfig` 的配置产生），执行命令 `kubectl exec -it dns-example -- cat /etc/resolv.conf` 可查看该文件内容：

```
nameserver 1.2.3.4
search ns1.svc.cluster-domain.example my.dns.search.suffix
options ndots:2 edns0
```

如果集群使用的是 IPv6，执行命令 `kubectl exec -it dns-example -- cat /etc/resolv.conf` 的输出结果如下所示：

```
nameserver fd00:79:30::a
search default.svc.cluster-domain.example svc.cluster-domain.example cluster-domain.example
options ndots:5
```

### 版本兼容性

Pod 定义中的 `spec.dnsConfig` 和 `spec.dnsPolicy=None` 的兼容性如下：

| Kubernetes 版本号 | 支持情况         |
| ----------------- | ---------------- |
| 1.14              | Stable           |
| 1.10              | Beta（默认启用） |
| 1.9               | Alpha            |
