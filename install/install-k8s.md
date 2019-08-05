# 安装 Kubernetes 单Master节点

对于 Kubernetes 初学者，推荐在阿里云采购如下配置：

* 3台 2核4G 的ECS（突发性能实例 t5 ecs.t5-c1m2.large或同等配置，单台约 0.4元/小时，停机时不收费）
* Cent OS 7.6
  

[领取阿里云最高2000元红包](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=obezo3pg)

Kuboard 的 Live Demo 环境使用的是如下拓扑结构，本文档描述了如何在完成该 demo 环境的搭建。

完成安装后，对应的软件版本为：

* Kubernetes v1.15.1
* Docker 18.09.7

![image-20190805230643974](install-k8s.assets/image-20190805230643974.png)


## 制作标准机镜像

通过使用标准机镜像，可以

- **避免重复执行对测试机安装必要软件的过程**
- **以一种相对标准化的过程管理测试机的维护**

标准机镜像中预装了如下内容：

  - docker
  - nfs-utils
  - kubernetes images

::: tip
* 您也可以不制作标准机镜像，而是在三台机器上都执行 ***制作标准机镜像*** 中的所有操作步骤
:::

**标准机镜像的制作过程描述如下：**

### 安装docker

**卸载旧版本**

``` sh
# 在 master 节点和 worker 节点都要执行
sudo yum remove -y docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-selinux \
docker-engine-selinux \
docker-engine
```

**设置 yum repository**

``` sh
# 在 master 节点和 worker 节点都要执行
sudo yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
sudo yum-config-manager \
--add-repo \
https://download.docker.com/linux/centos/docker-ce.repo
```

**安装并启动 docker**

``` sh
# 在 master 节点和 worker 节点都要执行
sudo yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
sudo systemctl enable docker
sudo systemctl start docker
```

**检查 docker 版本**

``` sh
# 在 master 节点和 worker 节点都要执行
docker version
```



> **参考文档**
> 
> https://docs.docker.com/install/linux/docker-ce/centos/
> 
> https://docs.docker.com/install/linux/linux-postinstall/



### 安装 nfs-utils

**执行安装命令**

``` sh
# 在 master 节点和 worker 节点都要执行
sudo yum install -y nfs-utils
```

必须先安装 nfs-utils 才能挂载 nfs 网络存储



### K8S基本配置

**配置K8S的yum源**

``` sh
# 在 master 节点和 worker 节点都要执行
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

**关闭 防火墙、SeLinux、swap**

``` sh
# 在 master 节点和 worker 节点都要执行
systemctl stop firewalld
systemctl disable firewalld

setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config

