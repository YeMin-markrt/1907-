import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/user.scss'

export default class Article extends Component {
  render() {
    return (
      <div>
         <Header title="我的收藏"></Header>
         <div className="my_love">
          <div className="my_love_box">
            <img src={require('../assets/img/noGoods.png')} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}
