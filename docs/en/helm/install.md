---
description: "Install a Helm Release: enter the installation wizard from the Helm Release list or the Chart Marketplace, choose a Chart and version, specify the Release name and namespace, configure values (YAML or a values-schema based form), dry-run and wait and other advanced options, then submit and watch the installation progress in real time through the event stream"
---

# Install Helm Release

When you want to install a Chart into a namespace, use the "Install Release" wizard. One installation creates a Release (Helm's encapsulation of a single installation), which can then be viewed and managed in the [Release List](./releases).

## Entry

The installation wizard has two entry points; choose either one to suit your habit:

| Entry | Path | Best suited for |
| --- | --- | --- |
| **Install Release** button in the top-right of the Helm Release list page | Cluster → Application Management → Helm Release → Release List | The Chart to install is already determined (fill in the name manually) |
| **Install This Chart** button on the Chart Marketplace detail page | Cluster → Application Management → Chart Marketplace → View Details | Browse the marketplace first, then install (the Chart and values are brought in automatically) |

When entering from the marketplace, the wizard **automatically pre-fills** the Chart name, the currently selected Chart version, and the default values of that version; you only need to confirm the Release name and similar information before submitting.

::: tip Permission requirements
Opening the installation wizard requires `create` permission on the namespace-level `helm.kuboard.cn` `releases` resource. If not authorized, the **Install Release** button on the list page is not shown.
:::

## Filling in the Installation Wizard

The form fields on the page are as follows:

| Field | Required | Description |
| --- | --- | --- |
| Cluster | Required | Defaults to the first cluster the current user can access |
| Namespace | Required | Defaults to `default`, can be switched to another namespace |
| Chart Name | Required | Format is `repository/Chart`, e.g. `bitnami/redis` |
| Chart Version | Optional | Leave empty to use the latest version of the Chart |
| Release Name | Required | Must be unique within the same namespace |
| Timeout (seconds) | Optional | 30 – 3600 seconds, default 300; the installation is judged to have failed when this is exceeded |
| Options | — | See "Advanced Options" below |
| Values (YAML) | Optional | Overrides the Chart's default configuration, see "Configuring values" below |

<!-- screenshot-todo: full view of the installation wizard page (Cluster / Namespace / Chart Name / Version / Release Name / Timeout / option checkboxes + the Values editor) -->

### Choosing the Chart Source and Version

- **Pick from the marketplace**: find the target Chart in the Chart Marketplace → click **View Details** → select a version on the right → click **Install This Chart**, and the wizard automatically brings in the Chart and version;
- **Specify manually**: after entering the wizard from the list page, directly fill in a name in the `repository/Chart` format. The Chart name must actually exist in the Chart repositories (repo) already added to your cluster, otherwise the installation fails.

After filling in the Chart name and selecting the cluster and namespace, the wizard tries to fetch that Chart's values-schema from the marketplace; if it succeeds, the Values editor gains a "Form" mode (see below).

::: tip Release name auto-generation
When a Chart is brought in from the marketplace, the Release name is automatically pre-filled as the last segment of the Chart name (converted to lowercase, non-alphanumeric characters replaced with `-`). For example, Chart `bitnami/redis` → default Release name `redis`. You can change it.
:::

### Configuring values

Values are the parameters passed to the Chart, used to override the Chart's default configuration. The wizard provides two editing modes:

- **Direct YAML editing**: always available; edit the YAML text directly;
- **Form mode**: available only when the wizard successfully fetches that Chart's values-schema. In this case the **Form / YAML** tabs appear above the Values area, and the two editing modes stay bidirectionally synchronized when you switch between them.

In Form mode, fields are rendered into the corresponding controls by field type:

| Schema field type | Form control |
| --- | --- |
| string | Text input |
| number | Numeric input (follows the schema's min / max limits) |
| boolean | Toggle switch |
| enum | Dropdown selection |
| object | Collapsible group, child fields expand level by level |
| array | Array list, **+ Add Item** to add items and delete items one by one |

Fields marked **Required** in the form come from the schema's required declaration; the field description text is used as the placeholder hint of the input.

::: warning Schema nesting too deep
When fields are nested more than 5 levels deep, Form mode prompts "Schema nesting is too deep. Consider using YAML editor." In this case switch to the **YAML** tab and write the configuration directly.
:::

### Advanced Options

| Option | Default | Effect |
| --- | --- | --- |
| Auto-create Namespace | Off | Automatically creates the target namespace when it does not exist (corresponds to Helm's `--create-namespace`) |
| Wait for ready | On | Waits until the application is ready before judging the installation complete, and shows the readiness status of each resource in real time on the progress page (corresponds to Helm's `--wait`) |
| Dry-Run Only | Off | Only validates the template and configuration without actually creating any resources (corresponds to Helm's `--dry-run`) |

Keep **Wait for ready** enabled when installing new applications, so that the progress page intuitively shows the creation and readiness of each resource; if you only care whether the installation succeeded, you can disable it to speed up the return.

::: tip Values automatically restored after a failed dry-run
If validation fails after checking **Dry-Run Only** (e.g. a values configuration error), the values you edited are saved temporarily and automatically restored the next time you enter the installation wizard within 30 minutes — no need to fill them in again.
:::

## What Happens After Submitting

After clicking **Install**, the wizard submits the request for asynchronous execution in the backend, and the page jumps to the **Operation Progress** page (which shares the same event-stream mechanism with uninstall and upgrade, see [Operation Events](./events) for details):

1. **Submit and return immediately**: the installation task runs in the backend via an event stream (SSE), and the page receives progress in real time without waiting for the request to return;
2. **Progress display**: the progress page contains three parts —
   - **Progress bar**: shows the elapsed time and the total timeout;
   - **Resource status**: lists the resources being created row by row (type, name, status; Deployments additionally show `ready replicas / desired replicas`);
   - **Log panel**: scrolls the real-time logs of the helm command, with failed lines marked red and completed lines marked green;
3. **Installation result**:
   - Success: the status tag becomes **Completed**; click **View Release** to go to that Release's detail page; click **Back to Releases** to return to the list, where the new Release now appears (status `deployed`);
   - Failure: the status tag becomes **Failed**; the specific error can be seen in the log panel, then adjust the Chart version, values, or permissions and retry.

<!-- screenshot-todo: operation progress page (progress bar + resource status list + real-time log panel, with the "View Release / Back to Releases" buttons) -->

::: warning Canceling mid-way
The **Cancel Operation** button in the top-right of the progress page can terminate the installation. After canceling, the resources already created before the cancellation are **not deleted automatically** and must be cleaned up manually.
:::

## Common Notes

- **Release names are unique within a namespace**: two Releases with the same name are not allowed in the same namespace. If you install using an existing name, helm reports an error directly (`release already exists`), and the progress page log shows the failure. Different namespaces do not affect each other, so Releases with the same name can exist;
- **Leaving the version empty means the latest version**, but the latest version may contain incompatible changes; for production environments it is recommended to explicitly specify a version;
- **values take effect only once, at installation time**: modifying values after installation requires going through [Upgrade](./upgrade-rollback), rather than reinstalling;
- A failed installation produces no Release record (or leaves only a `failed` status record); you can confirm this in the Release list.
