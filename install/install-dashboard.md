# 安装 Kuboard

## 前提

安装 Kuboard 时，假设您已经：

* 已经有一个 Kubernetes 集群
* 拥有对该 Kubernetes 集群执行 kubectl 命令时的所有权限

如果没有 Kubernetes 集群，可以有如下选项：

* 参考 [安装 Kubernetes 单Master节点](install-k8s)
* 参考 [安装 Kubernetes 高可用](install-kubernetes)

## 兼容性


| Kubernetes 版本 | Kuboard 版本   | 兼容性 | 说明                                                         |
| --------------- | -------------- | ------ | ------------------------------------------------------------ |
| v1.15           | v1.0.0-beta.10 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.14           | v1.0.0-beta.10 | <span style="font-size: 24px;">😄</span>      | 已验证                            |
| v1.13           | v1.0.0-beta.10 | <span style="font-size: 24px;">😄</span>      | 已验证                       |
| v1.12           | v1.0.0-beta.10 | <span style="font-size: 24px;">😐</span>      | Kubernetes Api v1.12 尚不支持 dryRun，<br />忽略Kuboard在执行命令时的参数校验错误，可正常工作 |
| v1.11           | v1.0.0-beta.10 | <span style="font-size: 24px;">😐</span>      | 同上                                                         |




::: warning
**Kubernetes 安装方式**
* 部分用户使用二进制包的形式安装 Kubernetes，Kuboard 现在的版本不能在这类 Kubernetes 集群中正常工作，作者正在解决此问题。
* 如果您是使用 kubeadm 安装的 Kubernetes 集群（Kubernetes 官方推荐的安装方式），请放心使用 Kuboard。
* Kubeadm 相关资料请参考 https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/
:::


## 安装

**获取并修改yaml文件**

```bash
wget https://raw.githubusercontent.com/eip-work/eip-monitor-repository/master/dashboard/kuboard.yaml
```

修改文件 Kuboard.yaml 中 Ingress 的 host 为 Kuboard.yourclustername.yourdomain.com

**执行安装**

```bash
kubectl apply -f Kuboard.yaml 
```

## 获取 token

您可以获得管理员用户、只读用户的Token

:::: tabs type:border-card

::: tab 管理员用户 lazy

**拥有的权限**

* 此Token拥有 ClusterAdmin 的权限，可以执行所有操作

**执行命令**

```bash
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}')   
```

**输出**

取输出信息中 token 字段
```{13}
Name: admin-user-token-g8hxb
Namespace: kube-system
Labels: <none>
Annotations: [kubernetes.io/service-account.name](http://kubernetes.io/service-account.name): Kuboard-user
[kubernetes.io/service-account.uid](http://kubernetes.io/service-account.uid): 948bb5e6-8cdc-11e9-b67e-fa163e5f7a0f

Type: [kubernetes.io/service-account-token](http://kubernetes.io/service-account-token)

Data
====
ca.crt: 1025 bytes
namespace: 11 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWc4aHhiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI5NDhiYjVlNi04Y2RjLTExZTktYjY3ZS1mYTE2M2U1ZjdhMGYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.DZ6dMTr8GExo5IH_vCWdB_MDfQaNognjfZKl0E5VW8vUFMVvALwo0BS-6Qsqpfxrlz87oE9yGVCpBYV0D00811bLhHIg-IR_MiBneadcqdQ_TGm_a0Pz0RbIzqJlRPiyMSxk1eXhmayfPn01upPdVCQj6D3vAY77dpcGplu3p5wE6vsNWAvrQ2d_V1KhR03IB1jJZkYwrI8FHCq_5YuzkPfHsgZ9MBQgH-jqqNXs6r8aoUZIbLsYcMHkin2vzRsMy_tjMCI9yXGiOqI-E5efTb-_KbDVwV5cbdqEIegdtYZ2J3mlrFQlmPGYTwFI8Ba9LleSYbCi4o0k74568KcN_w
```

:::


::: tab 只读用户 lazy

**拥有的权限**

- view  可查看名称空间的内容
- system:node   可查看节点信息
- system:persistent-volume-provisioner  可查看存储类和存储卷声明的信息

**适用场景**

只读用户不能对集群的配置执行修改操作，非常适用于将开发环境中的 Kuboard 只读权限分发给开发者，以便开发者可以便捷地诊断问题

**执行命令**

执行如下命令可以获得 <span style="color: #F56C6C; font-weight: 500;">只读用户</span> 的 Token

```bash
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-viewer | awk '{print $1}')   
```

**输出**

取输出信息中 token 字段
```{13}
Name: admin-user-token-g8hxb
Namespace: kube-system
Labels: <none>
Annotations: [kubernetes.io/service-account.name](http://kubernetes.io/service-account.name): Kuboard-viewer
[kubernetes.io/service-account.uid](http://kubernetes.io/service-account.uid): 948bb5e6-8cdc-11e9-b67e-fa163e5f7a0f

Type: [kubernetes.io/service-account-token](http://kubernetes.io/service-account-token)

Data
====
ca.crt: 1025 bytes
namespace: 11 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWc4aHhiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI5NDhiYjVlNi04Y2RjLTExZTktYjY3ZS1mYTE2M2U1ZjdhMGYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.DZ6dMTr8GExo5IH_vCWdB_MDfQaNognjfZKl0E5VW8vUFMVvALwo0BS-6Qsqpfxrlz87oE9yGVCpBYV0D00811bLhHIg-IR_MiBneadcqdQ_TGm_a0Pz0RbIzqJlRPiyMSxk1eXhmayfPn01upPdVCQj6D3vAY77dpcGplu3p5wE6vsNWAvrQ2d_V1KhR03IB1jJZkYwrI8FHCq_5YuzkPfHsgZ9MBQgH-jqqNXs6r8aoUZIbLsYcMHkin2vzRsMy_tjMCI9yXGiOqI-E5efTb-_KbDVwV5cbdqEIegdtYZ2J3mlrFQlmPGYTwFI8Ba9LleSYbCi4o0k74568KcN_w
```

:::
::::


## 访问 Kuboard

您可以通过NodePort、Port-forward、域名三种方式访问 Kuboard

:::: tabs type:border-card

::: tab 通过NodePort访问 lazy

Kuboard Service 使用了 NodePort 的方式暴露服务，NodePort 为 32567；您可以按如下方式访问 Kuboard。（可以使用集群中任意节点的 IP 地址）

`
http://any-of-your-node-ip:32567/
`

输入前一步骤中获得的 token，可进入控制台界面

::: tip
您也可以修改 Kuboard.yaml 文件，使用自己定义的 NodePort 端口号


:::

::: tab 通过port-forward访问 lazy

在您的客户端电脑中执行如下命令

```sh
kubectl port-forward service/Kuboard 8080:80 -n kube-system
```

在浏览器打开链接 （请使用 kubectl 所在机器的IP地址）

`http://localhost:8080`

::: tip
需要您自行设定 kubectl 的配置


:::

::: tab 通过域名访问 lazy

在浏览器打开链接 （请使用前面已修改的域名）

`http://Kuboard.yourclustername.yourdomain.com`


输入前一步骤中获得的 token，可进入控制台界面

::: tip
需要您
* 正确安装 Ingress Controller
* 将您所使用的域名指向 Kubernetes 中的一个 Worker 节点（或者Ingress Controller所在机器的IP，不同类型的Ingress Controller配置不同）

:::

::::


**下一步**

- 使用 Kuboard 工作负载编辑器 [创建 busybox](/guide/example/busybox) （10分钟）

- 尝试 Kuboard 设计的其他 example [使用 Kuboard](/guide/index)
