---
description: 通过 Nginx 反向代理 / Kubernetes Ingress 为 Kuboard 配置 HTTPS 与 WebSocket
---

# 反向代理

为 Kuboard 配置 HTTPS 与 WebSocket（Nginx 反向代理或 Kubernetes Ingress 两种方式），用于生产环境。

## 为何使用反向代理

Kuboard 默认使用 HTTP 协议，方便快速试用；生产环境请务必启用 HTTPS。您可以使用 Kubernetes Ingress 直接启用 HTTPS 并转发到 Kuboard Service，也可以使用自建的 Nginx 反代 Kuboard 并在其上配置 HTTPS。

## 三条注意事项

- **WebContextRoot（根路径）**：Kuboard 必须挂在根路径访问，例如 `https://kuboard.yourcompany.com/`，不支持 `https://yourcompany.com/kuboard/` 这样的二级路径；
- **启用 WebSocket**：终端和日志功能依赖 WebSocket，反向代理必须放行 WebSocket 升级请求，否则终端与日志无法正常使用；
- **转发 `X-Forwarded-Host`**：启用 [OIDC 单点登录](../user/oidc) 时，回调地址由后端依据 `X-Forwarded-Proto` / `X-Forwarded-Host` 拼出。`X-Forwarded-Host` 必须用 `$http_host`（保留端口），只设 `Host $host` 会丢掉端口，回调地址与 IdP 中登记的不一致，IdP 将拒绝登录并报 `Invalid parameter: redirect_uri`。未启用 OIDC 时这一行也无副作用，建议一律加上。

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
    # $http_host 保留端口，供 OIDC 回调地址拼装；只用 $host 会丢掉端口
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Port $server_port;
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
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Port $server_port;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  # Swagger / OpenAPI 文档（KUBOARD_SWAGGER_ENABLED=true 时需要）
  # 注意：location 不能带尾斜杠。写成 /v3/api-docs/ 时 nginx 会把 /v3/api-docs
  # 301 重定向到 /v3/api-docs/，而不带斜杠的地址与分组地址都会失效。
  location /v3/api-docs {
    proxy_pass  http://192.168.2.39:32567;  # 替换成你的节点地址
    proxy_http_version 1.1;
    proxy_pass_header Authorization;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Port $server_port;
    # proxy_set_header X-Forwarded-Proto https; # 如果您在反向代理上启用了 HTTPS
  }
  gzip on;
}
```

::: tip OpenAPI 文档地址
放行 `/v3/api-docs` 后即可在浏览器访问 `/v3/api-docs`（完整描述）与 `/v3/api-docs/{分组名}`（单个分组，如 `/v3/api-docs/cluster.kuboard.cn`），分组名清单见 [API 文档](../reference/api)。Swagger UI 还需要 `/swagger/` 路径，如需使用请参照本页方式再补一个 `location /swagger/`。
:::

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

## HA 多副本：粘性会话与 WebSocket 路径覆盖

本页样例面向单机部署；如果你使用 Kuboard 的 [高可用部署](./ha)（多副本 + 负载均衡器），反向代理需要做三处额外调整，否则终端、日志、MCP SSE 等长连接功能会频繁断开：

1. **`upstream` 加 `ip_hash`**：默认轮询会在两个副本之间随机切换 WebSocket / SSE 长连接，导致日志流、终端、MCP SSE 推送频繁中断。`ip_hash` 把同一客户端粘性到固定后端，配合 [kuboard-server P2-5a 日志断线重连](./ha) 即可在大多数副本滚动重启时不掉线：

   ```nginx
   upstream kuboard_backend {
     ip_hash;
     server kuboard-1:80;
     server kuboard-2:80;
   }
   ```

   Kubernetes Ingress 场景使用 `nginx.com/sticky-cookie-services` 或 nginx-ingress 内置的 session affinity（`nginx.org/affinity: cookie` + `nginx.org/affinity-cookie-name: SERVERID`）即可达到同样效果。

2. **WebSocket 升级覆盖全路径**：Kuboard 的终端走 `/k8s-ws/`，K8s watch 走 `/k8s-api/` 与 `/api/k8s.kuboard.cn/`，MCP SSE 走 `/mcp` 与 `/mcp-subscriptions/`。原官方 HA 编排仅在 `/api/k8s.kuboard.cn/v4/clusters/` 上配了 WebSocket 升级，导致 HA 下终端与日志功能不可用。请参考 [高可用部署文档的 Nginx 完整样例](./ha#redis-cluster-opengauss-nginx-docker-compose-ha-opengaussyaml) 补齐全部路径。

3. **合理超时**：WebSocket 长连接可达数小时（K8s watch 持续推送、日志流持续输出），`proxy_read_timeout` 与 `proxy_send_timeout` 默认 60s 会把流截断。建议全局设置 86400s（24h）覆盖日常使用：

   ```nginx
   proxy_read_timeout 86400;
   proxy_send_timeout 86400;
   ```

::: tip 关于 P2-5a 日志断线重连
当 `ip_hash` 不可用或后端副本确实掉线时（例如 nginx 重载、`ip_hash` hash key 不稳），kuboard-server 的 `K8sTerminalLogs` 视图会自动以指数退避（1s → 30s，封顶 8 次）重连 WebSocket，并通过 Redis stream buffer（TTL 5min）恢复断线期间产生的日志。该能力在 `KUBOARD_CACHE_PROVIDER=redis` 的 HA 模式下生效；caffeine 单机模式下由于没有跨实例需求，缓冲退化为 noop，重连后仅能读到重连点之后的日志。
:::

## 相关文档

- [快速开始](./quickstart) — 单机部署
- [高可用部署](./ha) — 多副本部署与负载均衡（含完整 nginx 样例）
- [安装索引](./index) — 其他部署场景
- [升级](./upgrade) — 版本升级与数据备份
- [从 v3 迁移](./migration-from-v3) — v3 到 v4 的迁移说明