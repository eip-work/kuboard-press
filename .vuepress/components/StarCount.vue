<template>
  <a aria-label="github" @click="$sendGaEvent('ViewGitHubStar', 'ViewGitHubStarNav', 'ViweGitHubStar:' + $page.path)">
    <iframe style="display:inline-block;vertical-align:middle;" src="https://ghbtns.com/github-btn.html?user=eip-work&amp;repo=kuboard-press&amp;type=star&amp;count=true&amp;size=small" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>
  </a>
</template>

<script>
export default {

}
</script>

<style>

</style>
