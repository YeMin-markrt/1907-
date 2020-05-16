<template>
  <div class="nofondya">
    <div class="tu">
    <img src="http://47.94.141.77:3000/lvyou/img/timg.d2657479.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
     this.$store.commit("changeFlag",false);
  },
   beforeRouteLeave (to, from, next) {
      next();
        this.$store.commit("changeFlag",true);
      }
}
</script>

<style lang="scss" scoped>
.nofondya{
    width: 750px;
    height:8.8rem;
    margin: 0 auto !important;
    box-sizing: border-box;
  .tu{
     width: 750px;
     height:6.8rem;
     margin-top: 4rem;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>