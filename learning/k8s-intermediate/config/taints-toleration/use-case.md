---
vssueId: 97
titlePrefix: 污点和容忍
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_配置污点和容忍taints_and_toleration的使用案例
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes污点使用
---

# 使用案例

<AdSenseTitle/>

污点和容忍使用起来非常灵活，可以用于：
* 避免 Pod 被调度到某些特定的节点
* 从节点上驱逐本不应该在该节点运行的 Pod

具体的场景可能有：

* **专属的节点：** 如果您想将一组节点专门用于特定的场景，您可以为这些节点添加污点（例如 `kubectl taint nodes nodename dedicated=groupName:NoSchedule`）然后向对应的 Pod 添加容忍。带有这些容忍的 Pod 将可以使用这一组专属节点，同时也可以使用集群中的其他节点。如果您想进一步限制这些 Pod 只能使用这一组节点，那么您应该为这一组节点添加一个标签（例如 dedicated=groupName），并为这一组 Pod 添加 node affinity（或 node selector）以限制这些 Pod 只能调度到这一组节点上。
* **带有特殊硬件的节点：** 集群中，如果某一组节点具备特殊的硬件（例如 GPU），此时非常有必要将那些不需要这类硬件的 Pod 从这组节点上排除掉，以便需要这类硬件的 Pod 可以得到资源。此时您可以为这类节点添加污点（例如：`kubectl taint nodes nodename special=true:NoSchedule` 或者 `kubectl taint nodes nodename special=true:PreferNoSchedule`）并为需要这类硬件的 Pod 添加匹配的容忍。
* **基于污点的驱逐** 当节点出现问题时，可以使用污点以 Pod 为单位从节点上驱逐 Pod。进一步描述请参考 [基于污点的驱逐](./taint-based-evictions.html)
