<template>
  <div class="shop">
      <div class="shop-header">
        <span class="iconfont icon-zuo ding" @click="huitui"></span>
        {{listdetail.nm}}
      </div>
      <div class="shop-nav"><a href="/home/nowplaying">猫眼电影</a>&nbsp;&gt;&nbsp;<span> {{listdetail.nm}}</span>
      </div>
      <div class="shop-body">
        <div class="shop-body-top">
          <p  class="shop-body-top-p1">{{listdetail.nm}}</p>
          <p  class="shop-body-top-p2">{{listdetail.addr}}</p>
        </div>
        <div class="shop-body-content">
          <div class="shop-body-content-movie">
            <li v-for="(item,index) in listmovies" :key="item.id" class="shop-movie-content" @click="xuanze(index)" v-bind:class="{active:index==getindex}">
              <img :src="item.img.replace('/w.h','')" alt="">
            </li>
          </div>
         </div> 
          <div class="shop-body-content-moviecont">
            <p class="shop-body-content-moviecont-p1">
              <span class="shop-body-content-moviecont-p1-span1">{{movedetail.nm}}</span><span class="shop-body-content-moviecont-p1-span2">{{movedetail.wish}}</span><span class="shop-body-content-moviecont-p1-span3">人想看</span>
            </p>
             <p class="shop-body-content-moviecont-p2">
              {{movedetail.desc}}
            </p>
          </div>
      </div>

    <div v-show="movedetail.shows.length" class="xuanxiangka">

      <div class="showDay">
        <ul class="showDay-box" >
          <li v-for="(item,index) in movedetail.shows" :key="index"   @click="classchange(index)" v-bind:class="{actives:index==getindexs}">{{item.dateShow}}</li>
        </ul>
      </div>

      <div  class="list-wrap" v-if="buylist.plist.length">
        <div class="list-wrap-all"  v-for="(item,index) in buylist.plist" :key="item.id">
          <div  class="list-wrap-all-div1">
            <p class="list-wrap-all-div1-p1">{{item.tm}}</p>
            <p class="list-wrap-all-div1-p2">开场</p>
          </div>
          <div  class="list-wrap-all-div2">
            <p class="list-wrap-all-div2-p1"><span>{{item.lang}}</span>{{item.tp}}</p>
            <p class="list-wrap-all-div2-p2">{{item.th}}</p>
          </div>
          <div  class="list-wrap-all-div3">
            <p class="list-wrap-all-div3-p1"><span class="list-wrap-all-div3-p1-span">{{item.reservedMin*1+item.vipPrice*1}}元</span><span>vip优惠价:{{item.vipPrice}}元</span></p>
            <p class="list-wrap-all-div3-p2">{{item.extraDesc}}</p>
          </div>
          <div  class="list-wrap-all-div4">
           <span class="list-wrap-all-div4-p1" @click="goupiao">购票</span>
          </div>
        </div>
      </div>
      <div v-else class="ruowu">
        <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt="">
        <p>该影片未上映</p>
      </div>

      <div v-if="listeat.length" class="zong">
        <div class="eatlist">
          <p class="eatlist-top">
            影视超值套餐
          </p>
          <div class="eatlist-body" v-for="(item,index) in listeat" :key="item.id">
            <div  class="eatlist-body-left" >
              <img :src="item.imageUrl" alt="">
              <p class="eatlist-body-left-top" v-if="item.cardTag">{{item.cardTag}}</p>
            </div>
            <div  class="eatlist-body-content">
              <div class="eatlist-body-content-top">
                <span v-if="item.recommendPersonNum==1" class="eatlist-sapn">单人</span>
                <span v-if="item.recommendPersonNum==2" class="eatlist-sapn">双人</span>
                <span v-if="item.recommendPersonNum==3" class="eatlist-sapn">多人</span>
                <span>{{item.title}}</span>
              </div>
               <div class="eatlist-body-bottom">
                    <p class="eatlist-body-content-bottom-left">¥{{item.price}}</p>
                    <div class="eatlist-body-content-bottom-right">
                      <p  class="eatlist-body-content-bottom-right-p1">{{item.curNumberDesc}}</p>
                      <p  class="eatlist-body-content-bottom-right-p2" @click="goumai(index)">购买</p>
                    </div>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="related-cinemas-wrap">
      <div class="related-cinemas-list">
        <div class="related-cinemas-title">相关影院</div>
            <a class="related-cinema-item">中国电影博物馆</a>
            <a class="related-cinema-item">泰禾影城（马家堡店）</a>
            <a class="related-cinema-item">耀莱成龙影城（花乡店</a>
            <a class="related-cinema-item">东融国际影城（草桥店</a>
            <a class="related-cinema-item" >耀莱成龙影城（王府井店）</a>
            <a class="related-cinema-item" >横店电影城（王府井店）</a>
            <a class="related-cinema-item" >华联影院（公益西桥店）</a>
            <a class="related-cinema-item" >海淀工人文化宫</a>
            <a class="related-cinema-item" >紫光影城（蓝岛店）</a>
            <a class="related-cinema-item" >新影联米瑞酷影城（昌平西关店）</a>
         </div>``````
    </div>
      <van-cell is-link @click="showPopup"></van-cell>
      <van-popup v-model="show" class="baocuo">请登录</van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);

