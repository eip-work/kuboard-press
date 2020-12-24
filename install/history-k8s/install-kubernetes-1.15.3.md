---
vssueId: 16
description: Kubernete安装文档_使用kubeadm安装高可用的Kubernetes_v1.15.3集群_可用于生产环境
meta:
  - name: keywords
    content: Kubernetes集群,Kubernetes高可用,Kubernetes生产环境
# storyBook:
#   title: '使用 kubeadm 安装 kubernetes v1.15.3（高可用）'
#   initial: FullPage
#   pages:
#     - name: overview
#       title: 配置要求
#     - name: step1
#       title: 检查环境
#     - name: step2
#       title: 安装 docker/kubelet
#     - name: step3
#       title: 初始化 apiserver 集群
#     - name: step4
#       title: 初始化 worker 节点
#     - name: step5
#       title: 安装 Ingress Controller
#     - name: step6
#       title: 总结
---

# 安装Kubernetes高可用

<AdSenseTitle/>

<!-- <StoryBook>

<div slot="overview"> -->

::: tip
推荐初学者按照 [安装Kubernetes 单Master节点](install-k8s.html) 文档进行 Kubernetes 集群搭建
:::

## 介绍

kubernetes 安装有多种选择，本文档描述的集群安装具备如下特点：

* Kubernetes 1.15.3
  * calico 3.8.2
  * nginx-ingress 1.5.3
* Docker 18.09.7
* 三个 master 组成主节点集群，通过内网 loader balancer 实现负载均衡；至少需要三个 master 节点才可组成高可用集群，否则会出现 ***脑裂*** 现象
* 多个 worker 组成工作节点集群，通过外网 loader balancer 实现负载均衡

安装后的拓扑图如下：<a :href="$withBase('/kuboard.rp')" download="www.kuboard.cn.rp">下载拓扑图源文件</a> <font color="#999">使用Axure RP 9.0可打开该文件</font>

![Kubernetes安装：拓扑结构](/images/topology/kubernetes.png)

* **在线答疑** 

  <Qq></Qq> 也可以扫描二维码加群
  <p>
    <img src="/images/kuboard_qq.png" alt="Kubernetes教程：QQ群在线答疑"/>
  </p>
  
  <!-- <div>
    <div style="margin-top: 10px;">未打赏用户可进 QQ 群聊，<span style="color: red;">打赏用户可进微信群聊</span>。</div>
    <div style="margin-top: 10px;">
       <span>扫第一个二维码完成打赏，扫第二个进微信群聊。</span> <span style="color: #CCC">QQ 群聊二维码在左侧导航栏下方。</span>
      <p style="margin-top: 10px;">
        <img src="/images/dz.png" style="width: 150px; margin-right: 150px;"></img>
        <img src="/images/dz2.jpeg" style="width: 150px;"></img>
      </p>
    </div>
  </div> -->

<!-- </div>

<div slot="step1"> -->

## 检查 centos / hostname

``` sh
# 在 master 节点和 worker 节点都要执行
cat /etc/redhat-release

# 此处 hostname 的输出将会是该机器在 Kubernetes 集群中的节点名字
hostname
```

**操作系统兼容性**

| CentOS 版本 | 本文档是否兼容                          | 备注                                |
| ----------- | --------------------------------------- | ----------------------------------- |
| 7.7         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.6         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.5         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.4         | <span style="font-size: 24px;">🤔</span> | 待验证                              |
| 7.3         | <span style="font-size: 24px;">🤔</span> | 待验证                              |
| 7.2         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题 |

::: tip 修改 hostname
如果您需要修改 hostname，可执行如下指令：
``` sh
# 修改 hostname
hostnamectl set-hostname your-new-host-name
# 查看修改结果
hostnamectl status
```
:::

<!-- </div>

<div slot="step2"> -->

## 安装 docker / kubelet

使用 root 身份在所有节点执行如下代码，以安装软件：
- docker
- nfs-utils
- kubectl / kubeadm / kubelet

