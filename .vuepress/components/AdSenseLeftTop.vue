<template>
  <div v-if="$themeConfig.showAds" class="adsense-page-bottom-inline" :style="$isDev ? 'background-color: grey;' : ''">
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
