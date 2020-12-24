---
vssueId: 56
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_通过Service连接应用程序
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Service,Kubernetes服务发现
---

# Example：Service连接应用程序

<AdSenseTitle/>

参考文档： Kubernetes 文档 [Connecting Applications with Services](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)

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

* 执行命令 `kubectl delete pods -l run=my-nginx`以删除 Pod
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

Kubernetes 提供了一个 DNS cluster addon，可自动为 Service 分配 DNS name。如果您参考 www.kuboard.cn 上的文档安装 Kubernetes 集群，则该 addon 已经默认安装。

执行命令 `kubectl get services kube-dns --namespace=kube-system` 查看该 addon 在您的集群上是否可用，输出结果如下所示：

```
NAME       TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)         AGE
kube-dns   ClusterIP   10.0.0.10    <none>        53/UDP,53/TCP   8m
```

本章节假设：
* 您已经按照本文前面的章节创建了 Service（my-nginx）
* 您已经安装了 DNS Server（CoreDNS cluster addon）

此时，您可以从集群中任何 Pod 中按 Service 的名称访问该 Service。

* 执行命令 `kubectl run curl --image=radial/busyboxplus:curl -i --tty` 获得 busyboxplus 容器的命令行终端，该命令输出结果如下所示：

```
Waiting for pod default/curl-131556218-9fnch to be running, status is Pending, pod ready: false
Hit enter for command prompt
```

* 然后，单击回车键，并执行命令 `nslookup my-nginx`，输出结果如下所示：

  ```
  [ root@curl-131556218-9fnch:/ ]$ nslookup my-nginx
  Server:    10.0.0.10
  Address 1: 10.0.0.10

  Name:      my-nginx
  Address 1: 10.0.162.149
  ```

* 执行命令 `curl my-nginx:80`，可获得 Nginx 的响应。

* 执行命令 `exit` 可推出该容器的命令行

* 执行命令 `kubectl delete deployment curl` 可删除刚才创建的 `curl` 测试容器


## 保护 Service 的安全

到目前为止，我们只是从集群内部访问了 nginx server。在将该 Service 公布到互联网时，您可能需要确保该通信渠道是安全的。为此，您必须：

* 准备 https 证书（购买，或者自签名）
* 将该 nginx 服务配置好，并使用该 https 证书
* 配置 Secret，以使得其他 Pod 可以使用该证书

您可按照如下步骤配置 nginx 使用自签名证书：

* 创建密钥对
  ``` sh
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /d/tmp/nginx.key -out /d/tmp/nginx.crt -subj "/CN=my-nginx/O=my-nginx"
  ```
* 将密钥对转换为 base64 编码
  ``` sh
  cat /d/tmp/nginx.crt | base64
  cat /d/tmp/nginx.key | base64
  ```
