---
vssueId: 54
layout: LearningLayout
description: Kubernetes教程_Kubernetes中发布Service的方式_ServiceType
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes服务类型
---

# 发布Service

<AdSenseTitle/>

Kubernetes Service 支持的不同访问方式。

## Service 类型

Kubernetes 中可以通过不同方式发布 Service，通过 `ServiceType` 字段指定，该字段的默认值是 `ClusterIP`，可选值有：

* **ClusterIP**: <Badge text="Kuboard 已支持" type="success"/> 默认值。通过集群内部的一个 IP 地址暴露 Service，只在集群内部可以访问

* **NodePort**: <Badge text="Kuboard 已支持" type="success"/> 通过每一个节点上的的静态端口（NodePort）暴露 Service，同时自动创建 ClusterIP 类型的访问方式
  * 在集群内部通过 $(ClusterIP): $(Port) 访问
  * 在集群外部通过 $(NodeIP): $(NodePort) 访问

* **LoadBalancer**: <Badge text="Kuboard 不支持" type="error"/> 通过云服务供应商（AWS、Azure、GCE 等）的负载均衡器在集群外部暴露 Service，同时自动创建 NodePort 和 ClusterIP 类型的访问方式
  * 在集群内部通过 $(ClusterIP): $(Port) 访问
  * 在集群外部通过 $(NodeIP): $(NodePort) 访问
  * 在集群外部通过 $(LoadBalancerIP): $(Port) 访问

  ::: tip 替代方案
  * LoadBalancer 类型的 Service，可以自动调用云服务商在 IaaS 层面的接口，并自动创建 LoadBalancer，将其指向该 Service。
  * 由于 Kuboard 不限定云服商，因此不能实现此类型的 Service，建议用户先创建 NodePort 类型的 Service，再手工创建 LoadBalancer，将其配置到各节点上对应的 Service 的 NodePort。此操作最终效果与 LoadBalancer 类型 Service 的效果相同
  :::

* **ExternalName**: <Badge text="Kuboard 暂不支持" type="warn"/> 将 Service 映射到 `externalName` 指定的地址（例如：foo.bar.example.com），返回值是一个 CNAME 记录。不使用任何代理机制。

  ::: tip
  如使用 ExternalName 类型的 Service，CoreDNS 版本不能低于 1.7
  :::

## ClusterIP

ClusterIP 是 ServiceType 的默认值。在 [Iptables 代理模式](service-details.html#iptables-代理模式) 中，详细讲述了 ClusterIP 类型 Service 的工作原理。

## NodePort

对于 `NodePort` 类型的 Service，Kubernetes 为其分配一个节点端口（对于同一 Service，在每个节点上的节点端口都相同），该端口的范围在初始化 apiserver 时可通过参数 `--service-node-port-range` 指定（默认是：30000-32767），参考 [修改NodePort的范围](/install/install-node-port-range.html)。节点将该端口上的网络请求转发到对应的 Service 上。可通过 Service 的 `.spec.ports[*].nodePort` 字段查看该 Service 分配到的节点端口号。

在启动 kube-proxy 时使用参数 `--nodeport-address` 可指定阶段端口可以绑定的 IP 地址段。该参数接收以逗号分隔的 CIDR 作为参数值（例如：10.0.0.0/8,192.0.2.0/25），kube-proxy 将查找本机符合该 CIDR 的 IP 地址，并将节点端口绑定到符合的 IP 地址上。

例如，
* 如果启动 kube-proxy 时指定了参数 `--nodeport-address=127.0.0.0/8`，则 kube-proxy 只将阶段端口绑定到 loopback 地址上。
* `--nodeport-address` 的默认值是一个空列表。则 kube-proxy 将节点端口绑定到该节点所有的网络 IP 地址上。

您可以通过 `nodePort` 字段指定节点端口号（必须在 `--service-node-port-range` 指定的范围内）。Kubernetes 在创建 Service 时将使用该节点端口，如果该端口已被占用，则创建 Service 将不能成功。在这种情况下，您必须自己规划好端口使用，以避免端口冲突。

使用 NodePort，您可以：
* 根据自己的需要配置负载均衡器
* 配置 Kubernetes / 非 Kubernetes 的混合环境
* 直接暴露一到多个节点的 IP 地址，以便客户端可访问 Kubernetes 中的 Service

NodePort 类型的 Service 可通过如下方式访问：
* 在集群内部通过 $(ClusterIP): $(Port) 访问
* 在集群外部通过 $(NodeIP): $(NodePort) 访问

## LoadBalancer

在支持外部负载均衡器的云环境中（例如 GCE、AWS、Azure 等），将 `.spec.type` 字段设置为 `LoadBalancer`，Kubernetes 将为该Service 自动创建一个负载均衡器。负载均衡器的创建操作异步完成，您可能要稍等片刻才能真正完成创建，负载均衡器的信息将被回写到 Service 的 `.status.loadBalancer` 字段。如下所示：

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  clusterIP: 10.0.171.239
  loadBalancerIP: 78.11.24.19
  type: LoadBalancer
status:
  loadBalancer:
    ingress:
      - ip: 146.148.47.155
```

发送到外部负载均衡器的网络请求就像被转发到 Kubernetes 中的后端 Pod 上。负载均衡的实现细节由各云服务上确定。

由于 Kuboard 不限定 Kubernetes 是运行在裸机上、私有云上或者是公有云上，因此 Kuboard 暂不支持 LoadBalancer 类型的 Service。关于更多 LoadBalancer Service 相关的描述，请参考 [Type LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) 和您所使用的云供应商的文档

## ExternalName

ExternalName 类型的 Service 映射到一个外部的 DNS name，而不是一个 pod label selector。可通过 `spec.externalName` 字段指定外部 DNS name。

下面的例子中，名称空间 `prod` 中的 Service `my-service` 将映射到 `my.database.example.com`：

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```

执行 `nslookup my-service.prod.svc.cluster.local` 指令时，集群的 DNS 服务将返回一个 `CNAME` 记录，其对应的值为 `my.database.example.com`。访问 `my-service` 与访问其他类型的 Service 相比，网络请求的转发发生在 DNS level，而不是使用 proxy。如果您在后续想要将 `my.database.example.com` 对应的数据库迁移到集群内部来，您可以按如下步骤进行：
1. 在 Kubernetes 中部署数据库（并启动数据库的 Pod）
2. 为 Service 添加合适的 selector 和 endpoint
3. 修改 Service 的类型

::: tip 注意事项
* ExternalName 可以接受一个 IPv4 地址型的字符串作为 `.spec.externalName` 的值，但是这个字符串将被认为是一个由数字组成的 DNS name，而不是一个 IP 地址。
* 如果要 hardcode 一个 IP 地址，请考虑使用 [headless Service](./service-details.html#headless-services)
:::

## External IP

如果有外部 IP 路由到 Kubernetes 集群的一个或多个节点，Kubernetes Service 可以通过这些 `externalIPs` 进行访问。`externalIP` 需要由集群管理员在 Kubernetes 之外配置。

在 Service 的定义中， `externalIPs` 可以和任何类型的 `.spec.type` 一通使用。在下面的例子中，客户端可通过 `80.11.12.10:80` （externalIP:port） 访问`my-service` 

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 9376
  externalIPs:
    - 80.11.12.10
```
