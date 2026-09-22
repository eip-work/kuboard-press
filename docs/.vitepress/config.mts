import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'

const zhNav = [
  { text: '首页', link: '/zh/' },
  { text: '安装', link: '/zh/install/', activeMatch: '^/zh/install/' },
  { text: '使用', link: '/zh/guide/', activeMatch: '^/zh/guide/' },
  { text: 'Helm', link: '/zh/helm/', activeMatch: '^/zh/helm/' },
  { text: '用户', link: '/zh/user/', activeMatch: '^/zh/user/' },
  { text: 'MCP', link: '/zh/mcp/', activeMatch: '^/zh/mcp/' },
  { text: '运维', link: '/zh/ops/', activeMatch: '^/zh/ops/' },
  { text: '参考', link: '/zh/reference/', activeMatch: '^/zh/reference/' },
  { text: '更新日志', link: '/zh/changelog/v4.x', activeMatch: '^/zh/changelog/' },
  { text: '支持', link: '/zh/support/', activeMatch: '^/zh/support/' },
]

const enNav = [
  { text: 'Home', link: '/en/' },
  { text: 'Install', link: '/en/install/', activeMatch: '^/en/install/' },
  { text: 'Guide', link: '/en/guide/', activeMatch: '^/en/guide/' },
  { text: 'Helm', link: '/en/helm/', activeMatch: '^/en/helm/' },
  { text: 'User', link: '/en/user/', activeMatch: '^/en/user/' },
  { text: 'MCP', link: '/en/mcp/', activeMatch: '^/en/mcp/' },
  { text: 'Operations', link: '/en/ops/', activeMatch: '^/en/ops/' },
  { text: 'Reference', link: '/en/reference/', activeMatch: '^/en/reference/' },
  { text: 'Changelog', link: '/en/changelog/v4.x', activeMatch: '^/en/changelog/' },
  { text: 'Support', link: '/en/support/', activeMatch: '^/en/support/' },
]

