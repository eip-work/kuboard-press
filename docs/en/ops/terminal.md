---
description: "Open a container terminal (Web Terminal) in Kuboard: entry points and permissions, common operations, personalization, disconnect/reconnect and error handling, command history and shortcuts"
---

# Terminal

Terminal lets you enter a Pod container directly from the browser to execute commands, without installing SSH or `kubectl`. Every operation you perform in the terminal is recorded to the [Audit Log](./audit-log); for container runtime logs, see [Viewing Logs](./logs).

## Opening the Terminal

**Entry points (any of the following)**

- **List page**: on the Pod list page, click the inline **Logs/Terminal**, select the target container in the container picker, then click **Terminal**;
- **Detail page**: on the [Pod detail page](../guide/workload/pods), click the **Terminal** button at the bottom of the container card (default `bash`, can switch to `sh` / `cmd` / `powershell`);
- **Ephemeral container**: the ephemeral container injected via [Debug Container](./debug-container) can also open a terminal.

**Permissions and prerequisites**

- Requires `pods/exec create` permission; without permission, clicking Terminal shows "You do not have permission to access this terminal";
- The target container must be in the Running state.

After clicking **Terminal**, Kuboard opens the terminal in a new window and connects automatically; the toolbar at the top shows `Cluster / Namespace / Pod : Container` and the connection status. On first open, two lines of welcome message are displayed (only once), then a command prompt appears and you can start typing commands.

<!-- screenshot-todo: Terminal overview (same as zh terminal.assets/ops-terminal-1.png, capture in English UI) -->

### Interface at a Glance

| Area | Content |
| --- | --- |
| Toolbar left | Title, Clear Screen, Switch Shell, Copy (dropdown includes Paste / Select All), Reconnect Now (shown when disconnected) |
| Toolbar right | Connection status, latency, character encoding, terminal settings, Find, Change Theme |
| Terminal area | Interactive command line; right-click anywhere to open the context menu |

## Common Operations

### Switching Shell (bash / sh / cmd / powershell)

Click the toolbar **Switch** button and select the target Shell in the menu. Kuboard reconnects automatically and establishes a session with the new Shell; after switching, the terminal content is cleared and the command prompt of the new Shell appears. Linux containers default to **bash** (choose **sh** when the container has no bash), and Windows containers use **cmd** / **powershell**.

### Copy, Paste and Select All

To copy, select the content and press **`Ctrl+Shift+C`**; to paste, press **`Ctrl+Shift+V`** (macOS: **`⌘C`** / **`⌘V`**); the full shortcut list is at the end of this article.

::: tip Why not use Ctrl+C to copy
`Ctrl+C` interrupts the current command in the terminal (sends a SIGINT signal to the process), so copying must include `Shift` (use `⌘C` on macOS). If you press the copy shortcut when nothing is selected, Kuboard will show you the correct shortcut.
:::

Right-click the terminal area to open the context menu: **Copy / Paste / Select All / Find… / Clear Screen / Copy URL / View Logs** (a **Reconnect Now** item also appears when the connection is dropped; **View Logs** opens the real-time logs of the current container in a new window, see [Viewing Logs](./logs)).

<!-- screenshot-todo: Terminal right-click context menu (same as zh terminal.assets/ops-terminal-3.png, capture in English UI) -->

### Searching in the Terminal

Click the toolbar **Find** button, or press `Ctrl+Shift+F` (`⌘+Shift+F` on macOS) to open the search bar; type a string and press Enter — matches are highlighted and selected, and "Not found" is shown when there are no matches. The search bar offers icon-toggled match options: **Backward / Forward**, **Regular expression**, **Case sensitive**, **Whole word**. Searching applies only to the content currently displayed in the terminal and does not send requests to the container or backend.

### Clearing the Screen

Click the toolbar **Clear Screen** and confirm to clear the currently displayed content; this does not interrupt processes or commands running in the container, nor does it delete command history.

### Opening Multiple Terminals / Copying the URL

The terminal opens as a standalone page, so you can open multiple terminals in several browser tabs at the same time, each connecting to a different container or cluster (when too many connections are open for a cluster, "Too many terminal connections are currently open for this cluster" is shown; close some terminals and retry).

The **Copy URL** item in the context menu copies the current terminal link (including the container and character encoding parameters) to the clipboard: send it to a colleague, and when they open it in the browser, they enter the terminal of the same container (they still need `pods/exec` permission), which is suitable for collaborative troubleshooting.

## Personalization

The appearance and behavior settings of the terminal are saved in your user account, take effect across browsers and devices, and are applied immediately after modification. Priority of effect: **User settings > Admin global configuration > Built-in defaults** (in **System Configuration**, admins can set the global default font size, line spacing, and dark/light theme under "Terminal Theme Configuration").

### Font and Display (Terminal Settings)

Click the toolbar **Terminal Settings** (the button shows the current font size); the pop-up panel lets you adjust:

