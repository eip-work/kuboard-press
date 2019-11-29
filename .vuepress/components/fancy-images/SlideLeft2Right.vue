<template>
  <div class="ih-item square effect11 left_to_right">
    <span>
      <div class="img"><img :src="src" :alt="alt"></div>
      <div class="info">
        <h3>{{title}}</h3>
        <p>{{description}}</p>
      </div>
    </span>
  </div>
</template>

<script>
// http://demo.lanrenzhijia.com/2015/css1223/

export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  }
}
</script>

<style scoped>
.ih-item.square {
    position: relative;
    /* width: 316px;
    height: 216px;
    border: 8px solid #fff;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); */
}

.ih-item.square .info {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.ih-item.square.effect11 {
    overflow: hidden;
}

.ih-item.square.effect11.colored .info {
    background: #1a4a72;
}

.ih-item.square.effect11.colored .info h3 {
    background: rgba(12, 34, 52, 0.6);
}

.ih-item.square.effect11 .img {
    opacity: 1;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
}

.ih-item.square.effect11 .info {
    background: #333333;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 0.35s ease 0.2s;
    -moz-transition: all 0.35s ease 0.2s;
    transition: all 0.35s ease 0.2s;
}

.ih-item.square.effect11 .info h3 {
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    font-size: 21px;
    padding: 10px;
    background: #111111;
    margin: 2rem 0 0 0;
}

.ih-item.square.effect11 .info p {
    font-style: italic;
    font-size: 14px;
    position: relative;
    margin-top: 0px;
    color: #bbb;
    padding: 10px 20px 20px;
    text-align: center;
}

.ih-item.square.effect11 span:hover .img {
    opacity: 0;
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -ms-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform: scale(0.5);
}

.ih-item.square.effect11 span:hover .info {
    visibility: visible;
    opacity: 1;
}

.ih-item.square.effect11.left_to_right .info {
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
}

.ih-item.square.effect11.left_to_right span:hover .info {
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transform: translateX(0);
}

.ih-item.square.effect11.right_to_left .info {
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -o-transform: translateX(100%);
    transform: translateX(100%);
}

.ih-item.square.effect11.right_to_left span:hover .info {
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transform: translateX(0);
}

.ih-item.square.effect11.top_to_bottom .info {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
}

.ih-item.square.effect11.top_to_bottom span:hover .info {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
}

.ih-item.square.effect11.bottom_to_top .info {
    -webkit-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -ms-transform: translateY(100%);
    -o-transform: translateY(100%);
    transform: translateY(100%);
}

.ih-item.square.effect11.bottom_to_top span:hover .info {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
}

</style>
