---
description: "How to access the Kuboard V4 Swagger UI and OpenAPI description files, and the purpose and Swagger UI display names of the 5 API groups"
---

# Kuboard V4 API Documentation (Swagger UI / OpenAPI)

This page explains where to access the Kuboard V4 API documentation (Swagger UI and OpenAPI description), and which functional domains the 5 API groups cover.

**Intended audience**: developers who need to browse and debug Kuboard APIs. The API service shares the same address and port as the Web console (see [Ports](../install/quickstart#ports)), so you can just visit the Kuboard address directly in your browser.

## Access Entry Points

| Entry | Address | Purpose |
| --- | --- | --- |
| Swagger UI | `http://<kuboard-address>/swagger-ui/index.html` | Visual interface for browsing and debugging APIs by group |
| OpenAPI description | `http://<kuboard-address>/v3/api-docs` | Complete OpenAPI JSON description |
| Group description | `http://<kuboard-address>/v3/api-docs/{group-name}` | OpenAPI JSON for a single group; `{group-name}` is listed in the table below |

::: tip Access and debugging
The documentation pages can be opened without logging in; when you actually call an API by clicking "Try it out", you need to log in first and carry an access credential.
:::

## API Groups

Swagger UI organizes the APIs into 5 groups (Groups), and each group corresponds to one category of API:

| Group name (used in URL) | Display name in Swagger UI | Functional domain covered |
| --- | --- | --- |
| login.kuboard.cn | Login APIs | Login/logout, MFA, access key (AccessKey) management, and user info and menu after login |
| auth.kuboard.cn | Permission Management APIs | User, role, user group and permission management, OIDC configuration |
| cluster.kuboard.cn | Cluster Management APIs | Cluster CRUD, cluster cache, Kubernetes capability detection |
| cd.kuboard.cn | Continuous Delivery APIs | Continuous Delivery: updating workload images, restarting workloads, etc. |
| config.kuboard.cn | System Configuration APIs | Reading and modifying system configuration |

The actual APIs are whatever the Swagger UI shows; this page does not enumerate them one by one.

::: warning APIs not in any group
Swagger groups are not the same as the authorization groups used internally by the APIs. MCP, Helm, audit, Kubernetes direct connection, anonymous APIs, etc. have **no** dedicated group, so they do not appear in the table above and are not shown in the Swagger UI.
:::

::: tip Disabling the API documentation
Set the environment variable `KUBOARD_SWAGGER_ENABLED=false` to disable Swagger UI and `/v3/api-docs` entirely (enabled by default). For a complete description of environment variables, see [Environment Variables](./kuboard-env).
:::