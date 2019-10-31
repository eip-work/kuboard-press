<template>
  <div>
    <slot></slot>
  </div>
  <!-- <div style="border: solid 1px #E6A23C; background-color: rgb(253, 246, 236); padding: 1rem;">
    <div v-show="!authorized" key="not">
        <p style="color: red; font-weight: 500;">免费解锁全站文档：</p>
        <li>扫描二维码加微信获得验证码</li>
        <li>一次验证，可查看全站所有内容</li>
      <grid :rwd="{compact: 'stack'}">
        <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 0rem 0 1rem 1rem;">

      <div>

        <p>
          <img src="/images/dz2.jpeg" style="width: 180px;"></img>
        </p>
        </div>
        </grid-item>
        <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 1rem 1rem 1rem;">
          <div style="display: inline-block; max-width: calc(100% - 2rem); overflow: hidden; line-height: 40px; background-color: rgba(255,229,100,0.3); padding: 1rem; margin-bottom: 20px; border: 1px solid #d7dae2;">
            <el-form ref="envForm" style="text-align: left;" label-width="80px">
              <el-form-item label="随机码：">
                <el-tag size="medium" effect="dark">{{code1}}{{code2}}</el-tag>
              </el-form-item>
              <el-form-item prop="checked" class="env-form-item" label="验证码：">
                <el-input placeholder="Kuboard返回的验证码" v-model.number="authCode"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </grid-item>
      </grid>

    </div>
    <div v-show="authorized" key="ok">
      <el-alert
        style="margin-bottom: 10px;"
        title="已为您解锁全站完整文档，感谢配合。"
        description="缓存清空后需重新输入验证码"
        effect="dark"
        type="success">
      </el-alert>
      <slot></slot>
      </div>
  </div> -->
</template>

<script>
function genCode() {
  let code = parseInt(Math.random() * 100)
  if (code < 10) {
    return code + 10
  } else {
    return code
  }
}

export default {

  data () {
    let a = false
    if (typeof window !== 'undefined') {
      a = localStorage.getItem('SharingBlockValidated')
    }
    return {
      authorized: a,
      code1: genCode(),
      code2: genCode(),
      authCode: undefined
    }
  },
  watch: {
    authCode () {
      if (this.authCode === this.code1 + this.code2) {
        this.authorized = true
        if (typeof window !== 'undefined') {
          localStorage.setItem('SharingBlockValidated', 'true')
        }
        this.$sendGaEvent('文档验证码', '文档验证码' + this.$page.path, '文档验证码' + this.$title)
      }
    }
  },
  methods: {
    validate () {

    }
  }
}
</script>

<style>

</style>
