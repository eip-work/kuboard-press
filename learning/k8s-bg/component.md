---
vssueId: 117
layout: LearningLayout
description: Kubernete教程_Kubernetes组件_Master组件可以运行于集群中的任何机器上。但是，为了简洁性，通常在同一台机器上运行所有的 master 组件，且不在此机器上运行用户的容器
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 组件
---

# Kubernetes组件

<AdSenseTitle/>

> 参考文档： [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)

本文档描述了 Kubernetes 的主要组件。

## Master组件

Master组件是集群的控制平台（control plane）：
* master 组件负责集群中的全局决策（例如，调度）
* master 组件探测并响应集群事件（例如，当 Deployment 的实际 Pod 副本数未达到 `replicas` 字段的规定时，启动一个新的 Pod）

Master组件可以运行于集群中的任何机器上。但是，为了简洁性，通常在同一台机器上运行所有的 master 组件，且不在此机器上运行用户的容器。参考 [安装Kubernetes高可用](/install/install-kubernetes.html)。

### kube-apiserver

此 master 组件提供 Kubernetes API。这是Kubernetes控制平台的前端（front-end），可以水平扩展（通过部署更多的实例以达到性能要求）。kubectl / kubernetes dashboard / kuboard 等Kubernetes管理工具就是通过 kubernetes API 实现对 Kubernetes 集群的管理。

### etcd

