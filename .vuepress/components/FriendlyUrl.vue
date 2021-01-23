<template>
  <div>
    <div class="copyright">
      Copyright © 2019-present 邵欢庆 
      <span>
        <a href="https://beian.miit.gov.cn" target="_blank">京ICP备19008693号-2</a>
      </span>
    </div>
    <div style="margin-top: 20px;">
    </div>
    <div class="friend-section" v-show="!$isSharing">
      友情链接：
      <div v-for="item in urls" class="friend-a">
        <a target="_blank" :href="item.url + ( item.url.indexOf('?') > 0 ?  '&utm_source=kuboard.cn' : '?utm_source=kuboard.cn')"
          @click="$sendGaEvent('友情链接', '友情链接: ' + item.name, '友情链接:' + item.name + ' --- ' + $page.path)">
            <div class="friend-link" style="vertical-align: middle;">
              <img :src="item.icon"/>
              <div class="friend-name">
                {{item.name}}
              </div>
            </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      urls: [
        {name: 'sealos', url: 'http://store.lameleg.com?referrer=shaohq', icon: 'https://hugo-picture.oss-cn-beijing.aliyuncs.com/blog/2019-08-27-044824.jpg'},
        {name: '云原生实验室', url: 'https://fuckcloudnative.io/', icon: 'https://hugo-picture.oss-cn-beijing.aliyuncs.com/favicon-32x32.png'},
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>

.copyright {
  margin-top: 10px; text-align: center; background-color: #f3f5f7;padding: 10px;
}

.friend-section {
  margin-top: 10px; text-align: center; margin-bottom: 50px;
}

.friend-link {
  margin-right: 10px;
  display: inline-block;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  vertical-align: middle;
}

.friend-link img {
  width: 42px !important;
  height: 42px !important;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  box-shadow: 1px 1px 1px rgba(0,0,0, .15);
  background-color: #fff;
  vertical-align: middle;
  margin-right: 10px;
}

.friend-a {
  margin-top: 10px;
  display: inline-block;
}

.friend-a :hover {
  background-color: #f9fafc;
}

.friend-name {
  width: 100px;
  text-align: left;
  display: inline-block;
}

</style>
