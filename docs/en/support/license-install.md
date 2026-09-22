---
description: "Obtain and import a Kuboard License file to manage more Kubernetes clusters: licensing rules, steps to obtain and import a license, license status, and FAQ"
---

# License Installation

Managing more than 3 Kubernetes clusters requires importing a license file (License File). This page explains how to obtain and import a license file, and how to verify that the license has taken effect.

## License Rules

| Scenario | License file needed |
| --- | --- |
| Manage ≤ 3 clusters | No license file needed |
| Manage 4 clusters | 1 |
| Manage 5 clusters | 2 |
| Each additional cluster | 1 more |

- License files are bound to a "Kuboard Access Endpoint": the banner at the top of the list only counts valid license files matching the current access address;
- License files already obtained with Kuboard V3 can be used directly with Kuboard V4.

## Obtain a License

1. Open the [Kuboard License & Support](./index) page and sign in with your phone number + verification code;
2. Go to "My Orders" → "Paid Orders";
3. Click "Obtain License" and copy the complete license content.

The license file is YAML-formatted text (license content plus a digital signature). Paste the whole block as-is — no manual editing needed.

## Import a License

::: warning Permission required
The "License" menu (System Management → Settings → License) requires an account with permission on the `license.kuboard.cn` resource group in the Kuboard scope; regular users cannot see this menu by default.
:::

1. Sign in to Kuboard with an account that has the required permission;
2. Go to "System Management" → "Settings" → "License" to open the license list page;
3. Click "Import License" at the top, paste the license content into the dialog that pops up, and click "Save";
4. If validation passes → a message says "The license was successfully installed to this Kuboard. The page is about to refresh. The Kuboard license will take effect after the refresh." Click "OK" → the page refreshes automatically and the license takes effect;
5. If validation fails → a message says "The license file failed validation." Make sure you pasted the complete content.

<!-- screenshot-todo: import license dialog -->

## Verify the License Is Active

<!-- screenshot-todo: top banner of the license list page -->

The banner at the top of the list shows:

- "Number of valid license files matching `<current access address>`: N" — N is the number of valid license files matching the current address;
- "Manageable cluster count: N + 3" — valid license count + 3 (free allowance);
- The "View Details" button — opens the "License Information" dialog, where you can view the "Manageable Clusters" list and the remaining import capacity ("You can import N more clusters").

Each row in the list shows: ID, license file name, Kuboard Access Endpoint (tagged "Matched / Mis-match"), issue date, expiry date, status, and import time. Click "View" in the actions column → the "View License Information" dialog opens, showing the features, the bound access address, the license issue/expiry time, and the license status.

<!-- screenshot-todo: license information dialog -->

## License Status

| Status | Meaning |
| --- | --- |
| valid | Validation passed, and the current time is within the license period (Issue Date ~ Expiry Date) |
| expired | Outside the license period (earlier than the issue date or later than the expiry date) |
| invalid | Validation failed (content tampered with, incomplete paste, etc.) |

License files tagged "Matched" count toward the banner count at the top and are included in the manageable cluster count; those tagged "Mis-match" are not counted and only take effect when Kuboard is accessed from the matched address.

## Delete a License File

1. Click "Delete" in the actions column of the list;
2. Confirm in the confirmation dialog (which shows "Delete the license file [License File Name]") → the license file is removed from the list, and the banner count / manageable cluster count decrease accordingly.

## FAQ

- **Importing the same license file twice**: Kuboard shows "License file xxx already exists. The same license file cannot be imported twice." — no need to re-import;
- **No visible change after a successful import**: a successful import prompts you to refresh the page; the license takes effect only after the refresh;
- **Can a V3 license file be used with V4?**: Yes. License files already obtained with V3 can be used directly with V4;
- **Cluster count reached the limit**: when you perform an operation on a cluster that exceeds the licensed capacity, Kuboard prompts "Missing License" with a one-click jump to the license file page; purchase and import more license files to unlock it.