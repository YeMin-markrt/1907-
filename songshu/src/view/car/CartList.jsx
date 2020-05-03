import React, {Component} from 'react';
import style from "../../assets/css/wk/cartList.module.css"
import loading from "../../components/common/Loading"
import noGoods from "../../assets/img/noGoods.png"
 class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            index:0,
            isLoading:true,
            keyword:'',
            buyNum:localStorage.buyNum||null
        };
    }
   async addcarList(page=1,index=0,order=5,keyword=""){
       this.setState({
               index,
               isLoading:true
           })
       const {data} = await this.$axios({
           url:"/songshu/mobile/api/product/search",
           headers:{"appkey":"ef1fc57c13007e33"},
           params:{
               param:{"keyword":keyword,"order":order,"pageCount":12,"page":page}
           }
       });
       // console.log(data)
       this.setState({
           items:data.items,
           isLoading:false
       })
    }
    componentWillUnmount() {
        this.setState = ()=>false;
    }
    //点击搜索
     getSearch(){
         // console.log(this.state.keyword.value)
         this.addcarList(1,0,5,this.state.keyword.value)
     }
     //回到顶部
     handleScrollTop = () => {
         let timer = null;
         cancelAnimationFrame(timer)
         timer = requestAnimationFrame(function fn () {
             const osTop = document.body.scrollTop || document.documentElement.scrollTop;
             if (osTop > 0) {
                 window.scrollTo(0, osTop - 90);
                 timer = requestAnimationFrame(fn);
             } else {
                 cancelAnimationFrame(timer)
             }
         })
     }
    async componentDidMount() {
        this.addcarList(1,0,5,"")

    }
    //加入购物车
     async addGoods(goodsAll,e){
         e.stopPropagation();
        const goods = await this.$axios.get("/api/joinCar",{
            params:{
                goodsAll,
                userName:localStorage.userName
            }
        })
         console.log(goods)
         if(goods.ok===1){
             let total = 0;
             goods.carList.forEach(v=>{
                 total+= v.buyNum
             })
             this.setState({
                 buyNum:total
             })
            localStorage.buyNum = total;
         }else{
             alert("库存不足")
         }
     }

    render() {
        return (
            <>
                <div className={style.car_all}>
                    <div className={style.header_bar}>
                        <span onClick={()=>{this.props.history.go(-1)}} className={"iconfont icon-zuo"}></span>
                        <div className={style.search}>
                            <span className={"iconfont icon-sousuo"}></span>
                            <input ref={(ref)=>{this.state.keyword = ref}} type="text" placeholder={"好吃的零食都在这~"}/>
                        </div>
                        <p onClick={this.getSearch.bind(this)}>搜索</p>
                    </div>
                    <div className={style.list_filter}>
                        <button>
                            <span className={this.state.index===0?style.w_active:""} onClick={this.addcarList.bind(this,1,0,5,"")}>新品</span>
                            <strong style={{display:this.state.index===0?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.state.index===1?style.w_active:""} onClick={this.addcarList.bind(this,1,1,1,"")}>热卖</span>
                            <strong style={{display:this.state.index===1?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.state.index===2?style.w_active:""} onClick={this.addcarList.bind(this,1,2,3,"")}>价格</span>
                            <div>
                                <i className={this.state.index===2?style.i1:''}></i>
                                <p ></p>
                            </div>
                            <strong style={{display:this.state.index===2?'block':'none'}}></strong>
                        </button>
                    </div>
                </div>

                {/*主体渲染内容*/}
                <div  className={style.product_block} >
                    <img src={this.state.items.length<=0?noGoods:''} alt=""/>
                    {
                        this.state.items.map((v)=>(
                            <div onClick={()=>{this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}} style={{display:this.state.index===0?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{v.salesPrice.value}</span>
                                        <i>{v.marketPrice.value}</i>
                                    </p>
                                    <strong onClick={this.addGoods.bind(this,v)}  className={"iconfont icon-gouwuche" }></strong>
                                </div>
                            </div>
                        ))

                    }
                    {

                        this.state.items.map(v=>(
                            <div onClick={()=>{this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}}  style={{display:this.state.index===1?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{v.salesPrice.value}</span>
                                        <i>{v.marketPrice.value}</i>
                                    </p>
                                    <strong onClick={this.addGoods.bind(this,v)} className={"iconfont icon-gouwuche" }></strong>
                                </div>
                            </div>
                        ))

                    }
                    {

                        this.state.items.map(v=>(
                            <div onClick={()=>{this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}}  style={{display:this.state.index===2?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{v.salesPrice.value}</span>
                                        <i>{v.marketPrice.value}</i>
                                    </p>
                                    <strong onClick={this.addGoods.bind(this,v)} className={"iconfont icon-gouwuche" }></strong>
                                </div>
                            </div>
                        ))

                    }
                </div>

                <div className={style.button_car} onClick={()=>{this.props.history.push('/shoppingCart')}} >
                    <span className={"iconfont icon-gouwuche" }></span>

                    <i>{this.state.buyNum}</i>
                </div>
                <div className={style.button_btn}>
                    <div className={style.button_top} onClick={this.handleScrollTop.bind(this)}>
                    <p className={"iconfont icon-arrow-top"}></p>
                        <p >顶部</p>
                    </div>
                    <div className={style.button_section}>
                        <span className={"iconfont icon-zaixiankefu"}></span>
                    </div>
                </div>
            </>
        )
    }
}
export default loading(CartList)