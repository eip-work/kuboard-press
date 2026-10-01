<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const GH_REPO = 'https://github.com/eip-work/kuboard-press'
const DOCKER_REPO = 'https://hub.docker.com/r/eipwork/kuboard'

const ghSrc = ref('')
const dockerSrc = ref('')

onMounted(() => {
  const nocache = Date.now()
  ghSrc.value = `https://addons.kuboard.cn/downloads/github-star.html?nocache=${nocache}`
  dockerSrc.value = `https://addons.kuboard.cn/downloads/docker-pull.svg?nocache=${nocache}`
})

const texts = {
  'zh-CN': {
    intro: 'Kuboard 于 2019 年 8 月公开发布，当前：',
    stars: 'GitHub Star 数',
    pulls: 'Docker 拉取次数',
    line: '参考 kuboard.cn，通常一个月时间可以从 Kubernetes 入门到投产',
  },
  en: {
    intro: 'Kuboard has been publicly available since August 2019. Current:',
    stars: 'GitHub stars',
    pulls: 'Docker pulls',
    line: 'See kuboard.cn — it usually takes about a month to go from Kubernetes beginner to production deployment.',
  },
}

const t = () => {
  const l = lang.value === 'en' ? 'en' : 'zh-CN'
  return texts[l]
}
</script>

<template>
  <div class="support-stars">
    <div class="support-stars__chart">
      <img
        src="https://addons.kuboard.cn/downloads/kuboard-press.svg"
        alt="Kuboard GitHub Star"
        loading="lazy"
      />
    </div>
    <div class="support-stars__card">
      <p class="support-stars__intro">{{ t().intro }}</p>
      <ul class="support-stars__list">
        <li>
          <a :href="GH_REPO" target="_blank" rel="noopener">{{ t().stars }}</a>
          <iframe
            :src="ghSrc"
            :title="t().stars"
            width="120"
            height="20"
            frameborder="0"
            scrolling="no"
          />
        </li>
        <li>
          <a :href="DOCKER_REPO" target="_blank" rel="noopener">{{ t().pulls }}</a>
          <img :src="dockerSrc" alt="Docker Pulls" width="121" height="20" />
        </li>
      </ul>
      <p class="support-stars__line">{{ t().line }}</p>
    </div>
  </div>
</template>

<style scoped>
.support-stars {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
  margin: 1.5rem 0;
}
.support-stars__chart {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}
.support-stars__chart img {
  width: 100%;
  height: auto;
  display: block;
}
.support-stars__card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  line-height: 1.7;
  font-size: 0.95em;
}
.support-stars__intro {
  margin: 0;
  font-weight: 600;
}
.support-stars__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.support-stars__list li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
}
.support-stars__list a {
  white-space: nowrap;
}
.support-stars__line {
  margin: 0;
  color: var(--vp-c-text-2);
}
@media (max-width: 720px) {
  .support-stars {
    grid-template-columns: 1fr;
  }
}
</style>
