---
vssueId: 30
layout: LearningLayout
description: Kubernetes教程_本文描述了如何诊断初始化容器InitContainer在执行过程中的问题_本文中的命令行使用<pod-name>来指代Pod的名称_使用<init-container-1>和<init-container-2>来指代初始化容器的名称
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,init container,初始化容器,initialize container
---

# 延伸阅读_可观测性：你的应用健康吗？


<AdSenseTitle>

> 本文转载自云栖社区：[从零开始入门 K8s | 可观测性：你的应用健康吗？](https://yq.aliyun.com/articles/720438)
> 
> 作者 | 莫源 阿里巴巴技术专家

</AdSenseTitle>


## **一、需求来源**

首先来看一下，整个需求的来源：当把应用迁移到 Kubernetes 之后，要如何去保障应用的健康与稳定呢？其实很简单，可以从两个方面来进行增强：

1. 首先是提高应用的可观测性；
2. 第二是提高应用的可恢复能力。

从可观测性上来讲，可以在三个方面来去做增强：

1. 首先是应用的健康状态上面，可以实时地进行观测；
2. 第二个是可以获取应用的资源使用情况；
3. 第三个是可以拿到应用的实时日志，进行问题的诊断与分析。

当出现了问题之后，首先要做的事情是要降低影响的范围，进行问题的调试与诊断。最后当出现问题的时候，理想的状况是：可以通过和 K8s 集成的自愈机制进行完整的恢复。

## **二、Liveness 与 Readiness**

本小节为大家介绍 Liveness probe 和 eadiness probe。

### 应用健康状态-初识 Liveness 与 Readiness

Liveness probe 也叫就绪指针，用来判断一个 pod 是否处在就绪状态。当一个 pod 处在就绪状态的时候，它才能够对外提供相应的服务，也就是说接入层的流量才能打到相应的 pod。当这个 pod 不处在就绪状态的时候，接入层会把相应的流量从这个 pod 上面进行摘除。

来看一下简单的一个例子：

如下图其实就是一个 Readiness 就绪的一个例子：

![1](./pod-health.assets/7972a7447a196a56fc78ede6a4fe04b0161e045c.png)

当这个 pod 指针判断一直处在失败状态的时候，其实接入层的流量不会打到现在这个 pod 上。

![2](./pod-health.assets/60fa8a8d01be4ff371946d1bd3f079161b0d4457.png)

当这个 pod 的状态从 FAIL 的状态转换成 success 的状态时，它才能够真实地承载这个流量。
 
Liveness 指针也是类似的，它是存活指针，用来判断一个 pod 是否处在存活状态。当一个 pod 处在不存活状态的时候，会出现什么事情呢？

![3](./pod-health.assets/df9778d1f6cd3f619681dcae4430f680ab3330f9.png)

这个时候会由上层的判断机制来判断这个 pod 是否需要被重新拉起。那如果上层配置的重启策略是 restart always 的话，那么此时这个 pod 会直接被重新拉起。

### 应用健康状态-使用方式

接下来看一下 Liveness 指针和 Readiness 指针的具体的用法。

#### 探测方式

Liveness 指针和 Readiness 指针支持三种不同的探测方式：

1. 第一种是 httpGet。它是通过发送 http Get 请求来进行判断的，当返回码是 200-399 之间的状态码时，标识这个应用是健康的；
2. 第二种探测方式是 Exec。它是通过执行容器中的一个命令来判断当前的服务是否是正常的，当命令行的返回结果是 0，则标识容器是健康的；
3. 第三种探测方式是 tcpSocket 。它是通过探测容器的 IP 和 Port 进行 TCP 健康检查，如果这个 TCP 的链接能够正常被建立，那么标识当前这个容器是健康的。

#### 探测结果

从探测结果来讲主要分为三种：

- 第一种是 success，当状态是 success 的时候，表示 container 通过了健康检查，也就是 Liveness probe 或 Readiness probe 是正常的一个状态；
- 第二种是 Failure，Failure 表示的是这个 container 没有通过健康检查，如果没有通过健康检查的话，那么此时就会进行相应的一个处理，那在 Readiness 处理的一个方式就是通过 service。service 层将没有通过 Readiness 的 pod 进行摘除，而 Liveness 就是将这个 pod 进行重新拉起，或者是删除。
- 第三种状态是 Unknown，Unknown 是表示说当前的执行的机制没有进行完整的一个执行，可能是因为类似像超时或者像一些脚本没有及时返回，那么此时 Readiness-probe 或 Liveness-probe 会不做任何的一个操作，会等待下一次的机制来进行检验。

那在 kubelet 里面有一个叫 ProbeManager 的组件，这个组件里面会包含 Liveness-probe 或 Readiness-probe，这两个 probe 会将相应的 Liveness 诊断和 Readiness 诊断作用在 pod 之上，来实现一个具体的判断。

### 应用健康状态-Pod Probe Spec

下面介绍这三种方式不同的检测方式的一个 yaml 文件的使用。

首先先看一下 exec，exec 的使用其实非常简单。如下图所示，大家可以看到这是一个 Liveness probe，它里面配置了一个 exec 的一个诊断。接下来，它又配置了一个 command 的字段，这个 command 字段里面通过 cat 一个具体的文件来判断当前 Liveness probe 的状态，当这个文件里面返回的结果是 0 时，或者说这个命令返回是 0 时，它会认为此时这个 pod 是处在健康的一个状态。

![4](./pod-health.assets/1936763b70d81b10f9e14c2f612819ed19865cf6.png)

那再来看一下这个 httpGet，httpGet 里面有一个字段是路径，第二个字段是 port，第三个是 headers。这个地方有时需要通过类似像 header 头的一个机制做 health 的一个判断时，需要配置这个 header，通常情况下，可能只需要通过 health 和 port 的方式就可以了。

![5](./pod-health.assets/f1053686bdb48dc98171a06351be4d5f139218b1.png)

第三种是 tcpSocket，tcpSocket 的使用方式其实也比较简单，你只需要设置一个检测的端口，像这个例子里面使用的是 8080 端口，当这个 8080 端口 tcp connect 审核正常被建立的时候，那 tecSocket，Probe 会认为是健康的一个状态。

![6](./pod-health.assets/7f2a4c83600974bf9e6c7007c848e3eaad3b239d.png)

此外还有如下的五个参数，是 Global 的参数。

- 第一个参数叫 initialDelaySeconds，它表示的是说这个 pod 启动延迟多久进行一次检查，比如说现在有一个 Java 的应用，它启动的时间可能会比较长，因为涉及到 jvm 的启动，包括 Java 自身 jar 的加载。所以前期，可能有一段时间是没有办法被检测的，而这个时间又是可预期的，那这时可能要设置一下 initialDelaySeconds；

 

- 第二个是 periodSeconds，它表示的是检测的时间间隔，正常默认的这个值是 10 秒；

 

- 第三个字段是 timeoutSeconds，它表示的是检测的超时时间，当超时时间之内没有检测成功，那它会认为是失败的一个状态；

 

- 第四个是 successThreshold，它表示的是：当这个 pod 从探测失败到再一次判断探测成功，所需要的阈值次数，默认情况下是 1 次，表示原本是失败的，那接下来探测这一次成功了，就会认为这个 pod 是处在一个探针状态正常的一个状态；

 

- 最后一个参数是 failureThreshold，它表示的是探测失败的重试次数，默认值是 3，表示的是当从一个健康的状态连续探测 3 次失败，那此时会判断当前这个pod的状态处在一个失败的状态。

### 应用健康状态-Liveness 与 Readiness 总结

接下来对 Liveness 指针和 Readiness 指针进行一个简单的总结。

<p style="max-width: 720px;">
  <img src="./pod-health.assets/35933da46310f1becb0fe2c6335968a8aecce931.png" alt="Liveness与Readiness的使用场景"></img>
</p>

#### 介绍

Liveness 指针是存活指针，它用来判断容器是否存活、判断 pod 是否 running。如果 Liveness 指针判断容器不健康，此时会通过 kubelet 杀掉相应的 pod，并根据重启策略来判断是否重启这个容器。如果默认不配置 Liveness 指针，则默认情况下认为它这个探测默认返回是成功的。

Readiness 指针用来判断这个容器是否启动完成，即 pod 的 condition 是否 ready。如果探测的一个结果是不成功，那么此时它会从 pod 上 Endpoint 上移除，也就是说从接入层上面会把前一个 pod 进行摘除，直到下一次判断成功，这个 pod 才会再次挂到相应的 endpoint 之上。

#### 检测失败

对于检测失败上面来讲 Liveness 指针是直接杀掉这个 pod，而 Readiness 指针是切掉 endpoint 到这个 pod 之间的关联关系，也就是说它把这个流量从这个 pod 上面进行切掉。

#### 适用场景

Liveness 指针适用场景是支持那些可以重新拉起的应用，而 Readiness 指针主要应对的是启动之后无法立即对外提供服务的这些应用。

#### 注意事项

在使用 Liveness 指针和 Readiness 指针的时候有一些注意事项。因为不论是 Liveness 指针还是 Readiness 指针都需要配置合适的探测方式，以免被误操作。

- 第一个是调大超时的阈值，因为在容器里面执行一个 shell 脚本，它的执行时长是非常长的，平时在一台 ecs 或者在一台 vm 上执行，可能 3 秒钟返回的一个脚本在容器里面需要 30 秒钟。所以这个时间是需要在容器里面事先进行一个判断的，那如果可以调大超时阈值的方式，来防止由于容器压力比较大的时候出现偶发的超时；
- 第二个是调整判断的一个次数，3 次的默认值其实在比较短周期的判断周期之下，不一定是最佳实践，适当调整一下判断的次数也是一个比较好的方式；
- 第三个是 exec，如果是使用 shell 脚本的这个判断，调用时间会比较长，比较建议大家可以使用类似像一些编译性的脚本 Golang 或者一些 C 语言、C++ 编译出来的这个二进制的 binary 进行判断，那这种通常会比 shell 脚本的执行效率高 30% 到 50%；
- 第四个是如果使用 tcpSocket 方式进行判断的时候，如果遇到了 TLS 的服务，那可能会造成后边 TLS 里面有很多这种未健全的 tcp connection，那这个时候需要自己对业务场景上来判断，这种的链接是否会对业务造成影响。

 

## **三、问题诊断**

接下来给大家讲解一下在 K8s 中常见的问题诊断。

### 应用故障排查-了解状态机制

首先要了解一下 K8s 中的一个设计理念，就是这个状态机制。因为 K8S 的设计是面向状态机的，它里面通过 yaml 的方式来定义的是一个期望到达的一个状态，而真正这个 yaml 在执行过程中会由各种各样的 controller来负责整体的状态之间的一个转换。

<p style="max-width: 420px;">
  <img src="./pod-health.assets/fd5234589b3e19eed61ce07381ef27e5de8f1123.png" alt="K8S培训_了解Pod的状态机制"></img>
</p>

| Phase  | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| Pending      | Kubernetes 已经创建并确认该 Pod。此时可能有两种情况：<li>Pod 还未完成调度（例如没有合适的节点）</li><li>正在从 docker registry 下载镜像</li> |
| Running      | 该 Pod 已经被绑定到一个节点，并且该 Pod 所有的容器都已经成功创建。其中至少有一个容器正在运行，或者正在启动/重启 |
| Succeeded    | Pod 中的所有容器都已经成功终止，并且不会再被重启             |
| Failed       | Pod 中的所有容器都已经终止，至少一个容器终止于失败状态：容器的进程退出码不是 0，或者被系统 kill |
| Unknown      | 因为某些未知原因，不能确定 Pod 的状态，通常的原因是 master 与 Pod 所在节点之间的通信故障 |

比如说上面的图，实际上是一个 Pod 的一个生命周期。刚开始它处在一个 pending 的状态，那接下来可能会转换到类似像 running，也可能转换到 Unknown，甚至可以转换到 failed。然后，当 running 执行了一段时间之后，它可以转换到类似像 successded 或者是 failed，然后当出现在 unknown 这个状态时，可能由于一些状态的恢复，它会重新恢复到 running 或者 successded 或者是 failed 。

其实 K8s 整体的一个状态就是基于这种类似像状态机的一个机制进行转换的，而不同状态之间的转化都会在相应的 K8s对象上面留下来类似像 Status 或者像 Conditions 的一些字段来进行表示。

像下面这张图其实表示的就是说在一个 Pod 上面一些状态位的一些展现。

![10](./pod-health.assets/768d5e626e634388552b425b6a839d654e8803b6.png)

比如说在 Pod 上面有一个字段叫 Status，这个 Status 表示的是 Pod 的一个聚合状态，在这个里面，这个聚合状态处在一个 pending 状态。

然后再往下看，因为一个 pod 里面有多个 container，每个 container 上面又会有一个字段叫 State，然后 State 的状态表示当前这个 container 的一个聚合状态。那在这个例子里面，这个聚合状态处在的是 waiting 的状态，那具体的原因是因为什么呢？是因为它的镜像没有拉下来，所以处在 waiting 的状态，是在等待这个镜像拉取。然后这个 ready 的部分呢，目前是 false，因为它这个进行目前没有拉取下来，所以这个 pod 不能够正常对外服务，所以此时 ready 的状态是未知的，定义为 false。如果上层的 endpoint 发现底层这个 ready 不是 true 的话，那么此时这个服务是没有办法对外服务的。

再往下是 condition，condition 这个机制表示是说：在 K8s 里面有很多这种比较小的这个状态，而这个状态之间的聚合会变成上层的这个 Status。那在这个例子里面有几个状态，第一个是 Initialized，表示是不是已经初始化完成？那在这个例子里面已经是初始化完成的，那它走的是第二个阶段，是在这个 ready 的状态。因为上面几个 container 没有拉取下来相应的镜像，所以 ready 的状态是 false。

然后再往下可以看到这个 container 是否 ready，这里可以看到是 false，而这个状态是 PodScheduled，表示说当前这个 pod 是否是处在一个已经被调度的状态，它已经 bound 在现在这个 node 之上了，所以这个状态也是 true。

那可以通过相应的 condition 是 true 还是 false 来判断整体上方的这个状态是否是正常的一个状态。而在 K8s 里面不同的状态之间的这个转换都会发生相应的事件，而事件分为两种： 一种叫做 normal 的事件，一种是 warning 事件。大家可以看见在这第一条的事件是有个 normal 事件，然后它相应的 reason 是 scheduler，表示说这个 pod 已经被默认的调度器调度到相应的一个节点之上，然后这个节点是 cn-beijing192.168.3.167 这个节点之上。

再接下来，又是一个 normal 的事件，表示说当前的这个镜像在 pull 相应的这个 image。然后再往下是一个 warning 事件，这个 warning 事件表示说 pull 这个镜像失败了。

以此类推，这个地方表示的一个状态就是说在 K8s 里面这个状态机制之间这个状态转换会产生相应的事件，而这个事件又通过类似像 normal 或者是 warning 的方式进行暴露。开发者可以通过类似像通过这个事件的机制，可以通过上层 condition Status 相应的一系列的这个字段来判断当前这个应用的具体的状态以及进行一系列的诊断。

### 应用故障排查-常见应用异常

本小节介绍一下常见应用的一些异常。首先是 pod 上面，pod 上面可能会停留几个常见的状态。

#### Pod 停留在 Pending

第一个就是 pending 状态，pending 表示调度器没有进行介入。此时可以通过 kubectl describe pod 来查看相应的事件，如果由于资源或者说端口占用，或者是由于 node selector 造成 pod 无法调度的时候，可以在相应的事件里面看到相应的结果，这个结果里面会表示说有多少个不满足的 node，有多少是因为 CPU 不满足，有多少是由于 node 不满足，有多少是由于 tag 打标造成的不满足。

#### Pod 停留在 waiting

那第二个状态就是 pod 可能会停留在 waiting 的状态，pod 的 states 处在 waiting 的时候，通常表示说这个 pod 的镜像没有正常拉取，原因可能是由于这个镜像是私有镜像，但是没有配置 Pod secret；那第二种是说可能由于这个镜像地址是不存在的，造成这个镜像拉取不下来；还有一个是说这个镜像可能是一个公网的镜像，造成镜像的拉取失败。

#### Pod 不断被拉取并且可以看到 crashing

第三种是 pod 不断被拉起，而且可以看到类似像 backoff 。这个通常表示说 pod 已经被调度完成了，但是启动失败，那这个时候通常要关注的应该是这个应用自身的一个状态，并不是说配置是否正确、权限是否正确，此时需要查看的应该是 pod 的具体日志。

#### Pod 处在 Runing 但是没有正常工作

第四种 pod 处在 running 状态，但是没有正常对外服务。那此时比较常见的一个点就可能是由于一些非常细碎的配置，类似像有一些字段可能拼写错误，造成了 yaml 下发下去了，但是有一段没有正常地生效，从而使得这个 pod 处在 running 的状态没有对外服务，那此时可以通过 apply-validate-f pod.yaml 的方式来进行判断当前 yaml 是否是正常的，如果 yaml 没有问题，那么接下来可能要诊断配置的端口是否是正常的，以及 Liveness 或 Readiness 是否已经配置正确。

#### Service 无法正常的工作

最后一种就是 service 无法正常工作的时候，该怎么去判断呢？那比较常见的 service 出现问题的时候，是自己的使用上面出现了问题。因为 service 和底层的 pod 之间的关联关系是通过 selector 的方式来匹配的，也就是说 pod 上面配置了一些 label，然后 service 通过 match label 的方式和这个 pod 进行相互关联。如果这个 label 配置的有问题，可能会造成这个 service 无法找到后面的 endpoint，从而造成相应的 service 没有办法对外提供服务，那如果 service 出现异常的时候，第一个要看的是这个 service 后面是不是有一个真正的 endpoint，其次来看这个 endpoint 是否可以对外提供正常的服务。

## **四、应用远程调试**

本节讲解的是在 K8s 里面如何进行应用的远程调试，远程调试主要分为 pod 的远程调试以及 service 的远程调试。还有就是针对一些性能优化的远程调试。

### 应用远程调试 - Pod 远程调试

在集群中的应用出现问题是，可通过 `kubectl exec` 进入容器命令行终端进行问题诊断：

```sh
# Pod 中只有一个容器时
kubectl exec -it pod-name /bin/bash

# Pod中有多个容器时
kubectl exec -it pod-name -c container-name /bin/bash
```

比如说可以通过 exec 的方式进入一个 pod。像这条命令里面，通过 kubectl exec-it pod-name 后面再填写一个相应的命令，比如说 /bin/bash，表示希望到这个 pod 里面进入一个交互式的一个 bash。然后在 bash 里面可以做一些相应的命令，比如说修改一些配置，通过 supervisor 去重新拉起这个应用，都是可以的。

那如果指定这一个 pod 里面可能包含着多个 container，这个时候该怎么办呢？怎么通过 pod 来指定 container 呢？其实这个时候有一个参数叫做 -c，如上面第二条命令所示。-c 后面是一个 container-name，可以通过 pod 在指定 -c 到这个 container-name，具体指定要进入哪个 container，后面再跟上相应的具体的命令，通过这种方式来实现一个多容器的命令的一个进入，从而实现多容器的一个远程调试。

### 应用远程调试 - Servic 远程调试

那么 service 的远程调试该怎么做呢？service 的远程调试其实分为两个部分：

- 第一个部分是说我想将一个服务暴露到远程的一个集群之内，让远程集群内的一些应用来去调用本地的一个服务，这是一条反向的一个链路；
- 还有一种方式是我想让这个本地服务能够去调远程的服务，那么这是一条正向的链路。

在反向列入上面有这样一个开源组件，叫做 [Telepresence](https://www.telepresence.io/) ，它可以将本地的应用代理到远程集群中的一个 service 上面，使用它的方式如下所示：

``` sh
telepresence --swap-deployment $Deployment_Name
```

首先将 [Telepresence](https://www.telepresence.io/) 的一个 Proxy 应用部署到远程的 K8s 集群里面。然后将远程单一个 deployment swap 到本地的一个 application，使用的命令就是 Telepresence-swap-deployment 然后以及远程的 DEPLOYMENT_NAME。通过这种方式就可以将本地一个 application 代理到远程的 service 之上、可以将应用在远程集群里面进行本地调试，这个有兴趣的同学可以到 GitHub 上面来看一下这个插件的使用的方式。

第二个是如果本地应用需要调用远程集群的服务时候，可以通过 port-forward 的方式将远程的应用调用到本地的端口之上。比如说现在远程的里面有一个 API server，这个 API server 提供了一些端口，本地在调试 Code 时候，想要直接调用这个 API server，那么这时，比较简单的一个方式就是通过 port-forward 的方式，详细请参考[使用port-forward访问集群中的应用程序](/learning/k8s-practice/access/port-forward.html)。例如：

```sh
kubectl port-forward svc/app -n app-namespace
```

它的使用方式是 kubectl port-forward，然后 service 加上远程的 service name，再加上相应的 namespace，后面还可以加上一些额外的参数，比如说端口的一个映射，通过这种机制就可以把远程的一个应用代理到本地的端口之上，此时通过访问本地端口就可以访问远程的服务。

### 开源的调试工具 - kubectl-debug

最后再给大家介绍一个开源的调试工具，它也是 kubectl 的一个插件，叫 kubectl-debug。我们知道在 K8s 里面，底层的容器 runtime 比较常见的就是类似像 docker 或者是 containerd，不论是 docker 还是 containerd，它们使用的一个机制都是基于 Linux namespace 的一个方式进行虚拟化和隔离的。

通常情况下 ，并不会在镜像里面带特别多的调试工具，类似像 netstat telnet 等等这些 ，因为这个会造成应用整体非常冗余。那么如果想要调试的时候该怎么做呢？其实这个时候就可以依赖类似于像 kubectl-debug 这样一个工具。
 
kubectl-debug 这个工具是依赖于 Linux namespace 的方式来去做的，它可以 datash 一个 Linux namespace 到一个额外的 container，然后在这个 container 里面执行任何的 debug 动作，其实和直接去 debug 这个 Linux namespace 是一致的。这里有一个简单的操作，给大家来介绍一下：

这个地方其实已经安装好了 kubectl-debug，它是 kubectl 的一个插件。所以这个时候，你可以直接通过 kubectl-debug 这条命令来去诊断远程的一个 pod。像这个例子里面，当执行 debug 的时候，实际上它首先会先拉取一些镜像，这个镜像里面实际上会默认带一些诊断的工具。当这个镜像启用的时候，它会把这个 debug container 进行启动。与此同时会把这个 container 和相应的你要诊断的这个 container 的 namespace 进行挂靠，也就说此时这个 container 和你是同 namespace 的，类似像网络站，或者是类似像内核的一些参数，其实都可以在这个 debug container 里面实时地进行查看。

![14](./pod-health.assets/85a3855e2c0f7af4dd3f9b88a46dae84ab25e44d.png)

像这个例子里面，去查看类似像 hostname、进程、netstat 等等，这些其实都是和这个需要 debug 的 pod 是在同一个环境里面的，所以你之前这三条命令可以看到里面相关的信息。

![15](./pod-health.assets/8c21671a44b1e50ca4459f8d3596397e508c28d5.png)

如果此时进行 logout 的话，相当于会把相应的这个 debug pod 杀掉，然后进行退出，此时对应用实际上是没有任何的影响的。那么通过这种方式可以不介入到容器里面，就可以实现相应的一个诊断。

![16](./pod-health.assets/034bf3b212387ffbce7284ff59339d4d330121ef.png)

此外它还支持额外的一些机制，比如说我给设定一些 image，然后类似像这里面安装了的是 htop，然后开发者可以通过这个机制来定义自己需要的这个命令行的工具，并且通过这种 image 的方式设置进来。那么这个时候就可以通过这种机制来调试远程的一个 pod。

## 总结

- 关于 Liveness 和 Readiness 的指针。Liveness probe 就是保活指针，它是用来看 pod 是否存活的，而 Readiness probe 是就绪指针，它是判断这个 pod 是否就绪的，如果就绪了，就可以对外提供服务。这个就是 Liveness 和 Readiness 需要记住的部分；
- 应用诊断的三个步骤：首先 describe 相应的一个状态；然后提供状态来排查具体的一个诊断方向；最后来查看相应对象的一个 event 获取更详细的一个信息；
- 提供 pod 一个日志来定位应用的自身的一个状态；
- 远程调试的一个策略，如果想把本地的应用代理到远程集群，此时可以通过 Telepresence 这样的工具来实现，如果想把远程的应用代理到本地，然后在本地进行调用或者是调试，可以用类似像 port-forward 这种机制来实现。
