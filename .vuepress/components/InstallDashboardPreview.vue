<template>
  <div data-aos="zoom-in-up">
    <grid :rwd="{compact: 'stack'}" style="margin-top: 1rem;" v-show="show">
        <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}" >
          <b-card style="height: 100%; color: #2c3e50; line-height: 1.7;" shadow="hover">
            <p>
              <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
              Kuboard 在线体验
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
              </a>
            </p>
            <p style="color: gray; font-size: 14px;">
            为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>
            </p>
            <li>无需编写YAML</li>
            <li>纯图形化环境</li>
            <li>多环境管理</li>
          </b-card>
      </grid-item>
      <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}">
        <b-card style="height: 100%; border-color: #f2be45; background-color: rgba(242, 190, 69, 0.1)" shadow="hover">
          <a target="_blank" :href="`http://demo.kuboard.cn/dashboard?k8sToken=${$site.themeConfig.kuboardToken}`">
            <FancyImage src="/images/preview.gif" alt="Kubernetes教程：Kuboard 在线Demo" title="Kuboard" description="快速在 Kubernetes 上落地微服务"></FancyImage>
          </a>
        </b-card>
      </grid-item>
    </grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style scoped>

</style>