* 创建一个如下格式的 nginxsecrets.yaml 文件，使用前面命令输出的 base64 编码替换其中的内容（base64编码内容不能换行）(请使用前面两行命令生成的结果替换 nginx.crt 和 nginx.key 的内容，)
  ```yaml
  apiVersion: "v1"
  kind: "Secret"
  metadata:
    name: "nginxsecret"
    namespace: "default"
  data:
    nginx.crt: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURIekNDQWdlZ0F3SUJBZ0lKQUp5M3lQK0pzMlpJTUEwR0NTcUdTSWIzRFFFQkJRVUFNQ1l4RVRBUEJnTlYKQkFNVENHNW5hVzU0YzNaak1SRXdEd1lEVlFRS0V3aHVaMmx1ZUhOMll6QWVGdzB4TnpFd01qWXdOekEzTVRKYQpGdzB4T0RFd01qWXdOekEzTVRKYU1DWXhFVEFQQmdOVkJBTVRDRzVuYVc1NGMzWmpNUkV3RHdZRFZRUUtFd2h1CloybHVlSE4yWXpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBSjFxSU1SOVdWM0IKMlZIQlRMRmtobDRONXljMEJxYUhIQktMSnJMcy8vdzZhU3hRS29GbHlJSU94NGUrMlN5ajBFcndCLzlYTnBwbQppeW1CL3JkRldkOXg5UWhBQUxCZkVaTmNiV3NsTVFVcnhBZW50VWt1dk1vLzgvMHRpbGhjc3paenJEYVJ4NEo5Ci82UVRtVVI3a0ZTWUpOWTVQZkR3cGc3dlVvaDZmZ1Voam92VG42eHNVR0M2QURVODBpNXFlZWhNeVI1N2lmU2YKNHZpaXdIY3hnL3lZR1JBRS9mRTRqakxCdmdONjc2SU90S01rZXV3R0ljNDFhd05tNnNTSzRqYUNGeGpYSnZaZQp2by9kTlEybHhHWCtKT2l3SEhXbXNhdGp4WTRaNVk3R1ZoK0QrWnYvcW1mMFgvbVY0Rmo1NzV3ajFMWVBocWtsCmdhSXZYRyt4U1FVQ0F3RUFBYU5RTUU0d0hRWURWUjBPQkJZRUZPNG9OWkI3YXc1OUlsYkROMzhIYkduYnhFVjcKTUI4R0ExVWRJd1FZTUJhQUZPNG9OWkI3YXc1OUlsYkROMzhIYkduYnhFVjdNQXdHQTFVZEV3UUZNQU1CQWY4dwpEUVlKS29aSWh2Y05BUUVGQlFBRGdnRUJBRVhTMW9FU0lFaXdyMDhWcVA0K2NwTHI3TW5FMTducDBvMm14alFvCjRGb0RvRjdRZnZqeE04Tzd2TjB0clcxb2pGSW0vWDE4ZnZaL3k4ZzVaWG40Vm8zc3hKVmRBcStNZC9jTStzUGEKNmJjTkNUekZqeFpUV0UrKzE5NS9zb2dmOUZ3VDVDK3U2Q3B5N0M3MTZvUXRUakViV05VdEt4cXI0Nk1OZWNCMApwRFhWZmdWQTRadkR4NFo3S2RiZDY5eXM3OVFHYmg5ZW1PZ05NZFlsSUswSGt0ejF5WU4vbVpmK3FqTkJqbWZjCkNnMnlwbGQ0Wi8rUUNQZjl3SkoybFIrY2FnT0R4elBWcGxNSEcybzgvTHFDdnh6elZPUDUxeXdLZEtxaUMwSVEKQ0I5T2wwWW5scE9UNEh1b2hSUzBPOStlMm9KdFZsNUIyczRpbDlhZ3RTVXFxUlU9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"
    nginx.key: "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ2RhaURFZlZsZHdkbFIKd1V5eFpJWmVEZWNuTkFhbWh4d1NpeWF5N1AvOE9ta3NVQ3FCWmNpQ0RzZUh2dGtzbzlCSzhBZi9WemFhWm9zcApnZjYzUlZuZmNmVUlRQUN3WHhHVFhHMXJKVEVGSzhRSHA3VkpMcnpLUC9QOUxZcFlYTE0yYzZ3MmtjZUNmZitrCkU1bEVlNUJVbUNUV09UM3c4S1lPNzFLSWVuNEZJWTZMMDUrc2JGQmd1Z0ExUE5JdWFubm9UTWtlZTRuMG4rTDQKb3NCM01ZUDhtQmtRQlAzeE9JNHl3YjREZXUraURyU2pKSHJzQmlIT05Xc0RadXJFaXVJMmdoY1kxeWIyWHI2UAozVFVOcGNSbC9pVG9zQngxcHJHclk4V09HZVdPeGxZZmcvbWIvNnBuOUYvNWxlQlkrZStjSTlTMkQ0YXBKWUdpCkwxeHZzVWtGQWdNQkFBRUNnZ0VBZFhCK0xkbk8ySElOTGo5bWRsb25IUGlHWWVzZ294RGQwci9hQ1Zkank4dlEKTjIwL3FQWkUxek1yall6Ry9kVGhTMmMwc0QxaTBXSjdwR1lGb0xtdXlWTjltY0FXUTM5SjM0VHZaU2FFSWZWNgo5TE1jUHhNTmFsNjRLMFRVbUFQZytGam9QSFlhUUxLOERLOUtnNXNrSE5pOWNzMlY5ckd6VWlVZWtBL0RBUlBTClI3L2ZjUFBacDRuRWVBZmI3WTk1R1llb1p5V21SU3VKdlNyblBESGtUdW1vVlVWdkxMRHRzaG9reUxiTWVtN3oKMmJzVmpwSW1GTHJqbGtmQXlpNHg0WjJrV3YyMFRrdWtsZU1jaVlMbjk4QWxiRi9DSmRLM3QraTRoMTVlR2ZQegpoTnh3bk9QdlVTaDR2Q0o3c2Q5TmtEUGJvS2JneVVHOXBYamZhRGR2UVFLQmdRRFFLM01nUkhkQ1pKNVFqZWFKClFGdXF4cHdnNzhZTjQyL1NwenlUYmtGcVFoQWtyczJxWGx1MDZBRzhrZzIzQkswaHkzaE9zSGgxcXRVK3NHZVAKOWRERHBsUWV0ODZsY2FlR3hoc0V0L1R6cEdtNGFKSm5oNzVVaTVGZk9QTDhPTm1FZ3MxMVRhUldhNzZxelRyMgphRlpjQ2pWV1g0YnRSTHVwSkgrMjZnY0FhUUtCZ1FEQmxVSUUzTnNVOFBBZEYvL25sQVB5VWs1T3lDdWc3dmVyClUycXlrdXFzYnBkSi9hODViT1JhM05IVmpVM25uRGpHVHBWaE9JeXg5TEFrc2RwZEFjVmxvcG9HODhXYk9lMTAKMUdqbnkySmdDK3JVWUZiRGtpUGx1K09IYnRnOXFYcGJMSHBzUVpsMGhucDBYSFNYVm9CMUliQndnMGEyOFVadApCbFBtWmc2d1BRS0JnRHVIUVV2SDZHYTNDVUsxNFdmOFhIcFFnMU16M2VvWTBPQm5iSDRvZUZKZmcraEppSXlnCm9RN3hqWldVR3BIc3AyblRtcHErQWlSNzdyRVhsdlhtOElVU2FsbkNiRGlKY01Pc29RdFBZNS9NczJMRm5LQTQKaENmL0pWb2FtZm1nZEN0ZGtFMXNINE9MR2lJVHdEbTRpb0dWZGIwMllnbzFyb2htNUpLMUI3MkpBb0dBUW01UQpHNDhXOTVhL0w1eSt5dCsyZ3YvUHM2VnBvMjZlTzRNQ3lJazJVem9ZWE9IYnNkODJkaC8xT2sybGdHZlI2K3VuCnc1YytZUXRSTHlhQmd3MUtpbGhFZDBKTWU3cGpUSVpnQWJ0LzVPbnlDak9OVXN2aDJjS2lrQ1Z2dTZsZlBjNkQKckliT2ZIaHhxV0RZK2Q1TGN1YSt2NzJ0RkxhenJsSlBsRzlOZHhrQ2dZRUF5elIzT3UyMDNRVVV6bUlCRkwzZAp4Wm5XZ0JLSEo3TnNxcGFWb2RjL0d5aGVycjFDZzE2MmJaSjJDV2RsZkI0VEdtUjZZdmxTZEFOOFRwUWhFbUtKCnFBLzVzdHdxNWd0WGVLOVJmMWxXK29xNThRNTBxMmk1NVdUTThoSDZhTjlaMTltZ0FGdE5VdGNqQUx2dFYxdEYKWSs4WFJkSHJaRnBIWll2NWkwVW1VbGc9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K"
  ```
