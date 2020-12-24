---
vssueId: 108
titlePrefix: 为Pod或Container配置Security Context
layout: LearningLayout
description: Kubernetes教程_为Pod容器组或Container容器配置Security Context安全上下文
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 概述

<AdSenseTitle/>

> 参考文档：Kubernetes 文档 [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#assign-selinux-labels-to-a-container)

Security Context（安全上下文）用来限制容器对宿主节点的可访问范围，以避免容器非法操作宿主节点的系统级别的内容，使得节点的系统或者节点上其他容器组受到影响。

Security Context可以按照如下几种方式设定：

* 访问权限控制：是否可以访问某个对象（例如文件）是基于 [userID（UID）和 groupID（GID）](https://wiki.archlinux.org/index.php/users_and_groups) 的

* [Security Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux)：为对象分配Security标签

* 以 privileged（特权）模式运行

* [Linux Capabilities](https://linux-audit.com/linux-capabilities-hardening-linux-binaries-by-removing-setuid/)：为容器组（或容器）分配一部分特权，而不是 root 用户的所有特权
* [AppArmor](https://kubernetes.io/docs/tutorials/clusters/apparmor/)：自 Kubernetes v1.4 以来，一直处于 beta 状态
* [Seccomp](https://docs.docker.com/engine/security/seccomp/)：过滤容器中进程的系统调用（system call）
* AllowPrivilegeEscalation（允许特权扩大）：此项配置是一个布尔值，定义了一个进程是否可以比其父进程获得更多的特权，直接效果是，容器的进程上是否被设置 [no_new_privs](https://www.kernel.org/doc/Documentation/prctl/no_new_privs.txt) 标记。当出现如下情况时，AllowPrivilegeEscalation 的值始终为 true：
  * 容器以 privileged 模式运行
  * 容器拥有 CAP_SYS_ADMIN 的 Linux Capability

如需要了解更多关于 Linux 安全机制方面的信息，请参考 [Overview Of Linux Kernel Security Features](https://www.linux.com/tutorials/overview-linux-kernel-security-features/)

本文从以下几个方面介绍如何在 Kubernetes 中配置 Security Context

* [为Pod设置Security Context](./pod.html)
* [为容器设置Security Context](./con.html)
* [为容器设置Linux Capabilities](./con-cap.html)
* [为容器设置SELinux标签](./con-sel.html)
* [关于数据卷](./volumes.html)

> 详细信息请点击对应链接。
