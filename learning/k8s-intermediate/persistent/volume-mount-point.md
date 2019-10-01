---
layout: LearningLayout
description: Kubernetes教程_本文介绍Kubernetes中Volume（数据卷）的挂载以及挂载传播MountPropagation的概念
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,挂载点
---

# 数据卷-挂载

参考文档： Kubernetes 官网文档 [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)

## 容器内路径

## 权限

## 挂载传播

数据卷的挂载传播（Mount Propagation）由 Pod 的 `spec.containers[*].volumeMounts.mountPropagation` 字段控制。可选的取值有：

* **None**： 默认值。在数据卷被挂载到容器之后，此数据卷不会再接受任何后续宿主机或其他容器挂载到该数据卷对应目录下的子目录的挂载。同样的，在容器中向该数据卷对应目录挂载新目录时，宿主机也不能看到。对应 Linux 的 `private` mount propagation 选项[Linux内核文档](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt)

* **HostToContainer**：在数据卷被挂载到容器之后，宿主机向该数据卷对应目录添加挂载时，对容器是可见的。对应 Linux 的 `rslave` mount propagation 选项 [Linux内核文档](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt)

* **Bidirectional**：在数据卷被挂载到容器之后，宿主机向该数据卷对应目录添加挂载时，对容器是可见的；同时，从容器中向该数据卷创建挂载，同样也对宿主机可见。对应 Linux 的 `rshared` mount propagation 选项 [Linux内核文档](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt)

::: danger
**Bidirectional** mount propagation 选项隐藏风险。如果在容器内进行不合适的挂载，可能影响宿主机的操作系统正常执行，因此，只有 privileged 容器才可以使用该选项。使用此选项时，建议对 Linux 内核的行为有所熟悉。此外，使用 Bidirectional 选项时，任何由 Pod 中容器在对应数据卷目录创建的挂载必须在容器终止时销毁（umounted）。
:::

### 额外配置

在部分系统中（CoreOS、RedHat/Centos、Ubuntu），Docker 的 mount share 选项必须事先配置好，步骤如下：

* **编辑 Docker 的 `systemd` service 文件**，将 `MountFlags` 设定如下：

  ```
  MountFlags=shared
  ```

  **或者移除 `MountFlags=slave`**

* 重启 Docker 守护进程：

  ``` sh
  sudo systemctl daemon-reload
  sudo systemctl restart docker
  ```

## 数据卷

## 数据卷内子路径
