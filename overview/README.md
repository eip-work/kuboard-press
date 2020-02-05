---
lessAds: false
vssueId: 8
description: Kuboard是一款免费的Kubernetes管理界面_同时该网站还提供Kubernetes安装文档_在线答疑_K8S_部署_入门_免费中文Kubernetes教程_以及在Kubernetes上部署SpringCloud的详细文档
meta:
  - name: keywords
    content: Kubernetes管理界面,K8S管理界面,Kubernetes Dashboard
---

# Kuboard简介

<div style="background-color: #0063dc;">
<div style="max-width: 363px; margin: auto;">
  <img src="/images/logo-main.png" style="background-color: #0063dc; max-width: 100%; vertical-align: bottom;" alt="Kubernetes管理界面：Kuboard Logo"/>
</div>
</div>

Kubernetes 容器编排已越来越被大家关注，然而使用 Kubernetes 的门槛却依然很高，主要体现在这几个方面：

* 集群的安装复杂，出错概率大

* Kubernetes相较于容器化，引入了许多新的概念，学习难度高

* 需要手工编写 YAML 文件，难以在多环境下管理

* 缺少好的实战案例可以参考

Kuboard，是一款免费的 Kubernetes 图形化管理工具，Kuboard 力图帮助用户快速在 Kubernetes 上落地微服务。为了达到此目标，Kuboard 提供了针对上述问题的解决办法：

<div style="border: 1px solid #eaecef;
    background-color: #F9F9F9;
    padding: 0 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;">
<div style="flex-grow: 1; flex-basis: 20%; min-width: 200px; cursor: pointer; padding: 1rem 0.5rem;" @click="$router.push({path: '/install/install-k8s.html'})">
<b-card shadow="hover" style="height: 225px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  Kubernetes安装文档
  </h2>
  <li style="color: #4e6e8e;">
  快速安装Kubernetes
  </li>
  <li style="color: #4e6e8e;">
  每天有超过200个用户参考此文档完成Kubernetes安装
  </li>
  <li style="color: #4e6e8e;">
  碰到问题可QQ在线答疑
  </li>
  </b-card>
</div>

<div style="flex-grow: 1; flex-basis: 20%; min-width: 200px; cursor: pointer; padding: 1rem 0.5rem;" @click="$router.push({path: '/learning/'})">
<b-card shadow="hover" style="height: 225px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  Kubernetes免费教程
  </h2>
  <li style="color: #4e6e8e;">
  免费但绝不降低品质
  </li>
  <li style="color: #4e6e8e;">
  活跃的QQ社群，与网友共同学习进步
  </li>
</b-card>
</div>

<div style="flex-grow: 1; flex-basis: 20%; min-width: 200px; cursor: pointer; padding: 1rem 0.5rem;" @click="$router.push({path: '/install/install-dashboard.html'})">
<b-card shadow="hover" style="height: 225px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  Kubernetes管理界面
  </h2>
  <li style="color: #4e6e8e;">
  无需编写YAML即可在Kubernetes上完成应用程序的部署和管理
  </li>
  <li style="color: #4e6e8e;">
  免费
  </li>
</b-card>
</div>

<div style="flex-grow: 1; flex-basis: 20%; min-width: 200px; cursor: pointer; padding: 1rem 0.5rem;" @click="$router.push({path: '/learning/k8s-practice/ocp/'})">
<b-card shadow="hover" style="height: 225px;">
  <h2 style="font-size: 1.1rem; font-weight: 500; border-bottom: none; padding-bottom: 0; color: #3a5169;">
  Kubernetes + SpringCloud实战
  </h2>
  <li style="color: #4e6e8e;">
  参考文档，一步一步完成Spring Cloud微服务架构在Kubernetes上的部署和管理
  </li>
</b-card>
</div>

</div>


## Kuboard在线体验

<grid :rwd="{compact: 'stack'}" style="margin-top: 1rem;">
    <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}" >
      <b-card style="height: 100%; color: #2c3e50; line-height: 1.7;" shadow="hover">
        <p>
          <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
          Kuboard 在线体验
          </a>
        </p>
        <p>
        为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>
        </p>
      </b-card>
  </grid-item>
  <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}">
    <b-card style="height: 100%" shadow="hover">
      <a  target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
        <p style="max-width: 100%;">
        <FancyImage src="/images/preview.gif" alt="Kubernetes教程_Kuboard在线体验" title="Kuboard" description="快速在 Kubernetes 上落地微服务"></FancyImage>
        </p>
      </a>
    </b-card>
  </grid-item>
</grid>


## Kubernetes + Devops

正在编写文档，[准备好后，请通知我](https://www.wjx.top/jq/43453748.aspx)

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
