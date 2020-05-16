import $axios from "axios";
export default {
  state: {//定义数据 类似组件中的data 用来做数据的声明
    comhotplaying:[],
    complayings:[],
  },
  mutations: { //用来修改和更新数据  类似组件中的methods
    initcomplayings:function(state,list){
      state.complayings=list;
    },  
    initcomhotplaying:function(state,list){
      state.comhotplaying=list;
    }, 
},
actions: {
  getcomplayings(context){//获取数据
    $axios({
          method:"get",
          url:"https://api.myjson.com/bins/y0zt6",
      }).then(function(result){
        var list=result.data.coming;
        //window.console.log(list)
          context.commit("initcomplayings",list)
      })
  },
  getcomhotplaying(context){//获取数据
    $axios({
          method:"get",
          url:"https://api.myjson.com/bins/64d56",
      }).then(function(result){
        var list=result.data;
        //window.console.log(list)
          context.commit("initcomhotplaying",list)
      })
  },
},

}