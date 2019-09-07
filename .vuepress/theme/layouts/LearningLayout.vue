<template>
  <ParentLayout>
    <div slot="sidebar-top">
      <div style="text-align: center; margin-top: 20px;">
        <div class="side-nav-item" :style="activeLinkStyle('/overview/') + 'margin-left: 0;'">
          <a href="/overview/" class="nav-link">简介</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/install/')">
          <a href="/install/install-dashboard.html" class="nav-link router-link-exact-active router-link-active">安装</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/learning/')">
          <a href="/learning/" class="nav-link router-link-exact-active router-link-active">学习</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/guide/')">
          <a href="/guide/" class="nav-link">使用</a>
        </div>
        <div class="side-nav-item" :style="activeLinkStyle('/micro-service/')">
          <a href="/micro-service/overview/kuboard-view-of-k8s.html" class="nav-link">微服务</a>
        </div>
        <!-- <div class="side-nav-item" :style="activeLinkStyle('/noactive/')">
          <a href="https://blog.kuboard.cn/compaign/" target="_blank" class="nav-link">博客</a>
        </div> -->
      </div>
      <StarGazer/>
      <Promotion/>
    </div>
    <div slot="page-top" class="page-top">
      <div style="display: inline-block; width: 400px;">
        <li><span style="color: red; font-weight: 500;">免费</span> Kubernetes 教程，绝对不降低品质</li>
        <li>QQ 群 <span style="color: red; font-weight: 500;">在线答疑</span>，加群请扫描侧边栏下方的二维码</li>
        <li>根据 QQ 群答疑情况，<span style="color: red; font-weight: 500;">不断完善</span> 教程</li>
      </div>
    </div>
    <div slot="page-bottom" class="bottom-description">Copyright © 2019-present 邵欢庆 <a href="http://www.eigpay.com" target="_blank">仁聚汇通</a> | 京ICP备19008693号-2</div>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

export default {
  mounted () {
  },
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
.page-top {
  margin-top: 5em;
  margin-bottom: -50px;
  padding: 0 40px;
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
