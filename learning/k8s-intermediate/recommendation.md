# Kubernetes 课程推荐

作者认为，基础比较好的同学，在学完 **Kubernetes 入门** 部分的内容后，就可以根据 Kubernetes 的官网文档和 docker 的官网文档，结合实际项目将 Kubernetes 应用得很好。同时，作者也在逐步完善 **Kubernetes 进阶** 的学习内容，例如 [通过互联网访问您的应用](./ingress.html)，但是鉴于时间和进度的原因，短期内仍然不能很好的满足 Kubernetes 爱好者迫切的学习意愿。

在这种情况下，作者向大家推荐一份视频课程。该课程价格为 99 元，新注册用户享有 30 元现金优惠，也就是只需要 <font color="red">69 元</font> 即可购买该套课程。

点击此处购买 <span v-on:click="gotoRecommendation" style="cursor: pointer;"><a>深入剖析Kubernetes</a></span> ，或扫描图片中的二维码。

<img src="./recommendation.assets/88302026c83b209ccc6261c63281a963.jpg" style="border: 1px solid #d7dae2; max-width: 600px;" v-on:click="gotoRecommendation"></img>

<script>
export default {
  methods: {
    gotoRecommendation () {
      window.open('https://time.geekbang.org/column/intro/100015201?code=MH1Wu456g0ZsrKtQI7QidivKV2hVvzerAUxDz5pOuQs%3D', '_blank');
      console.log('尝试发送 ga event')
      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'Recommendation',
          eventAction: 'click',
          eventLabel: '深入剖析Kubernetes-k8s-intermediate'
        });
        console.log('发送成功 ga event')
      } else {
        console.log('开发环境，不发送 ga event')
      }
    }
  }
}
</script>
