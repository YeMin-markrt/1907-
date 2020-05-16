import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cinema from '../views/Cinema.vue'
import Mine from '../views/Mine.vue'
import Nowplaying from '../views/home/Nowplaying.vue'
import Complaying from '../views/home/Complaying.vue'
import Detailnowplaying from '../views/Detailnowplaying'
import Detailcomingplaying from '../views/Detailcomingplaying'
import regist from '../views/regist'
import login from '../views/login'
import shop from '../views/Shop'
import xuanzuo from '../views/Xuanzuo'
import nofond from '../views/nofond'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"home/Nowplaying",
  },{
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path:"Nowplaying",
        component:Nowplaying
      }, {
        path:"Complaying",
        component:Complaying
      },
    ],
    meta:{
      title:"影院票房"
    },
  },
  {
    path: '/Cinema',
    name: 'cinema',
    component:Cinema,
    meta:{
      title:"影院票房"
    },
  },
  {
    path: '/Mine',
    name: 'mine',
    component: Mine,
    meta:{
      title:"我的"
    },
  },
  {
    path:'/Detailnowplaying',
    name:'detailnowplaying',
    component:Detailnowplaying,
    beforeEnter:function(to,from,next){
      if(from.path.indexOf("/home")!=-1){
        next();
      }else{
        next("home/Nowplaying");
      }
    },
  },
  {
    path:'/Detailcomingplaying',
    name:'detailcomingplaying',
    component:Detailcomingplaying,
    beforeEnter:function(to,from,next){
      if(from.path.indexOf("/home")!=-1){
        next();
      }else{
        next("home/Complaying");
      }
    },
  },
  {
    path:'/shop',
    name:'shop',
    component:shop,
    beforeEnter:function(to,from,next){
      if(from.path.indexOf("Detailnowplaying")!=-1||from.path.indexOf("Cinema")!=-1){
        next();
      }else{
        next("Detailnowplaying");
      }
    },
  },
  {
    path:'/xuanzuo',
    name:'xuanzuo',
    component:xuanzuo,
    beforeEnter:function(to,from,next){
      if(from.path.indexOf("shop")!=-1){
        next();
      }else{
        next("Detailnowplaying");
      }
    },
  },
  {
    path:'/regist',
    component:regist
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'*',
    component:nofond,
  }
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
