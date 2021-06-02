import Vue from 'vue'
import Cookies from 'js-cookie'

let TOKEN_KEY = 'kb-user-center-token'

window.KbUcloginStatus = {
  status: Cookies.get(TOKEN_KEY) !== null && Cookies.get(TOKEN_KEY) !== undefined,
  user: undefined
}

Vue.prototype.$login = function (token) {
  // axios.defaults.headers.common['Authorization'] = token;
  // localStorage.setItem(TOKEN_KEY, token)
  Cookies.set(TOKEN_KEY, token, { path: '/' })
  window.KbUcloginStatus.status = true
}

Vue.prototype.$logout = function () {
  window.KbUcloginStatus.status = false
  // localStorage.removeItem(TOKEN_KEY)
  Cookies.remove(TOKEN_KEY, { path: '/' })
  // delete (axios.defaults.headers.common['Authorization'])
}
