import React, { Component } from 'react'
import { observer,inject} from 'mobx-react';
import './goodslist.scss'

@inject("detail")   
 class Goodslist2 extends Component {

  componentDidMount(){
    this.props.detail.getgoodslist(this.props.match.params.id,this.props.match.params.name)  
  }
  tui=()=>{
    this.props.history.go(-1) 
  }

  hio=()=>{
    this.props.history.push('/home') 
  }

  goodsdetail=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
   }
  render() { 
    let {goodsneed}=this.props.detail
    return (
      <div className="goodslist">
        <div className="goodslist_heder">
          <span className="iconfont icon-zuo goodslist_left" onClick={this.tui}></span>
          <span className="goodslist_right">商品列表</span>
          <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
        </div>
        <div className="find_img">
          <img  src="http://m.111.com.cn/yyw/wap/category/static/img/categorie_bannr.de2a6a8.png" alt="图片损坏"/>
        </div>
        <div className="goodslist_content">
          {
            (goodsneed||[]).map(item=>{
              return <li key={item.itemId} className="goodslist_goods" onClick={this.goodsdetail.bind(this,item.itemId)}>
                <p className="grab_content_left"><img src={item.img} alt="图片损坏"/></p>
                <div className="grab_content_right">
                  <p className="grab_content_title">{item.byName}</p>
                  <p className="grab_content_num">{item.name}</p>
                  <p className="grab_content_price">¥{item.marketPrice}</p>
                  <div className="grab_content_bottom">
                      <div className="gou">立即购买</div>
                  </div> 
                </div>
              </li>
            })      
          }
        </div>
      </div>
    )
  }
}

export default Goodslist2
