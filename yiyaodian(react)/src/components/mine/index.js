import React, { Component } from 'react'
import './mine.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default class Mine extends Component {
  constructor(props){
    super(props)
    this.state={
      username:"",
      flagname:true,
    }
  }

  componentDidMount(){
    if(window.localStorage.getItem("userinfo")){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      var  nowDate =  new Date(); //请求的时间
      var  startDate = new Date(data.date);//存放的时间
      var allTimes = nowDate - startDate;
      if(allTimes>=1000*60*60*72){
        window.localStorage.removeItem("userinfo");
        }else{
          this.setState({
            username:data.username,
            flagname:false
          })
        }
    }
  }

  tui=()=>{
    this.props.history.push("/set") 
  }

  mylogin=()=>{
    this.props.history.push("/login") 
  }

  myregist=()=>{
    this.props.history.push("/regist") 
  }

  mylike=()=>{
    this.props.history.push("/mylike") 
  }

  allbuy=()=>{
    this.props.history.push("/allbuy") 
  }

  paymoney=()=>{
    this.props.history.push("/paymoney") 
  }
  render() {
    let {username,flagname}=this.state
    return (
      <div className="mine">
        {/* 顶部 */}
        <div className="main_header">
          <span className="main_header_left"><i className="iconfont icon-location"></i>湖北</span>
          <span className="main_header_right" onClick={this.tui}>设置</span>
          <div className="main_content">
              <div className="main_content_top">
                <Avatar className="touxiang" size={64} icon={<UserOutlined />} />
                <p className="main_content_right" style={{display:flagname?"block":'none'}}><span onClick={this.mylogin}>登录</span>/<span onClick={this.myregist}>注册</span><i className="iconfont icon-zuo1"></i></p>
                <p className="main_content_right" style={{display:!flagname?"block":'none'}}>{username}</p>
                <div className="main_content_bottom">
                  <li className="main_content_fen">
                    <p>0.00<span className="bian">元</span></p>
                    <p className="bian">余额</p>
                  </li>
                  <li>
                    <p>0<span className="bian">张</span></p>
                    <p className="bian">优惠券</p>
                  </li>
                </div>
              </div>
          </div>
        </div>
        {/* 中间部分 */}
        <div className="mine_mian">
          <div className="myorder"> 
              <div className="myorder_header">
                <span className="myorder_header_left">我的订单</span>
                <span className="myorder_header_right">查看全部<i className="iconfont icon-zuo1"></i></span>
              </div>
              <div className="myorder_content">
                <li onClick={this.paymoney}>
                  <p className="myorder_content_top"><i className="iconfont icon-daifukuan1"></i></p>
                  <p>待付款</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-daishouhuo1"></i></p>
                  <p>待发货</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-daishouhuo1"></i></p>
                  <p>待收货</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-daipingjia"></i></p>
                  <p>待评价</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-querentuikuan"></i></p>
                  <p>退换货</p>
                </li>
              </div>   
          </div>


          <div className="myorder myorder_serve"> 
              <div className="myorder_header"><span className="myorder_header_left">我的服务</span></div>
              <div className="myorder_content">
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-jiankangdangan"></i></p>
                  <p>健康档案</p>
                </li>
                <li onClick={this.allbuy}>
                  <p className="myorder_content_top"><i className="iconfont icon-kanguo-copy"></i></p>
                  <p>看过买过</p>
                </li>
                <li onClick={this.mylike}>
                  <p className="myorder_content_top"><i className="iconfont icon-shoucang"></i></p>
                  <p >我的收藏</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-lianxikefu"></i></p>
                  <p>联系客服</p>
                </li>
              </div>
          </div>

          <div className="find_img">
            <img  src="http://m.111.com.cn/yyw/wap/category/static/img/categorie_bannr.de2a6a8.png" alt="图片损坏"/>
          </div>

          <div className="myorderyao"> <span className="myorder_header_left">专属药师</span></div>
          <div className="myorder myorder_serve"> 
              <div className="myorder_header"><span className="myorder_header_left">福利中心</span></div>
              <div className="myorder_content">
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-lingjuanzhongxin"></i></p>
                  <p>领劵中心</p>
                </li>
                <li>
                  <p className="myorder_content_top"><i className="iconfont icon-jianglijin"></i></p>
                  <p>领奖励金</p>
                </li>
              </div>
          </div>

        </div>
      </div>
    )
  }
}
