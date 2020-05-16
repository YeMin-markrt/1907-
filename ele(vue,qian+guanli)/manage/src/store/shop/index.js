import axios from 'axios';
export default{
  state:{
    shopTypeList:[],
    allShopTypeList:[], //所有店铺列表
    shopList:[],
    shopListByTypeId:[] //根据店铺类别id获取店铺列表
  },
  mutations: {
    CHANGE_SHOPTYPE_LIST(state,shopTypeList){
        state.shopTypeList=shopTypeList
    },
    CHANGE_SHOP_LIST(state,shopList){
      state.shopList = shopList;
    },
    CAHNGE_ALL_SHOPTYPE_LIST(state,shopTypeList){
      state.allShopTypeList = shopTypeList;
    },
    CHANGE_SHOP_LIST_TYPEID(state,shopList){
      state.shopListByTypeId = shopList;
    },
  },
  actions: {
    async getShopTypeList({commit},{pageIndex=1,keyWord="",_id}={}){
      const data=await axios.get("/shopTypeList",{
        params:{
          pageIndex,
          keyWord,
          _id
        }
      })
      commit("CHANGE_SHOPTYPE_LIST",data.shopTypeList);
    },
    async deleteShopType(context,id){
      const data=await axios.delete("/delShopType/"+id);
      if(data.ok===1){
        context.dispatch('getShopTypeList',context.rootState.pageIndex)
      }else{
        alert("删除失败")
      }
    },
    async deleteShopList(context,id){
      const data=await axios.delete("/delShopList/"+id);
      if(data.ok===1){
        context.dispatch('getShopList',context.rootState.pageIndex)
      }else{
        alert("删除失败")
      }
    },
    async getAllShopTypeList({commit}){
      const data = await axios.get("/allShopTypeList");
      commit("CAHNGE_ALL_SHOPTYPE_LIST",data.shopTypeList);
  },
    async getShopList({commit},{pageIndex=1,keyWord="",_id}={}){
      const data= await axios.get("/shopList",{
        params:{
            pageIndex,
            keyWord,
            _id
        }
    });
    commit("CHANGE_SHOP_LIST",data.shopList);
    },
    async getShopListByShopTypeId({commit},shopId){
      const {shopList} = await axios.get("/shopList/"+shopId);
      commit("CHANGE_SHOP_LIST_TYPEID",shopList);
    }
  }
}