<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const STAR_REPO = 'https://github.com/eip-work/kuboard-press'
const LS_STARRED = 'kuboard-press-starred'
const LS_FIRST_ACCESS = 'kuboard-press-first-access'
const SHOW_DELAY_MS = 10000

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const texts = {
  'zh-CN': {
    title: '给 Kuboard 一个 Star 吧',
    bodies: [
      '您的支持是 Kuboard 持续开源和前进的最大动力。如果您觉得 Kuboard 有帮助，请到 GitHub 上为它点亮一个 Star。',
      'Kuboard 的每一步成长，都离不开各位工程师的一键 Star。如果它对你有帮助，不妨花 5 秒点亮一颗星。',
      '如果 Kuboard 帮你节省了时间，欢迎去 GitHub 点一个 Star，让更多工程师发现它。',
      '觉得 Kuboard 好用？一个 Star 就是最好的认可，也是作者是否持续更新 Kuboard 的关键指标。',
      '每一个 Star 都会让 Kuboard 走得更远。如果你喜欢它，就给它点个赞吧。',
    ],
    star: '⭐ 去 GitHub 点个 Star',
    dismiss: '残忍拒绝',
  },
  en: {
    title: 'Star Kuboard on GitHub',
    bodies: [
      'Your support keeps Kuboard open source. If Kuboard helps you, please give it a star on GitHub.',
      'Every star helps more engineers discover Kuboard. If it saved you time, take 5 seconds to star the repo.',
      'Kuboard grows with every star. If you find it useful, a star is the easiest way to say thanks.',
      'Enjoying Kuboard? A GitHub star is the best recognition — and the most practical support for open source.',
      'Like what you see? Give Kuboard a star and help the project go further.',
    ],
    star: '⭐ Star Kuboard on GitHub',
    dismiss: 'No, thanks',
  },
}

const current = ref<string>('')

function t(key: keyof (typeof texts)['zh-CN']) {
  const l = lang.value === 'en' ? 'en' : 'zh-CN'
  return texts[l][key]
}

function pickRandomBody() {
  const l = lang.value === 'en' ? 'en' : 'zh-CN'
  const bodies = texts[l].bodies
  current.value = bodies[Math.floor(Math.random() * bodies.length)]
}

function dismissed() {
  localStorage.setItem(LS_STARRED, 'true')
  visible.value = false
}

function goStar() {
  localStorage.setItem(LS_STARRED, 'true')
  visible.value = false
  window.open(STAR_REPO, '_blank', 'noopener')
}

onMounted(() => {
  if (localStorage.getItem(LS_STARRED) === 'true') return
  const first = localStorage.getItem(LS_FIRST_ACCESS)
  if (!first) {
    localStorage.setItem(LS_FIRST_ACCESS, String(Date.now()))
    return
  }
  const elapsed = Date.now() - Number(first)
  if (elapsed >= SHOW_DELAY_MS) {
    show()
    return
  }
  timer = setTimeout(() => {
    if (localStorage.getItem(LS_STARRED) !== 'true') show()
  }, SHOW_DELAY_MS - elapsed)
})

function show() {
  pickRandomBody()
  visible.value = true
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="star-fade">
      <div v-if="visible" class="star-mask" @click.self="dismissed">
        <div class="star-dialog" role="dialog" aria-modal="true">
          <button class="star-close" aria-label="close" @click="dismissed">✕</button>
          <h3 class="star-title">{{ t('title') }}</h3>
          <p class="star-body">{{ current }}</p>
          <a class="star-btn" :href="STAR_REPO" target="_blank" rel="noopener" @click="goStar">
            {{ t('star') }}
          </a>
          <button class="star-dismiss" @click="dismissed">{{ t('dismiss') }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.star-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.star-dialog {
  position: relative;
  max-width: 420px;
  width: 100%;
  padding: 32px 28px 24px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}
.star-close {
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 16px;
  cursor: pointer;
}
.star-title {
  margin: 0 0 12px;
  font-size: 20px;
}
.star-body {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.star-btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}
.star-btn:hover {
  background: var(--vp-c-brand-2);
}
.star-dismiss {
  display: block;
  margin: 14px 0 0;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 13px;
  cursor: pointer;
}
.star-fade-enter-active,
.star-fade-leave-active {
  transition: opacity 0.25s ease;
}
.star-fade-enter-from,
.star-fade-leave-to {
  opacity: 0;
}
</style>