<b-card>
<b-tabs content-class="mt-3">
<b-tab title="快速安装" active>

``` sh
# 在 master 节点和 worker 节点都要执行

curl -sSL https://kuboard.cn/install-script/v1.15.3/install-kubelet.sh | sh

```

</b-tab>
<b-tab title="手动安装">

手动执行以下代码，效果与快速安装完全相同。

<<< @/.vuepress/public/install-script/v1.15.3/install-kubelet.sh

::: warning
如果此时执行 `service status kubelet` 命令，将得到 kubelet 启动失败的错误提示，请忽略此错误，因为必须完成后续步骤中 kubeadm init 的操作，kubelet 才能正常启动
:::

</b-tab>
</b-tabs>
</b-card>

<!-- </div>

<div slot="step3"> -->

## 初始化API Server

### 创建 ApiServer 的 Load Balancer（私网）

监听端口：6443 / TCP

后端资源组：包含 demo-master-a-1, demo-master-b-1, demo-master-b-2

后端端口：6443

开启 按源地址保持会话

假设完成创建以后，Load Balancer的 ip 地址为 x.x.x.x

### 初始化第一个master节点


::: tip
* 以 root 身份在 demo-master-a-1 机器上执行
* 初始化 master 节点时，如果因为中间某些步骤的配置出错，想要重新初始化 master 节点，请先执行 `kubeadm reset` 操作
:::

::: danger 关于初始化时用到的环境变量
* **APISERVER_NAME** 不能是 master 的 hostname
* **APISERVER_NAME** 必须全为小写字母、数字、小数点，不能包含减号
* **POD_SUBNET** 所使用的网段不能与 ***master节点/worker节点*** 所在的网段重叠。该字段的取值为一个 <a href="/glossary/cidr.html" target="_blank">CIDR</a> 值，如果您对 CIDR 这个概念还不熟悉，请不要修改这个字段的取值 10.100.0.1/16
:::

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速初始化" active>

在第一个 master 节点 demo-master-a-1 上执行

``` sh
# 只在 master 节点执行
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "127.0.0.1    ${APISERVER_NAME}" >> /etc/hosts
curl -sSL https://kuboard.cn/install-script/v1.15.3/init-master.sh | sh
```

  </b-tab>
  <b-tab title="手动初始化">

``` sh
# 只在 master 节点执行
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "127.0.0.1    ${APISERVER_NAME}" >> /etc/hosts
```

<<< @/.vuepress/public/install-script/v1.15.3/init-master.sh

  </b-tab>
</b-tabs>
</b-card>

***执行结果***

执行结果中：
* 第15、16、17行，用于初始化第二、三个 master 节点
* 第25、26行，用于初始化 worker 节点

``` sh {15,16,17,25,26}
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of the control-plane node running the following command on each as root:

  kubeadm join apiserver.k8s:6443 --token 4z3r2v.2p43g28ons3b475v \
    --discovery-token-ca-cert-hash sha256:959569cbaaf0cf3fad744f8bd8b798ea9e11eb1e568c15825355879cf4cdc5d6 \
    --control-plane --certificate-key 41a741533a038a936759aff43b5680f0e8c41375614a873ea49fde8944614dd6

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use 
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join apiserver.k8s:6443 --token 4z3r2v.2p43g28ons3b475v \
    --discovery-token-ca-cert-hash sha256:959569cbaaf0cf3fad744f8bd8b798ea9e11eb1e568c15825355879cf4cdc5d6 

```

**检查 master 初始化结果**

``` sh
# 只在第一个 master 节点执行

# 执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态
watch kubectl get pod -n kube-system -o wide

# 查看 master 节点初始化结果
kubectl get nodes
```

### 初始化第二、三个master节点

**获得 master 节点的 join 命令**


<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="和第一个Master节点一起初始化" active>

初始化第一个 master 节点时的输出内容中，第15、16、17行就是用来初始化第二、三个 master 节点的命令，如下所示：<font color="red">此时请不要执行该命令</font>

