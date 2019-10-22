---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此_本文探索了可以通过ResourceQuota中Requests/Limits的区别、查看和设定ResourceQuota等
meta:
  - name: keywords
    content: K8S 教程,Resource Quota,ResourceQuota
---

# 更多

<AdSenseTitle >

</AdSenseTitle>

## Requests vs Limits

Kubernetes 中，在为容器分配计算资源时，每一个容器都可以指定 `resources.limits.cpu`、`resources.limits.memory`、`resources.requests.cpu`、`resources.requests.memory`。ResourceQuota可以为 limits 和 requests 各自设定资源配额。

* 如果 ResourceQuota 指定了 `requests.cpu` 或者 `requests.memory`，此时任何新建的容器都必须明确指定自己的 `requests.cpu`、`requests.memory`。
* 如果 ResourceQuota 指定了 `limits.cpu` 或者 `limits.memory`，此时任何新建的容器都必须明确指定自己的 `limits.cpu`、`limits.memory`。

## 查看和设定ResourceQuota

使用 kubectl 可以查看和设定 ResourceQuota：

``` sh
kubectl create namespace myspace

cat <<EOF > compute-resources.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
    requests.nvidia.com/gpu: 4
EOF

kubectl create -f ./compute-resources.yaml --namespace=myspace

cat <<EOF > object-counts.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: object-counts
spec:
  hard:
    configmaps: "10"
    persistentvolumeclaims: "4"
    pods: "4"
    replicationcontrollers: "20"
    secrets: "10"
    services: "10"
    services.loadbalancers: "2"
EOF

kubectl create -f ./object-counts.yaml --namespace=myspace

```

查看
``` sh
kubectl get quota --namespace=myspace
```
输出结果：
```
NAME                    AGE
compute-resources       30s
object-counts           32s
```
执行
```sh
kubectl describe quota compute-resources --namespace=myspace
```
输出结果：
```
Name:                    compute-resources
Namespace:               myspace
Resource                 Used  Hard
--------                 ----  ----
limits.cpu               0     2
limits.memory            0     2Gi
requests.cpu             0     1
requests.memory          0     1Gi
requests.nvidia.com/gpu  0     4
```
执行
``` sh
kubectl describe quota object-counts --namespace=myspace
```
输出结果
```
Name:                   object-counts
Namespace:              myspace
Resource                Used    Hard
--------                ----    ----
configmaps              0       10
persistentvolumeclaims  0       4
pods                    0       4
replicationcontrollers  0       20
secrets                 1       10
services                0       10
services.loadbalancers  0       2
```

使用 kubectl 还可以支持对象数量配额（`count/<resource>.<group>`）的查看和设定：

```sh
kubectl create namespace myspace
```

```sh
kubectl create quota test --hard=count/deployments.extensions=2,count/replicasets.extensions=4,count/pods=3,count/secrets=4 --namespace=myspace
```

```sh
kubectl run nginx --image=nginx --replicas=2 --namespace=myspace
```
```sh
kubectl describe quota --namespace=myspace
```
```
Name:                         test
Namespace:                    myspace
Resource                      Used  Hard
--------                      ----  ----
count/deployments.extensions  1     2
count/pods                    2     3
count/replicasets.extensions  1     4
count/secrets                 1     4
```

## ResourceQuota和Cluster Capacity

`ResourceQuota` 与 Cluster Capacity 相互独立，都使用绝对值来标识其大小（而不是百分比）。如果您想集群中添加节点，并不会自动使其中任何一个名称空间的可用资源配额发生变化。

某些情况下，需要更加复杂的策略配置，例如：
* 在多个团队之间按比例切分集群的资源
* 允许每一个租户按需增加资源使用，但是又有合适的限定以避免资源耗尽的情况发生
* 根据某个名称空间的实际需要，增加节点，并提高为其提高资源配额

要实现这些策略，可以使用 `ResourceQuota` 作为基础，编写自己的控制器来监听资源配额的使用情况，并根据具体的情况动态调整名称空间的 `ResourceQuota`。

::: tip
尽管 `ResourceQuota` 可以将集群中的资源配额分配到名称空间，但是它并不对节点做任何限定，不同名称空间的 Pod 可以运行在同一个节点上。
:::

## 限定Priority Class的默认资源消耗

某些情况下我们可能需要做如下设定：某个特定 priority 的 Pod（例如，cluster-services）当且仅当名称空间中存在匹配的 `ResourceQuota` 时才可以创建。

使用这样的机制，集群管理员可以限定某些特别的 priority class 只在指定的名称空间中使用。

如果要激活此特性，您需要将如下配置文件的路径通过 `--admission-control-config-file` 参数指定到 kube-apiserver 的启动参数中：

``` yaml
apiVersion: apiserver.k8s.io/v1alpha1
kind: AdmissionConfiguration
plugins:
- name: "ResourceQuota"
  configuration:
    apiVersion: resourcequota.admission.k8s.io/v1beta1
    kind: Configuration
    limitedResources:
    - resource: pods
      matchScopes:
      - scopeName: PriorityClass 
        operator: In
        values: ["cluster-services"]
```

完成此配置后，`cluster-services` priority 的 Pod 将只能在带有对应 `scopeSelector` 的 `ResourceQuota` 的名称空间中创建，例如：
``` yaml
    scopeSelector:
      matchExpressions:
      - scopeName: PriorityClass
        operator: In
        values: ["cluster-services"]
```

更多信息请参考 [LimitedResources](https://github.com/kubernetes/kubernetes/pull/36765) 和 [Quota support for priority class design doc](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/scheduling/pod-priority-resourcequota.md)
