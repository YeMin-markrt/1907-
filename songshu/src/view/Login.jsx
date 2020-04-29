import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/yemin.scss'
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      src1:"http://m.3songshu.com/resources/images/login-pwd-blur.5f488ea3.png",
      src2:"http://m.3songshu.com/resources/images/login-pwd-focus.6ed81267.png",
      src:"http://m.3songshu.com/resources/images/login-pwd-blur.5f488ea3.png",
      userTel:"手机号",
      userPwd:"请输入密码",
    }
  }
  changeImg(){
    setInterval(()=>{
      if(this.state.src===this.state.src1){
        this.setState({
          src:this.state.src2
        })
      }else if(this.state.src===this.state.src2){
        this.setState({
          src:this.state.src1
        })
      }
    },3000)
  }
  componentDidMount(){
    this.changeImg();
  }
  render() {
    const {src,userTel,userPwd}=this.state
    return (
      <div>
        <Header title="登录" ></Header>
        <div className="login">
          <div className="header_img">
            <img src={src} alt=""/>
          </div>

          <div className="login_input">
           <p><i className="iconfont icon-wode"></i><input type="text" name="" id="" value={userTel}/></p>
           <p><i className="iconfont icon-mima"></i><input type="text" name="" id="" value={userPwd}/></p>
          </div>
          <button className="btn_login">登录</button>
          <p className="login_bottom"><span className="login_bottom_span1" onClick={()=>{this.props.history.push("/regist")}}>快速注册</span><span className="login_bottom_span2" onClick={()=>{this.props.history.push("/loginRetrievePassword")}}>忘记密码？</span></p>
        </div>
      </div>
    )
  }
}
