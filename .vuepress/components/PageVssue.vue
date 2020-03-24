<template>
  <div class="vssue-wrapper">
    <LazyLoad>
      <div v-for="(item, key) in vssues" :key="key">
        <BaiduAutoPush></BaiduAutoPush>
        <Vssue v-if="item && item > 0" v-show="key === $route.path" :issueId="item" :options="options"/>
        <div v-if="item === undefined && isLocalHost" v-show="key === $route.path" :key="key">
          <b-button variant="danger" @click="vssues[key] = ''">请创建 VssueId</b-button>
        </div>
        <div v-if="item === ''">
          <b-button variant="warning" @click="refreshId = $refs.vssue[0].vssue.issue.id">请填写 vusseId <span v-if="refreshId"> - {{refreshId}}</span></b-button>
          <Vssue ref="vssue" :title="$page.path" :options="options"/>
        </div>
      </div>
      <!-- <script type="text/javascript">
      (function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https') {
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
          }
          else {
              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
          }
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(bp, s);
      })();
      </script> -->
    </LazyLoad>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vssues: {},
      refreshId: undefined
    }
  },
  computed: {
    isLocalHost() {
      if (window) {
        if (window.location.host === 'localhost:8080') {
          return true
        }
      }
      return false
    },
    options () {
      let _this = this
      let result = {
        platform: 'github-v4',
        locale: 'zh-CN',
        autoCreateIssue: true,
        admins: ['shaohq'],
        // all other options of Vssue are allowed
        owner: 'eip-work',
        repo: 'kuboard-press',
        clientId: this.isLocalHost ? 'f96af83d4bff4e2b9e3e' : '8141f5c205ad2f6d90d5',
        clientSecret: this.isLocalHost ? 'cf5686d68d4aab6d3bfa256da9a714049b239c1f' : 'b3e238508a2e8da9f2b355662b4cb3e62ecaa1d4',
        issueContent: (options, url) => { return 'https://kuboard.cn' + _this.$route.path },
        perPage: 50
      }
      return result
    },
  },
  mounted () {
    this.$set(this.vssues, this.$route.path, this.$frontmatter.vssueId)
  },
  watch: {
    '$route.path': function () {
      this.$set(this.vssues, this.$route.path, this.$frontmatter.vssueId)
    }
  },
}
</script>

<style lang="stylus">
.vssue-header-powered-by
  display none

@media print
  .vssue-wrapper
    display none
</style>
