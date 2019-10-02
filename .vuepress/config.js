let dateFns = require('date-fns')

module.exports = {
  title: 'Kuboard官网',
  description: '一款Kubernetes_Dashboard_简化Kubernetes的学习和使用_帮助您快速落地Kubernetes_提供_Kubernetes_免费中文教程_国内安装文档',
  head: [
    // ['meta', {name: 'keywords', content: 'Kubernetes教程,Kubernetes安装,K8S教程,K8S安装,Kubernetes管理界面'}],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5434e5c7a3fe924c0d6c5bd6f0eae56b";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `],
    ['link', {rel: "stylesheet", href: "/java-script-dist/swiper-4.5.0/css/swiper.min.css"}],    
    ['script', {src: '/java-script-dist/swiper-4.5.0/js/swiper.min.js'}],
    // ['script', {type: 'text/javascript', src: 'https://tajs.qq.com/stats?sId=66467492', charset: 'UTF-8'}]
  ],
  markdown: {
    toc: { includeLevel: [2, 3] },
    lineNumbers: true,
    externalLinks: { target: '_blank', rel: 'noopener noreferrer', onclick: 'openOutboundLink(this)' }
  },
  dest: 'docs',
  plugins: {
    '@vuepress/active-header-links': {},
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
    '@vssue/vuepress-plugin-vssue': {
      // set `platform` rather than `api`
      platform: 'github',
      locale: 'zh-CN',
      autoCreateIssue: false,
      admins: ['shaohq'],
      // all other options of Vssue are allowed
      owner: 'eip-work',
      repo: 'kuboard-press',
      // clientId: 'f96af83d4bff4e2b9e3e',
      // clientSecret: 'cf5686d68d4aab6d3bfa256da9a714049b239c1f',
    },
    // 'vuepress-plugin-zooming': {
    //   // 支持点击缩放的图片元素的选择器
    //   // 默认值： '.theme-default-content img'
    //   selector: '.theme-default-content img',
    //   // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
    //   // 默认值： 500
    //   delay: 1000,
    //   // zooming 的 options
    //   // 默认值： {}
    //   options: {
    //     bgColor: 'black',
    //     zIndex: 10000,
    //   },
    // },
    'code-switcher': {},
    'reading-progress': {},
    'vuepress-plugin-element-tabs': {},
    // 'vuepress-plugin-baidu-autopush':{},
    'sitemap': {
      hostname: 'https://kuboard.cn',
      outFile: '3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRl.xml'
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
      { text: '支持', link: '/support/' },
      // { text: '博客', link: 'https://blog.kuboard.cn/compaign' }
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
        }, 
        // {
        //   title: '技术支持',
        //   collapsable: false,
        //   children: [
        //     'support',
        //     'change-log'
        //   ]
        // }
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
            'install-docker-desktop',
            ['install-k8s', '安装Kubernetes单Master节点'],
            'install-kubernetes',
            'install-kubectl'
          ]
        },
        {
          title: '升级 Kubernetes',
          collapsable: false,
          children: [
            // ['install-k8s-upgrade', '升级Kubernetes集群'],
            'upgrade-k8s/1.15.x-1.15.4',
            'upgrade-k8s/1.15.x-1.16.x',
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
        // {
        //   title: '常见问题',
        //   collapsable: false,
        //   children: [
        //     'faq/timeout'
        //   ]
        // }
      ],

      '/learning/': [
        {
          title: 'Kubernetes 入门',
          collapsable: true,
          sidebarDepth: 3,
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
          collapsable: true,
          children: [
            'k8s-intermediate/private-registry',
            {
              title: '工作负载',
              collapsable: true,
              children: [
                'k8s-intermediate/workload/pod',
                'k8s-intermediate/workload/pod-lifecycle',
                'k8s-intermediate/workload/init-container',
                'k8s-intermediate/workload/workload',
                {
                  title: '控制器 - Deployment',
                  collapsable: true,
                  children: [
                    'k8s-intermediate/workload/wl-deployment/',
                    'k8s-intermediate/workload/wl-deployment/create',
                    'k8s-intermediate/workload/wl-deployment/update',
                    'k8s-intermediate/workload/wl-deployment/rollback',
                    'k8s-intermediate/workload/wl-deployment/scale',
                    'k8s-intermediate/workload/wl-deployment/pause',
                    'k8s-intermediate/workload/wl-deployment/status',
                    'k8s-intermediate/workload/wl-deployment/cleanup',
                    'k8s-intermediate/workload/wl-deployment/canary',
                  ]
                },
                {
                  title: '控制器 - StatefulSet',
                  collapsable: true,
                  children: [
                    'k8s-intermediate/workload/wl-statefulset/',
                    'k8s-intermediate/workload/wl-statefulset/basics.html',
                    'k8s-intermediate/workload/wl-statefulset/scaling.html',
                    'k8s-intermediate/workload/wl-statefulset/update.html',
                  ]
                },
                {
                  title: '控制器 - DaemonSet',
                  collapsable: true,
                  children: [
                    'k8s-intermediate/workload/wl-daemonset/',
                    'k8s-intermediate/workload/wl-daemonset/create',
                    'k8s-intermediate/workload/wl-daemonset/schedule',
                    'k8s-intermediate/workload/wl-daemonset/communicate',
                    'k8s-intermediate/workload/wl-daemonset/update',
                    'k8s-intermediate/workload/wl-daemonset/alternative',
                  ]
                }
              ]
            },
            {
              title: '服务发现、负载均衡、网络',
              collapsable: true,
              children: [
                'k8s-intermediate/service/service',
                'k8s-intermediate/service/service-details',
                'k8s-intermediate/service/service-types',
                'k8s-intermediate/service/dns',
                'k8s-intermediate/service/connecting',
                'k8s-intermediate/service/ingress',
                'k8s-intermediate/service/cni',
              ]
            },
            {
              title: '存储',
              collapsable: true,
              children: [
                'k8s-intermediate/persistent/volume',
                'k8s-intermediate/persistent/pv',
                'k8s-intermediate/persistent/storage-class',
                // 'k8s-intermediate/persistent/nfs',
              ]
            },
            {
              title: '配置',
              collapsable: true,
              children: [
                'k8s-intermediate/config/config-map',
                'k8s-intermediate/config/computing-resource',
                'k8s-intermediate/config/assign-pod-node',
                {
                  title: '污点和容忍',
                  collapsable: true,
                  children: [
                    'k8s-intermediate/config/taints-toleration/',
                    'k8s-intermediate/config/taints-toleration/use-case',
                    'k8s-intermediate/config/taints-toleration/taint-based-evictions',
                    'k8s-intermediate/config/taints-toleration/taint-nodes-by-condition',
                  ]
                },
                {
                  title: 'Secret',
                  collapsable: true,
                  children: [
                    'k8s-intermediate/config/secrets/',
                    'k8s-intermediate/config/secrets/create-kubectl',
                    'k8s-intermediate/config/secrets/create-manually',
                    'k8s-intermediate/config/secrets/create-generator',
                    'k8s-intermediate/config/secrets/create-kuboard',
                    'k8s-intermediate/config/secrets/decode-edit',
                    'k8s-intermediate/config/secrets/use-case-ingress-tls',
                    // 'k8s-intermediate/config/secrets/use-as_file',
                    // 'k8s-intermediate/config/secrets/use-as_env',
                    // 'k8s-intermediate/config/secrets/use-image-pull-secrets',
                    // 'k8s-intermediate/config/secrets/details',
                    // 'k8s-intermediate/config/secrets/use-cases',
                    // 'k8s-intermediate/config/secrets/best-practices',
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Kubernetes 高级',
          collapsable: false,
          path: 'k8s-advanced/',
          children: [
            
          ]
        },
        {
          title: 'Kubernetes 实战',
          collapsable: true,
          children: [
            {
              title: '概述',
              collapsable: false,
              children: [
                'k8s-practice/micro-service/kuboard-view-of-k8s'
              ]
            },
            {
              title: 'Spring Cloud',
              collapsable: false,
              children: [
                'k8s-practice/spring-cloud/',
                // 'spring-cloud/cloud-eureka'
              ]
            },
            {
              title: 'Open Capacity Platform',
              collapsable: true,
              children: [
                {
                  title: '准备',
                  collapsable: false,
                  path: '/learning/k8s-practice/ocp/',
                  children: [
                    ['k8s-practice/ocp/', 'OCP介绍'],
                    'k8s-practice/ocp/prepare',
                    'k8s-practice/ocp/build',
                  ]
                },
                {
                  title: '部署',
                  collapsable: false,
                  path: '/learning/k8s-practice/ocp/sequence.html',
                  children: [
                    'k8s-practice/ocp/sequence',
                    'k8s-practice/ocp/eureka-server',
                    'k8s-practice/ocp/mysql',
                    'k8s-practice/ocp/redis',
                    'k8s-practice/ocp/auth-server',
                    'k8s-practice/ocp/user-center',
                    'k8s-practice/ocp/api-gateway',
                    'k8s-practice/ocp/back-center',
                    'k8s-practice/ocp/review',
                  ]
                },
                {
                  title: '多环境',
                  collapsable: false,
                  path: '/learning/k8s-practice/ocp/export.html',
                  children: [
                    'k8s-practice/ocp/export',
                    'k8s-practice/ocp/import',
                  ]
                },
              ]
            },
          ]
        }
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
      
      '/support/': [
        {
          title: '授权/支持',
          collapsable: false,
          children: [
            '',
          ]
        },
        {
          title: '更新说明',
          collapsable: false,
          children: [
            'change-log/v1.0.x',
          ]
        }
      ],

    }
  }
}
