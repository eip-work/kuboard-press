<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * KbIframe —— 嵌入 Kuboard 用户中心（uc-v3）等子站点的 iframe 组件。
 *
 * 子站点（如 https://uc-v3.kuboard.cn）在嵌入模式下会通过
 * `window.parent.postMessage({ kuboardCommandToParent: "<KUBOARD_FRAME_ID>:<command>", params }, "*")`
 * 与父页面通信，本组件负责：
 *
 * 1. 向子站点 src 追加唯一 `KUBOARD_FRAME_ID`（用于识别消息来源）；
 * 2. 监听 `iframeSize` 消息，按子页面 body 实际高度自动调整 iframe 高度
 *    （避免出现内部滚动条、内容被裁切）；
 * 3. 监听 `openUserCenter` 消息，在新标签页打开用户中心链接
 *    （嵌入后登录成功再点击链接时，子站点不再自行跳转，而是交由父页面处理）；
 * 4. 监听 `message` 消息，展示成功/失败提示；
 * 5. 其余命令可通过 `commands` prop 注入自定义处理函数。
 */
const props = withDefaults(
  defineProps<{
    src: string
    commands?: Record<string, (params?: Record<string, unknown>) => void>
    initialHeight?: number
    title?: string
  }>(),
  {
    initialHeight: 480,
    title: 'Kuboard',
  },
)

// 唯一 frame id，用于匹配子站点 postMessage 中的命令来源
const frameId = 'kb' + Math.random().toString(36).slice(2, 12)

const srcBase = computed(() => new URL(props.src).origin)

const frameSrc = computed(() => {
  const url = new URL(props.src)
  url.searchParams.set('KUBOARD_FRAME_ID', frameId)
  return url.toString()
})

const height = ref(props.initialHeight)
const frameRef = ref<HTMLIFrameElement | null>(null)

// 简易 toast（消息提示）
const toasts = ref<Array<{ id: number; type: 'success' | 'error'; message: string }>>([])
let toastSeq = 0

function showToast(type: 'success' | 'error', message: string) {
  const id = ++toastSeq
  toasts.value.push({ id, type, message })
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 4000)
}

// 内置默认命令处理
function handleDefaultCommand(command: string, params?: Record<string, unknown>) {
  switch (command) {
    case 'openUserCenter': {
      const path = typeof params?.path === 'string' ? params.path : ''
      window.open(srcBase.value + path, '_blank', 'noopener,noreferrer')
      break
    }
    case 'message': {
      if (params && typeof params.message === 'string') {
        showToast(params.type === 'error' ? 'error' : 'success', params.message)
      }
      break
    }
  }
}

function onMessage(event: MessageEvent) {
  const data = event.data as { kuboardCommandToParent?: string; params?: Record<string, unknown> }
  if (!data || typeof data.kuboardCommandToParent !== 'string') return
  const prefix = frameId + ':'
  if (!data.kuboardCommandToParent.startsWith(prefix)) return
  const command = data.kuboardCommandToParent.slice(prefix.length)
  const params = data.params

  // 自动高度：子页面每隔 1s 上报 body.clientHeight
  if (command === 'iframeSize') {
    const h = params?.height
    // 预留少量缓冲，避免子页面出现滚动条
    const target = typeof h === 'number' && h > 0 ? h + 8 : height.value
    if (Math.abs(target - height.value) > 2) {
      height.value = target
    }
    return
  }

  // 优先使用外部注入的命令处理函数，否则走内置默认
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
})
</script>

<template>
  <div class="kb-iframe">
    <iframe
      ref="frameRef"
      class="kb-iframe__frame"
      :src="frameSrc"
      :title="title"
      :style="{ height: height + 'px' }"
      loading="lazy"
    />
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
.kb-iframe__frame {
  display: block;
  width: 100%;
  border: none;
  border-radius: 8px;
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
