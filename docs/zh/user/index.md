---
description: 用户与认证总览：登录、密码策略、MFA、访问密钥、用户与用户组、角色与权限、OIDC、Webhook 外部用户库
---

# 用户与认证

本节覆盖 Kuboard V4 在身份与访问管理（IAM, Identity and Access Management）方向的完整能力：账号登录、安全策略、组织与权限模型，以及与外部身份提供方（IdP）的对接。

## 快速导航

| 章节 | 内容 | 适用场景 |
| --- | --- | --- |
| [登录](./login) | 账号登录、首次初始化、忘记密码、会话保持 | 初次登录与日常使用 |
| [密码策略](./password) | 密码复杂度、有效期、历史、锁定策略 | 提升账号安全基线 |
| [MFA 多因素认证](./mfa) | 基于 TOTP（Time-based One-Time Password）的两步验证 | 为管理员账号启用二次验证 |
| [访问密钥](./access-keys) | API 调用凭证的创建、撤销与权限范围 | AI 智能体 / MCP / 自动化脚本对接 |
| [用户管理](./users) | 用户的创建、禁用、删除与基本信息维护 | 管理员维护账号清单 |
| [用户组](./groups) | 用户组（Group）的创建与成员管理 | 按团队 / 部门批量授权 |
| [角色与权限](./roles) | 角色（Role）、授权规则、K8s RBAC 映射 | 梳理"谁能做什么" |
| [OIDC 单点登录](./oidc) | OIDC（OpenID Connect）协议对接 Keycloak / Authing / 飞书等 | 企业统一身份接入 |
| [Webhook 外部用户库](./webhook-users) | 通过 Webhook 接入 LDAP / 自研账号系统 | 已有账号体系对接 Kuboard |

## 推荐阅读顺序

1. **首次登录**：先看 [登录](./login)，按 [密码策略](./password) 修改默认密码；
2. **安全加固**：为管理员账号开启 [MFA 多因素认证](./mfa)；
3. **多人协作**：通过 [用户管理](./users) 与 [用户组](./groups) 维护账号，再用 [角色与权限](./roles) 授权；
4. **自动化集成**：通过 [访问密钥](./access-keys) 让自动化脚本与 AI 智能体获得受控 API 访问能力；
5. **企业接入**：通过 [OIDC](./oidc) 或 [Webhook 外部用户库](./webhook-users) 将 Kuboard 接入企业既有身份体系。

::: tip 谁应该看本节
- **集群使用者**（开发者 / SRE）只需了解 [登录](./login)、[密码策略](./password)、[访问密钥](./access-keys)；
- **Kuboard 管理员** 应完整阅读本节，重点关注 [角色与权限](./roles) 与外部身份对接方案；
- **安全合规负责人** 重点关注 [密码策略](./password)、[MFA](./mfa) 与 [OIDC](./oidc) 三节。
:::
