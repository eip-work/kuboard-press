---
vssueId: 126
description: Kubernetes_Dashboard_是Kubernetes的官方WebUI_本文描述了在K8S集群上安装Kuberentes_Dashboard后_如何修改Kuboard登录页末尾的ICP备案编号
meta:
  - name: keywords
    content: Kubernetes Dashboard,安装Kubernetes Dashboard,K8S Dashboard,K8S管理界面
---

# 安装Kubernetes Dashboard

<AdSenseTitle/>

自 Kuboard v1.0.6.3 开始，用户可以修改 Kuboard 登录页面页尾的 ICP 备案编号及URL。

修改方式：

为 Kuboard 增加环境变量：
* KUBOARD_ICP_DESCRIPTION  取值为您的 ICP 备案号，例如 `京ICP备19008693号-2`
