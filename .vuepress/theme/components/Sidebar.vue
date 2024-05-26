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
      <div class="side-nav-item" :style="activeLinkStyle('/v4/')">
        <a :href="`/v4/install/quickstart.html${urlSurfix}`" class="nav-link router-link-exact-active router-link-active">V4</a>
      </div>
      <div class="side-nav-item" :style="activeLinkStyle('/install/')">
        <a :href="`/install/v3/install.html${urlSurfix}`" class="nav-link router-link-exact-active router-link-active">安装</a>
      </div>
      <div class="side-nav-item" :style="activeLinkStyle('/learning/')">
        <a :href="`/learning/${urlSurfix}`" class="nav-link router-link-exact-active router-link-active">教程</a>
      </div>
      <!-- <div class="side-nav-item" :style="activeLinkStyle('/guide/')">
        <a :href="`/guide/${urlSurfix}`" class="nav-link">使用</a>
      </div> -->
      <div class="side-nav-item" :style="activeLinkStyle('/support/')">
        <a :href="`/support/${urlSurfix}`" class="nav-link">支持</a>
      </div>
      <!-- <div class="side-nav-item" :style="activeLinkStyle('/forum/')">
        <a :href="`https://forum.kuboard.cn`" target="_blank" class="nav-link">论坛</a>
      </div> -->
      <KuboardDemo class="side-nav-item" suffix="sidebar"></KuboardDemo>
    </div>
    <slot name="top"/>
    <SidebarLinks :depth="0" :items="items"/>
    <slot name="bottom"/>
    <div style="text-align: center; margin-top: 5vh;">
      <p>
        <KuboardDemo suffix="sidebar2" label="在线演示" color="#007af5"></KuboardDemo>
      </p>
      <div>
        <KuboardDemo suffix="sidebar3">
          <a target="_blank" href="https://demo.kuboard.cn">
            <FancyImage style="width: 242px;" src="/images/preview.png" alt="Kubernetes教程_Kuboard在线体验" title="Kuboard" description="https://demo.kuboard.cn"></FancyImage>
          </a>
        </KuboardDemo>
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
  margin-left: 10px;
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
