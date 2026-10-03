---
description: "Configure Kuboard OIDC single sign-on: single-IdP setup, issuer dual-value tolerance, mandatory callback whitelist, claims mapping, MFA policy, silent refresh, rate limits; user login / logout; error codes and troubleshooting."
outline: [2, 3]
---

# Kuboard OIDC Single Sign-On

This page explains how to configure OIDC SSO for Kuboard (identity layer built on OAuth 2.0), how users log in via their IdP account, and how to diagnose failed logins.

This page is organized by role:

- **End users**: see [Users: Login & Logout](#users-login-logout);
- **Administrators**: see [Administrators: Configure OIDC](#administrators-configure-oidc), [Administrators: Manage OIDC Users](#administrators-manage-oidc-users), and [Troubleshooting](#troubleshooting).

**Audience**: administrators (configure OIDC, manage OIDC users) and end users (click the **Login with {display name}** button).

## What Is OIDC

OIDC (OpenID Connect) is an identity layer built on OAuth 2.0. Kuboard acts as the Relying Party and delegates authentication to an identity provider (IdP, e.g. Keycloak, Okta, Entra ID): once configured, users click **Login with {display name}** on the login page, jump to the IdP to authenticate, and are automatically returned to Kuboard (a local user is auto-created on first login).

Kuboard uses a **single-IdP** shape: every OIDC field lives on one card (**System Admin → System Settings → User Login Settings → OIDC SSO**) — no wizard tabs, no multi-IdP list, no **Test Connection** button.

The integration is a three-step flow: **the administrator configures the OIDC card** → **the login page shows "Login with {display name}"** → **users click the button and sign in with their IdP account**. The rest of this page follows those roles.

## Users: Login & Logout

### Login

When OIDC is enabled (and the callback whitelist is non-empty), the login page selects **OIDC** by default and hides the username / password fields. Click **Login with {display name}** to do a full-page redirect to the IdP; after authenticating there (with a second factor if MFA is set up), you are returned to the Kuboard homepage, and a local user is auto-created on first login.

The login token lands via a URL fragment (`#token=...`), so it never enters browser history or the proxy.

If login fails, the login page redirects back and shows an **error code** — see [Troubleshooting → login failure error codes](#login-fails-login-page-shows-error-code).

### Single sign-out

Click **Logout** in the top-right corner:

1. Kuboard deletes the local session;
2. The browser is redirected to the IdP's `end_session_endpoint` to end the single-sign-on session;
3. You are returned to the Kuboard login page.

If the IdP does not provide an `end_session_endpoint`, only the local session is removed (the backend logs a notice); you must close the IdP session manually.

### Token renewal

No action needed: the local token is renewed automatically as it approaches expiry, transparently to the user. The behavior is governed by the administrator's [Silent refresh](#silent-refresh) configuration.

## Administrators: Configure OIDC

### 5-minute setup with Keycloak

After setup, users click **Login with {display name}** on the login page → jump to IdP → return to Kuboard homepage. The example below uses **Keycloak** (standard OIDC; the same fields apply to any standard IdP).

#### Step 1: Create a client in Keycloak

Open the Keycloak admin console → **Clients → Create client**: Client type = **OpenID Connect**, Client ID = `kuboard`, tick **Client authentication** and **Standard flow**. Note your Realm issuer (e.g. `https://sso.example.com/realms/kuboard`).

In **Valid redirect URIs**, add the Kuboard callback URL (only this one is needed; the `origin` query discriminates callers):

```sh
https://<kuboard-host>/api/anonymous.kuboard.cn/v4/oidc/callback
```

In **Credentials**, copy the **Client secret** for the next step.

#### Step 2: Fill the OIDC card in Kuboard

Navigate: **System Admin → System Settings → User Login Settings → OIDC SSO** card (all fields live on this single card; see [What Is OIDC](#what-is-oidc) for the single-IdP shape).

<!-- screenshot-todo: OIDC SSO card in user login settings (docs/en/user/oidc.assets/user-oidc-1.png) -->

| Field | Example | Notes |
| --- | --- | --- |
| Enable | ON | When off, the OIDC radio is hidden on the login page |
| Display Name | `Keycloak SSO` | Login button text (`Login with {display name}`), visible to end users |
| Issuer URI (backend internal) | `http://keycloak:8080/realms/kuboard` | Backend uses this to fetch discovery — must be reachable from the backend (compose/k8s internal or host) |
| Issuer URI (browser external) | `https://sso.example.com/realms/kuboard` | Used for browser redirect; fill only when internal/external addresses differ; falls back to the left value when empty |
| **Callback whitelist** | `["https://kuboard.example.com"]` | **Mandatory**, at least 1 entry; an empty whitelist rejects every callback with 502 |
| Client ID | `kuboard` | Matches Keycloak |
| Client Secret | the secret you copied | Stored field-encrypted after save |
| Scopes | `openid profile email` | Default; add `offline_access` if you need refresh-token renewal |
| Username Claim | `preferred_username` | Kuboard username |
| Email Claim | `email` | Email (prebinding match & merge) |
| Full Name Claim | `name` | Display name |
| Trust Email Merge | ON | When the IdP email matches a local user, merge identities; OFF treats each login as new |

Click **Save**. The login page now shows **Login with {display name}** (when OIDC is enabled and the whitelist is non-empty, username/password fields are hidden).

#### Step 3: Verify

Follow [Users: Login & Logout](#users-login-logout): the login page selects OIDC → click **Login with Keycloak SSO** → jump to Keycloak and complete authentication (with a second factor if MFA is set up) → return to the Kuboard homepage; the user appears in the user list with source = OIDC.

### Callback whitelist (mandatory)

Kuboard requires a pre-declared list of acceptable origins for the login page — at least one entry; an empty list rejects every callback with HTTP 502 (open-redirect defense).

| Scenario | Whitelist value |
| --- | --- |
| Single instance + single domain | `["https://kuboard.example.com"]` |
| Same instance, multiple ports (dev 8848 / staging 8849) | `["http://localhost:8848", "http://localhost:8849"]` |
| Reverse proxy + root + subdomain | `["https://kuboard.example.com", "https://ui.kuboard.example.com"]` |

**When validated — both places**:

- `GET /oidc/login-start?origin=...` (origin is taken from `location.origin` and sanitized against the whitelist)
- `GET /oidc/callback` (the callback re-checks `Origin`/`Referer` against the whitelist)

Two defense layers; attackers cannot force a redirect to a domain they control via a forged `origin` query.

::: warning Local dev + prod on the same instance
Add both `http://localhost:8848` (dev) and `https://kuboard.example.com` (prod) — otherwise dev login attempts are rejected.
:::

### Issuer dual-value: internal vs external URI

**Issuer URI (backend internal)** is what the backend uses to fetch discovery; it **must be reachable from the backend**. **Issuer URI (browser external)** is what the browser uses for redirects; fill it when internal/external addresses differ, or leave empty to use the internal one.

**Dual-value tolerance**: the backend accepts discovery's actual `issuer` if it equals *either* the internal URI or the external URI. In other words, **when the backend fetches discovery via the internal address but discovery returns the external issuer, they're treated as the same Realm — and vice versa**.

```sh
# Self-check: the address the backend uses, and the issuer it actually returns
curl -s http://keycloak:8080/realms/kuboard/.well-known/openid-configuration | jq .issuer
```

**Only when both URIs fail to match discovery's issuer is the login rejected** (typical anti-pattern: discovery returns `https://sso.example.com/realms/kuboard` while both URIs are set to `http://keycloak:8080/realms/kuboard`).

### Claims mapping

Different IdPs use different claim names for the same concept. Three fields map the Kuboard-side semantic to IdP-side claims; if your IdP uses other claims (e.g. `sub`, `upn`), change the field to the claim that holds your local login name:

| Field | Default claim | Purpose |
| --- | --- | --- |
| Username Claim | `preferred_username` | Kuboard username |
| Email Claim | `email` | Email (prebinding match & merge) |
| Full Name Claim | `name` | Display name |

**Trust Email Merge** (ON by default): when the IdP's email matches a local user, identities are merged (one user, multiple login methods); OFF treats each login as a new identity.

### MFA policy

OIDC user MFA is **enforced by the IdP**. Kuboard reads the standard `amr` / `acr` / `auth_time` claims from the id_token to tell whether the current login completed MFA:

| Field | Default | Behavior |
| --- | --- | --- |
| Trust IdP MFA | ON | Read amr/acr/auth_time to decide MFA completion; OFF treats every login as non-MFA |
| Require IdP MFA | OFF | Reject logins without MFA (redirect to login with an error code) |
| MFA acr_values | `mfa` | Sent to the IdP via the authorization request to indicate MFA is required |
| auth_time max age (seconds) | `300` | `auth_time` older than this many seconds is treated as **MFA stale**; 0 disables the check |

**Startup check**: when OIDC is enabled and `requireMfa=true && !trustIdpMfa`, the backend emits a startup WARN (configuration conflict notice only; does not block startup).

::: warning Before enabling Require IdP MFA
Some IdPs do not emit `auth_time` or `amr` by default. Enabling **Require IdP MFA** on such an IdP blocks everyone. Confirm your IdP emits these claims first.
:::

### Silent refresh

When the IdP issues a refresh_token (requires the `offline_access` scope), the local token is renewed automatically as it approaches expiry — **completely transparent to end users** (see [Users: Token renewal](#token-renewal)):

| Field | Default | Behavior |
| --- | --- | --- |
| Enable silent refresh | ON | Renew JWT via refresh_token; OFF → redirect to login page on expiry |
| Silent refresh threshold (seconds) | `300` | Trigger when remaining < this; minimum 30 |

**Security**: session rows are keyed by the Kuboard JWT `jti`; IdP tokens are stored field-encrypted; silent refresh re-signs the JWT and swaps the row by a new `jti`.

### Rate limits

Brute-force / callback-flood defense — three independent counters (no limit when blank; a positive integer caps per-minute):

| Field | Scope |
| --- | --- |
| login-start rate limit (per minute) | `GET /oidc/login-start` |
| callback rate limit (per minute) | `GET /oidc/callback` |
| logout rate limit (per minute) | `POST /oidc/logout` |

## Administrators: Manage OIDC Users

**Listing**: switch the user list's **Source** filter to **OIDC** (only appears when enabled) to see username / display name / email / status; supports search and batch delete.

**Pre-binding**: to assign roles / groups *before* first login, click **+ Pre-create OIDC user**: ① fill **Email** — must **exactly match** the IdP's email claim (case-sensitive). ② optionally fill the display name; save → a "pending first login" placeholder row appears. ③ On first login the placeholder is replaced by the real user, preserving roles / groups. If a new user appears instead of the merge, the email usually does not match the IdP — verify case and domain suffix.

## Troubleshooting

### Login page has no OIDC option

- The OIDC option only appears when enabled: check **System Settings → User Login Settings → OIDC SSO → Enable**.
- OIDC is enabled but the option still doesn't appear: check **Callback whitelist** is non-empty (backend startup logs WARN: "OIDC is enabled but oidcAllowedOrigins is not configured: all callbacks will be rejected").
- Save doesn't take effect: `ConfigLogin` is cached in `SystemConfigService`; restart the backend or call `cn.kuboard.systemconfig.SystemConfigService.evictCache`.

### Issuer discovery fetch fails

- Confirm the internal address is reachable from the backend; the public address resolves correctly with valid TLS.
- `issuer mismatch`: see [Issuer dual-value](#issuer-dual-value-internal-vs-external-uri). At least one of the two URIs must equal discovery's `issuer`.
- Local environments: when the backend runs as a host process (not in compose), the Keycloak hostname must be the **host hostname** (resolved via `hostname` by `env-prepare.sh`), port **9098** (8080 inside the container). Both `oidcIssuerUri` and `oidcIssuerExternalUri` should point to `http://{hostname}:9098/realms/kuboard` — `keycloak:8080` is unreachable from the host.

### Login fails, login page shows error code

Callback failure redirects back to `/login?oidcError={code}`:

| Error code | Likely cause | Resolution |
| --- | --- | --- |
| `state_invalid` | state mismatch / already consumed; callback URL rewritten | Re-initiate login; check reverse-proxy URL rewriting |
| `code_exchange_failed` | Bad Client ID / Secret; token_endpoint failure; whitelist check rejected callback | Verify Client config; regenerate secret; confirm origin is in the whitelist |
| `id_token_invalid` | Signature verification failed; issuer / audience mismatch; expired; nonce mismatch | Verify IdP type & Issuer; confirm JWKS is fetchable |
| `oidc_mfa_required` | MFA not completed but Require IdP MFA is on | See [MFA policy](#mfa-policy) |
| `oidc_mfa_stale` | MFA completion older than auth_time max age | Re-login or increase the interval |
| `oidc_not_configured` | Backend OIDC disabled or issuerUri is blank | Verify config + restart backend |
| `oidc_internal_error` | Backend exception (discovery / JWKS / field encryption) | Check backend WARN/ERROR logs |

::: warning callback?code=... but browser receives 502
The whitelist (`oidcAllowedOrigins`) is empty or the origin is not in it. Add the origin to the whitelist and retry.
:::

### Logout leaves IdP session alive

Expected flow: local session deleted → top-level redirect to IdP `end_session_endpoint` → IdP shows logout confirmation → back to `/login`. If only local logout happened and the backend logged WARN "no IdP end_session_endpoint available": the IdP's discovery does not advertise `end_session_endpoint` (typical of some older Okta / Entra ID versions) — accepted gap; users must close the IdP session manually.

### Callback URL & reverse proxy

The callback URL is built by the backend from `X-Forwarded-Proto` / `X-Forwarded-Host` request headers. Misconfigured proxies cause `redirect_uri` mismatch. See [Reverse proxy](../install/reverse-proxy.md) and [Kuboard proxy](../ops/kuboard-proxy.md).

## Related documentation

[Login page and authentication methods](./login) · [MFA multi-factor authentication](./mfa) · [User list and management](./users) · [Password policy and password change](./password)

## API reference

See the **Auth API** group in [Swagger UI](../reference/api).