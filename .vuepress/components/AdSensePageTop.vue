<template>
  <div class="adsense-page-top" v-if="!$frontmatter.lessAds">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- AdSensePageTop-Display -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="6238375600"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-layout-key="-h2+d+5c-9-3e"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="4299889232"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script> -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.adsense-page-top {
  /* background-color: green; */
  /* padding-right: 2px;
  border: 1px solid #d7dae2;
  height: 124px !important;
  overflow: hidden; */
}
</style>
