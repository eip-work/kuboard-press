---
vssueId: 72
description: 本文描述了Kuboard_v2.0.x版本的升级方法
---

# 从 Kuboard v1.0.x 升级到 Kuboard v2.0.x

## Kuboard v2.0.x 与 Kuboard v1.0.x 不兼容的地方

### 自定义名称空间的方式

  Kuboard v1.0.x 中，通过 ConfigMap 加载 kuboard-namespace-layout.yaml 文件的方式自定义名称空间的布局，参考 [自定义名称空间的布局](/install/install-kuboard-layout.html)。在 Kuboard v2.0.x 中，增强了名称空间配置的方式：
  * 通过 CustomResource 进行配置；
  * 在 Kuboard 界面中即可完成名称空间布局的配置；
  * 可以配置全局默认的名称空间布局，还可以按名称空间单独配置；

  升级建议：升级到 Kuboard v2.0.x 后，您需要按照 Kuboard v2.0.x 的方式重新定义名称空间布局。

### Kuboard 注解/标签变更

  Kuboard 中，引入了一些自定义的标签（Labels）和注解（Annotations），主要用作如下用途：
  * k8s.eip.work/layer  标识工作负载属于哪个分层
  * k8s.eip.work/displayName  标识工作负载显示在 Kuboard 界面上的名字

  从 Kuboard v2.0.0-beta.1 开始，这类标签（Labels）或注解（Annotations）将被调整为 k8s.kuboard.cn，例如：
  * k8s.kuboard.cn/layer
  * k8s.kuboard.cn/displayName

  Kuboard v2.0.x **仍然将继续支持** k8s.eip.work/layer 和 k8s.eip.work/displayName 的显示，但是新建工作负载都将调整为 k8s.kuboard.cn

### 套件

  Kuboard v1.0.x 中，由于早期版本不支持鉴权，在提供套件功能时，未能很好的解决权限问题，因此，在 Kuboard v1.0.x 中存在套件过度授权的情况，参考 [KUBOARD_SAFE_MODE](/install/install-kuboard-env.html#kuboard-safe-mode)。

  Kuboard v2.0.x 将彻底解决这个问题，并重构套件功能，开放套件 API（尚不包括在 v2.0.0-beta.x 版本中）。如果您现在升级到 Kuboard v2.0.0-beta.x，将不能使用套件功能。

### 显示ICP备案编号

  Kuboard v2.0.0-beta.x 暂不支持在页尾显示公司名字及 ICP 备案编号的信息，参考 [KUBOARD_ICP_DESCRIPTION](/install/install-kuboard-env.html#kuboard-icp-description)

## 升级办法

* 卸载 Kuboard 套件（如果有安装 Kuboard 套件）

  参考 [卸载套件](/guide/addon/#卸载套件)

  > Kuboard v2.0.0 的正式版将提供重构后的套件功能，届时，需要重新安装套件。如果您打算在某个时间点退回到 Kuboard v1.0.x，也可以选择不卸载套件，Kuboard v2.0.x 中不再提供 Kuboard v1.0.x 的套件卸载功能。

* 修改 Kuboard 镜像标签

  参考 [指定 Kuboard 版本升级](/install/install-dashboard-upgrade.html#指定版本升级)，将 Kuboard 标签修改为 beta，或 v2.0.0-beta.1

* 重新自定义名称空间布局

  进入 Kuboard v2.0.x 界面后，在名称空间页的右上角，可以找到 **自定义名称空间布局** 按钮，按照界面提示修改名称空间布局。