``` sh
  kubeadm join apiserver.k8s:6443 --token 4z3r2v.2p43g28ons3b475v \
    --discovery-token-ca-cert-hash sha256:959569cbaaf0cf3fad744f8bd8b798ea9e11eb1e568c15825355879cf4cdc5d6 \
    --control-plane --certificate-key 41a741533a038a936759aff43b5680f0e8c41375614a873ea49fde8944614dd6
```

  </b-tab>
  <b-tab title="第一个Master节点初始化2个小时后再初始化">

**获得 certificate key**

在 demo-master-a-1 上执行

```sh
# 只在 第一个 master 节点 demo-master-a-1 上执行
kubeadm init phase upload-certs --upload-certs
```

输出结果如下：

``` sh {6}
[root@demo-master-a-1 ~]# kubeadm init phase upload-certs --upload-certs
W0902 09:05:28.355623    1046 version.go:98] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get https://dl.k8s.io/release/stable-1.txt: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
W0902 09:05:28.355718    1046 version.go:99] falling back to the local client version: v1.15.3
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
70eb87e62f052d2d5de759969d5b42f372d0ad798f98df38f7fe73efdf63a13c
```

**获得 join 命令**

在 demo-master-a-1 上执行
``` sh
# 只在 第一个 master 节点 demo-master-a-1 上执行
kubeadm token create --print-join-command
```

输出结果如下：
``` sh {2}
[root@demo-master-a-1 ~]# kubeadm token create --print-join-command
kubeadm join apiserver.demo:6443 --token bl80xo.hfewon9l5jlpmjft     --discovery-token-ca-cert-hash sha256:b4d2bed371fe4603b83e7504051dcfcdebcbdcacd8be27884223c4ccc13059a4 
```

则，第二、三个 master 节点的 join 命令如下：

* 命令行中，蓝色部分来自于前面获得的 join 命令，红色部分来自于前面获得的 certificate key

<div style="background-color: #ddd; padding: 20px; line-height: 20px;">
<font color="blue">kubeadm join apiserver.demo:6443 --token ejwx62.vqwog6il5p83uk7y \<br/>
--discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303 </font>\<br/>
--control-plane --certificate-key <font color="red">70eb87e62f052d2d5de759969d5b42f372d0ad798f98df38f7fe73efdf63a13c</font>
</div>

  </b-tab>
</b-tabs>
</b-card>

**初始化第二、三个 master 节点**

在 demo-master-b-1 和 demo-master-b-2 机器上执行

``` sh
# 只在第二、三个 master 节点 demo-master-b-1 和 demo-master-b-2 执行
# 替换 x.x.x.x 为 ApiServer LoadBalancer 的 IP 地址
export APISERVER_IP=x.x.x.x
# 替换 apiserver.demo 为 前面已经使用的 dnsName
export APISERVER_NAME=apiserver.demo
echo "${APISERVER_IP}    ${APISERVER_NAME}" >> /etc/hosts
# 使用前面步骤中获得的第二、三个 master 节点的 join 命令
kubeadm join apiserver.demo:6443 --token ejwx62.vqwog6il5p83uk7y \
--discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303 \
--control-plane --certificate-key 70eb87e62f052d2d5de759969d5b42f372d0ad798f98df38f7fe73efdf63a13c
```

**检查 master 初始化结果**

``` sh
# 只在第一个 master 节点 demo-master-a-1 执行
# 查看 master 节点初始化结果
kubectl get nodes
```

<!-- </div>

<div slot="step4"> -->

## 初始化 worker节点

### 获得 join命令参数

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="和第一个Master节点一起初始化" active>

初始化第一个 master 节点时的输出内容中，第25、26行就是用来初始化 worker 节点的命令，如下所示：<font color="red">此时请不要执行该命令</font>

``` sh
  kubeadm join apiserver.k8s:6443 --token 4z3r2v.2p43g28ons3b475v \
    --discovery-token-ca-cert-hash sha256:959569cbaaf0cf3fad744f8bd8b798ea9e11eb1e568c15825355879cf4cdc5d6
```

  </b-tab>
  <b-tab title="第一个Master节点初始化2个小时后再初始化">

