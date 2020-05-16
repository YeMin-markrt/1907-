<template>
   <div class="regist_header">
    <div class="regist_hedercontent">
      <span class="iconfont icon-xiangzuojiantou regist_left" @click="huisou"></span>
      <span class="regist_right">注册</span>
    </div>
  </div>
</template>

<script>
export default {
methods:{
  huisou(){
    this.$router.push({path:'/mine'});
  }
}
}
</script>

<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/font_1597933_ul4xi2eilf.css");

.regist_header{
  margin: 0 auto !important;
  width:750px;
  height:100px;
  line-height:100px;
  border-bottom: 2px solid #e6e6e6;
  color: #fff;
  background: #e54847;
  box-sizing: border-box;
  .regist_hedercontent{
   width:100%;
    display: flex;
    height:100px;
    position: relative;
    .regist_left{
      display: inline-block;
      width: 15%; 
      font-size: 54px;
    }
    .regist_right{
      font-size:44px;
      width:85%;
      position: absolute;
      left:8%;
    }
  }
}
</style>