<template>
  <div>

    <link rel="stylesheet" href="/landing/css/googlefont.css">
    <link rel="stylesheet" href="/landing/css/font-awesome.min.css">

    <link rel="stylesheet" href="/landing/css/style.css">
    <link rel="stylesheet" href="/landing/css/components.css">
    <div class="py-80" id="features" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center" style="margin-bottom: 1rem;">
                        <div class="text-primary-title">网上那么多 Kubernetes 安装文档，为什么这篇文档更有参考价值？</div>
                    </div>
                </div>
            </div>
            <div class="row">
              <transition-group name="lightSpeed" tag="div">
                <div class="col-md-4" key="f1" v-show="f1">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature">
                      <div class="feature-title">
                        <img src="/landing/images/icn3.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">广泛验证</div>
                      </div>
                      <div class="feature-description">
                        <li>每天有超过
                          <span style="font-weight: 500; color: red;">
                              <!-- {{value}} -->
                              <div style="width: 2rem; display: inline-block;">
                                <animated-number
                                  style=""
                                  :value="value"
                                  :formatValue="formatToPrice"
                                  :duration="2000"
                                />
                              </div>
                          </span>
                          人参考此文档完成 Kubernetes 集群的安装</li>
                        <li>不断有网友对安装文档提出改进意见</li>
                      </div>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
              
                <div class="col-md-4" key="f2" v-show="f2">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature">
                      <div class="feature-title">
                        <img src="/landing/images/icn4.svg" alt="" class="img-fluid">
                        <div class="text-primary-title">持续更新</div>
                      </div>
                      <div class="feature-description">
                        <li>始终有最新的 Kubernetes 稳定版安装文档</li>
                        <li>当前版本 Kubernetes {{version}}</li>
                        <li>已完成了
                          <span style="font-weight: 500; color: red;">
                            <div style="width: 1.2rem; display: inline-block;">
                              <animated-number
                                style=""
                                :value="updateCount"
                                :formatValue="formatToPrice"
                                :duration="6000"
                              />
                            </div>
                              <!-- {{updateCount}} -->
                            次更新
                          </span>，每次更新都帮您排除一个或更多可能踩的坑。
                          <a href="https://github.com/eip-work/kuboard-press/commits/master/install/install-k8s.md" target="_blank">
                            查看更新历史
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
                          </a>
                        </li>
                      </div>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
                <div class="col-md-4" key="f3" v-show="f3">
                    <!-- InfoBox Left  <Start> -->
                    <div class="cs-infobox-left mt-4 feature">
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
                <div class="col-md-4" key="f4" v-show="f4">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up">
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
              </transition-group>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import 'vue2-animate/dist/vue2-animate.min.css';

export default {
  props: {
    version: { type: String, required: true },
    updateCount: { type: String, required: true }
  },
  data () {
    return {
      show: false,
      value: 300,
      f1: false,
      f2: false,
      f3: false,
      f4: false
    }
  },
  components: {
    AnimatedNumber
  },
  mounted () {
    this.show = true
    this.f1 = true
    setTimeout(_ => {
      this.f2 = true
    }, 1000)
    setTimeout(_ => {
      this.f3 = true
    }, 2000)
    setTimeout(_ => {
      this.f4 = true
    }, 3000)
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed(0)}`;
    }
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
  margin-bottom: 1rem;

  border: 1px solid #8096b0;
  border-radius: 5px;
  -webkit-transition: .5s;
  transition: .5s;
  background-color: #fff;
}
.feature:hover {
  background-color: #edf5ff;
  /* border-color: #fff; */
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
