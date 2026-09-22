---
description: "Configure OIDC single sign-on (SSO): adding an IdP, claims mapping, MFA policy, and group sync; how users sign in and out with the Sign in with XXX button; OIDC user pre-binding and troubleshooting login failures."
---

# Kuboard OIDC Single Sign-On (SSO)

This page explains how to configure OIDC single sign-on (SSO, an identity authentication protocol based on OAuth 2.0), how users sign in and out with an IdP account, and how to troubleshoot login failures.

**Applicable to**: administrators (configuring IdPs, managing OIDC users) and regular users (signing in with the "Sign in with XXX" button).

## Quick Start: Connect an IdP in 5 Minutes

After the IdP is connected, users click "Sign in with XXX" on the login page, are redirected to the IdP to complete authentication, and on success automatically return to the Kuboard home page (the local user is auto-created on first login). Below, **Keycloak** is used as an example (standard OIDC, configured exactly like a generic IdP).

### Step 1: Create a Client in Keycloak

Open the Keycloak admin console and create a client under **Clients → Create client**: choose **OpenID Connect** as the Client type, enter `kuboard` as the Client ID, and enable **Client authentication** and **Standard flow**. Note your Realm's issuer address, e.g. `https://sso.example.com/realms/kuboard`.

In **Valid redirect URIs**, fill in Kuboard's callback address (all IdPs share this single address; the originating IdP is detected automatically), then copy the **Client secret** from the **Credentials** page for later use:

```sh
https://<kuboard-domain>/api/anonymous.kuboard.cn/v4/oidc/callback
```

### Step 2: Add the IdP in Kuboard

Entry: **System Management → System Settings → User Authentication Settings → OIDC SSO** → **"Add OIDC IdP"** (wizard tabs: Basic Info → Discovery and Client → Claims & Advanced → Confirm and Save). Required fields: Display Name, Issuer URI, Client ID, Client Secret.

<!-- screenshot-todo: the OIDC SSO section in User Authentication Settings (same as ./oidc.assets/user-oidc-1.png on the zh page, capture in English UI) -->

| Field | Example value | Description |
| --- | --- | --- |
| Display Name | `Keycloak SSO` | The login button text, visible to users |
| Enabled | On | When off, not shown on the login page |
| IdP Type | Keycloak / Red Hat SSO | See [Supported IdP Types](#supported-idp-types); choose **Generic OIDC** if unsure |
| Issuer URI (backend) | `http://keycloak:8080/realms/kuboard` | Used by the backend to fetch discovery; fill in an address reachable on the internal network |
| Issuer URI (browser) | `https://sso.example.com/realms/kuboard` | Used for the browser redirect; empty means the value on the left is used |
| Client ID | `kuboard` | Same as in Keycloak |
| Client Secret | The secret copied in the previous step | Encrypted at rest after saving |
| Scopes | `openid profile email` | Default is fine; add `groups` for Group Sync |

After filling in, click **"Test Connection"**; once you see "Connection OK · latency · JWKS key count", click **Save**; on failure, check the network and the Issuer (see [Troubleshooting](#troubleshooting)).

<!-- screenshot-todo: the Add OIDC IdP drawer form (same as ./oidc.assets/user-oidc-2.png on the zh page, capture in English UI) -->

### Step 3: Verify the Login

① On the login page, select **OIDC** as the user source and click **"Sign in with Keycloak SSO"**; ② the browser redirects to the Keycloak login page (a second-factor step if MFA is configured); ③ on success you automatically return to the Kuboard home page, where this user appears in the left sidebar (source: OIDC). Afterwards, in the OIDC SSO list you can **enable/disable, edit, or delete** this IdP (an enabled one must be disabled first).

## Supported IdP Types

Almost any standard OIDC service can work with **Generic OIDC**:

| Type | Target | Description |
| --- | --- | --- |
| Generic OIDC | Any standard OIDC | Default; the most broadly compatible |
| Keycloak / Red Hat SSO | Keycloak | Standard OIDC |
| Authing / Alibaba Cloud IDaaS / Tencent Cloud CIAM | Chinese SaaS / IDaaS | — |
| Microsoft Entra ID (Azure AD) | Formerly Azure AD | Some versions do not support redirecting back to the login page on logout |
| Okta / Auth0 / GitLab | — | GitLab is standard OIDC |
| WeCom (WeChat Work) / Feishu (Lark) | WeCom, Lark | OIDC discovery supported |

::: tip Only affects behavioral differences, not the structure of what you fill in
No matter which type you choose, the fields you fill in (Issuer / Client ID / Client Secret / Claims) all follow the standard OIDC structure; the difference lies only in each vendor's adaptation. If a vendor behaves oddly, switching to **Generic OIDC** is the fastest way to compare.
:::

## Difference Between the Internal / External Issuer

**Issuer URI (backend)** is used by the backend to fetch the discovery metadata and must be reachable from the backend; **Issuer URI (browser)** is used for the browser redirect and needs to be filled in only when the internal and external access addresses differ (e.g. internal DNS differs from the public domain) — empty means the former is used. Both must refer to the same realm; you can self-check with the command below:

```sh
# Self-check: the address the backend fetches discovery from
curl -s http://keycloak:8080/realms/kuboard/.well-known/openid-configuration
```

## Claims Mapping

Each vendor names the id_token claims slightly differently; map them with the following three fields. If your IdP uses other claims (e.g. `sub`, `upn`), just change the corresponding field to the claim that carries your local login name:

| Field | Default claim | Purpose |
| --- | --- | --- |
| Username Claim | `preferred_username` | Kuboard username |
| Email Claim | `email` | Email (used for pre-bind matching and merge) |
| Full Name Claim | `name` | Display name |

**Trust Email for Merge** (on by default): when the email returned by the IdP matches a local user from another source, the logins are merged automatically, giving "one person, multiple ways to log in"; when off, every login is treated as a new identity.

## MFA Policy

MFA for OIDC users is **handled by the IdP**. Kuboard decides whether this login completed MFA from the standard `amr`, `acr`, and `auth_time` claims in the id_token:

| Option | Default | Behavior |
| --- | --- | --- |
| Trust IdP MFA | On | Uses amr/acr/auth_time to decide whether this login completed MFA; when off, every login is treated as not MFA-verified |
| Enforce IdP MFA | Off | Logins that did not complete MFA at the IdP are **rejected** (redirected back to the login page with an error code) |
| MFA acr_values | `mfa` | Parameter carried on the authorization request, telling the IdP that this login requires MFA |
| auth_time max interval (seconds) | `300` | If auth_time is older than this many seconds, MFA is treated as expired; 0 disables the check |

::: warning Confirm the IdP issues the claims before enabling Enforce
If the id_token lacks `auth_time` or `amr` (some IdPs do not issue them by default), logins will be rejected after you enable **Enforce IdP MFA**. Confirm on the IdP side that it can issue them first.
:::

## Group Sync (Optional)

When enabled, the Group Claim issued by the IdP (default `groups`) is read at login, and users are automatically added to the corresponding user groups according to the **IdP Group → Kuboard Group** mapping table. Create the target user groups in Kuboard first; protected built-in groups are never modified by sync.

## How Users Log In with OIDC

**Signing in**: after selecting **OIDC** as the user source on the login page, the "Sign in with {display name}" button is shown directly when there is only one IdP; with multiple IdPs, pick one in the dropdown first. Clicking it redirects the whole page to the IdP, and once authentication succeeds you automatically return to the Kuboard home page (the browser remembers your last choice).

**Single sign-out and silent renewal**: clicking Logout in the top-right first clears the local session, then redirects to the IdP's end-session endpoint to terminate the single sign-on session, and finally returns to the Kuboard login page; if the IdP provides no end-session endpoint, only local logout is performed. The first login auto-creates the Kuboard user (source: OIDC); if the IdP issues a refresh token (requires the `offline_access` scope), the local token is silently renewed in the background when it is about to expire, with no user-visible interruption.

## Managing OIDC Users (Administrators)

**Viewing the list**: open the user list and switch the **Source** filter to **OIDC** (this option appears only when OIDC is enabled); the list shows username, display name, email, and status, and supports search and bulk delete.

**Pre-creating accounts (pre-bind)**: to settle an account (assign roles / groups) before the first login, click **"+ Pre-create OIDC User"** on the list page: ① fill in the **Email**, which must **exactly match** the user's email claim in the IdP; ② optionally fill in a display name — after saving, a "pending first login" placeholder row appears; ③ after the first login succeeds, the placeholder row is replaced by the real user, keeping the original roles / groups. If a new user appears after login instead of merging into the placeholder row, the email usually does not match the IdP — check case and domain suffix.

## Troubleshooting

### No "OIDC Login" Button on the Login Page / Test Connection Fails

- No "OIDC Login" button: the user source area appears only when OIDC is enabled — check that the OIDC SSO list contains an **enabled** IdP and that **Test Connection** passed (the Issuer is reachable from the backend).
- Test Connection fails / discovery cannot be fetched: for an internal address, confirm network connectivity with the IdP; for a public address, confirm DNS resolution and TLS. If `issuer mismatch` is reported, see the note below.

### Login Fails and Returns to the Login Page with an Error Code

When the callback fails, the login page carries `?oidcError=error code`; handle it as follows:

| Error code | Possible cause | Handling |
| --- | --- | --- |
| `state_invalid` | Callback URL rewritten; multi-IdP config inconsistent | Re-initiate the login; check the callback URL |
| `code_exchange_failed` | Wrong Client ID / Secret; standard flow not enabled | Verify the Client configuration; regenerate the secret |
| `id_token_invalid` | Signature verification failed, issuer / audience mismatch, or expired | Check whether the IdP type and Issuer are misconfigured |
| `oidc_mfa_required` | MFA not completed but Enforce is on | See [MFA Policy](#mfa-policy) |
| `oidc_mfa_stale` | MFA completed longer ago than the "auth_time max interval" | Log in again, or increase the interval |

::: danger issuer mismatch is the easiest mistake
The issuer returned by discovery must **match character for character** with the configured Issuer URI; when the internal and external addresses differ, set **Issuer URI (backend)** to the value discovery actually returns.
:::

### Callback URL and Reverse Proxy

The callback URL is assembled by the backend from the `X-Forwarded-Proto` / `X-Forwarded-Host` request headers; if the reverse proxy does not forward these two headers correctly, a `redirect_uri` mismatch is reported. Deployment notes are in [Reverse Proxy](../install/reverse-proxy.md) and [Kuboard Proxy](../ops/kuboard-proxy.md).

## Related Documents

[Login page and the relationship between authentication methods](./login) · [MFA multi-factor authentication](./mfa) · [User list and user management](./users) · [Password policy and changing your password](./password)

## API Documentation

The APIs involved in this section are in [Swagger UI "Authentication APIs" group](../reference/api).