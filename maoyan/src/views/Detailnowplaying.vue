<template>
  <div class="detailnowplaying">
    <div class="detailnowplaying-header">
      <span class="iconfont icon-zuo ding" @click="huitui"></span>
      {{list.nm}}
    </div>
    <div class="detailnowplaying-body">
      <div class="detailnowplaying-body-left">
        <img :src="list.img.replace('/w.h','')" alt="">
      </div>
      <div class="detailnowplaying-body-center"> 
        <p  class="detailnowplaying-body-center-p1">{{list.nm}}</p>
        <p  class="detailnowplaying-body-center-p2">{{list.enm}}</p>
        <p  class="detailnowplaying-body-center-p3"><span class="detailnowplaying-body-center-p3-span1">{{list.sc}}</span><span class="detailnowplaying-body-center-p3-span2">({{list.snum}}人评)</span></p>
        <p  class="detailnowplaying-body-center-p4">{{list.cat}}</p>
        <p  class="detailnowplaying-body-center-p4"><span>{{list.src}}</span>/<span>{{list.dur}}分钟</span></p>
        <p  class="detailnowplaying-body-center-p4"><span>{{list.pubDesc}}</span></p>
      </div>
      <div class="detailnowplaying-body-right">
        <span class="iconfont icon-demo" @click="detail(list.id)"></span>
      </div>
    </div>

    <div class="showDay">
      <ul class="showDay-box" >
        <li v-for="(item,index) in dataya" :key="index"   @click="classchange(index)" v-bind:class="{active:index==getindex}">{{item}}</li>
      </ul>
    </div>
     <cinema-body1></cinema-body1>
    <detailnowplaying-footer></detailnowplaying-footer>
  </div>
</template>

<script>
import cinemabody1 from "@/components/detail/commbody1"
import footer from "@/components/detail/nowplayingfooter.vue"
export default {
   components: {
    "detailnowplaying-footer":footer,
    "cinema-body1":cinemabody1,
  },
data(){
  return{
    id:'',
    list:[],
    dataya:[],
    classObject:"active",
    getindex:0,
  }
},
methods:{
  detail(index){
    this.$router.push({name:`detailcomingplaying`,params:{ id:index }})
  },
  huitui(){
    this.$router.push({path:`/home/nowplaying`});
  },
  classchange(index){
     this.getindex = index;
    //  var ev=event||e;
    //  var target = ev.target;
    //   // for(var i=0;i<this.dataya.length;i++){
    //   //   console.log(this.dataya[i])
    //   //    this.dataya[i].classList.replace('active','');
    //   //  }
    //  if(target.nodeName === 'LI'){
    //  target.classList.add('active')
}
},
mounted(){
    this.id=this.$route.params.id;
    this.$store.commit("changeFlag",false);
    //console.log(this.id);
    var that=this; 
    this.$axios({
      method:"get",
      url:'/ajax/detailmovie',
      params:{movieId:that.id},
    }).then(function(result){
      that.list=result.data.detailMovie;
      document.title=that.list.nm;
     window.console.log(result)
    }).catch(() => {
        console.log("请求失败")
      })
// this.$axios({
//     method:"get",
//     url:'https://api.myjson.com/bins/1ew4ai',
//     params:{movieId:that.id},
//   }).then(function(result){
//     that.list=result.data.detailMovie;
//     //document.title=that.list.nm;
//     window.console.log(that.list);
//   }).catch(() => {
//         console.log("请求失败")
//       })

    for(var i=0;i<=4;i++){
      var datachange=new Date();
      datachange.setDate(datachange.getDate()+i);
      var nowday=datachange.getDate();
      nowday=nowday<=9?'0'+nowday:nowday
      var nowmonth=datachange.getMonth()+1;
      nowmonth=nowmonth<=9?'0'+nowmonth:nowmonth;
      var resultweek=datachange.getDay();
      var week=''
      switch(resultweek){
        case 0:
          week="周日";
          break;
        case 1:
          week="周一";
          break;
        case 2:
          week="周二";
          break;
        case 3:
          week="周三";
          break; 
        case 4:
          week="周四";
          break;
        case 5:
          week="周五";
          break;
        case 6:
          week="周六";
          break;
      }
      if(i==0){
        this.dataya.push("今天"+nowmonth+'月'+nowday+'日')
      }else if(i==1){
        this.dataya.push("明天"+nowmonth+'月'+nowday+'日')
      }else if(i==2){
        this.dataya.push("后天"+nowmonth+'月'+nowday+'日')
      }
      else{
        this.dataya.push(week+nowmonth+'月'+nowday+'日')
      }
      //console.log(this.dataya)
    }

},



beforeRouteLeave (to, from, next) {
    next();
    this.$store.commit("changeFlag",true);
   }
}

</script>

<style lang="scss" scoped>
.active{
  color: #f03d37 !important;
  border-bottom: 4px solid #f03d37;
}
.icon-up-fill{
  font-size: 20px;
  padding-left: 10px;
}
.pingpai::-webkit-scrollbar {display:none}
.detailnowplaying{
  width: 750px;
  box-sizing: border-box;
  margin: 0 auto;
  .detailnowplaying-header{
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
  .detailnowplaying-body{
    box-sizing: border-box;
    width: 100%;
    height: 390px;
    padding:38px 30px 38px 30px;
    background:rgba(26, 25, 25, 0.5);
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
      width: 414px;
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
    }
    .detailnowplaying-body-right{
      width: 20px;
      height: 300px;
      display: inline-block;
      text-align: center;
      line-height: 300px;
      .icon-demo{
        font-size: 34px;
        color: #fff;
        opacity: .8;
      }
    }
  }
  .showDay::-webkit-scrollbar {display:none}
  .showDay{
    width: 100%;
    height: 90px;
    overflow-x: scroll;
    background-color: #fff;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    .showDay-box{
      min-width: 1000px;
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
}
</style>