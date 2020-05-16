import $axios from "axios";

export default {
  state: {//定义数据 类似组件中的data 用来做数据的声明
    nowplayings:[],
  },
  mutations: { //用来修改和更新数据  类似组件中的methods
    initnowplayings:function(state,list){
      state.nowplayings=list;
    },  
},
actions: {
  getnowplayings(context){//获取数据
    $axios({
          method:"get",
          url:"https://api.myjson.com/bins/ftave",
          //url:"/ajax/movieOnInfoList",
      }).then(function(result){
        var list=result.data.movieList;
         list.forEach(item=>{
          item.manyhome=Math.round(Math.random()*140);
          item.manychang=Math.round(Math.random()*400);
        })
          context.commit("initnowplayings",list);
          //window.console.log(list)
      })
  },
},

}