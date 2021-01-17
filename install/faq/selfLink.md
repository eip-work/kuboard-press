---
description: selfLink 问题
---

# selfLink 问题

<AdSenseTitle/>

## 问题描述

Kubernetes [v1.20](https://kubernetes.io/docs/setup/release/notes/) 开始，默认删除了 `metadata.selfLink` 字段，然而，部分应用仍然依赖于这个字段，例如 `nfs-client-provisioner`。如果仍然要继续使用这些应用，您将需要重新启用该字段。

## 启用 selfLink 字段

通过配置 apiserver 启动参数中的 `--feature-gates` 中的 `RemoveSelfLink=false`，可以重新启用 `metadata.selfLink` 字段。

请参考 [kube-apiserver 参数配置](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)
