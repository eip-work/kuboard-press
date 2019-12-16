<template>
  <div class="box">
      <img :src="src" :alt="alt">
      <div class="box-content">
          <div class="content">
              <h3 class="title">{{title}}</h3>
              <span class="post">{{description}}</span>
              <!-- <ul class="icon">
                  <li><a href="#"><i class="fa fa-search"></i></a></li>
                  <li><a href="#"><i class="fa fa-link"></i></a></li>
              </ul> -->
          </div>
      </div>
  </div>
</template>

<script>
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
.box{
    font-family: 'Merriweather Sans', sans-serif;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
    overflow: hidden;
    position: relative;
    z-index: 1;
}
.box:before,
.box:after,
.box .box-content:before,
.box .box-content:after{
    content: "";
    width: 100%;
    height: 50%;
    background: #E65100;
    opacity: 0.8;
    transform: translateX(-50%) translateY(0%);
    position: absolute;
    top: -50%;
    left: 50%;
    z-index: 1;
    -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    transition: all .3s;
}
.box:after{
    transform: translateX(-50%) translateY(0%);
    top: auto;
    bottom: -50%;
    z-index: 0;
    -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
.box .box-content:before{
    width: 50%;
    height: 100%;
    transform: translateX(0%) translateY(-50%);
    top: 50%;
    left: auto;
    right: -50%;
    -webkit-clip-path: polygon(100% 0, 0 50%, 100% 100%);
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
}
.box .box-content:after{
    width: 50%;
    height: 100%;
    transform: translateX(0%) translateY(-50%);
    top: 50%;
    right: auto;
    left: -50%;
    z-index: 0;
    -webkit-clip-path: polygon(0 100%, 100% 50%, 0 0);
    clip-path: polygon(0 100%, 100% 50%, 0 0);
}
.box:hover:before{ top:0; }
.box:hover:after{ bottom:0; }
.box:hover .box-content:before{ right:0; }
.box:hover .box-content:after{ left:0; }
.box img{
    width: 100%;
    height: auto;
    transform: scale(1);
    transition: all 0.5s;
}
.box:hover img{ transform: scale(1.5); }
.box .box-content{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.box .content{
    text-align: center;
    width: 100%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
}
.box .title{
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 0 5px;
    transform: rotateY(360deg) scale(0);
    transition: all 0.5s;
}
.box:hover .title{ transform: rotateY(0) scale(1); }
.box .post{
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 0 0 15px;
    display: block;
    transform: rotateY(360deg) scale(0);
    transition: all 0.5s ease 0.25s;
}
.box:hover .post{ transform: rotateY(0) scale(1); }
.box .icon{
    text-align: center;
    padding: 0;
    margin: 0;
    list-style: none;
    transform: rotateY(360deg) scale(0);
    transition: all 0.5s ease 0.45s;
}
.box:hover .icon{ transform: rotateY(0) scale(1); }
.box .icon li{
    display: inline-block;
    margin: 0 3px;
}
.box .icon li a{
    color: #E65100;
    background-color: #fff;
    font-size: 18px;
    line-height: 35px;
    height: 35px;
    width: 35px;
    border-radius: 10px;
    display: block;
    transition: all 0.3s;
}
.box .icon li a:hover{
    color: #fff;
    background-color: #E65100;
    box-shadow: 0 0 10px #000;
}
/* @media only screen and (max-width:990px){
    .box{ margin-bottom: 30px; }
} */
@media only screen and (max-width:479px){
    .box .title{ font-size: 22px; }
}
</style>
