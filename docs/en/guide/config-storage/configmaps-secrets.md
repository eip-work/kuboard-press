---
description: "Kuboard Configuration and Storage - ConfigMap and Secret: where to find them, list page fields and actions, creation / editing / detail / deletion (Opaque/tls/dockerconfigjson types, automatic base64 handling, immutable), and how to inject the configuration into environment variables and mount it as volumes"
---

# ConfigMap and Secret

This page explains how to manage **ConfigMaps** and **Secrets** in Kuboard and inject them into workloads. Both are used to decouple "configuration" from "container images": ConfigMaps hold **non-sensitive** configuration text, while Secrets hold **sensitive** data (passwords, keys, certificates, image registry credentials). In Kubernetes both are **namespaced** resources (from the `v1` core API group).

| Aspect | ConfigMap | Secret |
| --- | --- | --- |
| Purpose | Ordinary configuration: environment variables, config file contents | Sensitive data: passwords, Tokens, TLS certificates, image registry credentials |
| Data fields | `data` (plain-text key/value pairs) | `data` (values must be **base64-encoded** strings) |
| Common types | No type concept | `Opaque`, `kubernetes.io/tls`, `kubernetes.io/dockerconfigjson` |
| Content in the UI | Displayed as-is | Automatically decoded and displayed, copyable |

::: tip Navigation relationship between configuration and storage entries
This page belongs to **Configuration and Storage → Configuration Center** in the left navigation; its **ConfigMap** and **Secret** entries correspond to the `configmaps` and `secrets` Kubernetes resources respectively. For storage volumes (PVC / PV / StorageClass) see [Persistent Volume Claims and Storage Classes](./pvc-pv-storageclass).
:::

## Where to Start

1. After logging into Kuboard, click **Configuration and Storage** in the left navigation;
2. After expanding it, click **Configuration Center**;
3. Under Configuration Center there are two entries:
   - **ConfigMaps** → the ConfigMap list page;
   - **Secrets** → the Secret list page.

<!-- screenshot-todo: Screenshot of the "Configuration and Storage → Configuration Center → ConfigMap / Secret" menu entries in the left navigation -->

## List Page

Both list pages reuse Kuboard's generic resource list and support switching between **tree navigation / search** modes:

- **Tree navigation**: on the left, the scope is selected via a "cluster → namespace" tree, and the table shows the objects in the selected scope;
- **Search mode**: a "Cluster / Namespace" dropdown appears at the top (the Namespace can be `*` to mean all), combined with the search conditions of each table column.

### Common Columns

| Column | Description |
| --- | --- |
| Checkbox | Checked entries can be used for **batch deletion** (rows without permission do not show a checkbox) |
| Cluster | The cluster the object belongs to |
| Namespace | The namespace the object belongs to |
| Name | Object name; click to enter the detail page (requires `get` permission; otherwise shown as plain text) |
| Creation Time | Shown as relative time, sortable |
| Actions | Per-row action buttons: **Edit**, **YAML**, **Delete** (require `update` / `get` / `delete` permissions respectively) |

### Resource-Specific Columns

| Page | Dedicated column | Description |
| --- | --- | --- |
| ConfigMap | Immutable | Reads the `immutable` field: `Immutable` (warning color) or `Modifiable` (primary color) |
| Secret | Type | Reads `data.type`, e.g. `Opaque`, `kubernetes.io/tls`, etc. |
| Secret | Immutable | Same as ConfigMap, reads the `immutable` field |

### Header Actions

| Button | Description |
| --- | --- |
| Create (+) | Create an object in the current cluster / namespace; see "Creation" below |
| Batch Delete | Delete the checked entries; the dialog distinguishes "entries in the Kubernetes cluster" from "entries in the cache" and handles them separately |

::: tip List data source
The list reads from Kuboard's **resource cache** first (aggregated across clusters, searchable, paged); when the cache is unavailable it requests the cluster directly, in which case it shows the hint "lists without a cache cannot be paged" and only displays the total count.
:::

