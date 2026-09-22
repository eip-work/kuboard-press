---
description: "Kuboard Continuous Deployment (CD): usage scenarios, curl examples, and permission requirements for the two scriptable operations — Update Image Tag and Restart Workload — plus the CI/CD Integration entry on the workload detail page"
---

# Continuous Deployment (CD)

This page explains how to turn "shipping a new version" into a script you can drop into your pipeline: **Update Image Tag** (switch to a new version) and **Restart Workload** (re-pull without changing the image). Scripts can be generated from the page, or you can call the endpoints directly with curl.

**Audience**: cluster operators and application release engineers who manage Deployments, StatefulSets, and DaemonSets.

## When to Use

- **Update Image Tag**: switch a workload to a new version once the pipeline builds a new image tag
- **Restart Workload**: the image is unchanged, but dependent configuration such as Secrets / ConfigMaps needs to be re-pulled

Both operations apply to long-running workloads: [Deployment](./deployments), [StatefulSet](./statefulsets), and DaemonSet. The page entry is currently available only for Deployment and StatefulSet.

The difference: Update Image Tag **modifies the image in the Pod template** (the result is a new version); Restart Workload **changes no configuration** — it only rolls all replicas through a rolling replacement once.

## Update Image Tag

Switches the container image of a workload to a new tag (multiple containers can be updated in a single call), triggering a rolling update by the controller.

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"deployments","namespace":"default","name":"web","images":{"nginx":"nginx:1.27"}}' \
  "<kuboard-host>/api/cd.kuboard.cn/v4/update-image-tag"
```

Request body fields: `cluster` (cluster ID), `kind` (workload kind: `deployments` / `statefulsets` / `daemonsets`), `namespace`, `name` (workload name), and `images` (image replacement map: key is the old image prefix, value is the new image).

::: warning images use prefix matching
Keys replace the old image using prefix matching. Write the full image registry and repository name to avoid accidental replacements; also, do not make multiple keys prefixes of one another.
:::

::: tip dryRun preview
Append the query parameter `?dryRun=All` to preview the request without actually modifying the workload — useful for validating the script in CI first.
:::

## Restart Workload

Use this when the image content is unchanged but all replicas need to re-pull and roll through a replacement. The endpoint writes a restart timestamp, and the controller completes the rolling update according to each workload's update strategy: Deployment replaces replicas via a new ReplicaSet, StatefulSet replaces stateful replicas one by one, DaemonSet replaces node by node.

```sh
curl -X POST \
  -H "content-type: application/json" \
  -H "Kb-Access-Key: <key>.<secret>" \
  -d '{"cluster":"<clusterId>","kind":"deployments","namespace":"default","name":"web"}' \
  "<kuboard-host>/api/cd.kuboard.cn/v4/restart-workload"
```

::: tip In-page alternative
The **Adjust Image Version** button and the **Restart (Refresh)** button on the detail page have the same effect and suit occasional manual operations; for pipeline automation, use the CD endpoints on this page.
:::

## Permission Requirements

Calling either endpoint requires two levels of permission at the same time: a Kuboard-level create permission for `cd.kuboard.cn/update-image-tag` (or `restart-workload`), plus modify permission for the target workload in the target namespace. Missing either level results in rejection. We recommend using a dedicated AccessKey in CI rather than mixing it with a production account.

If the call returns 403, check that the current account has both permission levels above, or retry with an AccessKey that does.

## Frontend Entry

1. Open the **Deployment or StatefulSet detail page** (e.g. [Deployment](./deployments), [StatefulSet](./statefulsets)).
2. Click **More → CI/CD Integration** in the top-right corner; the "CI/CD Integration Script" dialog appears.
3. At the top of the dialog, **select an AccessKey** (you can click **Create AccessKey** to create one); if none is selected, no script is generated.
4. Copy the "Update image version script" or the "Restart ... script" and paste it into your CI/CD pipeline to run it. The tag in the update image script is the placeholder `yourNewVersionTag`; replace it with the actual version.

::: warning DaemonSet has no page entry yet
The "CI/CD Integration" menu on the DaemonSet detail page is disabled. If you need it, call the endpoint directly using the request format above (fill `kind` with `daemonsets`).
:::

## API Documentation

The endpoints covered in this section are documented in the [Continuous Delivery API group in Swagger UI](../../reference/api).