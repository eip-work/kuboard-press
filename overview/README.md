---
description: 介绍 Kuboard - Kubernetes 微服务管理界面，并为 Kubernetes 初学者提供快速的学习路线（含 Kubernetes v1.15.2 安装文档）
---

## Kuboard 简介

A cool Kubernetes dashboard.

基于 Kubernetes 的微服务管理平台

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
  <img src="./README.assets/1564841972085.gif" style="border: 1px solid #d7dae2;"></img>
</a>

## 开始使用

### Kubernetes 初学者

单纯地按章节学习 Linux 基础知识、网络知识、容器技术等，每一块儿的基础入门书籍就有几百页之多。

最好的学习方法是在 **实践中学习**，碰到问题时去寻求答案，**解决问题** 之后 **总结反思**。这种学习方法趣味性强，得来的知识也最为牢靠，所学知识通常也是工作中实用性最高的。

<span style="color: red; font-weight: 500;">读 100 页 Kubernetes 文档，不如把 Kubernetes 安装一遍</span>

Kuboard 为 Kubernetes 初学者设计了如下学习路径：

* **Kubernetes 体验**
  * [安装 Kubernetes 单Master节点](/install/install-k8s.html) （30分钟，初学者也许需要更多）
    * 参照经过众多网友验证，不断优化的安装文档，迅速完成 Kubernetes 安装，拥有属于自己的 Kubernetes 集群。
  * [安装 Kuboard](/install/install-dashboard.html) （5分钟）
    * 使用 Kuboard，无需编写复杂冗长的 YAML 文件，就可以轻松管理 Kubernetes 集群。
  * [创建 busybox](/guide/example/busybox.html) （10分钟）
    * 快速在 Kubernetes 集群中安装一个部署，并与当中的容器组交互。
  * [导入 example 微服务应用](/guide/example/import.html) （15分钟）
    * 导入一个完整的 example 微服务应用，体验 Spring Cloud 在 Kubernetes 上的部署过程。

* **Kubernetes 入门**
  * [0. 学习Kubernetes基础知识](/learning/k8s-basics/kubernetes-basics.html) (10分钟)
    * [1. 部署第一个应用程序](/learning/k8s-basics/deploy-app.html) (5分钟)
    * [2. 查看 Pods / Nodes](/learning/k8s-basics/explore.html) (10分钟)
    * [3. 公布应用程序](/learning/k8s-basics/expose.html) (10分钟)
    * [4. 伸缩应用程序](/learning/k8s-basics/scale.html) (10分钟)
    * [5. 执行滚动更新](/learning/k8s-basics/update.html) (10分钟)
  * [6. 复习Kubernetes核心概念](/learning/k8s-basics/k8s-core-concepts.html) (10分钟)

* **Kubernetes 进阶**
  * [通过互联网访问您的应用](/learning/k8s-intermediate/ingress.html)
  * [使用 ConfigMap 配置您的应用程序](/learning/k8s-intermediate/config-map.html)
  * [使用私有 Registry 中的 docker 镜像](/learning/k8s-intermediate/private-registry.md)
  * 持久化数据
    * [数据卷](/learning/k8s-intermediate/persistent/volume.html)
  * 进阶路线一
    * 在实际项目中锻炼，完成各种与微服务、容器化、Kubernetes更多高级功能的学习、理解和应用
    * **适合人群：** 身边有人带路，并且技术功底比较强的人，能够自行翻阅大量 docker / kubernetes 的官网英文资料。这些人在完成上面的 Kubernetes 入门教程之后，基本上可以在项目中开始实战了。
  * 进阶路线二
    * 购买一套口碑比较好的视频课程，例如 <span v-on:click="openRecommendation" style="cursor: pointer;"><a>深入剖析Kubernetes</a></span> ，由 Kubernetes 社区资深成员与项目维护者 张磊 创作，价钱也仅相当于两杯咖啡的样子。
    * **适合人群：** 技术功底相对薄弱，想要多学习一些理论，在理解 docker / kubernetes 等官网英文资料存在一定困难的人群

<script>
export default {
  methods: {
    openRecommendation () {
      window.open('https://time.geekbang.org/column/intro/100015201?code=MH1Wu456g0ZsrKtQI7QidivKV2hVvzerAUxDz5pOuQs%3D', '_blank');
      console.log('尝试发送 ga event')
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'Recommend',
          eventAction: 'click',
          eventLabel: '深入剖析Kubernetes'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    }
  }
}
</script>

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

### Kubernetes + Spring Cloud

在 Kubernetes 上部署 Spring Cloud 微服务：

* [概述](/micro-service/spring-cloud/index.html)
* [部署服务注册中心]
* [部署数据库]
* [部署微服务]
* [部署服务网关]
* [部署Web前端]
* [复制一套部署环境]

### Kubernetes + Devops

正在编写文档，[准备好后，请通知我](https://www.wjx.top/jq/43453748.aspx)

## 在线提问

![Kuboard 兴趣群二维码](./README.assets/kuboard_qq.png)
