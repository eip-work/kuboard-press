---
lessAds: true
vssueId: 71
layout: SpecialSupportPage
description: Kubernetes教程_本文描述了如何获得Kuboard授权
---

# Kuboard

<AdSenseTitle/>

<script>

export default {
  methods: {
    mailGroup () {
      // console.log('dee')
      // window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"2273cb19eb20bb1bc5b7745a7","lid":"f1f25d6dac","uniqueMethods":true}) })
    }
  }
}
</script>


## Kuboard 介绍

Kuboard 是一款免费的 Kubernetes 管理工具，提供了丰富的功能，结合已有或新建的代码仓库、镜像仓库、CI/CD工具等，可以便捷的搭建一个生产可用的 Kubernetes 容器云平台，轻松管理和运行云原生应用。您也可以直接将 Kuboard 安装到现有的 Kubernetes 集群，通过 Kuboard 提供的 Kubernetes RBAC 管理界面，将 Kubernetes 提供的能力开放给您的开发/测试团队。Kuboard 提供的功能有：

* Kubernetes 基本管理功能
  * 节点管理
  * 名称空间管理
  * 存储类/存储卷管理
  * 控制器（Deployment/StatefulSet/DaemonSet/CronJob/Job/ReplicaSet）管理
  * Service/Ingress 管理
  * ConfigMap/Secret 管理
  * CustomerResourceDefinition 管理
* Kubernetes 问题诊断
  * Top Nodes / Top Pods
  * 事件列表及通知
  * 容器日志及终端
  * KuboardProxy (kubectl proxy 的在线版本)
  * PortForward (kubectl port-forward 的快捷版本)
  * 复制文件 （kubectl cp 的在线版本）
* Kubernetes 存储管理
  * 通过 ceph-csi 对接 CephFS
  * 通过 ceph-csi 对接 Rook 安装的 CephFS
  * 通过 nfs-client-provisioner 对接 NFS 类型的存储
  * 对接其他类型的存储
* 认证与授权
  * Github/GitLab 单点登录
  * KeyCloak 认证
  * LDAP 认证
  * 完整的 RBAC 权限管理
* Kuboard 特色功能
  * Kuboard 官方套件
    * Grafana+Prometheus 资源监控
    * Grafana+Loki+Promtail 日志聚合
  * Kuboard 自定义名称空间布局
  * Kuboard 中英文语言包

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

<KbIframe v-if="isDev" style="margin-top: 10px" src="http://localhost:25679/public/home" :commands="commands"></KbIframe>
<KbIframe v-else style="margin-top: 10px" src="https://uc.kuboard.cn/public/home" :commands="commands"></KbIframe>

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
      let url = 'https://uc.kuboard.cn' + params.path
      if (this.isDev) {
        url = 'http://localhost:25679' + params.path
      }
      this.$openUrlInBlank(url)
    },
  }
}
</script>

## 已采纳用户

<!-- 只要您在此处留下公司名字，您就已经 **取得将 Kuboard 用于生产环境的授权** 

> 如果列表不能显示，请直接到这个链接留言 [Kuboard 授权列表](https://github.com/eip-work/kuboard-press/issues/71) -->
