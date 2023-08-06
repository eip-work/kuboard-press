<template>
  <div v-if="$themeConfig.showAds" class="adsense-right" :style="$isDev ? 'background-color: grey;' : ''">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- AdSenseRightSide -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="2638666669"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
      <!-- if (!window.kuboardSharing) { -->
        (adsbygoogle = window.adsbygoogle || []).push({});
      <!-- } -->
    </script>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

.adsense-right {
  width: calc(50vw - 700px);
  max-width: 450px;
  max-height: 30vh;
  position: fixed;
  bottom: 80px;
  right: 10px;
  /* background-color: grey; */
}

</style>
