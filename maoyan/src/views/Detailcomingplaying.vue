<template>
<!-- :style="{backgroundColor:list.backgroundColor}" -->
  <div class="detailcomplaying" :style="{backgroundColor:list.backgroundColor}">
     <div class="detailcomplaying-header">
      <span class="iconfont icon-zuo ding" @click="huitui"></span>
      猫眼电影
    </div>
     <div class="detailcomplaying-body">
      <div class="detailcomplaying-nav"><a href="/home/nowplaying">猫眼电影</a>&nbsp;&gt;&nbsp;<span>{{list.nm}}</span>
      </div>
    
    <div class="detailnowplaying-body">
      <div class="detailnowplaying-body-left">
        <img :src="list.img.replace('/w.h','')" alt="">
      </div>
      <div class="detailnowplaying-body-center"> 
        <p  class="detailnowplaying-body-center-p1">{{list.nm}}</p>
        <p  class="detailnowplaying-body-center-p2">{{list.enm}}</p>
        <p  class="detailnowplaying-body-center-p4">{{list.cat}}</p>
        <p  class="detailnowplaying-body-center-p4">{{list.star.replace(/,/g,'/')}}</p>
        <p  class="detailnowplaying-body-center-p4"><span>{{list.pubDesc}}</span>/{{list.dur}}分钟</p>
        <div class="detailnowplaying-body-center-div1">
          <p  class="detailnowplaying-body-center-p5"><span class=" iconfont icon-xinaixin"></span>想看</p>
          <p  class="detailnowplaying-body-center-p6"><span class="iconfont icon-wujiaoxingxingxing"></span>看过</p>
        </div>
      </div>
    </div> 

    <div class="detailcomplaying-body-center">
     <p class="detailcomplaying-body-center-p1">
       <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt="">
      <span class="koubei">实时口碑</span>
     </p>
     <div class="middle">
       <span class="people-want-to-watch">{{wishlist.wish}}</span><span>人想看</span>
    </div>
    <p class="detailcomplaying-body-center-bottom">NO.2最受期待榜</p>
  </div>

  <div class="detailcomplaying-activity-bar">
   <div class="detailcomplaying-activity-bar-left">
      <img src="http://p1.meituan.net/moviemachine/18acdfb0ecb99eb5250512446d7e87fe2282.png" alt=""><span class="detailcomplaying-activity-bar-span1">0元看电影，速抢 👉</span>
   </div>
   <div class="detailcomplaying-activity-bar-right">
     <span class="detailcomplaying-activity-bar-span2">前往 App，免费领取</span><i class="iconfont">&#xe602;</i>
   </div>
  </div>


  <div class="movie-watching-tips">
    <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/tip-icon-surprise.png" alt="">有2个彩蛋，分别在片尾字幕中、后出现
  </div>

  <div class="brief-introduction">
    <div class="title">简介</div>
    <div class="title-body">{{list.dra}}</div>
  </div>

 <div class="complaying-top">
    <p class="title">视屏剧照</p>
    <div class="complaying-top-gun">
    <div  class="complaying-top-over">  
    <div class="complaying-top-body" v-for="item in list.photos" :key="item.id">
      <div class="complaying-top-body-img">
        <img :src="item.replace('/w.h','')" alt="">
      </div>
      </div>
    </div>
    </div>
  </div>
     </div>

  <div class="last">
      <p class="last-top">讨论</p>
      <div class="last-content"  v-for="item in  taolunlist" :key="item.id">
        <div class="last-content-left">
          <img :src="item.avatarurl">
        </div>
        <div class="last-content-right">
          <p class="last-content-right-p1">{{item.nickName}}</p>
          <p class="last-content-right-p2">{{item.content}}</p>
          <p class="last-content-right-p3">
            {{item.time}}
          </p>
        </div>
      </div>
      </div>


     <div class="detailcomplayingfooter">
       <div class="detailcomplayingfooter-left">
         <span class="iconfont icon-tiaozhuan" @click=" huitui"></span>
       </div>
        <div class="detailcomplayingfooter-right">
          <div class="detailcomplayingfooter-right-goupiao" @click="maipiao(list.id)">特惠购票</div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      id:'',
      list:[],
      wishlist:[],
      taolunlist:[],
    }
  },
  methods:{
    huitui(){
    this.$router.push({path:`/home/complaying`});
  },
  maipiao(index){
    this.$router.push({name:`detailnowplaying`,params:{ id:index }})
  }
  },
