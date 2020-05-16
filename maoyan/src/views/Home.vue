<template>
  <div class="home">
    <home-header></home-header>
     <div class="home-body">
       <span class="home-span1">武汉<i class="iconfont icon-down-fill"></i></span>
       <div class="home-playing"><router-link to="/home/nowplaying">正在热映</router-link></div>
       <div class="home-playing"><router-link to="/home/complaying">即将上映</router-link></div> 
       <span class="iconfont icon-sousuo home-span2"></span>
     </div>
       <router-view/>
  </div>
</template>

<script>
import header from "@/components/home/head.vue"
export default {
  name: 'home',
  data(){
    return{
     
    }
  },
  components: {
    "home-header":header
  },

}
</script>

<style lang="scss" scoped>
  .home-body{
    position: fixed;
    left:50%;
    top:100px;
    transform: translateX(-375px);
    width: 750px;
    box-sizing: border-box;
    height: 88px;
    background: #fff;
    z-index:99;
    border-bottom:2px solid #aaa;
    .home-span1{
      display:inline-block;
      width: 160px;
      line-height: 88px;
      text-align: center;
      font-size: 30px;
      color: rgb(102, 102, 102);
      float: left;
      .icon-down-fill{
         font-size: 24px;
        margin-top:-40px;
        margin-left: 10px;
      }
    }
  .home-span2{
    width: 160px;
    float: right;
    line-height: 88px;
    text-align: center;
    display:inline-block;
    font-size: 40px;
    color: #EF4238;
  }
  .home-playing{
    display:inline-block;
    width: 215px;
    line-height: 88px;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    box-sizing: border-box;
    a{
      color: #666;
      display:inline-block;
      line-height: 88px;
    }
  }
    a.router-link-exact-active {
       color: #f03d37;
       border-bottom: 4px solid #f03d37;
}
  }

 
</style>