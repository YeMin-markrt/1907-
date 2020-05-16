<template>
  <div class="login">
     <login-header></login-header>
     <login-body></login-body>
  </div>
</template>

<script>
import header from "@/components/login/header.vue"
import body from "@/components/login/body.vue"
export default {
name: 'login',
 components: {
  "login-header":header,
  "login-body":body,
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