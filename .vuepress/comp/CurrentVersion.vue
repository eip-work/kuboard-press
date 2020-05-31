<template>
  <div style="margin-top: 20px;">
    Kuboard 最新版本对照表
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
  },
  data() {
    return {
      latestVersion: undefined,
      fields: [ 'channel', 'dockerTag', 'version', 'buildDate' ]
    }
  },
  computed: {
    currentVersion () {
      if (this.latestVersion === undefined) return { latest: {}, beta: {}, arm: {} }
      return this.latestVersion[this.latestVersion.default].channel
    },
    items () {
      let items = []
      items.push({ channel: 'latest', dockerTag: 'eipwork/kuboard:latest', version: this.currentVersion.latest.version, buildDate: this.currentVersion.latest.buildDate })
      items.push({ channel: 'beta', dockerTag: 'eipwork/kuboard:beta', version: this.currentVersion.beta.version, buildDate: this.currentVersion.beta.buildDate })
      items.push({ channel: 'arm', dockerTag: 'eipwork/kuboard:arm', version: this.currentVersion.arm.version, buildDate: this.currentVersion.arm.buildDate })
      return items
    }
  },
  components: { },
  mounted () {
    axios.get('https://addons.kuboard.cn/kuboard-latest-version.json?' + Math.random).then(resp => {
      console.log(resp)
      this.latestVersion = resp.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
