---
vssueId: 72
description: 本文描述了Kuboard_v3.0.x版本的升级方法
---

# 从 v2.0.x 升级到 v3.0.x

与 v2.0.x 相比，v3.0.x 不再部署在 Kubernetes 中，而是作为一个独立的容器运行。

* 由于运行模式不同，v2.0.x 与 v3.0.x 可以同时存在互不干扰。

  请参考 [安装 Kuboard v3](/install/v3/install.html)

* Kuboard v3.0.x 将 Kuboard 部署的大部分内容从 kube-system 名称空间迁移到 kuboard 名称空间，这也使得两个版本能够同时存在于同一个 Kubernetes 集群。

* 如果您最终决定从 Kuboard v2.0.x 迁移到 Kuboard v3，请在 Kuboard v2.0.x 的界面中卸载掉 Kuboard 套件，并在 Kuboard v3 中重新安装 Kuboard 套件。
