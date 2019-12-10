---
vssueId: 128
layout: LearningLayout
description: Kubernetes教程_本文档可帮助您诊断部署到Kubernetes中的应用程序所出现的问题。如果仍然解决不了，请加本文末尾的QQ群答疑。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,集群故障,问题诊断,K8S排错
---

# Deployment故障排除图解

<AdSenseTitle/>

<style>
.ts-deployment {
  padding: 0 !important;
  height: unset !important;
  overflow: auto !important;
  overflow-y: auto !important;
  max-width: 630px;
}
.ts-deployment .carousel-caption {
  bottom: 0 !important;
  left: 0;
  right: 0;
  border-radius: 0;
  padding: 0;
}

.ts-deployment img {
  margin-bottom: 60px;
  background: #fff;
  border: solid 1px #eee;
}

.ts-deployment pre {
  border-radius: 0 !important;
  margin: 0 !important;
}

.ts-deployment .carousel-indicators .active {
  background-color: red;
}

.ts-deployment .carousel-indicators li {
  opacity: 1 !important;
}
/* .ts-deployment .carousel-control-prev {
  height: calc(100% - 59px);
}
.ts-deployment .carousel-control-next {
  height: calc(100% - 59px);
} */
.ts-deployment .carousel-control-prev:hover {
  background-color: #aaa;
}
.ts-deployment .carousel-control-next:hover {
  background-color: #aaa;
}
.ts-deployment .carousel-control-prev-icon {
  background-color: #aaa;
  width: 2rem;
  height: 2rem;
}
.ts-deployment .carousel-control-next-icon {
  background-color: #aaa;
  width: 2rem;
  height: 2rem;
}
.ts-deployment .carousel-indicators {
  margin-bottom: 0;
}
</style>

