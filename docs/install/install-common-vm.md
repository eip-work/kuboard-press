## 制作标准机镜像

通过使用标准机镜像，可以

- **避免重复执行对测试机安装必要软件的过程**
- **以一种相对标准化的过程管理测试机的维护**

标准机镜像中预装了如下内容：

  - docker
  - gitlab-runner
  - kubernetes images

本文档描述的安装过程已基于 centos 7.6 验证

标准机镜像的制作过程描述如下：

### 安装docker

**卸载旧版本**

```bash
sudo yum remove docker \
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

**下载依赖包及安装包**

```bash
wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm

wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-cli-18.09.7-3.el7.x86_64.rpm

wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-18.09.7-3.el7.x86_64.rpm
```

**安装**

```bash
sudo yum install -y containerd.io-1.2.6-3.3.el7.x86_64.rpm
sudo yum install -y docker-ce-cli-18.09.7-3.el7.x86_64.rpm
sudo yum install -y docker-ce-18.09.7-3.el7.x86_64.rpm
sudo systemctl enable docker
```

**启动 docker 服务**

```bash
sudo systemctl start docker
```

**检查 docker 版本**

```bash
docker version
```



**参考文档**

https://docs.docker.com/install/linux/docker-ce/centos/

https://docs.docker.com/install/linux/linux-postinstall/



### 安装 nfs-utils

**执行安装命令**

```bash
sudo yum install nfs-utils
```

必须先安装 nfs-utils 才能挂载 nfs 网络存储



### K8S基本配置

**配置K8S的yum源**

```bash
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

**关闭swap、防火墙**

```bash
swapoff -a
```

**关闭SeLinux**

```bash
setenforce 0
```

**修改 /etc/sysctl.conf**

```vim /etc/sysctl.conf```

向其中添加

```
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
```

如下图所示

![image-20190715085036593](./install-common-vm.assets/image-20190715085036593.png ':size=600x445')



**安装kubelet、kubeadm、kubectl**

```bash
yum install -y kubelet-1.15.0 kubeadm-1.15.0 kubectl-1.15.0
```



**修改docker Cgroup Driver为systemd**

```vim /usr/lib/systemd/system/docker.service```

向其中他添加

```--exec-opt native.cgroupdriver=systemd```

如下图所示

![屏幕快照 2019-07-15 09.01.21](./install-common-vm.assets/image2019-07-15_09.01.21.png ':size=1000x326')



重启 docker

```
systemctl daemon-reload
systemctl restart docker
```



**启动kubelet**

```bash
systemctl enable kubelet && systemctl start kubelet
```



**加载 kubernetes 镜像**

由于k8s服务相关镜像在国外镜像源，国内无法访问

执行以下命令添加docker k8s国内镜像源

```bash
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io

systemctl restart docker
```

**拉取k8s相关镜像**

```bash
docker pull mirrorgooglecontainers/kube-apiserver:v1.15.0
docker pull mirrorgooglecontainers/kube-controller-manager:v1.15.0
docker pull mirrorgooglecontainers/kube-scheduler:v1.15.0
docker pull mirrorgooglecontainers/kube-proxy:v1.15.0
docker pull mirrorgooglecontainers/pause:3.1
docker pull mirrorgooglecontainers/etcd:3.3.10
docker pull coredns/coredns:1.3.1
```

**更改镜像名为k8s官网镜像**

```bash
docker tag d235b23c3570 k8s.gcr.io/kube-proxy:v1.15.0
docker tag 201c7a840312 k8s.gcr.io/kube-apiserver:v1.15.0
docker tag 2d3813851e87 k8s.gcr.io/kube-scheduler:v1.15.0
docker tag 8328bb49b652 k8s.gcr.io/kube-controller-manager:v1.15.0
docker tag da86e6ba6ca1 k8s.gcr.io/pause:3.1
docker tag eb516548c180 k8s.gcr.io/coredns:1.3.1
docker tag 2c4adeb21b4f k8s.gcr.io/etcd:3.3.10
```



**制作镜像**

请参考阿里云基于ECS [制作虚拟机镜像](https://help.aliyun.com/document_detail/35109.html?spm=5176.2020520101.0.0.75fc4df5mtdFmV) 的文档


