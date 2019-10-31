<template>
  <div v-if="$themeConfig.showAds && $isNotSharing" class="adsense-page-bottom" :style="$isDev ? 'background-color: grey;' : ''">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- AdSensePageBottom -->
    <ins class="adsbygoogle"
        style="display:inline-block;min-width:200px;max-width:1000px;width:100%;height:180px"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="9035294879"
        ></ins>
        <!-- data-ad-format="auto"
        data-full-width-responsive="false" -->
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
.adsense-page-bottom {
  /* padding-right: 2px; */
  border: 1px solid #d7dae2;
}
</style>
