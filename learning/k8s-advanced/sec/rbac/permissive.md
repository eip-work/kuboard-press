---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限,Service Account Permissions

---

# RBAC Permissive Permissions

<AdSenseTitle/>

可以通过 RBAC role binding 创建一个 permissive （放任的） policy。

::: danger 警告

下面的 policy 允许 **所有** 的 Service Account 扮演集群管理员的角色。在 Kubernetes 中，任何容器化应用都将自动分配一个 Service Account，即，在此情况下，任何应用程序都可以对 API Server 执行任何操作，包括查看 Secret 和修改权限。因此，这个做法是不被推荐的。

``` sh
kubectl create clusterrolebinding permissive-binding \
  --clusterrole=cluster-admin \
  --user=admin \
  --user=kubelet \
  --group=system:serviceaccounts
```

:::
