<template>
  <ParentLayout>
    <div slot="sidebar-top">
      <div style="text-align: center; margin-top: 10px;">
        <!-- <div>
          <span style="font-size: 13px;">扫第一个二维码完成打赏，扫第二个进微信群聊</span>
          <p style="margin-top: 10px;">
            <img src="/dz.png" style="width: 120px; margin-right: 20px;"></img>
            <img src="/dz2.jpeg" style="width: 120px;"></img>
          </p>
        </div> -->
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
        <div class="side-nav-item" :style="activeLinkStyle('/support/')">
          <a href="/support/" class="nav-link">支持</a>
        </div>
        <!-- <div class="side-nav-item" :style="activeLinkStyle('/noactive/')">
          <a href="https://blog.kuboard.cn/compaign/" target="_blank" class="nav-link">博客</a>
        </div> -->
      </div>
      <StarGazer/>
    </div>
    <div slot="page-top" class="theme-default-content content__default page-top">
      <div class="tip custom-block" style="padding: 10px 20px; margin-top: 0;">
        <div style="display: inline-block; vertical-align: top;">
          <li><span style="color: red; font-weight: 500;">免费</span> Kubernetes 教程，绝不降低品质</li>
          <li><a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="$sendGaEvent('GithubStar', '页头求GitHubStar', 'GitHubStar: ' + $page.path)">给一个 Github Start</a> 是对作者最好的鼓励</li>
          <!-- <li><Qq></Qq> <span style="color: red; font-weight: 500;">在线答疑</span>，也可以扫描本文末尾的二维码加群</li> -->
        </div>
      </div>
    </div>
    <div slot="page-bottom" class="bottom-description">Copyright © 2019-present 邵欢庆 <span @click="$sendGaEvent('友情链接', '友情链接: 仁聚汇通', '友情链接:' + $page.path)"><a href="http://www.eigpay.com" target="_blank">仁聚汇通</a></span> | 京ICP备19008693号-2
    </div>
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
