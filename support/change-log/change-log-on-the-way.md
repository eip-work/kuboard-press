Kuboard v1.0.x 的更新说明


v1.0.7 已经支持了 kubectl proxy 的功能、v1.0.8 做 Deployment 的滚动更新、v1.0.9 做 kubectl port-forward v1.0.10 做 kubectl cp、v1.0.11 做 Job 和 CronJob。
这几样做完以后，就 v1.1.0


**优化**
* 事件通知
  * 可以关闭事件通知；
  * 设置菜单中可以重新开启事件通知；
* 切换名称空间
  * 部分情况下，切换名称空间时，应该直接进入名称空间首页；
  * 高亮当前所在的名称空间；
* 日志/终端界面
  * 可以调整字体大小；

**BUG修正**
* 部分情况下，切换名称空间时，内容未刷新；


调整控制台字体大小
删除 NFS StorageClass 出错

BUG:

arm 环境下，应该使用镜像： https://hub.docker.com/r/vbouchaud/nfs-client-provisioner/tags



删除 PV 时，出现 /notsupported 错误

---

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
