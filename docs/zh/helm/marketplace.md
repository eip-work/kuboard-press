---
description: 在 Kuboard 的 Chart 市场（Helm Marketplace）中浏览、搜索 Helm Chart，查看详情（README / 默认 values / Chart 元信息），管理 Helm 仓库（添加、编辑、删除、刷新），并一键跳转到安装页面。
---

# Chart 市场（Helm Marketplace）

Kuboard 内置 **Chart 市场（Helm Marketplace）**，可以像逛应用商店一样浏览、搜索可用的 Helm Chart（Chart 是 Helm 的可安装软件包，包含一组 Kubernetes 资源模板与默认配置），查看每个 Chart 的说明文档、默认 values（values.yaml 中的默认参数）和元信息，然后一键跳转到安装页面完成部署。

本文面向「想找一个现成的 Chart 并安装它」的用户，覆盖从进入市场、浏览与筛选、查看详情、管理仓库，到进入安装页的完整流程。安装页面的操作请见 [安装 Helm Release](./install)。

## 进入市场

1. 在左侧菜单选择目标**集群**，进入 **应用管理 → Helm Release → 市场浏览**。

   | 菜单层级 | 说明 |
   |---|---|
   | 应用管理 | 左侧导航中的「应用管理」分组 |
   | Helm Release | 应用管理下的「Helm Release」子菜单 |
   | 市场浏览 | Chart 市场页面，展示可安装的 Chart 列表 |

2. 打开后即为 Chart 市场首页，默认展示全部可用 Chart。

<!-- screenshot-todo: 市场浏览页全貌（顶部工具栏 + Chart 卡片网格） -->

::: tip
市场页的可见范围与你的权限有关：普通成员只能看到状态为就绪（ready）的仓库及其 Chart；仓库列表的查看还需要 `helm.kuboard.cn` 下 `chart-repos` 资源的 `list` 权限。
:::

## 浏览 Chart 市场

市场首页以卡片网格展示 Chart，每张卡片包含：

| 卡片内容 | 说明 |
|---|---|
| Chart 名称 | 形如 `bitnami/redis`，`仓库名/Chart 名` |
| 版本（version） | Chart 自身的版本号，如 `v19.6.1` |
| App 版本（appVersion） | Chart 所部署应用的版本号，如 `7.2.4` |
| 仓库来源 | 该 Chart 所属的 Helm 仓库（Repository）名称 |
| 简介 | Chart 的一句话描述（超出两行自动截断） |

点击卡片任意位置或卡片上的 **查看详情** 按钮，可打开该 Chart 的详情抽屉。

### 搜索与筛选

顶部工具栏提供两类查找方式，可以组合使用：

1. **按仓库筛选**：点击「仓库」下拉框，选择某个仓库后立即刷新列表，只显示该仓库下的 Chart；选择「全部仓库」恢复显示所有。
2. **按关键字搜索**：在搜索框中输入名称关键字（例如 `redis`、`nginx`），按回车或点击 **搜索** 按钮过滤列表。
3. **刷新**：点击 **刷新** 按钮重新加载仓库列表与 Chart 列表（仓库刚添加或刚刷新后，可用它让市场页看到最新数据）。

::: tip
搜索与筛选由服务端完成：传入 `keyword`（名称关键字）与 `repoName`（仓库名）两个条件。两者可以同时生效，例如「在 bitnami 仓库中搜索 redis」。
:::

<!-- screenshot-todo: 市场页顶部工具栏（仓库下拉框 + 搜索框 + 搜索/刷新/仓库管理按钮） -->

## 查看 Chart 详情

详情以抽屉形式从右侧滑出，从上到下依次为：

| 区域 | 看什么 | 用途 |
|---|---|---|
| Chart 头部 | 图标、Chart 名称、版本、App 版本 | 快速确认目标 Chart |
| Chart 元信息（Chart.yaml） | type、version、appVersion、home、keywords、kubeVersion | 了解 Chart 类型、适用 Kubernetes 版本、关键词与官方主页 |
| 维护者 / 源码 / 依赖 | maintainers、sources、dependencies | 需要时联系维护者或查看源码；依赖（Dependencies）卡片按需展开查看每个子 Chart 的版本、仓库与启用条件 |
| 完整描述 | Chart 的长描述文本 | 了解 Chart 的功能定位 |
| 兼容性提示 | 集群版本 vs Chart 要求的 kubeVersion | 版本不匹配时显示黄色告警条，提示「当前集群 vX 不满足此 Chart 版本要求」 |
| README | Chart 自带的说明文档（Markdown 渲染） | 安装前必读：默认行为、前置条件、常用参数说明 |
| 默认 values | Chart 自带的默认 values.yaml | 预判安装时有哪些参数可调（安装页会预填这些默认值） |

::: tip
detail 内容由服务端通过 `helm show readme / helm show values / helm show chart` 实时读取，README 与 values 均来自该 Chart 当前所选版本。
:::

