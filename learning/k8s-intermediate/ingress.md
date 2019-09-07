---
layout: LearningLayout
description: 本文介绍 Kubernetes Ingress 的概念，包括Ingress 基本概念、如何配置 Ingress Controller、如何使用 kubectl/Kuboard 操作 Ingress 信息
---

# 通过互联网访问您的应用

参考文档：
* Kubernetes 官网 [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
* Kubernetes 官网 [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
* Kubernetes Nginx Ingress Controller [Bare-metal considerations](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/)
* nginxinc/kubernets-ingress [kubernetes-ingress](https://github.com/nginxinc/kubernetes-ingress)

## Ingress

Ingress 是 Kubernetes 的一种 API 对象，将集群内部的 Service 通过 HTTP/HTTPS 方式暴露到集群外部，并通过规则定义 HTTP/HTTPS 的路由。Ingress 具备如下特性：集群外部可访问的 URL、负载均衡、SSL Termination、按域名路由（name-based virtual hosting）。

Ingress Controller （通常需要负载均衡器配合）负责实现 Ingress API 对象所声明的能力。如下图所示：

* Ingress Controller 监听所有 worker 节点上的 80/443 端口
* Ingress Controller 将所有对域名为 a.kuboard.cn 的 HTTP/HTTPS 请求路由到 Service B 的 9080 端口
* Service B 将请求进一步转发到其标签所选择的 Pod 容器组（通过 targetPort 指定容器组上的端口号）

在下图的 Ingress B 及 Service B 被正确配置的情况下，您将获得如下效果：
* 将 a.kuboard.cn 解析到任意一个 worker 节点的外网 IP 地址（也可以是内网 IP 地址，但此时您的客户端机器也必须在内网）
* 从客户端机器执行命令 `curl http://a.kuboard.cn` 您将获得如下容器组当中一个的返回结果： 10.10.10.2、10.10.10.4、10.10.10.3 

<img src="./ingress.assets/image-20190827183054487.png" style="border: 1px solid #d7dae2; max-width: 720px;"></img>



## Ingress Controller

如上所述，您必须在 Kubernetes 集群中安装了 Ingress Controller，您配置的 Ingress 才能生效。

::: tip 划重点

Ingress 只是 Kubernetes 中的一种配置信息；Ingress Controller 才是监听 80/443 端口，并根据 Ingress 上配置的路由信息执行 HTTP 路由转发的组件。

:::

Ingress Controller 有多种实现可供选择，请参考 Kubernetes 官方文档 [Additional controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#additional-controllers)，比较常用的有 [Traefic](https://github.com/containous/traefik) 、 [Nginx Ingress Controller for Kubernetes](https://www.nginx.com/products/nginx/kubernetes-ingress-controller) 等。

如果您参考 https://kuboard.cn 网站上提供的文档安装了 Kubernetes，您应该已经完成了 [Nginx Ingress Controller for Kubernetes](https://www.nginx.com/products/nginx/kubernetes-ingress-controller) 在您 Kubernetes 集群中的安装。该 Ingress Controller 以 DaemonSet 的类型部署到 Kubernetes，且监听了 hostPort 80/443，YAML 片段如下所示：

> 如果您打算使用其他 Ingress Controller，您可以 [卸载 Nginx Ingress Controller](/install/install-k8s.html#安装-ingress-controller)；如果您尚未安装任何 Ingress Controller，请参考 [安装 Nginx Ingress Controller](/install/install-k8s.html#安装-ingress-controller)，以便可以完成本教程的后续内容。


``` yaml {2,23,26}
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: nginx-ingress
  namespace: nginx-ingress
	# ...
spec:
  selector:
    matchLabels:
      app: nginx-ingress
  template:
    metadata:
      labels:
        app: nginx-ingress
    spec:
      serviceAccountName: nginx-ingress
      containers:
      - image: nginx/nginx-ingress:1.5.3
        name: nginx-ingress
        ports:
        - name: http
          containerPort: 80
          hostPort: 80
        - name: https
          containerPort: 443
          hostPort: 443
```


::: tip

* Ingress Controller 并非只能监听 80/443 端口，您可以根据自己网络拓扑的需要，选择合适的端口
* 根据您安装 Ingress Controller 的方式不同，您的 Ingress Controller 并不一定监听了所有 worker 节点的 80/443 端口（本教程不涉及此主题）
* 您也可以在 Kubernetes 集群中安装多种 Ingress Controller，请参考 [Using multiple Ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#using-multiple-ingress-controllers)

:::

## 融入到网络拓扑中

如前所述，Kubernetes Ingress 只能监听到节点的 80/443 端口，且 Ingress 可以完成 L7 路由的功能。由于 Kubernetes Ingress 配置更便捷，推荐使用 Kubernetes Ingress 替代常规的互联网应用架构中的 Nginx 反向代理。那么，如何使部署在内网的 Kubernetes 集群上的 Ingress Controller 的 80/443 端口可以在外网访问到呢？

本教程推荐如下两种做法，结合您自己对安全性、可靠性等因素的考量，您可以演化出适合自己的拓扑结构。

### 暴露单worker节点

如下图所示，暴露单个 worker 节点的步骤如下：

* 为您 Kubernetes 集群中的某一个 worker 节点配置外网 IP 地址 Z.Z.Z.Z
* 将您在 Ingress 中使用到的域名（假设是`a.demo.kuboard.cn`）解析到该外网 IP 地址 Z.Z.Z.Z
* 设置合理的安全组规则（开放该外网 IP 地址 80/443 端口的入方向访问）

> 文档 [安装 Kubernetes 单Master节点](/install/install-k8s.html) 中使用的就是这种拓扑结构。这种方式下，Ingress Controller 存在单点故障的可能性。

![单IngressController节点](../../install/install-k8s.assets/image-20190826000521999.png)

### 使用外部负载均衡器

如下图所示，使用外部负载均衡器的步骤如下：

* 创建一个集群外部的负载均衡器，该负载均衡器拥有一个外网 IP 地址 Z.Z.Z.Z，并监听 80/443 端口的 TCP 协议
* 将负载均衡器在 80/443 端口上监听到的 TCP 请求转发到 Kubernetes 集群中所有（或某些）worker 节点的 80/443 端口，可开启按源IP地址的会话保持
* 将您在 Ingress 中使用到的域名（假设是`a.demo.kuboard.cn`）解析到该负载均衡器的外网 IP 地址 Z.Z.Z.Z

> 文档 [安装 Kubernetes 高可用](/install/install-kubernetes.html) 中使用的就是这种拓扑结构。

![LoadBalancer](../../install/install-kubernetes.assets/image-20190826000403193.png)

## 实战：通过 Ingress 使您的应用程序在互联网可用

::: warning 前提
* 假设您已经完成了 [公布应用程序](/learning/k8s-basics/expose.html) 中的实战部分
* 假设您已经将 Ingress 融入到您的网络拓扑中，并且将 `*.demo.kuboard.cn` （请使用您自己的域名）解析到对应的外网 IP 地址
:::

:::: tabs type:border-card

::: tab 使用kubectl lazy

**创建文件 nginx-ingress.yaml**
``` sh
vim nginx-ingress.yaml
```

**文件内容如下**

<CodeSwitcher :languages="{comment:'有注释',nocomment:'无注释'}" :isolated="true">
<template v-slot:comment>

``` yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: my-ingress-for-nginx  # Ingress 的名字，仅用于标识
spec:
  rules:                      # Ingress 中定义 L7 路由规则
  - host: a.demo.kuboard.cn   # 根据 virtual hostname 进行路由（请使用您自己的域名）
    http:
      paths:                  # 按路径进行路由
      - path: /
        backend:
          serviceName: nginx-service  # 指定后端的 Service 为之前创建的 nginx-service
          servicePort: 80
```
</template>
<template v-slot:nocomment>

``` yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: my-ingress-for-nginx
spec:
  rules:
  - host: a.demo.kuboard.cn
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx-service
          servicePort: 80
```

</template>
</CodeSwitcher>

**执行命令**

``` sh
kubectl apply -f nginx-ingress.yaml
```

**检查执行结果**

``` sh
kubectl get ingress -o wide
```

可查看到名称为 my-ingress-for-nginx 的 Ingress。

**从互联网访问**

``` sh
# 请使用您自己的域名
curl a.demo.kuboard.cn
```
:::

::: tab 使用Kuboard lazy

* 在 default 名称空间 点击 ***展现层 --> Nginx部署***

* 点击 ***编辑*** 按钮

* 填写表单如下：
  * 开启 **互联网入口 Ingress**
  * 填写一条记录：

    | 协议              | 服务端口          | 节点端口 |
    | ----------------- | ----------------- | -------- |
    | 域名              | a.demo.kuboard.cn | 32601    |
    | 路由配置/映射URL  | /                 |          |
    | 路由配置/服务端口 | 80                |          |

    **如下图所示：**

    ![image-20190827221314997](./ingress.assets/image-20190827221314997.png)

* 点击 **保存**

* 点击 **应用**

* **从互联网访问**

  在浏览器打开 `http://a.demo.kuboard.cn` （请使用您自己的域名）

:::

::::