* 使用该文件创建 Secrets
  ``` sh
  # 创建 Secrets
  kubectl apply -f nginxsecrets.yaml
  # 查看 Secrets
  kubectl get secrets
  ```
  输出结果为：
  ```
  NAME                  TYPE                                  DATA      AGE
  default-token-il9rc   kubernetes.io/service-account-token   1         1d
  nginxsecret           Opaque                                2         1m
  ```
* 修改 nginx 部署，使 nginx 使用 Secrets 中的 https 证书，修改 Service，使其暴露 80 端口和 443端口。nginx-secure-app.yaml 文件如下所示：

  ``` yaml {10,11,14,37,45,46}
  apiVersion: v1
  kind: Service
  metadata:
    name: my-nginx
    labels:
      run: my-nginx
  spec:
    type: NodePort
    ports:
    - port: 80
      targetPort: 80
      protocol: TCP
      name: http
    - port: 443
      protocol: TCP
      name: https
    selector:
      run: my-nginx
  ---
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: my-nginx
  spec:
    selector:
      matchLabels:
        run: my-nginx
    replicas: 1
    template:
      metadata:
        labels:
          run: my-nginx
      spec:
        volumes:
        - name: secret-volume
          secret:
            secretName: nginxsecret
        containers:
        - name: nginxhttps
          image: bprashanth/nginxhttps:1.0
          ports:
          - containerPort: 443
          - containerPort: 80
          volumeMounts:
          - mountPath: /etc/nginx/ssl
            name: secret-volume
  ```
  ::: tip 关于 nginx-secure-app.yaml
  * 该文件同时包含了 Deployment 和 Service 的定义
  * nginx server 监听 HTTP 80 端口和 HTTPS 443 端口的请求， nginx Service 同时暴露了这两个端口
  * nginx 容器可以通过 `/etc/nginx/ssl` 访问到 https 证书，https 证书存放在 Secrets 中，且必须在 Pod 创建之前配置好。
  :::

