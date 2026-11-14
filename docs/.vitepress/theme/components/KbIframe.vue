<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

/**
 * KbIframe —— 嵌入 Kuboard 用户中心（uc-v3）等子站点的 iframe 组件。
 *
 * 子站点在嵌入模式下通过以下方式与父页面通信：
 *
 * 子 → 父：
 *   window.parent.postMessage({
 *     kuboardCommandToParent: "<KUBOARD_FRAME_ID>:<command>",
 *     params
 *   }, "<parentOrigin>")
 *
 * 父 → 子：
 *   { kuboardCommandToIframe: "kuboard.cn:<KUBOARD_FRAME_ID>:<command>", params }
 *
 * 本组件负责：
 * 1. 注入 frameId、主题、语言、parentOrigin 等参数；
 * 2. 监听 ready / iframeSize / message / openUserCenter；
 * 3. 主题或语言变化时通知子页面；
 * 4. 子页面无响应时展示“在新标签页打开”兜底。
 */
const props = withDefaults(
  defineProps<{
    src: string
    commands?: Record<string, (params?: Record<string, unknown>) => void>
    initialHeight?: number
    title?: string
    readyTimeout?: number
  }>(),
  {
    initialHeight: 480,
    title: 'Kuboard',
    readyTimeout: 6000,
  },
)

const { isDark, lang } = useData()

const frameId = 'kb' + Math.random().toString(36).slice(2, 12)
const srcBase = computed(() => new URL(props.src).origin)

const frameSrc = computed(() => {
  const url = new URL(props.src)
  url.searchParams.set('KUBOARD_FRAME_ID', frameId)
  url.searchParams.set('KUBOARD_EMBED', 'docs')
  url.searchParams.set('KUBOARD_VERSION', 'v4')
  // 主题/语言不在 URL 中更新：切换时通过 postMessage 通知子页面，
  // 避免修改 iframe src 导致整页重新加载。
  if (typeof window !== 'undefined') {
    url.searchParams.set('KUBOARD_PARENT_ORIGIN', window.location.origin)
  }
  return url.toString()
})

const height = ref(props.initialHeight)
const ready = ref(false)
const showFallback = ref(false)
const frameRef = ref<HTMLIFrameElement | null>(null)
let fallbackTimer: ReturnType<typeof setTimeout> | undefined

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = undefined
  }
}

function scheduleFallback() {
  clearFallbackTimer()
  if (props.readyTimeout <= 0) return
  fallbackTimer = setTimeout(() => {
    if (!ready.value) showFallback.value = true
  }, props.readyTimeout)
}

// 简易 toast（消息提示）
const toasts = ref<Array<{ id: number; type: 'success' | 'error' | 'info'; message: string }>>([])
let toastSeq = 0

function showToast(type: 'success' | 'error' | 'info', message: string) {
  const id = ++toastSeq
  toasts.value.push({ id, type, message })
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 4000)
}

function sendMessage(command: string, params?: Record<string, unknown>) {
  frameRef.value?.contentWindow?.postMessage(
    {
      kuboardCommandToIframe: `kuboard.cn:${frameId}:${command}`,
      params,
    },
    srcBase.value,
  )
}

function sendInit() {
  sendMessage('theme', { mode: isDark.value ? 'dark' : 'light' })
  sendMessage('lang', { lang: lang.value === 'en' ? 'en' : 'zh' })
}

function onIframeLoad() {
  ready.value = false
  showFallback.value = false
  sendInit()
  scheduleFallback()
}

// 内置默认命令处理
function handleDefaultCommand(command: string, params?: Record<string, unknown>) {
  switch (command) {
    case 'openUserCenter': {
      const path = typeof params?.path === 'string' ? params.path : ''
      if (!path) break
      const target = new URL(path, props.src)
      // 保留原始 src 上的参数（例如 KUBOARD_ACCESS_ENDPOINT、版本号）。
      new URL(props.src).searchParams.forEach((value, key) => {
        if (key !== 'KUBOARD_FRAME_ID') target.searchParams.set(key, value)
      })
      window.open(target.toString(), '_blank', 'noopener,noreferrer')
      break
    }
    case 'message': {
      if (params && typeof params.message === 'string') {
        const type = params.type === 'error' ? 'error' : params.type === 'info' ? 'info' : 'success'
        showToast(type, params.message)
      }
      break
    }
  }
}

