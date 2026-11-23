---
layout: home
hero:
  name: Kuboard V4
  text: 让 Agent 操作 K8s 时能动手也收得住
  tagline: 读放行、写必审——把 Agent 的每次变更，变成可审批、可审计、可回滚的「可治理闭环」
  image:
    src: /kuboard-hero.svg
    alt: Kuboard 可治理闭环
  actions:
    - theme: brand
      text: 看治理闭环
      link: '#governance'
    - theme: alt
      text: 快速开始
      link: /zh/install/quickstart
features:
  - icon:
      src: /icons/feature-mcp.svg
      alt: 可治理闭环
      width: 64
      height: 64
    title: 可治理闭环
    details: 写操作默认对 Agent 隐藏，必须走「提议 → 审批 → 执行 → 审计 → 回滚」：一次性令牌、危险度分级、崩溃可恢复。
  - icon:
      src: /icons/feature-install.svg
      alt: 快速安装
      width: 64
      height: 64
    title: 快速安装
    details: 一条 docker compose 命令即可拉起 Kuboard，三步完成安装，支持 MySQL / MariaDB / OpenGauss。
  - icon:
      src: /icons/feature-multi-cluster.svg
      alt: 多集群管理
      width: 64
      height: 64
    title: 多集群管理
    details: 基于 Kubernetes 1.15 - 1.37，在一个界面中统一管理多个集群，支持跨集群查询与操作。
  - icon:
      src: /icons/feature-security.svg
      alt: 安全可控
      width: 64
      height: 64
    title: 安全可控
    details: 简洁清晰的授权模型、操作审计、MFA 多因素认证，为企业级使用保驾护航。
  - icon:
      src: /icons/feature-cache.svg
      alt: 高性能缓存
      width: 64
      height: 64
    title: 高性能缓存
    details: 常用 K8s 对象本地缓存，模糊查询毫秒级响应，列表页跨集群/跨名称空间快速检索。
  - icon:
      src: /icons/feature-ha.svg
      alt: 高可用部署
      width: 64
      height: 64
    title: 高可用部署
    details: 支持负载均衡 + 高可用数据库 + Redis 分布式缓存的多节点部署模式。
---

## 可治理闭环 {#governance}

<div style="margin: 8px 0 28px;">
  <img src="/governance-loop.svg" alt="Kuboard 可治理闭环：提议 → 审批 → 执行 → 审计，回滚为虚线异常分支，审计后复盘并调整审批策略，策略回流到下一次审批" style="display: block; margin: 0 auto; max-width: 920px; width: 100%; height: auto; border-radius: 16px; box-shadow: 0 8px 32px rgba(52, 87, 213, 0.1);" />
</div>

读操作直接放行，写操作必须过闸。Agent 对集群的每次变更，都落在这条闭环上：

1. **提议** — Agent 创建变更计划，逐步追加，每一步先 dry-run
2. **审批** — 人看到要改什么，按全部或部分批准；危险度分级
3. **执行** — 一次性令牌（限时、仅本人、只能消费一次）才能执行
4. **审计** — 每次写操作留痕，按会话 / 凭证归因
5. **回滚** — 执行前快照，对已执行的计划一键回滚

底层仍是完整的多集群 K8s 管理台——治理是加在它上面的一层，不是替代它。

→ [变更审批流程](/zh/mcp/approval-flow) · [危险操作与确认令牌](/zh/mcp/danger-levels)

## 架构概览

<div style="margin: 32px 0;">
  <img src="/kuboard-architecture.svg" alt="Kuboard 概念架构：用户通过 UI、AI Agent 通过 MCP、CI 工具通过 OpenAPI 访问 Kuboard，由 Kuboard 统一管理多个 Kubernetes 集群" style="display: block; margin: 0 auto; max-width: 880px; width: 100%; height: auto; border-radius: 20px; box-shadow: 0 8px 32px rgba(52, 87, 213, 0.1);" />
</div>

## 在线演示

<div>
  在线演示环境中，您具备 <span style="color: red; font-weight: bold">只读</span> 权限，只能体验 Kuboard 的一部分功能。
</div>
<div style="padding: 10px; border: 1px solid var(--vp-c-divider); border-radius: 10px; margin: 10px 0px; background-color: var(--vp-c-bg-soft);">
  <a href="https://demo.kuboard.cn" target="_blank" rel="noopener">https://demo.kuboard.cn</a> <br/>
  <div style="width: 60px; display: inline-block; margin-top: 5px;">用&nbsp;户</div>
  demo <br/>
  <div style="width: 60px; display: inline-block;">密&nbsp;码</div>
  demo123
</div>
