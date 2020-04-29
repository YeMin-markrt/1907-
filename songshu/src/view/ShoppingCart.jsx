import React, { Component } from 'react'
import "../assets/css/wk/w_shopCar.css"
import yes from "../assets/img/wk/true.png";
import no from "../assets/img/wk/false.png"
export default class ShoppingCart extends Component {
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
            <p>
                去凑单
                <span className={"iconfont icon-gouwuche"}></span>
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
                          <button>-</button>
                          <input type="text" value={"1"}/>
                          <button>+</button>
                      </div>
                  </div>
              </div>
          </div>
      </>
    )
  }
}
