---
lessAds: false
description: 在 Kubernetes 集群中安装 Kuboard_V3
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装 Kuboard v3 - static pod

如果您想以一种简单的方式将 kuboard 安装在 kubernetes master 节点上，您可以尝试使用 static pod 的方式安装 kuboard。使用此方式安装 kuboard 时，kuboard 将使用该节点的 80 端口暴露服务，并且将数据存储在 /usr/share/kuboard 目录下。

## static pod 安装 kuboard

在 Kubernetes master 节点上，执行如下两行指令，即可在根据提示完成 kuboard 安装。

```sh
curl -fsSL https://addons.kuboard.cn/kuboard/kuboard-static-pod.sh -o kuboard.sh
sh kuboard.sh
```

kuboard-v3 容器组进入 `Running` 状态后，Kuboard 安装成功。


## 访问 kuboard v3

在浏览器输入 `http://your-host-ip:80` 即可访问 Kuboard v3.x 的界面，登录方式：
* 用户名： `admin`
* 密 码： `Kuboard123`

::: tip 浏览器兼容性

<li>请使用 Chrome / FireFox / Safari 等浏览器</li>
<li>不兼容 IE 以及以 IE 为内核的浏览器</li>

:::
