Kuboard v1.0.x 的更新说明

## v1.0.3-beta.4

**发布日期**

2019年9月16日

**新特性**


**优化**


**BUG 修复**
* v1.0.3-beta.2 引入的BUG：导入工作负载时，存储卷声明未创建
* 导入应用程序时，存储卷声明如果不填写，仍然可以下一步


* terminationGracePeriodSeconds
* Firefox 浏览器，从名称空间 后退到集群概览，布局出错
* 创建工作负载时，不追加前缀

* 存储卷声明去掉分配模式的字段
* 删除容器组时 - graceful period
* Pod Conditions: lastProbeTime/reason/message
* 按名称空间查看 Events
* 显示 Deployment/StatefulSet/DaemonSet 的事件
* 控制台/日志界面，按 名称空间/工作负载/Pod/容器 进行切换
