---
description: "Configure OIDC single sign-on (SSO): Issuer, Client, claims mapping, MFA policy and silent renewal; how users sign in and out with the Sign in with XXX button; OIDC user pre-binding and troubleshooting login failures."
---

# Kuboard OIDC Single Sign-On (SSO)

This page explains how to configure OIDC single sign-on (SSO, an identity authentication protocol based on OAuth 2.0), how users sign in and out with an IdP account, and how to troubleshoot login failures.

**Applicable to**: administrators (configuring the IdP, managing OIDC users) and regular users (signing in with the "Sign in with XXX" button).

## Quick Start: Connect an IdP in 5 Minutes

After the IdP is connected, users select the OIDC source on the login page and click "Sign in with XXX", are redirected to the IdP to complete authentication, and on success automatically return to the Kuboard home page (the local user is auto-created on first login). Below, **Keycloak** is used as an example (standard OIDC, configured exactly like a generic IdP).

### Step 1: Create a Client in Keycloak

Open the Keycloak admin console and create a client under **Clients → Create client**: choose **OpenID Connect** as the Client type, enter `kuboard` as the Client ID, and enable **Client authentication** and **Standard flow**. Note your Realm's issuer address, e.g. `https://sso.example.com/realms/kuboard`.

In **Valid redirect URIs**, fill in Kuboard's callback address, then copy the **Client secret** from the **Credentials** page for later use:

```sh
https://<kuboard-domain>/api/anonymous.kuboard.cn/v4/oidc/callback
```

### Step 2: Enable OIDC in Kuboard

Entry: **System Management → System Settings → User Login Settings → OIDC SSO** card. Turn on the **Enable OIDC Login** switch and fill in the fields as below:

| Field | Example value | Description |
| --- | --- | --- |
| Backend Issuer URI | `http://keycloak:8080/realms/kuboard` | Used by the backend to fetch discovery / token / JWKS; fill in an address reachable on the internal network |
| Browser-Facing Issuer URI | `https://sso.example.com/realms/kuboard` | Used for the browser redirect; fill in only when internal and external access addresses differ — empty means the value on the left is used |
| Allowed Frontend Origins | `https://kuboard.example.com` | **Required.** Origin (scheme + host + port) of the page the callback may redirect back to; you can add multiple entries. If empty, all OIDC logins are rejected |
| Client ID | `kuboard` | Same as in Keycloak |
| Client Secret | The secret copied in the previous step | Encrypted at rest after saving |
| Scopes | `openid profile email` | The default is fine; add `offline_access` if you need silent renewal |
| Login Button Label | `Keycloak SSO` | The "Sign in with XXX" button text on the login page; default `OIDC` |

<!-- screenshot-todo: the OIDC SSO card (enabled, single-IdP flat form with fields filled in); capture as user-oidc-1.png on the en page using the local-auth env -->

