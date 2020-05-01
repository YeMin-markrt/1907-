import React, { Component } from 'react'
import style from "../assets/css/wk/productInfo.module.css"
export default class ProductInfo extends Component {
  render() {
    return (
      <>
        <div className={style.product_all}>
          <div className={style.w_header_top}>
            <span onClick={()=>{this.props.history.go(-1)}} className={" iconfont icon-zuo"} >
            </span>
            <p>商品详情</p>
            <span></span>
          </div>
          <div className={style.product_info}>
            <div className={style.slider_box}>
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/e363b543d4760f44deafbc5a1b9a5873_800x800.jpg" alt=""/>
              <div></div>
            </div>
            <div className={style.info_box}>
              <p>抖胃味_猪尾香辣味120g</p>
              <div>
                <span>22.90 <i>60.00</i></span>
                <strong>总销量&nbsp;&nbsp;0</strong>
              </div>
            </div>
          </div>
        </div>
      {/*  松鼠推荐*/}
      <div className={style.product_tui}>
          <p className={style.recommend_title}>松鼠推荐</p>
        <div className={style.recommendGoods}>
          <ul className={style.item_cont}>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
            <li>
              <div className={style.item_img}>
                <img src="http://pic10.cdn.3songshu.com:81//assets/upload/product/587e6517ebd7e49094045868e2d0a439_380x380.jpg" alt=""/>
              </div>
              <p className={style.item_title}>牛奶冻（黑米味）210g</p>
              <p className={style.item_title_ng}>Q弹mix黑米泡泡酱</p>
              <p className={style.item_price}><span>4.90</span><i>15.00</i></p>
            </li>
          </ul>
        </div>
      </div>
          {/*底部导航*/}
          <div>
            <ul className={style.footer_bar}>
              <li>
                <span className={"iconfont icon-gouwuche"}></span>
                <p>购物车</p>
              </li>
              <li>
                <span className={"iconfont icon-shoucang"}></span>
                <p>收藏</p>
              </li>
              <li>
                加入购物车
              </li>
              <li>
                立即购买
              </li>
            </ul>
          </div>

      </>
    )
  }
}
