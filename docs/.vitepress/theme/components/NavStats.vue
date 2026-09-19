<script setup lang="ts">
import { onMounted, ref } from 'vue'

const GH_REPO = 'https://github.com/eip-work/kuboard-press'
const DOCKER_REPO = 'https://hub.docker.com/r/eipwork/kuboard'

const ghSrc = ref('')
const dockerSrc = ref('')

onMounted(() => {
  const nocache = Date.now()
  ghSrc.value = `https://addons.kuboard.cn/downloads/github-star.html?nocache=${nocache}`
  dockerSrc.value = `https://addons.kuboard.cn/downloads/docker-pull.svg?nocache=${nocache}`
})
</script>

<template>
  <div class="nav-stats">
    <a :href="GH_REPO" target="_blank" rel="noopener" aria-label="GitHub Stars">
      <iframe
        :src="ghSrc"
        title="GitHub Stars"
        width="120"
        height="20"
        frameborder="0"
        scrolling="no"
      />
    </a>
    <a :href="DOCKER_REPO" target="_blank" rel="noopener" aria-label="Docker Pulls">
      <img :src="dockerSrc" alt="Docker Pulls" width="121" height="20" />
    </a>
  </div>
</template>

<style scoped>
.nav-stats {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: auto;
  padding-right: 12px;
}
.nav-stats a {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  border-radius: 3px;
}
.nav-stats iframe,
.nav-stats img {
  display: block;
  border: 0;
  max-width: none;
}

@media (max-width: 960px) {
  .nav-stats {
    display: none;
  }
}
</style>