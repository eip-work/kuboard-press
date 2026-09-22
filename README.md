# Kuboard

[Kuboard](https://kuboard.cn) 是基于 Kubernetes 的多集群容器管理平台（微服务管理界面），致力于让 Kubernetes 的落地与日常运维变得简单、直观、高效，对个人与中小企业**完全免费**。

## Kuboard 能为你做什么

- **多集群统一管理**：在同一个界面中接入并管理多个 Kubernetes 集群（支持 1.15 - 1.34），跨集群查询与操作，无需逐台切换 `kubectl`。
- **快速安装**：一条 `docker compose` 命令即可拉起，三步完成安装；支持负载均衡 + 高可用数据库 + Redis 的多节点高可用部署。
- **直观的资源管理**：以可视化方式管理工作负载（Deployment / StatefulSet / DaemonSet / Job / CronJob / Pod / HPA）、配置与存储（ConfigMap / Secret / PVC / PV / StorageClass）、服务与网络（Service / Ingress / NetworkPolicy / Gateway API）及各类集群资源。
- **开箱即用的运维能力**：浏览器内终端、日志查看、文件浏览器、NodeShell（免 SSH 进入节点）、Debug Container（不改镜像注入排障容器）、KuboardProxy（临时访问集群内服务）等，随时定位问题。
- **安全可控**：简洁清晰的授权模型、操作审计、MFA 多因素认证；所有关键操作有迹可循。
- **AI 智能运维（Kuboard MCP）**：内置 MCP Server，AI 智能体可直接与集群交互执行运维操作，所有写操作强制人工审批，安全与效率兼得。
- **高性能体验**：常用 K8s 对象本地缓存，模糊查询毫秒级响应。

> 在线体验（只读演示环境）：https://demo.kuboard.cn （用户 `demo` / 密码 `demo123`）

## 关于本仓库

本仓库是 **Kuboard v4 官方文档站** 的源码，基于 [VitePress](https://vitepress.dev) 构建，包含中文与英文双语文档，在线访问 <https://kuboard.cn>。

```bash
pnpm install
pnpm docs:dev       # 本地开发
pnpm docs:build     # 构建站点
```

## 版权与许可

Kuboard 软件为免费软件，具体使用条款请参阅官网 <https://kuboard.cn>。
