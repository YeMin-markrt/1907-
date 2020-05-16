<template>
  <div class="myine">
      <div class="myine-header">我的</div>


      <div class="myine-body1">
        <div class="myine-body1-top"><img src="https://img.meituan.net/maoyanuser/9d89b1e45a5b7fd309b28b5f55269c3912416.png" alt=""></div>
        <div class="myine-body1-bottom" @click="login" v-if="flag">请登录</div>
        <div class="myine-body1-bottom" v-else>{{username}}</div>

      </div>


      <div class="myine-footer">
        <div class="mb-outline-tb">
          <p  class="mb-outline-tb-top">我的订单</p>
          <div class="mb-outline-tb-body">
            <div class="mb-outline-tb-body-content">
              <p class="mb-outline-tb-body-content-p1"> 
                <img src="http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/movie.png" alt="">
              </p>
              <p class="mb-outline-tb-body-content-p2">电影</p>
            </div>
             <div class="mb-outline-tb-body-content">
              <p class="mb-outline-tb-body-content-p1"> 
                <img src="http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/store.png" alt="">
              </p>
              <p class="mb-outline-tb-body-content-p2">商城</p>
            </div>
          </div>
        </div>


      <div class="myine-footer-last">

       <div class="myine_body3_content">
          <li class="myine_body3_content_li">
            <span class="myine_body3_content_left">优惠券</span>
              <a href="" class="myine_body3_content_a">
              <i class="iconfont icon-demo"></i>
            </a>
          </li>
        </div>

        <div class="myine_body3_content">
          <li class="myine_body3_content_li">
            <span class="myine_body3_content_left">折扣卡</span>
              <a href="" class="myine_body3_content_a">
              <i class="iconfont icon-demo"></i>
            </a>
          </li>
         </div>
    
        <div class="myine_body3_content">
        <li class="myine_body3_content_li" @click="tuichu">
           <span class="myine_body3_content_left">退出登录</span>
            <a href="" class="myine_body3_content_a">
            <i class="iconfont icon-demo"></i>
          </a>
        </li>
      </div>
    </div>
  </div>
        </div>
</template>

<script>
export default {
  data(){
    return{
      flag:true,
      username:'',
    }
  },
  methods:{
    login(){
      this.$router.push({path:'/login'})
    },
    tuichu(){
    if(window.localStorage.getItem("user")){
        window.localStorage.removeItem("user");
     }
     location.reload();
    }
  },
  mounted(){
    if(window.localStorage.getItem("user")){
      var  data =JSON.parse( window.localStorage.getItem("user"));
      var  nowDate =  new Date(); //请求的时间
      var  startDate = new Date(data.date);//存放的时间
      var allTimes = nowDate - startDate;
      if(allTimes>=1000*60*60*72){
        window.localStorage.removeItem("user");
        }else{
          this.flag=false,
          this.username=data.username;
        }
    }
  }

}
</script>

<style lang="scss" scoped>
.myine{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  .myine-header{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    background: #E54847;
    font-size: 36px;
  }
  .myine-body1{
    width:100%;
    height:300px;
    background-image: url('http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png');
    .myine-body1-top{
      width:100%;
      height: 220px;
      text-align: center;
      img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-top: 60px;
      }
    }
    .myine-body1-bottom{
      width:100%;
      height:80px;
      text-align: center;
      line-height: 80px;
      color: #333;
      font-size: 28px;
    }
  }
  .myine-footer{
    width: 100%;
    height: 830px;
    background: #eee;
    overflow: hidden;
    .mb-outline-tb{
       width: 100%;
       box-sizing: border-box;
       height: 298px;
       padding: 0 30px;
       margin:20px 0;
       background: #fff;
       overflow: hidden;
       .mb-outline-tb-top{
          width: 100%;
          height: 42px;
          font-size:30px;
          line-height:42px;
          margin-top:26px;
          color: #333;
       }
       .mb-outline-tb-body{
         width: 100%;
         height: 250px;
         display: flex;
         .mb-outline-tb-body-content{
           flex: 1;
           height: 250px;
           .mb-outline-tb-body-content-p1{
             width: 100%;
             height: 140px;
             text-align: center;
             img{
               width: 80px;
               height:80px;
               border-radius: 50%;
               margin-top: 30px;
             }
           }
           .mb-outline-tb-body-content-p2{
             width: 100%;
             height: 40px;
             line-height: 40px;
             font-size: 30px;
             color: #333;
           }
         }
       }
    }
  }
  .myine-footer-last{
    width: 100%;
    .myine_body3_content{
      width: 100%;
      height:80px;
      line-height:80px;
      border-bottom: 2px solid #e6e6e6;
      box-sizing: border-box;
      background: #fff;
      .myine_body3_content_li{
        box-sizing: border-box;
        width: 100%;
        padding: 0 32px;
        .myine_body3_content_left{
          box-sizing: border-box;
          display: inline-block;
          width: 88%;
          height:70px;
          text-align: left;
          font-size:30px;
        }
        .myine_body3_content_a{
        display: inline-block;
         width: 12%;
         height:70px;
         color: #999;
           .icon-demo{
              font-size:28px;
            }
        }
      }
    }
  }
}
</style>