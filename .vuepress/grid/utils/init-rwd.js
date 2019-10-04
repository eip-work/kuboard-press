import mediaQueryString from './media-query-string'
import isUndefined from './is-undefined'

export default {
  props: {
    rwd: Object
  },
  methods: {
    bindMediaQueries (callback) {
      if (!isUndefined(this.rwd)) {
        Object.keys(this.rwd).forEach(breakpoint => {
            const mediaQuery = window.matchMedia(mediaQueryString({
              approach: this.config.approach,
              query: this.config.breakpoints[breakpoint]
            }))
            const property = this.rwd[breakpoint]
  
            callback(mediaQuery, property)
        })
      }
    }
  }
}
