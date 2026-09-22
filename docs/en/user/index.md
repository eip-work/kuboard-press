---
description: "Users and authentication overview: login, password policy, MFA, access keys, users, groups, roles, OIDC, Webhook external user repository"
---

# Users and Authentication

This section covers the full identity and access management (IAM) surface of Kuboard V4: account login, security policies, organization and authorization model, and integration with external identity providers (IdPs).

## Quick Navigation

| Section | Content | When to Read |
| --- | --- | --- |
| [Login](./login) | Account login, first-time setup, forgotten password, session persistence | First login and daily use |
| [Password Policy](./password) | Password complexity, expiry, history and lockout policy | Raise the account security baseline |
| [MFA](./mfa) | TOTP (Time-based One-Time Password) two-step verification | Add a second factor for admin accounts |
| [Access Keys](./access-keys) | Creating, revoking and scoping API credentials | AI agents, MCP integration, scripted workflows |
| [Users](./users) | Creating, disabling, deleting and managing user accounts | Maintain the account roster |
| [Groups](./groups) | Creating user groups and managing members | Bulk authorization by team or department |
| [Roles](./roles) | Roles, authorization rules, mapping to K8s RBAC | Design who-can-do-what |
| [OIDC SSO](./oidc) | OIDC (OpenID Connect) integration with Keycloak / Authing / Feishu and more | Enterprise single sign-on |
| [Webhook External User Library](./webhook-users) | Bridge Kuboard to LDAP or a custom account system via Webhook | Reuse an existing identity backend |

## Recommended Reading Order

1. **First login** — start with [Login](./login), then follow [Password Policy](./password) to change the default password;
2. **Security hardening** — enable [MFA](./mfa) on every administrator account;
3. **Multi-user collaboration** — maintain accounts through [Users](./users) and [Groups](./groups), then authorize them with [Roles](./roles);
4. **Automation integration** — issue [Access Keys](./access-keys) so automated scripts and AI agents gain scoped API access;
5. **Enterprise identity** — connect to OIDC or an in-house IdP through [OIDC SSO](./oidc) or [Webhook External User Library](./webhook-users).

::: tip Who should read this section
- **Cluster users** (developers, SREs) only need [Login](./login), [Password Policy](./password) and [Access Keys](./access-keys);
- **Kuboard administrators** should read the whole section, with extra focus on [Roles](./roles) and the external identity options;
- **Security and compliance leads** should pay close attention to [Password Policy](./password), [MFA](./mfa) and [OIDC SSO](./oidc).
:::