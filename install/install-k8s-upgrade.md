---
vssueId: 17
description: Kubernetes升级_使用kubeadm升级K8S集群_到Kubernetes_v1.15.3
meta:
  - name: keywords
    content: Kubernetes升级,K8S升级,Kubernetes1.15.3
---

# Kubernetes爆发严重漏洞_可能影响所有开源版本_请尽快升级

<AdSenseTitle/>

参考文档：Info Q 文章 [Kubernetes 爆发严重漏洞：可能影响所有开源版本](https://www.infoq.cn/article/2lxylPOCU4cf9MR2S5fp)
参考文档：51CTO 安全频道 [Kubernetes的严重漏洞将所有服务器暴露在DoS攻击面前!](http://netsecurity.51cto.com/art/201908/601671.htm)

参考文档： kubernetes 文档 [kubeadm upgrade](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-upgrade/)

::: danger 严重漏洞
* CVE-2019-9512 Ping Flood：攻击者向 HTTP/2 对等体 (peer) 发送连续 ping，导致对等体建立内部响应队列。这可能消耗过多 CPU 和内存——这取决于该数据的队列多高效，从而可能导致拒绝服务攻击。
* CVE-2019-9514 Rest Flood：攻击者打开多路数据流，并在每路数据流上发送无效请求，从而从对等体获得 RST_STREAM 帧数据流。这会消耗过多的内存、CPU 或 CPU 和内存——这取决于对等体如何将 RST_STREAM 帧列入队列，从而可能导致拒绝服务攻击。
:::

::: warning 请升级到补丁版本
Kubernetes 已经发布补丁以修复漏洞，建议所有管理员尽快升级到补丁版本，以帮助管理员应对漏洞：

* Kubernetes v1.15.3 - go1.12.9
* Kubernetes v1.14.6 - go1.12.9
* Kubernetes v1.13.10 - go1.11.13

:::

## 前提条件

* 您使用 kubeadm 安装了 kubernetes v1.15.0 / v1.15.1 / v1.15.2 集群
* 您想要将其升级到最新的版本 kubernetes v1.15.3

::: tip
www.kuboard.cn 是一款免费的基于 Kubernetes 的微服务管理界面，目前只能提供 kubernetes v1.15.0 / v1.15.1 / v1.15.2 到 kubernetes v1.15.3 的升级文档，其他版本的集群，请参考 kubernetes 文档 [kubeadm upgrade](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-upgrade/)
:::

## 升级 kubeadm/kubelet/kubectl

在所有节点（包括 master、worker 节点）执行命令

``` sh
# 在所有节点执行（包括 master 和 worker 节点）
yum install -y kubelet-1.15.3 kubeadm-1.15.3 kubectl-1.15.3
systemctl daemon-reload
systemctl restart kubelet
```

## 查看集群配置

在第一个 master 节点执行命令

``` sh
# 只在第一个 master 节点执行
kubeadm config view
```

输入结果如下所示：（根据集群配置不一样，您的结果可能不同）

``` yaml {15,17}
apiServer:
  extraArgs:
    authorization-mode: Node,RBAC
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta2
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controlPlaneEndpoint: apiserver.demo:6443
controllerManager: {}
dns:
  type: CoreDNS
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: k8s.gcr.io
kind: ClusterConfiguration
kubernetesVersion: v1.15.0
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
scheduler: {}
```

## 创建升级用的配置文件

**创建文件 kubeadm-config-upgrade.yaml**

文件内容如下所示，根据前面 `kubeadm config view` 的执行结果，修改了如下字段：
* imageRepository 的值修改为：registry.cn-hangzhou.aliyuncs.com/google_containers
* kubernetesVersion 的值修改为： v1.15.3
``` yaml {15,17}
apiServer:
  extraArgs:
    authorization-mode: Node,RBAC
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta2
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controlPlaneEndpoint: apiserver.demo:6443
controllerManager: {}
dns:
  type: CoreDNS
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
kind: ClusterConfiguration
kubernetesVersion: v1.15.3
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
scheduler: {}
```

## 执行 kubeadm upgrade 命令

在第一个 master 节点上执行：

查看升级后的变化

``` sh
# 只在第一个 master 节点执行
kubeadm upgrade diff --config kubeadm-config-upgrade.yaml
```

执行升级 dry-run

``` sh
# 只在第一个 master 节点执行
kubeadm upgrade apply --config kubeadm-config-upgrade.yaml --dry-run
```

执行升级动作

``` sh
# 只在第一个 master 节点执行
kubeadm upgrade apply --config kubeadm-config-upgrade.yaml
```

## 升级 worker 节点

针对所有的 worker 节点，执行

``` sh
# 只在 worker 节点执行（所有的 worker 节点）
kubeadm upgrade node
```

## 检查升级结果

在第一个 master 节点执行

``` sh
# 只在第一个 master 节点执行
kubectl get nodes -o wide
kubectl version
kubeadm config view
```
