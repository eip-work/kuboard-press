# 安装 Kuboard 失败时如何诊断

少数情况下，您可能会碰到安装 Kuboard 失败的情况，请按照如下步骤进行诊断

## 诊断步骤

**检查 Kuboard 容器组状态**

执行命令

```sh
kubectl get pods -n kube-system
```

输出结果如下所示：

```sh
NAME                                          READY   STATUS    RESTARTS   AGE
calico-kube-controllers-7c4d64d599-67hkh      1/1     Running   0          13h
calico-node-9sf77                             1/1     Running   3          8d
calico-node-p8sxb                             1/1     Running   2          8d
calico-node-w472g                             1/1     Running   3          8d
coredns-5c98db65d4-9hwnj                      1/1     Running   3          8d
coredns-5c98db65d4-dr86j                      1/1     Running   3          8d
etcd-demo-master-a-1                          1/1     Running   3          8d
kube-apiserver-demo-master-a-1                1/1     Running   3          8d
kube-controller-manager-demo-master-a-1       1/1     Running   3          8d
kube-proxy-4tfrx                              1/1     Running   2          8d
kube-proxy-ps676                              1/1     Running   2          8d
kube-proxy-x8v4p                              1/1     Running   3          8d
kube-scheduler-demo-master-a-1                1/1     Running   3          8d
kuboard-7bb8d57995-nkqzw                      1/1     Running   0          2d20h
```

::: tip

根据 Kubernetes 安装方式不同、节点数量不同，您得到的输出结果会与样例结果有差异

请对结果做如下检查：

* kuboard-xxxxxxxxxx-xxxxx 的 STATUS 是否为 Runnning

:::

**检查 Kuboard 容器组日志**

执行命令，请使用实际 kuboard 容器组的名称替换命令中的 kuboard-xxxxxxxxxx-xxxxx

```sh
kubectl logs -f kuboard-xxxxxxxxxx-xxxxx -n kube-system
```

如果您得到如下错误信息: host not found in resolver "kube-dns.kube-system.svc.cluster.local"

```
2019/07/26 23:09:33 [emerg] 1#1: host not found in resolver "kube-dns.kube-system.svc.cluster.local" in /etc/nginx/conf.d/nginx.80.conf:36
nginx: [emerg] host not found in resolver "kube-dns.kube-system.svc.cluster.local" in /etc/nginx/conf.d/nginx.80.conf:36
```

请 [创建 kube-dns Service](install-dashboard-diagonize-kube-dns)