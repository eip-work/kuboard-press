<template>
  <ParentLayout>
    <CarbonAds slot="sidebar-top"/>
    <BuySellAds slot="page-bottom"/>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from '@theme/components/CarbonAds.vue'
import BuySellAds from '@theme/components/BuySellAds.vue'
export default {
  components: {
    ParentLayout,
    CarbonAds,
    BuySellAds
  }
}
</script>