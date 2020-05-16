import React, { Component } from 'react'
import './detail.scss'
import '../main/main.scss'
import { observer,inject} from 'mobx-react';
import { Menu, Dropdown, Drawer} from 'antd';
import Swiper from 'swiper'
import "swiper/css/swiper.css"
import { message, Badge }from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a href="/home">
        <i className="iconfont icon-index limian"></i>首页
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="/found">
        <i className="iconfont icon-zhaoyaoshi limian"></i>分类
      </a>
    </Menu.Item>
    <Menu.Item>
      <a  href="/shop">
        <i className="iconfont icon-gouwuche limian" ></i>购物车
      </a>
    </Menu.Item>
    <Menu.Item>
      <a  href="/mine">
        <i className="iconfont icon-gerenzhongxin-zhong limian" ></i>我的
      </a>
    </Menu.Item>
  </Menu>
);

@inject("detail")
@inject("main")    
@observer
 class GoodsDetail extends Component {
   constructor(props){
     super(props)
     this.state={
      visible: false,
      placement: 'bottom',
      type:1,
      count:0,
     }
   }
   componentDidMount(){
     this.props.detail.getdetailxiang(this.props.match.params.id)
     this.props.detail.getdetailtuijian(this.state.type,this.props.detail.goodservice.catalogId,this.props.match.params.id)
     this.initdetailbanSwiper()
     var  data =JSON.parse( window.localStorage.getItem("userinfo"));
     this.setState({
      count:data.usergoods.length
     })
   }

   xiangguan=(key)=>{
     this.setState({
      type:1
     },()=>{
      this.props.detail.getdetailtuijian(this.state.type,key,this.props.match.params.id)
     })
   }
   brand=(key)=>{
    this.setState({
      type:2
     },()=>{
      this.props.detail.getdetailtuijian(this.state.type,key,this.props.match.params.id)
     })
   }
   tui=()=>{
    this.props.history.go(-1) 
   
  }

  initdetailbanSwiper(){
    new Swiper ('.detailbanner_swiper', {
      pagination: {
        el: '.swiper-pagination',
      },    
      observer: true, // 启动动态检查器(OB/观众/观看者)
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    })
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

  goshop=()=>{
    this.props.history.push('/shop')
  }
  userlike=()=>{
    var flag=1
    if(window.localStorage.getItem("userinfo")){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      if(data.userlike.length){
      data.userlike.forEach(item => {
        if(item.id===this.props.match.params.id){
          flag=2
          item.num++
          window.localStorage.setItem("userinfo",JSON.stringify(data)); 
          console.log(data)
          return     
        }
      }) 
      if(flag===1){
        var goods={
          id:this.props.match.params.id,
          name:this.props.detail.goods_info.productName,
          num:1,
          price:this.props.detail.goods_info.originalPrice,
          img:this.props.detail.goods_info.mainimg1,
          guige:this.props.detail.goods_info.seriesAttrs,
          checked:true                
        }
        data.userlike.push(goods)
        window.localStorage.setItem("userinfo",JSON.stringify(data)); 
        
      }
    }else{
      var goods={
        id:this.props.match.params.id,
        name:this.props.detail.goods_info.productName,
        num:1,
        price:this.props.detail.goods_info.originalPrice,
        img:this.props.detail.goods_info.mainimg1,
        guige:this.props.detail.goods_info.seriesAttrs,
        checked:true             
      }
      data.userlike.push(goods)
      window.localStorage.setItem("userinfo",JSON.stringify(data));
    }
    message.success("收藏成功")
  }else{
      this.props.history.push('/login')
    }
  }

  userbuy=()=>{
    var flag=1
    if(window.localStorage.getItem("userinfo")){
      var  data =JSON.parse( window.localStorage.getItem("userinfo"));
      if(data.usergoods.length){
      data.usergoods.forEach(item => {
        if(item.id===this.props.match.params.id){
          flag=2
          item.num++
          window.localStorage.setItem("userinfo",JSON.stringify(data)); 
          return     
        }
      }) 
      if(flag===1){
        var goods={
          id:this.props.match.params.id,
          name:this.props.detail.goods_info.productName,
          num:1,
          price:this.props.detail.goods_info.originalPrice,
          img:this.props.detail.goods_info.mainimg1,
          guige:this.props.detail.goods_info.seriesAttrs,
          checked:true           
        }
        data.usergoods.push(goods)
        window.localStorage.setItem("userinfo",JSON.stringify(data)); 
        this.setState({
          count:this.state.count+1
         })
      }
    }else{
      var goods={
        id:this.props.match.params.id,
        name:this.props.detail.goods_info.productName,
        num:1,
        price:this.props.detail.goods_info.originalPrice,
        img:this.props.detail.goods_info.mainimg1,
        guige:this.props.detail.goods_info.seriesAttrs,
        checked:true              
      }
      data.usergoods.push(goods)
      window.localStorage.setItem("userinfo",JSON.stringify(data));
      this.setState({
        count:this.state.count+1
       })
    }
    message.success("成功加入购物车")
  }else{
      this.props.history.push('/login')
    }
  }

  detailgoods=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
    window.location.reload()
  }
  render() {
    let {imgUrl}=this.props.main
    let {detailbanner,goodservice,goods_info,goods_lun}=this.props.detail
    return (
      <div className="detail">
         <div className="home_top">
            <div className="home_top_left"><img  src={imgUrl} alt="图片损坏"/></div>
            <p className="home_top_center">使用APP享受更多优惠</p>
            <div className="home_top_right"><p>立即下载</p></div>
          </div>
        <div className="goodslist_heder">
          <span className="iconfont icon-zuo goodslist_left" onClick={this.tui}></span>
          <span className="goodslist_center">商品详情</span>
          <div className="goodslist_right">
          <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                 <i className="iconfont icon-sangedian2 waimain"></i>
              </a>
            </Dropdown>
          </div>
        </div>

        {/* 滑动详情部分 */}
        <div className="swiper-container detailbanner_swiper">
            <div className="swiper-wrapper">
              {
                (detailbanner||[]).map((item,index)=>{                                
                  return <div className="swiper-slide" key={item.image1}>
                            <img src={item.image1} alt="图片损坏"/>
                    </div>
                })
               }       
           </div>
           <div className="swiper-pagination"></div>
          </div>

          <div className="pro_label">
            <span><i className="iconfont icon-chahao1"></i>满包邮</span>
            <span><i className="iconfont icon-chahao1"></i>正品保证</span>
            <span><i className="iconfont icon-chahao1"></i>正品保险</span>
            <i className="iconfont icon-sangedian2"  onClick={this.showDrawer}></i>
            <div>
              <Drawer
                title="服务详情"
                placement={this.state.placement}
                closable={true}
                onClose={this.onClose}
                visible={this.state.visible}
                maskClosable={true}
                mask={true}
                height={"500px"}
              >
                {
                  (goodservice||[]).map(item=>{
                    return <li  key={item.service_desc}>
                       <p className="baozhuang_top" style={{color:"#97ABF9"}}><i className="iconfont icon-chahao1"></i>{item.service_desc}</p>
                      <p className="baozhuang_bottom">{item.service_content}</p>
                    </li>
                  })
                }         
              </Drawer>
            </div>
          </div>

          <div className="price">¥<span>{goods_info.originalPrice}</span></div>
          <div className="pro_title"><span className="pro_title_left">自营</span><span className="pro_title_right">{goods_info.productName}</span></div>
          <div className="data-ywpoint"><span className="data-ywpoint-left">{goods_info.gift}</span><span className="data-ywpoint-right">{goods_info.giftLinkTxt}</span></div>
          <p class="pro_note">本商品由1药网自营提供现货</p>
          <p class="pro_wenhao">国药准字Z37021368<span>查询食药局批准文号 <i className="iconfont icon-zuo1"></i></span></p>

         <div className="more_wrap">
         <div className="more">
            <div className="grap_top">
               <span onClick={this.xiangguan.bind(this,goods_info.catalogId)} className={this.state.type===1?'avtivesoan':""}>相关推荐</span><span className={this.state.type===2?'avtivesoan':""} onClick={this.brand.bind(this,goods_info.catalogId)}>品牌专区</span>
             </div>
             <div className="detail_content">
               <div className="detail_content_max" style={{width:((goods_lun||[]).length*106)+"px"}} >
                {
                   (goods_lun||[]).map((item)=>{
                     return <li key={item.pid} onClick={this.detailgoods.bind(this,item.pid)}><div className="img_content"><img src={item.imgUrl} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.name}</p>
                      <p className="detail_content_bottom">¥{item.price}</p>
                     </li>
                   })
                }
               </div>
          </div>
          </div>
         </div>

         <div className="last_detail">
         <img src="https://s.maiyaole.com/images/2019/tJ1iVdqUFU.jpg" alt="图片损坏"/>
         </div>

         <div className="detail_nav">
           <li className="detail_nav_box" onClick={this.userlike}>
             <i className="iconfont icon-shoucang"></i>
             <p>收藏</p>
           </li>
           <li className="detail_nav_box" onClick={this.goshop}>
           <Badge count={this.state.count}>
                <i className="iconfont icon-gouwuche"></i>
                 <p>购物清单
              </p>
            </Badge>          
           </li>
           <li className="detail_nav_box" onClick={this.userbuy}>
             <span className="detail_nav_douwu">加入购物车</span>
           </li>
         </div>
      </div>
    )
  }
}

export default GoodsDetail
