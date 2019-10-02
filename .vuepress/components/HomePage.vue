<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <h1 id="main-title">Kuboard</h1>

      <p class="description">
        快速在 Kubernetes 上落地微服务
      </p>

      <span
        class="action"
        v-if="data.actionText"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </span>
      <span
        class="action"
        v-if="data.actionText2 && data.actionLink2"
      >
        <NavLink
          class="action-button action-button2"
          :item="actionLink2"
        />
      </span>
    </header>

    <div
      class="features"
      v-if="data.features && data.features.length"
    >
      <div
        class="feature"
        v-for="(feature, index) in data.features"
        :key="index"
        @click="$router.push({ path: feature.link })"
      >
        <div class="feature-content">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
        <div class="feature-mask">
          <h2>{{ feature.title }}</h2>
          <p style="color: #007af5; font-weight: 500;">点击查看</p>
        </div>
      </div>
    </div>

    <div style="max-width: 450px; margin: auto;">
      <img src="/images/logo-main.png" style="background-color: #0063dc; max-width: 100%;" alt="Slogon:Kuboard_快速在Kubernetes上落地微服务"/>
    </div>

    <p>
      <a target="_blank" :href="`http://demo.kuboard.cn/#/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
        Kuboard 在线体验
      </a>
    </p>

<Content></Content>

<!-- <p>
为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>
</!-->

<!-- <div style="width: 100%; margin-bottom: 20px;">
  <a target="_blank" :href="`http://demo.kuboard.cn/#/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
    <img src="./1564841972085.gif" style="border: 1px solid #d7dae2; width: 100%;"></img>
  </a>
</!-->

    <div class="footer">
      Copyright © 2019-present <a href="http://www.eigpay.com" target="_blank">仁聚汇通</a> | 京ICP备19008693号-2
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink },
  created () {
    console.log(this.$page)
    // this.$title = 'hello---'
  },
  mounted () {
    // window.document.title = 'Kuboard 官网 - Kubernetes k8s 国内安装/部署/入门/免费中文教程/实践/微服务管理界面'
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: `http://demo.kuboard.cn/#/dashboard?k8sToken=${this.$site.themeConfig.kuboardToken}`,
        text: this.data.actionText
      }
    },
    actionLink2 () {
      return {
        link: this.data.actionLink2,
        text: this.data.actionText2
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      vertical-align: top
      margin-left: 0.5rem
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
        color #fff
    .action-button2
      color $accentColor
      background-color #ffffff
      border 1px solid $accentColor
  .features
    border-top 1px solid $borderColor
    padding 2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    width 32%
    height calc(240px + 2rem)
    cursor pointer
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
    .feature-mask
      padding: 1rem
      height 240px
      border solid 1px rgb(212, 212, 213)
      border-radius 3px
      position relative
      top calc(-242px - 2rem)
      opacity 0
      transition background-color .5s linear
      z-index 10
      &:hover
        background #F9F9F9
        box-shadow: 0 0 15px #999
        color white
        opacity 1
        z-index 10
        transition all .3s
    .feature-content
      border solid 1px rgb(212, 212, 213)
      border-radius 3px
      height 240px
      padding: 1rem
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      width calc(100%)
      height calc(240px + 2rem)
      margin-bottom 2rem


@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
