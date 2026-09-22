---
description: "Meaning, entry point, default values, and how each System Settings tab takes effect: login, password policy, MFA, OIDC, Webhook, JWT, audit, cluster cache, menu items, MCP, site interface, log levels, and node shell."
---

# Kuboard System Settings

This page is for administrators. It covers system-level configuration: where each setting is changed, what its default value is, and how the change takes effect.

## How to Open

Entry: left menu → **Settings → System Settings**. The page lists all configuration as tabs on the left side. Saving changes on the page requires **administrator privileges**.

| Interface tab (Settings → System Settings) | Configures | Notes |
|---|---|---|
| Log Parameter Settings | Log levels | Normal / lowest / sync-task log levels |
| JWT Token | Login token secret | Only offers a "Regenerate" button |
| Cluster Cache Settings | Cluster sync and resource cache | Sync thread pool + cache method per resource |
| User Login Settings | Login, password, MFA, OIDC | The most complex; split across multiple cards |
| Audit Policy Settings | Audit switch and rules | Three rule scopes: Kuboard / cluster / namespace |
| Interface Settings | Site and terminal theme | Title, icon, footer, GA |
| Node Shell | Node debug Pod | Image, namespace, session duration |
| Menu Item Settings | Disablable resources and menu items | Tree checkboxes; refresh the menu after saving |
| MCP Server | MCP service and Prometheus tools | Switch, rate limit, approval |

## Configuration Overview

| Configuration category | Default value | How it takes effect after saving |
|---|---|---|
| Login sessions | Session 30 minutes; multi-window login off; MFA off; OIDC off | Immediately (applies to new sessions) |
| Password policy | 6–24 characters including uppercase, lowercase, and digits; lock for 60 minutes after 5 failures | Immediately |
| JWT Token | Generated automatically at first install | After regeneration **all users are forced to log in again** |
| OIDC encryption key | Generated automatically at first start (no UI) | After rotation, historical ciphertext cannot be decrypted |
| Audit | Recorded to database; file logging off; retained 6 months | Immediately |
| Cluster cache sync | Thread pool 10/200; about 32 resources via watch/polling | Immediately |
| System cache | Internal cache, no UI | — |
| Menu and resources | 21 K8s resources disabled by default | Immediately (after refreshing the menu) |
| MCP Server | Master switch off; approval for write operations on; Prometheus tools on | Immediately; **per-user SSE subscription cap requires a restart** |
| Site interface | Title Kuboard; GA on | **Refresh the page** after saving |
| Log levels | Normal INFO; lowest TRACE; sync-task INFO | Immediately |
| Node Shell | Image netshoot; namespace kube-system; TTL 3600 seconds | Applies to new sessions |

::: warning How changes take effect differs
After saving, most configuration **takes effect immediately** (the server clears the corresponding configuration cache). The only exceptions:
- **Interface Settings**: refresh the browser page after saving to see the new title / icon / terminal theme;
- **JWT Token regeneration**: all online users are forcibly logged out and must sign in again;
- **Per-user MCP SSE subscription cap**: restart the Kuboard service after saving;
- **Log levels**: effective immediately without a restart, but log lines already written do not change.
:::

## Login and Authentication

Entry: **Settings → System Settings → User Login Settings**, shown as cards "General Settings / Password Policy / MFA Settings / OIDC SSO / External User Repository".

### General Settings and Sessions

| Setting | Default | Description |
|---|---|---|
| Session timeout (minutes) | 30 | Applies to sessions established afterwards; re-login required after timeout |
| Allow multi-window login | Off | When off, logging in again with the same account kicks the previous session; when on, multiple browsers / tabs can stay online at once |

### Password Policy

| Setting | Default | Description |
|---|---|---|
| Password length | 6–24 characters | Validated when creating and changing passwords |
| Character mix | Uppercase / lowercase / digits on, special characters off | Combination requirement |
| Initial password validity (days) | 3 | When creating a user or resetting a password, expiry is set to N days later |
| Validity after changing password (days) | 90 | Validity of a password changed by the user themselves |
| Lock after failed attempts | Lock for 60 minutes after 5 failures | Account locked once the limit is reached |
| No reuse of recent passwords | 3 | New password must differ from the last N passwords |

### MFA (Multi-Factor Authentication)

| Setting | Default | Description |
|---|---|---|
| Enable MFA | Off | When on, a second TOTP one-time-password verification is added |
| Force binding | Off | When on, users must complete binding before they can log in |
| Enable recovery codes | On | Allows generating recovery codes, so a lost device does not lock you out |

### OIDC SSO

The "OIDC SSO" card lets you maintain **multiple IdPs** (identity providers); add, edit, enable, or disable each one:

