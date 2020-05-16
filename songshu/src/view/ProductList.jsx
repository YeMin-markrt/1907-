import React, { Component } from "react";
import Header from "../components/wangjie/Header";
import product from "../assets/css/wangjie/product.module.scss";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      index: 0,
      sort: true,
    };
    this.order = 0;
  }
  async getGoodsList({
    keyword = "",
    order = 5,
    page = 1,
    pageCount = 12,
  } = {}) {
    const title = this.props.location.state.title;
    const url = '"' + this.props.location.state.url + '"';
    keyword = '"' + keyword + '"';
    const formData = new FormData();
    formData.append(
      "param",
      `{${
        keyword === '""' ? '"url"' + ":" + url : '"keyword"' + ":" + keyword
      }, "order":${order},"page":${page},"pageCount":${pageCount},}`
    );
    // order:{5:新品，1：热卖，3：价格升序，4：价格降序}
    const data = await this.$axios.post(
      "/songshu/mobile/api/product/search",
      formData,
      {
        headers: {
          appkey: "ef1fc57c13007e33",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    // console.log(data);
    this.setState({
      goodsList: data.data.items,
    });
    // console.log(this.state.goodsList);
  }
  componentDidMount() {
    this.getGoodsList();
    console.log(this.props.location.state.keyword);
  }
  render() {
    return (
      <div className={product.view}>
        {/* 头部 */}
        <Header
          {...{
            ...this.props,
            ...{ getGoodsList: this.getGoodsList.bind(this) },
          }}
        ></Header>
        {/* 导航 */}
        <div className={product.nav}>
          <ul>
            <li
              className={this.state.index === 0 ? product.activeLi : ""}
              onClick={() => {
                this.setState({ index: 0, sort: true });
                this.order = 0;
                this.getGoodsList();
              }}
            >
              新品
            </li>
            <li
              className={this.state.index === 1 ? product.activeLi : ""}
              onClick={() => {
                this.setState({ index: 1, sort: true });
                this.order = 0;
                this.getGoodsList({ order: 1 });
              }}
            >
              热卖
            </li>
            <li
              className={this.state.index === 2 ? product.activeLi : ""}
              onClick={() => {
                this.setState({ index: 2, sort: !this.state.sort });
                // console.log(this.state.sort);
                this.order = this.state.sort ? 3 : 4;
                this.getGoodsList({ order: this.state.sort ? 3 : 4 });
              }}
            >
              价格
              <i
                className={`${product.top} ${
                  this.order === 3 ? product.activeI : ""
                } iconfont icon-paixujiantoushang`}
              ></i>
              <i
                className={`${product.down} ${
                  this.order === 4 ? product.activeI : ""
                } iconfont icon-paixujiantouxia`}
              ></i>
            </li>
          </ul>
        </div>
        {/* 商品列表 */}
        <div className={product.goods}>
          <ul>
            {this.state.goodsList.map((v) => (
              <li key={v.id} 
              onClick={()=>{this.props.history.push("/productInfo/"+v.defaultGoodsId+"/"+v.id+".html")}}
              >
                <div className={product.goodsWrap}>
                  <div>
                    <img src={v.pic} alt="" />
                  </div>
                  <p className={product.title}>{v.name}</p>
                  <p className={product.price}>
                    <span>{this.$filters.currency(v.salesPrice.value)}</span>
                    <span>{this.$filters.currency(v.marketPrice.value)}</span>
                    <span className={"iconfont icon-gouwuche"}></span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
