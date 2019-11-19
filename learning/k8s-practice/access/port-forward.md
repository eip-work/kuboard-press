---
vssueId: 156
layout: LearningLayout
lessAds: true
description: Kubernetes教程_本文描述了如何使用kubectl_port-forward访问Kubernetes集群中的RedisServer_这种连接方式在实际进行Debug时非常有效
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,kubectl port-forward, K8S培训
---

# 使用port-forward访问集群中的应用程序

<AdSenseTitle>

本文描述了如何使用 `kubectl port-forward` 访问 Kubernetes 集群中的 Redis Server。这种连接方式在实际进行Debug时非常有效。

[[TOC]]

</AdSenseTitle>

## 为Redis创建Deployment和Service

* 创建 Redis Deployment，YAML文件如下：

  <<< @/.vuepress/public/statics/learning/ptc/port-forward/redis-master-deployment.yaml

  执行命令，以创建 Redis Deployment

  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/ptc/port-forward/redis-master-deployment.yaml
  ```

  执行命令，查看Pod状态：

  ``` sh
  kubectl get pods
  ```

  输出结果如下：

  ```
  NAME                            READY     STATUS    RESTARTS   AGE
  redis-master-765d459796-258hz   1/1       Running   0          50s
  ```

  执行命令，查看 Deployment状态：

  ``` sh
  kubectl get deployment
  ```

  输出结果如下
  ```
  NAME         READY   UP-TO-DATE   AVAILABLE   AGE
  redis-master 1/1     1            1           55s
  ```

  执行命令，查看ReplicaSet状态
  ``` sh
  kubectl get rs
  ```

  输出结果如下：
  ```
  NAME                      DESIRED   CURRENT   READY     AGE
  redis-master-765d459796   1         1         1         1m
  ```

* 创建Redis服务，YAML文件如下所示：

  <<< @/.vuepress/public/statics/learning/ptc/port-forward/redis-master-service.yaml

  执行命令，创建Service
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/ptc/port-forward/redis-master-service.yaml
  ```

  执行命令，检查Service创建结果
  ``` sh
  kubectl get svc | grep redis
  ```

  输出结果如下所示：
  ```
  NAME           TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
  redis-master   ClusterIP   10.100.0.213   <none>        6379/TCP   27s
  ```

* 验证 Redis Service已经运行，并监听了 6379 端口

  ``` sh
  kubectl get pods redis-master-765d459796-258hz --template='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
  ```
  > 请将 `redis-master-765d459796-258hz` 替换成你实际 redis 的名字
  输出结果如下所示：
  ```
  6379
  ```

## 转发本地端口到Pod的端口

* 使用 `kubectl port-forward` 命令，用户可以使用资源的名称来进行端口转发。下面的命令中的任意一行，都可以实现端口转发的效果：

  ``` sh
  # 这几个命令执行任意一个即可
  kubectl port-forward redis-master-765d459796-258hz 7000:6379
  kubectl port-forward pods/redis-master-765d459796-258hz 7000:6379
  kubectl port-forward deployment/redis-master 7000:6379
  kubectl port-forward rs/redis-master 7000:6379
  kubectl port-forward svc/redis-master 7000:6379
  ```

  以上命令的输出结果类似：
  ```
  I0710 14:43:38.274550    3655 portforward.go:225] Forwarding from 127.0.0.1:7000 -> 6379
  I0710 14:43:38.274797    3655 portforward.go:225] Forwarding from [::1]:7000 -> 6379
  ```

* 启动 Redis 命令行：
  ``` sh
  redis-cli -p 7000
  ```

* 在Redis命令行工具的提示符下，输入 `ping` 命令，如下所示：
  ``` sh
  127.0.0.1:7000>ping
  ```
  Redis 服务器将返回 `PONG`

## 总结

本机 7000 端口的连接被转发到集群中 Redis Server 所在 Pod 的 6379 端口。当此连接存在时，您可以使用您自己的机器上的客户端对部署在集群中的 Redis Server 进行 Debug。

::: tip 提示
* 由于一些限制，port-forward 目前只支持 TCP 协议，[issue 47862](https://github.com/kubernetes/kubernetes/issues/47862) 用来跟进对 UDP 协议的支持。
* MySQL数据库等使用 TCP 协议的部署在K8S集群中的服务器，都可以使用此方式进行 DEBUG
:::
