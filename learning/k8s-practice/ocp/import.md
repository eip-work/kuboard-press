---
vssueId: 105
titlePrefix: 部署SpringCloud_OCP
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台OCP_open_capacity_platform微服务能力开放平台_导入部署配置
meta:
  - name: keywords
    content: Kubernetes部署SpringCloud,Kubernetes部署OCP,Kuboard部署OCP
---

# 导入部署配置

<AdSenseTitle/>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {
    downloadYaml () {
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: '下载OCP_YAML',
          eventAction: 'OCP_YAML',
          eventLabel: '下载OCP部署yaml文件'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    }
  }
}
</script>

## 获得yaml文件

在 [导出部署配置](./export.html) 中，我们将 Spring Cloud OCP 部署相关的所有信息导出到一个 yaml 文件，本文描述如何在一个新的名称空间（或者新的 Kubernetes 集群）中导入该部署信息，并形成一个新的独立的部署环境。

如果您还没有该 yaml 文件，可从此处
<span v-on:click="downloadYaml"><a :href="$withBase('/practice/ocp/kuboard_ocp_2019_10_01_13_58_04.yaml')" download="kuboard_ocp_2019_10_01.yaml">下载 OCP部署yaml文件</a></span>

## 导入yaml文件

假设您已创建了名称空间 `ocp-import` 用来导入部署配置。请参考接下来的导入步骤：

* 点击 **导入工作负载** 按钮

  在此界面中上传前一个步骤导出的（或从 www.kuboard.cn 下载的）yaml 文件。如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_上传YAML文件](./import.assets/image-20191001141313966.png)

* 点击 **下一步** 按钮

  全选所有的工作负载，如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_选择要导入的工作负载](./import.assets/image-20191001141409779.png)

* 点击 **下一步** 按钮

  选中 `ocp-config` 如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_选择要导入的ConfigMap](./import.assets/image-20191001141454878.png)

* 点击 **下一步** 按钮

  如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_选择要导入的Secret](./import.assets/image-20191001141532125.png)

* 点击 **下一步** 按钮

  如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_配置存储卷](./import.assets/image-20191001141554887.png)

* 点击 **下一步** 按钮

  勾选 `使用随机端口` 此处由于我们在原集群的新名称空间中导入配置，因此，需要修改节点端口号，以避免冲突。如果您不知道该怎么分配端口号，可以在节点端口字段填写 `0`，集群将自动为您分配可用的节点端口。

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_配置节点端口](./import.assets/image-20191001142507168.png)

* 点击 **下一步** 按钮

  在此界面中调整对外的域名，以避免和原名称空间的部署产生域名冲突，如下图所示：

  * cloud-eureka.ocp-import.demo.kuboard.cn
  * api-gateway.ocp-import.demo.kuboard.cn
  * svc-auth-server.ocp-import.demo.kuboard.cn
  * svc-user-center.ocp-import.demo.kuboard.cn
  * back-center.ocp-import.demo.kuboard.cn

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_配置域名](./import.assets/image-20191001141951560.png)

* 点击 **确定** 按钮

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_校验导入参数](./import.assets/image-20191001142617667.png)

* 点击 **应用** 按钮

  ![Kubernetes教程_部署SpringCloud_OCP_执行导入操作](./import.assets/image-20191001142642948.png)

* 点击 **完成** 按钮

* 此时进入名称空间，可看到所有的配置和部署都已经完成导入。



## 导入后调整

* 导入到新的名称空间以后，ConfigMap中配置参数受到影响的部分需要调整，如下图所示：
  * <span style="color: blue">eureka.client.serviceUrl.defaultZone</span> = `http://cloud-eureka-0.cloud-eureka.ocp-import.svc.cluster.local:1111/eureka,http://cloud-eureka-1.cloud-eureka.ocp-import.svc.cluster.local:1111/eureka,http://cloud-eureka-2.cloud-eureka.ocp-import.svc.cluster.local:1111/eureka`
  * <span style="color: blue">spring.datasource.druid.log.url</span> = `jdbc:mysql://db-log-center:3306/log-center?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&useSSL=false`
  * <span style="color: blue">spring.redis.host</span> = `cloud-redis`
  * <font color="blue">GATEWAY_API_URL</font> = `http://api-gateway.ocp-import.demo.kuboard.cn/`
  * <font color="blue">CLOUD_EUREKA_URL</font> = `http://cloud-eureka.ocp-import.demo.kuboard.cn/`

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_调整ConfigMap中的参数](./import.assets/image-20191001142831089.png)

* 由于 ConfigMap 中的参数发生了变化，此时必须删除所以引用该 ConfigMap 中的容器组，Kubernetes 将自动创建新的容器组以替换被删除的容器组，新的容器组中，ConfigMap 的变更将生效。
  
  点击名称空间上方的 **容器组列表** 按钮，全选，并删除，如下图所示：

  ![Kubernetes教程_部署SpringCloud_OCP_导入部署配置_重启容器组](./import.assets/image-20191001142955738.png)

## 验证配置

* 在浏览器打开 `http://back-end.ocp-import.demo.kuboard.cn` （此域名已失效，以节省演示服务器空间，请使用您自己的域名），可登录 OCP 后台中心的界面。

:tada: :tada: :tada: 您成功学会了如何使用 Kuboard 快速复制一份 Spring Cloud 微服务架构的部署环境。

## Kuboard授权

使用 Kuboard 是免费的，请查看 [Kuboard 授权声明](/support/)
