---
description: "Browse, search and install Kuboard Addons in the Addon Marketplace, complete the step-by-step wizard of parameter configuration, installation and initialization, and manage Addons after installation (Quick Links, disable/enable, uninstall, delete)."
---

# Addon Marketplace

This page explains how to install operation components (such as monitoring, logging, storage and gateway) in Kuboard with one click through the **Addon Marketplace**, and how to manage them after installation. Once an Addon is installed, it is deeply integrated into the Kuboard interface — for example, extension entries appear on the Node details page and the Workload details page.

::: tip Difference from the Chart Marketplace
Kuboard has two marketplaces, which are easy to confuse:

- **Addon Marketplace (this page)**: distributes Kuboard Addons; after installation they are deeply integrated into the Kuboard interface (extension entries, Quick Links, built-in configuration pages);
- **Chart Marketplace (Helm Marketplace)**: browse and install generic Helm Charts; see [Chart Marketplace](../../helm/marketplace).

The two are independent of each other: resources installed through the Addon Marketplace do not generate a Helm Release; if you want to deploy applications with Helm, use the Chart Marketplace.
:::

## Enter the Addon Marketplace

1. In the left menu, go to **Cluster Management → Kubernetes Clusters**, click the target cluster, and open the cluster details page.
2. Click the **Kuboard Addons** tab (it is only shown when the cluster status is ready).
3. There are two sub-tabs at the top of the page:

| Tab | Purpose |
|---|---|
| Installed Addons | Lists the cards of the Addons installed in the cluster; you can open their details, find new Addons, or create a custom Addon |
| Addon Repository | Opens the Addon Marketplace page to browse and install new Addons |

<!-- screenshot-todo: cluster details page → Kuboard Addons tab (two sub-tabs: Installed Addons / Addon Repository) -->

## Browse and Search Addons

Click the **Addon Repository** tab, and Kuboard embeds the Addon Marketplace into the page (served online by the official Kuboard Addon library). In the marketplace you can:

- **Browse**: the marketplace displays all available Addons as cards/lists; each Addon includes its name, version, last-updated time, author and description;
- **Search**: filter by keyword through the search box, or browse by category;
- **Identify installed Addons**: the marketplace marks the Addons already installed in this cluster, so you don't install them twice;
- **Start installation**: click **Install** on the card of the target Addon to begin the installation flow.

<!-- screenshot-todo: full view of the Addon Repository page (embedded marketplace page + Addon cards + search/categories) -->

::: warning Offline Environments
The Addon Marketplace page is provided by an external online service. If your browser cannot access the Internet, the Addon Repository list will not load. Open the marketplace page link in a **browser that has Internet access**, follow the on-page prompts to download the Addon-related files, then return to the offline environment to complete the installation (i.e., offline installation).
:::

## Install an Addon

After you click **Install** on the Addon Marketplace page, you are automatically redirected to that Addon's details page. The details page guides you through the installation with tabs numbered 1/2/3/4.

### Step 1: Addon Parameters

1. Enter the **1 Addon Parameters** tab and fill in the parameters required by the Addon (such as the cluster name and StorageClass).
2. If the Addon has "extra steps" (actions that must be completed manually outside the cluster before installation), read and complete them, then tick **Confirmed Completed**.
3. Click **Save**, and the wizard moves to the next step.

### Step 2: Install Script

1. Enter the **2 Install Script** tab. The page lists the YAML objects that the Addon will import into the cluster; you can view the contents directly.
2. For Addons with a pre-install script: click **Pre-Install** first, then click **Install**; for regular Addons, click **Install** directly.
3. After installation completes, the wizard moves to the next step.

### Step 3: Initialize

1. Enter the **3 Initialize** tab. The page automatically checks whether all Addon-related Pods are ready (a popup notifies you once they are).
2. Click **Run Initialization**; a popup shows the execution result of each initialization task with a progress bar and a task list.
3. When all tasks succeed, **the Addon is officially activated**, and its extension entries and Quick Links start to take effect.

### Step 4: Extensions (Optional Viewing)

Enter the **4 Extensions** tab to view the Addon's extension entries. After activation, the Addon shows corresponding entries on the cluster / Namespace / Node / Workload details pages.

<!-- screenshot-todo: Addon details page installation wizard (step tabs: 1 Addon Parameters / 2 Install Script / 3 Initialize / 4 Extensions + status tag at the top) -->

## Post-Installation Management

After installation, you can return to **Cluster Details Page → Kuboard Addons → Installed Addons** at any time, and click **Details** on an Addon card to enter its management page.

### Quick Links

Once an Addon is activated, the **Addon Quick Links** area appears at the top of the details page. Clicking a button there opens the Addon's built-in Web interface directly (accessed through the Kuboard proxy, so you don't need to expose a Service manually).

### Configuration Page

Some Addons come with a **Configuration** tab (numbered 5+, shown in green). Such tabs appear after the Addon is activated and are used to modify the Addon's runtime parameters.

### Disable / Enable

Enter the **4 Extensions** tab:

- Click **Disable Addon**, and the Addon's extension entries are then hidden everywhere in Kuboard;
- After disabling, click **Enable Addon** to restore them.

### Uninstall an Addon

1. Enter the **2 Install Script** tab on the Addon details page and click **Uninstall**; the YAML objects that the Addon imported into the cluster at install time are deleted one by one.
2. After the uninstall completes, return to the details page, click **Delete Addon** in the top-right corner, and the Addon definition is deleted along with it.

::: warning Deleting an Addon Has Prerequisites
- For an Addon that has not installed any workloads yet (just created or just filled with parameters), you can click **Delete Addon** directly;
- For an Addon that has completed installation, you must first **uninstall** the workloads it imported as described above; otherwise the page will prompt "please uninstall first" and block the deletion.
:::

### Create a Custom Addon

On the **Installed Addons** page, click **Create Custom Addon**, fill in the Namespace, id, name, description, author and version (the available scope defaults to "Available in the Cluster" and needs no filling), and an Addon skeleton is created. After creation, you enter the Addon details page, where you can follow the [Install an Addon](#install-an-addon) wizard to write the parameters and install script step by step — suitable for packaging your self-developed components into an Addon for reuse.

::: tip Multiple Kuboard Instances
The same Kubernetes cluster can be imported into multiple Kuboard instances. In that case, make sure the **cluster name is consistent** in each instance; otherwise, some Addons may fail to work properly.
:::