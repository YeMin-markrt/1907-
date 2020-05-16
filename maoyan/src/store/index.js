import Vue from 'vue'
import Vuex from 'vuex'
import nowmovies from './nowplaying'
import commovies from './complaying'
import local from './localModel'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag:true,
  },
  mutations: {
    changeFlag:function(state,flag){
      state.flag = flag;
    },
  },
  actions: {
  },
  modules: {
    nowmovies,
    commovies,
    local
  }
})
