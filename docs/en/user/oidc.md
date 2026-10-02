---
description: Configure Kuboard OIDC single sign-on: single-IdP setup, issuer dual-value tolerance, mandatory callback whitelist, claims mapping, MFA policy, silent refresh, rate limits; user login / logout; error codes and troubleshooting.
---

# Kuboard OIDC Single Sign-On

This page explains how to configure OIDC SSO for Kuboard (identity layer built on OAuth 2.0), how users log in via their IdP account, and how to diagnose failed logins.

**Audience**: administrators (configure OIDC, manage OIDC users) and end users (click the **Login with {display name}** button).

## 5-minute setup with Keycloak

After setup, users click **Login with {display name}** on the login page → jump to IdP → return to Kuboard homepage (local user auto-created on first login). The example below uses **Keycloak** (standard OIDC; same fields apply to any standard IdP).

### Step 1: Create a client in Keycloak

Open Keycloak admin console → **Clients → Create client**: Client type = **OpenID Connect**, Client ID = `kuboard`, tick **Client authentication** and **Standard flow**. Note your Realm issuer (e.g. `https://sso.example.com/realms/kuboard`).

In **Valid redirect URIs**, add the Kuboard callback URL (only this one is needed; the `origin` query discriminates callers):

```sh
https://<kuboard-host>/api/anonymous.kuboard.cn/v4/oidc/callback
```

In **Credentials**, copy the **Client secret** for the next step.

### Step 2: Fill the OIDC card in Kuboard

Navigate: **System Admin → System Settings → User Login Settings → OIDC SSO** card. Kuboard uses a **single-IdP** shape: all OIDC fields live on the same card — no wizard tabs, no multi-IdP list, no **Test Connection** button.

<!-- screenshot-todo: OIDC SSO card in user login settings (docs/en/user/oidc.assets/user-oidc-1.png) -->

| Field | Example | Notes |
| --- | --- | --- |
| Enable | ON | When off, the OIDC radio is hidden on the login page |
| Display Name | `Keycloak SSO` | Login button text (`Login with {display name}`), visible to end users |
| Issuer URI (backend internal) | `http://keycloak:8080/realms/kuboard` | Backend uses this to fetch discovery — must be reachable from backend (compose/k8s internal or host) |
| Issuer URI (browser external) | `https://sso.example.com/realms/kuboard` | Used for browser redirect; fill only when internal/external differ; falls back to left when empty |
| **Callback whitelist** | `["https://kuboard.example.com"]` | **Mandatory**, at least 1 entry; empty whitelist rejects every callback with 502 |
| Client ID | `kuboard` | Matches Keycloak |
| Client Secret | the secret you copied | Stored field-encrypted by `OidcProviderConfigCipher` |
| Scopes | `openid profile email` | Default; add `offline_access` if you need refresh-token renewal |
| Username Claim | `preferred_username` | Kuboard username |
| Email Claim | `email` | Email (prebinding match & merge) |
| Full Name Claim | `name` | Display name |
| Trust Email Merge | ON | When IdP email matches a local user, merge identities; OFF treats each login as new |

Click **Save**. The login page now shows **Login with {display name}** (when OIDC is enabled and the whitelist is non-empty, username/password fields are hidden).

### Step 3: Verify

① Login page selects **OIDC** by default; click **Login with Keycloak SSO**. ② Browser jumps to Keycloak (MFA challenge if required). ③ After success, return to Kuboard homepage; the user appears in the user list with source = OIDC.

## Issuer dual-value: internal vs external URI

**Issuer URI (backend internal)** is what the backend uses to fetch discovery; **must be reachable from backend**. **Issuer URI (browser external)** is what the browser uses for redirects; fill it when internal/external addresses differ, or leave empty to use the internal one.

**Dual-value tolerance**: the backend accepts discovery's actual `issuer` if it equals *either* the internal URI or the external URI. In other words, **when the backend fetches discovery via the internal address but discovery returns the external issuer, they're treated as the same Realm — and vice versa**.

**Only when both URIs fail to match discovery's issuer is the login rejected** (typical anti-pattern: discovery returns `https://sso.example.com/realms/kuboard` while both URIs are set to `http://keycloak:8080/realms/kuboard`).

```sh
# Self-check: address the backend uses, and the issuer it actually returns
curl -s http://keycloak:8080/realms/kuboard/.well-known/openid-configuration | jq .issuer
```

## Callback whitelist (mandatory)

Kuboard requires a pre-declared list of acceptable origins for the login page. `oidcAllowedOrigins` must contain at least one entry; an empty list rejects every callback with HTTP 502 (open-redirect defense).

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

## Claims mapping

Different IdPs use different claim names for the same concept. Three fields map the Kuboard-side semantic to IdP-side claims:

| Field | Default claim | Purpose |
| --- | --- | --- |
| Username Claim | `preferred_username` | Kuboard username |
| Email Claim | `email` | Email (prebinding match & merge) |
| Full Name Claim | `name` | Display name |

**Trust Email Merge** (ON by default): when IdP's email matches a local user, identities are merged (one user, multiple login methods); OFF treats each login as a new identity.

## MFA policy

