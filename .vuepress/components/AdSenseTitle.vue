<template>
  <div :style="$isDev ? 'background-color: #grey;' : ''">
    <div v-show="!$isSharing && !$frontmatter.lessAds && $themeConfig.showAds">
      <a @click="clickAds" :href="random.url" target="_blank" rel="nofollow" style="text-decoration: none; width: 100%">
        <div class="ads">
          <div>
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
            <span class="ads-text">广告</span>
          </div>
        </div>
      </a>
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
      ads: require('./ad-list'),
    }
  },
  mounted () {
  },
  computed: {
    random () {
      if (this.$isSharing) {
        return this.ads[0]
      }
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
  font-weight: 500;
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
