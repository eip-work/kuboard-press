---
vssueId: 18
titlePrefix: 从客户端电脑远程管理Kubernetes
description: Kubernete安装文档_日常工作中您可能需要在自己的笔记本电脑上执行kubectl命令以管理远程Linux服务器上的Kubernetes集群_本文档介绍了如何在您的笔记本电脑上安装和配置kubectl工具
meta:
  - name: keywords
    content: kubectl,kubectl安装,远程管理Kubernetes,远程管理K8S
---

# 安装Kubectl

<AdSenseTitle/>

日常工作中，您可能需要在自己的笔记本电脑上执行 kubectl 命令以管理远程 Linux 服务器上的 Kubernetes 集群。

::: tip
从客户端电脑使用 kubectl 远程管理 Kubernetes，这个步骤并不是使用 Kuboard 的必要步骤。<span style="color: red; font-weight: 500;">可以忽略</span>
:::

## 在客户端电脑安装 kubectl

Kubernetes 文档参照 [安装 kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 安装时，经常会失败，因为国内访问 google 的镜像仓库存在问题。

请参考下述内容，完成 kubectl 的安装


<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="Linux" active>

**配置K8S的yum源**

```bash
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

**安装kubectl**

```bash
yum install -y kubectl
```

**验证安装**

```bash
kubectl version
```

</b-tab>
<b-tab title="Windows">

* 从下面的链接下载 kubectl 可执行文件

  `
  https://storage.googleapis.com/kubernetes-release/release/v1.16.2/bin/windows/amd64/kubectl.exe
  `
  > * 请将其中的 v1.16.2 替换为最新的版本号
  > * 通过此链接可获取最新的版本号 `https://storage.googleapis.com/kubernetes-release/release/stable.txt`


* 将下载的可执行文件添加到 PATH 环境变量


* 执行命令查看已安装的 kubectl 版本号
  ```
  kubectl version
  ```

</b-tab>
<b-tab title="MAC">

* 下载最新的可执行文件

  ```sh
  curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
  ```

* 添加可执行权限

  ```sh
  chmod +x ./kubectl
  ```

* 复制到 PATH 路径

  ```sh
  sudo mv ./kubectl /usr/local/bin/kubectl
  ```

* 检查已安装版本

  ``` sh
  kubectl version
  ```

</b-tab>
</b-tabs>
</b-card>

## 获取 kubectl config 文件

如果您参考 [安装 Kubernetes 单Master节点](install-k8s.html) 或 [安装 Kubernetes 高可用](install-kubernetes.html) 完成了 Kubernetes 安装，**请在 demo-master-a-1 节点上执行如下命令**

```sh
cat /etc/kubernetes/admin.conf
```

输出内容如下所示：

```yaml {5}
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRxpJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRFNU1EY3hPREEzTURFMU1Gb1hEVEk1TURjeE5UQTNNREUxTUZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWxfY05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTUlvCit1TDVvWWFaMUc5UVR2SS9Cd0RNWWNNOTVqVkdNN2E1eWZIQWtBTVptOThWNGdDamNTd0NhOWFEbHJOKzliSUkKK054OXc3L0phdG1mb1ZwYlNoZ3dqc0lBT3QrTXlxQTh1WFVvMXlwSGFBd2NkaXhYbk81ZlVRRTlKN2xDbm9NZApKM0RYNmhNWnVmNmxwRVVBK2JkaVVTYzdkOEFKVDRpSm41bDAyL21pd3hRZUJweWwzQXFGVUZUQTQxUlNLbnBECjBuTzdoaEk3cE02aUVUTVBSa29lZkZrcHFtSEhqd0g5MGZQVzhETGgwdG5ENUlTM0VUUlVjMDdHbms0ZWh1OWMKamNhRXoxK1Roe3JhcWFTRmpTdUVSMGxhU3BYOXQyd3k1S3NxZFVBRkQySGNDK0Y1eUsvTXppL2krS01FdTM0SQpiTHJNUy90L3lta1V5RTQ3T3FrQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZ0QU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFFbXRORFVVZ2FhRWs3Z0lSMnE1MkRxZ21FRkMKZW1xR21rT3U5UERvVmZ0Z0Nva3VBUXEzZzBVdzA3cTJTQnhSZzJDNzQ2Y08wbkdURFZlL2ecXNmeVBFK2RFbApPQWJmQ3R1QUlKTHVQWDB6OVBUdDBKekhobnk1ODk5RE81ODdLMm5VdXd3S01xeEYvdWRHMUNtWUkza2g2cS9RCmN0WDI5RjlhTWhDRXluWU1lVU5EUVQ4cGN0TkOpNm4rYjg0NDlmMU5RWG9kVzM0TVRrL25pd3JuQ3pDUUE5M0wKR3YxelhRL2pwTTZVeVo5dU9ZNWEzK096UjJCTzRtZ2RiL0xoam5rL0hxTGs5RUszZmhJak5Tc2h0RWsrf9NpVApPQ3JTQkRHVk5ueHIzeGRwYzltRWNCeDlQdVBqVE1ER1ZkYlowUlZHbGVVODN3dVpUaTdJdUZaR2Jicz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    server: https://apiserver.demo:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM4akNDQxxRxZ0F3SUJBZ0lJY0JpMFhjUWJNWm93RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB4T1RBM01UZ3dOekF4TlRCYUZ3MHlNREEzTVRjd056QXhOVEZhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQW9CYzZvMHRCekIyRUlldW4KcmhONTVoaU1EaEplcUpxMWxlT3VUSjRic0dqVnlrQVJQVCtGZDlTR3llRjNFZS9NS1ZBcUQ4ZzRXeHNoTTRrdAp1dnVNalNTeit3bnMySnR2TWtJWStLT2FhZFBFSUx6U3dyamxucGRQbjMvQmtTbjc1SnVzRWFLR0NCN0c5Skk3CnJOK3lkc2ZLT29KQTE1ak8vR2VvdC90UGpWNGQ4MldCbVltWitSa1labW43STFPOHh4aFpjVDNDT0QxeVp3OS8KTjBYVnZQYkFzY1QweU91ZG5JMWpFQ3p1cHdKWnZRTENiMEJHb1MxSGxpVDFnL1o0WjBuYW5LdythYkdXamptNQpGbmZTZ2JQblNzOTI5NWNzQW5KQy9MRXZFTE90NEUxQkVHa2JkZTBuNXJnKzhKVjhDOWFPWkFOxhP2aU5iMExuCkdpQ2p6UUlEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFJYnd3RFJ6VExUbXNrV3R0NEZLbG1xK0NNYTRWZUFqL2x4bQpuaEdITTlTaXpFR1VDRDJ5UjEyQUV0YUdka0R5KzNuT3Q3aS9Db3Jwcm5ocnkwZHMzck81Q3BvMXAwdHNyQnZ5CkRiM1dDTDRkN2x0alplNklZQ0xGNmJCVkJmejJjY0FpZEdieW1UaVhwQU5pK25hOE8wZ3NBTmNUS1JaNG1nNDgKUXpWQktlUnZZWnhwcEV5T2JoelI2NTVoRE1aR3AzdG5pQW9NL3Z6QjA3R2dybzAxVTAvaUVOQnZaeG10S2RxRApFY0JVTzJRTHh3QlZaMFlMb0p2MmJWSTVMYWdmRDNwVFVDQ3A5MURGcDAwbmVHRUM0cDZmQXJwSG9YWU8yYVIyCjZtbEREdVhGNmg2Um53frkxU3N6MWZtSXVzZ2FXaHZUaGgrVGxQVVVTclFkZnQ2S0d4bz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb2dJQkFBS0NBUUVBb0JjNm8wdEJ6QjJFSWV1bnJoTjU1aGlNRGhKZXFKcTFsZU91VEo0YnNHalZ5a0FSClBUK0ZkOVNHeWVGM0VlL01LVkFxRDhnNFd4c2hNNGt0dXZ1TWpTU3ord25zMkp0dk1rSVkrS09hYWRQRUlMelMKd3JqbG5wZFBuMy9Ca1NuNzVKdXNFYUtHQ0I3RzlKSTdyTit5ZHNmS09vSkExNWpPL0dlb3QvdFBqVjRkODJXQgptWW1aK1JrWVptbjdJMU84eHhoWmNUM0NPRDF5Wnc5L04wWFZ2UGJBc2NUMHlPdWRuSTFqRUN6dXB3Slp2UUxDCmIwQkdvUzFIbGlUMWcvWjRaMG5hbkt3K2FiR1dqam01Rm5mU2diUG5TczkyOTVjc0FuSkMvTEV2RUxPdDRFMUIKRUdrYmRlMG41cmcrOEpWOEM5YU9aQU5NRHZpTmIwTG5HaUNqelFJREFRQUJBb0lCQUFPOHh4ZXMyQnBsemdIawp1SU50M1Bpc05naldFUE9xdVBhSTNEYlpzaGZLT3NOLy8yY0lwcHNIa1NZQlo0QTVzdkI3K0o5cHN6Y2RTUWNrCityWlV6UkUyZkNVdU5DTlNiYVXsdXVTREhVVy9OZUwxeFkzYU56SWVvak05RGszUFJ4d3RMalV6TUNIY1poU3IKblUwSjQrYTEvMWlpVmRVeXNoSmVjU2ZxYkE4R3pBUlpLUjlYdDZlU01qQXZqdlp4QUtVMVFYWDlHL3JPNnRqUwpXNjJ5aTlkaG5vYjRBR3ovTlhmN29JZld0dW9SUTcxOFdmxm5kZWZYeVp6MnNwc3V4ZGttRUtrQW9qZ2NqbjI3CnRCeFBlUFcveWRqQ3IzTTA3WGVWVDAyaG5UQXptVnFtcUFhbG5rYkpqT0Z5dkQxNE5Cck9Lc2FoK21CUkZLTUEKSjErdUlZRUNnWUVBeTNCZGMrNTJ0SkhGQm8vL1BjU0FMOHhRQVZXTjFoakZ1Nk1BY2Q5WVF6NkhWNWdDYU1oQwpUWFZrNmt5TC9qcEdYS1E1MmVpbTBrOFUvYWc2VXVlV0Uzek45ZDJ3ci9oeDljUjFLUUxmMlpJUmNrN3ZTRUhnEct0ejFWVlhMRDZBTHlKeThGRHhMbFV0ZGRJb3R6YUNOM1d2UXhybTRYV2pCYi82UnBDQTlWLzBDZ1lFQXlYUEcKaldxdXEvYnFCMlphMGNpVUh5NnJIbGQrRVBKNXg0cWlRc0JaUnpZK085TmxuajJnaU5lcU9mRHVjeU5yQ2JBRwo2RkRSTkMrdG9TVVVpWWhtNmgyeXpuc3JOS0pQbHdqN2VGQ1JadFFSb0ErSHpWajBaTnRuQjBNRnhzcUsyeTdSClGnVVlXWmRaTmJSSFVyeTJ0VFk3RHM5UHlITncyU2p5ZERJd3ZCRUNnWUFOczYyM3B6SDdpMjNYdVU4Vm0raCsKVDZaNzBJVlREQ3dWTFM5VWZCUjN3dmhlbi9CWm1sTk00RUZCdnBJWE4xbVIxOFhGdFhPMjZuaWhkUGtvcUV4bApWNXlQbUxUVHhVbjNvWm02ZjJVUVJGUkVmS2lGRjFyR3lYY0VubGlrM3NTc2FGSUtrdDBNV3gwYVFrdy9jemJhCjJPNGcxRlZraFMreUdWVTUxcW9MQ1FLQmdDOHdwN3BJMjFIOUxTVStuTmUzbkxzUk81U0gra2dPQk9qeFdNRTYKUGErb3pUdEdjZTkza0R0K0NhbzQvaUtLa1hCYmc4SzM2OG5Gd1c2V09SRmVtbjBOSisybWZLQi94UlVrVFlRSgptNFh5OTQzL0ZWak5GYkxxa2wvcEcxbE42T2tmTm5rRCtBaEVvK2tvcWc4cTljSE5TbGhWeCtLMDZDSjJyUlQ3CkROK0JBb0dB63h1R3g5OHc0MENESWlHWmhDWGY0ZTRxTllWdVhTcm9YTDVpeWFKTDZka3BLSE9UUk5VSlBmSVYKZ1FDMy9rN0xYZkFjbTNqTktSS1huQ2cveWxTd2N6RjFGYkZKb1hjNW9ackc5TE8yQXNSdGcxanByN1ZpRlZNYwo0LzB5cEFSTmJqRzA4Y0I5bzBrbVBjUVExUHd4Q05EeXVONVRQYzRKejN3OHR5SnhTN289Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
```

## 配置 kubectl 客户端

在客户端电脑完成如下配置，即可远程管理 Kubernetes 集群

<b-card>
<b-tabs content-class="mt-3">
  <b-tab title="Linux" active>

**执行命令**

```sh
vi ~/.kube/config
```

将前面获得的 `/etc/kubernetes/admin.conf` 文件的内容粘贴进该文件并保存

**配置 hosts**

```sh
echo "x.x.x.x    apiserver.demo" >> /etc/hosts
```

> * 将 x.x.x.x 替换成 demo-master-a-1 的实际 IP 地址
> * 将 apiserver.demo 替换成前面获得 `/etc/kubernetes/admin.conf` 文件中 `clusters/cluster/server` 中 URL 里 host 对应的部分

**验证安装结果**

执行命令

```sh
kubectl get nodes
kubectl get pods -n kube-system
```


</b-tab>
<b-tab title="Windows">

**执行命令**

用记事本（或其他文本编辑器）创建文件 `~/.kube/config`，其中 `~` 代表当前的用户目录

将前面获得的 `/etc/kubernetes/admin.conf` 文件的内容粘贴进该文件并保存

**配置 hosts**

用记事本打开 C:\windows\System32\drivers\etc\hosts 文件（需要管理员权限），在该文件末尾添加一行记录：

```
x.x.x.x    apiserver.demo
```

> * 将 x.x.x.x 替换成 demo-master-a-1 的实际 IP 地址
> * 将 apiserver.demo 替换成前面获得 `/etc/kubernetes/admin.conf` 文件中 `clusters/cluster/server` 中 URL 里 host 对应的部分

**验证安装结果**

执行命令

```sh
kubectl get nodes
kubectl get pods -n kube-system
```

</b-tab>
<b-tab title="MAC">

**执行命令**

```sh
vi ~/.kube/config
```

将前面获得的 `/etc/kubernetes/admin.conf` 文件的内容粘贴进该文件并保存

**配置 hosts**

```sh
echo "x.x.x.x    apiserver.demo" >> /etc/hosts
```

> * 将 x.x.x.x 替换成 demo-master-a-1 的实际 IP 地址
> * 将 apiserver.demo 替换成前面获得 `/etc/kubernetes/admin.conf` 文件中 `clusters/cluster/server` 中 URL 里 host 对应的部分

**验证安装结果**

执行命令

```sh
kubectl get nodes
kubectl get pods -n kube-system
```

</b-tab>
</b-tabs>
</b-card>


## kubectl 参考文档推荐

[https://kubernetes.io/docs/reference/kubectl/overview/](https://kubernetes.io/docs/reference/kubectl/overview/)
