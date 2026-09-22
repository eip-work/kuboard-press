---
description: 通过 Nginx 反向代理 / Kubernetes Ingress 为 Kuboard 配置 HTTPS 与 WebSocket
---

# 反向代理

为 Kuboard 配置 HTTPS 与 WebSocket（Nginx 反向代理或 Kubernetes Ingress 两种方式），用于生产环境。

## 为何使用反向代理

Kuboard 默认使用 HTTP 协议，方便快速试用；生产环境请务必启用 HTTPS。您可以使用 Kubernetes Ingress 直接启用 HTTPS 并转发到 Kuboard Service，也可以使用自建的 Nginx 反代 Kuboard 并在其上配置 HTTPS。

## 两条注意事项

- **WebContextRoot（根路径）**：Kuboard 必须挂在根路径访问，例如 `https://kuboard.yourcompany.com/`，不支持 `https://yourcompany.com/kuboard/` 这样的二级路径；
- **启用 WebSocket**：终端和日志功能依赖 WebSocket，反向代理必须放行 WebSocket 升级请求，否则终端与日志无法正常使用。

## Nginx 配置样例

使用 Nginx 作为反向代理时，将注释标注的两处地址替换为您的域名和 Kuboard 节点地址后直接使用；如果 Nginx 上启用了 HTTPS，请一并取消两个 location 中 `# proxy_set_header X-Forwarded-Proto https;` 一行的注释。

```nginx
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

## Ingress 配置样例

使用 nginx-ingress 作为 Ingress Controller 时，将下面配置保存为 `ingress.yaml`，替换域名与证书 Secret（需提前创建）后执行 `kubectl apply -f ingress.yaml` 即可生效；其他类型的 Ingress 控制器（traefik、ingress-nginx 等）请参考[官方文档](https://docs.nginx.com/nginx-ingress-controller/overview/)，自行配置 WebSocket 与 PassHeader。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kuboard
  namespace: kube-system
  annotations:
    nginx.org/websocket-services: kuboard
    nginx.org/proxy-pass-headers: 'Upgrade,Connection,Authorization'
spec:
  rules:
    - host: demo.kuboard.cn
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: kuboard
                port:
                  name: http
  tls:
    - hosts:
        - demo.kuboard.cn
      secretName: demo.kuboard.cn
```

- `nginx.org/websocket-services` 与 `nginx.org/proxy-pass-headers` 两个注解用于开启 WebSocket 与透传认证头（如需会话保持或显示名，可自行补充 `nginx.com/sticky-cookie-services`、`k8s.kuboard.cn/displayName` 注解）。

## 相关文档

- [快速开始](./quickstart) — 单机部署
- [高可用部署](./ha) — 多副本部署与负载均衡
- [安装索引](./index) — 其他部署场景
- [升级](./upgrade) — 版本升级与数据备份
- [从 v3 迁移](./migration-from-v3) — v3 到 v4 的迁移说明