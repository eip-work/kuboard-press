---
vssueId: 119
layout: LearningLayout
description: Kubernete教程_Kubernetes组件
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 节点, Kubernetes node
---

# 节点管理

<AdSenseTitle/>

与 Pod 和 Service 不一样，节点并不是由 Kubernetes 创建的，节点由云供应商（例如，Google Compute Engine、阿里云等）创建，或者节点已经存在于您的物理机/虚拟机的资源池。向 Kubernetes 中创建节点时，仅仅是创建了一个描述该节点的 API 对象。节点 API 对象创建成功后，Kubernetes将检查该节点是否有效。例如，假设您创建如下节点信息：

``` yaml
kind: Node
apiVersion: v1
metadata:
  name: "10.240.79.157"
  labels:
    name: "my-first-k8s-node"
```

Kubernetes 在 APIServer 上创建一个节点 API 对象（节点的描述），并且基于 `metadata.name` 字段对节点进行健康检查。如果节点有效（[节点组件](/learning/k8s-bg/component.html#node-组件)正在运行），则可以向该节点调度 Pod；否则，该节点 API 对象将被忽略，直到节点变为有效状态。

::: tip
Kubernetes 将保留无效的节点 API 对象，并不断地检查该节点是否有效。除非您使用 `kubectl delete node my-first-k8s-node` 命令删除该节点。
:::

## 节点控制器（Node Controller）

节点控制器是一个负责管理节点的 Kubernetes master 组件。在节点的生命周期中，节点控制器起到了许多作用。

* **首先**，节点控制器在注册节点时为节点分配 [CIDR](/glossary/cidr.html) 地址块
* **第二**，节点控制器通过云供应商（[cloud-controller-manager](/learning/k8s-bg/component.html#cloud-controller-manager)）接口检查节点列表中每一个节点对象对应的虚拟机是否可用。在云环境中，只要节点状态异常，节点控制器检查其虚拟机在云供应商的状态，如果虚拟机不可用，自动将节点对象从 APIServer 中删除。
* **第三**，节点控制器监控节点的健康状况。当节点变得不可触达时（例如，由于节点已停机，节点控制器不再收到来自节点的心跳信号），节点控制器将节点API对象的 `NodeStatus` Condition 取值从 `NodeReady` 更新为 `Unknown`；然后在等待 `pod-eviction-timeout` 时间后，将节点上的所有 Pod 从节点驱逐。
  > * 默认40秒未收到心跳，修改 `NodeStatus` Condition 为 `Unknown`；
  > * 默认 `pod-eviction-timeout` 为 5分钟
  > * 节点控制器每隔 `--node-monitor-period` 秒检查一次节点的状态

在 Kubernetes v1.13 以前，NodeStatus 记录了从节点发出的心跳信号。从 Kubernetes v1.13 开始，node lease 特性进入 alpha 阶段（[KEP-0009](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/0009-node-heartbeat.md)）。当 node lease 特性被启用时，每个节点都有一个 `kube-node-lease` 名称空间下对应的 `Lease` 对象，节点控制器周期性地更新 `Lease` 对象；此时 NodeStatus 和 node lease 都被用来记录节点的心跳信号。NodeStatus 的更新频率远高于 node lease，原因是：
* 每次节点向 master 发出心跳信号，NodeStatus 都将被更新
* 只有在 NodeStatus 发生改变，或者足够长的时间未接收到 NodeStatus 更新时，节点控制器才更新 node lease（默认为1分钟，比节点失联的超时时间40秒要更长）

> 由于 node lease 比 NodeStatus 更轻量级，该特性显著提高了节点心跳机制的效率，并使 Kubernetes 性能和可伸缩性得到了提升

在 Kubernetes v1.4 中，优化了节点控制器的逻辑以便更好的处理大量节点不能触达 master 的情况（例如，master 出现网络故障）。主要的优化点在于，节点控制器在决定是否执行 Pod 驱逐的动作时，会检查集群中所有节点的状态。

大多数情况下，节点控制器限制了驱逐 Pod 的速率为 `--node-eviction-rate` （默认值是0.1）每秒，即节点控制器每 10 秒驱逐 1 个 Pod。

当节点所在的高可用区出现故障时，节点控制器驱逐 Pod 的方式将不一样。节点控制器驱逐Pod前，将检查高可用区里故障节点的百分比（`NodeReady` Condition 的值为 `Unknown` 或 `False`）：
* 如果故障节点的比例不低于 `--unhealthy-zone-threshold`（默认为 0.55），则降低驱逐 Pod 的速率
  * 如果集群规模较小（少于等于 `--large-cluster-size-threshold` 个节点，默认值为 50），则停止驱逐 Pod
  * 如果集群规模大于 `--large-cluster-size-threshold` 个节点，则驱逐 Pod 的速率降低到 `--secondary-node-eviction-rate` （默认值为 0.01）每秒

针对每个高可用区使用这个策略的原因是，某一个高可用区可能与 master 隔开了，而其他高可用区仍然保持连接。如果您的集群并未分布在云供应商的多个高可用区上，此时，您只有一个高可用区（即整个集群）。

将集群的节点分布到多个高可用区最大的原因是，在某个高可用区出现整体故障时，可以将工作负载迁移到仍然健康的高可用区。因此，如果某个高可用区的所有节点都出现故障时，节点控制器仍然使用正常的驱逐 Pod 的速率（`--node-eviction-rate`）。

最极端的情况是，所有的高可用区都完全不可用（例如，集群中一个健康的节点都没有），此时节点控制器 master 节点的网络连接出现故障，并停止所有的驱逐 Pod 的动作，直到某些连接得到恢复。

自 Kubernetes v1.6 开始，节点控制器同时也负责为带有 `NoExecute` 污点的节点驱逐其上的 Pod。此外，节点控制器还负责根据节点的状态（例如，节点不可用，节点未就绪等）为节点添加污点。参考 [NoExecute](/learning/k8s-intermediate/config/taints-toleration/#污点与容忍的匹配)) 获取更多信息。

自 Kubernetes v1.8 开始，节点控制器可以根据节点的 Condition 为节点添加污点，此特性处于 alpha 阶段

## 节点自注册（Self-Registration）

如果 kubelet 的启动参数 `--register-node`为 true（默认为 true），kubelet 会尝试将自己注册到 API Server。kubelet自行注册时，将使用如下选项：
* `--kubeconfig`：向 apiserver 进行认证时所用身份信息的路径
* `--cloud-provider`：向云供应商读取节点自身元数据
* `--register-node`：自动向 API Server 注册节点
* `--register-with-taints`：注册节点时，为节点添加污点（逗号分隔，格式为 \<key\>=\<value\>:\<effect\>
* `--node-ip`：节点的 IP 地址
* `--node-labels`：注册节点时，为节点添加标签
* `--node-status-update-frequency`：向 master 节点发送心跳信息的时间间隔

如果 [Node authorization mode](https://kubernetes.io/docs/reference/access-authn-authz/node/) 和 [NodeRestriction admission plugin](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction) 被启用，kubelet 只拥有创建/修改其自身所对应的节点 API 对象的权限。

## 手动管理节点

集群管理员可以创建和修改节点API对象。

如果管理员想要手工创建节点API对象，可以将 kubelet 的启动参数 `--register-node` 设置为 false。

管理员可以修改节点API对象（不管是否设置了 `--register-node` 参数）。可以修改的内容有：
* 增加/减少标签
* 标记节点为不可调度（unschedulable）

节点的标签与 Pod 上的节点选择器（node selector）配合，可以控制调度方式，例如，限定 Pod 只能在某一组节点上运行。请参考 [将容器组调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html)。

执行如下命令可将节点标记为不可调度（unschedulable），此时将阻止新的 Pod 被调度到该节点上，但是不影响任何已经在该节点上运行的 Pod。这在准备重启节点之前非常有用。
``` sh
kubectl cordon $NODENAME
```

::: tip
DaemonSet Controller 创建的 Pod 将绕过 Kubernetes 调度器，并且忽略节点的 unschedulable 属性。因为我们假设 Daemons 守护进程属于节点，尽管该节点在准备重启前，已经排空了上面所有的应用程序。
:::

## 节点容量（Node Capacity）

节点API对象中描述了节点的容量（Capacity），例如，CPU数量、内存大小等信息。通常，节点在向 APIServer 注册的同时，在节点API对象里汇报了其容量（Capacity）。如果您 [手动管理节点](#手动管理节点)，您需要在添加节点时自己设置节点的容量。

Kubernetes 调度器在调度 Pod 到节点上时，将确保节点上有足够的资源。具体来说，调度器检查节点上所有容器的资源请求之和不大于节点的容量。此时，只能检查由 kubelet 启动的容器，不包括直接由容器引擎启动的容器，更不包括不在容器里运行的进程。

如果您想显式地为 Pod 以外的进程预留资源，请参考 [reserve resources for system daemons](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#system-reserved)

<!-- FIXME -->