支持一致性和高可用的名值对存储组件，Kubernetes集群的所有配置信息都存储在 etcd 中。请确保您 [备份](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster) 了 etcd 的数据。关于 etcd 的更多信息，可参考 [etcd 官方文档](https://etcd.io/docs/)

### kube-scheduler

此 master 组件监控所有新创建尚未分配到节点上的 Pod，并且自动选择为 Pod 选择一个合适的节点去运行。

影响调度的因素有：
* 单个或多个 Pod 的资源需求
* 硬件、软件、策略的限制
* 亲和与反亲和（affinity and anti-affinity）的约定
* 数据本地化要求
* 工作负载间的相互作用

### kube-controller-manager

此 master 组件运行了所有的控制器
<!-- FIXME: controller的链接 -->

逻辑上来说，每一个控制器是一个独立的进程，但是为了降低复杂度，这些控制器都被合并运行在一个进程里。

kube-controller-manager 中包含的控制器有：
* 节点控制器： 负责监听节点停机的事件并作出对应响应
* 副本控制器： 负责为集群中每一个 副本控制器对象（Replication Controller Object）维护期望的 Pod 副本数
* 端点（Endpoints）控制器：负责为端点对象（Endpoints Object，连接 Service 和 Pod）赋值
* Service Account & Token控制器： 负责为新的名称空间创建 default Service Account 以及 API Access Token

### cloud-controller-manager

<!-- FIXME: cloud-controller-manager的链接 -->

cloud-controller-manager 中运行了与具体云基础设施供应商互动的控制器。这是 Kubernetes 1.6 版本中引入的特性，尚处在 alpha 阶段。

cloud-controller-manager 只运行特定于云基础设施供应商的控制器。如果您参考 www.kuboard.cn 上提供的文档安装 Kubernetes 集群，默认不安装 cloud-controller-manager。

cloud-controller-manager 使得云供应商的代码和 Kubernetes 的代码可以各自独立的演化。在此之前的版本中，Kubernetes的核心代码是依赖于云供应商的代码的。在后续的版本中，特定于云供应商的代码将由云供应商自行维护，并在运行Kubernetes时链接到 cloud-controller-manager。

以下控制器中包含与云供应商相关的依赖：
* 节点控制器：当某一个节点停止响应时，调用云供应商的接口，以检查该节点的虚拟机是否已经被云供应商删除
  > 译者注：私有化部署Kubernetes时，我们不知道节点的操作系统是否删除，所以在移除节点后，要自行通过 `kubectl delete node` 将节点对象从 Kubernetes 中删除
* 路由控制器：在云供应商的基础设施中设定网络路由
  > 译者注：私有化部署Kubernetes时，需要自行规划Kubernetes的拓扑结构，并做好路由配置，例如 [安装Kubernetes单Master节点](/install/install-k8s.html) 中所作的
* 服务（Service）控制器：创建、更新、删除云供应商提供的负载均衡器
  > 译者注：私有化部署Kubernetes时，不支持 LoadBalancer 类型的 Service，如需要此特性，需要创建 NodePort 类型的 Service，并自行配置负载均衡器
* 数据卷（Volume）控制器：创建、绑定、挂载数据卷，并协调云供应商编排数据卷
  > 译者注：私有化部署Kubernetes时，需要自行创建和管理存储资源，并通过Kubernetes的[存储类](/learning/k8s-intermediate/persistent/storage-class.html)、[存储卷](/learning/k8s-intermediate/persistent/pv.html)、[数据卷](/learning/k8s-intermediate/persistent/volume.html)等与之关联

> 译者注：通过 cloud-controller-manager，Kubernetes可以更好地与云供应商结合，例如，在阿里云的 Kubernetes 服务里，您可以在云控制台界面上轻松点击鼠标，即可完成 Kubernetes 集群的创建和管理。在私有化部署环境时，您必须自行处理更多的内容。幸运的是，通过合适的教程指引，这些任务的达成并不困难。


## Node 组件

Node 组件运行在每一个节点上（包括 master 节点和 worker 节点），负责维护运行中的 Pod 并提供 Kubernetes 运行时环境。

### kubelet

此组件是运行在每一个集群节点上的代理程序。它确保 Pod 中的容器处于运行状态。Kubelet 通过多种途径获得 PodSpec 定义，并确保 PodSpec 定义中所描述的容器处于运行和健康的状态。Kubelet不管理不是通过 Kubernetes 创建的容器。

### kube-proxy

[kube-proxy](/learning/k8s-intermediate/service/service-details.html#虚拟-ip-和服务代理) 是一个网络代理程序，运行在集群中的每一个节点上，是实现 Kubernetes Service 概念的重要部分。

kube-proxy 在节点上维护网络规则。这些网络规则使得您可以在集群内、集群外正确地与 Pod 进行网络通信。如果操作系统中存在 packet filtering layer，kube-proxy 将使用这一特性（[iptables代理模式](/learning/k8s-intermediate/service/service-details.html#iptables-代理模式)），否则，kube-proxy将自行转发网络请求（[User space代理模式](/learning/k8s-intermediate/service/service-details.html#user-space-代理模式)）

### 容器引擎

容器引擎负责运行容器。Kubernetes支持多种容器引擎：[Docker](http://www.docker.com/)、[containerd](https://containerd.io/)、[cri-o](https://cri-o.io/)、[rktlet](https://github.com/kubernetes-incubator/rktlet) 以及任何实现了 [Kubernetes容器引擎接口](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-node/container-runtime-interface.md) 的容器引擎

## Addons

Addons 使用 Kubernetes 资源（DaemonSet、Deployment等）实现集群的功能特性。由于他们提供集群级别的功能特性，addons使用到的Kubernetes资源都放置在 `kube-system` 名称空间下。

下面描述了一些经常用到的 addons，参考 [Addons](https://kubernetes.io/docs/concepts/cluster-administration/addons/) 查看更多列表。

### DNS

除了 DNS Addon 以外，其他的 addon 都不是必须的，所有 Kubernetes 集群都应该有 [Cluster DNS](/learning/k8s-intermediate/service/dns.html)

Cluster DNS 是一个 DNS 服务器，是对您已有环境中其他 DNS 服务器的一个补充，存放了 Kubernetes Service 的 DNS 记录。

Kubernetes 启动容器时，自动将该 DNS 服务器加入到容器的 DNS 搜索列表中。

> 如果您参考 www.kuboard.cn 上提供的文档安装 Kubernetes，默认已经安装了 [Core DNS](https://coredns.io/)

### Web UI（Dashboard）

[Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) 是一个Kubernetes集群的 Web 管理界面。用户可以通过该界面管理集群。

### Kuboard

[Kuboard](/install/install-dashboard.html) 是一款基于Kubernetes的微服务管理界面，相较于 Dashboard，Kuboard 强调：
* 无需手工编写 YAML 文件
* 微服务参考架构
* 上下文相关的监控
* 场景化的设计
  * 导出配置
  * 导入配置

### ContainerResource Monitoring

[Container Resource Monitoring](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-usage-monitoring/) 将容器的度量指标（metrics）记录在时间序列数据库中，并提供了 UI 界面查看这些数据

<!-- FIXME -->

### Cluster-level Logging

[Cluster-level logging](https://kubernetes.io/docs/concepts/cluster-administration/logging/) 机制负责将容器的日志存储到一个统一存储中，并提供搜索浏览的界面

<!-- FIXME -->
