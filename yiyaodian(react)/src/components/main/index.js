import React, { Component } from 'react'
import { observer,inject} from 'mobx-react';
import Swiper from 'swiper'
import Jingxuan from './jingxuan'
import Bottom1 from './bottom1'
import Bottom2 from './bottom2'
import "swiper/css/swiper.css"
import './main.scss'

@inject("main")    
@observer
 class Main extends Component {
   constructor(props){
     super(props)
     this.state={
       inputValue:"请输入商品名称",
        code0:0,code1:1,code2:2,code3:3,code4:4,code5:5,code6:6,code7:7, code8:8
     }
   }
  componentDidMount(){
    this.props.main.getData()
    this.props.main.getDatagra()
    this.props.main.getDatajing()
    this.props.main.getDatabug()
    this.initbanSwiper()
    this.initnoticeSwiper()
    }

  initbanSwiper(){
    new Swiper ('.banner_swiper', {
      //loop: true, // 循环模式选项，
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        stopOnLastSlide:false,
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },    
      observer: true, // 启动动态检查器(OB/观众/观看者)
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    })
  }

  initnoticeSwiper(){
    new Swiper ('.notice_swiper', {
      //loop: true, // 循环模式选项，
      direction: 'vertical',
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        stopOnLastSlide:false,
      },
      observer: true, // 启动动态检查器(OB/观众/观看者)
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    })
  }

  change=(e)=>{
    this.setState({
      inputValue:e.target.value
    })
  }

  goodslist=()=>{
    this.props.history.push('/goodslist')
   }

   goodsdetail=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
   }
  render() {
    let {imgUrl,bannerList,menuList,noticeList,grabList,grabimg,jingxuan1,jingxuan2,jingxuan3,jingxuan4,jingxuan5,jingxuan6,jingxuan7,jingxuan8,jingxuan9,bug1,bug2}=this.props.main
    let {inputValue,code0,code1,code2,code3,code4,code5,code6,code7,code8}=this.state
    return (
      <div className="home">
        {/* 头部 */}
          <div className="home_top">
            <div className="home_top_left"><img  src={imgUrl} alt="图片损坏"/></div>
            <p className="home_top_center">使用APP享受更多优惠</p>
            <div className="home_top_right"><p>立即下载</p></div>
          </div>
          <div className="home_top_sticky">
            <div className="home_top_sticky_left"><img  src={imgUrl} alt="图片损坏"/></div>
            <span>湖北</span>
            <div className="home_top_sticky_center"><i className="iconfont icon-sousuo"></i><input value={inputValue} onChange={this.change}/></div>
            <div className="home_top_sticky_right"><i className="iconfont icon-zixun"></i><span>咨询药师</span></div>
          </div>
        
        {/* 轮播图 */}
          <div className="swiper-container banner_swiper">
            <div className="swiper-wrapper">
              {
                (bannerList||[]).map((item,index)=>{                                
                  return <div className="swiper-slide" key={index}>
                            <img src={item.pic} alt="图片损坏"/>
                                      </div>
                               })
               }       
           </div>
           <div className="swiper-pagination"></div>
          </div>

      {/* 中间导航 */}
      <div className="nav_menu">  
          {
           (menuList||[]).map(item=>{
              return <li key={item.id} className="nav_menu_box">
                <p className="nav_menu_box_top"><img  src={item.adPic} alt="图片损坏"/></p>
                <p>{item.adTitle}</p>
              </li>
            })
          }
      </div>
      {/* 消息轮播 */}
      <div className="notice">
        <div className="notice_content">
          <p className="notice_content_left"><img src={imgUrl} alt="图片损坏"/></p>
          <div className="notice_content_right">
            <div className="swiper-container notice_swiper">
            <div className="swiper-wrapper">
              {
                (noticeList||[]).map((item)=>{                                
                  return <div className="swiper-slide" key={item.title}>{item.title}</div>
                })
               }       
           </div>
          </div>
          </div>
        </div>
      </div>

      {/* 限时抢购部分 */}
        <div className="grab_together">
          <div className="grab_box">
             <div className="grap_top">
               <div className="grap_top_left">健康优享</div>
               <div className="grap_top_center"></div>
               <div className="grap_top_right" onClick={this.goodslist}>更多<i className="iconfont icon-zuo1"></i></div>
             </div>
             <div className="grab_content">
               <div className="grab_content_max" style={{width:((grabList||[]).length*110)+"px"}}>
                {
                   (grabList||[]).map(item=>{
                     return <li key={item.itemId} onClick={this.goodsdetail.bind(this,item.itemId)}>
                       <p className="grab_content_top"><img src={item.mainimg3} alt="图片损坏"/></p>
                       <p className="grab_content_center">{item.flashSaleProductName}</p>
                       <p className="grab_content_bottom">¥{item.promotionPrice}</p>
                     </li>
                   })
                }
               </div>
             </div>
          </div>    
        </div>
        <div className="grab_bigimg">
            <img src={grabimg.bottomCmsImgUrl} alt="图片损坏"/>
            <p style={{display:grabimg.brandActiveName?"block":"none"}}>{grabimg.brandActiveName}</p>
        </div>
        {/* 精专题部分 */}
        <div className="good_topic">
          <div className="good_topic_content">
            <div className="good_topic_header">精选专题</div>
                <Jingxuan list={jingxuan1} code={code0}/>
                <Jingxuan list={jingxuan2} code={code1}/>
                <Jingxuan list={jingxuan3} code={code2}/>
                <Jingxuan list={jingxuan4} code={code3}/>
                <Jingxuan list={jingxuan5} code={code4}/>
                <Jingxuan list={jingxuan6} code={code5}/>
                <Jingxuan list={jingxuan7} code={code6}/>
                <Jingxuan list={jingxuan8} code={code7}/>
                <Jingxuan list={jingxuan9} code={code8}/>
            </div>
          </div>
          <Bottom1 list={bug1}/>
          <Bottom2 list={bug2}/>
      </div>
    )
  }
}

export default Main
