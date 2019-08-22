<template>
  <div>
    <el-dialog
      title="有奖征文进行中"
      :visible.sync="dialogVisible"
      :fullscreen="true"
      :center="true"
      custom-class="promotion-dialog"
      :append-to-body	="true">
      <div>
        <img style="max-width: 100%;" @click="gotoStar" alt="Kuboard 有奖征文火热进行中，最高可得1000元现金大奖" src="https://blog.kuboard.cn/wp-content/uploads/2019/08/banner-2-576x1024.png"></img>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="waitAMoment">一会儿再说</el-button>
        <el-button type="primary" @click="gotoStar">去看看！</el-button>
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
    // this.waitAMoment()
    this.dialogVisible = this.$page.path.indexOf('micro-service') > 0 && localStorage.getItem('promotion') !== 'compaign'
  },
  methods: {
    waitAMoment() {
      this.dialogVisible = false
      if (localStorage.getItem('promotion') === 'compaign') {
        return
      }
      let _this = this
      setTimeout(_ => {
        _this.dialogVisible = true
      }, 60000 * 6)
    },
    gotoStar() {
      this.dialogVisible = false
      window.open('https://blog.kuboard.cn/compaign')
      localStorage.setItem('promotion', 'compaign')
    }
  }
}
</script>

<style>
.promotion-dialog {
  background-color:rgba(10,10,10,0.2);
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}

.promotion-dialog .el-dialog__body {
  padding: 0;
  text-align: center;
}

</style>
