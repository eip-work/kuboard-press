<template>
  <b-modal ref="loginModel" id="login-model" title="付费用户专属答疑/技术支持通道" centered>
    <div shadow="none" class="login" style="font-size: 14px;">
      <div class="thanks">
        感谢大家的支持和认可，Kuboard 已经在超过三千家企业的生产环境中投产。随着用户量的扩大，微信群、QQ群的免费答疑已经不能很好的满足许多用户的诉求。为了更好的为付费用户提供支持，开通了专属于付费用户的在线答疑、技术支持通道。
      </div>
      <div class="thanks2">
        如果您已付费，请继续登录；如果您尚未付费，也可以登录后咨询付费方式。
        <router-link to="/support/#订阅">查看定价</router-link>
      </div>
      <b-form label-position="left" label-width="100px" :model="form" :rules="rules" size="large">
        <b-form-group label="手机号" prop="mobile">
          <b-form-input placeholder="请输入您的手机号" v-model="form.mobile"></b-form-input>
        </b-form-group>
        <b-form-group label="验证码" prop="capture">
          <div style="display: flex;">
            <b-form-input placeholder="请输入图片验证码" v-model="form.capture" style="width: calc(100% - 190px)"></b-form-input>
            <img v-if="showCapture" class="capture" :src="captureUrl" @click="loadCapture"/>
          </div>
        </b-form-group>
        <b-form-group label="短信验证码" prop="smsCode" required>
          <div style="display: flex;">
            <b-form-input placeholder="请输入短信验证码" v-model="form.smsCode" style="width: calc(100% - 190px)"></b-form-input>
            <b-button variant="primary" style="margin-left: 10px; width: 180px;" @click="getSmsCode"
              :loading="smsLoading"
              :disabled="countDown > 0 || !form.capture || !form.mobile">
              <span v-if="countDown" style="color: red;">{{countDown}}</span> 获取短信验证码
            </b-button>
          </div>
        </b-form-group>
        <b-alert :closable="false" show>如果您的手机号未曾注册过，将直接为您创建账号。</b-alert>
      </b-form>
    </div>
    <div slot="modal-footer">
      <div style="text-align: center; width: 100%; display: flex">
        <div style="margin-top: 8px; margin-right: 20px;">
          <b-form-checkbox v-model="goStandAlone">
            进入单独的聊天窗口
          </b-form-checkbox>
        </div>
        <b-button variant="primary" :disabled="!form.smsCode || !smsCodeId" size="large" :loading="loginLoading"
          @click="login" icon="el-icon-thumb" style="width: 180px;">
          登 录</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ax from 'axios'

let axios = ax.create({ baseURL: '/uc-api' })

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);  
        return v.toString(16);  
    });  
}

export default {
  props: {
  },
  data () {
    let _this = this
    return {
      code: undefined,
      form: {
        mobile: undefined,
        capture: undefined,
        smsCode: undefined,
      },
      goStandAlone: false,
      smsCodeId: undefined,
      loginLoading: false,
      smsLoading: false,
      captureId: undefined,
      showCapture: false,
      countDown: 0,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur'},
          { validator: (rule, value, callback) => {
              let pattern  = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
              console.log(value, pattern.test(value))
              if (pattern.test(value)) {
                callback()
              } else {
                callback(new Error('手机号码格式不正确'))
              }
            },
            trigger: 'blur'
          }
        ],
        capture: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            axios.get(`/capture/validate/${_this.captureId}/${value}`).then(resp => {
              if (resp.data.data === 'OK') {
                callback()
              } else {
                callback(new Error(resp.data.message))
              }
            }).catch(e => {
              callback(new Error('验证出错: ' + e))
            })
          }, trigger: 'blur'}
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    captureUrl () {
      return `/uc-api/capture/genVerifyCode?id=${this.captureId}`
    }
  },
  mounted () {
    // console.log(location)
    if (location.search === '?showLogin=true') {
      this.goStandAlone = true
      this.show()
    }
  },
  methods: {
    show () {
      this.loadCapture()
      this.$refs.loginModel.show()
    },
    loadCapture() {
      this.showCapture = false
      setTimeout(_ => {
        this.captureId = guid()
        this.showCapture = true
      }, 100)
    },
    getSmsCode () {
      this.smsLoading = true
      axios.post('/smscodes', {
        mobile: this.form.mobile,
        type: 'REGISTER/LOGIN',
        captureId: this.captureId,
        captureCode: this.form.capture,
      }).then(resp => {
        console.log(resp.data)
        this.$bvToast.toast('短信验证码已经发送到您的手机，请查收。', {title: '发送成功', variant: 'success', solid: true})
        this.smsLoading = false
        this.smsCodeId = resp.data.data
        this.countDown = 60
        let interval = setInterval(_ => {
          this.countDown = this.countDown - 1
          if (this.countDown === 0) {
            clearInterval(interval)
          }
        }, 1000)
      }).catch(e => {
        this.smsLoading = false
        this.$bvToast.toast('发送短信验证码失败: ' + (e.response ? e.response.data.message : e.message), {title: '发送失败', variant: 'danger', solid: true})
      })
    },
    login () {
      this.loginLoading = true
      axios.post(`/users/loginBySmsCode`, {
        smsCodeId: this.smsCodeId,
        smsCode: this.form.smsCode,
      }).then(resp => {
        this.$refs.loginModel.hide()
        this.$login(resp.data.data)
        this.loginLoading = false
        console.log(this.goStandAlone)
        if (this.goStandAlone && typeof window !== 'undefined') {
          window.location.href = '/chat/'
        } else {
          this.$emit('loginSuccess')
        }
      }).catch(e => {
        this.$bvToast.toast('登录失败: ' + e, {variant: 'danger', solid: true})
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login {
  width: 450px;
  margin: auto;
}
.capture {
  width: 178px;
  height: 38px;
  vertical-align: bottom;
  border: 1px solid rgb(206, 212, 218);
  margin-left: 10px;
  border-radius: 4px;
  padding: 0 10px;
}
.thanks {
  font-size: 13px;
  margin-bottom: 10px;
  color: #333;
}
.thanks2 {
  font-size: 13px;
  margin-bottom: 20px;
  color: red;
}
.thanks3 {
  color: green;
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
