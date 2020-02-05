---
vssueId: 15
# layout: StepLayout
description: Kubernete安装文档_Kubernetes最新稳定版v1.16.1的快速安装文档_该文档由众多网友验证并在线提出修改意见_持续不断地更新和完善_并且通过QQ群提供免费在线答疑的服务
meta:
  - name: keywords
    content: Kubernetes安装,K8S安装,kubeadm,Kubernetes 安装,K8S 安装
# storyBook:
#   title: '使用 kubeadm 安装 kubernetes v1.16.1（单Master节点）'
#   initial: FullPage
#   pages:
#     - name: introduction
#       title: 文档特点
#     - name: overview
#       title: 配置要求
#     - name: step1
#       title: 检查环境
#     - name: step2
#       title: 安装 docker/kubelet
#     - name: step3
#       title: 初始化 master 节点
#     - name: step4
#       title: 初始化 worker 节点
#     - name: step5
#       title: 安装 Ingress Controller
#     - name: step6
#       title: 总结
---

# 使用kubeadm安装kubernetes_v1.16.1

<!-- <AdSenseTitle/> -->

<!-- <StoryBook>
<div slot="introduction"> -->

## 文档特点


<grid :rwd="{compact: 'stack'}">
  <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 0 1rem 1rem;">

<div>

**网上那么多 Kubernetes 安装文档，为什么这篇文档更有参考价值？**

* **众多网友验证**
  * 每天有超过 300 人参照此文档完成 Kubernetes 安装
  * 不断有网友对安装文档提出改进意见

* **持续更新和完善**
  * 始终有最新的 Kubernetes 稳定版安装文档，当前版本 v1.16.1
  * 当前已更新了 <font color="red"> 61 次 </font>， [查看更新历史](https://github.com/eip-work/kuboard-press/commits/master/install/install-k8s.md)

* **在线答疑** 

  <Qq></Qq> QQ群号为：808894550，也可以扫描二维码加群
  <p>
    <img src="/images/kuboard_qq.png" alt="Kubernetes安装：QQ群在线答疑"/>
  </p>

</div>

  </grid-item>
  <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '0/1'}" style="padding: 2rem 1rem 1rem 1rem;">
    <AdSenseVertical/>
  </grid-item>
</grid>

<!-- </div>
<div slot="overview" style="min-height: 800px;"> -->

## 配置要求

对于 Kubernetes 初学者，推荐在阿里云或腾讯云采购如下配置：（您也可以使用自己的虚拟机、私有云等您最容易获得的 Linux 环境）

* 3台 **2核4G** 的ECS（突发性能实例 t5 ecs.t5-c1m2.large或同等配置，单台约 0.4元/小时，停机时不收费）
* **Cent OS 7.6**

<grid :rwd="{compact: 'stack'}">
  <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 0 1rem 1rem;">

<div>

