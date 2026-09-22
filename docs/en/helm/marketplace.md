---
description: "In the Kuboard Chart Marketplace, browse and search Helm Charts, view details (README / default values / Chart metadata), manage Helm repositories (add, edit, delete, refresh), and jump to the installation page with one click."
---

# Chart Marketplace

Kuboard ships with a built-in **Chart Marketplace**, which lets you browse and search available Helm Charts just like browsing an app store (a Chart is Helm's installable package, containing a set of Kubernetes resource templates and default configuration), view each Chart's documentation, default values (the default parameters in values.yaml) and metadata, and then jump to the installation page with one click to complete the deployment.

This article is for users who want to find a ready-made Chart and install it. It covers the complete flow from entering the marketplace, browsing and filtering, viewing details, and managing repositories, to landing on the installation page. For operations on the installation page, see [Install Helm Release](./install).

## Enter the Marketplace

1. In the left menu, select the target **cluster**, then go to **Application Management → Helm Release → Marketplace Browse**.

   | Menu level | Description |
   |---|---|
   | Application Management | The "Application Management" group in the left navigation |
   | Helm Release | The "Helm Release" submenu under Application Management |
   | Marketplace Browse | The Chart marketplace page, showing the list of installable Charts |

2. Once opened, you are on the Chart marketplace home page, which by default shows all available Charts.

<!-- screenshot-todo: full view of the marketplace browse page (top toolbar + Chart card grid) -->

::: tip
The visibility of the marketplace page depends on your permissions: regular members can only see repositories with a status of ready and the Charts in them; viewing the repository list additionally requires the `list` permission on the `chart-repos` resource under `helm.kuboard.cn`.
:::

## Browse the Chart Marketplace

The marketplace home page displays Charts in a card grid. Each card contains:

| Card content | Description |
|---|---|
| Chart name | In the form `bitnami/redis`, i.e. `repository name / Chart name` |
| Version | The version number of the Chart itself, e.g. `v19.6.1` |
| App version (appVersion) | The version number of the application deployed by the Chart, e.g. `7.2.4` |
| Repository source | The name of the Helm repository (Repository) the Chart belongs to |
| Description | A one-sentence description of the Chart (truncated automatically when it exceeds two lines) |

Click anywhere on a card, or the **View Details** button on it, to open that Chart's details drawer.

### Search and Filter

The top toolbar provides two ways to find Charts, which can be used in combination:

1. **Filter by repository**: click the "Repository" dropdown and select a repository to refresh the list immediately, showing only the Charts in that repository; select "All Repositories" to restore the full list.
2. **Search by keyword**: type a name keyword (e.g. `redis`, `nginx`) in the search box, then press Enter or click the **Search** button to filter the list.
3. **Refresh**: click the **Refresh** button to reload the repository list and the Chart list (right after a repository has been added or refreshed, use it to make the marketplace page show the latest data).

::: tip
Search and filtering are done server-side: the `keyword` (name keyword) and `repoName` (repository name) conditions are passed in. Both take effect at the same time, for example "search for redis in the bitnami repository".
:::

<!-- screenshot-todo: top toolbar of the marketplace page (repository dropdown + search box + search / refresh / repository management buttons) -->

## View Chart Details

The details slide out from the right in a drawer. From top to bottom:

| Section | What to look at | Purpose |
|---|---|---|
| Chart header | Icon, Chart name, version, app version | Quickly confirm the target Chart |
| Chart metadata (Chart.yaml) | type, version, appVersion, home, keywords, kubeVersion | Learn the Chart type, applicable Kubernetes versions, keywords and official homepage |
| Maintainers / source code / dependencies | maintainers, sources, dependencies | Contact maintainers or view the source code when needed; expand the Dependencies card as needed to view each sub-Chart's version, repository and enablement conditions |
| Full description | The Chart's long description text | Understand what the Chart is for |
| Compatibility notice | Cluster version vs the kubeVersion required by the Chart | When the versions do not match, a yellow warning bar shows "the current cluster vX does not meet this Chart's version requirement" |
| README | The Chart's built-in documentation (rendered from Markdown) | Must-read before installing: default behavior, prerequisites, common parameter descriptions |
| Default values | The Chart's built-in default values.yaml | Anticipate which parameters can be tuned at install time (the installation page pre-fills these defaults) |

::: tip
The detail content is read in real time server-side via `helm show readme` / `helm show values` / `helm show chart`; the README and values both come from the currently selected version of the Chart.
:::

### Select a Version

1. The "Version" dropdown near the top of the details page lists **all historical versions** of the Chart, with the latest version selected by default (the first item in the list).
2. After switching versions, the README, default values and Chart metadata **refresh in sync** to that version's content.
3. Pay attention to the selected version's kubeVersion constraint: if the Kubernetes version of the target cluster does not meet the requirement, the page shows a yellow compatibility warning — in that case, switch to a compatible version before installing.

<!-- screenshot-todo: Chart details drawer (header + metadata card + version dropdown + README section + default values section) -->

## Manage Helm Repositories

All Charts in the marketplace come from Helm repositories (Repository, the remote indexing service that stores Chart packages). On first use, the repository list is empty and you need to add repositories first; after adding, you can edit, delete or refresh them at any time.

1. Click the **Repository Management** button at the top right of the marketplace browse page to open the repository management drawer (this button requires the `create` permission on the `chart-repos` resource).
2. The drawer lists all repositories as cards. Each card shows:

   | Info | Description |
   |---|---|
   | Name / URL | Repository identifier and address |
   | Status | `ready` / `refreshing` / `pending` / `failed` |
   | Chart count | The total number of Charts currently indexed in the repository |
   | Last updated | The time of the last successful refresh |
   | Error message | The reason for a failed refresh (shown in red) |

### Add a Repository

1. Click the **Add** button at the top of the drawer.
2. Fill in the repository information in the form:

   | Field | Required | Description |
   |---|---|---|
   | Preset | No | Dropdown of common public repositories; selecting one auto-fills the name and URL |
   | Name | Yes | Unique identifier of the repository; cannot be changed after creation |
   | URL | Yes | Repository index address, e.g. `https://charts.bitnami.com/bitnami` |
   | Username / password | No | Access credentials for private repositories |
   | Insecure TLS | No | Enable for repositories that use self-signed certificates to skip certificate validation |
   | Pass Credentials | No | Reuse this repository's credentials when downloading dependent sub-Charts |

3. Click **Save**. After a successful add, the repository enters the `pending` / `refreshing` state; the server automatically pulls the repository index, and when it is done, the status changes to `ready` and the Charts become visible on the marketplace page.

**About built-in repositories**: Kuboard does not come with any pre-installed repositories; you must add them on first use. For convenience, the "Preset" dropdown offers 11 common public repositories, which auto-fill the name and URL when selected:

| Preset repository | Address |
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

You can also skip the presets and fill in any valid repository name and URL yourself.

### Edit, Delete and Refresh

- **Refresh**: repository content (new Charts, new versions) is not synced automatically; click the **Refresh** button on the repository card to pull the latest index manually. While refreshing, the button shows a loading state and the status returns to `ready` when done. The marketplace page also provides a global **Refresh** button to reload the list.
- **Edit**: click **Edit** to modify the URL, credentials, etc.; the repository name cannot be changed after creation.
- **Delete**: click **Delete** and confirm in the confirmation dialog to remove the repository and its Charts.

::: warning
- Credentials for private repositories are used only by the server to pull the repository index; after saving, they are not shown in plain text in the list.
- Deleting a repository only removes it and its index from the marketplace; it does not affect Releases that are already installed.
:::

## From the Marketplace to Installation

Click the **Install** button at the bottom of the Chart details drawer, and the page navigates to the [Install Release](./install) page with the following automatically filled in:

1. **Chart**: the full name of the selected Chart (repository name + Chart name); no need to type it manually.
2. **Version**: the version currently selected on the details page.
3. **Default values**: the Chart's default values are pre-filled into the install form as a modifiable starting point (large defaults are also brought in automatically).

Once on the install page, simply select the target cluster and namespace, adjust parameters as needed, and the deployment is complete.