* 执行命令使该文件生效：
  ``` sh
  kubectl delete deployments,svc my-nginx
  kubectl create -f ./nginx-secure-app.yaml
  ```
* 此时，您可以从任何节点访问该 nginx server
  ``` sh
  kubectl get pods -o yaml | grep -i podip
      podIP: 10.244.3.5
  node $ curl -k https://10.244.3.5
  ...
  <h1>Welcome to nginx!</h1>
  ```
  ::: tip curl -k
  * 在 curl 命令中指定 —k 参数，是因为我们在生成 https 证书时，并不知道 Pod 的 IP 地址，因此，在执行 curl 命令时必须忽略 CName 不匹配的错误。
  * 通过创建 Service，我们将 https 证书的 CName 和 Service 的实际 DNS Name 联系起来，因此，我们可以尝试在另一个 Pod 中使用 https 证书的公钥访问 nginx Service。此时，curl 指令不在需要 -k 参数
  :::

* 创建 curlpod.yaml 文件，内容如下：

  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: curl-deployment
  spec:
    selector:
      matchLabels:
        app: curlpod
    replicas: 1
    template:
      metadata:
        labels:
          app: curlpod
      spec:
        volumes:
        - name: secret-volume
          secret:
            secretName: nginxsecret
        containers:
        - name: curlpod
          command:
          - sh
          - -c
          - while true; do sleep 1; done
          image: radial/busyboxplus:curl
          volumeMounts:
          - mountPath: /etc/nginx/ssl
            name: secret-volume
  ```

* 执行命令，完成 curlpod 的部署

  ``` sh
  kubectl apply -f ./curlpod.yaml
  kubectl get pods -l app=curlpod
  ```
  输出结果如下：
  ```
  NAME                               READY     STATUS    RESTARTS   AGE
  curl-deployment-1515033274-1410r   1/1       Running   0          1m
  ```
* 执行 curl，访问 nginx 的 https 端口（请使用您自己的 Pod 名称）
  ```sh
  kubectl exec curl-deployment-1515033274-1410r -- curl https://my-nginx --cacert /etc/nginx/ssl/nginx.crt
  ...
  <title>Welcome to nginx!</title>
  ...
  ```

## 暴露 Service

<SharingBlock>

在您的应用程序中，可能有一部分功能需要通过 Service 发布到一个外部的 IP 地址上。Kubernetes 支持如下两种方式：
* [NodePort](./service-types.html#nodeport)
* [LoadBalancer](./service-types.html#loadbalancer)
  * 需要云环境支持，本文不做过多阐述，如需了解，请参考 [Exposing the Service](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#exposing-the-service)

在上一个章节 [保护 Service 的安全](#保护-service-的安全)  中创建的 Service 已经是 NodePort 类型的了，此时，如果您的节点有公网地址，则 nginx HTTPS 部署已经可以接受来自于互联网的请求了。

执行命令 `kubectl get svc my-nginx -o yaml | grep nodePort -C 5`，输出结果如下：
> 结果中的 `nodePort` 将被标记为红色字体
``` {5,10}
spec:
  clusterIP: 10.0.162.149
  ports:
  - name: http
    nodePort: 31704
    port: 8080
    protocol: TCP
    targetPort: 80
  - name: https
    nodePort: 32453
    port: 443
    protocol: TCP
    targetPort: 443
  selector:
    run: my-nginx
```

假设您的某一节点的公网 IP 地址为 23.251.152.56，则您可以使用任意一台可上网的机器执行命令 `curl https://23.251.152.56:32453 -k`。输出结果为：

```
...
<h1>Welcome to nginx!</h1>
```

::: tip Ingress
* 对于 HTTP、HTTPS 形式的访问推荐使用 Ingress 替代这种用法，参考 [Ingress通过互联网访问您的应用](./ingress.html)
* 对于 TCP、UDP 等形式的访问，您仍然应该使用 Service NodePort
:::

</SharingBlock>
