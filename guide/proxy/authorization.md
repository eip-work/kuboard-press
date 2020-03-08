---
vssueId: 184
# lessAds: true
description: Kubernetes教程：本文介绍了如何授权用户访问 Kuboard Proxy。
meta:
  - name: keywords
    content: Kubernetes教程,K8S,kubectl proxy
---

# Kuboard Proxy - 授权

<AdSenseTitle/>

如果要授权用户使用 Kuboard Proxy，请为其分配如下权限：

| apiGroups | resources                      | resourceNames | verbs  |
| --------- | ------------------------------ | ------------- | ------ |
| v1        | services/proxy<br />pods/proxy |               | create |
| v1        | services<br />pods             |               | get    |

截图如下所示：

![访问KuboardProxy所需权限](./authorization.assets/image-20200308111421525.png)

请参考 [使用Kuboard管理ServiceAccount及RBAC](/learning/k8s-advanced/sec/kuboard.html) 了解更多关于如何在 Kuboard 中完成授权操作的信息。
