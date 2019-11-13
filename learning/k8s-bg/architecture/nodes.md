---
vssueId: 119
layout: LearningLayout
description: Kubernete教程_Kubernetes节点_Kubernetes中节点（node）指的是一个工作机器，曾经叫做minion。不同的集群中，节点可能是虚拟机也可能是物理机。每个节点都由 master 组件管理，并包含了运行 Pod（容器组）所需的服务。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 节点,Kubernetes node
---

# 节点

<AdSenseTitle/>

Kubernetes中节点（node）指的是一个工作机器，曾经叫做 `minion`。不同的集群中，节点可能是虚拟机也可能是物理机。每个节点都由 master 组件管理，并包含了运行 Pod（容器组）所需的服务。这些服务包括：
* [容器引擎](/learning/k8s-bg/component.html#容器引擎)
* kubelet
* kube-proxy
查看此文档可了解更多细节 [The Kubernetes Node](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/architecture.md#the-kubernetes-node)

## 节点状态

节点的状态包含如下信息：

* Addresses
* Conditions
* Capacity and Allocatable
* Info

执行以下命令可查看所有节点的列表：

``` sh
kubectl get nodes -o wide
```



执行以下命令可查看节点状态以及节点的其他详细信息：

``` sh
kubectl describe node <your-node-name>
```

输出结果如下所示：
``` {16,24,34,41}
Name:               demo-worker-temp-01
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=demo-worker-temp-01
                    kubernetes.io/os=linux
Annotations:        kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    node.alpha.kubernetes.io/ttl: 0
                    projectcalico.org/IPv4Address: 172.17.216.105/20
                    projectcalico.org/IPv4IPIPTunnelAddr: 192.168.199.128
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Mon, 30 Sep 2019 06:30:16 +0800
Taints:             <none>
Unschedulable:      false
Conditions:
  Type                 Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
  ----                 ------  -----------------                 ------------------                ------                       -------
  NetworkUnavailable   False   Wed, 02 Oct 2019 22:37:33 +0800   Wed, 02 Oct 2019 22:37:33 +0800   CalicoIsUp                   Calico is running on this node
  MemoryPressure       False   Sun, 06 Oct 2019 13:44:41 +0800   Mon, 30 Sep 2019 06:30:16 +0800   KubeletHasSufficientMemory   kubelet has sufficient memory available
  DiskPressure         False   Sun, 06 Oct 2019 13:44:41 +0800   Mon, 30 Sep 2019 06:30:16 +0800   KubeletHasNoDiskPressure     kubelet has no disk pressure
  PIDPressure          False   Sun, 06 Oct 2019 13:44:41 +0800   Mon, 30 Sep 2019 06:30:16 +0800   KubeletHasSufficientPID      kubelet has sufficient PID available
  Ready                True    Sun, 06 Oct 2019 13:44:41 +0800   Wed, 02 Oct 2019 22:37:41 +0800   KubeletReady                 kubelet is posting ready status
Addresses:
  InternalIP:  172.17.216.105
  Hostname:    demo-worker-temp-01
Capacity:
 cpu:                2
 ephemeral-storage:  41147472Ki
 hugepages-1Gi:      0
 hugepages-2Mi:      0
 memory:             7733524Ki
 pods:               110
Allocatable:
 cpu:                2
 ephemeral-storage:  37921510133
 hugepages-1Gi:      0
 hugepages-2Mi:      0
 memory:             7631124Ki
 pods:               110
System Info:
 Machine ID:                 20190711105006363114529432776998
 System UUID:                841EC123-F92C-4A3A-BEC0-DAADDD625067
 Boot ID:                    70c08b02-45ed-456f-8deb-b5c0ebeab414
 Kernel Version:             3.10.0-957.21.3.el7.x86_64
 OS Image:                   CentOS Linux 7 (Core)
 Operating System:           linux
 Architecture:               amd64
 Container Runtime Version:  docker://18.9.7
 Kubelet Version:            v1.16.0
 Kube-Proxy Version:         v1.16.0
Non-terminated Pods:         (21 in total)
  Namespace                  Name                                        CPU Requests  CPU Limits  Memory Requests  Memory Limits  AGE
  ---------                  ----                                        ------------  ----------  ---------------  -------------  ---
  default                    nginx-deployment-5754944d6c-8lnlx           0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  example                    gateway-example-6f6f45cd6-mhggv             0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  example                    monitor-grafana-ff99b5b6f-sxppz             0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  kube-system                calico-node-qjfqd                           250m (12%)    0 (0%)      0 (0%)           0 (0%)         6d7h
  kube-system                eip-nfs-cluster-storage-6c9c7d46f4-lmxql    0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  kube-system                kube-proxy-4xz9h                            0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d15h
  kube-system                monitor-prometheus-node-exporter-t7d24      0 (0%)        0 (0%)      0 (0%)           0 (0%)         2d20h
  kuboard-blog               cloud-busybox-867645c5dd-7l97b              0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  kuboard-blog               db-wordpress-79d88d66b7-j7kj8               0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  kuboard-press              svc-busybox-6cc877b848-2kl28                0 (0%)        0 (0%)      0 (0%)           0 (0%)         3d14h
  kuboard-press              web-kuboard-press-6d6f8bdbb8-c4q44          0 (0%)        0 (0%)      0 (0%)           0 (0%)         2d3h
  nginx-ingress              nginx-ingress-hsv26                         0 (0%)        0 (0%)      0 (0%)           0 (0%)         6d7h
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests    Limits
  --------           --------    ------
  cpu                250m (12%)  0 (0%)
  memory             0 (0%)      0 (0%)
  ephemeral-storage  0 (0%)      0 (0%)
Events:              <none>
```

本文将逐个描述节点状态的主要内容：

### Addresses

依据你集群部署的方式（在哪个云供应商部署，或是在物理机上部署），Addesses 字段可能有所不同。
* HostName： 在节点命令行界面上执行 `hostname` 命令所获得的值。启动 kubelet 时，可以通过参数 `--hostname-override` 覆盖
* ExternalIP：通常是节点的外部IP（可以从集群外访问的内网IP地址；上面的例子中，此字段为空）
* InternalIP：通常是从节点内部可以访问的 IP 地址

### Conditions

`Conditions` 描述了节点的状态。Condition的例子有：

| Node Condition    | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| OutOfDisk         | 如果节点上的空白磁盘空间不够，不能够再添加新的节点时，该字段为 `True`，其他情况为 `False` |
| Ready             | 如果节点是健康的且已经就绪可以接受新的 Pod。则节点Ready字段为 `True`。`False`表明了该节点不健康，不能够接受新的 Pod。 |
| MemoryPressure    | 如果节点内存紧张，则该字段为 `True`，否则为`False`           |
| PIDPressure       | 如果节点上进程过多，则该字段为 `True`，否则为 `False`        |
| DiskPressure      | 如果节点磁盘空间紧张，则该字段为 `True`，否则为 `False`      |
| NetworkUnvailable | 如果节点的网络配置有问题，则该字段为 `True`，否则为 `False`  |

Node Condition 以一个 JSON 对象的形式存在。例如，下面的yaml 描述了一个健康状态下节点的 Condition，如下所示:

```yaml
"conditions": [
  {
    "type": "Ready",
    "status": "True",
    "reason": "KubeletReady",
    "message": "kubelet is posting ready status",
    "lastHeartbeatTime": "2019-06-05T18:38:35Z",
    "lastTransitionTime": "2019-06-05T11:41:27Z"
  }
]
```

如果  `Ready` 类型Condition 的 `status` 持续为 `Unkown` 或者 `False` 超过 `pod-eviction-timeout`（[kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/)的参数）所指定的时间，节点控制器（node controller）将对该节点上的所有 Pod 执行删除的调度动作。默认的 `pod-eviction-timeout` 时间是 5 分钟。某些情况下（例如，节点网络故障），apiserver 不能够与节点上的 kubelet 通信，删除 Pod 的指令不能下达到该节点的 kubelet 上，直到 apiserver 与节点的通信重新建立，指令才下达到节点。这意味着，虽然对 Pod 执行了删除的调度指令，但是这些 Pod 可能仍然在失联的节点上运行。

在 kubernetes v1.5 以前，节点控制器将从 apiserver 强制删除这些失联节点上的 Pod。在 v1.5 及以后的版本中，节点控制器将不会强制删除这些 Pod，直到已经确认他们已经停止运行为止。您可能会发现失联节点上的 Pod 仍然在运行（在该节点上执行 `docker ps` 命令可查看容器的运行状态），然而 apiserver 中，他们的状态已经变为 `Terminating` 或者 `Unknown`。如果 Kubernetes 不能通过 [cloud-controller-manager](/learning/k8s-bg/component.html#cloud-controller-manager) 判断失联节点是否已经永久从集群中移除（例如，在虚拟机或物理机上自己部署 Kubernetes 的情况），集群管理员需要手工（通过 `kubectl delete node your-node-name` 命令）删除 apiserver 中的节点对象。此时，Kubernetes 将删除该节点上的所有 Pod。

在 Kubernetes v1.12 中，[TaintNodesByCondition](/learning/k8s-intermediate/config/taints-toleration/taint-nodes-by-condition.html) 特性进入 beta 阶段，此时 node lifecycle controller 将自动创建该 Condition 对应的 [污点](/learning/k8s-intermediate/config/taints-toleration/)。相应地，调度器在选择合适的节点时，不再关注节点的 Condition，而是检查节点的污点和 Pod 的容忍。

### Capacity and Allocatable（容量和可分配量）

容量和可分配量（Capacity and Allocatable）描述了节点上的可用资源的情况：

* CPU
* 内存
* 该节点可调度的最大 pod 数量

Capacity 中的字段表示节点上的资源总数，Allocatable 中的字段表示该节点上可分配给普通 Pod 的资源总数。

参考 [reserve compute resources](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#node-allocatable) 可以了解更多关于容量和可分配量的内容。

### Info

描述了节点的基本信息，例如：

* Linux 内核版本
* Kubernetes 版本（kubelet 和 kube-proxy 的版本）
* Docker 版本
* 操作系统名称

这些信息由节点上的 kubelet 收集。
