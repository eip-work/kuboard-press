---
layout: home
hero:
  name: Kuboard V4
  text: 让 Kubernetes 更简单
  tagline: 安全 / 免费 / 高效的多集群管理
  image:
    src: /kuboard-hero.svg
    alt: Kuboard 多集群管理
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/install/quickstart
    - theme: alt
      text: 安装指南
      link: /zh/install/
    - theme: alt
      text: 在线演示 →
      link: https://demo.kuboard.cn
    - theme: alt
      text: English
      link: /en/
features:
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
    details: 基于 Kubernetes 1.15 - 1.34，在一个界面中统一管理多个集群，支持跨集群查询与操作。
  - icon:
      src: /icons/feature-mcp.svg
      alt: MCP 集成
      width: 64
      height: 64
    title: MCP 集成
    details: 内置 MCP Server，AI 智能体可直接与 Kubernetes 集群交互，所有写操作强制人工审批。
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
