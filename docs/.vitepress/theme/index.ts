import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import KbIframe from './components/KbIframe.vue'
import SupportStars from './components/SupportStars.vue'
import KbTabs from './components/KbTabs.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('KbIframe', KbIframe)
    app.component('SupportStars', SupportStars)
    app.component('KbTabs', KbTabs)
  },
} satisfies Theme