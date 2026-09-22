---
description: "What makes up the login page, how to choose between the available sign-in methods, what to do on your first login, what to do when your session expires, and how to troubleshoot common login problems."
---

# Kuboard User Login

This page explains how to log in to Kuboard: what the login page consists of, how to choose between the available authentication methods, what to do on your first login, what happens when your session expires, and how to troubleshoot common login problems.

**Applicable to**: regular users and administrators of the Kuboard Web UI. For detailed configuration of each authentication method, see [OIDC Single Sign-On (SSO)](./oidc), [MFA Multi-Factor Authentication](./mfa), [Changing and Resetting Passwords](./password), and [Access Keys (Key/Secret)](./access-keys).

## Login Page

The login form sits in the middle of the login page and consists of the username and password input fields; the top-right corner lets you switch the interface language and dark mode. When the administrator has enabled OIDC or the Webhook user repository, a **User Source** selector appears above the form; when OIDC is enabled, a **Sign in with XXX** button appears below the form.

The login page only shows the sign-in methods the administrator has **enabled**. When only the built-in user repository is enabled, the login page shows just the username/password form.

<!-- screenshot-todo: en screenshot of the login page (docs/en/user/login.assets/login-page.png) -->

## Authentication Methods and How to Choose

| Sign-in method | Entry on the login page | Password managed by Kuboard? | When to use |
|---|---|---|---|
| Built-in user repository (username + password) | Log in directly with the form | Yes | Default for small teams |
| Webhook user repository | Select "User Source → External User Repository" first, then fill in username + password | No, validated by the external service | Existing external account system |
| OIDC Single Sign-On (SSO) | "Sign in with XXX" button, full-page redirect | No, managed by the identity provider (IdP) | Enterprise unified identity |
| MFA one-time password (OTP) | Layered on top of username/password; one extra 6-digit code at login | — | Higher account security |

MFA (Multi-Factor Authentication) is not an independent username/password entry; it is a second verification layer layered on top of the other sign-in methods. Enable it when you need higher account security; details in [MFA Multi-Factor Authentication](./mfa).

## Username/Password Login

Using an account in the built-in user repository or the Webhook user repository as an example:

1. Fill in your **username** and **password**; if the administrator has enabled multiple user sources, first pick the right one under **User Source**.
2. Click **Log In**. Accounts with MFA bound will open an **MFA Verification** dialog — see the next section.
3. After a successful login you land on the home page.

The login page remembers the username and the sign-in method you used last time, and preselects the same method the next time you open it.

::: tip
Logging in with the Webhook user repository works exactly the same as with the built-in user repository — the username/password are just validated by the external service, and Kuboard does not store your password.
:::

### MFA Second-factor Verification

For accounts with MFA bound, an **MFA Verification** dialog opens after the password is verified. Enter any one of the following:

- **One-time password (OTP)**: a 6-digit code from the authenticator app on your phone (e.g. Google Authenticator);
- **Recovery Codes**: a 16-character one-time recovery code — the backup entry for when you lose your authenticator.

The input field distinguishes automatically by length: 6 digits or fewer are treated as an OTP, anything longer as a recovery code.

If an account has no MFA bound while the administrator has forced binding, login does not fail — instead, right after logging in you are taken to the MFA **binding page**, and you must complete the binding before you can enter the system normally.

::: warning
MFA binding, unbinding and recovery code management all happen after login; see [MFA Multi-Factor Authentication](./mfa) for the procedures. If you lose your authenticator and use up all recovery codes, contact an administrator to unbind.
:::

## OIDC Single Sign-On (SSO)

After the administrator has configured OIDC (OpenID Connect), a **Sign in with XXX** button appears on the login page. When multiple IdPs are connected, an **OIDC Provider** dropdown appears above the button — pick the enterprise identity system first, then click the button. Clicking it redirects the whole page to that identity system; after you complete authentication there (including the enterprise-side MFA), you are redirected back to Kuboard and logged in automatically.

OIDC users have no Kuboard password; their account password and MFA are both managed by the identity provider (IdP). Kuboard only auto-creates the matching local account on the first authentication.

::: tip
If clicking **Sign in with XXX** does nothing or reports an error, it is usually an IdP configuration issue — ask the administrator to check it. IdP integration settings are in [OIDC Single Sign-On (SSO)](./oidc).
:::

## First Login

Accounts created by an administrator have the default password `Kuboard123`. Change it immediately after your first login: click your **avatar → Change Password** in the top-right.

- The default password is **valid for 3 days**; if you do not change it in time, you will not be able to log in;
- After you change it yourself, the new password is **valid for 90 days**; when changing, you cannot keep using the default password or a recently used historical password (rules in [password](./password)).

## Session Expiry

- A login session expires by default after **30 minutes** (subject to system configuration); after that long without activity, you must log in again.
- Before the session times out, the system **silently renews** it in the background, so normal operation is usually not interrupted.
- Once the session has actually expired, you are sent back to the login page; after a successful re-login you are automatically returned to the page you were on.
- When the administrator has enabled "one account may only be logged in at a single location" (enabled by default), logging in on a new device/browser signs out the session on the old device. This is expected behavior, not a fault.

## Frequently Asked Questions

**Administrator forgot their password**: another administrator logs in, finds the user in **User Management**, and runs **Reset Password**. The password is reset to `Kuboard123`; log in with that default password and change it immediately.

**Account is locked**: after 5 consecutive wrong passwords, the account is locked for 60 minutes. You can wait for the automatic unlock, or ask an administrator to run **Unlock** in User Management.

**"Cannot use the default password / Cannot use a historical password"**: the default password, the current password and recently used passwords can no longer be used — just choose a new one.

**Lost MFA authenticator / used up recovery codes**: first log in with a recovery code (select **Recovery Code** in the MFA dialog on the login page and enter the 16-character recovery code); after logging in you can regenerate recovery codes. If the recovery codes are also used up, contact an administrator to unbind — see [MFA Multi-Factor Authentication](./mfa).

**No "Sign in with XXX" button on the login page**: the administrator has not enabled or correctly configured OIDC — ask them to check.

**Landing on an unexpected page after login**: just log in again — no other action needed.

## Related Pages and API Documentation

- [OIDC Single Sign-On (SSO)](./oidc) — IdP configuration, multiple IdPs, OIDC MFA trust policy
- [MFA Multi-Factor Authentication](./mfa) — TOTP binding/unbinding, recovery code management
- [Changing and Resetting Passwords](./password) — password policy configuration, personal password changes
- [Access Keys (Key/Secret)](./access-keys) — AK/SK authentication for MCP and automation scenarios

The APIs involved in this section are in the **"Login APIs"** group of [Swagger UI](../reference/api).