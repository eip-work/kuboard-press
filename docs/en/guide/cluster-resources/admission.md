---
description: "Using the four cluster resources for admission control: creating and configuring the rules of Mutating and Validating Webhooks (Mutating/ValidatingWebhookConfiguration), and creating and associating Validating Admission Policies (ValidatingAdmissionPolicy) with their Bindings (ValidatingAdmissionPolicyBinding)"
---

# Admission Control (Admission Webhook and Policies)

Kubernetes' **Admission Control** happens after the API request passes authentication and authorization, and before the object is written to etcd: at this stage the request content can be **modified**, and non-compliant requests can be **rejected**. This page covers the four cluster resources related to admission control in Kuboard:

| Resource | Purpose | Scope | Kuboard entry | Operable |
| --- | --- | --- | --- | --- |
| Mutating Webhook (MutatingWebhookConfiguration) | **Modify** object content before it is persisted | Cluster | Cluster Resources → Admission Webhook → Mutating Webhook | Create / Edit / Delete |
| Validating Webhook (ValidatingWebhookConfiguration) | **Validate and reject** non-compliant requests before the object is persisted | Cluster | Cluster Resources → Admission Webhook → Validating Webhook | Create / Edit / Delete |
| Validating Admission Policy (ValidatingAdmissionPolicy) | **Declare** validation rules with CEL expressions (no external service to deploy) | Cluster | Cluster Resources → Admission Webhook → Validating Admission Policy | Create / Edit / Delete |
| Validating Admission Policy Binding (ValidatingAdmissionPolicyBinding) | **Apply** a policy to specific resources / namespaces | Cluster | Cluster Resources → Admission Webhook → Validating Admission Policy Binding | Create / Edit / Delete |

::: warning These resources are hidden in the menu by default
The entries for the four resources are **disabled** by default, so they cannot be seen in the resource tree. If the **Cluster Resources → Admission Webhook** group is missing on the left side of your cluster, ask the cluster administrator to go to **System Settings → Menu Item Settings**, check these four resources in the resource tree and save, then refresh the cluster page — they will appear.
:::

The two Webhook kinds require you to **deploy** a backend service yourself to receive callbacks; Validating Admission Policy is a native Kubernetes capability — rules are declared with expressions and executed by kube-apiserver, with no code required. Below, each is explained in turn following "what it does → where to operate → how to fill in the form → result and verification".

## Mutating Webhook (MutatingWebhookConfiguration)

**What problem it solves**: before an API request is accepted, the object is handed to an external service (webhook server) to be **modified**. Typical uses: automatically injecting sidecar containers, filling in default values, adding labels / annotations per policy.

### Entry and List Page

Enter **Cluster Resources → Admission Webhook → Mutating Webhook**. It is a **cluster-scoped** resource; the list reuses Kuboard's generic resource list, with these main columns:

| Column | Description |
| --- | --- |
| Cluster | The cluster the resource belongs to (grouped by cluster in tree mode) |
| Name | The configuration name; click to enter the detail page |
| Creation Time | Shown as relative time; can be filtered by time |
| Actions | **Edit** / **YAML** (view YAML) / **Delete** |

<!-- screenshot-todo: Screenshot of the Mutating Webhook list page, showing the Cluster / Name / Creation Time columns and the create button in the top-right corner -->

### Creating

1. Click **Create** in the top-right corner; in the dialog that opens you can choose **Create from Form** or **Create from YAML**;
2. When creating from form, fill in the basic info (name) and the **webhooks[]** array — click **+ Add Webhook** to add multiple webhooks, each webhook being one card;
3. Inside each webhook card, fill in the webhook properties and the **rules[]** rules array (**+ Add Rule** adds more entries);
4. Click **Save**, confirm in **Preview YAML** and submit; on success you are taken to the detail page.

