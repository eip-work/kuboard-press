---
lessAds: false
description: 为 Kuboard v3 配置 TLS 证书
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# SSL 证书

<AdSenseTitle/>

Kuboard v3 容器对外暴露三个端口：
* `80` Kuboard Web 服务端口，TCP；
* `443` Kuboard Web 服务端口，TCP；
* `10081` Kuboard Agent Server 端口，TCP 、 UDP。

其中，Web 服务端口在如下两种情况下需要配置 SSL 证书：
  * 通过公网访问 Kuboard 界面，提高安全性；
  * 为被纳管的 Kubernetes 配置 OIDC，与 Kuboard 实现单点登录（如不配置，通过 Kuboard 管理 Kubernetes 时，Kubernetes 只能将用户识别成 `kuboard-admin` 或者 `kuboard-user` 这两个 ServiceAccount 当中的一个）

Kuboard Agent Server 端口使用 TCP、UDP 通信，是私有协议，已经自动配置了 TLS 加密连接，无需用户额外配置证书；此外，该端口只提供给安装到 Kubernetes 集群中的 Kuboard Agent 访问，无需暴露到公网。

## Certificates

您可以加载 SSL 证书到 Kuboard 容器中，并且配置好证书对应的路径以支持 HTTPS 访问；

::: tip Tips
* 如果 [通过 nginx 反向代理访问 Kuboard](./v3-proxy.html)，建议在 nginx 中配置 SSL 证书；
* 如果您的 Kuboard 打算直接在公网上访问，建议使用 [Lets Encrypt](#lets-encrypt)
:::

启动命令如下所示：

```sh {3-6}
sudo docker run -d \
  --restart=unless-stopped \
  -v /hostpath/to/your/server.crt:/etc/certs/my.company.com/server.crt \
  -v /hostpath/to/your/server.key:/etc/certs/my.company.com/server.key \
  -e KUBOARD_TLS_CERT=/etc/certs/my.company.com/server.crt \
  -e KUBOARD_TLS_KEY=/etc/certs/my.company.com/server.key \
  -p 10080:80/tcp \
  -p 443:443/tcp \
  -p 10081:10081/tcp \
  -p 10081:10081/udp \
  -e KUBOARD_ENDPOINT="http://kuboard.this-is-a-sample.com:10080" \
  -e KUBOARD_AGENT_SERVER_UDP_PORT="10081" \
  -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
  -v /root/kuboard-data:/data \
  eipwork/kuboard:v3-beta
```

其中：
* 第 3 - 4 行，将证书的 crt 文件和 key 文件从宿主机映射到 Kuboard 容器的某一个路径；
* 第 5 - 6 行，通过环境变量指定 Kuboard 使用该证书；
* 其他参数请参考 [安装 Kuboard v3](./install-built-in.html)


## Lets Encrypt

Lets Encrypt 是一个开源免费的证书颁发机构，如果您直接在公网上访问 Kuboard，建议使用 Lets Encrypt 配置 SSL 证书。

启动命令如下所示：

```sh {4,7,8}
sudo docker run -d \
  --restart=unless-stopped \
  -p 10080:80/tcp \
  -p 443:443/tcp \
  -p 10081:10081/tcp \
  -p 10081:10081/udp \
  -e KUBOARD_TLS_AUTOCERT=true \
  -e KUBOARD_TLS_DOMAIN=kuboard.this-is-a-sample.com \
  -e KUBOARD_ENDPOINT="http://kuboard.this-is-a-sample.com:10080" \
  -e KUBOARD_AGENT_SERVER_UDP_PORT="10081" \
  -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
  -v /root/kuboard-data:/data \
  eipwork/kuboard:v3-beta
```

其中：
* 第 4 行将 443 端口映射到宿主机的 443 端口。
* 第 7 行激活 Kuboard 中的 Lets Encrypt 客户端；
* 第 8 行指定 Lets Encrypt 颁发证书时对应的域名；

> 使用 Lets Encrypt 时，请将 `kuboard.this-is-a-sample.com` 域名指向您的 Kuboard 所在宿主机的公网 IP，并且确保 80, 443 端口开放。Kuboard 启动后，在您第一次访问 `https://kuboard.this-is-a-sample.com` 时，Lets Encrypt 将自动申请证书（浏览器上显示第一次访问将失败）。等候 1-5 分钟时间，再次访问 `https://kuboard.this-is-a-sample.com` 时，您将能够成功访问，证书也已经颁发并且自动配置好；通常免费证书有效期是一年时间，证书到期前一个月，系统会自动为您更新证书，无需您额外做任何操作。
