let dateFns = require('date-fns')

module.exports = {
  title: 'Kuboard',
  description: 'A cool Kubernetes Dashboard',
  head: [
    ['meta', {name: 'keywords', content: 'Kubernetes, Docker, Dashboard, Kuboard, Linux, K8S, cluster, 分布式, 集群, 容器, 高可用'}],
  ],
  markdown: {
    toc: { includeLevel: [2, 3] }
  },
  dest: 'docs',
  plugins: {
    '@vuepress/google-analytics':
        {
          ga: 'UA-144196556-1',
        },
    '@vuepress/back-to-top': {},
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        return dateFns.format(timestamp, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    'reading-progress': {},
    'vuepress-plugin-element-tabs': {},
    'seo': {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: $page => $page.frontmatter.tags,
      // twitterCard: _ => 'summary_large_image',
      type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
      url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
      image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
      publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
    }
  },
  themeConfig: {
    nav: [
      { text: '简介', link: '/overview/' },
      { text: '安装', link: '/install/' },
      { text: '使用', link: '/guide/' },
      { text: '支持', link: '/support/' },
    ],
    displayAllHeaders: false,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: '更新时间',
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // repo: 'eip-work/kuboard-press',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看文档源码',

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'eip-work/kuboard-press',
    // 假如文档不是放在仓库的根目录下：
    docsDir: '',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    sidebar: {
      '/overview/': [
        {
          title: '简介',
          collapsable: false,
          children: [
            ''
          ]
        }, {
          title: 'Why Kuboard',
          collapsable: false,
          children: [
            'why-kuboard',
            'concepts'
          ]
        }
      ],

      '/install/': [
        {
          title: '概述',
          collapsable: false,
          children: [
            ''
          ]
        },
        {
          title: '安装 Kubernetes',
          collapsable: false,
          children: [
            'install-k8s',
            'install-kubernetes',
            'install-kubectl'
          ]
        },
        {
          title: '安装 Kuboard',
          collapsable: false,
          children: [
            'install-dashboard'
          ]
        },
      ],

      '/guide/': [
        {
          title: '概述',
          collapsable: false,
          children: [
            ['', '概述']
          ]
        },
        {
          title: 'Example',
          collapsable: false,
          children: [
            'example/busybox',
            'example/import',
            'example/monitor',
          ]
        },
        {
          title: '集群管理',
          collapsable: false,
          children: [
            'cluster/computing',
            'cluster/storage',
            'cluster/namespace'
          ]
        },
        {
          title: '应用管理',
          collapsable: false,
          children: [
            'namespace/workload',
            'namespace/secrets',
            'namespace/configMap',
            'namespace/pvc',
            'namespace/adjustion',
            'namespace/multi-env'
          ]
        },
        {
          title: '问题诊断',
          collapsable: false,
          children: [
            'diagonize/events',
            'diagonize/logs',
            'diagonize/port-forward'
          ]
        },
        {
          title: '监控套件 （alpha）',
          collapsable: false,
          children: [
            'monitor/',
            'monitor/apis'
          ]
        },
      ],

      '/support/': [
        ''
      ],
    }
  }
}


