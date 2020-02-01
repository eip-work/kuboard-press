---
vssueId: 180
layout: LearningLayout
description: Kubernetes教程_除了ServiceAccount以外，Kubernetes不提供任何形式的用户认证方式，如果需要使用用户名密码登录Kubernete/Kuboard，可以通过OpenID Connect、Webhook Token等形式进行用户认证
meta:
  - name: keywords
    content: Kubernetes 教程,Kubernetes 授权,Kubernetes authentication,Kubernetes用户名密码

---

# 用户认证概述

<AdSenseTitle/>

> 参考文档： [Authenticating](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)

## Users in Kubernetes

所有的 Kubernetes 集群都有两类用户：Kubernetes 管理的 Service Account 和普通用户。

普通用户由 Kubernetes 集群之外的独立服务管理，例如 keycloak、LDAP、OpenID Connect Identity Provider（Google Account、MicroSoft Account、GitLab Account）等。此类服务对用户的注册、分组、密码更改、密码策略、用户失效策略等有一系列管控过程，或者，也可以简单到只是一个存储了用户名密码的文件。Kubernetes 中，没有任何对象用于代表普通的用户账号，普通用户也不能通过 API 调用添加到 Kubernetes 集群。

与普通用户相对，[Service Account](/learning/k8s-advanced/sec/sa-admin.html) 是通过 Kubernetes API 管理的用户。Service Account 是名称空间级别的对象，可能由 ApiServer 自动创建，或者通过调用 API 接口创建。Service Account 都绑定了一组 `Secret`，Secret 可以被挂载到 Pod 中，以便 Pod 中的进程可以获得调用 Kubernetes API 的权限。

对 API Server 的每次接口调用都被认为是：
* 由一个普通用户或者一个 Service Account 发起
* 或者是由一个匿名用户发起。

这意味着，集群内外的任何一个进程，在调用 API Server 的接口时，都必须认证其身份，或者被当做一个匿名用户。可能的场景有：
* 集群中某一个 Pod 调用 API Server 的接口查询集群的信息
* 用户通过 kubectl 执行指令，kubectl 调用 API Server 的接口完成用户的指令
* 用户通过 Kuboard 界面管理集群，Kuboard 调用 API Server 的接口实现界面上的功能

::: tip 授权
* **认证过程** 指的是 API Server 如何识别发起 API 请求的用户（进程）的身份；
* **授权过程** 指的是 API Server 在识别请求发起者身份之后，判断发起者是否可以执行该接口请求。
:::

## 认证策略

Kubernetes 的认证策略（Authentication Strategies）是：通过 authentication plugin 认证发起 API 请求的用户身份，认证方式有 client certificates、bearer tokens、authenticating proxy、HTTP basic auth。当 API Server 接收到 HTTP 请求时，authentication plugin 会尝试将如下属性附加到请求：
* **Username**：唯一标识用户的一个字符串。例如 `kube-admin` 或者 `jane@example.com`
* **UID**：唯一标识用户的一个字符串，相较于 username，提供更强的一致性和唯一性。（某些 Identity Provider 可能允许用户更改 username）
* **Groups**：一组字符串，标识用户所属的用户组
* **额外字段**：Key,Value 都是 String 的 Map，包含一些 对 [authorizer](../authorizer/readme.html) 可能有用的信息

上述所有的字段对认证系统来说都是透明的，且只对 [authorizer](../authorizer/readme.html) 有意义（authentication plugin 将认证结果中的某些字段赋值到上述字段中，认证系统只是按照自己的方式正常工作，并不知道上述这些字段的存在）。这使得 Kubernetes 可以同时支持多种认证方式，在实际工作中，您通常应该至少配置两种认证方式：
* Service account tokens 用于认证 Service Account，
* 至少另外一种认证方式用于认证普通用户。

当多个认证模块被启用时，第一个成功对请求进行认证的模块将终止认证过程。API Server 并不确保认证模块的调用顺序。

Group `system:authenticated` 将被包含到所有已认证用户的 `Groups` 字段中。

Kubernetes 还可以使用 [authenticating proxy](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authenticating-proxy) 或者 [authentication webhook](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication) 集成其他的认证协议（例如：LDAP、SAML、Kerberos、alternate x509 shcemes 等）。

具体来说，Kubernetes 支持的认证方式有：
* [X509 Client Certs](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#x509-client-certs)
* [Static Token File](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-token-file)
* [Bootstrap Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#bootstrap-tokens)
* [Static Password File](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file)
* [Service Account Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#service-account-tokens) <Badge>Kuboard v1.0.0</Badge>
* [OpenID Connect Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens) <Badge>Kuboard v1.0.6-beta.7</Badge>
* [Webhook Token Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication)
* [Authenticating Proxy](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authenticating-proxy)

## Kuboard 认证方式

Kuboard 支持两种形式的认证：
* Service Account <Badge>Kuboard v1.0.0</Badge>
  * 在任意 Kubernetes 集群安装 Kuboard 之后，默认的 Kuboard 认证登录方式
  * 登录 Kuboard 后，在当前用户信息页可以获得使用当前用户身份登录 kubectl 的配置参数
* OpenID Connect <Badge>Kuboard v1.0.6-beta.7</Badge>
  * 在任意 Kubernetes 集群安装 Kuboard 之后，通过 [OpenID Connect 配置向导](./install.html) 可以激活此认证登录方式
  * 可以直连 OpenID Connect Provider，例如 keycloak
  * 可以通过 [Dex](https://github.com/dexidp/dex) 连接更多类型的 Identity Provider
    * 已经验证的有：
      * github.com
      * Github Enterprise
      * gitlab.com
      * GitLab CE
      * GitLab Enterprise
    * 正在验证的有：
      * LDAP
  * 通过 OpenID Connect 登录 Kuboard 后，在当前用户信息页可以获得使用当前用户身份登录 kubectl 的配置参数

上述两种认证方式可以并存，可以通过 Dex 同时连接多个 Identity Provider。Service Account的认证方式为 Kubernetes 内置认证方式，任何情况下都是可用的。OpenID Connect 依赖于集群之外的 Identity Provider 服务，即使在 Identity Provider 服务不可用的情况下，Kubernetes 仍然可以正常启动和工作，可以通过 Service Account 登录 Kuboard / Kubernetes，待 Indentity Provider 服务可用之后，就可以使用 OpenID Connect 登录 Kuboard / Kubernetes。

Kubernetes 的上述特性不会为系统引入额外的高可用故障点。
