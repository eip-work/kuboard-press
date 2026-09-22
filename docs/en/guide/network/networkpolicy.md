---
description: "What NetworkPolicy is and its prerequisites (depends on the CNI plugin), the creation wizard (Pod selector / Ingress rules / Egress rules / IP blocks and ports), editing and deleting, checking which Pods are affected, the default-deny model, and how to verify and troubleshoot a policy that does not take effect"
---

# NetworkPolicy (Network Policy)

A NetworkPolicy is access control for **internal** (east-west) cluster traffic: you select a set of Pods, then declare which **Ingress** traffic and **Egress** traffic they are allowed to receive or send. Policies follow a **default-deny/allow-list model** — traffic on a direction that matches a policy is denied by default, and only traffic explicitly allowed by the rules is permitted, which lets you isolate microservices from one another.

```text
Ingress (others / outside access me)   →   Egress (me accessing others)
Sources: Pod / namespace / IP block          Destinations: Pod / namespace / IP block
```

Location in Kuboard: **Service & Network → NetworkPolicy** (resource `networking.k8s.io/v1`, namespace-scoped).

## Prerequisite: Depends on the CNI Plugin

NetworkPolicy is not enforced by the apiserver or kubelet — it must be implemented by the cluster's **CNI plugin** (Container Network Interface), such as Calico, Cilium, Antrea, Weave Net, kube-router, and so on.

::: warning Confirm plugin support before creating a policy
The default **flannel** and some other simplified plugins do **not** implement NetworkPolicy. If the cluster does not support it, creating a policy will not raise an error, but the traffic behavior will not change at all. When troubleshooting a "policy not taking effect" problem, confirm this first.
:::

Understanding the two default states is a prerequisite for interpreting policy effects:

| State | Traffic behavior |
| --- | --- |
| A Pod is not matched by any policy | No isolation; it can communicate freely with any object (allowed by default) |
| A Pod is matched by a policy on its **Ingress/Egress** direction | That direction immediately enters **default-deny**: only traffic explicitly allowed by the rules is permitted |

## Where to Find It

Enter the target **Cluster → Namespace**, then click **Service & Network → NetworkPolicy** on the left.

The list page is Kuboard's generic resource list: you can switch cluster/namespace at the top (or via the tree navigation), search by name, and select checkboxes for batch deletion; each row offers **Edit / YAML / Delete**, and clicking the name opens the detail page.

## Creating a NetworkPolicy

1. Go to the **NetworkPolicy** list page and click **Create** in the top-right corner;
2. **Basic info**: fill in the name (required, unique within the namespace), labels, and annotations;
3. **Pod selector**: define which Pods this policy applies to;
4. **Ingress rules / Egress rules**: add rules as needed (you can fill in only one direction);
5. Click **Save**, confirm in the **Preview YAML**, then submit — you will be taken to the detail page.

<!-- screenshot-todo: overall screenshot of the NetworkPolicy creation page with the four tabs "Basic Info / Pod Selector / Ingress Rules / Egress Rules" -->

### Step 1: Pod Selector (Which Pods the Policy Governs)

The selector matches Pods by **label** and only matches Pods in **this namespace**; other namespaces are not affected.

| Field | Description |
| --- | --- |
| matchLabels | Exact `key=value` matching; multiple rows are ANDed together. Copying the labels from a workload (e.g. Deployment) template matches the corresponding Pods |
| matchExpressions | Expression matching with operators `In / NotIn / Exists / DoesNotExist`, useful for exclusion or set matching |

- **Leave it empty**: matches **all** Pods in this namespace (the UI shows "Pod selector not defined", but semantically it selects everything);
- **Fill it in**: only matches Pods whose labels match.

::: tip Where do the labels come from?
In the creation wizard for a [Deployment](../workload/deployments) and others, Kuboard writes an `app=<name>` label onto the Pod by default. Fill the same label into the selector when creating a policy to lock onto that set of Pods.
:::

### Step 2: Fill in the Rules (Ingress / Egress)

