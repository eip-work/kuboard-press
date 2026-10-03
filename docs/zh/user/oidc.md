---
description: 配置 Kuboard OIDC 单点登录（SSO）：单 IdP 设置、Issuer 双值容忍、回调白名单（必填）、Claims 映射、MFA 策略、静默续期、限流；用户如何登录与单点登出；错误码与失败排查。
outline: [2, 3]
---

# Kuboard OIDC 单点登录（SSO）

本页说明如何为 Kuboard 配置 OIDC 单点登录（基于 OAuth 2.0 的身份认证协议），用户如何使用 IdP 账号登录，以及登录失败时如何排查。

本页按角色组织：

- **普通用户**：阅读 [用户：登录与登出](#用户-登录与登出)；
- **管理员**：阅读 [管理员：配置 OIDC](#管理员-配置-oidc)、[管理员：管理 OIDC 用户](#管理员-管理-oidc-用户) 与 [常见问题排查](#常见问题排查)。

**适用对象**：管理员（配置 OIDC、管理 OIDC 用户）与普通用户（点击「使用 XXX 登录」按钮登录）。

## OIDC 是什么

OIDC（OpenID Connect）是基于 OAuth 2.0 的身份认证协议。Kuboard 充当依赖方（Relying Party），把账号认证委托给身份提供方（IdP，如 Keycloak、Okta、Entra ID）：配置完成后，用户在登录页点击「使用 {显示名称} 登录」，跳转到 IdP 完成认证，通过后自动回到 Kuboard（首次登录自动创建本地用户）。

Kuboard 采用**单 IdP** 形态：所有 OIDC 字段集中在同一张卡片（**系统管理 → 系统设置 → 用户登录设置 → OIDC SSO**）下，无向导页签、无多 IdP 列表、无「测试连接」按钮。

接入流程分三步：**管理员配置 OIDC 卡片** → **登录页出现「使用 {显示名称} 登录」按钮** → **用户点击按钮用 IdP 账号登录**。下面按角色说明。

## 用户：登录与登出

### 登录

启用 OIDC 后（且回调白名单非空），登录页自动选中 **OIDC** 并隐藏用户名 / 密码输入框。点击「使用 {显示名称} 登录」按钮，页面整页跳转到 IdP；在 IdP 完成认证（若有 MFA 则二次验证）后，自动回到 Kuboard 首页，首次登录自动创建本地用户。

登录令牌通过 URL fragment（`#token=...`）落地，不会进入浏览器历史记录或代理，安全可靠。

若登录失败，登录页会跳回并提示**错误码**，对照处理见 [常见问题排查 → 登录失败错误码](#登录失败-跳回登录页并提示错误码)。

### 单点登出

点击右上角**登出**：

1. Kuboard 删除本地会话；
2. 跳转到 IdP 的登出端点（`end_session_endpoint`），注销单点会话；
3. 回到 Kuboard 登录页。

若 IdP 未提供登出端点，则只完成本地登出（后端日志会提示），用户需自行关闭 IdP 会话。

### 令牌续期

无需用户操作：本地令牌临近过期时由系统自动续期，用户无感知。行为由管理员的「[静默续期](#静默续期-silent-refresh)」配置决定。

## 管理员：配置 OIDC

### 快速开始：5 分钟接入 Keycloak

接入后，用户在登录页点击「使用 {显示名称} 登录」，跳转 IdP 完成认证，通过后自动回到 Kuboard 首页。下面以 **Keycloak** 为例（标准 OIDC，与其它标准 IdP 配置一致）。

#### 第一步：在 Keycloak 中创建客户端

打开 Keycloak 管理台，在 **Clients → Create client** 创建客户端：Client type 选 **OpenID Connect**，Client ID 填 `kuboard`，勾选 **Client authentication** 与 **Standard flow**；记住你的 Realm issuer 地址，形如 `https://sso.example.com/realms/kuboard`。

在 **Valid redirect URIs** 中填入 Kuboard 回调地址（仅需填这一个地址，由 `origin` 自动识别发起方），再到 **Credentials** 页复制 **Client secret** 留待填用：

```sh
https://<kuboard域名>/api/anonymous.kuboard.cn/v4/oidc/callback
```

#### 第二步：在 Kuboard 中填写 OIDC 配置

入口：**系统管理 → 系统设置 → 用户登录设置 → OIDC SSO** 卡片（整张卡片所有字段都配在这一处，形态见 [OIDC 是什么](#oidc-是什么)）。

<!-- screenshot-todo: 用户登录设置中的 OIDC SSO 卡片（docs/zh/user/oidc.assets/user-oidc-1.png） -->

| 字段 | 示例填写 | 说明 |
| --- | --- | --- |
| 启用 | 开 | 关闭后登录页不出现 OIDC radio |
| 显示名称 | `Keycloak SSO` | 登录按钮文案（`Login with {显示名称}`），用户可见 |
| Issuer URI（后端内部） | `http://keycloak:8080/realms/kuboard` | 后端拉取 discovery 用，填后端可达地址（compose/k8s 内网或宿主机地址） |
| Issuer URI（浏览器外部） | `https://sso.example.com/realms/kuboard` | 浏览器跳转用；内外网地址不同时填写，留空则取左侧值 |
| **回调白名单** | `["https://kuboard.example.com"]` | **必填**，至少 1 个；登录页 origin 不在白名单内一律回 502 |
| Client ID | `kuboard` | 与 Keycloak 中一致 |
| Client Secret | 上一步复制的 secret | 保存后字段级加密落库 |
| Scopes | `openid profile email` | 默认即可；需要 refresh_token 续期时加 `offline_access` |
| 用户名 Claim | `preferred_username` | Kuboard 用户名 |
| Email Claim | `email` | 邮箱（预绑定匹配与合并） |
| 全名 Claim | `name` | 显示名 |
| 信任 Email 合并 | 开 | IdP 返回的 email 与本地用户相同时自动合并；关闭则视为新身份 |

填完**保存**后，登录页即可看到「使用 {显示名称} 登录」按钮（OIDC 启用且白名单非空时隐藏用户名/密码）。

#### 第三步：验证登录

按 [用户：登录与登出](#用户-登录与登出) 的步骤验证：登录页自动选中 OIDC → 点「使用 Keycloak SSO 登录」→ 跳转 Keycloak 完成认证（有 MFA 则二次验证）→ 回到 Kuboard 首页，左侧用户列表出现该用户（来源 OIDC）。

### 回调白名单（必填）

Kuboard 强制要求管理员预先声明「登录页可能出现的 origin」白名单，至少 1 条；为空时所有回调一律返回 502（防 open-redirect）。

| 场景 | 应填入 |
| --- | --- |
| 单 Kuboard 实例 + 单域名 | `["https://kuboard.example.com"]` |
| 同实例多端口（如 dev 8848 / staging 8849） | `["http://localhost:8848", "http://localhost:8849"]` |
| 反向代理 + 根域 / 子域 | `["https://kuboard.example.com", "https://ui.kuboard.example.com"]` |

**校验时机**：用户在登录页选 OIDC → 点登录 → 后端 `/oidc/login-start?origin=...`（origin 取 `location.origin` 经白名单消毒）→ IdP 登录 → 回调 `/oidc/callback`（再次校验 `Origin`/`Referer` 与白名单）。两道防线，攻击者无法通过伪造 `origin` query 强行跳转到攻击者控制的域名。

::: warning 开发与生产同实例时
本地调试（`http://localhost:8848`）与生产（`https://kuboard.example.com`）通常要同时加入白名单，否则本地无法发起 OIDC 登录或登录后被踢回登录页。
:::

### Issuer 双值：内网 / 外网两个 URI 的区别

「Issuer URI（后端内部）」供后端拉取 discovery 元数据，必须后端可达；「Issuer URI（浏览器外部）」供浏览器跳转，仅在内外网访问地址不同时填写（如内网 DNS 与公网域名不一致），留空则取左侧值。

**双值容忍**：后端同时接受 discovery 实际 issuer 等于内网 URI 或外网 URI 任一值。换言之，**当后端通过内网地址拉取 discovery，而 discovery 返回的 issuer 是外网地址时，仍可视为同一个 Realm；反之亦然**。自检命令：

```sh
# 自检：后端拉取 discovery 的地址，以及它实际返回的 issuer
curl -s http://keycloak:8080/realms/kuboard/.well-known/openid-configuration | jq .issuer
```

**唯一仍会被拒绝的情况**：上述两个值都不是 discovery 返回的 issuer（典型反例：discovery 返回 `https://sso.example.com/realms/kuboard`，而你两个 URI 都填了 `http://keycloak:8080/realms/kuboard`）。

### Claims 映射

各 IdP 的 id_token claim 命名略有出入，三个字段做映射对照；如果 IdP 用其它 claim（如 `sub`、`upn`），把对应字段改成你本地登录名所在的 claim 即可：

| 字段 | 默认 claim | 用途 |
| --- | --- | --- |
| 用户名 Claim | `preferred_username` | Kuboard 用户名 |
| Email Claim | `email` | 邮箱（预绑定匹配与合并） |
| 全名 Claim | `name` | 显示名 |

**信任 Email 合并**（默认开启）：IdP 返回的 email 与本地其它来源用户相同时自动合并，实现「同一人多方式登录」；关闭则每次登录都视为新身份。

### MFA 策略

OIDC 用户的 MFA 由 **IdP 负责**，Kuboard 依据 id_token 中的 `amr` / `acr` / `auth_time` 标准 claim 判断本次登录是否完成 MFA：

| 字段 | 默认 | 行为 |
| --- | --- | --- |
| 信任 IdP MFA | 开 | 依据 amr/acr/auth_time 判断登录是否完成 MFA；关闭则一律视为未启用 |
| 强制 IdP MFA | 关 | 未在 IdP 完成 MFA 的登录被**拒绝**（回登录页提示错误码） |
| MFA acr_values | `mfa` | 发起授权时携带的参数，告知 IdP 此次登录要求 MFA |
| auth_time 最大间隔（秒） | `300` | auth_time 距今超过该秒数视为「MFA 已过期」；0 关闭检查 |

**启动校验**：当 OIDC 已启用且 `requireMfa=true && !trustIdpMfa` 时，后端启动日志会输出一条 WARN（仅配置互斥提示，不阻断启动）。

::: warning 开启强制前先确认 IdP 下发 claim
若 id_token 缺失 `auth_time` 或 `amr`（部分 IdP 默认不开），启用「强制 IdP MFA」后登录会被拒绝。请先在 IdP 侧确认能下发。
:::

### 静默续期（Silent Refresh）

若 IdP 下发 refresh_token（需 `offline_access` scope），本地令牌临近过期时会自动续期，**用户完全无感**（见 [用户：令牌续期](#令牌续期)）：

| 字段 | 默认 | 行为 |
| --- | --- | --- |
| 启用静默续期 | 开 | JWT 过期前自动用 refresh_token 续期；关闭则到期跳回登录页 |
| 静默续期阈值（秒） | `300` | 距过期剩余时间小于该秒数时触发；最低 30 |

**安全约束**：会话行以 Kuboard JWT 的 jti 为主键，IdP tokens 字段级加密落库；silent refresh 重签 JWT 后以新 jti 换行。

### 限流（Rate Limit）

防爆破/防回调洪水，3 个独立计数器（每个默认不限流；填正整数时按窗口去重）：

| 字段 | 作用域 |
| --- | --- |
| login-start 限流（次/分钟） | `GET /oidc/login-start` |
| callback 限流（次/分钟） | `GET /oidc/callback` |
| logout 限流（次/分钟） | `POST /oidc/logout` |

## 管理员：管理 OIDC 用户

**查看列表**：用户列表把「来源」筛选切到 **OIDC**（仅启用时出现），展示用户名、显示名、邮箱、状态，可搜索与批量删除。

**预创建账号（预绑定）**：想在首次登录前确定账号（分配角色 / 组），点列表页 **「+ 预创建 OIDC 用户」**：① 填 **Email**，必须与 IdP 的 email claim **完全一致**（大小写敏感）；② 可选填显示名，保存后出现「待首次登录」占位行；③ 首次登录成功后占位行替换为真实用户，原角色 / 组保留。若登录后出现的是新用户而非合并到占位行，通常是 email 与 IdP 不一致，请核对大小写与域名后缀。

## 常见问题排查

### 登录页没有「OIDC 登录」按钮

- 用户来源区仅在启用 OIDC 时出现：检查 **系统设置 → 用户登录设置 → OIDC SSO → 启用** 开关。
- OIDC 已启用但仍不出现：检查 **回调白名单** 是否为空（后端启动日志会输出 WARN：「OIDC 已启用但 oidcAllowedOrigins 未配置：所有 callback 将被拒绝」）。
- 保存后未生效：`ConfigLogin` 是 `SystemConfigService` 缓存的，读端缓存替换原 CSV。配置后重启后端或调 `cn.kuboard.systemconfig.SystemConfigService.evictCache`。

### Issuer discovery 拉取失败

- 内网地址确认与 IdP 网络互通；公网地址确认域名解析与 TLS 证书。
- 报 `issuer mismatch`：见 [Issuer 双值](#issuer-双值-内网-外网两个-uri-的区别) 一节。两个 URI 至少要有一个等于 discovery 返回的 issuer。
- 宿主机环境：local-auth（compose）后端为宿主机进程，Keycloak 域名必须用**宿主机 hostname**（`env-prepare.sh` 以 `hostname` 命令解析），宿主机端口 **9098**（容器内 8080）。`oidcIssuerUri` / `oidcIssuerExternalUri` 均指向 `http://{hostname}:9098/realms/kuboard`，而非 compose 内网 `keycloak:8080`，宿主机无法解析。

### 登录失败，跳回登录页并提示错误码

回调失败时登录页携带 `?oidcError=错误码`，对照处理：

| 错误码 | 可能原因 | 处理 |
| --- | --- | --- |
| `state_invalid` | state 不匹配 / 已消费；回调 URL 被改写 | 重新发起登录；检查回调 URL 是否被反代改写 |
| `code_exchange_failed` | Client ID / Secret 错误；token_endpoint 调用失败；回调时白名单校验失败 | 核对 Client 配置；重新生成 secret；确认 origin 在白名单 |
| `id_token_invalid` | 验签失败；issuer / audience 不符；已过期；nonce 不匹配 | 检查 IdP 类型与 Issuer 是否配错；确认 JWKS 可拉取 |
| `oidc_mfa_required` | 未完成 MFA 但开启了强制 | 见 [MFA 策略](#mfa-策略) |
| `oidc_mfa_stale` | MFA 完成时间超过「auth_time 最大间隔」 | 重新登录，或调大该间隔 |
| `oidc_not_configured` | 后端未启用 OIDC 或 issuerUri 为空 | 确认配置 + 重启后端 |
| `oidc_internal_error` | 后端异常（discovery 拉取、JWKS、字段加密等） | 看后端日志 WARN/ERROR 行 |

::: warning callback?code=... 但浏览器收到 502
白名单（`oidcAllowedOrigins`）为空或 origin 不在白名单内。补白名单后再次发起登录。
:::

### 登出后 IdP 会话未注销

正常路径：本地会话删除 + 顶层跳转到 IdP `end_session_endpoint` → IdP 显示登出确认页 → 回到 `/login`。若仅本地登出且后端日志 WARN「no IdP end_session_endpoint available」：当前 IdP 的 discovery 未下发 `end_session_endpoint`（典型如部分老版本 Okta / Entra ID），属已知 gap-accepted；用户需手动关闭 IdP 会话。

### 回调地址与反向代理

回调地址由后端依据 `X-Forwarded-Proto` / `X-Forwarded-Host` 请求头拼出；反代未正确传递这两个头时会报 `redirect_uri` 不匹配。部署注意事项见 [反向代理](../install/reverse-proxy.md) 与 [Kuboard 代理](../ops/kuboard-proxy.md)。

## 相关文档

[登录页与各认证方式的关系](./login) · [MFA 多因素认证](./mfa) · [用户列表与用户管理](./users) · [密码策略与修改密码](./password)

## 接口文档

本节涉及的接口详见 [Swagger UI 的「权限管理接口」分组](../reference/api)。