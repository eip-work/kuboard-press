<template>
  <div v-if="$page.path.indexOf('/t/') !== 0" class="page-nav" style="max-width: 1000px; padding: 1rem; text-align: center;">
    <b-alert style="margin-bottom: 0;" show variant="primary">免费答疑</b-alert>

    <div>
      <div class="row" style="margin-top: 1rem;">
        <div class="col-md-4 col-sm-12">
          <b-card style="height: 100%; " shadow="none" :body-style="{padding: '0rem 1.5rem'}"
          data-aos="fade-up" data-aos-duration="800">
            <h4>QQ群</h4>
            <div>
              <!-- 一键进群 -->
              <Qq/>
              <!-- 808894550 -->
            </div>
            <p style="margin-bottom: 0; margin-top: 10px;">
              <img style="margin: auto; width: 150px; padding: 10px;" src="/images/kuboard_qq.png" alt="Kubernetes教程：QQ群在线答疑"/>
            </p>
          </b-card>
        </div>
        <div class="col-md-4 col-sm-12">
          <b-card style="height: 100%; color: #2c3e50; line-height: 1.7; " shadow="none" :body-style="{padding: '0rem 1.5rem'}"
          data-aos="fade-up" data-aos-duration="1000">
            <h4>微信群</h4>
            <div>
              <div style="margin-top: 10px;">
                <span>微信扫码</span> <span style="color: red">进群发广告者死全家...</span>
                <p style="margin-top: 10px; margin-bottom: 0; text-align: center;">
                  <!-- <img src="/images/dz.png" style="width: 150px;"></img> -->
                  <img src="https://addons.kuboard.cn/downloads/qr_code.jpg" style="width: 150px; padding: 8px;"></img>
                </p>
              </div>
            </div>
          </b-card>
        </div>
        <div class="col-md-4 col-sm-12">
          <b-card style="height: 100%; color: #2c3e50; line-height: 1.7; border-color: #f2be45; background-color: rgba(242, 190, 69, 0.1)" shadow="none" :body-style="{padding: '0rem 1.5rem'}"
          data-aos="fade-up" data-aos-duration="1200">
            <h4>赞赏</h4>
            <div>
              <div style="margin-top: 10px;">
                <span>微信扫码</span>
                <p style="margin-top: 10px; margin-bottom: 0; text-align: center;">
                  <img src="/images/zanshang.png" style="width: 150px; padding: 6px; background-color: white;"></img>
                </p>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
