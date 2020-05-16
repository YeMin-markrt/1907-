import cartType from "../../../actionType/wk/cartList"
export function CreateCartList(payload) {
    return {
        type:cartType.GET_CARTLIST,
        payload
    }
}
export default {
    joinCarList(page=1,index=0,order=5,keyword=""){
        return async(dispatch)=>{
            const {data} = await this.$axios({
                url:"/songshu/mobile/api/product/search",
                headers:{"appkey":"ef1fc57c13007e33"},
                params:{
                    param:{"keyword":keyword,"order":order,"pageCount":12,"page":page}
                }
            });
            this.setState({
                index,
                isLoading:true
            })
            // console.log(data)
            dispatch(CreateCartList(data.items))
            this.setState({
                isLoading:false
            })
        }

    },
    addCarList(goodsAll){
        return async()=>{
            //console.log(goodsAll)
            const goods = await this.$axios.get("/api/joinCar",{
                params:{
                    goodsAll,
                    userName:localStorage.userName
                }
            })
            // console.log(goods)
            if(goods.ok===1){
                let total = 0;
                goods.carList.forEach(v=>{
                    total+= v.buyNum
                })
                this.setState({
                    buyNum:total
                })
                localStorage.buyNum = total;
            }else{
                alert("库存不足")
            }
        }
    }
}