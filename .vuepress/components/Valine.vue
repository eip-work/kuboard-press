<template>
  <div class="theme-default-content content__default">
    <!-- <div style="padding: 10px;">
      <span :id="$page.path" class="leancloud_visitors" :data-flag-title="$page.title">
          <em class="post-meta-item-text">阅读量 </em>
          <i class="leancloud-visitors-count">1000000</i>
      </span>
    </div> -->
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
    // require window 
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
      
    }
     
    new Valine({
      el: '#vcomments' ,
      appId: 'eeNL5WuKTfzNbO0wVvYNn1hB-gzGzoHsz',// your appId
      appKey: 'jVhBid22mLeLr3ilPIcfWBBw', // your appKey
      notify:false, 
      verify:false, 
      avatar:'identicon', 
      visitor: false,
      placeholder: '说说我对这篇文档的看法' 
    });
  },
}
</script>
