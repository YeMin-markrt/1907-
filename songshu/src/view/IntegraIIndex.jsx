import React, { Component } from 'react'
import '../assets/css/yemin/shopping.scss'
export default class IntegraIIndex extends Component {
  render() {
    return (
      <div className="shoping">
        <div className="shop_header">松鼠币商城</div>
        <div className="user-content">
          <p className="my_money">我的松鼠币</p>
          <p className="my_money_number">
            <span className="my_money_span1">0</span>
            <span className="my_money_span2"></span>
          </p>
          <button className="getmoney">赚松鼠币</button>
        </div>
        <div className="my_shop">
          <p className="my_shop_content shop_content">
            <img src="http://m.3songshu.com/resources/images/icon-bag@2x.709b32f7.png" alt=""/>
            <p className="my_shop_content_inner">
              <span className="my_shop_content_top">购物袋</span>
              <span className="my_shop_content_bottom">想要的都在这</span>
            </p>
          </p>
          <p className="my_shop_content">
            <img src="http://m.3songshu.com/resources/images/icon-change-list@2x.d419099a.png" alt=""/>
            <p className="my_shop_content_inner">
              <span className="my_shop_content_top">我的兑换</span>
              <span className="my_shop_content_bottom">查看松鼠币兑换订单</span>
            </p>
          </p>
        </div>
        <div class="floor-item-title">兑换中心1</div>
        <div className="dui_goods">
          <li  className="dui_goods_content">
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/couponDef/39e6e2951070da227b21fdd04fb153a1.jpg" alt=""/>
              <p className="title">【会员福利券】满39减2元</p>
              <p className="rules">每人限兑 10000 件</p>
              <p className="number"><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>100</p>
          </li>
          <li  className="dui_goods_content">
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/couponDef/39e6e2951070da227b21fdd04fb153a1.jpg" alt=""/>
              <p className="title">【会员福利券】满39减2元</p>
              <p className="rules">每人限兑 10000 件</p>
              <p className="number"><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>100</p>
          </li>
          <li  className="dui_goods_content">
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/couponDef/39e6e2951070da227b21fdd04fb153a1.jpg" alt=""/>
              <p className="title">【会员福利券】满39减2元</p>
              <p className="rules">每人限兑 10000 件</p>
              <p className="number"><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>100</p>
          </li>
          <li  className="dui_goods_content">
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/couponDef/39e6e2951070da227b21fdd04fb153a1.jpg" alt=""/>
              <p className="title">【会员福利券】满39减2元</p>
              <p className="rules">每人限兑 10000 件</p>
              <p className="number"><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>100</p>
          </li>
        </div>
      </div>
    )
  }
}
