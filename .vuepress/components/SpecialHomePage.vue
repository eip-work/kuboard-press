<template>
  <main class="home" aria-labelledby="main-title">

    <div style="background-color: #0063dc; margin-bottom: 2.5rem;">
      <div style="max-width: 450px; margin: auto; ">
        <img src="/images/logo-main.png" style="background-color: #0063dc; max-width: 100%;" alt="Slogon:Kuboard_快速在Kubernetes上落地微服务"/>
      </div>
    </div>

    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <!-- <h1 id="main-title">Kuboard</h1>

      <p class="description">
        快速在 Kubernetes 上落地微服务
      </p> -->

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
      <p>
        <StarCount></StarCount>
      </p>
    </header>

    <div
      class="features-c"
      v-if="data.features && data.features.length"
      style="padding: 0"
    >
      <div
        class="feature-c"
        v-for="(feature, index) in data.features"
        :key="index"
        @click="$router.push({ path: feature.link })"
        :style="index === data.features.length - 1 ? 'margin-right: 0' : ''"
      >
        <div class="feature-c-content">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
        <div class="feature-c-mask">
          <h2>{{ feature.title }}</h2>
          <p style="color: #007af5; font-weight: 500;">点击查看</p>
        </div>
      </div>
    </div>

    <div class="intro">
      <b-card class="intro_text" shadow="hover">
        <p>
          <h2>Kuboard</h2>
          <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
            Kuboard 在线体验
          </a>
          <li>Kubernetes 管理界面</li>
          <li>微服务参考架构</li>
          <li>无需手写 YAML</li>
          <li><a href="/install/install-dashboard.html">安装Kuboard</a></li>
        </p>
      </b-card>
      <div class="intro_picture">
        <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
          <FancyImage src="/images/preview.gif" alt="Kubernetes教程_Kuboard在线体验" title="Kuboard" description="快速在 Kubernetes 上落地微服务"></FancyImage>
        </a>
      </div>
    </div>

    <Content></Content>

    <div class="footer">
      <FriendlyUrl></FriendlyUrl>
    </div>
    <StarGazer/>
    <AdSenseRightSide/>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink },
  created () {
    // this.$title = 'hello---'
  },
  mounted () {
    // window.document.title = 'Kuboard 官网 - Kubernetes k8s 国内安装/部署/入门/免费中文教程/实践/微服务管理界面'
  },
  computed: {
    data () {
      let d = {

        home: false,
        layout: 'HomePage',
        title: 'Kuboard官网_Kubernetes教程_K8S安装_管理界面',
        description: 'Kuboard是一款免费的Kubernetes管理界面_同时该网站还提供Kubernetes安装文档_K8S_部署_入门_免费中文Kubernetes教程_以及在Kubernetes上部署SpringCloud的详细文档',
        meta: [
          {
            name: 'keywords',
            content: 'Kubernetes教程,K8S教程,Kubernetes安装,K8S安装,Kubernetes'
          }
        ],
        actionText: '在线体验',
        actionText2: '开始使用 →',
        actionLink2: '/overview/',
        features:[
          {
              title: 'Kubernetes安装文档',
              details: '快速安装Kubernetes，每天有超过300名用户参考此文档完成Kubernetes安装，碰到问题可QQ在线答疑',
              link: '/install/install-k8s.html'
          },
          {
              title: 'Kubernetes免费教程',
              details: '免费但绝不降低品质，活跃的QQ社群，与网友共同学习进步',
              link: '/learning/'
          },
          {
              title: 'Kubernetes管理界面',
              details: 'Kubernetes图形化管理界面，无需编写 yaml 文件即可完成应用程序在 Kubernetes 上的部署和维护',
              link: '/install/install-dashboard.html'
          },
          {
              title: 'Kubernetes + Spring Cloud实战',
              details: '参考文档，一步一步完成Spring Cloud微服务架构在Kubernetes上的部署和管理',
              link: '/learning/k8s-practice/ocp'
          },
        ]
      }

      return d
    },

    actionLink () {
      return {
        link: `http://demo.kuboard.cn/dashboard?k8sToken=${this.$site.themeConfig.kuboardToken}`,
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
  .features-c
    border-top 1px solid $borderColor
    padding 2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature-c
    flex-grow 1
    flex-basis 22%
    margin-right 1rem
    margin-top 1rem
    height calc(240px + 2rem)
    cursor pointer
    padding 0
    h2
      font-size 1.2rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
    .feature-c-mask
      padding: 1rem
      height 240px
      border solid 1px $accentColor
      border-radius 3px
      position relative
      top calc(-242px - 2rem)
      opacity 0
      transition background-color .5s linear
      z-index 10
      &:hover
        background lighten($accentColor, 80%)
        box-shadow: 0 0 15px #999
        color white
        opacity 1
        z-index 10
        transition all .3s
    .feature-c-content
      border solid 1px $accentColor
      border-radius 3px
      height 240px
      padding: 1rem
  .intro
    margin-top 2rem
    .intro_text
      margin-right 1rem
      height calc(339px - 2rem)
      border solid 1px $borderColor
      vertical-align middle
      width calc(100% - 610px - 3rem)
      display inline-block
      padding 1rem
    .intro_picture
      border solid 1px $borderColor
      max-width 600px
      vertical-align middle
      display inline-block
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features-c
      margin-bottom: 1rem
      flex-direction column
      .feature-c
        width calc(100%)
        height calc(160px + 2rem)
        margin-top 1rem
        overflow hidden
        padding 0
        .feature-c-mask
          display none
        .feature-c-content
          height 160px
    .intro
      .intro_text
        width calc(100% - 2rem)
        height 15rem
        margin-bottom 1rem


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
    .feature-c
      padding 0
      h2
        font-size 1.25rem
</style>
