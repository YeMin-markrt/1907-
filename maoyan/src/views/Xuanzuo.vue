<template>
  <div>
    选座
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

<style>

</style>