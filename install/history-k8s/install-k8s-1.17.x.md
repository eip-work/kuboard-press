---
vssueId: 15
# layout: StepLayout
sharingTitle: K8S入门第一步---安装，装不好还有人免费远程协助，更有K8S免费教程提供，你还在等什么？
description: Kubernete安装文档_Kubernetes最新稳定版v1.17.x的快速安装文档_该文档由众多网友验证并在线提出修改意见_持续不断地更新和完善_并且通过QQ群提供免费在线答疑的服务
meta:
  - name: keywords
    content: Kubernetes安装,K8S安装,kubeadm,Kubernetes 安装,K8S 安装,k8s搭建
---

# 使用kubeadm安装kubernetes_v1.17.x

<AdSenseTitle/>

## 文档特点

<div style="min-height: 612px;">
  <InstallBanner version="v1.17.x" updateCount="79"/>
</div>

参考此免费文档，98%以上的概率，您能够顺利完成 K8S 安装，极个别的问题可以到QQ群里免费答疑。

<Course courseId="477593" />
<!-- 此课程配有直播视频讲解，点击此处可 [报名12元直播课程](https://ke.qq.com/course/477593?flowToken=1016935)
* 讲解K8S集群规划
* 以更加直观易于理解的形式讲解此安装过程
* 介绍K8S学习路径
* 报名学员如碰到安装问题，可获得远程协助
> 第一次直播课已经于1月18日完成，现在 [报名]((https://ke.qq.com/course/477593?flowToken=1016935)) 可以随时看回看，如需要，还可在2月8日免费再听一次直播。 -->


## 配置要求

对于 Kubernetes 初学者，在搭建K8S集群时，推荐在阿里云或腾讯云采购如下配置：（您也可以使用自己的虚拟机、私有云等您最容易获得的 Linux 环境）

* 至少2台 **2核4G** 的服务器
* **Cent OS 7.6**

<!-- <grid :rwd="{compact: 'stack'}">
  <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 0 1rem 1rem;">

<div> -->

[【2核4G云服务器低至331元/年，限时抢购】华为云开年回馈用户，产品低至1折](https://activity.huaweicloud.com/2020feb_promotion/invite.html?fromuser=05f073ad3c0010ea0f4bc00b7105ec20&fromacct=36cf686d-2650-4107-baa4-f0dc3c860df4&needGalaxy=true)

[【腾讯云】云产品采购季，助力行业复工。1核2G云服务器，首年99元](https://cloud.tencent.com/act/cps/redirect?redirect=1053&cps_key=2ee6baa049659f4713ddc55a51314372&from=console)


<!-- [阿里云，双十二主会场，低至一折](https://www.aliyun.com/1212/2019/home?userCode=obezo3pg) -->

**安装后的软件版本为**

* Kubernetes v1.17.x
  * calico 3.13.1
  * nginx-ingress 1.5.5
* Docker 19.03.8

> 如果要安装 Kubernetes 历史版本，请参考：
> * [安装 Kubernetes v1.16.3 单Master节点](/install/history-k8s/install-k8s-1.16.3.html)
> * [安装 Kubernetes v1.16.2 单Master节点](/install/history-k8s/install-k8s-1.16.2.html)
> * [安装 Kubernetes v1.16.1 单Master节点](/install/history-k8s/install-k8s-1.16.1.html)
> * [安装 Kubernetes v1.16.0 单Master节点](/install/history-k8s/install-k8s-1.16.0.html)
> * [安装 Kubernetes v1.15.4 单Master节点](/install/history-k8s/install-k8s-1.15.4.html)
> * [安装 Kubernetes v1.15.3 单Master节点](/install/history-k8s/install-k8s-1.15.3.html)
> * [安装 Kubernetes v1.15.2 单Master节点](/install/history-k8s/install-k8s-1.15.2.html)
> * [安装 Kubernetes v1.15.1 单Master节点](/install/history-k8s/install-k8s-1.15.1.html)

<!-- </div>

  </grid-item>
  <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '0/1'}" style="padding: 2rem 1rem 1rem 1rem;">
    <AdSenseVertical/>
  </grid-item>
</grid> -->

安装后的拓扑图如下：<span v-on:click="$sendGaEvent('下载拓扑图-kubernetes', '下载拓扑图-kubernetes', 'Download-install-kubernetes.html')"><a :href="$withBase('/kuboard.rp')" download="www.kuboard.cn.rp">下载拓扑图源文件</a></span> <font color="#999">使用Axure RP 9.0可打开该文件</font>

强烈建议初学者先按照此文档完成安装，在对 K8S 有更多理解后，再参考文档 [安装Kubernetes高可用](./install-kubernetes.html)

<p style="max-width: 720px;">
<img src="/images/topology/k8s.png" style="max-width: 100%;" alt="Kubernetes安装：Kubernetes安装拓扑图">
</p>

::: tip 关于二进制安装

kubeadm 是 Kubernetes 官方支持的安装方式，“二进制” 不是。本文档采用 kubernetes.io 官方推荐的 kubeadm 工具安装 kubernetes 集群。

:::

<!-- </div>
<div slot="step1"> -->

## 检查 centos / hostname

``` sh
# 在 master 节点和 worker 节点都要执行
cat /etc/redhat-release

# 此处 hostname 的输出将会是该机器在 Kubernetes 集群中的节点名字
# 不能使用 localhost 作为节点的名字
hostname

# 请使用 lscpu 命令，核对 CPU 信息
# Architecture: x86_64    本安装文档不支持 arm 架构
# CPU(s):       2         CPU 内核数量不能低于 2
lscpu
```

**操作系统兼容性**

<grid :rwd="{compact: 'stack'}">
  <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 0 1rem 1rem;">

<div>

| CentOS 版本 | 本文档是否兼容                          | 备注                                |
| ----------- | --------------------------------------- | ----------------------------------- |
| 7.7         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.6         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.5         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题    |
| 7.4         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题                              |
| 7.3         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题                              |
| 7.2         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题                              |

</div>
  </grid-item>
  <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '0/1'}" style="padding: 2rem 1rem 1rem 1rem;">
    <AdSenseVertical/>
  </grid-item>
</grid>

::: tip 修改 hostname
如果您需要修改 hostname，可执行如下指令：
``` sh
# 修改 hostname
hostnamectl set-hostname your-new-host-name
# 查看修改结果
hostnamectl status
# 设置 hostname 解析
echo "127.0.0.1   $(hostname)" >> /etc/hosts
```
:::

## 检查网络

在所有节点执行命令
``` {2,11,13}
[root@demo-master-a-1 ~]$ ip route show
default via 172.21.0.1 dev eth0 
169.254.0.0/16 dev eth0 scope link metric 1002 
172.21.0.0/20 dev eth0 proto kernel scope link src 172.21.0.12 

[root@demo-master-a-1 ~]$ ip address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:12:a4:1b brd ff:ff:ff:ff:ff:ff
    inet 172.17.216.80/20 brd 172.17.223.255 scope global dynamic eth0
       valid_lft 305741654sec preferred_lft 305741654sec
```
::: tip kubelet使用的IP地址
* `ip route show` 命令中，可以知道机器的默认网卡，通常是 `eth0`，如 ***default via 172.21.0.23 dev <font color="blue" weight="500">eth0</font>***
* `ip address` 命令中，可显示默认网卡的 IP 地址，Kubernetes 将使用此 IP 地址与集群内的其他节点通信，如 `172.17.216.80`
* 所有节点上 Kubernetes 所使用的 IP 地址必须可以互通（无需 NAT 映射、无安全组或防火墙隔离）
:::


## 安装docker及kubelet

<!-- <SharingBlock> -->

<InstallEnvCheck type="k8s">

使用 root 身份在所有节点执行如下代码，以安装软件：
- docker
- nfs-utils
- kubectl / kubeadm / kubelet



<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速安装" active>

**请将脚本最后的 1.17.4 替换成您需要的版本号，**
<font color="red">脚本中间的 v1.17.x 不要替换</font>

> docker hub 镜像请根据自己网络的情况任选一个
> * 第四行为腾讯云 docker hub 镜像
> * 第六行为DaoCloud docker hub 镜像
> * 第八行为华为云 docker hub 镜像
> * 第十行为阿里云 docker hub 镜像
``` sh
# 在 master 节点和 worker 节点都要执行
# 最后一个参数 1.17.4 用于指定 kubenetes 版本，支持所有 1.17.x 版本的安装
# 腾讯云 docker hub 镜像
# export REGISTRY_MIRROR="https://mirror.ccs.tencentyun.com"
# DaoCloud 镜像
# export REGISTRY_MIRROR="http://f1361db2.m.daocloud.io"
# 华为云镜像
# export REGISTRY_MIRROR="https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com"
# 阿里云 docker hub 镜像
export REGISTRY_MIRROR=https://registry.cn-hangzhou.aliyuncs.com
curl -sSL https://kuboard.cn/install-script/v1.17.x/install_kubelet.sh | sh -s 1.17.4
```

  </b-tab>
  <b-tab title="手动安装">

手动执行以下代码，结果与快速安装相同。<font color="red">***请将脚本第79行（已高亮）的 ${1} 替换成您需要的版本号，例如 1.17.4***</font>

> docker hub 镜像请根据自己网络的情况任选一个
> * 第四行为腾讯云 docker hub 镜像
> * 第六行为DaoCloud docker hub 镜像
> * 第八行为阿里云 docker hub 镜像
``` sh
# 在 master 节点和 worker 节点都要执行
# 最后一个参数 1.17.4 用于指定 kubenetes 版本，支持所有 1.17.x 版本的安装
# 腾讯云 docker hub 镜像
# export REGISTRY_MIRROR="https://mirror.ccs.tencentyun.com"
# DaoCloud 镜像
# export REGISTRY_MIRROR="http://f1361db2.m.daocloud.io"
# 阿里云 docker hub 镜像
export REGISTRY_MIRROR=https://registry.cn-hangzhou.aliyuncs.com
```

<<< @/.vuepress/public/install-script/v1.17.x/install_kubelet.sh {79}

::: warning
如果此时执行 `service status kubelet` 命令，将得到 kubelet 启动失败的错误提示，请忽略此错误，因为必须完成后续步骤中 kubeadm init 的操作，kubelet 才能正常启动
:::

  </b-tab>
</b-tabs>
</b-card>

</InstallEnvCheck>

<!-- </SharingBlock> -->

<!-- </div>

<div slot="step3"> -->

## 初始化 master 节点

::: danger 关于初始化时用到的环境变量
* **APISERVER_NAME** 不能是 master 的 hostname
* **APISERVER_NAME** 必须全为小写字母、数字、小数点，不能包含减号
* **POD_SUBNET** 所使用的网段不能与 ***master节点/worker节点*** 所在的网段重叠。该字段的取值为一个 <a href="/glossary/cidr.html" target="_blank">CIDR</a> 值，如果您对 CIDR 这个概念还不熟悉，请仍然执行 export POD_SUBNET=10.100.0.1/16 命令，不做修改
:::

<b-card>
<b-tabs content-class="mt-3">
<b-tab title="快速初始化" active>

**请将脚本最后的 1.17.4 替换成您需要的版本号，**
<font color="red">脚本中间的 v1.17.x 不要替换</font>

``` sh {10}
# 只在 master 节点执行
# 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）
# export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts
curl -sSL https://kuboard.cn/install-script/v1.17.x/init_master.sh | sh -s 1.17.4
```

</b-tab>
<b-tab title="手动初始化">

手动执行以下代码，结果与快速初始化相同。<font color="red">***请将脚本第21行（已高亮）的 ${1} 替换成您需要的版本号，例如 1.17.4***</font>

``` sh
# 只在 master 节点执行
# 替换 x.x.x.x 为 master 节点的内网IP
# export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts
```

<<< @/.vuepress/public/install-script/v1.17.x/init_master.sh {21}

</b-tab>
</b-tabs>
</b-card>

<b-button v-b-toggle.collapse-init-error variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('install-k8s-error', 'error-init-master', '查看初始化时的错误解决办法')">如果出错点这里</b-button>
<b-collapse id="collapse-init-error" class="mt-2">
<b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">

* 请确保您的环境符合 [安装docker及kubelet](#安装docker及kubelet) 中所有勾选框的要求
* 请确保您使用 root 用户执行初始化命令
* 不能下载 kubernetes 的 docker 镜像
  * 安装文档中，默认使用阿里云的 docker 镜像仓库，然而，有时候，该镜像会罢工
  * 如碰到不能下载 docker 镜像的情况，请尝试手工初始化，并修改手工初始化脚本里的第22行（文档中已高亮）为：
    ```yaml
    imageRepository: gcr.azk8s.cn/google-containers
    ```
* 检查环境变量，执行如下命令
  ``` sh
  echo MASTER_IP=${MASTER_IP} && echo APISERVER_NAME=${APISERVER_NAME} && echo POD_SUBNET=${POD_SUBNET}
  ```
  请验证如下几点：
  * 环境变量 ***MASTER_IP*** 的值应该为 master 节点的 **内网IP**，如果不是，请重新 export
  * **APISERVER_NAME** 不能是 master 的 hostname
  * **APISERVER_NAME** 必须全为小写字母、数字、小数点，不能包含减号
  * **POD_SUBNET** 所使用的网段不能与 ***master节点/worker节点*** 所在的网段重叠。该字段的取值为一个 <a href="/glossary/cidr.html" target="_blank">CIDR</a> 值，如果您对 CIDR 这个概念还不熟悉，请仍然执行 export POD_SUBNET=10.100.0.1/16 命令，不做修改
* 重新初始化 master 节点前，请先执行 `kubeadm reset -f` 操作

</b-card>
</b-collapse>

**检查 master 初始化结果**

``` sh
# 只在 master 节点执行

# 执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态
watch kubectl get pod -n kube-system -o wide

# 查看 master 节点初始化结果
kubectl get nodes -o wide
```

<b-button v-b-toggle.collapse-init-pending variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('install-k8s-pending', 'error-init-master', '查看初始化时的镜像下载错误的解决办法')">如果出错点这里</b-button>
<b-collapse id="collapse-init-pending" class="mt-2">
<b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">

* ImagePullBackoff / Pending
  * 如果 `kubectl get pod -n kube-system -o wide` 的输出结果中出现 ImagePullBackoff 或者长时间处于 Pending 的情况，请参考 [查看镜像抓取进度](/learning/faq/image-pull-backoff.html)
* ContainerCreating
  * 如果 `kubectl get pod -n kube-system -o wide` 的输出结果中某个 Pod 长期处于 ContainerCreating、PodInitializing 或 Init:0/3 的状态，可以尝试：
    * 查看该 Pod 的状态，例如：
      ``` sh
      kubectl describe pod kube-flannel-ds-amd64-8l25c -n kube-system
      ```
      如果输出结果中，最后一行显示的是 Pulling image，请耐心等待，或者参考 [查看镜像抓取进度](/learning/faq/image-pull-backoff.html)
      ```
      Normal  Pulling    44s   kubelet, k8s-worker-02  Pulling image "quay.io/coreos/flannel:v0.12.0-amd64"
      ```
    * 将该 Pod 删除，系统会自动重建一个新的 Pod，例如：
      ``` sh
      kubectl delete pod kube-flannel-ds-amd64-8l25c -n kube-system
      ```


</b-card>
</b-collapse>

<!-- </div>

<div slot="step4"> -->

## 初始化 worker节点

### 获得 join命令参数

**在 master 节点上执行**

``` sh
# 只在 master 节点执行
kubeadm token create --print-join-command
```

可获取kubeadm join 命令及参数，如下所示

``` sh
# kubeadm token create 命令的输出
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

::: tip 有效时间
该 token 的有效时间为 2 个小时，2小时内，您可以使用此 token 初始化任意数量的 worker 节点。
:::


### 初始化worker

**针对所有的 worker 节点执行**

``` sh
# 只在 worker 节点执行
# 替换 x.x.x.x 为 master 节点的内网 IP
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为初始化 master 节点时所使用的 APISERVER_NAME
export APISERVER_NAME=apiserver.demo
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts

# 替换为 master 节点上 kubeadm token create 命令的输出
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

<b-button v-b-toggle.collapse-join-error variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('install-k8s-error', 'error-init-worker', '查看初始化worker时的错误解决办法')">如果出错点这里</b-button>
<b-collapse id="collapse-join-error" class="mt-2">
<b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">

### 常见错误原因

经常在群里提问为什么 join 不成功的情况大致有这几种：

#### worker 节点不能访问 apiserver

  在worker节点执行以下语句可验证worker节点是否能访问 apiserver
  ``` sh
  curl -ik https://apiserver.demo:6443
  ```
  如果不能，请在 master 节点上验证
  ``` sh
  curl -ik https://localhost:6443
  ```
  正常输出结果如下所示：
  ``` {1}
  HTTP/1.1 403 Forbidden
  Cache-Control: no-cache, private
  Content-Type: application/json
  X-Content-Type-Options: nosniff
  Date: Fri, 15 Nov 2019 04:34:40 GMT
  Content-Length: 233

  {
    "kind": "Status",
    "apiVersion": "v1",
    "metadata": {
  ...
  ```
  ::: tip 可能原因
  * 如果 master 节点能够访问 apiserver、而 worker 节点不能，则请检查自己的网络设置
    * /etc/hosts 是否正确设置？
    * 是否有安全组或防火墙的限制？
  :::

#### worker 节点默认网卡
  
  * [Kubelet使用的 IP 地址](#检查网络) 与 master 节点可互通（无需 NAT 映射），且没有防火墙、安全组隔离
    * 如果你使用 vmware 或 virtualbox 创建虚拟机用于 K8S 学习，可以尝试 NAT 模式的网络，而不是桥接模式的网络

### 移除worker节点并重试

::: warning
正常情况下，您无需移除 worker 节点，如果添加到集群出错，您可以移除 worker 节点，再重新尝试添加
:::

在准备移除的 worker 节点上执行

``` sh
# 只在 worker 节点执行
kubeadm reset -f
```

在 master 节点 demo-master-a-1 上执行

```sh
# 只在 master 节点执行
kubectl get nodes -o wide
```
如果列表中没有您要移除的节点，则忽略下一个步骤

``` sh
# 只在 master 节点执行
kubectl delete node demo-worker-x-x
```

::: tip
* 将 demo-worker-x-x 替换为要移除的 worker 节点的名字
* worker 节点的名字可以通过在节点 demo-master-a-1 上执行 kubectl get nodes 命令获得
:::

</b-card>
</b-collapse>

### 检查初始化结果

在 master 节点上执行

``` sh
# 只在 master 节点执行
kubectl get nodes -o wide
```
输出结果如下所示：
```sh
[root@demo-master-a-1 ~]# kubectl get nodes
NAME     STATUS   ROLES    AGE     VERSION
demo-master-a-1   Ready    master   5m3s    v1.17.x
demo-worker-a-1   Ready    <none>   2m26s   v1.17.x
demo-worker-a-2   Ready    <none>   3m56s   v1.17.x
```


<!-- </div>

<div slot="step5"> -->

## 安装 Ingress Controller

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速初始化" active>

**在 master 节点上执行**

``` sh
# 只在 master 节点执行
kubectl apply -f https://kuboard.cn/install-script/v1.17.x/nginx-ingress.yaml
```

  </b-tab>
  <b-tab title="卸载IngressController">


**在 master 节点上执行**

只在您想选择其他 Ingress Controller 的情况下卸载

``` sh
# 只在 master 节点执行
kubectl delete -f https://kuboard.cn/install-script/v1.17.x/nginx-ingress.yaml
```

  </b-tab>
  <b-tab title="YAML文件">

<<< @/.vuepress/public/install-script/v1.17.x/nginx-ingress.yaml


  </b-tab>
</b-tabs>
</b-card>

**配置域名解析**

将域名 *.demo.yourdomain.com 解析到 demo-worker-a-2 的 IP 地址 z.z.z.z （也可以是 demo-worker-a-1 的地址 y.y.y.y）

**验证配置**

在浏览器访问 a.demo.yourdomain.com，将得到 404 NotFound 错误页面

::: tip 提示

许多初学者在安装 Ingress Controller 时会碰到问题，请不要灰心，可暂时跳过 ***安装 Ingress Controller*** 这个部分，等您学完 www.kuboard.cn 上 [Kubernetes 入门](/learning/k8s-basics/kubernetes-basics.html) 以及 [通过互联网访问您的应用程序](/learning/k8s-intermediate/service/ingress.html) 这两部分内容后，再来回顾 Ingress Controller 的安装。

也可以参考 [Install Nginx Ingress](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/)

:::

::: warning
如果您打算将 Kubernetes 用于生产环境，请参考此文档 [Installing Ingress Controller](https://github.com/nginxinc/kubernetes-ingress/blob/v1.5.3/docs/installation.md)，完善 Ingress 的配置
:::


<!-- </div>

<div slot="step6"> -->


## 下一步

如果您使用自己笔记本上的虚拟机安装的集群，将来打算重启虚拟机，请参考 [重启Kubernetes集群](./k8s-restart.html)

:tada: :tada: :tada: 

您已经完成了 Kubernetes 集群的安装，下一步请：

<Course courseId="477593" />

<!-- <span v-on:click="$sendGaEvent('安装后求GitHub Star','安装后求GitHub Star','安装后求GitHub Star')"><a href="https://github.com/eip-work/kuboard-press" target="_blank">点击此处，给个GitHub Star</a></span>
支持一下吧，<StarCount></StarCount>这么多人都 star 了呢，怎么能少得了您呢？ -->

[安装 Kuboard - 微服务管理界面](/install/install-dashboard.html)

[使用 GitHub/GitLab 账号登录 Kubernetes](/learning/k8s-advanced/sec/authenticate/install.html)

[获取 Kubernetes 免费教程](/learning/)


<!-- </div>
</StoryBook> -->
