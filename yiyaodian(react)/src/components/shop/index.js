import React, { Component } from 'react'
import './shop.scss'
import { observer,inject} from 'mobx-react';


@inject("detail")
@observer
class Shop extends Component {
  constructor(props){
    super(props)
    this.state={
      userlist:[],
      checklength:0,
      allnum:0,
      allprice:0,
    }
  }
  componentDidMount(){
    this.props.detail.getchangxun()
    if(window.localStorage.getItem("userinfo")){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      var sum=0
      var price=0
      var count=0
      data.usergoods.forEach(item=>{
        if(item.checked){
          sum+=1
          price+=(item.price*item.num)
          count+=item.num
        }
      })
      this.setState({
        userlist:data.usergoods,
        checklength:sum,
        allnum:count,
        allprice:price
      })
    }else{
      this.props.history.push('/login')
    }
  }
  tui=()=>{
    this.props.history.go(-1) 
  }
  detailgoods=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
  }
  tiaoshou=()=>{
    this.props.history.push('/home')
  }
  countusernum=(key,value)=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    data.usergoods.forEach((item,index)=>{
      if(index===key){
        item.num+=value
      }
    })
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }

  changcheck=()=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    if(this.state.userlist.length==this.state.checklength){
      data.usergoods.forEach((item)=>{
          item.checked=false
      })
    }else{
      data.usergoods.forEach((item)=>{
        item.checked=true
    })
    }
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }
  changeone=(key)=>{
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    data.usergoods.forEach((item,index)=>{
      if(index==key){
        item.checked=!item.checked
      }
    })
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    window.location.reload();
  }

  huaqian=()=>{
    var flag=1
    var data =JSON.parse( window.localStorage.getItem("userinfo"));
    data.usergoods.forEach((item,index)=>{
      if(item.checked){
        if(data.userjiesuan.length){
          data.userjiesuan.forEach(items=>{
            if(items.id==item.id){
              flag=2
              items.num=items.num+item.num
            }
          })
        }
          if(flag==1){
            data.userjiesuan.push(item)
          } 
      }
    })
    var datas=data.usergoods.filter((item,index)=>{
      return !(item.checked==true)
    })
    data.usergoods=[...datas]
    data.userallprice=this.state.allprice
    data.userallNum=this.state.allnum
    window.localStorage.setItem("userinfo",JSON.stringify(data));
    this.props.history.push('/paymoney')
  }

  hio=()=>{
    this.props.history.push('/home') 
  }
  render() {
    let {changxu}=this.props.detail
    let {userlist,checklength,allprice,allnum}=this.state
    return (
      <div className="shop">
        <div  className="shop_content">
          <div className="regist_heder">
            <span className="iconfont icon-zuo regist_left" onClick={this.tui}></span>
            <span className="regist_right">购物车</span>
            <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
          </div>
        <div className="usr_shop" style={{display:userlist.length==0?"none":'block'}}>
          <div  className="usr_shop_header" >
            <input type="checkbox" checked={checklength==userlist.length?true:false} onChange={this.changcheck}/>壹号大药房
          </div>
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
                <div className="usermai_3_bottom"><span className="usermai_3_price">¥{item.price}</span><p className="usr_num"><button onClick={this.countusernum.bind(this,index,-1)}   disabled={item.num<=1?true:false}>-</button><input type="text" value={item.num} onChange={()=>{}}/  ><button onClick={this.countusernum.bind(this,index,1)}>+</button></p></div>
              </div>
          </li>
            })
          }
        </div>

        <div style={{display:userlist.length==0?"block":'none'}} className="nogoods">
          <p className="iconfont icon-gouwuche"></p>
          <p className="">购物车还空的</p>
          <p className=""><span onClick={this.tiaoshou}>去看看</span></p>
        </div>
        <div className="more">
            <div className="grap_top">
              <span className="grap_top_cont">常备用药</span>
             </div>
             <div className="detail_content1">
               <div className="detail_content_max" style={{width:((changxu||[]).length*106)+"px"}}>
                {
                   (changxu||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.productImgUrl} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.nowPrice}</p>
                     </li>
                   })
                }
               </div>
          </div>
          </div>
        </div>

        
        <div className="detail_nav">
           <li className="detail_nav_box1">
            <input type="checkbox"  checked={checklength==userlist.length?true:false} onChange={this.changcheck}/>
            <p>全选</p>
           </li>
           <li className="detail_nav_box2">
            合计:<span>¥{allprice}.00</span>
           </li>
           <li className="detail_nav_box3" onClick={this.huaqian}>
             去结算(<span className="detail_nav_douwu">{allnum}</span>)
           </li>
         </div>
      </div>
    )
  }
}

export default Shop