---
vssueId: 138
layout: LearningLayout
description: Kubernetes教程_注解annotation可以用来向Kubernetes对象的metadata.annotations字段添加任意的信息_Kubernetes的客户端或者自动化工具可以存取这些信息以实现其自定义的逻辑
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes Annotation,Kubernetes 注解
---

# 注解annotation

<AdSenseTitle>

注解（annotation）可以用来向 Kubernetes 对象的 `metadata.annotations` 字段添加任意的信息。Kubernetes 的客户端或者自动化工具可以存取这些信息以实现其自定义的逻辑。

[[TOC]]

</AdSenseTitle>

## 向Kubernetes对象添加注解

Kubernetes 对象的 `metadata` 字段可以添加自定义的标签（label）或者注解（annotation）。标签用来选择对象或者用来查找符合指定条件的一组对象。与此相对，注解不是用来标记对象或者选择对象的。`metadata` 中的注解可以很大，也可以很小；可以是结构化的，也可以是非结构化的；还可以包括标签中不允许出现的字符。

与标签相似，注解也是 key/value map，例如：
``` yaml
metadata:
  annotations:
    key1: value1
    key2: value2
```

类似于下面的信息可以记录在注解中：
* 声明式配置层用到的状态信息。
* Build、release、image信息，例如 timestamp、release ID、git branch、PR number、image hash、registry address
* 日志、监控、分析、审计系统的参数
* 第三方工具所需要的信息，例如 name、version、build information、URL
* 轻量级的发布工具用到的信息，例如，config、checkpoint
* 负责人的联系方式，例如，电话号码、网址、电子信箱
* 用户用来记录备忘信息的说明，例如，对标准镜像做了什么样的修改、维护过程中有什么特殊信息需要记住

下面是一个来自于实际 Deployment 的注解：
``` yaml
metadata:
  annotations:
    deployment.kubernetes.io/revision: 7  # 由Deployment控制器添加，用于记录当前发布的修改次数
    k8s.eip.work/displayName: busybox   # Kuboard添加，Deployment显示在Kuboard界面上的名字
    k8s.eip.work/ingress: false     # Kuboard添加，根据此参数显示Deployment是否配置了Ingress
    k8s.eip.work/service: none      # Kuboard添加，根据此参数显示Deployment是否配置了Service
```

除了使用注解，您也可以将这类信息存放在一个外部的数据库，然而，在使用、分享这些信息的时候，可能会变得难以管理。

## 句法和字符集

注解是一组名值对。

注解的 key 有两个部分：可选的前缀和标签名，通过 `/` 分隔。
* 注解名：
  * 标签名部分是必须的
  * 不能多于 63 个字符
  * 必须由字母、数字开始和结尾
  * 可以包含字母、数字、减号`-`、下划线`_`、小数点`.`
* 注解前缀：
  * 注解前缀部分是可选的
  * 如果指定，必须是一个DNS的子域名，例如：k8s.eip.work
  * 不能多于 253 个字符
  * 使用 `/` 和标签名分隔

如果省略注解前缀，则注解的 key 将被认为是专属于用户的。Kubernetes的系统组件（例如，kube-scheduler、kube-controller-manager、kube-apiserver、kubectl 或其他第三方组件）向用户的Kubernetes对象添加注解时，必须指定一个前缀。

`kubernetes.io/` 和 `k8s.io/` 这两个前缀是 Kubernetes 核心组件预留的。Kuboard 使用 `k8s.eip.work` 这个前缀。

下面的例子中，Pod包含一个注解 `imageregistry: https://hub.docker.com/`
``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: annotations-demo
  annotations:
    imageregistry: "https://hub.docker.com/"
spec:
  containers:
  - name: nginx
    image: nginx:1.7.9
    ports:
    - containerPort: 80
```
