<template>
  <div>
    <el-dialog
      title="感谢阅读"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :append-to-body	="true">
      <div style="text-align: center;">
        <span style="font-size: 18px; weight: 500;">英雄，Kuboard 恭候多时啦，请给个 github star 吧！</span>
        <!-- <div style="margin-top: 10px;">未打赏用户可进 QQ 群聊，<span style="color: red;">打赏用户可进微信群聊</span>。</div>
        <div style="margin-top: 10px;">
          <span style="font-size: 13px;">扫第一个二维码完成打赏，扫第二个进微信群聊</span>
          <p style="margin-top: 10px;">
            <img src="/images/dz.png" style="width: 150px; margin-right: 150px;"></img>
            <img src="/images/dz2.jpeg" style="width: 150px;"></img>
          </p>
        </div>
        <div style="margin-bottom: 10px;">不方便给打赏的话，那就 <span style="color: red;">给一个 github star</span> 吧！</div>
        <div style="margin-bottom: 10px;">github star 后，本窗口将不再弹出</div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">一会儿再说</el-button>
        <el-button type="primary" @click="gotoStar">够义气，现在就去！</el-button>
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
        if (differenceInMinutes(new Date(), new Date(firstAccess)) >= 20 && !this.dialogVisible) {
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
          eventAction: 'ShowStarGazer',
          eventLabel: '显示 StarGazer'
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
          eventAction: 'WaitWait',
          eventLabel: '一会儿再说'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    },
    gotoStar() {
      this.dialogVisible = false
      localStorage.setItem('stared', 'true')
      window.open('https://github.com/eip-work/kuboard-press')
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'StarGazer',
          eventAction: 'GotoGithub',
          eventLabel: '前往 github'
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
          eventAction: 'BeforeClose',
          eventLabel: '赠人玫瑰，手有余香'
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
