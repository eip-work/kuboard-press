---
description: 资源可用性检查与安装引导：三种界面表现、安装引导内容、常见不可用场景处理、内置组件清单
---

# 资源可用性检查与安装引导（Resource Availability）

打开资源列表页时，若所选集群未安装对应的扩展组件，Kuboard 会提示"未安装"并给出安装命令。适用对象：集群运维与平台工程师。

## 三种界面表现

| 触发时机 | 看到什么 |
| --- | --- |
| 打开资源列表页 | 集群树中该集群旁出现 ⚠ 警告图标 |
| 点击「创建」按钮 | 弹出「资源不可用」对话框，创建被拦截 |
| IngressClass 表单选择控制器 | 控制器下拉框下方内联显示安装警告 |

**集群树 ⚠ 警告图标**：悬停图标弹出安装引导浮层（组件说明、可一键复制的安装命令、安装文档与官网链接）；列表照常打开，只是该集群下暂无这类对象。

**「资源不可用」对话框**：点击「创建（+）」时先探测目标集群：可用则进入正常创建流程（表单 / YAML）；不可用则弹出对话框（标题为组件名），内容是安装引导，创建被拦截。

**IngressClass 内联警告**：创建或编辑 IngressClass、选择控制器（如 NGINX、Traefik）后，若控制器未在当前集群部署，下拉框下方内联显示警告和可复制的安装命令。

::: tip 探测失败不误报
探测请求因网络或鉴权问题失败时，界面默认视为可用（fail-open），不显示提示、不拦截操作。
:::

## 安装引导里有什么

| 内容 | 说明 |
| --- | --- |
| 组件名称 / 说明 / 文档 | 如 Kubernetes Gateway API、cert-manager，含官方文档与官网链接 |
| 安装命令 | kubectl / helm 命令，带一键复制按钮 |

## 常见不可用场景与处理

| 场景 | 表现 | 处理 |
| --- | --- | --- |
| 未安装 Gateway API 的 CRD | 网关页面集群树出现 ⚠，创建被拦截 | 复制提示中的命令在集群执行，安装后刷新。完整流程见 [Gateway API](../guide/network/gateway-api) |
| 未部署所选 Ingress 控制器 | IngressClass 表单内联警告 | 按提示安装，或改用集群已有控制器。传统 Ingress 见 [服务与 Ingress](../guide/network/services-ingress) |
| 未安装 VolumeSnapshot 的 CRD | 快照页面集群树出现 ⚠ | 按提示安装 CSI snapshotter 的 CRD 后刷新 |
| 未识别的 API Group | 提示"未识别的 K8s 扩展组件"，无安装命令 | 不在内置清单中，自行确认组件来源并手动安装 |
| 集群连接异常 | 资源页加载失败或提示集群不可达 | 检查集群连通性，与资源是否安装无关 |

::: warning 列表为空 ≠ 未安装
没有 ⚠ 提示而列表为空，说明资源已安装、集群中暂无这类对象，直接创建即可。
:::

## 内置组件清单

以下 11 类组件内置安装引导，未安装时可直接在提示中复制安装命令：

| 组件 | API Group |
| --- | --- |
| Kubernetes Gateway API | gateway.networking.k8s.io |
| cert-manager | cert-manager.io |
| Argo CD | argoproj.io |
| Istio | networking.istio.io |
| KEDA | keda.sh |
| Prometheus Operator | monitoring.coreos.com |
| Velero | velero.io |
| Cilium | cilium.io |
| VolumeSnapshot | snapshot.storage.k8s.io |
| Tekton | tekton.dev |
| Ingress 控制器 | networking.k8s.io/ingressclasses（NGINX / Traefik / HAProxy / Contour） |

不在清单中的 API Group 走通用兜底提示。自定义资源的日常使用见 [自定义资源实例](../guide/crd/custom-resources)。

::: tip 安装后仍提示"未安装"？
组件安装完成后刷新页面，提示即消失。
:::