Both tabs share the same structure: click **Add Rule** to get a "rule card" — the left side is the **source / destination** (from: the "source" of an ingress rule; to: the "destination" of an egress rule), and the right side is **ports**.

Click **Add IP Block** or **Add Selector** on the left to add multiple sources/destinations; click **Add Port** on the right to add port entries.

- **Multiple rules are ORed together**, and multiple sources/destinations within a rule are also ORed — matching any one of them is enough to allow the traffic;
- If no rules are added for a direction, the policy only "isolates" (default-deny) without allowing any traffic on that direction.

#### Source / Destination: IP Block

Click **Add IP Block**:

| Field | Description |
| --- | --- |
| CIDR | A CIDR IP block, e.g. `192.168.1.0/24`, `2001:db9::/64`; required |
| Except | Subnets to exclude within the CIDR, e.g. fill `192.168.1.0/24` and exclude `192.168.1.64/26` |

<!-- screenshot-todo: rule card screenshot — left "Source" card (IP block CIDR + except block, namespace selector, Pod selector) + ports on the right, with the "OR" label annotated -->

#### Source / Destination: Selector (Namespace + Pods)

Click **Add Selector** to get a selector card with two checkable options:

| Option | Unchecked | Checked |
| --- | --- | --- |
| Namespace selector | Only **this namespace** (the UI shows "Limited to namespace xxx") | Can match labels across namespaces; **empty condition = all namespaces** |
| Pod selector | This dimension is unrestricted | Can match Pods by label; **empty condition = all Pods** |

- When both selectors in a card are in effect, they are ANDed: source = Pods that satisfy the namespace selector **and** the Pod selector;
- UI validation: **the two selectors cannot both be empty**;
- Multiple selector cards are still ORed.

::: tip Common cross-namespace allowance scenario
"Allow Pods in the `payments` namespace to access me": check the **Namespace selector**, fill in `name=payments` (Kuboard labels namespaces with `name=<name>` by default), and leave the Pod selector empty.
:::

#### Ports

| Field | Description |
| --- | --- |
| Protocol | TCP / UDP / SCTP |
| Port | 1 - 65535 |
| Port range (endPort) | Forms a range with the port number, e.g. `8000` - `9000`; shown on Kubernetes 1.25 and later, automatically hidden by the UI for older clusters |

- **No ports filled in = match all ports** (the UI shows "Match all ports");
- With one or more ports filled in, it becomes "match only the following ports", and entries are ORed.

### Step 3: Rule Direction and Default-Deny (Key Point)

The UI does **not set policyTypes (Ingress / Egress) separately**; it is decided by which kind of rules you fill in:

- Only **Ingress rules** filled in → the policy only governs ingress traffic;
- Only **Egress rules** filled in → the policy only governs egress traffic;
- Both filled in → governs both directions.

::: warning Filling in rules turns on "default-deny" for that direction
As soon as a policy matches a Pod, **any direction you filled in** enters default-deny — even if you only wrote one allow rule, all other traffic that is not explicitly allowed is denied. A typical incident: you configure only ingress rules and think you are done, then the Pod's **egress** (e.g. reaching a database or resolving DNS) is completely cut off. Add egress rules to the egress direction as needed too.
:::

Conversely, if a direction does **not** need to be isolated, just **add no rules** for that direction (keeping its default-allow behavior).

## Editing and Deleting

- **Edit**: **Edit** in the list row reuses the creation form; you can modify selectors, rules, IP blocks, and ports at any time;
- **Delete**: delete from the row or select checkboxes for batch deletion; you must type the object name to confirm.
- After deletion, the policy's isolation is lifted immediately and the affected Pods return to the default-allow "not matched by any policy" state.

::: tip Changes take effect immediately
NetworkPolicies are pushed by the CNI controller in real time — no objects need to be restarted after saving or deleting, and changes usually take effect within seconds.
:::

## Detail Page and Checking "Which Pods Are Affected"

The top of the detail page has a metadata card and the **Events** panel; below are three read-only tabs: **Pod Selector**, **Ingress Rules**, and **Egress Rules** (showing rules, IP blocks, ports, and the OR relationship).

