<template>
  <div style="margin-top: 20px;">
    <Vssue :issueId="71" :options="options"/>
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
      // if (typeof window !== 'undefined') {
      //   if (window.location.host === 'localhost:8080') {
      //     return true
      //   }
      // }
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

<style>
.vssue-header-powered-by {
  display: none;
}
</style>
