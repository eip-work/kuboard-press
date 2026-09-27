<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const isEn = computed(() => lang.value === 'en')

// 与 kuboard v3 文档站保持一致：
// - 微信群二维码：addons.kuboard.cn 上的群二维码图片
// - 赞赏二维码：本地静态资源 /images/zanshang.png
const WECHAT_QR = 'https://addons.kuboard.cn/downloads/qr_code.jpg'
const DONATE_QR = '/images/zanshang.png'

const texts = computed(() =>
  isEn.value
    ? {
        banner: 'Free Q&A',
        wechatTitle: 'WeChat Group',
        wechatText: 'Scan with WeChat to join the community and ask questions.',
        wechatTip: 'No ads please.',
        donateTitle: 'Donate',
        donateText: 'Scan with WeChat to support us if Kuboard helps you.',
      }
    : {
        banner: '免费答疑',
        wechatTitle: '微信群',
        wechatText: '微信扫码进群，交流使用问题。',
        wechatTip: '进群请勿发广告。',
        donateTitle: '赞赏',
        donateText: '如果 Kuboard 对您有帮助，微信扫码支持一下。',
      },
)
</script>

<template>
  <div class="kb-join-community">
    <div class="kb-join-community__banner">{{ texts.banner }}</div>
    <div class="kb-join-community__cards">
      <div class="kb-join-card">
        <h4 class="kb-join-card__title">{{ texts.wechatTitle }}</h4>
        <p class="kb-join-card__desc">
          {{ texts.wechatText }}
          <span class="kb-join-card__tip">{{ texts.wechatTip }}</span>
        </p>
        <p class="kb-join-card__qr">
          <img
            :src="WECHAT_QR"
            alt="Kuboard WeChat group QR code"
            loading="lazy"
            class="kb-join-card__img"
          />
        </p>
      </div>
      <div class="kb-join-card kb-join-card--donate">
        <h4 class="kb-join-card__title">{{ texts.donateTitle }}</h4>
        <p class="kb-join-card__desc">{{ texts.donateText }}</p>
        <p class="kb-join-card__qr">
          <img
            :src="DONATE_QR"
            alt="Kuboard donate QR code"
            loading="lazy"
            class="kb-join-card__img"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-join-community {
  margin-top: 32px;
  padding: 14px 0 8px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.kb-join-community__banner {
  display: inline-block;
  margin-bottom: 18px;
  padding: 4px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
}

.kb-join-community__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 640px) {
  .kb-join-community__cards {
    grid-template-columns: 1fr;
  }
}

.kb-join-card {
  padding: 16px 20px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.kb-join-card--donate {
  border-color: rgba(242, 190, 69, 0.55);
  background: rgba(242, 190, 69, 0.1);
}

.kb-join-card__title {
  margin: 0 0 6px;
  font-size: 16px;
}

.kb-join-card__desc {
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.kb-join-card__tip {
  display: inline-block;
  color: #e5484d;
}

.kb-join-card__qr {
  margin: 0;
  text-align: center;
}

.kb-join-card__img {
  display: block;
  margin: 0 auto;
  width: 150px;
  max-width: 100%;
  padding: 6px;
  background: #fff;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>