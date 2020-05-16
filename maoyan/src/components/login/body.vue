<template>
  <div class="login_body">
    <div class="login_body_top">
      <span>账号密码登录</span>
    </div>
    <div  class="login_content">
       <label for="usercouont"><input type="text" v-model="usercouont" name="usercouont" placeholder="手机号/邮箱" @input="namechang"><i class="iconfont icon-chahao" v-show="flag1" @click="xiaoshi1"></i></label>
       <label for="userpwd"><input type="password" v-model="userpwd" name="userpwd" placeholder="登录密码" @input="pwdchang"><i class="iconfont icon-chahao" v-show="flag2" @click="xiaoshi2"></i></label>
       <button type="button" @click="loginya" class="btn" :disabled="flagya">登录</button>
       <div class="account-jump-bar">
            <a @click="redistya">注册新用户</a>
            <span class="fenge">|</span>
            <a >找回密码</a>
        </div>
    </div>

    <van-cell is-link @click="showPopup"></van-cell>
    <van-popup v-model="show" class="baocuo">{{suggestion}}</van-popup>


  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);

export default {
  data(){
    return{
      usercouont:"",
      userpwd:"",
      flag1:false,
      flag2:false,
      suggestion:'',
      flagya:true,
      show: false,
    }
  },
  methods:{
     showPopup() {
      this.show = true;
    },
    redistya(){
      this.$router.push({path:`/regist`});
    },
     namechang(){
       if(this.usercouont){
        this.flag1=true;
        this.yanseya();
      }else{
       this. flag1=false;
       this.yanseya();
      }
    },
    pwdchang(){
       if(this.userpwd){
        this.flag2=true;
        this.yanseya();
      }else{
       this. flag2=false;
       this.yanseya();
      }
    },
     xiaoshi1(){
      this.usercouont="";
      this.yanseya();
      this.flag1=!this.flag1;
    },
     xiaoshi2(){
      this.userpwd="";
       this.yanseya();
      this.flag2=!this.flag2;
    },
     yanseya(){
      var usercouont=this.usercouont;
      var userpwd=this.userpwd;
      if(usercouont&&userpwd){
        document.getElementsByClassName("btn")[0].style.backgroundColor="#e54847";
        this.flagya=false
      }else{
        document.getElementsByClassName("btn")[0].style.backgroundColor="rgba(229, 72, 71,.6)";
         this.flagya=true
      }
    },
    loginya(){
      var that=this;
      var usercouont=this.usercouont;
      var userpwd=this.userpwd;
      //连接数据库
  that.$axios({
            method: 'get',
            url: `http://yemin.gz01.bdysite.com/yihaodianya/php/login.php?count=${usercouont}&pwd=${userpwd}`,
        }).then(function(result){
         var res=result.data;   
         if(res.status){
             var  username = {
              username:usercouont,//数据
              usergoods:[],
              date :new Date()//数据存放的时间
              }
        window.localStorage.setItem("user",JSON.stringify(username));   
        that.$router.push({path:`/mine`})
         }else{
          that.show=true;
          that.suggestion=res.msg;
         }
        })
    },
  }
}

</script>

<style lang="scss" scoped>

@import url("http://at.alicdn.com/t/font_1597933_zmj70jxgg3i.css");
.login_body{
    width:750px;
    height:800px;
    background: #fff;
    box-sizing: border-box;
    padding: 0 40px;
    margin: 0 auto !important;
    .login_body_top{
      width: 100%;
      height: 150px;
      line-height:150px;
      text-align: center;
      span{
        color: #e54847;
        border-bottom: 1px solid #e54847;
        font-size: 30px;
      }
    } 
    .login_content{
      width: 100%;
      height: 600px;
      label{
        box-sizing: border-box;
        padding: 30px 20px;
        font-size:30px;
        display: block;
         width: 100%;
         height:120px;
         line-height: 80px;
         border-bottom: 2px solid #eee;
          text-align: left;
         input{
           width: 90%;
           box-sizing: border-box;
           display: inline-block;
           font-size:30px;
           color: #959595;
           line-height:80px;
         }
      }
      .btn{
          box-sizing: border-box;
          width: 100%;
          height:100px;
          line-height:100px;
          background: #000;
          background:    #e547473b;       
          color: #fff;
          font-size: 32px;
          text-align: center;
          border-width: 0px;
          outline: none;
          border-radius: 30px;
          margin-top: 70px;
      }
      .account-jump-bar{
        width: 100%;
        text-align: center;
        height: 150px;
        line-height:150px;
        color: #666;
        font-size:28px;
        .fenge{
          margin: 30px;
        }
      }
    }
}
.icon-chahao{
  color: #bbb
}
.baocuo{
  width:400px;
  height: 200px;
  color:#333;
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}
</style>