- Basic settings: display name, enable/disable, IdP type (Generic / Keycloak / Authing / Alibaba Cloud IDaaS / Tencent Cloud CIAM / Entra ID / Okta / Auth0 / GitLab / WeCom / Feishu);
- Discovery and client: backend Issuer, browser Issuer, Client ID, Client Secret (leave blank to keep the current value); a connection test is provided;
- Claims and advanced: username / email / display-name claim mapping, email trust, MFA policy, group sync.

### External User Repository (Webhook)

| Setting | Default | Description |
|---|---|---|
| Enable external user Webhook | Off | When on, username / password are validated by an external Webhook service |
| External user Webhook URL | Empty | Required when enabled |

### JWT Token

Entry: **Settings → System Settings → JWT Token**. This shows the JWT public/private keys (read-only; the private key is redacted), and the only operation is **Regenerate**. After regeneration **all logged-in users are forcibly logged out**. When multiple instances share the same database, keep the key consistent; regular rotation is generally unnecessary.

## Audit

Entry: **Settings → System Settings → Audit Policy Settings**. The audit log only records operations **performed through the Kuboard UI or the Kuboard API**; it does not cover external K8s management tools such as kubectl.

### Log Persistence

| Setting | Default | Description |
|---|---|---|
| Record to database | On | Auto-cleaned by retention period |
| Record to file | Off | Written to the log directory inside the container |
| Retention period (months) | 6 | Database logs only; 0 means never auto-deleted |
| Max request body length | 4096 | File logs only; excess is not recorded |
| Max response body length | 4096 | File logs only |

### Audit Rules

Audit rules are maintained separately for the three scopes **Kuboard / cluster / namespace**. A rule contains:

| Dimension | Values | Description |
|---|---|---|
| Action | Record / Don't record | The action taken when a rule matches; later rules are ignored |
| Resource | e.g. deployments, pods/exec; `*` means all | Resource name; an API group (e.g. apps) can be scoped |
| Verb | get / list / create / update / delete | Operation verb |
| Scope | cluster: clusters; namespace: the matching cluster + namespaces | Limits the scope of the rule |

Rules are matched **top-down, one by one; the first matching rule wins**. If no rule matches, the default action is **record**. Rule cards can be reordered by drag-and-drop, and the whole rule set can be exported / imported (JSON).

Default rules on a fresh install (editable in the UI):

- Kuboard scope: read operations not recorded; login-token refresh not recorded; MCP subsystem reads not recorded, writes recorded;
- Cluster scope: read operations not recorded;
- Namespace scope: exec (enter container) recorded, other read operations not recorded.

## Cluster Sync and Resource Cache

Entry: **Settings → System Settings → Cluster Cache Settings**. Kuboard syncs commonly used cluster resources into a local cache; the UI and API read from this cache to improve response speed.

### Sync Parameters

| Setting | Default | Description |
|---|---|---|
| Core threads | 10 | Resident threads of the sync thread pool |
| Max threads | 200 | Peak concurrency ceiling; not below the core count |
| Full sync task timeout (minutes) | 5 | A task not finished in time is restarted |
| Full sync retry interval (minutes) | 1 | Minimum delay for failed tasks |
| Retry validity (minutes) | 30 | No further retries after this period |
| Incremental listen cycle (seconds) | 300 | Watch connection rebuilt after timeout |
| Reset unfinished incremental task (minutes) | 10 | If an incremental task is stuck beyond this, restart a full sync |

### Cache Object Settings

| Dimension | Description |
|---|---|
| Resource key | e.g. `apps / deployments` |
| Sync method | Real-time watch (push) or polling (pull at an interval) |
| Poll interval (minutes) | Only needed for polling |
| Delayed deletion (hours) | Only for `events` resources: kept locally for extra time after deletion on the K8s side (7 days by default) |

A fresh install caches about 32 resources by default: Pod, Deployment, StatefulSet, DaemonSet, etc. are watched in real time; Service, ConfigMap, Secret, Ingress, RBAC, etc. are polled every 5 minutes; admission webhook configurations, FlowControl, RuntimeClass, etc. are polled every 300 minutes; DRA (Dynamic Resource Allocation) resources are watched in real time.

## Menu and Resource Enable/Disable

Entry: **Settings → System Settings → Menu Item Settings**. The page shows the Kuboard menu and all K8s resources as a tree: checked means **enabled** (visible in the UI), unchecked means **disabled** (hidden from the menu). Resources marked "core" cannot be disabled; the menu cache is cleared as soon as you save, so refresh the page to see the effect; the search box filters by title / path.

On a fresh install, 21 uncommon K8s resources are disabled by default, including RuntimeClass, VolumeSnapshot (snapshots), CSI-related items, admission webhook configurations, FlowControl, Lease, PriorityClass, PodDisruptionBudget, EndpointSlice, and DRA-related resources.

