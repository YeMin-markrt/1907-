import React, { Component } from 'react'
import './main.scss'
import {autorun} from "mobx"
import { observer,inject} from 'mobx-react';
@inject("main")    
@observer
class Bottom1 extends Component {
  constructor(props){
    super(props)
    this.state={
      code:0,
    }
  }

  componentDidMount(){
    this.props.main.getDatabug();
    this.props.main.getDatabugid(this.state.code);
  }

  changecode=(key)=>{
    this.props.main.getDatabugid(key)
    this.setState({
      code:key
    })
  }
  render() {
    let {list}=this.props
    let {code}=this.state
    let {bug}=this.props.main
    return (
      <div className="bug1">
        <div className="bug1_content">
          <div className="bug1_top"><i className="iconfont icon-yiliao"></i>常见疾病</div>
          <div className="bug1_content1">
               <div className="bug1_max" >
                {
                   (list||[]).map((item,index)=>{
                     return <span key={item.id} className={index===code?"spanactive":
                    ""} onClick={this.changecode.bind(this,index)}>{item.name}</span>
                   })
                }
               </div>
              </div>
            <div className="bug1_bottom_content">
            {
                   (bug||[]).map((item,index)=>{
                     return <li key={item.id} className="bug_li">
                     <span className="bug_li_left">{item.content}</span>
                     <span className="bug_li_right">{item.createTime.split(" ")[0]}</span>
                   </li>
                   })
                }
            </div>
            <div className="bug1_bottom_bottom" >
            {
                   (list||[]).map((item,index)=>{
                     if(index===code){
                      return <div key={item.id} className={"spanactive"} >查看更多{item.name}问题<i className="iconfont icon-zuo1"></i></div>
                     }
                   })
                }
              </div>
        </div>
      </div>
    )
  }
}
export default Bottom1