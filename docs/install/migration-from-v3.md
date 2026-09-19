---
description: 从 Kuboard v3 迁移到 v4 的策略：架构差异、共存部署、授权独立关系与逐步迁移路径
---

# 从 Kuboard v3 迁移到 v4

Kuboard v3 与 Kuboard v4 使用了完全不同的技术架构，**不能**直接从 v3 "升级"到 v4（不存在原地升级通道，产品代码中也未提供任何 v3 → v4 的数据迁移脚本）。本文说明两者差异、共存部署方式、授权关系，并给出推荐的迁移路径与手动调整事项清单。

本文与 [安装 Kuboard v4](./index) 中的"致 Kuboard v3 用户"一节相互衔接，那里描述了基本兼容性结论，本文展开迁移细节。

## 为什么不能"升级"，只能"迁移"

### 架构差异总览

v3 与 v4 是两套独立的实现，差异如下（以官方安装文档与产品代码核实为准）：

| 维度 | Kuboard v3 | Kuboard v4 |
| --- | --- | --- |
| 前端技术栈 | Vue 2.7 | Vue 3 + TypeScript |
| 后端技术栈 | Golang 1.18（单体 Web 应用） | Java + Spring Boot（`kuboard-server`，接口路径含 `/api/*.kuboard.cn/v4/`） |
| 存储 | etcd 3.4 | MySQL / MariaDB / OpenGauss（数据库表以 `kb_` 前缀，如 `kb_u_user`、`kb_cluster`、`kb_license`） |
| 集群通信 | 依赖 Kubernetes Dashboard 思路 | JDK 原生 HTTP/2 客户端直连 apiserver（无 kubernetes-java 依赖） |
| 扩展机制 | 套件（addon） | 套件（addon）以自定义资源（CR）形式存在于集群：`kuboardaddons.kuboard.cn`（group `kuboard.cn/v1`，kind `KuboardAddon` / `KuboardAddonResource`） |
| 新增能力 | — | 内置 MCP Server（Model Context Protocol，供 AI agent 操作集群）、AK/SK 鉴权、审计日志、支持高可用部署（Redis 分布式缓存） |
| 支持的 Kubernetes 版本 | 1.13 - 1.33 | 1.15 - 1.34（持续跟进最新版本） |
| 数据升级方式 | — | 仅存在 v4 内部版本升级（`ddl/upgrade/` 下按版本号组织的 schema 变更，v4.0.0.0 → v4.2.x），**没有** v3 → v4 的迁移脚本 |

### 由此得出的三个结论

- **存储不兼容**：v3 的数据在 etcd 中，v4 的数据在关系型数据库中，两者没有任何共享的数据层，v3 的集群数据、用户、授权信息均不会被 v4 读取；
- **授权不兼容**：v4 使用独立的授权子系统（见下文"授权关系"一节），v3 授权文件无法导入 v4；
- **用户体系不兼容**：v4 的用户、用户组、授权规则全部存储在 v4 自己的数据库中（`kb_u_user`、`kb_u_group` 等表），需要在 v4 中重新创建。

因此，迁移的实质是：**把集群本身"搬"进 v4（重新导入），把 v3 上的人、权限、套件、配置在 v4 上重建**，而不是搬运 v3 的任何数据文件。

## v3 与 v4 可以并存部署

迁移期间（以及迁移完成后的一段时间内），v3 与 v4 完全可以并存运行，互不影响：

- **部署层面**：v3 与 v4 是相互独立的服务实例。v3 使用 etcd，v4 需要独立的数据库实例。可以：
  - 部署在不同的服务器 / 不同的容器实例（v4 的安装方式见 [安装](./index) 与 [快速开始](./quickstart)）；
  - 或部署在同一个 Kubernetes 集群的不同名称空间（namespace）中，使用不同的 Service 与 Ingress 暴露。
- **集群层面**：同一个 Kubernetes 集群可以**同时**导入 v3 和 v4，两个版本都可以有效管理该集群；
  - 关键前提：如果集群在 v3 与 v4 中的**名字相同**，则 Kuboard 套件不受影响，在 v3 / v4 中都可以正常使用。原因是 v4 的套件以集群内的自定义资源（`KuboardAddon`）形式存在，套件数据跟随集群本身，而不是跟随 v3 或 v4 的实例；
  - 如果集群名字不同，套件资源依然在集群中，只是 v4 中需要重新执行套件的初始化/激活流程。

::: tip 文档站安排
v3 的老文档站将迁移到独立域名 `v3.kuboard.cn`，与 v4 文档站（本网站）分离，便于 v3 用户继续查阅历史资料。迁移完成后，v4 文档将不再承担 v3 的功能说明职责。
:::

