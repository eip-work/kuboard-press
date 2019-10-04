<template>
  <div class="vfg-grid" :class="classObject" :style="styleObject">
    <slot></slot>
  </div>
</template>

<script>
import reduceCSSCalc from 'reduce-css-calc'
import isUndefined from './utils/is-undefined'
import initConfig from './utils/init-config'
import initRWD from './utils/init-rwd'

export default {
  name: 'grid',
  mixins: [initConfig, initRWD],
  props: {
    horizontal: String,
    vertical: String,
    flat: String,
    pair: String,
    direction: {
      type: String,
      default: 'row'
    },
    wrap: {
      type: String,
      default: 'nowrap'
    }
  },
  created () {
    if (typeof window !== 'undefined') {
      this.bindMediaQueries((mediaQuery, gridDirection) => {
        if (mediaQuery.matches) {
          this.gridDirection = gridDirection
        }
        mediaQuery.addListener(listener => {
          if (listener.matches) {
            this.gridDirection = gridDirection
          } else {
            this.gridDirection = this.direction
          }
        })
      })
    }
  },
  data () {
    return {
      flexDirection: this.reduceDirection(this.direction)
    }
  },
  computed: {
    classObject () {
      return {
        'vfg-grid-pair': !isUndefined(this.pair)
      }
    },
    styleObject () {
      return {
        marginRight: this.horizontalMargin,
        marginLeft: this.horizontalMargin,
        justifyContent: this.gridHorizontal,
        alignItems: this.gridVertical,
        flexDirection: this.gridDirection,
        flexWrap: this.wrap
      }
    },
    horizontalMargin () {
      return isUndefined(this.flat)
        ? reduceCSSCalc(`calc(${this.config.gutter} / -2)`) : 0
    },
    gridHorizontal () {
      return {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
        between: 'space-between',
        around: 'space-around'
      }[this.horizontal]
    },
    gridVertical () {
      return {
        top: 'flex-start',
        middle: 'center',
        bottom: 'flex-end'
      }[this.vertical]
    },
    gridDirection: {
      get () {
        return this.flexDirection
      },
      set (direction) {
        this.flexDirection = this.reduceDirection(direction)
      }
    }
  },
  methods: {
    reduceDirection (direction) {
      return {
        row: 'row',
        reverse: 'row-reverse',
        stack: 'column',
        'stack-reverse': 'column-reverse'
      }[direction]
    }
  }
}
</script>

<style>
.vfg-grid {
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
}

.vfg-grid-pair > .vfg-grid-item {
  text-align: left;
}

.vfg-grid-pair > .vfg-grid-item + .vfg-grid-item {
  text-align: right;
}
</style>
