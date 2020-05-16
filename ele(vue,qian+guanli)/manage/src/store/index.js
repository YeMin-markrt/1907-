import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import shop from './shop'
import goods from './goods'
Vue.use(Vuex)

const state={
  isLoading: false,
  pageIndex:1,
  pageSum:1
}
const mutations={
  CAHNGE_IS_LOADING(state, isLoading) {
    state.isLoading = isLoading;
},
CHANGE_PAGE_INFO(state,{pageIndex,pageSum}){
   state.pageIndex=pageIndex;
   state.pageSum=pageSum;
}
}
const modules={
  admin,
  shop,
  goods
}
export default new Vuex.Store({
  state,
  mutations,
  modules
})
