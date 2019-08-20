<template>
  <div>
    <el-dialog
      title="感谢阅读"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span>如果这篇文档有帮到您，劳烦移步 github 给一个 star，谢谢！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="waitAMoment">一会儿再说</el-button>
        <el-button type="primary" @click="gotoStar">现在就去</el-button>
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    waitAMoment() {
      if (localStorage.getItem('stared')) {
        return
      }
      this.dialogVisible = false
      let _this = this
      setTimeout(_ => {
        _this.dialogVisible = true
      }, 10000) //60000 * 5)
    },
    gotoStar() {
      this.dialogVisible = false
      window.open('https://github.com/eip-work/kuboard-press')
      localStorage.setItem('stared', true)
    }
  }
}
</script>

<style>

</style>
