<template>
  <div class="detailnowplaying">
    <div class="detailnowplaying-content" v-for="item in this.$store.state.local.nowlocal" :key="item.id" @click="goumai(item.id)">
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
</template>

<script>
export default {
  methods:{
    goumai(index){
       this.$router.push({name:`shop`,params:{ id:index }})
    }
  },
mounted(){
if(!this.$store.state.local.nowlocal.length){
     this.$store.dispatch("getnowlocal");
  }
}
}
</script>

<style lang="scss" scoped>
.detailnowplaying{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
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