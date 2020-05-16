import React, { Component } from 'react'
import './paymoney.scss'
import {Drawer} from 'antd';
export default class Payprice extends Component {
  constructor(props){
    super(props)
    this.state={
      userlist:[],
      visible: false,
      placement: 'bottom',
      allprice:0,
      checklength:0,
    }
  }

  componentDidMount(){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      var price=0
      var sum=0
      data.userjiesuan.forEach(item=>{
        if(item.checked){
          sum+=1
          price+=(item.price*item.num)
        }
      })
      this.setState({
        userlist:data.userjiesuan,
        allprice:price,
        checklength:sum
      })
  }

  changcheck=()=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    if(this.state.userlist.length==this.state.checklength){
      data.userjiesuan.forEach((item)=>{
          item.checked=false
      })
    }else{
      data.userjiesuan.forEach((item)=>{
        item.checked=true
    })
    }
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }
  changeone=(key)=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    data.userjiesuan.forEach((item,index)=>{
      if(index==key){
        item.checked=!item.checked
      }
    })
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }

  tui=()=>{
    this.props.history.go(-1) 
  }

  tiaoshou=()=>{
    this.props.history.push('/shop')
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  nolike=()=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    var datas=data.userjiesuan.filter((item)=>{
      return !(item.checked==true)
    })
    data.userjiesuan=[...datas]
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }


  payall=()=>{
    var flag=1
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    data.userjiesuan.forEach((item,index)=>{
      if(item.checked){
        if(data.userallbuy.length){
          data.userallbuy.forEach(items=>{
            if(items.id==item.id){
             flag=2
            }
          })    
        }
        if(flag==1){
          data.userallbuy.push(item)
        } 
      }
    })
    var datas=data.userjiesuan.filter((item)=>{
      return !(item.checked==true)
    })
    data.userjiesuan=[...datas]
    window.localStorage.setItem("userinfo",JSON.stringify(data));
   // window.location.reload();
  }

  hio=()=>{
    this.props.history.push('/home') 
  }
  render() {
    let {userlist,allprice,checklength}=this.state
    return (
      <div className="paymomey">
        <div className="regist_heder">
            <span className="iconfont icon-zuo regist_left" onClick={this.tui}></span>
            <span className="regist_right">确认订单</span>
            <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
          </div> 
          <div className="paycontent">
          <div className="usr_shop"  style={{display:userlist.length==0?"none":'block'}}>
          <div  className="usr_shop_header">
          <input type="checkbox" checked={checklength==userlist.length?true:false} onChange={this.changcheck}/>壹号大药房
            壹号大药房</div>
          {
            (userlist||[]).map((item,index)=>{
              return <li className="usermai" key={item.id}>
                <div className="usermai_1">
                <input type="checkbox" checked={item.checked} onChange={this.changeone.bind(this,index)}/>
              </div>
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
          <p className="">没有待支付的东西</p>
          <p className=""><span onClick={this.tiaoshou}>去购物车看看</span></p>
        </div>
          </div>

          <div className="detail_nav">
           <li className="detail_nav_box1">
            应付金额:<span>¥{allprice}</span>
           </li>
           <li className="detail_nav_box2" onClick={this.nolike}>
             取消购买
           </li>
           <li className="detail_nav_box3" onClick={this.showDrawer}>
             提交订单
           </li>
           <Drawer
                title="在线支付"
                placement={this.state.placement}
                closable={true}
                onClose={this.onClose}
                visible={this.state.visible}
                maskClosable={true}
                mask={true}
                height={"550px"}
              >
               <p style={{height:"400px"}}>
                  <img src='/image/shouqian.png' alt="图片损坏" style={{width:"100%",height:"100%"}}/>
               </p>
               <p><span onClick={this.payall} style={{ width:"50%",fontSsize:" 16px",height:"55px",lineHeight:"55px",background:" #FF5A73",fontWeight:"700",color:"#FFFFFF",textAlign:"center",position:"fixed",right:'0',bottom:'0'}}>确认支付</span></p>
              </Drawer>
         </div>
      </div>
    )
  }
}
