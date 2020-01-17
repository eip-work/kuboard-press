---
vssueId: 13
lessAds: false
description: Kuboard_是一款Kubernetes_Dashboard_快速在K8S上落地微服务_本文是Kuboard的安装手册_包括安装Kuboard的前提条件_与Kubernetes的版本兼容性_安装步骤_以及完成安装后如何访问Kuboard界面。
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装Kuboard

<AdSenseTitle/>

## 在线体验

Kuboard 是 Kubernetes 的一款图形化管理界面。

<div style="min-height: 433px;">
  <InstallDashboardPreview/>
</div>

## 前提

安装 Kuboard 时，假设您已经有一个 Kubernetes 集群

如果没有 Kubernetes 集群：

* 初学者，请参考 
  * [在 Windows/Mac 安装 Kubernetes 测试集群](install-docker-desktop.html) <Badge type="error">不推荐</Badge>
  * [安装 Kubernetes 单Master节点](install-k8s.html) <Badge type="success">推荐</Badge>
* 用于生产，请参考 [安装 Kubernetes 高可用](install-kubernetes.html)

## 兼容性


| Kubernetes 版本 | Kuboard 版本   | 兼容性 | 说明                                                         |
| --------------- | -------------- | ------ | ------------------------------------------------------------ |
| v1.17           | v1.0 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.16           | v1.0 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.15           | v1.0 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.14           | v1.0 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.13           | v1.0 | <span style="font-size: 24px;">😄</span>      | 已验证                       |
| v1.12           | v1.0 | <span style="font-size: 24px;">😐</span>      | Kubernetes Api v1.12 不支持 dryRun，<br />忽略Kuboard在执行命令时的参数校验错误，可正常工作 |
| v1.11           | v1.0 | <span style="font-size: 24px;">😐</span>      | 同上                                                         |
## 安装


<b-card>
<b-tabs content-class="mt-3">
<b-tab title="安装" active>

安装 Kuboard。

> 如果您参考 https://kuboard.cn 网站上提供的 Kubernetes 安装文档，可在 master 节点上执行以下命令。

<b-tabs content-class="mt-3">
<b-tab title="稳定版">

``` sh
kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml
kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.6/metrics-server.yaml
```

</b-tab>
<b-tab title="Beta版">

``` sh
kubectl apply -f https://kuboard.cn/install-script/kuboard-beta.yaml
kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.6/metrics-server.yaml
```

</b-tab>
</b-tabs>

查看 Kuboard 运行状态：

``` sh
kubectl get pods -l k8s.eip.work/name=kuboard -n kube-system
```

输出结果如下所示：
```
NAME                       READY   STATUS        RESTARTS   AGE
kuboard-54c9c4f6cb-6lf88   1/1     Running       0          45s
```
> 如果您一直不能看到 kuboard 处于 Running 状态，可参考 [诊断应用程序](/learning/k8s-advanced/ts/application.html)，查找原因。如不能解决，请到本文页尾加群，联系群主解决。

</b-tab>
<b-tab title="卸载">

卸载 Kuboard

``` sh
kubectl delete -f https://kuboard.cn/install-script/kuboard.yaml
```

</b-tab>
</b-tabs>
</b-card>

## 获取Token

您可以获得管理员用户、只读用户的Token。

> * 如果您需要更细粒度的权限控制，请参考 [RBAC Example](/learning/k8s-advanced/sec/rbac/example.html)
> * Kuboard beta 版已经开始支持 RBAC，请参考 [使用Kuboard管理ServiceAccount及RBAC](/learning/k8s-advanced/sec/kuboard.html)

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="管理员用户" active>

**拥有的权限**

* 此Token拥有 ClusterAdmin 的权限，可以执行所有操作

**执行命令**

```bash
# 如果您参考 www.kuboard.cn 提供的文档安装 Kuberenetes，可在第一个 Master 节点上执行此命令
kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d
```

**输出**

取输出信息中 token 字段
```{1}
eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWc4aHhiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI5NDhiYjVlNi04Y2RjLTExZTktYjY3ZS1mYTE2M2U1ZjdhMGYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.DZ6dMTr8GExo5IH_vCWdB_MDfQaNognjfZKl0E5VW8vUFMVvALwo0BS-6Qsqpfxrlz87oE9yGVCpBYV0D00811bLhHIg-IR_MiBneadcqdQ_TGm_a0Pz0RbIzqJlRPiyMSxk1eXhmayfPn01upPdVCQj6D3vAY77dpcGplu3p5wE6vsNWAvrQ2d_V1KhR03IB1jJZkYwrI8FHCq_5YuzkPfHsgZ9MBQgH-jqqNXs6r8aoUZIbLsYcMHkin2vzRsMy_tjMCI9yXGiOqI-E5efTb-_KbDVwV5cbdqEIegdtYZ2J3mlrFQlmPGYTwFI8Ba9LleSYbCi4o0k74568KcN_w
```

  </b-tab>
  <b-tab title="只读用户">

