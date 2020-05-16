import cartType from "../../../actionType/wk/cartList"
import cartList from "../../../state/wk/cartList"
export default function (state=cartList,{type,payload}) {
    state = JSON.parse(JSON.stringify(state));
    if(type===cartType.GET_CARTLIST){
        state.items = payload;
    }
    return state
}