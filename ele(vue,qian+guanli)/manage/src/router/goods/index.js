import GoodsTypeList from "../../views/goods/GoodsTypeList";
export default [
    {
        name:"goodsTypeList",
        path:"/goodsTypeList",
        component:GoodsTypeList
    },
    {
        name:"GoodsList",
        path:"/goodsList",
        component:()=>import ('../../views/goods/GoodsList')
    }
]