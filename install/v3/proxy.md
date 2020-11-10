---
vssueId: 13
lessAds: false
description: Kuboard_是一款Kubernetes_Dashboard_快速在K8S上落地微服务_本文是Kuboard的安装手册_包括安装Kuboard的前提条件_与Kubernetes的版本兼容性_安装步骤_以及完成安装后如何访问Kuboard界面。
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 通过反向代理访问 Kuboard

<AdSenseTitle/>


## 配置反向代理时的注意事项

在为 Kuboard 配置反向代理时，需要注意：
* WebContextRoot
  * Kuboard 需要使用根路径进行访问，即 https://yourkuboard.yourcompany.com/，而不能是 https://yourcompany.com/kuboard/ 这样的二级路径；
* 启用 WebSocket
  * Kuboard 中终端和日志的功能需要用到 WebSocket，需要在您的反向代理中配置 WebSocket，才能正常使用 Kuboard 的终端和日志功能；
* PassHeader
  * Kuboard v3 的 Portforward <Badge>v3.0.0</Badge> 功能需要用到 SPDY 协议，需要您的反向代理能够支持此协议，并将 Upgrade,Connection,Authorization 这几个 Header 传递给 Kuboard。

## 配置样例

### Nginx 配置

如果您使用 nginx 作为反向代理，配置文件样例如下所示：

``` nginx {7-9,14-16}
server {
  listen  80;
  server_name kuboard.yourdomain.com;   # 替换成你的域名
  location / {
    proxy_pass  http://192.168.2.39:80;  # 替换成你的宿主机地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  location /k8s-ws/ {
    proxy_pass  http://192.168.2.39:80;  # 替换成你的宿主机地址
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
