## 安装 Ingress Controller

> ingress官方文档：https://kubernetes.io/docs/concepts/services-networking/ingress/
>
> Ingress Controllers官网介绍：[https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
>
> 本文中使用如下部署方式：https://kubernetes.github.io/ingress-nginx/deploy/baremetal/#using-a-self-provisioned-edge
>
> kubernetes支持多种Ingress Controllers，本文推荐使用
>
> https://github.com/nginxinc/kubernetes-ingress



### 在 apple-master-a-1 上执行

```bash
su - gitlab-runner
kubectl apply -f https://raw.githubusercontent.com/eip-work/eip-monitor-repository/master/dashboard/nginx-ingress.yaml
```



### 在IaaS云控制台完成如下配置（**公网ELB**）

创建负载均衡 ELB：

​    监听器 1：80 / TCP， SOURCE_ADDRESS 会话保持

​    服务器资源池 1： apple-worker-x-x 的所有节点的 80端口

​    监听器 2：443 / TCP， SOURCE_ADDRESS 会话保持

​    服务器资源池 2： apple-worker-x-x 的所有节点的443端口

假设刚创建的负载均衡 ELB 的 IP 地址为： z.z.z.z



### 配置域名解析

将域名 *.apple.yourdomain.com 解析到地址负载均衡服务器 的 IP 地址 z.z.z.z



### 验证配置

在浏览器访问 a.apple.yourdomain.com，将得到 404 NotFound 错误页面

