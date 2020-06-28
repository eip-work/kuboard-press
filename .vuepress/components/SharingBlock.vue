<template>
  <div>
    <slot></slot>
  </div>
  <!-- <div style="border: solid 1px #f2be45; background-color: rgba(242, 190, 69, 0.1); padding: 1rem;" data-aos="slide-up">
    <div v-show="!authorized" key="not">
        <p style="color: red; font-weight: 500;">免费解锁全站文档：</p>
        <li>扫描二维码加微信获得验证码</li>
        <li>一次验证，可查看全站所有内容</li>
      <grid :rwd="{compact: 'stack'}">
        <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 0rem 0 1rem 1rem;">

      <div>
        <p style="text-align: center;">
          <img src="/images/dz2.jpeg" style="width: 180px;"></img>
        </p>
        </div>
        </grid-item>
        <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 1rem 1rem 1rem;">
          <div style="display: inline-block; width: 100%; overflow: hidden; line-height: 40px; background-color: rgba(255,229,100,0.3); padding: 1rem; margin-bottom: 20px; border: 1px solid #d7dae2;">
            <b-form ref="envForm" style="text-align: left;" label-width="80px">
              <b-form-group
                id="fieldset-1"
                label="随机码："
                label-cols-sm="4"
                label-cols-lg="3"
                label-for="input-1"
                style="text-align: left"
              >
                <b-badge size="medium" variant="dark">{{code1}}</b-badge>
                <b-badge size="medium" variant="dark">{{code2}}</b-badge>
              </b-form-group>
              <b-form-group 
                label-cols-sm="4"
                label-cols-lg="3"
                style="text-align: left"
                label="验证码：">
                <b-input placeholder="请输入验证码" v-model.number="authCode"></b-input>
              </b-form-group>
            </b-form>
          </div>
        </grid-item>
      </grid>

    </div>
    <div v-show="authorized" key="ok">
      <b-alert
        variant="success" show
        style="margin-bottom: 10px;"
      >
        <h4 class="alert-heading">已为您解锁全站完整文档，感谢配合！</h4>
        <hr/>
        <li>
          清空浏览器缓存后需重新输入验证码
        </li>
      </b-alert>
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
