import React, { Component } from 'react'
import '../paymoney/paymoney.scss'
export default class Allbuy extends Component {
  constructor(props){
    super(props)
    this.state={
      userlist:[],
    }
  }

  componentDidMount(){
    if(window.localStorage.getItem("userinfo")){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      this.setState({
        userlist:data.userallbuy,
      })
    }else{
      this.props.history.push('/login')
    }
  }

  tui=()=>{
    this.props.history.go(-1) 
  }

  tiaoshou=()=>{
    this.props.history.push('/paymoney')
  }

  hio=()=>{
    this.props.history.push('/home') 
  }
  render() {
    let {userlist}=this.state
    return (
      <div className="paymomey">
        <div className="regist_heder">
            <span className="iconfont icon-zuo regist_left" onClick={this.tui}></span>
            <span className="regist_right">看过买过</span>
            <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
          </div> 
          <div className="paycontent">
          <div className="usr_shop"  style={{display:userlist.length==0?"none":'block'}}>
          <div  className="usr_shop_header">壹号大药房</div>
          {
            (userlist||[]).map((item,index)=>{
              return <li className="usermai" key={item.id}>
              <div className="usermai_2">
                <img src={item.img} alt="图片损坏"/>
              </div>
              <div className="usermai_3">
                <p className="usermai_3_title">{item.name}</p>
                <p className="usermai_3_rule">{item.guige}</p>
                <div className="usermai_3_bottom"><span className="usermai_3_price">¥{item.price}</span><p className="usr_num">X{item.num}</p></div>
              </div>
          </li>
            })
          }
        </div>
        <div style={{display:userlist.length==0?"block":'none'}} className="nogoods">
          <p className="iconfont icon-gouwuche"></p>
          <p className="">不存在购物记录</p>
          <p className=""><span onClick={this.tiaoshou}>去购买</span></p>
        </div>
          </div>

      </div>
    )
  }
}
