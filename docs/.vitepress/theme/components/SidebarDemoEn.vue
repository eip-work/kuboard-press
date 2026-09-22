<script setup lang="ts">
const url = 'https://demo.kuboard.cn'
const username = 'demo'
const password = 'demo123'
</script>

<template>
  <div class="kb-demo-card">
    <div class="kb-demo-card__title">Live Demo</div>
    <a :href="url" target="_blank" rel="noopener" class="kb-demo-card__link">
      {{ url }}
    </a>
    <dl class="kb-demo-card__creds">
      <div>
        <dt>Username</dt>
        <dd>{{ username }}</dd>
      </div>
      <div>
        <dt>Password</dt>
        <dd>{{ password }}</dd>
      </div>
    </dl>
    <p class="kb-demo-card__note">Read-only access</p>
  </div>
</template>

<style scoped>
.kb-demo-card {
  margin: 12px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.5;
}

.kb-demo-card__title {
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-1);
}

.kb-demo-card__link {
  color: var(--vp-c-brand-1);
  word-break: break-all;
  display: inline-block;
  margin-bottom: 8px;
}

.kb-demo-card__link:hover {
  text-decoration: underline;
}

.kb-demo-card__creds {
  display: flex;
  gap: 12px;
  margin: 0 0 6px;
}

.kb-demo-card__creds > div {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.kb-demo-card__creds dt {
  margin: 0;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.kb-demo-card__creds dd {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: var(--vp-c-text-1);
}

.kb-demo-card__note {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
</style>