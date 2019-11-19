---
# vssueId: 158
layout: LearningLayout
description: Kubernetes中_网络策略定义了一组Pod是否允许相互通信_或者与网络中的其他端点endpoint通信_本文描述了K8S集群中默认的网络策略
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Network Model, K8S 网络模型
---

# Network Model

<AdSenseTitle>

> 参考文档： [A Guide to the Kubernetes Networking Model](https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/)

Kubernetes 用来在集群上运行分布式系统。分布式系统的本质使得网络组件在 Kubernetes 中是至关重要也不可或缺的。理解 Kubernetes 的网络模型可以帮助你更好的在 Kubernetes 上运行、监控、诊断你的应用程序。

网络是一个很宽泛的领域，其中有许多成熟的技术。对于不熟悉网络整体背景的人而言，要将各种新的概念、旧的概念放到一起来理解（例如，网络名称空间、虚拟网卡、IP forwarding、网络地址转换等），并融汇贯通，是一个非常困难的事情。本文将尝试揭开 Kubernetes 网络的面纱，并讨论 Kubernetes 相关的网络技术，以及这些技术是如何支持 Kubernetes 网络模型的。

文章有点长，分成主要的几个部分：
* 首先讨论一些 Kubernetes 基础的术语，确保大家对关键措辞的理解是一致的
* 然后讨论 Kubernetes 网络模型，及其设计和实现
* 主要的内容是：通过不同的 use case 深入探讨 Kubernetes 中网络流量是如何路由的

[[TOC]]

</AdSenseTitle>


## Kubernetes基本概念

Kubernetes 基于少数几个核心概念，不断完善，提供了非常丰富和实用的功能。本章节罗列了这些核心概念，并简要的做了概述，以便更好地支持后面的讨论。熟悉 Kubernetes 的读者可跳过这个章节。

### Kubernetes API Server

