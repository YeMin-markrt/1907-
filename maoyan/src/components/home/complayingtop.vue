<template>
  <div class="complaying-top">
    <p class="title">近期最受期待</p>
    <div class="complaying-top-gun">
    <div  class="complaying-top-over">  
    <div class="complaying-top-body" v-for="item in this.$store.state.commovies.comhotplaying" :key="item.id" @click="detailcomplaying(item.id)">
      <div class="complaying-top-body-img">
        <img :src="item.img" alt="">
         <p class="peoplewish">{{item.wish}}人想看</p>
      </div>
      <h5 class="name">{{item.nm}}</h5>
      <p class="date">{{item.comingTitle.split(" ")[0]}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
mounted(){
  if(!this.$store.state.commovies.comhotplaying.length){
     this.$store.dispatch("getcomhotplaying");
  }
},
methods:{
  detailcomplaying(index){
     this.$router.push({name:`detailcomingplaying`,params:{ id:index }})
  }
}
}
</script>

<style lang="scss" scoped>
.complaying-top-gun::-webkit-scrollbar {display:none}
.complaying-top{
  width: 750px;
  height: 428px;
  box-sizing: border-box;
  margin:0 auto !important;
  padding: 24px 0 44px 30px;
  background-color: #fff;
  .complaying-top-gun{
    width:100%;
    height: 428px;
    box-sizing: border-box;
    margin:0 auto !important;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .complaying-top-over{
    min-width: 1900px;
    height: 428px;
  }
  .title{
    width:100%;
    text-align: left;
    font-size: 28px;
    color: #333;
    margin-bottom: 24px;
  }
  .complaying-top-body{
    display: inline-block;
    width: 170px;
    height: 330px;
    overflow: hidden;
    margin-right: 20px;
    float: left;
    .complaying-top-body-img{
      width: 170px;
      height: 230px;
      margin-bottom: 12px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .peoplewish{
      position: absolute;
      left: 8px;
      bottom: 4px;
      color: #faaf00;
      font-size: 22x;
      font-weight: 600;
      text-align: center;
    }
    }
    .name{
      width: 100%;
      text-align: left;
      font-size: 26px;
      color: #222;
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .date{
      text-align: left;
      font-size: 24px;
      color: #999;
    }
    
  }
}
</style>