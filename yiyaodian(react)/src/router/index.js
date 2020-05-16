import React,{Component} from 'react'
import Loadable from 'react-loadable' //异步加载组件

var Main=Loadable({
  loader:()=>import('../components/main'),
  loading:()=><div>loading...</div>
})

var Found=Loadable({
  loader:()=>import('../components/found'),
  loading:()=><div>loading...</div>
})

var Drug=Loadable({
  loader:()=>import('../components/drug'),
  loading:()=><div>loading...</div>
})

var Shop=Loadable({
  loader:()=>import('../components/shop'),
  loading:()=><div>loading...</div>
})

var Mine=Loadable({
  loader:()=>import('../components/mine'),
  loading:()=><div>loading...</div>
})

var NoFound=Loadable({
  loader:()=>import('../components/nofound'),
  loading:()=><div>loading...</div>
})

var Regist=Loadable({
  loader:()=>import('../components/regist'),
  loading:()=><div>loading...</div>
})

var Login=Loadable({
  loader:()=>import('../components/login'),
  loading:()=><div>loading...</div>
})

var Goodslist=Loadable({
  loader:()=>import('../components/goodslist'),
  loading:()=><div>loading...</div>
})

var Goodslist1=Loadable({
  loader:()=>import('../components/goodslist/goodslist1'),
  loading:()=><div>loading...</div>
})

var Goodslist2=Loadable({
  loader:()=>import('../components/goodslist/goodslist2'),
  loading:()=><div>loading...</div>
})

var GoodsDetail=Loadable({
  loader:()=>import('../components/goodsdetail'),
  loading:()=><div>loading...</div>
})

var Payprice=Loadable({
  loader:()=>import('../components/paymoney'),
  loading:()=><div>loading...</div>
})

var Mylike=Loadable({
  loader:()=>import('../components/mylike'),
  loading:()=><div>loading...</div>
})

var Allbuy=Loadable({
  loader:()=>import('../components/allbuy'),
  loading:()=><div>loading...</div>
})

var Sets=Loadable({
  loader:()=>import('../components/set'),
  loading:()=><div>loading...</div>
})
//一级路由
export const routes=[
  {
    path:'/home',
    component:Main,
    name:"首页",
    icontype:"iconfont icon-shangdian_huaban"
  },
  {
    path:'/found',
    component:Found,
    name:"找药",
    icontype:"iconfont icon-zhaoyaoshi"
  },
  {
    path:'/drug',
    component:Drug,
    name:"抗病毒"
  },
  {
    path:'/shop',
    component:Shop,
    name:"购物车",
    icontype:"iconfont icon-gouwuche"
  },
  {
    path:'/mine',
    component:Mine,
    name:"我的",
    icontype:"iconfont icon-wode"
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/regist',
    component:Regist,
  },
  {
    path:'/mylike',
    component:Mylike,
  },
  {
    path:'/allbuy',
    component:Allbuy,
  },
  {
    path:'/goodslist',
    component:Goodslist,
  },
  {
    path:'/goodslist1/:id',
    component:Goodslist1,
  },
  {
    path:'/goodsdetail/:id',
    component:GoodsDetail,
  },
  {
    path:'/goodslist2/:id/:name',
    component:Goodslist2,
  },
  {
    path:'/paymoney',
    component:Payprice,
  },
  {
    path:'/set',
    component:Sets,
  },
  {
    path:'/nofound',
    component:NoFound
  }
]