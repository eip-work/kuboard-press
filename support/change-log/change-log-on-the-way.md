Kuboard v1.0.x 的更新说明


## v1.0.4-beta.3

**发布日期**

2019年10月13日

**新特性**

**优化**

* 工作负载的名称前缀为可选添加
* 存储类列表为空时，提示当前没有存储类
* 集群中事件过多时，名称空间页面渲染时间过长

**BUG 修复**



* 工作负载编辑器 --> 容器组 --> 容忍 -- 正在开发
* kubernetes 1.16.1
* HostAliases

* 容器组列表，筛选结果为空时，提示筛选 “其他”

* https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

* https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/  专题：ETCD 集群是如何setup起来的

* Service --> SessionAffinity
              --> clientIP.timeoutSeconds
* Service --> .spec.clusterIP

* PV 中支持 hostPath

* 创建工作负载时，不追加前缀
* 存储卷声明去掉分配模式的字段
* 删除容器组时 - graceful period
* Pod Conditions: lastProbeTime/reason/message
* 按名称空间查看 Events
* 显示 Deployment/StatefulSet/DaemonSet 的事件
* 控制台/日志界面，按 名称空间/工作负载/Pod/容器 进行切换
* hostPort
* StatefulSet 在 available 数与 replicas 数不一致时，链接到帮助提示
