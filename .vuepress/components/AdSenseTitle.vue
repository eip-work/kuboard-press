<template>
  <div :style="$isDev ? 'background-color: #grey;' : ''" v-if="!$frontmatter.lessAds && $themeConfig.showAds">
    <div class="ads">
      <!-- <Qq></Qq> 
      群号: 808894550 
      <span style="color: red; font-weight: 500;">在线答疑</span>，
      初学者可选择在线课程，语言更通俗：
      <span @click="$sendGaEvent('极客时间', '极客时间', '极客时间：' + $page.path)">
        <a target="_blank" href="https://time.geekbang.org/column/intro/100015201?code=MH1Wu456g0ZsrKtQI7QidivKV2hVvzerAUxDz5pOuQs%3D">深入剖析Kubernetes</a>
      </span> -->
      <div>

      <a @click="clickAds" :href="random.url" target="_blank" rel="nofollow" style="text-decoration: none;">
        <span class="name">
          {{ random.name }}
        </span>
        <span class="description">
          {{ random.description }}
        </span>
        <span class="description-strong">
          {{ random.strong }}
        </span>
        <span class="action">
          {{ random.action }}
        </span>
      </a>
      <span class="ads-text">广告</span>
      </div>
    </div>
    <slot></slot>
    <!-- <div class="adsense-page-top">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins class="adsbygoogle"
          style="display:block;"
          data-ad-format="fluid"
          data-ad-layout-key="-h2+d+5c-9-3e"
          data-ad-client="ca-pub-3313149841665250"
          data-ad-slot="4299889232"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      ads: [
        {
          name: 'Sealyun',
          description: 'Kubernetes，',
          strong: '一键离线安装',
          action: '去看看',
          url: 'http://store.lameleg.com?referrer=shaohq',
          weight: 20
        },
        {
          name: '阳明的博客',
          description: 'Kubernetes，',
          strong: '实战课程',
          action: '去看看',
          url: 'https://www.qikqiak.com/post/promotion-51/',
          weight: 50
        },
        {
          name: '极客时间',
          description: '精要30计，让DevOps快速落地',
          strong: 'DevOps实战笔记',
          action: '去看看',
          url: 'https://time.geekbang.org/column/intro/100036601?code=0Totv3yN%2FohiumTclUF4ky4qRYs9Ecq6ZK4IdgNf88M%3D',
          weight: 30
        },
        // {
        //   name: '宝塔面板',
        //   description: '一键全能 Linux 部署及管理，',
        //   strong: '送你3188元礼包',
        //   action: '点我领取',
        //   url: 'https://www.bt.cn/?invite_code=MV9vdnlveno=',
        //   weight: 50
        // }
      ]
    }
  },
  computed: {
    random () {
      this.ads
      let totalWeight = 0
      for (let item of this.ads) {
        totalWeight += item.weight
      }
      let tmp = 0
      let r = Math.random()
      for (let item of this.ads) {
        if (r > tmp / totalWeight && r <= (tmp + item.weight) / totalWeight) {
          return item
        }
        tmp = tmp + item.weight
      }
      return this.ads[0]
    },
  },
  methods: {
    clickAds () {
      this.$sendGaEvent(this.random.name, this.random.name + '--' + this.$page.path, this.random.name + '--' + this.$page.path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.adsense-page-top {
  /* background-color: green; */
  padding-right: 2px;
  border: 1px solid #d7dae2;
  max-height: 120px !important;
  overflow: hidden;
}
.ads {
  background-color: #f8f8f8;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
}
.ads a {
  text-decoration: none;
}
.ads span.name {
  color: $accentColor;
  font-size: 1em;
}
.ads span.description {
  margin-left: 0.8em;
  font-size: 0.9em;
  color: #666;
  font-weight: normal;
}
.ads span.description-strong {
  font-size: 0.9em;
  color: red;
  font-weight: normal;
}
.ads span.action {
  font-size: 0.75em;
  color: #888;
  border: 1px solid #888;
  border-radius: 3px;
  padding: 2px 6px;
  margin-left: 1em;
}
.ads-text {
  color: #999;
  float: right;
  font-size: 12px;
  border: 1px solid #d7dae2;
  padding: 2px 10px;
}
</style>
