<template>
  <div>
    <div v-for="(item, key) in vssues" :key="key">
      <Vssue v-if="item" v-show="key === $route.path" :issueId="item" :options="options"/>
      <div v-if="item === undefined && isLocalHost" v-show="key === $route.path" :key="key">
        <div style="color: red; background-color: yellow;">请创建 VssueId</div>
        <Vssue :title="$page.path" :options="options"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vssues: {}
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
        platform: 'github',
        locale: 'zh-CN',
        autoCreateIssue: true,
        admins: ['shaohq'],
        // all other options of Vssue are allowed
        owner: 'eip-work',
        repo: 'kuboard-press',
        clientId: this.isLocalHost ? 'f96af83d4bff4e2b9e3e' : '8141f5c205ad2f6d90d5',
        clientSecret: this.isLocalHost ? 'cf5686d68d4aab6d3bfa256da9a714049b239c1f' : 'b3e238508a2e8da9f2b355662b4cb3e62ecaa1d4',
        issueContent: (options, url) => { return 'https://kuboard.cn' + _this.$route.path }
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

<style>
.vssue-header-powered-by {
  display: none;
}
</style>