## Creation

### Entry Point and Creation Method

Click **Create (+)** in the top-right corner of the list page to open the create dialog:

| Item | Description |
| --- | --- |
| Cluster | Target cluster (only clusters that are ready and for which the current user has `create` permission are shown) |
| Namespace | Target namespace; defaults to inheriting the current filter scope (in tree mode, when `*` is selected it falls back to `default`) |
| Creation method | **Create from form** / **Create from YAML**, choose one |

- Selecting **Create from YAML** opens the YAML editor directly; fill in a complete `kind: ConfigMap` / `kind: Secret` object and submit;
- Selecting **Create from form** enters the form creation page (see below).

The save flow is the same in both cases: click **Save** → the form is validated → a **Preview YAML** dialog shows the complete object to be submitted → after confirmation it is submitted to the apiServer, and the page automatically navigates to the new object's detail page.

<!-- screenshot-todo: Screenshot of the create dialog (Cluster / Namespace / Creation method) -->

## ConfigMap

### Create Form

At the top left of the create page there is a toggle **Immutable after creation / Modifiable after creation**, corresponding to the Kubernetes `immutable` field; below it are the **Metadata** and **Data** tabs:

| Tab | Field | Corresponding field | Description |
| --- | --- | --- | --- |
| Metadata | Namespace | `metadata.namespace` | The namespace at creation time, shown read-only |
| Metadata | Name | `metadata.name` | Required, unique within the namespace, validated in real time according to RFC naming rules |
| Metadata | Labels | `metadata.labels` | Key/value pairs, optional |
| Metadata | Annotations | `metadata.annotations` | Key/value pairs, optional |
| Entry mode | Data entries | `data` | Edit Key / Value one entry at a time (Value is a multi-line text box) |
| Tab mode | Data entries | `data` | One tab per Key, suitable for long values (such as config files) |

In entry mode the Key must not be empty; all entries are validated before switching tabs.

Example: a ConfigMap that provides both environment variables and a config file (can be used directly in the YAML view):

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
  labels:
    app: demo
data:
  LOG_LEVEL: info          # used as an environment variable
  nginx.conf: |            # mounted as a file
    server {
      listen 80;
      server_name example.com;
    }
