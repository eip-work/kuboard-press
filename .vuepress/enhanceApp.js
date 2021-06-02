import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue2-animate/dist/vue2-animate.min.css';


import AOS from 'aos';
import 'aos/dist/aos.css';

import BootstrapVue from 'bootstrap-vue'

import Container from './grid/Container'
import Grid from './grid/Grid'
import GridItem from './grid/GridItem'
import defaults from './grid/utils/defaults'

import Comp from './comp/index'
import Cookies from 'js-cookie'

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
  
  Vue.use(BootstrapVue)
  Vue.use(VueFractionGrid, {
    approach: 'desktop-first',
    gutter: '1rem',
    breakpoints: {
      compact: '719px',
      tablet: '719px 959px'
    }
  })
  Vue.use(Comp)
  Vue.prototype.$sendGaEvent = function (category, action, label) {
    let e = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    }
    if (window.ga) {
      window.ga('send', e);
      // console.log('openOutboundLink Event', e)
    } else {
      console.log('开发环境，不发送 ga event', e)
    }
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      Vue.prototype.$isDev = true
    } else {
      Vue.prototype.$isDev = false
    }
  }

  // Vue.prototype.

  let sharing = true
  if (typeof window !== 'undefined') {
    window.$sendGaEvent = Vue.prototype.$sendGaEvent
    window.openOutboundLink = function (a) {
      let url = new URL(a.href)
      window.$sendGaEvent('OL: ' + url.hostname, 'OL: ' + a.innerText, 'OL: ' + a.href)
    }
    if (location.search && (location.search.indexOf('sharing') >=0 || location.search.indexOf('from=timeline') >= 0)) {
      sharing = true
      window.kuboardSharing = true
    } else {
      sharing = false
      window.kuboardSharing = false
    }
    setTimeout(_ => {
      AOS.init({
        easing: 'ease-out-back',
        duration: 1200
      });
    }, 200)

    let TOKEN_KEY = 'kb-user-center-token'

    let domain = window.location.hostname
    if (domain.indexOf('kuboard.cn') >= 0) {
      domain = 'kuboard.cn'
    }
    window.KbUcloginStatus = {
      status: Cookies.get(TOKEN_KEY) !== null && Cookies.get(TOKEN_KEY) !== undefined,
      user: undefined
    }
    Vue.prototype.$login = function (token) {
      // axios.defaults.headers.common['Authorization'] = token;
      // localStorage.setItem(TOKEN_KEY, token)
      Cookies.set(TOKEN_KEY, token, { domain: domain, expires: 7, path: '/' })
      window.KbUcloginStatus.status = true
    }
    
    Vue.prototype.$logout = function () {
      window.KbUcloginStatus.status = false
      // localStorage.removeItem(TOKEN_KEY)
      Cookies.remove(TOKEN_KEY, { domain: domain, expires: 7, path: '/' })
      // delete (axios.defaults.headers.common['Authorization'])
    }
  }
  // console.log('sharing', sharing)
  Vue.prototype.$isSharing = sharing

  Vue.prototype.$openUrlInBlank = function (url) {
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.click()
    document.body.removeChild(a)
  }

}
