<template>
  <div>
    <div style="margin-top: 10px; text-align: center;">
      Copyright © 2019-present 邵欢庆 
      <span @click="$sendGaEvent('友情链接', '友情链接: 仁聚汇通', '友情链接:' + $page.path)">
        <a href="http://www.eigpay.com" target="_blank">仁聚汇通</a>
      </span> | 京ICP备19008693号-2
    </div>
    <div style="margin-top: 10px; text-align: center; margin-bottom: 50px;">
      友情链接：
      <span v-for="item in urls" style="margin-right: 10px;"
        @click="$sendGaEvent('友情链接', '友情链接: ' + item.name, '友情链接:' + item.name + ' --- ' + $page.path)">
        <a target="_blank" :href="item.url + '?utm_source=kuboard.cn'">
          {{item.name}}
        </a>
      </span>
    </div>
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
