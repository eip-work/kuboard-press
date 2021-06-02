<template>
  <div v-if="isdebugging">
    <OnlineChatLogin ref="loginWindow" @loginSuccess="loginSuccess"></OnlineChatLogin>
    <b-button variant="outline-primary" size="sm" class="logout" v-if="showLogout" @click="logout">退出登录</b-button>
    <b-button variant="primary" size="sm" class="openChatWindow" v-if="showLogout" @click="openChatWindow">打开单独的聊天窗口</b-button>
    <div class="frameButton" @click="showChat">
      <span class="ecMDHC"></span>
    </div>
  </div>
</template>

<script>
import OnlineChatLogin from './OnlineChatLogin.vue'
import axios from 'axios'
import {format} from 'date-fns'
import Cookies from 'js-cookie'

(function(a, b, c, d, e, j, s) {
    a[d] = a[d] || function() {
        (a[d].a = a[d].a || []).push(arguments)
    };
    j = b.createElement(c),
        s = b.getElementsByTagName(c)[0];
    j.async = true;
    j.charset = 'UTF-8';
    j.src = 'https://static.meiqia.com/widget/loader.js';
    s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', '961dff7f89ddc015ac1f8e193bf774d0');
_MEIQIA('manualInit');
_MEIQIA('withoutBtn');

let TOKEN_KEY = 'kb-user-center-token'

export default {
  props: {
  },
  data() {
    console.log(window.location.search, 'search')
    return {
      showLogout: false,
      isdebugging: window.location.search === '?showLogin=true'
    }
  },
  computed: {
  },
  components: { OnlineChatLogin },
  mounted () {
  },
  methods: {
    showChat () {
      console.log(Cookies.get(TOKEN_KEY))
      if (Cookies.get(TOKEN_KEY)) {
        this.loginSuccess()
        // _MEIQIA('showPanel');
      } else {
        this.$refs.loginWindow.show()
      }
    },
    async loginSuccess () {
      this.showLogout = true
      let ax = axios.create({
        baseURL: '/uc-api',
        // headers: {
        //   common: {
        //     Authorization: localStorage.getItem(TOKEN_KEY)
        //   }
        // }
      })
      let orders = []
      let user = undefined
      await ax.get(`/orders/list`, {params: {
        status: 'PAID',
        pageNum: 1,
        pageSize: 1000
      }}).then(resp => {
        orders = resp.data.items
      }).catch(e => {
        console.log(e)
      })
      await ax.get('/users/selfInfo').then(resp => {
        user = resp.data.data
      }).catch(e => {
        console.log(e)
      })

      _MEIQIA('clientId', user.id)

      let totalAmount = 0
      for (let order of orders) {
        totalAmount += order.totalPrice
      }
      totalAmount = Math.round(totalAmount)

      let metadata = {
        name: user.name, // 美洽默认字段
        email: user.email,
        tel: user.mobile,
        Count: orders.length,
        Amount: totalAmount,
        uc_id: user.id,
      }
      for (let i in orders) {
        let order = orders[i]
        let prefix = 'r' + (parseInt(i) + 1)
        if (i >= 5) {
          break
        }
        metadata[prefix + '_id'] = order.id //`${order.id} -- ${order.description} -- ${format(order.createTime, 'YYYY-MM-DD HH:mm')}`
        metadata[prefix + '_desc'] = order.description
        metadata[prefix + '_time'] = format(order.createTime, 'YYYY-MM-DD HH:mm')
      }

      _MEIQIA('metadata', metadata);
      _MEIQIA('init');
      _MEIQIA('showPanel')
    },
    openChatWindow () {
      let url = '/chat/index.html'
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.click()
      document.body.removeChild(a)
      _MEIQIA('hidePanel')
      this.showLogout = false
    },
    logout () {
      this.showLogout = false
      _MEIQIA('hidePanel')
      this.$logout()
    }
  },
}
</script>

<style scoped lang="stylus">
.ecMDHC {
    vertical-align: middle;
    padding-right: 32px;
    margin-top: 18px;
    height: 32px;
    display: inline-block;
    background: url(/chat/icon-mq-round@2x.png) 0px -355px / 64px no-repeat;
}
.frameButton {
  height: 60px;
  width: 60px;
  background-color: rgb(0, 122, 255);
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 14px;
  position: fixed;
  bottom: 100px;
  right: 25px;
  text-align: center;
  cursor: pointer;
}
.logout {
  position: fixed;
  bottom: 0;
  right: 492px;
}
.openChatWindow {
  position: fixed;
  bottom: 0;
  right: 340px
}
</style>
