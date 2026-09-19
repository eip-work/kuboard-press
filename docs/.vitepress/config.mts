import { defineConfig } from 'vitepress'

const zhNav = [
  { text: '首页', link: '/' },
  { text: '安装', link: '/install/' },
  { text: '使用', link: '/guide/' },
  { text: 'Helm', link: '/helm/' },
  { text: '用户', link: '/user/' },
  { text: 'MCP', link: '/mcp/' },
  { text: '运维', link: '/ops/' },
  { text: '参考', link: '/reference/' },
  { text: '更新日志', link: '/changelog/v4.x' },
  { text: '支持', link: '/support/' },
]

const enNav = [
  { text: 'Home', link: '/en/' },
  { text: 'Install', link: '/en/install/' },
  { text: 'Guide', link: '/en/guide/' },
  { text: 'Helm', link: '/en/helm/' },
  { text: 'User', link: '/en/user/' },
  { text: 'MCP', link: '/en/mcp/' },
  { text: 'Operations', link: '/en/ops/' },
  { text: 'Reference', link: '/en/reference/' },
  { text: 'Changelog', link: '/en/changelog/v4.x' },
  { text: 'Support', link: '/en/support/' },
]

const zhSidebar = {
  '/install/': [
    { text: '安装', items: [
      { text: '安装指南', link: '/install/' },
      { text: '快速开始', link: '/install/quickstart' },
      { text: '高可用部署', link: '/install/ha' },
      { text: '升级 Kuboard', link: '/install/upgrade' },
      { text: '从 v3 迁移', link: '/install/migration-from-v3' },
      { text: '反向代理', link: '/install/reverse-proxy' },
    ]},
  ],
  '/guide/': [
    { text: '集群管理', items: [
      { text: '总览', link: '/guide/' },
      { text: '导入集群', link: '/guide/cluster/import' },
      { text: '编辑集群', link: '/guide/cluster/edit' },
      { text: '同步状态', link: '/guide/cluster/sync-status' },
      { text: '资源导入导出', link: '/guide/cluster/export-import' },
    ]},
    { text: '工作负载', items: [
      { text: '总览', link: '/guide/workload/' },
      { text: 'Deployment', link: '/guide/workload/deployments' },
      { text: 'StatefulSet', link: '/guide/workload/statefulsets' },
      { text: 'DaemonSet', link: '/guide/workload/daemonsets' },
      { text: 'Job / CronJob', link: '/guide/workload/jobs-cronjobs' },
      { text: 'Pod', link: '/guide/workload/pods' },
      { text: 'HPA', link: '/guide/workload/hpa' },
      { text: '持续部署（CD）', link: '/guide/workload/cd' },
    ]},
    { text: '配置与存储', items: [
      { text: 'ConfigMap / Secret', link: '/guide/config-storage/configmaps-secrets' },
      { text: 'PVC / PV / StorageClass', link: '/guide/config-storage/pvc-pv-storageclass' },
      { text: 'VolumeSnapshot / CSI', link: '/guide/config-storage/snapshots-csi' },
    ]},
    { text: '服务与网络', items: [
      { text: 'Service / Ingress', link: '/guide/network/services-ingress' },
      { text: 'NetworkPolicy', link: '/guide/network/networkpolicy' },
      { text: 'Gateway API', link: '/guide/network/gateway-api' },
    ]},
    { text: '集群资源', items: [
      { text: 'Node', link: '/guide/cluster-resources/nodes' },
      { text: 'Namespace', link: '/guide/cluster-resources/namespaces' },
      { text: 'ResourceQuota / LimitRange', link: '/guide/cluster-resources/quota-limitrange' },
      { text: '调度 / PDB / Lease / RuntimeClass', link: '/guide/cluster-resources/scheduling' },
      { text: 'Admission Webhook', link: '/guide/cluster-resources/admission' },
      { text: 'FlowControl', link: '/guide/cluster-resources/flowcontrol' },
      { text: 'DRA 动态资源分配', link: '/guide/cluster-resources/dra' },
    ]},
    { text: '自定义资源', items: [
      { text: 'CRD', link: '/guide/crd/crds' },
      { text: '自定义资源实例', link: '/guide/crd/custom-resources' },
    ]},
    { text: '运维可视化', items: [
      { text: '事件', link: '/guide/ops/events' },
      { text: '资源全景图', link: '/guide/ops/resource-map' },
      { text: '套件市场', link: '/guide/ops/addon-marketplace' },
    ]},
  ],
  '/helm/': [
    { text: 'Helm', items: [
      { text: '总览', link: '/helm/' },
      { text: 'Chart 市场', link: '/helm/marketplace' },
      { text: '安装 Release', link: '/helm/install' },
      { text: 'Release 管理', link: '/helm/releases' },
      { text: '升级与回滚', link: '/helm/upgrade-rollback' },
      { text: '操作事件', link: '/helm/events' },
    ]},
  ],
  '/user/': [
    { text: '用户与认证', items: [
      { text: '登录', link: '/user/login' },
      { text: '密码策略', link: '/user/password' },
      { text: 'MFA 多因素认证', link: '/user/mfa' },
      { text: '访问密钥', link: '/user/access-keys' },
      { text: '用户管理', link: '/user/users' },
      { text: '用户组', link: '/user/groups' },
      { text: '角色与权限', link: '/user/roles' },
      { text: 'OIDC 单点登录', link: '/user/oidc' },
      { text: 'Webhook 外部用户库', link: '/user/webhook-users' },
    ]},
  ],
  '/mcp/': [
    { text: 'MCP', items: [
      { text: '快速开始', link: '/mcp/' },
      { text: '服务端配置', link: '/mcp/server-config' },
      { text: '工具清单', link: '/mcp/tools' },
      { text: '变更审批流程', link: '/mcp/approval-flow' },
      { text: '危险操作与确认令牌', link: '/mcp/danger-levels' },
      { text: 'Prompt 模板', link: '/mcp/prompts' },
    ]},
  ],
  '/ops/': [
    { text: '运维', items: [
      { text: '总览', link: '/ops/' },
      { text: '审计日志', link: '/ops/audit-log' },
      { text: '审计策略', link: '/ops/audit-policy' },
      { text: 'NodeShell', link: '/ops/nodeshell' },
      { text: 'Debug Container', link: '/ops/debug-container' },
      { text: 'KuboardProxy', link: '/ops/kuboard-proxy' },
      { text: '终端', link: '/ops/terminal' },
      { text: '文件浏览器', link: '/ops/file-browser' },
      { text: '日志查看', link: '/ops/logs' },
      { text: 'SSE 实时推送', link: '/ops/sse' },
    ]},
  ],
  '/reference/': [
    { text: '参考', items: [
      { text: '环境变量', link: '/reference/kuboard-env' },
      { text: '日志与追踪', link: '/reference/trace' },
      { text: '系统配置项', link: '/reference/system-config' },
      { text: '菜单禁用', link: '/reference/menu-disable' },
      { text: '资源可用性治理', link: '/reference/resource-availability' },
      { text: 'K8sCapability 版本兼容', link: '/reference/k8s-capability' },
      { text: 'RBAC 权限作用域', link: '/reference/rbac-scopes' },
      { text: 'K8s 版本矩阵', link: '/reference/version-matrix' },
      { text: 'API 文档', link: '/reference/api' },
      { text: '端口映射', link: '/reference/port-mapping' },
      { text: '术语表', link: '/reference/glossary' },
    ]},
  ],
  // 注意：反向代理已迁出 reference/，现仅在 install/ 下保留；老路径
  // /v4/reference/reverse-proxy 与 /v4/reference/reverse-proxy.html
  // 由 docker/nginx.conf rewrite 到 /install/reverse-proxy 兼容。
  '/changelog/': [
    { text: '更新日志', items: [
      { text: 'V4.x 更新日志', link: '/changelog/v4.x' },
    ]},
  ],
  '/webhook/': [
    { text: 'Webhook', items: [
      { text: '用户通知', link: '/webhook/user' },
    ]},
  ],
  '/support/': [
    { text: '授权/支持', items: [
      { text: '授权与支持', link: '/support/' },
      { text: 'License 安装', link: '/support/license-install' },
      { text: '社区与商业支持', link: '/support/community' },
    ]},
  ],
}

