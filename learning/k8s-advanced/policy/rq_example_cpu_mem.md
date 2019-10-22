---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此_本文通过实例讲解了如何为名称空间配置CPU和内存的资源配额
meta:
  - name: keywords
    content: K8S 教程,Resource Quota,ResourceQuota
---

# CPU/内存资源限额

<AdSenseTitle >

> 参考文档：[Configure Memory and CPU Quotas for a Namespace](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-memory-cpu-namespace/)

本文通过实例演示了如何通过ResourceQuota为名称空间配置CPU和内存的资源限额。演示的步骤如下：

[[TOC]]

</AdSenseTitle>

## 创建名称空间

执行如下命令，创建名称空间：
```sh
kubectl create namespace quota-mem-cpu-example
```

## 创建ResourceQuota

下面是 ResourceQuota 的YAML文件：

<<< @/.vuepress/public/statics/learning/policy/rq-mem-cpu-quota.yaml {7,8,9,10}

执行命令以创建该 ResourceQuota：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/policy/rq-mem-cpu-quota.yaml --namespace=quota-mem-cpu-example
```

执行命令查看刚创建的 ResourceQuota：

```
kubectl get resourcequota mem-cpu-demo --namespace=quota-mem-cpu-example --output=yaml
```

ResourceQuota 为 `quota-mem-cpu-example` 名称空间设定了如下资源配额：

* 每一个容器必须有 内存请求（request）、内存限制（limit）、CPU请求（request)、CPU限制（limit）
* 所有容器的内存请求总和不超过 1 GiB
* 所有容器的内存限定总和不超过 2 GiB
* 所有容器的CPU请求总和不超过 1 cpu
* 所有容器的CPU限定总和不超过 2 cpu


## 创建Pod

下面是一个 Pod 的配置文件：

<<< @/.vuepress/public/statics/learning/policy/rq-mem-cpu-pod.yaml {11,12,14,15}

执行命令以创建该 Pod
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/policy/rq-mem-cpu-pod.yaml --namespace=quota-mem-cpu-example
```
执行命令验证 Pod 已运行：
``` sh
kubectl get pod quota-mem-cpu-demo --namespace=quota-mem-cpu-example
```
此时执行命令再次查看名称空间的资源配额消耗情况：
``` sh
kubectl get resourcequota mem-cpu-demo --namespace=quota-mem-cpu-example --output=yaml
```
输出结果中除了显示名称空间的资源配额之外，同时还显示了该配额的使用情况。结果如下所示：
``` yaml {8,9,10,11}
status:
  hard:
    limits.cpu: "2"
    limits.memory: 2Gi
    requests.cpu: "1"
    requests.memory: 1Gi
  used:
    limits.cpu: 800m
    limits.memory: 800Mi
    requests.cpu: 400m
    requests.memory: 600Mi
```

## 尝试创建第二个Pod

下面是另外一个 Pod 的 YAML 文件：

<<< @/.vuepress/public/statics/learning/policy/rq-mem-cpu-pod-2.yaml {11,12,14,15}

在此配置文件中，Pod 请求了 700MiB 的内存，如果加上第一个 Pod 所请求的内存，其结果已经超出了名称空间的资源配额中对内存请求的限制：600MiB + 600MiB > 1GiB

执行如下命令尝试创建该 Pod：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/policy/rq-mem-cpu-pod-2.yaml --namespace=quota-mem-cpu-example
```
第二个 Pod 将不能创建成功，该命令的输出结果将提示创建 Pod 失败的原因是内存请求之和超过了内存请求的资源配额，错误信息如下所示：
```
Error from server (Forbidden): error when creating "examples/admin/resource/quota-mem-cpu-pod-2.yaml":
pods "quota-mem-cpu-demo-2" is forbidden: exceeded quota: mem-cpu-demo,
requested: requests.memory=700Mi,used: requests.memory=600Mi, limited: requests.memory=1Gi
```

## 总结

在本文的例子中，您可以使用 `ResourceQuota` 来限定名称空间中所有容器的内存请求（request）之和不超过指定的配额。同时也可以设置内存限定（limit）、CPU请求（request）、CPU限定（limit）的资源配额。

如果需要限定单个Pod、容器的资源使用情况，请参考 [LimitRange](./lr.html)

## 清理

删除名称空间可清理本文所创建的所有内容：
```sh
kubectl delete namespace quota-mem-cpu-example
```
