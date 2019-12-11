---
vssueId: 168
lessAds: true
description: 如何基于KuboardAPI实现自定义的Kubernetes监控套件
---

# 自定义套件

<AdSenseTitle/>

> * 请参考 [监控 example](/guide/example/monitor.html) 体验 Kuboard 在监控套件方面的设想
> * 套件以插件的形式整合到 Kuboard，是对 Kuboard 能力的一个扩展。在不使用套件的情况下，Kuboard 的所有功能都可正常工作

<p style="max-width: 560px;">
<img style="padding: 10px;" src="./customize.assets/image-20191210230451346.png" alt="Kuboard套件_生命周期">
</p>

上图是 Kuboard 管理一个套件的完整生命周期。为了简化问题的讨论，我们将着重阐述生命周期中的以下几个动作：
* [下载脚本](#下载脚本)
* [安装](#安装)
* [初始化](#初始化)


在了解完上述几个动作以后，您就已经可以实现自己的套件（或者修改已有套件）了。此外，了解下面的动作可以帮助您更完整地理解套件的生命周期：

* [卸载](#卸载)
* [禁用](#禁用)
* [重新激活](#重新激活)

当您对自己的套件比较满意之后，您还可以[发布套件](./repository.html)到仓库，让更多的朋友获益

## 下载脚本

### 下载方式

Kuboard 提供了两种下载套件脚本的方式：
* 从套件仓库下载
* 从指定路径下载

如下图所示，点击界面中的安装按钮之后，Kuboard 将套件的相关脚本全部存入到名称空间下的 ConfigMap 中。
* 全局套件存入到 kube-system 名称空间
* 名称空间套件存入到所在的名称空间

![K8S教程_安装套件_套件仓库对话框](./README.assets/image-20191124194352173.png)

### 套件描述文件

套件仓库或者指定URL的方式下载套件脚本时，都需要对应到一个套件描述文件。套件描述文件的主要用途是：
* 标识套件的基本信息，如名称、id、更新时间、维护者、文档地址等
* 定义套件所需的资源文件列表：
  * k8s yaml 文件，向 Kubernetes 创建对象
  * java scripts 脚本，向 Kuboard 添加回调函数
  * resources 脚本，额外的资源文件

以 [资源层监控套件](https://addons.kuboard.cn/eip-monitor-system/0.1.1/addon.json) 的描述文件为例：（该文件的 URL 为 `https://addons.kuboard.cn/eip-monitor-system/0.1.1/addon.json`）

``` json {7,8,9}
{
  "name": "资源层监控套件",
  "id": "eip-monitor-system",
  "version": "0.1.1",
  "lastUpdate": "2019-12-11",
  "maintainer": "shaohq@foxmail.com",
  "scripts": ["system-addon.js"],
  "k8s": ["system-k8s.yaml"],
  "resources": ["resource/1621.json", "resource/1860.json", "resource/3146.json", "resource/8588.json"],
  "isGlobal": true,
  "info": {
    "description": "通过prometheus/grafana监控Kubernetes资源层的信息，包括CPU使用、内存使用、网络使用等信息。",
    "document": "https://shaohq.github.io/eip-monitor-system/"
  }
}
```

描述文件包含的字段如下：

| 字段名称         | 字段类型      | 字段描述                                                     |
| ---------------- | ------------- | ------------------------------------------------------------ |
| name             | String        | 套件的中文名字，将显示在仓库中                               |
| id               | String        | 套件的 ID，[发布到套件仓库](./repository.html) 时，该 ID 必须在仓库内全局唯一 |
| version          | String        | 套件的版本标识                                               |
| lastUpdate       | String        | 套件最后更新日期                                             |
| maintainer       | String        | 套件维护者的联系方式                                         |
| scripts          | Array[String] | Java scripts 脚本，用于向 Kuboard 添加界面元素以及回调函数。（相对于套件描述文件的路径） |
| k8s              | Array[String] | kubernetes yaml 文件，用于向 Kubernetes 创建新的对象。（相对于套件描述文件的路径） |
| resources        | Array[String] | 额外资源文件，通常在套件初始化时使用。（相对于套件描述文件的路径） |
| isGlobal         | Boolean       | 是否为 [全局套件](/guide/addon/#类型)                        |
| info.description | String        | 套件的文本描述，将显示在套件仓库中                           |
| info.document    | String        | 套件的文档，将显示在套件仓库中                               |

::: tip 指定URL

如果您把套件的脚本放在自己的服务器上，则必须为其指定跨域名访问，nginx 配置如下：

```
add_header 'Access-Control-Allow-Origin' '*' always;
```

也可以简单地将其上传到 GitHub 上，

:::



### 套件的ConfigMap

通过指定URL路径的方式或者从仓库下载的方式下载套件脚本后，所有内容将被存储到 Kubernetes 名称空间里以套件 id 命名的 ConfigMap 中。例如，前面例子中的套件脚本下载完成后，将被存入到 `kube-system/eip-monitor-system` 这个 ConfigMap 里，如下图所示：

![套件的ConfigMap](./customize.assets/image-20191211154833750.png)



::: tip 脚本名与ConfigMap中的 Key 的映射



:::


## 安装

## 初始化

## 卸载

## 禁用

## 重新激活
