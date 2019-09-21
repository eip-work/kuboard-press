---
layout: LearningLayout
description: Kubernete教程_在Kubernetes中_通过Service连接应用程序
---

# Service连接应用程序

参考文档： Kubernetes 官网文档 [Connecting Applications with Services](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)

## Kubernetes 的网络模型

通过前面教程的学习，我们已经可以将容器化的应用程序在 Kubernetes 中运行起来，并且发布到 Kubernetes 内/外的网络上。

通常，Docker 使用一种 `host-private` 的联网方式，在此情况下，只有两个容器都在同一个节点（主机）上时，一个容器才可以通过网络连接另一个容器。为了使 Docker 容器可以跨节点通信，必须在宿主节点（主机）的 IP 地址上分配端口，并将该端口接收到的网络请求转发（或代理）到容器中。这意味着，用户必须非常小心地为容器分配宿主节点（主机）的端口号，或者端口号可以自动分配。

在一个集群中，多个开发者之间协调分配端口号是非常困难的。Kubernetes 认为集群中的两个 Pod 应该能够互相通信，无论他们各自在哪个节点上。每一个 Pod 都被分配自己的 **“cluster-private-IP”**，因此，您无需在 Pod 间建立连接，或者将容器的端口映射到宿主机的端口。因此：
* Pod 中的任意容器可以使用 localhost 直连同 Pod 中另一个容器的端口
* 集群中的任意 Pod 可以使用另一的 Pod 的 **cluster-private-IP** 直连对方的端口，（无需 NAT 映射）

本文档的后续章节使用了一个 nginx server 的例子，详细阐述了如何使用这种网络模型发布 Service。

## 在集群中部署 Pod

在前面的学习中，我们已经部署过 nginx 应用，此处，我们将该应用再部署一次，并将关注点放在网络连接方面（请留意该 Pod 指定了一个 containerPort）。

* 创建文件 `run-my-nginx.yaml`，文件内容如下

``` yaml {19}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
```

* 执行以下命令，部署 Pod 并检查运行情况：

```sh
kubectl apply -f ./run-my-nginx.yaml
kubectl get pods -l run=my-nginx -o wide
```

输出结果如下：

```
NAME                        READY     STATUS    RESTARTS   AGE       IP            NODE
my-nginx-3800858182-jr4a2   1/1       Running   0          13s       10.244.3.4    kubernetes-minion-905m
my-nginx-3800858182-kna2y   1/1       Running   0          13s       10.244.2.5    kubernetes-minion-ljyd
```

* 执行命令 `kubectl get pods -l run=my-nginx -o yaml | grep podIP`， 检查 Pod 的 IP 地址，输出结果如下：

```
  podIP: 10.244.3.4
  podIP: 10.244.2.5
```

在集群中的任意节点上，您可以执行 `curl 10.244.3.4` 或 `curl 10.244.2.5` 获得 nginx 的响应。此时：
* 容器并没有使用节点上的 80 端口
* 没有使用 NAT 规则对容器端口进行映射

这意味着，您可以
* 在同一节点上使用 80 端口运行多个 nginx Pod
* 在集群的任意节点/Pod 上使用 nginx Pod 的 clusterIP 访问 nginx 的 80 端口

同 Docker 一样，Kubernets 中，仍然可以将 Pod 的端口映射到宿主节点的网络地址上（使用 nodePort），但是使用 Kubernetes 的网络模型时，这类需求已经大大减少了。

如果对该网络模型的实现细节感兴趣，请参考 [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)


## 创建 Service

上面的步骤中，我们已经创建了 nginx Pod，运行在集群的 IP 地址空间。您可以直接通过 Pod 的地址访问其端口，但是如果某一个 Pod 终止了该怎么办？Pod 因为故障或其他原因终止后，Deployment Controller 将创建一个新的 Pod 以替代该 Pod，但是 IP 地址将发生变化。Kubernetes Service 解决了这样的问题。

Kubernetes Service：
* 定义了集群中一组 Pod 的逻辑集合，该集合中的 Pod 提供了相同的功能
* 被创建后，获得一个唯一的 IP 地址（ClusterIP）。直到该 Service 被删除，此地址不会发生改变
* Pod 可以直接连接 Service IP 地址上的端口，且发送到该 IP 地址的网络请求被自动负载均衡分发到 Service 所选取的 Pod 集合中

执行命令 `kubectl expose deployment/my-nginx` 可以为上面的两个 nginx Pod 创建 Service，输出结果如下所示：

```
service/my-nginx exposed
```

