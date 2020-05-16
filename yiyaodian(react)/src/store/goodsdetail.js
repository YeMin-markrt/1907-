
import {observable,action,computed} from 'mobx'
import {detailtuijian,goodsdetail,getchangxu,goodsdlistya} from '../api/request'
 class Goodsdetail  {
  @observable detailbanner=[]
  @observable goodservice=[]
  @observable goods_info=[]
  @observable goods_lun=[]
  @observable changxu=[]
  @observable goodsneed=[]

  @action
  getchangxun=()=>{
    getchangxu().then(res=>{
      this.changxu=res.data.standbyMedicine
    })
  }

  @action
  getdetailtuijian=(type,key1,key2)=>{
    detailtuijian(type,key1,key2).then(res=>{
      this.goods_lun=res.data.itemList
    })
  }
  @action
  getdetailxiang=(id)=>{
    goodsdetail(id).then(res=>{
      this.detailbanner=res.data.picInfo
      this.goodservice=res.data.service_list
      this.goods_info=res.data.product_info
    })
  }

  @action
  getgoodslist=(key1,key2)=>{
    goodsdlistya(key1,key2).then(res=>{
      console.log(res.data.hits)
      this.goodsneed=res.data.hits
    })
 }
}

export default Goodsdetail