import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:8080/api"  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')