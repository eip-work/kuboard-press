# 更新日志

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

