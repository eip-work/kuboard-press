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
  * Kuboard 需要使用根路径进行访问，即 https://kuboard.this-is-a-sample.com/，而不能是 https://this-is-a-sample.com/kuboard/ 这样的二级路径；
* 启用 WebSocket
  * Kuboard 中终端和日志的功能需要用到 WebSocket，需要在您的反向代理中配置 WebSocket，才能正常使用 Kuboard 的终端和日志功能；
  
<!--  PassHeader
  * Kuboard v3 的 Portforward <Badge>v3.0.0</Badge> 功能需要用到 SPDY 协议，需要您的反向代理能够支持此协议，并将 Upgrade,Connection,Authorization 这几个 Header 传递给 Kuboard。 -->

## 配置样例

### Nginx 配置

如果您使用 nginx 作为反向代理，配置文件样例如下所示：
> Kuboard 版本不低于 v3.0.0-beta.5

``` nginx {5-8,14,15,19,22,23,31,32,34,35,36}
http {

  # 您需要的其他配置

  map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
  }

  server {
    listen       80; 
    server_name  kuboard.this-is-a-sample.com; # 替换成你的域名

    location / {
      proxy_pass http://192.168.32.205:10080/;  # 替换成你的 Kuboard IP 地址和端口，应该是 IP 地址，而不是 KUBOARD_ENDPOINT 参数的值
      gzip on;
    }

    location /k8s-ws/ {
      proxy_pass  http://192.168.32.205:10080/k8s-ws/;  # 替换成你的 Kuboard IP 地址和端口
      proxy_http_version 1.1;
      proxy_pass_header Authorization;
      proxy_set_header Upgrade "websocket";
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
    }

    location /k8s-proxy/ {
      proxy_pass  http://192.168.32.205:10080/k8s-proxy/;  # 替换成你的 Kuboard IP 地址和端口
      proxy_http_version 1.1;
      proxy_pass_header Authorization;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
      gzip on;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
  }
}
```