## MCP Server

Entry: **Settings → System Settings → MCP Server**. MCP Server exposes Kuboard capabilities (K8s read/write, Prometheus queries, change-plan approval, etc.) to AI clients as MCP (Model Context Protocol) tools, at the endpoint `<Kuboard access URL>/mcp`.

| Setting | Default | Description |
|---|---|---|
| Enable MCP Server | Off | When off, `/mcp` returns 404 |
| Force approval for Agent write operations | On | Writes are first dry-run and staged as a plan, then executed after manual approval in the UI; when off they execute immediately — keep on in production |
| CORS allowed Origins | Empty (all cross-origin rejected) | Browser-side cross-origin allowlist, exact Origin match |
| Max bytes per request body | 10MB | Requests over this are rejected |
| Per-user rate limit | 50 per 60 seconds | Sliding window; returns HTTP 429 when exceeded |
| Max SSE subscriptions per user | 100 | **Requires a service restart after saving** |

### Prometheus Tools

| Setting | Default | Description |
|---|---|---|
| Enable Prometheus tools | On | When off, calls return "no service found" |
| Max series per instant query | 10000 | Prevents large queries from overwhelming Prometheus |
| Max points per range query | 100000 | series × time points |
| Query timeout (seconds) | 30 | Prometheus HTTP query timeout |
| Per-query RBAC authorization | On | Each query resource is permission-checked individually |
| Aggregation query policy | Allowed with per-dimension authorization | Alternatives: "deny aggregation" and "cluster-scope only" |
| Aggregation query rate-limit multiplier | 5× | Rate limit as a multiple of the normal query limit |
| Max dimension expansion for aggregation | 100 | Max namespace / node dimensions expanded per aggregation |
| Per-cluster service discovery | Empty | Overrides service-discovery rules per cluster |

## Site Interface

Entry: **Settings → System Settings → Interface Settings**. After saving site info, **refresh the browser page** to see the new title, icon, and footer.

| Setting | Default | Description |
|---|---|---|
| Page title / product name | Kuboard / Kubernetes multi-cluster management | Shown on the login page and browser tab |
| Footer text | Official site domain by default | Can be changed to your own site domain |
| System icon | Built-in icon | Upload JPG/PNG (≤50KB) |
| Google Analytics | Enabled | Collects anonymous usage data; no sensitive cluster data |
| Terminal font size / line spacing | 14 / 1.2 | Terminal display |
| Terminal theme type / name | dark / AtelierSulphurpool | Applies to new terminal sessions opened afterwards |
| Terminal log lines | 500 | Max log lines echoed in the terminal |

## Log Levels

Entry: **Settings → System Settings → Log Parameter Settings**. Takes effect **immediately on save**, no restart needed.

| Setting | Default | Description |
|---|---|---|
| Normal log level | INFO | Level for normal requests |
| Lowest log level | TRACE | The lowest allowed level; usually for temporary troubleshooting |
| Sync-task log level | INFO | Cluster cache sync tasks; ERROR is recommended in the UI to avoid log flooding |
| Error stack trace to console | On | Exception stack printed to stdout |
| Error stack trace in response | Off | Returned to the client; for debugging only |

## Node Shell

Entry: **Settings → System Settings → Node Shell**. Node Shell creates a privileged debug Pod on the target node and accesses the node's filesystem, processes, and network namespace through a container terminal. The following parameters apply globally:

| Setting | Default | Description |
|---|---|---|
| Image | nicolaka/netshoot | Image used to create the debug Pod |
| Start command | sleep infinity | Keeps the container alive so you can enter it |
| Namespace | kube-system | Where the debug Pod is created (must exist and be permitted) |
| Session duration (seconds) | 3600 | Session expires after the timeout; the Pod is cleaned up automatically |
| Resource limits | Requests 100m CPU / 128Mi memory; limits 500m CPU / 512Mi memory | Resource requests and caps for the debug Pod |

## Settings Without UI

| Setting | Description |
|---|---|
| System cache | Internal in-memory cache (Caffeine); default capacity 50–500 entries, expiry 5–30 minutes; not configurable in the UI — keep the defaults |
| OIDC encryption key | Generated automatically at first start; used to encrypt IdP clientSecret and tokens. **Back it up from the database before enabling OIDC**; rotation makes historical ciphertext undecryptable |

## Related Pages

- [User Login](../user/login) (session timeout, multi-window login, external user repository)
- [Password Policy and Changing Passwords](../user/password)
- [MFA Multi-Factor Authentication](../user/mfa)
- [OIDC Single Sign-On](../user/oidc)
- [Disabling Menu Items](./menu-disable)
- [MCP Server](../mcp/index)