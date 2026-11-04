---
description: View the expiry of the API server certificate, the Kuboard client certificate and the cluster CA on the cluster details page
---

# Certificate Expiry

Kuboard shows when the credentials it uses to reach a cluster expire, under **Cluster Details → Certificates**. The page exists to give you time to renew — once a certificate expires, Kuboard loses access to the cluster entirely.

## What Is Covered

| Item | Source | Import type |
| --- | --- | --- |
| API server serving certificate | A single TLS handshake with the API server, reading the peer certificate chain | kubeconfig / Token |
| Client certificate used by Kuboard | The kubeconfig client certificate stored at import time | kubeconfig |
| Cluster CA certificate | The kubeconfig CA stored at import time | kubeconfig |
| Access token | Shown when the token is a JWT carrying an expiry | Token |

::: warning Control-plane component certificates are not checked
Certificates for etcd, kube-scheduler and kube-controller-manager live on the control-plane nodes as files. Kuboard does not read the node filesystem, so those certificates are **not** part of this page. Use `kubeadm certs check-expiration` (Kubernetes 1.20+; `kubeadm alpha certs check-expiration` on older versions) instead.

For cloud-managed control planes (EKS / ACK / TKE and similar) the certificates are managed by the cloud provider; the page only shows what can be observed through the API server.
:::

## What the Page Shows

- **Status** — Valid / Expiring soon (30 days or less) / Expired / Not yet valid / Unknown;
- **Remaining** — recalculated against the current time, independent of when the snapshot was taken;
- **Collected at** — the snapshot refreshes every 6 hours; when older than that the page notes a background refresh and keeps showing the previous result;
- **Refresh** — the button in the top-right triggers a re-collection in the background; results appear automatically;
- **Warnings** — a failed probe (for example an unreachable API server) is listed at the bottom and never hides the other certificates. It does not imply the cluster itself is unhealthy.

## Messages and What To Do

| Message | Meaning | Suggested action |
| --- | --- | --- |
| Unable to connect to the API server to read its certificate | The API server is unreachable, or the handshake failed because the certificate already expired | Check the cluster status and reason in the cluster list first |
| The API server address is plain HTTP | The cluster was connected over HTTP, so there is no certificate | Prefer connecting over HTTPS |
| The API server certificate does not cover the address Kuboard connects to | The certificate SAN does not match the configured address | Replace the certificate or use an address contained in it |
| The stored credentials could not be parsed into certificates | The saved kubeconfig is malformed | Re-import or update the cluster credentials |

## Renewal

Renewing and replacing certificates is a cluster-side operation — see [Update Kubernetes certificate files](https://v3.kuboard.cn/install/maintain/certs.html). After renewing, re-import (or update) the cluster credentials in Kuboard and press refresh on the Certificates page to confirm the new expiry.