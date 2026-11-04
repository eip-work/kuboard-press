---
description: 在集群详情页查看 apiserver 证书、Kuboard 客户端证书与集群 CA 的到期时间
---

# 证书到期时间

Kuboard 在**集群详情 → 证书**页展示平台访问集群所依赖的凭据何时到期，用于在证书过期前安排续期 —— 证书一旦过期，Kuboard 会直接无法访问该集群。

## 覆盖范围

| 项目 | 数据来源 | 适用导入方式 |
| --- | --- | --- |
| APIServer 服务端证书 | 与 apiserver 建立一次 TLS 连接，读取对端证书链 | kubeconfig / Token |
| Kuboard 访问集群的客户端证书 | 导入时保存的 kubeconfig 客户端证书 | kubeconfig |
| 集群 CA 证书 | 导入时保存的 kubeconfig CA | kubeconfig |
| 访问令牌 | Token 为 JWT 且带过期时间时展示 | Token |

::: warning 不检测控制面组件证书
etcd、kube-scheduler、kube-controller-manager 等控制面组件的证书文件位于控制面节点上，Kuboard 不会读取节点文件系统，因此**本页不包含这些证书**。请使用 `kubeadm certs check-expiration`（Kubernetes 1.20+；更早版本为 `kubeadm alpha certs check-expiration`）检查。

云厂商托管的控制面（EKS / ACK / TKE 等）由云平台管理证书，页面只展示能够通过 apiserver 探测到的部分。
:::

## 页面说明

- **状态**：有效 / 即将过期（剩余 ≤ 30 天）/ 已过期 / 未生效 / 未知；
- **剩余**：按当前时间实时计算，不受采集时间影响；
- **采集时间**：快照每 6 小时自动刷新一次；超过 6 小时后页面会提示「正在后台刷新」，并保留上一次结果；
- **刷新**：右上角刷新按钮可立即触发一次重新采集，采集在后台进行，稍后自动回填；
- **提示**：探测失败（例如 apiserver 不可达）只会在页面底部列出提示，不会影响其它证书项的展示，也不代表集群本身不可用。

## 常见提示与处理

| 提示 | 含义 | 处理建议 |
| --- | --- | --- |
| 无法连接 API Server 读取其证书 | apiserver 不可达或证书已过期导致握手失败 | 先在集群列表确认集群状态与失联原因 |
| API Server 地址为明文 HTTP | 集群以 HTTP 方式接入，没有证书可检测 | 建议改用 HTTPS 接入 |
| API Server 证书未覆盖实际连接的地址 | 证书 SAN 与填写的 apiServer 地址不匹配 | 更换证书或改用证书内的地址访问 |
| 导入凭据中的证书无法解析 | 保存的 kubeconfig 内容损坏 | 重新导入或更新集群的接入凭据 |

## 证书续期

续期与更新证书属于集群侧操作，请参考 [更新 Kubernetes 证书文件](https://v3.kuboard.cn/install/maintain/certs.html)；完成续期后重新导入（或在 Kuboard 中更新）集群凭据，并在证书页点击刷新确认新的到期时间。