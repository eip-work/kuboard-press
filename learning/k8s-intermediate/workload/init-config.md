---
vssueId: 149
layout: LearningLayout
description: Kubernetes培训_本文描述了如何为Pod配置初始化容器InitContainer
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,init container,初始化容器,initialize container
---

# 容器组_配置初始化容器


<AdSenseTitle>

> 参考文档： Kubernetes  [Configure Pod Initialization](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-initialization/)

本文描述了如何为Pod配置初始化容器InitContainer。

</AdSenseTitle>

本例中，您将创建一个Pod，该Pod包含一个应用程序容器（工作容器）和一个初始化容器（Init Container）。初始化容器执行结束之后，应用程序容器（工作容器）才开始启动。

Pod 的配置文件如下：

<<< @/.vuepress/public/statics/learning/initcontainer/config.yaml

从配置文件可以看出，Pod 中初始化容器和应用程序共享了同一个数据卷。初始化容器将该共享数据卷挂载到 `/work-dir` 路径，应用程序容器将共享数据卷挂载到 `/usr/share/nginx/html` 路径。初始化容器执行如下命令后，就退出执行：

``` sh
wget -O /work-dir/index.html https://kuboard.cn
```

执行该命令时，初始化容器将结果写入了应用程序容器 nginx 服务器对应的 html 根路径下的 `index.html`。

* 执行命令以创建 Pod
  
  ``` sh
  kubectl apply -f https://kuboard.cn/statics/learning/initcontainer/config.yaml
  ```

* 验证nginx容器已经运行

  ``` sh
  kubectl get pod init-demo
  ```

  输出结果如下所示：

  ```
  NAME        READY     STATUS    RESTARTS   AGE
  init-demo   1/1       Running   0          1m
  ```

* 获得 nginx 容器的命令行终端：

  ``` sh
  kubectl exec -it init-demo -- /bin/bash
  ```

  在命令行终端中执行向 nginx 发送一个 GET 请求：

  ``` sh
  apt-get update
  apt-get install curl
  curl localhost
  ```

  输出结果将显示nginx根目录下的 index.html 文件（该文件由初始化容器写入到共享数据卷）：
  ``` html
  <!DOCTYPE html>
  <html lang="en" style="margin-right: 0px;"><head>
    <meta charset="utf-8">
    <title>Kuboard_Kubernetes教程_管理界面</title>
    ...
  ```
