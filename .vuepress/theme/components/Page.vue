<template>
  <main class="page">
    <div class="page-nav" style="max-width: 1000px; margin-top: 56px;">
    </div>
    <div v-show="!$isSharing && !$frontmatter.lessAds" class="page-nav" style="max-width: 1000px; margin: auto;">
      <div class="tip custom-block row" style="padding: 1rem; margin-top: 0;">
        <div style="display: inline-block; vertical-align: top; line-height: 1.6rem;" class="col-md-8">
          <li>
            <span style="color: red; font-weight: 500;">免费</span>
            Kubernetes教程K8S教程，绝不降低品质
          </li>
          <li data-aos="fade-up">
            <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="$sendGaEvent('GithubStar', '页头求GitHubStar', 'GitHubStar: ' + $page.path)">只要一个 Github Star <OutboundLink/></a>
            就可以鼓励作者尽快完成 <span style="color: red; font-weight: 500;">剩下的 {{$themeConfig.incompleteRatio}}% </span>
          </li>
          <li>
            <!-- <Qq></Qq> 
            群号: 808894550  -->
            <span style="font-weight: 500;">在线答疑</span> 方式见页尾
            <!-- 初学者可选择在线课程，语言更通俗：
            <span @click="$sendGaEvent('极客时间', '极客时间', '极客时间：' + $page.path)">
              <a target="_blank" href="https://time.geekbang.org/column/intro/100015201?code=MH1Wu456g0ZsrKtQI7QidivKV2hVvzerAUxDz5pOuQs%3D">深入剖析Kubernetes</a>
            </span> -->
          </li>
        </div>
        <div class="col-md-4">
          <span style="font-size: 18px; font-weight: 600;">Kuboard</span>
          <br/>
          <span style="font-size: 14px; color: #666;">- 快速在 Kubernetes 落地微服务</span>
          <!-- <a href="https://ke.qq.com/course/477593?flowToken=1017366" target="_blank">
            <FancyImage src="/images/courses/kubeadm.png" title="K8S高薪培训" description="360讲师授课" alt="K8S培训_高薪培训" type="Rectangle"/>
          </a> -->
        </div>
      </div>
    </div>
    <slot name="top" />

    <Content class="theme-default-content" style="padding-top: 0; margin-top: -3rem; padding-bottom: 1rem;"/>
    <!-- <div class="page-nav" style="max-width: 1000px; padding-top:0; margin-top: 1rem;" v-if="!!$isSharing">
      <p style="text-align: center;">
        <a href="/">
          <img src="/images/logo-main.png" style="margin: auto;">
        </a>
      </p>
    </div> -->
    <JoinCommunity style="padding: 1rem 2.5rem;"></JoinCommunity>
    <PageEdit style="max-width: 1000px; padding: 1rem 2.5rem; margin-top: 2rem; background-color: #FFF;"/>
    <PageNav v-bind="{ sidebarItems }" style="max-width: 1000px; padding: 1rem 2.5rem;"/>
    <div class="page-nav" style="max-width: 1000px; padding-top:0; margin-top: 1rem;">
      <LazyLoad :noAdsOnSharing="false">
        <AdSensePageBottomInline/>
      </LazyLoad>
    </div>
    <slot name="bottom" />
    <PageVssue class="page-nav" style="max-width: 1000px;" v-show="!$isSharing"/>
    <FriendlyUrl class="page-nav" style="max-width: 1000px;" v-show="!$isSharing"/>
    <StarGazer/>
    <LazyLoad :noAdsOnSharing="true">
      <AdSenseRightSide v-show="!$isSharing"/>
    </LazyLoad>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import JoinCommunity from './JoinCommunity'

export default {
  components: { PageEdit, PageNav, JoinCommunity },
  props: ['sidebarItems'],
  data () {
    return {
    }
  },
  mounted () {
    if (this.$isSharing) {
      document.title = this.$frontmatter.sharingTitle || this.$page.title
      this.$frontmatter.title = this.$frontmatter.sharingTitle
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
