---
description: 配置 OIDC 单点登录（SSO）：填写 Issuer、Client、Claims 映射、MFA 策略与静默续期；用户如何用「使用 XXX 登录」登录与登出；OIDC 用户预绑定与登录失败排查。
---

# Kuboard OIDC 单点登录（SSO）

本页说明如何配置 OIDC 单点登录（SSO，基于 OAuth 2.0 的身份认证协议），用户如何用 IdP 账号登录与登出，以及登录失败时如何排查。

**适用对象**：管理员（配置 IdP、管理 OIDC 用户）与普通用户（使用「使用 XXX 登录」按钮登录）。

## 快速开始：5 分钟接入一个 IdP

接入后，用户在登录页选择 OIDC 来源并点击「使用 XXX 登录」，跳转到 IdP 完成认证，通过后自动回到 Kuboard 首页（首次登录自动创建本地用户）。下面以 **Keycloak** 为例（标准 OIDC，配置与通用 IdP 一致）。

### 第一步：在 Keycloak 中创建客户端

打开 Keycloak 管理台，在 **Clients → Create client** 创建客户端：Client type 选 **OpenID Connect**，Client ID 填 `kuboard`，勾选 **Client authentication** 与 **Standard flow**；记住你的 Realm issuer 地址，形如 `https://sso.example.com/realms/kuboard`。

在 **Valid redirect URIs** 中填入 Kuboard 回调地址，再到 **Credentials** 页复制 **Client secret** 留待填用：

```sh
https://<kuboard域名>/api/anonymous.kuboard.cn/v4/oidc/callback
```

### 第二步：在 Kuboard 中启用 OIDC

入口：**系统管理 → 系统设置 → 用户登录设置 → OIDC SSO** 卡片。打开「启用 OIDC 登录」开关后，按下表填写：

| 字段 | 示例填写 | 说明 |
| --- | --- | --- |
| 后端 Issuer URI | `http://keycloak:8080/realms/kuboard` | 后端拉取 discovery / token / JWKS 用，填内网可达地址 |
| 浏览器 Issuer URI | `https://sso.example.com/realms/kuboard` | 浏览器跳转用；仅内外网访问地址不同时填写，留空取左侧值 |
| 前端 Origin 白名单 | `https://kuboard.example.com` | **必填**。允许回调回跳的页面地址（协议 + 主机 + 端口），可添加多条；留空时所有 OIDC 登录都会被拒绝 |
| Client ID | `kuboard` | 与 Keycloak 中一致 |
| Client Secret | 上一步复制的 secret | 保存后加密存储 |
| Scopes | `openid profile email` | 默认即可；需要静默续期时加 `offline_access` |
| 登录按钮文案 | `Keycloak SSO` | 登录页「使用 XXX 登录」按钮文案，默认 `OIDC` |

<!-- screenshot-todo: OIDC SSO 卡片（已启用、字段已填写的单 IdP 扁平表单），local-auth 环境截图 user-oidc-1.png -->

