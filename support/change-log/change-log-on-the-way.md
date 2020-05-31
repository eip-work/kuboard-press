Kuboard v1.0.x 的更新说明


kubectl port-forward
kubectl cp
Job / CronJob


BUG:

arm 环境下，应该使用镜像： https://hub.docker.com/r/vbouchaud/nfs-client-provisioner/tags


Calico 指定网卡的方式：
            - name: IP_AUTODETECTION_METHOD
              value: "interface=em1"


补充文档，描述如何授权一个 ServiceAccount 访问多个名称空间


Deployment 页面，可能存在请求线程过多导致页面部分内容显示为加载状态的情况；


安装 kube-prometheus 后，与 kuboard 安装的 metrics-server 有冲突：

按照 https://github.com/coreos/kube-prometheus  clone 下来后执行：
kubectl create -f manifests/setup
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
kubectl create -f manifests/

**优化**
* 提示用户怎么填写 Command 命令
* 通过 YAML 文件创建对象时，如果名称空间和当前不一致，应该给出提示
* 将 secret 绑定到环境变量
* 默认 StorageClass
* 图形化实例 Service 的 NodePort/Port/targetPort

**BUG修正**
* Kubernetes 版本过低时，Ingress列表页加载失败
* 部分情况下，终端界面打不开时，未弹出错误提示对话框



删除 PV 时，出现 /notsupported 错误



Start by reading through this tutorial on windows services:

https://github.com/iswix-llc/iswix-tutorials

Now read this article to understand how any old script/EXE can be made a service using srvany.exe:

https://support.microsoft.com/en-us/help/137890/how-to-create-a-user-defined-service

Take a look at my answer to see how it all comes together:

Wix installer to replace INSTSRV and SRVANY for user defined service installation

If that still isn't enough, send me an email and I'll give you a complimentary 30-60 minute session to show you.

---

* 修改套件的信息之后，需要重新 apply

* 工作负载编辑器
  * 保存前对比 YAML

* 文档
  * 应用程序如何获取客户端的真实 IP

------------------

**新特性**

* 增加 Grafana，并与 Kuboard 实现单点登录
  * ServiceAccount 可以与 Grafana 单点登录
  * OpenID Connect 账号可以与 Grafana 单点登录
  * TeamSync （是否要实现？）
* 




BUG

* 导入 yaml，Safari 浏览器不能选择 yaml 文件
* 显示相对时间时，kubectl 使用服务器时间计算相对时间，Kuboard 则使用客户端的机器时间计算相对时间
* etcd 安装和备份文档
* kubeadm 安装之后的目录结构

------------------
* 修改 metadata.labels kuboard v1.0.7
* 支持 Headless Service
* 在服务器端配置 openid connect 的 client_secret 以增强安全性

* 日志界面支持 ctrl + F
* 更新版本时，可以通过下拉列表选择仓库中的版本号
* 导入导出时，需要支持 nfs 等类型的数据卷

* 工作负载查看 --> 未显示 SecurityContext
* EndPoint
* 导入工作负载时，如果存储类没有 annotations，不应该报错
* 表单校验：数据卷名不能带小数点
* Prometheus 监控
* Limit Range

* https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/

* 容器组列表，筛选结果为空时，提示筛选 “其他”

* https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

* https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/  专题：ETCD 集群是如何setup起来的

* Service --> SessionAffinity
              --> clientIP.timeoutSeconds
* Service --> .spec.clusterIP


* 存储卷声明去掉分配模式的字段
* 删除容器组时 - graceful period
* Pod Conditions: lastProbeTime/reason/message
* 显示 Deployment/StatefulSet/DaemonSet 的事件
* 控制台/日志界面，按 名称空间/工作负载/Pod/容器 进行切换
* StatefulSet 在 available 数与 replicas 数不一致时，链接到帮助提示


# 用户认证相关

* Gitlab
  * GitLab 的 idtoken 中只包含 sub 字段（此处的含义为用户的ID），没有用户名和邮箱地址等信息，因此不能直接和 Kubernetes OpenID Connect 对接
    *  https://docs.gitlab.com/ee/integration/openid_connect_provider.html#shared-information
