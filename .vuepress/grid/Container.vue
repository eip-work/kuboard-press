<template>
  <div class="vfg-container" :style="styleObject">
    <slot></slot>
  </div>
</template>

<script>
import initConfig from './utils/init-config'

export default {
  name: 'container',
  mixins: [initConfig],
  props: {
    width: String
  },
  computed: {
    styleObject () {
      return {
        maxWidth: this.width || this.config.container,
        paddingRight: this.config.gutter,
        paddingLeft: this.config.gutter
      }
    }
  }
}
</script>

<style>
.vfg-container {
  box-sizing: border-box;
  margin: auto;
}
</style>
