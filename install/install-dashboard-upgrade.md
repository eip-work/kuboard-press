---
vssueId: 19
description: Kuboard_快速在Kubernetes上落地微服务_本文详细介绍如何将Kuboard升级到最新版本
meta:
  - name: keywords
    content: Kuboard升级
---

# 升级Kuboard

<AdSenseTitle/>

## 最新版本

[查看最新版本及更新日志](/support/change-log/v1.0.x.html)

## latest 标签升级

按照 [安装 Kuboard](install-dashboard.html) 文档完成 Kuboard 安装后，您使用的 Kuboard 镜像是 latest 标签。每次 Kuboard 版本更新后，latest 标签对应的镜像也更新为最新版本。您需要执行下述操作，以完成 latest 镜像更新：

::: tip

* 安装 Kuboard 时，指定了 Kuboard 的 [imagePullPolicy](https://kubernetes.io/docs/concepts/containers/images/#updating-images) 为 Always。
* 在您的生产环境中，请避免使用 latest 标签，以确保版本的稳定性。

:::


* 进入 Kuboard 首页，完成登录，进入 Kuboard ***集群概览*** 页

* 点击 ***名称空间 / kube-system*** 进入 **kube-system** 名称空间

* 点击 ***容器组列表*** 按钮

* 勾选 ***监控*** 筛选项，点击刷新

  选择 kuboard-xxxxxxxxxx-xxxxx 容器组，如下图所示：

![Kubernetes安装：升级Kuboard-进入容器组列表](./install-dashboard-upgrade.assets/image-20190729071443225.png)

* 点击 ***删除*** 按钮

  点击 ***应用*** 按钮

  点击 ***完成*** 按钮

  等待容器组调整完毕

* 刷新浏览器页面

* 验证版本更新结果

  如下图所示

![Kubernetes安装：升级Kuboard-删除容器组](./install-dashboard-upgrade.assets/image-20190729071954323.png)


## 指定版本升级

* 进入 Kuboard 首页，完成登录，进入 Kuboard ***集群概览*** 页
* 点击 ***名称空间 / kube-system*** 进入 **kube-system** 名称空间
* 点击 ***调整镜像版本*** 按钮
* 勾选 ***监控*** 筛选项，点击刷新

  并修改 Deployment / Kuboard 的镜像版本为您要升级到的目标版本，如下图所示

![Kubernetes安装：升级Kuboard-指定Kuboard版本](./install-dashboard-upgrade.assets/image-20190728220831126.png)

* 点击 ***执行变更***

  点击 ***应用***

  点击 ***完成***

  等待容器组调整完毕。

* 刷新浏览器页面

* 验证版本更新结果

  如下图所示

![Kubernetes安装：升级Kuboard-查看升级结果](./install-dashboard-upgrade.assets/image-20190729071954323.png)
