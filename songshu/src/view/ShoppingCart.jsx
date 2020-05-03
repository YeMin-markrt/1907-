import React, { Component } from 'react'
import "../assets/css/wk/w_shopCar.css"
import yes from "../assets/img/wk/true.png";
import no from "../assets/img/wk/false.png"
export default class ShoppingCart extends Component {
    constructor() {
        super();
        this.isChecked = true;
        this.state = {
            // num:1,
            carInfo: []
        };

    };
    //更改选中状态
    async changeIsChecked(carId) {
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
    async componentDidMount() {
        if (this.state.carInfo.length > 0) {
            return false
        } else {
            const data = await this.$axios.get("/api/getCar")
            console.log(data)
            if (data.ok === 1) {
                this.setState({
                    carInfo: data.carInfo
                })
            }
        }

    }

    render() {
        const { carInfo } = this.state;

        let sumPrice = 0;
        this.isChecked = true;
        const carListArr = carInfo.map(v => {
            if (v.isChecked) {
                sumPrice += v.buyNum * v.salesPrice;
            } else {
                this.isChecked = false;
            }
            return (

                <div className={"w_item_common"} key={v._id}>
                    <div>
                        <img onClick={this.changeIsChecked.bind(this, v._id)} src={(v.isChecked ? yes : no)} alt="" />
                    </div>
                    <div className={"w_item_content"}>
                        <div className={"imgbox"}>
                            <img src={v.pic} alt="" />
                        </div>
                        <div className={"w_item2"}>
                            <p>{v.name}</p>
                            <p>{v.salesPrice}</p>
                            <div className={"w_inp"}>
                                <input className={"button"} type="button" value={"-"} />
                                <input type="text" defaultValue={v.buyNum} />
                                <input className={"button"} type="button" value={"+"} />

                            </div>
                        </div>
                    </div>
                </div>

            )
        })
        let carListRender = (
            <>
                <div className={"w_header_top"}>
                    <span className={" iconfont icon-zuo"}>

                    </span>
                    <p>购物车</p>
                    <span>编辑</span>
                </div>
                <div className="w_rule">
                    <p>
                        满39元免运费，还差39.00元
                        </p>
                    <p onClick={() => { this.props.history.push('/carList') }}>
                        去凑单
                            <span className={"iconfont icon-gantanhao"}></span>
                    </p>
                </div>
                <div className={"w_item_count"}>
                    {
                        carListArr
                    }
                </div>


                <div className={"w_footer_bar"}>
                    <div>
                        <img onClick={this.changeAllIsChecked.bind(this)} src={this.isChecked ? yes : no} alt="" />
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
