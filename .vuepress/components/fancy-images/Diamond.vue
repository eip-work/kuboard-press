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
    background: linear-gradient(#8E2DE2,#4A00E0);
    font-family: 'Merriweather Sans', sans-serif;
    border-radius: 7px;
    position: relative;
    overflow: hidden;
}
.box:before{
    content: "";
    background: -webkit-repeating-linear-gradient(45deg,rgba(0, 0, 0, 0.1) 10px,
                transparent 10px,transparent 20px,rgba(0,0,0,0.1) 20px,rgba(0,0,0,0.1) 30px,
                transparent 30px,transparent 40px,rgba(0,0,0,0.1) 40px,rgba(0,0,0,0.1) 50px,
                transparent 50px,transparent 60px,rgba(0,0,0,0.1) 60px,rgba(0,0,0,0.1) 70px,
                transparent 70px,transparent 80px,rgba(0, 0,0, 0.1) 80px,
                rgba(0, 0,0, 0.1) 90px,transparent 90px);
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    transition: all 0.5s;
}
.box:hover:before{ opacity:1; }
.box img{
    width: 100%;
    height: auto;
    transition: all 0.5s ease;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    
}
.box:hover img{
    opacity: 0.5;
    -webkit-clip-path: polygon(50% 0, 99% 50%, 50% 99%, 0 50%);
    clip-path: polygon(50% 0, 99% 50%, 50% 99%, 0 50%);
}
.box .box-content{
    color: #fff;
    text-align: center;
    width: 100%;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) rotate(-55deg);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transition: all 0.5s;
}
.box:hover .box-content{
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
}
.box .title{
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 0 5px #000;
    margin: 0 0 3px 0;
}
.box .post{
    font-size: 16px;
    text-shadow: 0 0 5px #000;
    text-transform: capitalize;
    display: block;
}
.box .icon{
    padding: 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    transform: rotateX(180deg);
    position: absolute;
    right: 10px;
    top: 10px;
    transition: all 0.3s;
}
.box:hover .icon{
    opacity: 1;
    transform: rotate(0);
}
.box .icon li a{
    color: #4A00E0;
    background-color: #fff;
    font-size: 17px;
    text-align: center;
    line-height: 30px;
    width: 30px;
    height: 30px;
    margin: 0 0 7px;
    border-radius: 50%;
    display: block;
    transition: all .5s;
}
.box .icon li  a:hover{
    color: #8E2DE2;
    box-shadow: 0 0 15px #fff;
}
@media only screen and (max-width:990px){
    .box { margin: 0 0 30px; }
}
@media only screen and (max-width:479px){
    .box .title{ font-size: 20px; }
}             
</style>
