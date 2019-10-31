<template>
  <div>

    <link rel="stylesheet" href="/landing/css/googlefont.css">
    <link rel="stylesheet" href="/landing/css/font-awesome.min.css">

    <link rel="stylesheet" href="/landing/css/style.css">
    <link rel="stylesheet" href="/landing/css/components.css">
    <div class="py-80" id="features" style="padding-top: 1rem;">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center" style="margin-bottom: 1rem;">
                        <div class="text-primary-title">网上那么多 Kubernetes 安装文档，为什么这篇文档更有参考价值？</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4" >
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature">
                      <div class="feature-title">
                        <img src="/landing/images/icn3.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">广泛验证</div>
                      </div>
                      <div class="feature-description">
                        <li>每天有超过 300 人参考此文档完成 Kubernetes 集群的安装</li>
                        <li>不断有网友对安装文档提出改进意见</li>
                      </div>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
              
                <div class="col-md-4 bg-gray">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1600">
                      <div class="feature-title">
                        <img src="/landing/images/icn4.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">持续更新</div>
                      </div>
                      <div class="feature-description">
                        <li>始终有最新的 Kubernetes 稳定版安装文档</li>
                        <li>当前版本 Kubernetes {{version}}</li>
                        <li>已完成了 <span style="font-weight: 500; color: red;">{{updateCount}} 次更新</span>，每次更新都帮您排除一个或更多可能踩的坑。
                          <a href="https://github.com/eip-work/kuboard-press/commits/master/install/install-k8s.md" target="_blank">
                            查看更新历史
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
                          </a>
                        </li>
                      </div>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
                <div class="col-md-4">
                    <!-- InfoBox Left  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
                      <div class="feature-title">
                        <img src="/landing/images/icn5.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">适应面广</div>
                      </div>
                      <div class="feature-description">
                        <li>大部分的 K8S 安装文档都是个人爱好者的一份笔记而已，他当时的特定条件并不一定适用于你</li>
                        <li>此文档经众多网友验证，在公有云、私有云、自建虚拟机等多种条件下均适用</li>
                      </div>
                    </div>
                    <!-- InfoBox Left </End> -->
                </div>
                <div class="col-md-4 bg-gray">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1800">
                      <div class="feature-title">
                        <img src="/landing/images/icn1.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">在线答疑</div>
                      </div>
                      <div class="feature-description">
                        <Qq></Qq> 808894550
                        
                        <p>
                          <img src="/images/kuboard_qq.png" alt="Kubernetes安装：QQ群在线答疑" style="width: 120px;"/>
                          <br/>如需远程协助，请扫描本文页尾的微信二维码
                        </p>
                      </div>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    version: { type: String, required: true },
    updateCount: { type: String, required: true }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style scoped>
.text-primary-title {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.7rem;
}
.feature {
  text-align: left;
  padding: 1rem;
  margin-bottom: 0;
  border-top: solid 1px #f7f7f7;
}
.feature-title {
  display: inline-block;
  text-align: center;
}
.feature-description {
  display: inline-block;
  max-width: calc(100% - 64px - 2rem);
  padding: 0 0 0 1rem;
  vertical-align: top;
  text-align: left;
}
</style>
