export default[
  {
    path:'/',
    name:"adminLog",
    component:()=>import ('../../views/admin/AdminLog')
  },
  {
    path:'/adminList',
    name:"adminList",
    component:()=>import ('../../views/admin/AdminList')
  },
  {
    path:'/upPassWord',
    name:"upPassWord",
    component:()=>import ('../../views/admin/UpPassWord')
  }
]