import React, { Component } from 'react'
import "../assets/css/wk/w_shopCar.css"
import yes from "../assets/img/wk/true.png";
import no from "../assets/img/wk/false.png";
import noGoods from "../assets/img/noGoods.png"
import loading from "../components/common/Loading"
class ShoppingCart extends Component {

    constructor() {
        super();
        this.isChecked = true;
        this.state = {
            carInfo: [],
            isLoading: true
        };

    };
    //更改选中状态
    async changeIsChecked(carId, e) {
        e.stopPropagation()
        const data2 = await this.$axios.get("/api/changeIsChecked", {
            params: {
                carId
            }
        })

        if (data2.ok === 1) {
            this.setState({
                carInfo: data2.carList
            })
        } else {
            alert("网络错误")
        }
    }
    //全选和反选
    async changeAllIsChecked() {
        const data3 = await this.$axios.get("/api/changeAllIsChecked", {
            params: {
                userName: localStorage.userName,
                isChecked: !this.isChecked
            }
        })
        if (data3.ok === 1) {
            this.setState({
                carInfo: data3.carList
            })
        }

    }
    //数量加
    async addGoods(goodsAll, e) {
        e.stopPropagation();
        const goods = await this.$axios.get("/api/joinCar", {
            params: {
                goodsAll,
                userName: localStorage.userName
            }
        })
        // console.log(goods)
        if (goods.ok === 1) {
            let total = 0;
            goods.carList.forEach(v => {
                total += v.buyNum
            })
            this.setState({
                buyNum: total
            })
            localStorage.buyNum = total;
            this.getCar()
        } else {
            alert("库存不足")
        }
    }
    //数量减
    async removeCar(defaultGoodsId, e) {
        e.stopPropagation()
        const data = await this.$axios.get("/api/moveCar", {
            params: {
                userName: localStorage.userName,
                defaultGoodsId
            }
        })
        if (data.ok === 1) {
            this.setState({
                carInfo: data.carList
            })
        }
    }
    async getCar() {
        this.setState({
            isLoading: true
        })
        const data = await this.$axios.get("/api/getCar")
        // console.log(data)
        if (data.ok === 1) {
            this.setState({
                carInfo: data.carInfo,
                isLoading: false
            })
        }
    }
    async componentDidMount() {
        this.getCar()


    }
    componentWillUnmount() {
        if (this.state.carInfo.length <= 0) {
            localStorage.removeItem("buyNum")
        }
    }


    render() {
        const { carInfo } = this.state;

        let sumPrice = 0;
        this.isChecked = true;
        const carListArr = carInfo.map(v => {
            if (v.isChecked) {
                sumPrice += v.buyNum * v.salesPrice.value;
            } else {
                this.isChecked = false;
            }
            return (

                <div onClick={() => { this.props.history.push('/productInfo/' + v.defaultGoodsId + "/" + v.id + '.html') }} className={"w_item_common"} key={v._id}>
                    <div>
                        <img onClick={this.changeIsChecked.bind(this, v._id)} src={(v.isChecked ? yes : no)} alt="" />
                    </div>
                    <div className={"w_item_content"}>
                        <div className={"imgbox"}>
                            <img src={v.pic} alt="" />
                        </div>
                        <div className={"w_item2"}>
                            <p>{v.name}</p>
                            <p>{v.salesPrice.value}</p>
                            <div className={"w_inp"}>
                                <input onClick={this.removeCar.bind(this, v.defaultGoodsId)} className={v.buyNum <= 1 ? "button button1" : "button"} type="button" value={"-"} />
                                <input type="text" value={v.buyNum} onClick={(e) => e.stopPropagation()} readOnly />
                                <input onClick={this.addGoods.bind(this, v)} className={"button"} type="button" value={"+"} />

                            </div>
                        </div>
                    </div>
                </div>

            )
        })
        let carListRender = (
            <>
                <div className={"w_header_top"}>
                    <span onClick={() => { this.props.history.go(-1) }} className={" iconfont icon-zuo"}>

                    </span>
                    <p>购物车</p>
                    <span>编辑</span>
                </div>
                <div className="w_rule">
                    {
                        39.00 - sumPrice <= 0 ? <p>满39元免运费</p> : <p>满39元免运费，还差{(39 - sumPrice).toFixed(2)}元</p>
                    }
                    {
                        39.00 - sumPrice <= 0 ?
                            (<p style={{ color: '#262626' }}>已免运费
                                <span className={"iconfont icon-gantanhao"}></span>
                            </p>) :
                            (<p onClick={() => { this.props.history.push('/carList') }}>
                                去凑单
                                <span className={"iconfont icon-gantanhao"}></span>
                            </p>)
                    }

                </div>
                <div className={"w_item_count"}>
                    {
                        this.state.carInfo.length > 0 ? carListArr : <img src={noGoods} alt="" />
                    }
                </div>


                <div className={"w_footer_bar"}>
                    <div>
                        {
                            this.state.carInfo.length > 0 ? <img onClick={this.changeAllIsChecked.bind(this)} src={this.isChecked ? yes : no} alt="" /> : <img src={no} alt="" />
                        }
                        全选
                    </div>
                    <div className={"w_foot_right"}>
                        <div className={"w_foot_total"}>
                            <p>应付:<strong>{sumPrice.toFixed(2)}</strong>   </p>
                            <p>总价:<i>{sumPrice.toFixed(2)}</i> <span>优惠:<i>0.00</i></span></p>
                        </div>
                    </div>
                    <div className={this.isChecked ? "w_foot_pay2" : "w_foot_pay"}>
                        去结算
                    </div>
                </div>
            </>

        )

        return (
            <>
                {
                    carListRender
                }
            </>

        )
    }
}
export default loading(ShoppingCart)