**拥有的权限**

- view  可查看名称空间的内容
- system:node   可查看节点信息
- system:persistent-volume-provisioner  可查看存储类和存储卷声明的信息

**适用场景**

只读用户不能对集群的配置执行修改操作，非常适用于将开发环境中的 Kuboard 只读权限分发给开发者，以便开发者可以便捷地诊断问题

**执行命令**

执行如下命令可以获得 <span style="color: #F56C6C; font-weight: 500;">只读用户</span> 的 Token

```bash
# 如果您参考 www.kuboard.cn 提供的文档安装 Kuberenetes，可在第一个 Master 节点上执行此命令
kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep kuboard-viewer | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d
```

**输出**

取输出信息中 token 字段
``` {1}
eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWc4aHhiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI5NDhiYjVlNi04Y2RjLTExZTktYjY3ZS1mYTE2M2U1ZjdhMGYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.DZ6dMTr8GExo5IH_vCWdB_MDfQaNognjfZKl0E5VW8vUFMVvALwo0BS-6Qsqpfxrlz87oE9yGVCpBYV0D00811bLhHIg-IR_MiBneadcqdQ_TGm_a0Pz0RbIzqJlRPiyMSxk1eXhmayfPn01upPdVCQj6D3vAY77dpcGplu3p5wE6vsNWAvrQ2d_V1KhR03IB1jJZkYwrI8FHCq_5YuzkPfHsgZ9MBQgH-jqqNXs6r8aoUZIbLsYcMHkin2vzRsMy_tjMCI9yXGiOqI-E5efTb-_KbDVwV5cbdqEIegdtYZ2J3mlrFQlmPGYTwFI8Ba9LleSYbCi4o0k74568KcN_w
```

  </b-tab>
</b-tabs>
</b-card>

## 访问Kuboard

您可以通过NodePort、port-forward 两种方式当中的任意一种访问 Kuboard

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="通过NodePort访问" active>

Kuboard Service 使用了 NodePort 的方式暴露服务，NodePort 为 32567；您可以按如下方式访问 Kuboard。

`
http://任意一个Worker节点的IP地址:32567/
`

输入前一步骤中获得的 token，可进入 **Kuboard 集群概览页**

::: tip
* 如果您使用的是阿里云、腾讯云等，请在其安全组设置里开放 worker 节点 32567 端口的入站访问，
* 您也可以修改 Kuboard.yaml 文件，使用自己定义的 NodePort 端口号
:::

  </b-tab>
  <b-tab title="通过port-forward访问">

在您的客户端电脑中执行如下命令

```sh
kubectl port-forward service/kuboard 8080:80 -n kube-system
```

在浏览器打开链接 （请使用 kubectl 所在机器的IP地址）

`http://localhost:8080`

输入前一步骤中获得的 token，可进入 **Kuboard 集群概览页**


::: tip
需要您先完成 [从客户端电脑远程管理 Kubernetes](install-kubectl.html) 的配置
:::

  </b-tab>
</b-tabs>
</b-card>

## 免登陆访问

可以通过查询参数中的 k8sToken 字段直接登录系统，无需在登录界面输入 Token。

### 直接访问集群概览页

如需要无登录访问集群概览页面，可使用如下格式的 url 进入：

```
http://任意一个Worker节点的IP地址:32567/#/dashboard?k8sToken=yourtoken
```

::: tip 其他界面
其他任意 Kuboard 界面同理，只需要增加 k8sToken 作为查询参数，即可跳过输入 Token 的步骤
:::

### 直接访问终端界面

如果想要无登录直接访问容器组的控制台，可使用如下格式的 url 进入：
```
http://任意一个Worker节点的IP地址:32567/#/console/yournamespace/yourpod?containerName=yourcontainer&shell=bash&k8sToken=yourtoken
```

其中，shell 参数可选取值有：
* `bash`，使用 /bin/bash 作为 shell
* `sh`， 使用 /bin/sh 作为 shell

## 下一步

:tada: :tada: :tada:

- 使用 Kuboard 工作负载编辑器 [创建第一个应用](/guide/example/busybox.html) （10分钟）

- 尝试 Kuboard 设计的其他 example [使用 Kuboard](/guide/index.html)
- 学习 [Kubernetes免费教程](/learning/)
