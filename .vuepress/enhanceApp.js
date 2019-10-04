// import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'

import Element from 'element-ui'

import Container from './grid/Container'
import Grid from './grid/Grid'
import GridItem from './grid/GridItem'
import defaults from './grid/utils/defaults'

const VueFractionGrid = {
  install (Vue, options) {
    const config = Object.assign(defaults, options)
    Vue.component(Container.name, { extends: Container, config })
    Vue.component(Grid.name, { extends: Grid, config })
    Vue.component(GridItem.name, { extends: GridItem, config })
  }
}

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Element)  
  Vue.use(VueFractionGrid, {
    approach: 'desktop-first',
    breakpoints: {
      compact: '719px',
      tablet: '719px 959px'
    }
  })
}
