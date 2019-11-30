---
vssueId: 173
layout: LearningLayout
description: Kubernetes教程_本文解释了Kubernetes中为什么ping Service 不能成功的原因
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Service
---

# 为什么Kubernetes Service不能ping

<AdSenseTitle>

</AdSenseTitle>

## 现象

**Kubernetes Service 不能 ping**

例如对于 [example](/guide/example/import.html) 中的 Service `gateway-example`，可以执行 `nslookup` 命令，如下所示：

``` 
[root@gateway-example-6f6f45cd6-px8bn eip]# nslookup gateway-example
Server:         10.96.0.10
Address:        10.96.0.10#53

Name:   gateway-example.example.svc.cluster.local
Address: 10.105.141.232
```

但是执行 `ping` 命令则会失败：

``` 
[root@gateway-example-6f6f45cd6-px8bn eip]# ping gateway-example
PING gateway-example.example.svc.cluster.local (10.105.141.232) 56(84) bytes of data.
From 172.17.76.171 (172.17.76.171) icmp_seq=1 Time to live exceeded
From 172.17.76.171 (172.17.76.171) icmp_seq=2 Time to live exceeded
From 172.17.76.171 (172.17.76.171) icmp_seq=3 Time to live exceeded
From 172.17.76.171 (172.17.76.171) icmp_seq=4 Time to live exceeded
^C
--- gateway-example.example.svc.cluster.local ping statistics ---
4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 3003ms
```

执行 `curl` 命令会成功：(如果后端 Pod 正常)

```
[root@gateway-example-6f6f45cd6-px8bn eip]# curl gateway-example:9201
{"timestamp":"2019-11-29T15:29:39.515+0000","path":"/","status":404,"error":"Not Found","message":null}
```

执行 `telnet` 命令也可以成功：(如果后端 Pod 正常)

```
[root@gateway-example-6f6f45cd6-px8bn eip]# telnet gateway-example 9201
Trying 10.105.141.232...
Connected to gateway-example.
Escape character is '^]'.
```

## 解释

在 Kubernetes 的网络中，Service 就是 ping 不通的。因为 Kubernetes 只是为 Service 生成了一个虚拟 IP 地址，实现的方式有：
* [User space 代理模式](/learning/k8s-intermediate/service/service-details.html#user-space-代理模式)
* [Iptables 代理模式](/learning/k8s-intermediate/service/service-details.html#iptables-代理模式)
* [IPVS 代理模式](/learning/k8s-intermediate/service/service-details.html#ipvs-代理模式)

不管是哪种代理模式，Kubernetes Service 的 IP 背后都没有任何实体可以响应「ICMP」，全称为 Internet 控制报文协议（Internet Control Message Protocol）。参考 [每天都在用的Ping命令，它到底是什么？](https://www.jianshu.com/p/dc9de5038874)

通过 Service 访问 Pod 时的数据传递方式，可参考 [数据包的传递：Service-to-Pod](/learning/k8s-intermediate/service/network.html#数据包的传递：service-to-pod)