该命令等价于 `kubectl apply -f nginx-svc.yaml`，其中 nginx-svc.yaml 文件的内容如下所示：

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    run: my-nginx
```

该 yaml 文件将创建一个 Service：
* 该 Service 通过 label selector 选取包含 `run: my-nginx` 标签的 Pod 作为后端 Pod
* 该 Service 暴露一个端口 80（`spec.ports[*].port`）
* 该 Service 将 80 端口上接收到的网络请求转发到后端 Pod 的 80 （`spec.ports[*].targetPort`）端口上，支持负载均衡

执行命令 `kubectl get svc my-nginx`，输出结果如下所示：

```
NAME       TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
my-nginx   ClusterIP   10.0.162.149   <none>        80/TCP    21s
```

Service 的后端 Pod 实际上通过 `Endpoints` 来暴露。Kubernetes 会持续检查 Service 的 label selector `spec.selector`，并将符合条件的 Pod 更新到与 Service 同名（my-nginx）的 Endpoints 对象。如果 Pod 终止了，该 Pod 将被自动从 Endpoints 中移除，新建的 Pod 将自动被添加到该 Endpoint。

执行命令 `kubectl describe svc my-nginx`，输出结果如下，请注意 Endpoints 中的 IP 地址与上面获得的 Pod 地址相同：

``` {9}
Name:                my-nginx
Namespace:           default
Labels:              run=my-nginx
Annotations:         <none>
Selector:            run=my-nginx
Type:                ClusterIP
IP:                  10.0.162.149
Port:                <unset> 80/TCP
Endpoints:           10.244.2.5:80,10.244.3.4:80
Session Affinity:    None
Events:              <none>
```

执行命令 `kubectl get ep my-nginx`，输出结果如下：

```
NAME       ENDPOINTS                     AGE
my-nginx   10.244.2.5:80,10.244.3.4:80   1m
```

此时，您可以在集群的任意节点上执行 `curl 10.0.162.149:80`，通过 Service 的 ClusterIP:Port 访问 nginx。

::: tip
Service 的 IP 地址是虚拟地址。请参考 [虚拟 IP 的实现](./service-details.html#虚拟-ip-的实现)
:::

## 访问 Service

Kubernetes 支持两种方式发现服务：
* 环境变量 参考 [环境变量](./service-details.html#环境变量)
* DNS  参考 [DNS](./service-details.html#dns)

::: tip
由于如下原因，您可能不想激活 Service 的环境变量发现机制：
* 可能与应用程序的环境变量冲突
* 太多的环境变量
* 只想使用 DNS 等

您可以在 Pod 的定义中，将 `enableServiceLinks` 标记设置为 `false`
:::

### 环境变量

针对每一个有效的 Service，kubelet 在创建 Pod 时，向 Pod 添加一组环境变量。这种做法引发了一个 Pod 和 Service 的顺序问题。例如，
* 执行命令 `kubectl exec my-nginx-3800858182-jr4a2 -- printenv | grep SERVICE` （您的 Pod 名字可能不一样），输出结果如下：

  ```
  KUBERNETES_SERVICE_HOST=10.0.0.1
  KUBERNETES_SERVICE_PORT=443
  KUBERNETES_SERVICE_PORT_HTTPS=443
  ```
  请注意，此时环境变量中没有任何与您的 Service 相关的内容。因为在本教程的前面部分，我们先创建了 Pod 的副本，后创建了 Service。如果我们删除已有的两个 Pod，Deployment 将重新创建 Pod 以替代被删除的 Pod。此时，因为在创建 Pod 时，Service 已经存在，所以我们可以在新的 Pod 中查看到 Service 的环境变量被正确设置。

* 执行命令 `kubectl get pods -l run=my-nginx`以删除 Pod
* 执行命令 `kubectl get pods -l run=my-nginx -o wide` 查看新建Pod，输出结果如下：
  ```
  NAME                        READY     STATUS    RESTARTS   AGE     IP            NODE
  my-nginx-3800858182-e9ihh   1/1       Running   0          5s      10.244.2.7    kubernetes-minion-ljyd
  my-nginx-3800858182-j4rm4   1/1       Running   0          5s      10.244.3.8    kubernetes-minion-905m
  ```
* 执行命令 `kubectl exec my-nginx-3800858182-e9ihh -- printenv | grep SERVICE` （Pod 重建后，名字将会发生变化。请使用您的 Pod 名），输出结果如下，Service 相关的环境变量已经被正确设置
  ```
  KUBERNETES_SERVICE_PORT=443
  MY_NGINX_SERVICE_HOST=10.0.162.149
  KUBERNETES_SERVICE_HOST=10.0.0.1
  MY_NGINX_SERVICE_PORT=80
  KUBERNETES_SERVICE_PORT_HTTPS=443
  ```

### DNS

Kubernetes 提供了一个 DNS cluster addon Service，可自动为 Service 分配

## 保护 Service 的安全

## 暴露 Service
