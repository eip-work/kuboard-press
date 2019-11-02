<template>
  <div>
    <b-modal
      size="xl"
      title="感谢阅读"
      centered
      no-close-on-esc
      no-close-on-backdrop
      @hide="reset"
      v-model="dialogVisible">
      <div style="text-align: center; font-size: 18px; weight: 500;">
        <div style="background-color: rgb(236, 245, 255); padding: 10px 10px 10px 10px; margin-bottom: 10px; border: solid 1px #007af5;">
          <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="linkToStar">
            给一个 Github Star
            <OutboundLink/>
          </a>
          就可以鼓励作者尽快完成
          <span style="color: red; font-weight: 500;">剩下的 {{$themeConfig.incompleteRatio}}% </span>
        </div>
        <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="linkToStar">
          <div style="border: solid 1px #ddd;">
            <img src="./star.png" style="max-width: 100%; opacity: 0.6;">
          </div>
        </a>
      </div>
      <span slot="modal-footer" class="dialog-footer">
        <a type="text" @click="dialogVisible = false" style="margin-right: 10px; font-size: 14px; color: grey; cursor: pointer;">残忍拒绝</a>
        <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="linkToStar">
          <b-button variant="primary">
            够义气，现在就去！
            <OutboundLink/>
          </b-button>
        </a>
      </span>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { differenceInMinutes } from 'date-fns'

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted () {
    if (localStorage.getItem('stared') === 'true') {
      console.log('已经去过 GITHUB')
      return
    }
    setInterval(this.checkDuration, 10000)
  },
  methods: {
    checkDuration() {
      let firstAccess = localStorage.getItem('FIRST_ACCESS')
      // console.log(new Date(), new Date(firstAccess))
      if (!firstAccess) {
        console.log('FIRST_ACCESS', new Date())
        localStorage.setItem('FIRST_ACCESS', new Date())
      } else {
        // console.log('differenceInMinutes', differenceInMinutes(new Date(), new Date(firstAccess)))
        if (differenceInMinutes(new Date(), new Date(firstAccess)) >= 10 && !this.dialogVisible) {
          this.show()
        }
      }
    },
    show () {
      if (localStorage.getItem('stared') === 'true') {
        console.log('已经去过 GITHUB')
        return
      }
      this.dialogVisible = true
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'StarGazer',
          eventAction: 'SG:ShowStarGazer',
          eventLabel: 'SG:显示StarGazer'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    },
    reset () {
      localStorage.removeItem('FIRST_ACCESS')
      this.dialogVisible = false
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'StarGazer',
          eventAction: 'SG:RefuseGivingStar',
          eventLabel: 'SG:残忍拒绝'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    },
    linkToStar() {
      this.dialogVisible = false
      localStorage.setItem('stared', 'true')
      this.$sendGaEvent('StarGazer', 'SG:GotoGithub', 'SG:前往github' + this.$page.path)
    }
  }
}
</script>

<style>

</style>
