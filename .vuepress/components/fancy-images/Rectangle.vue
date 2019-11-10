<template>
  <div class="box">
      <img :src="src" :alt="alt">
      <div class="box-content">
          <h3 class="title">{{title}}</h3>
          <span class="post">{{description}}</span>
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
    font-family: 'Fira Sans', sans-serif;
    text-align: center;
    overflow: hidden;
    position: relative;
}
.box:before,
.box:after{
    content: '';
    background-color: rgba(255,255,255,0.8);
    height: 25%;
    width: 100%;
    opacity: 0;
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    top: -100%;
    transition: all 0.3s;
}
.box:after{ top: 100%; }
.box:hover:before{
    transform: translateX(-50%) translateY(0);
    top: 0;
}
.box:hover:after{
    transform: translateX(-50%) translateY(0);
    top: auto;
    bottom: 0;
}
.box:hover:before,
.box:hover:after{
    height: 50%;
    opacity: 1;
    animation: animate 0.5s linear;
}
.box img{
    width: 100%;
    height: auto;
}
.box .box-content{
    width: 100%;
    opacity: 0;
    filter: blur(10px);
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 60%;
    left: 50%;
    z-index: 1;
    transition: all 0.4s ease 0.1s;
}
.box:hover .box-content{
    opacity: 1;
    filter: blur(0);
    top: 50%;
}
.box .title{
    color: #4834d4;
    font-size: 25px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
}
.box .post{
    color: #444;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
}
.box .icon{
    padding: 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    bottom: 10px;
    z-index: 1;
    transition: all 0.3s ease 0.3s;
}
.box:hover .icon{ opacity: 1; }
.box .icon li{ display: inline-block; }
.box .icon li a{
    color: #fff;
    background-color: #4834d4;
    line-height: 25px;
    height: 30px;
    width: 30px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 3px -3px 5px #555;
    display: block;
    transition: all 0.3s;
}
.box .icon li a:hover{
    color: #4834d4;
    background-color: #fff;
    border-color: #4834d4;
}
@keyframes animate{
    80%{ width: 90%; }
    85%{ width: 95%; }
    93%{ width: 85%; }
    100%{ width: 100%; }
}
@media only screen and (max-width:990px){
    .box{ margin-bottom: 30px; }
}
@media only screen and (max-width:479px){
    .box .title{ font-size: 20px; }
}
</style>
