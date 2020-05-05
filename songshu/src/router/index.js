import React from "react";

import Login from '../view/Login'
import Regist from '../view/Regist'
import OrderList from '../view/OrderList'
import ProductInfo from '../view/ProductInfo'
import ProductList from '../view/ProductList'
import UserSetting from '../view/UserSetting'
import LoginRetrievePassword from '../view/LoginRetrievePassword'
import Article from '../view/Article'
import CollectionList from '../view/CollectionList'
import Error from '../view/Error'

import Home from '../view/Home'
import Index from '../view/Index'
import Categories from '../view/Categories'
import IntegraIIndex from '../view/IntegraIIndex'
import User from '../view/User'
import ShoppingCart from '../view/ShoppingCart'
import CartList from "../view/car/CartList";
import Header from "../components/fangdan/header";

import Search from "../view/Search";

export default [
  {
    path:'/carList',
    component:CartList,
  },
  {
    path:"/login",
    component:Login
  },{
    path:"/regist",
    component:Regist
  },{
    path:"/orderList",
    component:OrderList
  },{
    path:"/productInfo/:goodsId/:productId.html",
    component:ProductInfo
  },{
    // path:"/productList/:title/:url",
    path:"/productList",
    component:ProductList
  },{
    path:"/categories/search",
    component:Search,
  },{
    path:"/userSetting",
    component:UserSetting
  },{
    path:"/article",
    component:Article
  },{
    path:"/loginRetrievePassword",
    component:LoginRetrievePassword
  },{
    path:"/collectionList",
    component:CollectionList
  },{
    path:"/error",
    component:Error
  },{
    path:"/",
    component:Home,
    childrends:[{
      path:"/",
      component:Index,
      exact:true,
      navname:"首页",
      iconClass:"iconfont icon-shouye",
      childrends:[
        {
          path:"/",
          component:Header,
          exact:true
        }
      ]
    },{
      path:"/categories",
      component:Categories,
      navname:"分类",
      iconClass:"iconfont icon-leimupinleifenleileibie",
    },{
      path:"/integraIIndex",
      component:IntegraIIndex,
      navname:"松鼠币商城",
      iconClass:"iconfont icon-jifenshangchengb"
    },{
      path:"/shoppingCart",
      component:ShoppingCart,
      navname:"购物车",
      iconClass:"iconfont icon-gouwuche",
    },{
      path:"/user",
      component:User,
      navname:"个人中心",
      isAuthorization:true,
      iconClass:"iconfont icon-gerenzhongxin"
    },
    ]
  }
]