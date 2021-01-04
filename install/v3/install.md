---
lessAds: false
description: 一行命令开启Kubernetes多集群管理之路_Kuboard_V3安装
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装 Kubernetes 多集群管理工具 - Kuboard v3

<AdSenseTitle/>

## Kuboard v3.0 版本说明

Kuboard v3.0 支持 Kubernetes 多集群管理。如果您从 Kuboard v1.0.x 或者 Kuboard v2.0.x 升级到 Kuboard，请注意：
* 您可以同时使用 Kuboard v3.0.x 和 Kuboard v2.0.x；
* Kuboard v3.0.x 支持 amd64 (x86) 架构和 arm68 (armv8) 架构的 CPU；

## 兼容性


| Kubernetes 版本 | Kuboard 版本   | 兼容性 | 说明                                                         |
| --------------- | -------------- | ------ | ------------------------------------------------------------ |
| v1.20           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.19           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.18           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.17           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.16           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.15           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.14           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.13           | v3.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                       |
| v1.12           | v3.0.x | <span style="font-size: 24px;">😐</span>      | Kubernetes Api v1.12 不支持 dryRun，<br />Kuboard 不支持 Kubernetes v1.12 |
| v1.11           | v3.0.x | <span style="font-size: 24px;">😐</span>      | Kuboard 不支持 Kubernetes v1.11                                                         |

## 安装方式

在安装 Kuboard 之前，您需要确定登录 Kuboard 时的认证方式，Kuboard 当前提供如下几种认证方式：

* [内建用户库认证](./install-built-in.html)
* [GitLab 单点登录](./install-gitlab.html)
* [GitHub 单点登录](./install-github.html)
* [LDAP 认证](./install-ldap.html)

Kuboard 作为一个管理界面，通常单节点部署就可以满足可用性方面的要求，如果您期望您安装的 Kuboard 获得更高的可用性，请考虑：[将 Kuboard 安装到 Kubernetes 集群中](./install-in-k8s.html)

## 从 v2.0.x 升级到 v3.0.x

与 v2.0.x 相比，v3.0.x 不再部署在 Kubernetes 中，而是作为一个独立的容器运行。

* 由于运行模式不同，v2.0.x 与 v3.0.x 可以同时存在互不干扰。

* Kuboard v3.0.x 将 Kuboard 部署的大部分内容从 kube-system 名称空间迁移到 kuboard 名称空间，这也使得两个版本能够同时存在于同一个 Kubernetes 集群。

* 如果您最终决定从 Kuboard v2.0.x 迁移到 Kuboard v3，请在 Kuboard v2.0.x 的界面中卸载掉 Kuboard 套件，并在 Kuboard v3 中重新安装 Kuboard 套件。