OIDC user MFA is **enforced by the IdP**. Kuboard reads the standard `amr` / `acr` / `auth_time` claims from the id_token to tell whether the current login completed MFA:

| Field | Default | Behavior |
| --- | --- | --- |
| Trust IdP MFA | ON | Read amr/acr/auth_time to decide MFA completion; OFF treats every login as non-MFA |
| Require IdP MFA | OFF | Reject logins without MFA (redirect to login with error code) |
| MFA acr_values | `mfa` | Sent to IdP via the authorization request to indicate MFA is required |
| auth_time max age (seconds) | `300` | `auth_time` older than this many seconds is treated as **MFA stale**; 0 disables the check |

**Startup check**: when OIDC is enabled and `requireMfa=true && !trustIdpMfa`, the backend emits a startup WARN (configuration conflict notice only; does not block startup).

::: warning Before enabling Require IdP MFA
Some IdPs do not emit `auth_time` or `amr` by default. Enabling **Require IdP MFA** on such an IdP blocks everyone. Confirm your IdP emits these claims first.
:::

## Silent refresh

When the IdP issues a refresh_token (requires `offline_access` scope), Kuboard renews the local session transparently before the JWT expires:

| Field | Default | Behavior |
| --- | --- | --- |
| Enable silent refresh | ON | Renew JWT via refresh_token; OFF → redirect to login page on expiry |
| Silent refresh threshold (seconds) | `300` | Trigger when remaining < this; minimum 30 |

**Security**: session rows (`kb_u_oidc_session`) are keyed by Kuboard JWT `jti`; IdP tokens are stored field-encrypted by `OidcFieldCipher`; silent refresh re-signs the JWT and `OidcSessionService.rotate` swaps the row by new `jti`.

## Rate limits

Brute-force / callback-flood defense — three independent counters (no limit when blank; positive integer caps per-minute):

| Field | Scope |
| --- | --- |
| login-start rate limit (per minute) | `GET /oidc/login-start` |
| callback rate limit (per minute) | `GET /oidc/callback` |
| logout rate limit (per minute) | `POST /oidc/logout` |

## User login / logout

**Login**: when OIDC is enabled, the login page defaults to OIDC and hides username/password. Clicking **Login with {display name}** triggers a top-level redirect to the IdP. After successful authentication, the user returns to the Kuboard homepage; the token lands via URL fragment `#token=...` (the frontend reads `location.hash`, so the token **does not** enter the proxy or browser history).

**Single sign-out (RP-Initiated Logout)**: clicking logout → `POST /oidc/logout` (authenticated) deletes the local session → top-level redirect to IdP `end_session_endpoint` with `id_token_hint` and `post_logout_redirect_uri` → finally back to Kuboard `/login`. If the IdP does not provide `end_session_endpoint`, only the local session is removed (backend logs WARN "local session cleaned but IdP session NOT terminated").

**Silent refresh**: when the local JWT is close to expiry (default 300s), the browser transparently renews it — end users do not notice.

## OIDC user management (admin)

**Listing**: switch the user list's **Source** filter to **OIDC** (only appears when enabled) to see username / display name / email / status; supports search and batch delete.

**Pre-binding**: to assign roles / groups *before* first login, click **+ Pre-create OIDC user**: ① fill **Email** — must **exactly match** the IdP's email claim (case-sensitive). ② optionally fill the display name; save → a "pending first login" placeholder row appears. ③ On first login the placeholder is replaced by the real user, preserving roles / groups. If a new user appears instead of the merge, the email usually does not match the IdP — verify case and domain suffix.

## Troubleshooting

### Login page has no OIDC option

- OIDC option only appears when enabled: check **System Settings → User Login Settings → OIDC SSO → Enable**.
- OIDC is enabled but the option still doesn't appear: check **Callback whitelist** is non-empty (backend startup logs WARN: "OIDC is enabled but oidcAllowedOrigins is not configured: all callbacks will be rejected").
- Save doesn't take effect: `ConfigLogin` is cached in `SystemConfigService`; restart backend or call `cn.kuboard.systemconfig.SystemConfigService.evictCache`.

### Discovery fetch failure

- Confirm internal address is reachable from backend; public address resolves correctly with valid TLS.
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
The whitelist (`oidcAllowedOrigins`) is empty or origin is not in it. Add the origin to the whitelist and retry.
:::

### Logout leaves IdP session alive

Expected flow: local session deleted → top-level redirect to IdP `end_session_endpoint` → IdP shows logout confirmation → back to `/login`. If only local logout happened and backend logged WARN "no IdP end_session_endpoint available": the IdP's discovery does not advertise `end_session_endpoint` (typical of some older Okta / Entra ID versions) — accepted gap; users must close the IdP session manually.

### Callback URL & reverse proxy

The callback URL is built by the backend from `X-Forwarded-Proto` / `X-Forwarded-Host` request headers. Misconfigured proxies cause `redirect_uri` mismatch. See [Reverse proxy](../install/reverse-proxy.md) and [Kuboard proxy](../ops/kuboard-proxy.md).

## Related documentation

[Login page and authentication methods](./login) · [MFA multi-factor authentication](./mfa) · [User list and management](./users) · [Password policy and password change](./password)

## API reference

See the **Auth API** group in [Swagger UI](../reference/api).