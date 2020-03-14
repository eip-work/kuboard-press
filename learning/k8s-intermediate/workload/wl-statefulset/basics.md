---
vssueId: 43
layout: LearningLayout
description: 本文描述了 Kubernetes StatefulSet 的基本信息：Components、Pod Selector、Pod Identity
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,StatefulSet
---

# StatefulSet 的基本信息

<AdSenseTitle/>

[返回 StatefulSet](./)

## 创建 StatefulSet

下面是一个 StatefulSet 的例子，由如下内容组成：
* 一个名为 nginx 的 [Headless Service](https://kubernetes.io/docs/concepts/services-networking/service/#headless-service)，用于控制网络域
* 一个名为 web 的StatefulSet，副本数为 3
* volumeClaimTemplates 提供稳定的存储（每一个 Pod ID 对应自己的存储卷，且 Pod 重建后，仍然能找到对应的存储卷）

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None
  selector:
    app: nginx
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx # has to match .spec.template.metadata.labels
  serviceName: "nginx"
  replicas: 3 # by default is 1
  template:
    metadata:
      labels:
        app: nginx # has to match .spec.selector.matchLabels
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "my-storage-class"
      resources:
        requests:
          storage: 1Gi
```

## Pod 的标识

StatefulSet 中的 Pod 具备一个唯一标识，该标识由以下几部分组成：
* 序号
* 稳定的网络标识
* 稳定的存储

该标识始终与 Pod 绑定，无论该 Pod 被调度（重新调度）到哪一个节点上。

### 序号

假设一个 StatefulSet 的副本数为 N，其中的每一个 Pod 都会被分配一个序号，序号的取值范围从 0 到 N - 1，并且该序号在 StatefulSet 内部是唯一的。

### 稳定的网络 ID

* StatefulSet 中 Pod 的 hostname 格式为 $(StatefulSet name)-$(Pod 序号)。上面的例子将要创建三个 Pod，其名称分别为： web-0，web-1，web-2。
* StatefulSet 可以使用 Headless Service 来控制其 Pod 所在的域。该域（domain）的格式为 $(service name).$(namespace).svc.cluster.local，其中 “cluster.local” 是集群的域。
* StatefulSet 中每一个 Pod 将被分配一个 dnsName，格式为： $(podName).$(所在域名)

::: tip
您需要自行为 StatefulSet 创建 Headless Service。
:::

下表列出了不同的 集群域、Service name、StatefulSet name 的情况下，对应的 StatefulSet 中 Pod 的 DNS 名字：



| 字段名                | 组合一                                       | 组合二                                   | 组合三                                |
| --------------------- | -------------------------------------------- | ---------------------------------------- | ------------------------------------- |
| **集群域 Cluster Domain** | cluster.local                                | cluster.local                            | kube.local                         |
| **Service name**          | default/nginx                                | foo/nginx                                | foo/nginx                             |
| **StatefulSet name**      | default/web                                  | foo/web                                  | foo/web                               |
| **StatefulSet Domain**    | nginx.default.svc.cluster.local              | nginx.foo.svc.cluster.local              | nginx.foo.svc.kube.local              |
| **Pod DNS**               | web-{0..N-1}.nginx.default.svc.cluster.local | web-{0..N-1}.nginx.foo.svc.cluster.local | web-{0..N-1}.nginx.foo.svc.kube.local |
| **Pod name**              | web-{0..N-1}                                 | web-{0..N-1}                             | web-{0..N-1}                          |

### 稳定的存储

Kubernetes 为每一个 VolumeClaimTemplate 创建一份 PersistentVolume（存储卷）。在上面的例子中，每一个 Pod 都将由 StorageClass（存储类）`my-storage-class` 为其创建一个 1Gib 大小的 PersistentVolume（存储卷）。当 Pod 被调度（或重新调度）到一个节点上，其挂载点将挂载该存储卷声明（关联到该 PersistentVolume）。

::: tip
* 当 Pod 或 StatefulSet 被删除时，其关联的 PersistentVolumeClaim（存储卷声明）以及其背后的 PersistentVolume（存储卷）仍然存在。
* 如果相同的 Pod 或 StatefulSet 被再次创建，则，新建的名为 web-0 的 Pod 仍将挂载到原来名为 web-0 的 Pod 所挂载的存储卷声明及存储卷。
* 这确保了 web-0、web-1、web-2 等，不管被删除重建多少次，都将 “稳定” 的使用各自所对应的存储内容
:::

### Pod name 标签

当 StatefulSet 控制器创建一个 Pod 时，会为 Pod 添加一个标签（label） `statefulset.kubernetes.io/pod-name` 且该标签的值为 Pod 的名字。您可以利用此名字，为 StatefulSet 中的某一个特定的 Pod 关联一个 Service。

::: tip
实际操作中，您无需为 StatefulSet 中的一个特定 Pod 关联 Service，因为您可以直接通过该 Pod 的 DNS Name 访问到 Pod。
:::


[返回 StatefulSet](./)
