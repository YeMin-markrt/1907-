import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Login from './Login'
import filters from './filters'
import components from "@/components";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
for(let key in filters){
  Vue.filter(key,filters[key])
}
for(let key in components){
  Vue.component(key,components[key])
}
Vue.config.productionTip = false
//axios请求拦截
axios.interceptors.request.use(config=>{

  store.commit("CAHNGE_IS_LOADING",true);
  config.headers = {
    authorization:store.state.admin.token
}
  config.url="/ele"+config.url+"?t="+Date.now();
    return config;
})
//axios响应拦截器
axios.interceptors.response.use(({data})=>{
  if(data.ok==2){
    store.commit("OUT_LOGIN");
  }
  store.commit('CAHNGE_IS_LOADING', false)
  if(data.pageIndex){
    store.commit("CHANGE_PAGE_INFO",{pageIndex:data.pageIndex,pageSum:data.pageSum});
  }
  return data
})
new Vue({
  router,
  store,
  render: function (h) {
    return h(this.$store.state.admin.adminName?App:Login)
   }
}).$mount('#app')
