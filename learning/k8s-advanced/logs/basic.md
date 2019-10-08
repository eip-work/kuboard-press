---
vssueId: 125
layout: LearningLayout
description: Kubernetes教程_本章节中，您将了解到如何在 Kubernetes 中使用最基本的日志，此时，日志信息将输出到标准输出流（standard output stream）。
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,日志,Logging
---

# 基本的日志

本章节中，您将了解到如何在 Kubernetes 中使用最基本的日志，此时，日志信息将输出到标准输出流（standard output stream）。请参考下面的例子，该例子中的 Pod 包含一个容器，该容器每秒钟向标准输出写入一些文本内容：

<<< @/.vuepress/public/statics/learning/logs/counter-pod.yaml

* 执行命令
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/logs/counter-pod.yaml
  ```
* 使用 `kubectl logs` 命令查看日志，如下所示：
  ``` sh
  kubectl logs -f counter
  ```
  输出结果如下所示：
  ```
  0: Mon Jan  1 00:00:00 UTC 2001
  1: Mon Jan  1 00:00:01 UTC 2001
  2: Mon Jan  1 00:00:02 UTC 2001
  ...
  ```

如果容器已经崩溃停止，您可以仍然使用 `kubectl logs --previous` 获取该容器的日志，只不过需要添加参数 `--previous`。 如果 Pod 中包含多个容器，而您想要看其中某一个容器的日志，那么请在命令的最后增加容器名字作为参数。更多信息请参考 [kubectl logs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs)。

常用的日志命令示例如下：
``` sh
# 追踪名称空间 nsA 下容器组 pod1 的日志
kubectl logs -f pod1 -n nsA

# 追踪名称空间 nsA 下容器组 pod1 中容器 container1 的日志
kubectl logs -f pod1 -c container1 -n nsA

# 查看容器组 nginx 下所有容器的日志
kubectl logs nginx --all-containers=true

# 查看带有 app=nginx 标签的所有容器组所有容器的日志
kubectl logs -lapp=nginx --all-containers=true

# 查看容器组 nginx 最近20行日志
kubectl logs --tail=20 nginx

# 查看容器组 nginx 过去1个小时的日志
kubectl logs --since=1h nginx

```