Click **Save** once done; the OIDC SSO card shows "Enabled" at the top. If login fails later, the usual causes are an unreachable Issuer or a missing whitelist entry (see [Troubleshooting](#troubleshooting)).

### Step 3: Verify the Login

① On the login page, select **OIDC** as the user source and click **"Sign in with Keycloak SSO"**; ② the browser redirects to the Keycloak login page (a second-factor step if MFA is configured); ③ on success you automatically return to the Kuboard home page. Afterwards, turning off the **Enable OIDC Login** switch makes the OIDC login button disappear from the login page.

## Configuration Reference

| Setting | Default | Description |
| --- | --- | --- |
| Enable OIDC Login | Off | Master switch; when off, no OIDC login button appears on the login page |
| Backend Issuer URI | Empty | The address the backend uses to call the IdP (discovery / token / JWKS); must be reachable from the backend |
| Browser-Facing Issuer URI | Empty | Browser redirect address; empty means the value on the left. The issuer returned by discovery is considered valid if it matches this value or the Backend Issuer URI **character for character** |
| Allowed Frontend Origins | Empty (required) | Origins the callback may redirect back to (open-redirect protection); all callbacks are rejected when empty |
| Client ID / Client Secret | Empty | Same as the client in the IdP; the Secret is encrypted at rest after saving |
| Scopes | `openid profile email` | Scopes requested at authorization; add `offline_access` if you need silent renewal |
| Login Button Label | `OIDC` | The XXX in "Sign in with XXX" on the login page |
| Username Claim | `preferred_username` | Used as the Kuboard username |
| Email Claim | `email` | Used as the email (pre-bind matching and account merge) |
| Full Name Claim | `name` | Used as the display name |
| Trust IdP Email (merge accounts) | On | When the email returned by the IdP matches a local user from another source, the logins are merged automatically; when off, every login is treated as a new identity |

### OIDC MFA

MFA for OIDC users is **handled by the IdP**. Kuboard decides whether this login completed MFA from the `amr` and `auth_time` claims in the id_token:

| Option | Default | Behavior |
| --- | --- | --- |
| Trust IdP MFA | On | Uses amr / auth_time to decide whether this login completed MFA; when off, every login is treated as not MFA-verified |
| Enforce MFA | Off | Logins that did not complete MFA at the IdP are **rejected** (redirected back to the login page with an error code) |
| ACR Values for MFA | `mfa` | The acr parameter carried on the authorization request, telling the IdP that this login requires MFA |
| Auth Time Max Age (seconds) | `300` | If auth_time is older than this many seconds, MFA is treated as expired; 0 disables the check |

::: warning Confirm the IdP issues the claims before enabling Enforce
If the id_token lacks `auth_time` or `amr` (some IdPs do not issue them by default), logins will be rejected after you enable **Enforce MFA**. Confirm on the IdP side that it can issue them first.
:::

### Silent Renewal

| Option | Default | Behavior |
| --- | --- | --- |
| Enable Silent Renewal | On | When the IdP issues a refresh token (requires the `offline_access` scope), the local token is silently renewed in the background when it is about to expire, with no user-visible interruption |
| Silent Renewal Threshold (seconds) | `300` | Renewal is triggered when the token's remaining lifetime falls below this value (minimum 30) |

## How Users Log In with OIDC

**Signing in**: after switching the user source to **OIDC** on the login page, the **"Sign in with XXX"** button appears below the form (XXX is the "Login Button Label"); clicking it redirects the whole page to the IdP, and once authentication succeeds you automatically return to the Kuboard home page (the login page remembers your last user-source choice).

**Single sign-out**: clicking Logout in the top-right first clears the local session, then redirects to the IdP's end-session endpoint to terminate the single sign-on session, and finally returns to the Kuboard login page; if the IdP provides no end-session endpoint, only local logout is performed.

## Managing OIDC Users (Administrators)

**Viewing the list**: open **System Management → User Management** and switch the user-source filter to **OIDC** (this option appears only when OIDC is enabled); the list shows username, display name, email, and status, and supports search and bulk delete.

**Pre-creating accounts (pre-bind)**: to settle an account (assign roles / groups) before the first login, switch the user source to **OIDC** in a screen where you pick a user (e.g. adding members to a user group), then click **"+ Pre-create OIDC User"** at the bottom of the user dropdown:

1. Fill in the **Email**, which must **exactly match** the user's email claim in the IdP (it is normalized to lowercase when saved);
2. Optionally fill in a display name — after saving, a "pending first login" placeholder row appears;
3. After the first login succeeds, the placeholder row is replaced by the real user, keeping the original roles / groups.

If a new user appears after login instead of merging into the placeholder row, the email usually does not match the IdP — check case and domain suffix.

::: tip OIDC users have no Kuboard password
The password and MFA of an OIDC user are managed by the identity provider; they cannot sign in with a username / password. After login they are not in any user group by default (only the home page is accessible) until an administrator adds them to groups.
:::

## Troubleshooting

### No "Sign in with XXX" Button on the Login Page

Check that the **Enable OIDC Login** switch on the OIDC SSO card is on. If it still does not appear, confirm the **Allowed Frontend Origins** is not empty and contains the current page's origin (scheme + host + port).

### Login Fails and Returns to the Login Page with an Error Code

When the callback fails, the login page carries `?oidcError=error code`; handle it as follows:

| Error code | Possible cause | Handling |
| --- | --- | --- |
| `state_invalid` | Callback URL rewritten; state replayed | Re-initiate the login; check the callback URL |
| `code_exchange_failed` | Wrong Client ID / Secret; standard flow not enabled | Verify the Client configuration; regenerate the secret |
| `id_token_invalid` | Signature verification failed, issuer / audience mismatch, or expired | Check whether the Issuer is misconfigured; verify the client config on the IdP side |
| `oidc_mfa_required` | MFA not completed but Enforce is on | See [OIDC MFA](#oidc-mfa) |
| `oidc_mfa_stale` | MFA completed longer ago than the "Auth Time Max Age" | Log in again, or increase the interval |

::: danger issuer mismatch is the easiest mistake
The issuer returned by discovery must **match character for character** with either the Backend Issuer URI or the Browser-Facing Issuer URI; when `issuer mismatch` is reported, set the Backend Issuer URI to the value discovery actually returns.
:::

### Callback URL and Reverse Proxy

The callback URL is assembled by the backend from the `X-Forwarded-Proto` / `X-Forwarded-Host` request headers; if the reverse proxy does not forward these two headers correctly, a `redirect_uri` mismatch is reported. Deployment notes are in [Reverse Proxy](../install/reverse-proxy.md) and [Kuboard Proxy](../ops/kuboard-proxy.md).

## Related Documents

[Login page and the relationship between authentication methods](./login) · [MFA multi-factor authentication](./mfa) · [User list and user management](./users) · [Password policy and changing your password](./password)

## API Documentation

The APIs involved in this section are in [Swagger UI "Authentication APIs" group](../reference/api).