---
vssueId: 169
lessAds: true
description: Kubernetes教程：本文介绍了如何在Kuboard中实现与CICD的集成
meta:
  - name: keywords
    content: Kubernetes教程,K8S,helm,helm chart
---

# CI/CD集成

<AdSenseTitle/>

下图展示了当前比较典型的持续构建集成的一种做法。

<p>
  <img src="./README.assets/image-20191127210025546.png" alt="Kubernetes教程_CI/CD集成典型做法" style="padding: 10px;"/>
</p>



在是否自动将最新版本部署到 Kubernetes 环境这个问题上，可能会有多种做法。



## 手工触发

当容器镜像推送到 docker registry 中之后，手工触发是否更新 Kubernetes 环境中的容器镜像。这样做的主要理由是：
* 提交代码以及构建镜像的操作频次太高，如果每次都自动触发测试环境的部署，会使得环境总是处于一种不稳定的状态
* 微服务环境中，部署单元比较多，开发团队可能要求将两个或者更多相互依赖的部署单元（微服务）一起更新

<p>
  <img src="./README.assets/image-20191127211528237.png" alt="Kubernetes教程_CI/CD集成_手工触发" style="padding: 10px;"/>
</p>

如果使用手工触发，在使用 Kuboard 管理 Kubernetes 的情况下，只需要熟悉 Kuboard / Kubernetes 以下几个功能即可轻松完成 CI/CD：

* [使用私有仓库中的 docker 镜像](/learning/k8s-intermediate/private-registry.html)
* [批量调整镜像版本](/guide/namespace/adjustion.html#批量调整镜像版本) 可以一次性更新多个容器的镜像版本
* 假设在标签不变的情况下，对应的容器镜像已经更新，[批量删除容器组](/guide/namespace/adjustion.html#批量删除容器组) 可以在 [imagePullPolicy=Always](/learning/k8s-intermediate/container/images.html#更新镜像) 的情况下更新 Pod 的容器镜像



## 自动触发

当容器镜像推送到 docker registry 中之后，自动触发是否更新 Kubernetes 环境中的容器镜像。这样做的主要理由是：
* 更完全的自动化，将手工操作降到最低

<p>
  <img src="./README.assets/image-20191127212306366.png" alt="Kubernetes教程_CI/CD集成_自动触发" style="padding: 10px;"/>
</p>

为了支持这种做法，Kuboard 在工作负载界面中提供了 CI/CD 脚本（需更新到 Kuboard v1.0.5-beta.2 以上），如下图所示：


![image-20191127215923426](./README.assets/image-20191127215923426.png)

点击工作负载界面上方的 ***CI/CD集成*** 按钮，将在如下界面中显示两段脚本

![image-20191127220528541](./README.assets/image-20191127220528541.png)

### 更新镜像版本

通过更新镜像版本的脚本，可以直接在 shell 脚本中调用 Kuboard/Kubernetes API，更新对应容器镜像的标签。完成此接口调用后，Kubernetes 将自动完成滚动更新。

界面中提供的脚本里，容器的版本是当前 Kubernetes 中已部署的版本，通常在 Jenkins/GitlabRunner 之类的工具里，需要将该脚本的镜像标签参数化。如下所示：

```sh {5}
export BUSY_BOX_TAG=1.29
curl -X PATCH \
  -H "content-type: application/strategic-merge-patch+json" \
  -H "Authorization:Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tcTlnemsiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMmQyZWRkOTAtODU2Zi00MDA2LThjNTYtOTBmNjI0MzVkZGI2Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.hGeV_w3ouydhPAEGYAXMO646-97alroek00JbM4wSIUqM64rd30WAHQLKH2OsD3DR9zg3syXhCvVIgGu_ErMpaLIWFRiAJbOXJiaB0w7Haod-gc-dpL3ABz_IBqCJf5dOP-PDKHhgAEbjEl6b7-0HPTdwHFI0MHRwF0hoUbW8BpUHCzV_UlX5CqQ7Yz51pNivXkC40x2vng6Nx7MVz8enSH_9IoGdddBhkOSdhJgUkh-drWvXFe2ayGZv1mJRZSe-sXdyQFWpPh1W0nRR_CuIEA5I7eiWlIMYuZT5-llQvEjzXg2SqGGHqcqGr2DQnoIdI24Gwnyz1THYjC4pgKPlQ" \
  -d '{"spec":{"template":{"spec":{"containers":[{"name":"busybox","image":"busybox:'$BUSY_BOX_TAG'"}]}}}}' \
  "http://kuboard.demo.eip.work:/k8s-api/apis/apps/v1/namespaces/example/deployments/web-busybox"
```

::: tip 参数化
例子中，
* 脚本中添加了 `export BUSY_BOX_TAG=1.29` 语句
* 参数化时，对变量使用单引号，如上例中，将界面中直接复制下来的脚本中 `"image":"busybox:1.28"` 修改为 `"image":"busybox:'$BUSY_BOX_TAG'"`
:::

### 删除Pod

假设在标签不变的情况下，对应的容器镜像已经更新，执行 `删除Pod的脚本` 可以在 [imagePullPolicy=Always](/learning/k8s-intermediate/container/images.html#更新镜像) 的情况下更新 Pod 的容器镜像。

例如：

``` sh
curl -X DELETE \
  -H "Content-Type: application/yaml" \
  -H "Authorization:Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tcTlnemsiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMmQyZWRkOTAtODU2Zi00MDA2LThjNTYtOTBmNjI0MzVkZGI2Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.hGeV_w3ouydhPAEGYAXMO646-97alroek00JbM4wSIUqM64rd30WAHQLKH2OsD3DR9zg3syXhCvVIgGu_ErMpaLIWFRiAJbOXJiaB0w7Haod-gc-dpL3ABz_IBqCJf5dOP-PDKHhgAEbjEl6b7-0HPTdwHFI0MHRwF0hoUbW8BpUHCzV_UlX5CqQ7Yz51pNivXkC40x2vng6Nx7MVz8enSH_9IoGdddBhkOSdhJgUkh-drWvXFe2ayGZv1mJRZSe-sXdyQFWpPh1W0nRR_CuIEA5I7eiWlIMYuZT5-llQvEjzXg2SqGGHqcqGr2DQnoIdI24Gwnyz1THYjC4pgKPlQ" \
  "http://kuboard.demo.eip.work:/k8s-api/api/v1/namespaces/example/pods?labelSelector=k8s.eip.work/layer%3dweb,k8s.eip.work/name%3dweb-busybox"
```


::: tip YAML文件在哪儿？

* Kuboard 的设计目标是，不使用 YAML 文件，就可以轻松完成 Kubernetes 部署。
* 当您需要 [复制一个新的环境](/guide/namespace/multi-env.html) 时，从已有名称空间导出 YAML 文件，再到新的名称空间或 Kubernetes 集群导入
* 将导出的 YAML 文件备份到 git，可以使部署的脚本版本化

:::
