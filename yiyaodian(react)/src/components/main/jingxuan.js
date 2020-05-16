import React, { Component } from 'react'
import './main.scss'
import {withRouter} from 'react-router-dom'
class Jingxuan extends Component {
  goodslist=(key)=>{
    this.props.history.push('/goodslist1/'+key)
   }

   goodsdetail=(key)=>{
    this.props.history.push('/goodsdetail/'+key)
   }
  render() {
    let {list,code}=this.props
    return (
      <div>
        <div className="good_topic_top" onClick={this.goodslist.bind(this,code)}>
                <img src={list.picUrl} alt="图片损坏"/>
              </div>
              <div className="grab_content">
               <div className="grab_content_max" style={{width:((list.goodProducts||[]).length*110)+"px"}}>
                {
                   (list.goodProducts||[]).map((item,index)=>{
                     return <li key={item.id} onClick={this.goodsdetail.bind(this,item.itemid)}>
                       <p className="grab_content_top" ><img src={item.productImg} alt="图片损坏"/></p>
                       <p className="grab_content_center">{item.productName}</p>
                       <p className="grab_content_bottom">¥{item.sellPrice}</p>
                     </li>
                   })
                }
               </div>
             </div>
      </div>
    )
  }
}

export default withRouter(Jingxuan)