mounted(){
  this.id=this.$route.params.id;
  this.$store.commit("changeFlag",false);
  var that=this; 
  this.$axios({
    method:"get",
    url:'/ajax/detailmovie',
    params:{movieId:that.id},
  }).then(function(result){
    that.list=result.data.detailMovie;
    document.title=that.list.nm;
   // window.console.log(result);
  }).catch(() => {
        console.log("请求失败")
      })

this.$axios({
    method:"get",
    url:'/mmdb/replies/comment/1067469055.json',
  }).then(function(result){
    that.taolunlist=result.data.cmts;
    //document.title=that.list.nm;
    //window.console.log(result);
     window.console.log(that.taolunlist);
  }).catch(() => {
        console.log("请求失败")
      })


  this.$axios({
    method:"get",
    url:'/asgard/asgardapi/review/realtime/data.json',
    params:{movieId:that.id},
  }).then(function(result){
    that.wishlist=result.data.data;
    //document.title=that.list.nm;
    //window.console.log(result);
     window.console.log(that.wishlist);
  }).catch(() => {
        console.log("请求失败")
      })


  // this.$axios({
  //   method:"get",
  //   url:'https://api.myjson.com/bins/1ew4ai',
  //   params:{movieId:that.id},
  // }).then(function(result){
  //   that.list=result.data.detailMovie;
  //   //document.title=that.list.nm;
  //   window.console.log(that.list);
  // }).catch(() => {
  //       console.log("请求失败")
  //     })
},

  beforeRouteLeave (to, from, next) {
    next();
    this.$store.commit("changeFlag",true);
   }
}
</script>

