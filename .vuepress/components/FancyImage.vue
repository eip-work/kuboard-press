<template>
    <component :is="type" :src="src" :alt="alt" :title="title" :description="description"></component>
</template>

<script>
import Diamond from './fancy-images/Diamond'
import Cross from './fancy-images/Cross'
import Rectangle from './fancy-images/Rectangle'
import Rolling from './fancy-images/Rolling'
import SlideLeft2Right from './fancy-images/SlideLeft2Right'

export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: false, default: 'Diamond' }
  },
  components: {
    Diamond, Cross, Rectangle, Rolling, SlideLeft2Right
  }
}
</script>

<style scoped>

</style>
