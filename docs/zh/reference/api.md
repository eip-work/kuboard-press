---
description: 如何访问 Kuboard V4 的 Swagger UI 与 OpenAPI 描述文件，以及 5 个接口分组各自的用途与在 Swagger UI 中的显示名
---

# Kuboard V4 接口文档（Swagger UI / OpenAPI）

本页说明从哪里访问 Kuboard V4 的接口文档（Swagger UI 与 OpenAPI 描述），以及 5 个接口分组分别覆盖哪些功能域。

**适用对象**：需要浏览、调试 Kuboard 接口的开发者。接口服务与 Web 控制台共用同一个地址和端口（详见 [端口说明](../install/quickstart#端口说明)），直接用浏览器访问 Kuboard 的地址即可。

## 访问入口

| 入口 | 地址 | 用途 |
| --- | --- | --- |
| Swagger UI | `http://<kuboard 地址>/swagger-ui/index.html` | 可视化界面，按分组浏览、在线调试接口 |
| OpenAPI 描述 | `http://<kuboard 地址>/v3/api-docs` | 完整 OpenAPI JSON 描述 |
| 分组描述 | `http://<kuboard 地址>/v3/api-docs/{分组名}` | 单个分组的 OpenAPI JSON，`{分组名}` 见下表 |

::: tip 访问与调试
文档页面无需登录即可打开；点击 "Try it out" 实际调用接口时，需要先登录并携带访问凭证。
:::

## 接口分组

Swagger UI 按 5 个分组（Group）组织接口，每个分组对应一类 API：

| 分组名（URL 中使用） | Swagger UI 中的显示名 | 覆盖的功能域 |
| --- | --- | --- |
| login.kuboard.cn | 登录接口 | 登录登出、MFA、访问密钥（AccessKey）管理、登录后的用户信息与菜单 |
| auth.kuboard.cn | 权限管理接口 | 用户、角色、用户组与权限管理，OIDC 配置 |
| cluster.kuboard.cn | 集群管理接口 | 集群的增删改查、集群缓存、Kubernetes 能力检测 |
| cd.kuboard.cn | 持续交付接口 | 持续交付（Continuous Delivery）：更新工作负载镜像、重启工作负载等 |
| config.kuboard.cn | 系统配置接口 | 系统配置的读取与修改 |

具体接口以 Swagger UI 中展示为准，本页不逐一列举。

::: warning 不在分组内的接口
Swagger 分组与接口内部的授权分组不是一回事。MCP、Helm、审计、Kubernetes 直连、匿名接口等**没有**独立的分组，不会出现在上表中，也不会在 Swagger UI 中展示。
:::

::: tip 关闭接口文档
设置环境变量 `KUBOARD_SWAGGER_ENABLED=false` 可整体关闭 Swagger UI 与 `/v3/api-docs`（默认开启）。环境变量的完整说明见 [环境变量](./kuboard-env)。
:::