swapoff -a
yes | cp /etc/fstab /etc/fstab_bak
cat /etc/fstab_bak |grep -v swap > /etc/fstab
```

**修改 /etc/sysctl.conf**

``` sh
# 在 master 节点和 worker 节点都要执行
vim /etc/sysctl.conf
```

向其中添加

```
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
```

如下图所示

![image-20190715085036593](./install-common-vm.assets/image-20190715085036593.png ':size=600x445')

执行命令以应用

```sh
# 在 master 节点和 worker 节点都要执行
sysctl -p
```

**安装kubelet、kubeadm、kubectl**

``` sh
# 在 master 节点和 worker 节点都要执行
yum install -y kubelet-1.15.1 kubeadm-1.15.1 kubectl-1.15.1
```



**修改docker Cgroup Driver为systemd**

> 如果不修改，在添加 worker 节点时可能会碰到如下错误
> ```
> [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". 
> Please follow the guide at https://kubernetes.io/docs/setup/cri/
> ```

``` sh
# 在 master 节点和 worker 节点都要执行
vim /usr/lib/systemd/system/docker.service
```

向其中添加

```
--exec-opt native.cgroupdriver=systemd
```

如下图所示

![屏幕快照 2019-07-15 09.01.21](./install-common-vm.assets/image2019-07-15_09.01.21.png ':size=1000x326')


**设置 docker 镜像**

执行以下命令使用 docker 国内镜像，提高 docker 镜像下载速度和稳定性

> 如果您访问 https://hub.docker.io 速度非常稳定，亦可以跳过这个步骤

``` sh
# 在 master 节点和 worker 节点都要执行
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

**重启 docker，并启动 kubelet**

``` sh
# 在 master 节点和 worker 节点都要执行
systemctl daemon-reload
systemctl restart docker
systemctl enable kubelet && systemctl start kubelet
```


**制作镜像**

请参考阿里云基于ECS [制作虚拟机镜像](https://help.aliyun.com/document_detail/35109.html?spm=5176.2020520101.0.0.75fc4df5mtdFmV) 的文档


## 初始化 master 节点

::: tip
以 root 身份在 demo-master-a-1 机器上执行
:::

**配置 apiserver.demo 的域名**

``` sh
# 只在 master 节点执行
echo "x.x.x.x  apiserver.demo" >> /etc/hosts
```

::: warning
请替换其中的 x.x.x.x 为您的 demo-master-a-1 的实际 ip 地址
:::


**创建 ./kubeadm-config.yaml**

``` sh
# 只在 master 节点执行
vim ./kubeadm-config.yaml
```

``` yaml
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
kubernetesVersion: v1.15.1
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
controlPlaneEndpoint: "apiserver.demo:6443"
```



**初始化 apiserver**

``` sh
# 只在 master 节点执行
kubeadm init --config=kubeadm-config.yaml --upload-certs
```

执行结果如下图所示：

![image-20190715101542756](./install-k8s.assets/image-20190715101542756.png ':size=800x388')



**初始化 root 用户的 kubectl 配置**

``` sh
# 只在 master 节点执行
rm -rf /root/.kube/
mkdir /root/.kube/
cp -i /etc/kubernetes/admin.conf /root/.kube/config
```



**安装 calico**

``` sh
# 只在 master 节点执行
kubectl apply -f https://docs.projectcalico.org/v3.6/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml
```

> 安装calico， 请参考https://docs.projectcalico.org/v3.6/getting-started/kubernetes/



**等待calico安装就绪：**

执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态

``` sh
# 只在 master 节点执行
watch kubectl get pod -n kube-system
```


**检查 master 初始化结果**

在 master 节点 demo-master-a-1 上执行

``` sh
# 只在 master 节点执行
kubectl get nodes
```



## 初始化 worker节点

### 获得 join命令参数

**在 master 节点 demo-master-a-1 节点执行**

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
echo "x.x.x.x  apiserver.demo" >> /etc/hosts
kubeadm join apiserver.demo:6443 --token mpfjma.4vjjg8flqihor4vt     --discovery-token-ca-cert-hash sha256:6f7a8e40a810323672de5eee6f4d19aa2dbdb38411845a1bf5dd63485c43d303
```

::: tip
* 将 x.x.x.x 替换为 demo-master-a-1 的实际 ip
* 将 kubeadm join 命令后的参数替换为上一个步骤中实际从 demo-master-a-1 节点获得的参数
:::


### 检查初始化结果

在 master 节点 demo-master-a-1 上执行

``` sh
# 只在 master 节点执行
kubectl get nodes
```

![image-20190715193838012](./install-k8s.assets/image-20190715193838012.png)



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


## 安装 Ingress Controller

> Ingress官方文档：https://kubernetes.io/docs/concepts/services-networking/ingress/
>
> Ingress Controllers官网介绍：https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
>
> 本文中使用如下部署方式：https://kubernetes.github.io/ingress-nginx/deploy/baremetal/#using-a-self-provisioned-edge
>
> kubernetes支持多种Ingress Controllers，本文推荐使用 https://github.com/nginxinc/kubernetes-ingress

**在 demo-master-a-1 上执行**

``` sh
# 只在 master 节点执行
kubectl apply -f https://raw.githubusercontent.com/eip-work/eip-monitor-repository/master/dashboard/nginx-ingress.yaml
```

**配置域名解析**

将域名 *.demo.yourdomain.com 解析到 demo-worker-a-2 的 IP 地址 z.z.z.z （也可以是 demo-worker-a-1 的地址 y.y.y.y）

::: tip
由于需要申请域名，过程会比较繁琐，有如下两种替代方案：

* 在您的客户端机器（访问部署在K8S上的 web 应用的浏览器所在的机器）设置 hosts 配置；
* 暂时放弃域名的配置，临时使用 NodePort 或者 `kubectl port-forward` 的方式访问部署在 K8S 上的 web 应用
:::

**验证配置**

在浏览器访问 a.demo.yourdomain.com，将得到 404 NotFound 错误页面


## 下一步
:tada: :tada: :tada: 

您已经完成了 Kubernetes 集群的安装，下一步请：

[安装 Kuboard](/install/install-dashboard)