function onMessage(event: MessageEvent) {
  const data = event.data as { kuboardCommandToParent?: string; params?: Record<string, unknown> }
  if (!data || typeof data.kuboardCommandToParent !== 'string') return
  // 只接受来自本 iframe、本子站点源的消息，避免同页面其它 iframe 伪造。
  if (event.origin !== srcBase.value) return
  if (frameRef.value?.contentWindow && event.source !== frameRef.value.contentWindow) return

  const prefix = frameId + ':'
  if (!data.kuboardCommandToParent.startsWith(prefix)) return
  const command = data.kuboardCommandToParent.slice(prefix.length)
  const params = data.params

  if (command === 'ready') {
    const h = params?.height
    if (typeof h === 'number' && h > 0) {
      height.value = Math.ceil(h)
    }
    ready.value = true
    showFallback.value = false
    clearFallbackTimer()
    sendInit()
    return
  }

  if (command === 'iframeSize') {
    const h = params?.height
    const target = typeof h === 'number' && h > 0 ? Math.ceil(h) : height.value
    if (Math.abs(target - height.value) > 1) {
      height.value = target
    }
    // 兼容尚未发送 ready 的旧版用户中心：能上报高度说明页面已经正常加载。
    if (!ready.value) {
      ready.value = true
      showFallback.value = false
      clearFallbackTimer()
      sendInit()
    }
    return
  }

  const handler = props.commands?.[command]
  if (handler) {
    handler(params)
  } else {
    handleDefaultCommand(command, params)
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  clearFallbackTimer()
})

watch([isDark, lang], () => {
  sendInit()
})
</script>

<template>
  <div class="kb-iframe">
    <div class="kb-iframe__frame-wrap">
      <iframe
        ref="frameRef"
        class="kb-iframe__frame"
        :src="frameSrc"
        :title="title"
        :style="{ height: height + 'px', opacity: ready ? '1' : '0' }"
        @load="onIframeLoad"
      />
      <div v-if="!ready && !showFallback" class="kb-iframe__skeleton" :style="{ height: height + 'px' }">
        {{ lang === 'en' ? 'Loading user center…' : '正在加载用户中心…' }}
      </div>
    </div>
    <div v-if="showFallback" class="kb-iframe__fallback">
      {{ lang === 'en' ? 'The user center did not load in time.' : '用户中心未及时加载。' }}
      <a :href="frameSrc" target="_blank" rel="noopener">
        {{ lang === 'en' ? 'Open in a new tab' : '在新标签页打开' }}
      </a>
    </div>
    <TransitionGroup name="kb-toast" tag="div" class="kb-iframe__toasts">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="kb-iframe__toast"
        :class="`kb-iframe__toast--${toast.type}`"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.kb-iframe {
  margin: 1rem 0;
}
.kb-iframe__frame-wrap {
  position: relative;
}
.kb-iframe__frame {
  display: block;
  width: 100%;
  border: none;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}
.kb-iframe__skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.kb-iframe__fallback {
  margin-top: 8px;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-warning-1);
  border-radius: 6px;
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
.kb-iframe__fallback a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.kb-iframe__toasts {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kb-iframe__toast {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  max-width: 320px;
}
.kb-iframe__toast--success {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-brand-1);
}
.kb-iframe__toast--info {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.kb-iframe__toast--error {
  background: rgba(211, 47, 47, 0.12);
  color: #c62828;
  border: 1px solid rgba(211, 47, 47, 0.45);
}
.dark .kb-iframe__toast--error {
  color: #ef9a9a;
}
.kb-toast-enter-active,
.kb-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.kb-toast-enter-from,
.kb-toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
