---
vssueId: 109
layout: LearningLayout
description: Kubernetes教程_为Pod容器组配置Security Context安全上下文。在 Pod 的定义中增加 securityContext 字段，即可为 Pod 指定 Security 相关的设定。通过该字段指定的内容将对该 Pod 中所有的容器生效。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 为Pod设置Security Context

在 Pod 的定义中增加 `securityContext` 字段，即可为 Pod 指定 Security 相关的设定。 `securityContext` 字段是一个 [PodSecurityContext](./pod-kuboard.html) 对象。通过该字段指定的内容将对该 Pod 中所有的容器生效。

## Pod示例

以下面的 Pod 为例：

<<< @/.vuepress/public/statics/learning/sec-ctx/security-context-1.yaml {7,8,9,21}

在上面的例子中：
* `spec.securityContext.runAsUser` 字段指定了该 Pod 中所有容器的进程都以UserID `1000` 的身份运行，`spec.securityContext.runAsGroup` 字段指定了该 Pod 中所有容器的进程都以GroupID `3000` 的身份运行
  * 如果该字段被省略，容器进程的GroupID为 root(0)
  * 容器中创建的文件，其所有者为 userID 1000，groupID 3000
* `spec.securityContext.fsGroup` 字段指定了该 Pod 的 fsGroup 为 2000
  * 数据卷 （本例中，对应挂载点 `/data/demo` 的数据卷为 `sec-ctx-demo`） 的所有者以及在该数据卷下创建的任何文件，其 GroupID 为 2000

## 执行Pod示例

* 创建 Pod
  ```sh
  kubectl apply -f https://kuboard.cn/statics/learning/sec-ctx/security-context-1.yaml
  ```
* 验证 Pod 已运行
  ```sh
  kubectl get pod security-context-demo
  ```
* 进入容器的命令行界面
  ```sh
  kubectl exec -it security-context-demo -- sh
  ```
* 在该命令行界面中，查看正在运行的进程
  ```sh
  ps
  ```
  请注意，所有的进程都以 user 1000 的身份运行（由 runAsUser 指定），输出结果如下所示：
  ```
  PID   USER     TIME  COMMAND
      1 1000      0:00 sleep 1h
      6 1000      0:00 sh
  ...
  ```
* 在命令行界面中，切换到目录 `/data`，并查看目录中的文件列表
  ```sh
  cd /data
  ls -l
  ```
  请注意，`/data/demo` 目录的 groupID 为 2000（由 fsGroup 指定），输出结果如下所示：
  ```
  drwxrwsrwx    2 root     2000          4096 Oct  4 05:08 demo
  ```
* 在命令行界面中，切换到目录 `/data/demo`，并创建一个文件
  ``` sh
  cd /data/demo
  echo hello > testfile
  ls -l
  ```
  请注意，`testfile` 的 groupID 为 2000 （由 FSGroup 指定），输出结果如下所示：
  ```
  -rw-r--r--    1 1000     2000             6 Oct  4 05:09 testfile
  ```
* 在命令行界面中执行 `id` 命令，输出结果如下所示：
  ``` sh
  $ id
  uid=1000 gid=3000 groups=2000
  ```
  请注意：
  * gid 为 3000，与 `runAsGroup` 字段所指定的一致
  * 如果 `runAsGroup` 字段被省略，则 gid 取值为 0（即 root），此时容器中的进程将可以操作 root Group 的文件

* 执行 `exit` 退出命令行界面

:tada: :tada: :tada:
