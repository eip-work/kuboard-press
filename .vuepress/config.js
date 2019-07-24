module.exports = {
  title: 'Kuboard',
  description: 'A cool Kubernetes Dashboard',
  markdown: {
    toc: { includeLevel: [2, 3] }
  },
  dest: 'docs',
  serviceWorker: true,
  plugins: {
    '@vuepress/google-analytics':
        {
          ga: 'UA-144196556-1',
        },
    '@vuepress/back-to-top': {},
    '@vuepress/last-updated': {}
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
    sidebar: {
      '/overview/': [
        ['', '简介'],
        ['why-kuboard', '为什么选择 Kuboard'],
        ['concepts', '如何降低K8S学习门槛']
      ],

      '/install/': [
        '',
        'install-k8s',
        'install-kubernetes',
        'install-dashboard'
        // {
        //   title: '概述',
        //   collapsable: false,
        //   children: [
        //     ['', '概述']
        //   ]
        // },
        // {
        //   title: '安装 Kubernetes',
        //   collapsable: false,
        //   children: [
        //     ['install-k8s', '安装 Kubernetes 用于测试'],
        //     ['install-kubernetes', '安装 Kubernetes 高可用'],
        //   ]
        // },
        // {
        //   title: '安装 Kuboard',
        //   collapsable: false,
        //   children: [
        //     ['install-dashboard', '安装 Kuboard'],
        //   ]
        // },
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

      // // fallback
      // '/': [
      //   ''
      // ]
    }
  }
}


