---
description: Kubernete安装文档_更新 kubernetes 证书文件
meta:
  - name: keywords
    content: 更新 kubernetes 证书文件
---

# 更新 Kubernetes 证书文件

<AdSenseTitle/>

> 参考文档： [Certificate Management with kubeadm](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/)

**FEATURE STATE:** Kubernetes v1.15 \[stable\]

通过 kubeadm 安装集群时，所生成的客户端证书的有效期为一年。本文讲述了如何使用 kubeadm 更新证书（只适用于通过 kubeadm 安装的集群，如果使用其他方式或工具安装的集群，请参考对应工具的文档）。


... 正在更新


::: tip
apiserver 访问 kubelet 时，并不校验 kubelet 的服务端证书，kubeadm 也并不提供更新 kubelet 服务端证书的办法。
:::
