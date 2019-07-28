<template>
  <ParentLayout>
    <div slot="sidebar-top">
      <div style="text-align: center; margin-top: 20px;">
        <div class="side-nav-item" :style="activeLinkStyle('/overview/') + 'margin-left: 0;'">
          <a href="/overview/" class="nav-link">简介</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/install/')">
          <a href="/install/install-dashboard" class="nav-link router-link-exact-active router-link-active">安装</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/guide/')">
          <a href="/guide/" class="nav-link">使用</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/micro-service/')">
          <a href="/micro-service/spring-cloud/" class="nav-link">微服务</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/support/')">
          <a href="/support/" class="nav-link">支持</a>
        </div>
      </div>
    </div>
    <div slot="page-bottom" class="bottom-description">Copyright © 2019-present Huanqing Shao</div>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

export default {
  components: {
    ParentLayout
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

<style scoped>
.bottom-description {
  text-align: center;
  font-size: 0.8rem;
  color: #909399;
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