const zhSidebar = {
  '/zh/install/': [
    { text: '快速上手', items: [
      { text: '安装指南', link: '/zh/install/' },
      { text: '快速开始', link: '/zh/install/quickstart' },
    ]},
    { text: '生产部署', items: [
      { text: '高可用部署', link: '/zh/install/ha' },
      { text: '反向代理', link: '/zh/install/reverse-proxy' },
    ]},
    { text: '升级与迁移', items: [
      { text: '升级 Kuboard', link: '/zh/install/upgrade' },
      { text: '从 v3 迁移', link: '/zh/install/migration-from-v3' },
    ]},
  ],
  '/zh/guide/': [
    { text: '集群管理', items: [
      { text: '总览', link: '/zh/guide/' },
      { text: '导入集群', link: '/zh/guide/cluster/import' },
      { text: '编辑集群', link: '/zh/guide/cluster/edit' },
      { text: '同步状态', link: '/zh/guide/cluster/sync-status' },
      { text: '资源导入导出', link: '/zh/guide/cluster/export-import' },
    ]},
    { text: '工作负载', items: [
      { text: '总览', link: '/zh/guide/workload/' },
      { text: 'Deployment', link: '/zh/guide/workload/deployments' },
      { text: 'StatefulSet', link: '/zh/guide/workload/statefulsets' },
      { text: 'DaemonSet', link: '/zh/guide/workload/daemonsets' },
      { text: 'Job / CronJob', link: '/zh/guide/workload/jobs-cronjobs' },
      { text: 'Pod', link: '/zh/guide/workload/pods' },
      { text: 'HPA', link: '/zh/guide/workload/hpa' },
      { text: '持续部署（CD）', link: '/zh/guide/workload/cd' },
    ]},
    { text: '配置与存储', items: [
      { text: 'ConfigMap / Secret', link: '/zh/guide/config-storage/configmaps-secrets' },
      { text: 'PVC / PV / StorageClass', link: '/zh/guide/config-storage/pvc-pv-storageclass' },
      { text: 'VolumeSnapshot / CSI', link: '/zh/guide/config-storage/snapshots-csi' },
    ]},
    { text: '服务与网络', items: [
      { text: 'Service / Ingress', link: '/zh/guide/network/services-ingress' },
      { text: 'NetworkPolicy', link: '/zh/guide/network/networkpolicy' },
      { text: 'Gateway API', link: '/zh/guide/network/gateway-api' },
    ]},
    { text: '集群资源', items: [
      { text: 'Node', link: '/zh/guide/cluster-resources/nodes' },
      { text: 'Namespace', link: '/zh/guide/cluster-resources/namespaces' },
      { text: 'ResourceQuota / LimitRange', link: '/zh/guide/cluster-resources/quota-limitrange' },
      { text: '调度 / PDB / Lease / RuntimeClass', link: '/zh/guide/cluster-resources/scheduling' },
      { text: 'Admission Webhook', link: '/zh/guide/cluster-resources/admission' },
      { text: 'FlowControl', link: '/zh/guide/cluster-resources/flowcontrol' },
      { text: 'DRA 动态资源分配', link: '/zh/guide/cluster-resources/dra' },
    ]},
    { text: '自定义资源', items: [
      { text: 'CRD', link: '/zh/guide/crd/crds' },
      { text: '自定义资源实例', link: '/zh/guide/crd/custom-resources' },
    ]},
    { text: '运维可视化', items: [
      { text: '事件', link: '/zh/guide/ops/events' },
      { text: '资源全景图', link: '/zh/guide/ops/resource-map' },
      { text: '套件市场', link: '/zh/guide/ops/addon-marketplace' },
    ]},
  ],
  '/zh/helm/': [
    { text: 'Helm', items: [
      { text: '总览', link: '/zh/helm/' },
      { text: 'Chart 市场', link: '/zh/helm/marketplace' },
      { text: '安装 Release', link: '/zh/helm/install' },
      { text: 'Release 管理', link: '/zh/helm/releases' },
      { text: '升级与回滚', link: '/zh/helm/upgrade-rollback' },
      { text: '操作事件', link: '/zh/helm/events' },
    ]},
  ],
  '/zh/user/': [
    { text: '我的账号', items: [
      { text: '登录', link: '/zh/user/login' },
      { text: '密码策略', link: '/zh/user/password' },
      { text: 'MFA 多因素认证', link: '/zh/user/mfa' },
      { text: '访问密钥', link: '/zh/user/access-keys' },
    ]},
    { text: '组织与权限', items: [
      { text: '用户管理', link: '/zh/user/users' },
      { text: '用户组', link: '/zh/user/groups' },
      { text: '角色与权限', link: '/zh/user/roles' },
    ]},
    { text: '外部身份对接', items: [
      { text: 'OIDC 单点登录', link: '/zh/user/oidc' },
      { text: 'Webhook 外部用户库', link: '/zh/user/webhook-users' },
    ]},
  ],
  '/zh/mcp/': [
    { text: '快速上手', items: [
      { text: '快速开始', link: '/zh/mcp/' },
      { text: '服务端配置', link: '/zh/mcp/server-config' },
    ]},
    { text: '能力参考', items: [
      { text: '工具清单', link: '/zh/mcp/tools' },
      { text: 'Prompt 模板', link: '/zh/mcp/prompts' },
    ]},
    { text: '变更治理', items: [
      { text: '变更审批流程', link: '/zh/mcp/approval-flow' },
      { text: '危险操作与确认令牌', link: '/zh/mcp/danger-levels' },
    ]},
  ],
  '/zh/ops/': [
    { text: '总览', items: [
      { text: '总览', link: '/zh/ops/' },
    ]},
    { text: '审计', items: [
      { text: '审计日志', link: '/zh/ops/audit-log' },
      { text: '审计策略', link: '/zh/ops/audit-policy' },
    ]},
    { text: '远程访问', items: [
      { text: '终端', link: '/zh/ops/terminal' },
      { text: '文件浏览器', link: '/zh/ops/file-browser' },
      { text: '日志查看', link: '/zh/ops/logs' },
      { text: 'NodeShell', link: '/zh/ops/nodeshell' },
      { text: 'Debug Container', link: '/zh/ops/debug-container' },
      { text: 'KuboardProxy', link: '/zh/ops/kuboard-proxy' },
    ]},
    { text: '实时推送', items: [
      { text: 'SSE 实时推送', link: '/zh/ops/sse' },
    ]},
  ],
  '/zh/reference/': [
    { text: '系统配置', items: [
      { text: '环境变量', link: '/zh/reference/kuboard-env' },
      { text: '日志与追踪', link: '/zh/reference/kuboard-env#排障' },
      { text: '系统配置项', link: '/zh/reference/system-config' },
      { text: '端口映射', link: '/zh/install/quickstart#端口说明' },
    ]},
    { text: 'Kubernetes 兼容性', items: [
      { text: 'K8sCapability 版本兼容', link: '/zh/reference/k8s-capability' },
      { text: 'K8s 版本矩阵', link: '/zh/reference/version-matrix' },
      { text: '资源可用性治理', link: '/zh/reference/resource-availability' },
    ]},
    { text: '权限与菜单', items: [
      { text: 'RBAC 权限作用域', link: '/zh/reference/rbac-scopes' },
      { text: '菜单禁用', link: '/zh/reference/menu-disable' },
    ]},
    { text: '接口与杂项', items: [
      { text: 'API 文档', link: '/zh/reference/api' },
      { text: '术语表', link: '/zh/reference/glossary' },
    ]},
  ],
  // 注意：反向代理已迁出 reference/，现仅在 install/ 下保留；老路径
  // /v4/reference/reverse-proxy 与 /v4/reference/reverse-proxy.html
  // 由 docker/nginx.conf rewrite 到 /install/reverse-proxy 兼容。
  '/zh/changelog/': [
    { text: '更新日志', items: [
      { text: 'V4.x 更新日志', link: '/zh/changelog/v4.x' },
    ]},
  ],
  '/zh/support/': [
    { text: '授权/支持', items: [
      { text: '授权与支持', link: '/zh/support/' },
      { text: 'License 安装', link: '/zh/support/license-install' },
      { text: '社区与商业支持', link: '/zh/support/community' },
    ]},
  ],
}

