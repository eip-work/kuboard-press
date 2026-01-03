# Webhook 用户认证

许多情况下，用户所在企业有自己的用户库，例如 LDAP 或者其他存储企业员工信息（及密码）的系统。Kuboard v4 可以通过 webhook 与这些用户库对接，并使用这些用户库中的用户名密码登录 Kuboard。

Kuboard v4 通过 webhook 接口与外部用户库（例如 LDAP）集成，具体请参考 [https://github.com/eip-work/kuboard-v4-ldap-example](https://github.com/eip-work/kuboard-v4-ldap-example)

> * 这并不是单点登录，因为用户仍然要在 Kuboard 界面中输入用户名及密码；
