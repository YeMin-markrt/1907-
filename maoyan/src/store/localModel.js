import $axios from "axios";

export default {
  state: {//定义数据 类似组件中的data 用来做数据的声明
    nowlocal:[],
    list:[],
    brandlist:[],
    districtlist:[],
    hallTypelist:[],
    servicelist:[],
    subwaylist:[],
    timeRangeslist:[],
  },
  mutations: { //用来修改和更新数据  类似组件中的methods
    initnowlocal:function(state,list){
      state.nowlocal=list;
    },
    initlist:function(state,list){
      state.list=list;
    },
    initbrandlist:function(state,list){
      state.brandlist=list;
    },  
    initdistrictlist:function(state,list){
      state.districtlist=list;
    },  
    inithallTypelist:function(state,list){
      state.hallTypelist=list;
    },  
    initservicelist:function(state,list){
      state.servicelist=list;
    },  
    initsubwaylist:function(state,list){
      state.subwaylist=list;
    },
    inittimeRangeslist:function(state,list){
      state.timeRangeslist=list;
    },      
},
actions: {
  getnowlocal(context){//获取数据
    $axios({
          method:"get",
          url:"https://api.myjson.com/bins/13010y",
      }).then(function(result){
        var list=result.data.cinemas;
          context.commit("initnowlocal",list);
          //window.console.log(list)
      })
  },
  getMany(context){//获取数据
    $axios({
          method:"get",
          url:"https://api.myjson.com/bins/113vbm",
      }).then(function(result){
        var list=result.data;
        var brand=list.brand.subItems;
        var district=list.district;
        var hallType=list.hallType;
        var service=list.service;
        var subway=list.subway;
        var timeRanges=list.timeRanges;
        //window.console.log(brand)
        context.commit("initlist",list);
        context.commit("initbrandlist",brand);
        context.commit("initdistrictlist",district);
        context.commit("inithallTypelist",hallType);
        context.commit("initservicelist",service);
        context.commit("initsubwaylist",subway);
        context.commit("inittimeRangeslist",timeRanges);
         
      })
  },
},

}