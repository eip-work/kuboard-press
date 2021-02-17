---
description: selfLink 问题
---

# selfLink 问题

<AdSenseTitle/>

## 问题描述

Kubernetes [v1.20](https://kubernetes.io/docs/setup/release/notes/) 开始，默认删除了 `metadata.selfLink` 字段，然而，部分应用仍然依赖于这个字段，例如 `nfs-client-provisioner`。如果仍然要继续使用这些应用，您将需要重新启用该字段。

## 启用 selfLink 字段

通过配置 apiserver 启动参数中的 `--feature-gates` 中的 `RemoveSelfLink=false`，可以重新启用 `metadata.selfLink` 字段。

请参考 [kube-apiserver 参数配置](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)

具体来说，如果您使用 kubeadm 安装 Kubernetes，请修改 `/etc/kubernetes/manifests/kube-apiserver.yaml` 文件，并在其启动参数中增加一行 `- --feature-gates=RemoveSelfLink=false`，如下第 44 行所示：

```yaml {44}
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint: 192.168.32.51:6443
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
    - --advertise-address=192.168.32.51
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
    - --service-account-issuer=https://kubernetes.default.svc.cluster.local
    - --service-account-key-file=/etc/kubernetes/pki/sa.pub
    - --service-account-signing-key-file=/etc/kubernetes/pki/sa.key
    - --service-cluster-ip-range=10.96.0.0/16
    - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    - --feature-gates=RemoveSelfLink=false
    image: registry.aliyuncs.com/k8sxio/kube-apiserver:v1.20.1
    imagePullPolicy: IfNotPresent
    livenessProbe:
      failureThreshold: 8
      httpGet:
    ...
```
