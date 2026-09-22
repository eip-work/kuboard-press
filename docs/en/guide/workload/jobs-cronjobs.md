---
description: "Kuboard v4 guide to the Job and CronJob workloads: use cases, entry points, list and creation form fields, viewing status, Cron schedule expressions and history management"
---

# Job and CronJob

This page explains how to use **Job** (a one-shot batch task) and **CronJob** (a task that runs periodically on a Cron schedule) in Kuboard, including use cases, entry points, list pages, creation and editing, and the status shown on the detail page.

## Use Cases

Job and CronJob both belong to the Kubernetes `batch` API group and are namespace-scoped resources. What they have in common is "run a batch of Pods to complete a task and then finish", which is different from long-running workloads such as Deployment and StatefulSet.

| Resource | Typical use cases |
| --- | --- |
| Job | One-shot tasks: data migration, bulk import/export, CI/CD build steps, a single run of a scheduled backup |
| CronJob | Periodic tasks: backing up the database in the early hours, cleaning up logs every hour, generating reports periodically |

::: tip One-shot execution vs periodic execution
A Job runs only once after it is created: the controller creates and retries Pods until the expected number of successes (completions) is reached or the retries are exhausted (backoffLimit). A CronJob creates a Job periodically on a schedule, and its "history" is the batch of Jobs it has created.
:::

Job / CronJob are often used as a supplement to long-running workloads; for those, see [Deployments](./deployments).

## Entry Points

| Navigation item | Resource |
| --- | --- |
| Jobs | `batch/v1` Job |
| CronJobs | `batch/v1` CronJob |

The URL of each page is generated automatically by the system according to the resource type, so you do not need to memorize it; to share it, simply copy the current page address from the browser address bar.

## Job List Page

Click **Workloads → Jobs** in the left navigation to enter the Job list page. The list shows abnormal workloads (failed / not completed) first by default; in the top-right corner you can switch between two browsing modes: **Tree mode** (follows the cluster / namespace context of the left navigation) and **Search mode** (select a cluster and namespace at the top, and search by name).

The table columns are as follows:

| Column | Description |
| --- | --- |
| Checkbox | Checked entries can be batch-deleted (the entries in Kubernetes and the entries in the cache are confirmed separately) |
| Cluster | The cluster the Job belongs to |
| Namespace | The namespace the Job belongs to |
| Name | Click to open the detail page; shown as a link when you have view permission |
| Creation Time | Shown as relative time, sortable and searchable by time range |
| Time Zone | The cluster time zone (hidden column by default; used as a search condition) |
| Actions | **Edit**, **YAML** (read-only view / edit), **Delete** |

### How to Create

Click **Create** in the top-right corner of the list page, then select in order: **Cluster** (ready status), **Namespace**, and **Creation method** (**Create from Form** or **Create from YAML**). "Create from YAML" opens the YAML editor where you fill in the object and create it directly; "Create from Form" takes you to the form creation page. Before submitting, Kuboard checks whether the target cluster supports the resource and pops up a resource availability notice when it is unavailable.

## Creating a Job (from Form)

The creation form consists of three tabs:

| Tab | Content |
| --- | --- |
| Metadata | Name, namespace, labels, annotations |
| Job Information | The batch parameters specific to Job (see below) |
| Pod Template | Container image, resource quotas, environment variables, etc. |

The fields on the "Job Information" tab:

| Field | Description | Default |
| --- | --- | --- |
| completions | Expected number of successful Pods; defaults to 1 when parallel Pods is 1, otherwise leaving it empty means it takes the parallel Pods count | 1 |
| Parallel Pods | Maximum number of Pods running at the same time | 1 |
| Pod Restart Policy | `OnFailure` (retry on failure) or `Never` (no retry); required | `OnFailure` |
| Maximum Retries | The Job is marked as failed after retrying this many times | 6 |
| Maximum Runtime | The maximum time in seconds the Job is allowed to run; it is terminated automatically when exceeded | Not set |
| Time to Live After Completion | How long (seconds) the Job is kept after it completes or fails; 0 means it is deleted automatically right away | Not auto-deleted |

All numeric fields require a number that is not smaller than 1 (the time to live after completion allows 0). The Pod restart policy only allows `OnFailure` / `Never`: retries are handled by the Job controller, and `Always` is not used.

The form does not provide an entry for manually setting a label selector (to avoid misuse); if you really need it, configure it under "Create from YAML" or in the YAML view of the edit page.

A complete Job object example:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: data-migrate
  namespace: default
spec:
  completions: 1
  parallelism: 1
  backoffLimit: 6
  activeDeadlineSeconds: 3600
  ttlSecondsAfterFinished: 600
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrator
          image: myregistry.example.com/migrator:1.0
          command: ["/bin/migrate"]