export default {
data(){
  return{
    id:'',
    movedetail:[],
    list:[],
    listdetail:[],
    listmovies:[],
    listvip:[],
    listeat:[],
    getindex:0,
    getindexs:0,
    buylist:[],
    show: false,
  }
},
methods:{
  showPopup() {
      this.show = true;
    },

    
   goupiao(){
       if(window.localStorage.getItem("user")){
          var  data =JSON.parse( window.localStorage.getItem("user"));
          var  nowDate =  new Date(); //请求的时间
          var  startDate = new Date(data.date);//存放的时间
          var allTimes = nowDate - startDate;
          if(allTimes>=1000*60*60*72){
            window.localStorage.removeItem("user");
            }else{
              var usergood={};
              usergood.cinrmaid=this.listdetail.cinemaId;
              usergood.moveid=this.getindex;
              data.usergoods[0]=usergood;
              window.localStorage.setItem("user",JSON.stringify(data));
              this.$router.push({path:`/xuanzuo`});
            }
       }else{
          this.show = true;
          setTimeout(()=>{
            this.$router.push({path:`/login`});
          },2000)
       }
   },


   goumai(index){
       if(window.localStorage.getItem("user")){
          var  data =JSON.parse( window.localStorage.getItem("user"));
          var  nowDate =  new Date(); //请求的时间
          var  startDate = new Date(data.date);//存放的时间
          var allTimes = nowDate - startDate;
          if(allTimes>=1000*60*60*72){
            window.localStorage.removeItem("user");
            }else{
              var usergood={};
              usergood.cinrmaid=this.listdetail.cinemaId;
              usergood.moveid=this.getindex;
              usergood.eatindex=index;
              data.usergoods[0]=usergood;
              window.localStorage.setItem("user",JSON.stringify(data));
              this.$router.push({path:`/xuanzuo`});
            }
       }else{
          this.show = true;
          setTimeout(()=>{
            this.$router.push({path:`/login`});
          },2000)
       }
   },
      
  classchange(index){
    this.getindexs=index;
     this.buylist=this.movedetail.shows.filter((item,index)=>{
       if(index==this.getindexs){
         return item;
       }
      })[0]
     // window.console.log(this.buylist)
  },
   huitui(){
    this.$router.push({path:`detailnowplaying`});
  },
  xuanze(index){
    this.getindex=index;
    this.getindexs=0;
    this.movedetail=this.listmovies.filter((item,index)=>{
        return index==this.getindex
      })[0]
  }
},
mounted(){
  this.id=this.$route.params.id;
  this.$store.commit("changeFlag",false);
  var that=this; 
    this.$axios({
      method:"get",
      url:'/ajax/cinemaDetail',
      params:{cinemaId:"894"},
    }).then(function(result){
      that.list=result.data;
      that.listdetail=that.list.cinemaData;
      that.listeat=that.list.dealList.dealList;
      that.listmovies=that.list.showData.movies;
      that.listvip=that.list.vipInfo;
      that.movedetail=that.listmovies.filter((item,index)=>{
        return index==that.getindex
      })[0]
      that.buylist=that.movedetail.shows.filter((item,index)=>{
       if(index==that.getindexs){
         return item;
       }
      })[0]
      //window.console.log(that.listeat)
      //window.console.log(that.buylist)
      document.title=that.listdetail.nm;
      window.console.log( that.listdetail)
    }).catch(() => {
        console.log("请求失败")
      })
},

beforeRouteLeave (to, from, next) {
    next();
    this.$store.commit("changeFlag",true);
}
}
</script>

