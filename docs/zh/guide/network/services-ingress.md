---
description: 服务与网络 - Service 与 Ingress：Service 四种类型（ClusterIP/NodePort/LoadBalancer/ExternalName）的创建编辑删除、端口与选择器配置、Ingress 七层路由规则与 TLS、IngressClass 说明，以及服务不可访问时的排障要点（Endpoints / Events）
---

# Service 与 Ingress（服务发现与对外暴露）

Service 与 Ingress 负责把工作负载"暴露"出去：Service（服务）提供稳定的集群内访问入口与负载均衡，Ingress（路由）提供七层（HTTP/HTTPS）域名路由。一个典型的对外访问链路是：

```text
Ingress（域名 + 路径）→ Service（端口）→ Pod
```

Kuboard 中这两个对象位于 **服务与网络 → 服务与路由** 导航下。

::: tip 创建顺序
Ingress 的后端是 Service，Service 的后端是带标签的 Pod。先通过 [Deployment](../workload/deployments) 等工作负载创建 Pod，再建 Service，最后（如需对外暴露）建 Ingress。
:::

## 入口位置

1. 登录 Kuboard，进入目标集群与名称空间；
2. 左侧导航 **服务与网络 → 服务与路由**，包含三个页面：

| 页面 | 对应资源 | 说明 |
| --- | --- | --- |
| 服务（Services） | `v1` apiGroup 为空 | 本文主题 |
| 路由（Ingresses） | `networking.k8s.io` | 本文主题，界面中文名"路由" |
| Ingress 类（IngressClasses） | `networking.k8s.io`，集群级 | 指定 Ingress 控制器 |

同一分组下还有 [网关（Gateway API）](./gateway-api)、[网络策略](./networkpolicy)、端点切片（EndpointsSlices，`discovery.k8s.io`）等入口。

列表页为 Kuboard 通用资源列表：顶部可选择集群/名称空间（或切换树形导航）、按名称搜索、批量删除；行内提供 **编辑 / YAML / 删除** 操作，点击名称进入详情页。

## Service：集群内服务发现与负载均衡

Service 是四层（TCP/UDP）的稳定访问入口：把若干标签相同的 Pod 聚合到一个固定的 ClusterIP（集群内虚拟 IP）与 DNS 名称之后，Pod 重启、IP 变化都不影响访问方。

### Service 的四种类型

| 类型 | 访问范围 | 典型场景 | ClusterIP |
| --- | --- | --- | --- |
| ClusterIP（默认） | 仅集群内部 | 微服务之间互相调用 | 有 |
| NodePort | 集群外部 | 节点 IP + 固定端口，适合自建/裸金属环境 | 有 |
| LoadBalancer | 集群外部 | 云厂商负载均衡器分配公网 IP | 有 |
| ExternalName | 集群内部 | 把外部域名映射成本集群服务名（无选择器、无端口） | 无 |

::: tip 类型选择建议
不确定是否要对外暴露时先选 **ClusterIP**，之后可随时切换类型；云环境对外暴露用 LoadBalancer，无云 LB 的自建集群用 NodePort。
:::

### 创建 Service

1. 进入 **服务** 列表页，点击右上角 **创建**；
2. **基本信息**：填写名称（必填，名称空间内唯一）、标签、注解；
3. **基本配置**：先填写选择器，再选择服务类型、配置端口；
4. **高级配置**（可选）：会话亲和性等；
5. 点击 **保存**，在 **预览 YAML** 中确认后提交，跳转到详情页。

<!-- screenshot-todo: Service 创建页"基本配置"标签页（选择器 + 服务类型 + 端口表格）截图 -->

#### 填写选择器：如何关联 Pod

选择器（Selector）决定流量转发给哪些 Pod——Pod 的标签必须包含选择器中**所有**键值对（多个标签是 AND 关系）。

- **手工添加**：点击"添加标签"，逐行填写标签 key / value（key 如 `app`、`role`）；
- **从 Pod 导入**：在"从 Pod 导入"中选择本名称空间的一个 Pod，将其全部标签合并进选择器（同名 key 覆盖已有值）。

::: warning 选择器与工作负载标签保持一致
创建 [Deployment](../workload/deployments) 时 Kuboard 默认写入 `app=<名称>` 标签并同步到 Pod 模板。Service 选择器照抄这组标签，即可选中这些 Pod；选择器不匹配是"服务不通"最常见的原因。
:::

#### 填写端口

端口表各列说明：

| 列 | 说明 | 取值范围 |
| --- | --- | --- |
| 名称 | 端口名（可选，如 `http`） | - |
| 协议 | TCP / UDP / SCTP | - |
| 端口（port） | 集群内访问 Service 使用的端口 | 1 - 65535 |
| 目标端口（targetPort） | 转发到 Pod 内容器的端口 | 1 - 65535 |
| 节点端口（nodePort） | 仅 NodePort / LoadBalancer 类型显示，留空自动分配 | 30000 - 32767 |
| 应用协议（appProtocol） | 可选，如 `http`（集群版本支持时显示） | - |