```

<!-- screenshot-todo: Screenshot of the ConfigMap create page (immutable toggle + entry mode editing data) -->

### Editing

Click the inline **Edit** on the list page, or **Edit** on the detail page, to enter the edit page. Differences from the create page:

- **Namespace and name** are shown read-only and cannot be modified;
- The **ResourceVersion** of the current object is shown at the top of the page (for comparison with the latest version in the cluster);
- Labels, annotations and data entries can all be modified;
- On save, a **Compare YAML** dialog appears: the original object in the cluster is on the left, the modified object on the right; it is submitted after confirmation.

### Detail Page

Click the name in the list page to enter the detail page:

1. **Header**: the object's metadata card (namespace, UID, labels, annotations, etc.);
2. **Action buttons**: **Edit**, **YAML**, **Delete**;
3. **Main body**: the data entries are shown read-only in **entry mode** (`key = value`) or **tab mode**;
4. **Revision history**: on the right side of the header, the revision records of the current and previous months can be loaded to compare "current version ↔ historical version" and restore to a historical version.

If the object has `immutable: true`, the header shows an **Immutable after creation** tag and the **Edit** button is disabled — an `immutable` ConfigMap cannot be modified at the Kubernetes level and can only be deleted and recreated.

## Secret

### Create Form

At the top of the create page there are two controls:

- The **Immutable after creation / Modifiable after creation** toggle (the `immutable` field, same as above);
- The **Type** dropdown (required): three built-in types **Opaque**, **kubernetes.io/tls**, **kubernetes.io/dockerconfigjson**; it supports input filtering and **custom types** (you can type other type names manually, e.g. `kubernetes.io/service-account-token`).

When switching the type, the form pre-fills `data` according to the type:

| Type | Pre-filled data | Editing method |
| --- | --- | --- |
| `Opaque` | Empty | Entry mode / tab mode; Keys can be added, deleted and renamed |
| `kubernetes.io/tls` | `tls.crt`, `tls.key` | Entry mode / tab mode; the two Keys are **locked** (cannot be renamed or deleted), only values can be filled in |
| `kubernetes.io/dockerconfigjson` | `.dockerconfigjson` | Dedicated structured form (see below) |

The **Name** field (`metadata.name`) is validated according to the DNS-253 rules; labels and annotations are the same as for ConfigMap.

#### Automatic base64 Handling

In Kubernetes the `data` values of a Secret must be **base64-encoded** strings; Kuboard's form handles this automatically:

- **Entry mode**: the value is automatically **decoded** (to plain text) when displayed, and automatically **encoded** back to base64 when the field loses focus, before being stored in the object;
- **Tab mode**: type the plain text directly in the text box; it is automatically encoded when the field loses focus.

So you only need to type the plain text (e.g. `password123`) in the UI; no manual base64 is required.

::: warning base64 is not encryption
base64 is only an encoding (it can be reversed trivially), and the `data` field of a Secret is visible to anyone who can read the resource. Never treat a Secret as encrypted storage; if you need encryption, enable etcd encryption or use an external key management solution, and strictly control `get` permission.
:::

#### The Dedicated dockerconfigjson Form

After selecting `kubernetes.io/dockerconfigjson`, the form switches to an "image registry credentials" editor; each registry entry contains:

| Field | Description |
| --- | --- |
| server | The image registry address; it must start with `http://` or `https://` (validated on submit) |
| username | The login username (required) |
| password | The login password (required); the password input can be toggled to show plain text |

- It supports **adding / deleting** multiple registry entries;
- Each entry provides a **Copy docker login command** button on its right, which can be used to verify the credentials on any node, e.g. `docker login registry.example.com -u admin -p ****` (when copied to the clipboard, `****` is replaced with the real password);
- On save, the `.dockerconfigjson` JSON is assembled and base64-encoded automatically.

### Editing

The edit page has the same form as the create page; the differences are:

- Name and namespace are read-only; the current **type** is shown as a tag at the top of the page (the type cannot be changed on the edit page);
- For `kubernetes.io/tls`, `tls.crt` / `tls.key` are locked and cannot be renamed; for `dockerconfigjson`, the structured form is still used;
- On save, a **Compare YAML** dialog appears for confirmation before submission (the base64-encoded values take part in the comparison).

### Detail Page

- The header shows a **Type** tag (e.g. `Opaque`) and an `immutable` tag (if set);
- `Opaque` / `tls` types: the entries are shown as **decoded plain text**, each with a **Copy** button (one-click copy of the decoded value);
- `dockerconfigjson` type: shown as a server / username / password form; the password is masked with `*` by default, can be revealed by clicking **Show password**, and the docker login command can be copied;
- The rest of the structure (Edit / YAML / Delete buttons, revision history) is the same as on the ConfigMap detail page.

<!-- screenshot-todo: Screenshot of the Secret detail page (type tag + decoded plain-text entries + copy buttons) -->

### Example YAML for Creating a Secret

```yaml
# Opaque: ordinary password type
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
  namespace: default
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=    # base64("password123")
```

```yaml
# TLS certificate type: for use by Ingress
apiVersion: v1
kind: Secret
metadata:
  name: tls-example
  namespace: default
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t...   # base64(PEM certificate)
  tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ==   # base64(PEM private key)
```

## Deletion

There are three entry points: the inline **Delete** on the list page, **Batch Delete** after checking entries on the list page, and **Delete** on the detail page. All of them go through Kuboard's global delete confirmation flow; the dialog contains:

| Item | Description |
| --- | --- |
| Enter the object name | You must type the exact object name to prevent accidental deletion |
| GracePeriod | Grace period in seconds, default 0, i.e. delete immediately |
| Propagation Policy | Cascading deletion policy: Background / Foreground / Orphan; ConfigMap and Secret usually have no child objects, so the default can be kept |

::: tip Deletion is irreversible
When a ConfigMap / Secret is referenced by a workload, after deletion the Pods that reference it may fail to start (environment variable injection fails) or keep the old configuration; `immutable` objects can likewise only be deleted and recreated.
:::

## Applying ConfigMaps / Secrets to Workloads

After creating the ConfigMap / Secret, reference them in the edit page of a **Workload → Deployment** (or StatefulSet, DaemonSet); the entry points are inside the **Pod template** tab; see [Deployment](../workload/deployments) for details:

| Usage | Entry point | Description |
| --- | --- | --- |
| Environment variable injection | Pod template → Containers → Environment variables | Inject the value of a specified **Key** from a **ConfigMap** or **Secret** as an environment variable (`configMapKeyRef` / `secretKeyRef`); select the resource first, then its Key |
| Mount as a file (volume) | Pod template → Volumes | Choose **ConfigMap** or **Secret** as the volume type, specify the resource name and Key, and mount it to a container path (`configMap` / `secret` volumes) |
| Image registry credentials | Containers → Image pull secrets (imagePullSecrets) | Select a Secret of type `kubernetes.io/dockerconfigjson` so that kubelet uses these credentials when pulling images from the private registry |

```yaml
# Snippet of a Deployment referencing a ConfigMap and a Secret (the YAML corresponding to the form operations)
spec:
  containers:
    - name: web
      env:
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_PASSWORD
      volumeMounts:
        - name: config
          mountPath: /etc/nginx
          readOnly: true
  volumes:
    - name: config
      configMap:
        name: app-config
  imagePullSecrets:
    - name: registry-cred
```

::: tip After modifying the configuration you need to make Pods reload it
- **Environment variables** are injected when the container starts; modifying a ConfigMap / Secret does not take effect automatically. You need to **restart / roll out** the workload that references them (see [Deployment common operations - Restart](../workload/deployments));
- **Volume-mounted** files are synced periodically by kubelet; after an update they usually take effect within about 1 minute, but whether the application inside the container hot-reloads depends on the application itself; to be safe, a rolling update is still recommended.
:::

## Common Notes

- **The base64 of a Secret is only an encoding, not encryption** (see the warning above);
- **Namespace isolation**: ConfigMap / Secret are both namespaced resources and can only be referenced by workloads in the **same namespace**; to use them across namespaces you need to copy the data to the target namespace;
- **immutable cannot be modified**: if "Immutable after creation" is checked at creation time, the data fields are locked by Kubernetes and can only be deleted and recreated; both the list page and the detail page show an **Immutable** tag as a hint;
- **Do not put sensitive data in a ConfigMap**: ConfigMap contents are visible to everyone who can `get` the resource, and it is not suitable for storing keys;
- **The `data` of a Secret only accepts base64 strings**: when creating one directly via YAML, make sure the values are valid base64 (do not paste plain text), otherwise the apiServer rejects them; when creating via the form you do not need to worry about this (Kuboard handles it automatically);
- **Names must not be duplicated**: names are unique within a namespace and are validated in real time at creation time according to the RFC (ConfigMap) / DNS-253 (Secret) rules.

## Related Pages

- [Deployment](../workload/deployments): the actual entry points for injecting ConfigMaps / Secrets into environment variables, mounting them as volumes, and image pull secrets
- [Persistent Volume Claims and Storage Classes](./pvc-pv-storageclass): PVC / PV / StorageClass belong to the same "Configuration and Storage" area as configuration resources
- [Storage Snapshots](./snapshots-csi): CSI-based storage snapshot management
