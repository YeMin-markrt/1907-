import React, { Component } from 'react'
import './set.scss'

export default class Set extends Component {

  componentDidMount(){
    if(!window.localStorage.getItem("userinfo")){
      this.props.history.push('/login')
    }
  }

  tui=()=>{
    this.props.history.go(-1) 
  }

  hio=()=>{
    this.props.history.push('/home') 
  }

  buye=()=>{
    window.localStorage.removeItem("userinfo");
    window.location.reload();
  }
  render() {
    return (
      <div className="set">
        <div className="goodslist_heder">
          <span className="iconfont icon-zuo goodslist_left" onClick={this.tui}></span>
          <span className="goodslist_right">设置</span>
          <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
        </div>
        <div className="mycount">
          <div className="mycount_content_top">
            <li className="myset_top">
              <span className="myset_left">地址管理</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
            <li className="myset_top">
              <span className="myset_left">账号管理</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
            <li className="myset_top">
              <span className="myset_left">证件管理</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
          </div>

          <div className="mycount_content_bottom">
            <li className="myset_top">
              <span className="myset_left">意见反馈</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
            <li className="myset_top">
              <span className="myset_left">联系客服</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
            <li className="myset_top">
              <span className="myset_left">经营资质</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
            <li className="myset_top">
              <span className="myset_left">关于我们</span><span className="iconfont icon-zuo1 myset_right"></span>
            </li>
          </div>


          <div className="tuiche" onClick={this.buye}>退出当前账户</div>
        </div>

      </div>
    )
  }
}
