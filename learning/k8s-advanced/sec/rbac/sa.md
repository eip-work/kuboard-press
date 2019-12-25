---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限,Service Account Permissions

---

# RBAC Service Account Permissions

<AdSenseTitle/>

> 参考文档：[Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

默认的 RBAC 策略为 control-plane 组件、节点还有控制器授予对应范围内的权限，但是并不为 `kube-system` 名称空间之外的 Service Account 授予任何权限（除了所有已认证用户都被授予的 discovery 权限）。

用户可以按照需要为特定的 service account 指定特定的角色。细粒度的角色绑定方式可以提高整体的安全性，但是带来了更多的管理负担。粗粒度的授权策略可能为 service account 授予了额外的不需要的 API 访问权限（存在越权的风险），但是更容易管理。

从最高的安全到最低的安全性，本文罗列了为 Service Account 授权的如下五种方式：

* 为每个应用程序的 Service Account 绑定一个角色（最佳实践）
   
  要求应用程序在其 podSpec 中指定 `serviceAccountName`，并未为其创建对应的 Service Account（通过 API、yaml 文件、`kubectl create serviceaccount` 等）

  例如，授予名称空间 “my-namespace” 中名为 “my-sa” 的 Service Account 只读权限：

  ``` sh
    kubectl create rolebinding my-sa-view \
    --clusterrole=view \
    --serviceaccount=my-namespace:my-sa \
    --namespace=my-namespace
  ```

* 为名称空间中的 “default” Service Account 绑定一个角色

  如果应用程序不指定 `serviceAccountName`，将使用 “default” Service Account。

  ::: tip 注意
  “default” Service Account 中的权限将被应用到同名称空间中所有不指定 `serviceAccountName` 的 Pod 中。
  :::

  例如，为名称空间 “my-namespace” 中的 “default” Service Account 收取 只读权限：
  ``` sh
  kubectl create rolebinding default-view \
    --clusterrole=view \
    --serviceaccount=my-namespace:default \
    --namespace=my-namespace
  ```

  许多 [add-on](https://kubernetes.io/docs/concepts/cluster-administration/addons/) 当前都在`kube-system` 名称空间中运行并使用该名称空间中的 “default” Service Account。为 `kube-system` 名称空间中的 “default” Service Account 授予 cluster-admin 权限，将使这些 add-on 获得超级用户的访问权限。

  ``` sh
  kubectl create clusterrolebinding add-on-cluster-admin \
    --clusterrole=cluster-admin \
    --serviceaccount=kube-system:default
  ```

* 为名称空间中的所有 Service Account 绑定一个角色

  如果想要让某个名称空间中所有的应用程序都共有一个角色（无论应用程序使用哪个Service Account），可以为名称空间中的 Service Account Group 授予角色。

  例如，为名称空间 “my-namespace” 中所有的 Service Account 授予同名称空间下的只读权限：

  ``` sh
  kubectl create rolebinding serviceaccounts-view \
    --clusterrole=view \
    --group=system:serviceaccounts:my-namespace \
    --namespace=my-namespace
  ```

* 为集群内所有的 Service Account 绑定一个有限权限的角色（不推荐）

  如果不想按名称空间管理权限，可以在集群级别为所有 Service Account 授予一个角色。

  例如，为集群内所有的 Service Account 授予针对所有名称空间的只读权限：

  ``` sh
  kubectl create clusterrolebinding serviceaccounts-view \
    --clusterrole=view \
    --group=system:serviceaccounts
  ```

* 为集群内所有的 Service Account 绑定一个超级用户的角色（强烈不推荐）

  如果您完全不想考虑划分权限的事情，可以为所有的 Service Account 授予超级用户的访问权限。

  ::: danger 警告
  这将允许任何用户读取 secret 或创建以超级用户身份运行的 Pod。
  :::

  ``` sh
  kubectl create clusterrolebinding serviceaccounts-cluster-admin \
    --clusterrole=cluster-admin \
    --group=system:serviceaccounts
  ```
