import React, { Component } from 'react'
import './drug.scss'
import { observer,inject} from 'mobx-react';

@inject("drugs")
@observer

class Drug extends Component {
  componentDidMount(){
    this.props.drugs.getLidt1t1()
    this.props.drugs.getLidt1t2()
    this.props.drugs.getLidt1t3()
    this.props.drugs.getLidt1t4()
    this.props.drugs.getLidt1t5()
    this.props.drugs.getLidt1t6()
    this.props.drugs.getLidt1t7()
    this.props.drugs.getLidt1t8()
    this.props.drugs.getLidt1t9()
    this.props.drugs.getLidt1t10()
  }

  detailgoods=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
  }
  render() {
    let {needlist1,needlist2,needlist3,needlist4,needlist5,needlist6,needlist7,needlist8,needlist9,needlist10}=this.props.drugs
    return (
      <div className="drug">
       <div className="goodslist_heder">
          <span className="iconfont icon-zuo goodslist_left" onClick={this.tui}></span>
          <span className="goodslist_right">全国肺炎新动态</span>
          <span className="goodslist_hui iconfont icon-index" onClick={this.hio}></span>
        </div>

        <div className="main_img">
          <img src="https://p1.maiyaole.com/img/maps/MgcGfOhF8d.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>

        <div className="main_imgx">
          <img src="https://p1.maiyaole.com/img/maps/vnz4mdY1Ce.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>
        <div className="main_imgx">
          <img src="https://p1.maiyaole.com/img/maps/lxgFp9mDQY.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>
        <div className="main_imgx">
          <img src="https://p1.maiyaole.com/img/maps/p213Qb7n07.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>

        <div className="main_content1">
          <div className="content1_img">
            <img src="https://p1.maiyaole.com/img/maps/2MQ4CqevGn.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
          </div>

          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist1||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>

          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">口罩精选</span><span className="head_right">KN95、KF94、医用一次性</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist2||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>


          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">消毒防护</span><span className="head_right">75酒精、洗手液、消毒液、双氧水</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist3||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>

          <div className="main_imgx1">
           <img src="https://p1.maiyaole.com/img/maps/mvrX2ZigTm.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
          </div>


          <div className="content1_img">
           <img src="https://p1.maiyaole.com/img/maps/2drrX0YcyF.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
          </div>
        <div className="goodslist_content">
          {
            (needlist4||[]).map(item=>{
              return <li key={item.itemId} className="goodslist_goods" onClick={this.detailgoods.bind(this,item.itemId)}>
                <p className="grab_content_left"><img src={item.mainimg2} alt="图片损坏"/></p>
                <div className="grab_content_right">
                  <p className="grab_content_title">{item.productName}</p>
                  <p className="grab_content_num">{item.manufacturer}</p>
                  <p className="grab_content_price">¥{item.originalPrice}</p>
                  <div className="grab_content_bottom">
                      <div className="gou">立即购买</div>
                  </div> 
                </div>
              </li>
            })      
          }
        </div>

         
        <div className="content1_img">
           <img src="https://p1.maiyaole.com/img/maps/YmsbOhvkX9.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
          </div>
        <div className="goodslist_content">
          {
            (needlist5||[]).map(item=>{
              return <li key={item.itemId} className="goodslist_goods" onClick={this.detailgoods.bind(this,item.itemId)}>
                <p className="grab_content_left"><img src={item.mainimg2} alt="图片损坏"/></p>
                <div className="grab_content_right">
                  <p className="grab_content_title">{item.productName}</p>
                  <p className="grab_content_num">{item.manufacturer}</p>
                  <p className="grab_content_price">¥{item.originalPrice}</p>
                  <div className="grab_content_bottom">
                      <div className="gou">立即购买</div>
                  </div> 
                </div>
              </li>
            })      
          }
        </div>


        
        <div className="main_imgx1">
           <img src="https://p1.maiyaole.com/img/maps/lS8cwDqw14.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>

          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">健康电器</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist6||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>


          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">宅家优选</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist7||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
            </div>

            <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">感冒发烧用药</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist8||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>


          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">调节免疫力</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist9||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>

          <div  className="detail_content_head">
            <div className="drug_top"><span className="head_left">流感用药</span></div>
          </div>
          <div className="detail_content">
               <div className="detail_content_max" style={{width:((needlist1||[]).length*145)+"px"}}>
                {
                   (needlist10||[]).map((item)=>{
                     return <li key={item.itemId} onClick={this.detailgoods.bind(this,item.itemId)}><div className="img_content"><img src={item.mainimg2} alt="图片损坏"/></div>
                      <p className="detail_content_top">{item.productName}</p>
                      <p className="detail_content_bottom">¥{item.provinceId}</p>
                     </li>
                   })
                }
               </div>
          </div>
        </div>

        <div className="main_imgxtt">
           <img src="https://p1.maiyaole.com/img/maps/EeWLAAepN8.jpg?x-oss-process=image/quality,Q_70" alt="图片已损坏" />
        </div>

      </div>
    )
  }
}

export default Drug