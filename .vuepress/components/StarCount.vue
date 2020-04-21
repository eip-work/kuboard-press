<template>
  <div style="display: inline-block; width: 120px;">
    <LazyLoad>
      <a aria-label="github" @click="$sendGaEvent('ViewGitHubStar', 'ViewGitHubStarNav', 'ViweGitHubStar:' + $page.path)"
        href="https://starchart.cc/eip-work/kuboard-press" target="_blank">
        <!-- <iframe style="display:inline-block;vertical-align:middle;" src="https://ghbtns.com/github-btn.html?user=eip-work&amp;repo=kuboard-press&amp;type=star&amp;count=true&amp;size=small" frameborder="0" scrolling="0" width="100px" height="20px"></iframe> -->
        <img src="https://badgen.net/github/stars/eip-work/kuboard-press?label=github stars"/>
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
