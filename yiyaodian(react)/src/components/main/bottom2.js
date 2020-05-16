import React, { Component } from 'react'
import './main.scss'
import { observer,inject} from 'mobx-react';
@inject("main")    
@observer
class Bottom2 extends Component {
  componentDidMount(){
    this.props.main.getDatabug();
  }
  render() {
    let {bug2}=this.props.main
    return (
      <div className="bug2">
        <div className="bug_content">
        <div className="bug2_top"><i className="iconfont icon-zixun"></i>最新资讯</  div>
          {
            (bug2||[]).map((item)=>{
              return <li key={item.id} className="bug2_bottom">
                <p className="bug2_bottom_title">{item.title}</p>
                <p className="bug2_bottom_content">{item.shortContent}</p>
                <p className="bug2_bottom_author"><span className="bug2_bottom_left">{item.author}</span><span className="bug2_bottom_right">{item.updateTime.split(" ")[0]}</span></p>
              </li>
            })
          }
        </div>
        <div className="weibu">
            <p >广东壹号大药房连锁有限公司 020-31067218</p>
            <p >地址:广东省广州市越秀区共和西路1号2层</p>
        </div>
      </div>
    )
  }
}
export default Bottom2