| Area | Field | Description |
| --- | --- | --- |
| Basic Info | Name | Required, unique within the cluster, K8s name rules (lowercase letters / digits / `-`) |
| Webhook | name | The name of this webhook, usually an FQDN such as `my-webhook.example.com` |
| | admissionReviewVersions | Multi-select, `v1` / `v1beta1`, default `["v1"]` |
| clientConfig | service.name | The name of the Service that receives the callback |
| | service.namespace | The namespace of that Service |
| | service.path | The callback path, e.g. `/mutate` |
| | caBundle | The CA certificate content when the callback URL uses HTTPS (multi-line text); leave it empty for a plaintext HTTP callback |
| rules[] | apiGroups | Multi-select: `(core)` / `apps` / `batch`; matches the API group the resources to intercept belong to |
| | apiVersions | Multi-select: `v1` |
| | operations | Multi-select: `CREATE` / `UPDATE` / `DELETE`; the callback fires only on these operations |
| | resources | Multi-select: `pods` / `deployments`, etc.; the callback fires only for these resources |

::: tip Fields not exposed in the form
- The form does not show `sideEffects` or `timeoutSeconds`, but on creation it **writes defaults** of `sideEffects: None` and `timeoutSeconds: 10`;
- Advanced fields such as `clientConfig.url` (giving a URL directly instead of through a Service), `failurePolicy`, `matchPolicy`, `namespaceSelector`, `objectSelector` and `reinvocationPolicy` are not in the form; when you need them, use **Create from YAML**, or supplement them via **YAML** editing on the detail page after creation.
:::

### After Saving

After saving, the number of webhooks is visible in the "Specification" panel on the detail page. A webhook configuration is a global declaration — once created, requests matching the apiGroups / resources / operations combination in `rules` are sent to the callback (whether installation is needed before it takes effect is covered by the warning below).

```sh
kubectl get mutatingwebhookconfiguration
kubectl describe mutatingwebhookconfiguration <name>   # view the webhooks array and rules
```

::: danger A dead callback service blocks API requests
A Mutating Webhook defaults to `failurePolicy: Fail`: when the callback fails (the service does not exist, a timeout, TLS validation failure), the **request is rejected outright**. During testing, configure an available Service for the callback URL first, or change `failurePolicy` to `Ignore` in the YAML.
:::

## Validating Webhook (ValidatingWebhookConfiguration)

**What problem it solves**: before an object is persisted, an external service **validates** the request and rejects non-compliant ones by returning an error. Typical uses: enforcing naming conventions, forbidding high-risk configurations, integrating with external compliance systems.

### Entry and Creating

Enter **Cluster Resources → Admission Webhook → Validating Webhook** and click **Create**. **The form fields are exactly the same as for the Mutating Webhook** (name, webhooks[], clientConfig's service.name / namespace / path and caBundle, rules[]'s apiGroups / apiVersions / operations / resources), and the defaults are the same too (`admissionReviewVersions: ["v1"]`, `sideEffects: None`, `timeoutSeconds: 10`).

### Differences from the Mutating Webhook

| Comparison | Mutating Webhook | Validating Webhook |
| --- | --- | --- |
| When the call happens | The object is not final yet; it can be **modified** | The object is final; it can only be **allowed / rejected** |
| Return value | The AdmissionReview carries a patch (JSONPatch) | Returns allowed / the rejection reason directly |

```sh
kubectl get validatingwebhookconfiguration
kubectl describe validatingwebhookconfiguration <name>
# trigger a request that matches the rules and observe whether it is rejected and the rejection message
```

## Validating Admission Policy and its Binding

**What problem it solves**: without deploying any backend service, validation rules are declared directly with **CEL expressions** (Common Expression Language) and executed natively by kube-apiserver. Suited to governance scenarios such as "rejecting non-compliant resources of a certain kind" and "imposing constraints on a namespace".

The policy and the binding are **two objects that work together**:

