import React, { Component } from 'react'
import './regist.scss'
import { observer,inject} from 'mobx-react';
import axios from 'axios';
import { message } from 'antd';

@inject("user")  
@inject("userdata")  
@observer
class Regist extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'请输入用户名',
      userphone:'请输入手机号',
      usercode:"",
      randomcode:"获取验证码",
      userpwd:"请输入密码",
      usernametip:"",
      userphonetip:'',
      userpwdtip:"",
      flagcode:false,
      flagcuo1:true,
      flagcuo2:true,
      flagcuo3:true,
      flagcuodui1:true,
      flagcuodui2:true,
      flagcuodui3:true,
    }
  }
  xiao1=()=>{
    this.setState({
      username:"",
      flagcuodui1:true
    })
  }
  xiao2=()=>{
    this.setState({
      userphone:"",
      flagcuodui2:true
    })
  }
  xiao3=()=>{
    this.setState({
      userpwd:"",
      flagcuodui3:true
    },()=>{
      this.refs.pwd.type="password"
    })
  }
  changname=(e)=>{
    var usernameReg = /^[a-zA-Z_$\u4e00-\u9fa5][0-9a-zA-Z_$\u4e00-\u9fa5]{5,11}$/;
    var temp=e.target.value
    if(usernameReg.test(temp)){
      this.setState({
        username:temp,
        usernametip:"",
        flagcuodui1:false,
        flagcuo1:false
      })
    }else{
      this.setState({
        username:temp,
        usernametip:"用户名不能以数字开头且长度需要在6-12位之间",
        flagcuo1:false,
        flagcuodui1:true,
      })
    }
  }

  changphone=(e)=>{
    var phoneReg= /^1[3456789]\d{9}$/;
    var temp=e.target.value
    if(phoneReg.test(temp)){
      this.setState({
        userphone:temp,
        userphonetip:"",
        flagcuodui2:false,
        flagcuo2:false
      })
    }else{
      this.setState({
        userphone:temp,
        userphonetip:"您输入的手机号码不合法",
        flagcuo2:false,
        flagcuodui2:true,
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
        userpwdtip:"",
        flagcuodui3:false,
        flagcuo3:false
      })
    }else{
      this.setState({
        userpwd:temp,
        userpwdtip:"密码长度需要在6-20位之间",
        flagcuo3:false,
        flagcuodui3:true,
      })
    }
  }

  randombirth=()=>{
    var str = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var res = '';
    for (var i = 0; i < 4; i++) {
      var index = Math.round(Math.random() * (str.length - 1));
      var char = str.charAt(index);
      res += char;
    }
      this.setState({
      randomcode:res
    })
  }

  changcode=(e)=>{
    var randomReg = new RegExp(this.state.usercode, "ig");
    var temp=e.target.value
    if(randomReg.test(temp)){
      this.setState({
        usercode:temp,
        flagcode:true
      })
    }else{
      this.setState({
        usercode:temp,
        flagcode:false
      })
    }
  }

  userregist=()=>{
    if(this.state.flagcode&&(!this.state.flagcuodui1)&&(!this.state.flagcuodui2)&&(!this.state.flagcuodui3)){
      axios.get(`http://yemin.gz01.bdysite.com/yihaodianya/php/regist.php?user=${this.state.username}&tel=${this.state.userphone}&pwd=${this.state.userpwd}`).then(res=>{
        if(res.data.status){
          message.success(`${res.data.msg}`)
          this.props.history.push("/login")       
        }else{
          message.warning(`${res.data.msg}`)
        }
      })
    }
   
  }

  tui=()=>{
    this.props.history.go(-1) 
  }
  render() {
    let {username,userphone,usercode,randomcode,userpwd,usernametip,userphonetip,userpwdtip,flagcuo1,flagcuo2,flagcuo3,flagcuodui1,flagcuodui2,flagcuodui3,flagcode}=this.state
    let {imgqq,imgbaidu,imgzhi,imglang,imgyi}=this.props.user
    return (
      <div className="regist">
        <div className="regist_heder">
          <span className="iconfont icon-zuo regist_left" onClick={this.tui}></span>
          <span className="regist_right">注册</span>
        </div>
        <p className="regist_heder_guodu">新用户可通过快速登录注册账号</p>
        <div className="regist_body">
          <div className="regist_body_content">
            <li>
              <input type="text" name="username" value={username} onChange={this.changname}/><i className="iconfont icon-chahao" style={{display:flagcuo1?"none":"inline"}} onClick={this.xiao1}></i><i className="iconfont icon-chahao1" style={{display:flagcuodui1?"none":"inline"}}></i>
            </li>
            <li className="tip">{usernametip}</li>
          </div>
          <div className="regist_body_content">
            <li>
              <input type="text" name="phone" value={userphone} onChange={this.changphone}/><i className="iconfont icon-chahao" style={{display:flagcuo2?"none":"inline"}} onClick={this.xiao2}></i><i className="iconfont icon-chahao1" style={{display:flagcuodui2?"none":"inline"}}></i>
            </li>
            <li className="tip">{userphonetip}</li>
          </div>
          <div className="regist_body_content">
            <li className="codeinput">
              <input type="text"name="random" value={usercode} onChange={this.changcode} />
              <span className="random" onClick={this.randombirth}>{randomcode}</span>
            </li>
          </div>  
          <div className="regist_body_content">
            <li>
              <input type="type"  name="userpwd" value={userpwd} onChange={this.changpwd} ref="pwd"/><i className="iconfont icon-chahao" style={{display:flagcuo3?"none":"inline"}} onClick={this.xiao3}></i><i className="iconfont icon-chahao1" style={{display:flagcuodui3?"none":"inline"}}></i>
            </li>
            <li className="tip">{userpwdtip}</li>
          </div>     
          <button type="button"  className={(flagcode&&(!flagcuodui1)&&(!flagcuodui2)&&(!flagcuodui3))?"activebtn":"regist_btn"} onClick={this.userregist} >注册</button>

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



export default  Regist 