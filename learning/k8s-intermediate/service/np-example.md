---
vssueId: 158
layout: LearningLayout
description: Kubernetes中_网络策略定义了一组Pod是否允许相互通信_或者与网络中的其他端点endpoint通信_本文描述了几个在K8S集群的名称空间中创建NetworkPolicy的例子
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Network Policies, K8S 网络策略
---

# Network Policies - Example

<AdSenseTitle>

> 参考文档： [Declare Network Policy](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/)

本文描述了如何在 Kubernetes 集群中通过创建 NetworkPolicy 的方式来声明网络策略，以管理 Pod 之间的网络通信流量。

[[TOC]]

</AdSenseTitle>

## 前提条件

您已经安装了 Kubernetes 集群，如果没有，请参考文档 [安装Kubernetes单Master节点](/install/install-k8s.html)

您可以使用 kubectl 访问您的集群，请参考文档 [安装Kubectl](/install/install-kubectl.html)

请确保您使用的网络插件支持 Network Policy，如下的网络插件都是可以的：

* [Calico](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/calico-network-policy/) 如果您按照 [安装Kubernetes单Master节点](/install/install-k8s.html) 安装的集群，默认是 calico 网络插件
* [Cilium](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/cilium-network-policy/)
* [Kube-router](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/kube-router-network-policy/)
* [Romana](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/romana-network-policy/)
* [Weave Net](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/weave-network-policy/)

::: tip 排序
按字母顺序排序，不代表推荐顺序。本文中的例子对上述所有网络插件都有效
:::

## 创建一个Deployment并配置Service

* 创建一个 `nginx` Deployment 用于演示 Kubernetes 的 NetworkPolicy：

  ``` sh
  kubectl create deployment nginx --image=nginx
  ```
  输出结果
  ```
  deployment.apps/nginx created
  ```

* 通过Service暴露该Deployment

  ``` sh
  kubectl expose deployment nginx --port=80
  ```
  输出结果
  ```
  service/nginx exposed
  ```

* 查询结果
  ``` sh
  kubectl get svc,pod
  ```
  输出结果
  ```
  NAME                        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
  service/kubernetes          10.100.0.1    <none>        443/TCP    46m
  service/nginx               10.100.0.16   <none>        80/TCP     33s

  NAME                        READY         STATUS        RESTARTS   AGE
  pod/nginx-701339712-e0qfq   1/1           Running       0          35s
  ```

## 从另外一个pod访问Service

默认是可以从另外一个Pod访问 `nginx` Service 的。下面的方法可以执行此测试：

在 `default` 名称空间中创建 busybox 容器，并执行 `wget` 命令：

``` sh
kubectl run --generator=run-pod/v1 busybox --rm -ti --image=busybox -- /bin/sh
```

请按照下面的例子，在命令行中执行 `wget --spider --timeout=1 nginx`
```
Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

Hit enter for command prompt

/ # wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
/ #
```

## 限制对nginx的访问

下面的 `NetworkPolicy` 可以声明：只有带 `access=true` 标签的 Pod 可以访问 `nginx` 服务：

<<< @/.vuepress/public/statics/learning/svc/network-policy.yaml

* 执行命令以创建该 NetworkPolicy：
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/svc/network-policy.yaml
  ```
  输出结果如下：
  ```
  networkpolicy.networking.k8s.io/access-nginx created
  ```

## 从不带标签的Pod访问nginx服务

如果从不带标签的 Pod 访问该 nginx 服务，请求将超时：
``` sh
kubectl run --generator=run-pod/v1 busybox --rm -ti --image=busybox -- /bin/sh
```
请按照下面的例子在命令行中执行 `wget --spider --timeout=1 nginx`
```
Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

Hit enter for command prompt

/ # wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
wget: download timed out
/ #
```

## 从带有标签的Pod访问nginx服务

从带有 `access=true` 标签的 Pod 中访问 nginx 服务，将能够执行成功：
``` sh
kubectl run --generator=run-pod/v1 busybox --rm -ti --labels="access=true" --image=busybox -- /bin/sh
```
请按照下面的例子在命令行中执行 `wget --spider --timeout=1 nginx`
```
Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

Hit enter for command prompt

/ # wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
/ #
```
