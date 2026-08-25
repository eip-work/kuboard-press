---
lessAds: true
vssueId: 71
layout: SpecialSupportPage
description: Kubernetes教程_本文描述了如何获得Kuboard授权
---

# Kuboard

<AdSenseTitle/>

## Kuboard 介绍

Kuboard V4 是一款基于 Kubernetes 的容器管理平台，提供直观的 Web 界面来管理 Kubernetes 集群。Kuboard 使用 Java 21 + Spring Boot 3 后端和 Vue 3 + TypeScript 前端，通过 JDK 原生 HTTP/2 客户端与 apiserver 通信，兼容 Kubernetes 1.15+ 全系列版本。Kuboard 提供的功能有：

<div class="kuboard-features">

| 功能与服务                                                   | 免费版             | 增强版             |
| ------------------------------------------------------------ | :------------------: | :------------------: |
| **Kubernetes 基本管理功能**                                  |                    |                    |
| <div class="tap"></div>节点管理、节点排水/驱离、Pod 驱逐     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>名称空间管理、限制范围、资源配额       | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>服务账户管理                           | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>控制器管理（Deployment / StatefulSet / DaemonSet / CronJob / Job / Pod） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>工作负载编辑器（表单编辑 Deployment / StatefulSet / DaemonSet） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Service / Ingress / IngressClass 管理  | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>ConfigMap / Secret 管理                | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>CustomResourceDefinition / CR 管理     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>网络策略（NetworkPolicy）管理           | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>自动伸缩（HorizontalPodAutoscaler）管理 | :white_check_mark: | :white_check_mark: |
| **Kubernetes 存储管理**                                      |                    |                    |
| <div class="tap"></div>存储类、存储卷、存储卷声明管理          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>存储快照类、存储快照管理                | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>CSI 驱动程序、CSI 节点、CSI 存储容量管理 | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>卷挂载管理                             | :white_check_mark: | :white_check_mark: |
| **服务与网络**                                               |                    |                    |
| <div class="tap"></div>Gateway API（GatewayClass / Gateway / HTTPRoute / TLSRoute / TCPRoute / UDPRoute / GRPCRoute / ReferenceGrant） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>端点切片（EndpointSlice）管理           | :white_check_mark: | :white_check_mark: |
| **集群资源**                                                 |                    |                    |
| <div class="tap"></div>RBAC 管理（Role / RoleBinding / ClusterRole / ClusterRoleBinding） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Admission Webhook 管理（MutatingWebhookConfiguration / ValidatingWebhookConfiguration / ValidatingAdmissionPolicy / ValidatingAdmissionPolicyBinding） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>动态资源分配 DRA 管理（ResourceClaim / ResourceClaimTemplate / ResourceSlice / PodSchedulingReadiness） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>流量控制（FlowSchema / PriorityLevelConfiguration） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>优先级类管理、Pod 中断预算管理          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>运行时类管理、租约管理                  | :white_check_mark: | :white_check_mark: |
| **Kubernetes 问题诊断**                                      |                    |                    |
| <div class="tap"></div>Top Nodes / Top Pods（资源监控）        | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>事件列表（整合到关联对象的上下文）      | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>容器日志界面（实时/下载）               | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>容器 Web 终端界面                      | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>文件浏览器（查看/编辑/上传/下载容器中的文件） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>YAML 预览、编辑、对比                   | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>资源全景图（交互式拓扑可视化）          | :white_check_mark: | :white_check_mark: |
| **认证与授权**                                               |                    |                    |
| <div class="tap"></div>Kuboard 内建用户库（用户/用户组/角色）  | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Webhook 外部用户库对接                  | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kubernetes RBAC 授权                   | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>多因子认证（MFA / TOTP）               | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>密码策略                               | :white_check_mark: | :white_check_mark: |
| **多集群管理**                                               |                    |                    |
| <div class="tap"></div>通过 kubeconfig 导入集群                | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>通过 kuboard-agent 导入集群             | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>管理不超过三个 Kubernetes 集群          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>管理超过三个 Kubernetes 集群            | :x: | :white_check_mark: |
| **Helm 应用管理**                                            |                    |                    |
| <div class="tap"></div>Helm Release 安装、升级、回滚、事件     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Chart 市场浏览                          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Chart 仓库管理                          | :white_check_mark: | :white_check_mark: |
| **AI 与自动化（MCP）**                                      |                    |                    |
| <div class="tap"></div>MCP Server（Model Context Protocol，Streamable HTTP / SSE，兼容 opencode / Claude / Cursor 等 AI 客户端） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>K8s 运维工具集（工作负载 / Pod / 节点 / 配置 / 事件 / 自定义资源 的查询与操作） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Prometheus 查询工具（指标查询、RBAC 逐条鉴权、聚合查询策略） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>诊断 Prompt（诊断 Pod / 清理孤儿 PVC / 生成 Deployment YAML） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>资源变更实时订阅推送（SSE）                    | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>高危操作确认令牌（危险级工具需二次确认）         | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>工具白名单 + 限流 + 审计脱敏                   | :white_check_mark: | :white_check_mark: |
| **审计与可观测性**                                           |                    |                    |
| <div class="tap"></div>操作审计日志（当天）                    | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>操作审计日志（历史）                    | :x: | :white_check_mark: |
| <div class="tap"></div>审计策略配置                            | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kuboard Proxy（Web 版 kubectl proxy）   | :white_check_mark: | :white_check_mark: |
| **Kuboard 特色功能**                                         |                    |                    |
| <div class="tap"></div>镜像版本调整（批量修改工作负载镜像）    | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>导入/导出 K8S 对象（YAML）              | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>持续部署对接接口（镜像更新/重启）       | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kuboard 套件市场（Addon 市场）          | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>系统配置（可禁用菜单项等）              | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>K8sCapability 版本兼容抽象层（支持 K8s 1.15+） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>资源可用性治理（自动探测集群组件安装状态） | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>Kuboard 高可用部署模式                  | :x: | :white_check_mark: |
| **服务与支持**                                               |                    |                    |
| <div class="tap"></div>微信/QQ 社群免费答疑                     | :white_check_mark: | :white_check_mark: |
| <div class="tap"></div>付费用户专属答疑通道                     | :x: | :white_check_mark: |
| <div class="tap"></div>远程协助解决问题                         | :x: | :white_check_mark: |

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
  <img src="https://addons.kuboard.cn/downloads/kuboard-press.svg" alt="Kubernetes教程_Kuboard_Github_Star" style="height: 320px;">
      
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

<!--
## 已采纳用户

只要您在此处留下公司名字，您就已经 **取得将 Kuboard 用于生产环境的授权** 

> 如果列表不能显示，请直接到这个链接留言 [Kuboard 授权列表](https://github.com/eip-work/kuboard-press/issues/71) -->
