<template>
  <a style="vertical-align: top;" @click="sendGaEvent" target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=a2d64aa5f578fe885fce065b242afbb12eeb804a67a552f996584b464277303a"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="kuboard for kubernetes (k8s)" title="kuboard for kubernetes (k8s)"></a>
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
