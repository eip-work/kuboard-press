---
description: "Kuboard Proxy cluster reverse proxy: temporarily establish a browser/curl access channel for Services without an external access entry in the cluster for troubleshooting and debugging, without exposing a NodePort or LoadBalancer"
---

# Cluster Reverse Proxy (Kuboard Proxy)

Kuboard Proxy provides a temporary access channel for Services in the cluster that have no external access entry: open its web UI in a browser, or call its APIs with curl.

::: warning Temporary diagnostic tool
Kuboard Proxy is intended for **temporary diagnosis**, not a way to publish a service externally. For formal external access, use [Services and Ingress](../guide/network/services-ingress).
:::

## Applicable Scenarios

- **Service has no external entry**: a ClusterIP Service can only be accessed inside the cluster; view its web UI from a browser (e.g., Grafana, Prometheus, or other admin consoles)
- **Troubleshooting**: the service is behaving abnormally; access its port directly via http/https to observe the responses
- **API debugging**: call the service port directly with curl to verify API behavior
- **Identity passthrough**: the target service needs to know who the currently logged-in user is (via username/group name header injection)

## Prerequisites

- Your account must have the **`get` permission on `services/proxy`** in the target Namespace to open the proxy; modifying the proxy configuration additionally requires the **`update` permission**. Without permission, the **Proxy** button in the port list is not visible — ask your administrator to grant it in [Roles and Permissions](../user/roles).
- The protocol of the target Service must be **TCP** (ports such as UDP do not provide a proxy entry).
- The application running on the target port must be able to handle the **http or https** protocol you choose. Kuboard Proxy only forwards traffic; it does not perform protocol conversion.

## Opening the Proxy

**Entry:** Cluster → Namespace → **Service** → Service detail page.

1. Go to the **detail page** of the target Service and scroll down to the **Ports** table;
2. In the **Access** column of the row for the target port, click the **Proxy** button;
3. The **Access via KuboardProxy** dialog opens (with a "For troubleshooting" tag next to the title).

<!-- screenshot-todo: Service detail page port table with the "Proxy" button (same as zh kuboard-proxy.assets/ops-kuboard-proxy-2.png, capture in English UI) -->

## Completing the Proxy Configuration in the Dialog

<!-- screenshot-todo: "Access via KuboardProxy" dialog (same as zh kuboard-proxy.assets/ops-kuboard-proxy-1.png, capture in English UI) -->

### Proxy Configuration Info

Shown only when the target is a Service; lists the effective configuration of the current proxy:

| Configuration Item | Description | Default Value |
| --- | --- | --- |
| Username to Header | Injects the current logged-in username into the specified request header for the target service to identify the user | Not set |
| Group name to Header | Injects the current logged-in user's user group into the specified request header | Not set |
| Cookie TTL (seconds) | Validity period of the proxy session | 3600 seconds |
| Disable Rebase | Whether to disable automatic rewriting of links inside HTML pages | false |

Click **Modify KuboardProxy Settings** to adjust the above configuration (requires the `update` permission; when the proxy target is a Pod, only the fixed default settings are supported — modification is not supported, nor is username/group name header injection). These settings are saved to the Service object as annotations and take effect only on the configured port. For example, to configure username/group name passthrough and a 2-hour session for port 3000:

```yaml
metadata:
  annotations:
    proxy.kuboard.cn/auth-header-user-3000: X-WEBAUTH-USER
    proxy.kuboard.cn/auth-header-groups-3000: X-WEBAUTH-GROUPS
    proxy.kuboard.cn/cookie-ttl-3000: "7200"
```

::: tip What is Rebase
Links in the proxied page that point to the service itself are rewritten by Kuboard so that they keep going through the proxy channel; this is called Rebase. Most pages do not need to worry about it; if a particular page stops working after rewriting (e.g., a frontend router uses absolute paths), enable "Disable Rebase" and try again.
:::

### Access the Proxy Target

**Step 1: Choose the protocol and access path**: choose `http` or `https` based on the application running on the target port; the path defaults to `/` and can be set to a specific one (e.g., `/graph`).

**Step 2: Choose the access method**: open the proxy address in a new browser window, or access it with curl (a copyable command pops up).

## Access Methods

### Browser Access

Click **Open in a browser window**; a new browser window loads the proxy address:

```
/k8s-proxy/<cluster-name>/api/v1/namespaces/<namespace>/services/http:<service-name>:<port>/proxy/<path>
```

### curl Access

Click **Access with curl**, and run the copied command on any machine that can reach Kuboard (the token and signature are generated and filled in by Kuboard automatically; you do not need to construct them manually):

```sh
curl -X GET -i \
  --cookie "KuboardToken=<your-token>; KuboardProxy=<proxy-signature>" \
  https://<kuboard-host>/k8s-proxy/<cluster-name>/api/v1/namespaces/<namespace>/services/http:<service-name>:<port>/proxy/<path>
```

::: tip curl uses the same proxy channel
curl and the browser use the same proxy channel and are equally subject to the Cookie TTL and permission constraints. `Kuboard-Proxy-Status: Success` in the response headers means the request went through Kuboard Proxy.
:::

## Validity Period of the Proxy Session

The proxy session depends on the **KuboardProxy Cookie** in the browser. The proxy will refuse access once any of the following happens:

- **Cookie TTL exceeded**: 3600 seconds by default (adjustable in the proxy configuration);
- **Browser session invalidated**: the cookie expires once the browser is closed.

If access is refused, go back to the Service detail page and click the **Proxy** button again to rebuild the session.

::: warning Session bound to the user
The proxy signature contains the identity information of the currently logged-in user and is bound to the target service and port. Do **not** share the proxy address or the curl command with others.
:::

## FAQ

| Symptom | Resolution |
| --- | --- |
| The **Proxy** button is unavailable | Check whether you have the `get` permission on `services/proxy`, and whether the Service type is ExternalName |
| The page opens but navigation/resource loading fails | The target port protocol does not match the actual protocol of the page, or the page uses absolute paths; try changing the protocol or enabling "Disable Rebase" |
| Prompt that the proxy has expired / access was refused | The cookie expired or the browser was closed; click the **Proxy** button again |
| The target service does not receive the request headers | Confirm that the username/group name headers are set in the proxy configuration, and that the port numbers match |

## Related Topics

- [Services and Ingress](../guide/network/services-ingress): the recommended way to publish services externally
- [Terminal](./terminal): get into a container to troubleshoot issues
- [File Browser](./file-browser): browse files inside a container directly