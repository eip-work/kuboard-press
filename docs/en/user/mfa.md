---
description: "MFA multi-factor authentication: how administrators enable it, how users bind an authenticator app, one-time password (OTP) and recovery code second-factor verification at login, saving and regenerating recovery codes, unbinding MFA, and admin-assisted reset."
---

# MFA Multi-Factor Authentication

MFA (Multi-Factor Authentication) adds a one-time password check on top of the login password: your phone's authenticator app generates a 6-digit code every 30 seconds, which you enter together with the password at login.

**Who this applies to**: regular users and administrators. Users who sign in through [OIDC](./oidc) have their MFA handled by the identity provider (IdP) and are out of scope for this page.

::: tip Relationship with the login page
The MFA dialog and error messages in the login flow are described in [Login](./login); this page focuses on binding, day-to-day management, and troubleshooting.
:::

## Bind MFA

Before you start, an administrator must turn on the master switch under **System Settings → Login Settings → MFA Settings** (off by default):

| Setting | Default | Description |
| --- | --- | --- |
| Enable MFA | Off | Master switch; when off, neither binding nor login verification takes effect |
| Force binding | Off | When on, a user without MFA bound is taken to the binding page after a successful login, and can only access the login page and the binding page until binding is complete |
| Enable recovery codes | On | Whether recovery codes are generated and validated |

Once enabled, the "MFA Settings" tab under **Personal Info** becomes visible.

### Entry Points

1. **Normal binding**: left menu → **Personal Info → MFA Settings → Bind MFA**;
2. **Forced binding**: after a successful login you are automatically redirected to the binding page until binding is complete;
3. **Todo reminder**: a "Bind MFA" todo appears in your personal todos; clicking it opens the same binding page.

### Binding Steps

1. **Open your authenticator app and scan the QR code**: any TOTP-compatible authenticator is supported, such as Alibaba Cloud Authenticator, Tencent Cloud Authenticator, Google Authenticator, Microsoft Authenticator, Authy, 1Password, Bitwarden;
2. **Save the secret key**: click "**Copy**" to save the secret key shown on the page, then check "**I have saved the secret key**". The secret key is the key to recovery when you switch phones — enter it manually in a new authenticator app to import, without unbinding or contacting an administrator;
3. **Save the recovery codes**: write down the 10 recovery codes shown on the page and check "**I have saved the recovery codes**";
4. **Enter the one-time password**: fill in the 6-digit code currently shown in the authenticator app;
5. Click "**Bind**".

After a successful binding, a success page is shown and the recovery codes are displayed once more to remind you to save them. In the forced binding scenario, the binding page also asks for your current password.

<!-- screenshot-todo: en screenshot of the MFA binding page (docs/en/user/mfa.assets/mfa-bind.png) -->

::: warning Recovery codes are shown only once
The plaintext recovery codes are shown only this one time at a successful binding and can never be viewed again — be sure to write them down or take a screenshot.
:::

## Second-factor Verification at Login

When a user with MFA bound logs in, the "MFA Verification" dialog pops up after the password is entered; choose one of the two inputs:

| Input | Format | Purpose |
| --- | --- | --- |
| One-time password (TOTP) | 6 digits | When the authenticator app is available |
| Recovery Code | 16 characters | Backup credential when the authenticator app is unavailable |

The input field distinguishes automatically by length: 6 digits are validated as a one-time password, anything else as a recovery code. The "MFA Settings" tab shows the remaining recovery code count, so you can regenerate in time.

## Recovery Codes

Recovery codes are your backup login credentials when the authenticator is lost: 10 codes in total, each 16 characters, and **each can be used only once**.

On **Personal Info → MFA Settings**, click "**Regenerate Recovery Codes**", then verify your identity with a 6-digit one-time password or any existing recovery code to generate and display 10 new codes.

::: warning All old codes are invalidated after regeneration
The new codes completely replace the old ones, and the old recovery codes stop working immediately; if you verify with a recovery code, that code is consumed too. The new codes are also shown only once.
:::

## Unbind MFA

On **Personal Info → MFA Settings**, click "**Unbind MFA**" and enter your current login password to confirm. Unbinding deletes the secret key and the recovery codes; afterwards you need to re-bind to use MFA again.

::: tip Switching phones / authenticator apps? Prefer this
If you saved the secret key, simply enter it manually in the new authenticator app to import — no unbinding needed; if you didn't save the secret, handle it by "unbind → re-bind".
:::

## Admin-assisted Reset

When a user has lost the authenticator and used up all the recovery codes, and can no longer log in on their own, an administrator can reset on their behalf: go to **User Management → select the user → Reset MFA**, fill in the reset reason; after checking "**Also generate temporary recovery codes**", 10 one-time emergency recovery codes appear in the result — copy them and **pass them to the user through a secure channel**.

After the reset, the user returns to the "unbound" state and can log in and bind a new authenticator on their own; the emergency recovery codes are for restoring login as soon as possible and are invalidated after use.

## FAQ

### Authenticator App Lost / Switched Phone?

1. You have **recovery codes**: enter any recovery code in the "MFA Verification" dialog at login, then regenerate the recovery codes and re-bind after logging in;
2. You have the **secret key**: enter the secret key manually in the new authenticator app to import — no unbinding needed;
3. You have neither: contact an administrator for an **admin-assisted reset** (see above).

### Login Shows "MFA Code is Invalid"

The one-time password changes every 30 seconds; it is usually an expired or mistyped code. Make sure your phone's clock matches the server time and retry once; if it still fails, log in with a recovery code instead.

### Redirected Back to the Binding Page After Forced Binding

Expected behavior: a user who has not completed binding can only access the login page and the binding page; access is restored automatically once binding is complete.

### Want to Switch Authenticator Apps

Saved the secret key: enter it manually in the new app to import it (you can use several authenticators at the same time). Didn't save the secret: unbind and re-bind.

## API Documentation

The APIs involved in this section are described in the "Login APIs" group of the [Swagger UI](../reference/api).