---
vssueId: 174
layout: LearningLayout
description: Kubernetes教程_本文解释了Kubernetes中出现 ImagePullBackoff 错误时的处理办法
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Service
---

# 为什么我不能获取到镜像，ImagePullBackoff

::: tip Pending
应用长时间处于 Pending 状态时，也可以按照这个办法查看镜像的下载进度。
:::

安装 Kubernetes 过程中，或者向 Kubernetes 部署应用的过程中，有可能会碰到 ImagePullBackoff 的问题。例如执行命令：


```sh
kubectl get pods -n kube-system
```

结果如下所示：

``` {2,3}
NAME                                          READY   STATUS              RESTARTS   AGE
coredns-94d74667-6dj45                        1/1     ImagePullBackOff    0          12m
coredns-94d74667-xv6wd                        1/1     Pending             0          12m
etcd-master                                   1/1     Running             0          13m
kube-apiserver-master                         1/1     Running             0          13m
kube-controller-manager-master                1/1     Running             0          12m
kube-flannel-ds-amd64-4wjcl                   1/1     Running             0          12m
kube-flannel-ds-amd64-9k28h                   1/1     Running             0          12m
kube-flannel-ds-amd64-pwkv5                   1/1     Running             0          12m
kube-proxy-qd6w7                              1/1     Running             0          12m
kube-scheduler-master                         1/1     Running             0          12m
```

碰到这个问题时，可按如下步骤解决：

* 确定问题 Pod 所在节点，以 `kube-system` 名称空间下的 Pod `coredns-94d74667-6dj45` 为例：
  ``` sh
  kubectl get pods coredns-94d74667-6dj45 -n kube-system -o wide
  ```

  输出结果如下所示：
  ```
  NAME                     READY   STATUS    RESTARTS   AGE   IP            NODE     NOMINATED NODE   READINESS GATES
  coredns-94d74667-6dj45   1/1     Running   2          39d   10.244.0.40   master   <none>           <none>
  ```
  从这个就结果中，我们得知，该 Pod 被调度到了 `master` 节点

* 确定 Pod 所使用的容器镜像：
  ``` sh
  kubectl get pods coredns-94d74667-6dj45 -n kube-system -o yaml | grep image:
  ```
  输出结果如下所示：
  ```
      image: registry.aliyuncs.com/google_containers/coredns:1.3.1
      image: registry.aliyuncs.com/google_containers/coredns:1.3.1
  ```
  从这个结果中，我们得知，该 Pod 使用到了容器镜像 `registry.aliyuncs.com/google_containers/coredns:1.3.1`

* 在 Pod 所在节点执行 docker pull 指令：
  ```sh
  docker pull registry.aliyuncs.com/google_containers/coredns:1.3.1
  ```

  如果镜像标签没有问题，docker 指令将显示该镜像的下载过程，耐心等待即可。如果不能抓取 docker 镜像，请参考 Docker 命令的输出提示，做对应的处理。
