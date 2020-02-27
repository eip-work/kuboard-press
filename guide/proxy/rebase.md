---
vssueId: 184
# lessAds: true
description: Kubernetes教程：本文介绍了 Kuboard Proxy 的 Rebase 功能。
meta:
  - name: keywords
    content: Kubernetes教程,K8S,kubectl proxy
---

# Kuboard Proxy - Rebase

<AdSenseTitle/>

## 为什么要 Rebase

Rebase 是在使用反向代理的情况下，解决前端页面加载所依赖资源时如何计算资源路径的问题。

要完整显示一个前端页面，浏览器除了从服务器加载该页面本身的 html 文件之外，还需要加载一系列该文件引用的资源文件，甚至被引用资源文件引用的其他的资源文件。在使用代理的情况下，正常加载页面本身的 html 文件（即入口文件）通常不会出现问题，但是，被引用的资源文件则不一定能正确加载到。因为，代理服务器很有可能会改变页面所在的上下文。

以 [导入 example](../example/import.html) 中导入的 Eureka 服务为例，直接通过域名的方式访问该服务的 URL 为：
<p>
  <code>
  http://cloud-eureka.example.demo.eip.work/
  </code>
  <span style="color: #666; font-size: 13px; margin-left: 10px;">
  您所使用的 URL 可能与这个不一样
  </span>
</p>

访问该 URL 后，所得的 html 代码如下所示：
> 为了节省篇幅，下面只截取了一些代码片段。

``` html {3,6,11,14}
<!doctype html>
<head>
  <base href="/">
  <meta charset="utf-8">
  <title>Eureka</title>
  <link rel="stylesheet" href="eureka/css/wro.css">
</head>
<body id="one">
...
    <li>
      <a href="/lastn">Last 1000 since startup</a>
    </li>
...
    <script type="text/javascript" src="eureka/js/wro.js" ></script>
...
  </body>
</html>
```

上述代码中：
* 第3行代码定义了文档的 base 路径 `/`，该文档应用的所有资源（如果以相对路径的方式引用）都将基于此 base 路径进行计算，例如：
  * 第6行的 `eureka/css/wro.css`，进行路径计算之后，结果是 `http://cloud-eureka.example.demo.eip.work/eureka/css/wro.css`；
  * 第14行的 `eureka/js/wro.js`，进行路径计算之后，结果是 `http://cloud-eureka.example.demo.eip.work/eureka/js/wro.j`；
* 以 `/` 开头的路径，仍然从根路径开始计算，例如：
  * 第11行的 `/lastn`，进行路径计算之后，结果是 `http://cloud-eureka.example.demo.eip.work/lastn`；

但是，如果您使用 KuboardProxy 访问此页面时，页面的路径是 `https://kuboard.demo.eip.work/proxy/http/example/web-example/:/80/`，在这种情况下，如果代理响应的结果和上面的代码保持一致，以上述第6行代码为例，由于第三行 base 路径仍然为 `/`，则 `eureka/css/wro.css`，进行路径计算之后，结果是 `http://cloud-eureka.example.demo.eip.work/eureka/css/wro.css`；由于代理为 Web 应用增加了 `/proxy/http/example/web-example/:/80/` 作为上下文，此时 `http://cloud-eureka.example.demo.eip.work/eureka/css/wro.css` 这样的 URL 是访问不到期望的资源的。以此类推，其他这种相对资源也都将不能正常加载。

> 如果使用 kubectl proxy 访问，页面路径是 `http://localhost:8001/api/v1/namespaces/example/services/http:cloud-eureka:9200/proxy`

对于这种情况，为了使网页能够正常工作，Kuboard Proxy、kubectl proxy 都对代理的响应结果做了 **Rebase**，即修改 base 的路径，修改 `/` 的路径。Rebase 之后，浏览器通过 Kuboard Proxy 实际获取到的 HTML 代码如下所示，这时，该网页所有依赖的资源就可以正常加载，网页也就可以正常工作了：

``` html {3,6,11,14}
<!doctype html>
<head>
  <base href="/proxy/http/example/cloud-eureka/:/9200/">
  <meta charset="utf-8">
  <title>Eureka</title>
  <link rel="stylesheet" href="eureka/css/wro.css">
</head>
<body id="one">
...
    <li>
      <a href="/proxy/http/example/cloud-eureka/:/9200/lastn">Last 1000 since startup</a>
    </li>
...
    <script type="text/javascript" src="eureka/js/wro.js" ></script>
...
  </body>
</html>
```

## Kuboard Proxy 怎样做 Rebase

Kuboard Proxy 针对 `text/html` / `application/javascript` 这两种类型的响应内容做了如下形式的文本替换：
| 替换前  | 替换后 | kubectl proxy |
|--------|-------|---------------|
|`src="/`  | `src="/proxy/http/example/web-example/:/80/` | 替换 |
|`src=/`  | `src=/proxy/http/example/web-example/:/80/` | 替换 |
|`href="/`  | `href="/proxy/http/example/web-example/:/80/` | 替换 |
|`href=/`  | `href=/proxy/http/example/web-example/:/80/` | 替换 |
|`baseURL="/`  | `baseURL="/proxy/http/example/web-example/:/80/` | 不替换 |
|`baseURL=/`  | `baseURL=/proxy/http/example/web-example/:/80/` | 不替换 |

> * kubectl proxy 只替换了 `text/html` 类型响应中的 `src="/`、`src=/`、`href="/`、`href=/`；
> * Kuboard Proxy 额外处理了 `application/javascript` 类型的响应，并且替换了 `baseURL="/`、和 `baseURL=/`，以应对使用 [axios](http://www.axios-js.com/) 作为 http 库的前端网站，例如 [导入 example](../example/import.html) 中导入的 web-example 服务的页面，在 Kuboard Proxy 中就可以正常通过 Restful 接口获取到动态数据，而如果通过 kubectl proxy，则获取不到的动态数据；

::: warning 风险
由于对 `text/html` / `application/javascript` 这两种类型的响应做了简单的纯文本搜索和替换，不排除可能会发生不恰当替换的风险，例如：
* html 页面中的出现了文本内容（不是 html 标签） `src="/`、`href=/` 等，该内容也将被替换掉；
* 如果您通过 KuboardProxy 进行 Restful 接口调用，不存在此风险，因为 Restful 接口的响应类型是 `application/json`
:::

## Kuboard Proxy 禁用 Rebase

在少数情况下，您可能需要禁用 Rebase：
* 您的 Web 页面非常好地处理了部署在不同 web 上下文时的情况，例如：[通过 Kuboard-Proxy 实现 Kuboard 与 Grafana 的单点登录](./auth-proxy.html)。

禁用 Rebase 的步骤，请参考 [KuboardProxy 代理配置](./#代理配置)