- **Validating Admission Policy** declares "what the rules are": which resources to match (`matchConstraints`) + a set of validation expressions (`validations`, CEL);
- **Validating Admission Policy Binding** declares "what the rules apply to": which policy to reference (`policyName`) + the scope of effect (`matchResources`, such as a namespace selector) + the actions (`validationActions`);
- One policy can be reused by multiple bindings (different scopes, different actions), while one binding binds exactly one policy. **Create the policy first, then the binding** — only then does the policy actually take effect.

::: tip Version requirements
Validating Admission Policy entered beta in Kubernetes 1.26 and became GA in 1.30 (`admissionregistration.k8s.io/v1`). It is unavailable on earlier cluster versions.
:::

### Creating a Validating Admission Policy

Enter **Cluster Resources → Admission Webhook → Validating Admission Policy**, click **Create**, and choose **Create from Form**:

| Area | Field | Description |
| --- | --- | --- |
| Basic Info | Name | Required, unique within the cluster |
| Validations | expression | Required, a **CEL expression** returning a boolean. `object` is the resource object being validated; e.g. `object.metadata.name.startsWith('demo-')` means "the name must start with demo-" |
| | message | Optional; the message returned to the caller when the expression is not satisfied, e.g. `name must start with demo-` |

Click **+ Add Validation** to add multiple validations; multiple validations are in an "and" (AND) relationship — all of them must be satisfied for the request to pass.

::: tip Match constraints are not exposed in the form
The policy's match scope `spec.matchConstraints.resourceRules` (e.g. matching `pods` in core/v1 on `CREATE` operations) is not in the form, but it appears in the **Preview YAML**. When you need to specify the match scope, use **Create from YAML** or add it in the **YAML** editing on the detail page, for example:

```yaml
spec:
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
  validations:
    - expression: "object.metadata.name.startsWith('demo-')"
      message: "name must start with demo-"
```
:::

<!-- screenshot-todo: Screenshot of the Validating Admission Policy create form, with the expression (CEL expression) and message inputs in the Validations area -->

### Creating a Validating Admission Policy Binding

Enter **Cluster Resources → Admission Webhook → Validating Admission Policy Binding**, click **Create**, and choose **Create from Form**:

| Field | Description |
| --- | --- |
| Name | Required, unique within the cluster |
| Policy Name (policy name) | Required; fill in the name of an already-created Validating Admission Policy; case-sensitive |
| Validation Actions (validation actions) | Multi-select: `Deny` / `Warn` / `Audit`, default `["Deny"]`. `Deny` rejects the request; `Warn` lets it through but returns a warning to the client; `Audit` only records an audit entry without intervening |

::: tip The scope of effect is not exposed in the form
The binding's scope `spec.matchResources` (e.g. a `namespaceSelector` limiting the effect to namespaces with a certain label) is not in the form, but it appears in the **Preview YAML**. When you need to limit the scope, use **Create from YAML** or the **YAML** editing on the detail page, for example:

```yaml
spec:
  policyName: demo-vap
  validationActions: ["Deny"]
  matchResources:
    namespaceSelector:
      matchLabels:
        environment: production
```
:::

### After Saving

After creating the policy → creating the binding, issue a matching operation (such as creating a `pod`) against an object within scope: if it violates the validation expression, the `Deny` action returns the error message from `message` and the request is rejected; `Warn` lets it through and prompts instead. Verification commands:

```sh
kubectl get validatingadmissionpolicy
kubectl get validatingadmissionpolicybinding
kubectl describe validatingadmissionpolicybinding <binding-name>
# create a violating object within scope and observe the rejected / warned effect
```

::: warning Create the policy first, then the binding
A binding that references a non-existent policy name has no effect (and reports no error either). When troubleshooting "the policy is not taking effect", first confirm the policy has been created, the binding's `policyName` matches the policy name, and the match scope covers the target object / namespace.
:::

## Related Pages

- [Scheduling and Stability (PriorityClass / PDB / Lease / RuntimeClass)](./scheduling): cluster resources hidden by default as well; enable them under "Menu Item Settings"
- [Namespaces](./namespaces): the webhook's `service.namespace` and the binding's `namespaceSelector` both act on namespaces