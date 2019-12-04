<template>
  <div>
    <b-button v-b-toggle.collapse-join-error variant="danger" size="sm" style="margin-top: 1rem;" v-on:click="$sendGaEvent('FQ' + title, 'FQ:' + $page.path, title + ':' + fqId)">{{title}}</b-button>
    <b-collapse id="collapse-join-error" class="mt-2">
      <b-card style="background-color: rgb(254, 240, 240); border: solid 1px #F56C6C;">
        <slot></slot>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    fqId: { type: String, required: true },
    title: { type: String, required: false, default: '常见问题' }
  }
}
</script>

<style>

</style>
