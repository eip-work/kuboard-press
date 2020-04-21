let dateFns = require('date-fns')

module.exports = {
  // configureWebpack: () => ({
  //   devtool: 'source-map'
  // }),
  modules: ['bootstrap-vue/nuxt'],
  title: 'Kuboard官网',
  description: '一款Kubernetes_Dashboard_简化Kubernetes的学习和使用_帮助您快速落地Kubernetes_提供_Kubernetes_免费中文教程_国内安装文档',
  head: [
    // ['meta', {name: 'keywords', content: 'Kubernetes教程,Kubernetes安装,K8S教程,K8S安装,Kubernetes管理界面'}],
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // ['link', { rel: 'stylesheet', href: '/grey.css'}],
    ['meta', { name: 'theme-color', content: '#007af5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5434e5c7a3fe924c0d6c5bd6f0eae56b";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `],

    ['script', { 'data-ad-client': "ca-pub-3313149841665250", async: true, src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}],
    // ['script', { type: 'text/javascript', src: '//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js', 'data-dojo-config': 'usePlainJson: true, isDebug: false'}],
    // ['script', { type: 'text/javascript'}, `window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"2273cb19eb20bb1bc5b7745a7","lid":"f1f25d6dac","uniqueMethods":true}) })`],

  ],
  markdown: {
    toc: { includeLevel: [2, 3] },
    lineNumbers: true,
    externalLinks: { target: '_blank', rel: 'nofollow', onclick: 'openOutboundLink(this)' }
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
        return dateFns.format(timestamp, 'yyyy-MM-dd HH:mm:ss')
      }
    },
    'vuepress-plugin-code-copy': {
      successText: '已复制到剪贴板！',
      align: 'bottom',
      backgroundColor: '#FFFFFF',
      color: '#FFFFFF',
      // selector: 'div[class*="language-"] pre'
      selector: 'div[class*="language-"] pre'
    },
    // '@vuepress/pwa': {
    //   serviceWorker: true,
    //   // popupComponent: 'KbSWUpdatePopup',
    //   updatePopup: {
    //     '/': {
    //       message: "Kuboard官网已更新",
    //       buttonText: "点击刷新"
    //     }
    //   }
    // },
    // '@vuepress/pwa': {
    //   serviceWorker: true,
    //   updatePopup: true
    // },
    '@vssue/vuepress-plugin-vssue': {
      // set `platform` rather than `api`
      platform: 'github-v4',
      locale: 'zh-CN',
      autoCreateIssue: false,
      admins: ['shaohq'],
      // all other options of Vssue are allowed
      owner: 'eip-work',
      repo: 'kuboard-press',
      // clientId: 'f96af83d4bff4e2b9e3e',
      // clientSecret: 'cf5686d68d4aab6d3bfa256da9a714049b239c1f',
    },
    'named-chunks': {
      pageChunkName: page => 'page' + page.key.slice(1),
      layoutChunkName: layout => 'layout-' + layout.componentName,
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
    // 'vuepress-plugin-smooth-scroll': {},
    'code-switcher': {},
    'reading-progress': {},
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
    incompleteRatio: 15,
    showMoreAds: false,
    showAds: true,
    kuboardToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXZpZXdlci10b2tlbi1mdGw0diIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJvYXJkLXZpZXdlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImE1YWFiMmQxLTQxMjYtNDU5Yi1hZmNhLTkyYzMwZDk0NTQzNSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprdWJvYXJkLXZpZXdlciJ9.eYqN3FLIT6xs0-lm8AidZtaiuHeX70QTn9FhJglhEyh5dlyMU5lo8UtR-h1OY8sTSeYdYKJAS83-9SUObKQhp6XNmRgOYAfZblKUy4mvbGVQ3dn_qnzxYxt6zdGCwIY7E34eNNd9IjMF7G_Y4eJLWE7NvkSB1O8zbdn8En9rQXv_xJ9-ugCyr4CYB1lDGuZl3CIXgQ1FWcQdUBrxTT95tzcNTB0l6OUOGhRxOfw-RyIOST83GV5U0iVzxnD4sjgSaJefvCU-BmwXgpxAwRVhFyHEziXXa0CuZfBfJbmnQW308B4wocr4QDm6Nvmli1P3B6Yo9-HNF__d2hCwZEr7eg',
    nav: [
      // { text: '简介', link: '/overview/' },
      { text: '安装', link: '/install/install-dashboard' },
      { text: '教程', link: '/learning/' },
      { text: '使用', link: '/guide/' },
      { text: '支持', link: '/support/' },
      // { text: '培训', link: 'https://kubetrain.cn/?from=kuboard', target: '_blank' },
      // { text: '博客', link: 'http://k8s.kubetrain.cn/' },
      // { text: '论坛', link: 'http://bbs.kuboard.cn/', target: '_blank' },
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
    sidebar: require('./config-sidebar')
  }
}
