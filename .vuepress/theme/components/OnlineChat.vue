<template>
  <div>
    <OnlineChatLogin ref="loginWindow" @loginSuccess="loginSuccess"></OnlineChatLogin>
    <template v-if="$route.path.indexOf('/install/v3/') < 0">
      <b-button variant="outline-primary" size="sm" class="logout" v-if="showLogout" @click="logout">退出登录</b-button>
      <b-button variant="primary" size="sm" class="openChatWindow" v-if="showLogout" @click="openChatWindow">打开单独的聊天窗口</b-button>
    </template>
    <b-popover v-if="unreadMsgs !== 'hasBeenRead'" :show.sync="showUnread" target="chat-button" :title="`您有 ${unreadMsgs.length} 条未读消息`" placement="lefttop">
      <div @click="loginSuccess()">
        <b-alert v-for="(msg, index) in unreadMsgs" :key="index + 'msg'" 
          style="font-size: 12px; font-weight: bold; width: 240px; cursor: pointer;" variant="info" class="m-1" show>
          {{msg.content === '[推广消息]' ? '点击此处查看' : msg.content}}
        </b-alert>
      </div>
    </b-popover>
    <div id="chat-button" class="frameButton" @click="showChat">
      <span class="ecMDHC"></span>
    </div>
  </div>
</template>

<script>
import OnlineChatLogin from './OnlineChatLogin.vue'
import axios from 'axios'
import {format} from 'date-fns'
import Cookies from 'js-cookie'

let TOKEN_KEY = 'kb-user-center-token'

export default {
  props: {
  },
  data() {
    if (typeof window !== 'undefined') {
      return {
        showLogout: false,
        showUnread: false,
        unreadMsgs: []
      }
    } else {
      return {
        showLogout: false,
        showUnread: false,
        unreadMsgs: []
      }
    }
  },
  computed: {
  },
  components: { OnlineChatLogin },
  mounted () {
    if (typeof window !== 'undefined') {
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
      _MEIQIA('getUnreadMsg', msgs => {
        this.unreadMsgs = msgs
        this.showUnread = true
      });
      _MEIQIA('fallback', 1);
      _MEIQIA('init');

      if (this.$route.path.indexOf('/install/v3/') === 0) {
        setTimeout(_ => {
          this.loginSuccess()
        }, 3000)
      }
    }
  },
  watch: {
    '$route.path': function (newValue, oldValue) {
      if (newValue.indexOf('/install/v3/') === 0) {
        this.loginSuccess()
      }
      if (newValue.indexOf('/install/v3/') !== 0 && !Cookies.get(TOKEN_KEY)) {
        _MEIQIA('hidePanel')
      }
    }
  },
  methods: {
    showChat () {
      if (Cookies.get(TOKEN_KEY) || this.$route.path.indexOf('/install/v3/') === 0) {
        this.loginSuccess()
        // _MEIQIA('showPanel');
      } else {
        this.$refs.loginWindow.show()
      }
    },
    async loginSuccess () {
      let ax = axios.create({
        baseURL: '/uc-api',
      })
      let orders = []
      let user = undefined

      let metadata = {
        name: '匿名用户'
      }
      if (Cookies.get(TOKEN_KEY)) {
        this.showLogout = true
        await ax.get('/users/selfInfo').then(resp => {
          user = resp.data.data
        }).catch(e => {
          console.log(e)
        })
        await ax.get(`/orders/list`, {params: {
          status: 'PAID',
          pageNum: 1,
          pageSize: 1000
        }}).then(resp => {
          orders = resp.data.items
        }).catch(e => {
          console.log(e)
        })
        _MEIQIA('clientId', user.id)

        let totalAmount = 0
        for (let order of orders) {
          totalAmount += order.totalPrice
        }
        totalAmount = Math.round(totalAmount)

        metadata = {
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
      }

      _MEIQIA('metadata', metadata);
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
  bottom: 15vh;
  right: 25px;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
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
