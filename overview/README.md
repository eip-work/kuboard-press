---
vssueId: 8
description: Kubernetes教程_介绍Kuboard_Kubernetes微服务管理界面_并为Kubernetes初学者提供快速的学习路线_含Kubernetes最新版国内安装文档）
---

## Kuboard简介

<p style="max-width: 420px;">
  <img src="/images/logo-main.png" style="background-color: #0063dc; max-width: 100%;" alt="Kubernetes教程：Kuboard Logo"/>
</p>

<div style="border-top: 1px solid #eaecef;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;">
<div style="flex-grow: 1; flex-basis: 25%; min-width: 200px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  快速落地 Kubernetes
  </h2>
  <li style="color: #4e6e8e;">
  快速安装
  </li>
  <li style="color: #4e6e8e;">
  图形化界面
  </li>
  <li style="color: #4e6e8e;">
  场景化设计
  </li>
</div>

<div style="flex-grow: 1; flex-basis: 25%; min-width: 200px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  微服务架构
  </h2>
  <li style="color: #4e6e8e;">
  经典微服务参考架构
  </li>
  <li style="color: #4e6e8e;">
  Spring Cloud 实战案例
  </li>
</div>

<div style="flex-grow: 1; flex-basis: 25%; min-width: 200px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  多层次监控
  </h2>
  <li style="color: #4e6e8e;">
  资源层监控
  </li>
  <li style="color: #4e6e8e;">
  中间件层监控
  </li>
  <li style="color: #4e6e8e;">
  链路层监控
  </li>
</div>

<div style="flex-grow: 1; flex-basis: 25%; min-width: 180px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  适用范围
  </h2>
  <li style="color: #4e6e8e;">
  物理机/虚拟机
  </li>
  <li style="color: #4e6e8e;">
  私有云
  </li>
  <li style="color: #4e6e8e;">
  阿里云、腾讯云、亚马逊云 ...
  </li>
</div>

</div>

## 在线体验

<p>
<a target="_blank" :href="`http://demo.kuboard.cn/#/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
  Kuboard 在线体验
</a>
</p>

<p>
为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>
</p>

<a target="_blank" :href="`http://demo.kuboard.cn/#/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
  <img src="./README.assets/1564841972085.gif" style="border: 1px solid #d7dae2;" alt="Kubernetes教程：Kuboard 在线Demo"></img>
</a>

## 开始使用

### Kubernetes 初学者

单纯地按章节学习 Linux 基础知识、网络知识、容器技术等，每一块儿的基础入门书籍就有几百页之多。

最好的学习方法是在 **实践中学习**，碰到问题时去寻求答案，**解决问题** 之后 **总结反思**。这种学习方法趣味性强，得来的知识也最为牢靠，所学知识通常也是工作中实用性最高的。

<span style="color: red; font-weight: 500;">读 100 页 Kubernetes 文档，不如把 Kubernetes 安装一遍</span>

Kuboard 为 Kubernetes 初学者设计了如下学习路径：

**Kubernetes 体验**
  * [安装 Kubernetes 单Master节点](/install/install-k8s.html) （30分钟，初学者也许需要更多）
    * 参照经过众多网友验证，不断优化的安装文档，迅速完成 Kubernetes 安装，拥有属于自己的 Kubernetes 集群。
  * [安装微服务管理界面](/install/install-dashboard.html) （5分钟）
    * 使用 Kuboard，无需编写复杂冗长的 YAML 文件，就可以轻松管理 Kubernetes 集群。
  * [创建 busybox](/guide/example/busybox.html) （10分钟）
    * 快速在 Kubernetes 集群中安装一个部署，并与当中的容器组交互。
  * [导入 example 微服务应用](/guide/example/import.html) （15分钟）
    * 导入一个完整的 example 微服务应用，体验 Spring Cloud 在 Kubernetes 上的部署过程。

**Kubernetes 入门**
  * [0. 学习Kubernetes基础知识](/learning/k8s-basics/kubernetes-basics.html) (10分钟)
    * [1. 部署第一个应用程序](/learning/k8s-basics/deploy-app.html) (5分钟)
    * [2. 查看 Pods / Nodes](/learning/k8s-basics/explore.html) (10分钟)
    * [3. 公布应用程序](/learning/k8s-basics/expose.html) (10分钟)
    * [4. 伸缩应用程序](/learning/k8s-basics/scale.html) (10分钟)
    * [5. 执行滚动更新](/learning/k8s-basics/update.html) (10分钟)
  * [6. 复习Kubernetes核心概念](/learning/k8s-basics/k8s-core-concepts.html) (10分钟)

