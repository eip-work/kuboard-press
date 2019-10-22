---
vssueId: 144
layout: LearningLayout
description: Kubernetes教程_当多个用户或团队共享一个节点数量有限的集群时_如何在多个用户或团队之间分配集群的资源就会变得非常重要_Resource_quota的用途便在于此_本文通过实例讲解了如何为名称空间配置CPU和内存的资源配额
meta:
  - name: keywords
    content: K8S 教程,Resource Quota,ResourceQuota
---

# Pod数量限额

<AdSenseTitle >

> 参考文档：[Configure a Pod Quota for a Namespace](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-pod-namespace/)

本文通过实例演示了如何通过ResourceQuota为名称空间配置最多可以运行多少个Pod。演示的步骤如下：

[[TOC]]

</AdSenseTitle>

## 创建名称空间

为本次演示创建名称空间：
``` sh
kubectl create namespace quota-pod-example
```

## 创建ResourceQuota

为本次演示创建 ResourceQuota 对象，yaml文件如下所示：

<<< @/.vuepress/public/statics/learning/policy/rq-pod-quota.yaml {7}

执行命令创建该 ResourceQuota
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/policy/rq-pod-quota.yaml --namespace=quota-pod-example
```

执行如下命令查看已创建的 ResourceQuota
``` sh
kubectl get resourcequota pod-demo --namespace=quota-pod-example --output=yaml
```

输出结果中显示了该名称空间的配额限定了只能创建两个 Pod，当前没有任何 Pod 被创建：
``` yaml {3,6,8}
spec:
  hard:
    pods: "2"
status:
  hard:
    pods: "2"
  used:
    pods: "0"
```

## 创建Pod

创建如下 Deployment

<<< @/.vuepress/public/statics/learning/policy/rq-pod-deployment.yaml

该 Deployment 的副本数为 3 `replicas: 3`，执行命令以创建该 Deployment：
``` sh
kubectl apply -f https://kuboard.cn/statics/learning/policy/rq-pod-deployment.yaml --namespace=quota-pod-example
```

执行命令以查看 Deployment 的详细信息
``` sh
kubectl get deployment pod-quota-demo --namespace=quota-pod-example --output=yaml
```

尽管 Deployment 期望的副本数是 3，但是由于名称空间通过 ResourceQuota 限定了最大的 Pod 数量，因此，最终只有两个 Pod 被创建成功。输出结果如下所示：

``` yaml {3,6,9}
spec:
  ...
  replicas: 3
...
status:
  availableReplicas: 2
...
lastUpdateTime: 2017-07-07T20:57:05Z
    message: 'unable to create pods: pods "pod-quota-demo-1650323038-" is forbidden:
      exceeded quota: pod-demo, requested: pods=1, used: pods=2, limited: pods=2'
```      

## 清理

删除名称空间可清理本次演示创建的对象：
``` sh
kubectl delete namespace quota-pod-example
```
