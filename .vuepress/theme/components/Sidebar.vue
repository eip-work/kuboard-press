<template>
  <aside class="sidebar">
    <LazyLoad :noAdsOnSharing="false">
      <AdSenseLeftTop/>
    </LazyLoad>
    <!-- <NavLinks/> -->
    <div style="text-align: center; margin-top: 10px;">
      <!-- <div class="side-nav-item" :style="activeLinkStyle('/overview/') + 'margin-left: 0;'">
        <a :href="`/overview/${urlSurfix}`" class="nav-link">简介</a>
      </div> -->
      <div class="side-nav-item" :style="activeLinkStyle('/install/')">
        <a :href="`/install/install-dashboard.html${urlSurfix}`" class="nav-link router-link-exact-active router-link-active">安装</a>
      </div>
      <div class="side-nav-item" :style="activeLinkStyle('/learning/')">
        <a :href="`/learning/${urlSurfix}`" class="nav-link router-link-exact-active router-link-active">教程</a>
      </div>
      <div class="side-nav-item" :style="activeLinkStyle('/guide/')">
        <a :href="`/guide/${urlSurfix}`" class="nav-link">使用</a>
      </div>
      <div class="side-nav-item" :style="activeLinkStyle('/support/')">
        <a :href="`/support/${urlSurfix}`" class="nav-link">支持</a>
      </div>
      <!-- <div class="side-nav-item" :style="activeLinkStyle('/training/')">
        <a :href="`https://kubetrain.cn/?from=kuboard`" class="nav-link" target="_blank">培训</a>
      </div> -->
      <!-- <div class="side-nav-item">
        <a href="http://k8s.kubetrain.cn" class="nav-link" target="_blank">博客</a>
      </div> -->
      <!-- <div class="side-nav-item">
        <a href="http://bbs.kuboard.cn" class="nav-link" target="_blank">论坛</a>
      </div> -->
    </div>
    <slot name="top"/>
    <SidebarLinks :depth="0" :items="items"/>
    <slot name="bottom"/>
    <div style="text-align: center; margin-top: 5vh;">
      <!-- <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
        <img style="width: 242px; border: 1px solid #d7dae2;" src="/images/logo-main.png" alt="Kuboard_快速在Kubernetes上落地微服务"/>
      </a> -->

      <p>
        <strong>
          <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">在线体验</a>
        </strong>
      </p>
      <div>
        <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
          <FancyImage style="width: 242px;" src="/images/preview.gif" alt="Kubernetes教程_Kuboard在线体验" title="Kuboard" description="快速在 Kubernetes 上落地微服务"></FancyImage>
        </a>
      </div>
      <p>
      </p>
      <!-- <strong>在线答疑</strong>
      <Qq/>
      <p>
        <img src="/images/kuboard_qq.png" style="width: 120px;" alt="Kubernetes教程：QQ群在线答疑"/>
      </p> -->
    </div>
    <!-- <el-divider >Kuboard</el-divider> -->
    <div style="height: 2rem;"></div>
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks },

  props: ['items'],
  data () {
    return {
    }
  },
  computed: {
    urlSurfix () {
      // return this.isSharing ? '' : '?sharing=true'
      return ''
    }
  },
  methods: {
    activeLinkStyle(href) {
      if (this.$page.path.indexOf(href) === 0) {
        return 'border-bottom: 2px solid #0b85ff;'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0

.page-top {
  margin-top: 0 !important;
  margin-bottom: -80px !important;
}
.bottom-description {
  text-align: center;
  font-size: 0.8rem;
  color: #909399;
  margin-top: 2rem;
}
.side-nav-item {
  margin-bottom: -2px;
  margin-left: 3px;
  display: inline-block;
  line-height: 1.4rem;
  white-space: nowrap;
  font-size: 1rem;
  cursor: pointer;
}
.side-nav-item a {
  color: #2c3e50;
}
</style>
