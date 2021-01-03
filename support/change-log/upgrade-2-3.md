---
vssueId: 72
description: 本文描述了Kuboard_v3.0.x版本的升级方法
---

# 从 v2.0.x 升级到 v3.0.x

与 v2.0.x 相比，v3.0.x 不再部署在 Kubernetes 中，而是作为一个独立的容器运行。

* 由于运行模式不同，v2.0.x 与 v3.0.x 可以同时存在互不干扰。

  请参考 [安装 Kuboard v3](/install/v3/install.html)

* Kuboard v3.0.x 计划将 Kuboard 部署的内容全部从 kube-system 名称空间迁移到 kuboard 名称空间，这也使得两个版本能够同时存在于同一个 Kubernetes 集群。建议用户在 Kuboard v3.0 版本正式发布后，将使用 Kuboard v2.0.x 安装的 Kuboard 套件卸载，并在 Kuboard v3.0.x 中重新安装这些套件。
