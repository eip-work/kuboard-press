---
description: "Connect an enterprise's existing user library (e.g. LDAP) to Kuboard via Webhook: prepare the authentication and user-list interfaces, enable it in System Settings, verify login, and manage external users"
---

# Webhook External User Library

If you already have a user library (e.g. LDAP), you can use a Webhook to forward login validation to it, so employees can log in directly with their existing accounts. This page explains how an administrator prepares and enables the Webhook user library.

::: warning This Is Not Single Sign-On (SSO)
Users still enter their username and password on the Kuboard login page; only the password validation is forwarded to the external user library. For single sign-on, see [OIDC single sign-on](./oidc).
:::

## How It Works

Once enabled, Kuboard calls your webhook URL at only two moments: when a **user logs in**, the username and password are sent to that address as a `POST` for authentication; when **User Management is opened**, a `GET` request fetches the paged user list in real time. The password of an external user library user exists only in your user library — Kuboard neither stores it nor can know it. After a user's first successful login, Kuboard automatically creates a local record (without the password) to hold local state such as MFA bindings and user group bindings; the authorization system (user groups, roles) applies to these users as well, see [User Groups](./groups) and [MFA multi-factor authentication](./mfa).

## Step 1: Prepare a Webhook User Service

You only need to provide one HTTP address and implement two kinds of requests on the **same address**: a `POST` for authentication and a `GET` for the user list. This address is the "External User Webhook" URL you fill in later in Kuboard.

**Authentication request (POST)**: sent at login; returns `code = 0` on success:

```json
// Request: POST {url}
{
  "username": "user01",
  "password": "password1"
}

// Response: authentication succeeded
{
  "code": 0,
  "message": "ok"
}
```

**User list request (GET)**: sent when the User Management page is opened; supports an optional `username` filter, e.g. `GET {url}?pageNum=1&pageSize=10&username=`. On success it returns the paged user list:

```json
// Response: success
{
  "code": 0,
  "message": "ok",
  "data": {
    "list": [
      {
        "username": "user01",
        "fullName": "User One",
        "email": "user01@example.com",
        "groups": ["developers"],
        "createTime": "2026-01-01T08:00:00.000+08:00"
      }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "total": 1
  }
}
```

**List item fields**:

| Field | Required | Description |
|---|---|---|
| username | Yes | Username (login name), the identifier Kuboard uses to recognize the user |
| fullName | No | Full name, displayed in the "Full Name" column |
| email | No | Email address, displayed in the "Email" column |
| groups | No | External groups the user belongs to, displayed in "External Groups" of the expanded row |
| createTime | No | User creation time |

**Return codes** (the `code` field of the `POST` / `GET` responses):

| code | Meaning and handling |
|---|---|
| 0 | Success: authentication passed / list returned normally |
| 1 | Authentication failed: login rejected, prompts that the username or password is incorrect |
| 2 | User not found: login rejected with a unified "incorrect username or password" prompt, avoiding exposure of whether the account exists |
| 3 | Internal error: returns a gateway error and displays `message` / `details` |

The official project provides a complete LDAP integration example, [eip-work/kuboard-v4-ldap-example](https://github.com/eip-work/kuboard-v4-ldap-example) (GitHub). After cloning, run `docker compose up -d` to get a configurable webhook user service.

::: danger Webhook URL Security
Kuboard calls the URL you fill in directly over HTTP, **without attaching any signature or authentication request header**. Please use HTTPS and validate the source on your service yourself (for example, restrict by IP or check a custom request header); the `message` / `details` fields appear in error messages — do not return sensitive information in them.
:::

## Step 2: Enable and Configure in Kuboard

Go to **System Settings → User Authentication Settings**; in the "**External User Library**" section, turn on the "**Enable External User Webhook**" toggle, fill in the "**External User Webhook**" service address, then click "**Save**".

<!-- screenshot-todo: the "External User Library" section in User Authentication Settings (same as ./webhook-users.assets/user-webhook-users-1.png on the zh page) -->

::: tip URL Reachability
This URL is accessed by the **Kuboard server** (not the browser), so fill in an address resolvable inside the cluster; do not use `localhost`.
:::

## Step 3: Verify Login

Log out and return to the login page, select the "**Webhook User Library**" radio option, enter the external user's username and password, and log in. A return of `code = 0` means the login succeeded.

<!-- screenshot-todo: the "Webhook User Library" radio option on the login page (same as the login page on the zh page) -->

## Step 4: View and Manage External Users

1. Go to **System Management → Users & Permissions → Users**, open the "**Source**" dropdown at the top-left, and select "**Webhook User Library**" — the table then shows the external user list.

<!-- screenshot-todo: the user list filtered by "Webhook User Library" source with expandable rows (same as ./webhook-users.assets/user-webhook-users-1.png content on the zh page) -->

| Column | Description |
|---|---|
| Source | Fixed as webhook |
| ID | Identifier of the local record; users who have never logged in show a "Never Logged In" tag |
| Full Name / Email | From the `fullName` / `email` returned by the webhook |
| MFA | The user's MFA binding status in Kuboard's local storage |
| Create Time | Creation time of the local record (i.e. the time of first login) |

Click the expand arrow at the start of a row to view **External Groups**, **Login & Security**, and **MFA** details. The list fetches data from the webhook in real time every time it is opened — refresh the page to see account changes made in the external user library.

### Available Operations

- **Bind to User Groups**: add the external user to a local user group to grant permissions (the local record is created automatically if it does not exist yet)
- **Reset MFA**: disenroll the user's MFA binding in Kuboard

::: warning Deletion Only Clears the Local Record
Deleting does not affect the account in the external user library, but clears the user's local state (MFA bindings, user group bindings); the record is recreated automatically on the next login or when queried again.
:::

## Comparison with the Built-in User Library

| Aspect | Built-in user library (dao) | Webhook user library (webhook) |
|---|---|---|
| Password storage | Kuboard local database | Only in the external user library; Kuboard does not store it |
| Account creation | Created by administrators in Kuboard | Maintained by the external user library; the local record is created automatically on first login |
| Password management | Kuboard can reset / unlock | Kuboard does not manage passwords; these operations do not apply |
| Permission granting | User groups + roles | Also via user groups + roles, see [User Groups](./groups) |
| Deletion | Deletes the local account | Clears only the local record; does not affect the external account |

## API Documentation

The APIs involved in this section are described in the [Swagger UI "Authentication APIs" group](../reference/api).