The UI does **not provide an "affected Pods list"**; to verify, cross-check "selector → Pod labels":

1. Open the **Pod Selector** tab of the policy and note the matchLabels / matchExpressions;
2. Go to the **Pods** list page and filter with the same set of labels;
3. The Pods that match are the objects the policy applies to — the policy only affects them, and Pods that do not match are unaffected.

<!-- screenshot-todo: NetworkPolicy detail page screenshot, highlighting the read-only display of matchLabels / matchExpressions in the "Pod Selector" tab -->

::: warning A selector that does not match means the policy is a no-op
A typo in the labels, mismatched case, or reversed expressions will make the selector match no Pods, so the policy naturally produces no isolation. After creating a policy, first check the match results in the Pod list.
:::

## Troubleshooting and Verification: Is the Policy Actually in Effect

### Verification Path (End-to-End)

```sh
# 1. Does the cluster support it (check for ControllerRevision/CRD or docs; plugins without support must be replaced first)
kubectl get networkpolicy -A

# 2. Does the selector match: list the target Pod labels and compare against the policy podSelector
kubectl -n <ns> get pod -L app,tier

# 3. Review the current policy definition (rules / ports / policyTypes)
kubectl -n <ns> get networkpolicy <name> -o yaml
```

Then verify allow and deny behavior with a real access attempt:

::: tip Build a test Pod
```yaml
# test-src.yaml: source Pod (with label src=probe)
apiVersion: v1
kind: Pod
metadata:
  name: probe-src
  namespace: <ns>
  labels: { app: probe, src: "true" }
spec:
  containers:
    - name: nc
      image: busybox
      command: ["sh", "-c", "sleep 3600"]
```
```sh
kubectl -n <ns> apply -f test-src.yaml
# Probe the destination Pod's port from inside the source Pod (reachable = allowed; timeout = denied by the policy)
kubectl -n <ns> exec probe-src -- sh -c "echo | nc -w 2 <targetPodIP> <port> && echo OK || echo BLOCKED"
```
:::

### Common Issues at a Glance

| Symptom | Common cause |
| --- | --- |
| No change in traffic after creating the policy | The CNI plugin does not support NetworkPolicy; the selector matches no Pods |
| Frontend-backend communication suddenly breaks as soon as the policy is created | The default-deny model is in effect — rules only allow what is explicitly permitted, everything else is denied (check for missed egress rules) |
| Pods cannot resolve domain names | The egress rules do not allow the `kube-system` namespace, UDP port 53 (kube-dns / CoreDNS) |
| An IP block is allowed but still unreachable | The port is not allowed (empty ports = allow all, but once ports are filled only those are allowed); wrong protocol (TCP written as UDP); incorrect CIDR |
| Cross-namespace access is still denied | The namespace selector is not checked (by default it is limited to this namespace), or the target namespace's labels are not matched |
| Want to allow one rule but "everything gets through" | An empty source/port in the rule means match anything — specify concrete sources and ports |

::: tip Quick CLI reference
```sh
kubectl -n <ns> get networkpolicy
kubectl -n <ns> describe networkpolicy <name>   # structure and rules at a glance
kubectl -n <ns> get pod -o wide --show-labels   # compare Pod IPs and labels
```
:::

The policy object itself usually does not generate events; problems show up more often in the CNI data plane it is tied to (e.g. Calico's Felix logs). The Events panel on the Kuboard detail page shows resource-side events such as object creation/update.

## Related Pages

- [Service & Ingress](./services-ingress): Layer-4 Services and Layer-7 Ingress complement NetworkPolicy (external exposure vs internal isolation)
- [Gateway (Gateway API)](./gateway-api): the next-generation traffic routing API
- [Namespaces](../cluster-resources/namespaces): source of the namespace labels used by cross-namespace policies
- [Deployment](../workload/deployments) and [Pods](../workload/pods): source of the labels used by policy selectors, and how to cross-check the affected Pods
