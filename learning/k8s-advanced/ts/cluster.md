---
vssueId: 128
layout: LearningLayout
description: Kubernetes教程_本文档可帮助您诊断部署到Kubernetes中的应用程序所出现的问题。如果仍然解决不了，请加本文末尾的QQ群答疑。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,诊断应用程序,问题诊断
---

# 诊断集群问题

> 参考文档：[Troubleshoot Clusters](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-cluster/)

本文主要是关于如何诊断集群出现的问题，此时，假设您已经经过排查，确认当前碰到问题的 root cause（问题的根源）不是应用程序的问题。参考 [诊断应用程序](./application.html)。

## 查看集群

当您怀疑集群可能有故障时，首先要做的是查看集群中的节点：

``` sh
kubectl get nodes -o wide
```

检查是否所有的节点是否都在并且都处于 `Ready` 状态。对于您怀疑有问题的节点，可以查看节点上的详细信息，以及节点上的事件：

参考 [节点](/learning/k8s-bg/architecture/nodes.html) 理解节点详细信息的含义

``` sh
# 将 ${NODE_NAME} 替换成您实际的节点名字
kubectl describe node ${NODE_NAME}
```

## 查看日志

此时，如果还不能确定问题在哪儿，就需要您进一步到相关的机器上查询集群组件的日志了。

如果您参考 www.kuboard.cn 上的 kubernetes 安装文档安装的集群，或者使用 kubeadm 安装的集群，可以按照如下方式查看集群各组件的日志：

### 容器化的集群组件

执行命令 `kubectl get pods -n kube-system` 查看所有 `kube-system` 名称空间下的容器，输出结果如下所示：

```
NAME                                          READY   STATUS        RESTARTS   AGE
calico-kube-controllers-65b8787765-4sbhj      1/1     Running       2          51d
calico-node-fz5t5                             1/1     Running       0          7d22h
calico-node-lpd5d                             1/1     Running       1          34d
calico-node-qjfqd                             1/1     Running       1          10d
calico-node-zchvg                             1/1     Running       6          51d
coredns-67c766df46-cbhf4                      1/1     Running       1          8d
coredns-67c766df46-zthsk                      1/1     Running       0          7d23h
eip-nfs-cluster-storage-6c9c7d46f4-lmxql      1/1     Running       0          7d23h
eip-nfs-nfs-on-centos-66c4fc8fbd-rd4zh        1/1     Running       0          7d5h
etcd-demo-master-a-1                          1/1     Running       0          8d
kube-apiserver-demo-master-a-1                1/1     Running       0          8d
kube-controller-manager-demo-master-a-1       1/1     Running       1          8d
kube-proxy-4xz9h                              1/1     Running       1          8d
kube-proxy-5kljb                              1/1     Running       1          8d
kube-proxy-wmzlq                              1/1     Running       0          7d22h
kube-proxy-z55s9                              1/1     Running       1          8d
kube-scheduler-demo-master-a-1                1/1     Running       0          8d
kuboard-7d6b54b946-xmv28                      1/1     Running       0          3d3h
kuboard-897b6487d-2bbmz                       0/1     Terminating   6          13d
monitor-blackbox-exporter-7b97c74f8f-qcm4z    1/1     Running       0          7d4h
monitor-grafana-7d88f4b5d7-jxphs              1/1     Running       0          7d4h
monitor-kube-state-metrics-555b9cd949-hthlr   2/2     Running       0          7d4h
monitor-prometheus-6768d469b5-cmn9j           1/1     Running       0          7d4h
monitor-prometheus-node-exporter-dsfnl        1/1     Running       0          7d4h
monitor-prometheus-node-exporter-l5dbs        1/1     Running       0          7d4h
monitor-prometheus-node-exporter-t7d24        1/1     Running       0          7d4h
monitor-prometheus-node-exporter-z9ht5        1/1     Running       0          7d4h
```

其中，`kube-` 开头的 Pod 都是 Kubernetes 集群的系统级组件，`calico-` 开头是的 calico 网络插件，`etcd-` 开头的是 etcd，`coredns-` 开头的是 DNS 插件。

假设您认为 apiserver 可能有故障，则，可以执行以下命令以查看其日志

``` sh
kubectl logs -f kube-apiserver-demo-master-a-1 -n kube-system
```

### kubelet 的日志

执行命令 `service kubelet status` 可查看 kubelet 的运行状态，如下所示：

