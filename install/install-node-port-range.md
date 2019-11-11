---
vssueId: 15
# layout: StepLayout
description: Kubernete安装后_默认NodePort的范围是30000-32767_某些情况下_因为您所在公司的网络策略限制_您可能需要修改 NodePort的端口范围_本文描述了具体的操作方法
meta:
  - name: keywords
    content: Kubernetes安装,K8S安装,kubeadm,NodePort范围
---

# 修改NodePort的范围

<AdSenseTitle>

在 Kubernetes 集群中，[NodePort](/learning/k8s-intermediate/service/service-types.html#nodeport) 默认范围是 30000-32767，某些情况下，因为您所在公司的网络策略限制，您可能需要修改 NodePort 的端口范围，本文描述了具体的操作方法。

</AdSenseTitle>

### 修改kube-apiserver.yaml

使用 kubeadm 安装 K8S 集群的情况下，您的 Master 节点上会有一个文件 `/etc/kubernetes/manifests/kube-apiserver.yaml`，修改此文件，向其中添加 `--service-node-port-range=20000-22767` （请使用您自己需要的端口范围），如下所示：

``` yaml {38}
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    component: kube-apiserver
    tier: control-plane
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --advertise-address=172.17.216.80
    - --allow-privileged=true
    - --authorization-mode=Node,RBAC
    - --client-ca-file=/etc/kubernetes/pki/ca.crt
    - --enable-admission-plugins=NodeRestriction
    - --enable-bootstrap-token-auth=true
    - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
    - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
    - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
    - --etcd-servers=https://127.0.0.1:2379
    - --insecure-port=0
    - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
    - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
    - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
    - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
    - --requestheader-allowed-names=front-proxy-client
    - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
    - --requestheader-extra-headers-prefix=X-Remote-Extra-
    - --requestheader-group-headers=X-Remote-Group
    - --requestheader-username-headers=X-Remote-User
    - --secure-port=6443
    - --service-account-key-file=/etc/kubernetes/pki/sa.pub
    - --service-cluster-ip-range=10.96.0.0/12
    - --service-node-port-range=20000-22767
    - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    image: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.16.0
    imagePullPolicy: IfNotPresent
    livenessProbe:
      failureThreshold: 8
      httpGet:
        host: 172.17.216.80
        path: /healthz
        port: 6443
        scheme: HTTPS
      initialDelaySeconds: 15
      timeoutSeconds: 15
  ...
```


### 重启apiserver

执行以下命令，重启 apiserver
``` sh
# 获得 apiserver 的 pod 名字
export apiserver_pods=$(kubectl get pods --selector=component=kube-apiserver -n kube-system --output=jsonpath={.items..metadata.name})
# 删除 apiserver 的 pod
kubectl delete pod $apiserver_pods -n kube-system
```

### 验证结果

执行以下命令，验证修改是否生效：
``` sh
kubectl describe pod $apiserver_pods -n kube-system
```
输出结果如下所示：（此时，我们可以看到，apiserver 已经使用新的命令行参数启动）
``` {29}
...
    Host Port:     <none>
    Command:
      kube-apiserver
      --advertise-address=172.17.216.80
      --allow-privileged=true
      --authorization-mode=Node,RBAC
      --client-ca-file=/etc/kubernetes/pki/ca.crt
      --enable-admission-plugins=NodeRestriction
      --enable-bootstrap-token-auth=true
      --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
      --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
      --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
      --etcd-servers=https://127.0.0.1:2379
      --insecure-port=0
      --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
      --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
      --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
      --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
      --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
      --requestheader-allowed-names=front-proxy-client
      --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
      --requestheader-extra-headers-prefix=X-Remote-Extra-
      --requestheader-group-headers=X-Remote-Group
      --requestheader-username-headers=X-Remote-User
      --secure-port=6443
      --service-account-key-file=/etc/kubernetes/pki/sa.pub
      --service-cluster-ip-range=10.96.0.0/12
      --service-node-port-range=20000-22767
      --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
      --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    State:          Running
      Started:      Mon, 11 Nov 2019 21:31:39 +0800
    Ready:          True
    Restart Count:  0
    Requests:
      cpu:        250m
  ...
```

::: tip 注意
* 对于已经创建的NodePort类型的Service，您需要删除重新创建
* 如果您的集群有多个 Master 节点，您需要逐个修改每个节点上的  `/etc/kubernetes/manifests/kube-apiserver.yaml` 文件，并重启 apiserver
:::
