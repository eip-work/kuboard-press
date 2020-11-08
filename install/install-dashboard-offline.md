---
vssueId: 19
description: Kuboard_快速在Kubernetes上落地微服务_本文详细介绍如何离线安装Kuboard
meta:
  - name: keywords
    content: Kuboard离线安装
---

# 安装 Kuboard v2（离线）

<AdSenseTitle/>

许多公司处于安全的考虑，需要将 Kuboard 离线安装到内网环境。本文描述了如何完成 Kuboard 的离线安装。请确保您已经熟悉了 [安装Kuboard](./install-dashboard)，本文只描述离线安装时，与正常安装的过程的差异部分。

## 准备Kuboard镜像

### 获取Kuboard镜像

* 在可以上网的机器上抓取 kuboard 镜像
  
  ``` sh
  docker pull eipwork/kuboard:latest
  ```

* 查看 kuboard 镜像的 ID

  ``` sh
  docker images | grep kuboard
  ```

  输出结果如下所示：
  ```
  eipwork/kuboard           latest                0146965e6475        3 weeks ago         133MB
  ```

* 将 Kuboard 镜像导出到文件

  ``` sh
  docker save 86eaead8421e > kuboard.tar
  ```
  ::: tip ImageID
  请使用上一个步骤中查询到的 image ID
  :::

* 将 kuboard.tar 传输到 Kubernetes 集群的某一个节点上

### 加载Kuboard镜像

* 在 Kubernetes 集群的某一个节点上执行

  ``` sh
  docker load < kuboard.tar
  ```

* 为镜像重新添加标签

  ``` sh
  docker tag 0146965e6475 eipwork/kuboard:latest
  ```
  ::: tip ImageID
  请使用上一个步骤中查询到的 image ID
  :::

## 准备kuboard.yaml文件

安装Kuboard的yaml文件如下，将其保存到 kuboard-offline.yaml

::: tip 必要的修改
* 修改该文件中第 26 行的节点名称为上一个步骤中，已经加载了 kuboard 镜像的节点，参考 [将容器组调度到指定节点](/learning/k8s-intermediate/config/assign-pod-node.html)
* 与在线安装不同，此处 `ImagePullPolicy=IfNotPresent` （第30行），参考 [容器镜像](/learning/k8s-intermediate/container/images.html#更新镜像)
:::

<<< .vuepress/public/install-script/kuboard-offline.yaml {26,30}

* 执行命令
  ``` sh
  kubectl apply -f kuboard-offline.yaml
  ```

## 登录Kuboard

登录 Kuboard 的方式同 [安装Kuboard](./install-dashboard.html)
