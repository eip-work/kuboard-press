<template>
  <div class="adsense-left-top" v-if="$site.showMoreAds" :style="$isDev ? 'background-color: grey;' : ''">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- AdsenseLeftTop -->
    <ins class="adsbygoogle"
        style="display:block;min-width:100px;max-width:500px;width:100%;height:80px"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="4275606991"></ins>
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
.adsense-left-top {
  width: 100%;
  /* background-color: grey; */
}
</style>