**在第一个 master 节点 demo-master-a-1 节点执行**

```bash
# 只在第一个 master 节点 demo-master-a-1 上执行
kubeadm token create --print-join-command
```

可获取kubeadm join 命令及参数，如下所示

```bash
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

  </b-tab>
</b-tabs>
</b-card>

### 初始化worker

**针对所有的 worker 节点执行**

```sh
# 只在 worker 节点执行
# 替换 ${APISERVER_IP} 为 ApiServer LoadBalancer 的 IP 地址
# 替换 ${APISERVER_NAME} 为 前面已经使用的 dnsName
echo "${APISERVER_IP}    ${APISERVER_NAME}" >> /etc/hosts

# 替换为前面 kubeadm token create --print-join-command 的输出结果
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

### 检查 worker 初始化结果

在第一个master节点 demo-master-a-1 上执行

```sh
# 只在第一个 master 节点 demo-master-a-1 上执行
kubectl get nodes
```



## 移除 worker 节点

::: warning
正常情况下，您无需移除 worker 节点
:::

在准备移除的 worker 节点上执行

```sh
kubeadm reset
```

在第一个 master 节点 demo-master-a-1 上执行

```sh
kubectl delete node demo-worker-x-x
```

> * 将 demo-worker-x-x 替换为要移除的 worker 节点的名字
> * worker 节点的名字可以通过在第一个 master 节点 demo-master-a-1 上执行 kubectl get nodes 命令获得

<!-- </div>

<div slot="step5"> -->

## 安装 Ingress Controller

> Ingress官方文档：https://kubernetes.io/docs/concepts/services-networking/ingress/
>
> Ingress Controllers介绍：https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
>
> 本文中使用如下部署方式：https://kubernetes.github.io/ingress-nginx/deploy/baremetal/#using-a-self-provisioned-edge
>
> kubernetes支持多种Ingress Controllers (traefic / Kong / Istio / Nginx 等)，本文推荐使用 https://github.com/nginxinc/kubernetes-ingress


<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速安装" active>

**在 master 节点上执行**

``` sh
# 只在第一个 master 节点 demo-master-a-1 上执行
kubectl apply -f https://kuboard.cn/install-script/v1.15.3/nginx-ingress.yaml
```

  </b-tab>
  <b-tab title="YAML文件">

<<< @/.vuepress/public/install-script/v1.15.3/nginx-ingress.yaml

  </b-tab>
</b-tabs>
</b-card>

::: warning
如果您打算将 Kubernetes 用于生产环境，请参考此文档 [Installing Ingress Controller](https://github.com/nginxinc/kubernetes-ingress/blob/v1.5.3/docs/installation.md)，完善 Ingress 的配置
:::

### 在 IaaS 层完成如下配置（**公网Load Balancer**）

创建负载均衡 Load Balancer：

* 监听器 1：80 / TCP， SOURCE_ADDRESS 会话保持
* 服务器资源池 1： demo-worker-x-x 的所有节点的 80端口
* 监听器 2：443 / TCP， SOURCE_ADDRESS 会话保持
* 服务器资源池 2： demo-worker-x-x 的所有节点的443端口

假设刚创建的负载均衡 Load Balancer 的 IP 地址为： z.z.z.z



### 配置域名解析

将域名 *.demo.yourdomain.com 解析到地址负载均衡服务器 的 IP 地址 z.z.z.z



### 验证配置

在浏览器访问 a.demo.yourdomain.com，将得到 404 NotFound 错误页面


<!-- </div>

<div slot="step6"> -->

## 下一步
:tada: :tada: :tada: 

您已经完成了 Kubernetes 集群的安装，下一步请：

[安装 Kuboard](/install/install-dashboard.html)

安装 Kuboard 之前先
  <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
    在线体验 Kuboard
  </a>

<!-- </div>

</StoryBook> -->
