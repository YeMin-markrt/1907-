import React, { Component } from 'react'
import './App.scss';
import {Route,Redirect,Switch,withRouter,NavLink} from 'react-router-dom'
import {routes} from './router'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      visible:true
    }
  }

  componentDidMount(){
    this.changeTitle(this.props.location.pathname);
    this.routeListen();  //组件一挂载就监听
  }

  routeListen(){  //监听路由变化
    this.props.history.listen((location)=>{
      this.changeTitle(location.pathname)
    })
  }

  changeTitle(pathname){
    this.setState({
      visible:true
    })
    switch(pathname){
      case '/':
      case '/home':
        document.title="1药网_网上药店_全国正规合法线上药房";
        break;
      case '/found':
        document.title="1药网_分类";
        break;
      case '/drug':
        document.title="1药网";
        break;
      case '/mine':
        document.title="1药网_个人中心";
        break;
        default:
          if(pathname==="regist"){
            document.title="注册";
          }
          if(pathname==="login"){
            document.title="登录";
          }
          if(pathname==="mylike"){
            document.title="1药网_我的收藏";
          }
          if(pathname==="set"){
            document.title="1药网_个人中心";
          }
          if(pathname==="allbuy"){
            document.title="1药网_已经购买";
          }
          if(pathname.includes("goodslist")){
            document.title="1药网_商品列表";
          }
          if(pathname.includes("goodslist1")){
            document.title="1药网_商品列表";
          }
          if(pathname.includes("goodsdetail")){
            document.title="1药网_商品详情";
          }
          if(pathname==="paymoney"){
            document.title="1药网_订单确认";
          }
          this.setState({
            visible:false
          })
    }
  }

  render(){
  return (   
    <div className="App">
      <div className="bottom-nav" style={{"display":this.state.visible?'':"none"}}>
          {
            routes.map((item,index)=>{
              if(index<=4){
                return <NavLink key={item.path} to={item.path} className="bottom-nav-li"><i className={item.icontype}></i>{item.name}</NavLink>
              }        
            })
          }
          <NavLink className="bottom-nav-img" key="/drug" to="/drug">
            <img src="https://p1.maiyaole.com/img/mobile/20200/1579518787359146.png" alt="图片损坏"/>
          </NavLink>
      </div>
      <Switch>
          {
            routes.map(item=>{
              return <Route key={item.path} path={item.path} component={item.component}/>
            })
          }
          <Redirect from="/" to="/home" exact/>
          <Redirect to="nofound"/>
        </Switch>
    </div>
  );
}
}
export default withRouter(App);
