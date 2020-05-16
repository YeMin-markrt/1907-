<template>
   <div class="login_header">
    <div class="login_hedercontent">
      <span class="iconfont icon-xiangzuojiantou login_left" @click="huisou"></span>
      <span class="login_right">登录</span>
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
.login_header{
  margin: 0 auto !important;
  width:750px;
  height:100px;
  line-height:100px;
  border-bottom: 2px solid #e6e6e6;
  color: #fff;
  background: #e54847;
  box-sizing: border-box;
  .login_hedercontent{
    width:100%;
    display: flex;
    height:100px;
    position: relative;
    .login_left{
      display: inline-block;
      width: 15%; 
      font-size: 54px;
    }
    .login_right{
      font-size:44px;
      width:85%;
      position: absolute;
      left:8%;
    }
  }
}
</style>