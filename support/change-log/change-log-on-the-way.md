Kuboard v1.0.x 的更新说明

* 为什么CPU使用很低，却仍然提示无法调度？
* 节点详情页 --> 优化布局
* 节点详情页 --> 显示 total-request 和 total-limit
* 节点详情页 --> 显示 pod 的 request-limit

* 工作负载查看 --> 存储卷 --> config-volume类型的显示为JSON
  * 可在 example/monitor-prometheus 中复现
* 工作负载查看 --> 未显示 SecurityContext
* EndPoint
* 导入工作负载时，如果存储类没有 annotations，不应该报错
* 表单校验：数据卷名不能带小数点
* Prometheus 监控
* Limit Range


* https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/


* 容器组列表，筛选结果为空时，提示筛选 “其他”

* https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

* https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/  专题：ETCD 集群是如何setup起来的

* Service --> SessionAffinity
              --> clientIP.timeoutSeconds
* Service --> .spec.clusterIP

* PV 中支持 hostPath

* 存储卷声明去掉分配模式的字段
* 删除容器组时 - graceful period
* Pod Conditions: lastProbeTime/reason/message
* 按名称空间查看 Events
* 显示 Deployment/StatefulSet/DaemonSet 的事件
* 控制台/日志界面，按 名称空间/工作负载/Pod/容器 进行切换
* hostPort
* StatefulSet 在 available 数与 replicas 数不一致时，链接到帮助提示