如果您的 kubelet 运行状态不是 `active (running)`，那么您需要进一步查看 kubelet 的日志。

``` {6}
Redirecting to /bin/systemctl status kubelet.service
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/usr/lib/systemd/system/kubelet.service; enabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: active (running) since Wed 2019-10-02 22:06:37 CST; 1 weeks 1 days ago
     Docs: https://kubernetes.io/docs/
 Main PID: 633 (kubelet)
    Tasks: 18
   Memory: 213.2M
   CGroup: /system.slice/kubelet.service
           └─633 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/var/lib/kubelet/config.yaml --cgroup-driver=systemd --network-plugin=cni --...
```

执行命令以下命令可以查看 kubelet 的日志：
``` sh
journalctl -u kubelet
```

## 集群故障的常见原因

此处罗列了一部分 kubernetes 集群常见的故障原因以及应对办法：

可能的 Root causes：

* 虚拟机（或所在物理机）停机
* 集群内部发生网络不通的情况，或者集群和用户之间网络不通
* Kubernetes 系统组件崩溃
* 数据丢失，或持久化存储不可用
* 运维人员的人为错误，例如，错误地配置了 Kubernetes 或者 Kubernetes 上部署的应用程序

具体的故障场景有：

* Apiserver 所在虚拟机 shotdown 或者 apiserver 崩溃
  * 导致的结果：
    * 不能创建、停止、更新 Pod、Service、Deployment等
    * 已有的 Pod 和 Service 仍然能够正常工作，除非该 Pod 或 Service 需要调用 Kubernetes 的接口，例如 Kubernetes Dashboard 和 Kuboard
* Apiserver 的后端数据丢失
  * 导致的结果：
    * apiserver 将不能再启动
    * 已有的 Pod 和 Service 仍然能够正常工作，除非该 Pod 或 Service 需要调用 Kubernetes 的接口，例如 Kubernetes Dashboard 和 Kuboard
    * 需要手工恢复（或重建） apiserver 的数据才能启动 apiserver
* 其他 Master 组件崩溃
  * 导致的结果和 apiserver 相同
* 个别节点（虚拟机或物理机）停机
  * 导致的结果
    * 该节点上的所有 Pod 不再运行
* 网络分片
  * 导致的结果
    * 区域A认为区域B中的节点已死机；区域B认为区域A中的 apiserver 已死机（假设apiserver在区域A）
* kubelet 软件故障
  * 导致的结果
    * 已崩溃的 Kubelet 不能在该节点上再创建新的 Pod
    * kubelet 有可能错误地删除了 Pod
    * 节点被标记为 `unhealthy`
    * Deployment/ReplicationController 在其他节点创建新的 Pod
* 集群管理员的人为错误
  * 导致的结果
    * 丢失 Pod、Service 等
    * 丢失 apiserver 的数据
    * 用户不能访问接口
    * 等等...

## 应对办法：

* Action： 使用 IaaS 供应商提供的自动重启虚拟机的功能
  * 应对问题：Apiserver 所在虚拟机停机或者 apiserver 崩溃
  * 应对问题：其他 Master 组件崩溃

* Action： 为 apiserver + etcd 使用 IaaS 供应商提供的稳定可靠的持久化存储
  * 应对问题： Apiserver 的后端数据丢失

* Action： 使用高可用配置，参考 [安装Kubernetes高可用](/install/install-kubernetes.html)
  * 应对问题：Apiserver 所在虚拟机 shotdown 或者 apiserver 崩溃
  * 应对问题：其他 Master 组件崩溃
  * 应对问题：个别节点（虚拟机或物理机）停机

* Action：周期性的为 apiserver 的 etcd 所使用的数据卷创建磁盘快照（Snapshot）
  * 应对问题：Apiserver 的后端数据丢失
  * 应对问题：集群管理员的人为错误
  * 应对问题：kubelet 软件故障

* Action：使用Deployment/StatefulSet/DaemonSet 等控制器，而不是直接创建 Pod
  * 应对问题：个别节点（虚拟机或物理机）停机
  * 应对问题：kubelet 软件故障

* Action：[Kubernetes联邦](https://kubernetes.io/docs/concepts/cluster-administration/federation/) （避免将有风险的操作一次性应用到所有集群）
  * 应对问题：上述所有问题

<!-- FIXME 联邦 -->
