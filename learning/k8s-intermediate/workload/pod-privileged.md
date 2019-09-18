---
description: 在 Kubernetes 中为 Pod 中的容器开启 privileged 模式
---

# 容器组 - Privileged 模式


## Privilged 模式运行容器

Pod 中的任何容器都可以开启 privileged 模式，只需要

Any container in a Pod can enable privileged mode, using the privileged flag on the security context of the container spec. This is useful for containers that want to use Linux capabilities like manipulating the network stack and accessing devices. Processes within the container get almost the same privileges that are available to processes outside a container. With privileged mode, it should be easier to write network and volume plugins as separate Pods that don’t need to be compiled into the kubelet.
