## Kuboard 简介

A cool Kubernetes dashboard.

Kuboard 可以有效降低 Kubernetes 初学者的学习门槛，对于有经验的用户，也是非常顺手的一款运维工具。

Kuboard 的主要特点：
* 场景化设计
* 微服务分层显示
* 微服务上下文监控

![image-20190716234146419](./README.assets/image-20190716234146419.png)




## 在线体验

<p>
<a target="_blank" :href="`http://demo.eip.work/#/login?isReadOnly=true&token=${$site.themeConfig.kuboardToken}`">
  Kuboard 在线体验
</a>
</p>
为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>

<p>
  <a target="_blank" :href="`http://demo.eip.work/#/login?isReadOnly=true&token=${$site.themeConfig.kuboardToken}`">
    <img src="./README.assets/image-20190728145108904.png"></img>
  </a>
</p>


## 开始使用



### Kubernetes 初学者

单纯地按章节学习 Linux 基础知识、网络知识、容器技术等，每一块儿的基础入门书籍就有几百页之多。

最好的学习方法是在 **实践中学习**，碰到问题时去寻求答案，**解决问题** 之后 **总结反思**。这种学习方法趣味性强，得来的知识也最为牢靠，所学知识通常也是工作中实用性最高的。

<span style="color: red; font-weight: 500;">读 100 页 K8S 文档，不如把 K8S 安装一遍</span>

Kuboard 为 Kubernetes 初学者设计了如下学习路径：

* **Kubernetes 入门**
  * [安装 Kubernetes 单Master节点](/install/install-k8s) （1小时，初学者也许需要更多）
  * [安装 Kuboard](/install/install-dashboard) （5分钟）
  * 使用 Kuboard [创建 busybox](/guide/example/busybox) （10分钟）
  * [导入 example 微服务应用](/guide/example/import) （15分钟）

* **Kubernetes 进阶** （筹备中）
  * 深入理解 Kubernetes 核心概念
  * 集成 DevOps
  * 安装高可用 Kubernetes 集群

### Kubernetes 有经验者

作为资深的 Kubernetes 用户，您一定有如下痛苦：

* **Yaml 复杂繁多**
  * Yaml 文件冗长、繁多
  * 编写和维护 YAML 文件耗费了大量的时间
* **多环境**
  * 准备了开发环境，又要维护测试环境、准上线环境、生产环境
* **kubectl 命令复杂难记**
  * 反复执行 kubectl 命令，与集群的交互界面始终处于片段化的信息中，需要连续好几个命令才能诊断问题

Kuboard 为您的这些痛苦提供了极佳的解决方案，请立刻开始：

* [安装 Kuboard](/install/install-dashboard) （5分钟）
* 使用 Kuboard [创建 busybox](/guide/example/busybox) （10分钟）
* [导入 example 微服务应用](/guide/example/import)  （15分钟）
* [在微服务上下文中监控 example](/guide/example/monitor) （15分钟）

### Kubernetes + Spring Cloud

使用 Kuboard 在 Kubernetes 上部署 Spring Cloud 微服务：（正在编写文档，[准备好后，请通知我](https://www.wjx.top/jq/43409534.aspx)）

* [概述](/micro-service/spring-cloud/)
* [部署服务注册中心](/micro-service/spring-cloud/cloud-eureka)
* [部署数据库（用于测试）]
* [部署微服务]
* [部署服务网关]
* [部署Web前端]
* [导出配置]

### Kubernetes + Devops

正在编写文档，[准备好后，请通知我](https://www.wjx.top/jq/43453748.aspx)

## 在线提问

![Kuboard 兴趣群二维码](./README.assets/kuboard_qq.png)