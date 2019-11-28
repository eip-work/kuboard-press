---
vssueId: 171
description: Kuboard_快速在Kubernetes上落地微服务_本文详细介绍如何离线安装Kubernetes
meta:
  - name: keywords
    content: Kubernetes离线安装
---

# 安装Kubernetes集群（离线）

<AdSenseTitle/>

**离线安装步骤：**

* 在局域网内准备好4台机器，假设：
  * 三台 master，IP地址为 192.168.0.2、192.168.0.3、192.168.0.4
  * 一台 worker，IP地址为 192.168.0.5
* 在任何一台机器上执行如下两行命令

::: tip 机器要求
* centos 7.6 或 centos 7.7
* 配置不低于2核4G
* 所有机器 root 用户密码一致（如不一致也可以使用 ssh 密钥，可参考 [sealos](https://github.com/fanux/sealos)）
:::

``` sh
wget https://github.com/fanux/sealos/releases/download/v2.0.7/sealos && \
    chmod +x sealos && mv sealos /usr/bin 
sealos init --passwd YOUR_SERVER_PASSWD \
	--master 192.168.0.2  --master 192.168.0.3  --master 192.168.0.4  \
	--node 192.168.0.5 \
	--pkg-url https://sealyun.oss-cn-beijing.aliyuncs.com/37374d999dbadb788ef0461844a70151-1.16.0/kube1.16.0.tar.gz \
	--version v1.16.0
```

[了解一下这是怎么做到的](https://github.com/fanux/sealos)
