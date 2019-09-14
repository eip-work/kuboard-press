## v1.0.3-beta.2

**发布日期**

**新特性**


**BUG 修复**

* 导入应用程序时，NodePort 的值丢失
* 导出应用程序时，环境变量-容器组信息丢失


* 存储卷声明去掉分配模式的字段
* 存储卷声明增加 Volume Modes 字段
* 存储卷声明将 读写模式 修改为 Access Modes
* 删除容器组时 - graceful period
* Pod Conditions: lastProbeTime/reason/message
* Pod restartPolicy
* 初始化容器不支持就绪检查
* Service 配置里，一部分 端口用 NodePort， 一部分端口用 ClusterIP
* 互联网访问入口，增加文档的链接
