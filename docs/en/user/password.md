---
description: "Change your own login password and check its expiry date; how administrators can reset another user's password and unlock accounts; what to do when you forget your password; how to recover an administrator account via direct database modification when all administrators forget their passwords."
---

# Change and Reset Password

This page explains how to change your own login password, how password expiry is calculated, how administrators can reset another user's password, and what to do when you forget your password.

**Applicable to**: users in the Kuboard built-in user repository. Users authenticated via [OIDC](./oidc) or an [external user Webhook](./webhook-users) have their passwords managed by the identity provider (IdP) and are not covered in this page.

## Change Your Own Password

1. Open the profile page: click your **avatar → Change Password** in the top-right, or select **Profile → Change Password** in the left menu.
2. Fill in the **new password** and **confirm password** in the form, then click **Save**.

You only need to enter the new password; the old one is not required. The new password must satisfy the **password policy** described below.

<!-- screenshot-todo: en screenshot of the change-password form (docs/en/user/password.assets/password-form.png) -->

::: tip Password Expiry Hint
The top of the change-password page shows the expiry date of your current password. When it is about to expire, a reminder also appears in your to-do list.
:::

### Password Policy

The password policy is configured by administrators under **System Settings → Login Settings → Password Policy**. Defaults:

| Rule | Default |
|---|---|
| Length | 6–24 characters |
| Character mix | Must include uppercase letters, lowercase letters, and digits |
| Reuse | Cannot match any of the last 3 passwords |
| Failed attempts | Account locked for 60 minutes after 5 consecutive failures |
| Must differ from current password | ✓ |
| Must differ from default initial password | ✓ |

Administrators can change these rules. The change-password form validates against the current rules in real time.

## Password Expiry

Each account's password has an **expiry date**. Defaults:

- **New account / after reset**: the initial password must be changed within 3 days
- **After voluntary change**: the new password is valid for 90 days

You cannot log in after the password expires. When it is about to expire, a reminder appears in your to-do list — follow it to change your password.

## Forgot Password

Kuboard does not offer self-service password recovery. Contact an administrator:

1. The administrator resets your password to the initial password `Kuboard123`.
2. Log in with the initial password and immediately change it to your own password using the steps above.

::: warning Change It Right After Reset
The default initial password is publicly known. Please change it to a strong password as soon as possible after the reset.
:::

## Reset Another User's Password (Administrator)

Go to **User Management → select the user → Reset Password**. The password is reset to the initial password `Kuboard123`, and the failed-attempt counter and expiry timer are cleared. A locked account is also unlocked automatically by the reset.

To only unlock an account without resetting the password, click the **Unlock** button in the same row.

## When All Administrators Forget Their Passwords (Direct Database Modification)

If **all** administrators have forgotten their passwords, no administrator account can log in, so passwords cannot be reset through the UI. In this case, only someone with database access (typically the deployment team) can recover an administrator account by modifying the password field directly in the database.

::: danger Last resort — back up before operating
Direct database modification is a last resort, only for when UI login is impossible. Back up the database (or at least the current content of `kb_u_user`) before running any statement. A mistake can leave accounts unable to log in or cause other data problems.
:::

**Steps**:

1. Connect to the Kuboard database (MySQL / MariaDB, or PostgreSQL / OpenGauss) with a database client (mysql / psql / GUI client);
2. Run the SQL below to restore the built-in administrator `admin` to the initial password `Kuboard123`;
3. Log in with `admin` / `Kuboard123`, then immediately change it to a strong password per [Change Your Own Password](#change-your-own-password).

**MySQL / MariaDB**:

```sql
UPDATE kb_u_user SET
  password = '$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq',
  password_expiry_date = CURDATE() + INTERVAL 3 DAY,
  password_try_count = 0,
  status = 'enabled'
WHERE username = 'admin' AND source = 'dao';
```

**PostgreSQL / OpenGauss**:

```sql
UPDATE kb_u_user SET
  password = '$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq',
  password_expiry_date = CURRENT_DATE + INTERVAL '3 days',
  password_try_count = 0,
  status = 'enabled'
WHERE username = 'admin' AND source = 'dao';
```

::: tip About the hash
`$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq` is the BCrypt hash of the initial password `Kuboard123` (identical to the hash baked into the built-in administrator on a fresh install) and can be written directly into the `password` column. The SQL above also zeroes `password_try_count` (unlocks the account after repeated failures), sets `password_expiry_date` to 3 days from now (matching the UI reset behavior, so the password is changed promptly), and sets `status` to `enabled`.
:::

**Notes**:

- The built-in administrator is `admin` with `source` = `dao` by default; if the username was renamed, replace `username` in the SQL accordingly;
- The same hash can recover any built-in user: just change the WHERE condition to the target `username`;
- If the account has MFA (multi-factor authentication) bound, resetting the password alone is not enough — you also need to clear its `mfa_secret` (this unbinds MFA; the user must re-enroll after logging in):

  ```sql
  UPDATE kb_u_user SET mfa_secret = NULL WHERE username = 'admin' AND source = 'dao';
  ```

## API Reference

See the [Swagger UI "Login APIs" group](../reference/api) for the endpoints involved in this page.