> 原文链接： [A visual guide on troubleshooting Kubernetes deployments](https://learnk8s.io/troubleshooting-deployments)
> 
> 译文链接： [Kubernetes Deployment故障排除图解指南](https://mp.weixin.qq.com/s/Bx1fbyyinzGGTBZbqeM3aQ)

下图可帮助你调试Kubernetes Deployment。[点击此处](https://kuboard.cn/statics/learning/troubleshooting-kubernetes.pdf) 获取该图的PDF版本

![Kubernetes教程_Flow chart to debug deployments in Kubernetes](./deployment.assets/f65ffe9f61de0f4a417f7a05306edd4c.png)

## 背景假设

当你希望在Kubernetes中部署应用程序时，你通常会定义三个组件：

* 一个**Deployment** - 这是一份用于创建你的应用程序的Pod副本的"食谱"；

* 一个**Service** - 一个内部负载均衡器，用于将流量路由到内部的Pod上；

* 一个**Ingress** - 描述如何流量应该如何从集群外部流入到集群内部的你的服务上。

下面让我们用示意图快速总结一下要点。

<b-carousel
  class="ts-deployment"
  id="carousel-1"
  controls
  :interval="5000"
  indicators
  background="#fff"
  img-height="920"
  img-width="690"
  style="text-shadow: 1px 1px 2px #333;"
>
  <!-- Text slides with image -->
  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/5c4ee7aa22c0d5d7b61746cae882aedc.svg">
    在Kubernetes中，你的应用程序通过两层负载均衡器暴露服务：内部的和外部的  
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/616def92e99bcaa69bb2e7bb7768a595.svg">
    内部的负载均衡器称为Service，而外部的负载均衡器称为Ingress    
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/aa7dc4e26be246133054a6603aa07a77.svg">
    Pod不会直接部署。Deployment会负责创建Pod并管理它们
  </b-carousel-slide>

</b-carousel>


假设你要部署一个简单的"HelloWorld"应用，该应用的YAML文件的内容应该类似下面这样：

``` yaml {2,23,34}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels:
    track: canary
spec:
  selector:
    matchLabels:
      any-name: my-app
  template:
    metadata:
      labels:
        any-name: my-app
    spec:
      containers:
      - name: cont1
        image: learnk8s/app:1.0.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    name: app
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - http:
    paths:
    - backend:
        serviceName: app
        servicePort: 80
      path: /
```



这个定义很长，组件之间的相互关系并不容易看出来。

例如：

* 什么时候应使用端口80，又是何时应使用端口8080？
* 你是否应该为每个服务创建一个新端口以免它们相互冲突？
* 标签(label)名重要吗？它们是否在每一处都应该是一样的？

在进行调试之前，让我们回顾一下这三个组件是如何相互关联的。

让我们从Deployment和Service开始。

## 一. 连接Deployment和Service

令人惊讶的消息是，Service和Deployment之间根本没有连接。

事实是：Service直接指向Pod，并完全跳过了Deployment。

因此，你应该注意的是Pod和Service之间的相互关系。

你应该记住三件事：

* Service selector应至少与Pod的一个标签匹配；
* Service的**targetPort**应与Pod中容器的**containerPort**匹配；
* Service的**port**可以是任何数字。多个Service可以使用同一端口号，因为它们被分配了不同的IP地址。

下面的图总结了如何连接端口：

<b-carousel
  class="ts-deployment"
  id="carousel-2"
  controls
  :interval="5000"
  indicators
  background="#fff"
  img-height="920"
  img-width="690"
  style="text-shadow: 1px 1px 2px #333;"
>
  <!-- Text slides with image -->
  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/244048d9100f0468f0fb2cc5d24908b9.svg">
    考虑上面被一个服务暴露的Pod  
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/ba0a5f40770add57a39f48fc1fa68ea9.svg">
    创建Pod时，应为Pod中的每个容器定义containerPort端口   
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/198396281daf41d2b64bf92e39afe5d5.svg">
    当创建一个Service时，你可以定义port和targetPort，但是哪个用来连接容器呢？
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/56f461d209901a168ba9b6aabd56f8a7.svg">
    targetPort和containerPort应该始终保持匹配
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/3e6865f66e7f366feeffaf79a636b397.svg">
    如果容器暴露3000端口(containerPort)，那么targetPort应该匹配这一个端口号
  </b-carousel-slide>

</b-carousel>




再来看看YAML，标签和ports/targetPort应该匹配：

``` yaml {13,14,20,29,30,31}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels:
    track: canary
spec:
  selector:
    matchLabels:
      any-name: my-app
  template:
    metadata:
      labels:
        any-name: my-app
    spec:
      containers:
      - name: cont1
        image: learnk8s/app:1.0.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    any-name: my-app
```


那deployment顶部的**track: canary**标签呢?

它也应该匹配吗？

该标签属于deployment，service的选择器未使用它来路由流量。

换句话说，你可以安全地删除它或为其分配其他值。

那**matchLabels**选择器呢？

**它必须始终与Pod的标签匹配**，并且被Deployment用来跟踪Pod。

假设你已经进行了所有正确的设置，该如何测试它呢？

你可以使用以下命令检查Pod是否具有正确的标签：

``` bash
$ kubectl get pods --show-labels
```

或者，如果你拥有属于多个应用程序的Pod：

``` bash
$ kubectl get pods --selector any-name=my-app --show-labels
```

`any-name=my-app` 就是标签：`any-name: my-app`。

还有问题吗？

你也可以连接到Pod！

你可以使用kubectl中的port-forward命令连接到service并测试连接。

``` bash
$ kubectl port-forward service/<service name> 3000:80
```

* `service/<service name>` 是服务的名称- 在上面的YAML中是“my-service”
* 3000是你希望在计算机上打开的端口
* 80是service通过 `port` 字段暴露的端口

如果可以连接，则说明设置正确。

如果不行，则很可能是你填写了错误的标签或端口不匹配。

## 二. 连接Service和Ingress

参考 [Ingress通过互联网访问您的应用](/learning/k8s-intermediate/service/ingress.html)

接下来是配置Ingress以将你的应用暴露到集群外部。

Ingress必须知道如何检索服务，然后检索Pod并将流量路由给它们。

Ingress按名字和暴露的端口检索正确的服务。

在Ingress和Service中应该匹配两件事：

1. Ingress的 `servicePort` 应该匹配service的 `port`
2. Ingress的 `serviceName` 应该匹配服务的 `name`

下面的图总结了如何连接端口：

<b-carousel
  class="ts-deployment"
  id="carousel-3"
  controls
  :interval="5000"
  indicators
  background="#fff"
  img-height="920"
  img-width="690"
  style="text-shadow: 1px 1px 2px #333;"
>
  <!-- Text slides with image -->
  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/3d0bb4d60860ca4bf934cd8e0f6296bb.svg">
    你已经知道servive暴露一个port  
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/c11fe067be3b340235842f9e43b021b0.svg">
    Ingress有一个字段叫servicePort
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/bc44ba06abef481a6dd6db4562092e52.svg">
    service的port和Ingress的service应该始终保持匹配
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/f198bbe14b7a3f9faed51fa2834557df.svg">
    如果你为service指定的port是80，那么你也应该将ingress的 `servicePort` 改为80
  </b-carousel-slide>

</b-carousel>

实践中，你应该查看以下几行(下面代码中的 `my-service` 和80)：


``` yaml {4,7,21,22}
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    any-name: my-app
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - http:
    paths:
    - backend:
        serviceName: my-service
        servicePort: 80
      path: /
```

你如何测试Ingress是否正常工作呢？

你可以使用与以前相同的策略kubectl port-forward，但是这次你应该连接到Ingress控制器，而不是连接到Service。

首先，使用以下命令检索Ingress控制器的Pod名称：

```bash
$ kubectl get pods --all-namespaces
NAMESPACE   NAME                              READY STATUS
kube-system coredns-5644d7b6d9-jn7cq          1/1   Running
kube-system etcd-minikube                     1/1   Running
kube-system kube-apiserver-minikube           1/1   Running
kube-system kube-controller-manager-minikube  1/1   Running
kube-system kube-proxy-zvf2h                  1/1   Running
kube-system kube-scheduler-minikube           1/1   Running
kube-system nginx-ingress-controller-6fc5bcc  1/1   Running
```

标识Ingress Pod（可能在其他命名空间中）并描述它以检索端口：

```bash
$ kubectl describe pod nginx-ingress-controller-6fc5bcc \
 --namespace kube-system \
 | grep Ports
Ports:         80/TCP, 443/TCP, 18080/TCP
```

最后，连接到Pod：

```bash
$ kubectl port-forward nginx-ingress-controller-6fc5bcc 3000:80 --namespace kube-system
```

此时，每次你访问计算机上的端口3000时，请求都会转发到Ingress控制器Pod上的端口80。

如果访问 http://localhost:3000，则应找到提供网页服务的应用程序。

### 回顾Port

快速回顾一下哪些端口和标签应该匹配：

1. service selector应与Pod的标签匹配
2. service的 `targetPort` 应与Pod中容器的 `containerPort` 匹配
3. service的端口可以是任何数字。多个服务可以使用同一端口，因为它们分配了不同的IP地址。
4. ingress的 `servicePort` 应该匹配 service 的 `port`
5. serivce的名称应与 ingress 中的 `serviceName` 字段匹配

知道如何构造YAML定义只是故事的一部分。

出了问题后该怎么办？

Pod可能无法启动，或者正在崩溃。

## 三. k8s deployment故障排除的步骤

在深入研究失败的deployment之前，我们必须对Kubernetes的工作原理有一个明确定义的思维模型。

由于每个deployment中都有三个组件，因此你应该自下而上依次调试所有组件。

1. 你应该先确保Pods正在运行
2. 然后，专注于让service将流量路由到到正确的Pod
3. 再检查是否正确配置了Ingress

<b-carousel
  class="ts-deployment"
  id="carousel-4"
  controls
  :interval="5000"
  indicators
  background="#fff"
  img-height="920"
  img-width="690"
  style="text-shadow: 1px 1px 2px #333;"
>
  <!-- Text slides with image -->
  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/f1bcc6166f088371a58d7b0b04661908.svg">
    你应该从底部开始对deployment进行故障排除。首先，检查Pod是否已就绪并正在运行。
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/ef0791df2a69439059143c7f54c2a249.svg">
    如果Pod已就绪，则应调查service是否可以将流量分配给Pod。
  </b-carousel-slide>

  <b-carousel-slide
    img-src="/statics/learning/ts/deployment/39a656b37862d1bbd310e175a8a5de47.svg">
    最后，你应该检查service与ingress之间的连接。
  </b-carousel-slide>

</b-carousel>


### 1. Pod故障排除

在大多数情况下，问题出在Pod本身。

你应该确保Pod正在运行并准备就绪。

该如何检查呢？

```bash
$ kubectl get pods
NAME                    READY STATUS            RESTARTS  AGE
app1                    0/1   ImagePullBackOff  0         47h
app2                    0/1   Error             0         47h
app3-76f9fcd46b-xbv4k   1/1   Running  
```

在上述会话中，最后一个Pod处于就绪并正常运行的状态；但是，前两个Pod既不处于Running也不是Ready。

你如何调查出了什么问题？

有四个有用的命令可以对Pod进行故障排除：

1. `kubectl logs <pod name>`有助于检索Pod容器的日志
2. `kubectl describe pod <pod name>` 检索与Pod相关的事件列表
3. `kubectl get pod <pod name>`用于提取存储在Kubernetes中的Pod的YAML定义
4. `kubectl exec -ti <pod name> bash `在Pod的一个容器中运行交互式命令

应该使用哪一个呢？

没有一种万能的。

相反，我们应该结合着使用它们。

#### 常见Pod错误

Pod可能会出现启动和运行时错误。

启动错误包括：

* ImagePullBackoff
* ImageInspectError
* ErrImagePull
* ErrImageNeverPull
* RegistryUnavailable
* InvalidImageName

运行时错误包括：

* CrashLoopBackOff
* RunContainerError
* KillContainerError
* VerifyNonRootError
* RunInitContainerError
* CreatePodSandboxError
* ConfigPodSandboxError
* KillPodSandboxError
* SetupNetworkError
* TeardownNetworkError

有些错误比其他错误更常见。

以下是最常见的错误列表以及如何修复它们的方法。

#### ImagePullBackOff

当Kubernetes无法获取到Pod中某个容器的镜像时，将出现此错误。

共有三个可能的原因：

1. 镜像名称无效-例如，你拼错了名称，或者image不存在
2. 你为image指定了不存在的标签
3. 你尝试检索的image属于一个私有registry，而Kubernetes没有凭据可以访问它

前两种情况可以通过更正image名称和标记来解决。

针对第三种情况，你应该将私有registry的访问凭证通过Secret添加到k8s中并在Pod中引用它。

参考 [使用私有仓库中的docker镜像](/learning/k8s-intermediate/private-registry.html)

#### CrashLoopBackOff

如果容器无法启动，则Kubernetes将显示错误状态为：CrashLoopBackOff。

通常，在以下情况下容器无法启动：

1. 应用程序中存在错误，导致无法启动
2. 你未正确配置容器
3. Liveness探针失败太多次

你应该尝试从该容器中检索日志以调查其失败的原因。

如果由于容器重新启动太快而看不到日志，则可以使用以下命令：

```bash
$ kubectl logs <pod-name> --previous
```

这个命令打印前一个容器的错误消息。

#### RunContainerError

当容器无法启动时，出现此错误。

甚至在容器内的应用程序启动之前。

该问题通常是由于配置错误，例如：

* 挂载不存在的卷，例如ConfigMap或Secrets
* 将只读卷安装为可读写

你应该使用 `kubectl describe pod <pod-name>`命令收集和分析错误。

#### 处于Pending状态的Pod

当创建Pod时，该Pod保持Pending状态。

为什么？

假设你的调度程序组件运行良好，可能的原因如下：

1. 集群没有足够的资源（例如CPU和内存）来运行Pod
2. 当前的命名空间具有ResourceQuota对象，创建Pod将使命名空间超过配额
3. 该Pod绑定到一个处于pending状态的 PersistentVolumeClaim

最好的选择是检查kubectl describe命令输出的“事件”部分内容：

```bash
$ kubectl describe pod <pod name>
```

对于因ResourceQuotas而导致的错误，可以使用以下方法检查集群的日志：

```bash
$ kubectl get events --sort-by=.metadata.creationTimestamp
```

#### 处于未就绪状态的Pod

如果Pod正在运行但未就绪(not ready)，则表示readiness就绪探针失败。

当“就绪”探针失败时，Pod未连接到服务，并且没有流量转发到该实例。

就绪探针失败是应用程序的特定错误，因此你应检查 `kubectl describe` 中的 ***Events*** 部分以识别错误。

### 2. 服务的故障排除

如果你的Pod正在运行并处于就绪状态，但仍无法收到应用程序的响应，则应检查服务的配置是否正确。

service旨在根据流量的标签将流量路由到Pod。

因此，你应该检查的第一件事是服务关联了多少个Pod。

你可以通过检查服务中的端点(endpoint)来做到这一点：

```bash
$ kubectl describe service <service-name> | grep Endpoints
```

端点是一对，并且在服务（至少）以Pod为目标时，应该至少有一个端点。

如果“端点”部分为空，则有两种解释：

1. 你没有运行带有正确标签的Pod（提示：你应检查自己是否在正确的命名空间中）
2. service的 `selector` 标签上有拼写错误

如果你看到端点列表，但仍然无法访问你的应用程序，则 `targetPort` 可能是你服务中的罪魁祸首。

你如何测试服务？

无论服务类型如何，你都可以使用 `kubectl port-forward` 来连接它：

```bash
$ kubectl port-forward service/<service-name> 3000:80
```

这里：

* `<service-name>` 是服务的名称
* `3000` 是你希望在计算机上打开的端口
* `80` 是服务公开的端口

### 3.Ingress的故障排除

如果你已到达本节，则：

* Pod正在运行并准备就绪
* 服务会将流量分配到Pod

但是你仍然看不到应用程序的响应。

这意味着最有可能是Ingress配置错误。

由于正在使用的Ingress控制器是集群中的第三方组件，因此有不同的调试技术，具体取决于Ingress控制器的类型。

但是在深入研究Ingress专用工具之前，你可以用一些简单的方法进行检查。

Ingress使用 `serviceName` 和 `servicePort` 连接到服务。

你应该检查这些配置是否正确。

你可以通过下面命令检查Ingress配置是否正确：

```bash
$ kubectl describe ingress <ingress-name>
```

如果backend一列为空，则配置中必然有一个错误。

如果你可以在“backend”列中看到端点，但是仍然无法访问该应用程序，则可能是以下问题：

* 你如何将Ingress暴露于公共互联网
* 你如何将集群暴露于公共互联网

你可以通过直接连接到Ingress Pod来将基础结构问题与Ingress隔离开。

首先，获取你的Ingress控制器Pod（可以位于其他名称空间中）：

```bash
$ kubectl get pods --all-namespaces
NAMESPACE   NAME                              READY STATUS
kube-system coredns-5644d7b6d9-jn7cq          1/1   Running
kube-system etcd-minikube                     1/1   Running
kube-system kube-apiserver-minikube           1/1   Running
kube-system kube-controller-manager-minikube  1/1   Running
kube-system kube-proxy-zvf2h                  1/1   Running
kube-system kube-scheduler-minikube           1/1   Running
kube-system nginx-ingress-controller-6fc5bcc  1/1   Running
```

执行 `kubectl describe pod` 以检索端口：

```bash
$ kubectl describe pod nginx-ingress-controller-6fc5bcc --namespace kube-system \ | grep Ports
```

最后，连接到Pod：

```bash
$ kubectl port-forward nginx-ingress-controller-6fc5bcc 3000:80 --namespace kube-system
```

此时，每次你访问计算机上的端口3000时，请求都会转发到Pod上的端口80。

现在可以用吗？

* 如果可行，则问题出在基础架构中。你应该调查流量如何路由到你的集群。
* 如果不起作用，则问题出在Ingress控制器中。你应该调试Ingress。

如果仍然无法使Ingress控制器正常工作，则应开始对其进行调试。

目前有许多不同版本的Ingress控制器。

热门选项包括Nginx，HAProxy，Traefik等。

你应该查阅Ingress控制器的文档以查找故障排除指南。

由于 [Ingress Nginx](https://github.com/kubernetes/ingress-nginx) 是使用比较多的的Ingress控制器之一，因此在下一部分中我们将介绍一些有关调试ingress-nginx的技巧。

> 如果参考 kuboard.cn 上的 Kubernetes 安装文档，您安装的 Ingress 控制器是 [nginx ingress](https://github.com/nginxinc/kubernetes-ingress/blob/v1.5.3/docs/installation.md)，和 [Ingress Nginx](https://github.com/kubernetes/ingress-nginx) 并非是同一个东西

#### 调试Ingress Nginx

Ingress-nginx 项目有一个 kubectl 的[官方插件](https://kubernetes.github.io/ingress-nginx/kubectl-plugin/)。

你可以用kubectl ingress-nginx来：

* 检查日志，后端，证书等
* 连接到ingress
* 检查当前配置

你应该尝试的三个命令是：

* `kubectl ingress-nginx lint`，它会检查 `nginx.conf` 
* `kubectl ingress-nginx backend`，以检查后端（类似于 `kubectl describe ingress <ingress-name>` ）
* `kubectl ingress-nginx logs`，查看日志

> 请注意，你可能需要为Ingress控制器指定正确的名称空间 `--namespace <name>`。

## 四. 总结

如果你不知道从哪里开始，那么在Kubernetes中进行故障排除可能是一项艰巨的任务。

你应该始终牢记从下至上解决问题：从Pod开始，然后通过Service和Ingress向上移动堆栈。

你在本文中了解到的调试技术也可以应用于其他对象，例如：

* failing Job和CronJob
* StatefulSets和DaemonSets
