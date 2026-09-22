<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface State {
  src: string
  alt: string
  scale: number
  x: number
  y: number
  dragging: boolean
  startX: number
  startY: number
  originX: number
  originY: number
}

const open = ref(false)
const state = ref<State>({
  src: '',
  alt: '',
  scale: 1,
  x: 0,
  y: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
})

const MIN_SCALE = 0.2
const MAX_SCALE = 8
const SCALE_STEP = 1.2

function openLightbox(src: string, alt: string) {
  state.value = {
    src,
    alt,
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  }
  open.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  open.value = false
  document.body.style.overflow = ''
}

function clampScale(v: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, v))
}

function zoomAt(delta: number, cx: number, cy: number) {
  const old = state.value.scale
  const next = clampScale(old * delta)
  if (next === old) return
  // keep cursor point stable
  const ratio = next / old
  state.value.x = cx - (cx - state.value.x) * ratio
  state.value.y = cy - (cy - state.value.y) * ratio
  state.value.scale = next
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const img = e.currentTarget as HTMLElement
  const rect = img.getBoundingClientRect()
  const cx = e.clientX - rect.left - rect.width / 2
  const cy = e.clientY - rect.top - rect.height / 2
  const factor = e.deltaY < 0 ? SCALE_STEP : 1 / SCALE_STEP
  zoomAt(factor, cx, cy)
}

function onMouseDown(e: MouseEvent) {
  if (state.value.scale <= 1) return
  state.value.dragging = true
  state.value.startX = e.clientX
  state.value.startY = e.clientY
  state.value.originX = state.value.x
  state.value.originY = state.value.y
  ;(e.currentTarget as HTMLElement).style.cursor = 'grabbing'
}

function onMouseMove(e: MouseEvent) {
  if (!state.value.dragging) return
  state.value.x = state.value.originX + (e.clientX - state.value.startX)
  state.value.y = state.value.originY + (e.clientY - state.value.startY)
}

function onMouseUp(e: MouseEvent) {
  if (!state.value.dragging) return
  state.value.dragging = false
  ;(e.currentTarget as HTMLElement).style.cursor = 'grab'
}

function onDoubleClick(e: MouseEvent) {
  if (state.value.scale > 1) {
    state.value.scale = 1
    state.value.x = 0
    state.value.y = 0
  } else {
    const img = e.currentTarget as HTMLElement
    const rect = img.getBoundingClientRect()
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    state.value.scale = 2.5
    state.value.x = -cx * 1.5
    state.value.y = -cy * 1.5
  }
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === '+' || e.key === '=') zoomAt(SCALE_STEP, 0, 0)
  else if (e.key === '-' || e.key === '_') zoomAt(1 / SCALE_STEP, 0, 0)
  else if (e.key === '0') {
    state.value.scale = 1
    state.value.x = 0
    state.value.y = 0
  }
}

function onImgClick(e: MouseEvent) {
  if ((e.target as HTMLElement).tagName === 'IMG' && state.value.scale === 1) {
    // allow click to zoom on the image; double-click toggles
  }
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) closeLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)

  // delegate click on every <img> inside .VPDoc main content
  const handler = (e: MouseEvent) => {
    const t = e.target as HTMLElement
    if (t.tagName !== 'IMG') return
    // skip icons in nav/buttons
    if (t.closest('a,button,.VPNavBar,.VPSidebar,.VPFooter,.VPHome,.VPNav')) return
    // only images wider than 80px (skip tiny icons)
    const r = (t as HTMLImageElement).getBoundingClientRect()
    if (r.width < 80 || r.height < 80) return
    e.preventDefault()
    openLightbox((t as HTMLImageElement).src, t.alt || '')
  }
  document.addEventListener('click', handler, true)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    document.removeEventListener('click', handler, true)
    document.body.style.overflow = ''
  })
})

function reset() {
  state.value.scale = 1
  state.value.x = 0
  state.value.y = 0
}
</script>

<template>
  <Teleport to="body">
    <Transition name="kb-lightbox">
      <div
        v-if="open"
        class="kb-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="state.alt"
        @click="onBackdropClick"
      >
        <button
          type="button"
          class="kb-lightbox-close"
          aria-label="Close"
          @click="closeLightbox"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </button>
        <div class="kb-lightbox-toolbar">
          <button type="button" aria-label="Zoom out" @click="zoomAt(1 / SCALE_STEP, 0, 0)">−</button>
          <span class="kb-lightbox-scale">{{ Math.round(state.scale * 100) }}%</span>
          <button type="button" aria-label="Zoom in" @click="zoomAt(SCALE_STEP, 0, 0)">+</button>
          <button type="button" aria-label="Reset" @click="reset">重置</button>
        </div>
        <div
          class="kb-lightbox-stage"
          :class="{ 'is-grabbable': state.scale > 1, 'is-dragging': state.value?.dragging }"
          @wheel="onWheel"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @dblclick="onDoubleClick"
          @click="onImgClick"
        >
          <img
            :src="state.src"
            :alt="state.alt"
            :style="{
              transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
              cursor: state.scale > 1 ? 'grab' : 'zoom-in',
            }"
            draggable="false"
          />
        </div>
        <div class="kb-lightbox-hint">滚轮缩放 · 拖拽平移 · 双击切换 · Esc 关闭</div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.kb-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.kb-lightbox-stage {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: zoom-in;
  user-select: none;
}

.kb-lightbox-stage img {
  max-width: 92vw;
  max-height: 86vh;
  transform-origin: center center;
  transition: transform 0.05s linear;
  user-select: none;
  -webkit-user-drag: none;
}

.kb-lightbox-stage.is-dragging img {
  transition: none;
}

.kb-lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.kb-lightbox-close:hover {
  background: rgba(255, 255, 255, 0.28);
}

.kb-lightbox-toolbar {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 22px;
  padding: 6px 12px;
  z-index: 2;
  color: #fff;
}

.kb-lightbox-toolbar button {
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 14px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
}

.kb-lightbox-toolbar button:hover {
  background: rgba(255, 255, 255, 0.28);
}

.kb-lightbox-scale {
  min-width: 48px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  opacity: 0.85;
}

.kb-lightbox-hint {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(0, 0, 0, 0.45);
  padding: 6px 14px;
  border-radius: 18px;
  pointer-events: none;
}

.kb-lightbox-enter-active,
.kb-lightbox-leave-active {
  transition: opacity 0.18s ease;
}
.kb-lightbox-enter-from,
.kb-lightbox-leave-to {
  opacity: 0;
}
</style>