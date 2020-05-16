import axios from "axios";
export default {
  state:{
    goodsTypeList:[],
    goodsListByTypeId:[], //根据店铺id获取商品列表
    goodsList:[],
},
mutations:{
  CHANGE_GOODS_TYPE_LIST(state,goodsTypeList){
      state.goodsTypeList = goodsTypeList;
  },
  CHANGE_GOODS_LIST_TYPEID(state,goodsTypeList){
    state.goodsListByTypeId = goodsTypeList;
  },
  CHANGE_GOODS_LIST(state,goodsList){
    state.goodsList = goodsList;
},
},
actions:{
  async getGoodsTypeList({commit},{pageIndex=1,keyWord="",_id}={}){
      const {goodsTypeList} = await axios.get("/goodsTypeList",{
          params:{
              pageIndex,
              keyWord,
              _id
          }
      })
      commit("CHANGE_GOODS_TYPE_LIST",goodsTypeList);
  },
  async deleteGoodsTypeList(context,id){
    const data=await axios.delete("/delgoodsTypeList/"+id);
    if(data.ok===1){
      context.dispatch('getGoodsTypeList',context.rootState.pageIndex)
    }else{
      alert("删除失败")
    }
  },
  async getgoodsListByShopTypeId({commit},shopId){
    const {goodstypeList} = await axios.get("/goodstypeList/"+shopId);
    commit("CHANGE_GOODS_LIST_TYPEID",goodstypeList);
  },
  async getGoodsList({commit},{pageIndex=1,keyWord="",_id}={}){
    const {goodsList} = await axios.get("/goodsList",{
        params:{
            pageIndex,
            keyWord,
            _id
        }
    })
    commit("CHANGE_GOODS_LIST",goodsList);
},
}
}