<style lang="scss" scoped>
.baocuo{
  width:400px;
  height: 200px;
  color:#333;
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}
.actives{
  color: #f03d37 !important;
  border-bottom: 4px solid #f03d37;
}
.active{
  transform: scale(1.15);
  border: 4px solid #fff;
}
.shop{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  .shop-header{
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
  .shop-nav{
    width: 100%;
    box-sizing: border-box;
    padding:20px 30px 0px 40px;
    text-align: left;
    font-size: 28px;
    margin-bottom: 6px;
    color: #aaa;
      a{
         color: #aaa;
      }
  }
  .shop-body{
    width: 100%;
    box-sizing: border-box;
    height: 570px;
    border-bottom:2px solid #eee;
    .shop-body-top{
      width:100%;
      height: 140px;
      box-sizing: border-box;
      padding: 20px 40px;
      p{
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        text-align: left;
      }
      .shop-body-top-p1{
        height: 60px;
        line-height: 60px;
        color: #333;
        font-size: 34px;
        font-weight: 700;
      }
       .shop-body-top-p2{
        height: 40px;
        line-height: 40px;
        font-size: 26px;
        color: #999;
      }
    }
    .shop-body-content::-webkit-scrollbar {display:none}
    .shop-body-content{
      width: 100%;
      box-sizing: border-box;
      height:270px;
      background-color:rgba(64, 69, 77,.5);;
      overflow-x: scroll;
      white-space: nowrap;
      .shop-body-content-movie{
         min-width:4000px;
         height:260px;
         box-sizing: border-box;
         padding-left: 20px;
         padding-top: 40px;
         .shop-movie-content{
           float: left;
           width: 130px;
           height: 190px;
           margin-right:30px;
           img{
             width: 100%;
             height: 100%;
           }
         }
      }  
     
   }
  
  }
   .shop-body-content-moviecont{
        width: 100%;
        height: 160px;
        box-sizing: border-box;
        padding: 22px 30px;
        text-align: center;
        color: #333;
        p{
          padding-left: 40px;
          width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        .shop-body-content-moviecont-p1{
          height: 48px;
          line-height: 48px;
          font-weight: 700;
          color: #ffb400;
          font-size: 20px;
          .shop-body-content-moviecont-p1-span1{
            font-size: 34px;
            color: #333;
            margin-right: 10px;
          }
          .shop-body-content-moviecont-p1-span2{
              color: #ffb400;
              font-size:32px;
              margin-right: 10px
            }
        }
        .shop-body-content-moviecont-p2{
          margin-top:10px;
          height:28px;
          line-height:28px;
          font-size: 26px;
          color: #999;
        }
   }

   .xuanxiangka{
      width:750px;
    .showDay::-webkit-scrollbar {display:none}
    .showDay{
      width:750px;
      height: 90px;
      box-sizing: border-box;
      overflow-x: scroll;
      background-color: #fff;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      text-align:left ;
      .showDay-box{
        min-width: 750px;
        li{
          display: inline-block;
          width: 230px;
          line-height: 86px;
          margin-left: 9px;
          font-size: 28px;
          text-align: center;
          color: #666;
        }
      }
  }
  .ruowu{
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    background: #eee;
    img{
      margin-top: 20px;
    }
    p{
      margin-top: 10px;
      font-size: 30px;
    }
  }
  .list-wrap{
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
     padding: 20px 0 20px 20px;
    .list-wrap-all{
      width: 100%;
      height: 180px;
      box-sizing:border-box;
      padding:20px 0;
      border-bottom: 2px solid #eee;
      .list-wrap-all-div1{
        width:150px;
        height:180px;
        text-align: center;
        float: left;
        font-size: 40px;
        color: #333;
        .list-wrap-all-div1-p1{
          width: 100%;
          height: 60px;
          padding-top:40px
        }
        .list-wrap-all-div1-p2{
          height: 40px;
          font-size: 22px;
          color: #999;
        }
      }
      .list-wrap-all-div2{
        width: 230px;
        height: 180px;
        float: left;
        overflow: hidden;
        p{
          text-align: left;
        }
        .list-wrap-all-div2-p1{
          width: 100%;
          height: 60px;
          line-height: 60px;
          font-size: 26px;
          color: #333;
          margin-top: 6px;
          span{
            margin-right: 10px;
          }
        }
        .list-wrap-all-div2-p2{
          margin-top:2px;
          font-size: 22px;
          color: #999;
        }
      }
      .list-wrap-all-div3{
        width: 240px;
        height: 180px;
        float: left;
        overflow: hidden;
         p{
          text-align: left;
        }
        .list-wrap-all-div3-p1{
           color: #999;
          font-size: 22px;
          .list-wrap-all-div3-p1-span{
          color: #f03d37;
          font-size: 38px;
          margin-right:10px;
      }
      }
      .list-wrap-all-div3-p2{
          margin-top:20px;
          font-size: 22px;
          color: #999;
      }
      }
      .list-wrap-all-div4{
        height: 180px;
        text-align: center;
        line-height: 180px;
        .list-wrap-all-div4-p1{
          display: inline-block;
          width: 80px;
          height: 40px;
          line-height: 45px;
          border-radius:10px;
          background-color: #f03d37;
          color: #fff;
          
        }
      }
    }
  }

  .zong{
    width: 100%;
    background:#f0f0f0;
    overflow: hidden;
    .eatlist{
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      margin-top: 20px;
      padding-left: 30px;
      .eatlist-top{
        width: 100%;
        line-height:90px;
        height: 90px;
        font-size: 30px;
        color: #666;
        text-align: left;
      }
      .eatlist-body{
        width: 100%;
        box-sizing: border-box;
        padding: 26px 0;
        overflow: hidden;
         padding-bottom: 20px;
          border-top: 2px solid #eee;
        .eatlist-body-left{
          width: 184px;
          height: 184px;
          float: left;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          .eatlist-body-left-top{
            display: inline-block;
            height: 36px;
            line-height: 36px;
            background-color: #0ac1ae;
            padding: 0 10px;
            color: #fff;
            border-bottom-right-radius:4px;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .eatlist-body-content{
          width: 468px;
          float: left;
          height: 184px;
          text-align: left;
          padding-left: 20px;
          .eatlist-body-content-top{
            width: 100%;
            font-size: 28px;
            line-height:36px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .eatlist-sapn{
              display: inline-block;
              margin-top:2px;
              margin-right:14px;
              padding: 0 12px;
              font-size: 20px;
              line-height:40px;
              height:40px;
              background: #f90;
              border-radius: 4px;
              color: #fff;
            }
          }
          .eatlist-body-bottom{
            width: 100%;
            height: 100px;
            .eatlist-body-content-bottom-left{
              box-sizing: border-box;
              width: 150px;
              float: left;
              color: #f03d37;
              font-size: 34px;
              padding-top: 40px;
            }
            .eatlist-body-content-bottom-right{
              box-sizing: border-box;
              text-align: right;
              width: 300px;
              float:right;
              .eatlist-body-content-bottom-right-p1{
                box-sizing: border-box;
                line-height:42px;
                height:42px;
                font-size:24px;
                color: #999;
                padding-top: 20px;

              }
              .eatlist-body-content-bottom-right-p2{
                display: inline-block;
                padding: 0 16px;
                height:48px;
                line-height:48px;
                font-size:24px;
                border-radius: 6px;
                color: #fff;
                background-color: #f03d37;
                margin-top: 20px;
              }
            }
        }
      }
    }
  }
    }
}
.related-cinemas-wrap{
  width: 100%;
  height:600px;
  overflow: hidden;
  background: #f0f0f0;
  padding-bottom: 40px;
  .related-cinemas-list{
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    height: 590px;
    text-align: left;
    background: #fff;
    .related-cinemas-title{
      line-height: 80px;
      height: 80px;
      font-size: 30px;
      color: #666;
      box-sizing: border-box;
      padding: 0 20px;
    }
    .related-cinema-item{
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      display: block;
      color: #666;
      height: 50px;
      font-size: 30px;
      line-height:50px;
    }
  }
}
.ruowu{
  img{
    padding-top: 80px;
    width: 80px;
    height: 80px;
  }
}
}
</style>


