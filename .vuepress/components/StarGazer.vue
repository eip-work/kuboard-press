<template>
  <div>
    <el-dialog
      title="感谢阅读"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body	="true">
      <div style="text-align: center;">
        <div style="margin-top: 10px;">本站所有内容 <span style="color: red;">全部免费</span>！</div>
        <div style="margin-top: 10px;">未打赏用户可进 QQ 群聊，<span style="color: red;">打赏用户可进微信群聊</span>。</div>
        <div style="margin-top: 10px;">
          <span style="font-size: 13px;">扫第一个二维码完成打赏，扫第二个进微信群聊</span>
          <p style="margin-top: 10px;">
            <img src="../theme/layouts/dz.png" style="width: 150px; margin-right: 150px;"></img>
            <img src="../theme/layouts/dz2.jpeg" style="width: 150px;"></img>
          </p>
        </div>
        <div style="margin-bottom: 10px;">不方便给打赏的话，那就 <span style="color: red;">给一个 github star</span> 吧！</div>
        <span>点击 “够义气，现在就去！” 后，此窗口将不再弹出。请在 github Star本项目</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="waitAMoment">一会儿再说</el-button>
        <el-button type="primary" @click="gotoStar">够义气，现在就去！</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Dialog, Button } from 'element-ui';

Vue.component(Dialog.name, Dialog)
Vue.component(Button.name, Button)

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted () {
    this.waitAMoment()
  },
  methods: {
    waitAMoment() {
      this.dialogVisible = false
      if (localStorage.getItem('stared') === 'true1') {
        return
      }
      let _this = this
      setTimeout(_ => {
        _this.dialogVisible = true
      }, 10000) 
      // }, 60000 * 3)
    },
    gotoStar() {
      this.dialogVisible = false
      window.open('https://github.com/eip-work/kuboard-press')
      localStorage.setItem('stared', 'true')
    }
  }
}
</script>

<style>

</style>