## 授权关系：v3 授权与 v4 授权相互独立

以产品代码核实（`kuboard-server` 的 `cn.kuboard.license` 包）：

- v4 的授权接口为 `POST /api/license.kuboard.cn/v4/license`，通过该接口将授权文件导入 v4，数据存储在 v4 数据库的 `kb_license` 表中；
- v4 导入授权文件时，使用内嵌在 `LicenseService` 中的 RSA 公钥做 `SHA1withRSA` 签名校验，校验不通过会直接拒绝（"授权文件不能通过校验"）；
- 在 v4 全部后端代码中搜索 `v3`，没有任何与 Kuboard v3 授权文件兼容的处理逻辑（命中的 `v3` 均为 Helm CLI 版本号，与 Kuboard 版本无关）。

结论：**v3 授权文件与 v4 授权相互独立，v3 的授权文件不能导入 v4，反之亦然。** 迁移到 v4 时，需要为 v4 单独获取并导入 v4 授权；v4 免费版与增强版（Enhanced）的功能差异，参见 [许可与支持](../support/)。

::: tip 以下为建议
- 迁移期间 v3 授权继续有效，v3 与 v4 并存时两者都需要各自的授权；
- 在 v4 界面中导入授权文件后，可在授权列表页面查看状态（valid / invalid / expired），确认导入成功后再进行后续操作。
:::

## 迁移路径建议

::: tip 以下为建议
迁移路径属于操作建议，具体步骤请结合您的环境验证后执行。
:::

1. **部署 v4 实例并初始化**（新实例，与 v3 无任何关联）
   - 按 [安装 Kuboard v4](./index) 准备数据库（MySQL / MariaDB / OpenGauss 三选一），按 [快速开始](./quickstart) 或 [高可用部署](./ha) 启动 v4；
   - 使用默认管理员 `admin` 登录后，立即修改密码。
2. **导入集群**
   - 在 v4 界面中执行集群导入（后端接口为 `POST /api/cluster.kuboard.cn/v4/cluster`，即 `importCluster`）；
   - **建议集群名与 v3 中保持一致**，这样套件（addon）资源在 v3 / v4 中都可以正常识别与使用；
   - 如果集群在 v3 中管理正常，导入 v4 后先核对集群状态与同步是否正常。
3. **重建工作负载视图与集群资源配置**
   - 在 v4 中重新配置节点、名称空间、工作负载的展示与访问（v4 将常用 Kubernetes 对象缓存到本地，支持模糊查询，可跨集群、跨名称空间同时查看）；
   - 检查 v3 中使用过、但 v4 中尚未验证的资源类型（存储类、Ingress、网关等）在 v4 中是否正常展示。
4. **套件兼容检查**
   - v4 支持安装兼容 v3 版本的 Kuboard 套件（见 v4 变更日志：v4.0.0.0-beta.03 "支持安装 Kuboard 套件（兼容 kuboard v3 版本的套件）"）；
   - 进入 v4 的**套件市场**（Addon 市场）检查所需套件是否可安装/激活；套件在集群中以 `KuboardAddon` 自定义资源存在，安装即向集群 apply 对应的 YAML 对象；
   - 若套件需要初始化脚本（如 CRD、RBAC 等），按套件文档执行初始化后再激活。
5. **迁移用户与权限**
   - 在 v4 中重新创建用户、用户组与授权规则（v4 的授权模型与 v3 不同，按 v4 的授权方式重新配置，见下文"需要手动调整的事项"）。
6. **验证**
   - 使用普通用户账号验证：登录、查看集群、操作工作负载、终端与日志（依赖 WebSocket，检查反向代理已放行）、KuboardProxy 访问等；
   - 验证审计日志与 MCP（如使用）链路正常。
7. **下线 v3**
   - 全部功能验证通过后，再逐步下线 v3 实例；不建议在未完成验证前停止 v3，两个版本并存部署的成本很低。

## 需要手动调整的事项清单

以下事项在 v4 中**没有**自动迁移通道，需要手工完成（每项均可在产品代码或官方文档中找到依据）：

