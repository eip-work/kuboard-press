<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import StarGazer from './components/StarGazer.vue'
import NavStats from './components/NavStats.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import SidebarDemo from './components/SidebarDemo.vue'
import SidebarDemoEn from './components/SidebarDemoEn.vue'
import JoinCommunity from './components/JoinCommunity.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const isEn = computed(() => route.path.startsWith('/en'))

// hero “在线演示 / Live Demo” 按钮点击拦截：弹 confirm 提示只读账号。
// 用 capture 阶段监听，绕过 vue 自身的 onClick + <a target="_blank"> 的默认行为。
function isDemoButton(btn: HTMLAnchorElement, lang: 'zh' | 'en'): boolean {
  const text = (btn.textContent || '').trim()
  const labels = lang === 'en' ? ['Live Demo', 'Online Demo'] : ['在线演示', 'Live Demo']
  if (!labels.some((l) => text.startsWith(l))) return false
  if (!/demo\.kuboard\.cn/i.test(btn.href || '')) return false
  return true
}

function bindDemoButtons() {
  if (typeof document === 'undefined') return
  const lang: 'zh' | 'en' = route.path.startsWith('/en') ? 'en' : 'zh'
  const buttons = document.querySelectorAll<HTMLAnchorElement>('.VPHero a.VPButton')
  buttons.forEach((btn) => {
    if (btn.dataset.demoGuardBound === '1') return
    if (!isDemoButton(btn, lang)) return
    btn.dataset.demoGuardBound = '1'
    btn.addEventListener(
      'click',
      (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        const message =
          lang === 'en'
            ? 'The demo environment is read-only.\n\nUsername: demo\nPassword: demo123\n\nOpen demo.kuboard.cn in a new tab?'
            : '在线演示环境仅提供只读权限。\n\n用户名：demo\n密  码：demo123\n\n打开 demo.kuboard.cn（只读）？'
        if (window.confirm(message)) {
          window.open(btn.href, '_blank', 'noopener,noreferrer')
        }
      },
      true, // capture：抢在 vue/任何其它监听之前
    )
  })
}

onMounted(() => {
  bindDemoButtons()
  // SPA 切换路由后 hero 会重渲，layout 不会 unmount，所以再轮询扫描一次
  setTimeout(bindDemoButtons, 100)
  setTimeout(bindDemoButtons, 500)
})

// 路由切换时再次扫描
if (typeof window !== 'undefined') {
  const originalPushState = history.pushState
  history.pushState = function (...args) {
    const ret = originalPushState.apply(this, args as any)
    setTimeout(bindDemoButtons, 50)
    return ret
  }
}
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <NavStats />
    </template>
    <template #sidebar-nav-after>
      <SidebarDemoEn v-if="isEn" />
      <SidebarDemo v-else />
    </template>
    <template #layout-bottom>
      <StarGazer />
      <ImageLightbox />
    </template>
    <template #doc-footer-before>
      <JoinCommunity />
    </template>
    <template #doc-after>
      <SiteFooter />
    </template>
  </Layout>
</template>