**Kubernetes 进阶**
  * [使用私有 registry 中的 docker 镜像](/learning/k8s-intermediate/private-registry.html)
  * 工作负载
    * [容器组 - 概述](/learning/k8s-intermediate/workload/pod.html)
    * [容器组 - 生命周期](/learning/k8s-intermediate/workload/pod-lifecycle.html)
    * [容器组 - 初始化容器](/learning/k8s-intermediate/workload/init-container.html)
    * [控制器 - 概述](/learning/k8s-intermediate/workload/workload.html)
    * [控制器 - Deployment](/learning/k8s-intermediate/workload/wl-deployment/)
    * [控制器 - StatefulSet](/learning/k8s-intermediate/workload/wl-statefulset/)
    * [控制器 - DaemonSet](/learning/k8s-intermediate/workload/wl-daemonset/)
    * [控制器 - Job](/learning/k8s-intermediate/workload/wl-job/) <Badge text="正在撰写" type="warn"/>
    * [控制器 - CronJob](/learning/k8s-intermediate/workload/wl-cronjob/) <Badge text="正在撰写" type="warn"/>
  * 服务发现、负载均衡、网络
    * [Service 概述](/learning/k8s-intermediate/service/service.html)
    * [Service 详细描述](/learning/k8s-intermediate/service/service-details.html)
    * [Service/Pod 的 DNS](/learning/k8s-intermediate/service/dns.html)
    * [Service 连接应用程序](/learning/k8s-intermediate/service/connecting.html)
    * [Ingress 通过互联网访问您的应用](/learning/k8s-intermediate/service/ingress.html)
    * [如何选择网络插件](/learning/k8s-intermediate/service/cni.html)
  * 存储
    * [数据卷 Volume](/learning/k8s-intermediate/persistent/volume.html)
    * [存储卷 PV 和存储卷声明 PVC](/learning/k8s-intermediate/persistent/pv.html)
    * [存储类 StorageClass](/learning/k8s-intermediate/persistent/storage-class.html)
    * [自建 NFS 服务](/learning/k8s-intermediate/persistent/nfs.html) <Badge text="正在撰写" type="warn"/>
  * 配置
    * [使用 ConfigMap 配置您的应用程序](/learning/k8s-intermediate/config/config-map.html)
    * [管理容器的计算资源](/learning/k8s-intermediate/config/computing-resource.html)
    * [将容器调度到指定的节点](/learning/k8s-intermediate/config/assign-pod-node.html)
    * [污点和容忍 taints and toleration](/learning/k8s-intermediate/config/taints-toleration/)
    * [Secrets](/learning/k8s-intermediate/config/secrets/)

**Kubernetes 高级**

  * Kubernetes 日志可视化
  * Kubernetes 监控
  * Kubernetes 联邦

**Kubernetes 实战**

[从微服务视角理解 Kubernetes](/learning/k8s-practice/micro-service/kuboard-view-of-k8s.html)

在 Kubernetes 上部署 Spring Cloud 微服务：

* [概述](/learning/k8s-practice/spring-cloud/)
* [部署服务注册中心]
* [部署数据库]
* [部署微服务]
* [部署服务网关]
* [部署Web前端]
* [管理多环境]

在 Kubernetes 上部署 Spring Cloud 微服务：(Open Capacity Platform)

* [OCP介绍](/learning/k8s-practice/ocp/)
* [准备OCP的构建环境和部署环境](/learning/k8s-practice/ocp/prepare.html)
* [构建docker镜像并推送到仓库](/learning/k8s-practice/ocp/build.html)
* [部署顺序](/learning/k8s-practice/ocp/sequence.html)
* [在K8S上部署eureka-server](/learning/k8s-practice/ocp/eureka-server.html)
* [在K8S上部署auth-server]
* [在K8S上部署user-center]
* [在K8S上部署api-gateway]
* [在K8S上部署back-center]
* [重新审视配置信息]
* [导出部署配置]
* [在新的名称空间导入部署配置]

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

* [安装 Kuboard](/install/install-dashboard.html) （5分钟）
* 使用 Kuboard [创建 busybox](/guide/example/busybox.html) （10分钟）
* [导入 example 微服务应用](/guide/example/import.html)  （15分钟）
* [在微服务上下文中监控 example](/guide/example/monitor.html) （15分钟）

### Kubernetes + Devops

正在编写文档，[准备好后，请通知我](https://www.wjx.top/jq/43453748.aspx)

## 在线答疑

  <p>
    <Qq/>
  </p>
  <p>
    <img src="/images/kuboard_qq.png" alt="Kubernetes教程：QQ群在线答疑"/>
  </p>
<!-- <div>
  <div style="margin-top: 10px;">未打赏用户可进 QQ 群聊，<span style="color: red;">打赏用户可进微信群聊</span>。</div>
  <div style="margin-top: 10px;">
      <span>扫第一个二维码完成打赏，扫第二个进微信群聊。</span> <span style="color: #CCC">QQ 群聊二维码在左侧导航栏下方。</span>
    <p style="margin-top: 10px;">
      <img src="/dz.png" style="width: 200px; margin-right: 150px;"></img>
      <img src="/dz2.jpeg" style="width: 200px;"></img>
    </p>
  </div>
</div> -->
