<template>
  <div v-if="$themeConfig.showAds && false" class="adsense-page-bottom-inline" :style="$isDev ? 'background-color: grey;' : ''">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-layout-key="-hh-5+1v-2l-d"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="2494099929"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <!-- <div>
      <a @click="$sendGaEvent('ads-nav-top:tencent-cloud', 'ads-nav-top', 'ads-nav-top')" href="https://cloud.tencent.com/act/cps/redirect?redirect=1052&cps_key=2ee6baa049659f4713ddc55a51314372&from=console" target="_blank">
        <img style="max-width: 100%;" src="/images/ads/tencent-cloud.jpg"/>
      </a>
    </div> -->
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.adsense-page-bottom-inline {
  /* border: 1px solid #d7dae2; */
  /* max-height: 160px;
  overflow: hidden; */
}
</style>
