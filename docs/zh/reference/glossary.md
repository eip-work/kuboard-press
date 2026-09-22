---
description: Kuboard V4 核心术语速查：集群、名称空间、工作负载、RBAC Scope、MCP、套件等
---

# 术语表

阅读其他页面遇到生词时，回到这里速查含义和相关文档。

## 核心术语速查

| 术语 | 含义 | 相关文档 |
| --- | --- | --- |
| **集群**（Cluster） | 一套可接入并统一管理的 Kubernetes 集群 | [导入集群](../guide/cluster/import) |
| **名称空间**（Namespace） | 隔离资源的逻辑分区，权限与配额以它为粒度 | [名称空间](../guide/cluster-resources/namespaces) |
| **工作负载**（Workload） | Deployment 等"跑业务"的资源统称 | [工作负载](../guide/workload/deployments) |
| **RBAC 权限作用域**（RBAC Scope） | 在全局、集群、名称空间三层上配置权限 | [权限作用域](./rbac-scopes) |
| **访问密钥**（AccessKey） | 供脚本、CI/CD 程序化访问用的密钥对 | [访问密钥](../user/access-keys) |
| **多因素认证**（MFA） | 登录时除密码外再加一重动态验证码 | [多因素认证](../user/mfa) |
| **MCP** | 把集群操作能力开放给 AI 助手的协议 | [MCP 快速开始](../mcp/server-config) |
| **套件**（Addon） | 可从套件市场一键安装的功能扩展包 | [套件市场](../guide/ops/addon-marketplace) |
| **审计**（Audit） | 记录登录、权限变更等关键操作日志 | [审计日志](../ops/audit-log) |
| **K8sCapability** | 探测集群 Kubernetes 版本能力，决定功能是否可用 | [Kubernetes 能力检测](./k8s-capability) |

完整术语表见 [guide/首页的术语速查](../guide/#术语速查)。
