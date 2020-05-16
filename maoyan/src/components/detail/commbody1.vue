<template>
  <div class="commbody1">
     <div class="threechoose">
      <p>全程<span class="iconfont icon-down-fill"></span></p>
      <p class="fenjie"> <van-cell is-link @click="showPopup">品牌<span class="iconfont icon-down-fill"></span></van-cell></p>
      <p>特色<span class="iconfont icon-down-fill"></span></p>
    </div>
     <van-popup v-model="show">
    <div class="xianying">
      <div class="showDay">
        <ul class="showDay-box" >
          <li v-for="(item,index) in dataya" :key="index"   @click="classchange(index)" v-bind:class="{active:index==getindex}">{{item}}</li>
        </ul>
      </div>

      <div class="threechoose">
        <p>全程<span class="iconfont icon-down-fill"></span></p>
        <p class="fenjie actives" @click="xianyingya">品牌<span class="iconfont icon-up-fill"></span></p>
        <p>特色<span class="iconfont icon-down-fill"></span></p>
      </div>

      <div class="pingpai">
        <li v-for="(item,index) in this.$store.state.local.brandlist" :key="item.id"  @click="classchanges(index)" >
          <span class="pingpai-span1" v-bind:class="{actives:index==getindexs}">{{item.name}}</span ><span class="pingpai-span2" v-bind:class="{actives:index==getindexs}">{{item.count}}</span>
        </li>
      </div>
    </div>
  </van-popup>

  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
export default {
 data(){
   return{
     show:false,
     getindexs:0,
   }
  }, 
 methods:{
   showPopup() {
      this.show = true;
    },
    xianyingya(){
      this.show = false;
    },
    classchanges(index){
      this.getindexs = index;
    },
},
mounted(){
    if(!this.$store.state.local.nowlocal.length){
        this.$store.dispatch("getMany");
      }  

},
}
</script>
<style lang="scss" scoped>
.actives{
  color: #f03d37 !important;
}
.icon-up-fill{
  font-size: 20px;
  padding-left: 10px;
}
.commbody1{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  background: #fff;
  .threechoose{
    width: 100%;
    display: flex;
    height: 80px;
    border-bottom:1px solid #eee  ;
    p{
      flex:1;
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-top:15px ;
      font-size: 28px;
      color:#b0b0b0;
      .icon-down-fill{
       font-size: 20px;
       padding-left: 10px;
      }
    }
    .fenjie{
      border-right:2px solid #eee;
      border-left:2px solid #eee; 
    }
  }
  
}
.pingpai::-webkit-scrollbar {display:none}
.xianying{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #fff;
  z-index: 100;
  .pingpai{
    width: 100%;
    height: 720px;
    overflow-y: scroll;
    overflow-x: hidden;
    li{
      line-height:88px;
      height: 88px;
      padding: 0 30px 0 52px;
      border-bottom: 2px solid #e5e5e5;
      display: flex;
      span{
        flex: 1;
      }
      .pingpai-span1{
        font-size: 30px;
        color: #333;
        text-align: left
      }
       .pingpai-span2{
        text-align:right;
        color: #8f9296;
        font-size: 24px;
      }
    }
  }
}
</style>