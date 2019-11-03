<template>
  <LazyLoad :noAdsOnSharing="true">
    <div v-if="$themeConfig.showAds" :style="$isDev ? 'background-color: grey;' : ''">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <!-- 正文-垂直 -->
      <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-3313149841665250"
          data-ad-slot="4549679988"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      <script>
        if (!window.kuboardSharing) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      </script>
    </div>
  </LazyLoad>
</template>

<script>
export default {

}
</script>

<style>

</style>