const enGuideSidebar = [
  { text: 'Cluster', items: [
    { text: 'Overview', link: '/en/guide/' },
    { text: 'Import Cluster', link: '/en/guide/cluster/import' },
    { text: 'Edit Cluster', link: '/en/guide/cluster/edit' },
    { text: 'Sync Status', link: '/en/guide/cluster/sync-status' },
    { text: 'Export / Import', link: '/en/guide/cluster/export-import' },
  ]},
  { text: 'Workloads', items: [
    { text: 'Overview', link: '/en/guide/workload/' },
    { text: 'Deployment', link: '/en/guide/workload/deployments' },
    { text: 'StatefulSet', link: '/en/guide/workload/statefulsets' },
    { text: 'DaemonSet', link: '/en/guide/workload/daemonsets' },
    { text: 'Job / CronJob', link: '/en/guide/workload/jobs-cronjobs' },
    { text: 'Pod', link: '/en/guide/workload/pods' },
    { text: 'HPA', link: '/en/guide/workload/hpa' },
    { text: 'Continuous Deployment', link: '/en/guide/workload/cd' },
  ]},
  { text: 'Config & Storage', items: [
    { text: 'ConfigMap / Secret', link: '/en/guide/config-storage/configmaps-secrets' },
    { text: 'PVC / PV / StorageClass', link: '/en/guide/config-storage/pvc-pv-storageclass' },
    { text: 'VolumeSnapshot / CSI', link: '/en/guide/config-storage/snapshots-csi' },
  ]},
  { text: 'Networking', items: [
    { text: 'Service / Ingress', link: '/en/guide/network/services-ingress' },
    { text: 'NetworkPolicy', link: '/en/guide/network/networkpolicy' },
    { text: 'Gateway API', link: '/en/guide/network/gateway-api' },
  ]},
  { text: 'Cluster Resources', items: [
    { text: 'Node', link: '/en/guide/cluster-resources/nodes' },
    { text: 'Namespace', link: '/en/guide/cluster-resources/namespaces' },
    { text: 'Quota / LimitRange', link: '/en/guide/cluster-resources/quota-limitrange' },
    { text: 'Scheduling / PDB / Lease / RuntimeClass', link: '/en/guide/cluster-resources/scheduling' },
    { text: 'Admission Webhook', link: '/en/guide/cluster-resources/admission' },
    { text: 'FlowControl', link: '/en/guide/cluster-resources/flowcontrol' },
    { text: 'DRA', link: '/en/guide/cluster-resources/dra' },
  ]},
  { text: 'Custom Resources', items: [
    { text: 'CRDs', link: '/en/guide/crd/crds' },
    { text: 'Custom Resources', link: '/en/guide/crd/custom-resources' },
  ]},
  { text: 'Operations', items: [
    { text: 'Events', link: '/en/guide/ops/events' },
    { text: 'Resource Map', link: '/en/guide/ops/resource-map' },
    { text: 'Addon Marketplace', link: '/en/guide/ops/addon-marketplace' },
  ]},
]

