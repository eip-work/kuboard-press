---
vssueId: 132
layout: LearningLayout
description: Kubernetes教程_某些情况下_DNS或者其他的域名解析方法可能不太适用_您需要配置_/etc/hosts文件_在Linux下是比较容易做到的_在Kubernetes中_可以通过Pod定义中的_`hostAliases`_字段向Pod的/etc/hosts添加条目。
meta:
  - name: keywords
    content: Kubernetes Ingress,Ingress
---

# 配置Pod的 /etc/hosts

<AdSenseTitle>

> 参考文档：[Adding entries to Pod /etc/hosts with HostAliases](https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/)

某些情况下，DNS 或者其他的域名解析方法可能不太适用，您需要配置 /etc/hosts 文件，在Linux下是比较容易做到的，在 Kubernetes 中，可以通过 Pod 定义中的 `hostAliases` 字段向 Pod 的 /etc/hosts 添加条目。

适用其他方法修改 Pod 的 /etc/hosts 文件是不被推荐的，因为 kubelet 可能在重新创建 Pod 时，就会覆盖这些修改。

</AdSenseTitle>

## 默认hosts文件内容

通过创建一个 Nginx Pod，我们可以查看Pod创建后，/etc/hosts 文件的默认内容，执行命令：

``` sh
kubectl run nginx --image nginx --generator=run-pod/v1
```

执行命令查看 Pod 的IP：

``` sh
kubectl get pods -o wide
```
输出结果如下所示：
```
NAME     READY     STATUS    RESTARTS   AGE    IP           NODE
nginx    1/1       Running   0          13s    10.200.0.4   worker0
```

执行命令查看hosts文件的内容
``` sh
kubectl exec nginx -- cat /etc/hosts
```

输出结果如下所示：

```
# Kubernetes-managed hosts file.
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
fe00::0	ip6-mcastprefix
fe00::1	ip6-allnodes
fe00::2	ip6-allrouters
10.200.0.4	nginx
```

默认情况下， `hosts` 文件只包含 IPv4 和 IPv6 的基本配置，例如 `localhost` 和该 Pod 自己的 hostname。

## 使用hostAliases添加额外的条目

通过 Pod 定义中的 `.spec.hostAliases` 字段，我们可以向 Pod 的 `/etc/hosts` 文件中添加额外的条目，用来解析 `foo.local`、`bar.local` 到 `127.0.0.1 和` `foo.remote`、`bar.remote` 到 `10.1.2.3`，如下所示：

<<< @/.vuepress/public/statics/learning/svc/host-aliases-pod.yaml

执行一下命令可创建该 Pod：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/svc/host-aliases-pod.yaml
```

执行命令查看 Pod 的 IP 和状态：
``` sh
kubectl get pod --output=wide
```

输出结果如下所示：

```
NAME                           READY     STATUS      RESTARTS   AGE       IP              NODE
hostaliases-pod                0/1       Completed   0          6s        10.200.0.5      worker0
```

执行命令查看 hosts 文件内容：

``` sh
kubectl logs hostaliases-pod
```

输出结果如下所示：

```
# Kubernetes-managed hosts file.
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
fe00::0	ip6-mcastprefix
fe00::1	ip6-allnodes
fe00::2	ip6-allrouters
10.200.0.5	hostaliases-pod

# Entries added by HostAliases.
127.0.0.1	foo.local	bar.local
10.1.2.3	foo.remote	bar.remote
```

从结果中，我们可以看到，配置的条目被添加在 `/etc/hosts` 文件的末尾。

## 为什么kubelet要管理hosts文件

<SharingBlock>

Kubelet [管理](https://github.com/kubernetes/kubernetes/issues/14633) `hosts` Pod 中每个容器的 hosts 文件，以便可以阻止 Docker 在容器启动以后 [修改](https://github.com/moby/moby/issues/17190) 该文件。

细节情况请参考两个 github issue：

[https://github.com/kubernetes/kubernetes/issues/14633](https://github.com/kubernetes/kubernetes/issues/14633)

[https://github.com/moby/moby/issues/17190](https://github.com/moby/moby/issues/17190)

由于该文件已经被 Kubelet 管理起来，任何对该文件手工修改的内容，都将在 Kubelet 重启容器或者 Pod 重新调度时被覆盖。因此，最好是通过 `hostAliases` 修改 Pod 的 /etc/hosts 文件，而不是手工修改。

</SharingBlock>
