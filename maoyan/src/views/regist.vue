<template>
  <div class="regist">
     <regist-header></regist-header>
     <regist-body></regist-body>
  </div>
</template>

<script>
import header from "@/components/regist/header.vue"
import body from "@/components/regist/body.vue"
export default {
name: 'regist',
 components: {
  "regist-header":header,
  "regist-body":body,
},
 mounted:function(){
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