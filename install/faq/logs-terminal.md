---
vssueId: 150
description: Kuboard_的日志界面和终端界面都使用了WebSocket与服务器进行通信_在部分情况下_可能出现连通性问题_本文描述了一种解决此问题的办法
meta:
  - name: keywords
    content: Kubernetes 管理界面, Kuboard
---

# 日志终端访问的问题

<AdSenseTitle/>

极少数情况下，您可能能够正常访问 Kuboard 和使用 Kuboard 的各项功能，但是，访问 Kuboard 提供的日志界面和终端界面时，始终会出现弹窗提示，并将您指引到了现在的这个页面上来。本文描述了如何排查 Kuboard 日志/终端界面不能访问的问题

## 第一步

Kuboard 日志界面和终端界面都使用了 websocket 与服务器端通信，正常情况下，会工作得很好，但是当出现如下几种情况时，websocket 的连接就会出现问题：
* 您所访问的容器已经停止
* 您当前使用的浏览器不支持 WebSocket，推荐使用最新版本的 chrome 浏览器，也可以尝试最新版本的 firefox

如果您还有问题，请尝试：
* （如果刚完成 Kuboard 的升级）退出 Kuboard 登录，重新输入 token 登录 Kuboard
* 清空浏览器缓存

## 第二步

当您排除了上述两个问题之后，剩下极有可能的情况就是：
* 您访问服务器时，网络链路上存在代理，比如：
  * 您配置了 Nginx 反向代理，通过 Nginx 将请求转发到 Kuboard 的节点端口 32567
  * 您的浏览器设置了代理程序，并通过代理访问网站内容
  * 您使用了科学上网的工具
  * 您通过 VPN 接入到服务器所在的网络，然后访问 Kuboard 的节点端口 32567
  * 您的网络运营商（如长城宽带、小区宽带、电力猫等）为了节省出口带宽，对所有的 HTTP 服务都做了代理和缓存

此时，您可以为 Kuboard 启用 https （请在方向代理上配置 https）；或者，您可以尝试使用 kubectl port-forward 的方式来访问 Kuboard。具体步骤如下：

* 请参考 [在客户端电脑安装 kubectl](/install/install-kubectl.html)
* 在客户端电脑上执行端口转发命令，此命令将监听您客户端机器的 8000 端口，并将请求转发到 kuboard 所在 Pod 的 80 端口

  ``` sh
  kubectl port-forward svc/kuboard -n kube-system 8000:80
  ```
* 在 chrome 打开地址 `http://localhost:8000/
  
  登录重试，此时应该能够正常访问 kuboard 的日志界面和终端界面。

::: tip 如果还解决不了
请参考本文末尾的方式联系 Kuboard 团队
:::

## Ingress设置

如果通过 Ingress 的方式访问 Kuboard，需要在 IngressController 上开启 websocket，以 nginx-ingress 为例，下面的 YAML 可以开启 websocket。更多信息请参考 [Ingress 注解配置](/learning/k8s-intermediate/service/ingress-annotation.html)

``` yaml {8}
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    k8s.kuboard.cn/displayName: kuboard
    k8s.kuboard.cn/workload: kuboard
    nginx.com/sticky-cookie-services: serviceName=kuboard srv_id expires=1h path=/
    nginx.org/websocket-services: kuboard
  labels:
    k8s.kuboard.cn/layer: monitor
    k8s.kuboard.cn/name: kuboard
  name: kuboard
  namespace: kube-system
spec:
  rules:
    - host: kuboard.demo.kuboard.cn
      http:
        paths:
          - backend:
              serviceName: kuboard
              servicePort: http
            path: /
```


## 反向代理设置

如果您为 Kuboard 设置了 nginx 反向代理，请在 nginx 上开启 websocket，配置文件如下所示：

``` nginx {9,13,14}
server {
  listen  80;
  server_name kuboard.yourdomain.com;   # 替换成你的域名
  location / {
    proxy_pass  http://192.168.2.39:32567;  # 替换成你的节点地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  location /k8s-ws/ {
    proxy_pass  http://192.168.2.39:32567;  # 替换成你的节点地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Upgrade "websocket";
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  gzip on;
}
```
