---
vssueId: 110
layout: LearningLayout
description: Kubernetes教程_为Container容器配置Security Context安全上下文。容器的定义中包含 securityContext 字段。通过指定该字段，可以为容器设定安全相关的配置，当该字段的配置与 Pod 级别的 securityContext 配置相冲突时，容器级别的配置将覆盖 Pod 级别的配置。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Security Context,SecurityContext
---

# 为容器设置Security Context

<AdSenseTitle/>

容器的定义中包含 `securityContext` 字段，该字段接受 [SecurityContext](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#securitycontext-v1-core) 对象。通过指定该字段，可以为容器设定安全相关的配置，当该字段的配置与 Pod 级别的 `securityContext` 配置相冲突时，容器级别的配置将覆盖 Pod 级别的配置。容器级别的 `securityContext` 不影响 Pod 中的数据卷。

下面的示例中的 Pod 包含一个 Container，且 Pod 和 Container 都有定义 `securityContext` 字段：

<<< @/.vuepress/public/statics/learning/sec-ctx/security-context-2.yaml {7,13}

* 执行命令以创建 Pod
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/sec-ctx/security-context-2.yaml
  ```
* 执行命令以验证容器已运行
  ``` sh
  kubectl get pod security-context-demo-2
  ```
* 执行命令进入容器的命令行界面：
  ``` sh
  kubectl exec -it security-context-demo-2 -- sh
  ```
* 在命令行界面中查看所有的进程
  ```sh
  ps aux
  ```
  请注意，容器的进程以 userID 2000 的身份运行。该取值由 `spec.containers[*].securityContext.runAsUser` 容器组中的字段定义。Pod 中定义的 `spec.securityContext.runAsUser` 取值 1000 被覆盖。输出结果如下所示：
  ```
  PID   USER      TIME  COMMAND
    1   2000      0:00  sleep 1h
    6   2000      0:00  sh
   11   2000      0:00  ps aux
  ...
  ```
* 执行命令 `exit` 退出命令行界面

:tada: :tada: :tada:
