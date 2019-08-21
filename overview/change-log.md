# 更新日志

## v1.0.2-beta.1

**BUG 修复**

* Pod 中存在多个 Container 时，不能正常进入 日志界面和终端界面

## v1.0.1

**发布日期**

2019-08-20

**BUG 修复**

* 修复自定义 Kubernetes DNS Domain 时，无法使用监控套件的问题

## v1.0.1-beta.3

**发布日期**

2019-08-18

**新特性**

* 执行变更前预览 YAML 
 
**优化**

* ConfigMap 详情页中使用带行号的代码编辑器
* 工作复杂编辑器 - 显示 Kubernetes Object 名称

**BUG 修复**

* chrome 32位浏览器下，工作负载编辑器对服务名称的校验不正常
* 卸载局部监控套件时，显示的标题和提示信息仍然是卸载全局监控套件
* 编辑工作负载时，如果使用了 NFS 数据卷，不能保存的问题

## v1.0.1-beta.2

**发布日期**

2019-08-16

**新特性**

* 工作负载编辑器 - 节点选择，可按 nodeName 或 nodeSelector 指定容器组分配的节点
 
**优化**

* 节点详情页，编辑节点标签
* 如果与工作服务载相关的最新事件不是 Warning 或者 BackOff，则不在工作负载图标上提示错误信息
* 工作负载查看页 - 增加访问提示

**BUG 修复**

* 节点详情页，修复加载进度条显示
* 资源删除对话框，对要删除的资源名称先 trim，再比较是否正确

## v1.0.1-beta.1

**发布日期**

2019-08-15

**新特性**

* 工作负载编辑器 - 数据卷，增加 hostPath 类型

**优化**

* 工作负载编辑器 - 服务分层，点击时跳转到微服务参考架构页面
* 工作负载编辑器 - 资源限制，增加格式提示
* 工作负载编辑器 - 容器，可以自定义抓取策略 imagePullPolicy
* NFS 类型的 StorageClass 增加 mountOptions 选项

**BUG 修复**

* 工作负载查看页面 - 接收到容器组变化事件后，容器组详情未触发更新

## v1.0.0

**发布日期**

2019-08-11

**发布说明**

Kuboard 在实际项目中经过多次历练，功能不断完善，成长为一个基于 Kubernetes 的成熟的[微服务管理工具](/articles/201908/kuboard-view-of-k8s.md)。自 www.kuboard.cn 推出以来，得到了众多网友非常多的反馈，在大家的帮助下，修正了许多不同环境下的兼容性问题。今天终于结束了 beta 阶段，发布 **v1.0.0 正式版本**。该版本将是一个<font color="red">**长期支持版本**</font>，碰到问题，可以通过 Kuboard 社群得到支持，如需要获得商业支持请通过微信联系作者。

![作者微信](./change-log.assets/wechat.jpeg)

**优化**

* 可以通过查询参数中的 k8sToken 字段直接登录系统，无需在登录界面输入 Token
  * 例如，如果想要无登录直接访问容器组的控制台，可使用如下格式的 url 进入：
    `http://yourip:yourport/#/console/pzy/yourPod?containerName=yourContainer&k8sToken=yourToken`
* 登录界面显示帮助链接
* 登录界面增加记住登录状态选项
* 日志/终端界面增加返回名称空间按钮

## v1.0.0-beta.14

**发布日期**

2019-08-03

**优化**

* 创建 namespace/configmap/secrets/pvc/deployment/Service/Ingress 等 K8S 对象时，对表单中的名字等字段做 trim() 操作
* 修改日志、终端连接错误时的提示信息


## v1.0.0-beta.13

**发布日期**

2019-07-28

**优化**

* 调整主题色
* 查看 Kuboard 版本信息
* 一次删除 Deployment 下所有的错误事件 ([# 1](https://github.com/shaohq/kuboard-issues/issues/1))

**BUG 修复**

* Kubernetes 二进制安装时， Kuboard 无法启动
* Kubernetes 中缺少 kube-dns Service 时， Kuboard 无法启动
