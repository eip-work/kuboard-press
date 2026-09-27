---
layout: home
hero:
  name: Kuboard V4
  text: Make Kubernetes simple
  tagline: Secure, free, and efficient multi-cluster management
  image:
    src: /kuboard-hero.svg
    alt: Kuboard multi-cluster management
  actions:
    - theme: brand
      text: Quick Start
      link: /en/install/quickstart
    - theme: alt
      text: Installation Guide
      link: /en/install/
    - theme: alt
      text: Live Demo →
      link: https://demo.kuboard.cn
    - theme: alt
      text: 中文
      link: /
features:
  - icon:
      src: /icons/feature-install.svg
      alt: Quick Installation
      width: 64
      height: 64
    title: Quick Installation
    details: Spin up Kuboard with a single docker compose command. Supports MySQL / MariaDB / OpenGauss.
  - icon:
      src: /icons/feature-multi-cluster.svg
      alt: Multi-cluster Management
      width: 64
      height: 64
    title: Multi-cluster Management
    details: Built on Kubernetes 1.15 - 1.34, manage multiple clusters from one interface with cross-cluster queries.
  - icon:
      src: /icons/feature-mcp.svg
      alt: MCP Integration
      width: 64
      height: 64
    title: MCP Integration
    details: Built-in MCP Server lets AI agents interact with your Kubernetes clusters — every write is guarded by human approval.
  - icon:
      src: /icons/feature-security.svg
      alt: Secure & Controllable
      width: 64
      height: 64
    title: Secure & Controllable
    details: A clean authorization model, audit logging, and MFA bring enterprise-grade security.
  - icon:
      src: /icons/feature-cache.svg
      alt: High-performance Cache
      width: 64
      height: 64
    title: High-performance Cache
    details: Frequently used K8s objects are cached locally with fuzzy search and millisecond-level responses.
  - icon:
      src: /icons/feature-ha.svg
      alt: High Availability
      width: 64
      height: 64
    title: High Availability
    details: Multi-node deployment with load balancers, HA databases, and Redis distributed cache.
---

## Architecture Overview

<div style="margin: 32px 0;">
  <img src="/kuboard-architecture.svg" alt="Kuboard conceptual architecture: Users access via UI, AI Agents via MCP, CI tools via OpenAPI; Kuboard manages multiple Kubernetes clusters" style="display: block; margin: 0 auto; max-width: 880px; width: 100%; height: auto; border-radius: 20px; box-shadow: 0 8px 32px rgba(52, 87, 213, 0.1);" />
</div>

## Live Demo

<div>
  The online demo environment grants you <span style="color: red; font-weight: bold">read-only</span> access — only a subset of Kuboard's features is available.
</div>
<div style="padding: 10px; border: 1px solid var(--vp-c-divider); border-radius: 10px; margin: 10px 0px; background-color: var(--vp-c-bg-soft);">
  <a href="https://demo.kuboard.cn" target="_blank" rel="noopener">https://demo.kuboard.cn</a> <br/>
  <div style="width: 60px; display: inline-block; margin-top: 5px;">Username</div>
  demo <br/>
  <div style="width: 60px; display: inline-block;">Password</div>
  demo123
</div>
