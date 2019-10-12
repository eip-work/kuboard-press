---
vssueId: 111
layout: LearningLayout
description: Kubernetes教程_为Pod容器组或Container容器配置Security Context安全上下文的 Linux Capabilities。使用 Linux Capabilities 可以为容器内的进程授予某些特定的权限（而不是 root 用户的所有权限）。在容器定义的 securityContext 中添加 capabilities 字段，可以向容器添加或删除 Linux Capability。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 为容器设置Linux Capabilities

<AdSenseTitle/>

使用 [Linux Capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html) 可以为容器内的进程授予某些特定的权限（而不是 root 用户的所有权限）。在容器定义的 `securityContext` 中添加 `capabilities` 字段，可以向容器添加或删除 Linux Capability。

本文后续章节中，先运行一个不包含 `capabilities` 字段的容器，观察容器内进程的 linux capabilities 位图的情况；然后在运行一个包含 `capabilities` 字段的容器，比较其 linux capabilities 位图与前者的不同。

## 无capabilities字段时

我们先确认在没有 `capabilities` 字段时，容器的行为是怎样的。下面的例子中包含一个容器，我们没有为其添加或删除任何 Linux capability。

<<< @/.vuepress/public/statics/learning/sec-ctx/security-context-3.yaml

* 执行命令以创建 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/sec-ctx/security-context-3.yaml
  ```
* 执行命令以验证容器正在运行
  ``` sh
  kubectl get pod security-context-demo-3
  ```
* 执行命令以进入容器的命令行界面
  ``` sh
  kubectl exec -it security-context-demo-3 -- sh
  ```
* 在容器的命令行界面中查看正在运行的进程
  ``` sh
  ps aux
  ```
  输出结果中展示了容器中进程的 process ID（PID），如下所示：
  ```
  PID   USER     TIME  COMMAND
    1   root     0:00  sleep 1h
    6   root     0:00  sh
   11   root     0:00  ps aux
  ```
* 在容器的命令行界面中查看 process 1 的状态
  ``` sh
  cd /proc/1
  cat status
  ```
  输出结果中展示了该进程 Linux Capabilities 的位图，如下所示：
  ``` {2,3}
  ...
  CapPrm: 00000000a80425fb
  CapEff: 00000000a80425fb
  ...
  ```
* 记录下该进程的位图，然后执行命令 `exit` 退出重启的命令行界面

## 有capabilities字段时

接下来，我们运行同样的一个容器，不同的是，这次为其设置了 `capabilities` 字段。下面是 yaml 配置文件，该配置中为进程添加了两个 Linux Capability： `CAP_NET_ADMIN` 和 `CAP_SYS_TIME`：

<<< @/.vuepress/public/statics/learning/sec-ctx/security-context-4.yaml

* 执行命令以创建 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/sec-ctx/security-context-4.yaml
  ```
* 执行命令以验证容器正在运行
  ``` sh
  kubectl get pod security-context-demo-4
  ```
* 执行命令以进入容器的命令行界面
  ``` sh
  kubectl exec -it security-context-demo-4 -- sh
  ```
* 在容器的命令行界面中查看正在运行的进程
  ``` sh
  ps aux
  ```
  输出结果中展示了容器中进程的 process ID（PID），如下所示：
  ```
  PID   USER     TIME  COMMAND
    1   root     0:00  sleep 1h
    6   root     0:00  sh
   11   root     0:00  ps aux
  ```
* 在容器的命令行界面中查看 process 1 的状态
  ``` sh
  cd /proc/1
  cat status
  ```
  输出结果中展示了该进程 Linux Capabilities 的位图，如下所示：
  ``` {2,3}
  ...
  CapPrm: 00000000aa0435fb
  CapEff: 00000000aa0435fb
  ...
  ```
* 记录下该进程的位图，然后执行命令 `exit` 退出重启的命令行界面

* 比较两次运行，进程的 Linux Capabilities 位图的差异：
  ```
  第一次运行：00000000a80425fb
  第二次运行：00000000aa0435fb
  ```
  第一次运行时，位图的 12 位和 25 为是 0。第二次运行时，12 位和 25 位是 1.查看 Linux Capabilities 的常量定义文件 [capability.h](https://github.com/torvalds/linux/blob/master/include/uapi/linux/capability.h) 可知：12 位代表 `CAP_NET_ADMIN`，25 位代表 `CAP_SYS_TIME`。

::: tip LinuxCapability常量
Linux Capabilities 常量格式为 `CAP_XXX`。然而，在容器定义中添加或删除 Linux Capabilities 时，必须去除常量的前缀 `CAP_`。例如：向容器中添加 `CAP_SYS_TIME` 时，只需要填写 `SYS_TIME`。
:::
