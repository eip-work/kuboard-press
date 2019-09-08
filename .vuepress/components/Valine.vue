<template>
  <div id="vcomments" class="theme-default-content content__default"></div>
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
      avatar:'mm', 
      placeholder: 'just go go' 
    });
  },
}
</script>
