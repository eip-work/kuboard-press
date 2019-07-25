<template>
  <ParentLayout>
    <!-- <div slot="sidebar-top">
      <p class="header-description">
        A cool Kubernetes Dashboard
      </p>
    </div> -->
    <div slot="page-bottom" class="header-description">Copyright © 2019-present HuanQing Shao</div>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
export default {
  components: {
    ParentLayout
  }
}
</script>

<style scoped>
.header-description {
  padding: 0px;
  text-align: center;
}
</style>