访问链路为 `Service 端口 → targetPort → 容器监听端口`。可点击行首"+"添加多个端口（如同时暴露 443 与 80）。

#### 服务类型切换的影响

创建后可在编辑页随时切换类型，表单会自动增删字段：

| 切换到 | 自动变化 |
| --- | --- |
| ExternalName | 移除端口、选择器、ClusterIP 与高级配置，出现"外部名称"输入框（须为合法域名，如 `example.com`） |
| NodePort | 端口表出现"节点端口"列 |
| LoadBalancer | 端口表出现"节点端口"列；高级配置出现外部流量策略、负载均衡器 IP 与源范围 |
| ClusterIP | 移除 nodePort 等仅对外部可见的字段 |

::: warning ClusterIP 创建后不可修改
ClusterIP 由集群自动分配（界面显示"自动分配"）。若需固定 IP，只能在创建时通过 YAML 指定 `spec.clusterIP`，创建后无法更改。
:::

#### 高级配置（可选）

| 字段 | 说明 |
| --- | --- |
| 会话亲和性 | `None`（默认，请求可能到任意 Pod）或 `ClientIP`（同一来源 IP 固定到同一 Pod），可选超时时间（默认 10800 秒） |
| 外部流量策略 | 仅 LoadBalancer：`Cluster`（转发到所有节点）/ `Local`（保留源 IP、少一跳，但流量可能不均） |
| 负载均衡器 IP / 源范围 | 仅 LoadBalancer：申请固定 IP；按 CIDR 限制访问来源，每行一个，如 `192.168.1.0/24` |
| 发布未就绪地址 | 开启后未就绪的端点也参与转发（自定义健康检查场景） |
| 内部流量策略 | `Cluster` / `Local`：集群内流量是否只在节点本地转发 |

### 编辑与删除 Service

- **编辑**：列表行 **编辑**，复用创建表单，可直接改端口、选择器、切换类型；
- **删除**：行内删除或勾选后批量删除，需输入对象名称确认。

::: warning 删除影响
删除 Service 后，依赖其 DNS（`服务名.名称空间.svc`）的 Pod 无法再解析，Ingress 后端也随之失效。删除前请确认没有其他对象引用它。
:::

### 验证 Service 是否可用（详情页）

详情页顶部展示服务类型、ClusterIP、LoadBalancer 外部地址；端口表每行提供：

- **访问提示**：集群内 `ClusterIP:端口`；本名称空间 Pod 内可用 `服务名:端口`；NodePort 类型额外提示 `<任意节点IP>:节点端口`（需从节点所在网络访问）；
- **代理** 按钮：Kuboard 通过 apiserver 代理请求该服务（需 `services/proxy` get 权限），快速验证 HTTP 服务是否真的在响应。

<!-- screenshot-todo: Service 详情页（类型标签 + 端口表 + "访问提示" popover）截图 -->

::: tip 为什么 ping 不通服务
ClusterIP 是虚拟 IP，由 kube-proxy 以 iptables / ipvs 规则转发，不支持 ICMP。ping 不通不代表服务不可用，请用 curl 或"代理"按钮验证。
:::

## Ingress：七层 HTTP/HTTPS 路由

Ingress 是七层路由：按 **主机名（host）+ 路径（path）** 把外部 HTTP/HTTPS 请求转发到集群内的 Service。路由的实际实现由 IngressClass 指定的控制器（如 Nginx Ingress Controller、云厂商 LB 控制器）完成。

### 创建 Ingress

1. 进入 **路由** 列表页，点击 **创建**（Ingress 支持从表单或直接 YAML 创建）；
2. **基本信息**：名称、标签、注解；
3. **Ingress 配置**：选择 Ingress 类名、可选默认后端；
4. **路由规则**：添加规则（host + 路径表）；
5. **TLS 配置**（可选）：HTTPS 证书；
6. 点击 **保存**，预览 YAML 后提交。

<!-- screenshot-todo: Ingress 创建页"路由规则"标签页（Rule 卡片：主机 + path/pathType/后端服务表格）截图 -->

#### 填写路由规则

每条规则（Rule）= 一个主机名 + 一组路径：

| 字段 | 说明 |
| --- | --- |
| 主机（host） | 规则适用的域名，如 `demo.example.com`；**留空匹配所有主机** |
| 路径（path） | URL 路径，如 `/`、`/api` |
| 路径类型（pathType） | `Exact` 精确匹配 / `Prefix` 前缀匹配（默认）/ `ImplementationSpecific` 由控制器解释 |
| 后端服务 | 从本名称空间选择 Service（下拉自动列出） |
| 服务端口 | 选定服务后自动带出其端口列表，选择其一 |

一个 host 下可添加多条路径，分别指向不同后端 Service，实现"同一域名按路径分流"；也可添加多条规则，实现"多域名共用入口"。

