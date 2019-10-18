<template>
  <div :style="$isDev ? 'background-color: #grey;' : ''" v-if="!$frontmatter.lessAds">
    <p style="background-color: #f3f5f7;padding: 10px 5px 5px 10px;">
      <Qq></Qq> 
      群号: 808894550 
      <span style="color: red; font-weight: 500;">在线答疑</span>，
      初学者可选择在线课程，语言更通俗：
      <span @click="$sendGaEvent('极客时间', '极客时间', '极客时间：' + $page.path)">
        <a target="_blank" href="https://time.geekbang.org/column/intro/100015201?code=MH1Wu456g0ZsrKtQI7QidivKV2hVvzerAUxDz5pOuQs%3D">深入剖析Kubernetes</a>
      </span>
    </p>
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

}
</script>

<style scoped>
.adsense-page-top {
  /* background-color: green; */
  padding-right: 2px;
  border: 1px solid #d7dae2;
  max-height: 120px !important;
  overflow: hidden;
}
</style>
