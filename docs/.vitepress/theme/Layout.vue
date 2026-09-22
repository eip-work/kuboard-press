<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import StarGazer from './components/StarGazer.vue'
import NavStats from './components/NavStats.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import SidebarDemo from './components/SidebarDemo.vue'
import SidebarDemoEn from './components/SidebarDemoEn.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const isEn = computed(() => route.path.startsWith('/en'))
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
  </Layout>
</template>
