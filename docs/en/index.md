---
layout: home
hero:
  name: Kuboard V4
  text: Let agents act on Kubernetes. Keep control.
  tagline: Every agent change becomes a loop you can approve, audit, and undo — reads pass, writes require approval.
  image:
    src: /kuboard-hero.svg
    alt: Kuboard governable loop
  actions:
    - theme: brand
      text: See the loop
      link: '#governance'
    - theme: alt
      text: Quick Start
      link: /en/install/quickstart
features:
  - icon:
      src: /icons/feature-mcp.svg
      alt: Governable Loop
      width: 64
      height: 64
    title: Governable Loop
    details: Write tools are hidden from agents by default and must go through propose → approve → execute → audit → rollback — with one-time tokens, risk grading, and crash recovery.
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
    details: Built on Kubernetes 1.15 - 1.37, manage multiple clusters from one interface with cross-cluster queries.
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

## The Governable Loop {#governance}

Reads pass freely; writes go through the gate. Every change an agent makes to your clusters lands on this loop:

1. **Propose** — the agent creates a change plan step by step, with a dry-run for each step
2. **Approve** — you see what will change and approve all or part of it; risk is graded
3. **Execute** — a one-time token (time-limited, owner-only, single-use) is required to apply
4. **Audit** — every write is recorded and attributed by session / credential
5. **Rollback** — pre-change snapshots enable one-click rollback of an applied plan

Under the hood it is still a full multi-cluster Kubernetes management UI — governance is a layer on top, not a replacement.

→ [Approval Flow](/en/mcp/approval-flow) · [Danger Levels & Confirmation Tokens](/en/mcp/danger-levels)

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
