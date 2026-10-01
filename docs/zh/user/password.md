---
description: 修改自己的登录密码、查看密码有效期；管理员如何重置其他用户的密码、解除账号锁定；忘记密码如何处置；所有管理员忘记密码时如何通过直接修改数据库恢复。
---

# 修改与重置密码

本页说明如何修改自己的登录密码、密码有效期如何计算、管理员如何重置其他用户的密码，以及忘记密码如何处置。

**适用对象**：Kuboard 内建用户库的用户。通过 [OIDC](./oidc) 或 [外部用户 Webhook](./webhook-users) 接入的用户，其密码由身份提供方管理，不在本页范围内。

## 修改自己的密码

1. 进入个人信息页：点击右上角**头像 → 修改密码**，或在左侧菜单选择**个人信息 → 修改密码**。
2. 在表单中填写**新密码**与**确认密码**，点**保存**。

表单只填新密码，不需要填旧密码。新密码必须满足下面的**密码策略**。

<!-- screenshot-todo: 修改密码表单截图（docs/user/password.assets/password-form.png） -->

::: tip 密码有效期提示
修改密码页顶部会展示当前密码的到期日。临近过期时，你的待办里也会出现一条提醒。
:::

### 密码策略

密码策略由管理员在**系统设置 → 用户登录设置 → 密码策略**中配置，默认如下：

| 规则 | 默认值 |
|---|---|
| 长度 | 6-24 位 |
| 字符组合 | 必须包含大写字母、小写字母、数字 |
| 不能与最近 | 3 个历史密码相同 |
| 连续错误 | 5 次后锁定 60 分钟 |
| 不能等于当前密码 | ✓ |
| 不能等于默认初始密码 | ✓ |

管理员可以修改这些规则。前端在修改密码时会按当前规则实时校验。

## 密码有效期

每个账号的密码都有一个**有效期**。默认：

- **新账号 / 重置后**：初始密码 3 天内必须修改
- **主动修改后**：新密码 90 天内有效

密码到期后无法登录；临近到期时，待办里会出提醒，按提醒去改密码即可。

## 忘记密码

Kuboard 不提供自助找回密码。请联系管理员：

1. 管理员将你的密码重置为初始密码 `Kuboard123`
2. 你用初始密码登录，立即按上面步骤修改成自己的密码

::: warning 重置后请立即修改
默认初始密码是公开的，重置后请尽快改为你自己的强密码。
:::

## 管理员重置他人密码

进入**用户管理 → 选中用户 → 重置密码**，密码会被重置为初始密码 `Kuboard123`，并清除错误计数与有效期计时。已被锁定的账号，重置操作也会自动解锁。

如只需解除锁定、不重置密码，可点同一行的**解锁**按钮。

## 所有管理员都忘记密码时（直接修改数据库）

如果**所有**管理员都忘记了自己的密码，没有任何管理员账号可以登录，也就无法通过界面重置密码。此时只能由具备数据库访问权限的部署方，直接修改数据库中的密码字段来恢复管理员账号。

::: danger 最后手段，操作前请备份
直接修改数据库是最后手段，仅在无法通过界面登录时使用。执行前请先备份数据库（或至少记录 `kb_u_user` 表的当前内容）。错误操作可能导致账号无法登录或产生其他数据问题。
:::

**步骤**：

1. 使用数据库客户端（如 mysql / psql / 图形客户端）连接到 Kuboard 的数据库（MySQL / MariaDB，或 PostgreSQL / OpenGauss）；
2. 执行下面的 SQL，将内置管理员 `admin` 的密码恢复为初始密码 `Kuboard123`；
3. 用 `admin` / `Kuboard123` 登录 Kuboard，登录后立即按[修改自己的密码](#修改自己的密码)改为强密码。

**MySQL / MariaDB**：

```sql
UPDATE kb_u_user SET
  password = '$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq',
  password_expiry_date = CURDATE() + INTERVAL 3 DAY,
  password_try_count = 0,
  status = 'enabled'
WHERE username = 'admin' AND source = 'dao';
```

**PostgreSQL / OpenGauss**：

```sql
UPDATE kb_u_user SET
  password = '$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq',
  password_expiry_date = CURRENT_DATE + INTERVAL '3 days',
  password_try_count = 0,
  status = 'enabled'
WHERE username = 'admin' AND source = 'dao';
```

::: tip 密文说明
`$2a$10$RaZvDg8M4T8.MpUN4YCmPeuDE2bW9fwp7pjWqm5y8OvRIDeJizsaq` 是初始密码 `Kuboard123` 的 BCrypt 密文（与 Kuboard 全新安装时内置管理员的密文一致），可直接写入 `password` 字段。上述 SQL 同时把 `password_try_count` 清零（解除因多次错误导致的锁定）、把 `password_expiry_date` 设为 3 天后（与界面重置的行为一致，要求尽快改密）、把 `status` 置为 `enabled`。
:::

**补充说明**：

- 内置管理员的用户名默认为 `admin`、`source` 为 `dao`；如果管理员用户名被改过，请把 SQL 中的 `username` 换成实际的用户名；
- 该密文也可用于恢复任意内建用户的密码：把 WHERE 条件换成目标 `username` 即可；
- 如果该账号绑定过 MFA（多因子认证），仅重置密码仍无法登录，还需一并清除其 `mfa_secret`（解除该账号的 MFA 绑定，登录后需重新绑定）：

  ```sql
  UPDATE kb_u_user SET mfa_secret = NULL WHERE username = 'admin' AND source = 'dao';
  ```

## 接口文档

本节涉及的接口详见 [Swagger UI 的「登录接口」分组](../reference/api)。