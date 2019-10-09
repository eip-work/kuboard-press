<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">返回首页</router-link>
      <p>
        <a href="/">
          <img src="/images/logo-main.png" style="max-width: 450px;"></img>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
const msgs = [
  `您要找的页面不存在`,
  `糟糕，是不是 url 写错了？`,
  `链接错误，跟群主说一下吧：）`,
  `也许此链接已被删除了吧？`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