填写完成后点击**保存**，OIDC SSO 卡片顶部显示「已启用」。若后续登录失败，常见原因是 Issuer 不可达或白名单缺失（见 [常见问题排查](#常见问题排查)）。

### 第三步：验证登录

① 登录页用户来源选 **OIDC**，点 **「使用 Keycloak SSO 登录」**；② 浏览器跳转到 Keycloak 登录（有 MFA 则二次验证）；③ 通过后自动回到 Kuboard 首页。之后关闭「启用 OIDC 登录」开关即可让 OIDC 登录按钮从登录页消失。

## 配置项说明

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| 启用 OIDC 登录 | 关 | 总开关；关闭后登录页不出现 OIDC 登录按钮 |
| 后端 Issuer URI | 空 | 后端调用 IdP 的地址（discovery / token / JWKS），必须后端可达 |
| 浏览器 Issuer URI | 空 | 浏览器跳转地址；留空同左侧值。discovery 返回的 issuer 与「后端 Issuer URI」或本值任一**逐字符相等**即视为合法 |
| 前端 Origin 白名单 | 空（必填） | 回调允许回跳的页面 origin（协议 + 主机 + 端口），防开放重定向；留空拒绝所有回调 |
| Client ID / Client Secret | 空 | 与 IdP 中客户端一致；Secret 保存后加密存储 |
| Scopes | `openid profile email` | 授权时申请的 scope；需要静默续期时加 `offline_access` |
| 登录按钮文案 | `OIDC` | 登录页「使用 XXX 登录」按钮中的 XXX |
| 用户名 Claim | `preferred_username` | 用作 Kuboard 用户名 |
| 邮箱 Claim | `email` | 用作邮箱（预绑定匹配与账号合并） |
| 姓名 Claim | `name` | 用作显示名 |
| 信任 IdP 邮箱（合并账号） | 开 | IdP 邮箱与本地其它来源用户相同时自动合并，实现「同一人多方式登录」；关闭则每次登录视为新身份 |

### OIDC MFA

OIDC 用户的 MFA 由 **IdP 负责**，Kuboard 依据 id_token 中的 `amr`、`auth_time` claim 判断本次登录是否完成 MFA：

| 选项 | 默认 | 行为 |
| --- | --- | --- |
| 信任 IdP MFA | 开 | 依据 amr / auth_time 判断登录是否完成 MFA；关闭则一律视为未完成 |
| 强制 MFA | 关 | 未在 IdP 完成 MFA 的登录被**拒绝**（回登录页提示错误码） |
| MFA 对应 ACR Values | `mfa` | 发起授权时携带的 acr 参数，告知 IdP 此次登录要求 MFA |
| Auth Time 最大间隔（秒） | `300` | auth_time 距今超过该秒数视为「MFA 已过期」；0 关闭检查 |

::: warning 开启强制前先确认 IdP 下发 claim
若 id_token 缺失 `auth_time` 或 `amr`（部分 IdP 默认不开），启用「强制 MFA」后登录会被拒绝。请先在 IdP 侧确认能下发。
:::

### 静默续期

| 选项 | 默认 | 行为 |
| --- | --- | --- |
| 启用静默续期 | 开 | IdP 下发刷新令牌（需 `offline_access` scope）时，本地令牌临近过期自动在后台续期，用户无感 |
| 静默续期阈值（秒） | `300` | 令牌剩余有效期小于该值时触发续期（最低 30） |

## 用户如何使用 OIDC 登录

**登录**：登录页把用户来源切到 **OIDC** 后，表单下方出现 **「使用 XXX 登录」** 按钮（XXX 为「登录按钮文案」）；点击后整页跳转到 IdP，认证成功后自动回到 Kuboard 首页（登录页会记住上次选择的用户来源）。

**单点登出**：点击右上角登出时，先清理本地会话，再跳转到 IdP 登出端点注销单点会话，最后回到 Kuboard 登录页；IdP 未提供登出端点时仅完成本地登出。

## OIDC 用户管理（管理员）

**查看列表**：进入 **系统管理 → 用户管理**，把用户来源筛选切到 **OIDC**（仅启用 OIDC 时出现该选项），展示用户名、显示名、邮箱与状态，支持搜索与批量删除。

**预创建账号（预绑定）**：想在用户首次登录前确定账号（分配角色 / 组），在需要选择用户的界面（如为用户组添加成员时）把用户来源切到 **OIDC**，在用户下拉框底部点 **「+ 预创建 OIDC 用户」**：

1. 填 **Email**，必须与 IdP 的 email claim **完全一致**（保存时统一转小写）；
2. 可选填显示名；保存后出现「待首次登录」占位行；
3. 首次登录成功后占位行替换为真实用户，原角色 / 组保留。

若登录后出现的是新用户而非合并到占位行，通常是 email 与 IdP 不一致，请核对大小写与域名后缀。

::: tip OIDC 用户没有 Kuboard 密码
OIDC 用户的密码与 MFA 均由身份提供方管理，无法使用用户名 / 密码方式登录 Kuboard。登录后默认不在任何用户组（仅能访问首页），由管理员手动加组。
:::

## 常见问题排查

### 登录页没有「使用 XXX 登录」按钮

检查 OIDC SSO 卡片是否已打开「启用 OIDC 登录」开关。若已启用仍不显示，确认「前端 Origin 白名单」非空且包含当前页面地址（协议 + 主机 + 端口）。

### 登录失败，跳回登录页并提示错误码

回调失败时登录页携带 `?oidcError=错误码`，对照处理：

| 错误码 | 可能原因 | 处理 |
| --- | --- | --- |
| `state_invalid` | 回调地址被改写；state 被重放 | 重新发起登录；检查回调 URL |
| `code_exchange_failed` | Client ID / Secret 错误；标准流未启用 | 核对 Client 配置；重新生成 secret |
| `id_token_invalid` | 验签失败、issuer / audience 不符、已过期 | 检查 Issuer 是否配错；核对 IdP 侧客户端配置 |
| `oidc_mfa_required` | 未完成 MFA 但开启了强制 MFA | 见 [OIDC MFA](#oidc-mfa) |
| `oidc_mfa_stale` | MFA 完成时间超过「Auth Time 最大间隔」 | 重新登录，或调大该间隔 |

::: danger issuer 不一致是最常见的配置错误
discovery 返回的 issuer 必须与「后端 Issuer URI」或「浏览器 Issuer URI」之一**逐字符一致**；报 `issuer mismatch` 时，请把「后端 Issuer URI」配成 discovery 实际返回的值。
:::

### 回调地址与反向代理

回调地址由后端依据 `X-Forwarded-Proto` / `X-Forwarded-Host` 请求头拼出；反代未正确传递这两个头时会报 `redirect_uri` 不匹配。部署注意事项见 [反向代理](../install/reverse-proxy.md) 与 [Kuboard 代理](../ops/kuboard-proxy.md)。

## 相关文档

[登录页与各认证方式的关系](./login) · [MFA 多因素认证](./mfa) · [用户列表与用户管理](./users) · [密码策略与修改密码](./password)

## 接口文档

本节涉及的接口详见 [Swagger UI 的「权限管理接口」分组](../reference/api)。
