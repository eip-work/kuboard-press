<template>
  <div>

    <div class="py-80" id="features" style="padding-top: 1rem; padding-bottom: 1rem;">
        <div class="container" style="margin-top: 0;">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center" style="margin-bottom: 1rem;">
                        <div class="text-primary-install-banner">网上那么多 Kubernetes 安装文档，为什么这篇文档更有参考价值？</div>
                    </div>
                </div>
            </div>
            <div>
              <transition-group name="lightSpeed" tag="div" class="row">
                <div class="col-md-6" key="f1">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-duration="800">
                        <img src="/landing/images/icn3.svg" alt="K8S安装_K8S培训_每天超过300人参考此文档成功安装K8S" class="img-fluid">
                        <div class="text-primary-install-banner">广泛验证</div>
                        <li>每天有超过
                          <span style="font-weight: 500; color: red;">
                              <!-- {{value}} -->
                              <div style="width: 2rem; display: inline-block;">
                                <animated-number
                                  style=""
                                  :value="value"
                                  :formatValue="formatToPrice"
                                  :duration="5000"
                                />
                              </div>
                          </span>
                          人参考此文档完成 Kubernetes 集群的安装</li>
                        <li>不断有网友对安装文档提出改进意见</li>
                    </div>
                    <!-- InfoBox Center </End> -->
                </div>
              
                <div class="col-md-6" key="f2">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-duration="1000">
                        <img src="/landing/images/icn4.svg" alt="K8S安装_K8S培训_始终有最新的K8S版本" class="img-fluid">
                        <div class="text-primary-install-banner">持续更新</div>

                        <li>始终有最新的 Kubernetes 稳定版安装文档</li>
                        <li>当前版本 Kubernetes {{version}}</li>
                        <li>已完成了
                          <span style="font-weight: 500; color: red;">
                            <div style="width: 1.2rem; display: inline-block;">
                              <animated-number
                                style=""
                                :value="updateCount"
                                :formatValue="formatToPrice"
                                :duration="5000"
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
                    <!-- InfoBox Center </End> -->
                </div>
                <div class="col-md-6" key="f3">
                    <!-- InfoBox Left  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-duration="1500">
                        <img src="/landing/images/icn5.svg" alt="K8S安装_K8S培训_适应各种环境下的安装过程" class="img-fluid">
                        <div class="text-primary-install-banner">适应面广</div>
                        <li>大部分的 K8S 安装文档都是个人爱好者的一份笔记而已，他当时的特定条件并不一定适用于你</li>
                        <li>此文档经众多网友验证，在公有云、私有云、自建虚拟机等多种条件下均适用</li>
                    </div>
                    <!-- InfoBox Left </End> -->
                </div>
                <div class="col-md-6" key="f4">
                    <!-- InfoBox Center  <Start> -->
                    <div class="cs-infobox-left mt-4 feature" data-aos="fade-up" data-aos-duration="1200">
                        <img src="/landing/images/icn1.svg" alt="K8S安装_K8S培训_在线答疑" class="img-fluid">
                        <div class="text-primary-install-banner">在线答疑</div>
                        <div>
                          <div style="text-align: center;">
                            <!-- <Qq><Qq></Qq></p> -->
                            <img src="https://addons.kuboard.cn/downloads/qr_code.jpg" alt="Kubernetes安装：微信群在线答疑" style="width: 120px;"/>
                          </div>
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

export default {
  props: {
    version: { type: String, required: true },
    updateCount: { type: String, required: true }
  },
  data () {
    return {
      show: false,
      value: 300,
    }
  },
  components: {
    AnimatedNumber
  },
  mounted () {
    this.show = true
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed(0)}`;
    }
  }
}
</script>

<style scoped>
.text-primary-install-banner {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.7rem;
  margin-left: 0.7rem;
  display: inline-block;
}
.feature {
  text-align: left;
  padding: 1rem;
  min-height: 240px;
  z-index: 10;
  border: 1px solid #f2be45;
  border-radius: 5px;
  -webkit-transition: .5s;
  transition: .5s;
  /* background-color: #fff; */
}
.feature:hover {
  /* background-color: rgba(255,227,200); */
  background-color: rgba(242, 190, 69, 0.1);
}

</style>
