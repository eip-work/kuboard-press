<template>
  <main class="page">
    <div class="page-nav" style="max-width: 1000px; margin-top: 56px;">
    </div>
    <div v-show="!$isSharing && !$frontmatter.lessAds" class="page-nav" style="max-width: 1000px; margin: auto;">
      <div class="tip custom-block row" style="padding: 1rem; margin-top: 0;">
        <div style="display: inline-block; vertical-align: top; line-height: 1.6rem;" class="col-md-8">
          <li data-aos="fade-up">
            <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="$sendGaEvent('GithubStar', '页头求GitHubStar', 'GitHubStar: ' + $page.path)">加 Github Star <OutboundLink/></a>
          </li>
        </div>
        <div class="col-md-4">
          <span style="font-size: 18px; font-weight: 600;">Kuboard</span>
          <br/>
          <span style="font-size: 14px; color: #666;">- 优秀的 Kubernetes 管理面板</span>
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
    <!-- <OnlineChat></OnlineChat> -->
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import JoinCommunity from './JoinCommunity'
import OnlineChat from './OnlineChat.vue'

export default {
  components: { PageEdit, PageNav, JoinCommunity, OnlineChat },
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
