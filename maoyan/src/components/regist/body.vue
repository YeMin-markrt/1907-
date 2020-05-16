<template>
  <div class="regist_body">
    <div class="regist_body_top">
      <span>手机号码注册</span>
    </div>
    <div  class="regist_content">
       <label for="username">
         <input type="text" v-model="username" name="username"  @input="namechang" placeholder="请输入用户名"><i class="iconfont icon-chahao" v-show="flag1" @click="xiaoshi1"></i>
         </label>
       <label for="phone">
         <input type="text" v-model="phone" name="phone" placeholder="请输入手机号" @input="phonechang"><i class="iconfont icon-chahao" v-show="flag2" @click="xiaoshi2"></i>
         </label>
        <label for="random">
          <input type="text" v-model="random" name="random" class="ranDominput" placeholder="请输入验证码"  @input="randomchang"  ><span class="ranDom" @click="randombirth">{{randomya}}</span>
          </label>
       <label for="userpwd">
         <input type="password" v-model="userpwd" name="userpwd"  placeholder="请输入密码"  @input="pwdchang"  ><i class="iconfont icon-chahao" v-show="flag3" @click="xiaoshi3"></i></label>
       <button type="button"  class="btn" @click="registya" :disabled="flagya">注册</button>
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
      username:"",
      phone:"",
      random:"",
      randomya:"点击获取",
      userpwd:"",
      suggestion:'',
      flag1:false,
      flag2:false,
      flag3:false,
      flagya:true,
      show: false,
    }
  },
  methods:{
     showPopup() {
      this.show = true;
    },
    randomchang(){
      if(this.random){
        this.yanseya();
      }else{
        this.yanseya();
      }
    },
    phonechang(){
      if(this. phone){
        this.flag2=true;
        this.yanseya();
      }else{
       this. flag2=false;
       this.yanseya();
      }
    },
    namechang(){
       if(this.username){
        this.flag1=true;
        this.yanseya();
      }else{
       this. flag1=false;
       this.yanseya();
      }
    },
    pwdchang(){
       if(this.userpwd){
        this.flag3=true;
        this.yanseya();
      }else{
       this. flag3=false;
       this.yanseya();
      }
    },
    xiaoshi1(){
      this.username="";
       this.yanseya();
      this.flag1=!this.flag1;
    },
     xiaoshi2(){
       this.phone="";
        this.yanseya();
      this.flag2=!this.flag2;
    },
     xiaoshi3(){
       this.userpwd="";
        this.yanseya();
      this.flag3=!this.flag3;
    },

    randombirth(){
      var str = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
      var res = '';
      for (var i = 0; i < 4; i++) {
        var index = Math.round(Math.random() * (str.length - 1));
        var char = str.charAt(index);
        res += char;
      }
      this.randomya=res;
    },
    yanseya(){
      var username=this.username;
      var phone=this.phone;
      var random=this.random;
      var randomya=this.randomya;
      var userpwd=this.userpwd;
      if(username&&phone&&random&&userpwd){
        document.getElementsByClassName("btn")[0].style.backgroundColor="#e54847";
        this.flagya=false
      }else{
         document.getElementsByClassName("btn")[0].style.backgroundColor="rgba(229, 72, 71,.6)";
         this.flagya=true
      }
    },

     registya(){
      //this.yanseya();
      var that=this;
      var username=this.username;
      var phone=this.phone;
      var random=this.random;
      var randomya=this.randomya;
      var userpwd=this.userpwd;
      var userReg = /^[a-zA-Z_$\u4e00-\u9fa5][0-9a-zA-Z_$\u4e00-\u9fa5]{5,11}$/;
      var phoneReg= /^1[3456789]\d{9}$/;
      var randomReg = new RegExp(randomya, "ig");
      var pwdReg = /^[\w$]{6,20}$/;
      if(userReg.test(username)){
        if(phoneReg.test(phone)){
          if(randomReg.test(random)){
            if(pwdReg.test(userpwd)){
      that.$axios({
            method: 'get',
            url: `http://yemin.gz01.bdysite.com/yihaodianya/php/regist.php?user=${username}&tel=${phone}&pwd=${userpwd}`,
              }).then(function(result){
              var res=result.data;
              if(res.status){
                that.$router.push({path:`/login`})
              }else{
                that.show=true;
                that.suggestion=res.msg;
              }
              })
                  }else{
                    this.show=true;
                    this.suggestion="密码长度需要在6-12位之间";
                  }
                }else{
              this.show=true;
              this.suggestion="您输入的验证码有错误";
                }
              }else{
              this.show=true;
              this.suggestion="您输入的手机号码不合法";
              }
            }else{
              this.show=true;
              this.suggestion="用户名不能以数字开头且长度需要在6-12位之间";
            }
          },
        }
      }
</script>

<style lang="scss" scoped>

@import url("http://at.alicdn.com/t/font_1597933_zmj70jxgg3i.css");
.regist_body{
    width:750px;
    height:1000px;
    background: #fff;
    box-sizing: border-box;
    padding: 0 40px;
    margin: 0 auto !important;
    .regist_body_top{
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
    .regist_content{
      width: 100%;
      height:800px;
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
         .ranDominput{
          display: inline-block;
          width: 80%;
          line-height: 60px;
         }
         .ranDom{
           display: inline-block;
           width: 20%;
           height:60px;
           line-height: 60px;
           background: #aaa;
           color: #fff;
           font-size: 26px;
           text-align: center;
           border-radius: 20px;
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
    }
}
.icon-chahao{
  color: #bbb
}

.baocuo{
  width:400px;
  height: 200px;
  box-sizing:border-box;
  padding: 60px 20px;
  color:#333;
  text-align: center;
  line-height: 40px;
  font-size: 30px;
}
</style>