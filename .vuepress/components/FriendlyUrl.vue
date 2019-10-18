<template>
  <div style="margin-top: 10px;">
    友情链接：
    <span v-for="item in urls" style="margin-right: 10px;"
      @click="$sendGaEvent('友情链接', '友情链接: ' + item.name, '友情链接:' + item.name + ' --- ' + $page.path)">
      <a target="_blank" :href="item.url + '?utm_source=kuboard.cn'">
        {{item.name}}
      </a>
    </span>
  </div>
</template>

<script>
export default {

  data () {
    return {
      urls: [
        {name: 'sealos 官网', url: 'https://sealyun.com/'},
        {name: '云原生实验室', url: 'https://www.yangcs.net/'},
      ]
    }
  }
}
</script>

<style>

</style>
