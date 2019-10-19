<template>
  <main class="page">
    <div class="page-nav" style="max-width: 1000px; margin-top: 56px;">
      <AdSensePageTop></AdSensePageTop>
    </div>
    <div class="page-nav" style="max-width: 1000px; margin: auto;">
      <div class="tip custom-block" style=" padding: 1rem; margin-top: 0;">
        <div style="display: inline-block; vertical-align: top;">
          <li><span style="color: red; font-weight: 500;">免费</span> Kubernetes 教程，绝不降低品质</li>
          <li><a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="$sendGaEvent('GithubStar', '页头求GitHubStar', 'GitHubStar: ' + $page.path)">给一个 Github Start</a> 是对作者最好的鼓励</li>
          <!-- <li><Qq></Qq> <span style="color: red; font-weight: 500;">在线答疑</span>，也可以扫描本文末尾的二维码加群</li> -->
        </div>
      </div>
    </div>
    <slot name="top" />

    <Content class="theme-default-content" style="padding-top: 0; margin-top: -3rem; padding-bottom: 1rem;"/>
    <JoinCommunity></JoinCommunity>
    <PageEdit style="max-width: 1000px;"/>
    <PageNav v-bind="{ sidebarItems }" style="max-width: 1000px;"/>
    <div class="page-nav" style="max-width: 1000px; padding-top:0; margin-top: 1rem;" v-if="!$frontmatter.lessAds">
      <AdSensePageBottomInline/>
    </div>
    <slot name="bottom" />
    <PageVssue class="page-nav" style="max-width: 1000px;"/>
    <FriendlyUrl class="page-nav" style="max-width: 1000px;"/>
    <StarGazer/>
    <AdSenseRightSide/>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import JoinCommunity from './JoinCommunity'

export default {
  components: { PageEdit, PageNav, JoinCommunity },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
