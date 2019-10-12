---
vssueId: 113
layout: LearningLayout
description: Kubernetes教程_为Pod容器组或Container容器配置Security Context安全上下文的_seLinuxOptions
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 关于数据卷

<AdSenseTitle/>

Pod 的 securityContext 作用于 Pod 中所有的容器，同时对 Pod 的数据卷也同样生效。具体来说，`fsGroup` 和 `seLinuxOptions` 将被按照如下方式应用到 Pod 中的数据卷：
* `fsGroup`：对于支持 ownership 管理的数据卷，通过 `fsGroup` 指定的 GID 将被设置为该数据卷的 owner，并且可被 `fsGroup` 写入。更多细节请参考 [Ownership Management design document](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/volume-ownership-management.md)
* `seLinuxOptions`：对于支持 SELinux 标签的数据卷，将按照 `seLinuxOptions` 的设定重新打标签，以使 Pod 可以访问数据卷内容。通常您只需要设置 `seLinuxOptions` 中 `level` 这一部分内容。该设定为 Pod 中所有容器及数据卷设置 [Multi-Category Security (MCS)](https://selinuxproject.org/page/NB_MLS) 标签。

::: warning
这段内容来自于 [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#discussion)。尚未验证这段文字的细节。
:::
