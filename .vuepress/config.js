let dateFns = require('date-fns')

module.exports = {
  title: 'Kuboard',
  description: 'A cool Kubernetes Dashboard',
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
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "内容已更新",
        buttonText: "刷新"
      }
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