```

Click **Save** in the top-right corner: Kuboard validates all the form fields, pops up a YAML confirmation dialog, and after confirmation submits and redirects to that Job's detail page.

## Job Detail Page

Click a Job name on the list page to open the detail page:

| Area | Content |
| --- | --- |
| Status button | Shows **Completed** (green) or **Not Completed** (yellow), reflecting whether the task reached the expected completions |
| Owner CronJob | If the Job was created by a CronJob, shows "Owner CronJob" with a link to its name; click to jump to that CronJob's detail page |
| Metadata | Cluster, namespace, name, ResourceVersion, creation time, labels, annotations |
| Pods | The list of Pods owned by the Job (Pod cards); the list is on the left and the details on the right; click to switch |
| More (⋯) | Additional action menu injected by the workload context extension point |

## Editing a Job

The edit page has exactly the same fields as the create page: when you open it, Kuboard reads the current object from the cluster and fills in the form; on save it compares the differences and pops up a YAML confirmation dialog.

::: warning Fields that cannot be modified
Once a Job is created, content such as the Pod template usually cannot be modified directly (depending on the cluster's admission policy). If saving your edit is rejected, check the specific validation errors in the YAML dialog.
:::

## CronJob List Page

Click **Workloads → CronJobs** in the left navigation to enter the CronJob list page. The page structure, table columns and creation method are the same as on the Job list page (abnormal workloads are also shown first).

## Creating a CronJob (from Form)

The creation form consists of three tabs:

| Tab | Content |
| --- | --- |
| Metadata | Name, namespace, labels, annotations |
| Schedule | The scheduling parameters and basic Job template information of the CronJob (see below) |
| Pod Template | The Pod template |

The "Schedule" tab contains two cards.

### Schedule Card

| Field | Description |
| --- | --- |
| Suspend | Toggle: **Suspended** / **Running**. While suspended, no new Jobs are scheduled (Jobs already created but not yet running are also paused) |
| Cron Schedule | Required; a 5-field Cron expression; click the button to open the visual Cron editor, or show the current expression as text |
| Starting Deadline | Seconds. If a scheduled time was missed, the Job is still started as long as the gap does not exceed this value; otherwise that scheduled run is given up |
| Concurrency Policy | `Allow` (allow concurrency) / `Forbid` (forbid concurrency) / `Replace` (replace the existing one); defaults to `Allow` when not set |
| Successful Jobs History Limit | Number of successful Job histories kept; default 3 |
| Failed Jobs History Limit | Number of failed Job histories kept; default 1 |

A Cron expression consists of 5 fields (Kuboard's Cron editor hides the seconds and year fields):

```text
┌───────────── minute (0-59)
│ ┌─────────── hour (0-23)
│ │ ┌───────── day of month (1-31)
│ │ │ ┌─────── month (1-12)
│ │ │ │ ┌───── day of week (1-7)
│ │ │ │ │
* * * * *
```

Common examples:

| Cron expression | Meaning |
| --- | --- |
| `* * * * *` | Runs once every minute (the default value of the creation form) |
| `0 2 * * *` | Runs once a day at 02:00 |
| `*/30 * * * *` | Runs every 30 minutes |
| `0 0 1 * *` | Runs once at 00:00 on the 1st of every month |
| `0 9 * * 1` | Runs once at 09:00 every Monday |

::: tip Using the Cron editor
- Click the "Cron Schedule" button to open the visual editor, which offers five tabs **Minute / Hour / Day / Month / Week** and supports wildcards, ranges (`-`), steps (`/`), lists (`,`), etc.;
- Below the editor, the "**next 5 run times**" are shown in real time (assuming the browser time equals the kube-apiserver time and time zone), so you can check whether the expression matches your expectations;
- The creation form pre-fills `* * * * *`; change it according to your actual needs to avoid creating Jobs too frequently.
:::

### Job Basic Information Card

This card configures `spec.jobTemplate`; its fields are exactly the same as the "Job Information" tab in "Creating a Job". A complete CronJob object example:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: db-backup
  namespace: default
spec:
  schedule: "0 2 * * *"
  concurrencyPolicy: Forbid
  suspend: false
  startingDeadlineSeconds: 300
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: myregistry.example.com/backup:1.0
```

## CronJob Detail Page

Click a CronJob name on the list page to open the detail page. Besides the metadata and the "⋯" extension menu, the top of the page provides two action buttons, and the main body is split into a "Job History" timeline and "the Pods of the selected Job" sections.

### Schedule and Suspend

The top shows the current schedule expression as a rounded button; click it to open a read-only Cron visual panel where you can view the breakdown of the expression and the "next 5 run times". The **Suspended** checkbox in the panel pauses future scheduling, and the button color changes accordingly (green when not suspended, yellow when suspended).

### Run Now

Click **Run Now** (requires modify permission on the CronJob) to open a dialog that immediately creates a Job from the CronJob's template:

| Field | Description |
| --- | --- |
| Job Name | The name of the generated Job, by default shaped like `{cronJobName}-{minute-level timestamp}-{4-character random string}`; can be modified |
| Allow Automatic Cleanup | Toggle (on by default): when enabled, the Job is owned by the CronJob, and it may be cleaned up once the maximum history count is reached |

A manually triggered Job carries a **Manual** label in the history list, to distinguish it from normally scheduled Jobs.

### Job History (Timeline)

The Job History area lists all the Jobs the CronJob has created, in descending order of creation time:

- Each Job shows its **creation time**, name (with a **Manual** label when manually triggered), successes / expected completions and duration, with **YAML** (read-only preview) and **Delete** buttons; the row background color indicates the status: gray (completed), green (successes reached), orange (in progress / abnormal);
- After selecting a Job, its detailed information (maximum retries, maximum parallelism, completion status / time) and related events (Events) expand below, and the right side of the page shows the Pods of that Job; click a Pod to view its details.

When the list is empty, the message "No Jobs have been created yet" is shown, along with the CronJob's Cron expression for reference.

::: tip The history limits can be modified directly
The header of the Job History area shows **Successful histories / Failed histories** in real time; clicking it opens a "Modify the max Job history count of CronJob {name}" dialog where you can modify each value separately, without entering the edit page.
:::

<!-- screenshot-todo: Suggested images: Job list page (abnormal workloads first + tree/search mode switch), Creating a Job form ("Job Information" tab), and CronJob detail page (schedule/suspend panel and Job History timeline) -->