const enSidebar = {
  '/en/install/': [
    { text: 'Installation', items: [
      { text: 'Installation Guide', link: '/en/install/' },
      { text: 'Quick Start', link: '/en/install/quickstart' },
      { text: 'High Availability', link: '/en/install/ha' },
      { text: 'Upgrade Kuboard', link: '/en/install/upgrade' },
      { text: 'Migration from v3', link: '/en/install/migration-from-v3' },
      { text: 'Reverse Proxy', link: '/en/install/reverse-proxy' },
    ]},
  ],
  '/en/guide/': [
    { text: 'Cluster', items: [
      { text: 'Overview', link: '/en/guide/' },
      { text: 'Import Cluster', link: '/en/guide/cluster/import' },
      { text: 'Edit Cluster', link: '/en/guide/cluster/edit' },
      { text: 'Sync Status', link: '/en/guide/cluster/sync-status' },
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
  ],
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
    { text: 'Users & Auth', items: [
      { text: 'Login', link: '/en/user/login' },
      { text: 'Password Policy', link: '/en/user/password' },
      { text: 'MFA', link: '/en/user/mfa' },
      { text: 'Access Keys', link: '/en/user/access-keys' },
      { text: 'Users', link: '/en/user/users' },
      { text: 'Groups', link: '/en/user/groups' },
      { text: 'Roles', link: '/en/user/roles' },
      { text: 'OIDC SSO', link: '/en/user/oidc' },
      { text: 'Webhook Users', link: '/en/user/webhook-users' },
    ]},
  ],
  '/en/mcp/': [
    { text: 'MCP', items: [
      { text: 'Quick Start', link: '/en/mcp/' },
      { text: 'Server Configuration', link: '/en/mcp/server-config' },
      { text: 'Tools', link: '/en/mcp/tools' },
      { text: 'Approval Flow', link: '/en/mcp/approval-flow' },
      { text: 'Danger Levels', link: '/en/mcp/danger-levels' },
      { text: 'Prompts', link: '/en/mcp/prompts' },
    ]},
  ],
  '/en/ops/': [
    { text: 'Operations', items: [
      { text: 'Overview', link: '/en/ops/' },
      { text: 'Audit Log', link: '/en/ops/audit-log' },
      { text: 'Audit Policy', link: '/en/ops/audit-policy' },
      { text: 'NodeShell', link: '/en/ops/nodeshell' },
      { text: 'Debug Container', link: '/en/ops/debug-container' },
      { text: 'KuboardProxy', link: '/en/ops/kuboard-proxy' },
      { text: 'Terminal', link: '/en/ops/terminal' },
      { text: 'File Browser', link: '/en/ops/file-browser' },
      { text: 'Logs', link: '/en/ops/logs' },
      { text: 'SSE', link: '/en/ops/sse' },
    ]},
  ],
  '/en/reference/': [
    { text: 'Reference', items: [
      { text: 'Environment Variables', link: '/en/reference/kuboard-env' },
      { text: 'Logging & Tracing', link: '/en/reference/trace' },
      { text: 'System Config', link: '/en/reference/system-config' },
      { text: 'Menu Disable', link: '/en/reference/menu-disable' },
      { text: 'Resource Availability', link: '/en/reference/resource-availability' },
      { text: 'K8sCapability', link: '/en/reference/k8s-capability' },
      { text: 'RBAC Scopes', link: '/en/reference/rbac-scopes' },
      { text: 'Version Matrix', link: '/en/reference/version-matrix' },
      { text: 'API Reference', link: '/en/reference/api' },
      { text: 'Port Mapping', link: '/en/reference/port-mapping' },
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

export default defineConfig({
  lang: 'zh-CN',
  title: 'Kuboard V4',
  description:
    'Kuboard V4 - 基于 Kubernetes 的多集群容器管理平台官方文档 / Official documentation for the Kubernetes multi-cluster management platform',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#007af5' }],
  ],

  cleanUrls: true,
  lastUpdated: true,

  locales: {
    root: {
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

  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
  },
})