---
vssueId: 115
description: 修改 docker 镜像仓库地址，加快 docker 镜像的下载速度
meta:
  - name: keywords
    content: docker镜像加速
---

# Docker镜像加速

* docker 中，只能够为 docker 官方镜像仓库 hub.docker.com 提供 mirror 加速，自建的 docker 镜像仓库是不能配置 mirror 加速的；
* 如果您参考 kuboard.cn 提供的 kubernetes 安装文档，默认使用的 docker mirror 是 https://registry.cn-hangzhou.aliyuncs.com 。

## 修改镜像仓库 mirror 地址

本文提供了快速修改的方式和手工修改的方式，效果相同


<b-tabs content-class="mt-3">
<b-tab title="快速修改" active>

* 下面提供了四个 mirror 地址，您可以去掉其中任意一个地址的注释，以使用该 mirror 地址。

``` sh
# Docker中国 mirror
# export REGISTRY_MIRROR="https://registry.docker-cn.com"
# 腾讯云 docker hub mirror
# export REGISTRY_MIRROR="https://mirror.ccs.tencentyun.com"
# 华为云镜像
# export REGISTRY_MIRROR="https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com"
# DaoCloud 镜像
# export REGISTRY_MIRROR="http://f1361db2.m.daocloud.io"
# 阿里云 docker hub mirror
export REGISTRY_MIRROR=https://registry.cn-hangzhou.aliyuncs.com
curl -sSL https://kuboard.cn/install-script/set_mirror.sh | sh -s ${REGISTRY_MIRROR}

systemctl restart kubelet  # 假设您安装了 kubenetes
```

</b-tab>
<b-tab title="手工修改">

* 修改 /etc/docker/daemon.json 文件（如果没有，则创建）：
``` sh
vim /etc/docker/daemon.json
```
* 添加 registry-mirrors 字段：
``` json
{
 "registry-mirrors": ["https://registry.cn-hangzhou.aliyuncs.com"]
}
```
* 重启 docker/kubelet

```sh
systemctl daemon-reload
systemctl restart docker
systemctl start kubelet # 假设您安装了 kubenetes
```

</b-tab>
</b-tabs>

## 查看修改结果
* 执行命令
``` sh
docker info
```
* 查看结果
``` {12}
...

Docker Root Dir: /var/lib/docker
Debug Mode (client): false
Debug Mode (server): false
Registry: https://index.docker.io/v1/
Labels:
Experimental: false
Insecure Registries:
 127.0.0.0/8
Registry Mirrors:
 https://registry.cn-hangzhou.aliyuncs.com
Live Restore Enabled: false
Product License: Community Engine
```