| Setting | Options |
| --- | --- |
| Font size | 12 – 20 (default 14) |
| Line spacing | 1.0 – 2.0, step 0.1 (default 1.2) |
| Font family | System default / JetBrains Mono / Fira Code / Cascadia Code / Menlo / Consolas / Source Code Pro |
| Cursor style | Block / Underline / Bar |
| Cursor blink | On / Off |
| WebGL rendering | On / Off (turn off when rendering is abnormal on certain GPUs or under remote desktops) |

### Themes

Click the toolbar **Change Theme**; the overlay is split into **Dark themes** and **Light themes** columns, with each theme shown as a preview card. Click a theme and confirm, and the terminal is redrawn in the new color scheme (redrawing clears the current input content).

<!-- screenshot-todo: Terminal theme picker (same as zh terminal.assets/ops-terminal-2.png, capture in English UI) -->

- Dark themes: Atelier Sulphur Pool (default), Adventure Time, Afterglow, Base16 Dark, Base2tone Lake, Blazer, Pandora;
- Light themes: CLRS, 3024 Day, Ayu Light, Material, Novel, Pencil Light, Rose Pine Dawn, Terminal Basic.

### Character Encoding

When terminal output shows garbled Chinese, click the toolbar **Character Encoding** (the button shows the current encoding, default UTF-8), switch to **GB18030 / GB2312 / GBK**, or type in another encoding directly; after switching, the terminal page reloads automatically. Kuboard remembers the most recently used encoding separately for each "cluster/namespace/Pod/container" (kept for about a month); the [File Browser](./file-browser) shares this encoding setting with the terminal.

::: tip Welcome banner and audit notice
On first entry into the terminal, "Welcome to Kuboard" and "Your operations in this terminal will be recorded in the audit log" are displayed inside the terminal (shown only once). If the admin has enabled the terminal audit overlay, a full-screen notice appears on first entry, and you enter the terminal after clicking "I understand".
:::

## Connection Status, Disconnection, Reconnection and Error Handling

The toolbar shows the current connection status: **Connecting / Connected / Closing / Disconnected**; on the right, **Latency (RTT)** indicates the terminal round-trip delay (probed approximately every 10 seconds), with dot colors: green < 200ms, yellow < 800ms, red ≥ 800ms.

When the connection is interrupted due to network jitter, Kuboard shows a dialog asking:

| Option | Behavior |
| --- | --- |
| Reconnect | Reconnects this time and remembers "Always auto-reconnect"; future drops reconnect automatically |
| Don't auto-reconnect | Remembers the choice; future drops stay disconnected, and you can click toolbar **Reconnect Now** |
| Close the dialog | Skips reconnecting this time only |

Auto-reconnect tries at most 5 times, at intervals of 5s, 15s, 45s, 45s, 45s; during this period the toolbar shows "Reconnecting (n/5)…". After 5 failed attempts, "Reconnect failed, click to retry" is shown.

### Common Errors

| Prompt | Error code | Handling |
| --- | --- | --- |
| You do not have permission to access this terminal | 401 / 403 | Refresh the page and log in again; if it still fails, contact the admin to grant `pods/exec` permission |
| The Pod or container does not exist | 404 | The Pod may have been deleted or restarted; go back to check and re-enter |
| Too many terminal connections are currently open for this cluster | 409 | Close other terminals and retry |
| Backend unreachable | 502 | Check connectivity between the reverse proxy and the apiserver; see [Reverse Proxy Configuration](../install/reverse-proxy) |
| Connection closed abnormally | 1006 | Caused by network jitter or service restart; click **Reconnect Now** |

## Command History

The terminal remembers the commands you executed separately for each "cluster/namespace/Pod/container", stored in the local browser; they remain valid after closing the page or restarting the browser:

- **↑ / ↓**: scroll up / down through command history;
- **Ctrl+R**: reverse-search the most recent command containing the current input;
- Commands containing sensitive fields such as `password=`, `token=`, `api_key=` are not written to history;
- Up to 500 entries are kept per scope.

::: warning Be careful when entering sensitive information
Command history is only stored in the current browser and does not follow you across computers or browsers; although sensitive fields are filtered out automatically, please still avoid typing passwords, tokens, or other sensitive information in plain text in the terminal.
:::

## Shortcut List

| Operation | Windows / Linux | macOS |
| --- | --- | --- |
| Copy | `Ctrl+Shift+C` | `⌘C` |
| Paste | `Ctrl+Shift+V` | `⌘V` |
| Search in terminal | `Ctrl+Shift+F` | `⌘+Shift+F` |
| Interrupt current command | `Ctrl+C` | `Ctrl+C` |
| Scroll up / down command history | `↑` / `↓` | `↑` / `↓` |
| Reverse-search command history | `Ctrl+R` | — (⌘R is browser refresh) |

::: tip Related capabilities
To run commands directly inside the node's operating system, see [NodeShell](./nodeshell); to inject an ephemeral debug container into a running Pod, see [Debug Container](./debug-container).
:::