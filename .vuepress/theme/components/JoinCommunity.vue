<template>
  <div class="page-nav" style="max-width: 1000px; padding: 1rem; text-align: center;">
    <b-alert style="margin-bottom: 0;" show variant="primary">免费答疑</b-alert>
    <grid :rwd="{compact: 'stack'}">
      <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}" >
        <b-card style="height: 100%; margin-top: 1rem;" shadow="none" :body-style="{padding: '0rem 1.5rem'}">
          <h4>QQ群</h4>
          <div>
            <!-- 一键进群 -->
            <Qq/>
            <!-- 808894550 -->
          </div>
          <p style="margin-bottom: 0; margin-top: 10px;">
            <img style="margin: auto; padding: 7px; width: 135px;" src="/images/kuboard_qq.png" alt="Kubernetes教程：QQ群在线答疑"/>
          </p>
        </b-card>
      </grid-item>
      <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}">
          <b-card style="height: 100%; color: #2c3e50; line-height: 1.7; margin-top: 1rem;" shadow="none" :body-style="{padding: '0rem 1.5rem'}">
            <h4>微信群</h4>
            <div>
              <div style="margin-top: 10px;">
                <span>微信扫码</span>
                <p style="margin-top: 10px; margin-bottom: 0; text-align: center;">
                  <!-- <img src="/images/dz.png" style="width: 150px;"></img> -->
                  <img src="/images/dz2.jpeg" style="width: 150px;"></img>
                </p>
              </div>
            </div>
          </b-card>
      </grid-item>
      <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '1/1'}">
          <b-card style="height: 100%; color: #2c3e50; line-height: 1.7; margin-top: 1rem; border-color: #f2be45; background-color: rgba(242, 190, 69, 0.1)" shadow="none" :body-style="{padding: '0rem 1.5rem'}">
            <h4>VIP群</h4>
            <div>
              <div style="margin-top: 10px;">
                <span>微信扫码</span>
                <p style="margin-top: 10px; margin-bottom: 0; text-align: center;">
                  <!-- <img src="/images/dz.png" style="width: 150px;"></img> -->
                  <img src="/images/dz2.jpeg" style="width: 150px;"></img>
                </p>
              </div>
            </div>
          </b-card>
      </grid-item>
    </grid>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
