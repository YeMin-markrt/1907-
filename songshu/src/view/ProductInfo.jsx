import React, { Component } from 'react'
import style from "../assets/css/wk/productInfo.module.css"
import loading from "../components/common/Loading"
class ProductInfo extends Component {
    constructor() {
        super();
        this.state={
            name:"",
            pics:[],
            saleCount:null,
            marketPrice:null,
            salesPrice:null,
            goodsMatch:[],
            isLoading:true,
            //评价
            eval:[],
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading:true
        })
        const goodsId = this.props.match.params.goodsId;
        const productId = this.props.match.params.productId;
        //商品详情
        const {data} = await this.$axios({
            url:"/songshu/mobile/api/product/baseInfo",
            headers:{"appkey":"ef1fc57c13007e33"},
            params:{
                param: {"goodsId":goodsId,"productId":productId}
            }
        })
        // console.log(data)
        this.setState({
            name:data.name,
            pics:data.pics,
            isLoading:false
        })
        // console.log(this.props.match.params)
        // 商品价格销量
        const res = await this.$axios({
            url:"/songshu/mobile/api/product/getGoods",
            headers:{"appkey":"ef1fc57c13007e33"},
            params:{
                param: {"goodsId":goodsId,"productId":productId}
            }
        })
        // console.log(res.data)
        this.setState({
            saleCount:res.data.saleCount,
            marketPrice:res.data.marketPrice.value,
            salesPrice:res.data.salesPrice.value
        })

        //松鼠推荐
        const res2 = await this.$axios({
            url:"/songshu/mobile/api/product/getGoodsMatch",
            headers:{"appkey":"ef1fc57c13007e33"},
            params:{
                param: {"goodsId":goodsId,"productId":productId}
            }
        })
        // console.log(res2)
        this.setState({
            goodsMatch:res2.data,
        })
        //评价
        const res3 = await this.$axios({
            url:"/songshu/mobile/api/remark/list",
            headers:{"appkey":"ef1fc57c13007e33"},
            params:{
                param: {"type":0,"productId":productId,"page":1,"pageCount":3}
            }
        })
        // console.log(res3.data.items)
        if(res3.data.items){
            this.setState({
                eval:res3.data.items,
            })
        }else{
            this.setState({
                eval:[],

            })
        }

    }

    render() {
        return (
            <>
                <div className={style.product_all}>
                    <div className={style.w_header_top}>
            <span onClick={()=>{this.props.history.go(-1)}} className={" iconfont icon-zuo"} >
            </span>
                        <p>商品详情</p>
                        <span></span>
                    </div>
                    <div className={style.product_info}>
                        <div className={style.slider_box}>
                            <img src={this.state.pics[0]} alt=""/>
                            <div></div>
                        </div>
                        <div className={style.info_box}>
                            <p>{this.state.name}</p>
                            <div>
                                <span>{this.state.salesPrice}<i>{this.state.marketPrice}</i></span>
                                <strong>总销量&nbsp;&nbsp;{this.state.saleCount}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                {/*评价*/}
                <div style={{display:this.state.eval.length>0?'block':'none'}} className={style.comment_lsit}>

                    <div  className={style.comment_top} >
                        <p>主人说</p>
                        <div className={style.comment_right } >
                            <p>好评率</p>
                            <p>99%</p>
                            <span className={"iconfont icon-zuo1"}></span>
                        </div>
                    </div>
                    <div className={style.info_total}>
                        <ul>
                            {

                                this.state.eval.map(v=>(
                                    <li key={v.id}>
                                        <div className={style.info_top}>
                                            <img src={v.userPic} alt=""/>
                                            <div className={style.info_row}>
                                                <div className={style.info_use}>
                                                    <p>{v.userName}</p>
                                                    <span>{v.time}</span>
                                                </div>
                                                <div>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={style.info_p}>{v.content}</p>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                {/*  松鼠推荐*/}
                <div className={style.product_tui}>
                    <p className={style.recommend_title}>松鼠推荐</p>
                    <div className={style.recommendGoods}>
                        <ul className={style.item_cont}>
                            {
                                this.state.goodsMatch.map(v=>(
                                    <li key={v.id}>
                                        <div className={style.item_img}>
                                            <img src={v.thumbUrl} alt=""/>
                                        </div>
                                        <p className={style.item_title}>{v.productName}</p>
                                        <p className={style.item_title_ng}>{v.alias}</p>
                                        <p className={style.item_price}><span>{v.matchPrice}</span><i>{v.marketPrice}</i></p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {/*底部导航*/}
                <div>
                    <ul className={style.footer_bar}>
                        <li>
                            <span className={"iconfont icon-gouwuche"}></span>
                            <p>购物车</p>
                        </li>
                        <li>
                            <span className={"iconfont icon-shoucang"}></span>
                            <p>收藏</p>
                        </li>
                        <li>
                            加入购物车
                        </li>
                        <li>
                            立即购买
                        </li>
                    </ul>
                </div>

            </>
        )
    }
}
export default loading(ProductInfo)
