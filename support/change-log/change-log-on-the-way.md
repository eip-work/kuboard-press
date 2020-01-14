Kuboard v1.0.x 的更新说明

## v1.0.6-beta.5

**新特性**
* ServiceAccount详情页 --> 使用 ServiceAccount 的 Token 访问 kubectl

**优化**
* ServiceAccount列表页 --> 按名称、标签搜索
* ServiceAccount详情页 --> 删除ServiceAccount时，同时删除关联的 RoleBinding/ClusterRoleBinding

**Bug修复**
* Secret对话框 --> 创建Secret时，不显示内容区
* 名称空间页 --> StatefulSet如果没有 annotations 时，不能在名称空间页上显示
  * 此问题的具体表现：部分使用 helm 创建的工作负载不能在Kuboard上显示，原因是Deployment、StatefulSet或DaemonSet中没有 annotations 信息

------------------

* 安装文档中，去除 IngressController 的链接

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
* 按名称空间查看 Events
* 显示 Deployment/StatefulSet/DaemonSet 的事件
* 控制台/日志界面，按 名称空间/工作负载/Pod/容器 进行切换
* hostPort
* StatefulSet 在 available 数与 replicas 数不一致时，链接到帮助提示
