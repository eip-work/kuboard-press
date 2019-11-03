<template>
  <div v-if="load">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    noAdsOnSharing: { type: Boolean, required: false, default: false }
  },
  data () {
    let load = false
    return {
      load: load
    }
  },
  mounted () {
    setTimeout( _ => {
      if (this.noAdsOnSharing) {
        console.log('noAdsOnSharing')
        if (typeof window !== 'undefined') {
          if (this.$isSharing) {
            this.load = false
            console.log('noAdsOnSharing', this.load)
          } else {
            this.load = true
            console.log('noAdsOnSharing', this.load)
          }
        }
      } else {
        this.load = true
        console.log('load', this.load)
      }
    }, 1000)
  }
}
</script>

<style>

</style>
