---
vssueId: 171
description: Kuboard_快速在Kubernetes上落地微服务_本文详细介绍如何离线安装Kubernetes
meta:
  - name: keywords
    content: Kubernetes离线安装
---

# 安装Kubernetes集群（离线）

<AdSenseTitle/>

## 离线安装工具特性

* 纯golang开发，只需一个二进制，无任何依赖
* 内核本地负载，不依赖haproxy keepalived等
* 不依赖ansible
* 99年证书
* 支持自定义配置安装
* 工具与资源包分离，离线安装，安装不同版本仅需要更换不同资源包即可
* 支持ingress kuboard prometheus等APP（addons）安装

## 离线安装步骤

* 在局域网内准备好4台机器，假设：
  * 三台 master，IP地址为 192.168.0.2、192.168.0.3、192.168.0.4
  * 一台 worker，IP地址为 192.168.0.5
* 在任何一台机器上执行如下两行命令

::: tip 机器要求
* 内核3.10以上，推荐4.14以上，centos7.2以上或者ubuntu16.04以上
* master节点配置不低于2核4G
* 所有机器 root 用户密码一致（如不一致也可以使用 ssh 密钥，可参考 [sealos](https://github.com/fanux/sealos)）
* 主机名不要重复
* 机器时间需要同步
:::

``` sh
wget https://github.com/fanux/sealos/releases/download/v3.0.1/sealos \
  && chmod +x sealos && mv sealos /usr/bin
# 请修改 passwd、master、node 这几个参数
sealos init --passwd 123456 \
	--master 192.168.0.2  --master 192.168.0.3  --master 192.168.0.4  \
	--node 192.168.0.5 \
	--pkg-url https://sealyun.oss-cn-beijing.aliyuncs.com/413bd3624b2fb9e466601594b4f72072-1.17.0/kube1.17.0.tar.gz \
	--version v1.17.0
```

### 参数含义

参数名|含义|示例
---|---|---
passwd|服务器密码|123456
master|k8s master节点IP地址| 192.168.0.2
node|k8s node节点IP地址|192.168.0.5
pkg-url|离线资源包地址，支持下载到本地，或者一个远程地址|/root/kube1.16.0.tar.gz
version|资源包对应的版本|v1.17.0

[了解一下这是怎么做到的](https://github.com/fanux/sealos)
