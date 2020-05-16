<template>
  <div class="cinema">
    <div class="cinema-header1">影院</div>
    <div class="cinema-header2">
       <span class="home-span1">武汉<i class="iconfont icon-down-fill"></i></span>
       <input type="text" name="" id="" class="input-find" v-on:input="shuru" v-model="sousuo" >
       <div class="content"  v-show="flag"><span class="iconfont icon-sousuo"></span>搜影院</div>
    </div>
    <cinema-body1 class="cinema-body1"></cinema-body1>
    <!-- <cinema-body2 class="cinema-body2"></cinema-body2> -->

    <div class="detailnowplaying">
    <div class="detailnowplaying-content" v-for="item in listya" :key="item.id" @click="goumai(item.id)">
      <div class="detailnowplaying-content-left">
        <p class="detailnowplaying-content-p1">
        {{item.nm}}<span class="detailnowplaying-content-p1-span1">{{item.sellPrice}}</span><span class="detailnowplaying-content-p1-span2">元起</span></p>
        <p class="detailnowplaying-content-p2">
        {{item.addr}}</p>
        <p class="detailnowplaying-content-p3">
        <span>退</span><span>改签</span></p>
        <p v-if="item.promotion.cardPromotionTag" class="detailnowplaying-content-p5">
          <span class="detailnowplaying-content-p5-span1">卡</span>
          <span>{{item.promotion.cardPromotionTag}}</span>
        </p>
         <p class="detailnowplaying-content-p4">
        近期场次<span>{{item.showTimes}}</span></p>
      </div>
      <div class="detailnowplaying-content-right">
        {{item.distance}}
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import cinemabody1 from "@/components/detail/commbody1"
// import cinemabody2 from "@/components/detail/nowplayingfooter.vue"
export default {
  data(){
    return{
      flag:true,
      list:[],
      listya:[],
      sousuo:'',
    }
  },
 components: {
    "cinema-body1":cinemabody1,
    // "cinema-body2":cinemabody2,
  },
  methods:{
     goumai(index){
       this.$router.push({name:`shop`,params:{ id:index }})
    },
    shuru(){
      var that=this;
      this.flag=false;
      var sou=this.sousuo;
      var list=this.list.filter(item=>{
          if(item.nm.indexOf(sou)!=-1||item.addr.indexOf(sou)!=-1){
            return item
          }
        })
         that.listya=list;
        // setTimeout(function(){
        //   that.listya=list;
        // },500)
    }
  },
  mounted:function(){
     var that=this ;
  if(window.localStorage.getItem("local")){
     var  data =JSON.parse( window.localStorage.getItem("local"));
     var  nowDate =  new Date(); //请求的时间
     var  startDate = new Date(data.date);//存放的时间
     var allTimes = nowDate - startDate;
      if(allTimes>=1000*60*60*24){
         window.localStorage.removeItem("local");
        }
        that.list = data.list;
        that.listya = data.list;
  }else{
    this.$axios({
    method: 'get',
    url: 'https://api.myjson.com/bins/13010y',
  }).then(function(result){
    var list3 = result.data.cinemas;
     that.listya =result.data.cinemas;
     that.list=result.data.cinemas;
   var data = {
      list:list3,//数据
      date :new Date()//数据存放的时间
      }
   window.localStorage.setItem("local",JSON.stringify(data));
  })
  }

  console.log(that.list)
  }
}
</script>

<style lang="scss" scoped>
.cinema{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  .cinema-header1{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    background: #E54847;
    font-size: 36px;
    position: fixed;
    left: 0;
    top:0;
    z-index: 999;
  }
  .cinema-header2{
    width: 100%;
    height: 88px;
    line-height:  88px;
    text-align: center;
    color: #fff;
    background: #e6e6e6;
    font-size: 36px;
    position: fixed;
    left: 0;
    top:100px;
    z-index: 999;
    .home-span1{
      width: 20%;
      height: 88px;
      float: left;
      text-align: center;
      color:#333;
       .icon-down-fill{
       font-size: 24px;
    }
    }
    .input-find{
      width:70%;
      height: 60px;
      margin-top: 15px;
      box-sizing: border-box;
      margin-left: 20px;
      background: #fff;
      border-radius: 20px;
      position: relative;
      color: #bbb;
      font-size: 30px;
    }
    .content{
      display: inline-block;
      position: absolute;
      text-indent: 40px;
      left:50%;
      top:0;
      color: #bbb;
      font-size: 26px;
      .icon-sousuo{
         font-size: 26px;
      }

    }
   
  }
  .cinema-body1{
    position: fixed;
    left: 0;
    top:188px;
    z-index: 999;
  }
}

.detailnowplaying{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  position: absolute;;
  left: 0;
  top:276px;
  margin-bottom: 140px;

  .detailnowplaying-content{
    width: 750px;
    box-sizing: border-box;
    padding: 26px 30px 26px 30px;
    background-color: #fff;
    position: relative;
    height: 284px;
    border-bottom: 2px solid #eee;
    .detailnowplaying-content-left{
      width: 580px;
      height: 284px;
      display: inline-block;
      float: left;
      p{
        text-align: left;
      }
      .detailnowplaying-content-p1{
        width: 100%;
        height: 46px;
        line-height: 46px;
        font-size: 32px;
        color: #000;
        overflow: hidden;
        .detailnowplaying-content-p1-span1{
          font-size: 36px;
          color: #f03d37;
          padding-left: 15px;
        }
        .detailnowplaying-content-p1-span2{
          padding-left: 10px;
          font-size: 22px;
          color: #f03d37;
        }
      }
      .detailnowplaying-content-p2{
        width: 100%;
        margin-top: 12px;
        font-size: 26px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
    .detailnowplaying-content-right{
      width: 80px;
      height: 284px;
      display: inline-block;
      text-align: center;
      line-height: 284px;
    }
    .detailnowplaying-content-p3{
      height: 34px;
      line-height: 34px;
      margin-top: 8px;
      margin-bottom: 8px;
      span{
        display: inline-block;
        padding: 2px 8px;
        border-radius:6px;
        color: #589daf;
        border: 1px solid #589daf;
        font-size: 24px;
        margin-right: 10px;
      }
    }
    .detailnowplaying-content-p5{
      height: 40px;
      color: #999;
      margin-bottom: 4px;
      line-height: 40px;
      .detailnowplaying-content-p5-span1{
        background: #63C4F8;
        color: #fff;
        padding: 2px 4px;
        font-size: 20px;
        margin-right: 10px;
      }
    }
  .detailnowplaying-content-p4{
    height: 40px;
    color: #999;
    line-height: 40px;
    margin-top: 10px;
  }
  }
}
</style>