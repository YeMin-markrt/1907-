export default[
  {
    path:'/shopTypeList',
    name:"shopTypeList",
    component:()=>import ('../../views/shop/ShopTypeList')
  },
  {
    path:'/shopList',
    name:"shopList",
    component:()=>import ('../../views/shop/ShopList')
  }
]