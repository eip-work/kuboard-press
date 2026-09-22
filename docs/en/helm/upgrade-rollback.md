---
description: "Upgrade an installed Helm Release to a new Chart version, or roll back to a historical Revision when something goes wrong: entry points, target version and values adjustment, Dry-Run preview, rollback confirmation, and notes on how both upgrades and rollbacks generate a new Revision"
---

# Upgrade and Rollback a Release

Helm records every install, upgrade, and rollback as a **Revision**. An **Upgrade** replaces the current deployment with a new Chart version and values; a **Rollback** restores the Release to the content of a historical Revision. Both operations generate a new Revision; after submission, follow the execution result on the [Operation Progress](./events) page.

This page is for users who want to upgrade an installed Release to a newer version, or roll back when something goes wrong. For viewing and comparing Revisions, see [Release List and Revision History](./releases).

## Upgrade a Release

### Entry Points

| Entry Point | Location | Action |
| --- | --- | --- |
| Release list page | Application Management → Helm Release → Release List | Click **Upgrade** in the Actions column of the target row |
| Release detail page | Click the Release name to enter the detail page | Click **Upgrade** in the top-right corner |

Once inside, the "Upgrade Release: `<name>`" page opens.

### Select the Target Chart Version

| Scenario | Behavior |
| --- | --- |
| Chart comes from a repository (the name looks like `repository name/Chart name`) | Version is a dropdown listing all available versions of the Chart (in descending version order); each entry shows the corresponding app version (appVersion), with the current version selected by default |
| Chart has no repository prefix | Version is an input box; manually enter the target version number |

::: tip
When the kubeVersion constraint of the selected version (the Chart's requirement on the Kubernetes version) does not match the current cluster version, a yellow compatibility warning is shown at the top of the page; in this case, switch to a compatible version before upgrading.
:::

### Adjust Values

- The **Values (YAML) editor loads the current Revision's values by default**, so you start from the existing configuration instead of rewriting everything from scratch;
- Whether the editor provides a **form tab** depends on whether the Chart ships a values schema (a description of the parameter structure): when a schema exists, you can switch between the **Form / YAML** tabs (the form renders fields according to the schema, YAML edits the code directly, and the two sides stay in sync in real time); without a schema, only YAML editing is available;
- Editing works exactly the same as on the [Install Release](./install) page.

```yaml
# values snippet: modify on top of the existing configuration
replicaCount: 3        # adjust the replica count
image:
  repository: nginx
  tag: "1.27"          # upgrade the image version
```

### Dry-Run and Submission

Below the form are **Options** and **Timeout**:

| Item | Default | Description |
| --- | --- | --- |
| Wait for ready | Checked | Wait for the Release to be ready after the upgrade finishes before judging it as successful |
| Dry-Run Preview | Unchecked | Preview only, nothing is persisted; verifies that the new version and values combination passes rendering validation |
| Timeout (seconds) | 300 | Range 30 ~ 3600, step 30; applies to waiting for ready |

Order of operations:

1. When you need to validate first, check **Dry-Run Preview** and click **Upgrade**: only a dry-run executes, the Release is not actually changed;
2. Once confirmed, uncheck **Dry-Run Preview** and click **Upgrade** again to submit for real;
3. After submission you are automatically taken to the [Operation Progress](./events) page: you can watch the upgrade progress, resource status, and logs in real time, and click **Cancel Operation** at any point; when done, click **View Release** to return to the detail page.

::: warning Values are restored automatically when Dry-Run fails
When a Dry-Run preview fails, the values you filled in are saved in the browser (valid for 30 minutes); the next time you enter the upgrade page they are filled back automatically, with the hint "Restored values from previous dry-run", so you do not need to re-enter them. Note: **values are saved only when Dry-Run fails**; a failed real upgrade is not saved and does not affect the Release's existing configuration.
:::

### After the Upgrade

- The Release gets a **new Revision**, and the Revision and update time in the metadata of the detail page are refreshed accordingly;
- The upgrade result can be reviewed in the **Revision History** tab of the detail page, and compared with any historical Revision (see [Notes](#notes)).

<!-- screenshot-todo: full upgrade page (Chart version dropdown + compatibility warning + options/timeout + values editor + upgrade button) -->

## Rollback a Release

### Entry Point

The rollback entry is at **Release detail page → Revision History tab**:

1. On the Release list page, click the Release name to enter the detail page;
2. Open the **Revision History** tab; the table lists all historical Revisions (Revision / Updated / Status / Chart / Description);
3. On the row of the target Revision, click **Rollback to this** (for a Revision currently in the deployed state, the button is greyed out and cannot be clicked).

### Select the Target Revision and Confirm

Clicking it opens the rollback confirmation dialog:

| Item | Description |
| --- | --- |
| Target Revision | Dropdown, pre-selected with the Revision you just clicked, switchable; options display `Revision N - Status - Updated` |
| Wait for ready | Enabled by default; after the rollback finishes, wait for the Release to become ready |
| Timeout (seconds) | Default 300, range 30 ~ 3600 |

When the confirmation information is correct, click **Confirm Rollback**; you are automatically taken to the [Operation Progress](./events) page, where you can watch the rollback progress in real time or click **Cancel Operation**.

::: tip
Rollback does not support Dry-Run preview; submission means execution. When you are not sure about the content of the target Revision, first confirm it via the "Compare" function in Revision History (see [Notes](#notes)).
:::

### After the Rollback

- **The rollback itself also generates a new Revision**: Helm does not delete or overwrite any historical Revision; instead it redeploys the content of the target Revision as the newest Revision;
- The Revision on the detail page changes to the new value, and Revision History gains a new row; the target Revision and all earlier records are kept, and you can roll back to any of them again at any time.

<!-- screenshot-todo: rollback confirmation dialog (target Revision dropdown + wait for ready + timeout + confirm rollback button) -->

## Notes

**Check the Diff or confirm values before upgrading**

1. In the **Revision History** tab of the detail page, select two Revisions (at least 2) and click **Compare** to open the Revision Diff dialog;
2. Review the differences in the **Values / Manifest** tabs (Manifest is the complete resource list rendered by that Revision) to make sure the changes you are about to make match your expectations;
3. For an uncertain upgrade, first check **Dry-Run Preview** to validate with a dry-run, then submit for real.

**Behavior of the target Revision on rollback**

- Rolling back to a target Revision redeploys that Revision's values and Manifest as a new Revision; **after the rollback, the content in effect is that of the target Revision**, regardless of the current Revision's status;
- All historical Revisions are kept, and you can roll back to any step again at any time from Revision History.

**Permission requirements** (namespace-scoped `helm.kuboard.cn`)

| Operation | Required Permission |
| --- | --- |
| Upgrade | create on `releases/upgrade` |
| Rollback | create on `releases/rollback` |
| View Revision History | get on `releases` |

**Related pages**

- [Release List and Revision History](./releases): view, compare, and inspect Revisions
- [Operation Progress (Events)](./events): real-time progress, logs, and cancellation of upgrades / rollbacks
- [Install a Helm Release](./install): the complete flow for installing a new Release
- [Chart Marketplace](./marketplace): find and browse available Charts
