<template>
  <div style="display: inline-block; width: 110px;">
    <LazyLoad>
      <a aria-label="github" @click="$sendGaEvent('ViewGitHubStar', 'ViewGitHubStarNav', 'ViweGitHubStar:' + $page.path)"
        href="https://starchart.cc/eip-work/kuboard-press" target="_blank">
        <iframe style="display:inline-block;vertical-align:middle;" :src="`https://addons.kuboard.cn/downloads/github-star.html?nocache=${Date.now()}`" frameborder="0" scrolling="0" width="120" height="20" title="GitHub"></iframe>
      </a>
    </LazyLoad>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