#### TLS 配置（HTTPS）

- 点击 **添加 TLS**，为指定主机启用 HTTPS；
- **主机列表**：可从已有规则的 host 中选择，也可直接输入；
- **Secret 名称**：选择现有的 TLS 密文（类型 `kubernetes.io/tls`），或点击"快速创建"直接新建（需填证书与私钥）；
- TLS 只对列表中列出的 host 生效，未列出的 host 仍走 HTTP。

#### Ingress 类（IngressClass）说明

- IngressClass 是集群级资源，指定实现控制器（如 `nginx`），创建 Ingress 时从下拉选择；
- 下拉选项显示**控制器名称**，带"默认"标记的是集群默认类（注解 `ingressclass.kubernetes.io/is-default-class: "true"`），留空时使用默认类；
- 集群**未安装任何 IngressClass** 时给出提示，可跳转"Ingress 类"页面创建；
- 输入一个集群中不存在的类名会提示"该 IngressClass 在集群中不存在，Ingress 创建后将被忽略"；
- 当前用户无 `ingressclasses` 列表权限时，下拉降级为手动输入；
- K8s 1.18 以下版本没有 `spec.ingressClassName` 字段，创建页会自动提供旧注解 `kubernetes.io/ingress.class` 输入框。

::: warning 没有 IngressClass 时 Ingress 不会生效
创建 Ingress 前请先确认集群已安装 Ingress 控制器（如 ingress-nginx），并在 **Ingress 类** 页面存在对应的 IngressClass，否则 Ingress 会一直处于"尚未分配入口地址"状态。
:::

#### 默认后端（可选）

没有规则匹配时的兜底后端，选中 Service 后自动带出其端口；不设置时未匹配请求返回 404。

### 查看 Ingress 详情与删除

详情页展示：基本信息（名称/名称空间/标签/注解）、路由规则表（path / pathType / 后端服务与端口）、TLS（主机列表 + Secret 名称）、默认后端，以及**状态 → 入口地址**（控制器分配的外部 IP / 域名；未分配时显示"尚未分配入口地址"）。

删除操作与 Service 相同（行内或批量删除，需输入名称确认）。删除后域名路由立即失效，但 Service 与 Pod 不受影响。

## 排障：服务不可访问时从哪看

按详情页提示的访问地址验证仍不通时，按以下顺序排查：

1. **看 Endpoints**（Service 详情页"端点与容器组"区块）
   - 该区块列出 Endpoints 的**已就绪 / 未就绪**地址（也可勾选只看其中一类），点击某个地址可查看对应 Pod 详情或地址信息；
   - **已就绪地址为空**：选择器没有选中任何 Pod，请回到创建页对比选择器与 Pod 标签；
   - **地址存在但标记"未就绪"**：对应 Pod 的就绪探针未通过，流量不会分发到它身上。
   - 注：Service 详情目前展示 v1 Endpoints（新版 K8s 底层为 EndpointSlices，可在 **服务与网络 → 端点切片** 查看）。
2. **看事件**（Service / Ingress 详情页"事件"面板）
   - 面板按对象 UID 关联展示相关事件，如 LoadBalancer 分配失败、类型变更、NodePort 分配等异常原因都会出现在这里。
3. **常见原因对照**

| 现象 | 常见原因 |
| --- | --- |
| Endpoints 无就绪地址 | 选择器不匹配 / Pod 未就绪（readinessProbe 失败）/ 后端 Pod 已删除 |
| 集群内 `服务名:端口` 不通 | Service 端口与 targetPort 填反；Pod 未监听该端口 |
| NodePort 不通 | 节点防火墙未放行 30000-32767；访问来源不在节点可达网络 |
| LoadBalancer 无外部地址 | 云 LB 未就绪；外部流量策略 `Local` 导致没有节点可转发 |
| Ingress 入口地址为空 | 未安装 IngressClass / 类名不存在被忽略 / 控制器未分配地址 |
| Ingress 访问 404 | host / path 未匹配任何规则；后端 Service 不存在或端口错误 |

::: tip 命令行速查
```sh
kubectl -n <ns> get svc,ingress
kubectl -n <ns> get endpoints            # 后端地址是否就绪
kubectl -n <ns> describe svc <名称>       # 查看事件与端口定义
kubectl -n <ns> describe ingress <名称>
kubectl -n <ns> get pod -o wide          # 对照 Pod 标签与 IP
```
:::

## 相关页面

- [网关（Gateway API）](./gateway-api)：新一代网关 API（GatewayClass / Gateway / HTTPRoute）
- [网络策略](./networkpolicy)：集群内东西向流量管控
- [名称空间](../cluster-resources/namespaces)：资源隔离与命名边界
- [Deployment](../workload/deployments)、[Pod](../workload/pods)：Service 的后端来源
- 密文（Secret）：TLS 证书存放处（配置与存储 → 密文）
- 节点与运行时：[节点](../cluster-resources/nodes)——NodePort 入口实际所在
