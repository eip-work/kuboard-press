---
vssueId: 171
description: Kuboard_快速在Kubernetes上落地微服务_本文详细介绍如何离线安装Kubernetes
meta:
  - name: keywords
    content: Kubernetes离线安装
---

# Sealos安装Kubernetes集群1.16（离线）

<AdSenseTitle/>

::: tip Sealos
* Kubernetes 离线安装工具（golang开发），由 [Sealos](https://github.com/fanux/sealos) 提供。
* Sealos 是一个商业化的 Kubernetes 安装工具
  * 安装 Kubernetes 1.16.0 版本的工具包为免费试用
  * 安装 Kubernetes 1.16.x 版本的工具包需要付大约一杯咖啡的钱 
:::

## 概述与设计原则
sealos旨在做一个简单干净轻量级稳定的kubernetes安装工具，能很好的支持高可用安装。 其实把一个东西做的功能强大并不难，但是做到极简且灵活可扩展就比较难。

所以在实现时就必须要遵循这些原则。

sealos特性与优势：

* 支持离线安装，工具与资源包（二进制程序 配置文件 镜像 yaml文件等）分离,这样不同版本替换不同离线包即可
* 证书延期
* 使用简单
* 支持自定义配置
* 内核负载，极其稳定，因为简单所以排查问题也极其简单

> 为什么不使用ansilbe

1.0版本确实是用ansible实现，但是用户还是需要先装ansible，装ansible有需要装python和一些依赖等，为了不让用户那么麻烦把ansible放到了容器里供用户使用。如果不想配置免密钥使用用户名密码时又需要ssh-pass等，总之不能让我满意，不是我想的极简。

所以我想就来一个二进制文件工具，没有任何依赖，文件分发与远程命令都通过调用sdk实现所以不依赖其它任何东西，总算让我这个有洁癖的人满意了。

> 为什么不用keepalived haproxy

haproxy用static pod跑没有太大问题还算好管理，keepalived现在大部分开源ansible脚本都用yum 或者apt等装，这样非常的不可控，有如下劣势：

* 源不一致可能导致版本不一致，版本不一直连配置文件都不一样，我曾经检测脚本不生效一直找不到原因，后来才知道是版本原因
* 系统原因安装不上，依赖库问题某些环境就直接装不上了
* 看了网上很多安装脚本，很多检测脚本与权重调节方式都不对，直接去检测haproxy进程在不在，其实是应该去检测apiserver是不是healthz的,api挂了即使haproxy在集群也会不正常了，就是伪高可用了。
* 管理不方便，通过prometheus对集群进行监控，是能直接监控到static pod的但是用systemd跑又需要单独设置监控，且重启啥的还需要单独拉起。不如kubelet统一管理来的干净简洁。
* 我们还出现过keepalived把CPU占满的情况。

所以为了解决这个问题，我把keepalived跑在了容器中(社区提供的镜像基本是不可用的) 改造中间也是发生过很多问题，最终好在解决了。

总而言之，累觉不爱，所以在想能不能甩开haproxy和keepalived做出更简单更可靠的方案出来，还真找到了。。。

> 本地负载为什么不使用envoy或者nginx

我们通过本地负载解决高可用问题

解释一下本地负载，就是在每个node节点上都启动一个负载均衡，上游就是三个master，负载方式有很多 ipvs envoy nginx等，我们最终使用内核ipvs

如果使用envoy等需要在每个节点上都跑一个进程，消耗更多资源，这是我不希望的。ipvs实际也多跑了一个进程lvscare，但是lvscare只是负责管理ipvs规则，和kube-proxy类似，真正的流量还是从很稳定的内核走的，不需要再把包走到用户态中去处理。

实现上有个问题会让使用envoy等变得非常尴尬，就是join时如果负载均衡没有建立那是会卡住的，kubelet就不会起，所以为此你需要先把envory起起来，意味着你又不能用static pod去管理它，同上面keepalived宿主机部署一样的问题，用static pod就会相互依赖，逻辑死锁，鸡说要先有蛋，蛋说要先有鸡，最后谁都没有。

使用ipvs就不一样，我可以在join之前先把ipvs规则建立好，再去join就可以join进去了，然后对规则进行守护即可。一旦apiserver不可访问了，会自动清理掉所有node上对应的ipvs规则， master恢复正常时添加回来。

> 为什么要定制kubeadm

   首先是由于kubeadm把证书时间写死了，所以需要定制把它改成99年，虽然大部分人可以自己去签个新证书，但是我们还是不想再依赖个别的工具，就直接改源码了。 

   其次就是做本地负载时修改kubeadm代码是最方便的，因为在join时我们需要做两个事，第一join之前先创建好ipvs规则，第二创建static pod，如果这块不去定制kubeadm就把报静态pod目录已存在的错误，忽略这个错误很不优雅。 而且kubeadm中已经提供了一些很好用的sdk供我们去实现这个功能。

   且这样做之后最核心的功能都集成到kubeadm中了，sealos就单单变成分发和执行上层命令的轻量级工具了，增加节点时我们也就可以直接用kubeadm了

## 使用教程
### 安装依赖
* 安装并启动docker
* 下载[kubernetes 离线安装包](https://github.com/sealstore/cloud-kernel/releases/). 
* 下载[最新版本sealos](https://github.com/fanux/sealos/releases).
* 支持kuberentes 1.14.0+ 
* 务必同步服务器时间

### 安装教程
多master HA:
```
sealos init --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz     
```

或者单master多node:
```
sealos init --master 192.168.0.2 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz 
```

使用免密钥或者密钥对：
```
sealos init --master 172.16.198.83 \
    --node 172.16.198.84 \
    --pkg-url https://YOUR_HTTP_SERVER/kube1.15.0.tar.gz \
    --pk /root/kubernetes.pem \
    --version v1.15.0
```

```
--master   master服务器地址列表
--node     node服务器地址列表
--user     服务器ssh用户名
--passwd   服务器ssh用户密码
--pkg-url  离线包位置，可以放在本地目录，也可以放在一个http服务器上，sealos会wget到安装目标机
--version  kubernetes版本
--pk       ssh私钥地址，配置免密钥默认就是/root/.ssh/id_rsa
```

Other flags:
```
 --kubeadm-config string   kubeadm-config.yaml kubeadm配置文件，可自定义kubeadm配置文件
 --vip string              virtual ip (default "10.103.97.2") 本地负载时虚拟ip，不推荐修改，集群外不可访问
```

检查安装是否正常:
```
[root@iZj6cdqfqw4o4o9tc0q44rZ ~]# kubectl get node
NAME                      STATUS   ROLES    AGE     VERSION
izj6cdqfqw4o4o9tc0q44rz   Ready    master   2m25s   v1.14.1
izj6cdqfqw4o4o9tc0q44sz   Ready    master   119s    v1.14.1
izj6cdqfqw4o4o9tc0q44tz   Ready    master   63s     v1.14.1
izj6cdqfqw4o4o9tc0q44uz   Ready    <none>   38s     v1.14.1
[root@iZj6cdqfqw4o4o9tc0q44rZ ~]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                              READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-5cbcccc885-9n2p8          1/1     Running   0          3m1s
kube-system   calico-node-656zn                                 1/1     Running   0          93s
kube-system   calico-node-bv5hn                                 1/1     Running   0          2m54s
kube-system   calico-node-f2vmd                                 1/1     Running   0          3m1s
kube-system   calico-node-tbd5l                                 1/1     Running   0          118s
kube-system   coredns-fb8b8dccf-8bnkv                           1/1     Running   0          3m1s
kube-system   coredns-fb8b8dccf-spq7r                           1/1     Running   0          3m1s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44rz                      1/1     Running   0          2m25s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44sz                      1/1     Running   0          2m53s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44tz                      1/1     Running   0          118s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44rz            1/1     Running   0          2m15s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44sz            1/1     Running   0          2m54s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44tz            1/1     Running   1          47s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44rz   1/1     Running   1          2m43s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44sz   1/1     Running   0          2m54s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44tz   1/1     Running   0          63s
kube-system   kube-proxy-b9b9z                                  1/1     Running   0          2m54s
kube-system   kube-proxy-nf66n                                  1/1     Running   0          3m1s
kube-system   kube-proxy-q2bqp                                  1/1     Running   0          118s
kube-system   kube-proxy-s5g2k                                  1/1     Running   0          93s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44rz            1/1     Running   1          2m43s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44sz            1/1     Running   0          2m54s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44tz            1/1     Running   0          61s
kube-system   kube-sealyun-lvscare-izj6cdqfqw4o4o9tc0q44uz      1/1     Running   0          86s
```

### 安装APP(addons)
我们把诸如dashboard,prometheus,ingress等等都称之为APP

所有APP都可使用类似 `sealos install --pkg-url dashboard.tar`的方式安装

为什么不直接kubectl apply? 因为我们把镜像与配置文件和一些脚本都放入tar包中来保障一致性，并可以在没有镜像仓库的情况下帮用户导入镜像

还有就是很多情况下不可避免的要在执行完yaml之后执行一些命令，如安装完dashboard获取token这些

APP名|安装示例
---|---
[kuboard](https://github.com/sealstore/dashboard/tree/kuboard) | sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v1.0-1/kuboard.tar
[dashboard](https://github.com/sealstore/dashboard/tree/dashboard) | sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v2.0.0-bata5/dashboard.tar
[prometheus](https://github.com/sealstore/prometheus) | sealos install --pkg-url https://github.com/sealstore/prometheus/releases/download/v0.31.1/prometheus.tar
[ingress](https://github.com/sealstore/ingress) | sealos install --pkg-url https://github.com/sealstore/ingress/releases/download/v0.15.2/contour.tar

[设计原理](https://github.com/fanux/sealos/blob/master/docs/v3.0.md)

### 清理
```
sealos clean \
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password
```
### [视频教程](http://mp.weixin.qq.com/mp/video?__biz=Mzg2NzAzODE5Ng==&mid=100000268&sn=e932ef75dfc38414c21b6b365df07c8e&vid=wxv_1003349861900664832&idx=1&vidsn=e934d4cf8bacd1f569514b69c1344cf6&fromid=1&scene=18&xtrack=1#wechat_redirect)

### 增加节点
获取 join command, 在master上执行:
```
kubeadm token create --print-join-command
```

可以使用super kubeadm, 但是join时需要增加一个`--master` 参数:
```
cd kube/shell && init.sh
echo "10.103.97.2 apiserver.cluster.local" >> /etc/hosts   # using vip
kubeadm join 10.103.97.2:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --master 10.103.97.100:6443 \
    --master 10.103.97.101:6443 \
    --master 10.103.97.102:6443 \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866
```

也可以用sealos join命令：
```
sealos join 
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --vip 10.103.97.2 \       
    --node 192.168.0.5 \            
    --user root \             
    --passwd your-server-password \
    --pkg-url /root/kube1.15.0.tar.gz 
```

### 使用自定义kubeadm配置文件
比如我们需要在证书里加入 `sealyun.com`:

先获取配置文件模板：
```
sealos config -t kubeadm >>  kubeadm-config.yaml.tmpl
```
修改`kubeadm-config.yaml.tmpl`,文件即可， 编辑增加 `sealyun.com`, 注意其它部分不用动，sealos会自动填充模板里面的内容:
```
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
kubernetesVersion: {{.Version}}
controlPlaneEndpoint: "apiserver.cluster.local:6443"
networking:
  podSubnet: 100.64.0.0/10
apiServer:
        certSANs:
        - sealyun.com # this is what I added
        - 127.0.0.1
        - apiserver.cluster.local
        {{range .Masters -}}
        - {{.}}
        {{end -}}
        - {{.VIP}}
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
        excludeCIDRs: 
        - "{{.VIP}}/32"
```

使用 --kubeadm-config 指定配置文件模板即可:
```
sealos init --kubeadm-config kubeadm-config.yaml.tmpl \
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz 
```

### 版本升级
本教程以1.14版本升级到1.15为例，其它版本原理大差不差，懂了这个其它的参考[官方教程](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade-1-14/)即可

#### 升级过程
1. 升级kubeadm,所有节点导入镜像
2. 升级控制节点
3. 升级master(控制节点)上的kubelet
4. 升级其它master(控制节点)
5. 升级node
6. 验证集群状态

#### 升级kubeadm
把离线包拷贝到所有节点执行 `cd kube/shell && sh init.sh`
这里会把kubeadm kubectl kubelet bin文件都更新掉，而且会导入高版本镜像

#### 升级控制节点
```
kubeadm upgrade plan
kubeadm upgrade apply v1.15.0
```

重启kubelet:
```
systemctl restart kubelet
```
其实kubelet升级简单粗暴，我们只需要把新版本的kubelet拷贝到/usr/bin下面，重启kubelet service即可，如果程序正在使用不让覆盖那么就停一下kubelet再进行拷贝，kubelet bin文件在 `conf/bin` 目录下

#### 升级其它控制节点
```
kubeadm upgrade apply
```

#### 升级node
驱逐节点（要不要驱逐看情况, 喜欢粗暴的直接来也没啥）
```
kubectl drain $NODE --ignore-daemonsets
```
更新kubelet配置：
```
kubeadm upgrade node config --kubelet-version v1.15.0
```
然后升级kubelet 一样是替换二进制再重启 kubelet service
```
systemctl restart kubelet
```

召回失去的爱情：
```
kubectl uncordon $NODE
```

#### 验证
```
kubectl get nodes
```
如果版本信息对的话基本就ok了

#### kubeadm upgrade apply 干了啥
1. 检查集群是否可升级
2. 执行版本升级策略 哪些版本之间可以升级
3. 确认镜像可在
4. 执行控制组件升级，如果失败就回滚，其实就是apiserver controller manager scheduler 等这些容器
5. 执行kube-dns 和kube-proxy的升级
6. 创建新的证书文件,备份老的如果其超过180天

### 源码编译
因为使用了netlink库，所以推荐在容器内进行编译
```
docker run --rm -v $GOPATH/src/github.com/fanux/sealos:/go/src/github.com/fanux/sealos -w /go/src/github.com/fanux/sealos -it golang:1.12.7  go build
```
如果使用go mod 指定通过vendor 编译：
```
go build -mod vendor
```

## 原理
### 执行流程
* 通过sftp或者wget把离线安装包拷贝到目标机器上（masters和nodes）
* 在master0上执行kubeadm init
* 在其它master上执行kubeadm join 并设置控制面，这个过程会在其它master上起etcd并与master0的etcd组成集群，并启动控制组建（apiserver controller等）
* join node节点，会在node上配置ipvs规则，配置/etc/hosts等

   有个细节是所有对apiserver进行访问都是通过域名，因为master上连接自己就行，node需要通过虚拟ip链接多个master，这个每个节点的kubelet与kube-proxy访问apiserver的地址是不一样的，而kubeadm又只能在配置文件中指定一个地址，所以使用一个域名但是每个节点解析不同。

使用域名的好处还有就是IP地址发生变化时仅需要修改解析即可。

### 本地内核负载
通过这样的方式实现每个node上通过本地内核负载均衡访问masters：
```
  +----------+                       +---------------+  virturl server: 127.0.0.1:6443
  | mater0   |<----------------------| ipvs nodes    |    real servers:
  +----------+                      |+---------------+            10.103.97.200:6443
                                    |                             10.103.97.201:6443
  +----------+                      |                             10.103.97.202:6443
  | mater1   |<---------------------+
  +----------+                      |
                                    |
  +----------+                      |
  | mater2   |<---------------------+
  +----------+
```
在node上起了一个lvscare的static pod去守护这个 ipvs, 一旦apiserver不可访问了，会自动清理掉所有node上对应的ipvs规则， master恢复正常时添加回来。

所以在你的node上加了三个东西，可以直观的看到：
```
cat /etc/kubernetes/manifests   # 这下面增加了lvscare的static pod
ipvsadm -Ln                     # 可以看到创建的ipvs规则
cat /etc/hosts                  # 增加了虚拟IP的地址解析
```

### 定制kubeadm
对kubeadm改动非常少，主要是证书时间延长和join命令的扩展,主要讲讲join命令的改造：

首先join命令增加--master参数用于指定master地址列表
```
flagSet.StringSliceVar(
	&locallb.LVScare.Masters, "master", []string{},
	"A list of ha masters, --master 192.168.0.2:6443  --master 192.168.0.2:6443  --master 192.168.0.2:6443",
)
```
这样就可以拿到master地址列表去做ipvs了

如果不是控制节点切不是单master，那么就创建一条ipvs规则,控制节点上不需要创建，连自己的apiserver即可：
```
if data.cfg.ControlPlane == nil {
			fmt.Println("This is not a control plan")
			if len(locallb.LVScare.Masters) != 0 {
				locallb.CreateLocalLB(args[0])
			}
		} 
```

然后再去创建lvscare static pod去守护ipvs:
```
if len(locallb.LVScare.Masters) != 0 {
				locallb.LVScareStaticPodToDisk("/etc/kubernetes/manifests")
			}

```
所以哪怕你不使用sealos，也可以直接用定制过的kubeadm去装集群，只是麻烦一些：

##### kubeadm配置文件
```
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
kubernetesVersion: v1.14.0
controlPlaneEndpoint: "apiserver.cluster.local:6443" # apiserver DNS name
apiServer:
        certSANs:
        - 127.0.0.1
        - apiserver.cluster.local
        - 172.20.241.205
        - 172.20.241.206
        - 172.20.241.207
        - 172.20.241.208
        - 10.103.97.1          # virturl ip
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
        excludeCIDRs: 
        - "10.103.97.1/32" # 注意不加这个kube-proxy会清理你的规则
```
##### master0 10.103.97.100 上
```
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts # 解析的是master0的地址
kubeadm init --config=kubeadm-config.yaml --experimental-upload-certs  
mkdir ~/.kube && cp /etc/kubernetes/admin.conf ~/.kube/config
kubectl apply -f https://docs.projectcalico.org/v3.6/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml
```

##### master1 10.103.97.101 上
```
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts #解析的是master0的地址,为了能正常join进去
kubeadm join 10.103.97.100:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866 \
    --experimental-control-plane \
    --certificate-key f8902e114ef118304e561c3ecd4d0b543adc226b7a07f675f56564185ffe0c07 

sed "s/10.103.97.100/10.103.97.101/g" -i /etc/hosts  # 解析再换成自己的地址，否则就都依赖master0的伪高可用了
```

##### master2 10.103.97.102 上，同master1
```
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts
kubeadm join 10.103.97.100:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866 \
    --experimental-control-plane \
    --certificate-key f8902e114ef118304e561c3ecd4d0b543adc226b7a07f675f56564185ffe0c07  

sed "s/10.103.97.100/10.103.97.101/g" -i /etc/hosts
```

##### nodes 上
join时加上--master指定master地址列表
```
echo "10.103.97.1 apiserver.cluster.local" >> /etc/hosts   # 需要解析成虚拟ip
kubeadm join 10.103.97.1:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --master 10.103.97.100:6443 \
    --master 10.103.97.101:6443 \
    --master 10.103.97.102:6443 \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866
```

### 离线包结构分析
```
.
├── bin  # 指定版本的bin文件，只需要这三个，其它组件跑容器里
│   ├── kubeadm
│   ├── kubectl
│   └── kubelet
├── conf
│   ├── 10-kubeadm.conf  # 这个文件新版本没用到，我在shell里直接生成，这样可以检测cgroup driver
│   ├── dashboard
│   │   ├── dashboard-admin.yaml
│   │   └── kubernetes-dashboard.yaml
│   ├── heapster
│   │   ├── grafana.yaml
│   │   ├── heapster.yaml
│   │   ├── influxdb.yaml
│   │   └── rbac
│   │       └── heapster-rbac.yaml
│   ├── kubeadm.yaml # kubeadm的配置文件
│   ├── kubelet.service  # kubelet systemd配置文件
│   ├── net
│   │   └── calico.yaml
│   └── promethus
├── images  # 所有镜像包
│   └── images.tar
└── shell
    ├── init.sh  # 初始化脚本
    └── master.sh # 运行master脚本
```
init.sh脚本中拷贝bin文件到$PATH下面，配置systemd，关闭swap防火墙等，然后导入集群所需要的镜像。

master.sh主要执行了kubeadm init

conf下面有有我需要的如kubeadm的配置文件，calico yaml文件等等

sealos会调用二者。 所以大部分兼容不同版本都可以微调脚本做到。
