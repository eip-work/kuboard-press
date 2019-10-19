<template>
  <div>
    <el-dialog
      title="感谢阅读"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :append-to-body	="true">
      <div style="text-align: center; font-size: 18px; weight: 500;">
        我想看到
        <span style="color: red;">更多更好的 Kubernetes 免费内容</span>，
        所以我要
        <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="linkToStar">
          给一个 Github Star
          <OutboundLink/>
        </a>
        以鼓励作者。
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="reset" style="margin-right: 10px; color: grey;">残忍拒绝</el-button>
        <a href="https://github.com/eip-work/kuboard-press" target="_blank" @click="linkToStar">
          够义气，现在就去！
          <OutboundLink/>
        </a>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Dialog, Button } from 'element-ui'
import { differenceInMinutes } from 'date-fns'

Vue.component(Dialog.name, Dialog)
Vue.component(Button.name, Button)

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
      this.$sendGaEvent('StarGazer', 'SG:GotoGithub', 'SG:前往github' + this.$page.path)
    },
    gotoStar() {
      this.dialogVisible = false
      localStorage.setItem('stared', 'true')
      window.open('https://github.com/eip-work/kuboard-press')
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'StarGazer',
          eventAction: 'SG:GotoGithub',
          eventLabel: 'SG:前往github'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    },
    handleClose (done) {
      this.$message.success('赠人玫瑰，手有余香')
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'StarGazer',
          eventAction: 'SG:BeforeClose',
          eventLabel: 'SG:赠人玫瑰，手有余香'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    }
  }
}
</script>

<style>

</style>
