---
description: 服务与网络总览：Service、Ingress、NetworkPolicy、Gateway API
---

# 服务与网络

应用对外暴露与集群内部网络隔离，是 Kubernetes 上业务可访问性与安全性的关键。本节覆盖 Service、Ingress、NetworkPolicy 与新一代 Gateway API 四类对象。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [Service / Ingress](../network/services-ingress) | Service 类型、Ingress 与七层路由 | 应用对外暴露与七层负载均衡 |
| [NetworkPolicy](../network/networkpolicy) | Pod / Namespace 级别的入出站策略 | 微服务间网络隔离 |
| [Gateway API](../network/gateway-api) | GatewayClass / Gateway / HTTPRoute 等新一代 API | 复杂路由、跨命名空间、多协议网关 |

## 推荐阅读顺序

1. **先暴露，后收敛**：业务上线先用 [Service / Ingress](../network/services-ingress) 把应用暴露出来；
2. **再叠加安全策略**：按命名空间或服务等级用 [NetworkPolicy](../network/networkpolicy) 收紧 Pod 间网络；
3. **最后迁向 Gateway API**：当 Ingress 规则数量多、跨命名空间共享路由，或需要 TCP / TLS 高级能力时，迁移到 [Gateway API](../network/gateway-api)。

::: tip 后端实现选择
- 若集群已安装 Gateway API CRD（`gateway.networking.k8s.io`），推荐直接使用 [Gateway API](../network/gateway-api)；
- 若集群仅安装 IngressNginx 或其他传统 Ingress，继续使用 [Service / Ingress](../network/services-ingress) 即可。
:::