<style lang="scss" scoped>
.detailcomplayingfooter{
  width: 750px;
  height: 120px;
  box-sizing: border-box;
  margin: 0 auto;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: #fff;
  margin-top: 120px !important;
  border-top:4px solid #ddd;
  .detailcomplayingfooter-left{
    display: inline-block;
    width: 20%;
    line-height: 120px;
    text-align: center;
    float: left;
    .iconfont{
      font-size:50px;
      color: #333;
    }
  }
  .detailcomplayingfooter-right{
    display: inline-block;
    width:80%;
    line-height: 120px;
    text-align: center;
    float: left;
    .detailcomplayingfooter-right-goupiao{
      display: inline-block;
      width: 80%;
      height: 80px;
      margin-top: 15px;
      line-height: 80px;
      background-image: linear-gradient(-90deg,#fb3333,#ff5269);
      color: #fff;
      font-size: 34px;
      border-radius:40px;
    }
  }
}
.detailcomplaying{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  .detailcomplaying-header{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    background: #E54847;
    font-size: 36px;
    position: relative;
    .ding{
      position: absolute;
      left: 20px;
      top: 2px;
      font-size: 48px;
    }
  }
  .detailcomplaying-body{
    width: 750px;
    box-sizing: border-box;
    padding: 42px 32px;
    color: #fff;
    .detailcomplaying-nav{
      text-align: left;
      font-size: 28px;
      margin-bottom: 6px;
      color: #ccc;
      a{
         color: #ccc;
      }
    }
    .detailnowplaying-body{
    box-sizing: border-box;
    width: 100%;
    height: 310px;
     margin-top: 20px;
    .detailnowplaying-body-left{
      width: 220px;
      height: 300px;
      display: inline-block;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .detailnowplaying-body-center{
      width: 434px;
      height: 300px;
      display: inline-block;
      float: left;
      margin-left: 25px;
      p{
        text-align: left;
      }
      .detailnowplaying-body-center-p1{
        height: 40px;
        line-height: 40px;
        font-size: 40px;
        margin-top: 4px;
        font-weight: 700;
        overflow: hidden;
        color: #fff;
      }
       .detailnowplaying-body-center-p2{
        margin-top: 20px;
        font-size: 24px;
        color: #fff;
        opacity: .8;
      }
      .detailnowplaying-body-center-p3{
        margin-top: 10px;
        font-weight: 700;
        .detailnowplaying-body-center-p3-span1{
          color: #fc0;
          font-size: 44px;
          padding-right: 20px
        }
        .detailnowplaying-body-center-p3-span2{
          font-size: 24px;
          color: #fff;
          opacity: .8;
        }
      }
      .detailnowplaying-body-center-p4{
        margin-top: 16px;
        font-size: 24px;
        color: #fff;
        opacity: .8;
      }
      .detailnowplaying-body-center-div1{
        width: 100%;
        height: 50px;
        margin-top: 10px;
         p{
          display: inline-block;
          width: 200px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 20px;
          float: left;
          background: hsla(0,0%,100%,.35);
          font-size: 28px;
          color:#fff;
          .iconfont{
            font-size: 28px;
            padding-right: 10px;
          }
        }
        .detailnowplaying-body-center-p5{
          margin-right: 20px;
        }
      }
    }

    }
    .detailcomplaying-body-center{
      width: 100%;
      height: 290px;
      box-sizing: border-box;
      background-color: rgba(0,0,0,.2);
      box-shadow: 0 0 6px 0 hsla(0,0%,100%,.03);
      border-radius: 12px;
      margin-top: .3rem;
      padding: 20px 24px;
      .detailcomplaying-body-center-p1{
        height: 36px;
        text-align: left;
        
        img{
          width: 40px;
          height: 40px;
          margin-right:10px;
        }
        .koubei{
          position: relative;
          top:-15px;
        }
      }
      .middle{
        font-size:48px;
        height: 80px;
        text-align: center;
        padding: 40px 20px;
        line-height: 80px;
        .people-want-to-watch{
           font-size:54px;
          color: #ffbb29;
          margin-right: 10px;
        }
      }
      .detailcomplaying-body-center-bottom{
        text-align: left;
        width: 100%;
        height: 40px;
        padding-top:20px;
        border-top: 2px solid #ffeefe;
        color: #ffe4a2;
      }
}

.detailcomplaying-activity-bar{
  width: 94%;
  box-sizing: border-box;
  margin: 20px 26px;
  height: 44px;
  border-bottom: 2px solid #ffeefe;
  line-height: 44px;
  .detailcomplaying-activity-bar-left{
    width: 60%;
    float: left;
    display: inline-block;
    height: 44px;
    text-align: left;
   img{
     width: 30px;
     height: 30px;
     margin-right: 10px;
     padding-left:30px;
   }
   .detailcomplaying-activity-bar-span1{
     font-size: 30px;
   }
  }
  .detailcomplaying-activity-bar-right{
     width:40%;
    float: left;
    display: inline-block;
    height: 44px;
    font-size: 24px;
    opacity: .6;
    .iconfont{
       font-size: 20px;
    }
  }
}

.movie-watching-tips{
  width: 94%;
  box-sizing: border-box;
  margin: 30px 26px;
  height: 64px;
  padding: 10px 0px;
  border-bottom: 2px solid #ffeefe;
  line-height: 50px;
  font-size: 32px;
  white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
  img{
    text-align: left;
     width: 40px;
     height: 40px;
     margin-right: 10px;
  }
}


.brief-introduction{
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin: 20px 0px;
  padding: 0 20px;
  .title{
    height: 44px;
    line-height: 44px;
    font-size: 30px;
   
  }
  .title-body{
    margin: 12px 0;
    height: 129px;
    line-height: 43px;
    font-size: 30px;
    overflow: hidden;
  	text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp:3;
	  -webkit-box-orient: vertical;
  }
}


.complaying-top{
  width: 100%;
  height:270px;
  box-sizing: border-box;
  margin:0 auto !important;
  padding: 24px 0 44px 30px;
  overflow: hidden;
  .complaying-top-gun{
    width:100%;
    height:270px;
    box-sizing: border-box;
    margin:0 auto !important;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .complaying-top-over{
    min-width: 7000px;
    height:270px;
  }
  .title{
    width:100%;
    text-align: left;
    font-size: 30px;
    color: #fff;
    margin-bottom: 24px;
  }
  .complaying-top-body{
    display: inline-block;
    width: 280px;
    height: 186px;
    margin-right: 20px;
    float: left;
    .complaying-top-body-img{
      width: 280px;
      height:186px;
      margin-bottom: 12px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
    
  }
  }

  
}
.last{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #fff;
  border-top-left-radius:20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  margin-top:-24px;
  position: relative;
  margin-bottom: 200px !important;
  .last-top{
    width: 100%;
    box-sizing: border-box;
    height: 98px;
    padding: 26px 32px 28px 26px;
    font-size:30px;
    color: #333;
    text-align: left;
  }
  .last-content{
    width: 100%;
    min-height:240px;
    box-sizing: border-box;
    padding: 30px;
    border-top:1px solid #ccc;
    .last-content-left{
      float: left;
      width: 68px;
      height: 68px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .last-content-right{
      width: 580px;
      float: right;
      text-align: left;
      .last-content-right-p1{
        height: 40px;
        font-size: 24px;
        color: #333;
      }
      .last-content-right-p2{
        font-size:30px;
        color: #333;
        height: 126px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .last-content-right-p3{
        float: right;
        height: 40px;
        font-size: 24px;
        color: #333;
      }
    }
  }
}

</style>