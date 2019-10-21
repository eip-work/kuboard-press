---
vssueId: 141
description: Kubernetes升级1.16.x。本文描述了如何从 Kubernetes 网络插件 calico 3.8.x 升级到 3.9。执行命令 kubectl describe deployment calico-kube-controllers -n kube-system 确认当前 calico 版本
meta:
  - name: keywords
    content: Kubernetes升级,K8S升级,升级calico
---

# 升级网络插件calico

<AdSenseTitle/>

::: danger
升级 calico 时，集群内部网络会不可用，请选择合适的时间升级
:::

## 确认当前版本

执行以下命令确认当前 calico 版本

``` sh
kubectl describe deployment calico-kube-controllers -n kube-system
```

输出结果如下所示：

``` yaml {18}
Name:               calico-kube-controllers
Namespace:          kube-system
CreationTimestamp:  Tue, 20 Aug 2019 06:38:17 +0800
Labels:             k8s-app=calico-kube-controllers
Annotations:        deployment.kubernetes.io/revision: 1
                    kubectl.kubernetes.io/last-applied-configuration:
                      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"k8s-app":"calico-kube-controllers"},"name":"calico-kub...
Selector:           k8s-app=calico-kube-controllers
Replicas:           1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:       Recreate
MinReadySeconds:    0
Pod Template:
  Labels:           k8s-app=calico-kube-controllers
  Annotations:      scheduler.alpha.kubernetes.io/critical-pod: 
  Service Account:  calico-kube-controllers
  Containers:
   calico-kube-controllers:
    Image:      calico/kube-controllers:v3.8.2
    Port:       <none>
    Host Port:  <none>
    Readiness:  exec [/usr/bin/check-status -r] delay=0s timeout=1s period=10s #success=1 #failure=3
    Environment:
      ENABLED_CONTROLLERS:  node
      DATASTORE_TYPE:       kubernetes
    Mounts:                 <none>
  Volumes:                  <none>
```

## 清理已有安装

如上所示，calico镜像是 v3.8.2，要清理已有 calico 安装，执行命令：

``` sh
# 如果版本号是 v3.8.2 或者 v3.8.x，则删除命令如下
kubectl delete -f https://kuboard.cn/install-script/calico/calico-3.8.yaml
```

## 安装新版本

执行命令查看kubernetes 

``` yaml {21}
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
kubernetesVersion: v1.16.0
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
  podSubnet: 10.100.0.1/16
scheduler: {}
```

执行以下命令，安装 calico 3.9，请注意，下面的 POD_SUBNET 环境变量来自于上面的输出结果：

``` sh {2}
# 命令行中环境变量 POD_SUBNET 的取值 10.100.0.1/16 来自于上一个命令的输出结果
export POD_SUBNET=10.100.0.1/16
rm -f calico-3.9.2.yaml
wget https://kuboard.cn/install-script/calico/calico-3.9.2.yaml
sed -i "s#192\.168\.0\.0/16#${POD_SUBNET}#" calico-3.9.2.yaml
kubectl apply -f calico-3.9.2.yaml
```

此时可执行命令检查 calico 的版本：
``` sh
kubectl describe deployment calico-kube-controllers -n kube-system
```

:tada: :tada: :tada:
