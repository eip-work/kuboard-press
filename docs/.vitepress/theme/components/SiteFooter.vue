<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const isEn = computed(() => lang.value === 'en')

const ICP_URL = 'https://beian.miit.gov.cn'
const ICP_NO = '京ICP备19008693号-2'

// 友情链接（与 v3 站点一致）
const links = [
  {
    name: 'SpringBlade',
    url: 'https://bladex.vip/',
    icon: '/images/ads/spring-blade.png',
  },
  {
    name: 'Linux Foundation',
    url: 'https://training.linuxfoundation.cn',
    icon: 'https://training.linuxfoundation.cn/assets/img/logo.svg',
  },
]

const texts = computed(() =>
  isEn.value
    ? {
        copyright: 'Copyright © 2019-present Kuboard',
        ico: '京ICP备19008693号-2',
        friends: 'Friends:',
      }
    : {
        copyright: 'Copyright © 2019-present Kuboard',
        ico: ICP_NO,
        friends: '友情链接：',
      },
)
</script>

<template>
  <div class="kb-footer">
    <div class="kb-footer__copyright">
      {{ texts.copyright }}
      <a :href="ICP_URL" target="_blank" rel="noopener">{{ texts.ico }}</a>
    </div>
    <div class="kb-footer__friends">
      <span class="kb-footer__friends-label">{{ texts.friends }}</span>
      <a
        v-for="item in links"
        :key="item.name"
        class="kb-footer__friend"
        :href="item.url"
        target="_blank"
        rel="noopener"
      >
        <img v-if="item.icon" class="kb-footer__friend-icon" :src="item.icon" :alt="item.name" loading="lazy" />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.kb-footer {
  margin-top: 32px;
  padding: 14px 0 28px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.8;
}

.kb-footer__copyright a {
  margin-left: 4px;
  color: var(--vp-c-text-2);
}

.kb-footer__copyright a:hover {
  color: var(--vp-c-brand-1);
}

.kb-footer__friends {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.kb-footer__friend {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.25s;
}

.kb-footer__friend:hover {
  border-color: var(--vp-c-brand-1);
}

.kb-footer__friend-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  padding: 1px;
  background: #fff;
}
</style>