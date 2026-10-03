<script setup lang="ts">
import { ref, useSlots } from 'vue'

const props = withDefaults(defineProps<{ tabs: string[]; icon?: string }>(), {
  tabs: () => [],
  icon: '',
})

const slots = useSlots()
const active = ref(0)

function slotKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '')
}
</script>

<template>
  <div class="kb-tabs">
    <div class="kb-tabs-bar" role="tablist">
      <button
        v-for="(t, i) in tabs"
        :key="t"
        type="button"
        class="kb-tabs-item"
        :class="{ active: i === active }"
        role="tab"
        :aria-selected="i === active ? 'true' : 'false'"
        @click="active = i"
      >
        {{ t }}
      </button>
    </div>
    <div class="kb-tabs-panels">
      <div
        v-for="(t, i) in tabs"
        v-show="i === active"
        :key="t"
        class="kb-tabs-panel"
      >
        <slot v-if="slots[slotKey(t)]" :name="slotKey(t)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-tabs {
  margin: 16px 0;
}
.kb-tabs-bar {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
}
.kb-tabs-item {
  appearance: none;
  border: none;
  background: transparent;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
}
.kb-tabs-item:hover {
  color: var(--vp-c-text-1);
}
.kb-tabs-item.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
.kb-tabs-panel {
  padding-top: 16px;
}
.kb-tabs-panel :deep(> :first-child) {
  margin-top: 0;
}
</style>