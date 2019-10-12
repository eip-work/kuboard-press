---
vssueId: 112
layout: LearningLayout
description: Kubernetes教程_为Pod容器组或Container容器配置Security Context安全上下文的_seLinuxOptions
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 为容器设置SELinux标签

<AdSenseTitle/>

Pod 或容器定义的 `securityContext` 中 `seLinuxOptions` 字段是一个 [SELinuxOptions](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#selinuxoptions-v1-core) 对象，该字段可用于为容器指定 SELinux 标签。如下所示：

``` yaml
securityContext:
  seLinuxOptions:
    level: "s0:c123,c456"
```

::: tip
为容器指定 SELinux 标签时，宿主节点的 SELinux 模块必须加载。
:::
