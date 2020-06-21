---
vssueId: 57
sharingTitle: Kubernetes 核心概念详解之：Ingress
layout: LearningLayout
description: Kubernetes教程_本文介绍如何配置Ingress annotations
meta:
  - name: keywords
    content: Kubernetes Ingress,Ingress,Ingress 注解,Ingress annotations,nginx-ingress
---

# Ingress 注解配置


## nginx-ingress

如果您参考 kuboard.cn 上提供的 Kubernetes 安装文档完成了 K8S 的安装，那么您应该已经安装了 nginx-ingress，某些情况下您可能需要通过 Ingress 的注解来改变 Ingress 的某些行为，例如：

* 修改上传文件的大小限制 `nginx.org/client-max-body-size`
* 在开启 HTTPS 时，默认重定向到 HTTPS `nginx.org/redirect-to-https`
* 启用 websocket `nginx.org/websocket-services`
* 更多请参考文档 [nginx-ingress ConfigMap and Annotations](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/advanced-configuration-with-annotations/)

## ingress-nginx

## traefic
