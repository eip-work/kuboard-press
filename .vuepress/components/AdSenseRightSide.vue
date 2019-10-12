<template>
  <div class="adsense-right" @click="$sendGaEvent('AdSense', 'AdSenseRightSide', 'AdSenseRightSide')">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- 右侧垂直 -->
    <ins class="adsbygoogle"
        style="display:block; height: 40vh; max-width: calc(50vw - 720px); min-width: 200px;"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="2638666669"
    ></ins>
    <!-- data-ad-format="auto"
        data-full-width-responsive="true" -->
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
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
  width: 500px;
  max-width: calc(50vw - 720px);
  height: 40vh;
  position: fixed;
  bottom: 80px;
  right: 10px;
  /* background-color: grey; */
}

</style>
