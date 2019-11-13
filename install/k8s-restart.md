---
vssueId: 15
# layout: StepLayout
description: Kubernete安装文档_Kubernetes集群的设计目标是setup-and-run-forever_然而许多学习者使用自己笔记本上的虚拟机安装K8S集群用于学习_这就必然会出现反复重启集群所在虚拟机的情况_本文针对重启后会出现一些的一些令人困惑的问题做了解释
meta:
  - name: keywords
    content: Kubernetes重启,K8S重启,K8S教程
---

# 重启Kubernetes集群

<AdSenseTitle>

Kubernetes集群的设计目标是setup-and-run-forever，然而许多学习者使用自己笔记本上的虚拟机安装K8S集群用于学习，这就必然会出现反复重启集群所在虚拟机的情况。本文针对重启后会出现一些的一些令人困惑的问题做了解释。

</AdSenseTitle>

## Worker节点不能启动

Master 节点的 IP 地址变化，导致 worker 节点不能启动。请重装集群，并确保所有节点都有固定内网 IP 地址。

## 许多Pod一直Crash或不能正常访问

``` sh
kubectl get pods --all-namespaces
```

重启后会发现许多 Pod 不在 Running 状态，此时，请使用如下命令删除这些状态不正常的 Pod。通常，您的 Pod 如果是使用 Deployment、StatefulSet 等控制器创建的，kubernetes 将创建新的 Pod 作为替代，重新启动的 Pod 通常能够正常工作。

``` sh
kubectl delete pod <pod-name> -n <pod-namespece>
```

## 其他问题

请参考本文结尾的方式联系 kuboard 群主，协助您解决重启 kubernetes 集群后的问题
