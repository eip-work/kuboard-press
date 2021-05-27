---
vssueId: 13
lessAds: false
description: Kuboard_是一款Kubernetes_Dashboard_快速在K8S上落地微服务_本文是Kuboard的安装手册_包括安装Kuboard的前提条件_与Kubernetes的版本兼容性_安装步骤_以及完成安装后如何访问Kuboard界面。
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装 Kuboard v2

<AdSenseTitle/>

## 在线体验

Kuboard 是 Kubernetes 的一款图形化管理界面。

<div style="min-height: 433px;">
  <InstallDashboardPreview/>
</div>

## Kuboard v3 版本介绍

* Kuboard v3.0 已经正式发布，相较于 Kuboard v2.0.x， Kuboard v3 最大的特点是支持多 Kubernetes 集群管理。 **建议您选择 [Kuboard v3](./v3/install.html)**。

* Kuboard v2.0.x 将进入长期维护阶段，如果碰到问题，用户仍然可以在群里找群主解决问题。如果您计划升级到 Kuboard v3，请参考 [从 v2.0.x 升级到 v3.0.x](./v3/install.html#从-v2.0.x-升级到-v3.0.x)

> 如果您希望继续安装 Kuboard v2.0.x，请继续阅读本文后面的内容。
## 前提

安装 Kuboard 时，假设您已经有一个 Kubernetes 集群，以下任何形式安装的集群都可以：
* kubeadm 安装（或者基于 kubeadm 的衍生工具，如 Sealos 等）；
* 二进制安装；
* 阿里云、腾讯云等公有云托管集群；
* 其他。

如果没有 Kubernetes 集群：

* 初学者，请参考 
  * [在 Windows/Mac 安装 Kubernetes 测试集群](install-docker-desktop.html) <Badge type="error">不推荐</Badge>
  * [安装 Kubernetes 单Master节点](install-k8s.html) <Badge type="success">推荐</Badge>
* 用于生产，请参考 [安装 Kubernetes 高可用](install-kubernetes.html)

## 兼容性


| Kubernetes 版本 | Kuboard 版本   | 兼容性 | 说明                                                         |
| --------------- | -------------- | ------ | ------------------------------------------------------------ |
| v1.20           | v2.0.x          | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.19           | v2.0.x          | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.18           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.17           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.16           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.15           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.14           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.13           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😄</span>      | 已验证                       |
| v1.12           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😐</span>      | Kubernetes Api v1.12 不支持 dryRun，<br />Kuboard 不支持 Kubernetes v1.12 |
| v1.11           | v1.0.x， v2.0.x | <span style="font-size: 24px;">😐</span>      | Kuboard 不支持 Kubernetes v1.11                                                         |
## 安装


<b-card>
<b-tabs content-class="mt-3">
<b-tab title="安装" active>

安装 Kuboard。

> 如果您参考 https://kuboard.cn 网站上提供的 Kubernetes 安装文档，可在 master 节点上执行以下命令。
> * 如果您已经安装了 Kuboard v1.0.x，请参考 [了解如何从 v1.0.x 升级到 Kuboard v2.0.x](/support/change-log/upgrade-1-2.html)

<b-tabs content-class="mt-3">
<b-tab title="稳定版">

``` sh
kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml
kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server.yaml
```

</b-tab>
<b-tab title="Beta版">

``` sh
kubectl apply -f https://kuboard.cn/install-script/kuboard-beta.yaml
kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server.yaml
```

</b-tab>

<b-tab title="Arm版">

基于 Arm CPU 的机器上，许多镜像都不能直接使用，但是，Arm 很可能是未来服务器端发展的一个方向，以华为鲲鹏社区为代表的 arm 服务器已经获得了许多用户的青睐。因此，Kuboard 也提供了 arm 版本的镜像。安装 arm 版 Kuboard 之前，请确保您在 arm 上的 Kubernetes 集群已经搭建好，并可以正常工作。

> 于 Kuboard 而言，arm 版本与 x86_64 版本的主要区别在于所使用的基础 nginx/openresty 镜像不同，Kuboard 所提供的各项功能完全一致。

``` sh
kubectl apply -f https://kuboard.cn/install-script/kuboard-arm.yaml
kubectl apply -f https://addons.kuboard.cn/metrics-server/0.3.6/metrics-server-arm.yaml
```

</b-tab>
</b-tabs>

查看 Kuboard 运行状态：

``` sh
kubectl get pods -l k8s.kuboard.cn/name=kuboard -n kube-system
```

输出结果如下所示：
```
NAME                       READY   STATUS        RESTARTS   AGE
kuboard-54c9c4f6cb-6lf88   1/1     Running       0          45s
```

<b-button v-b-toggle.collapse-init-pending variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('install-dashboard-pending', 'error-init-master', '查看初始化时的镜像下载错误的解决办法')">如果出错点这里</b-button>
<b-collapse id="collapse-init-pending" class="mt-2">
<b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">

* ImagePullBackoff / Pending
  
  * 如果 `kubectl get pod -n kube-system -o wide` 的输出结果中出现 ImagePullBackoff 或者长时间处于 Pending 的情况，请参考 [查看镜像抓取进度](/learning/faq/image-pull-backoff.html)
* ContainerCreating
  * 如果 `kubectl get pod -n kube-system -o wide` 的输出结果中某个 Pod 长期处于 ContainerCreating、PodInitializing 或 Init:0/3 的状态，可以尝试：
    * 查看该 Pod 的状态，例如：
      ``` sh
      kubectl describe pod kuboard-8b8574658-q4lvf -n kube-system
      ```
      如果输出结果中，最后一行显示的是 Pulling image，请耐心等待，或者参考 [查看镜像抓取进度](/learning/faq/image-pull-backoff.html)
      ```
      Normal  Pulling    44s   kubelet, k8s02  Pulling image "eipwork/kuboard:latest"
      ```
    * 将该 Pod 删除，系统会自动重建一个新的 Pod，例如：
      ``` sh
      kubectl delete pod kuboard-8b8574658-q4lvf -n kube-system
      ```
* 其他问题
  
  * 请在本文页尾，加入 Kuboard 社群，以获得帮助；

</b-card>
</b-collapse>

</b-tab>
<b-tab title="卸载">

执行以下指令，可以卸载 Kuboard

<b-tabs content-class="mt-3">
<b-tab title="稳定版">

``` sh
kubectl delete -f https://kuboard.cn/install-script/kuboard.yaml
kubectl delete -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server.yaml
```

</b-tab>
<b-tab title="Beta版">

``` sh
kubectl delete -f https://kuboard.cn/install-script/kuboard-beta.yaml
kubectl delete -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server.yaml
```

</b-tab>

<b-tab title="Arm版">

``` sh
kubectl delete -f https://kuboard.cn/install-script/kuboard-arm.yaml
kubectl delete -f https://addons.kuboard.cn/metrics-server/0.3.7/metrics-server-arm.yaml
```

</b-tab>
</b-tabs>

</b-tab>
</b-tabs>
</b-card>


## 获取Token

您可以获得管理员用户、只读用户的Token。

> * 默认情况下，您可以使用 ServiceAccount 的 Token 登录 Kuboard
> * 您还可以 [使用 GitLab/GitHub 账号登录 Kuboard/Kubectl](/learning/k8s-advanced/sec/authenticate/install.html)
> * 您也可以 [为用户授权](/learning/k8s-advanced/sec/kuboard.html)

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="管理员用户" active>

**拥有的权限**

* 此Token拥有 ClusterAdmin 的权限，可以执行所有操作

**执行命令**

```bash
# 如果您参考 www.kuboard.cn 提供的文档安装 Kuberenetes，可在第一个 Master 节点上执行此命令
echo $(kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep ^kuboard-user | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d)
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
echo $(kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep ^kuboard-viewer | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d)
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

输入前一步骤中获得的 token，可进入 **Kubernetes 集群概览**


::: tip
需要您先完成 [从客户端电脑远程管理 Kubernetes](install-kubectl.html) 的配置
:::

  </b-tab>
</b-tabs>
</b-card>

<b-button v-b-toggle.collapse-access-error variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('install-dashboard-pending', 'error-get-token', '获取Token出错')">如果出错点这里</b-button>
<b-collapse id="collapse-access-error" class="mt-2">
<b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">

* 可以访问 Kuboard 登录界面，但是登录失败，表现有如下几种：
  * 提示认证失败，通常是因为 Token 拷贝不完整

      如下图所示，您很可能忽略了图中红色标注的部分：

      ![image-20200329174546499](./install-dashboard.assets/image-20200329174546499.png)

  * 输入 Token 后长时间无响应，通常是因为从 Kuboard 的容器中访问到您的 APIServer 接口，可能有如下两种情况：
    * 您 Kubernetes 集群的 dnsDomain 不是默认的 `cluster.local`，请参考 [配置Kuboard环境变量 - KUBERNETES_CLUSTER_DOMAIN](/install/install-kuboard-env.html#kubernetes-cluster-domain)
    * Kuboard 容器中不能访问到您的 API Server，定位问题的方式如下：
      * 进入 Kuboard 的终端
        ```sh
        kubectl exec -it $(kubectl get pods -l k8s.kuboard.cn/name=kuboard -n kube-system | grep kuboard | awk '{print $1}') /bin/bash -n kube-system
        ```
      * 在 Kuboard 终端中执行
        ``` sh
        curl -k https://$KUBERNETES_SERVICE_HOST:$KUBERNETES_SERVICE_PORT
        ```
        如果一切正常，您将获得如下输出结果：
        ``` json
        {
          "kind": "Status",
          "apiVersion": "v1",
          "metadata": {
          },
          "status": "Failure",
          "message": "forbidden: User \"system:anonymous\" cannot get path \"/\"",
          "reason": "Forbidden",
          "details": {
          },
          "code": 403
        }
        ```
        如果是其他情况，请检查一下您 Kubernetes 集群的网络插件是否正常工作

* 不能访问 Kuboard 界面，可能的原因有：
  * 您的防火墙/安全组配置规则不允许访问节点的 `32567` 端口
  * 如果您为 Kuboard 配置了反向代理，请确保 Kuboard 使用了根路径，例如：
    * 正确设置： `https://your.kuboard.dns/`
    * 错误设置： `https://your.kuboard.dns/subcontext/`

</b-card>
</b-collapse>

## 为开发测试人员授权

运维团队搭建好 Kubernetes 之后，需要授权开发/测试团队的成员执行某些特定的操作，例如更新镜像版本、查看容器日志、进入容器终端、通过Proxy访问接口等，以便开发测试人员可以自行完成日常的测试联调等任务。使用 Kubernetes + Kuboard 的团队可能以如下几种形式授权开发、测试人员访问：
* 为开发团队、测试团队创建各自的 ServiceAccount，并授权其访问指定的名称空间，请参考：
  * [使用Kuboard管理ServiceAccount及RBAC](/learning/k8s-advanced/sec/kuboard.html)；
  * [授权 kuboard-viewer 查看日志](/learning/k8s-advanced/sec/rbac/logs.html)
* 与自建的 gitlab / github 实现单点登录，并授权 gitlab / github 中的 group/user 访问指定的名称空间，请参考 [Kubernetes Authentication 安装向导](/learning/k8s-advanced/sec/authenticate/install.html)；
* 与自研的 PaaS 平台整合，免登录访问 Kuboard 提供的控制台界面、日志界面，请参考 [免登录访问](#免登录访问)；

### 免登陆访问

可以通过查询参数中的 k8sToken 字段直接登录系统，无需在登录界面输入 Token。

#### 直接访问集群概览页

如需要无登录访问集群概览页面，可使用如下格式的 url 进入：

```
http://任意一个Worker节点的IP地址:32567/dashboard?k8sToken=yourtoken
```

::: tip 其他界面
其他任意 Kuboard 界面同理，只需要增加 k8sToken 作为查询参数，即可跳过输入 Token 的步骤
:::

#### 直接访问终端界面

如果想要无登录直接访问容器组的控制台，可使用如下格式的 url 进入：
```
http://任意一个Worker节点的IP地址:32567/console/yournamespace/yourpod?containerName=yourcontainer&shell=bash&k8sToken=yourtoken
```

其中，shell 参数可选取值有：
* `bash`，使用 /bin/bash 作为 shell
* `sh`， 使用 /bin/sh 作为 shell

## 下一步

:tada: :tada: :tada:

- 了解 [Kuboard 的环境变量](./install-kuboard-env.html)

- 使用 Kuboard 工作负载编辑器 [创建第一个应用](/guide/example/busybox.html) （10分钟）

- 尝试 Kuboard 设计的其他 example [使用 Kuboard](/guide/index.html)

- 学习 [Kubernetes免费教程](/learning/)
