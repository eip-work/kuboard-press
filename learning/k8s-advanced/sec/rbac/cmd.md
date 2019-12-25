---
vssueId: 175
layout: LearningLayout
description: Kubernetes教程_Role-based_access_control_(RBAC)基于角色的访问控制_是Kubernetes中支持的一种授权方式。使用rbac.authorization.k8s.io_API来驱动授权决策_允许管理员通过该API动态配置授权策略。
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes RBAC,Kubernetes权限
---

# RBAC 命令行工具

<AdSenseTitle/>

## kubectl create role

创建一个 `Role` 对象以在某个名称空间内定义权限。例子：

* 创建一个名为 “pod-reader” 的 `Role` 对象，允许用户执行 “get”、“watch”、“list” 操作：

  ``` sh
  kubectl create role pod-reader --verb=get --verb=list --verb=watch --resource=pods
  ```

* 创建一个名为 “pod-reader” 的 `Role` 对象并指定 resourceName：

  ``` sh
  kubectl create role pod-reader --verb=get --resource=pods --resource-name=readablepod --resource-name=anotherpod
  ```

* 创建一个名为 “foo” 的 `Role` 对象并指定 apiGroups：

  ``` sh
  kubectl create role foo --verb=get,list,watch --resource=replicasets.apps
  ```

* 创建一个名为 “foo” 的 `Role` 对象并指定 subresource 权限：

  ``` sh
  kubectl create role foo --verb=get,list,watch --resource=pods,pods/status
  ```

* 创建一个名为 “my-component-lease-holder” 的 `Role` 对象并指定可以 查看/更新 特定名称的资源：

  ``` sh
  kubectl create role my-component-lease-holder --verb=get,list,watch,update --resource=lease --resource-name=my-component
  ```

## kubectl create clusterrole

创建 `ClusterRole` 对象的例子：

* 创建一个名为 “pod-reader” 的 `ClusterRole` 对象，允许用户对 Pod 执行 “get”、“watch”、“list” 操作：

  ``` sh
  kubectl create clusterrole pod-reader --verb=get,list,watch --resource=pods
  ```

* 创建一个名为 “pod-reader” 的 `ClusterRole` 对象，并指定 resourceName：

  ``` sh
  kubectl create clusterrole pod-reader --verb=get --resource=pods --resource-name=readablepod --resource-name=anotherpod
  ```

* 创建一个名为 “foo” 的 `ClusterRole` 对象，并指定 apiGroup：

  ``` sh
  kubectl create clusterrole foo --verb=get,list,watch --resource=replicasets.apps
  ```

* 创建一个名为 “foo” 的 `ClusterRole` 对象，并指定 subresource 权限：

  ``` sh
  kubectl create clusterrole foo --verb=get,list,watch --resource=pods,pods/status
  ```

* 创建一个名为 “foo” 的 `ClusterRole` 对象，并指定 nonResourceURL：

  ``` sh
  kubectl create clusterrole "foo" --verb=get --non-resource-url=/logs/*
  ```

* 创建一个名为 “monitoring” 的 `ClusterRole` 对象，并指定 aggregationRule：

  ``` sh
  kubectl create clusterrole monitoring --aggregation-rule="rbac.example.com/aggregate-to-monitoring=true"
  ```

## kubectl create rolebinding

创建 RoleBinding，在某个名称空间内为被授权主体绑定 `Role` 或 `ClusterRole`。例子：

* 在名称空间 “acme” 中，将名称为 `admin` 的 `ClusterRole` 的权限授予给用户 “bob” ：

  ``` sh
  kubectl create rolebinding bob-admin-binding --clusterrole=admin --user=bob --namespace=acme
  ```

* 在名称空间 “acme” 中，将名称为 `view` 的 `ClusterRole` 的权限授予给名称空间 “acme” 中名称为 “myapp” 的 service account ：

  ``` sh
  kubectl create rolebinding myapp-view-binding --clusterrole=view --serviceaccount=acme:myapp --namespace=acme
  ```

* 在名称空间 “acme” 中，将名称为 `view` 的 `ClusterRole` 的权限授予给名称空间 “myappnamespace” 中名称为 “myapp” 的 service account ：

  ``` sh
  kubectl create rolebinding myappnamespace-myapp-view-binding --clusterrole=view --serviceaccount=myappnamespace:myapp --namespace=acme
  ```

## kubectl create clusterrolebinding

在集群范围内（包括所有名称空间）授权 `ClusterRole`。例子：

* 在集群范围内，将名称为 `cluster-admin` 的 `ClusterRole` 的权限授予给用户 “root”：

  ``` sh
  kubectl create clusterrolebinding root-cluster-admin-binding --clusterrole=cluster-admin --user=root
  ```

* 在集群范围内，将名称为 `system:node-proxier` 的 `ClusterRole` 的权限授予给用户 “system:kube-proxy”：

  ``` sh
  kubectl create clusterrolebinding kube-proxy-binding --clusterrole=system:node-proxier --user=system:kube-proxy
  ```

* 在集群范围内，将名称为 `view` 的 `ClusterRole` 的权限授予给名称空间 “acme” 中的 service account “myapp”：

  ``` sh
  kubectl create clusterrolebinding myapp-view-binding --clusterrole=view --serviceaccount=acme:myapp
  ```

## kubectl auth reconcile

从描述文件创建或更新 `rbac.authorization.k8s.io/v1` API 对象。

* 描述文件中有，API Server中不存在的对象将被创建（如果对应的名称空间不存在，自动创建名称空间）。

* 描述文件中有，API Server中已存在的对象将被更新，以包含描述文件中定义的权限（如果指定了 `--remove-extra-permissions` 参数，描述文件中未定义的额外的权限将被删除）。

* 描述文件中有，API Server中已存在的绑定对象将被更新，以包含描述文件中定义的被授权主体（如果指定了 `--remove-extra-subjects` 参数，描述文件中未定义的额外的被授权主体将被删除）。

例子：

* 测试描述文件中的 RBAC 对象，并显示将要执行的变更：

  ``` sh
  kubectl auth reconcile -f my-rbac-rules.yaml --dry-run
  ```

* 应用描述文件中的 RBAC 对象，保留额外的权限（角色中）和额外的被授权主体（绑定中）：

  ``` sh
  kubectl auth reconcile -f my-rbac-rules.yaml
  ```

* 应用描述文件中的 RBAC 对象，删除额外的权限（角色中）和额外的被授权主体（绑定中）：

  ``` sh
  kubectl auth reconcile -f my-rbac-rules.yaml --remove-extra-subjects --remove-extra-permissions
  ```
