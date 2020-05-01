import React, { Component } from 'react'
import "../assets/css/wk/w_shopCar.css"
import yes from "../assets/img/wk/true.png";
import no from "../assets/img/wk/false.png"
export default class ShoppingCart extends Component {
    constructor() {
        super();
        this.state={
            num:1
        };
    };

  render() {

    return (
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
            <p onClick={()=>{this.props.history.push('/carList')}}>
                去凑单
                <span  className={"iconfont icon-gantanhao"}></span>
            </p>
        </div>
          <div className={"w_item_common"}>
                <div>
                    <img src={no}  alt=""/>
                </div>
              <div className={"w_item_content"}>
                  <div className={"imgbox"}>
                      <img src={"http://pic10.cdn.3songshu.com:81//assets/upload/product/b4202fe3d5c0929d2d8fa5571913fa60_200x200.jpg"} alt=""/>
                  </div>
                  <div className={"w_item2"}>
                      <p>每日坚果750g/30天装</p>
                      <p>119.00</p>
                      <div className={"w_inp"}>
                          <input className={"button"} type="button" value={"-"}/>
                          <input type="text" defaultValue= {this.state.num} />
                          <input className={"button"} type="button" value={"+"}/>

                      </div>
                  </div>
              </div>
          </div>
          <div className={"w_footer_bar"}>
              <div>
                  <img src={no} alt=""/>
                  全选
              </div>
              <div className={"w_foot_right"}>
                  <div className={"w_foot_total"}>
                      <p>应付:<strong>0.00</strong>   </p>
                      <p>总价:<i>0.00</i> <span>优惠:<i>0.00</i></span></p>
                  </div>
              </div>
              <div className={"w_foot_pay"}>
                  去结算
              </div>
          </div>
      </>
    )
  }
}
