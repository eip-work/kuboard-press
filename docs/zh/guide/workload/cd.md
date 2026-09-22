---
description: Kuboard 持续部署（CD）：更新镜像 Tag 与重启工作负载两个脚本化操作的使用场景、curl 调用示例、权限要求，以及工作负载详情页的 CI/CD 集成入口
---

# 持续部署（CD）

本页说明如何把「发新版本」变成可放进流水线的脚本：**更新镜像 Tag**（切到新版本）与**重启工作负载**（不改镜像、重新拉取），可在页面上生成脚本，也可直接用 curl 调用。

**适用对象**：管理 Deployment / StatefulSet / DaemonSet 的集群运维与应用发布人员。

## 何时使用

- **更新镜像 Tag**：流水线构建出新的镜像 Tag 后，把工作负载切换到新版本
- **重启工作负载**：镜像没变，但依赖的 Secret / ConfigMap 等配置需要重新拉取时

两个操作都作用于长期运行的工作负载：[Deployment](./deployments)、[StatefulSet](./statefulsets)、DaemonSet。页面入口当前只对 Deployment 与 StatefulSet 开放。

区别在于：更新镜像 Tag 会**修改 Pod 模板里的镜像**（结果是一个新版本）；重启工作负载**不改任何配置**，只是让所有副本重新滚动替换一遍。

## 更新镜像 Tag

把工作负载的容器镜像切换到新 Tag（一次调用可同时更新多个容器），触发控制器滚动发布。

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"deployments","namespace":"default","name":"web","images":{"nginx":"nginx:1.27"}}' \
  "<kuboard-host>/api/cd.kuboard.cn/v4/update-image-tag"
```

请求体字段：`cluster`（集群 ID）、`kind`（负载类型：`deployments` / `statefulsets` / `daemonsets`）、`namespace`、`name`（负载名称），以及 `images`（镜像替换表：key 为旧镜像前缀，value 为新镜像）。

::: warning images 按前缀匹配
key 按「前缀匹配」替换旧镜像，请写全镜像仓库与库名，避免误替换；也不要让多个 key 互为前缀。
:::

::: tip dryRun 预演
加上查询参数 `?dryRun=All` 可预演请求，不会真正修改工作负载，适合 CI 中先校验脚本是否正确。
:::

## 重启工作负载

镜像内容不变、但需要让所有副本重新拉取并滚动替换时使用。接口写入重启时间戳，由控制器按各自的更新策略完成滚动发布：Deployment 新建副本集滚动替换，StatefulSet 逐个替换有状态副本，DaemonSet 逐节点替换。

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"deployments","namespace":"default","name":"web"}' \
  "<kuboard-host>/api/cd.kuboard.cn/v4/restart-workload"
```

::: tip 页面内的交互替代
详情页的**调整镜像版本**按钮与**重启（刷新）**按钮效果相同，适合少量人工操作；流水线自动化请使用本页的 CD 接口。
:::

## 权限要求

调用两类接口需要两级权限同时满足：kuboard 级的 `cd.kuboard.cn/update-image-tag`（或 `restart-workload`）创建权限，以及目标名称空间下对应工作负载的修改权限。缺少任何一级都会被拒绝。建议在 CI 中使用独立的 AccessKey，避免与生产账号混用。

如调用返回 403，请检查当前账号是否同时具备上述两级权限，或换一个有权限的 AccessKey 重试。

## 前端入口

1. 进入 **Deployment 或 StatefulSet 详情页**（如 [Deployment](./deployments)、[StatefulSet](./statefulsets)）。
2. 点右上角 **更多 → CI/CD 集成**，弹出「CI/CD 集成脚本」对话框。
3. 在对话框顶部**选择 AccessKey**（可点「创建 AccessKey」新建）；未选择时脚本不会生成。
4. 复制「更新镜像版本的脚本」或「重启…的脚本」，粘贴进 CI/CD 流水线即可执行。更新镜像脚本中的 tag 是占位符 `yourNewVersionTag`，请替换为实际版本。

::: warning DaemonSet 暂不支持页面入口
DaemonSet 详情页的「CI/CD 集成」菜单为禁用状态。如确有需要，可参照上文的请求格式直接调用接口（`kind` 填 `daemonsets`）。
:::

## 接口文档

本节涉及的接口详见 [Swagger UI 的「持续交付接口」分组](../../reference/api)。