| 事项 | 说明 | 依据 |
| --- | --- | --- |
| 管理员与用户体系 | v4 的初始管理员为 `admin`（默认密码 `Kuboard123`），用户存储在 v4 数据库 `kb_u_user` 表，与 v3 用户无关 | [安装](./index)、`kb_u_user` 表结构 |
| 用户 / 用户组 / 角色 | 需在 v4 中重新创建用户、用户组（`kb_u_group`）并配置授权规则 | `kb_u_group`、`kb_u_user_group` 表结构 |
| RBAC 授权 | v4 使用更简洁的授权模型（kuboard 级 / 集群级 scope 的授权规则），需按 v4 的方式重新给用户授权 | [安装](./index) 中"v3 与 v4 差异"、`KuboardAuthScopeTypeEnum`（`kuboard` / `cluster`） |
| 集群导入 | 集群需要重新导入 v4（接口 `POST /api/cluster.kuboard.cn/v4/cluster`），v4 会重新做全量同步 | `ClusterController.importCluster` |
| 授权文件 | v3 授权文件不能用于 v4，需要为 v4 单独获取并导入授权 | `cn.kuboard.license`（独立 RSA 校验，无 v3 兼容逻辑） |
| 套件初始化 | 同名集群下套件 CR 不受影响，但 v4 中仍需按向导完成套件的安装/初始化/激活（可能涉及预安装 YAML、CRD 初始化等） | `kuboard-addon` 前端（`AddonInstall.vue`、`CrdInitializer.ts`） |
| 外部用户库 | 如 v3 中集成了 LDAP 等外部用户库，v4 中需重新配置 webhook 集成（v4 通过 webhook 接口对接外部用户库） | [安装](./index) "集成外部用户库" |
| 反向代理 / HTTPS / WebSocket | v4 必须挂在根路径，终端与日志功能依赖 WebSocket，需要重新配置反向代理（Nginx / Ingress） | [反向代理](./reverse-proxy) |
| 密码策略与 MFA | 如 v3 中启用了密码过期、双因子认证（MFA）等策略，需要在 v4 中重新设置（`kb_u_user` 表支持 `mfa_secret`、`password_expiry_date` 等字段） | `kb_u_user` 表结构 |

## 常用迁移对照表

以下对照以 v4 产品代码与官方文档中可核实的信息为准；v3 侧未能在代码中核实的表述已注明。

| Kuboard v3 | Kuboard v4 对应物 | 说明 |
| --- | --- | --- |
| 应用商店 / 套件（v3 addon） | 套件市场（Addon 市场，位于集群 → 套件） | v4 套件兼容 v3 版本套件；套件以 `KuboardAddon` 自定义资源存在于集群 |
| 集群管理 | 集群管理（导入、编辑、同步状态） | 同一集群可同时导入 v3 与 v4，同名集群套件不受影响 |
| 工作负载（Deployment / StatefulSet 等） | 工作负载管理 | v4 覆盖 v3 的主要功能，支持跨集群/名称空间列表与模糊查询 |
| 容器终端 / 日志 | 终端与日志（WebSocket） | v4 提供节点 shell、Pod 调试容器等接口（`NodeShellController`、`PodDebugContainerController`） |
| KuboardProxy | KuboardProxy | v4 提供 KuboardProxy 接口（`KuboardProxyController`）用于访问 Service / Pod 端口 |
| 持续部署 / 更新镜像（v3 相关功能） | 持续交付接口 `/api/cd.kuboard.cn/v4/` | v4 提供更新镜像标签、重启工作负载等接口（`CdController`） |
| v3 用户 / RBAC | v4 用户 / 授权规则 | 授权模型不同，需重新配置，不能迁移 |
| v3 授权文件 | v4 授权（`/api/license.kuboard.cn/v4/license`） | 相互独立，需单独导入 v4 授权 |
| etcd 存储 | MySQL / MariaDB / OpenGauss | 存储层完全不同 |
| 单机部署 | 单机或高可用部署 | v4 支持 HA（Redis 分布式缓存），参见 [高可用部署](./ha) |

::: tip 关于本表
- "应用商店"为 v3 侧的说法，v4 侧的"套件市场（Addon 市场）"已在文档与代码中核实；
- 表中未列出的 v3 功能，请以 v4 实际界面与 [使用指南](../guide/index) 为准逐项核对。
:::

## 版本升级 vs 版本迁移

请注意区分两个概念：

- **v4 内部升级**（v4.x → v4.y）：更换镜像标签即可，数据库 schema 由 v4 自动迁移，参见 [升级 Kuboard](./upgrade)；
- **v3 → v4 迁移**（本文）：两套独立产品之间的迁移，不存在原地升级通道，必须按本文所述步骤执行。

## 相关文档

- [安装 Kuboard v4](./index) —— 安装、数据库准备、环境变量、反向代理与高可用参数
- [快速开始](./quickstart) —— docker compose 快速拉起一个 v4 实例
- [升级 Kuboard](./upgrade) —— v4 内部版本升级
- [高可用部署](./ha) —— v4 高可用部署
- [反向代理](./reverse-proxy) —— Nginx / Ingress 配置与 WebSocket 放行
- [使用指南](../guide/index) —— v4 功能总览（集群、工作负载、套件市场等）
- [许可与支持](../support/) —— v4 免费版 / 增强版功能对比