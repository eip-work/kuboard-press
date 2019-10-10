<template>
  <div class="adsense-right">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- 右侧垂直 -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3313149841665250"
        data-ad-slot="2638666669"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
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
  height: 50vh;
  position: fixed;
  top: 10vh;
  right: 1rem;
  /* background-color: grey; */
}

</style>
