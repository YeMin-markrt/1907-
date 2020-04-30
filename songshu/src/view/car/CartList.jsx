import React, {Component} from 'react';
import style from "../../assets/css/wk/cartList.module.css"
export default class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }

    render() {
        return (
            <>
                <div className={style.car_all}>
                    <div className={style.header_bar}>
                        <span onClick={()=>{this.props.history.go(-1)}} className={"iconfont icon-zuo"}></span>
                        <div className={style.search}>
                            <span className={"iconfont icon-sousuo"}></span>
                            <input type="text" placeholder={"好吃的零食都在这~"}/>
                        </div>
                        <p>搜索</p>
                    </div>
                    <div className={style.list_filter}>
                        <button>新品</button>
                        <button>热卖</button>
                        <button>价格<i></i></button>
                    </div>
                </div>
                <div className={style.product_block}>
                    <div className={style.item_cont}>
                        <div className={style.item_img}>
                            <img src={"http://pic10.cdn.3songshu.com:81//assets/upload/product/e497b2e1e50218843a96eb627f456315_380x380.jpg"} alt=""/>

                        </div>
                        <p>美栗甘栗仁 100gx2袋</p>
                        <div className={style.item_price}>
                            <p ><span>19.90</span><i>50.00</i></p>
                            <strong className={"iconfont icon-gouwuche" }></strong>
                        </div>
                    </div>
                    <div className={style.item_cont}>
                        <div className={style.item_img}>
                            <img src={"http://pic10.cdn.3songshu.com:81//assets/upload/product/e497b2e1e50218843a96eb627f456315_380x380.jpg"} alt=""/>

                        </div>
                        <p>美栗甘栗仁 100gx2袋</p>
                        <div className={style.item_price}>
                            <p ><span>19.90</span><i>50.00</i></p>
                            <strong className={"iconfont icon-gouwuche" }></strong>
                        </div>
                    </div>
                    <div className={style.item_cont}>
                        <div className={style.item_img}>
                            <img src={"http://pic10.cdn.3songshu.com:81//assets/upload/product/e497b2e1e50218843a96eb627f456315_380x380.jpg"} alt=""/>

                        </div>
                        <p>美栗甘栗仁 100gx2袋</p>
                        <div className={style.item_price}>
                            <p ><span>19.90</span><i>50.00</i></p>
                            <strong className={"iconfont icon-gouwuche" }></strong>
                        </div>
                    </div>
                </div>

                <div className={style.button_car}>
                    <span className={"iconfont icon-gouwuche" }></span>
                    <i>1</i>
                </div>
                <div className={style.button_btn}>
                    <div className={style.button_top}>
                    <p className={"iconfont icon-arrow-top"}></p>
                        <p>顶部</p>
                    </div>
                    <div className={style.button_section}>
                        <span className={"iconfont icon-zaixiankefu"}></span>
                    </div>
                </div>
            </>
        )
    }
}