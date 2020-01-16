---
vssueId: 127
layout: LearningLayout
description: Kubernetes教程_本文档可帮助您诊断部署到Kubernetes中的应用程序所出现的问题。如果仍然解决不了，请加本文末尾的QQ群答疑。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,诊断应用程序,问题诊断
---

# 诊断应用程序

<AdSenseTitle/>

> 参考文档： [Troubleshoot Applications](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/)

本文档可帮助您诊断部署到Kubernetes中的应用程序所出现的问题。如果仍然解决不了，请加本文末尾的QQ群答疑。也可以了解 [更多支持方式](/support/)

诊断问题的第一步是对问题做个分类，该问题是Pod的问题、Deployment（StatefulSet/DaemonSet）控制器的问题，还是Service的问题？

## Debugging Pods

任何时候，当你怀疑Pod碰到问题时，先看一下Pod的完整描述。执行如下语句可以查看到Pod最新的状态以及最近关联的事件：

``` sh
kubectl describe pods ${POD_NAME}
```

输出结果如下所示：
``` {19,22,26,41}
Name:           nginx-deployment-5754944d6c-d8hs8
Namespace:      default
Priority:       0
Node:           demo-worker002/172.17.216.82
Start Time:     Wed, 02 Oct 2019 22:36:19 +0800
Labels:         app=nginx
                pod-template-hash=5754944d6c
Annotations:    cni.projectcalico.org/podIP: 192.168.15.129/32
Status:         Running
IP:             192.168.15.129
Controlled By:  ReplicaSet/nginx-deployment-5754944d6c
Containers:
  nginx:
    Container ID:   docker://70b70667e082d6b4cbc7ab7a5fba33c2fa93509e08794658fde9ad9ac04a0327
    Image:          nginx:1.7.9
    Image ID:       docker-pullable://nginx@sha256:e3456c851a152494c3e4ff5fcc26f240206abac0c9d794affb40e0714846c451
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Wed, 02 Oct 2019 22:36:22 +0800
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-s6znq (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-s6znq:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-s6znq
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:          <none>
```

查看Pod中容器的状态：是否所有的容器都处于 `Running` 状态？是否近期有重启过？根据Pod/容器的状态：

### Pod一直是Pending

如果 Pod 一直停留在 `Pending`，意味着该 Pod 不能被调度到某一个节点上。通常，这是因为集群中缺乏足够的资源或者 ***“合适”*** 的资源。在上述 `kubectl describe...` 命令的输出中的 `Events` 字段，会有对应的事件描述为什么 Pod 不能调度到节点上。可能的原因有：
* **资源不就绪**：创建 Pod 时，有时候需要依赖于集群中的其他对象， ConfigMap（配置字典）、PVC（存储卷声明）等，例如
  * 可能该 Pod 需要的存储卷声明尚未与存储卷绑定，Events 信息如下所示：
    ```
    Type     Reason            Age        From               Message
    ----     ------            ----       ----               -------
    Warning  FailedScheduling  <unknown>  default-scheduler  pod has unbound immediate PersistentVolumeClaims (repated 2 times)
    ```