### 选择版本

1. 详情页顶部附近的「版本」下拉框中列出该 Chart 的**全部历史版本**，默认选中最新版本（列表第一项）。
2. 切换版本后，README、默认 values 与 Chart 元信息会**同步刷新**为该版本的内容。
3. 关注所选版本的 kubeVersion 约束：如果目标集群的 Kubernetes 版本不满足要求，页面会显示黄色兼容性警告，此时应换用兼容的版本再安装。

<!-- screenshot-todo: Chart 详情抽屉（头部 + 元信息卡片 + 版本下拉 + README 区域 + 默认 values 区域） -->

## 管理 Helm 仓库

Chart 市场的所有 Chart 都来自 Helm 仓库（Repository，即存放 Chart 包的远程索引服务）。首次使用时仓库列表为空，需要先添加仓库；添加后也可随时编辑、删除或刷新。

1. 在市场浏览页右上角点击 **仓库管理** 按钮，打开仓库管理抽屉（该按钮需要 `chart-repos` 资源的 `create` 权限）。
2. 抽屉内以卡片列出所有仓库，每张卡片展示：

   | 信息 | 说明 |
   |---|---|
   | 名称 / URL | 仓库标识与地址 |
   | 状态 | `ready`（就绪）/ `refreshing`（刷新中）/ `pending`（待处理）/ `failed`（失败） |
   | Chart 数量 | 该仓库当前索引到的 Chart 总数 |
   | 最后更新时间 | 最近一次刷新成功的时间 |
   | 错误信息 | 刷新失败时的原因（红色显示） |

### 添加仓库

1. 点击抽屉顶部的 **添加** 按钮。
2. 在表单中填写仓库信息：

   | 字段 | 是否必填 | 说明 |
   |---|---|---|
   | 预设（Preset） | 否 | 常用公共仓库下拉，选择后自动填充名称与 URL |
   | 名称（Name） | 是 | 仓库唯一标识，创建后不可修改 |
   | URL | 是 | 仓库索引地址，如 `https://charts.bitnami.com/bitnami` |
   | 用户名 / 密码 | 否 | 私有仓库的访问凭据 |
   | 跳过 TLS 校验（Insecure TLS） | 否 | 使用自签名证书的仓库开启，跳过证书校验 |
   | 透传凭据（Pass Credentials） | 否 | 将该仓库凭据一并用于下载依赖子 Chart |

3. 点击 **保存**。添加成功后仓库进入 `pending` / `refreshing` 状态，服务端会自动拉取仓库索引，完成后状态变为 `ready`，Chart 即可在市场页看到。

**关于内置仓库**：Kuboard 没有预置任何仓库，首次使用必须添加。为方便起见，「预设」下拉提供了 11 个常用公共仓库，选择后自动填入名称与 URL：

| 预设仓库 | 地址 |
|---|---|
| bitnami | `https://charts.bitnami.com/bitnami` |
| prometheus-community | `https://prometheus-community.github.io/helm-charts` |
| grafana | `https://grafana.github.io/helm-charts` |
| jetstack | `https://charts.jetstack.io` |
| ingress-nginx | `https://kubernetes.github.io/ingress-nginx` |
| argo | `https://argoproj.github.io/argo-helm` |
| elastic | `https://helm.elastic.co` |
| jenkins | `https://charts.jenkins.io` |
| gitlab | `https://charts.gitlab.io` |
| longhorn | `https://charts.longhorn.io` |
| minio | `https://charts.min.io` |

也可以不选预设，自行填写任意合法的仓库名称与 URL。

### 编辑、删除与刷新

- **刷新**：仓库内容（新增 Chart、新版本）不会自动同步，需要手动点击仓库卡片上的 **刷新** 按钮拉取最新索引；刷新期间按钮进入加载态，完成后状态回到 `ready`。市场页也提供全局 **刷新** 按钮重新加载列表。
- **编辑**：点击 **编辑** 修改 URL、凭据等；仓库名称创建后不可修改。
- **删除**：点击 **删除** 并在确认框中确认，即可移除该仓库及其 Chart。

::: warning
- 私有仓库的凭据仅用于服务端拉取仓库索引，保存后不会在列表中明文展示。
- 删除仓库只是从市场中移除该仓库及其索引，不会影响已经安装的 Release。
:::

## 从市场到安装

在 Chart 详情抽屉中点击底部 **安装** 按钮，页面会跳转到 [安装 Release](./install) 页面，并自动带入以下内容：

1. **Chart**：所选 Chart 的完整名称（仓库名 + Chart 名），无需手动填写。
2. **版本**：详情页中当前选中的版本。
3. **默认 values**：该 Chart 的默认 values 会预填到安装表单中，作为可修改的起点（默认值较大时也会自动带入）。

到达安装页后，只需选择目标集群与命名空间、按需调整参数，即可完成部署。
