import React, { Component } from 'react'
import { observer,inject} from 'mobx-react';
import Swiper from 'swiper'
import "swiper/css/swiper.css"
import '../main/main.scss'
import './found.scss'

@inject("find") 
@inject("main")    
@observer
 class Found extends Component {
  constructor(props){
    super(props)
    this.state={
      inputValue:"请输入商品名称",
      code:0,
    }
  }

  componentDidMount(){
    this.props.find.getfindList()
    this.props.find.getneedList(this.state.code);
    this.initbanSwiper()
  }

  initbanSwiper(){
    new Swiper ('.find_banner', {
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

  changecode(key){
    this.props.find.getneedList(key)
    this.setState({
      code:key
    })
  }

  change=(e)=>{
      this.setState({
        inputValue:e.target.value
      })
    }

  goodslist=(key1,key2)=>{
    this.props.history.push('goodslist2/'+key1+'/'+key2)
  }
  render() {
    let {findbanList,findList,needList,needmainList}=this.props.find
    let {imgUrl}=this.props.main
    let {code}=this.state
    return (
      <div className="find">
        {/* 顶部 */}
         <div className="home_top_sticky">
            <div className="home_top_sticky_left"><img  src={imgUrl} alt="图片损坏"/></div>
            <span>湖北</span>
            <div className="home_top_sticky_center"><i className="iconfont icon-sousuo"></i><input value="请输入商品名称" onChange={this.change}/></div>
            <div className="home_top_sticky_right"><i className="iconfont icon-zixun"></i><span>咨询药师</span></div>
          </div>

          {/* 中部图片 */}
          <div className="find_img">
            <img  src="http://m.111.com.cn/yyw/wap/category/static/img/categorie_bannr.de2a6a8.png" alt="图片损坏"/>
          </div>

          {/* 分类核心bufen */}
          <div className="find_content">
            <div className="find_content_left">
              <div style={{height:((findList||[]).length*49)+"px"}}>
              {
                (findList||[]).map(((item,index)=>{
                  return <li key={item.id} className={index===code?"actives":""} onClick={this.changecode.bind(this,index)} >{item.name}</li>
                }))
              }
              </div>
            </div>
            <div className="find_content_right">
              <div className="swiper-container find_banner">
                <div className="swiper-wrapper">
                  {
                    (findbanList||[]).map((item)=>{                                
                         return <div className="swiper-slide" key={item.id}>
                            <img src={item.bannerUrl} alt="图片损坏"/></div>
                        })
                  }       
                  </div>
                    <div className="swiper-pagination"></div>
                </div>
                <h3 className="hot_title">{needList.name}</h3>
                <div className="content_find">
                  <div className="max_content_find">
                    {
                      (needmainList||[]).map(item=>{
                        return <li key={item.id} onClick={this.goodslist.bind(this,item.id,item.name)}><img src={item.icon} alt="图片损坏"/>
                        <p>{item.name}</p></li>
                      })
                    } 
                  </div>
                </div>
            </div>
          </div>
      </div>

    )
  }
}

export default Found