* **缺乏足够的资源**：可能集群中的CPU或内存都已经耗尽，此时，您可以尝试：
  * 删除某些 Pod
  * 调整Pod的资源请求
  * 向集群中添加新的节点
  ::: tip
  也许您会觉得节点的CPU或内存使用实际很低，资源耗尽这个现象不应该出现，如果带有此疑问，请参考 [带有资源请求的容器组是如何调度的](/learning/k8s-intermediate/config/computing-resource.html#带有资源请求的容器组是如何调度的)
  :::
* **该Pod使用`hostPort`**： 当Pod使用 `hostPort` 时，该Pod可以调度的地方就比较有限了。大多数情况下，是不需要使用 `hostPort` 的，可以尝试使用 Service 访问您的 Pod。如果您确实需要使用 `hostPort` 时，Deployment/ReplicationController 中 replicas 副本数不能超过集群中的节点数，因为每台机器的 80 端口只有一个，任何其他端口也只有一个。如果该端口被其他程序占用了，也将导致Pod调度不成功
* **污点和容忍**： 当您在Pod的事件中看到 `Taints` 或 `Tolerations` 这两个单词时，请您先参考文档 [污点和容忍](/learning/k8s-intermediate/config/taints-toleration/)，确保您理解了这两个概念

### Pod一直是Wating

如果 Pod 停留在 `Waiting` 状态，此时该 Pod 已经被调度到某个节点上了，但是却不能运行。在上述 `kubectl describe ...` 命令的输出中，仍然注意 `Events` 字段的内容。最常见的 Pod 停留在 `Waiting` 状态的原因是抓取容器镜像失败。请检查：
* 容器镜像的名字是对的
* 容器镜像已经推送到了镜像仓库中
* 在对应的节点上手工执行 `docker pull <image>` 命令，看是否能够抓取成功
* 如果使用私有镜像仓库，请参考 [使用私有仓库中的docker镜像](/learning/k8s-intermediate/private-registry.html)

### Pod已经Crash或者Unhealthy

此时通常是容器中应用程序的问题，您可以查看一下容器的日志，以诊断容器中应用程序出现了何种故障：

``` sh
kubectl logs ${POD_NAME} ${CONTAINER_NAME}
```

如果容器之前 crash，通过上述命令查不到日志，可以尝试使用下面的命令查看上一次 crash 时的日志：

``` sh
kubectl logs --previous ${POD_NAME} ${CONTAINER_NAME}
```

或者，也可以执行容器中的命令：
``` sh
kubectl exec ${POD_NAME} -c ${CONTAINER_NAME} -- ${CMD} ${ARG1} ${ARG2} ... ${ARGN}
```

::: tip
上述命令中的 `${CONTAINER_NAME}` 或者 `-c ${CONTAINER_NAME}` 都是可选项，当你的 Pod 中只有一个容器时，可以不填写此参数
:::

例如，要查看 Pod `Cassandra` 的日志，可以执行命令：
``` sh
kubectl exec cassandra -- cat /var/log/cassandra/system.log
```

### Pod处于Running状态，但是不工作

Pod已经处于Running状态了，但是不像您期望的那样工作，此时，很有可能是您的部署描述yaml文件（例如 Pod、Deployment、StatefulSet等）出现了问题，而创建时，kubectl 忽略了该错误。例如环境变量中某一个 Key 写错了，`command` 拼写成了 `commnd` 等。如果 `command` 拼写成了 `commnd`，您仍然能够使用该 yaml 文件创建工作负载，但是容器在运行时，却不会使用您原本期望的命令，而是执行了镜像中的 `EntryPoint`。

* 首先，在使用 `kubectl apply -f` 命令之前，可以尝试为其添加 `--validate` 选项，例如， `kubectl apply --validate -f mypod.yaml`。如果您将 `command` 拼写成 `commnd`，将看到如下错误信息：

  ``` sh
  I0805 10:43:25.129850   46757 schema.go:126] unknown field: commnd
  I0805 10:43:25.129973   46757 schema.go:129] this may be a false alarm, see https://github.com/kubernetes/kubernetes/issues/6842
  pods/mypod
  ```

  ::: tip
  使用 Kuboard 创建工作负载时，可以避免 yaml 格式的错误
  :::

* 其次，请检查您已经创建的 Pod 和您预期的是一致的。执行命令 `kubectl get pods/mypod -o yaml > mypod-on-apiserver.yaml`。将输出结果与您创建 Pod 时所使用的文件做一个对比。通常通过此命令从服务器端获取到的信息比创建 Pod 时所使用的文件要多几行，这是正常的。然而，如果您创建的Pod时所示用的文件中，存在从服务器上获取的信息中没有的代码行，这可能就是问题所在了。

### Debugging Deployment

Deployment（或者 DaemonSet/StatefulSet/Job等），都会比较直接，他们要么可以创建 Pod，要么不可以，此时，请按照上面的方法检查 Pod 的问题。

您也可以通过 `kubectl describe deployment ${DEPLOYMENT_NAME}` （或者statefulset / job 等）命令查看与 Deployment 相关的事件，来发现到底出了什么问题。

如果使用 StatefulSet，您有可能会碰到 `卡死` 的问题，请参考文档 [Forced Rollback](/learning/k8s-intermediate/workload/wl-statefulset/update.html#rolling-updates)

### Debugging Service

Service 可以为一组 Pod 提供负载均衡的功能。与Service相关，存在着几类常见问题。请参考本章节了解如何定位 Service 的问题：

首先，检查Service的Endpoints。参考此文档，[Service详细描述](/learning/k8s-intermediate/service/service-details.html) 可以了解 Service 和 Endpoints。

执行如下命令：
``` sh
kubectl get endpoints ${SERVICE_NAME}
```

输出结果如下所示：
``` sh
NAME                ENDPOINTS                               AGE
web-kuboard-press   192.168.144.158:80,192.168.199.135:80   70d
```

请确保 enpoints 的个数与您期望与该 Service 匹配的 Pod 的个数是相同的。例如，如果您使用 Deployment 部署了 web-kuboard-press，副本数为 2，此时，在输出结果的 ENDPOINTS 字段，应该有两个不同的 IP 地址。

### Service中没有Endpoints

如果您的Service中没有Endpoints，请尝试使用 Service 的 label selector 查询一下是否存在 Pod。假设您的 Service 如下：

``` yaml
...
metadata:
  name: myservice
  namespace: ns1
spec:
  - selector:
      name: nginx
      type: frontend
...
```

执行如下命令可以查看 Service 所匹配的 Pod：
``` sh
kubectl get pods --selector=name=nginx,type=frontend -n ns1
```

请核对查出来的 Pod 列表是否是您期望使用的 Pod。

如果 Pod 列表是您期望的结果，但是 ENDPOINTS 还是空的，此时很可能是您没有为 Service 指定正确的端口。如果 Service 中指定的 `containerPort` 实际上并不存在于 Pod 中，该 Pod 不会被添加到 ENDPOINTS 列表里。请确保 Service 指定的 `containerPort` 在 Pod 中是可以访问的。

### 网络转发问题

如果您的客户端可以连接上 Service，但是连接很快就被断开了，并且 endpoints 中有合适的内容，此时，有可能是 proxy 不能转发到您的 Pod 上。

请检查：
* Pod是否正常工作？`kubectl get pods` 查看 Pod 的 restart count，并按照本文前面的步骤诊断一下 Pod 是否有问题
* 是否可以直接连接到 Pod ？`kubectl get pods -o wide` 可以获得 Pod 的IP地址，从任意一个节点上执行 `ping <POD_IP>` 命令，确认网络连接是否正常
* 应用程序是否正常地监听了端口？Kubernetes 不对网络端口做映射，如果您的应用程序监听 8080 端口，则您在 Service 中应该指定 `containerPort` 为 8080。在任意节点上执行命令 `curl <POD_IP>:<containerPort>` 可查看 Pod 中容器的端口是否正常。参考 [Kubernetes的网络模型](/learning/k8s-intermediate/service/connecting.html#kubernetes-的网络模型)


## 如果还碰到问题

请加本文末尾的QQ群答疑。也可以了解 [更多支持方式](/support/)
