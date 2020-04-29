import React, { Component } from "react";
import categories from "./categories.module.scss";

export default class Categories extends Component {
  constructor(props){
    super(props);
    this.state={
      index:0,
      discoverList:[]
    }
  }
  async getDiscover(){
    const {data} = await this.$axios.get("/songshu/mobile/api/navigation/listNew",{
      params:{
        param: {"id":0,"depth":1,"type":2}
      },
      headers:{
        "appkey":"ef1fc57c13007e33"
      }
    });
    console.log(data[0].activePic);
    
    this.setState({
      discoverList:data
    })
    console.log(this.state.discoverList[0].activePic);
  }
  render() {
    return (
      <div className={categories.root}>
        <div className={categories.nav}>
          <ul>
            <li className={this.state.index===0?categories.activeLi:""} onClick={()=>{this.setState({index:0});}}>分类</li>
            <li className={this.state.index===1?categories.activeLi:""} onClick={()=>{this.setState({index:1});this.getDiscover()}}>发现</li>
          </ul>
          <button></button>
        </div>
        <div style={{display:this.state.index===0?"block":"none"}} className={categories.tab}>内容1</div>
        <div style={{display:this.state.index===1?"block":"none"}} className={categories.tab}>
          <ul>
            <li>
              {/* <img src={this.state.discoverList.length>0?this.state.discoverList[0].activePic:""} alt=""/> */}
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/navicon/e342d1380cf52bed48ac152eeb2af0cf.jpg" alt=""/>
            </li>
            <li>
              {/* <img src={this.state.discoverList.length>0?this.state.discoverList[0].activePic:""} alt=""/> */}
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/navicon/e342d1380cf52bed48ac152eeb2af0cf.jpg" alt=""/>
            </li>
            <li>
              {/* <img src={this.state.discoverList.length>0?this.state.discoverList[0].activePic:""} alt=""/> */}
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/navicon/e342d1380cf52bed48ac152eeb2af0cf.jpg" alt=""/>
            </li>
            <li>
              {/* <img src={this.state.discoverList.length>0?this.state.discoverList[0].activePic:""} alt=""/> */}
              <img src="http://pic10.cdn.3songshu.com:81//assets/upload/navicon/e342d1380cf52bed48ac152eeb2af0cf.jpg" alt=""/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