[领取腾讯云最高2860元代金券](https://cloud.tencent.com/act/cps/redirect?redirect=1040&cps_key=2ee6baa049659f4713ddc55a51314372&from=console)

[腾讯云限时1折秒杀](https://cloud.tencent.com/act/cps/redirect?redirect=1044&cps_key=2ee6baa049659f4713ddc55a51314372&from=console)

[领取阿里云最高2000元红包](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=obezo3pg)

[阿里云服务器限时2折](https://www.aliyun.com/acts/limit-buy?userCode=obezo3pg)

**安装后的软件版本为**

* Kubernetes v1.16.1
  * calico 3.9
  * nginx-ingress 1.5.5
* Docker 18.09.7

> 如果要安装 Kubernetes 历史版本，请参考：
> * [安装 Kubernetes v1.16.0 单Master节点](/install/history-k8s/install-k8s-1.16.0.html)
> * [安装 Kubernetes v1.15.4 单Master节点](/install/history-k8s/install-k8s-1.15.4.html)
> * [安装 Kubernetes v1.15.3 单Master节点](/install/history-k8s/install-k8s-1.15.3.html)
> * [安装 Kubernetes v1.15.2 单Master节点](/install/history-k8s/install-k8s-1.15.2.html)
> * [安装 Kubernetes v1.15.1 单Master节点](/install/history-k8s/install-k8s-1.15.1.html)

</div>

  </grid-item>
  <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '0/1'}" style="padding: 2rem 1rem 1rem 1rem;">
    <AdSenseVertical/>
  </grid-item>
</grid>

安装后的拓扑图如下：<span v-on:click="$sendGaEvent('下载拓扑图-kubernetes', '下载拓扑图-kubernetes', 'Download-install-kubernetes.html')"><a :href="$withBase('/kuboard.rp')" download="www.kuboard.cn.rp">下载拓扑图源文件</a></span> <font color="#999">使用Axure RP 9.0可打开该文件</font>

<p style="max-width: 720px;">
<img src="/images/topology/k8s.png" style="max-width: 100%;" alt="Kubernetes安装：Kubernetes安装拓扑图">
</p>

::: tip
**关于二进制安装**

鉴于目前已经有比较方便的办法获得 kubernetes 镜像，我将回避 ***二进制*** 安装是否更好的争论。本文采用 kubernetes.io 官方推荐的 kubeadm 工具安装 kubernetes 集群。

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
| 7.5         | <span style="font-size: 24px;">😄</span> | 已验证                              |
| 7.4         | <span style="font-size: 24px;">🤔</span> | 待验证                              |
| 7.3         | <span style="font-size: 24px;">🤔</span> | 待验证                              |
| 7.2         | <span style="font-size: 24px;">😞</span> | 已证实会出现 kubelet 无法启动的问题 |

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

<!-- <div style="display: inline-block; width: calc(100% - 400px);"></div> -->


<!-- </div>

<div slot="step2"> -->

## 安装 docker / kubelet

<InstallEnvCheck type="k8s">

使用 root 身份在所有节点执行如下代码，以安装软件：
- docker
- nfs-utils
- kubectl / kubeadm / kubelet



<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速安装" active>

``` sh
# 在 master 节点和 worker 节点都要执行

curl -sSL https://kuboard.cn/install-script/v1.16.1/install_kubelet.sh | sh

```

  </b-tab>
  <b-tab title="手动安装">

手动执行以下代码，效果与快速安装完全相同。

<<< @/.vuepress/public/install-script/v1.16.1/install_kubelet.sh

::: warning
如果此时执行 `service status kubelet` 命令，将得到 kubelet 启动失败的错误提示，请忽略此错误，因为必须完成后续步骤中 kubeadm init 的操作，kubelet 才能正常启动
:::

  </b-tab>
</b-tabs>
</b-card>

</InstallEnvCheck>
<!-- </div>

<div slot="step3"> -->

## 初始化 master 节点

::: tip
* 以 root 身份在 demo-master-a-1 机器上执行
* 初始化 master 节点时，如果因为中间某些步骤的配置出错，想要重新初始化 master 节点，请先执行 `kubeadm reset` 操作
:::

::: danger 关于初始化时用到的环境变量
* **APISERVER_NAME** 不能是 master 的 hostname
* **APISERVER_NAME** 必须全为小写字母、数字、小数点，不能包含减号
* **POD_SUBNET** 所使用的网段不能与 ***master节点/worker节点*** 所在的网段重叠。该字段的取值为一个 <a href="/glossary/cidr.html" target="_blank">CIDR</a> 值，如果您对 CIDR 这个概念还不熟悉，请仍然执行 export POD_SUBNET=10.100.0.1/16 命令，不做修改
:::

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速初始化" active>

``` sh
# 只在 master 节点执行
# 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）
# export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts
curl -sSL https://kuboard.cn/install-script/v1.16.1/init_master.sh | sh
```

  </b-tab>
  <b-tab title="手动初始化">

``` sh
# 只在 master 节点执行
# 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）
# export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.demo
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.1/16
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts
```

<<< @/.vuepress/public/install-script/v1.16.1/init_master.sh

  </b-tab>
</b-tabs>
</b-card>

**检查 master 初始化结果**

``` sh
# 只在 master 节点执行

# 执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态
watch kubectl get pod -n kube-system -o wide

# 查看 master 节点初始化结果
kubectl get nodes -o wide
```

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


### 初始化worker

**针对所有的 worker 节点执行**

``` sh
# 只在 worker 节点执行
# 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为初始化 master 节点时所使用的 APISERVER_NAME
export APISERVER_NAME=apiserver.demo
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts

# 替换为 master 节点上 kubeadm token create 命令的输出
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

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
demo-master-a-1   Ready    master   5m3s    v1.16.1
demo-worker-a-1   Ready    <none>   2m26s   v1.16.1
demo-worker-a-2   Ready    <none>   3m56s   v1.16.1
```



## 移除 worker 节点

::: warning
正常情况下，您无需移除 worker 节点，如果添加到集群出错，您可以移除 worker 节点，再重新尝试添加
:::

在准备移除的 worker 节点上执行

``` sh
# 只在 worker 节点执行
kubeadm reset
```

在 master 节点 demo-master-a-1 上执行

``` sh
# 只在 master 节点执行
kubectl delete node demo-worker-x-x
```

::: tip
* 将 demo-worker-x-x 替换为要移除的 worker 节点的名字
* worker 节点的名字可以通过在节点 demo-master-a-1 上执行 kubectl get nodes 命令获得
:::

<!-- </div>

<div slot="step5"> -->

## 安装 Ingress Controller

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="快速初始化" active>

**在 master 节点上执行**

``` sh
# 只在 master 节点执行
kubectl apply -f https://kuboard.cn/install-script/v1.16.1/nginx-ingress.yaml
```

  </b-tab>
  <b-tab title="卸载IngressController">


**在 master 节点上执行**

只在您想选择其他 Ingress Controller 的情况下卸载

``` sh
# 只在 master 节点执行
kubectl delete -f https://kuboard.cn/install-script/v1.16.1/nginx-ingress.yaml
```

  </b-tab>
  <b-tab title="YAML文件">

<<< @/.vuepress/public/install-script/v1.16.1/nginx-ingress.yaml


  </b-tab>
</b-tabs>
</b-card>

**配置域名解析**

将域名 *.demo.yourdomain.com 解析到 demo-worker-a-2 的 IP 地址 z.z.z.z （也可以是 demo-worker-a-1 的地址 y.y.y.y）

**验证配置**

在浏览器访问 a.demo.yourdomain.com，将得到 404 NotFound 错误页面

::: tip 提示

许多初学者在安装 Ingress Controller 时会碰到问题，请不要灰心，可暂时跳过 ***安装 Ingress Controller*** 这个部分，等您学完 www.kuboard.cn 上 [Kubernetes 入门](/learning/k8s-basics/kubernetes-basics.html) 以及 [通过互联网访问您的应用程序](/learning/k8s-intermediate/service/ingress.html) 这两部分内容后，再来回顾 Ingress Controller 的安装。

:::

::: warning
如果您打算将 Kubernetes 用于生产环境，请参考此文档 [Installing Ingress Controller](https://github.com/nginxinc/kubernetes-ingress/blob/v1.5.3/docs/installation.md)，完善 Ingress 的配置
:::


<!-- </div>

<div slot="step6"> -->


## 下一步

::: danger 关于重启
已经默认开启了 kubelet、docker 的开机启动，但是仍然有网友在重启虚拟机之后抱怨 kubernetes 不能正常使用。这种情况大多数是因为 **重启后，你的内网IP地址发生了变化**
:::

:tada: :tada: :tada: 

您已经完成了 Kubernetes 集群的安装，下一步请：

[安装 Kuboard - 微服务管理界面](/install/install-dashboard.html)

安装 Kuboard 之前先
  <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
    在线体验 Kuboard
  </a>

::: tip
* Kubernetes 初学者，[点击这里获取 Kubernetes 学习路径](/learning/)
:::


<!-- </div>
</StoryBook> -->