操作 Kubernetes 的方式，是调用 Kubernetes API Server（kube-apiserver）的 API 接口。kubectl、kubernetes dashboard、kuboard 都是通过调用 kube-apiserver 的接口实现对 kubernetes 的管理。API server 最终将集群状态的数据存储在 [etcd](https://github.com/coreos/etcd) 中。

### 控制器Controller

控制器（Controller）是 Kubernetes 中最核心的抽象概念。在用户通过 kube-apiserver 声明了期望的状态以后，控制器通过不断监控 apiserver 中的当前状态，并对当前状态与期望状态之间的差异做出反应，以确保集群的当前状态不断地接近用户声明的期望状态。这个过程实现在一个循环中，参考如下伪代码：
``` go
while true:
  X = currentState()
  Y = desiredState()

  if X == Y:
    return  # Do nothing
  else:
    do(tasks to get to Y)
```
例如，当你通过 API Server 创建一个新的 Pod 对象时，Kubernetes调度器（是一个控制器）注意到此变化，并做出将该 Pod 运行在集群中哪个节点的决定。然后，通过 API Server 修改 Pod 对象的状态。此时，对应节点上的kubelet（是一个控制器）注意到此变化，并将在其所在节点运行该 Pod，设置需要的网络，使 Pod 在集群内可以访问。此处，两个控制器针对不同的状态变化做出反应，以使集群的当前状态与用户指定的期望状态匹配。

### 容器组Pod

Pod 是 Kubernetes 中的最小可部署单元。一个 Pod 代表了集群中运行的一个工作负载，可以包括一个或多个 docker 容器、挂载需要的存储，并拥有唯一的 IP 地址。Pod 中的多个容器将始终在同一个节点上运行。

### 节点Node

节点是Kubernetes集群中的一台机器，可以是物理机，也可以是虚拟机。

## Kubernetes网络模型

关于 Pod 如何接入网络这件事情，Kubernetes 做出了明确的选择。具体来说，Kubernetes 要求所有的网络插件实现必须满足如下要求：
* 所有的 Pod 可以与任何其他 Pod 直接通信，无需使用 NAT 映射（network address translation）
* 所有节点可以与所有 Pod 直接通信，无需使用 NAT 映射
* Pod 内部获取到的 IP 地址与其他 Pod 或节点与其通信时的 IP 地址是同一个

在这些限制条件下，需要解决如下四种完全不同的网络使用场景的问题：
1. Container-to-Container 的网络
2. Pod-to-Pod 的网络
3. Pod-to-Service 的网络
4. Internet-to-Service 的网络

## Container-to-Container的网络

通常，我们认为虚拟机中的网络通信是直接使用以太网设备进行的，如下图所示：

<p style="max-width: 480px">
  <img src="./network.assets/eth0.png" alt="K8S教程_Kubernetes网络模型_虚拟机的以太网设备"/>
</p>

实际情况比这个示意图更加复杂一些。Linux系统中，每一个进程都在一个 [network namespace](http://man7.org/linux/man-pages/man8/ip-netns.8.html) 中进行通信，network namespace 提供了一个逻辑上的网络堆栈（包含自己的路由、防火墙规则、网络设备）。换句话说，network namespace 为其中的所有进程提供了一个全新的网络堆栈。

Linux 用户可以使用 `ip` 命令创建 network namespace。例如，下面的命令创建了一个新的 network namespace 名称为 `ns1`：
```sh
$ ip netns add ns1
```

当创建 network namespace 时，同时将在 `/var/run/netns` 下创建一个挂载点（mount point）用于存储该 namespace 的信息。

执行 `ls /var/run/netns` 命令，或执行 `ip` 命令，可以查看所有的 network namespace：
``` sh
$ ls /var/run/netns
ns1
$ ip netns
ns1
```

默认情况下，Linux 将所有的进程都分配到 root network namespace，以使得进程可以访问外部网络，如下图所示：

<p style="max-width: 480px">
  <img src="./network.assets/root-namespace.png" alt="K8S教程_Kubernetes网络模型_root_network_namespace"/>
</p>

在 Kubernetes 中，Pod 是一组 docker 容器的集合，这一组 docker 容器将共享一个 network namespace。Pod 中所有的容器都：
* 使用该 network namespace 提供的同一个 IP 地址以及同一个端口空间
* 可以通过 localhost 直接与同一个 Pod 中的另一个容器通信

Kubernetes 为每一个 Pod 都创建了一个 network namespace。具体做法是，把一个 Docker 容器当做 “Pod Container” 用来获取 network namespace，在创建 Pod 中新的容器时，都使用 docker run 的 `--network:container` 功能来加入该 network namespace，参考 [docker run reference](https://docs.docker.com/engine/reference/run/#network-settings)。如下图所示，每一个 Pod 都包含了多个 docker 容器（`ctr*`），这些容器都在同一个共享的 network namespace 中：

<p style="max-width: 480px">
  <img src="./network.assets/pod-namespace.png" alt="K8S教程_Kubernetes网络模型_pod_network_namespace"/>
</p>

此外，Pod 中可以定义数据卷，Pod 中的容器都可以共享这些数据卷，并通过挂载点挂载到容器内部不同的路径，具体请参考 [存储卷](/learning/k8s-intermediate/persistent/pv.html)

## Pod-to-Pod的网络

在 Kubernetes 中，每一个 Pod 都有一个真实的 IP 地址，并且每一个 Pod 都可以使用此 IP 地址与 其他 Pod 通信。本章节可以帮助我们理解 Kubernetes 是如何在 Pod-to-Pod 通信中使用真实 IP 的，不管两个 Pod 是在同一个节点上，还是集群中的不同节点上。我们将首先讨论通信中的两个 Pod 在同一个节点上的情况，以避免引入跨节点网络的复杂性。

从 Pod 的视角来看，Pod 是在其自身所在的 network namespace 与同节点上另外一个 network namespace 进程通信。在Linux上，不同的 network namespace 可以通过 [Virtual Ethernet Device](http://man7.org/linux/man-pages/man4/veth.4.html) 或 ***veth pair*** (两块跨多个名称空间的虚拟网卡)进行通信。为连接 pod 的 network namespace，可以将 ***veth pair*** 的一段指定到 root network namespace，另一端指定到 Pod 的 network namespace。每一组 ***veth pair*** 类似于一条网线，连接两端，并可以使流量通过。节点上有多少个 Pod，就会设置多少组 ***veth pair***。下图展示了 veth pair 连接 Pod 到 root namespace 的情况：

<p style="max-width: 480px">
  <img src="./network.assets/pod-veth-pairs.png" alt="K8S教程_Kubernetes网络模型_veth_pair_per_pod"/>
</p>

此时，我们的 Pod 都有了自己的 network namespace，从 Pod 的角度来看，他们都有自己的以太网卡以及 IP 地址，并且都连接到了节点的 root network namespace。为了让 Pod 可以互相通过 root network namespace 通信，我们将使用 network bridge（网桥）。

Linux Ethernet bridge 是一个虚拟的 Layer 2 网络设备，可用来连接两个或多个网段（network segment）。网桥的工作原理是，在源于目标之间维护一个转发表（forwarding table），通过检查通过网桥的数据包的目标地址（destination）和该转发表来决定是否将数据包转发到与网桥相连的另一个网段。桥接代码通过网络中具备唯一性的网卡MAC地址来判断是否桥接或丢弃数据。

网桥实现了 [ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) 协议，以发现链路层与 IP 地址绑定的 MAC 地址。当网桥收到数据帧时，网桥将该数据帧广播到所有连接的设备上（除了发送者以外），对该数据帧做出相应的设备被记录到一个查找表中（lookup table）。后续网桥再收到发向同一个 IP 地址的流量时，将使用查找表（lookup table）来找到对应的 MAC 地址，并转发数据包。

<p style="max-width: 480px">
  <img src="./network.assets/pods-connected-by-bridge.png" alt="K8S教程_Kubernetes网络模型_network_bridge_网桥_虚拟网卡"/>
</p>
