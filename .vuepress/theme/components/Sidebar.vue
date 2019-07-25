<template>
  <aside class="sidebar">
    <slot name="top"/>
    <SidebarLinks :depth="0" :items="items"/>
    <slot name="bottom"/>
    <div style="text-align: center; margin-top: 5vh;">
      <strong>在线体验</strong>
      <div>
        <a target="_blank" href="http://demo.eip.work/#/login?isReadOnly=true&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXZpZXdlci10b2tlbi02djZiZiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJvYXJkLXZpZXdlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjhiYTU3YmI1LWFiMTctNDM1NS1hNTM0LTQ0Njk4NGY0NzFlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprdWJvYXJkLXZpZXdlciJ9.DcXNIp0RKha1zkV4ga_QlGfcvMLGx2LOyzX-0VeboC3FojKFhxnfBeoda-zTeh6ugJlSM4kQYrRcof1Kx8Mg3-UgofNmgRySbDEVKtJZyMUoHqLmySKUIn8sbX8q83RNcqwcvY-fM8-w8HSuzU7Td7WWNuZrlCL4q_LQDYIBet1nlQ83YsENKNE8rsZQFDw8YM0MH6BEZLdwyhaboy_jjYbsU7kv8gks3aIX4lh1Fs9ZFQpC_6B0_MZvb7rEeG2M8QWXoUkDoL5JCKu6Wot5GlWf0kDMxIsViggP0NmSDTKh6kIvCkT2FZ2I4guEcjE_EjBpdOS6Abta22tzLlPKhg">
          <p>
            <img :src="demo_img"></img>
          </p>
        </a>
      </div>
      <strong>在线提问</strong>
      <p>
        <img :src="kuboard_qq_img"/>
      </p>
    </div>
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import kuboard_qq from './kuboard_qq.png'
import demo from './image-20190723104717575.png'

export default {
  name: 'Sidebar',

  props: ['items'],
  components: { SidebarLinks },
  data () {
    return {
      kuboard_qq_img: kuboard_qq,
      demo_img: demo
    }
  }

}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
