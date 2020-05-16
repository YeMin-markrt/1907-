<template>
  <div class="complaying">
    <complay-top></complay-top>
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="正在获取实时数据">
        <!-- <p>刷新次数: {{ count }}</p> -->
        <van-list
        v-model="Iloading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
    <div class="complayingbody" v-if="flag1" v-for="item in this.$store.state.commovies.complayings" :key="item.id" @click="detailcomplaying(item.id)">
      <div class="complayingbody_left">
        <img :src="item.img" alt="">
      </div>
      <div class="complayingbody_center">
        <p class="complayingbody_center_p1">
          <span class="complayingbody_center_p1_span1">{{item.nm}}</span>
          <span v-if="item.version">
            <span  class="complayingbody_center_p1_span2">2D</span>
            <span class="complayingbody_center_p1_span3">IMAX</span>
          </span>
        </p>
        <p class="complayingbody_center_p2">
          <span class="complayingbody_center_p2_span2">{{item.wish}}</span>
          <span class="complayingbody_center_p2_span1">人想看</span>
        </p>
        <p class="complayingbody_center_p3">
          主演:{{item.star}}
        </p>
        <p class="complayingbody_center_p3">
          {{item.rt}}上映
        </p>
      </div>
      <div class="complayingbody_right1" v-if="item.showst==1">
        <span>想看</span>
      </div>
      <div class="complayingbody_right2" v-else>
        <span>预售</span>
      </div>
    </div>
    <div class="complayingbody" else v-for="item in list2" :key="item.id" @click="detailcomplaying(item.id)">
      <div class="complayingbody_left">
        <img :src="item.img" alt="">
      </div>
      <div class="complayingbody_center">
        <p class="complayingbody_center_p1">
          <span class="complayingbody_center_p1_span1">{{item.nm}}</span>
          <span v-if="item.version">
            <span  class="complayingbody_center_p1_span2">2D</span>
            <span class="complayingbody_center_p1_span3">IMAX</span>
          </span>
        </p>
        <p class="complayingbody_center_p2">
          <span class="complayingbody_center_p2_span2">{{item.wish}}</span>
          <span class="complayingbody_center_p2_span1">人想看</span>
        </p>
        <p class="complayingbody_center_p3">
          主演:{{item.star}}
        </p>
        <p class="complayingbody_center_p3">
          {{item.rt}}上映
        </p>
      </div>
      <div class="complayingbody_right1" v-if="item.showst==1">
        <span>想看</span>
      </div>
      <div class="complayingbody_right2" v-else>
        <span>预售</span>
      </div>
    </div>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {PullRefresh,List} from 'vant';
import complayimg from '@/components/home/complayingtop.vue'
export default {
  data(){
    return{
      isLoading:false,
      Iloading:false,
      finished:false,
      flag:false,
      count:1,
      list1:[],
      list2:[],
      flag1:true
    }
  },
  components:{
        "van-pull-refresh":PullRefresh,
        "van-list":List,
        "complay-top":complayimg,
      },
  methods:{
    // goDetailcomplaying(index){
    //   this.$router.push({name:`detailcomplaying`,params:{ id:index }})
    // },
  
  detailcomplaying(index){
     this.$router.push({name:`detailcomingplaying`,params:{ id:index }})
     },
 
    onLoad(){//上拉记载
    var that=this
    setTimeout(() => {
          for (let i =0; i <that.list1.length; i++) {
            that.list2=that.list1.slice(0,5*that.count);
          }
          this.loading = false;
          if (that.list2.length>=that.list1.length) {
            this.finished = true;
          }
        }, 500);
         //window.console.log(this.count,this.list2)
      },
     onRefresh(){//下拉刷新   获取最新的数据
          this.count++;
          this.list2;
          this.isLoading = false;
          this.Iloading=false;
          this.finished = false;  
      },
    
  },
mounted(){
  if(!this.$store.state.commovies.complayings.length){
     this.$store.dispatch("getcomplayings");
  }
   if(!this.list2.length){
    this.flag1=true;
  }else{
    this.flag1=false;
  }
  this.list1=this.$store.state.commovies.complayings;
  this.list2=this.list1.slice(0,5)
  //console.log(this.list2);
 }
}

</script>

<style lang="scss" scoped>
.complaying{
  width: 750px;
  box-sizing: border-box;
  position: relative;
  left:0;
  top:90px;
  margin:0 auto !important;
  margin-top:100px !important;
  margin-bottom:110px !important;
  .complayingbody{
    width: 100%;
    height: 228px;
    box-sizing: border-box;
    padding-left: 30px;
    border-bottom: 2px solid #f0f0f0;
    .complayingbody_left{
      display: inline-block;
      width: 128px;
      height: 180px;
      float: left;
      margin-top: 24px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .complayingbody_center{
      display: inline-block;
      width: 426px;
      height: 180px;
      margin-top: 24px;
      float: left;
      padding-left: 10px;
      text-align: left;
      p{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .complayingbody_center_p1{
        width: 100%;
        height: 48px;
        line-height: 48px;
        margin-bottom:24px;
         .complayingbody_center_p1_span1{
        font-size: 34px;
        color: #666;
        font-weight: 700;
        padding-right:10px;
      }
      .complayingbody_center_p1_span2{
        display: inline-block;
        width: 36px;
        height: 30px;
        background:#509FC9;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius:5px;
        font-size: 18px;
      }
      .complayingbody_center_p1_span3{
        display: inline-block;
        width: 50px;
        height: 27px;
        background:#fff;
        color:#509FC9;
        border: 2px solid #509FC9;
        text-align: center;
        line-height: 30px;
        border-radius:5px;
        font-size: 18px;
      }
      }
      .complayingbody_center_p2{
        width: 100%;
        height: 30px;
        line-height: 30px;
        .complayingbody_center_p2_span1{
          font-size: 24px;
          color: #666;
          padding-right: 10px;
        }
       .complayingbody_center_p2_span2{
          color: #faaf00;
          font-size: 30px;
       }
      }
    .complayingbody_center_p3{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      color: #666;
      margin-top: 8px;
    }
    }
    .complayingbody_right1{
      display: inline-block;
      width: 94px;
      height: 180px;
      line-height: 180px;
      margin-top: 24px;
      float: left;
      span{
        display: inline-block;
        width: 100%;
        height: 56px;
        line-height: 56px;
        background: #faaf00;
        color: #fff;
        text-align: center;
        border-radius: 10px;
      }
    }
    .complayingbody_right2{
      display: inline-block;
      width: 94px;
      height: 180px;
      line-height: 180px;
      margin-top: 24px;
      float: left;
      span{
        display: inline-block;
        width: 100%;
        height: 56px;
        line-height: 56px;
        background: #3c9fe6;
        color: #fff;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
}
</style>