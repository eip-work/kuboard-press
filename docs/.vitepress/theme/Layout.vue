<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import StarGazer from './components/StarGazer.vue'
import NavStats from './components/NavStats.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <NavStats />
    </template>
    <template #layout-bottom>
      <StarGazer />
    </template>
  </Layout>
</template>
