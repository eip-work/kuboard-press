---
description: 了解 Kuboard 免费版与增强版的功能对照、获取并安装授权（License），以及获取技术支持与更新动态的渠道
---

# Kuboard 授权与支持

Kuboard 是基于 Kubernetes 的容器管理平台。本页说明如何获得授权、免费版与增强版的功能对照，以及获取技术支持与更新动态的渠道。

## License 授权

免费版与增强版共享几乎全部功能，下表所列的绝大多数能力在两个版本中均可使用，两个版本仅在管理集群数量、历史审计日志、高可用部署等少数与容量和服务投入相关的方面存在差异：

| 功能 | 免费版 | 增强版 |
| --- | :---: | :---: |
| **Kubernetes 基本管理功能** | | |
| 节点管理、节点排水/驱离、Pod 驱逐 | :white_check_mark: | :white_check_mark: |
| 名称空间管理、限制范围、资源配额 | :white_check_mark: | :white_check_mark: |
| 服务账户管理 | :white_check_mark: | :white_check_mark: |
| 控制器管理（Deployment / StatefulSet / DaemonSet / CronJob / Job / Pod） | :white_check_mark: | :white_check_mark: |
| 工作负载编辑器（表单编辑 Deployment / StatefulSet / DaemonSet） | :white_check_mark: | :white_check_mark: |
| Service / Ingress / IngressClass 管理 | :white_check_mark: | :white_check_mark: |
| ConfigMap / Secret 管理 | :white_check_mark: | :white_check_mark: |
| CustomResourceDefinition / CR 管理 | :white_check_mark: | :white_check_mark: |
| 网络策略（NetworkPolicy）管理 | :white_check_mark: | :white_check_mark: |
| 自动伸缩（HorizontalPodAutoscaler）管理 | :white_check_mark: | :white_check_mark: |
| **Kubernetes 存储管理** | | |
| 存储类、存储卷、存储卷声明管理 | :white_check_mark: | :white_check_mark: |
| 存储快照类、存储快照管理 | :white_check_mark: | :white_check_mark: |
| CSI 驱动程序、CSI 节点、CSI 存储容量管理 | :white_check_mark: | :white_check_mark: |
| 卷挂载管理 | :white_check_mark: | :white_check_mark: |
| **服务与网络** | | |
| Gateway API（GatewayClass / Gateway / HTTPRoute / TLSRoute / TCPRoute / UDPRoute / GRPCRoute / ReferenceGrant） | :white_check_mark: | :white_check_mark: |
| 端点切片（EndpointSlice）管理 | :white_check_mark: | :white_check_mark: |
| **集群资源** | | |
| RBAC 管理（Role / RoleBinding / ClusterRole / ClusterRoleBinding） | :white_check_mark: | :white_check_mark: |
| Admission Webhook 管理（MutatingWebhookConfiguration / ValidatingWebhookConfiguration / ValidatingAdmissionPolicy / ValidatingAdmissionPolicyBinding） | :white_check_mark: | :white_check_mark: |
| 动态资源分配 DRA 管理（ResourceClaim / ResourceClaimTemplate / ResourceSlice / PodSchedulingReadiness） | :white_check_mark: | :white_check_mark: |
| 流量控制（FlowSchema / PriorityLevelConfiguration） | :white_check_mark: | :white_check_mark: |
| 优先级类管理、Pod 中断预算管理 | :white_check_mark: | :white_check_mark: |
| 运行时类管理、租约管理 | :white_check_mark: | :white_check_mark: |
| **Kubernetes 问题诊断** | | |
| Top Nodes / Top Pods（资源监控） | :white_check_mark: | :white_check_mark: |
| 事件列表（整合到关联对象的上下文） | :white_check_mark: | :white_check_mark: |
| 容器日志界面（实时/下载） | :white_check_mark: | :white_check_mark: |
| 容器 Web 终端界面 | :white_check_mark: | :white_check_mark: |
| 文件浏览器（查看/编辑/上传/下载容器中的文件） | :white_check_mark: | :white_check_mark: |
| YAML 预览、编辑、对比 | :white_check_mark: | :white_check_mark: |
| 资源全景图（交互式拓扑可视化） | :white_check_mark: | :white_check_mark: |
| **认证与授权** | | |
| Kuboard 内建用户库（用户/用户组/角色） | :white_check_mark: | :white_check_mark: |
| Webhook 外部用户库对接 | :white_check_mark: | :white_check_mark: |
| Kubernetes RBAC 授权 | :white_check_mark: | :white_check_mark: |
| 多因子认证（MFA / TOTP） | :white_check_mark: | :white_check_mark: |
| 密码策略 | :white_check_mark: | :white_check_mark: |
| **多集群管理** | | |
| 通过 kubeconfig 导入集群 | :white_check_mark: | :white_check_mark: |
| 通过 kuboard-agent 导入集群 | :white_check_mark: | :white_check_mark: |
| 管理不超过三个 Kubernetes 集群 | :white_check_mark: | :white_check_mark: |
| 管理超过三个 Kubernetes 集群 | :x: | :white_check_mark: |
| **Helm 应用管理** | | |
| Helm Release 安装、升级、回滚、事件 | :white_check_mark: | :white_check_mark: |
| Chart 市场浏览 | :white_check_mark: | :white_check_mark: |
| Chart 仓库管理 | :white_check_mark: | :white_check_mark: |
| **AI 与自动化（MCP）** | | |
| MCP Server（Model Context Protocol，Streamable HTTP / SSE，兼容 opencode / Claude / Cursor 等 AI 客户端） | :white_check_mark: | :white_check_mark: |
| K8s 运维工具集（工作负载 / Pod / 节点 / 配置 / 事件 / 自定义资源 的查询与操作） | :white_check_mark: | :white_check_mark: |
| Prometheus 查询工具（指标查询、RBAC 逐条鉴权、聚合查询策略） | :white_check_mark: | :white_check_mark: |
| 诊断 Prompt（诊断 Pod / 清理孤儿 PVC / 生成 Deployment YAML） | :white_check_mark: | :white_check_mark: |
| 资源变更实时订阅推送（SSE） | :white_check_mark: | :white_check_mark: |
| 高危操作确认令牌（危险级工具需二次确认） | :white_check_mark: | :white_check_mark: |
| 工具白名单 + 限流 + 审计脱敏 | :white_check_mark: | :white_check_mark: |
| **审计与可观测性** | | |
| 操作审计日志（当天） | :white_check_mark: | :white_check_mark: |
| 操作审计日志（历史） | :x: | :white_check_mark: |
| 审计策略配置 | :white_check_mark: | :white_check_mark: |
| Kuboard Proxy（Web 版 kubectl proxy） | :white_check_mark: | :white_check_mark: |
| **Kuboard 特色功能** | | |
| 镜像版本调整（批量修改工作负载镜像） | :white_check_mark: | :white_check_mark: |
| 导入/导出 K8S 对象（YAML） | :white_check_mark: | :white_check_mark: |
| 持续部署对接接口（镜像更新/重启） | :white_check_mark: | :white_check_mark: |
| Kuboard 套件市场（Addon 市场） | :white_check_mark: | :white_check_mark: |
| 系统配置（可禁用菜单项等） | :white_check_mark: | :white_check_mark: |
| K8sCapability 版本兼容抽象层（支持 K8s 1.15+） | :white_check_mark: | :white_check_mark: |
| 资源可用性治理（自动探测集群组件安装状态） | :white_check_mark: | :white_check_mark: |
| Kuboard 高可用部署模式 | :x: | :white_check_mark: |
| **服务与支持** | | |
| 微信/QQ 社群免费答疑 | :white_check_mark: | :white_check_mark: |
| 付费用户专属答疑通道 | :x: | :white_check_mark: |
| 远程协助解决问题 | :x: | :white_check_mark: |

如何获取与导入授权文件，见 [License 安装](./license-install)。

::: tip 需要授权吗？
仅使用免费版功能、管理不超过 3 套集群时，无需授权即可直接使用；需要增强版能力时再导入授权文件即可。
:::

## 社区与商业支持

免费版用户可通过微信/QQ 社群和 GitHub Issue 获得社区答疑；增强版用户另享专属答疑通道与远程协助。详见 [社区与商业支持](./community)。

## 联系渠道

<SupportStars />

希望第一时间获取 Kuboard 更新动态与产品资讯？在此订阅：

<KbIframe src="https://uc-v3.kuboard.cn/public/home" title="Kuboard 订阅" />
