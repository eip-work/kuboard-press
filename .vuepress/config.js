let dateFns = require('date-fns')

module.exports = {
  title: 'Kuboard - Kubernetes k8s 安装文档/免费教程/实践/管理界面',
  description: '一个非常 cool 的 Kubernetes Dashboard，简化 Kubernetes 的学习和使用，帮助您快速落地 Kubernetes；同时提供 Spring Cloud 微服务部署教程，DevOps教程',
  head: [
    ['meta', {name: 'keywords', content: 'Kubernetes, Docker, Dashboard, Kuboard, Spring Cloud, micro service, DevOps, 微服务, 持续构建集成, 容器, Kubernetes 教程, K8S 教程, 微服务实践, Kubernetes 安装'}],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5434e5c7a3fe924c0d6c5bd6f0eae56b";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `],
    ['script', {type: 'text/javascript', src: 'https://tajs.qq.com/stats?sId=66467492', charset: 'UTF-8'}]
  ],
  markdown: {
    toc: { includeLevel: [2, 3] },
    lineNumbers: true
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
    '@vuepress/medium-zoom': {
      selector: 'p img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    },
    'code-switcher': {},
    'reading-progress': {},
    'vuepress-plugin-element-tabs': {},
    'vuepress-plugin-baidu-autopush':{},
    'sitemap': {
      hostname: 'https://www.kuboard.cn'
    },
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
    kuboardToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXZpZXdlci10b2tlbi1mdGw0diIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJvYXJkLXZpZXdlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImE1YWFiMmQxLTQxMjYtNDU5Yi1hZmNhLTkyYzMwZDk0NTQzNSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprdWJvYXJkLXZpZXdlciJ9.eYqN3FLIT6xs0-lm8AidZtaiuHeX70QTn9FhJglhEyh5dlyMU5lo8UtR-h1OY8sTSeYdYKJAS83-9SUObKQhp6XNmRgOYAfZblKUy4mvbGVQ3dn_qnzxYxt6zdGCwIY7E34eNNd9IjMF7G_Y4eJLWE7NvkSB1O8zbdn8En9rQXv_xJ9-ugCyr4CYB1lDGuZl3CIXgQ1FWcQdUBrxTT95tzcNTB0l6OUOGhRxOfw-RyIOST83GV5U0iVzxnD4sjgSaJefvCU-BmwXgpxAwRVhFyHEziXXa0CuZfBfJbmnQW308B4wocr4QDm6Nvmli1P3B6Yo9-HNF__d2hCwZEr7eg',
    nav: [
      { text: '简介', link: '/overview/' },
      { text: '安装', link: '/install/install-dashboard' },
      { text: '学习', link: '/learning/' },
      { text: '使用', link: '/guide/' },
      { text: '微服务', link: '/micro-service/overview/kuboard-view-of-k8s.html' },
      { text: '博客', link: 'https://blog.kuboard.cn/compaign' }
      // { text: 'DevOps', link: '/devops/' }
    ],
    displayAllHeaders: false,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: '更新时间',
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'eip-work/kuboard-press',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '文档仓库',

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
          title: '概念',
          collapsable: false,
          children: [
            'quick-win',
            'why-kuboard',
            'concepts'
          ]
        }, {
          title: '技术支持',
          collapsable: false,
          children: [
            'support',
            'change-log'
          ]
        }
      ],

      '/articles/': [
        {
          title: '文章',
          collapsable: false,
          children: [
            '201908/kuboard-view-of-k8s'
          ]
        }
      ],

      '/install/': [
        {
          title: '安装 Kubernetes',
          collapsable: false,
          children: [
            ['install-k8s', '安装 Kubernetes 单Master节点'],
            'install-kubernetes',
            'install-kubectl'
          ]
        },
        {
          title: '安装 Kuboard',
          collapsable: false,
          children: [
            'install-dashboard',
            'install-dashboard-upgrade'
          ]
        },
        {
          title: '常见问题',
          collapsable: false,
          children: [
            'faq/timeout'
          ]
        }
      ],

      '/learning/': [
        {
          title: 'Kubernetes 入门',
          collapsable: false,
          children: [
            'k8s-basics/kubernetes-basics',
            'k8s-basics/deploy-app',
            'k8s-basics/explore',
            'k8s-basics/expose',
            'k8s-basics/scale',
            'k8s-basics/update',
            'k8s-basics/k8s-core-concepts'
          ]
        },
        {
          title: 'Kubernetes 进阶',
          collapsable: false,
          children: [
            'k8s-intermediate/ingress',
            'k8s-intermediate/config-map',
            // 'k8s-intermediate/recommendation',
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
          title: '监控套件',
          collapsable: false,
          children: [
            'monitor/',
            'monitor/apis'
          ]
        },
      ],

      '/micro-service/': [
        {
          title: '概述',
          collapsable: false,
          children: [
            'overview/kuboard-view-of-k8s'
          ]
        },
        {
          title: 'Spring Cloud',
          collapsable: false,
          children: [
            'spring-cloud/',
            // 'spring-cloud/cloud-eureka'
          ]
        },
      ],

      '/devops/': [
        {
          title: 'Devops',
          collapsable: false,
          children: [
            ''
          ]
        }
      ],

      '/support/': [
        '',
        'change-log'
      ],
    }
  }
}
