---
lessAds: true
vssueId: 71
layout: SpecialSupportPage
description: Kubernetes教程_本文描述了如何获得Kuboard授权
---

# Kuboard

<AdSenseTitle/>

## Kuboard 介绍

Kuboard 是 [北京仁聚汇通信息科技有限责任公司](http://www.eigpay.com/) 旗下的一款免费的 Kubernetes 管理工具，提供了丰富的功能，结合已有或新建的代码仓库、镜像仓库、CI/CD工具等，可以便捷的搭建一个生产可用的 Kubernetes 容器云平台，轻松管理和运行云原生应用。您也可以直接将 Kuboard 安装到现有的 Kubernetes 集群，通过 Kuboard 提供的 Kubernetes RBAC 管理界面，将 Kubernetes 提供的能力开放给您的开发/测试团队。Kuboard 提供的功能有：

<div class="kuboard-features">

| 功能与服务                                                   | 免费版             | 增强版             |
| ------------------------------------------------------------ | :------------------: | :------------------: |
| **Kubernetes 基本管理功能**                                  |                    |                    |
| <div class="tap"></div>节点管理                                                     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>名称空间管理                                                 | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>名称空间配额/限定管理                                          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>控制器管理（Deployment / StatefulSet / DaemonSet / CronJob / Job / ReplicaSet） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>工作负载编辑器（使用优化设计的表单编辑 Deployment / StatefulSet /DaemonSet） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Service / Ingress 管理                                       | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>ConfigMap / Secret 管理                                      | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>CustomerResourceDefinition 管理                              | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>自动伸缩（Horizontal Pod Autoscaler）管理                    | :white_check_mark: | :white_check_mark: |
| **Kubernetes 存储管理**                                      |                    |                    |
| <div class="tap"></div>通过 ceph-csi 对接 CephFS 存储类                             | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>通过 ceph-csi 对接 Rook 安装的 CephFS 存储类                 | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>通过 nfs-subdir-external-provisioner 对接 NFS 类型的存储类   | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>对接阿里云 K8S、腾讯云 K8S、亚马逊 K8S、Rancher 等 K8S 环境下的已有存储类 | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>存储卷管理（CephFS 类型的存储卷可支持快照、扩容）            | :white_check_mark: | :white_check_mark: |
| **Kubernetes 问题诊断**                                      |                    |                    |
| <div class="tap"></div>Top Nodes / Top Pods                                         | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>事件列表（整合到关联对象的上下文，例如，在 Pod 界面可直接查看该 Pod 的关联事件） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>容器日志界面                                                 | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>容器 Web 终端界面                                            | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>YAML 预览、编辑、对比（支持精简的 YAML 内容）                | :white_check_mark: | :white_check_mark: |
| **认证与授权**                                               |                    |                    |
| <div class="tap"></div>Kuboard 内建用户库                                           | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>GitHub/GitLab 单点登录                                       | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>LDAP 单点登录                                                | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kubernetes RBAC 授权                                         | :white_check_mark: | :white_check_mark: |
| **Kuboard 特色功能**                                         |                    |                    |
| <div class="tap"></div>Grafana + Prometheus 资源监控套件                            | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Grafana + Loki + Promtail 日志聚合套件                       | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>ElasticSearch + Filebeat + Kibana 日志聚合套件               | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>文件浏览器（可查看/编辑/上传/下载容器中的文件）              | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kuboard Proxy（kubectl proxy 的在线版本）                    | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>自定义名称空间布局（以分层的方式展示名称空间中的微服务）     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>导出工作负载 YAML 文件、导入 YAML 文件（可以快速将微服务部署到新的集群或名称空间） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>持续部署对接接口                                                | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>多集群管理（一个 Kuboard 实例可以管理不超过三个 K8S 集群）                         | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>多集群管理（一个 Kuboard 实例可以管理超过三个 K8S 集群）                       | :x: | :white_check_mark: |
| **服务与支持**                                               |                    |                    |
| <div class="tap"></div>微信/QQ 社群免费答疑                                         | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>付费用户专属答疑通道                                         | :x: | :white_check_mark: |
| <div class="tap"></div>远程协助解决问题                                             | :x: | :white_check_mark: |

</div>

<style>
.kuboard-features td{
  padding: 0.3em 1em;
  font-size: 0.9em;
}
.kuboard-features th{
  background-color: #f1f2f2;
}
.kuboard-features .tap {
  display: inline-block;
  width: 2em;
}
</style>


## Github Star

<div style="padding: 1rem 0 0 0;" data-aos="fade-up" data-aos-duration="1500">
<grid :rwd="{compact: 'stack'}">
<grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}">
<b-card style="height: calc(100% - 2rem); margin-top: 1rem;">
  <a href="https://starchart.cc/eip-work/kuboard-press" target="_blank">
    <img src="https://starchart.cc/eip-work/kuboard-press.svg" alt="Kubernetes教程_Kuboard_Github_Star" style="height: 320px;">
  </a>
      
<!-- [![Stargazers over time](https://starchart.cc/eip-work/kuboard-press.svg)](https://starchart.cc/eip-work/kuboard-press) -->


</b-card>
</grid-item>
  <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}">
    <b-card style="height: calc(100% - 2rem); color: #2c3e50; line-height: 1.7; margin-top: 1rem;">
        <li>
          Kuboard 于2019年8月初公开发布，当前：
          <li style="margin-left: 40px;">
            <StarCount></StarCount>
          </li>
          <li style="margin-left: 40px;">
            <StarCountDockerPulls></StarCountDockerPulls>
          </li>
        </li>
        <li>参考 kuboard.cn，通常一个月时间可以从 Kubernetes 入门到投产</li>
      </b-card>
  </grid-item>
</grid>
</div>

## 订阅

<KbIframe v-if="isDev" style="margin-top: 10px" src="http://kuboard-develop:10800/public/home" :commands="commands"></KbIframe>
<KbIframe v-else style="margin-top: 10px" src="https://uc-v3.kuboard.cn/public/home" :commands="commands"></KbIframe>

<script>
export default {
  data () {
    return {
      commands: {
        openUserCenter: this.openUserCenter,
      }
    }
  },
  computed: {
    isDev () {
      return process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    openUserCenter (params) {
      let url = 'https://uc-v3.kuboard.cn' + params.path
      if (this.isDev) {
        url = 'http://kuboard-develop:10800' + params.path
      }
      this.$openUrlInBlank(url)
    },
  }
}
</script>

## 已采纳用户

<!-- 只要您在此处留下公司名字，您就已经 **取得将 Kuboard 用于生产环境的授权** 

> 如果列表不能显示，请直接到这个链接留言 [Kuboard 授权列表](https://github.com/eip-work/kuboard-press/issues/71) -->
