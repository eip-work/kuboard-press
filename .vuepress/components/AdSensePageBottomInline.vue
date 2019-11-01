<template>
  <div v-if="$themeConfig.showAds" class="adsense-page-bottom-inline" :style="$isDev ? 'background-color: grey;' : ''">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- PageBottomInline -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="8977269331"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
      if (!window.kuboardSharing) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
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
