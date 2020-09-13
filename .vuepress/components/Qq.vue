<template>
  <a style="vertical-align: top;" @click="sendGaEvent" target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=Pm3XTP87T-t4yJWr3YEsIs46fEwhp9G2&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="kuboard for kubernetes (k8s)" title="kuboard for kubernetes (k8s)"></a>
</template>

<script>
export default {
  methods: {
    sendGaEvent () {
      let e = {
        hitType: 'event',
        eventCategory: 'QQ',
        eventAction: 'QQ:' + this.$page.path,
        eventLabel: 'QQ:' + this.$page.title
      }
      if (window.ga) {
        window.ga('send', e);
        // console.log('openOutboundLink Event', e)
      } else {
        console.log('开发环境，不发送 ga event', e)
      }
    }
  }
}
</script>

<style>

</style>
