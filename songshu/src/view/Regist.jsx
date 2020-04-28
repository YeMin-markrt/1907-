import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
export default class Regist extends Component {
  constructor(props) {
    super(props);
    this.state={
      userTel:"请输入手机号",
      userCode:"请输入验证码",
      userPwd:"请输入密码"
    }
  }
  async componentDidMount(){
    // const data=await this.$axios({ 
    // url:"/songshu/mobile/api/navigation/listNew",
    // headers:{"appkey":"ef1fc57c13007e33"},
    // params:{
    //     param:{"id":0,"depth":0,"type":1}
    // }});
    // console.log(data)

    const data=await this.$axios({ 
    url:"/api/refist",

    });
    console.log(data)
  }
  render() {
    const {userTel,userCode,userPwd}=this.state
    return (
      <div>
        <Header title="快速注册" ></Header>
        <div className="regist">
          <div className="regist_input">
           <p><label htmlFor="">手机号 </label><input type="text" name="" id="" value={userTel}/></p>
           <p><label htmlFor="">验证码 </label><input type="text" name="" id="" value={userCode}/></p>
           <p><label htmlFor="">密码 </label><input type="text" name="" id="" value={userPwd}/></p>
          </div>
        </div>
      </div>
    )
  }
}
