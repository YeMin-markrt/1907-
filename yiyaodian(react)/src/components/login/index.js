import React, { Component } from 'react'
import '../regist/regist.scss'
import { observer,inject} from 'mobx-react';
import axios from 'axios';
import { message } from 'antd';

@inject("user")    
@observer
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      user:'手机号/邮箱',
      userpwd:"登录密码",
      usertip:"",
      userpwdtip:"",
      flagcuo1:true,
      flagcuo2:true,
      flagcuodui1:true,
      flagcuodui2:true,
    }
  }

  xiao1=()=>{
    this.setState({
      user:"",
      flagcuodui1:true
    })
  }
  xiao2=()=>{
    this.setState({
      userpwd:"",
      flagcuodui2:true
    },()=>{
      this.refs.pwd.type="password"
    })
  }

  changname=(e)=>{
    var usernameReg = /^[a-zA-Z_$\u4e00-\u9fa5][0-9a-zA-Z_$\u4e00-\u9fa5]{5,11}$/;
    var temp=e.target.value
    if(usernameReg.test(temp)){
      this.setState({
        user:temp,
        flagcuodui1:false,
        flagcuo1:false
      })
    }else{
      this.setState({
        user:temp,
        flagcuo1:false,
        flagcuodui1:true,
      })
    }
  }

  changpwd=(e)=>{
    var pwdReg = /^[\w$]{6,20}$/;
    var temp=e.target.value
    if(!temp){
      e.target.type="password"
    }
    if(pwdReg.test(temp)){
      this.setState({
        userpwd:temp,
        flagcuodui2:false,
        flagcuo3:false
      })
    }else{
      this.setState({
        userpwd:temp,
        flagcuo2:false,
        flagcuodui2:true,
      })
    }
  }

  userlogin=()=>{
    if((!this.state.flagcuodui1)&&(!this.state.flagcuodui2)){
      axios.get(`http://yemin.gz01.bdysite.com/yihaodianya/php/login.php?count=${this.state.user}&pwd=${this.state.userpwd}`).then(res=>{
        if(res.data.status){
          this.setState({
            userpwdtip:""
          },()=>{
            message.success(`${res.data.msg}`) 
            var  userinfo = {
              username:this.state.user,
              usergoods:[],
              userlike:[],
              userjiesuan:[],
              userallbuy:[],
              userallprice:'',
              userallNum:'',
              date :new Date()//数据存放的时间
            }
          window.localStorage.setItem("userinfo",JSON.stringify(userinfo));   
          this.props.history.push("/home") 
          })          
        }else{
          this.setState({
            userpwdtip:res.data.msg
          })
        }
      })
    }
  }
  registya=()=>{
    this.props.history.push("/regist") 
  }
  tui=()=>{
    this.props.history.go(-1) 
  }
  render() {
    let {user,userpwd,flagcuo1,flagcuo2,flagcuodui1,flagcuodui2,usertip,userpwdtip}=this.state
    let {imgqq,imgbaidu,imgzhi,imglang,imgyi}=this.props.user
    return (
      <div className="regist">
        <div className="regist_heder">
          <span className="iconfont icon-zuo regist_left" onClick={this.tui}></span>
          <span className="regist_right">登录</span>
        </div>
        <p className="regist_heder_guodu">新用户可通过快速登录注册账号</p>
        <div className="regist_body">
          <div className="regist_body_content">
            <li>
              <input type="text" name="username" value={user} onChange={this.changname}/><i className="iconfont icon-chahao" style={{display:flagcuo1?"none":"inline"}} onClick={this.xiao1}></i><i className="iconfont icon-chahao1" style={{display:flagcuodui1?"none":"inline"}}></i>
           </li>
            <li className="tip">{usertip}</li>
          </div>
          <div className="regist_body_content">
            <li>
            <input type="type"  name="userpwd" value={userpwd} onChange={this.changpwd} ref="pwd"/><i className="iconfont icon-chahao" style={{display:flagcuo2?"none":"inline"}} onClick={this.xiao2}></i><i className="iconfont icon-chahao1" style={{display:flagcuodui2?"none":"inline"}}></i>
            </li>
            <li className="tip">{userpwdtip}</li>
          </div>
          <button type="button" className={(!flagcuodui1)&&(!flagcuodui2)?"activebtn":"regist_btn"} onClick={this.userlogin}>登录</button>

          <div className="account-jump-bar">
            <a onClick={this.registya}>注册新用户</a><span className="fenge">|</span><a >找回密码</a>
          </div>

          <div className="regist_bottom">
            <div className="regist_bottom_header">
              <span></span>用其他方式登录<span></span>
            </div>
            <div className="regist_bottom_content">
              <li><img  src={imgqq} alt="图片损坏"/></li>
              <li><img  src={imgbaidu} alt="图片损坏"/></li>
              <li><img  src={imgzhi} alt="图片损坏"/></li>
              <li><img  src={imglang} alt="图片损坏"/></li>
              <li><img  src={imgyi} alt="图片损坏"/></li>
            </div> <div className="agree_item">登录即代表您已同意<span className="clasue-text">1药网
              <a className="xieyi">《服务协议》</a>和<a className="xieyi">《隐私条款》</a></span></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Login 