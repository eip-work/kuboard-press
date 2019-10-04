<template>
  <div class="vfg-grid-item" :style="styleObject" v-show="!isSizeZero">
    <slot></slot>
  </div>
</template>

<script>
import reduceCSSCalc from 'reduce-css-calc'
import isUndefined from './utils/is-undefined'
import initConfig from './utils/init-config'
import initRWD from './utils/init-rwd'

export default {
  name: 'grid-item',
  mixins: [initConfig, initRWD],
  props: {
    size: {
      type: String,
      validator (value) {
        const fraction = value.split('/')
        const denominator = +fraction[1]
        return fraction.length === 2 && denominator !== 0
      }
    },
    grow: [String, Number],
    shrink: [String, Number]
  },
  created () {
    if (typeof window !== 'undefined') {
      this.bindMediaQueries((mediaQuery, gridItemSize) => {
        if (mediaQuery.matches) {
          this.gridItemSize = gridItemSize
        }
        mediaQuery.addListener(listener => {
          if (listener.matches) {
            this.gridItemSize = gridItemSize
          } else {
            this.gridItemSize = this.size
          }
        })
      })
    }
  },
  data () {
    return {
      fraction: this.size
    }
  },
  computed: {
    isSizeZero () {
      return this.gridItemSize === '0/1'
    },
    styleObject () {
      const stylePadding = {
        paddingRight: this.horizontalPadding,
        paddingLeft: this.horizontalPadding
      }

      if (this.hasSize) {
        return Object.assign(stylePadding, {
          width: this.percentageWidth,
          flexBasis: this.percentageWidth,
          maxWidth: this.percentageWidth
        })
      }

      if (this.hasGrow) {
        return Object.assign(stylePadding, {
          flexGrow: +this.grow
        })
      }

      if (this.hasShrink) {
        return Object.assign(stylePadding, {
          flexShrink: +this.shrink
        })
      }

      return stylePadding
    },
    hasSize () {
      return !isUndefined(this.size) && isUndefined(this.grow) && isUndefined(this.shrink)
    },
    hasGrow () {
      return isUndefined(this.size) && !isUndefined(this.grow) && isUndefined(this.shrink)
    },
    hasShrink () {
      return isUndefined(this.size) && isUndefined(this.grow) && !isUndefined(this.shrink)
    },
    horizontalPadding () {
      const notFlatGridChild = isUndefined(this.$parent) || isUndefined(this.$parent.flat)
      return notFlatGridChild
        ? reduceCSSCalc(`calc(${this.config.gutter} / 2)`) : 0
    },
    gridItemSize: {
      get () {
        return this.fraction
      },
      set (fraction) {
        this.fraction = fraction
      }
    },
    percentageWidth () {
      const [numerator, denominator] = this.gridItemSize.split('/')
      const value = (+numerator * 100 / +denominator).toFixed(4)
      return `${value}%`
    }
  }
}
</script>

<style>
.vfg-grid-item {
  box-sizing: border-box;
}
</style>
