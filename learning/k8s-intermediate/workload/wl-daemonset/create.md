---
vssueId: 47
layout: LearningLayout
description: 本文描述了 Kubernetes 中如何创建 DaemonSet
---

# 创建 DaemonSet

## YAML 示例

下面是 DaemonSet 的 YAML 文件示例 daemonset.yaml。该例子中的 DaemonSet 运行了一个 fluentd-elasticsearch 的 docker 镜像：

``` yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
  namespace: kube-system
  labels:
    k8s-app: fluentd-logging
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
      containers:
      - name: fluentd-elasticsearch
        image: fluent/fluentd-kubernetes-daemonset:v1.7.1-debian-syslog-1.0
        resources:
          limits:
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
```

执行如下命令可创建该 DaemonSet：

``` sh
kubectl apply -f ./daemonset.yaml
```

## 必填字段

与其他所有 Kubernetes API 对象相同，DaemonSet 需要如下字段：
* apiVersion
* kind
* metadata

除此之外，DaemonSet 还需要 `.spec` 字段

## Pod Template

`.spec.template` 是必填字段，定义了 Pod 的模板，与定义 Pod 的 yaml 格式完全相同（除了内嵌在 DaemonSet 中以外，没有 kind、APIVersion 字段以外）。

在 DaemonSet 中，您必须指定 `.spec.template.metadata.labels` 字段和 `.spec.tempalte.spec` 字段。

DaemonSet 的 `.spec.template.spec.restartPolicy` 字段必须为 Always，或者不填（默认值为 Always）

## Pod Selector

`.spec.selector` 字段定义了 DaemonSet 的 pod selector，DaemonSet 认为符合该选择器的 Pod 由其管理。

自 Kubernets v1.8 以后，`.spec.selector` 是必填字段，且您指定该字段时，必须与 `.spec.template.metata.labels` 字段匹配（不匹配的情况下创建 DaemonSet 将失败）。DaemonSet 创建以后，`.spec.selector` 字段就不可再修改。如果修改，可能导致不可预见的结果。

`.spec.selector` 由两个字段组成：
* matchLabels <Badge text="Kuboard 已支持" type="success"/>
* matchExpressions <Badge text="Kuboard 暂不支持" type="warn"/> 通过指定 key、value列表以及运算符，可以构造更复杂的选择器

如果两个字段同时存在，则必须同时满足两个条件的 Pod 才被选中。

任何情况下，您不能以任何方式创建符合 DaemonSet 的 `.spec.selector` 选择器的 Pod。否则 DaemonSet Controller 会认为这些 Pod 是由它创建的。这将导致不可预期的行为出现。

## 只在部分节点上运行

指定 `.spec.template.spec.nodeSelector` <Badge text="Kuboard 已支持" type="success"/>，DaemonSet Controller 将只在指定的节点上创建 Pod （参考 [节点选择器 nodeSelector](/learning/k8s-intermediate/config/assign-pod-node.html#节点选择器-nodeselector)）。同样的，如果指定 `.spec.template.spec.affinity` <Badge text="Kuboard 暂不支持" type="warn"/>，DaemonSet Controller 将只在与 [node affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) 匹配的节点上创建 Pod。