const enSidebar = {
  '/en/install/': [
    { text: 'Getting Started', items: [
      { text: 'Installation Guide', link: '/en/install/' },
      { text: 'Quick Start', link: '/en/install/quickstart' },
    ]},
    { text: 'Production Deployment', items: [
      { text: 'High Availability', link: '/en/install/ha' },
      { text: 'Reverse Proxy', link: '/en/install/reverse-proxy' },
    ]},
    { text: 'Upgrade & Migration', items: [
      { text: 'Upgrade Kuboard', link: '/en/install/upgrade' },
      { text: 'Migration from v3', link: '/en/install/migration-from-v3' },
    ]},
  ],
  // en 页面与 zh 保持对称，统一存放在 docs/en/guide/<sub>/ 嵌套目录下；
  // 同一份 Guide sidebar 只需注册到 /en/guide/ 前缀即可覆盖全部 Guide 页面。
  '/en/guide/': enGuideSidebar,
  '/en/helm/': [
    { text: 'Helm', items: [
      { text: 'Overview', link: '/en/helm/' },
      { text: 'Marketplace', link: '/en/helm/marketplace' },
      { text: 'Install', link: '/en/helm/install' },
      { text: 'Releases', link: '/en/helm/releases' },
      { text: 'Upgrade & Rollback', link: '/en/helm/upgrade-rollback' },
      { text: 'Events', link: '/en/helm/events' },
    ]},
  ],
  '/en/user/': [
    { text: 'My Account', items: [
      { text: 'Login', link: '/en/user/login' },
      { text: 'Password Policy', link: '/en/user/password' },
      { text: 'MFA', link: '/en/user/mfa' },
      { text: 'Access Keys', link: '/en/user/access-keys' },
    ]},
    { text: 'Org & Permissions', items: [
      { text: 'Users', link: '/en/user/users' },
      { text: 'Groups', link: '/en/user/groups' },
      { text: 'Roles', link: '/en/user/roles' },
    ]},
    { text: 'External Identity', items: [
      { text: 'OIDC SSO', link: '/en/user/oidc' },
      { text: 'Webhook Users', link: '/en/user/webhook-users' },
    ]},
  ],
  '/en/mcp/': [
    { text: 'Getting Started', items: [
      { text: 'Quick Start', link: '/en/mcp/' },
      { text: 'Server Configuration', link: '/en/mcp/server-config' },
    ]},
    { text: 'Capabilities', items: [
      { text: 'Tools', link: '/en/mcp/tools' },
      { text: 'Prompts', link: '/en/mcp/prompts' },
    ]},
    { text: 'Change Governance', items: [
      { text: 'Approval Flow', link: '/en/mcp/approval-flow' },
      { text: 'Danger Levels', link: '/en/mcp/danger-levels' },
    ]},
  ],
  '/en/ops/': [
    { text: 'Overview', items: [
      { text: 'Overview', link: '/en/ops/' },
    ]},
    { text: 'Audit', items: [
      { text: 'Audit Log', link: '/en/ops/audit-log' },
      { text: 'Audit Policy', link: '/en/ops/audit-policy' },
    ]},
    { text: 'Remote Access', items: [
      { text: 'Terminal', link: '/en/ops/terminal' },
      { text: 'File Browser', link: '/en/ops/file-browser' },
      { text: 'Logs', link: '/en/ops/logs' },
      { text: 'NodeShell', link: '/en/ops/nodeshell' },
      { text: 'Debug Container', link: '/en/ops/debug-container' },
      { text: 'KuboardProxy', link: '/en/ops/kuboard-proxy' },
    ]},
    { text: 'Realtime Streaming', items: [
      { text: 'SSE', link: '/en/ops/sse' },
    ]},
  ],
  '/en/reference/': [
    { text: 'System Configuration', items: [
      { text: 'Environment Variables', link: '/en/reference/kuboard-env' },
      { text: 'Logging & Tracing', link: '/en/reference/kuboard-env#troubleshooting' },
      { text: 'System Config', link: '/en/reference/system-config' },
      { text: 'Port Mapping', link: '/en/install/quickstart#ports' },
    ]},
    { text: 'Kubernetes Compatibility', items: [
      { text: 'K8sCapability', link: '/en/reference/k8s-capability' },
      { text: 'Version Matrix', link: '/en/reference/version-matrix' },
      { text: 'Resource Availability', link: '/en/reference/resource-availability' },
    ]},
    { text: 'Permissions & Menus', items: [
      { text: 'RBAC Scopes', link: '/en/reference/rbac-scopes' },
      { text: 'Menu Disable', link: '/en/reference/menu-disable' },
    ]},
    { text: 'API & Misc', items: [
      { text: 'API Reference', link: '/en/reference/api' },
      { text: 'Glossary', link: '/en/reference/glossary' },
    ]},
  ],
  // 注意：Reverse Proxy 已迁出 reference/，现仅在 install/ 下保留；
  // 老路径 /v4/reference/reverse-proxy 与 /v4/reference/reverse-proxy.html
  // 由 docker/nginx.conf rewrite 到 /en/install/reverse-proxy 兼容。
  '/en/changelog/': [
    { text: 'Changelog', items: [
      { text: 'V4.x Changelog', link: '/en/changelog/v4.x' },
    ]},
  ],
  '/en/support/': [
    { text: 'License & Support', items: [
      { text: 'License & Support', link: '/en/support/' },
      { text: 'License Install', link: '/en/support/license-install' },
      { text: 'Community', link: '/en/support/community' },
    ]},
  ],
}

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: 'Kuboard V4',
  description:
    'Kuboard V4 - 基于 Kubernetes 的多集群容器管理平台官方文档 / Official documentation for the Kubernetes multi-cluster management platform',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#007af5' }],
    // Google Analytics（与 kuboard-press 一致，ID = UA-144196556-1）
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-144196556-1' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'UA-144196556-1');
    `],
  ],

  cleanUrls: true,
  lastUpdated: true,

  buildEnd(siteConfig) {
    // 站点根 / 使用 meta refresh 重定向到中文文档 /zh/，
    // 覆盖 VitePress 默认的语言选择页（/ 与 /zh/ 都指向中文）。
    const outDir = siteConfig.outDir
    fs.mkdirSync(outDir, { recursive: true })
    const redirectHtml = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=/zh/">
    <meta name="description" content="Kuboard V4 - 基于 Kubernetes 的多集群容器管理平台官方文档">
    <link rel="icon" href="/favicon.png">
    <title>Kuboard V4</title>
  </head>
  <body>
    <p style="font-family: system-ui, sans-serif; padding: 2em;">正在跳转到<a href="/zh/">Kuboard V4 中文文档</a>…</p>
  </body>
</html>
`
    fs.writeFileSync(path.join(outDir, 'index.html'), redirectHtml)
  },

  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Kuboard V4',
      description: '基于 Kubernetes 的多集群容器管理平台官方文档',
      themeConfig: {
        logo: '/favicon.png',
        siteTitle: 'Kuboard V4',
        nav: zhNav,
        outlineTitle: '本页目录',
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '语言',
        sidebar: zhSidebar,
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'Kuboard V4',
      description: 'Official documentation for the Kubernetes multi-cluster management platform',
      themeConfig: {
        logo: '/favicon.png',
        siteTitle: 'Kuboard V4',
        nav: enNav,
        outlineTitle: 'On this page',
        docFooter: { prev: 'Previous page', next: 'Next page' },
        lastUpdated: { text: 'Last updated at', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
        darkModeSwitchLabel: 'Theme',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Back to top',
        langMenuLabel: 'Language',
        sidebar: enSidebar,
      },
    },
  },

  markdown: {
    image: { lazyLoading: true },
  },

  mermaid: {
    theme: 'default',
  },
  mermaidPlugin: {
    class: 'mermaid',
  },

  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
    optimizeDeps: {
      // 重置 vitepress-plugin-mermaid 默认的 include 列表，
      // 避免 pnpm 隔离下 CJS 包没有 ESM 入口而报
      // "does not provide an export named 'xxx'" 错误。
      // mermaid v12 自身已 ESM 化，无需预构建。
      include: ['mermaid'],
    },
  },
}))